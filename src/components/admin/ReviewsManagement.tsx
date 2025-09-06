import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Trash2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ReviewsManagement: React.FC = () => {
  const { language } = useLanguage();
  const { reviews, deleteReview } = useStore();
  const { toast } = useToast();

  const text = {
    ar: {
      title: 'إدارة المراجعات',
      description: 'عرض وإدارة مراجعات العملاء',
      delete: 'حذف',
      rating: 'التقييم',
      noReviews: 'لا توجد مراجعات',
      reviewDeleted: 'تم حذف المراجعة بنجاح'
    },
    en: {
      title: 'Reviews Management',
      description: 'View and manage customer reviews',
      delete: 'Delete',
      rating: 'Rating',
      noReviews: 'No reviews found',
      reviewDeleted: 'Review deleted successfully'
    }
  };

  const handleDelete = (id: string) => {
    deleteReview(id);
    toast({
      title: text[language].reviewDeleted,
      description: text[language].reviewDeleted,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{text[language].title}</h1>
        <p className="text-muted-foreground">{text[language].description}</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <MessageSquare className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{review.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        ({review.rating}/5)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  
                  <div className="text-xs text-muted-foreground mt-3">
                    {new Date(review.timestamp).toLocaleDateString('en-GB')}
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(review.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card className="p-12 text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{text[language].noReviews}</p>
        </Card>
      )}
    </div>
  );
};