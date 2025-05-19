
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BarChartRendererProps {
  data: Array<{ name: string; value: number; color: string }>;
  chartKey: number;
  hoveredPoint: number | null;
  setHoveredPoint: (point: number | null) => void;
  animatingDataPoint: boolean;
}

const BarChartRenderer: React.FC<BarChartRendererProps> = ({
  data,
  chartKey,
  hoveredPoint,
  setHoveredPoint,
  animatingDataPoint
}) => {
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
            data={data}
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
            <Bar dataKey="value" animationDuration={1800} animationBegin={300} isAnimationActive={true}>
              {data.map((entry, index) => (
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
};

export default BarChartRenderer;
