
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveMatches = () => {
  const liveMatches = [
    {
      id: 1,
      homeTeam: "Paris Saint-Germain",
      awayTeam: "Inter Milan",
      homeScore: 1,
      awayScore: 0,
      minute: "67'",
      homeOdds: 2.25,
      drawOdds: 3.45,
      awayOdds: 3.40,
      homeProbability: 83,
      drawProbability: 5,
      awayProbability: 12
    },
    {
      id: 2,
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona", 
      homeScore: 0,
      awayScore: 1,
      minute: "23'",
      homeOdds: 2.80,
      drawOdds: 3.20,
      awayOdds: 2.50,
      homeProbability: 45,
      drawProbability: 25,
      awayProbability: 30
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <h2 className="text-xl font-bold text-white">Live Matches</h2>
        <Badge className="bg-red-500 text-white">LIVE</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {liveMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30 hover:border-purple-400 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-red-500 text-white">
                    <Play className="h-3 w-3 mr-1" />
                    {match.minute}
                  </Badge>
                  <div className="text-2xl font-bold text-white">
                    {match.homeScore} - {match.awayScore}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{match.homeTeam}</span>
                    <span className="text-lg font-bold text-neon-blue">{match.homeOdds}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{match.awayTeam}</span>
                    <span className="text-lg font-bold text-neon-blue">{match.awayOdds}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 mb-3">
                  <div className="bg-dark-lighter rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Home</div>
                    <div className="font-bold text-white">{match.homeProbability}%</div>
                  </div>
                  <div className="bg-dark-lighter rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Draw</div>
                    <div className="font-bold text-white">{match.drawProbability}%</div>
                  </div>
                  <div className="bg-dark-lighter rounded p-2 text-center">
                    <div className="text-xs text-gray-400">Away</div>
                    <div className="font-bold text-white">{match.awayProbability}%</div>
                  </div>
                </div>

                <Button className="w-full bg-neon-lime hover:bg-neon-lime/90 text-black font-medium">
                  <Plus className="h-4 w-4 mr-2" />
                  Quick Bet
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiveMatches;
