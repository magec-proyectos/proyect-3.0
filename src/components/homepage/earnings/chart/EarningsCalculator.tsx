
import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, DollarSign, TrendingUp, Users, Zap } from 'lucide-react';
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
  
  // Calculate potential earnings
  const currentMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, 40); // Using fixed win rate of 40%
  
  // Adjust based on percentage improvement from chart data
  const percentageImprovement = getPercentageChange();
  const enhancedMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, 40 * (1 + percentageImprovement / 100));
  const earningsIncrease = enhancedMonthlyEarnings - currentMonthlyEarnings;
  const percentageIncrease = Math.round((earningsIncrease / Math.max(1, currentMonthlyEarnings)) * 100);
  
  function calculateEarnings(bets: number, avgBet: number, winRate: number) {
    const wins = bets * (winRate / 100);
    const losses = bets - wins;
    // Assuming average odds of 2.0 for simplicity
    return Math.round((wins * avgBet * 2) - (bets * avgBet));
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
          className="w-full mb-3 flex items-center justify-between bg-dark-card border border-neon-blue/30"
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
        <div className="bg-dark-card border border-neon-blue/30 rounded-xl p-4 lg:p-5 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="text-neon-blue w-5 h-5" />
              <h3 className="text-base lg:text-lg font-bold text-white">Calculate Your Potential</h3>
            </div>
            
            {/* User type presets */}
            <UserTypePresets 
              userType={userType}
              applyPreset={applyPreset}
            />
            
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-neon-blue mr-1.5" />
                    <label className="text-gray-300">Monthly bets</label>
                  </div>
                  <span className="text-white font-medium">{monthlyBets}</span>
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
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-neon-blue mr-1.5" />
                    <label className="text-gray-300">Average bet size</label>
                  </div>
                  <span className="text-white font-medium">${averageBet}</span>
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
            className="mt-4 w-full bg-neon-blue hover:bg-neon-blue/90 text-black px-4 py-2 h-auto rounded-lg text-sm font-medium flex items-center justify-center"
          >
            <Zap className="h-4 w-4 mr-2" />
            Try Bet 3.0 Free
          </Button>
        </div>
      )}
    </>
  );
};

export default EarningsCalculator;
