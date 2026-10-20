# 🔧 دليل التثبيت - SiteVerify

**شرح تفصيلي لتثبيت وتشغيل SiteVerify**

---

## ✅ الخطوة 1: تثبيت Python

### Windows:
```
1. اذهب: python.org
2. Download Python 3.9+
3. شغل الملف
4. اختر: Add Python to PATH
5. اضغط: Install
```

### Mac:
```bash
# استخدم Homebrew:
brew install python3
```

### Linux:
```bash
sudo apt-get install python3 python3-pip
```

---

## ✅ الخطوة 2: نسخ المشروع

```bash
# إنشاء مجلد للمشروع
mkdir siteverify
cd siteverify

# نسخ الملفات الموجودة
# ضع كل الملفات HTML و CSS و JS في مجلد frontend/
```

---

## ✅ الخطوة 3: إنشاء Virtual Environment

```bash
# إنشاء
python -m venv venv

# تفعيل (Windows)
venv\Scripts\activate

# تفعيل (Mac/Linux)
source venv/bin/activate
```

**النتيجة:**
```
(venv) $
```

---

## ✅ الخطوة 4: تثبيت المكتبات

```bash
# تثبيت المكتبات
pip install -r requirements.txt

# التحقق:
pip list
```

---

## ✅ الخطوة 5: إعداد .env

```bash
# إنشاء ملف .env
cp .env.example .env

# فتح وتعديل:
# Windows: notepad .env
# Mac/Linux: nano .env
```

**أضف:**
```
ANTHROPIC_API_KEY=sk-ant-xxxxxx
FLASK_ENV=production
DEBUG=False
```

---

## ✅ الخطوة 6: تشغيل Backend

```bash
# من مجلد backend
python app.py
```

**ستشوف:**
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

---

## ✅ الخطوة 7: تشغيل Frontend

```bash
# من مجلد frontend (في terminal جديد)
python -m http.server 8000
```

**ستشوف:**
```
Serving HTTP on 0.0.0.0 port 8000
```

---

## ✅ الخطوة 8: فتح الموقع

```
اذهب: http://localhost:8000
```

---

## 🧪 اختبر الموقع

```bash
# اختبر الـ Health endpoint
curl http://localhost:5000/api/health

# النتيجة:
{
  "status": "healthy",
  "timestamp": "2026-07-09T12:00:00"
}
```

---

## 🔌 ربط الـ Frontend بـ Backend

### في script.js، أضف:

```javascript
const API_URL = 'http://localhost:5000';

async function evaluateExpert(answers) {
    const response = await fetch(`${API_URL}/api/evaluate-expert`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({answers: answers})
    });
    return await response.json();
}

async function analyzeWebsite(url) {
    const response = await fetch(`${API_URL}/api/analyze-website`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url: url})
    });
    return await response.json();
}
```

---

## 🌐 النشر على الإنترنت

### استخدام Heroku:

```bash
# 1. التسجيل على heroku.com
# 2. تثبيت Heroku CLI
# 3. تسجيل الدخول:
heroku login

# 4. إنشاء تطبيق:
heroku create siteverify-app

# 5. إضافة environment variables:
heroku config:set ANTHROPIC_API_KEY=sk-ant-xxxxx

# 6. النشر:
git push heroku main
```

### استخدام PythonAnywhere:

```bash
# 1. اذهب pythonanywhere.com
# 2. أنشئ حساب
# 3. Upload الملفات
# 4. أضف Configuration
# 5. اضغط Run
```

---

## ❌ حل المشاكل

### المشكلة: "ModuleNotFoundError: No module named 'anthropic'"

```bash
# الحل:
pip install anthropic
```

### المشكلة: "Address already in use"

```bash
# الحل (غير الـ port):
python app.py --port 5001
```

### المشكلة: CORS Error

```bash
# تأكد من وجود:
from flask_cors import CORS
CORS(app)
```

---

## 📝 Checklist للتثبيت

- [ ] Python 3.9+ مثبت
- [ ] Virtual environment مفعّل
- [ ] المكتبات مثبتة (pip install -r requirements.txt)
- [ ] .env معد بـ API Key
- [ ] Backend يشتغل (http://localhost:5000)
- [ ] Frontend يشتغل (http://localhost:8000)
- [ ] curl health check نجح
- [ ] الموقع يفتح في المتصفح

---

## 🎉 تمام!

الآن المشروع شغال تماماً!

**الخطوة الجاية:**
1. اختبر الاستخبارات
2. اختبر الدفع
3. اختبر تحليل الموقع
4. انشر على الإنترنت

---

**تحتاج مساعدة؟ اسأل!** 💬
