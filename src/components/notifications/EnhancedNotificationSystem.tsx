
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Zap, Volume2, Smartphone, Monitor, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnhancedNotifications } from '@/hooks/useEnhancedNotifications';

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  mobile: boolean;
  frequency: 'all' | 'important' | 'critical';
  categories: {
    predictions: boolean;
    matches: boolean;
    achievements: boolean;
    system: boolean;
  };
}

const EnhancedNotificationSystem = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    sound: true,
    desktop: true,
    mobile: true,
    frequency: 'important',
    categories: {
      predictions: true,
      matches: true,
      achievements: true,
      system: false
    }
  });

  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  const { addNotification, addAchievementNotification, addStreakNotification } = useEnhancedNotifications();

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
    }
  };

  const handleSettingChange = (key: keyof NotificationSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleCategoryChange = (category: keyof NotificationSettings['categories']) => {
    setSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  const sendTestNotification = () => {
    // Send enhanced notification
    addNotification({
      type: 'info',
      title: 'Test Notification',
      message: 'This is a test of the enhanced notification system',
      duration: 5000,
      action: {
        label: 'View Details',
        onClick: () => console.log('Test notification action clicked')
      }
    });

    // Send browser notification if enabled
    if (settings.desktop && permissionStatus === 'granted') {
      new Notification('Enhanced Notification Test', {
        body: 'Your notification system is working correctly!',
        icon: '/favicon.ico'
      });
    }

    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  const sendAchievementTest = () => {
    addAchievementNotification(
      'Notification Master',
      'You successfully configured the notification system!'
    );
  };

  const sendStreakTest = () => {
    addStreakNotification(5, 'prediction');
  };

  const categories = [
    { key: 'predictions', label: 'Predictions', icon: Zap },
    { key: 'matches', label: 'Live Matches', icon: Monitor },
    { key: 'achievements', label: 'Achievements', icon: Bell },
    { key: 'system', label: 'System Updates', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-neon-blue" />
            Enhanced Notification System
            {settings.enabled && (
              <Badge variant="outline" className="text-green-400 border-green-400">
                Active
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Toggle */}
          <div className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg">
            <div>
              <h3 className="font-medium">Enable Notifications</h3>
              <p className="text-sm text-gray-400">
                Receive real-time updates and alerts
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => handleSettingChange('enabled', checked)}
            />
          </div>

          {/* Permission Status */}
          {permissionStatus !== 'granted' && settings.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-yellow-400">Browser Permission Required</h4>
                  <p className="text-sm text-gray-400">
                    Allow notifications to receive desktop alerts
                  </p>
                </div>
                <Button 
                  onClick={requestPermission}
                  variant="outline"
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                >
                  Enable
                </Button>
              </div>
            </motion.div>
          )}

          {/* Notification Types */}
          <div className="space-y-4">
            <h3 className="font-medium">Notification Channels</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Sound Alerts</span>
                </div>
                <Switch
                  checked={settings.sound}
                  onCheckedChange={(checked) => handleSettingChange('sound', checked)}
                  disabled={!settings.enabled}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Desktop Notifications</span>
                </div>
                <Switch
                  checked={settings.desktop}
                  onCheckedChange={(checked) => handleSettingChange('desktop', checked)}
                  disabled={!settings.enabled || permissionStatus !== 'granted'}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Mobile Push</span>
                </div>
                <Switch
                  checked={settings.mobile}
                  onCheckedChange={(checked) => handleSettingChange('mobile', checked)}
                  disabled={!settings.enabled}
                />
              </div>
            </div>
          </div>

          {/* Frequency Settings */}
          <div className="space-y-3">
            <h3 className="font-medium">Notification Frequency</h3>
            <Select 
              value={settings.frequency} 
              onValueChange={(value) => handleSettingChange('frequency', value)}
              disabled={!settings.enabled}
            >
              <SelectTrigger className="bg-dark-lighter border-dark-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark border-dark-border">
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="important">Important Only</SelectItem>
                <SelectItem value="critical">Critical Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-medium">Notification Categories</h3>
            
            <div className="grid gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isEnabled = settings.categories[category.key as keyof NotificationSettings['categories']];
                
                return (
                  <motion.div
                    key={category.key}
                    className={`p-3 rounded-lg border transition-all ${
                      isEnabled
                        ? 'bg-neon-blue/10 border-neon-blue/30'
                        : 'bg-dark-lighter border-dark-border'
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 ${
                          isEnabled ? 'text-neon-blue' : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-medium">{category.label}</span>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={() => handleCategoryChange(category.key as keyof NotificationSettings['categories'])}
                        disabled={!settings.enabled}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Test Notifications */}
          <div className="space-y-3 pt-4 border-t border-dark-border">
            <h3 className="font-medium">Test Notifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={sendTestNotification}
                variant="outline"
                disabled={!settings.enabled}
                className="relative"
              >
                <Bell className="h-4 w-4 mr-2" />
                Test Basic
                <AnimatePresence>
                  {testNotificationSent && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </Button>
              
              <Button
                onClick={sendAchievementTest}
                variant="outline"
                disabled={!settings.enabled}
              >
                <Zap className="h-4 w-4 mr-2" />
                Test Achievement
              </Button>
              
              <Button
                onClick={sendStreakTest}
                variant="outline"
                disabled={!settings.enabled}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Test Streak
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedNotificationSystem;
