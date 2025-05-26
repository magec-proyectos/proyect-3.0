
import React, { useState } from 'react';
import { Calculator, Zap, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import TouchOptimizedSlider from './TouchOptimizedSlider';
import UserTypePresets from './UserTypePresets';
import EarningsResults from './EarningsResults';
import { TrendingUp, DollarSign } from 'lucide-react';

interface CompactCalculatorProps {
  monthlyBets: number;
  setMonthlyBets: (value: number) => void;
  averageBet: number;
  setAverageBet: (value: number) => void;
  getPercentageChange: () => number;
}

const CompactCalculator: React.FC<CompactCalculatorProps> = ({
  monthlyBets,
  setMonthlyBets,
  averageBet,
  setAverageBet,
  getPercentageChange
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [userType, setUserType] = useState<'casual' | 'regular' | 'professional'>('regular');
  
  // Calculate earnings
  const calculateEarnings = (bets: number, avgBet: number, winRate: number) => {
    const wins = bets * (winRate / 100);
    const totalStaked = bets * avgBet;
    const totalReturns = wins * avgBet * 1.9;
    return Math.round(totalReturns - totalStaked);
  };
  
  const currentMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, 45);
  const percentageImprovement = getPercentageChange();
  const enhancedWinRate = 45 * (1 + Math.max(percentageImprovement, 0) / 100);
  const enhancedMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, enhancedWinRate);
  const earningsIncrease = enhancedMonthlyEarnings - currentMonthlyEarnings;
  const percentageIncrease = currentMonthlyEarnings > 0 
    ? Math.round((earningsIncrease / currentMonthlyEarnings) * 100)
    : Math.round(percentageImprovement);
  
  const applyPreset = (type: 'casual' | 'regular' | 'professional') => {
    setUserType(type);
    
    switch(type) {
      case 'casual':
        setMonthlyBets(10);
        setAverageBet(20);
        break;
      case 'regular':
        setMonthlyBets(30);
        setAverageBet(50);
        break;
      case 'professional':
        setMonthlyBets(60);
        setAverageBet(100);
        break;
    }
  };

  return (
    <div className="bg-dark-card border border-neon-blue/30 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-neon-blue/10 to-purple-500/10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Calculator className="text-neon-blue w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Calculator</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    Adjust your parameters to see real-time chart updates
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {/* Quick stats when collapsed */}
        {!isExpanded && (
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-300">{monthlyBets} bets × ${averageBet}</span>
            <span className="text-neon-blue font-semibold">+{percentageIncrease}%</span>
          </div>
        )}
      </div>
      
      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-6">
              {/* User type presets */}
              <UserTypePresets 
                userType={userType}
                applyPreset={applyPreset}
              />
              
              {/* Sliders */}
              <div className="space-y-6">
                <TouchOptimizedSlider
                  value={monthlyBets}
                  min={5}
                  max={100}
                  step={5}
                  onChange={setMonthlyBets}
                  label="Monthly bets"
                  icon={<TrendingUp className="h-4 w-4 text-neon-blue" />}
                  formatValue={(value) => `${value}`}
                />
                
                <TouchOptimizedSlider
                  value={averageBet}
                  min={5}
                  max={500}
                  step={5}
                  onChange={setAverageBet}
                  label="Average bet size"
                  icon={<DollarSign className="h-4 w-4 text-neon-blue" />}
                  formatValue={(value) => `$${value}`}
                />
              </div>
              
              {/* Results */}
              <EarningsResults
                currentMonthlyEarnings={currentMonthlyEarnings}
                enhancedMonthlyEarnings={enhancedMonthlyEarnings}
                percentageIncrease={percentageIncrease}
              />
              
              {/* CTA Button */}
              <Button 
                className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black py-3 h-auto rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <Zap className="h-4 w-4 mr-2" />
                Start Free Trial
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompactCalculator;
