# 🌍 دليل اللغات المتعددة - SiteVerify

**Multilingual Guide | Guide Multilingue**

---

## 📋 الملفات الجديدة

### 1. **translations.json**
- ملف يحتوي على جميع الترجمات
- دعم 3 لغات: العربية (ar) + الفرنسية (fr) + الإنجليزية (en)
- تنسيق JSON سهل التحديث

### 2. **i18n.js**
- مكتبة إدارة اللغات
- تبديل اللغات تلقائياً
- حفظ اللغة المختارة في localStorage
- تحديث اتجاه الصفحة (RTL للعربية)

### 3. **index-multilingual.html**
- الصفحة الرئيسية تدعم 3 لغات
- أزرار تبديل اللغة في الـ navbar
- استخدام data-i18n للترجمات التلقائية

---

## 🚀 كيفية الاستخدام

### الخطوة 1: أضف الملفات

```bash
# في مجلد frontend:
- translations.json
- i18n.js
- index-multilingual.html (أو أعد تسمية index.html)
```

### الخطوة 2: أضف المكتبة في كل HTML

**في رأس كل صفحة HTML:**

```html
<!-- قبل </head> -->
<link rel="stylesheet" href="styles.css">

<!-- قبل </body> -->
<script src="i18n.js"></script>
<script src="script.js"></script>
```

### الخطوة 3: استخدم data-i18n

**في أي عنصر تريد ترجمته:**

```html
<!-- للنصوص -->
<h1 data-i18n="hero_title">Audit your site easily</h1>

<!-- للأزرار -->
<button data-i18n="nav_login">Login</button>

<!-- للـ Placeholder -->
<input type="text" data-i18n="submit_url" placeholder="Website URL">
```

### الخطوة 4: أضف أزرار اللغة

```html
<div class="language-switcher">
    <button class="lang-btn" data-lang="ar">العربية</button>
    <button class="lang-btn" data-lang="fr">Français</button>
    <button class="lang-btn" data-lang="en">English</button>
</div>
```

---

## 📝 إضافة ترجمات جديدة

### في translations.json:

```json
{
  "ar": {
    "new_key": "قيمة عربية جديدة"
  },
  "fr": {
    "new_key": "valeur française nouvelle"
  },
  "en": {
    "new_key": "new English value"
  }
}
```

### في HTML:

```html
<div data-i18n="new_key">Default text</div>
```

---

## 🎯 الميزات

### ✅ تبديل اللغات الفوري:
```javascript
// تبديل اللغة برمجياً:
i18n.setLanguage('ar');
i18n.setLanguage('fr');
i18n.setLanguage('en');
```

### ✅ الحفظ التلقائي:
- اللغة المختارة توفظ في localStorage
- تتذكر اختيار المستخدم

### ✅ اتجاه النص (RTL/LTR):
```javascript
// العربية = RTL تلقائياً
// الفرنسية والإنجليزية = LTR
```

### ✅ تحديث ديناميكي:
- البحث عن جميع عناصر data-i18n
- تحديث تلقائي بدون reload

---

## 💻 أمثلة عملية

### مثال 1: صفحة تسجيل multilingual

```html
<form>
    <input type="text" data-i18n="signup_name" placeholder="Full Name">
    <input type="email" data-i18n="signup_email" placeholder="Email">
    <input type="password" data-i18n="signup_password" placeholder="Password">
    <button type="submit" data-i18n="signup_button">Create Account</button>
</form>
```

### مثال 2: لوحة تحكم multilingual

```html
<div class="dashboard">
    <h1 data-i18n="dashboard_welcome">Welcome</h1>
    <p data-i18n="dashboard_balance">Balance: $960</p>
    <button data-i18n="dashboard_new">New Project</button>
</div>
```

### مثال 3: تبديل اللغة برمجياً

```javascript
function changeLanguage(lang) {
    i18n.setLanguage(lang);
}

// الاستخدام:
// changeLanguage('ar');
// changeLanguage('fr');
// changeLanguage('en');
```

---

## 🔧 التخصيص

### تغيير اللغة الافتراضية:

**في i18n.js:**
```javascript
constructor() {
    this.currentLanguage = this.getStoredLanguage() || 'ar'; // غير إلى ar
    // ...
}
```

### إضافة لغة جديدة:

**1. في translations.json:**
```json
{
  "de": {
    "hero_title": "Überprüfen Sie Ihre Website ganz einfach"
    // ... باقي الترجمات
  }
}
```

**2. في i18n.js:**
```javascript
getLanguages() {
    return {
        ar: 'العربية',
        fr: 'Français',
        en: 'English',
        de: 'Deutsch'
    };
}
```

**3. في HTML:**
```html
<button class="lang-btn" data-lang="de">Deutsch</button>
```

---

## 🎨 Styling Language Switcher

```css
.language-switcher {
    display: flex;
    gap: 1rem;
}

.lang-btn {
    padding: 0.5rem 1rem;
    background: white;
    border: 2px solid #E5E7EB;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
}

.lang-btn:hover {
    border-color: var(--primary);
}

.lang-btn.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}
```

---

## 📊 قائمة الترجمات الحالية

```
✅ site_name - اسم الموقع
✅ nav_home - الرئيسية
✅ nav_features - المميزات
✅ nav_login - الدخول
✅ hero_title - عنوان البطل
✅ signup_* - حقول التسجيل
✅ login_* - حقول الدخول
✅ dashboard_* - لوحة التحكم
✅ submit_* - طلب التدقيق
✅ payment_* - الدفع
✅ report_* - التقرير
✅ footer_* - الـ footer

المجموع: +80 ترجمة
```

---

## 🐛 حل المشاكل

### المشكلة: الترجمات لا تظهر

```javascript
// تحقق من:
1. أن translations.json في نفس المجلد
2. أن i18n.js يحمل قبل script.js
3. أن الـ key موجود في translations.json
```

### المشكلة: اللغة العربية ما تظهر صح

```html
<!-- تأكد من -->
<html lang="ar" dir="rtl">
```

### المشكلة: البيانات المحفوظة غير صحيحة

```javascript
// امسح localStorage:
localStorage.removeItem('siteVerifyLanguage');
location.reload();
```

---

## 🚀 النشر

### عند النشر على الإنترنت:

1. تأكد من وضع `translations.json` و `i18n.js` في نفس مجلد الـ HTML
2. تأكد من الصلاحيات (permissions) صحيحة
3. اختبر جميع اللغات قبل النشر

---

## 📞 أمثلة كاملة

### صفحة signup كاملة:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <title>Sign Up - SiteVerify</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <form>
        <h1 data-i18n="signup_title">Create Account</h1>
        
        <input type="text" data-i18n="signup_name" placeholder="Full Name" required>
        <input type="email" data-i18n="signup_email" placeholder="Email" required>
        <input type="password" data-i18n="signup_password" placeholder="Password" required>
        <input type="password" data-i18n="signup_confirm" placeholder="Confirm Password" required>
        
        <select data-i18n="signup_type">
            <option data-i18n="signup_client">Client</option>
            <option data-i18n="signup_auditor">Auditor</option>
        </select>
        
        <button type="submit" data-i18n="signup_button">Create Account</button>
    </form>
    
    <script src="i18n.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

---

## ✨ الخلاصة

```
✅ 3 لغات جاهزة (العربية + الفرنسية + الإنجليزية)
✅ تبديل فوري بين اللغات
✅ حفظ تلقائي للاختيار
✅ RTL تلقائي للعربية
✅ سهل التحديث والإضافة
✅ بدون مكتبات خارجية
✅ جاهز للنشر
```

---

**آخر تحديث:** 10 July 2026
**الإصدار:** 2.0.0
**الحالة:** جاهز للاستخدام ✅
