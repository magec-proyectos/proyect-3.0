
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ArrowRight, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

import RouletteWheel from './roulette/RouletteWheel';
import BettingBoard from './roulette/BettingBoard';
import GameStats from './roulette/GameStats';
import PreviousResults from './roulette/PreviousResults';
import SelectedBet from './roulette/SelectedBet';
import BetRecommendation from './roulette/BetRecommendation';
import ChipSelector from './roulette/ChipSelector';
import { BetType, GameStats as GameStatsType } from './roulette/types';
import { evaluateBet, getBetOdds, getRecommendation } from './roulette/rouletteUtils';

const RouletteTable = () => {
  const [selectedBet, setSelectedBet] = useState<{type: BetType, number?: number} | null>(null);
  const [previousResults, setPreviousResults] = useState<number[]>([14, 7, 32, 5, 19]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [chipAmount, setChipAmount] = useState<number>(10);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [lastSpinResult, setLastSpinResult] = useState<number | undefined>(undefined);
  const [balance, setBalance] = useState<number>(1000);
  const [gameStats, setGameStats] = useState<GameStatsType>({
    wins: 0,
    losses: 0,
    totalBets: 0,
    totalWinnings: 0,
    totalLosses: 0
  });
  
  const handleSelectBet = (type: BetType, number?: number) => {
    setSelectedBet({ type, number });
    setBetAmount(chipAmount);
  };
  
  const resetBets = () => {
    setSelectedBet(null);
    setBetAmount(0);
  };
  
  const increaseChip = () => {
    const newAmount = chipAmount < 50 ? chipAmount + 10 : chipAmount + 50;
    setChipAmount(Math.min(newAmount, 1000));
  };
  
  const decreaseChip = () => {
    const newAmount = chipAmount > 50 ? chipAmount - 50 : chipAmount - 10;
    setChipAmount(Math.max(newAmount, 10));
  };
  
  const updateGameStats = (isWin: boolean) => {
    setGameStats(prev => {
      const winAmount = isWin ? betAmount * getBetOdds(selectedBet!.type) : 0;
      
      return {
        wins: isWin ? prev.wins + 1 : prev.wins,
        losses: !isWin ? prev.losses + 1 : prev.losses,
        totalBets: prev.totalBets + 1,
        totalWinnings: prev.totalWinnings + winAmount,
        totalLosses: prev.totalLosses + (isWin ? 0 : betAmount)
      };
    });
    
    // Update balance
    setBalance(prev => {
      if (isWin) {
        return prev + (betAmount * getBetOdds(selectedBet!.type));
      } else {
        return prev - betAmount;
      }
    });
  };
  
  const spinWheel = () => {
    if (!selectedBet) {
      toast({
        title: "No bet selected",
        description: "Please place a bet before spinning the wheel.",
        variant: "destructive",
      });
      return;
    }
    
    if (betAmount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance for this bet.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSpinning(true);
    setLastSpinResult(undefined);
    
    // Simulate wheel spin
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 38); // 0-37 (including 00)
      setLastSpinResult(newResult);
      setPreviousResults([newResult, ...previousResults.slice(0, 4)]);
      setIsSpinning(false);
      
      // Determine if the bet won
      const isWin = evaluateBet(selectedBet, newResult);
      
      // Update statistics
      updateGameStats(isWin);
      
      // Show result toast
      if (isWin) {
        const winAmount = betAmount * getBetOdds(selectedBet.type);
        toast({
          title: "You Won!",
          description: `Congratulations! You won $${winAmount}.`,
          variant: "default",
        });
      } else {
        toast({
          title: "You Lost",
          description: `Better luck next time. You lost $${betAmount}.`,
          variant: "destructive",
        });
      }
    }, 3000); // 3 seconds animation
  };
  
  const recommendation = selectedBet ? getRecommendation(selectedBet) : null;
  
  return (
    <Card className="bg-green-900/80 border border-amber-800/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/felt-texture.png')] bg-repeat opacity-20 z-0"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-amber-200">European Roulette</CardTitle>
          <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border border-amber-500 font-medium text-amber-300">
            Balance: ${balance}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="space-y-8 py-4">
          {/* Game Statistics */}
          <GameStats stats={gameStats} balance={balance} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-4">
              {/* Previous Results */}
              <PreviousResults results={previousResults} />
              
              {/* Roulette Wheel */}
              <div className="flex justify-center">
                <RouletteWheel spinning={isSpinning} lastResult={lastSpinResult} />
              </div>
              
              {/* Chip Selector */}
              <ChipSelector 
                chipAmount={chipAmount}
                decreaseChip={decreaseChip}
                increaseChip={increaseChip}
              />
            </div>
            
            <div className="md:col-span-2 space-y-4">
              {/* Betting Board */}
              <div className="space-y-3">
                <h3 className="text-amber-200 font-semibold">Select Your Bet</h3>
                <BettingBoard onSelectBet={handleSelectBet} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Selected Bet */}
                {selectedBet && (
                  <div className="md:col-span-1">
                    <SelectedBet selectedBet={selectedBet} betAmount={betAmount} />
                  </div>
                )}
                
                {/* Recommendation */}
                {selectedBet && recommendation && (
                  <div className="md:col-span-1">
                    <BetRecommendation recommendation={recommendation} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between relative z-10 border-t border-amber-800/30">
        <Button 
          variant="ghost" 
          onClick={resetBets} 
          className="text-amber-200 hover:text-white hover:bg-green-800"
          disabled={!selectedBet || isSpinning}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Clear Bet
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedBet(prevBet => {
                if (!prevBet) return null;
                setBetAmount(chipAmount);
                return prevBet;
              });
            }}
            disabled={!selectedBet || isSpinning}
            className="border-amber-600 bg-green-800/50 hover:bg-green-800 text-amber-200"
          >
            <Settings className="mr-2 h-4 w-4" />
            Change Bet
          </Button>
          
          <Button 
            variant="default" 
            onClick={spinWheel}
            disabled={!selectedBet || isSpinning}
            className={`bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold hover:from-amber-700 hover:to-amber-600 transition-all
                       ${isSpinning ? 'animate-pulse' : ''}`}
          >
            {isSpinning ? 'Spinning...' : 'Spin Wheel'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RouletteTable;
