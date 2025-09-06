import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore, type Product } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2,Package, Image as ImageIcon } from 'lucide-react';
import ProductForm from './ProductForm';

export const ProductsManagement: React.FC = () => {
  const { language } = useLanguage();
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const { toast } = useToast();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageUploadMethod, setImageUploadMethod] = useState<'url' | 'upload'>('url');
  const [formData, setFormData] = useState({
    name: '',
    // nameEn: '',
    description: '',
    // descriptionEn: '',
    price: '',
    originalPrice: '',
    image: '',
    category: '',
    ingredients: '',
    // ingredientsEn: '',
    badge: 'none' as 'new' | 'bestseller' | 'organic' | 'none',
    inStock: true
  });

  const text = {
    ar: {
      title: 'إدارة المنتجات',
      description: 'إضافة وتعديل وحذف المنتجات',
      addProduct: 'إضافة منتج جديد',
      editProduct: 'تعديل المنتج',
      productName: 'اسم المنتج (عربي)',
      productNameEn: 'اسم المنتج (إنجليزي)',
      productDescription: 'الوصف (عربي)',
      descriptionEn: 'الوصف (إنجليزي)',
      price: 'السعر',
      originalPrice: 'السعر الأصلي (اختياري)',
      image: 'رابط الصورة',
      imageUpload: 'رفع صورة',
      category: 'الفئة',
      ingredients: 'المكونات (عربي)',
      ingredientsEn: 'المكونات (إنجليزي)',
      badge: 'الشارة',
      inStock: 'متوفر',
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      view: 'عرض',
      confirm: 'تأكيد',
      deleteConfirmation: 'هل أنت متأكد من حذف هذا المنتج؟',
      productAdded: 'تم إضافة المنتج بنجاح',
      productUpdated: 'تم تحديث المنتج بنجاح',
      productDeleted: 'تم حذف المنتج بنجاح',
      noProducts: 'لا توجد منتجات',
      selectBadge: 'اختر الشارة',
      new: 'جديد',
      bestseller: 'الأكثر مبيعاً',
      organic: 'عضوي',
      none: 'بدون',
      phones: 'هواتف محمولة',
      repairs: 'صيانة الهواتف',
      buy_sell: 'شراء وبيع الهواتف',
      cases: 'جرابات وواقيات',
      chargers: 'شواحن وكابلات',
      headphones: 'سماعات',
      wireless_headphones: 'سماعات لاسلكية',
      smartwatches: 'ساعات ذكية',
      powerbanks: 'باور بانك',
      accessories: 'إكسسوارات أخرى',
      screen_protectors: 'حمايات للشاشة',
      speakers: 'سماعات خارجية',
      car_holders: 'حوامل السيارات',
      cleaning_kits: 'أدوات تنظيف الهواتف',
      batteries: 'بطاريات بديلة',
      uploadFromDevice: 'رفع من الجهاز',
      useImageUrl: 'استخدام رابط',
      outOfStock: 'نفد المخزون',
      newArrival: "وصول جديد",
      popular: "شائع",
      accessoryBadge: "ملحقات",
      repairService: "خدمة صيانة",
      refurbished: "تم تجديده",
      accessory: "ملحقات",
      discount: "خصم",
    },
    en: {
      title: 'Products Management',
      description: 'Add, edit and delete products',
      addProduct: 'Add New Product',
      editProduct: 'Edit Product',
      productName: 'Product Name (Arabic)',
      productNameEn: 'Product Name (English)',
      productDescription: 'Description (Arabic)',
      descriptionEn: 'Description (English)',
      price: 'Price',
      originalPrice: 'Original Price (Optional)',
      image: 'Image URL',
      imageUpload: 'Upload Image',
      category: 'Category',
      ingredients: 'Ingredients (Arabic)',
      ingredientsEn: 'Ingredients (English)',
      badge: 'Badge',
      inStock: 'In Stock',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      confirm: 'Confirm',
      deleteConfirmation: 'Are you sure you want to delete this product?',
      productAdded: 'Product added successfully',
      productUpdated: 'Product updated successfully',
      productDeleted: 'Product deleted successfully',
      noProducts: 'No products found',
      selectBadge: 'Select Badge',
      new: 'New',
      bestseller: 'Bestseller',
      organic: 'Organic',
      none: 'None',
      phones: 'Mobile Phones',
      repairs: 'Phone Repairs',
      buy_sell: 'Buy & Sell Phones',
      cases: 'Cases & Covers',
      chargers: 'Chargers & Cables',
      headphones: 'Headphones',
      wireless_headphones: 'Wireless Headphones',
      smartwatches: 'Smartwatches',
      powerbanks: 'Power Banks',
      accessories: 'Other Accessories',
      screen_protectors: 'Screen Protectors',
      speakers: 'External Speakers',
      car_holders: 'Car Holders',
      cleaning_kits: 'Cleaning Kits',
      batteries: 'Replacement Batteries',
      uploadFromDevice: 'Upload from device',
      useImageUrl: 'Use image URL',
      newArrival: "New Arrival",
      popular: "Popular",
      accessoryBadge: "Accessory",
      repairService: "Repair Service",
      refurbished: "Refurbished",
      discount: "Discount",
      accessory: "Accessory",
      outOfStock: 'Out of stock',
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      // nameEn: '',
      description: '',
      // descriptionEn: '',
      price: '',
      originalPrice: '',
      image: '',
      category: '',
      ingredients: '',
      // ingredientsEn: '',
      badge: 'none',
      inStock: true
    });
    setImageUploadMethod('url');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!formData.name || !formData.price) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    const newProduct = {
      name: formData.name,
      // nameEn: formData.nameEn,
      description: formData.description,
      // descriptionEn: formData.descriptionEn,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      image: formData.image || '/api/placeholder/300/300',
      category: formData.category,
      ingredients: formData.ingredients,
      // ingredientsEn: formData.ingredientsEn,
      badge: formData.badge === 'none' ? undefined : formData.badge,
      inStock: formData.inStock
    };

    addProduct(newProduct);
    toast({
      title: text[language].productAdded,
      description: text[language].productAdded,
    });
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      // nameEn: product.nameEn,
      description: product.description,
      // descriptionEn: product.descriptionEn,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      image: product.image,
      category: product.category,
      ingredients: product.ingredients,
      // ingredientsEn: product.ingredientsEn,
      badge: product.badge || 'none',
      inStock: product.inStock
    });
  };

  const handleUpdate = () => {
    if (!editingProduct || !formData.name || !formData.price) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    const updatedProduct = {
      name: formData.name,
      // nameEn: formData.nameEn,
      description: formData.description,
      // descriptionEn: formData.descriptionEn,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      image: formData.image,
      category: formData.category,
      ingredients: formData.ingredients,
      // ingredientsEn: formData.ingredientsEn,
      badge: formData.badge === 'none' ? undefined : formData.badge,
      inStock: formData.inStock
    };

    updateProduct(editingProduct.id, updatedProduct);
    toast({
      title: text[language].productUpdated,
      description: text[language].productUpdated,
    });
    
    resetForm();
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast({
      title: text[language].productDeleted,
      description: text[language].productDeleted,
    });
  };

 

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{text[language].title}</h1>
          <p className="text-muted-foreground">{text[language].description}</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              {text[language].addProduct}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{text[language].addProduct}</DialogTitle>
            </DialogHeader>
              <ProductForm
                  formData={formData}
                  setFormData={setFormData}
                  imageUploadMethod={imageUploadMethod}
                  setImageUploadMethod={setImageUploadMethod}
                  handleImageUpload={handleImageUpload}
                  text={text[language]}
                />            
              <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {text[language].cancel}
              </Button>
              <Button onClick={handleAdd}>
                {text[language].save}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={language === 'ar' ? product.name : product.nameEn}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {product.badge && (
                  <Badge className="absolute top-2 right-2">
                    {text[language][product.badge]}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">
                {language === 'ar' ? product.name : product.nameEn}
              </CardTitle>
              <CardDescription className="mb-4">
                {language === 'ar' ? product.description : product.descriptionEn}
              </CardDescription>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? text[language].inStock : 'نفد المخزون'}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{text[language].noProducts}</p>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{text[language].editProduct}</DialogTitle>
          </DialogHeader>
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              imageUploadMethod={imageUploadMethod}
              setImageUploadMethod={setImageUploadMethod}
              handleImageUpload={handleImageUpload}
              text={text[language]}
            />          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>
              {text[language].cancel}
            </Button>
            <Button onClick={handleUpdate}>
              {text[language].save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};









