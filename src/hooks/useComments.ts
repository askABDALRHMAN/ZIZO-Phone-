import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Comment {
  id: string;
  customer_name: string;
  comment_text: string;
  product_id: string;
  created_at?: string;
  // Legacy properties for backward compatibility
  name?: string;
  comment?: string;
  productId?: string;
  productImage?: string;
  productName?: string;
  isOfficial?: boolean;
  timestamp?: Date;
}

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل التعليقات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (comment: Omit<Comment, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([comment])
        .select()
        .single();

      if (error) throw error;
      
      setComments(prev => [data, ...prev]);
      toast({
        title: 'تم بنجاح',
        description: 'تم إضافة التعليق بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة التعليق',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setComments(prev => prev.filter(c => c.id !== id));
      toast({
        title: 'تم بنجاح',
        description: 'تم حذف التعليق بنجاح',
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف التعليق',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    loading,
    addComment,
    deleteComment,
    refetch: fetchComments,
  };
};