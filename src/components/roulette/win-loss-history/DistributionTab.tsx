
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell as RechartsCell
} from 'recharts';
import { HistoryDataItem } from './types';

type DistributionTabProps = {
  colorDistribution: Array<{name: string; value: number}>;
  historyData: HistoryDataItem[];
}

const DistributionTab: React.FC<DistributionTabProps> = ({ colorDistribution, historyData }) => {
  return (
    <>
      <div className="h-64 my-4">
        <ChartContainer
          config={{
            Red: { color: '#ef4444' },
            Black: { color: '#1e1e1e' },
            Green: { color: '#16a34a' }
          }}
        >
          <ResponsiveContainer>
            <BarChart
              data={colorDistribution}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="#8884d8" name="Count">
                {colorDistribution.map((entry, index) => (
                  <RechartsCell 
                    key={`cell-${index}`} 
                    fill={entry.name === 'Red' ? '#ef4444' : entry.name === 'Black' ? '#1e1e1e' : '#16a34a'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <HotNumbers historyData={historyData} />
        <ColdNumbers historyData={historyData} />
      </div>
    </>
  );
};

const HotNumbers: React.FC<{ historyData: HistoryDataItem[] }> = ({ historyData }) => {
  const hotNumbers = Array.from({ length: 37 })
    .map((_, i) => ({ 
      number: i, 
      count: historyData.filter(data => data.number === i).length 
    }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
    
  return (
    <div className="bg-black/20 rounded p-3">
      <div className="text-amber-200/80 mb-2">Hot Numbers</div>
      <div className="flex flex-wrap gap-2">
        {hotNumbers.map(item => {
          const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(item.number);
          const bgColor = item.number === 0 ? 'bg-green-600' : isRed ? 'bg-red-600' : 'bg-black';
          
          return (
            <div key={item.number} className="flex items-center space-x-2">
              <div className={`${bgColor} w-6 h-6 rounded-full flex items-center justify-center text-white text-sm`}>
                {item.number}
              </div>
              <span className="text-amber-200">×{item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ColdNumbers: React.FC<{ historyData: HistoryDataItem[] }> = ({ historyData }) => {
  const coldNumbers = Array.from({ length: 37 })
    .map((_,i) => i)
    .filter(num => !historyData.some(data => data.number === num))
    .slice(0, 6);
    
  return (
    <div className="bg-black/20 rounded p-3">
      <div className="text-amber-200/80 mb-2">Cold Numbers</div>
      <div className="text-xs text-amber-200/70">
        Numbers that haven't appeared in the last {historyData.length} spins
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {coldNumbers.map(num => {
          const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
          const bgColor = num === 0 ? 'bg-green-600/30' : isRed ? 'bg-red-600/30' : 'bg-black/50';
          
          return (
            <div 
              key={num} 
              className={`${bgColor} w-6 h-6 rounded-full flex items-center justify-center text-white/80 text-xs border border-white/10`}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DistributionTab;
