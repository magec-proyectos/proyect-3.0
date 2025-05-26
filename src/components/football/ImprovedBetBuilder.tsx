
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Calculator, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BetSlipItem {
  id: string;
  match: string;
  bet: string;
  odds: number;
  stake?: number;
}

const ImprovedBetBuilder = () => {
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([
    {
      id: '1',
      match: 'Al Fateh - Al Nassr Riyadh',
      bet: 'Draw Result',
      odds: 6.00
    }
  ]);
  const [totalStake, setTotalStake] = useState(5);
  const [betType, setBetType] = useState<'single' | 'combinada' | 'sistema'>('single');

  const removeBet = (id: string) => {
    setBetSlip(prev => prev.filter(bet => bet.id !== id));
  };

  const calculateTotalOdds = () => {
    return betSlip.reduce((total, bet) => total * bet.odds, 1);
  };

  const calculatePotentialReturn = () => {
    if (betType === 'combinada') {
      return totalStake * calculateTotalOdds();
    }
    return betSlip.reduce((total, bet) => total + (totalStake * bet.odds), 0);
  };

  const stakeButtons = [2, 5, 10, 20, 'ALL-IN'];

  return (
    <Card className="glass-effect border-dark-border h-full">
      <CardHeader className="border-b border-dark-border">
        <div className="flex items-center justify-between">
          <span className="font-semibold gradient-text">Bet Builder</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBetSlip([])}
            className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Bet Type Selection */}
        <div className="p-4 border-b border-dark-border">
          <div className="grid grid-cols-3 gap-1 bg-dark-lighter rounded-lg p-1">
            <Button
              variant={betType === 'single' ? 'default' : 'ghost'}
              onClick={() => setBetType('single')}
              className={`text-xs py-2 ${betType === 'single' ? 'bg-neon-blue text-black font-bold' : 'bg-transparent hover:bg-dark-card text-gray-300 hover:text-white'}`}
            >
              Single (1)
            </Button>
            <Button
              variant={betType === 'combinada' ? 'default' : 'ghost'}
              onClick={() => setBetType('combinada')}
              className={`text-xs py-2 ${betType === 'combinada' ? 'bg-neon-blue text-black font-bold' : 'bg-transparent hover:bg-dark-card text-gray-300 hover:text-white'}`}
            >
              Combo
            </Button>
            <Button
              variant={betType === 'sistema' ? 'default' : 'ghost'}
              onClick={() => setBetType('sistema')}
              className={`text-xs py-2 ${betType === 'sistema' ? 'bg-neon-blue text-black font-bold' : 'bg-transparent hover:bg-dark-card text-gray-300 hover:text-white'}`}
            >
              System
            </Button>
          </div>
        </div>

        {/* Bet Slip Items */}
        <div className="p-4 border-b border-dark-border">
          <AnimatePresence>
            {betSlip.map((bet) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-neon-lime/10 rounded-lg p-3 border border-neon-lime/30 hover:border-neon-lime/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-neon-lime mb-1">{bet.match}</div>
                    <div className="text-sm font-medium text-white">{bet.bet}</div>
                    <div className="text-xl font-bold text-neon-lime mt-1">
                      {bet.odds.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBet(bet.id)}
                    className="text-neon-lime hover:text-red-400 hover:bg-red-500/10 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {betSlip.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-sm">No selections</div>
            </div>
          )}
        </div>

        {/* Stake Section */}
        {betSlip.length > 0 && (
          <div className="p-4">
            {/* Stake Amount */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Amount</span>
                <span className="text-sm text-neon-blue">€</span>
              </div>
              <Input
                type="number"
                value={totalStake}
                onChange={(e) => setTotalStake(Number(e.target.value))}
                className="text-center font-bold text-lg border-dark-border bg-dark-lighter text-white focus:border-neon-blue"
                min="1"
                step="0.01"
              />
            </div>

            {/* Quick Stake Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {stakeButtons.map((amount, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => typeof amount === 'number' && setTotalStake(amount)}
                  className="text-xs py-1 border-dark-border hover:bg-dark-lighter hover:border-neon-blue text-gray-300 hover:text-white"
                >
                  {amount === 'ALL-IN' ? 'ALL-IN' : `${amount} €`}
                </Button>
              ))}
            </div>

            {/* Potential Winnings */}
            <div className="bg-dark-lighter rounded-lg p-3 mb-4 border border-dark-border">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Odds:</span>
                <span className="font-bold text-neon-lime">
                  {calculateTotalOdds().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 font-medium">Potential winnings</span>
                <span className="text-2xl font-bold gradient-text">
                  {calculatePotentialReturn().toFixed(2)} €
                </span>
              </div>
            </div>

            {/* Place Bet Button */}
            <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-lime hover:from-neon-blue/80 hover:to-neon-lime/80 text-black font-bold py-3 text-base rounded-lg shadow-lg hover:shadow-neon-blue/25 transition-all">
              Login and bet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImprovedBetBuilder;
