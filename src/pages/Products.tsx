import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const Products: React.FC = () => {
  const { t, language } = useLanguage();
  const { products, reviews } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(product => product.category).filter(Boolean))];
    return cats;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product => {
        const name = language === 'ar' ? product.name : product.name_en || product.nameEn;
        const description = language === 'ar' ? product.description : product.description_en || product.descriptionEn;
        return name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               description?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => {
        const aReviews = reviews.filter(r => r.product_id === a.id);
        const bReviews = reviews.filter(r => r.product_id === b.id);
        const aRating = aReviews.length > 0 ? aReviews.reduce((sum, r) => sum + r.rating, 0) / aReviews.length : 0;
        const bRating = bReviews.length > 0 ? bReviews.reduce((sum, r) => sum + r.rating, 0) / bReviews.length : 0;
        return bRating - aRating;
      });
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    }

    return filtered;
  }, [products, reviews, searchTerm, selectedCategory, sortBy, language]);

  const text = {
    ar: {
      title: 'جميع المنتجات',
      subtitle: 'اكتشف مجموعتنا الكاملة من المنتجات الطبيعية المصنوعة يدوياً',
      search: 'البحث في المنتجات...',
      allCategories: 'جميع الفئات',
      sortBy: 'ترتيب حسب',
      default: 'الافتراضي',
      priceLow: 'السعر: من الأقل للأعلى',
      priceHigh: 'السعر: من الأعلى للأقل',
      rating: 'التقييم',
      newest: 'الأحدث',
      noProducts: 'لا توجد منتجات',
      noProductsDesc: 'لم يتم العثور على منتجات مطابقة للمعايير المحددة'
    },
    en: {
      title: 'All Products',
      subtitle: 'Discover our complete collection of natural handmade products',
      search: 'Search products...',
      allCategories: 'All Categories',
      sortBy: 'Sort by',
      default: 'Default',
      priceLow: 'Price: Low to High',
      priceHigh: 'Price: High to Low',
      rating: 'Rating',
      newest: 'Newest',
      noProducts: 'No Products',
      noProductsDesc: 'No products found matching the selected criteria'
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

              <div className="flex gap-4 items-center">
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

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={text[language].sortBy} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">{text[language].default}</SelectItem>
                    <SelectItem value="price-low">{text[language].priceLow}</SelectItem>
                    <SelectItem value="price-high">{text[language].priceHigh}</SelectItem>
                    <SelectItem value="rating">{text[language].rating}</SelectItem>
                    <SelectItem value="newest">{text[language].newest}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🛍️</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  {text[language].noProducts}
                </h3>
                <p className="text-muted-foreground">
                  {text[language].noProductsDesc}
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('default');
                  }}
                  variant="outline"
                  className="mt-6"
                >
                  {language === 'ar' ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;