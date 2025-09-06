
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DashboardHome } from '@/components/admin/DashboardHome';
import { ProductsManagement } from '@/components/admin/ProductsManagement';
import { ReviewsManagement } from '@/components/admin/ReviewsManagement';
import { MessagesManagement } from '@/components/admin/MessagesManagement';
import { AnalyticsManagement } from '@/components/admin/AnalyticsManagement';
import { EnhancedAnalyticsManagement } from '@/components/admin/EnhancedAnalyticsManagement';
import { AccountSettings } from '@/components/admin/AccountSettings';
import { FAQManagement } from '@/components/admin/FAQManagement';
import { GalleryManagement } from '@/components/admin/GalleryManagement';
import { CommentsManagement } from '@/components/admin/CommentsManagement';

export type AdminSection = 
  | 'dashboard' 
  | 'products' 
  | 'reviews' 
  | 'messages' 
  | 'comments'
  | 'faq'
  | 'gallery'
  | 'analytics' 
  | 'settings';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const { isAdmin } = useStore();
  const { language } = useLanguage();

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'products':
        return <ProductsManagement />;
      case 'reviews':
        return <ReviewsManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'analytics':
        return <EnhancedAnalyticsManagement />;
      case 'settings':
        return <AccountSettings />;
      case 'faq':
        return <FAQManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'comments':
        return <CommentsManagement />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Desktop: Sidebar positioned based on language */}
        <div className={`hidden lg:block ${language === 'ar' ? 'order-2' : 'order-1'}`}>
          <AdminSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>
        
        {/* Main content area */}
        <div className={`flex-1 flex flex-col ${language === 'ar' ? 'order-1' : 'order-2'}`}>
          <AdminHeader 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
          />
          <main className="flex-1 p-6 bg-background">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
