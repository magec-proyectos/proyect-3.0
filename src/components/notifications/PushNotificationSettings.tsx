import React from 'react';
import { Bell, BellOff, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { toast } from '@/components/ui/sonner';

const PushNotificationSettings = () => {
  const {
    isSupported,
    isSubscribed,
    isLoading,
    permission,
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification
  } = usePushNotifications();

  const handleToggleNotifications = async () => {
    if (isSubscribed) {
      const success = await unsubscribe();
      if (success) {
        toast.success('Push notifications disabled');
      } else {
        toast.error('Failed to disable notifications');
      }
    } else {
      if (permission !== 'granted') {
        const newPermission = await requestPermission();
        if (newPermission !== 'granted') {
          toast.error('Permission denied. Please enable notifications in your browser settings.');
          return;
        }
      }
      
      const success = await subscribe();
      if (success) {
        toast.success('Push notifications enabled!');
      } else {
        toast.error('Failed to enable notifications');
      }
    }
  };

  const handleTestNotification = async () => {
    await sendTestNotification();
    toast.success('Test notification sent!');
  };

  if (!isSupported) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Push notifications are not supported in your browser.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { icon: Check, text: 'Allowed', color: 'text-green-500' };
      case 'denied':
        return { icon: X, text: 'Blocked', color: 'text-red-500' };
      default:
        return { icon: Bell, text: 'Not Set', color: 'text-yellow-500' };
    }
  };

  const permissionStatus = getPermissionStatus();
  const StatusIcon = permissionStatus.icon;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Push Notifications
        </CardTitle>
        <CardDescription>
          Get instant notifications for likes, comments, and new followers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Permission Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-4 h-4 ${permissionStatus.color}`} />
            <span className="text-sm">Permission Status</span>
          </div>
          <span className={`text-sm font-medium ${permissionStatus.color}`}>
            {permissionStatus.text}
          </span>
        </div>

        {/* Main Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notifications" className="text-base">
              Enable Push Notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications even when the app is closed
            </p>
          </div>
          <Switch
            id="push-notifications"
            checked={isSubscribed}
            onCheckedChange={handleToggleNotifications}
            disabled={isLoading || permission === 'denied'}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {permission === 'denied' && (
            <Button
              variant="outline"
              onClick={requestPermission}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Request Permission
            </Button>
          )}
          
          {permission === 'granted' && isSubscribed && (
            <Button
              variant="outline"
              onClick={handleTestNotification}
              disabled={isLoading}
            >
              <Bell className="w-4 h-4 mr-2" />
              Test Notification
            </Button>
          )}
        </div>

        {/* Notification Types */}
        {isSubscribed && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-medium">You'll receive notifications for:</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                New likes on your predictions
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Comments on your posts
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                New followers
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PushNotificationSettings;