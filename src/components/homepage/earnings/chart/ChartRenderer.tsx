
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, Cell } from 'recharts';

interface ChartRendererProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  hoveredPoint: number | null;
  setHoveredPoint: (point: number | null) => void;
  animatingDataPoint: boolean;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ 
  activeChart, 
  chartKey, 
  animateChart, 
  activeData,
  hoveredPoint,
  setHoveredPoint,
  animatingDataPoint
}) => {
  // Prepare bar chart data if needed
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

  // Render bar chart for earnings
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
  
  // Render area chart for all other chart types
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

export default ChartRenderer;
