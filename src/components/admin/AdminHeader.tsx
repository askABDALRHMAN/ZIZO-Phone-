import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sun, Moon, Globe, Home, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { AdminSection } from '@/pages/AdminDashboard';
import { AdminSidebar } from './AdminSidebar';

interface AdminHeaderProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ activeSection, onSectionChange }) => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const text = {
    ar: {
      dashboard: 'الرئيسية',
      products: 'إدارة المنتجات',
      offers: 'إدارة العروض',
      features: 'إدارة المميزات',
      blog: 'إدارة المدونة',
      reviews: 'إدارة المراجعات',
      messages: 'إدارة الرسائل',
      users: 'إدارة المستخدمين',
      analytics: 'لوحة الإحصائيات',
      settings: 'إعدادات الحساب',
      viewSite: 'عرض الموقع'
    },
    en: {
      dashboard: 'Dashboard',
      products: 'Products Management',
      offers: 'Offers Management',
      features: 'Features Management',
      blog: 'Blog Management',
      reviews: 'Reviews Management',
      messages: 'Messages Management',
      users: 'Users Management',
      analytics: 'Analytics Dashboard',
      settings: 'Account Settings',
      viewSite: 'View Site'
    }
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={language === 'ar' ? 'right' : 'left'} className="p-0">
            <AdminSidebar 
              activeSection={activeSection} 
              onSectionChange={onSectionChange} 
            />
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-semibold text-foreground">
          {text[language][activeSection]}
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          {text[language].viewSite}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          {language === 'ar' ? 'EN' : 'ع'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
};