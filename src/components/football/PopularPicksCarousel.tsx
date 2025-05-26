
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Flame, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const PopularPicksCarousel = () => {
  const popularPicks = [
    {
      id: 1,
      match: "Real Madrid vs Barcelona",
      bet: "Over 2.5 Goals",
      odds: 1.85,
      boost: 5.50,
      originalOdds: 5.00,
      picks: 371,
      trend: "up"
    },
    {
      id: 2,
      match: "Liverpool vs Man City", 
      bet: "Both Teams to Score",
      odds: 1.65,
      boost: 5.00,
      originalOdds: 4.50,
      picks: 174,
      trend: "up"
    },
    {
      id: 3,
      match: "PSG vs Inter Milan",
      bet: "PSG Win & BTTS",
      odds: 3.20,
      boost: 3.30,
      originalOdds: 3.10,
      picks: 263,
      trend: "stable"
    },
    {
      id: 4,
      match: "Bayern vs Dortmund",
      bet: "Over 3.5 Goals",
      odds: 2.10,
      boost: 2.25,
      originalOdds: 2.05,
      picks: 189,
      trend: "up"
    },
    {
      id: 5,
      match: "Arsenal vs Chelsea",
      bet: "Draw No Bet",
      odds: 1.90,
      boost: 2.00,
      originalOdds: 1.85,
      picks: 145,
      trend: "stable"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-5 w-5 text-orange-500" />
        <h2 className="text-xl font-bold text-white">Popular Picks</h2>
        <Badge variant="outline" className="border-orange-500 text-orange-500">
          Trending
        </Badge>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {popularPicks.map((pick, index) => (
            <CarouselItem key={pick.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-dark-card border-dark-border hover:border-neon-blue/50 transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        BOOST
                      </Badge>
                      <div className="flex items-center gap-1 text-orange-500">
                        <Flame className="h-3 w-3" />
                        <span className="text-xs">{pick.picks}</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-1">{pick.match}</div>
                    <div className="font-medium text-white mb-3">{pick.bet}</div>

                    <div className="flex items-center justify-between mb-3">
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

                    <Button className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
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
