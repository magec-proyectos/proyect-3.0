
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Wifi, WifiOff, Clock } from 'lucide-react';
import { useFootball } from '@/contexts/FootballContext';

const RealTimeDataIndicator = () => {
  const { 
    isLoading, 
    triggerDataRefresh, 
    lastUpdate,
    error 
  } = useFootball();

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-dark-card/50 backdrop-blur-sm rounded-lg border border-dark-border/50 mb-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {error ? (
            <WifiOff className="h-4 w-4 text-red-500" />
          ) : (
            <Wifi className="h-4 w-4 text-green-500" />
          )}
          <Badge 
            variant={error ? "destructive" : "default"}
            className={error ? "" : "bg-green-500/10 text-green-400 border-green-500/30"}
          >
            {error ? 'Offline' : 'Live Data'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Clock className="h-3 w-3" />
          <span>Updated: {formatLastUpdate(lastUpdate)}</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={triggerDataRefresh}
        disabled={isLoading}
        className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
      >
        <RefreshCw className={`h-3 w-3 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Updating...' : 'Refresh'}
      </Button>
    </div>
  );
};

export default RealTimeDataIndicator;
