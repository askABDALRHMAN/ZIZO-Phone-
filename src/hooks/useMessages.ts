import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  product_id?: string;
  is_read?: boolean;
  created_at?: string;
  // Legacy properties for backward compatibility
  productId?: string;
  timestamp?: Date;
  read?: boolean;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الرسائل',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (message: Omit<Message, 'id' | 'created_at' | 'is_read'>) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{ ...message, is_read: false }])
        .select()
        .single();

      if (error) throw error;
      
      setMessages(prev => [data, ...prev]);
      toast({
        title: 'تم بنجاح',
        description: 'تم إرسال الرسالة بنجاح',
      });
      return data;
    } catch (error) {
      console.error('Error adding message:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إرسال الرسالة',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setMessages(prev => prev.map(m => m.id === id ? data : m));
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة الرسالة',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessages(prev => prev.filter(m => m.id !== id));
      toast({
        title: 'تم بنجاح',
        description: 'تم حذف الرسالة بنجاح',
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف الرسالة',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    addMessage,
    markAsRead,
    deleteMessage,
    refetch: fetchMessages,
  };
};