import React from 'react';
import { Card, CardContent } from './ui/card';
import { Leaf, HandHeart, ShieldCheck, Recycle, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Leaf,
      title: t('features.natural.title'),
      description: t('features.natural.desc'),
      color: 'text-success'
    },
    {
      icon: HandHeart,
      title: t('features.handmade.title'),
      description: t('features.handmade.desc'),
      color: 'text-destructive'
    },
    {
      icon: ShieldCheck,
      title: t('features.crueltyFree.title'),
      description: t('features.crueltyFree.desc'),
      color: 'text-primary'
    },
    {
      icon: Recycle,
      title: t('features.eco.title'),
      description: t('features.eco.desc'),
      color: 'text-warning'
    },
    {
      icon: Palette,
      title: t('features.custom.title'),
      description: t('features.custom.desc'),
      color: 'text-accent-foreground'
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 animate-fade-in">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-gradient hover-lift transition-smooth shadow-card border-0 group animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-full bg-muted/50 mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-display font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;