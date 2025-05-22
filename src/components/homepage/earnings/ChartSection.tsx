
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChartDisplay from './ChartDisplay';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChartSectionProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  timeRange: '1m' | '6m' | '1y';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  chartConfig: any;
  getPercentageChange: () => number;
}

const ChartSection: React.FC<ChartSectionProps> = ({ 
  activeChart, 
  timeRange, 
  chartKey, 
  animateChart, 
  activeData, 
  chartConfig,
  getPercentageChange 
}) => {
  const isMobile = useIsMobile();
  const [monthlyBets, setMonthlyBets] = useState(20);
  const [averageBet, setAverageBet] = useState(50);
  const [showCalculator, setShowCalculator] = useState(!isMobile);
  
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mb-4">
        {/* Chart area - 3/5 width on desktop */}
        <div className="lg:col-span-3">
          <ChartDisplay 
            activeChart={activeChart}
            timeRange={timeRange}
            chartKey={chartKey}
            animateChart={animateChart}
            activeData={activeData}
            chartConfig={chartConfig}
            getPercentageChange={getPercentageChange}
          />
        </div>
        
        {/* Integrated calculator - 2/5 width on desktop */}
        <div className="lg:col-span-2 h-full">
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
                  <Calculator className="text-neon-blue w-4 h-4" />
                  <h3 className="text-base lg:text-lg font-bold text-white">Your Potential</h3>
                </div>
                
                <div className="space-y-4 lg:space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="text-gray-300">Monthly bets</label>
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
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="text-gray-300">Average bet size</label>
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
                  </div>
                  
                  <div className="space-y-3 bg-dark-lighter p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-300">Current monthly</div>
                      <div className={`font-medium text-sm ${currentMonthlyEarnings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {currentMonthlyEarnings >= 0 ? '+' : ''}{currentMonthlyEarnings}$
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-300">Enhanced monthly</div>
                      <div className="text-neon-blue text-lg font-bold">
                        +{enhancedMonthlyEarnings}$
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-700/50 mt-1">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-white">Improvement</div>
                        <div className="text-neon-blue font-medium">+{percentageIncrease}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-4 w-full bg-neon-blue hover:bg-neon-blue/90 text-black px-4 py-2 h-auto rounded-lg text-sm font-medium"
              >
                Try Bet 3.0 Free
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChartSection;
