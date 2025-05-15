
import { useState, useEffect } from 'react';
import { BetType, GameStats, RecommendationType, PlacedBet } from '@/components/roulette/types';
import { getRecommendation } from '@/components/roulette/rouletteUtils';
import { v4 as uuidv4 } from 'uuid';

export const useRouletteState = () => {
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
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showBettingSystems, setShowBettingSystem] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [activeBettingSystem, setActiveBettingSystem] = useState<string | null>(null);
  
  // Update AI recommendation when bet changes
  useEffect(() => {
    if (selectedBet) {
      setAiRecommendation(getRecommendation(selectedBet));
    } else {
      setAiRecommendation(null);
    }
  }, [selectedBet]);
  
  // Calculate total bet amount from all placed bets
  const totalBetAmount = placedBets.reduce((total, bet) => total + bet.amount, 0);
  
  // Get a number distribution analysis from previous results
  const getNumberDistribution = () => {
    if (previousResults.length === 0) return { red: 0, black: 0, green: 0, odd: 0, even: 0, high: 0, low: 0 };
    
    const red = previousResults.filter(num => [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)).length;
    const green = previousResults.filter(num => num === 0).length;
    const black = previousResults.length - red - green;
    
    const odd = previousResults.filter(num => num !== 0 && num % 2 === 1).length;
    const even = previousResults.filter(num => num !== 0 && num % 2 === 0).length;
    
    const low = previousResults.filter(num => num >= 1 && num <= 18).length;
    const high = previousResults.filter(num => num >= 19 && num <= 36).length;
    
    return {
      red,
      black,
      green,
      odd,
      even,
      high,
      low,
      total: previousResults.length
    };
  };
  
  const distribution = getNumberDistribution();
  
  return {
    selectedBet,
    setSelectedBet,
    placedBets,
    setPlacedBets,
    previousResults,
    setPreviousResults,
    isSpinning,
    setIsSpinning,
    chipAmount,
    setChipAmount,
    betAmount,
    setBetAmount,
    lastSpinResult,
    setLastSpinResult,
    balance,
    setBalance,
    aiRecommendation,
    setAiRecommendation,
    gameStats,
    setGameStats,
    totalBetAmount,
    soundEnabled,
    setSoundEnabled,
    showBettingSystem: showBettingSystems,
    setShowBettingSystem,
    animationSpeed,
    setAnimationSpeed,
    activeBettingSystem,
    setActiveBettingSystem,
    distribution
  };
};
