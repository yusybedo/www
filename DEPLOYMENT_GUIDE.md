# دليل النشر والإعداد

## 1. إعداد Firebase

### الخطوة 1: إعداد قواعد Firestore
1. افتح Firebase Console
2. اذهب إلى Firestore Database
3. اضغط على "Rules"
4. انسخ المحتوى من ملف `firestore.rules`
5. انشر القواعد

### الخطوة 2: إعداد Firebase للإنتاج (اختياري - للأمان المحسّن)
لتفعيل المصادقة الآمنة:

1. فعّل Firebase Authentication:
   - اذهب إلى Authentication في Firebase Console
   - فعّل طريقة "Email/Password"
   - أضف مستخدم admin

2. حدّث قواعد Firestore:
```
allow write: if request.auth != null;
```

3. حدّث كود تسجيل الدخول في `js/admin-login.js` لاستخدام Firebase Auth

### البيانات التجريبية الأولية
لاختبار الموقع، أضف بيانات تجريبية في Firestore:

**Collection: properties**
```json
{
  "title": "شقة فاخرة في الرياض",
  "description": "شقة حديثة بتصميم عصري",
  "price": "500000",
  "type": "شقة",
  "area": "150",
  "rooms": "3",
  "bathrooms": "2",
  "location": "الرياض",
  "imageUrl": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "featured": true,
  "createdAt": [timestamp]
}
```

**Collection: projects**
```json
{
  "title": "مشروع الأبراج السكنية",
  "description": "مشروع سكني متكامل",
  "budget": "50 مليون ريال",
  "status": "قيد التنفيذ",
  "location": "جدة",
  "startDate": "2024-01-01",
  "completionDate": "2025-12-31",
  "units": "200",
  "imageUrl": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
  "featured": true,
  "createdAt": [timestamp]
}
```

**Collection: blog**
```json
{
  "title": "نصائح لشراء عقار مناسب",
  "content": "محتوى المقالة هنا...",
  "excerpt": "نصائح مهمة للمشترين الجدد",
  "author": "فريق العقارات",
  "imageUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  "createdAt": [timestamp]
}
```

## 2. النشر على Netlify

### الطريقة 1: عبر GitHub
1. ارفع المشروع على GitHub
2. اذهب إلى Netlify.com
3. اضغط "New site from Git"
4. اختر المستودع
5. اضغط "Deploy site"

### الطريقة 2: عبر Netlify CLI
```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# النشر
netlify deploy --prod
```

### الطريقة 3: السحب والإفلات (Drag & Drop)
1. اذهب إلى Netlify.com
2. اسحب مجلد المشروع كاملاً إلى منطقة "Drop"
3. انتظر اكتمال النشر

## 3. معلومات لوحة التحكم

### تسجيل الدخول (الإعداد الحالي)
- URL: `https://your-site.netlify.app/admin/login.html`
- Username: `admin`
- Password: `admin123`

**⚠️ مهم للإنتاج:**
- غيّر كلمة المرور في ملف `js/admin-login.js`
- أو استخدم Firebase Authentication للأمان الكامل

## 4. التخصيص

### تغيير المعلومات الأساسية
في جميع الملفات HTML، ابحث عن:
- "العقارات المميزة" - غيرها لاسم شركتك
- "info@realestate.com" - غيرها لبريدك
- "+966 XX XXX XXXX" - غيرها لرقم هاتفك

### تغيير الألوان
في ملف `css/style.css`:
```css
:root {
    --primary-color: #2c3e50;      /* اللون الأساسي */
    --secondary-color: #3498db;    /* اللون الثانوي */
    --accent-color: #e74c3c;       /* لون التمييز */
}
```

## 5. نصائح الأداء

1. **تحسين الصور**: 
   - استخدم صور بصيغة WebP
   - قلل حجم الصور قبل الرفع
   - استخدم CDN للصور (مثل Cloudinary)

2. **Firebase Caching**:
   - استخدم Firebase Hosting مع Firestore للأداء الأفضل

3. **Netlify Optimization**:
   - فعّل Asset Optimization في إعدادات Netlify
   - استخدم Netlify Forms لنموذج الاتصال

## 6. الدعم والصيانة

### إضافة ميزات جديدة
راجع ملف `README.md` للتعرف على هيكل المشروع

### حل المشاكل الشائعة
1. **البيانات لا تظهر**: تأكد من إعدادات Firebase وقواعد Firestore
2. **لوحة التحكم لا تعمل**: تحقق من sessionStorage في المتصفح
3. **الصفحة فارغة**: افتح Console في المتصفح للتحقق من الأخطاء

## 7. الترقيات المستقبلية المقترحة

1. تكامل Firebase Authentication للأمان الكامل
2. إضافة نظام تحميل الصور مباشرة إلى Firebase Storage
3. تحسين SEO بإضافة meta tags ديناميكية
4. إضافة نظام تعليقات للعقارات
5. دمج خرائط Google Maps لمواقع العقارات
6. إضافة نظام إشعارات للرسائل الجديدة
7. تفعيل وضع الليل (Dark Mode)

---

للأسئلة والدعم: راجع ملف `README.md` أو افتح issue على GitHub
