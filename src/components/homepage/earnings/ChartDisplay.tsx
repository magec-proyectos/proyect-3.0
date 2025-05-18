
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, Cell } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import ChartContentWrapper from './ChartContentWrapper';

interface ChartDisplayProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  timeRange: '1m' | '3m' | '6m' | '1y';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  chartConfig: {
    withBet3: {
      label: string;
      theme: {
        light: string;
        dark: string;
      };
    };
    withoutBet3: {
      label: string;
      theme: {
        light: string;
        dark: string;
      };
    };
  };
  getPercentageChange: () => number;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ 
  activeChart, 
  timeRange, 
  chartKey, 
  animateChart, 
  activeData,
  chartConfig,
  getPercentageChange 
}) => {
  // Enhanced pulse animation for data points
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animatingDataPoint, setAnimatingDataPoint] = useState(false);
  
  // Randomly highlight a data point every few seconds
  useEffect(() => {
    if (!animateChart) return;
    
    const interval = setInterval(() => {
      const randomPoint = Math.floor(Math.random() * activeData.length);
      setAnimatingDataPoint(true);
      setHoveredPoint(randomPoint);
      
      setTimeout(() => {
        setAnimatingDataPoint(false);
        setHoveredPoint(null);
      }, 2000);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeData.length, animateChart]);
  
  // Chart rendering based on active type
  const renderChart = () => {
    if (activeChart === 'earnings' && animateChart) {
      return (
        <AnimatePresence>
          <motion.div 
            key={`barchart-${chartKey}`}
            className="h-full w-full" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getBarChartData()}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                onMouseMove={(e) => {
                  if (!animatingDataPoint && e.activeTooltipIndex !== undefined) {
                    setHoveredPoint(e.activeTooltipIndex);
                  }
                }}
                onMouseLeave={() => {
                  if (!animatingDataPoint) {
                    setHoveredPoint(null);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#888" />
                <YAxis dataKey="name" type="category" stroke="#888" width={110} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#444', borderRadius: '8px', padding: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} 
                  formatter={(value) => [`$${value}`, '']}
                  labelFormatter={() => ''}
                  animationDuration={300}
                  cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
                />
                <Bar dataKey="value" animationDuration={1800} animationBegin={300} isAnimationActive={true}>
                  {getBarChartData().map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      fillOpacity={hoveredPoint === index ? 1 : 0.8}
                      stroke={hoveredPoint === index ? "#fff" : "none"}
                      strokeWidth={1}
                    >
                      {hoveredPoint === index && (
                        <animate attributeName="fillOpacity" from="0.8" to="1" dur="0.3s" />
                      )}
                    </Cell>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      );
    }
    
    return (
      <AnimatePresence>
        <motion.div 
          key={`areachart-${chartKey}`}
          className="h-full w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activeData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              onMouseMove={(e) => {
                if (!animatingDataPoint && e.activeTooltipIndex !== undefined) {
                  setHoveredPoint(e.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => {
                if (!animatingDataPoint) {
                  setHoveredPoint(null);
                }
              }}
            >
              <defs>
                <linearGradient id="colorWithBet3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorWithoutBet3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#888" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#888" stopOpacity={0}/>
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#00f0ff" floodOpacity="0.3"/>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e1e', 
                  borderColor: '#444', 
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(8px)',
                  padding: '10px'
                }} 
                formatter={(value: number, name: string) => {
                  const formattedValue = activeChart === 'earnings' ? `$${value}` : `${value}%`;
                  return [formattedValue, name === 'withBet3' ? 'With Bet 3.0' : 'Without Bet 3.0'];
                }}
                animationDuration={300}
                cursor={{stroke: 'rgba(255, 255, 255, 0.2)'}}
              />
              <Area 
                type="monotone" 
                dataKey="withBet3" 
                name="withBet3"
                stroke="#00f0ff" 
                fill="url(#colorWithBet3)" 
                strokeWidth={3}
                isAnimationActive={animateChart}
                animationDuration={2000}
                animationBegin={300}
                activeDot={{
                  stroke: '#fff',
                  strokeWidth: 2,
                  r: 7,
                  fill: '#00f0ff',
                  filter: 'url(#glow)'
                }}
                dot={(props) => {
                  const { cx, cy, index } = props;
                  return hoveredPoint === index || (animatingDataPoint && hoveredPoint === index) ? (
                    <motion.circle 
                      cx={cx} 
                      cy={cy} 
                      r={7}
                      fill="#00f0ff"
                      stroke="#fff"
                      strokeWidth={2}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      filter="url(#glow)"
                    />
                  ) : null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="withoutBet3" 
                name="withoutBet3"
                stroke="#888" 
                fill="url(#colorWithoutBet3)" 
                strokeWidth={2}
                isAnimationActive={animateChart}
                animationDuration={2000}
                animationBegin={600}
                activeDot={{
                  stroke: '#fff',
                  strokeWidth: 1,
                  r: 5,
                  fill: '#888'
                }}
                dot={(props) => {
                  const { cx, cy, index } = props;
                  return hoveredPoint === index ? (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={5}
                      fill="#888"
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  ) : null;
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Animated bar chart data preparation
  const getBarChartData = () => {
    if (activeChart === 'earnings') {
      const lastMonthData = activeData[activeData.length - 1];
      return [
        { name: 'Without Bet 3.0', value: lastMonthData.withoutBet3, color: '#888' },
        { name: 'With Bet 3.0', value: lastMonthData.withBet3, color: '#00f0ff' }
      ];
    }
    return [];
  };
  
  const chartTitle = activeChart === 'earnings' 
    ? 'Earnings Performance' 
    : activeChart === 'winRate' 
      ? 'Win Rate %' 
      : 'Return on Investment %';
      
  // Calculate percentage improvement
  const percentageChange = getPercentageChange();
      
  return (
    <motion.div 
      className="h-[32rem] lg:h-[36rem] w-full bg-dark-card rounded-xl p-6 border border-dark-border shadow-2xl backdrop-blur-sm relative overflow-hidden"
      whileHover={{ boxShadow: "0 0 40px rgba(0, 240, 255, 0.3)" }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced animated background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5 z-0" width="100%" height="100%">
        <pattern id="graph-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <motion.path 
            d="M 0 10 L 20 10 M 10 0 L 10 20" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#graph-pattern)" />
      </svg>
      
      <motion.h3 
        className="text-3xl font-semibold mb-6 relative z-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {chartTitle}
      </motion.h3>
      
      <div className="h-[80%] w-full relative z-10">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ChartContentWrapper>
            {renderChart()}
            <ChartLegend>
              <ChartLegendContent />
            </ChartLegend>
          </ChartContentWrapper>
        </ChartContainer>
      </div>
      
      <motion.div 
        className="absolute bottom-6 right-8 bg-dark-lighter/80 backdrop-blur-sm p-6 rounded-lg border border-neon-blue/30 shadow-xl z-20"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-3"
          animate={{ 
            boxShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 15px rgba(0, 240, 255, 0.4)", "0 0 0px rgba(0, 240, 255, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
          <div>
            <p className="text-sm font-medium text-gray-400">Performance Boost</p>
            <motion.p 
              className="text-2xl font-bold text-neon-blue"
              animate={{ 
                textShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 10px rgba(0, 240, 255, 1)", "0 0 0px rgba(0, 240, 255, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              +{percentageChange}%
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Floating data points that animate randomly */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-neon-blue/70"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: 0 
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: index * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Enhanced animated highlights */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent z-0"
        animate={{ 
          boxShadow: ["inset 0 0 0px rgba(0, 240, 255, 0)", "inset 0 0 30px rgba(0, 240, 255, 0.15)", "inset 0 0 0px rgba(0, 240, 255, 0)"],
          borderColor: ["rgba(0, 240, 255, 0)", "rgba(0, 240, 255, 0.2)", "rgba(0, 240, 255, 0)"]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ChartDisplay;
