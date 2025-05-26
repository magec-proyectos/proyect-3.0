
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Star, Play, AlertCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';
import CompetitionMenu from './CompetitionMenu';

const MatchFeed = () => {
  const { filteredMatches, selectedMatch, setSelectedMatch, isLoading, error, triggerDataRefresh } = useFootball();

  console.log('MatchFeed - filteredMatches:', filteredMatches);
  console.log('MatchFeed - isLoading:', isLoading);
  console.log('MatchFeed - error:', error);

  // Enhanced fallback data for when real data is loading
  const enhancedFallbackMatches = [
    {
      id: 'live-1',
      league: 'Premier League • Live',
      time: 'LIVE',
      homeTeam: { name: 'Manchester City', logo: '🔵' },
      awayTeam: { name: 'Arsenal', logo: '🔴' },
      odds: { home: '2.10', draw: '3.40', away: '3.20' },
      percentages: { home: '45%', draw: '25%', away: '30%' },
      isLive: true,
      isHot: true,
      score: { home: 1, away: 1 }
    },
    {
      id: 'upcoming-1',
      league: 'La Liga • Today 21:00',
      time: '21:00',
      homeTeam: { name: 'Real Madrid', logo: '⚪' },
      awayTeam: { name: 'Barcelona', logo: '🔴' },
      odds: { home: '2.50', draw: '3.10', away: '2.80' },
      percentages: { home: '40%', draw: '25%', away: '35%' },
      isLive: false,
      isHot: true,
      score: undefined
    },
    {
      id: 'upcoming-2',
      league: 'Bundesliga • Today 18:30',
      time: '18:30',
      homeTeam: { name: 'Bayern Munich', logo: '🔴' },
      awayTeam: { name: 'Borussia Dortmund', logo: '🟡' },
      odds: { home: '1.85', draw: '3.80', away: '4.20' },
      percentages: { home: '55%', draw: '25%', away: '20%' },
      isLive: false,
      isHot: false,
      score: undefined
    },
    {
      id: 'upcoming-3',
      league: 'Serie A • Tomorrow 15:00',
      time: '15:00',
      homeTeam: { name: 'Juventus', logo: '⚫' },
      awayTeam: { name: 'AC Milan', logo: '🔴' },
      odds: { home: '2.20', draw: '3.20', away: '3.40' },
      percentages: { home: '42%', draw: '28%', away: '30%' },
      isLive: false,
      isHot: false,
      score: undefined
    }
  ];

  // Smart display logic - show real data when available, enhanced fallback during loading
  const displayMatches = filteredMatches.length > 0 ? filteredMatches.map(match => ({
    id: match.id,
    league: `${match.league} • Live Data`,
    time: match.time,
    homeTeam: { 
      name: match.homeTeam.name, 
      logo: '🏠'
    },
    awayTeam: { 
      name: match.awayTeam.name, 
      logo: '🚀'
    },
    odds: { 
      home: match.homeOdds.toFixed(2), 
      draw: match.drawOdds.toFixed(2), 
      away: match.awayOdds.toFixed(2) 
    },
    percentages: { 
      home: `${match.predictions.winProbability.home}%`, 
      draw: `${match.predictions.winProbability.draw}%`, 
      away: `${match.predictions.winProbability.away}%` 
    },
    isLive: match.status === 'live',
    isHot: match.predictions.confidence > 70,
    score: match.status === 'live' ? { home: 0, away: 0 } : undefined
  })) : enhancedFallbackMatches;

  const dataSource = filteredMatches.length > 0 ? 'live' : (isLoading ? 'loading' : 'preview');

  return (
    <div className="space-y-4">
      {/* Competition Menu */}
      <CompetitionMenu />

      {/* Section Header with Enhanced Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-400">Live Matches</span>
          
          {dataSource === 'live' && (
            <Badge variant="outline" className="border-green-500/30 text-green-400">
              <Zap className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          )}
          
          {dataSource === 'loading' && (
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 animate-pulse">
              <div className="h-3 w-3 mr-1 rounded-full bg-blue-400 animate-pulse"></div>
              Syncing...
            </Badge>
          )}
          
          {dataSource === 'preview' && (
            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
              <Star className="h-3 w-3 mr-1" />
              Live Preview
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{displayMatches.length} matches</span>
          {dataSource === 'preview' && (
            <span className="text-xs text-gray-600">• Data syncing in background</span>
          )}
        </div>
      </div>

      {/* Subtle loading indicator when syncing */}
      {isLoading && dataSource !== 'loading' && (
        <div className="h-1 bg-gradient-to-r from-neon-blue via-neon-lime to-purple-500 rounded-full animate-pulse opacity-50"></div>
      )}

      {/* Error Message - Only show if persistent */}
      {error && !isLoading && displayMatches.length === 0 && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Sync temporarily offline - showing preview data while reconnecting
          </div>
        </div>
      )}

      {/* Match Cards */}
      <div className="space-y-3">
        {displayMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-dark-border text-white overflow-hidden relative hover:border-neon-blue/50 transition-all duration-300 group">
              {/* Decorative glow effects */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="w-full h-full bg-gradient-to-bl from-neon-blue via-neon-lime to-purple-500 rounded-full blur-xl"></div>
              </div>
              
              <CardContent className="p-4 relative z-10">
                {/* League and Status Badges */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neon-blue">⚽</span>
                    <span className="text-xs text-gray-400">{match.league}</span>
                  </div>
                  <div className="flex gap-2">
                    {match.isHot && (
                      <Badge className="bg-neon-lime text-black text-xs font-bold">
                        HOT
                      </Badge>
                    )}
                    {match.isLive && (
                      <Badge className="bg-red-500 text-white text-xs font-bold animate-pulse">
                        LIVE
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Teams and Time/Score */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{match.homeTeam.logo}</div>
                    <span className="font-medium text-white">{match.homeTeam.name}</span>
                  </div>
                  
                  <div className="text-center">
                    {match.isLive && match.score ? (
                      <div className="text-lg font-bold text-red-400">
                        {match.score.home} - {match.score.away}
                      </div>
                    ) : (
                      <div className="text-lg font-bold text-neon-blue">{match.time}</div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-white">{match.awayTeam.name}</span>
                    <div className="text-2xl">{match.awayTeam.logo}</div>
                  </div>
                </div>

                {/* Odds Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    className="bg-dark-lighter text-white border-dark-border hover:bg-neon-blue hover:text-black rounded-lg font-bold text-center p-3 transition-all"
                    onClick={() => setSelectedMatch(match.id)}
                  >
                    <div>
                      <div className="text-xs text-gray-400">{match.homeTeam.name}</div>
                      <div className="text-lg">{match.odds.home}</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-neon-lime text-black border-0 hover:bg-neon-lime/80 rounded-lg font-bold text-center p-3 transition-all"
                    onClick={() => setSelectedMatch(match.id)}
                  >
                    <div>
                      <div className="text-xs">Draw</div>
                      <div className="text-lg">{match.odds.draw}</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-dark-lighter text-white border-dark-border hover:bg-neon-blue hover:text-black rounded-lg font-bold text-center p-3 transition-all"
                    onClick={() => setSelectedMatch(match.id)}
                  >
                    <div>
                      <div className="text-xs text-gray-400">{match.awayTeam.name}</div>
                      <div className="text-lg">{match.odds.away}</div>
                    </div>
                  </Button>
                </div>

                {/* Percentage bars */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="h-1 bg-gradient-to-r from-neon-blue to-neon-lime rounded mb-1"></div>
                    <span className="text-gray-400">{match.percentages.home}</span>
                  </div>
                  <div className="text-center">
                    <div className="h-1 bg-gradient-to-r from-neon-blue to-neon-lime rounded mb-1"></div>
                    <span className="text-gray-400">{match.percentages.draw}</span>
                  </div>
                  <div className="text-center">
                    <div className="h-1 bg-gradient-to-r from-neon-blue to-neon-lime rounded mb-1"></div>
                    <span className="text-gray-400">{match.percentages.away}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sync Status Footer */}
      {dataSource === 'preview' && (
        <div className="text-center py-4">
          <div className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
            Auto-syncing with live sources every few minutes
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchFeed;
