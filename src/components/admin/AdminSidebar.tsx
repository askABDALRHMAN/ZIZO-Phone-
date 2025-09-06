
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  Star, 
  BookOpen, 
  MessageSquare, 
  Mail, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  HelpCircle,
  Image as ImageIcon,
  MessageCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import type { AdminSection } from '@/pages/AdminDashboard';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const { language } = useLanguage();
  const { logout } = useStore();
  const navigate = useNavigate();

  const text = {
    ar: {
      adminPanel: 'لوحة التحكم',
      dashboard: 'الرئيسية',
      products: 'المنتجات',
      offers: 'العروض',
      features: 'المميزات',
      blog: 'المدونة',
      reviews: 'المراجعات',
      messages: 'الرسائل',
      users: 'المستخدمين',
      analytics: 'الإحصائيات',
      settings: 'الإعدادات',
      faq: 'الأسئلة الشائعة',
      gallery: 'معرض الأعمال',
      comments: 'التعليقات',
      logout: 'تسجيل الخروج'
    },
    en: {
      adminPanel: 'Admin Panel',
      dashboard: 'Dashboard',
      products: 'Products',
      offers: 'Offers',
      features: 'Features',
      blog: 'Blog',
      reviews: 'Reviews',
      messages: 'Messages',
      users: 'Users',
      analytics: 'Analytics',
      settings: 'Settings',
      faq: 'FAQ',
      gallery: 'Gallery',
      comments: 'Comments',
      logout: 'Logout'
    }
  };

  const menuItems = [
    { id: 'dashboard' as AdminSection, label: text[language].dashboard, icon: LayoutDashboard },
    { id: 'products' as AdminSection, label: text[language].products, icon: Package },
    { id: 'reviews' as AdminSection, label: text[language].reviews, icon: MessageSquare },
    { id: 'messages' as AdminSection, label: text[language].messages, icon: Mail },
    { id: 'comments' as AdminSection, label: text[language].comments, icon: MessageCircle },
    { id: 'faq' as AdminSection, label: text[language].faq, icon: HelpCircle },
    { id: 'gallery' as AdminSection, label: text[language].gallery, icon: ImageIcon },
    { id: 'analytics' as AdminSection, label: text[language].analytics, icon: BarChart3 },
    { id: 'settings' as AdminSection, label: text[language].settings, icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-64 border-r border-border w-full h-full flex flex-col bg-background ">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-primary">
          {text[language].adminPanel}
        </h2>
      </SidebarHeader>
      
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full ${
                      activeSection === item.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <Button 
              variant="outline" 
              className="w-full "
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {text[language].logout}
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
};
