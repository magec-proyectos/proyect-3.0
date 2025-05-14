
import React from 'react';
import { 
  BarChart, Bar, LineChart, Line,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend
} from 'recharts';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartLegendContent 
} from '@/components/ui/chart';

interface OddsDistributionChartProps {
  oddsDistributionData: {
    range: string;
    count: number;
    winRate: number;
  }[];
}

const OddsDistributionChart: React.FC<OddsDistributionChartProps> = ({ oddsDistributionData }) => {
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle>Odds Distribution & Win Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              count: { color: '#8884d8' },
              winRate: { color: '#aaff00' }
            }}
          >
            <BarChart
              data={oddsDistributionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="range" stroke="#888" />
              <YAxis yAxisId="left" stroke="#888" />
              <YAxis yAxisId="right" orientation="right" stroke="#888" />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar yAxisId="left" dataKey="count" name="Number of Bets" fill="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="winRate" name="Win Rate (%)" stroke="#aaff00" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OddsDistributionChart;
