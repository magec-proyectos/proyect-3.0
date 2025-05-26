
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  Activity, 
  Settings, 
  LogOut, 
  Calendar,
  Clock,
  BarChart3,
  FileText,
  Database,
  Lock,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import AdminOverview from '@/components/admin/AdminOverview';
import UserManagement from '@/components/admin/UserManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import Analytics from '@/components/admin/Analytics';
import SystemSettings from '@/components/admin/SystemSettings';

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
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-soft-blue to-soft-cyan rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, {adminUser.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                <CheckCircle size={14} className="mr-1" />
                Active Session
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
