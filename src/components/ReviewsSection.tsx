import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReviewsSection: React.FC = () => {
  const { language } = useLanguage();
  const { reviews, products, addReview } = useStore();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    productId: ''
  });

  const text = {
    ar: {
      title: 'تقييمات العملاء',
      subtitle: 'آراء عملائنا الكرام في منتجاتنا',
      addReview: 'إضافة تقييم',
      name: 'الاسم',
      rating: 'التقييم',
      comment: 'سبب التقييم',
      product: 'المنتج',
      selectProduct: 'اختر المنتج',
      submit: 'إرسال التقييم',
      noReviews: 'لا توجد تقييمات بعد',
      reviewAdded: 'تم إضافة التقييم بنجاح',
      stars: 'نجوم',
      viewProduct: 'عرض المنتج'
    },
    en: {
      title: 'Customer Reviews',
      subtitle: 'What our valued customers say about our products',
      addReview: 'Add Review',
      name: 'Name',
      rating: 'Rating',
      comment: 'Review Comment',
      product: 'Product',
      selectProduct: 'Select Product',
      submit: 'Submit Review',
      noReviews: 'No reviews yet',
      reviewAdded: 'Review added successfully',
      stars: 'stars',
      viewProduct: 'View Product'
    }
  };

  const handleAddReview = () => {
    if (!newReview.name || !newReview.comment || !newReview.productId) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول',
        variant: 'destructive',
      });
      return;
    }

    addReview(newReview);
    toast({
      title: text[language].reviewAdded,
      description: text[language].reviewAdded,
    });

    setNewReview({ name: '', rating: 5, comment: '', productId: '' });
    setIsDialogOpen(false);
  };

  const scrollToProduct = (productId: string) => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? (language === 'ar' ? product.name : product.nameEn) : '';
  };

  const getProductImage = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.image : '/api/placeholder/300/300';
  };

  return (
    <section id="reviews" className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text[language].title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {text[language].subtitle}
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-8 [clip-path:polygon(8%_0%,92%_0%,100%_20%,100%_70%,92%_100%,8%_100%,0%_70%,0%_20%)]">
                <MessageSquare className="h-4 w-4 mr-2" />
                {text[language].addReview}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{text[language].addReview}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">{text[language].name}</Label>
                  <Input
                    id="name"
                    value={newReview.name}
                    onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={text[language].name}
                  />
                </div>
                
                <div>
                  <Label htmlFor="product">{text[language].product}</Label>
                  <Select
                    value={newReview.productId}
                    onValueChange={(value) => setNewReview(prev => ({ ...prev, productId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={text[language].selectProduct} />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {language === 'ar' ? product.name : product.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rating">{text[language].rating}</Label>
                  <Select
                    value={newReview.rating.toString()}
                    onValueChange={(value) => setNewReview(prev => ({ ...prev, rating: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} {text[language].stars}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="comment">{text[language].comment}</Label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder={text[language].comment}
                    rows={3}
                  />
                </div>

                <Button onClick={handleAddReview} className="w-full">
                  {text[language].submit}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
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
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">{review.comment}</p>
                  
                  {review.productId && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <img 
                        src={getProductImage(review.productId)} 
                        alt={getProductName(review.productId)}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{getProductName(review.productId)}</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto text-xs"
                          onClick={() => scrollToProduct(review.productId!)}
                        >
                          {text[language].viewProduct}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground mt-3">
                    {new Date(review.timestamp).toLocaleDateString('en-GB')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">{text[language].noReviews}</p>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;