import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsConditions: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'الشروط والأحكام',
      lastUpdated: 'آخر تحديث: يناير 2025',
      sections: [
        {
          title: 'قبول الشروط',
          content: 'باستخدامك لموقعنا الإلكتروني وخدماتنا، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يجب عليك عدم استخدام موقعنا.'
        },
        {
          title: 'استخدام الموقع',
          content: 'يجب عليك استخدام موقعنا للأغراض المشروعة فقط وبطريقة لا تنتهك حقوق الآخرين أو تقيد أو تمنع استخدامهم للموقع.'
        },
        {
          title: 'المنتجات والخدمات',
          content: 'جميع المنتجات والخدمات المعروضة على موقعنا تخضع للتوفر. نحتفظ بالحق في تعديل أو إيقاف أي منتج أو خدمة دون إشعار مسبق.'
        },
        {
          title: 'الأسعار والدفع',
          content: 'جميع الأسعار معروضة بالعملة المحلية وتشمل الضرائب المطبقة. نحتفظ بالحق في تغيير الأسعار في أي وقت دون إشعار مسبق.'
        },
        {
          title: 'الشحن والتسليم',
          content: 'سنبذل قصارى جهدنا لتسليم المنتجات في الأوقات المحددة، لكننا لا نضمن أوقات التسليم المحددة.'
        },
        {
          title: 'الإرجاع والاستبدال',
          content: 'يمكنك إرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام، شريطة أن تكون في حالتها الأصلية وغير مستخدمة.'
        },
        {
          title: 'المسؤولية',
          content: 'نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة قد تنتج عن استخدام موقعنا أو منتجاتنا.'
        },
        {
          title: 'تعديل الشروط',
          content: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. التعديلات ستصبح سارية فور نشرها على الموقع.'
        }
      ]
    },
    en: {
      title: 'Terms & Conditions',
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: 'By using our website and services, you agree to these terms and conditions. If you do not agree to any part of these terms, you must not use our website.'
        },
        {
          title: 'Use of the Website',
          content: 'You must use our website for lawful purposes only and in a way that does not infringe the rights of others or restrict or inhibit their use of the website.'
        },
        {
          title: 'Products and Services',
          content: 'All products and services displayed on our website are subject to availability. We reserve the right to modify or discontinue any product or service without prior notice.'
        },
        {
          title: 'Pricing and Payment',
          content: 'All prices are displayed in local currency and include applicable taxes. We reserve the right to change prices at any time without prior notice.'
        },
        {
          title: 'Shipping and Delivery',
          content: 'We will make every effort to deliver products within the specified timeframes, but we do not guarantee specific delivery times.'
        },
        {
          title: 'Returns and Exchanges',
          content: 'You may return products within 14 days of receipt, provided they are in their original condition and unused.'
        },
        {
          title: 'Liability',
          content: 'We are not liable for any direct or indirect damages that may result from the use of our website or products.'
        },
        {
          title: 'Modification of Terms',
          content: 'We reserve the right to modify these terms at any time. Changes will become effective immediately upon posting on the website.'
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

export default TermsConditions;