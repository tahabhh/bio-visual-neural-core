# 📚 API Documentation - SiteVerify

**شرح تفصيلي لكل الـ APIs المتاحة**

---

## 🔗 Base URL

```
http://localhost:5000
أو
https://siteverify.herokuapp.com (عند النشر)
```

---

## 1️⃣ تقييم الخبير الجديد

### تفاصيل:
- **الغرض**: تقييم إجابات الخبير الجديد على أسئلة الاختبار
- **الطريقة**: POST
- **الـ Endpoint**: `/api/evaluate-expert`

### Request:

```bash
curl -X POST http://localhost:5000/api/evaluate-expert \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "q1": "SEO هو تحسين محركات البحث...",
      "q2": "2-3 ثواني",
      "q3": "HTTPS أكثر أماناً من HTTP...",
      "q4": "UX/Usability",
      "q5": "70"
    }
  }'
```

### Request Fields:

| الحقل | النوع | الوصف |
|------|------|-------|
| q1 | string | إجابة السؤال الأول (SEO) |
| q2 | string | إجابة السؤال الثاني (السرعة) |
| q3 | string | إجابة السؤال الثالث (HTTPS) |
| q4 | string | إجابة السؤال الرابع (التصميم) |
| q5 | string | إجابة السؤال الخامس (الدرجة الدنيا) |

### Response:

```json
{
  "score": 78,
  "status": "approved",
  "evaluation": "تقييم مفصل من Claude...",
  "timestamp": "2026-07-09T12:00:00"
}
```

### Response Fields:

| الحقل | النوع | الوصف |
|------|------|-------|
| score | number | الدرجة من 0-100 |
| status | string | "approved" أو "rejected" |
| evaluation | string | التقييم التفصيلي من Claude |
| timestamp | string | وقت التقييم (ISO format) |

### معايير القبول:

```
score >= 70 → ✅ approved (قبول)
score < 70  → ❌ rejected (رفض)
```

---

## 2️⃣ تحليل الموقع

### تفاصيل:
- **الغرض**: تحليل موقع الويب واستخراج تقرير شامل
- **الطريقة**: POST
- **الـ Endpoint**: `/api/analyze-website`

### Request:

```bash
curl -X POST http://localhost:5000/api/analyze-website \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com"
  }'
```

### Request Fields:

| الحقل | النوع | إلزامي | الوصف |
|------|------|--------|-------|
| url | string | ✅ | رابط الموقع المراد تحليله |

### Response:

```json
{
  "url": "https://example.com",
  "score": 82,
  "report": "تحليل مفصل للموقع...",
  "price": 20,
  "status": "approved",
  "timestamp": "2026-07-09T12:00:00"
}
```

### معايير التقييم:

```
1. الأداء (0-30)
   - سرعة التحميل
   - الأداء العام
   - Optimization

2. الأمان (0-20)
   - HTTPS
   - حماية البيانات
   - Certificates

3. التصميم (0-15)
   - UX/UI
   - الاحترافية
   - Visual Appeal

4. SEO (0-15)
   - Meta Tags
   - Keywords
   - Sitemap

5. Mobile Friendly (0-10)
   - Responsive Design
   - Touch Friendly

6. Accessibility (0-10)
   - WCAG Standards
   - Screen Readers
```

### حالات النتيجة:

```
score >= 70 → ✅ approved (مقبول)
score < 70  → ⏳ needs_improvement (بحاجة تحسين)
```

---

## 3️⃣ تقييم التقرير

### تفاصيل:
- **الغرض**: تقييم جودة تقرير الخبير
- **الطريقة**: POST
- **الـ Endpoint**: `/api/evaluate-report`

### Request:

```bash
curl -X POST http://localhost:5000/api/evaluate-report \
  -H "Content-Type: application/json" \
  -d '{
    "report": "نص التقرير الكامل من الخبير..."
  }'
```

### Request Fields:

| الحقل | النوع | إلزامي | الوصف |
|------|------|--------|-------|
| report | string | ✅ | نص التقرير الكامل |

### Response:

```json
{
  "score": 85,
  "status": "approved",
  "evaluation": "تقييم تفصيلي...",
  "timestamp": "2026-07-09T12:00:00"
}
```

### معايير التقييم:

```
1. الشمول (0-25)
   - هل غطى جميع الجوانب؟
   - هل كل معيار فيه تفاصيل؟

2. الدقة (0-25)
   - هل المعلومات صحيحة؟
   - هل الأرقام واقعية؟

3. الاحترافية (0-20)
   - هل التنسيق احترافي؟
   - هل بدون أخطاء؟

4. التوصيات (0-15)
   - هل عملية؟
   - هل واضحة؟

5. اللغة (0-15)
   - هل سليمة؟
   - هل واضحة؟
```

### حالات النتيجة:

```
score >= 75 → ✅ approved (قبول - يدفع للخبير)
score < 75  → ❌ rejected (رفض - ترجع للتحسين)
```

---

## 4️⃣ معالجة الدفع

### تفاصيل:
- **الغرض**: معالجة الدفع وإنشاء مشروع جديد
- **الطريقة**: POST
- **الـ Endpoint**: `/api/process-payment`

### Request:

```bash
curl -X POST http://localhost:5000/api/process-payment \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "client_id": "client_12345"
  }'
```

### Request Fields:

| الحقل | النوع | إلزامي | الوصف |
|------|------|--------|-------|
| url | string | ✅ | رابط الموقع |
| client_id | string | ✅ | معرف العميل |

### Response:

```json
{
  "status": "success",
  "transaction_id": "TXN-1720512000",
  "amount": 20,
  "project_id": "PRJ-1720512000",
  "message": "Payment processed successfully"
}
```

### Response Fields:

| الحقل | النوع | الوصف |
|------|------|-------|
| status | string | "success" أو "failed" |
| transaction_id | string | معرف العملية المالية |
| amount | number | المبلغ المدفوع ($) |
| project_id | string | معرف المشروع الجديد |

---

## 5️⃣ Health Check

### تفاصيل:
- **الغرض**: التحقق من أن السيرفر يعمل
- **الطريقة**: GET
- **الـ Endpoint**: `/api/health`

### Request:

```bash
curl http://localhost:5000/api/health
```

### Response:

```json
{
  "status": "healthy",
  "timestamp": "2026-07-09T12:00:00"
}
```

---

## 🔐 Authentication

جميع الـ APIs العامة بدون تفويض حالياً.
**للنسخة المستقبلية:** ستُضيف JWT Tokens

```javascript
headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

---

## ⚠️ Error Handling

### Errors المحتملة:

```json
{
  "error": "URL required"
}
```

### HTTP Status Codes:

| الكود | المعنى |
|------|-------|
| 200 | نجح |
| 400 | خطأ في الـ Request |
| 404 | لم يوجد |
| 500 | خطأ في السيرفر |

---

## 💻 أمثلة في لغات مختلفة

### JavaScript:

```javascript
const response = await fetch('http://localhost:5000/api/evaluate-expert', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        answers: {
            q1: 'SEO...',
            q2: '2-3 ثواني',
            q3: 'HTTPS...',
            q4: 'UX',
            q5: '70'
        }
    })
});
const data = await response.json();
console.log(data);
```

### Python:

```python
import requests
import json

response = requests.post(
    'http://localhost:5000/api/evaluate-expert',
    json={
        'answers': {
            'q1': 'SEO...',
            'q2': '2-3 seconds',
            'q3': 'HTTPS...',
            'q4': 'UX',
            'q5': '70'
        }
    }
)
print(response.json())
```

### cURL:

```bash
curl -X POST http://localhost:5000/api/evaluate-expert \
  -H "Content-Type: application/json" \
  -d '{"answers":{"q1":"SEO...","q2":"2-3 seconds"}}'
```

---

## 🚀 Rate Limiting

حالياً: بدون تحديد للمعدل
**المستقبل:** سيتم إضافة Rate Limiting

---

## 📝 CORS

مفعّل لجميع النطاقات:

```javascript
CORS(app)
```

---

## 📖 الملاحظات

- جميع الأوقات بـ ISO 8601 Format
- الدرجات من 0-100
- الأسعار بـ USD ($)

---

**آخر تحديث:** 09 July 2026
**الإصدار:** 1.0.0
