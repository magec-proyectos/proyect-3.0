
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Calculator, Trash2, Plus, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTouchGestures } from '@/hooks/use-touch-gestures';

interface BetSlipItem {
  id: string;
  match: string;
  bet: string;
  odds: number;
  stake?: number;
}

interface MobileBetBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialBets?: BetSlipItem[];
}

const MobileBetBuilder: React.FC<MobileBetBuilderProps> = ({
  isOpen,
  onClose,
  initialBets = []
}) => {
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>(initialBets);
  const [totalStake, setTotalStake] = useState(10);
  const [betType, setBetType] = useState<'single' | 'combinada' | 'sistema'>('single');
  const [isExpanded, setIsExpanded] = useState(false);

  const { elementRef } = useTouchGestures<HTMLDivElement>({
    onSwipe: (swipe) => {
      if (swipe.direction === 'down' && swipe.distance > 100) {
        onClose();
      }
    }
  });

  const removeBet = (id: string) => {
    setBetSlip(prev => prev.filter(bet => bet.id !== id));
  };

  const calculateTotalOdds = () => {
    if (betSlip.length === 0) return 0;
    if (betType === 'combinada') {
      return betSlip.reduce((total, bet) => total * bet.odds, 1);
    }
    return betSlip.reduce((total, bet) => total + bet.odds, 0) / betSlip.length;
  };

  const calculatePotentialReturn = () => {
    const totalOdds = calculateTotalOdds();
    return totalStake * totalOdds;
  };

  const stakeButtons = [5, 10, 25, 50];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        ref={elementRef}
        initial={{ y: '100%' }}
        animate={{ y: isExpanded ? '10%' : '40%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="w-full bg-dark-card rounded-t-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-4">
          <div className="w-12 h-1 bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-dark-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-blue/10 rounded-lg">
              <Calculator className="h-5 w-5 text-neon-blue" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Bet Builder</h2>
              <p className="text-sm text-gray-400">
                {betSlip.length} selection{betSlip.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2"
            >
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {/* Bet Type Selection */}
          <div className="p-4 border-b border-dark-border/50">
            <div className="grid grid-cols-3 gap-1 bg-dark-darker/50 rounded-lg p-1">
              {(['single', 'combinada', 'sistema'] as const).map((type) => (
                <Button
                  key={type}
                  variant={betType === type ? 'default' : 'ghost'}
                  onClick={() => setBetType(type)}
                  className={`text-sm py-2 transition-all duration-200 ${
                    betType === type 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-transparent text-gray-300'
                  }`}
                >
                  {type === 'single' && 'Single'}
                  {type === 'combinada' && 'Combo'}
                  {type === 'sistema' && 'System'}
                </Button>
              ))}
            </div>
          </div>

          {/* Bet Slip Items */}
          <div className="p-4 space-y-3">
            <AnimatePresence>
              {betSlip.map((bet, index) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-dark-lighter/80 rounded-lg p-3 border border-dark-border/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-neon-blue mb-1 font-medium">
                        {bet.match}
                      </div>
                      <div className="text-sm font-medium text-white mb-2">
                        {bet.bet}
                      </div>
                      <Badge variant="outline" className="border-neon-blue/30 text-neon-blue bg-neon-blue/10 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {bet.odds.toFixed(2)}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBet(bet.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {betSlip.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="p-4 bg-dark-lighter/50 rounded-lg border border-dashed border-gray-600">
                  <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm font-medium mb-1">No selections</div>
                  <div className="text-xs text-gray-600">Add bets from matches</div>
                </div>
              </div>
            )}
          </div>

          {/* Stake Section */}
          {betSlip.length > 0 && (
            <div className="p-4 border-t border-dark-border/50 bg-dark-lighter/30">
              {/* Stake Amount */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300">Amount</span>
                  <span className="text-sm text-neon-blue font-medium">€</span>
                </div>
                <Input
                  type="number"
                  value={totalStake}
                  onChange={(e) => setTotalStake(Number(e.target.value))}
                  className="text-center font-bold text-lg border-dark-border bg-dark-darker/50 text-white"
                  min="1"
                  step="0.01"
                />
              </div>

              {/* Quick Stake Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {stakeButtons.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setTotalStake(amount)}
                    className="text-xs py-2 border-dark-border/50 hover:bg-dark-lighter hover:border-neon-blue/50"
                  >
                    {amount}€
                  </Button>
                ))}
              </div>

              {/* Potential Winnings */}
              <div className="bg-gradient-to-r from-dark-darker/80 to-dark-card/80 rounded-lg p-4 mb-4 border border-dark-border/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Total Odds:</span>
                  <span className="font-bold text-neon-blue">
                    {calculateTotalOdds().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">Potential Winnings</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-neon-lime">
                      {calculatePotentialReturn().toFixed(2)}€
                    </div>
                    <div className="text-xs text-green-400">
                      +{(calculatePotentialReturn() - totalStake).toFixed(2)}€ profit
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Bet Button */}
              <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-lime text-black font-bold py-4 text-base rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                Place Bet
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileBetBuilder;
