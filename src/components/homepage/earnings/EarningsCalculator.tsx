
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface EarningsCalculatorProps {
  onClose: () => void;
}

const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({ onClose }) => {
  const [monthlyBets, setMonthlyBets] = useState(20);
  const [averageBet, setAverageBet] = useState(50);
  const [currentWinRate, setCurrentWinRate] = useState(40);
  
  // Calculate potential earnings
  const currentMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, currentWinRate);
  const enhancedWinRate = currentWinRate + 25; // Bet 3.0 improvement
  const enhancedMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, enhancedWinRate);
  const earningsIncrease = enhancedMonthlyEarnings - currentMonthlyEarnings;
  const percentageIncrease = Math.round((earningsIncrease / currentMonthlyEarnings) * 100);
  
  function calculateEarnings(bets: number, avgBet: number, winRate: number) {
    const wins = bets * (winRate / 100);
    const losses = bets - wins;
    // Assuming average odds of 2.0 for simplicity
    return (wins * avgBet * 2) - (bets * avgBet);
  }

  return (
    <motion.div 
      className="bg-dark-card border border-neon-blue/30 rounded-xl p-6 max-w-4xl mx-auto relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute right-4 top-4 text-gray-400 hover:text-white"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </Button>
      
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-neon-blue w-5 h-5" />
        <h3 className="text-2xl font-bold text-white">Earnings Calculator</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-gray-300">Monthly bets</label>
              <span className="text-white font-medium">{monthlyBets} bets</span>
            </div>
            <Slider 
              value={[monthlyBets]} 
              min={5} 
              max={100} 
              step={5} 
              onValueChange={(value) => setMonthlyBets(value[0])}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-gray-300">Average bet size</label>
              <span className="text-white font-medium">${averageBet}</span>
            </div>
            <Slider 
              value={[averageBet]} 
              min={5} 
              max={500} 
              step={5} 
              onValueChange={(value) => setAverageBet(value[0])}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-gray-300">Your current win rate</label>
              <span className="text-white font-medium">{currentWinRate}%</span>
            </div>
            <Slider 
              value={[currentWinRate]} 
              min={20} 
              max={60} 
              step={1} 
              onValueChange={(value) => setCurrentWinRate(value[0])}
            />
          </div>
        </div>
        
        <div className="bg-dark-lighter rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-gray-300 mb-4">Your potential earnings</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-gray-400">Current monthly profit</div>
                <div className={`text-lg font-medium ${currentMonthlyEarnings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {currentMonthlyEarnings >= 0 ? '+' : ''}{currentMonthlyEarnings.toFixed(0)}$
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-gray-400">With Bet 3.0 (estimated)</div>
                <div className="text-neon-blue text-xl font-bold">
                  +{enhancedMonthlyEarnings.toFixed(0)}$
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="text-white">Improvement</div>
                  <div className="text-neon-blue font-bold">+{percentageIncrease}%</div>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            className="mt-6 w-full bg-neon-blue hover:bg-neon-blue/90 text-black px-4 py-6 h-auto rounded-lg text-base font-medium group"
          >
            Try Bet 3.0 Free For 7 Days
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-400 text-center">
        * Calculations are based on average historical performance and may vary based on individual betting patterns.
      </div>
    </motion.div>
  );
};

export default EarningsCalculator;
