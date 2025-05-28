
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Monitor, Bell, BarChart3 } from 'lucide-react';
import DashboardCustomizer from '@/components/dashboard/DashboardCustomizer';
import HighDensityMode from '@/components/dashboard/HighDensityMode';
import EnhancedNotificationSystem from '@/components/notifications/EnhancedNotificationSystem';
import { EnhancedNotificationContainer } from '@/components/ui/enhanced-notification';
import { useEnhancedNotifications } from '@/hooks/useEnhancedNotifications';

const AdvancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('customization');
  const { notifications, dismissNotification } = useEnhancedNotifications();

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Advanced Dashboard</h1>
          <p className="text-gray-400">
            Customize your experience with advanced features and settings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-neon-blue" />
                <div>
                  <p className="text-sm text-gray-400">Active Customizations</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Monitor className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Density Mode</p>
                  <p className="text-2xl font-bold">High</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Notifications</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Space Saved</p>
                  <p className="text-2xl font-bold">35%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-dark-card border border-dark-border">
            <TabsTrigger 
              value="customization" 
              className="data-[state=active]:bg-neon-blue data-[state=active]:text-black"
            >
              <Settings className="h-4 w-4 mr-2" />
              Customization
            </TabsTrigger>
            <TabsTrigger 
              value="density" 
              className="data-[state=active]:bg-neon-blue data-[state=active]:text-black"
            >
              <Monitor className="h-4 w-4 mr-2" />
              High Density
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-neon-blue data-[state=active]:text-black"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customization" className="space-y-6">
            <DashboardCustomizer />
          </TabsContent>

          <TabsContent value="density" className="space-y-6">
            <HighDensityMode />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <EnhancedNotificationSystem />
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Notification Container */}
      <EnhancedNotificationContainer
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top-right"
      />
    </div>
  );
};

export default AdvancedDashboard;
