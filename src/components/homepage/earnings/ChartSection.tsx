
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChartDisplay from './ChartDisplay';
import { Calculator, ChevronDown, ChevronUp, DollarSign, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChartSectionProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  timeRange: '1m' | '6m' | '1y';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  chartConfig: any;
  getPercentageChange: () => number;
  // Calculator state props
  monthlyBets: number;
  setMonthlyBets: (value: number) => void;
  averageBet: number;
  setAverageBet: (value: number) => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({ 
  activeChart, 
  timeRange, 
  chartKey, 
  animateChart, 
  activeData, 
  chartConfig,
  getPercentageChange,
  // Calculator state props
  monthlyBets,
  setMonthlyBets,
  averageBet,
  setAverageBet
}) => {
  const isMobile = useIsMobile();
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
            // Pass calculator values for chart annotations
            monthlyBets={monthlyBets}
            averageBet={averageBet}
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
                <span>{showCalculator ? 'Ocultar Calculadora' : 'Mostrar Calculadora'}</span>
              </div>
              {showCalculator ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          )}
          
          {(!isMobile || showCalculator) && (
            <div className="bg-dark-card border border-neon-blue/30 rounded-xl p-4 lg:p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="text-neon-blue w-5 h-5" />
                  <h3 className="text-base lg:text-lg font-bold text-white">Calcula Tu Potencial</h3>
                </div>
                
                {/* User type presets */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <Button 
                    variant={userType === 'casual' ? "default" : "outline"}
                    size="sm"
                    className={userType === 'casual' ? "bg-neon-blue text-black" : ""}
                    onClick={() => applyPreset('casual')}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Casual
                  </Button>
                  <Button 
                    variant={userType === 'regular' ? "default" : "outline"}
                    size="sm"
                    className={userType === 'regular' ? "bg-neon-blue text-black" : ""}
                    onClick={() => applyPreset('regular')}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Regular
                  </Button>
                  <Button 
                    variant={userType === 'professional' ? "default" : "outline"}
                    size="sm"
                    className={userType === 'professional' ? "bg-neon-blue text-black" : ""}
                    onClick={() => applyPreset('professional')}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Pro
                  </Button>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-neon-blue mr-1.5" />
                        <label className="text-gray-300">Apuestas mensuales</label>
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
                        <label className="text-gray-300">Tamaño promedio de apuesta</label>
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
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="space-y-3 bg-dark-lighter p-4 rounded-lg border border-neon-blue/10 shadow-inner">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-300 flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-gray-500 mr-2"></div>
                              Ganancias actuales
                            </div>
                            <div className={`font-medium text-sm ${currentMonthlyEarnings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {currentMonthlyEarnings >= 0 ? '+' : ''}{currentMonthlyEarnings}$
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-300 flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-neon-blue mr-2"></div>
                              Con Bet 3.0
                            </div>
                            <div className="text-neon-blue text-lg font-bold">
                              +{enhancedMonthlyEarnings}$
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t border-gray-700/50 mt-1">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-white">Mejora</div>
                              <div className="text-neon-blue font-medium flex items-center">
                                <TrendingUp className="h-3.5 w-3.5 mr-1" />
                                +{percentageIncrease}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-[200px]">
                          Cálculo basado en: (apuestas × tamaño promedio × tasa de victoria × odds) - inversión total
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <Button 
                className="mt-4 w-full bg-neon-blue hover:bg-neon-blue/90 text-black px-4 py-2 h-auto rounded-lg text-sm font-medium flex items-center justify-center"
              >
                <Zap className="h-4 w-4 mr-2" />
                Prueba Bet 3.0 Gratis
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChartSection;
