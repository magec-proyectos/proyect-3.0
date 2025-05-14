
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BetType, GameStats, RecommendationType } from '@/components/roulette/types';
import { evaluateBet, getBetOdds, getRecommendation } from '@/components/roulette/rouletteUtils';
import { toast } from '@/hooks/use-toast';

interface RouletteContextType {
  selectedBet: {type: BetType, number?: number} | null;
  previousResults: number[];
  isSpinning: boolean;
  chipAmount: number;
  betAmount: number;
  lastSpinResult?: number;
  balance: number;
  gameStats: GameStats;
  aiRecommendation: RecommendationType | null;
  handleSelectBet: (type: BetType, number?: number) => void;
  resetBets: () => void;
  increaseChip: () => void;
  decreaseChip: () => void;
  spinWheel: () => void;
  updateBetAmount: (amount: number) => void;
}

const RouletteContext = createContext<RouletteContextType | undefined>(undefined);

export const RouletteProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedBet, setSelectedBet] = useState<{type: BetType, number?: number} | null>(null);
  const [previousResults, setPreviousResults] = useState<number[]>([14, 7, 32, 5, 19]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [chipAmount, setChipAmount] = useState<number>(10);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [lastSpinResult, setLastSpinResult] = useState<number | undefined>(undefined);
  const [balance, setBalance] = useState<number>(1000);
  const [aiRecommendation, setAiRecommendation] = useState<RecommendationType | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    totalBets: 0,
    totalWinnings: 0,
    totalLosses: 0
  });
  
  // Update AI recommendation when bet changes
  useEffect(() => {
    if (selectedBet) {
      setAiRecommendation(getRecommendation(selectedBet));
    } else {
      setAiRecommendation(null);
    }
  }, [selectedBet]);
  
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
    if (selectedBet) setBetAmount(Math.min(newAmount, 1000));
  };
  
  const decreaseChip = () => {
    const newAmount = chipAmount > 50 ? chipAmount - 50 : chipAmount - 10;
    setChipAmount(Math.max(newAmount, 10));
    if (selectedBet) setBetAmount(Math.max(newAmount, 10));
  };
  
  const updateBetAmount = (amount: number) => {
    setBetAmount(amount);
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
      const newResult = Math.floor(Math.random() * 37); // 0-36 for European roulette
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
  
  const value = {
    selectedBet,
    previousResults,
    isSpinning,
    chipAmount,
    betAmount,
    lastSpinResult,
    balance,
    gameStats,
    aiRecommendation,
    handleSelectBet,
    resetBets,
    increaseChip,
    decreaseChip,
    spinWheel,
    updateBetAmount
  };
  
  return (
    <RouletteContext.Provider value={value}>
      {children}
    </RouletteContext.Provider>
  );
};

export const useRoulette = () => {
  const context = useContext(RouletteContext);
  if (context === undefined) {
    throw new Error('useRoulette must be used within a RouletteProvider');
  }
  return context;
};
