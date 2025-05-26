
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Shield,
  Database,
  Mail,
  Bell,
  Globe,
  Lock,
  Server,
  Key,
  AlertTriangle,
  Save,
  RefreshCw
} from 'lucide-react';

const SystemSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock settings state
  const [settings, setSettings] = useState({
    siteName: 'SportsBet Pro',
    siteUrl: 'https://sportsbet.com',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
  };

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleInputChange = (key: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">System Settings</h2>
          <p className="text-gray-400">Configure system preferences and security settings</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-soft-blue to-soft-cyan text-white"
        >
          {isLoading ? (
            <>
              <RefreshCw className="animate-spin mr-2" size={16} />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-dark-card">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe size={20} />
                  Site Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName" className="text-white">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="bg-dark-lighter border-dark-border text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl" className="text-white">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                    className="bg-dark-lighter border-dark-border text-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Maintenance Mode</Label>
                    <p className="text-sm text-gray-400">Put site in maintenance mode</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={() => handleToggle('maintenanceMode')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">User Registration</Label>
                    <p className="text-sm text-gray-400">Allow new user registrations</p>
                  </div>
                  <Switch
                    checked={settings.registrationEnabled}
                    onCheckedChange={() => handleToggle('registrationEnabled')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Server size={20} />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                  <span className="text-gray-300">Application Version</span>
                  <span className="text-white font-medium">v2.1.0</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                  <span className="text-gray-300">Database Status</span>
                  <span className="text-green-400 font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                  <span className="text-gray-300">Cache Status</span>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                  <span className="text-gray-300">Last Backup</span>
                  <span className="text-white font-medium">2 hours ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield size={20} />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-400">Require 2FA for admin accounts</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={() => handleToggle('twoFactorAuth')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="text-white">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                      className="bg-dark-lighter border-dark-border text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts" className="text-white">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                      className="bg-dark-lighter border-dark-border text-white"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength" className="text-white">Min Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                      className="bg-dark-lighter border-dark-border text-white"
                    />
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-yellow-400 mt-0.5" size={16} />
                      <div>
                        <p className="text-yellow-400 font-medium text-sm">Security Reminder</p>
                        <p className="text-yellow-300 text-sm mt-1">
                          Remember to regularly update passwords and review security logs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell size={20} />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-gray-400">Send system notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">SMS Notifications</Label>
                  <p className="text-sm text-gray-400">Send critical alerts via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={() => handleToggle('smsNotifications')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-dark-lighter rounded-lg">
                  <h4 className="text-white font-medium mb-2">Email Templates</h4>
                  <p className="text-gray-400 text-sm mb-3">Customize email notification templates</p>
                  <Button variant="outline" size="sm" className="border-dark-border text-gray-400">
                    Manage Templates
                  </Button>
                </div>
                <div className="p-4 bg-dark-lighter rounded-lg">
                  <h4 className="text-white font-medium mb-2">Notification Rules</h4>
                  <p className="text-gray-400 text-sm mb-3">Configure when to send notifications</p>
                  <Button variant="outline" size="sm" className="border-dark-border text-gray-400">
                    Configure Rules
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database size={20} />
                Database Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Database management tools coming soon</p>
                <p className="text-gray-500 text-sm">Backup, restore, and maintenance tools</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key size={20} />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">API management coming soon</p>
                <p className="text-gray-500 text-sm">API keys, rate limiting, and documentation</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
