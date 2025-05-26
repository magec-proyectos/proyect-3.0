
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import AdminDashboardHeader from '@/components/admin/dashboard/AdminDashboardHeader';
import AdminDashboardTabs from '@/components/admin/dashboard/AdminDashboardTabs';
import AdminDashboardLoading from '@/components/admin/dashboard/AdminDashboardLoading';

const AdminDashboard = () => {
  const { adminUser, logout, isLoading } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isLoading && !adminUser) {
      navigate('/admin/login');
    }
  }, [adminUser, isLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (isLoading) {
    return <AdminDashboardLoading />;
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark">
      <AdminDashboardHeader 
        adminUser={adminUser} 
        onLogout={handleLogout} 
      />
      
      <div className="container mx-auto px-4 py-6">
        <AdminDashboardTabs 
          adminUser={adminUser}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
