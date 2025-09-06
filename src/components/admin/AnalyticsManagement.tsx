import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Package, MessageSquare, Mail, MessageCircle, TrendingUp } from 'lucide-react';

export const AnalyticsManagement: React.FC = () => {
  const { language } = useLanguage();
  const { products, reviews, messages, comments } = useStore();

  const text = {
    ar: {
      title: 'لوحة الإحصائيات',
      description: 'تحليل وإحصائيات موقع الويب',
      totalProducts: 'إجمالي المنتجات',
      totalReviews: 'إجمالي التقييمات',
      totalMessages: 'إجمالي الرسائل',
      totalComments: 'إجمالي التعليقات',
      unreadMessages: 'رسائل غير مقروءة'
    },
    en: {
      title: 'Analytics Dashboard',
      description: 'Website analytics and statistics',
      totalProducts: 'Total Products',
      totalReviews: 'Total Reviews',
      totalMessages: 'Total Messages',
      totalComments: 'Total Comments',
      unreadMessages: 'Unread Messages'
    }
  };

  const unreadMessagesCount = messages.filter(msg => !msg.read).length;
  
  const stats = [
    {
      title: text[language].totalProducts,
      value: products.length,
      icon: Package,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: text[language].totalReviews,
      value: reviews.length,
      icon: MessageSquare,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      title: text[language].totalMessages,
      value: messages.length,
      icon: Mail,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
      title: text[language].totalComments,
      value: comments.length,
      icon: MessageCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    },
    {
      title: text[language].unreadMessages,
      value: unreadMessagesCount,
      icon: Mail,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{text[language].title}</h1>
        <p className="text-muted-foreground">{text[language].description}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-muted-foreground">
                  في الوقت الحالي
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};