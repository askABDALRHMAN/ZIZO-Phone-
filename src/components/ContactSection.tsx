import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from './ContactForm';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('مرحباً، أريد الاستفسار عن منتجاتكم');
    const whatsappUrl = `https://wa.me/201000531268?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'الهاتف',
      value: '+20 1000531268',
      action: () => window.open('tel:+201000531268')
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      value: 'az6282@gmail.com',
      action: () => window.open('mailto:az6282@gmail.com')
    },
    {
      icon: MapPin,
      title: 'الموقع',
      value: 'المنصوره - مصر',
      action: () => {}
    }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 animate-fade-in">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            {/* WhatsApp CTA */}
            <Card className="card-gradient shadow-card border-0 hover-lift transition-smooth">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-success" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-center mb-4">
                  {t('contact.whatsapp')}
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  تواصل معنا مباشرة عبر الواتساب للحصول على رد سريع
                </p>
                <Button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-success hover:bg-success/90 text-white hover-lift"
                >
                  <MessageCircle className="ml-1 w-4 h-4 mr-2" />
                  فتح الواتساب
                </Button>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="card-gradient shadow-card border-0 hover-lift transition-smooth cursor-pointer"
                  onClick={info.action}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 ml-3 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.title}</h4>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up">
            <Card className="card-gradient shadow-card border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                  أرسل لنا رسالة
                </h3>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;