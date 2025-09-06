import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  question_en?: string;
  answer_en?: string;
  order_index?: number;
  is_active?: boolean;
  created_at?: string;
  // Legacy properties for backward compatibility
  questionEn?: string;
  answerEn?: string;
  order?: number;
}

export const useFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      // Add backward compatibility properties
      const mappedData = (data || []).map(faq => ({
        ...faq,
        questionEn: faq.question_en,
        answerEn: faq.answer_en,
        order: faq.order_index
      }));
      
      setFaqs(mappedData);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الأسئلة الشائعة',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addFAQ = async (faq: Omit<FAQ, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .insert([{
          question: faq.question,
          answer: faq.answer,
          question_en: faq.question_en || faq.questionEn,
          answer_en: faq.answer_en || faq.answerEn,
          order_index: faq.order_index || faq.order || 0,
          is_active: true
        }])
        .select()
        .single();

      if (error) throw error;
      
      const mappedData = {
        ...data,
        questionEn: data.question_en,
        answerEn: data.answer_en,
        order: data.order_index
      };
      
      setFaqs(prev => [...prev, mappedData].sort((a, b) => (a.order_index || 0) - (b.order_index || 0)));
      toast({
        title: 'تم بنجاح',
        description: 'تم إضافة السؤال بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error adding FAQ:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة السؤال',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateFAQ = async (id: string, updates: Partial<FAQ>) => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .update({
          question: updates.question,
          answer: updates.answer,
          question_en: updates.question_en || updates.questionEn,
          answer_en: updates.answer_en || updates.answerEn,
          order_index: updates.order_index || updates.order,
          is_active: updates.is_active
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const mappedData = {
        ...data,
        questionEn: data.question_en,
        answerEn: data.answer_en,
        order: data.order_index
      };
      
      setFaqs(prev => prev.map(f => f.id === id ? mappedData : f).sort((a, b) => (a.order_index || 0) - (b.order_index || 0)));
      toast({
        title: 'تم بنجاح',
        description: 'تم تحديث السؤال بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث السؤال',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteFAQ = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setFaqs(prev => prev.filter(f => f.id !== id));
      toast({
        title: 'تم بنجاح',
        description: 'تم حذف السؤال بنجاح',
      });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف السؤال',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return {
    faqs,
    loading,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    refetch: fetchFAQs,
  };
};