
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    siteName: 'BetGuide AI',
    siteDescription: 'AI-powered sports betting predictions and analysis',
    enableRegistration: true,
    enableSocialLogin: true,
    maintenanceMode: false,
    oddsFormat: 'decimal',
    minDepositAmount: '10',
    maxWithdrawalAmount: '5000',
    contactEmail: 'support@betguide.ai',
  });

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Here you would save settings to your backend
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your platform's general settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="site-name">Site Name</Label>
              <Input 
                id="site-name"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                className="bg-dark-lighter border-dark-border mt-1"
              />
            </div>

            <div>
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea 
                id="site-description"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                className="bg-dark-lighter border-dark-border mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input 
                id="contact-email"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="bg-dark-lighter border-dark-border mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Configure how the platform behaves</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-registration">Enable Registration</Label>
                <p className="text-sm text-gray-400">Allow new users to register</p>
              </div>
              <Switch 
                id="enable-registration" 
                checked={settings.enableRegistration}
                onCheckedChange={(checked) => handleInputChange('enableRegistration', checked)}
              />
            </div>

            <Separator className="bg-dark-border" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-social-login">Enable Social Login</Label>
                <p className="text-sm text-gray-400">Allow login via social media</p>
              </div>
              <Switch 
                id="enable-social-login" 
                checked={settings.enableSocialLogin}
                onCheckedChange={(checked) => handleInputChange('enableSocialLogin', checked)}
              />
            </div>

            <Separator className="bg-dark-border" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-sm text-gray-400">Put the site in maintenance mode</p>
              </div>
              <Switch 
                id="maintenance-mode" 
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle>Betting Settings</CardTitle>
          <CardDescription>Configure betting-related settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="odds-format">Odds Format</Label>
              <select
                id="odds-format"
                value={settings.oddsFormat}
                onChange={(e) => handleInputChange('oddsFormat', e.target.value)}
                className="w-full mt-1 bg-dark-lighter border-dark-border rounded-md px-3 py-2 text-sm"
              >
                <option value="decimal">Decimal (1.75)</option>
                <option value="fractional">Fractional (3/4)</option>
                <option value="american">American (+135)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="min-deposit">Minimum Deposit ($)</Label>
              <Input 
                id="min-deposit"
                type="number"
                value={settings.minDepositAmount}
                onChange={(e) => handleInputChange('minDepositAmount', e.target.value)}
                className="bg-dark-lighter border-dark-border mt-1"
              />
            </div>

            <div>
              <Label htmlFor="max-withdrawal">Maximum Withdrawal ($)</Label>
              <Input 
                id="max-withdrawal"
                type="number"
                value={settings.maxWithdrawalAmount}
                onChange={(e) => handleInputChange('maxWithdrawalAmount', e.target.value)}
                className="bg-dark-lighter border-dark-border mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          className="bg-neon-lime text-black hover:bg-opacity-90"
          onClick={handleSaveSettings}
        >
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
