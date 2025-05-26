
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Wifi, WifiOff, Clock, Database, AlertTriangle, Zap } from 'lucide-react';
import { useFootball } from '@/contexts/FootballContext';
import { useTriggerScraping } from '@/services/realTimeSportsApi';

const RealTimeDataIndicator = () => {
  const { 
    isLoading, 
    triggerDataRefresh, 
    lastUpdate,
    error,
    matches
  } = useFootball();

  const { triggerSportsScraping } = useTriggerScraping();
  const [isAutoSyncing, setIsAutoSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'initializing' | 'syncing' | 'live' | 'error'>('initializing');

  // Auto-initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      if (matches.length === 0 && !isLoading) {
        console.log('Auto-initializing sports data...');
        setIsAutoSyncing(true);
        setSyncStatus('initializing');
        
        try {
          // Trigger scraping first
          await triggerSportsScraping();
          
          // Wait a moment then refresh
          setTimeout(async () => {
            await triggerDataRefresh();
            setSyncStatus('live');
          }, 3000);
        } catch (error) {
          console.error('Auto-initialization failed:', error);
          setSyncStatus('error');
        } finally {
          setIsAutoSyncing(false);
        }
      } else if (matches.length > 0) {
        setSyncStatus('live');
      }
    };

    initializeData();
  }, [matches.length, isLoading, triggerSportsScraping, triggerDataRefresh]);

  // Auto-sync every 2 minutes when live
  useEffect(() => {
    if (syncStatus === 'live') {
      const interval = setInterval(async () => {
        console.log('Auto-syncing sports data...');
        setSyncStatus('syncing');
        
        try {
          await triggerSportsScraping();
          setTimeout(async () => {
            await triggerDataRefresh();
            setSyncStatus('live');
          }, 2000);
        } catch (error) {
          console.error('Auto-sync failed:', error);
          setSyncStatus('error');
        }
      }, 120000); // 2 minutes

      return () => clearInterval(interval);
    }
  }, [syncStatus, triggerSportsScraping, triggerDataRefresh]);

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return 'Syncing...';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  const getStatusInfo = () => {
    switch (syncStatus) {
      case 'initializing':
        return {
          icon: <Database className="h-4 w-4 text-blue-500 animate-pulse" />,
          badge: { variant: "outline" as const, text: 'Initializing', className: "border-blue-500/30 text-blue-400 animate-pulse" },
          message: 'Setting up live data feed...'
        };
      case 'syncing':
        return {
          icon: <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />,
          badge: { variant: "outline" as const, text: 'Syncing', className: "border-yellow-500/30 text-yellow-400" },
          message: 'Updating matches...'
        };
      case 'live':
        return {
          icon: <Zap className="h-4 w-4 text-green-500" />,
          badge: { variant: "default" as const, text: 'Live', className: "bg-green-500/10 text-green-400 border-green-500/30" },
          message: 'Real-time sync active'
        };
      case 'error':
        return {
          icon: <WifiOff className="h-4 w-4 text-red-500" />,
          badge: { variant: "destructive" as const, text: 'Error', className: "" },
          message: 'Sync temporarily unavailable'
        };
      default:
        return {
          icon: <Database className="h-4 w-4 text-gray-500" />,
          badge: { variant: "outline" as const, text: 'Unknown', className: "" },
          message: 'Status unknown'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="flex items-center justify-between p-4 bg-dark-card/50 backdrop-blur-sm rounded-lg border border-dark-border/50 mb-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {statusInfo.icon}
          <Badge 
            variant={statusInfo.badge.variant}
            className={statusInfo.badge.className}
          >
            {statusInfo.badge.text}
          </Badge>
          {matches.length > 0 && (
            <Badge variant="outline" className="border-dark-border/50 text-gray-400">
              {matches.length} matches
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Clock className="h-3 w-3" />
          <span>Updated: {formatLastUpdate(lastUpdate)}</span>
        </div>

        <div className="text-xs text-gray-500">
          {statusInfo.message}
        </div>

        {error && syncStatus === 'error' && (
          <div className="flex items-center gap-1 text-xs text-red-400">
            <AlertTriangle className="h-3 w-3" />
            <span className="max-w-xs truncate">{error}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            setSyncStatus('syncing');
            try {
              await triggerSportsScraping();
              setTimeout(async () => {
                await triggerDataRefresh();
                setSyncStatus('live');
              }, 2000);
            } catch (error) {
              setSyncStatus('error');
            }
          }}
          disabled={isLoading || isAutoSyncing || syncStatus === 'syncing'}
          className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
        >
          <RefreshCw className={`h-3 w-3 mr-2 ${(isLoading || syncStatus === 'syncing') ? 'animate-spin' : ''}`} />
          {syncStatus === 'syncing' ? 'Syncing...' : 'Refresh'}
        </Button>
      </div>
    </div>
  );
};

export default RealTimeDataIndicator;
