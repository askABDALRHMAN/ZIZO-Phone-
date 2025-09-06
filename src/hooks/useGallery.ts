import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface GalleryItem {
  id: string;
  title?: string;
  description?: string;
  title_en?: string;
  description_en?: string;
  image_url: string;
  category?: string;
  created_at?: string;
  // Legacy properties for backward compatibility
  titleEn?: string;
  descriptionEn?: string;
  image?: string;
}

export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Add backward compatibility properties
      const mappedData = (data || []).map(item => ({
        ...item,
        titleEn: item.title_en,
        descriptionEn: item.description_en,
        image: item.image_url
      }));
      
      setGalleryItems(mappedData);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل عناصر المعرض',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      
      setGalleryItems(prev => [data, ...prev]);
      toast({
        title: 'تم بنجاح',
        description: 'تم إضافة العنصر بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error adding gallery item:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة العنصر',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateGalleryItem = async (id: string, updates: Partial<GalleryItem>) => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setGalleryItems(prev => prev.map(item => item.id === id ? data : item));
      toast({
        title: 'تم بنجاح',
        description: 'تم تحديث العنصر بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error updating gallery item:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث العنصر',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setGalleryItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: 'تم بنجاح',
        description: 'تم حذف العنصر بنجاح',
      });
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف العنصر',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return {
    galleryItems,
    loading,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    refetch: fetchGalleryItems,
  };
};