import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const BlogManagement: React.FC = () => {
  const { language } = useLanguage();

  const text = {
    ar: {
      title: 'إدارة المدونة',
      description: 'إضافة وتعديل مقالات المدونة والنصائح',
      comingSoon: 'هذا القسم قيد التطوير'
    },
    en: {
      title: 'Blog Management',
      description: 'Add and edit blog articles and tips',
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
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">{text[language].comingSoon}</p>
      </Card>
    </div>
  );
};