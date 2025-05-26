
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Trophy, Calendar, Star, TrendingUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const CompetitionsSidebar = () => {
  const { leagues, selectedLeague, setSelectedLeague } = useFootball();

  const featuredCompetitions = [
    { id: 'premier-league', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matches: 12, favorite: true },
    { id: 'la-liga', name: 'La Liga', flag: '🇪🇸', matches: 10 },
    { id: 'bundesliga', name: 'Bundesliga', flag: '🇩🇪', matches: 9 },
    { id: 'serie-a', name: 'Serie A', flag: '🇮🇹', matches: 8 },
    { id: 'ligue-1', name: 'Ligue 1', flag: '🇫🇷', matches: 7 },
    { id: 'europa-league', name: 'Europa League', flag: '🇪🇺', matches: 6 },
    { id: 'conference-league', name: 'Conference League', flag: '🇪🇺', matches: 4 }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Today\'s Matches', count: 24, active: false, color: 'text-neon-blue' },
    { icon: Clock, label: 'Live Now', count: 8, active: false, color: 'text-neon-lime', pulse: true },
    { icon: Star, label: 'Favorites', count: 5, active: false, color: 'text-yellow-400' },
    { icon: TrendingUp, label: 'Trending', count: 12, active: false, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-4">
      {/* Enhanced Quick Actions */}
      <Card className="glass-effect border-dark-border shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="font-semibold gradient-text text-base">Quick Access</h3>
        </CardHeader>
        <CardContent className="p-0">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-between p-3 text-left hover:bg-dark-lighter rounded-none first:rounded-t-lg last:rounded-b-lg text-gray-300 hover:text-white transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <action.icon className={`h-4 w-4 ${action.color} ${action.pulse ? 'animate-pulse' : ''} group-hover:scale-110 transition-transform`} />
                  <span className="font-medium text-sm">{action.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-dark/60 text-gray-300 border-dark-border text-xs">
                    {action.count}
                  </Badge>
                  <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-neon-blue transition-colors" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Enhanced Featured Competitions */}
      <Card className="glass-effect border-dark-border shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold gradient-text text-base">Competitions</h3>
            <Badge className="bg-neon-lime/20 text-neon-lime border-neon-lime/30 text-xs">
              {featuredCompetitions.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-transparent">
          <AnimatePresence>
            {featuredCompetitions.map((comp, index) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setSelectedLeague(comp.id)}
                  className={`w-full justify-between p-3 text-left hover:bg-dark-lighter rounded-none transition-all duration-300 group relative overflow-hidden ${
                    selectedLeague === comp.id 
                      ? 'bg-neon-blue/10 border-r-2 border-r-neon-blue text-neon-blue shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{comp.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm">{comp.name}</span>
                        {comp.favorite && (
                          <Star className="h-2 w-2 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {comp.matches} matches
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`h-3 w-3 transition-all duration-300 ${
                    selectedLeague === comp.id ? 'text-neon-blue rotate-90' : 'text-gray-500 group-hover:text-neon-blue'
                  }`} />
                  
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Selection indicator */}
                  {selectedLeague === comp.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 w-1 h-full bg-neon-blue"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Popular Betting Markets */}
      <Card className="glass-effect border-dark-border shadow-lg">
        <CardHeader className="pb-2">
          <h3 className="font-semibold gradient-text text-base">Popular Markets</h3>
        </CardHeader>
        <CardContent className="p-0">
          {['Match Winner', 'Over/Under 2.5', 'Both Teams to Score', 'Correct Score'].map((market, index) => (
            <Button
              key={market}
              variant="ghost"
              className="w-full justify-between p-3 text-left hover:bg-dark-lighter rounded-none text-gray-300 hover:text-neon-blue transition-all duration-300 group"
            >
              <span className="font-medium text-sm">{market}</span>
              <div className="flex items-center gap-2">
                <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30 text-xs">
                  {Math.floor(Math.random() * 50) + 10}
                </Badge>
                <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-neon-blue transition-colors" />
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitionsSidebar;
