
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Globe,
  Activity,
  Calendar,
  Download
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock analytics data
  const overviewStats = [
    {
      title: 'Page Views',
      value: '124,532',
      change: '+12.5%',
      trend: 'up',
      icon: Eye
    },
    {
      title: 'Unique Visitors',
      value: '45,231',
      change: '+8.2%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Avg. Session Duration',
      value: '4m 32s',
      change: '-2.1%',
      trend: 'down',
      icon: Clock
    },
    {
      title: 'Bounce Rate',
      value: '32.4%',
      change: '-5.3%',
      trend: 'up',
      icon: TrendingDown
    }
  ];

  const topPages = [
    { path: '/', views: 12453, title: 'Homepage' },
    { path: '/sports', views: 8921, title: 'Sports Betting' },
    { path: '/casino', views: 6234, title: 'Casino Games' },
    { path: '/roulette', views: 4532, title: 'Roulette' },
    { path: '/blackjack', views: 3421, title: 'Blackjack' }
  ];

  const userActivity = [
    { action: 'User Registration', count: 234, change: '+15%' },
    { action: 'Bet Placed', count: 1563, change: '+8%' },
    { action: 'Game Started', count: 892, change: '+22%' },
    { action: 'Deposit Made', count: 156, change: '+12%' },
    { action: 'Withdrawal', count: 89, change: '-3%' }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-gray-400">Monitor your platform's performance and user engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? 'bg-soft-blue text-white' : 'border-dark-border text-gray-400'}
              >
                {range}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="border-dark-border text-gray-400 hover:text-white">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = getTrendIcon(stat.trend);
          return (
            <Card key={index} className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-xs flex items-center gap-1 ${getTrendColor(stat.trend)}`}>
                      <TrendIcon size={12} />
                      {stat.change} from last period
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-dark-card">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 size={20} />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                      <div>
                        <p className="text-white font-medium">{page.title}</p>
                        <p className="text-gray-400 text-sm">{page.path}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{page.views.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Activity */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity size={20} />
                  User Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-sm">Last {timeRange}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{activity.count}</p>
                        <p className={`text-sm ${activity.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {activity.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Traffic Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Traffic analytics chart coming soon</p>
                <p className="text-gray-500 text-sm">Detailed traffic patterns and sources</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">User analytics coming soon</p>
                <p className="text-gray-500 text-sm">User demographics and behavior analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Revenue analytics coming soon</p>
                <p className="text-gray-500 text-sm">Revenue tracking and financial insights</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
