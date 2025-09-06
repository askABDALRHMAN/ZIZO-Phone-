import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  review_text?: string;
  created_at?: string;
  // Legacy properties for backward compatibility
  name?: string;
  comment?: string;
  avatar?: string;
  productId?: string;
  timestamp?: Date;
}

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل التقييمات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (review: Omit<Review, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select()
        .single();

      if (error) throw error;
      
      setReviews(prev => [data, ...prev]);
      toast({
        title: 'تم بنجاح',
        description: 'تم إضافة التقييم بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة التقييم',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setReviews(prev => prev.filter(r => r.id !== id));
      toast({
        title: 'تم بنجاح',
        description: 'تم حذف التقييم بنجاح',
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف التقييم',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    addReview,
    deleteReview,
    refetch: fetchReviews,
  };
};