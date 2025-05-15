
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
    <Card className="bg-gradient-to-b from-green-900 to-green-950 border border-amber-500/30 relative overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-[url('/felt-texture.png')] bg-repeat opacity-30 z-0"></div>
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <CardHeader className="relative z-10 border-b border-amber-500/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-amber-100 flex items-center">
            <span className="text-gradient bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300">Roulette Advisor</span>
            <Badge variant="outline" className="ml-4 bg-black/40 backdrop-blur-sm border border-amber-500/50 font-medium text-amber-200 px-3 py-1">
              European
            </Badge>
          </CardTitle>
          <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border border-amber-500 font-medium text-amber-200 px-3 py-1.5 shadow-glow">
            Balance: <span className="text-amber-100 font-bold ml-1">${balance}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-6">
        <div className="space-y-8">
          {/* Game Statistics */}
          <GameStats stats={gameStats} balance={balance} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              {/* Wheel Section with glass effect */}
              <div className="backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-amber-500/20 shadow-lg">
                <WheelSection />
              </div>
              
              {/* AI Recommendation - Now with enhanced styling */}
              <div className="transform hover:scale-[1.01] transition-all duration-300">
                <AiRecommendation />
              </div>
              
              {/* Win/Loss History */}
              <div className="transform hover:scale-[1.01] transition-all duration-300">
                <WinLossHistory />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              {/* Betting Section with enhanced styling */}
              <div className="backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-amber-500/20 shadow-lg">
                <BettingSection />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between relative z-10 border-t border-amber-500/20 py-5 mt-6 backdrop-blur-sm bg-black/20">
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
