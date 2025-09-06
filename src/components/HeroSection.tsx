import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
// import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { Leaf, Heart, Shield, Star, Package, MessageCircle, Users } from 'lucide-react';
import heroImage from '../assets/herobackground.jpg';

const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { products, comments, reviews } = useStore();

  const [views, setViews] = useState(0);

  useEffect(() => {
    const storedViews = localStorage.getItem("views");
    if (storedViews) {
      setViews(Number(storedViews));
    } else {
      // محاكاة عدد الزيارات
      const simulatedViews = 123;
      setViews(simulatedViews);
      localStorage.setItem("views", simulatedViews.toString());
    }
  }, []);




  const stats = [
    {
      icon: Package,
      value: products.length,
      label: language === 'ar' ? 'منتج طبيعي' : 'Natural Products'
    },
    {
      icon: MessageCircle,
      value: comments.length + reviews.length,
      label: language === 'ar' ? 'تعليق إيجابي' : 'Positive Reviews'
    },
    {
      icon: Users,
      value: views + 200, 
      label: language === 'ar' ? 'عميل راضي' : 'Happy Customers'
    },
    {
      icon: Star,
      value: '4.9',
      label: language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'
    }
  ];

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };


  const [align, setAlign] = useState<'start' | 'center' | 'end'>('start');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1024) {
        setAlign('center');
      } else if (width > 1024) {
        setAlign('start');
      }
    };

    handleResize(); // أول تشغيل
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className="mt-[-90px] relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-50 to-cream-50 dark:from-sage-950 dark:to-cream-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Natural skincare products"
          className="w-full h-full object-cover dark:opacity-40 opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sage-100/80 to-cream-100/80 dark:from-sage-900/80 dark:to-cream-900/80"></div>
      </div>
        

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-sage-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-cream-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 z-10 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center ">
          {/* Content Side */}
          <div className="space-y-8 animate-fade-in" style={{ textAlign: align }}>
            {/* Brand Badge */}
            {/* <Badge className="bg-sage-100 text-sage-800 dark:bg-sage-800 dark:text-sage-100 border-sage-200 dark:border-sage-700 px-4 py-2 text-sm font-medium animate-slide-up mt-[150px] lg:mt-[0px]">
              <Leaf className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </Badge> */}
            <div
              className="mb-[-20px]  mt-[150px] lg:mt-[0px] relative w-[300px] p-3 mx-auto sm:mx-auto lg:mx-0
                        text-primary-foreground
                        bg-gradient-to-r from-primary via-primary/50 to-primary
                        [clip-path:polygon(8%_0%,92%_0%,100%_20%,100%_70%,92%_100%,8%_100%,0%_70%,0%_20%)] "
              >
              <p className="text-center text-lg font-semibold tracking-wide">
                the pest of broducts
              </p>
            </div>


            {/* Main Headline */}
            <div className="space-y-4">
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-tight animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                <span
                  className="bg-gradient-to-r 
                    from-pink-500 via-orange-500 via-yellow-400 via-green-500 
                    via-teal-400 via-cyan-400 via-blue-400 via-indigo-500 
                    via-purple-500 via-pink-500 via-fuchsia-500 via-rose-500 
                    via-amber-500 via-lime-400 via-emerald-500 via-sky-400 
                    via-violet-500 via-slate-400 via-gray-400 
                    to-blue-600
                    bg-clip-text text-transparent animate-gradient
                    text-7xl md:text-8xl lg:text-9xl"
                  >
                  ZIZO
                </span>{" "}
                <span className="text-white dark:text-primary">PHONE</span>
              </h1>


              {/* <div className="text-2xl md:text-3xl text-sage-600 dark:text-sage-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                {t('hero.subtitle')}
              </div> */}
            </div>

            {/* Description */}
            <p className="text-xl text-white leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              {t('hero.description')}
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <Leaf className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">{t('hero.features.natural')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <Heart className="w-5 h-5 text-destructive" />
                <span className="text-sm font-medium">{t('hero.features.handmade')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{t('hero.features.eco')}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '1s' }}>
              <Button 
                size="lg" 
                className="button-gradient text-white hover-for-button shadow-lg px-8 py-6 text-lg font-semibold [clip-path:polygon(8%_0%,92%_0%,100%_20%,100%_70%,92%_100%,8%_100%,0%_70%,0%_20%)]"
                onClick={scrollToProducts}
              >
                {t('hero.cta.shop')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-sage-300 hover:text-primary hover:bg-sage-90 dark:border-sage-600 dark:hover:bg-sage-900 hover-for-button px-8 py-6 text-lg font-semibold "
                onClick={scrollToContact}
              >
                {t('hero.cta.discover')}
              </Button>
            </div>

            {/* Statistics */}
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 animate-slide-up" style={{ animationDelay: '1.2s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="hover-for-button flex items-center justify-center mb-2">
                    <div className="p-3 rounded-full bg-primary/10">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Image Side */}
          <div className="relative animate-fade-in mb-[150px]" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              {/* Main Product Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover-lift">
                <img
                  src={"https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/4400ba134570133.61d810c6bb3d8.jpg"}
                  alt="Natural skincare products"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Product Cards */}
              <div className="absolute mr-2 -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl hover-lift animate-bounce" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sage-100 dark:bg-sage-800 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-sage-600 dark:text-sage-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t('Floating.natural')} 100%</div>
                    <div className="text-xs text-muted-foreground">{t('Floating.Organic')}</div>
                  </div>
                </div>
              </div>

              <div className="absolute ml-2 -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl hover-lift animate-bounce" style={{ animationDelay: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream-100 dark:bg-cream-800 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-cream-600 dark:text-cream-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t('Floating.Handmade')}</div>
                    <div className="text-xs text-muted-foreground">{t('Floating.extreme')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-sage-100/30 to-cream-100/30 dark:from-sage-800/30 dark:to-cream-800/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce ">
        <div className="w-6 h-10 border-2 border-sage-400 dark:border-sage-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
