import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MessagesManagement: React.FC = () => {
  const { language } = useLanguage();
  const { messages, deleteMessage, markMessageAsRead } = useStore();
  const { toast } = useToast();

  const text = {
    ar: {
      title: 'إدارة الرسائل',
      description: 'عرض وإدارة رسائل العملاء',
      delete: 'حذف',
      markAsRead: 'تحديد كمقروء',
      markAsUnread: 'تحديد كغير مقروء',
      unread: 'غير مقروء',
      read: 'مقروء',
      from: 'من',
      email: 'البريد الإلكتروني',
      noMessages: 'لا توجد رسائل',
      messageDeleted: 'تم حذف الرسالة بنجاح',
      messageMarkedAsRead: 'تم تحديد الرسالة كمقروءة'
    },
    en: {
      title: 'Messages Management',
      description: 'View and manage customer messages',
      delete: 'Delete',
      markAsRead: 'Mark as Read',
      markAsUnread: 'Mark as Unread',
      unread: 'Unread',
      read: 'Read',
      from: 'From',
      email: 'Email',
      noMessages: 'No messages found',
      messageDeleted: 'Message deleted successfully',
      messageMarkedAsRead: 'Message marked as read'
    }
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
    toast({
      title: text[language].messageDeleted,
      description: text[language].messageDeleted,
    });
  };

  const handleMarkAsRead = (id: string) => {
    markMessageAsRead(id);
    toast({
      title: text[language].messageMarkedAsRead,
      description: text[language].messageMarkedAsRead,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{text[language].title}</h1>
        <p className="text-muted-foreground">{text[language].description}</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`${!message.read ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className={`h-5 w-5 ${!message.read ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <CardTitle className="text-base">{message.name}</CardTitle>
                    <CardDescription>{message.email}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={message.read ? "secondary" : "default"}>
                    {message.read ? text[language].read : text[language].unread}
                  </Badge>
                  
                  <div className="text-xs text-muted-foreground mt-3">
                    {new Date(message.timestamp).toLocaleDateString('en-GB')}
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMarkAsRead(message.id)}
                    >
                      {message.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
              {message.productId && (
                <Badge variant="outline" className="mt-2">
                  Product ID: {message.productId}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <Card className="p-12 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{text[language].noMessages}</p>
        </Card>
      )}
    </div>
  );
};