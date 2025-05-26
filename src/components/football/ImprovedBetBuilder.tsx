
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
      bet: 'Resultado Empate',
      odds: 6.00
    }
  ]);
  const [totalStake, setTotalStake] = useState(5);
  const [betType, setBetType] = useState<'single' | 'combinada' | 'sistema'>('simple');

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
    <Card className="bg-white border-gray-200 h-full">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-800">1 selección</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBetSlip([])}
            className="text-gray-400 hover:text-gray-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Bet Type Selection */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={betType === 'simple' ? 'default' : 'ghost'}
              onClick={() => setBetType('simple')}
              className={`text-xs py-2 ${betType === 'simple' ? 'bg-white shadow-sm' : 'bg-transparent hover:bg-gray-50'}`}
            >
              Simple (1)
            </Button>
            <Button
              variant={betType === 'combinada' ? 'default' : 'ghost'}
              onClick={() => setBetType('combinada')}
              className={`text-xs py-2 ${betType === 'combinada' ? 'bg-white shadow-sm' : 'bg-transparent hover:bg-gray-50'}`}
            >
              Combinada
            </Button>
            <Button
              variant={betType === 'sistema' ? 'default' : 'ghost'}
              onClick={() => setBetType('sistema')}
              className={`text-xs py-2 ${betType === 'sistema' ? 'bg-white shadow-sm' : 'bg-transparent hover:bg-gray-50'}`}
            >
              Sistema
            </Button>
          </div>
        </div>

        {/* Bet Slip Items */}
        <div className="p-4 border-b border-gray-200">
          <AnimatePresence>
            {betSlip.map((bet) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-50 rounded-lg p-3 border border-green-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-green-700 mb-1">{bet.match}</div>
                    <div className="text-sm font-medium text-green-800">{bet.bet}</div>
                    <div className="text-xl font-bold text-green-900 mt-1">
                      {bet.odds.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBet(bet.id)}
                    className="text-green-600 hover:text-red-500 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {betSlip.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-sm">No hay selecciones</div>
            </div>
          )}
        </div>

        {/* Stake Section */}
        {betSlip.length > 0 && (
          <div className="p-4">
            {/* Stake Amount */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Importe</span>
                <span className="text-sm text-gray-500">€</span>
              </div>
              <Input
                type="number"
                value={totalStake}
                onChange={(e) => setTotalStake(Number(e.target.value))}
                className="text-center font-bold text-lg border-gray-300"
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
                  className="text-xs py-1 border-gray-300 hover:bg-gray-50"
                >
                  {amount === 'ALL-IN' ? 'ALL-IN' : `${amount} €`}
                </Button>
              ))}
            </div>

            {/* Potential Winnings */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Cuota:</span>
                <span className="font-bold text-green-600">
                  {calculateTotalOdds().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Ganancias potenciales</span>
                <span className="text-2xl font-bold text-yellow-600">
                  {calculatePotentialReturn().toFixed(2)} €
                </span>
              </div>
            </div>

            {/* Place Bet Button */}
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 text-base rounded-lg">
              Conéctate y apuesta
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImprovedBetBuilder;
