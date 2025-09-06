import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Offer {
  id: string;
  title: string;
  description?: string;
  title_en?: string;
  description_en?: string;
  discount_percentage?: number;
  image_url?: string;
  is_active?: boolean;
  expires_at?: string;
  created_at?: string;
  // Legacy properties for backward compatibility
  titleEn?: string;
  descriptionEn?: string;
}

export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Add backward compatibility properties
      const mappedData = (data || []).map(offer => ({
        ...offer,
        titleEn: offer.title_en,
        descriptionEn: offer.description_en
      }));
      
      setOffers(mappedData);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل العروض',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addOffer = async (offer: Omit<Offer, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .insert([{ ...offer, is_active: true }])
        .select()
        .single();

      if (error) throw error;
      
      setOffers(prev => [data, ...prev]);
      toast({
        title: 'تم بنجاح',
        description: 'تم إضافة العرض بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error adding offer:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة العرض',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateOffer = async (id: string, updates: Partial<Offer>) => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setOffers(prev => prev.map(o => o.id === id ? data : o));
      toast({
        title: 'تم بنجاح',
        description: 'تم تحديث العرض بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error updating offer:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث العرض',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setOffers(prev => prev.filter(o => o.id !== id));
      toast({
        title: 'تم بنجاح',
        description: 'تم حذف العرض بنجاح',
      });
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف العرض',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return {
    offers,
    loading,
    addOffer,
    updateOffer,
    deleteOffer,
    refetch: fetchOffers,
  };
};