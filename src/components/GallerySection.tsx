
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Eye, ExternalLink } from 'lucide-react';

const GallerySection: React.FC = () => {
  const { language } = useLanguage();
  const { galleryItems } = useStore();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (galleryItems.length === 0) return null;

  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems.slice(0, 9) // Limit to 9 items on homepage
    : galleryItems.filter(item => item.category === selectedCategory).slice(0, 9);

  const getCategoryName = (category: string) => {
    const names = {
      all: language === 'ar' ? 'الكل' : 'All',
      soap: language === 'ar' ? 'صابون' : 'Soap',
      cream: language === 'ar' ? 'كريم' : 'Cream',
      oil: language === 'ar' ? 'زيت' : 'Oil'
    };
    return names[category as keyof typeof names] || category;
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 animate-fade-in">
            {language === 'ar' ? 'معرض الأعمال' : 'Portfolio Gallery'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {language === 'ar' ? 'تصفح مجموعة من أعمالنا ومنتجاتنا الطبيعية المميزة' : 'Browse our collection of natural products and featured works'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {getCategoryName(category)}
              </Button>
            ))}
          </div>
        </div>

        {/* View All Gallery Button - Top */}
        <div className="flex justify-center mb-12">
          <a
            href="/gallery"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 [clip-path:polygon(8%_0%,92%_0%,100%_20%,100%_70%,92%_100%,8%_100%,0%_70%,0%_20%)]"
          >
            {language === 'ar' ? 'مشاهدة جميع الأعمال' : 'View All Gallery'}
            <span className={`ml-2 ${language === 'ar' ? 'rotate-180' : ''}`}>→</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={language === 'ar' ? item.title : item.titleEn}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                    onClick={() => setSelectedItem(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2">
                  {getCategoryName(item.category)}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {language === 'ar' ? item.title : item.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {language === 'ar' ? item.description : item.descriptionEn}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Gallery Button - Bottom */}
        {galleryItems.length > 9 && (
          <div className="flex justify-center mt-12">
            <a
              href="/gallery"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 [clip-path:polygon(8%_0%,92%_0%,100%_20%,100%_70%,92%_100%,8%_100%,0%_70%,0%_20%)]"
            >
              {language === 'ar' ? 'مشاهدة جميع الأعمال' : 'View All Gallery'}
              <span className={`ml-2 ${language === 'ar' ? 'rotate-180' : ''}`}>→</span>
            </a>
          </div>
        )}

        {/* Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedItem && (language === 'ar' ? selectedItem.title : selectedItem.titleEn)}
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <img
                  src={selectedItem.image}
                  alt={language === 'ar' ? selectedItem.title : selectedItem.titleEn}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-muted-foreground">
                  {language === 'ar' ? selectedItem.description : selectedItem.descriptionEn}
                </p>
                <Badge>{getCategoryName(selectedItem.category)}</Badge>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
