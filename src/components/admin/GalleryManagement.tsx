import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore, type GalleryItem } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Image as ImageIcon, Upload } from 'lucide-react';

// ===== ItemForm خارج الـ component الرئيسي =====
interface ItemFormProps {
  formData: {
    title: string;
    // titleEn: string;
    description: string;
    // descriptionEn: string;
    image: string;
    category: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    // titleEn: string;
    description: string;
    // descriptionEn: string;
    image: string;
    category: string;
  }>>;
  text: any;
  imageUploadMethod: 'url' | 'upload';
  setImageUploadMethod: React.Dispatch<React.SetStateAction<'url' | 'upload'>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  formData,
  setFormData,
  text,
  imageUploadMethod,
  setImageUploadMethod,
  handleImageUpload
}) => (
  <div className="space-y-4">
    {/* Title Inputs */}
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label htmlFor="title">{text.itemTitle}</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>
      {/* <div>
        <Label htmlFor="titleEn">{text.itemTitleEn}</Label>
        <Input
          id="titleEn"
          value={formData.titleEn}
          onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
        />
      </div> */}
    </div>

    {/* Description Inputs */}
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label htmlFor="description">{text.itemDescription}</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      {/* <div>
        <Label htmlFor="descriptionEn">{text.descriptionEn}</Label>
        <Textarea
          id="descriptionEn"
          value={formData.descriptionEn}
          onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
        />
      </div> */}
    </div>

    {/* Category Select */}
    <div>
      <Label htmlFor="category">{text.category}</Label>
      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
        <SelectTrigger>
          <SelectValue placeholder="اختر الفئة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="phones">{text.phones}</SelectItem>
          <SelectItem value="repairs">{text.repairs}</SelectItem>
          <SelectItem value="buy_sell">{text.buy_sell}</SelectItem>
          <SelectItem value="cases">{text.cases}</SelectItem>
          <SelectItem value="chargers">{text.chargers}</SelectItem>
          <SelectItem value="headphones">{text.headphones}</SelectItem>
          <SelectItem value="wireless_headphones">{text.wireless_headphones}</SelectItem>
          <SelectItem value="smartwatches">{text.smartwatches}</SelectItem>
          <SelectItem value="powerbanks">{text.powerbanks}</SelectItem>
          <SelectItem value="accessories">{text.accessories}</SelectItem>
          <SelectItem value="screen_protectors">{text.screen_protectors}</SelectItem>
          <SelectItem value="speakers">{text.speakers}</SelectItem>
          <SelectItem value="car_holders">{text.car_holders}</SelectItem>
          <SelectItem value="cleaning_kits">{text.cleaning_kits}</SelectItem>
          <SelectItem value="batteries">{text.batteries}</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Image Upload */}
    <div className="space-y-4">
      <Label>{text.image}</Label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant={imageUploadMethod === 'url' ? 'default' : 'outline'}
          onClick={() => setImageUploadMethod('url')}
          size="sm"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          {text.useImageUrl}
        </Button>
        <Button
          type="button"
          variant={imageUploadMethod === 'upload' ? 'default' : 'outline'}
          onClick={() => setImageUploadMethod('upload')}
          size="sm"
        >
          <Upload className="h-4 w-4 mr-2" />
          {text.uploadFromDevice}
        </Button>
      </div>

      {imageUploadMethod === 'url' ? (
        <Input
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
      ) : (
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
      )}

      {formData.image && (
        <div className="mt-2">
          <img src={formData.image} alt="Preview" className="w-32 h-24 object-cover rounded" />
        </div>
      )}
    </div>
  </div>
);

// ===== Component الرئيسي =====
export const GalleryManagement: React.FC = () => {
  const { language } = useLanguage();
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useStore();
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [imageUploadMethod, setImageUploadMethod] = useState<'url' | 'upload'>('url');
  const [formData, setFormData] = useState({
    title: '',
    // titleEn: '',
    description: '',
    // descriptionEn: '',
    image: '',
    category: ''
  });

  // ===== نصوص باللغة العربية والإنجليزية =====
  const text = {
    ar: {
      title: 'إدارة معرض الأعمال',
      description: 'إضافة وتعديل عناصر معرض الأعمال',
      addItem: 'إضافة عنصر جديد',
      editItem: 'تعديل العنصر',
      itemTitle: 'العنوان (عربي)',
      itemTitleEn: 'العنوان (إنجليزي)',
      itemDescription: 'الوصف (عربي)',
      descriptionEn: 'الوصف (إنجليزي)',
      image: 'رابط الصورة',
      imageUpload: 'رفع صورة',
      category: 'الفئة',
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      itemAdded: 'تم إضافة العنصر بنجاح',
      itemUpdated: 'تم تحديث العنصر بنجاح',
      itemDeleted: 'تم حذف العنصر بنجاح',
      noItems: 'لا توجد عناصر في المعرض',
      soap: 'صابون',
      cream: 'كريم',
      oil: 'زيت',
      uploadFromDevice: 'رفع من الجهاز',
      useImageUrl: 'استخدام رابط',
      phones: 'هواتف',
      repairs: 'إصلاحات',
      buy_sell: 'شراء وبيع',
      cases: 'أغطية',
      chargers: 'شواحن',
      headphones: 'سماعات',
      wireless_headphones: 'سماعات لاسلكية',
      smartwatches: 'ساعات ذكية',
      powerbanks: 'باور بانك',
      accessories: 'إكسسوارات',
      screen_protectors: 'حمايات شاشة',
      speakers: 'سماعات خارجية',
      car_holders: 'حامل سيارة',
      cleaning_kits: 'أدوات تنظيف',
      batteries: 'بطاريات'
    },
    en: {
      title: 'Gallery Management',
      description: 'Add and edit gallery items',
      addItem: 'Add New Item',
      editItem: 'Edit Item',
      itemTitle: 'Title (Arabic)',
      itemTitleEn: 'Title (English)',
      itemDescription: 'Description (Arabic)',
      descriptionEn: 'Description (English)',
      image: 'Image URL',
      imageUpload: 'Upload Image',
      category: 'Category',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      itemAdded: 'Item added successfully',
      itemUpdated: 'Item updated successfully',
      itemDeleted: 'Item deleted successfully',
      noItems: 'No gallery items found',
      soap: 'Soap',
      cream: 'Cream',
      oil: 'Oil',
      uploadFromDevice: 'Upload from device',
      useImageUrl: 'Use image URL',
      phones: 'Phones',
      repairs: 'Repairs',
      buy_sell: 'Buy/Sell',
      cases: 'Cases',
      chargers: 'Chargers',
      headphones: 'Headphones',
      wireless_headphones: 'Wireless Headphones',
      smartwatches: 'Smartwatches',
      powerbanks: 'Powerbanks',
      accessories: 'Accessories',
      screen_protectors: 'Screen Protectors',
      speakers: 'Speakers',
      car_holders: 'Car Holders',
      cleaning_kits: 'Cleaning Kits',
      batteries: 'Batteries'
    }
  };

  const resetForm = () => {
    setFormData({ title:'', description:'', image:'', category:'' });
    setImageUploadMethod('url');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    const newItem = {
      title: formData.title,
      // titleEn: formData.titleEn,
      description: formData.description,
      // descriptionEn: formData.descriptionEn,
      image: formData.image || '/api/placeholder/400/300',
      category: formData.category
    };

    addGalleryItem(newItem);
    toast({ title: text[language].itemAdded, description: text[language].itemAdded });
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      // titleEn: item.titleEn,
      description: item.description,
      // descriptionEn: item.descriptionEn,
      image: item.image,
      category: item.category
    });
  };

  const handleUpdate = () => {
    if (!editingItem || !formData.title || !formData.description ) {
      toast({ title: 'خطأ', description: 'يرجى ملء جميع الحقول المطلوبة', variant: 'destructive' });
      return;
    }

    const updatedItem = {
      title: formData.title,
      // titleEn: formData.titleEn,
      description: formData.description,
      // descriptionEn: formData.descriptionEn,
      image: formData.image,
      category: formData.category
    };

    updateGalleryItem(editingItem.id, updatedItem);
    toast({ title: text[language].itemUpdated, description: text[language].itemUpdated });
    resetForm();
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    deleteGalleryItem(id);
    toast({ title: text[language].itemDeleted, description: text[language].itemDeleted });
  };

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{text[language].title}</h1>
          <p className="text-muted-foreground">{text[language].description}</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" /> {text[language].addItem}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{text[language].addItem}</DialogTitle></DialogHeader>
            <ItemForm
              formData={formData}
              setFormData={setFormData}
              text={text[language]}
              imageUploadMethod={imageUploadMethod}
              setImageUploadMethod={setImageUploadMethod}
              handleImageUpload={handleImageUpload}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>{text[language].cancel}</Button>
              <Button onClick={handleAdd}>{text[language].save}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img src={item.image} alt={language==='ar'?item.title:item.title} className="w-full h-48 object-cover rounded-lg"/>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">{language==='ar'?item.title:item.title}</CardTitle>
              <CardDescription className="mb-4">{language==='ar'?item.description:item.description}</CardDescription>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4"/></Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4"/></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {galleryItems.length === 0 && (
          <Card className="p-12 text-center">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">{text[language].noItems}</p>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* <DialogHeader><DialogTitle>{text[language].editItem}</DialogTitle></DialogHeader> */}
          <ItemForm
            formData={formData}
            setFormData={setFormData}
            text={text[language]}
            imageUploadMethod={imageUploadMethod}
            setImageUploadMethod={setImageUploadMethod}
            handleImageUpload={handleImageUpload}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>{text[language].cancel}</Button>
            <Button onClick={handleUpdate}>{text[language].save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
