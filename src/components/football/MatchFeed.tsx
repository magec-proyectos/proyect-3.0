
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const MatchFeed = () => {
  const { filteredMatches, selectedMatch, setSelectedMatch } = useFootball();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 text-white">LIVE</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="border-neon-blue text-neon-blue">Upcoming</Badge>;
      case 'finished':
        return <Badge variant="outline" className="border-gray-500 text-gray-400">Finished</Badge>;
      default:
        return null;
    }
  };

  const getWinPercentageColor = (percentage: number) => {
    if (percentage > 60) return 'text-green-500';
    if (percentage > 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Matches</h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Live Updates
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.slice(0, 6).map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`bg-dark-card border-dark-border hover:border-neon-blue/50 transition-all duration-300 cursor-pointer group ${
                selectedMatch === match.id ? 'border-neon-blue' : ''
              }`}
              onClick={() => setSelectedMatch(match.id)}
            >
              <CardContent className="p-6">
                {/* League and Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://placehold.co/20x20?text=${match.league[0]}`} 
                      alt={match.league} 
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-xs text-gray-400">{match.league}</span>
                  </div>
                  {getStatusBadge(match.status)}
                </div>

                {/* Teams */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={match.homeTeam.logo} 
                        alt={match.homeTeam.name} 
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{match.homeTeam.name}</span>
                    </div>
                    <div className="text-lg font-bold text-neon-blue">
                      {match.homeOdds}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={match.awayTeam.logo} 
                        alt={match.awayTeam.name} 
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{match.awayTeam.name}</span>
                    </div>
                    <div className="text-lg font-bold text-neon-blue">
                      {match.awayOdds}
                    </div>
                  </div>
                </div>

                {/* AI Prediction */}
                <div className="bg-dark-lighter rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-neon-lime" />
                    <span className="text-sm font-medium text-neon-lime">AI Prediction</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className={`font-bold ${getWinPercentageColor(match.predictions.winProbability.home)}`}>
                        {match.predictions.winProbability.home}%
                      </div>
                      <div className="text-gray-400">Home</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-bold ${getWinPercentageColor(match.predictions.winProbability.draw)}`}>
                        {match.predictions.winProbability.draw}%
                      </div>
                      <div className="text-gray-400">Draw</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-bold ${getWinPercentageColor(match.predictions.winProbability.away)}`}>
                        {match.predictions.winProbability.away}%
                      </div>
                      <div className="text-gray-400">Away</div>
                    </div>
                  </div>
                </div>

                {/* Match Time & Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    {match.date} at {match.time}
                  </div>
                  {match.predictions.confidence > 75 && (
                    <Badge className="bg-neon-lime/20 text-neon-lime border-neon-lime/30">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Hot Pick
                    </Badge>
                  )}
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to bet slip logic
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Bet Slip
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchFeed;
