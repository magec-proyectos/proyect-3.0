
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Settings, Layout, Palette, Eye, Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardSettings {
  layout: 'grid' | 'list' | 'compact';
  theme: 'dark' | 'light' | 'auto';
  density: 'comfortable' | 'compact' | 'dense';
  showStats: boolean;
  showCharts: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  primaryColor: string;
}

const DashboardCustomizer = () => {
  const [settings, setSettings] = useState<DashboardSettings>({
    layout: 'grid',
    theme: 'dark',
    density: 'comfortable',
    showStats: true,
    showCharts: true,
    autoRefresh: true,
    refreshInterval: 30,
    primaryColor: '#3b82f6'
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSettingChange = (key: keyof DashboardSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    console.log('Dashboard settings saved:', settings);
  };

  const handleReset = () => {
    const defaultSettings: DashboardSettings = {
      layout: 'grid',
      theme: 'dark',
      density: 'comfortable',
      showStats: true,
      showCharts: true,
      autoRefresh: true,
      refreshInterval: 30,
      primaryColor: '#3b82f6'
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-neon-blue" />
            Dashboard Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Layout Settings */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout & Appearance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Layout Style</label>
                <Select value={settings.layout} onValueChange={(value) => handleSettingChange('layout', value)}>
                  <SelectTrigger className="bg-dark-lighter border-dark-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dark border-dark-border">
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="compact">Compact View</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Density</label>
                <Select value={settings.density} onValueChange={(value) => handleSettingChange('density', value)}>
                  <SelectTrigger className="bg-dark-lighter border-dark-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dark border-dark-border">
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="dense">Dense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Display Options
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="text-sm">Show Statistics</label>
                <Switch
                  checked={settings.showStats}
                  onCheckedChange={(checked) => handleSettingChange('showStats', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Show Charts</label>
                <Switch
                  checked={settings.showCharts}
                  onCheckedChange={(checked) => handleSettingChange('showCharts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Auto Refresh</label>
                <Switch
                  checked={settings.autoRefresh}
                  onCheckedChange={(checked) => handleSettingChange('autoRefresh', checked)}
                />
              </div>
            </div>

            {settings.autoRefresh && (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Refresh Interval: {settings.refreshInterval}s
                </label>
                <Slider
                  value={[settings.refreshInterval]}
                  onValueChange={([value]) => handleSettingChange('refreshInterval', value)}
                  min={10}
                  max={300}
                  step={10}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Color Settings */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Color Theme
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'].map((color) => (
                <button
                  key={color}
                  className={`w-full h-10 rounded-lg border-2 transition-all ${
                    settings.primaryColor === color 
                      ? 'border-white shadow-lg' 
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleSettingChange('primaryColor', color)}
                />
              ))}
            </div>
          </div>

          {/* Preview Mode */}
          <div className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg">
            <div>
              <h4 className="font-medium">Preview Mode</h4>
              <p className="text-sm text-gray-400">Test your settings before saving</p>
            </div>
            <Switch
              checked={isPreviewMode}
              onCheckedChange={setIsPreviewMode}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-dark-border">
            <Button 
              onClick={handleSave}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Reset
            </Button>
          </div>

          {isPreviewMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
            >
              <h4 className="font-medium mb-2">Preview Active</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">Layout: {settings.layout}</Badge>
                <Badge variant="outline">Density: {settings.density}</Badge>
                <Badge variant="outline">Refresh: {settings.refreshInterval}s</Badge>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCustomizer;
