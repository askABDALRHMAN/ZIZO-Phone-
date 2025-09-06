
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, MessageCircle, ExternalLink } from 'lucide-react';

const CommentsSection: React.FC = () => {
  const { language } = useLanguage();
  const { comments } = useStore();

  if (comments.length === 0) return null;

  return (
    <section id="comments" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 animate-fade-in">
            {language === 'ar' ? 'تعليقات العملاء' : 'Customer Comments'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {language === 'ar' ? 'شاهد ما يقوله عملاؤنا عن منتجاتنا الطبيعية' : 'See what our customers say about our natural products'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comments.map((comment, index) => (
            <Card 
              key={comment.id} 
              className="card-gradient hover-lift transition-smooth shadow-card border-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={comment.productImage} 
                    alt={comment.productName}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">
                        {comment.name}
                      </h4>
                      {comment.isOfficial && (
                        <Badge variant="default" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          {language === 'ar' ? 'رسمي' : 'Official'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {comment.productName}
                    </p>
                  </div>
                </div>
                
                <p className="text-foreground mb-4 leading-relaxed">
                  {comment.comment}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="text-xs text-muted-foreground mt-3">
                    {new Date(comment.timestamp).toLocaleDateString('en-GB')}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      const productSection = document.getElementById('products');
                      productSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {language === 'ar' ? 'عرض المنتج' : 'View Product'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
