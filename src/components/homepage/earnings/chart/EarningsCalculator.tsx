
import React, { useState, useEffect } from 'react';
import { Calculator, ChevronDown, ChevronUp, DollarSign, TrendingUp, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import UserTypePresets from './UserTypePresets';
import EarningsResults from './EarningsResults';
import TouchOptimizedSlider from './TouchOptimizedSlider';
import CompactCalculator from './CompactCalculator';

interface EarningsCalculatorProps {
  monthlyBets: number;
  setMonthlyBets: (value: number) => void;
  averageBet: number;
  setAverageBet: (value: number) => void;
  getPercentageChange: () => number;
  isMobile: boolean;
}

const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({
  monthlyBets,
  setMonthlyBets,
  averageBet,
  setAverageBet,
  getPercentageChange,
  isMobile
}) => {
  const [showCalculator, setShowCalculator] = useState(!isMobile);
  const [userType, setUserType] = useState<'casual' | 'regular' | 'professional'>('regular');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Use compact calculator for mobile
  if (isMobile) {
    return (
      <CompactCalculator
        monthlyBets={monthlyBets}
        setMonthlyBets={setMonthlyBets}
        averageBet={averageBet}
        setAverageBet={setAverageBet}
        getPercentageChange={getPercentageChange}
      />
    );
  }
  
  // Animate updates when values change
  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [monthlyBets, averageBet]);
  
  // Calculate potential earnings with improved algorithm
  const currentMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, 45); // Baseline win rate
  
  // Get percentage improvement from chart data
  const percentageImprovement = getPercentageChange();
  const enhancedWinRate = 45 * (1 + Math.max(percentageImprovement, 0) / 100);
  const enhancedMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, enhancedWinRate);
  const earningsIncrease = enhancedMonthlyEarnings - currentMonthlyEarnings;
  const percentageIncrease = currentMonthlyEarnings > 0 
    ? Math.round((earningsIncrease / currentMonthlyEarnings) * 100)
    : Math.round(percentageImprovement);
  
  function calculateEarnings(bets: number, avgBet: number, winRate: number) {
    const wins = bets * (winRate / 100);
    const totalStaked = bets * avgBet;
    // More realistic odds calculation (average of 1.9 for better estimation)
    const totalReturns = wins * avgBet * 1.9;
    return Math.round(totalReturns - totalStaked);
  }
  
  // Presets for different types of users
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
    <div className={`bg-dark-card border border-neon-blue/30 rounded-xl p-4 lg:p-5 h-full flex flex-col justify-between transition-all duration-300 ${isUpdating ? 'ring-2 ring-neon-blue/30' : ''}`}>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="text-neon-blue w-5 h-5" />
          <h3 className="text-base lg:text-lg font-bold text-white">Interactive Calculator</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  Adjust your betting parameters to see how they affect the chart in real-time
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* User type presets */}
        <UserTypePresets 
          userType={userType}
          applyPreset={applyPreset}
        />
        
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
          
          <EarningsResults
            currentMonthlyEarnings={currentMonthlyEarnings}
            enhancedMonthlyEarnings={enhancedMonthlyEarnings}
            percentageIncrease={percentageIncrease}
          />
        </div>
      </div>
      
      <Button 
        className="mt-4 w-full bg-neon-blue hover:bg-neon-blue/90 text-black px-4 py-2 h-auto rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        <Zap className="h-4 w-4 mr-2" />
        Start Free Trial
      </Button>
    </div>
  );
};

export default EarningsCalculator;
