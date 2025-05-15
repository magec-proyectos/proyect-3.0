
import React, { createContext, useContext, ReactNode } from 'react';
import { BetType, GameStats, RecommendationType, PlacedBet } from '@/components/roulette/types';
import { useRouletteState } from '@/hooks/useRouletteState';
import { useRouletteActions } from '@/hooks/useRouletteActions';

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
  const state = useRouletteState();
  const actions = useRouletteActions(state);
  
  const value = {
    selectedBet: state.selectedBet,
    placedBets: state.placedBets,
    previousResults: state.previousResults,
    isSpinning: state.isSpinning,
    chipAmount: state.chipAmount,
    betAmount: state.betAmount,
    lastSpinResult: state.lastSpinResult,
    balance: state.balance,
    gameStats: state.gameStats,
    aiRecommendation: state.aiRecommendation,
    totalBetAmount: state.totalBetAmount,
    ...actions
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
