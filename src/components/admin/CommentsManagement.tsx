
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore, type Comment } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, MessageCircle, Star } from 'lucide-react';

export const CommentsManagement: React.FC = () => {
  const { language } = useLanguage();
  const { comments, products, addComment, deleteComment } = useStore();
  const { toast } = useToast();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    productId: ''
  });

  const text = {
    ar: {
      title: 'إدارة التعليقات',
      description: 'عرض وإدارة تعليقات العملاء على المنتجات',
      addComment: 'إضافة تعليق جديد',
      customerName: 'اسم العميل',
      comment: 'التعليق',
      product: 'المنتج',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      commentAdded: 'تم إضافة التعليق بنجاح',
      commentDeleted: 'تم حذف التعليق بنجاح',
      noComments: 'لا توجد تعليقات',
      official: 'رسمي',
      selectProduct: 'اختر المنتج'
    },
    en: {
      title: 'Comments Management',
      description: 'View and manage customer comments on products',
      addComment: 'Add New Comment',
      customerName: 'Customer Name',
      comment: 'Comment',
      product: 'Product',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      commentAdded: 'Comment added successfully',
      commentDeleted: 'Comment deleted successfully',
      noComments: 'No comments found',
      official: 'Official',
      selectProduct: 'Select Product'
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      comment: '',
      productId: ''
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.comment || !formData.productId) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    const selectedProduct = products.find(p => p.id === formData.productId);
    if (!selectedProduct) return;

    const newComment = {
      name: formData.name === 'موقع العناية الطبيعية' ? 'موقع العناية الطبيعية' : formData.name,
      comment: formData.comment,
      productId: formData.productId,
      productImage: selectedProduct.image,
      productName: language === 'ar' ? selectedProduct.name : selectedProduct.nameEn,
      isOfficial: formData.name === 'موقع العناية الطبيعية'
    };

    addComment(newComment);
    toast({
      title: text[language].commentAdded,
      description: text[language].commentAdded,
    });
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteComment(id);
    toast({
      title: text[language].commentDeleted,
      description: text[language].commentDeleted,
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
              {text[language].addComment}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{text[language].addComment}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">{text[language].customerName}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="اسم العميل أو 'موقع العناية الطبيعية' للتعليق الرسمي"
                />
              </div>
              
              <div>
                <Label htmlFor="productId">{text[language].product}</Label>
                <Select value={formData.productId} onValueChange={(value) => setFormData(prev => ({ ...prev, productId: value }))}>
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
                <Label htmlFor="comment">{text[language].comment}</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>
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

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={comment.productImage} 
                    alt={comment.productName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {comment.name}
                      {comment.isOfficial && (
                        <Badge variant="default" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          {text[language].official}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {comment.productName}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground mt-3">
                    {new Date(comment.timestamp).toLocaleDateString('en-GB')}
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{comment.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {comments.length === 0 && (
        <Card className="p-12 text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foregroundi">{text[language].noComments}</p>
        </Card>
      )}
    </div>
  );
};
