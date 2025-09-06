import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث: يناير 2025',
      sections: [
        {
          title: 'المعلومات التي نجمعها',
          content: 'نحن نجمع المعلومات التي تقدمها لنا مباشرة، مثل عندما تقوم بإنشاء حساب، أو إجراء عملية شراء، أو الاتصال بنا. قد تشمل هذه المعلومات اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وعنوان الشحن ومعلومات الدفع.'
        },
        {
          title: 'كيف نستخدم معلوماتك',
          content: 'نستخدم المعلومات التي نجمعها لتوفير وتحسين خدماتنا، ومعالجة المعاملات، وإرسال التحديثات والعروض، والرد على استفساراتك، وضمان أمان موقعنا الإلكتروني.'
        },
        {
          title: 'مشاركة المعلومات',
          content: 'نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا كما هو موضح في هذه السياسة أو بموافقتك الصريحة.'
        },
        {
          title: 'أمان البيانات',
          content: 'نحن نتخذ تدابير أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.'
        },
        {
          title: 'حقوقك',
          content: 'لديك الحق في الوصول إلى معلوماتك الشخصية وتحديثها وحذفها. يمكنك أيضاً اختيار عدم تلقي رسائل البريد الإلكتروني التسويقية منا.'
        },
        {
          title: 'اتصل بنا',
          content: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر معلومات الاتصال المتوفرة على موقعنا.'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          title: 'Information We Collect',
          content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This information may include your name, email address, phone number, shipping address, and payment information.'
        },
        {
          title: 'How We Use Your Information',
          content: 'We use the information we collect to provide and improve our services, process transactions, send updates and offers, respond to your inquiries, and ensure the security of our website.'
        },
        {
          title: 'Information Sharing',
          content: 'We do not sell, rent, or share your personal information with third parties except as described in this policy or with your explicit consent.'
        },
        {
          title: 'Data Security',
          content: 'We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          title: 'Your Rights',
          content: 'You have the right to access, update, and delete your personal information. You can also choose to opt out of receiving marketing emails from us.'
        },
        {
          title: 'Contact Us',
          content: 'If you have any questions about this Privacy Policy, please contact us using the contact information available on our website.'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {content[language].title}
            </h1>
            <p className="text-muted-foreground">{content[language].lastUpdated}</p>
          </div>

          <div className="space-y-8">
            {content[language].sections.map((section, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;