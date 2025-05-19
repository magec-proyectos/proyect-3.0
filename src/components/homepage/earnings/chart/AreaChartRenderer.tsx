
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaChartRendererProps {
  data: any[];
  chartKey: number;
  hoveredPoint: number | null;
  setHoveredPoint: (point: number | null) => void;
  animatingDataPoint: boolean;
  activeChart: 'earnings' | 'winRate' | 'roi';
  animateChart: boolean;
}

const AreaChartRenderer: React.FC<AreaChartRendererProps> = ({
  data,
  chartKey,
  hoveredPoint,
  setHoveredPoint,
  animatingDataPoint,
  activeChart,
  animateChart
}) => {
  const formatValue = (value: number) => {
    return activeChart === 'earnings' ? `$${value}` : `${value}%`;
  };

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
            data={data}
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
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorWithoutBet3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#888" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#888" stopOpacity={0}/>
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#00f0ff" floodOpacity="0.5"/>
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
                return [formatValue(value), name === 'withBet3' ? 'With Bet 3.0' : 'Without Bet 3.0'];
              }}
              animationDuration={300}
              cursor={{stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 2}}
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
              filter="url(#shadow)"
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
                fill: "#888"
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

export default AreaChartRenderer;
