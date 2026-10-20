# Quick Start Guide - Marketplace Setup

Get your marketplace running in 15 minutes!

## Prerequisites

```bash
Python 3.8+
pip (Python package manager)
PostgreSQL or SQLite (for development)
```

## Step 1: Test the Prototype (5 minutes)

First, run the standalone prototype with mock data to understand the system:

```bash
cd /path/to/marketplace
python prototype.py
```

**What you'll see:**
- Platform capacity checking
- Auto-assignment with rank priority
- 3-hour deadline & auto-reassignment
- Hot task notifications
- Payment processing
- Financial summary

This proves the core logic works! ✓

---

## Step 2: Setup Django Project (5 minutes)

### 2.1 Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2.2 Create Django project

```bash
pip install django djangorestframework django-cors-headers psycopg2-binary
django-admin startproject marketplace_config .
python manage.py startapp marketplace
```

### 2.3 Update settings.py

```python
# marketplace_config/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'marketplace',  # ← Add this
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ← Add before CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    # ... rest of middleware
]

# Allow CORS for development
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Database (for development, use SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Marketplace Settings
MARKETPLACE_CONFIG = {
    'PROJECT_PRICE': 40.00,
    'AUDITOR_PAYOUT': 20.00,
    'ASSIGNMENT_DEADLINE_HOURS': 3,
    'MAX_PENDING_RATIO': 2.0,
}
```

---

## Step 3: Add Models (3 minutes)

### 3.1 Copy models into Django

Copy the content of `models.py` into `marketplace/models.py`:

```bash
cp models.py marketplace/models.py
```

### 3.2 Create migrations

```bash
python manage.py makemigrations marketplace
python manage.py migrate
```

You should see:
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, marketplace
Running migrations:
  ...
  Applying marketplace.0001_initial... OK
```

### 3.3 Create superuser (for admin access)

```bash
python manage.py createsuperuser
# Follow prompts (username, email, password)
```

---

## Step 4: Add Services (2 minutes)

### 4.1 Copy services

```bash
cp services.py marketplace/services.py
```

### 4.2 Import in marketplace/__init__.py

```python
# marketplace/__init__.py
default_app_config = 'marketplace.apps.MarketplaceConfig'
```

---

## Step 5: Create API Views

Create `marketplace/views.py`:

```python
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Project, UserProfile, Wallet
from .services import QueueManagementService, CapacityService

class ProjectViewSet(viewsets.ViewSet):
    """Handle project submissions and tracking"""
    
    @action(detail=False, methods=['post'])
    def submit_project(self, request):
        """Client submits a new audit project"""
        
        if not hasattr(request.user, 'userprofile'):
            return Response(
                {'error': 'User profile not found'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        service = QueueManagementService(None)  # Use Django models directly
        
        success, project, message = service.create_project_submission(
            client_user=request.user.userprofile,
            website_url=request.data.get('website_url'),
            description=request.data.get('description')
        )
        
        if success:
            return Response({
                'success': True,
                'project_id': project.id,
                'project_code': project.project_code,
                'status': project.status,
                'assigned_auditor': project.assigned_auditor.full_name if project.assigned_auditor else None,
                'message': message
            })
        
        return Response(
            {'error': message},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=False, methods=['get'])
    def check_capacity(self, request):
        """Check if platform is accepting new projects"""
        
        service = CapacityService(None)
        capacity_info = service.check_platform_capacity()
        
        return Response(capacity_info)


class WalletViewSet(viewsets.ViewSet):
    """Handle wallet operations"""
    
    @action(detail=False, methods=['get'])
    def balance(self, request):
        """Get user's wallet balance"""
        
        try:
            wallet = Wallet.objects.get(user=request.user.userprofile)
            return Response({
                'balance': float(wallet.balance),
                'total_earned': float(wallet.total_earned),
                'total_spent': float(wallet.total_spent),
                'wallet_type': wallet.wallet_type
            })
        except Wallet.DoesNotExist:
            return Response(
                {'error': 'Wallet not found'},
                status=status.HTTP_404_NOT_FOUND
            )
```

Create `marketplace/urls.py`:

```python
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, WalletViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'wallets', WalletViewSet, basename='wallet')

urlpatterns = router.urls
```

Update `marketplace_config/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('marketplace.urls')),
]
```

---

## Step 6: Test the API

### 6.1 Create test data

```bash
python manage.py shell
```

```python
from marketplace.models import UserProfile, AuditorProfile, AuditorRank, Wallet

# Create ranks
expert_rank = AuditorRank.objects.create(
    rank_type='expert',
    display_name='Expert Auditor',
    priority_level=1,
    min_completed_projects=50,
    min_rating=4.5
)

pro_rank = AuditorRank.objects.create(
    rank_type='professional',
    display_name='Professional',
    priority_level=2,
    min_completed_projects=20,
    min_rating=4.0
)

# Create client user
client = UserProfile.objects.create(
    email='client@example.com',
    full_name='Test Client',
    role='client'
)

# Create client wallet
Wallet.objects.create(user=client, wallet_type='client', balance=1000)

# Create auditor user
auditor = UserProfile.objects.create(
    email='auditor@example.com',
    full_name='Test Auditor',
    role='auditor'
)

# Create auditor profile
AuditorProfile.objects.create(
    user=auditor,
    rank=expert_rank,
    max_concurrent_projects=3
)

# Create auditor wallet
Wallet.objects.create(user=auditor, wallet_type='auditor', balance=0)

print("✓ Test data created")
```

### 6.2 Run server

```bash
python manage.py runserver
```

### 6.3 Test endpoints with curl

```bash
# Check platform capacity
curl http://localhost:8000/api/projects/check_capacity/

# Expected response:
# {
#   "can_accept": true,
#   "status": "open",
#   "pending_projects": 0,
#   "active_auditors": 1,
#   "current_ratio": 0.0,
#   "max_ratio": 2.0,
#   "message": "✓ Platform Open: 1 auditors ready!"
# }
```

---

## Step 7: Setup Queue Processor (Optional but Recommended)

The queue processor checks for expired assignments every 5 minutes. Without it, expired assignments won't be auto-reassigned.

### 7.1 Install Celery

```bash
pip install celery redis django-celery-beat
```

### 7.2 Create marketplace/tasks.py

```python
from celery import shared_task
from .services import QueueManagementService

@shared_task
def process_assignment_queue():
    """Process queue, check for expirations, reassign"""
    service = QueueManagementService(None)
    result = service.process_queue()
    return result

@shared_task
def send_hot_task_notifications():
    """Send hot task notifications"""
    from .models import Project
    from .services import CapacityService
    
    service = CapacityService(None)
    
    # Send for recent pending projects
    projects = Project.objects.filter(
        status='pending_assignment'
    ).order_by('-created_at')[:5]
    
    for project in projects:
        service.trigger_hot_task_notifications(project)
    
    return f"Notifications sent for {len(projects)} projects"
```

### 7.3 Setup Celery Beat Schedule

```python
# marketplace_config/settings.py (add)

from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    'process-assignment-queue': {
        'task': 'marketplace.tasks.process_assignment_queue',
        'schedule': 300.0,  # Every 5 minutes
    },
    'send-hot-task-notifications': {
        'task': 'marketplace.tasks.send_hot_task_notifications',
        'schedule': 600.0,  # Every 10 minutes
    },
}
```

### 7.4 Run Celery (separate terminal)

```bash
celery -A marketplace_config beat -l info
```

---

## Step 8: Admin Panel Setup

Django includes a built-in admin for managing data:

```bash
python manage.py runserver
# Visit: http://localhost:8000/admin/
# Login with superuser credentials
```

Create `marketplace/admin.py`:

```python
from django.contrib import admin
from .models import (
    UserProfile, AuditorRank, AuditorProfile, Project,
    AssignmentQueue, Wallet, Transaction, Notification
)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'role', 'is_active', 'created_at')
    list_filter = ('role', 'is_active')
    search_fields = ('email', 'full_name')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_code', 'client', 'website_url', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('project_code', 'website_url')

@admin.register(AuditorProfile)
class AuditorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'rank', 'completed_projects', 'get_average_rating')
    list_filter = ('rank',)
    search_fields = ('user__email', 'user__full_name')

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'wallet_type', 'balance', 'total_earned')
    list_filter = ('wallet_type',)
    search_fields = ('user__email',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('wallet', 'transaction_type', 'amount', 'status', 'created_at')
    list_filter = ('transaction_type', 'status')
    readonly_fields = ('created_at',)

admin.site.register(AuditorRank)
admin.site.register(AssignmentQueue)
admin.site.register(Notification)
```

---

## Directory Structure

After setup, you should have:

```
marketplace_project/
├── manage.py
├── db.sqlite3
├── venv/
├── marketplace_config/
│   ├── settings.py          ← Updated
│   ├── urls.py              ← Updated
│   ├── wsgi.py
│   └── asgi.py
├── marketplace/
│   ├── migrations/
│   │   └── 0001_initial.py
│   ├── models.py            ← Copied from models.py
│   ├── services.py          ← Copied from services.py
│   ├── views.py             ← New (API endpoints)
│   ├── urls.py              ← New (API routes)
│   ├── admin.py             ← New (admin config)
│   ├── tasks.py             ← New (Celery tasks)
│   └── apps.py
├── prototype.py             ← Test file (standalone)
├── README.md                ← Documentation
└── TECHNICAL_SPECIFICATION.md
```

---

## Testing Checklist

- [ ] Run `python prototype.py` - all 9 demos pass ✓
- [ ] `python manage.py migrate` - no errors ✓
- [ ] Admin panel loads at `/admin/` ✓
- [ ] Create test project via API ✓
- [ ] Check capacity endpoint returns correct data ✓
- [ ] Auto-assignment works (auditor assigned to project) ✓
- [ ] Queue processor reassigns expired projects ✓
- [ ] Wallet transactions recorded correctly ✓

---

## Next Steps

1. **Integrate Stripe** for real payments
   - Create `marketplace/payment.py`
   - Add Stripe webhook handlers
   - Update views to use Stripe intent

2. **Build Frontend**
   - React/Vue app for client submission
   - Auditor dashboard
   - Real-time updates via WebSockets

3. **Deploy**
   - Use Docker for containerization
   - Deploy to AWS/Heroku/DigitalOcean
   - Setup PostgreSQL in production
   - Configure Celery with Redis

4. **Monitor**
   - Setup logging
   - Use Sentry for error tracking
   - Create analytics dashboard

---

## Troubleshooting

### Migrations fail
```bash
# Clear migrations and start fresh
python manage.py migrate marketplace zero
rm marketplace/migrations/0001_initial.py
python manage.py makemigrations marketplace
python manage.py migrate
```

### Port 8000 already in use
```bash
python manage.py runserver 8001
```

### Import errors
Make sure `marketplace` is in `INSTALLED_APPS` in settings.py

### Database errors
```bash
# Reset database
rm db.sqlite3
python manage.py migrate
```

---

## Support

Refer to:
- `README.md` - Complete documentation
- `TECHNICAL_SPECIFICATION.md` - Detailed system design
- `services.py` - Code comments explain each function

---

**You're ready to start! 🚀**

Run the prototype first to understand the system:
```bash
python prototype.py
```

Then follow the Django setup steps above to integrate it into your application.
