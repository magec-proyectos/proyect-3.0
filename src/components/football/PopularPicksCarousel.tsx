
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Plus, ChevronLeft, ChevronRight, Zap, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const PopularPicksCarousel = () => {
  const aiPicks = [
    {
      id: 1,
      match: "Real Madrid vs Barcelona",
      bet: "Over 2.5 Goals",
      odds: 1.85,
      boost: 5.50,
      originalOdds: 5.00,
      confidence: 94,
      trend: "up"
    },
    {
      id: 2,
      match: "Liverpool vs Man City", 
      bet: "Both Teams to Score",
      odds: 1.65,
      boost: 5.00,
      originalOdds: 4.50,
      confidence: 87,
      trend: "up"
    },
    {
      id: 3,
      match: "PSG vs Inter Milan",
      bet: "PSG Win & BTTS",
      odds: 3.20,
      boost: 3.30,
      originalOdds: 3.10,
      confidence: 91,
      trend: "stable"
    },
    {
      id: 4,
      match: "Bayern vs Dortmund",
      bet: "Over 3.5 Goals",
      odds: 2.10,
      boost: 2.25,
      originalOdds: 2.05,
      confidence: 76,
      trend: "up"
    },
    {
      id: 5,
      match: "Arsenal vs Chelsea",
      bet: "Draw No Bet",
      odds: 1.90,
      boost: 2.00,
      originalOdds: 1.85,
      confidence: 82,
      trend: "stable"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Brain className="h-6 w-6 text-neon-blue" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-neon-lime to-neon-blue rounded-full animate-pulse"></div>
        </div>
        <h2 className="text-xl font-bold gradient-text">AI Predictions</h2>
        <Badge className="bg-gradient-to-r from-neon-blue/20 to-neon-lime/20 text-neon-lime border-neon-lime/30 animate-pulse">
          <Zap className="h-3 w-3 mr-1" />
          Smart
        </Badge>
        <div className="flex items-center gap-1 ml-auto">
          <div className="flex space-x-1">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-4 bg-gradient-to-t from-neon-blue to-neon-lime rounded-full"
                animate={{
                  scaleY: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400 ml-2">Live Analysis</span>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {aiPicks.map((pick, index) => (
            <CarouselItem key={pick.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-dark-card to-dark-lighter border-dark-border hover:border-neon-blue/50 transition-all duration-300 group cursor-pointer h-full relative overflow-hidden">
                  {/* AI Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-gradient-to-r from-green-500/20 to-neon-lime/20 text-green-400 border-green-500/30">
                        <Brain className="h-3 w-3 mr-1" />
                        AI BOOST
                      </Badge>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-neon-lime">
                          <Zap className="h-3 w-3" />
                          <span className="text-xs font-bold">{pick.confidence}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-1">{pick.match}</div>
                    <div className="font-medium text-white mb-3">{pick.bet}</div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          {pick.originalOdds.toFixed(2)}
                        </span>
                        <span className="text-lg font-bold text-neon-lime">
                          {pick.boost.toFixed(2)}
                        </span>
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>

                    {/* AI Confidence Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>AI Confidence</span>
                        <span>{pick.confidence}%</span>
                      </div>
                      <div className="w-full bg-dark-darker rounded-full h-2">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-neon-blue to-neon-lime rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${pick.confidence}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-lime hover:from-neon-blue/80 hover:to-neon-lime/80 text-black font-medium transition-all duration-300 shadow-lg shadow-neon-blue/25 hover:shadow-neon-lime/25">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Slip
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-dark-card border-dark-border text-white hover:bg-dark-lighter" />
        <CarouselNext className="bg-dark-card border-dark-border text-white hover:bg-dark-lighter" />
      </Carousel>
    </div>
  );
};

export default PopularPicksCarousel;
