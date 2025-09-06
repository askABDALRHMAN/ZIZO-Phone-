import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
// import { Checkbox } from './ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  ShoppingCart, 
  Heart, 
  MessageCircle, 
  Eye, 
  Star,
  Info,
  ExternalLink,
  Mail,
  Plus
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore, Product } from '../contexts/StoreContext';
import { toast } from '../hooks/use-toast';
import ContactForm from './ContactForm';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, language } = useLanguage();
  const { addToCart, favorites, addToFavorites, removeFromFavorites, addComment, reviews, addReview } = useStore();
  
  const [showQuickView, setShowQuickView] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem(`likes_${product.id}`);
    return savedLikes ? parseInt(savedLikes) : 0;
  });
  const [hasLiked, setHasLiked] = useState(() => {
    return localStorage.getItem(`user_liked_${product.id}`) === 'true';
  });
  const [commentData, setCommentData] = useState({
    name: '',
    comment: ''
  });
  const [ratingData, setRatingData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const isFavorite = favorites.includes(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;


  // console.log('language:', language);
  // console.log('language:', product.nameEn);
  const productName = language === 'ar' ? product.name : product.nameEn;
  const productDescription = language === 'ar' ? product.description : product.descriptionEn;
  const productIngredients = language === 'ar' ? product.ingredients : product.ingredientsEn;

  // Get product-specific reviews
  const productReviews = reviews.filter(review => review.productId === product.id);
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
    : 0;

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast({
        title: 'غير متوفر',
        description: 'هذا المنتج غير متوفر حالياً',
        variant: 'destructive'
      });
      return;
    }
    
    addToCart(product);
    toast({
      title: t('products.addToCart'),
      description: `${productName} تم إضافته إلى السلة`,
    });
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
      toast({
        title: 'تم الحذف من المفضلة',
        description: `${productName} تم حذفه من المفضلة`,
      });
    } else {
      addToFavorites(product.id);
      toast({
        title: 'تم الإضافة للمفضلة',
        description: `${productName} تم إضافته للمفضلة`,
      });
    }
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `مرحباً، أريد الاستفسار عن منتج: ${productName}\nالسعر: ${product.price} ريال`
    );
    const whatsappUrl = `https://wa.me/966555555555?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddComment = () => {
    if (!commentData.name || !commentData.comment) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول',
        variant: 'destructive'
      });
      return;
    }

    const newComment = {
      name: commentData.name,
      comment: commentData.comment,
      productId: product.id,
      productImage: product.image,
      productName: productName
    };

    addComment(newComment);
    toast({
      title: 'تم إضافة التعليق',
      description: 'شكراً لك على تعليقك',
    });

    setCommentData({ name: '', comment: '' });
    setShowCommentForm(false);
  };

  const handleAddRating = () => {
    if (!ratingData.name || !ratingData.comment) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول',
        variant: 'destructive'
      });
      return;
    }

    const newReview = {
      name: ratingData.name,
      rating: ratingData.rating,
      comment: ratingData.comment,
      productId: product.id
    };

    addReview(newReview);
    toast({
      title: 'تم إضافة التقييم',
      description: 'شكراً لك على تقييمك',
    });

    setRatingData({ name: '', rating: 5, comment: '' });
    setShowRatingForm(false);
  };

  const handleLike = () => {
    if (hasLiked) {
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      setHasLiked(false);
      localStorage.setItem(`likes_${product.id}`, newLikes.toString());
      localStorage.removeItem(`user_liked_${product.id}`);
    } else {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      localStorage.setItem(`likes_${product.id}`, newLikes.toString());
      localStorage.setItem(`user_liked_${product.id}`, 'true');
    }
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'new': return 'default';
      case 'bestseller': return 'destructive';
      case 'organic': return 'secondary';
      default: return 'default';
    }
  };

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'new': return t('products.new');
      case 'bestseller': return t('products.bestSeller');
      case 'organic': return t('products.organic');
      default: return badge;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <>
      <Card className="group card-gradient hover-lift transition-smooth shadow-card border-0 overflow-hidden">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div style={{overflow:"hidden"}} className="aspect-square relative bg-muted">
            <img
              src={product.image}
              alt={productName}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.badge && (
                <Badge variant={getBadgeVariant(product.badge)} className="shadow-sm">
                  {getBadgeText(product.badge)}
                </Badge>
              )}
              {hasDiscount && (
                <Badge variant="destructive" className="shadow-sm">
                  {discountPercentage}% {t('products.discount')}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="secondary" className="shadow-sm">
                  نفد المخزون
                </Badge>
              )}
            </div>

            {/* Message Counter */}
            {product.messageCount && product.messageCount > 0 && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary text-white">
                  <Mail className="h-3 w-3 mr-1" />
                  {product.messageCount}
                </Badge>
              </div>
            )}

            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-lg hover:scale-110 transition-transform"
                        onClick={() => setShowQuickView(true)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('products.quickView')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-lg hover:scale-110 transition-transform"
                        onClick={handleLike}
                      >
                        <Heart 
                          className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} 
                          
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('products.addToFavorites')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Product Info */}
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {productName}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                {productDescription}
              </p>
            </div>

            {/* Rating Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(Math.round(averageRating))}</div>
                <span className="text-xs text-muted-foreground">
                  {productReviews.length > 0 ? `(${productReviews.length} تقييم)` : 'لا توجد تقييمات'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`text-xs ${hasLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                >
                  <Heart className={`h-3 w-3 mr-1 ${hasLiked ? 'fill-current' : ''}`} />
                  {likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRatingForm(true)}
                  className="text-xs text-muted-foreground"
                >
                  <Star className="h-3 w-3 mr-1" />
                </Button>
              </div>
            </div>

            {/* Ingredients Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground cursor-help">
                    <Info className="w-3 h-3" />
                    <span>مكونات طبيعية</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{productIngredients}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                {product.price} جنيه
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice} جنيه
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                className={`flex-1 ${product.inStock ? 'button-gradient text-white hover-for-button' : 'bg-gray-400 cursor-not-allowed'} `}
                onClick={() => setShowContactForm(true)}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? t('products.addToCart') : 'غير متوفر'}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="hover-for-button"
                onClick={handleWhatsAppContact}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="hover-for-button"
                onClick={() => setShowContactForm(true)}
              >
                <Plus className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="hover-for-button"
                onClick={() => setShowCommentForm(true)}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">
              {productName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={productName}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {productDescription}
              </p>
              
              {productReviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(Math.round(averageRating))}</div>
                  <span className="text-sm text-muted-foreground">
                    {averageRating.toFixed(1)} ({productReviews.length} تقييم)
                  </span>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold mb-2">المكونات:</h4>
                <p className="text-sm text-muted-foreground">
                  {productIngredients}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {product.price} جنيه
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice} جنيه
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className={`flex-1 ${product.inStock ? 'button-gradient text-white' : 'bg-gray-400 cursor-not-allowed'}`}
                  onClick={() => setShowContactForm(true)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? t('products.addToCart') : 'غير متوفر'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Form Modal */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              استفسار عن: {productName}
            </DialogTitle>
          </DialogHeader>
          <ContactForm 
            productId={product.id}
            onSuccess={() => setShowContactForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Comment Form Modal */}
      <Dialog open={showCommentForm} onOpenChange={setShowCommentForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              إضافة تعليق على: {productName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="commentName">الاسم</Label>
              <Input
                id="commentName"
                value={commentData.name}
                onChange={(e) => setCommentData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="اسمك الكريم"
              />
            </div>
            <div>
              <Label htmlFor="commentText">التعليق</Label>
              <Textarea
                id="commentText"
                value={commentData.comment}
                onChange={(e) => setCommentData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="شاركنا رأيك في هذا المنتج..."
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddComment} className="flex-1">
                إضافة التعليق
              </Button>
              <Button variant="outline" onClick={() => setShowCommentForm(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rating Form Modal */}
      <Dialog open={showRatingForm} onOpenChange={setShowRatingForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              تقييم المنتج: {productName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ratingName">الاسم</Label>
              <Input
                id="ratingName"
                value={ratingData.name}
                onChange={(e) => setRatingData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="اسمك الكريم"
              />
            </div>
            <div>
              <Label>التقييم</Label>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 cursor-pointer ${
                      i < ratingData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                    onClick={() => setRatingData(prev => ({ ...prev, rating: i + 1 }))}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="ratingComment">سبب التقييم</Label>
              <Textarea
                id="ratingComment"
                value={ratingData.comment}
                onChange={(e) => setRatingData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="أخبرنا عن تجربتك مع هذا المنتج..."
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddRating} className="flex-1">
                إضافة التقييم
              </Button>
              <Button variant="outline" onClick={() => setShowRatingForm(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;