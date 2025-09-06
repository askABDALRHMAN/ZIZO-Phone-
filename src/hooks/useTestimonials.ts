import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_image?: string;
  comment: string;
  rating?: number;
  is_approved?: boolean;
  created_at?: string;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الشهادات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{ ...testimonial, is_approved: false }])
        .select()
        .single();

      if (error) throw error;
      
      // Only add to state if approved (admin will need to approve)
      if (data.is_approved) {
        setTestimonials(prev => [data, ...prev]);
      }
      
      toast({
        title: 'تم بنجاح',
        description: 'تم إرسال الشهادة وستظهر بعد المراجعة',
      });
      return data;
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إرسال الشهادة',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const approveTestimonial = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update({ is_approved: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setTestimonials(prev => [data, ...prev]);
      toast({
        title: 'تم بنجاح',
        description: 'تم قبول الشهادة',
      });
      return data;
    } catch (error) {
      console.error('Error approving testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في قبول الشهادة',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTestimonials(prev => prev.filter(t => t.id !== id));
      toast({
        title: 'تم بنجاح',
        description: 'تم حذف الشهادة بنجاح',
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف الشهادة',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    addTestimonial,
    approveTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials,
  };
};