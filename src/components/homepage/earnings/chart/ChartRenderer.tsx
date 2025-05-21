
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Bar, 
  BarChart, 
  Cell,
  ReferenceLine,
  Label
} from 'recharts';

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
  
  // Calculate the average values for reference lines
  const getAverageValues = () => {
    if (!activeData.length) return { withBet3: 0, withoutBet3: 0 };
    
    const sum = activeData.reduce((acc, item) => {
      return {
        withBet3: acc.withBet3 + item.withBet3,
        withoutBet3: acc.withoutBet3 + item.withoutBet3
      };
    }, { withBet3: 0, withoutBet3: 0 });
    
    return {
      withBet3: sum.withBet3 / activeData.length,
      withoutBet3: sum.withoutBet3 / activeData.length
    };
  };
  
  const averages = getAverageValues();

  // Render bar chart for earnings
  if (activeChart === 'earnings' && animateChart) {
    return (
      <AnimatePresence mode="wait">
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
                contentStyle={{ 
                  backgroundColor: '#1e1e1e', 
                  borderColor: '#444', 
                  borderRadius: '8px', 
                  padding: '10px', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(8px)'
                }} 
                formatter={(value) => [`$${value}`, '']}
                labelFormatter={() => ''}
                animationDuration={300}
                cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
              />
              <Bar 
                dataKey="value" 
                animationDuration={1800} 
                animationBegin={300} 
                isAnimationActive={true}
                shape={(props) => {
                  const { x, y, width, height, index } = props;
                  const isHovered = hoveredPoint === index;
                  const radius = 4;
                  const color = getBarChartData()[index].color;
                  
                  return (
                    <g>
                      <defs>
                        <linearGradient id={`barGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={color} stopOpacity={isHovered ? 1 : 0.7} />
                          <stop offset="100%" stopColor={color} stopOpacity={isHovered ? 0.8 : 0.5} />
                        </linearGradient>
                      </defs>
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx={radius}
                        fill={`url(#barGradient-${index})`}
                        stroke={isHovered ? "#fff" : "none"}
                        strokeWidth={1}
                        strokeDasharray={isHovered ? "0" : "0"}
                        filter={isHovered ? "url(#glow)" : "none"}
                      />
                      {isHovered && (
                        <text
                          x={x + width + 5}
                          y={y + height / 2}
                          textAnchor="start"
                          fill="#fff"
                          fontSize={12}
                          dy=".35em"
                        >
                          ${getBarChartData()[index].value}
                        </text>
                      )}
                    </g>
                  );
                }}
              />
              
              {/* Percentage difference indicator */}
              <ReferenceLine 
                x={getBarChartData()[1].value * 0.5} 
                stroke="rgba(255, 255, 255, 0.2)"
                strokeDasharray="3 3"
                isFront={true} 
                ifOverflow="extendDomain"
              >
                <Label 
                  value={`${Math.round((getBarChartData()[1].value / getBarChartData()[0].value - 1) * 100)}% increase`} 
                  position="insideBottomLeft" 
                  fill="#00f0ff" 
                  fontSize={12}
                />
              </ReferenceLine>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    );
  }
  
  // Render area chart for all other chart types
  return (
    <AnimatePresence mode="wait">
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
              <pattern id="diagonalPattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              </pattern>
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
              cursor={{stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 2}}
              wrapperStyle={{ zIndex: 100 }}
            />

            {/* Average reference lines */}
            <ReferenceLine 
              y={averages.withBet3} 
              stroke="#00f0ff" 
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label 
                value="Bet 3.0 avg" 
                position="right" 
                fill="#00f0ff" 
                fontSize={11}
              />
            </ReferenceLine>
            
            <ReferenceLine 
              y={averages.withoutBet3} 
              stroke="#888" 
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label 
                value="Standard avg" 
                position="left" 
                fill="#888" 
                fontSize={11}
              />
            </ReferenceLine>
            
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
            
            {/* Improvement area highlighting */}
            {activeData.map((entry, index) => {
              if (index === activeData.length - 1) return null;
              const improvement = entry.withBet3 - entry.withoutBet3;
              if (improvement <= 0) return null;
              
              const nextEntry = activeData[index + 1];
              const nextImprovement = nextEntry.withBet3 - nextEntry.withoutBet3;
              
              return (
                <Area
                  key={`improvement-${index}`}
                  type="monotone"
                  dataKey={(data) => data.withBet3 - data.withoutBet3}
                  stroke="none"
                  fill="url(#diagonalPattern)"
                  data={[entry, nextEntry]}
                  isAnimationActive={false}
                  activeDot={false}
                  fillOpacity={hoveredPoint === index || hoveredPoint === index + 1 ? 0.7 : 0.3}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChartRenderer;
