import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import PushNotificationSettings from '@/components/notifications/PushNotificationSettings';

const UserNotificationSettings = () => {
  const { sendTestNotification, permission } = usePushNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          <p className="text-muted-foreground">
            Manage how you receive notifications for likes, comments, and followers.
          </p>
        </div>
      </div>

      {/* Push Notifications */}
      <PushNotificationSettings />

      {/* Quick Test */}
      {permission === 'granted' && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">Quick Test</CardTitle>
            <CardDescription>
              Test your notification settings with a sample notification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={sendTestNotification} variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Send Test Notification
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserNotificationSettings;