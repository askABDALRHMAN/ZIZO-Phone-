import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore, type FAQ } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react';

interface FAQFormProps {
  formData: {
    question: string;
    // questionEn: string;
    answer: string;
    // answerEn: string;
    order: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    question: string;
    // questionEn: string;
    answer: string;
    // answerEn: string;
    order: string;
  }>>;
  text: {
    question: string;
    // questionEn: string;
    answer: string;
    // answerEn: string;
    order: string;
  };
}

const FAQForm: React.FC<FAQFormProps> = ({ formData, setFormData, text }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label htmlFor="question">{text.question}</Label>
        <Textarea
          id="question"
          value={formData.question}
          onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
        />
      </div>
      {/* <div>
        <Label htmlFor="questionEn">{text.questionEn}</Label>
        <Textarea
          id="questionEn"
          value={formData.questionEn}
          onChange={(e) => setFormData(prev => ({ ...prev, questionEn: e.target.value }))}
        />
      </div> */}
    </div>

    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label htmlFor="answer">{text.answer}</Label>
        <Textarea
          id="answer"
          value={formData.answer}
          onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
        />
      </div>
      {/* <div>
        <Label htmlFor="answerEn">{text.answerEn}</Label>
        <Textarea
          id="answerEn"
          value={formData.answerEn}
          onChange={(e) => setFormData(prev => ({ ...prev, answerEn: e.target.value }))}
        />
      </div> */}
    </div>

    <div>
      <Label htmlFor="order">{text.order}</Label>
      <Input
        id="order"
        type="number"
        value={formData.order}
        onChange={(e) => setFormData(prev => ({ ...prev, order: e.target.value }))}
      />
    </div>
  </div>
);

export const FAQManagement: React.FC = () => {
  const { language } = useLanguage();
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useStore();
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    // questionEn: '',
    answer: '',
    // answerEn: '',/
    order: ''
  });

  const text = {
    ar: {
      title: 'إدارة الأسئلة الشائعة',
      description: 'إضافة وتعديل الأسئلة الشائعة',
      addFAQ: 'إضافة سؤال جديد',
      editFAQ: 'تعديل السؤال',
      question: 'السؤال (عربي)',
      questionEn: 'السؤال (إنجليزي)',
      answer: 'الإجابة (عربي)',
      answerEn: 'الإجابة (إنجليزي)',
      order: 'ترتيب السؤال',
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      faqAdded: 'تم إضافة السؤال بنجاح',
      faqUpdated: 'تم تحديث السؤال بنجاح',
      faqDeleted: 'تم حذف السؤال بنجاح',
      noFAQs: 'لا توجد أسئلة شائعة'
    },
    en: {
      title: 'FAQ Management',
      description: 'Add and edit frequently asked questions',
      addFAQ: 'Add New FAQ',
      editFAQ: 'Edit FAQ',
      question: 'Question (Arabic)',
      questionEn: 'Question (English)',
      answer: 'Answer (Arabic)',
      answerEn: 'Answer (English)',
      order: 'Question Order',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      faqAdded: 'FAQ added successfully',
      faqUpdated: 'FAQ updated successfully',
      faqDeleted: 'FAQ deleted successfully',
      noFAQs: 'No FAQs found'
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      // questionEn: '',
      answer: '',
      // answerEn: '',
      order: ''
    });
  };

  const handleAdd = () => {
    if (!formData.question || !formData.answer ) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    const newFAQ = {
      question: formData.question,
      // questionEn: formData.questionEn,
      answer: formData.answer,
      // answerEn: formData.answerEn,
      order: parseInt(formData.order) || faqs.length + 1
    };

    addFAQ(newFAQ);
    toast({
      title: text[language].faqAdded,
      description: text[language].faqAdded,
    });

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      // questionEn: faq.questionEn,
      answer: faq.answer,
      // answerEn: faq.answerEn,
      order: faq.order.toString()
    });
  };

  const handleUpdate = () => {
    if (!editingFAQ || !formData.question  || !formData.answer ) {
      toast({
        title: 'خطأ',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    const updatedFAQ = {
      question: formData.question,
      // questionEn: formData.questionEn,
      answer: formData.answer,
      // answerEn: formData.answerEn,
      order: parseInt(formData.order) || 1
    };

    updateFAQ(editingFAQ.id, updatedFAQ);
    toast({
      title: text[language].faqUpdated,
      description: text[language].faqUpdated,
    });

    resetForm();
    setEditingFAQ(null);
  };

  const handleDelete = (id: string) => {
    deleteFAQ(id);
    toast({
      title: text[language].faqDeleted,
      description: text[language].faqDeleted,
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
              {text[language].addFAQ}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{text[language].addFAQ}</DialogTitle>
            </DialogHeader>
            <FAQForm formData={formData} setFormData={setFormData} text={text[language]} />
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

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.sort((a, b) => a.order - b.order).map((faq) => (
          <Card key={faq.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{faq.order}</span>
                  </div>
                  <CardTitle className="text-base">
                    {language === 'ar' ? faq.question : faq.questionEn}
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(faq)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'ar' ? faq.answer : faq.answerEn}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {faqs.length === 0 && (
        <Card className="p-12 text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{text[language].noFAQs}</p>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingFAQ} onOpenChange={() => setEditingFAQ(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{text[language].editFAQ}</DialogTitle>
          </DialogHeader>
          <FAQForm formData={formData} setFormData={setFormData} text={text[language]} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingFAQ(null)}>
              {text[language].cancel}
            </Button>
            <Button onClick={handleUpdate}>
              {text[language].save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
