
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
  const [currentWinRate, setCurrentWinRate] = useState(40);
  const [showCalculator, setShowCalculator] = useState(!isMobile);
  
  // Update default win rate based on chart data
  useEffect(() => {
    if (activeChart === 'winRate') {
      const lastDataPoint = activeData[activeData.length - 1];
      setCurrentWinRate(Math.round(lastDataPoint.withoutBet3));
    }
  }, [activeChart, activeData]);
  
  // Calculate potential earnings
  const currentMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, currentWinRate);
  let enhancedWinRate = currentWinRate;
  
  // Adjust enhanced win rate based on actual improvement percentage from chart data
  const percentageImprovement = getPercentageChange();
  if (activeChart === 'winRate') {
    enhancedWinRate = Math.min(95, Math.round(currentWinRate * (1 + percentageImprovement / 100)));
  } else {
    enhancedWinRate = Math.min(95, Math.round(currentWinRate * (1 + percentageImprovement / 100)));
  }
  
  const enhancedMonthlyEarnings = calculateEarnings(monthlyBets, averageBet, enhancedWinRate);
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
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="text-gray-300">Your win rate</label>
                      <span className="text-white font-medium">{currentWinRate}%</span>
                    </div>
                    <Slider 
                      value={[currentWinRate]} 
                      min={20} 
                      max={60} 
                      step={1} 
                      onValueChange={(value) => setCurrentWinRate(value[0])}
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
                      <div className="text-sm text-gray-300">With Bet 3.0</div>
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

      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 justify-center">
        <div className="bg-dark-card/80 py-2 px-3 rounded-lg border border-dark-border flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
          <span className="text-white text-xs">With Bet 3.0</span>
        </div>
        
        <motion.div 
          className="text-xl sm:text-2xl font-bold text-white flex items-center"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          {getPercentageChange()}% better
        </motion.div>
        
        <div className="bg-dark-card/80 py-2 px-3 rounded-lg border border-dark-border flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-white text-xs">Without Bet 3.0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChartSection;
