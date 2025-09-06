import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';
import { toast } from '../hooks/use-toast';

interface ContactFormProps {
  productId?: string;
  onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ productId, onSuccess }) => {
  const { t } = useLanguage();
  const { addMessage } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        productId
      });

      toast({
        title: 'تم الإرسال بنجاح',
        description: t('contact.form.success'),
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('contact.form.name')}</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="أدخل اسمك الكامل"
          required
          className="transition-smooth"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('contact.form.email')}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="أدخل بريدك الإلكتروني"
          required
          className="transition-smooth"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('contact.form.message')}</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="اكتب رسالتك هنا..."
          rows={4}
          required
          className="transition-smooth resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full button-gradient text-white hover-lift "
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
            جاري الإرسال...
          </div>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            {t('contact.form.send')}
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;