import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { 
  Globe, Volume2, Eye, Smartphone, Bell, 
  Moon, Sun, Palette, Type, Monitor
} from 'lucide-react';

const AccessibilitySettings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    highContrast, 
    toggleHighContrast, 
    reducedMotion,
    announceToScreenReader 
  } = useAccessibility();
  
  const {
    isSupported,
    isSubscribed,
    isLoading,
    subscribe,
    unsubscribe
  } = usePushNotifications();

  const [fontSize, setFontSize] = React.useState(() => {
    const stored = localStorage.getItem('font-size');
    return stored ? parseInt(stored) : 16;
  });

  const [soundEnabled, setSoundEnabled] = React.useState(() => {
    const stored = localStorage.getItem('sound-enabled');
    return stored !== 'false';
  });

  const [colorTheme, setColorTheme] = React.useState(() => {
    const stored = localStorage.getItem('color-theme');
    return stored || 'system';
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    announceToScreenReader(`Language changed to ${languages.find(l => l.code === langCode)?.name}`);
  };

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    localStorage.setItem('font-size', newSize.toString());
    document.documentElement.style.fontSize = `${newSize}px`;
    announceToScreenReader(`Font size changed to ${newSize} pixels`);
  };

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem('sound-enabled', enabled.toString());
    announceToScreenReader(`Sound notifications ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleThemeChange = (theme: string) => {
    setColorTheme(theme);
    localStorage.setItem('color-theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    announceToScreenReader(`Theme changed to ${theme}`);
  };

  React.useEffect(() => {
    // Apply font size on mount
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <div className="space-y-6" role="main" aria-labelledby="accessibility-title">
      <div>
        <h1 id="accessibility-title" className="text-2xl font-bold">
          {t('nav.settings')} & Accessibility
        </h1>
        <p className="text-muted-foreground">
          Customize your experience and accessibility preferences
        </p>
      </div>

      <Tabs defaultValue="accessibility" className="space-y-6">
        <TabsList 
          className="grid w-full grid-cols-4"
          role="tablist"
          aria-label="Settings categories"
        >
          <TabsTrigger value="accessibility" aria-controls="accessibility-panel">
            <Eye className="w-4 h-4 mr-2" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="language" aria-controls="language-panel">
            <Globe className="w-4 h-4 mr-2" />
            Language
          </TabsTrigger>
          <TabsTrigger value="notifications" aria-controls="notifications-panel">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display" aria-controls="display-panel">
            <Monitor className="w-4 h-4 mr-2" />
            Display
          </TabsTrigger>
        </TabsList>

        <TabsContent 
          value="accessibility" 
          id="accessibility-panel"
          role="tabpanel"
          aria-labelledby="accessibility-tab"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Visual Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better readability
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={toggleHighContrast}
                  aria-describedby="high-contrast-desc"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="font-size">
                  Font Size: {fontSize}px
                </Label>
                <Slider
                  id="font-size"
                  value={[fontSize]}
                  onValueChange={handleFontSizeChange}
                  min={12}
                  max={24}
                  step={1}
                  className="w-full"
                  aria-describedby="font-size-desc"
                />
                <p id="font-size-desc" className="text-sm text-muted-foreground">
                  Adjust text size for better readability
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    {reducedMotion 
                      ? 'Animations are reduced based on your system preference' 
                      : 'Full animations enabled'
                    }
                  </p>
                </div>
                <Badge variant={reducedMotion ? 'default' : 'secondary'}>
                  {reducedMotion ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Audio Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="sound-notifications">Sound Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sounds for notifications and interactions
                  </p>
                </div>
                <Switch
                  id="sound-notifications"
                  checked={soundEnabled}
                  onCheckedChange={handleSoundToggle}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent 
          value="language" 
          id="language-panel"
          role="tabpanel"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language-select">Select Language</Label>
                <Select 
                  value={i18n.language} 
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger id="language-select" aria-label="Choose language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Current Language</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {languages.find(l => l.code === i18n.language)?.flag}
                  </span>
                  <span className="font-medium">
                    {languages.find(l => l.code === i18n.language)?.name}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent 
          value="notifications" 
          id="notifications-panel"
          role="tabpanel"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Push Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isSupported ? (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Push notifications are not supported in this browser
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about likes, comments, and new followers
                      </p>
                    </div>
                    <Button
                      onClick={isSubscribed ? unsubscribe : subscribe}
                      disabled={isLoading}
                      variant={isSubscribed ? 'destructive' : 'default'}
                      size="sm"
                    >
                      {isLoading ? 'Loading...' : isSubscribed ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                  
                  <Badge variant={isSubscribed ? 'default' : 'secondary'}>
                    {isSubscribed ? 'Notifications Enabled' : 'Notifications Disabled'}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent 
          value="display" 
          id="display-panel"
          role="tabpanel"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme-select">Color Theme</Label>
                <Select value={colorTheme} onValueChange={handleThemeChange}>
                  <SelectTrigger id="theme-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">
                      <span className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        System
                      </span>
                    </SelectItem>
                    <SelectItem value="light">
                      <span className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        Light
                      </span>
                    </SelectItem>
                    <SelectItem value="dark">
                      <span className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Dark
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessibilitySettings;