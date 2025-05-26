
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Star, TrendingUp, Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';
import LiveSearch from './LiveSearch';
import AdvancedFilters from './AdvancedFilters';

const EnhancedMatchSelection = () => {
  const { 
    selectedSport,
    setSelectedSport,
    selectedLeague,
    setSelectedLeague,
    selectedMatch,
    setSelectedMatch,
    leagues,
    filteredMatches,
    favoriteTeams,
    favoriteLeagues,
    toggleFavoriteTeam,
    toggleFavoriteLeague,
    isLoading
  } = useFootball();

  const handleFindMatch = () => {
    // This would trigger a refetch or navigate to match details
    console.log('Finding match:', selectedMatch);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.7) return 'text-green-500 border-green-500';
    if (confidence > 0.5) return 'text-yellow-500 border-yellow-500';
    return 'text-red-500 border-red-500';
  };

  const getFormBadgeColor = (result: 'W' | 'L' | 'D') => {
    switch (result) {
      case 'W': return 'bg-green-500';
      case 'L': return 'bg-red-500';
      case 'D': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sport Selection */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-neon-blue" />
            Select Sport
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'football', name: 'Football', icon: '⚽' },
              { id: 'basketball', name: 'Basketball', icon: '🏀' },
              { id: 'americanFootball', name: 'American Football', icon: '🏈' }
            ].map((sport) => (
              <Button
                key={sport.id}
                variant={selectedSport === sport.id ? "default" : "outline"}
                onClick={() => setSelectedSport(sport.id as any)}
                className={`h-16 flex flex-col gap-2 ${
                  selectedSport === sport.id 
                    ? 'bg-neon-blue text-black border-neon-blue' 
                    : 'bg-transparent text-gray-300 border-gray-600'
                }`}
              >
                <span className="text-2xl">{sport.icon}</span>
                <span className="text-sm font-medium">{sport.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Search */}
      <LiveSearch />

      {/* Advanced Filters */}
      <AdvancedFilters />

      {/* League Selection */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-neon-blue" />
              Select League
            </div>
            <Badge variant="outline" className="text-xs">
              {leagues.length} available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger className="bg-dark-lighter border-dark-border h-12">
              <SelectValue placeholder="Choose a league" />
            </SelectTrigger>
            <SelectContent className="bg-dark border-dark-border text-white">
              {leagues.map((league) => (
                <SelectItem key={league.id} value={league.id}>
                  <div className="flex items-center gap-3 w-full">
                    <img src={league.logo} alt={league.name} className="w-5 h-5" />
                    <span>{league.name}</span>
                    <span className="text-xs text-gray-400">({league.country})</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteLeague(league.id);
                      }}
                      className="p-1 h-auto ml-auto"
                    >
                      <Star 
                        className={`h-3 w-3 ${
                          favoriteLeagues.includes(league.id) 
                            ? 'fill-yellow-500 text-yellow-500' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Enhanced Match List */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-neon-blue" />
              Available Matches
            </div>
            <Badge variant="outline" className="text-xs">
              {filteredMatches.length} matches
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-dark-lighter h-24 rounded-lg" />
              ))}
            </div>
          ) : filteredMatches.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No matches found with current filters</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredMatches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 bg-dark-lighter rounded-lg border transition-all cursor-pointer hover:border-neon-blue/50 ${
                    selectedMatch === match.id ? 'border-neon-blue' : 'border-dark-border'
                  }`}
                  onClick={() => setSelectedMatch(match.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8" />
                        <div>
                          <div className="font-medium text-sm">{match.homeTeam.name}</div>
                          <div className="flex gap-1 mt-1">
                            {match.homeTeam.recentForm.slice(0, 5).map((result, idx) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${getFormBadgeColor(result)}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-gray-400 text-sm mx-4">vs</div>
                      
                      <div className="flex items-center gap-2">
                        <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8" />
                        <div>
                          <div className="font-medium text-sm">{match.awayTeam.name}</div>
                          <div className="flex gap-1 mt-1">
                            {match.awayTeam.recentForm.slice(0, 5).map((result, idx) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${getFormBadgeColor(result)}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteTeam(match.homeTeam.id);
                      }}
                      className="p-1 h-auto"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          favoriteTeams.includes(match.homeTeam.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {match.date} at {match.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {match.stadium}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {match.league}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span>Odds: {match.homeOdds}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getConfidenceColor(match.predictions.confidence)}`}
                      >
                        {Math.round(match.predictions.confidence * 100)}% confidence
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Button */}
      {selectedMatch && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button 
            onClick={handleFindMatch}
            className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-medium h-12"
          >
            View Match Analysis
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedMatchSelection;
