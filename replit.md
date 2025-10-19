# موقع العقارات المميزة

## نظرة عامة
موقع عقارات تفاعلي باللغة العربية مبني بتقنيات HTML, CSS, JavaScript مع Firebase كقاعدة بيانات. الموقع يتضمن لوحة تحكم إدارية كاملة ومُعد للنشر على Netlify.

## التقنيات المستخدمة
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Database: Firebase Firestore
- Fonts: Google Fonts (Tajawal)
- Hosting: Netlify (Static Site)

## الميزات الرئيسية
1. صفحات متعددة: الرئيسية، العقارات، المشاريع، المدونة، من نحن، اتصل بنا
2. نظام بحث وفلترة للعقارات
3. صفحات تفصيلية ديناميكية لكل عقار ومشروع ومقالة
4. لوحة تحكم إدارية محمية بكلمة مرور
5. نظام CRUD كامل لإدارة: العقارات، المشاريع، المقالات
6. نموذج اتصال يحفظ الرسائل في Firebase
7. تصميم RTL متجاوب 100%

## هيكل المشروع
```
├── index.html              # الصفحة الرئيسية
├── pages/                  # جميع الصفحات
├── admin/                  # لوحة التحكم
├── css/                    # ملفات التنسيق
├── js/                     # ملفات JavaScript
├── netlify.toml           # إعدادات النشر
└── README.md              # التوثيق
```

## Firebase Configuration
الموقع متصل بـ Firebase باستخدام الإعدادات المقدمة من المستخدم.

Collections في Firestore:
- `properties`: العقارات
- `projects`: المشاريع
- `blog`: المقالات
- `contacts`: رسائل التواصل

## لوحة التحكم
- URL: `/admin/login.html`
- Username: admin
- Password: admin123

## آخر التحديثات
- 2024-10-13: إنشاء المشروع الكامل بجميع الصفحات ولوحة التحكم
- التصميم متجاوب بالكامل
- Firebase مُعد ومتصل
- جاهز للنشر على Netlify

## ملاحظات مهمة
- الصور تُدار عبر روابط مباشرة (URLs)
- نظام المصادقة بسيط (sessionStorage) - مناسب للتطوير فقط
- للإنتاج: يجب تفعيل Firebase Authentication (راجع DEPLOYMENT_GUIDE.md)
- قواعد Firestore موجودة في ملف firestore.rules

## الملفات المهمة
- `README.md` - توثيق شامل للمشروع
- `DEPLOYMENT_GUIDE.md` - دليل النشر والإعداد الكامل
- `firestore.rules` - قواعد أمان Firebase
- `netlify.toml` - إعدادات Netlify

## الأمان
⚠️ النظام الحالي مناسب للتطوير والتجربة. للإنتاج:
1. فعّل Firebase Authentication
2. طبّق قواعد Firestore الآمنة
3. غيّر بيانات تسجيل الدخول
