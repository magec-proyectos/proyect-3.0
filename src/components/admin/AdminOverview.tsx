
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Activity, 
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Globe,
  Database,
  Shield
} from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  created_at: string;
  last_login: string | null;
  is_active: boolean;
}

interface AdminOverviewProps {
  adminUser: AdminUser;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ adminUser }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">1,234</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp size={12} />
                  +12% from last month
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Sessions</p>
                <p className="text-2xl font-bold text-white">89</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp size={12} />
                  +5% from yesterday
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">System Health</p>
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <CheckCircle size={12} />
                  All systems operational
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-white">$12,543</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp size={12} />
                  +8% from last month
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* System Status */}
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database size={20} />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Database</span>
              <Badge className="bg-green-500/20 text-green-400">
                <CheckCircle size={12} className="mr-1" />
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Authentication</span>
              <Badge className="bg-green-500/20 text-green-400">
                <CheckCircle size={12} className="mr-1" />
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">API Services</span>
              <Badge className="bg-green-500/20 text-green-400">
                <CheckCircle size={12} className="mr-1" />
                Running
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Storage</span>
              <Badge className="bg-green-500/20 text-green-400">
                <CheckCircle size={12} className="mr-1" />
                Available
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-dark-lighter rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">Admin login successful</p>
                <p className="text-gray-400 text-xs">Just now</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-dark-lighter rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">System health check completed</p>
                <p className="text-gray-400 text-xs">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-dark-lighter rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">Database backup completed</p>
                <p className="text-gray-400 text-xs">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
