
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Bot,
  TrendingUp 
} from 'lucide-react';
import AdminOverview from './AdminOverview';
import Analytics from './Analytics';
import UserManagement from './UserManagement';
import ContentManagement from './ContentManagement';
import SystemSettings from './SystemSettings';
import ChatbotManagement from './ChatbotManagement';

interface AdminDashboardTabsProps {
  activeTab?: string;
}

const AdminDashboardTabs: React.FC<AdminDashboardTabsProps> = ({ activeTab = 'overview' }) => {
  return (
    <Tabs defaultValue={activeTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-6 bg-dark-card">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <TrendingUp size={16} />
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 size={16} />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users size={16} />
          Users
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2">
          <FileText size={16} />
          Content
        </TabsTrigger>
        <TabsTrigger value="chatbot" className="flex items-center gap-2">
          <Bot size={16} />
          Chatbot
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings size={16} />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <AdminOverview />
      </TabsContent>

      <TabsContent value="analytics">
        <Analytics />
      </TabsContent>

      <TabsContent value="users">
        <UserManagement />
      </TabsContent>

      <TabsContent value="content">
        <ContentManagement />
      </TabsContent>

      <TabsContent value="chatbot">
        <ChatbotManagement />
      </TabsContent>

      <TabsContent value="settings">
        <SystemSettings />
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardTabs;
