import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface OfflineIndicatorProps {
  className?: string;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { announceToScreenReader } = useAccessibility();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
      announceToScreenReader(t('offline.connected', 'Connection restored'));
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
      announceToScreenReader(t('offline.disconnected', 'Connection lost - working offline'));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show offline message if already offline
    if (!navigator.onLine) {
      setShowOfflineMessage(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [announceToScreenReader, t]);

  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      announceToScreenReader(t('offline.retry.failed', 'Still offline - please check your connection'));
    }
  };

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <div className={`offline-indicator ${showOfflineMessage ? 'show' : ''} ${className}`}>
      <Card className="mx-auto max-w-md bg-destructive border-destructive-foreground/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-destructive-foreground" aria-hidden="true" />
              ) : (
                <WifiOff className="w-5 h-5 text-destructive-foreground" aria-hidden="true" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-destructive-foreground">
                {isOnline 
                  ? t('offline.reconnecting', 'Reconnecting...') 
                  : t('offline.title', 'You\'re offline')
                }
              </p>
              <p className="text-xs text-destructive-foreground/80">
                {isOnline 
                  ? t('offline.reconnecting.message', 'Restoring connection...')
                  : t('offline.message', 'Some features may not work without internet')
                }
              </p>
            </div>
            
            <Button
              onClick={handleRetry}
              size="sm"
              variant="secondary"
              className="flex-shrink-0"
              aria-label={t('offline.retry', 'Retry connection')}
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">
                {t('offline.retry', 'Retry connection')}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfflineIndicator;