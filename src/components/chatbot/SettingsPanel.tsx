
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  X, 
  Palette, 
  Volume2, 
  MessageSquare, 
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [animations, setAnimations] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark');
  const [compactMode, setCompactMode] = useState(false);

  const themeOptions = [
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'auto', label: 'Auto', icon: Monitor }
  ];

  return (
    <Card className="w-80 h-96 bg-dark-card border-dark-border shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <Settings className="text-soft-blue" size={20} />
          <h3 className="text-white font-medium">Settings</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1"
        >
          <X size={16} />
        </Button>
      </div>

      {/* Settings Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Audio Settings */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <Volume2 size={16} />
              Audio
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Sound Effects</span>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
              
              {soundEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label className="text-sm text-gray-400">Volume</label>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {volume[0]}%
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <Palette size={16} />
              Appearance
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {themeOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <Button
                        key={option.value}
                        variant={theme === option.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme(option.value as any)}
                        className={`h-auto p-2 ${
                          theme === option.value 
                            ? 'bg-soft-blue hover:bg-soft-blue/80' 
                            : 'border-dark-border text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className="text-center">
                          <IconComponent size={16} className="mx-auto mb-1" />
                          <div className="text-xs">{option.label}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Animations</span>
                <Switch
                  checked={animations}
                  onCheckedChange={setAnimations}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Compact Mode</span>
                <Switch
                  checked={compactMode}
                  onCheckedChange={setCompactMode}
                />
              </div>
            </div>
          </div>

          {/* Chat Settings */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <MessageSquare size={16} />
              Chat
            </h4>
            <div className="space-y-4">
              <div className="p-3 bg-dark-lighter rounded-lg">
                <div className="text-sm text-gray-300 mb-1">Message History</div>
                <div className="text-xs text-gray-500">
                  Keep the last 50 messages for context
                </div>
              </div>

              <div className="p-3 bg-dark-lighter rounded-lg">
                <div className="text-sm text-gray-300 mb-1">Auto-scroll</div>
                <div className="text-xs text-gray-500">
                  Automatically scroll to new messages
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="pt-4 border-t border-dark-border">
            <div className="text-center space-y-2">
              <div className="text-sm text-gray-400">AI Assistant v2.0</div>
              <Badge variant="outline" className="text-xs">
                Phase 2 Features
              </Badge>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
