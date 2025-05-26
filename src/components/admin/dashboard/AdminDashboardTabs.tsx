
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Users, 
  FileText, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import AdminOverview from '@/components/admin/AdminOverview';
import UserManagement from '@/components/admin/UserManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import Analytics from '@/components/admin/Analytics';
import SystemSettings from '@/components/admin/SystemSettings';

interface AdminUser {
  id: string;
  username: string;
  created_at: string;
  last_login: string | null;
  is_active: boolean;
}

interface AdminDashboardTabsProps {
  adminUser: AdminUser;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AdminDashboardTabs: React.FC<AdminDashboardTabsProps> = ({ 
  adminUser, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-5 bg-dark-card">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <Activity size={16} />
          Overview
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users size={16} />
          Users
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2">
          <FileText size={16} />
          Content
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 size={16} />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings size={16} />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <AdminOverview adminUser={adminUser} />
      </TabsContent>

      <TabsContent value="users" className="mt-6">
        <UserManagement />
      </TabsContent>

      <TabsContent value="content" className="mt-6">
        <ContentManagement />
      </TabsContent>

      <TabsContent value="analytics" className="mt-6">
        <Analytics />
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <SystemSettings />
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardTabs;
