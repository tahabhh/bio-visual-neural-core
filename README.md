# Website Auditing Marketplace Platform

A complete backend system for a marketplace connecting website audit clients with professional auditors. Features rank-based queue assignment, capacity management, and real-time financial tracking.

## System Overview

```
CLIENT SUBMITS PROJECT ($40)
    ↓
CAPACITY CHECK (Can we accept?)
    ↓
PAYMENT PROCESSING ($40 deducted from client wallet)
    ↓
AUTO-ASSIGNMENT QUEUE (Assign to best available auditor)
    ├─ Expert (Priority 1) → Professional (Priority 2) → Beginner (Priority 3)
    └─ Filter by capacity (max concurrent projects)
    ↓
3-HOUR ACCEPTANCE DEADLINE
    ├─ ACCEPTED → Auditor starts work
    └─ EXPIRED → Auto-reassign to next auditor
    ↓
HOT TASK NOTIFICATIONS (Sent to all available auditors)
    ↓
PROJECT COMPLETION (Auditor submits report)
    ↓
CLIENT REVIEW & RATING
    ↓
PAYMENT RELEASE ($20 to auditor, $20 to platform)
```

## Project Structure

```
marketplace/
├── models.py              # Django ORM Models (database schema)
├── services.py            # Business logic services
├── prototype.py           # Standalone mock prototype (for testing)
├── admin.py               # Django admin configuration (you'll create)
├── views.py               # API views/controllers (you'll create)
└── README.md              # This file
```

## Files Description

### 1. **models.py** - Database Schema

Complete Django models for:
- **UserProfile**: Base user (client/auditor/admin)
- **AuditorRank**: Rank system (Beginner/Professional/Expert)
- **AuditorProfile**: Extended auditor data (ratings, specializations)
- **Project**: Audit projects with status tracking
- **AssignmentQueue**: Queue management system
- **AssignmentHistory**: Audit trail of all assignments
- **Wallet**: Financial wallets for payments
- **Transaction**: Payment transaction log
- **PlatformSettings**: Global configuration
- **Notification**: User notifications (hot tasks, payments, etc.)

### 2. **services.py** - Business Logic

Four main service classes:

#### **AssignmentService**
```python
auto_assign_from_queue(project, platform_settings)
  → Automatically assigns project to best available auditor
  
handle_expired_assignment(project)
  → Reassigns if auditor doesn't respond in 3 hours
  
accept_assignment(project, auditor)
  → Auditor accepts the assignment
  
reject_assignment(project, auditor, reason)
  → Auditor rejects, tries reassignment
```

#### **CapacityService**
```python
check_platform_capacity(platform_settings)
  → Returns: can_accept, current_ratio, active_auditors, pending_projects
  → Formula: pending_projects / active_auditors > max_ratio → REJECT
  
trigger_hot_task_notifications(project)
  → Sends 🔥 notifications to all available auditors
```

#### **FinancialService**
```python
process_client_payment(client_user, project, amount=$40)
  → Deducts $40 from client wallet, creates transaction
  
release_auditor_payment(project)
  → Releases $20 to auditor on completion
  
get_wallet_summary(user)
  → Returns balance, earned, spent
```

#### **QueueManagementService**
```python
create_project_submission(client_user, website_url, description)
  → End-to-end: check capacity → create project → process payment
  
process_queue(platform_settings)
  → Main queue processor (run periodically):
    - Check for expired assignments
    - Auto-assign pending projects
    - Trigger hot task notifications
    
complete_project(project, client_rating, client_feedback)
  → Mark as done, release auditor payment, notify auditor
```

### 3. **prototype.py** - Standalone Mock Implementation

**Run without Django for testing:**
```bash
python prototype.py
```

This demonstrates:
- ✓ Complete system flow with mock data
- ✓ Rank-based priority assignment
- ✓ 3-hour deadline expiration & auto-reassignment
- ✓ Capacity threshold checking
- ✓ Hot task notifications
- ✓ Financial transactions
- ✓ Audit trails

**Output shows:**
- Platform status (open/busy)
- Assignment process with rank priority
- Expired assignments & auto-reassignment
- Payment processing
- Financial summary
- Complete assignment history

---

## Integration with Django

### Step 1: Setup Django Project

```bash
# Create Django project
django-admin startproject marketplace_config
cd marketplace_config
python manage.py startapp marketplace

# Install dependencies
pip install django djangorestframework django-cors-headers
```

### Step 2: Add Models

Copy **models.py** to `marketplace/models.py`:
```python
# marketplace/models.py
from django.db import models
from django.utils import timezone
# ... paste all model definitions from models.py
```

### Step 3: Create Migrations

```bash
python manage.py makemigrations marketplace
python manage.py migrate
```

### Step 4: Import Services

Create `marketplace/services.py` with the business logic from **services.py**

### Step 5: Create Views/API Endpoints

Example:
```python
# marketplace/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Project, UserProfile, AuditorProfile
from .services import QueueManagementService, CapacityService

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    
    @action(detail=False, methods=['post'])
    def submit_project(self, request):
        """Client submits a new project"""
        service = QueueManagementService(self.model)
        
        success, project, message = service.create_project_submission(
            client_user=request.user.userprofile,
            website_url=request.data['website_url'],
            description=request.data['description']
        )
        
        if success:
            return Response({'project_id': project.id, 'message': message})
        return Response({'error': message}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def check_capacity(self, request):
        """Check if platform is accepting projects"""
        capacity_service = CapacityService(self.model)
        status_info = capacity_service.check_platform_capacity()
        return Response(status_info)
```

### Step 6: Run Queue Processor

Create a management command to process queue periodically:

```python
# marketplace/management/commands/process_queue.py
from django.core.management.base import BaseCommand
from marketplace.services import QueueManagementService
from marketplace.models import PlatformSettings

class Command(BaseCommand):
    help = 'Process assignment queue and handle expirations'
    
    def handle(self, *args, **options):
        service = QueueManagementService(models)
        result = service.process_queue()
        
        self.stdout.write(f"Processed: {result['processed']}")
        self.stdout.write(f"Reassigned: {result['reassigned']}")
        self.stdout.write(f"Notifications sent: {result['notifications_sent']}")
```

Run with Celery (background task):
```python
# marketplace/tasks.py
from celery import shared_task
from .services import QueueManagementService

@shared_task
def process_assignment_queue():
    service = QueueManagementService(models)
    return service.process_queue()

# Run every 5 minutes
# In celery beat schedule: 'process-queue': {'task': 'marketplace.tasks.process_assignment_queue', 'schedule': 300.0}
```

---

## Business Logic Flow

### Scenario 1: Client Submits Project

```
1. Client clicks "Submit Project" with website URL
2. System checks: pending_projects / active_auditors <= 2.0?
   - If NO → Show "Platform Busy" message
   - If YES → Continue
3. Deduct $40 from client wallet
4. Create Project (status: pending_assignment)
5. auto_assign_from_queue():
   - Get all available auditors
   - Filter by capacity (max_concurrent_projects)
   - Assign to highest rank available (Expert > Professional > Beginner)
   - Set 3-hour deadline
6. Project status: assigned (awaiting auditor response)
7. Send hot task notifications to all available auditors
```

### Scenario 2: Auditor Doesn't Accept in 3 Hours

```
1. Queue processor checks for expired assignments
2. For each expired:
   - Log "expired" in assignment history
   - Get list of previously attempted auditors (exclude them)
   - Try to assign to next available auditor
   - If found: status = assigned (new deadline)
   - If not found: status = pending_assignment (back in queue)
```

### Scenario 3: Auditor Rejects Assignment

```
1. Auditor clicks "Reject" with optional reason
2. Log "rejected" in assignment history
3. Remove current assignment (assigned_auditor = null)
4. Call handle_expired_assignment() → try reassign
5. Send notification to next assigned auditor
```

### Scenario 4: Project Completed

```
1. Auditor submits report → status: submitted
2. Client reviews and rates (1-5 stars)
3. Call complete_project():
   - Mark status: completed
   - Add client rating to auditor's profile
   - Release $20 to auditor wallet
   - Update auditor rank (if earned enough projects/rating)
   - Send "Payment Released" notification
4. Platform keeps $20 commission
```

---

## Capacity Threshold Algorithm

```python
# Check every time before accepting new project
active_auditors = count(UserProfile where role='auditor' AND is_active=True)
pending_projects = count(Project where status IN ['pending_assignment', 'assigned'])

current_ratio = pending_projects / active_auditors

if current_ratio > MAX_RATIO (default 2.0):
    REJECT new project submission
    Show "Platform Busy" message
    Trigger hot task notifications to pull in more workers
else:
    ACCEPT project
    Auto-assign to queue
```

**Example:**
- 3 active auditors, 2 pending projects → ratio 0.67 → OPEN ✓
- 3 active auditors, 6 pending projects → ratio 2.0 → OPEN ✓
- 3 active auditors, 7 pending projects → ratio 2.33 → BUSY ✗

---

## Database Indexes (for Performance)

```sql
-- Key indexes for fast queries
CREATE INDEX idx_project_status ON project(status);
CREATE INDEX idx_project_assigned_auditor ON project(assigned_auditor_id);
CREATE INDEX idx_project_client ON project(client_id);
CREATE INDEX idx_project_created ON project(created_at);

CREATE INDEX idx_auditor_profile_rank ON auditor_profile(rank_id);
CREATE INDEX idx_auditor_profile_user ON auditor_profile(user_id);

CREATE INDEX idx_assignment_queue_status ON assignment_queue(status);
CREATE INDEX idx_assignment_queue_position ON assignment_queue(queue_position);

CREATE INDEX idx_wallet_user ON wallet(user_id);
CREATE INDEX idx_transaction_wallet ON transaction(wallet_id);
CREATE INDEX idx_transaction_created ON transaction(created_at);

CREATE INDEX idx_notification_user_read ON notification(user_id, is_read);
```

---

## Payment Integration (Stripe - TODO)

When you're ready to add Stripe:

```python
# marketplace/payment.py
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

def create_payment_intent(client, amount_cents):
    """Create Stripe payment intent"""
    intent = stripe.PaymentIntent.create(
        amount=amount_cents,
        currency='usd',
        metadata={'client_id': client.id}
    )
    return intent

def handle_payment_webhook(event):
    """Handle Stripe webhook (payment_intent.succeeded)"""
    payment_intent = event['data']['object']
    client_id = payment_intent['metadata']['client_id']
    
    # Process in our system
    # service.process_client_payment(client_id, project, amount)
    pass

# In views.py
def initiate_project_payment(request):
    """Step 1: Create Stripe intent for project submission"""
    project_data = request.data
    
    # Create project (unpaid)
    project = Project.objects.create(
        client=request.user.userprofile,
        website_url=project_data['url'],
        status='payment_pending'
    )
    
    # Create Stripe intent
    intent = create_payment_intent(request.user.userprofile, 4000)  # $40.00
    
    return Response({
        'project_id': project.id,
        'client_secret': intent.client_secret,
        'amount': 4000
    })
```

---

## Testing Guide

### Unit Tests Example

```python
# marketplace/tests.py
from django.test import TestCase
from .models import UserProfile, Project, AuditorProfile, AuditorRank
from .services import AssignmentService, CapacityService

class AssignmentServiceTest(TestCase):
    def setUp(self):
        # Create test data
        self.expert_rank = AuditorRank.objects.create(
            rank_type='expert',
            display_name='Expert',
            priority_level=1,
            min_completed_projects=50
        )
        self.auditor = UserProfile.objects.create(
            email='auditor@test.com',
            full_name='Test Auditor',
            role='auditor'
        )
        self.auditor_profile = AuditorProfile.objects.create(
            user=self.auditor,
            rank=self.expert_rank
        )
    
    def test_auto_assign_to_expert(self):
        client = UserProfile.objects.create(
            email='client@test.com',
            full_name='Test Client',
            role='client'
        )
        project = Project.objects.create(
            client=client,
            website_url='https://test.com',
            project_description='Test project'
        )
        
        service = AssignmentService(models)
        success, auditor_name = service.auto_assign_from_queue(project)
        
        self.assertTrue(success)
        self.assertEqual(project.assigned_auditor.id, self.auditor.id)
    
    def test_capacity_threshold(self):
        service = CapacityService(models)
        capacity = service.check_platform_capacity(max_ratio=2.0)
        
        self.assertTrue(capacity['can_accept'])
        self.assertEqual(capacity['status'], 'open')
```

### Integration Tests

```python
def test_complete_project_flow(self):
    """Test: submit → assign → accept → complete → pay"""
    queue_service = QueueManagementService(models)
    
    # 1. Submit
    success, project, msg = queue_service.create_project_submission(
        client, 'https://test.com', 'Test'
    )
    self.assertTrue(success)
    
    # 2. Check assigned
    self.assertIsNotNone(project.assigned_auditor)
    self.assertEqual(project.status, 'assigned')
    
    # 3. Accept
    project.accepted_at = timezone.now()
    project.status = 'in_progress'
    project.save()
    
    # 4. Complete & pay
    success, msg = queue_service.complete_project(project, 5, "Great work!")
    self.assertTrue(success)
    self.assertEqual(project.status, 'completed')
```

---

## Configuration

### Django Settings

```python
# settings.py

INSTALLED_APPS = [
    'marketplace',
    'rest_framework',
    'corsheaders',
]

# Marketplace-specific
MARKETPLACE_SETTINGS = {
    'PROJECT_PRICE': 40.00,
    'AUDITOR_PAYOUT': 20.00,
    'PLATFORM_COMMISSION': 20.00,
    'ASSIGNMENT_DEADLINE_HOURS': 3,
    'MAX_PENDING_RATIO': 2.0,
    'ENABLE_HOT_TASKS': True,
}
```

---

## API Endpoint Examples

Once integrated with Django REST Framework:

```
POST   /api/projects/submit_project/
       - Submit new audit project
       - Body: {website_url, description}
       - Response: {project_id, code, message}

GET    /api/projects/check_capacity/
       - Check if platform accepting projects
       - Response: {can_accept, status, message, ratio}

GET    /api/projects/{id}/
       - Get project details

POST   /api/projects/{id}/accept/
       - Auditor accepts assignment

POST   /api/projects/{id}/reject/
       - Auditor rejects (with reason)

POST   /api/projects/{id}/submit_report/
       - Auditor submits completed report

POST   /api/projects/{id}/complete/
       - Client reviews & rates
       - Body: {rating: 1-5, feedback: "..."}

GET    /api/wallets/balance/
       - Get user's wallet balance & history

GET    /api/notifications/
       - Get user's notifications
```

---

## Monitoring & Analytics

Track these metrics:

```python
def get_marketplace_metrics(date_range):
    """Get platform analytics"""
    return {
        'total_revenue': sum(projects.price),
        'auditor_earnings': sum(payouts),
        'avg_assignment_time': avg(accept_at - assigned_at),
        'completion_rate': completed / total,
        'avg_client_rating': avg(client_rating),
        'auditor_utilization': avg_active_projects / total_auditors,
        'capacity_threshold_triggers': count(busy_events),
    }
```

---

## Next Steps

1. **Copy models.py** → Create Django models
2. **Run migrations** → Create database tables
3. **Copy services.py** → Implement business logic
4. **Create views.py** → Build API endpoints
5. **Test with prototype.py** → Verify logic with mock data
6. **Add Stripe integration** → Handle real payments
7. **Deploy** → Production environment

---

## Key Features Summary

✅ **Rank-based Priority Assignment**
- Expert → Professional → Beginner

✅ **Capacity Management**
- pending_projects / active_auditors ratio check
- Reject when platform is overloaded

✅ **3-Hour Acceptance Deadline**
- Auto-reassign if no response
- Audit trail of all reassignments

✅ **Hot Task Notifications**
- 🔥 Alerts when new projects available
- Encourages auditor participation

✅ **Financial Tracking**
- $40 client payment
- $20 auditor payout
- $20 platform commission

✅ **Complete Audit Trail**
- All assignments logged
- All rejections/expirations tracked
- Financial transaction history

✅ **Scalable Architecture**
- Django ORM (works with any DB)
- Service-based design (easy to test/extend)
- Async-ready (integrate Celery for queue processing)

---

**Questions? Check the code comments in models.py and services.py for detailed explanations.**
