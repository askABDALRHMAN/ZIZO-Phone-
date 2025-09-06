import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, Eye } from 'lucide-react';

const Gallery: React.FC = () => {
  const { language } = useLanguage();
  const { galleryItems } = useStore();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(galleryItems.map(item => item.category).filter(Boolean))];
    return cats;
  }, [galleryItems]);

  // Filter gallery items
  const filteredItems = useMemo(() => {
    let filtered = galleryItems;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(item => {
        const title = language === 'ar' ? item.title : item.title_en || item.titleEn;
        const description = language === 'ar' ? item.description : item.description_en || item.descriptionEn;
        return title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    return filtered;
  }, [galleryItems, searchTerm, selectedCategory, language]);

  const text = {
    ar: {
      title: 'معرض الأعمال',
      subtitle: 'استكشف مجموعة أعمالنا وإبداعاتنا في عالم المنتجات الطبيعية',
      search: 'البحث في المعرض...',
      allCategories: 'جميع الفئات',
      viewDetails: 'عرض التفاصيل',
      noItems: 'لا توجد عناصر',
      noItemsDesc: 'لم يتم العثور على عناصر مطابقة للمعايير المحددة',
      resetFilters: 'إعادة تعيين الفلاتر'
    },
    en: {
      title: 'Gallery',
      subtitle: 'Explore our collection of work and creativity in the world of natural products',
      search: 'Search gallery...',
      allCategories: 'All Categories',
      viewDetails: 'View Details',
      noItems: 'No Items',
      noItemsDesc: 'No items found matching the selected criteria',
      resetFilters: 'Reset Filters'
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {text[language].title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {text[language].subtitle}
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder={text[language].search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={text[language].allCategories} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text[language].allCategories}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map((item, index) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image_url || item.image}
                          alt={language === 'ar' ? item.title : item.title_en || item.titleEn}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Eye className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">{text[language].viewDetails}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {language === 'ar' ? item.title : item.title_en || item.titleEn}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {language === 'ar' ? item.description : item.description_en || item.descriptionEn}
                        </p>
                        {item.category && (
                          <div className="mt-3">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {item.category}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🖼️</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  {text[language].noItems}
                </h3>
                <p className="text-muted-foreground">
                  {text[language].noItemsDesc}
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  variant="outline"
                  className="mt-6"
                >
                  {text[language].resetFilters}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Item Details Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="text-xl font-semibold">
            {selectedItem && (language === 'ar' ? selectedItem.title : selectedItem.title_en || selectedItem.titleEn)}
          </DialogTitle>
          {selectedItem && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img
                  src={selectedItem.image_url || selectedItem.image}
                  alt={language === 'ar' ? selectedItem.title : selectedItem.title_en || selectedItem.titleEn}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {language === 'ar' ? selectedItem.title : selectedItem.title_en || selectedItem.titleEn}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'ar' ? selectedItem.description : selectedItem.description_en || selectedItem.descriptionEn}
                  </p>
                </div>
                {selectedItem.category && (
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {selectedItem.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;