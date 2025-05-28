
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Monitor, Zap, Eye, TrendingUp, BarChart3, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface HighDensitySettings {
  enabled: boolean;
  compactCards: boolean;
  hideDescriptions: boolean;
  miniCharts: boolean;
  condensedText: boolean;
  reducedSpacing: boolean;
  autoHideElements: boolean;
}

const HighDensityMode = () => {
  const [settings, setSettings] = useState<HighDensitySettings>({
    enabled: false,
    compactCards: true,
    hideDescriptions: true,
    miniCharts: true,
    condensedText: true,
    reducedSpacing: true,
    autoHideElements: false
  });

  const handleToggle = (key: keyof HighDensitySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEnableHighDensity = () => {
    const optimizedSettings: HighDensitySettings = {
      enabled: true,
      compactCards: true,
      hideDescriptions: true,
      miniCharts: true,
      condensedText: true,
      reducedSpacing: true,
      autoHideElements: true
    };
    setSettings(optimizedSettings);
  };

  const densityFeatures = [
    {
      key: 'compactCards' as keyof HighDensitySettings,
      icon: Monitor,
      title: 'Compact Cards',
      description: 'Reduce card padding and margins',
      savings: '40% space'
    },
    {
      key: 'hideDescriptions' as keyof HighDensitySettings,
      icon: Eye,
      title: 'Hide Descriptions',
      description: 'Show only essential information',
      savings: '25% space'
    },
    {
      key: 'miniCharts' as keyof HighDensitySettings,
      icon: BarChart3,
      title: 'Mini Charts',
      description: 'Use smaller, condensed chart views',
      savings: '50% space'
    },
    {
      key: 'condensedText' as keyof HighDensitySettings,
      icon: TrendingUp,
      title: 'Condensed Text',
      description: 'Smaller fonts and tighter line height',
      savings: '20% space'
    },
    {
      key: 'reducedSpacing' as keyof HighDensitySettings,
      icon: Activity,
      title: 'Reduced Spacing',
      description: 'Minimize gaps between elements',
      savings: '30% space'
    },
    {
      key: 'autoHideElements' as keyof HighDensitySettings,
      icon: Zap,
      title: 'Auto-hide Elements',
      description: 'Hide non-essential UI on small screens',
      savings: '35% space'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-neon-blue" />
            High Density Mode
            {settings.enabled && (
              <Badge variant="outline" className="text-neon-blue border-neon-blue">
                Active
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Toggle */}
          <div className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg">
            <div>
              <h3 className="font-medium">Enable High Density Mode</h3>
              <p className="text-sm text-gray-400">
                Optimize interface for maximum information density
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={() => handleToggle('enabled')}
            />
          </div>

          {/* Quick Setup */}
          {!settings.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
            >
              <h4 className="font-medium mb-2">Quick Setup</h4>
              <p className="text-sm text-gray-400 mb-3">
                Enable all high-density optimizations with one click
              </p>
              <Button 
                onClick={handleEnableHighDensity}
                className="bg-neon-blue hover:bg-neon-blue/90 text-black"
              >
                <Zap className="h-4 w-4 mr-2" />
                Enable All Optimizations
              </Button>
            </motion.div>
          )}

          {/* Feature Controls */}
          <div className="space-y-4">
            <h3 className="font-medium">Density Features</h3>
            
            <div className="grid gap-4">
              {densityFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.key}
                    className={`p-4 rounded-lg border transition-all ${
                      settings[feature.key]
                        ? 'bg-neon-blue/10 border-neon-blue/30'
                        : 'bg-dark-lighter border-dark-border'
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className={`h-5 w-5 mt-0.5 ${
                          settings[feature.key] ? 'text-neon-blue' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{feature.title}</h4>
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                            >
                              {feature.savings}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings[feature.key]}
                        onCheckedChange={() => handleToggle(feature.key)}
                        disabled={!settings.enabled}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          {settings.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h3 className="font-medium">Active Optimizations</h3>
              <div className="flex flex-wrap gap-2">
                {densityFeatures
                  .filter(feature => settings[feature.key])
                  .map(feature => (
                    <Badge 
                      key={feature.key}
                      variant="outline" 
                      className="text-neon-blue border-neon-blue"
                    >
                      {feature.title}
                    </Badge>
                  ))}
              </div>
              
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-400">
                  ✓ High density mode is active. You can now see more information in less space.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HighDensityMode;
