import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import ProductCard from './ProductCard';
import { ProductsSearch } from './ProductsSearch';
import arganSoap from '../assets/1.png';
import roseCream from '../assets/1.png';
import lavenderOil from '../assets/1.png';
    import { Package, MessageCircle, Users, Star } from 'lucide-react';


const ProductsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { products, updateProduct, reviews } = useStore();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter(product => {
      const name = language === 'ar' ? product.name : product.nameEn;
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  // Sort products by highest rating and most requested (messageCount)
  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      // Get average rating for each product
      const aReviews = reviews.filter(r => r.productId === a.id);
      const bReviews = reviews.filter(r => r.productId === b.id);
      const aRating = aReviews.length > 0 ? aReviews.reduce((sum, r) => sum + r.rating, 0) / aReviews.length : 0;
      const bRating = bReviews.length > 0 ? bReviews.reduce((sum, r) => sum + r.rating, 0) / bReviews.length : 0;
      
      // Sort by rating first, then by message count (demand)
      if (bRating !== aRating) {
        return bRating - aRating;
      }
      return (b.messageCount || 0) - (a.messageCount || 0);
    });
  }, [filteredProducts, reviews]);

  // Limit to 9 products on homepage
  const displayedProducts = React.useMemo(() => {
    return sortedProducts.slice(0, 9);
  }, [sortedProducts]);

  // Update product images if they're still using placeholder URLs
  React.useEffect(() => {
    const imageMap = {
      '1': arganSoap,
      '2': roseCream,
      '3': lavenderOil
    };

    products.forEach(product => {
      if (product.image.includes('placeholder') && imageMap[product.id as keyof typeof imageMap]) {
        updateProduct(product.id, { 
          image: imageMap[product.id as keyof typeof imageMap] 
        });
      }
    });
  }, [products, updateProduct]);

  // Update filtered products when products change
  React.useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const { comments } = useStore();
  const stats = [
      {
        icon: Package,
        value: products.length,
        label: language === 'ar' ? 'منتج عالي الجوده' : 'High quality product'
      },
      {
        icon: MessageCircle,
        value: comments.length + reviews.length,
        label: language === 'ar' ? 'تعليق إيجابي' : 'Positive Reviews'
      },
      {
        icon: Users,
        value: '500+',
        label: language === 'ar' ? 'عميل راضي' : 'Happy Customers'
      },
      {
        icon: Star,
        value: '4.9',
        label: language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'
      }
    ]; 

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-background to-secondary/20">
       <div className=" bottom-2 w-full px-4">
        <div className="grid grid-cols-4 gap-0 max-w-4xl  mx-auto ">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group m-3 h-[150px] ">
              <div className="flex items-center justify-center mb-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/90 to-secondary/90 
                  group-hover:from-primary/50 group-hover:to-secondary/50 transition-all duration-300 group-hover:scale-110 ">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold group-hover:text-primary/ transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-primary mt-1 ">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 mt-14">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 animate-fade-in">
            {t('products.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {t('products.subtitle')}
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-32"></div>
            <div className="w-2 h-2 bg-primary rounded-full mx-4"></div>
            <div className="h-px bg-gradient-to-r from-primary via-transparent to-transparent w-32"></div>
          </div>
        </div>

        <ProductsSearch onSearch={handleSearch} />

        {/* View All Products Button - Top */}
        <div className="flex justify-center mb-12">
          <a
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 [clip-path:polygon(8%_0%,92%_0%,100%_20%,100%_70%,92%_100%,8%_100%,0%_70%,0%_20%)]"
          >
            {language === 'ar' ? 'مشاهدة جميع المنتجات' : 'View All Products'}
            <span className={`ml-2 ${language === 'ar' ? 'rotate-180' : ''}`}>→</span>
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
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

        {/* View All Products Button - Bottom */}
        {products.length > 9 && (
          <div className="flex justify-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 [clip-path:polygon(8%_0%,92%_0%,100%_20%,100%_70%,92%_100%,8%_100%,0%_70%,0%_20%)]"
            >
              {language === 'ar' ? 'مشاهدة جميع المنتجات' : 'View All Products'}
              <span className={`ml-2 ${language === 'ar' ? 'rotate-180' : ''}`}>→</span>
            </a>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🛍️</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
              {language === 'ar' ? 'لا توجد منتجات متاحة حالياً' : 'No products available currently'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'سيتم إضافة منتجات جديدة قريباً' : 'New products will be added soon'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;