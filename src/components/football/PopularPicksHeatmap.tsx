import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Flame, Eye, Clock, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

interface HeatmapData {
  match: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  betType: string;
  popularity: number;
  odds: number;
  confidence: number;
  volume: number;
  trend: 'up' | 'down' | 'stable';
}

const PopularPicksHeatmap = () => {
  const { filteredMatches, leagues } = useFootball();
  const [timeframe, setTimeframe] = useState('24h');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [viewMode, setViewMode] = useState<'popularity' | 'volume' | 'confidence'>('popularity');

  // Generate mock heatmap data based on filtered matches
  const generateHeatmapData = (): HeatmapData[] => {
    const betTypes = ['1X2', 'Over/Under 2.5', 'BTTS', 'Correct Score', 'Asian Handicap'];
    const data: HeatmapData[] = [];

    filteredMatches.slice(0, 12).forEach((match) => {
      betTypes.forEach((betType) => {
        data.push({
          match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          league: match.league,
          betType,
          popularity: Math.floor(Math.random() * 100) + 1,
          odds: 1.5 + Math.random() * 3,
          confidence: Math.floor(Math.random() * 40) + 60,
          volume: Math.floor(Math.random() * 1000) + 100,
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
        });
      });
    });

    return data.sort((a, b) => b[viewMode] - a[viewMode]);
  };

  const heatmapData = generateHeatmapData();

  const getIntensityColor = (value: number, max: number) => {
    const intensity = value / max;
    if (intensity > 0.8) return 'bg-red-500';
    if (intensity > 0.6) return 'bg-orange-500';
    if (intensity > 0.4) return 'bg-yellow-500';
    if (intensity > 0.2) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
    }
  };

  const maxValue = Math.max(...heatmapData.map(item => item[viewMode]));

  const filteredData = selectedLeague === 'all' 
    ? heatmapData 
    : heatmapData.filter(item => item.league === selectedLeague);

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Popular Picks Heatmap
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-orange-500 text-orange-500">
              <Eye className="h-3 w-3 mr-1" />
              Live Tracking
            </Badge>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-24 bg-dark-lighter border-dark-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark border-dark-border text-white">
                <SelectItem value="1h">1h</SelectItem>
                <SelectItem value="6h">6h</SelectItem>
                <SelectItem value="24h">24h</SelectItem>
                <SelectItem value="7d">7d</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="w-32 bg-dark-lighter border-dark-border">
                <SelectValue placeholder="League" />
              </SelectTrigger>
              <SelectContent className="bg-dark border-dark-border text-white">
                <SelectItem value="all">All Leagues</SelectItem>
                {leagues.map((league) => (
                  <SelectItem key={league.id} value={league.name}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-1 bg-dark-lighter rounded-lg p-1">
            {[
              { key: 'popularity', label: 'Popularity' },
              { key: 'volume', label: 'Volume' },
              { key: 'confidence', label: 'Confidence' }
            ].map((mode) => (
              <Button
                key={mode.key}
                variant={viewMode === mode.key ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode(mode.key as any)}
                className={`text-xs ${
                  viewMode === mode.key 
                    ? 'bg-neon-blue text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Legend */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Heat Intensity</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-400">Low</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <div className="w-3 h-3 bg-red-500 rounded"></div>
            </div>
            <span className="text-gray-400">High</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="space-y-2">
          {Array.from(new Set(filteredData.map(item => item.match))).slice(0, 8).map((match, matchIndex) => {
            const matchData = filteredData.filter(item => item.match === match);
            
            return (
              <motion.div
                key={match}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: matchIndex * 0.1 }}
                className="space-y-2"
              >
                <div className="text-sm font-medium text-gray-300 truncate">
                  {match}
                </div>
                
                <div className="grid grid-cols-5 gap-1">
                  {matchData.map((item, index) => (
                    <motion.div
                      key={`${match}-${item.betType}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: (matchIndex * 0.1) + (index * 0.05) }}
                      className={`
                        relative p-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105
                        ${getIntensityColor(item[viewMode], maxValue)}
                      `}
                      title={`${item.betType}: ${viewMode} ${item[viewMode]} | Odds: ${item.odds.toFixed(2)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-white">
                          {item.betType.replace('/', '/')}
                        </div>
                        {getTrendIcon(item.trend)}
                      </div>
                      
                      <div className="text-xs text-white/80 mt-1">
                        {viewMode === 'popularity' && `${item.popularity}%`}
                        {viewMode === 'volume' && `${item.volume}`}
                        {viewMode === 'confidence' && `${item.confidence}%`}
                      </div>
                      
                      <div className="text-xs text-white/60">
                        {item.odds.toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Top Picks Summary */}
        <div className="border-t border-dark-border pt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Top Trending Picks</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {filteredData.slice(0, 3).map((item, index) => (
              <motion.div
                key={`top-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="bg-dark-lighter rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-neon-lime/20 text-neon-lime border-neon-lime/30">
                    #{index + 1}
                  </Badge>
                  {getTrendIcon(item.trend)}
                </div>
                
                <div className="text-xs text-gray-400">{item.league}</div>
                <div className="text-sm font-medium text-white truncate">{item.match}</div>
                <div className="text-xs text-neon-blue">{item.betType}</div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">
                    {viewMode}: {item[viewMode]}{viewMode === 'volume' ? '' : '%'}
                  </span>
                  <span className="text-xs text-neon-lime font-medium">
                    {item.odds.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularPicksHeatmap;
