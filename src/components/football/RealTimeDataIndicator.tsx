
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Wifi, WifiOff, Clock, Database, AlertTriangle } from 'lucide-react';
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
  const [isInitializing, setIsInitializing] = useState(false);

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  const handleInitializeData = async () => {
    setIsInitializing(true);
    try {
      console.log('Initializing data by triggering scraping...');
      await triggerSportsScraping();
      // Wait a moment then refresh the data
      setTimeout(() => {
        triggerDataRefresh();
      }, 2000);
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const hasData = matches && matches.length > 0;
  const connectionStatus = error ? 'error' : hasData ? 'connected' : 'no-data';

  const getStatusInfo = () => {
    switch (connectionStatus) {
      case 'error':
        return {
          icon: <WifiOff className="h-4 w-4 text-red-500" />,
          badge: { variant: "destructive" as const, text: 'Error', className: "" },
          message: 'Connection failed'
        };
      case 'connected':
        return {
          icon: <Wifi className="h-4 w-4 text-green-500" />,
          badge: { variant: "default" as const, text: 'Live Data', className: "bg-green-500/10 text-green-400 border-green-500/30" },
          message: 'Live data active'
        };
      case 'no-data':
        return {
          icon: <Database className="h-4 w-4 text-yellow-500" />,
          badge: { variant: "outline" as const, text: 'No Data', className: "border-yellow-500/30 text-yellow-400" },
          message: 'No data available'
        };
      default:
        return {
          icon: <WifiOff className="h-4 w-4 text-gray-500" />,
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

        {error && (
          <div className="flex items-center gap-1 text-xs text-red-400">
            <AlertTriangle className="h-3 w-3" />
            <span className="max-w-xs truncate">{error}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {connectionStatus === 'no-data' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleInitializeData}
            disabled={isInitializing}
            className="border-neon-lime/30 text-neon-lime hover:bg-neon-lime/10"
          >
            <Database className={`h-3 w-3 mr-2 ${isInitializing ? 'animate-pulse' : ''}`} />
            {isInitializing ? 'Initializing...' : 'Load Data'}
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={triggerDataRefresh}
          disabled={isLoading || isInitializing}
          className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
        >
          <RefreshCw className={`h-3 w-3 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Updating...' : 'Refresh'}
        </Button>
      </div>
    </div>
  );
};

export default RealTimeDataIndicator;
