import React from 'react';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slide-up ">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-primary mb-6 font-medium">
              {t('about.subtitle')}
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              {t('about.content')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">جوده عاليه</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">عميل سعيد</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10</div>
                <div className="text-sm text-muted-foreground">سنوات خبرة</div>
              </div>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="animate-fade-in">
            <Card className="card-gradient shadow-card border-0 overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="aspect-square flex items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: "url('https://thumbs.dreamstime.com/b/ai-plasma-chip-sets-new-standard-computing-its-state-art-based-architecture-pushes-boundaries-performance-293882047.jpg" }}
                >
                  <div className="text-center text-white p-8 bg-black/40 w-full h-full flex flex-col items-center justify-center">
                    {/* <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <span className="text-3xl">📱</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4">
                      رؤيتنا
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      نسعى لأن نكون الخيار الأول في عالم الهواتف الذكية بالمنطقة،
                      ونحرص على تقديم أحدث الأجهزة والإكسسوارات بأعلى جودة لتبقى دائمًا متصلاً بالعالم.
                    </p> */}
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;