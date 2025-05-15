
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BetType, GameStats, RecommendationType, PlacedBet } from '@/components/roulette/types';
import { evaluateBet, getBetOdds, getRecommendation } from '@/components/roulette/rouletteUtils';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface RouletteContextType {
  selectedBet: {type: BetType, number?: number} | null;
  placedBets: PlacedBet[];
  previousResults: number[];
  isSpinning: boolean;
  chipAmount: number;
  betAmount: number;
  lastSpinResult?: number;
  balance: number;
  gameStats: GameStats;
  aiRecommendation: RecommendationType | null;
  handleSelectBet: (type: BetType, number?: number) => void;
  placeBet: () => void;
  removeBet: (betId: string) => void;
  resetBets: () => void;
  increaseChip: () => void;
  decreaseChip: () => void;
  spinWheel: () => void;
  updateBetAmount: (amount: number) => void;
  totalBetAmount: number;
}

const RouletteContext = createContext<RouletteContextType | undefined>(undefined);

export const RouletteProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedBet, setSelectedBet] = useState<{type: BetType, number?: number} | null>(null);
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
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
  
  // Calculate total bet amount from all placed bets
  const totalBetAmount = React.useMemo(() => {
    return placedBets.reduce((total, bet) => total + bet.amount, 0);
  }, [placedBets]);
  
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
  
  const placeBet = () => {
    if (!selectedBet) return;
    
    const newBet: PlacedBet = {
      id: uuidv4(),
      type: selectedBet.type,
      number: selectedBet.number,
      amount: betAmount,
    };
    
    setPlacedBets(prev => [...prev, newBet]);
    
    // Show toast for placed bet
    toast({
      title: "Bet Placed",
      description: `${betAmount} on ${selectedBet.type}${selectedBet.number !== undefined ? ' ' + selectedBet.number : ''}`,
    });
  };
  
  const removeBet = (betId: string) => {
    setPlacedBets(prev => prev.filter(bet => bet.id !== betId));
  };
  
  const resetBets = () => {
    setSelectedBet(null);
    setPlacedBets([]);
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
  
  const updateGameStats = (winningBets: PlacedBet[], losingBets: PlacedBet[]) => {
    setGameStats(prev => {
      const winAmount = winningBets.reduce((total, bet) => total + bet.amount * getBetOdds(bet.type), 0);
      const lossAmount = losingBets.reduce((total, bet) => total + bet.amount, 0);
      
      return {
        wins: prev.wins + (winningBets.length > 0 ? 1 : 0),
        losses: prev.losses + (losingBets.length > 0 ? 1 : 0),
        totalBets: prev.totalBets + placedBets.length,
        totalWinnings: prev.totalWinnings + winAmount,
        totalLosses: prev.totalLosses + lossAmount
      };
    });
    
    // Update balance
    setBalance(prev => {
      const winAmount = winningBets.reduce((total, bet) => total + (bet.amount * getBetOdds(bet.type)), 0);
      const lossAmount = losingBets.reduce((total, bet) => total + bet.amount, 0);
      return prev + winAmount - lossAmount;
    });
  };
  
  const spinWheel = () => {
    if (placedBets.length === 0) {
      toast({
        title: "No bets placed",
        description: "Please place at least one bet before spinning the wheel.",
        variant: "destructive",
      });
      return;
    }
    
    if (totalBetAmount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance for these bets.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSpinning(true);
    setLastSpinResult(undefined);
    
    // Play sound effect
    const audio = new Audio('/wheel-spin.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play failed:", e));
    
    // Simulate wheel spin
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 37); // 0-36 for European roulette
      setLastSpinResult(newResult);
      setPreviousResults([newResult, ...previousResults.slice(0, 4)]);
      setIsSpinning(false);
      
      // Play result sound
      const resultSound = new Audio('/ball-drop.mp3');
      resultSound.volume = 0.5;
      resultSound.play().catch(e => console.log("Audio play failed:", e));
      
      // Evaluate all placed bets
      const winningBets: PlacedBet[] = [];
      const losingBets: PlacedBet[] = [];
      
      placedBets.forEach(bet => {
        const isWin = evaluateBet(bet, newResult);
        if (isWin) {
          winningBets.push(bet);
        } else {
          losingBets.push(bet);
        }
      });
      
      // Update statistics
      updateGameStats(winningBets, losingBets);
      
      // Show result toast
      if (winningBets.length > 0) {
        const winAmount = winningBets.reduce((total, bet) => total + (bet.amount * getBetOdds(bet.type)), 0);
        toast({
          title: "You Won!",
          description: `Congratulations! You won $${winAmount}.`,
          variant: "default",
        });
      } else {
        const lossAmount = losingBets.reduce((total, bet) => total + bet.amount, 0);
        toast({
          title: "You Lost",
          description: `Better luck next time. You lost $${lossAmount}.`,
          variant: "destructive",
        });
      }
      
      // Clear placed bets after spin
      setPlacedBets([]);
    }, 3000); // 3 seconds animation
  };
  
  const value = {
    selectedBet,
    placedBets,
    previousResults,
    isSpinning,
    chipAmount,
    betAmount,
    lastSpinResult,
    balance,
    gameStats,
    aiRecommendation,
    handleSelectBet,
    placeBet,
    removeBet,
    resetBets,
    increaseChip,
    decreaseChip,
    spinWheel,
    updateBetAmount,
    totalBetAmount
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
