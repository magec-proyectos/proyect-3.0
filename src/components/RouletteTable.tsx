
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
    
    setIsSpinning(true);
    setLastSpinResult(undefined);
    
    // Simulate wheel spinning
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 38); // 0-37 (including 00)
      const result = newResult === 37 ? 0 : newResult; // Treat 37 as 00 (also using 0 to represent 00)
      
      setLastSpinResult(result);
      setPreviousResults([result, ...previousResults.slice(0, 4)]);
      setIsSpinning(false);
      
      // Determine if bet won
      const isWin = evaluateBet(selectedBet, result);
      
      // Update stats
      updateGameStats(isWin);
      
      // Show result toast
      if (isWin) {
        const winAmount = betAmount * getBetOdds(selectedBet.type);
        toast({
          title: "You Won!",
          description: `Congratulations! You've won $${winAmount}.`,
          variant: "default",
        });
      } else {
        toast({
          title: "You Lost",
          description: `Better luck next time. You've lost $${betAmount}.`,
          variant: "destructive",
        });
      }
    }, 3000); // 3 second animation
  };
  
  const recommendation = selectedBet ? getRecommendation(selectedBet) : null;
  
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Roulette Advisor</CardTitle>
          <Badge variant="outline" className="bg-dark/50">Balance: $1000</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        {/* Table background */}
        <div className="absolute inset-0 bg-green-900/30 rounded-md -z-10"></div>
        
        <div className="space-y-8 py-4">
          {/* Session stats */}
          <GameStats stats={gameStats} />
          
          {/* Previous Results */}
          <PreviousResults results={previousResults} />
          
          {/* Roulette Wheel */}
          <RouletteWheel spinning={isSpinning} lastResult={lastSpinResult} />
          
          {/* Chip Selection */}
          <ChipSelector 
            chipAmount={chipAmount}
            decreaseChip={decreaseChip}
            increaseChip={increaseChip}
          />
          
          {/* Betting Board */}
          <div className="space-y-3">
            <h3 className="text-gray-300">Select Your Bet</h3>
            <BettingBoard onSelectBet={handleSelectBet} />
          </div>
          
          {/* Selected Bet */}
          {selectedBet && (
            <SelectedBet selectedBet={selectedBet} betAmount={betAmount} />
          )}
          
          {/* Recommendation Box */}
          {selectedBet && recommendation && (
            <BetRecommendation recommendation={recommendation} />
          )}
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        <Button 
          variant="ghost" 
          onClick={resetBets} 
          className="text-gray-400 hover:text-white"
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
          >
            <Settings className="mr-2 h-4 w-4" />
            Change Bet
          </Button>
          
          <Button 
            variant="default" 
            onClick={spinWheel}
            disabled={!selectedBet || isSpinning}
            className="bg-neon-blue text-black hover:bg-neon-blue/90"
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
