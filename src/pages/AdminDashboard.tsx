
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Activity, 
  Settings, 
  LogOut, 
  Calendar,
  Clock
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const AdminDashboard = () => {
  const { adminUser, logout, isLoading } = useAdmin();
  const navigate = useNavigate();

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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Admin Info Card */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users size={20} />
                Admin Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Username</p>
                <p className="text-white font-medium">{adminUser.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account Created</p>
                <p className="text-white text-sm flex items-center gap-2">
                  <Calendar size={14} />
                  {formatDate(adminUser.created_at)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Login</p>
                <p className="text-white text-sm flex items-center gap-2">
                  <Clock size={14} />
                  {formatDate(adminUser.last_login)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <Badge 
                  variant={adminUser.is_active ? "default" : "destructive"}
                  className={adminUser.is_active ? "bg-green-500/20 text-green-400" : ""}
                >
                  {adminUser.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity size={20} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-soft-blue/50 text-soft-blue hover:bg-soft-blue/10"
              >
                <Users size={16} className="mr-2" />
                Manage Users
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-soft-green/50 text-soft-green hover:bg-soft-green/10"
              >
                <Activity size={16} className="mr-2" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-soft-purple/50 text-soft-purple hover:bg-soft-purple/10"
              >
                <Settings size={16} className="mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings size={20} />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Database</span>
                <Badge className="bg-green-500/20 text-green-400">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Authentication</span>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">API Services</span>
                <Badge className="bg-green-500/20 text-green-400">Running</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Management Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-dark-lighter rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-white text-sm">Admin login successful</p>
                    <p className="text-gray-400 text-xs">Just now</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-dark-lighter rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div>
                    <p className="text-white text-sm">System status check</p>
                    <p className="text-gray-400 text-xs">5 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-dark-lighter"
                  onClick={() => navigate('/')}
                >
                  Back to Main Site
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-dark-lighter"
                >
                  User Management
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-dark-lighter"
                >
                  Content Management
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-dark-lighter"
                >
                  System Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
