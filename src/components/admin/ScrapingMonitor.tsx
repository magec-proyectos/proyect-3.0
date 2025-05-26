
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useTriggerScraping } from '@/services/realTimeSportsApi';

const ScrapingMonitor = () => {
  const { triggerSportsScraping, triggerCasinoScraping } = useTriggerScraping();

  const { data: scrapingMetadata, refetch } = useQuery({
    queryKey: ['scraping-metadata'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scraping_metadata')
        .select('*')
        .order('last_scraped', { ascending: false });

      if (error) throw error;
      return data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const handleTriggerScraping = async (type: 'sports' | 'casino') => {
    try {
      if (type === 'sports') {
        await triggerSportsScraping();
      } else {
        await triggerCasinoScraping();
      }
      await refetch();
    } catch (error) {
      console.error('Error triggering scraping:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (metadata: any) => {
    if (!metadata.is_active) {
      return <Badge variant="secondary">Inactive</Badge>;
    }
    
    const lastScraped = metadata.last_scraped ? new Date(metadata.last_scraped) : null;
    const now = new Date();
    const timeDiff = lastScraped ? now.getTime() - lastScraped.getTime() : 0;
    const intervalMs = metadata.scrape_interval_minutes * 60 * 1000;
    
    if (metadata.error_count > metadata.success_count) {
      return <Badge variant="destructive">Error</Badge>;
    }
    
    if (timeDiff > intervalMs * 2) {
      return <Badge variant="destructive">Delayed</Badge>;
    }
    
    return <Badge variant="default" className="bg-green-500">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Data Scraping Monitor</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scrapingMetadata?.map((metadata) => (
          <Card key={metadata.id} className="bg-dark-card border-dark-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">
                  {metadata.source_name}
                </CardTitle>
                {getStatusBadge(metadata)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Success Count</div>
                  <div className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="h-3 w-3" />
                    {metadata.success_count}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Error Count</div>
                  <div className="flex items-center gap-1 text-red-400">
                    <AlertTriangle className="h-3 w-3" />
                    {metadata.error_count}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-gray-400">Last Scraped</div>
                  <div className="flex items-center gap-1 text-white">
                    <Clock className="h-3 w-3" />
                    {formatDate(metadata.last_scraped)}
                  </div>
                </div>

                <div>
                  <div className="text-gray-400">Interval</div>
                  <div className="text-white">{metadata.scrape_interval_minutes} minutes</div>
                </div>

                <div>
                  <div className="text-gray-400">Rate Limit</div>
                  <div className="text-white">{metadata.rate_limit_delay_ms}ms</div>
                </div>
              </div>

              {metadata.last_error && (
                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-xs">
                  <div className="text-red-400 font-medium">Last Error:</div>
                  <div className="text-red-300 mt-1">{metadata.last_error}</div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleTriggerScraping(
                    metadata.source_name.includes('football') || metadata.source_name.includes('sport') 
                      ? 'sports' 
                      : 'casino'
                  )}
                  className="flex-1 bg-neon-blue hover:bg-neon-blue/90 text-black"
                >
                  Trigger Scrape
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!scrapingMetadata || scrapingMetadata.length === 0 && (
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="text-center py-8">
            <div className="text-gray-400">No scraping sources configured</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScrapingMonitor;
