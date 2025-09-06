import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Tag, MessageSquare, Mail, Users, TrendingUp, MessageCircle } from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const { language } = useLanguage();
  const { products, reviews, messages, comments } = useStore();

  const text = {
    ar: {
      welcomeTitle: 'مرحباً بك في لوحة التحكم',
      welcomeDescription: 'إدارة شاملة لموقع منتجات العناية الطبيعية',
      totalProducts: 'إجمالي المنتجات',
      totalReviews: 'إجمالي المراجعات',
      totalMessages: 'إجمالي الرسائل',
      unreadMessages: 'رسائل غير مقروءة',
      totalComments: 'إجمالي التعليقات',
      recentActivity: 'النشاط الأخير',
      noActivity: 'لا توجد أنشطة حديثة',
      products: 'منتج',
      reviews: 'مراجعة',
      messages: 'رسالة',
      users: 'مستخدم',
      offers: 'عرض'
    },
    en: {
      welcomeTitle: 'Welcome to Admin Dashboard',
      welcomeDescription: 'Comprehensive management for natural care products website',
      totalProducts: 'Total Products',
      totalReviews: 'Total Reviews',
      totalMessages: 'Total Messages',
      unreadMessages: 'Unread Messages',
      totalComments: 'Total Comments',
      recentActivity: 'Recent Activity',
      noActivity: 'No recent activity',
      products: 'Product',
      reviews: 'Review',
      messages: 'Message',
      users: 'User',
      offers: 'Offer'
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
      title: text[language].unreadMessages,
      value: unreadMessagesCount,
      icon: Mail,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950'
    },
    {
      title: text[language].totalComments,
      value: comments.length,
      icon: MessageCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {text[language].welcomeTitle}
        </h1>
        <p className="text-muted-foreground">
          {text[language].welcomeDescription}
        </p>
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
                  +12% من الشهر الماضي
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{text[language].recentActivity}</CardTitle>
          <CardDescription>
            آخر التحديثات والأنشطة في الموقع
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.slice(0, 5).map((message) => (
              <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{message.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {message.message.substring(0, 50)}...
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!message.read && (
                    <Badge variant="destructive" className="text-xs">
                      جديد
                    </Badge>
                  )}
                  <div className="text-xs text-muted-foreground mt-3">
                    {new Date(message.timestamp).toLocaleDateString('en-GB')}
                  </div>
                </div>
              </div>
            ))}
            
            {messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {text[language].noActivity}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};