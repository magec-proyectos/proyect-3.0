
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RouletteProvider, useRoulette } from '@/contexts/RouletteContext';

import WheelSection from './roulette/WheelSection';
import BettingSection from './roulette/BettingSection';
import GameStats from './roulette/GameStats';
import ActionButtons from './roulette/ActionButtons';
import AiRecommendation from './roulette/AiRecommendation';
import WinLossHistory from './roulette/WinLossHistory';

// Inner component that uses the roulette context
const RouletteTableInner: React.FC = () => {
  const { balance, gameStats } = useRoulette();
  
  return (
    <Card className="bg-green-900/80 border border-amber-800/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/felt-texture.png')] bg-repeat opacity-20 z-0"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-amber-200">European Roulette</CardTitle>
          <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border border-amber-500 font-medium text-amber-300 px-3 py-1.5">
            Balance: ${balance}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="space-y-8 py-4">
          {/* Game Statistics */}
          <GameStats stats={gameStats} balance={balance} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              {/* Wheel Section */}
              <WheelSection />
              
              {/* AI Recommendation */}
              <AiRecommendation />
              
              {/* Win/Loss History - New Component */}
              <WinLossHistory />
            </div>
            
            <div className="md:col-span-2 space-y-6">
              {/* Betting Section */}
              <BettingSection />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between relative z-10 border-t border-amber-800/30 py-4">
        <ActionButtons />
      </CardFooter>
    </Card>
  );
};

// Wrapper component that provides the context
const RouletteTable: React.FC = () => {
  return (
    <RouletteProvider>
      <RouletteTableInner />
    </RouletteProvider>
  );
};

export default RouletteTable;
