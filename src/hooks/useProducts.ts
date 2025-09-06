import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  description?: string;
  name_en?: string;
  description_en?: string;
  price: number;
  original_price?: number;
  image_url?: string;
  category?: string;
  whatsapp_text?: string;
  is_featured?: boolean;
  is_new?: boolean;
  is_bestseller?: boolean;
  is_organic?: boolean;
  created_at?: string;
  updated_at?: string;
  // Legacy properties for backward compatibility
  nameEn?: string;
  descriptionEn?: string;
  originalPrice?: number;
  image?: string;
  ingredients?: string;
  ingredientsEn?: string;
  badge?: 'new' | 'bestseller' | 'organic';
  inStock?: boolean;
  messageCount?: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Add backward compatibility properties
      const mappedData = (data || []).map(product => ({
        ...product,
        nameEn: product.name_en,
        descriptionEn: product.description_en,
        originalPrice: product.original_price,
        image: product.image_url,
        messageCount: 0
      }));
      
      setProducts(mappedData);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل المنتجات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      
      setProducts(prev => [data, ...prev]);
      toast({
        title: 'تم بنجاح',
        description: 'تم إضافة المنتج بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة المنتج',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setProducts(prev => prev.map(p => p.id === id ? data : p));
      toast({
        title: 'تم بنجاح',
        description: 'تم تحديث المنتج بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث المنتج',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'تم بنجاح',
        description: 'تم حذف المنتج بنجاح',
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المنتج',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};