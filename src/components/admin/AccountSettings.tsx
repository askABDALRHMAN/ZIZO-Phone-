import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, Eye, EyeOff } from 'lucide-react';

export const AccountSettings: React.FC = () => {
  const { language } = useLanguage();
  const { logout } = useStore();
  const { toast } = useToast();
  
  const [username, setUsername] = useState(() => {
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{"username": "admin"}');
    return settings.username;
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const text = {
    ar: {
      title: 'إعدادات الحساب',
      description: 'إدارة بيانات حساب المدير',
      username: 'اسم المستخدم',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      save: 'حفظ التغييرات',
      logout: 'تسجيل الخروج',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      invalidCurrentPassword: 'كلمة المرور الحالية غير صحيحة',
      settingsUpdated: 'تم تحديث الإعدادات بنجاح',
      changePassword: 'تغيير كلمة المرور',
      accountInfo: 'معلومات الحساب'
    },
    en: {
      title: 'Account Settings',
      description: 'Manage admin account settings',
      username: 'Username',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      save: 'Save Changes',
      logout: 'Logout',
      passwordMismatch: 'Passwords do not match',
      invalidCurrentPassword: 'Current password is incorrect',
      settingsUpdated: 'Settings updated successfully',
      changePassword: 'Change Password',
      accountInfo: 'Account Information'
    }
  };

  const handleSaveSettings = () => {
    // Get current settings
    const currentSettings = JSON.parse(localStorage.getItem('adminSettings') || '{"username": "admin", "password": "admin123"}');
    
    // Check if trying to change password
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        toast({
          title: text[language].passwordMismatch,
          description: text[language].passwordMismatch,
          variant: 'destructive',
        });
        return;
      }

      if (currentPassword !== currentSettings.password) {
        toast({
          title: text[language].invalidCurrentPassword,
          description: text[language].invalidCurrentPassword,
          variant: 'destructive',
        });
        return;
      }
    }

    // Save the updated settings
    const adminSettings = {
      username: username,
      password: newPassword || currentSettings.password
    };
    
    try {
      localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
      
      toast({
        title: text[language].settingsUpdated,
        description: text[language].settingsUpdated,
      });

      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Force re-render by updating the username state
      setUsername(adminSettings.username);
      
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'خطأ في الحفظ',
        description: 'حدث خطأ أثناء حفظ الإعدادات',
        variant: 'destructive',
      });
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{text[language].title}</h1>
        <p className="text-muted-foreground">{text[language].description}</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {text[language].accountInfo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">{text[language].username}</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle>{text[language].changePassword}</CardTitle>
            <CardDescription>
              تأكد من استخدام كلمة مرور قوية لحماية حسابك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">{text[language].currentPassword}</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* <div>
              <Label htmlFor="newPassword">{text[language].newPassword}</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">{text[language].confirmPassword}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {/* <div className="flex gap-4">
          <Button onClick={handleSaveSettings} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {text[language].save}
          </Button>
          <Button variant="destructive" onClick={logout}>
            {text[language].logout}
          </Button>
        </div> */}
      </div>
    </div>
  );
};