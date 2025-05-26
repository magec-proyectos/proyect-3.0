
import React, { useState, useEffect } from 'react';
import { Calculator, ChevronDown, ChevronUp, DollarSign, TrendingUp, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import UserTypePresets from './UserTypePresets';
import EarningsResults from './EarningsResults';

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
    <>
      {isMobile && (
        <Button 
          variant="outline" 
          className="w-full mb-3 flex items-center justify-between bg-dark-card border border-neon-blue/30 hover:border-neon-blue/50 transition-colors"
          onClick={() => setShowCalculator(!showCalculator)}
        >
          <div className="flex items-center">
            <Calculator className="text-neon-blue w-4 h-4 mr-2" />
            <span>{showCalculator ? 'Hide Calculator' : 'Show Calculator'}</span>
          </div>
          {showCalculator ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      )}
      
      {(!isMobile || showCalculator) && (
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
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-neon-blue mr-1.5" />
                    <label className="text-gray-300">Monthly bets</label>
                  </div>
                  <span className="text-white font-medium bg-dark-lighter px-2 py-1 rounded text-xs">
                    {monthlyBets}
                  </span>
                </div>
                <Slider 
                  value={[monthlyBets]} 
                  min={5} 
                  max={100} 
                  step={5} 
                  onValueChange={(value) => setMonthlyBets(value[0])}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-neon-blue mr-1.5" />
                    <label className="text-gray-300">Average bet size</label>
                  </div>
                  <span className="text-white font-medium bg-dark-lighter px-2 py-1 rounded text-xs">
                    ${averageBet}
                  </span>
                </div>
                <Slider 
                  value={[averageBet]} 
                  min={5} 
                  max={500} 
                  step={5} 
                  onValueChange={(value) => setAverageBet(value[0])}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$5</span>
                  <span>$250</span>
                  <span>$500</span>
                </div>
              </div>
              
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
      )}
    </>
  );
};

export default EarningsCalculator;
