import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Globe, Download, Smartphone } from 'lucide-react';

interface PWAInstallPromptProps {
  className?: string;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ className = '' }) => {
  const { t, i18n } = useTranslation();
  const { announceToScreenReader } = useAccessibility();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Handle PWA install prompt
  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      announceToScreenReader('App installed successfully');
      setDeferredPrompt(null);
      setShowPrompt(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [announceToScreenReader]);

  // Check if already installed
  React.useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    
    if (isStandalone || isIOSStandalone) {
      setShowPrompt(false);
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    announceToScreenReader('Installing app...');

    try {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        announceToScreenReader('App installation accepted');
      } else {
        announceToScreenReader('App installation declined');
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error installing app:', error);
      announceToScreenReader('App installation failed');
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    announceToScreenReader('Install prompt dismissed');
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    announceToScreenReader(`Language changed to ${languages.find(l => l.code === langCode)?.name}`);
  };

  if (!showPrompt) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Language Selector */}
        <Select value={i18n.language} onValueChange={handleLanguageChange}>
          <SelectTrigger 
            className="w-auto min-w-0 border-none bg-transparent"
            aria-label={t('a11y.language.select', 'Select language')}
          >
            <div className="flex items-center gap-2">
              <Globe size={16} aria-hidden="true" />
              <span className="hidden sm:inline">
                {languages.find(l => l.code === i18n.language)?.flag}
              </span>
            </div>
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
    );
  }

  return (
    <>
      {/* Language Selector */}
      <div className="flex items-center gap-2">
        <Select value={i18n.language} onValueChange={handleLanguageChange}>
          <SelectTrigger 
            className="w-auto min-w-0 border-none bg-transparent"
            aria-label={t('a11y.language.select', 'Select language')}
          >
            <div className="flex items-center gap-2">
              <Globe size={16} aria-hidden="true" />
              <span className="hidden sm:inline">
                {languages.find(l => l.code === i18n.language)?.flag}
              </span>
            </div>
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

      {/* PWA Install Prompt */}
      <Card className="install-prompt show" role="dialog" aria-labelledby="install-title">
        <CardHeader className="pb-3">
          <CardTitle id="install-title" className="flex items-center gap-2 text-lg">
            <Smartphone size={20} aria-hidden="true" />
            {t('pwa.install.title', 'Install SmartBet App')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('pwa.install.description', 'Get the full experience with offline access and push notifications.')}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {t('pwa.features.offline', 'Offline Access')}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {t('pwa.features.notifications', 'Push Notifications')}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {t('pwa.features.native', 'Native Experience')}
            </Badge>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleInstall}
              disabled={isInstalling}
              size="sm"
              className="flex-1"
              aria-describedby="install-description"
            >
              {isInstalling ? (
                <>
                  <Download className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  {t('pwa.installing', 'Installing...')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t('pwa.install.button', 'Install')}
                </>
              )}
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
              disabled={isInstalling}
            >
              {t('common.dismiss', 'Dismiss')}
            </Button>
          </div>
          
          <p id="install-description" className="text-xs text-muted-foreground">
            {t('pwa.install.note', 'You can always install later from your browser menu.')}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default PWAInstallPrompt;