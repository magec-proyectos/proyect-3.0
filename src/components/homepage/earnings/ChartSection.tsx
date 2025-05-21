
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChartDisplay from './ChartDisplay';
import { Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const percentageChange = getPercentageChange();

  return (
    <motion.div 
      className="relative w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="flex flex-col gap-6">
        <div className="bg-gradient-to-r from-neon-blue/10 to-transparent p-4 rounded-lg border border-neon-blue/30 mb-2 flex items-center gap-3">
          <TrendingUp className="text-neon-blue w-5 h-5" />
          <div className="flex-1">
            <span className="text-white">With our AI predictions, you could increase your {activeChart === 'earnings' ? 'earnings' : activeChart === 'winRate' ? 'win rate' : 'ROI'} by</span>{' '}
            <span className="text-neon-blue font-bold">{percentageChange}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart area - 2/3 width on desktop */}
          <div className="lg:col-span-2">
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
          
          {/* Integrated calculator - 1/3 width on desktop */}
          <div className="bg-dark-card border border-neon-blue/30 rounded-xl p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="text-neon-blue w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Earnings Calculator</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
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
                
                <div className="space-y-2">
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
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-gray-300">Your win rate</label>
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
                
                <div className="space-y-3 bg-dark-lighter p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Current profit</div>
                    <div className={`font-medium ${currentMonthlyEarnings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {currentMonthlyEarnings >= 0 ? '+' : ''}{currentMonthlyEarnings.toFixed(0)}$
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">With Bet 3.0</div>
                    <div className="text-neon-blue text-xl font-bold">
                      +{enhancedMonthlyEarnings.toFixed(0)}$
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="mt-4 w-full bg-neon-blue hover:bg-neon-blue/90 text-black px-4 py-2 h-auto rounded-lg text-base font-medium"
            >
              Try Bet 3.0 Free
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
        <div className="bg-dark-card/80 p-3 rounded-lg border border-dark-border flex items-center gap-3 min-w-[180px]">
          <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
          <span className="text-white text-sm">With Bet 3.0</span>
        </div>
        
        <motion.div 
          className="text-3xl font-bold text-white flex items-center"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          {percentageChange}% better
        </motion.div>
        
        <div className="bg-dark-card/80 p-3 rounded-lg border border-dark-border flex items-center gap-3 min-w-[180px]">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-white text-sm">Without Bet 3.0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChartSection;
