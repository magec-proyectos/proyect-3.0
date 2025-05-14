
import React from 'react';
import { 
  BarChart, Bar, 
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

interface LeaguePerformanceChartProps {
  leagueData: {
    name: string;
    bets: number;
    winRate: number;
  }[];
}

const LeaguePerformanceChart: React.FC<LeaguePerformanceChartProps> = ({ leagueData }) => {
  return (
    <Card className="bg-dark-card border-dark-border lg:col-span-2">
      <CardHeader>
        <CardTitle>League Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              bets: { color: '#00f0ff' },
              winRate: { color: '#aaff00' }
            }}
          >
            <BarChart
              data={leagueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="bets" name="Number of Bets" fill="#00f0ff" />
              <Bar dataKey="winRate" name="Win Rate (%)" fill="#aaff00" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaguePerformanceChart;
