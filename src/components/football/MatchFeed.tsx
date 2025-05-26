
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFootball } from '@/contexts/FootballContext';

const MatchFeed = () => {
  const { filteredMatches, selectedMatch, setSelectedMatch } = useFootball();

  const matches = [
    {
      id: 1,
      league: 'Saudi Pro League • J34',
      time: '19:00',
      homeTeam: { name: 'Al Fateh', logo: '🔵' },
      awayTeam: { name: 'Al Nassr Riyadh', logo: '🟡' },
      odds: { home: '7,25', draw: '6,00', away: '1,29' },
      percentages: { home: '1%', draw: '11%', away: '98%' },
      isLive: false,
      isHot: true
    },
    {
      id: 2,
      league: 'Saudi Pro League • J34',
      time: '19:00',
      homeTeam: { name: 'Al-Ittihad FC', logo: '🟡' },
      awayTeam: { name: 'Damac', logo: '🔴' },
      odds: { home: '1,42', draw: '4,90', away: '5,90' },
      percentages: { home: '99%', draw: '1%', away: '0%' },
      isLive: false,
      isHot: false
    },
    {
      id: 3,
      league: 'Saudi Pro League • J34',
      time: '19:00',
      homeTeam: { name: 'Al-Hilal', logo: '🔵' },
      awayTeam: { name: 'Al-Qadsiah', logo: '🔴' },
      odds: { home: '1,50', draw: '4,70', away: '5,10' },
      percentages: { home: '95%', draw: '2%', away: '3%' },
      isLive: false,
      isHot: false
    }
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Partidos</span>
          <Badge variant="outline" className="border-gray-300 text-gray-600">
            Competición
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>1 selección</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            🗑️
          </Button>
        </div>
      </div>

      {/* Match Cards - Winamax Style */}
      <div className="space-y-3">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-r from-green-800 to-green-900 border-0 text-white overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <div className="w-full h-full bg-gradient-to-bl from-yellow-400 via-orange-500 to-red-500 rounded-full blur-xl"></div>
              </div>
              
              <CardContent className="p-4 relative z-10">
                {/* League and Hot Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-200">⚽</span>
                    <span className="text-xs text-green-200">{match.league}</span>
                  </div>
                  {match.isHot && (
                    <Badge className="bg-red-500 text-white text-xs">
                      HOT (9)
                    </Badge>
                  )}
                </div>

                {/* Teams and Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{match.homeTeam.logo}</div>
                    <span className="font-medium">{match.homeTeam.name}</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold">{match.time}</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{match.awayTeam.name}</span>
                    <div className="text-2xl">{match.awayTeam.logo}</div>
                  </div>
                </div>

                {/* Odds Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    className="bg-white text-black border-0 hover:bg-gray-100 rounded-lg font-bold text-center p-3"
                  >
                    <div>
                      <div className="text-xs text-gray-600">{match.homeTeam.name}</div>
                      <div className="text-lg">{match.odds.home}</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-red-500 text-white border-0 hover:bg-red-600 rounded-lg font-bold text-center p-3"
                  >
                    <div>
                      <div className="text-xs">Empate</div>
                      <div className="text-lg">{match.odds.draw}</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-white text-black border-0 hover:bg-gray-100 rounded-lg font-bold text-center p-3"
                  >
                    <div>
                      <div className="text-xs text-gray-600">{match.awayTeam.name}</div>
                      <div className="text-lg">{match.odds.away}</div>
                    </div>
                  </Button>
                </div>

                {/* Percentage bars */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="h-1 bg-orange-400 rounded mb-1"></div>
                    <span>{match.percentages.home}</span>
                  </div>
                  <div className="text-center">
                    <div className="h-1 bg-orange-400 rounded mb-1"></div>
                    <span>{match.percentages.draw}</span>
                  </div>
                  <div className="text-center">
                    <div className="h-1 bg-orange-400 rounded mb-1"></div>
                    <span>{match.percentages.away}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchFeed;
