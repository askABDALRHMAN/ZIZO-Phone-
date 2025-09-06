import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Package, MessageSquare, Mail, MessageCircle, TrendingUp, TrendingDown, Users, Star } from 'lucide-react';

export const EnhancedAnalyticsManagement: React.FC = () => {
  const { language } = useLanguage();
  const { products, reviews, messages, comments } = useStore();

  const text = {
    ar: {
      title: 'لوحة الإحصائيات المتقدمة',
      description: 'تحليل شامل وإحصائيات تفصيلية للموقع',
      totalProducts: 'إجمالي المنتجات',
      totalReviews: 'إجمالي التقييمات',
      totalMessages: 'إجمالي الرسائل',
      totalComments: 'إجمالي التعليقات',
      unreadMessages: 'رسائل غير مقروءة',
      avgRating: 'متوسط التقييم',
      topProducts: 'أفضل المنتجات',
      productRatings: 'تقييمات المنتجات',
      messagesTrend: 'اتجاه الرسائل',
      ratingDistribution: 'توزيع التقييمات',
      monthlyGrowth: 'النمو الشهري',
      rating: 'تقييم',
      count: 'العدد',
      messages: 'رسائل',
      month: 'الشهر',
      excellent: 'ممتاز',
      good: 'جيد', 
      average: 'متوسط',
      poor: 'ضعيف',
      terrible: 'سيء'
    },
    en: {
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive analysis and detailed website statistics',
      totalProducts: 'Total Products',
      totalReviews: 'Total Reviews',
      totalMessages: 'Total Messages',
      totalComments: 'Total Comments',
      unreadMessages: 'Unread Messages',
      avgRating: 'Average Rating',
      topProducts: 'Top Products',
      productRatings: 'Product Ratings',
      messagesTrend: 'Messages Trend',
      ratingDistribution: 'Rating Distribution',
      monthlyGrowth: 'Monthly Growth',
      rating: 'Rating',
      count: 'Count',
      messages: 'Messages',
      month: 'Month',
      excellent: 'Excellent',
      good: 'Good',
      average: 'Average', 
      poor: 'Poor',
      terrible: 'Terrible'
    }
  };

  // Calculate analytics data
  const analyticsData = useMemo(() => {
    const unreadCount = messages.filter(msg => !msg.is_read).length;
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    // Product ratings data for chart
    const productRatings = products.map(product => {
      const productReviews = reviews.filter(r => r.product_id === product.id);
      const avgProductRating = productReviews.length > 0 
        ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
        : 0;
      return {
        name: language === 'ar' ? product.name : product.name_en || product.name,
        rating: Number(avgProductRating.toFixed(1)),
        reviews: productReviews.length
      };
    }).sort((a, b) => b.rating - a.rating).slice(0, 5);

    // Rating distribution
    const ratingDistribution = [
      { name: text[language].excellent, value: reviews.filter(r => r.rating === 5).length, fill: '#10B981' },
      { name: text[language].good, value: reviews.filter(r => r.rating === 4).length, fill: '#84CC16' },
      { name: text[language].average, value: reviews.filter(r => r.rating === 3).length, fill: '#F59E0B' },
      { name: text[language].poor, value: reviews.filter(r => r.rating === 2).length, fill: '#F97316' },
      { name: text[language].terrible, value: reviews.filter(r => r.rating === 1).length, fill: '#EF4444' }
    ];

    // Monthly trend (mock data)
    const monthlyTrend = [
      { month: language === 'ar' ? 'يناير' : 'Jan', messages: 45, reviews: 12 },
      { month: language === 'ar' ? 'فبراير' : 'Feb', messages: 52, reviews: 18 },
      { month: language === 'ar' ? 'مارس' : 'Mar', messages: 48, reviews: 15 },
      { month: language === 'ar' ? 'أبريل' : 'Apr', messages: 63, reviews: 22 },
      { month: language === 'ar' ? 'مايو' : 'May', messages: 71, reviews: 28 },
      { month: language === 'ar' ? 'يونيو' : 'Jun', messages: messages.length, reviews: reviews.length }
    ];

    return {
      unreadCount,
      avgRating,
      productRatings,
      ratingDistribution: ratingDistribution.filter(item => item.value > 0),
      monthlyTrend
    };
  }, [products, reviews, messages, comments, language, text]);
  
  const stats = [
    {
      title: text[language].totalProducts,
      value: products.length,
      icon: Package,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      change: '+12%'
    },
    {
      title: text[language].totalReviews,
      value: reviews.length,
      icon: MessageSquare,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950',
      change: '+18%'
    },
    {
      title: text[language].totalMessages,
      value: messages.length,
      icon: Mail,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      change: '+8%'
    },
    {
      title: text[language].totalComments,
      value: comments.length,
      icon: MessageCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      change: '+25%'
    },
    {
      title: text[language].unreadMessages,
      value: analyticsData.unreadCount,
      icon: Mail,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950',
      change: '-5%'
    },
    {
      title: text[language].avgRating,
      value: analyticsData.avgRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      change: '+3%'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{text[language].title}</h1>
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
                {stat.change.startsWith('+') ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Ratings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{text[language].topProducts}</CardTitle>
            <CardDescription>{text[language].productRatings}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.productRatings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rating" fill="hsl(var(--primary))" name={text[language].rating} />
                <Bar dataKey="reviews" fill="hsl(var(--secondary))" name={text[language].totalReviews} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{text[language].ratingDistribution}</CardTitle>
            <CardDescription>توزيع التقييمات حسب النجوم</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.ratingDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{text[language].monthlyGrowth}</CardTitle>
            <CardDescription>{text[language].messagesTrend}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  name={text[language].messages}
                />
                <Line 
                  type="monotone" 
                  dataKey="reviews" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2} 
                  name={text[language].totalReviews}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">معدل الرد على الرسائل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <Progress value={92} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">+5% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">رضا العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <Progress value={96} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">+0.2 من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">معدل التحويل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <Progress value={23} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">+3% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">نمو التقييمات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18%</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">تحسن مستمر</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};