import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const scrollToAdminLogin = () => {
    const element = document.getElementById('admin-login');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <h3 className="text-xl font-display font-bold">
                {t('hero.title')}
              </h3>
            </div>
            <p className="text-background/80 leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-background/10 text-background hover:text-primary transition-colors"
                  onClick={() => window.open(social.href, '_blank')}
                >
                  <social.icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.Quick')}</h4>
            <div className="space-y-2">
              <button 
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('nav.products')}
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('nav.FAQ')}
              </button>
              <button 
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('nav.reviews')}
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.service')}</h4>
            <div className="space-y-2">
              <a 
                href="/privacy-policy"
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('footer.privacy')}
              </a>
              <a 
                href="/terms-conditions"
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('footer.terms')}
              </a>
              <button 
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('nav.FAQ')}
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-background/80 hover:text-background transition-colors"
              >
                {t('footer.policy')}
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('nav.contact')}</h4>
            <p className="text-background/80 text-sm">
              اشترك للحصول على أحدث العروض والمنتجات الجديدة
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button variant="secondary" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/80 text-sm">
              © 2025 ZIZO PHONE - Designing by ASK-Abdalrhman. {t('footer.rights')}
            </p>
            <p className="text-background/80 text-sm">
              {t('footer.social')}
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;