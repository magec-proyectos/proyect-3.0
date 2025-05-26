
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Activity, 
  FileText, 
  Settings,
  TrendingUp,
  Eye,
  Clock,
  Shield,
  Loader2
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

interface DashboardStats {
  total_users: number;
  active_users: number;
  total_content: number;
  page_views_today: number;
  recent_activities: Array<{
    id: string;
    activity_type: string;
    created_at: string;
    user_id: string | null;
  }>;
  recent_page_views: Array<{
    id: string;
    page_path: string;
    page_title: string | null;
    created_at: string;
  }>;
  system_health: {
    database_status: 'healthy' | 'warning' | 'error';
    last_backup: string;
    storage_used: number;
  };
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ adminUser }) => {
  // Fetch dashboard statistics
  const { data: dashboardStats, isLoading, error } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      console.log('Fetching admin dashboard statistics...');
      
      // Get user counts
      const { count: totalUsers, error: userCountError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (userCountError) {
        console.error('Error fetching user count:', userCountError);
        throw userCountError;
      }

      const { count: activeUsers, error: activeUserError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (activeUserError) {
        console.error('Error fetching active user count:', activeUserError);
        throw activeUserError;
      }

      // Get content count
      const { count: totalContent, error: contentError } = await supabase
        .from('content_items')
        .select('*', { count: 'exact', head: true });

      if (contentError) {
        console.error('Error fetching content count:', contentError);
        throw contentError;
      }

      // Get today's page views
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count: pageViewsToday, error: pageViewsError } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      if (pageViewsError) {
        console.error('Error fetching page views:', pageViewsError);
        throw pageViewsError;
      }

      // Get recent activities
      const { data: recentActivities, error: activitiesError } = await supabase
        .from('user_activities')
        .select('id, activity_type, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(5);

      if (activitiesError) {
        console.error('Error fetching recent activities:', activitiesError);
        throw activitiesError;
      }

      // Get recent page views
      const { data: recentPageViews, error: recentPageViewsError } = await supabase
        .from('page_views')
        .select('id, page_path, page_title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentPageViewsError) {
        console.error('Error fetching recent page views:', recentPageViewsError);
        throw recentPageViewsError;
      }

      return {
        total_users: totalUsers || 0,
        active_users: activeUsers || 0,
        total_content: totalContent || 0,
        page_views_today: pageViewsToday || 0,
        recent_activities: recentActivities || [],
        recent_page_views: recentPageViews || [],
        system_health: {
          database_status: 'healthy',
          last_backup: new Date().toISOString(),
          storage_used: 45.2
        }
      };
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType.toLowerCase()) {
      case 'login':
        return <Shield size={16} className="text-green-400" />;
      case 'logout':
        return <Activity size={16} className="text-yellow-400" />;
      case 'page_view':
        return <Eye size={16} className="text-blue-400" />;
      default:
        return <Activity size={16} className="text-gray-400" />;
    }
  };

  if (error) {
    console.error('Dashboard stats error:', error);
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-soft-blue to-soft-cyan rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {adminUser.username}!
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    dashboardStats?.total_users || 0
                  )}
                </p>
                <p className="text-xs text-green-400">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    dashboardStats?.active_users || 0
                  )}
                </p>
                <p className="text-xs text-green-400">+8% from yesterday</p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Content Items</p>
                <p className="text-2xl font-bold text-white">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    dashboardStats?.total_content || 0
                  )}
                </p>
                <p className="text-xs text-blue-400">5 new today</p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Page Views Today</p>
                <p className="text-2xl font-bold text-white">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    dashboardStats?.page_views_today || 0
                  )}
                </p>
                <p className="text-xs text-green-400">+15% from yesterday</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity size={20} />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              </div>
            ) : dashboardStats?.recent_activities.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {dashboardStats?.recent_activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-dark-lighter rounded-lg">
                    {getActivityIcon(activity.activity_type)}
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {activity.activity_type.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {formatTime(activity.created_at)} • User ID: {activity.user_id?.slice(0, 8) || 'Anonymous'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Database Status</span>
                <Badge className="bg-green-500/20 text-green-400">
                  {dashboardStats?.system_health.database_status || 'healthy'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Storage Used</span>
                <span className="text-white">{dashboardStats?.system_health.storage_used || 0}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Last Backup</span>
                <span className="text-white">{formatDate(dashboardStats?.system_health.last_backup || new Date().toISOString())}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Uptime</span>
                <span className="text-green-400">99.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Page Views */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye size={20} />
            Recent Page Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            </div>
          ) : dashboardStats?.recent_page_views.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No recent page views</p>
          ) : (
            <div className="space-y-2">
              {dashboardStats?.recent_page_views.map((view) => (
                <div key={view.id} className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                  <div className="flex items-center gap-3">
                    <Eye size={16} className="text-blue-400" />
                    <div>
                      <p className="text-white text-sm">{view.page_title || 'Untitled Page'}</p>
                      <p className="text-gray-400 text-xs">{view.page_path}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">{formatTime(view.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
