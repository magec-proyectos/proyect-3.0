
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, AreaChart, Area
} from 'recharts';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartLegendContent 
} from '@/components/ui/chart';

interface PerformanceChartProps {
  performanceData: {
    month: string;
    winRate: number;
    profit: number;
  }[];
  chartType: 'line' | 'area' | 'bar';
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ performanceData, chartType }) => {
  // Helper function to render the appropriate chart
  const renderPerformanceChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart
          data={performanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Line 
            type="monotone" 
            dataKey="winRate" 
            name="Win Rate (%)" 
            stroke="#00f0ff" 
            strokeWidth={2} 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="profit" 
            name="Profit ($)" 
            stroke="#aaff00" 
            strokeWidth={2} 
          />
        </LineChart>
      );
    } else if (chartType === 'area') {
      return (
        <AreaChart
          data={performanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Area 
            type="monotone" 
            dataKey="winRate" 
            name="Win Rate (%)" 
            stroke="#00f0ff" 
            fill="#00f0ff20" 
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            name="Profit ($)" 
            stroke="#aaff00" 
            fill="#aaff0020"
          />
        </AreaChart>
      );
    } else {
      return (
        <BarChart
          data={performanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="winRate" name="Win Rate (%)" fill="#00f0ff" />
          <Bar dataKey="profit" name="Profit ($)" fill="#aaff00" />
        </BarChart>
      );
    }
  };

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              winRate: { color: '#00f0ff' },
              profit: { color: '#aaff00' }
            }}
          >
            {renderPerformanceChart()}
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
