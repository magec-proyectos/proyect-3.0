
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
  };
};
