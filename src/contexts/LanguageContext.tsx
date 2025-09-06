import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'لوحة التحكم',
    'nav.FAQ': 'الاسئلة الشائعة',
    'nav.reviews': 'التقييمات',
    
    // Hero Section
    'hero.title': 'ZIZO PHONE',
    'hero.subtitle': 'خدمات صيانة وبيع وشراء أجهزة المحمول والساعات والسماعات والإكسسوارات.',
    'hero.cta.shop': 'تسوق الآن',
    'hero.cta.discover': 'اكتشف خدماتنا',
    'hero.features.organic': 'صيانة احترافية',
    'hero.features.natural': 'أجهزة أصلية',
    'hero.features.eco': 'إكسسوارات متنوعة',
    'hero.features.handmade': 'ضمان وجودة',
    'hero.description':"اكتشف خدمات صيانة احترافية للموبايلات مع بيع وشراء الأجهزة والساعات والسماعات، بالإضافة إلى مجموعة متنوعة من الإكسسوارات.",

    //Floating
    'Floating.natural':'صيانة احترافية',
    'Floating.Organic':'أجهزة أصلية',
    'Floating.Handmade':'إكسسوارات متنوعة',
    'Floating.extreme':'جودة عالية وضمان',

    
    // Products
    'products.title': 'منتجاتنا وخدماتنا',
    'products.subtitle': "خدمات صيانة احترافية للمحمول مع بيع وشراء الهواتف والساعات والسماعات والإكسسوارات",
    'products.quickView': 'عرض سريع',
    'products.addToCart': 'طلب',
    'products.addToFavorites': 'أضف للمفضلة',
    'products.contactWhatsApp': 'واتساب',
    'products.sendMessage': 'أرسل رسالة',
    'products.viewDetails': 'عرض التفاصيل',
    'products.closeModal': 'إغلاق',
    'products.price': 'السعر',
    'products.originalPrice': 'السعر الأصلي',
    'products.discount': 'خصم',
    'products.new': 'جديد',
    'products.bestSeller': 'الأكثر طلباً',
    'products.organic': 'أصلي',
    
    // Features
    'features.title': 'لماذا تختارنا؟',
    'features.subtitle': 'نحن نقدم أفضل خدمات الصيانة والبيع والشراء بأعلى جودة',
    'features.natural.title': 'صيانة احترافية',
    'features.natural.desc': 'نقدم خدمات صيانة لجميع أنواع الموبايلات والساعات والسماعات',
    'features.handmade.title': 'بيع وشراء',
    'features.handmade.desc': 'بيع وشراء الهواتف والساعات والسماعات بأسعار مميزة',
    'features.crueltyFree.title': 'ضمان وجودة',
    'features.crueltyFree.desc': 'ضمان على خدماتنا ومنتجاتنا الأصلية',
    'features.eco.title': 'إكسسوارات متنوعة',
    'features.eco.desc': 'مجموعة كبيرة من إكسسوارات الهواتف والساعات والسماعات',
    'features.custom.title': 'خدمات مخصصة',
    'features.custom.desc': 'حلول مخصصة حسب احتياجات جهازك',
    
    // About
    'about.title': 'من نحن',
    'about.subtitle': 'خبراء في صيانة وبيع وشراء أجهزة المحمول والإكسسوارات',
    'about.content': 'نحن متجر متخصص في صيانة وبيع وشراء أجهزة المحمول، الساعات، والسماعات. نقدم أفضل الخدمات والمنتجات الأصلية لنضمن لك الجودة والثقة. هدفنا هو تلبية جميع احتياجاتك المتعلقة بأجهزة الاتصال والإكسسوارات.',

    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'نحن هنا للإجابة على جميع استفساراتك',
    'contact.whatsapp': 'تواصل عبر واتساب',
    'contact.whatsapp.desc': 'تواصل معنا مباشرة عبر الواتساب للحصول على رد سريع',
    'contact.form.name': 'الاسم',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.message': 'رقم الهاتف للتواصل والرسالة',
    'contact.form.send': ' إرسال الرسالة ',
    'contact.form.success': 'تم إرسال رسالتك بنجاح',
    
    // Footer
    'footer.privacy': 'سياسة الخصوصية',
    'footer.Quick': 'روابط سريعة',
    'footer.service': 'خدمة العملاء',
    'footer.terms': 'الشروط والأحكام',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.social': 'تابعنا على وسائل التواصل',
    'footer.policy': 'سياسة الشحن والإرجاع',
    'footer.desc': 'متخصصون في صيانة وبيع وشراء الهواتف والساعات والسماعات والإكسسوارات مع ضمان وجودة عالية.',

    
    // Theme
    'theme.toggle': 'تبديل الوضع',
    'theme.light': 'الوضع النهاري',
    'theme.dark': 'الوضع الليلي',
    
    // Language
    'language.toggle': 'تغيير اللغة',
    'language.arabic': 'العربية',
    'language.english': 'English',
    
    // Admin
    'admin.login': 'تسجيل دخول المدير',
    'admin.username': 'اسم المستخدم',
    'admin.password': 'كلمة المرور',
    'admin.login.button': 'دخول',
    'admin.dashboard': 'لوحة التحكم',
    'admin.logout': 'تسجيل خروج',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.FAQ': 'FAQ',
    'nav.reviews': 'Reviews',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'ZIZO PHONE',
    'hero.subtitle': "Professional repair, buying, and selling of smartphones, watches, headsets, and accessories.",
    'hero.cta.shop': 'Shop Now',
    'hero.cta.discover': 'Discover Services',
    'hero.features.organic': 'Expert Repairs',
    'hero.features.natural': 'Original Devices',
    'hero.features.eco': 'Wide Accessories',
    'hero.features.handmade': 'Warranty & Quality',
    'hero.description':"Discover professional repair services, buy and sell smartphones, watches, headsets, and explore a wide variety of accessories.",

    //Floating
    'Floating.natural':'Expert Repairs',
    'Floating.Organic':'Original Devices',
    'Floating.Handmade':'Accessories Variety',
    'Floating.extreme':'High Quality & Warranty',
    
    // Products
    'products.title': 'Our Products & Services',
    'products.subtitle': 'Professional mobile repair services and buying/selling smartphones, watches, headsets, and accessories',
    'products.quickView': 'Quick View',
    'products.addToCart': 'Request',
    'products.addToFavorites': 'Add to Favorites',
    'products.contactWhatsApp': 'WhatsApp',
    'products.sendMessage': 'Send Message',
    'products.viewDetails': 'View Details',
    'products.closeModal': 'Close',
    'products.price': 'Price',
    'products.originalPrice': 'Original Price',
    'products.discount': 'Discount',
    'products.new': 'New',
    'products.bestSeller': 'Best Seller',
    'products.organic': 'Original',
    
    // Features
    'features.title': 'Why Choose Us?',
    'features.subtitle': 'We provide the best repair and trade services with high quality',
    'features.natural.title': 'Professional Repairs',
    'features.natural.desc': 'We offer repair services for all types of mobiles, watches, and headsets',
    'features.handmade.title': 'Buy & Sell',
    'features.handmade.desc': 'Trade-in smartphones, watches, and headsets with great deals',
    'features.crueltyFree.title': 'Warranty & Quality',
    'features.crueltyFree.desc': 'All services and products come with warranty and guaranteed originality',
    'features.eco.title': 'Accessories Variety',
    'features.eco.desc': 'A wide collection of mobile, watch, and headset accessories',
    'features.custom.title': 'Custom Services',
    'features.custom.desc': 'Tailored solutions for your device needs',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Experts in mobile repair, trade, and accessories',
    'about.content': 'We are a store specialized in mobile repair, buying, and selling devices, watches, and headsets. We provide original products and high-quality services to ensure customer trust and satisfaction.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to answer all your inquiries',
    'contact.whatsapp': 'Contact via WhatsApp',
    'contact.whatsapp.desc': 'Reach us directly on WhatsApp for a quick response',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Phone number and your message',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Your message has been sent successfully',
    
    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.Quick': 'Quick links',
    'footer.service': 'Customer service',
    'footer.terms': 'Terms & Conditions',
    'footer.rights': 'All rights reserved',
    'footer.social': 'Follow us on social media',
    'footer.policy': 'Shipping and returns policy',
    'footer.desc': 'We specialize in repairing, buying, and selling smartphones, watches, headsets, and accessories with warranty and quality assurance.',

    
    // Theme
    'theme.toggle': 'Toggle Theme',
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    
    // Language
    'language.toggle': 'Change Language',
    'language.arabic': 'العربية',
    'language.english': 'English',
    
    // Admin
    'admin.login': 'Admin Login',
    'admin.username': 'Username',
    'admin.password': 'Password',
    'admin.login.button': 'Login',
    'admin.dashboard': 'Dashboard',
    'admin.logout': 'Logout',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction and class
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.className = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      setLanguage('ar'); // Default to Arabic
    }
  }, []);

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
