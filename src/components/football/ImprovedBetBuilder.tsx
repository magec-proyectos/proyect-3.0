
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Download, Plus, X, Calculator, Share } from 'lucide-react';
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
      match: 'Real Madrid vs Barcelona',
      bet: 'Over 2.5 Goals',
      odds: 1.85
    },
    {
      id: '2', 
      match: 'Liverpool vs Man City',
      bet: 'Both Teams to Score',
      odds: 1.65
    }
  ]);
  const [totalStake, setTotalStake] = useState(10);
  const [betType, setBetType] = useState<'single' | 'accumulator'>('accumulator');

  const removeBet = (id: string) => {
    setBetSlip(prev => prev.filter(bet => bet.id !== id));
  };

  const calculateTotalOdds = () => {
    return betSlip.reduce((total, bet) => total * bet.odds, 1);
  };

  const calculatePotentialReturn = () => {
    if (betType === 'accumulator') {
      return totalStake * calculateTotalOdds();
    }
    return betSlip.reduce((total, bet) => total + (totalStake * bet.odds), 0);
  };

  const exportBetSlip = () => {
    const betData = {
      bets: betSlip,
      stake: totalStake,
      type: betType,
      totalOdds: calculateTotalOdds(),
      potentialReturn: calculatePotentialReturn(),
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(betData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `betslip-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-dark-card border-dark-border h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-white">Bet Builder</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportBetSlip}
              className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bet Type Selection */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={betType === 'single' ? 'default' : 'outline'}
            onClick={() => setBetType('single')}
            className={betType === 'single' ? 'bg-neon-blue text-black' : 'border-gray-600 text-gray-400'}
          >
            Single Bets
          </Button>
          <Button
            variant={betType === 'accumulator' ? 'default' : 'outline'}
            onClick={() => setBetType('accumulator')}
            className={betType === 'accumulator' ? 'bg-neon-blue text-black' : 'border-gray-600 text-gray-400'}
          >
            Accumulator
          </Button>
        </div>

        {/* Bet Slip Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Selections</span>
            <Badge variant="outline" className="border-neon-blue text-neon-blue">
              {betSlip.length} picks
            </Badge>
          </div>

          <AnimatePresence>
            {betSlip.map((bet) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-dark-lighter rounded-lg p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">{bet.match}</div>
                    <div className="text-sm font-medium text-white">{bet.bet}</div>
                    <div className="text-lg font-bold text-neon-blue mt-1">
                      {bet.odds.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBet(bet.id)}
                    className="text-gray-400 hover:text-red-400 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {betSlip.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Add selections to build your bet</p>
            </div>
          )}
        </div>

        {/* Stake Input */}
        {betSlip.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Stake</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
              <Input
                type="number"
                value={totalStake}
                onChange={(e) => setTotalStake(Number(e.target.value))}
                className="pl-8 bg-dark-lighter border-dark-border text-white"
                min="1"
                step="0.01"
              />
            </div>
          </div>
        )}

        {/* Calculation Summary */}
        {betSlip.length > 0 && (
          <div className="bg-dark-lighter rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Odds:</span>
              <span className="font-bold text-neon-blue">
                {calculateTotalOdds().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Stake:</span>
              <span className="text-white">${totalStake.toFixed(2)}</span>
            </div>
            <div className="border-t border-dark-border pt-3">
              <div className="flex justify-between">
                <span className="font-medium text-white">Potential Return:</span>
                <span className="text-xl font-bold text-neon-lime">
                  ${calculatePotentialReturn().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Place Bet Button */}
        {betSlip.length > 0 && (
          <Button className="w-full bg-neon-lime hover:bg-neon-lime/90 text-black font-bold py-3 text-lg">
            Place Bet - ${calculatePotentialReturn().toFixed(2)}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ImprovedBetBuilder;
