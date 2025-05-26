
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Star, Heart, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const LiveSearch = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredMatches, 
    favoriteTeams, 
    toggleFavoriteTeam,
    setSelectedMatch 
  } = useFootball();
  
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('footballRecentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    setShowResults(searchQuery.length > 0);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      const newRecent = [query, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecent);
      localStorage.setItem('footballRecentSearches', JSON.stringify(newRecent));
    }
  };

  const handleMatchSelect = (matchId: string) => {
    setSelectedMatch(matchId);
    setShowResults(false);
    setSearchQuery('');
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('footballRecentSearches');
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search teams, leagues, or matches..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
          className="pl-10 bg-dark-card border-dark-border h-12 text-white placeholder:text-gray-400"
        />
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 z-50 mt-2"
          >
            <Card className="bg-dark-card border-dark-border shadow-xl">
              <CardContent className="p-4">
                {searchQuery === '' && recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-300">Recent Searches</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSearch(search)}
                          className="text-xs bg-dark-lighter border-dark-border hover:bg-dark hover:text-white"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {search}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {searchQuery && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">
                      Matches ({filteredMatches.length})
                    </h4>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {filteredMatches.length === 0 ? (
                        <p className="text-gray-400 text-sm py-4 text-center">
                          No matches found for "{searchQuery}"
                        </p>
                      ) : (
                        filteredMatches.slice(0, 5).map((match) => (
                          <motion.div
                            key={match.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg hover:bg-dark cursor-pointer transition-colors"
                            onClick={() => handleMatchSelect(match.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <img 
                                  src={match.homeTeam.logo} 
                                  alt={match.homeTeam.name}
                                  className="w-6 h-6"
                                />
                                <span className="text-sm font-medium">
                                  {match.homeTeam.shortName}
                                </span>
                              </div>
                              <span className="text-gray-400 text-xs">vs</span>
                              <div className="flex items-center gap-2">
                                <img 
                                  src={match.awayTeam.logo} 
                                  alt={match.awayTeam.name}
                                  className="w-6 h-6"
                                />
                                <span className="text-sm font-medium">
                                  {match.awayTeam.shortName}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {match.league}
                              </Badge>
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
                                  className={`h-3 w-3 ${
                                    favoriteTeams.includes(match.homeTeam.id) 
                                      ? 'fill-red-500 text-red-500' 
                                      : 'text-gray-400'
                                  }`} 
                                />
                              </Button>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  match.predictions.confidence > 0.7 
                                    ? 'text-green-500 border-green-500' 
                                    : match.predictions.confidence > 0.5 
                                    ? 'text-yellow-500 border-yellow-500' 
                                    : 'text-red-500 border-red-500'
                                }`}
                              >
                                {Math.round(match.predictions.confidence * 100)}%
                              </Badge>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close search results */}
      {showResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default LiveSearch;
