import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAdmin } = useStore();
  
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;