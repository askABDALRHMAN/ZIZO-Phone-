import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

export const FeaturesManagement: React.FC = () => {
  const { language } = useLanguage();

  const text = {
    ar: {
      title: 'إدارة المميزات',
      description: 'إضافة وتعديل مميزات العلامة التجارية',
      comingSoon: 'هذا القسم قيد التطوير'
    },
    en: {
      title: 'Features Management',
      description: 'Add and edit brand features',
      comingSoon: 'This section is under development'
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{text[language].title}</h1>
        <p className="text-muted-foreground">{text[language].description}</p>
      </div>

      <Card className="p-12 text-center">
        <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">{text[language].comingSoon}</p>
      </Card>
    </div>
  );
};