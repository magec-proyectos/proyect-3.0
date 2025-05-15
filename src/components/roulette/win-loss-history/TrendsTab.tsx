
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

type TrendsTabProps = {
  rollingStats: Array<{
    spin: number;
    redPercentage: number;
    blackPercentage: number;
    oddPercentage: number;
    evenPercentage: number;
  }>;
}

const TrendsTab: React.FC<TrendsTabProps> = ({ rollingStats }) => {
  return (
    <>
      <div className="h-64 my-4">
        <ChartContainer 
          config={{
            redPercentage: { color: '#ef4444' },
            blackPercentage: { color: '#ffffff' },
            oddPercentage: { color: '#fbbf24' },
            evenPercentage: { color: '#22c55e' }
          }}
        >
          <ResponsiveContainer>
            <LineChart
              data={rollingStats}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="spin" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="redPercentage" name="Red %" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="blackPercentage" name="Black %" stroke="#f9fafb" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="oddPercentage" name="Odd %" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="evenPercentage" name="Even %" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="text-xs text-amber-200/70 text-center mt-2">
        The chart shows how percentages evolve over time as more spins occur
      </div>
    </>
  );
};

export default TrendsTab;
