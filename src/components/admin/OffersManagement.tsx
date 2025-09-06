import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from 'lucide-react';

export const OffersManagement: React.FC = () => {
  const { language } = useLanguage();

  const text = {
    ar: {
      title: 'إدارة العروض',
      description: 'إنشاء وتعديل العروض والخصومات',
      comingSoon: 'هذا القسم قيد التطوير'
    },
    en: {
      title: 'Offers Management',
      description: 'Create and manage offers and discounts',
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
        <Tag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">{text[language].comingSoon}</p>
      </Card>
    </div>
  );
};