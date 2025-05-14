
import React from 'react';
import { 
  PieChart, Pie, Cell, 
  ResponsiveContainer, Tooltip, Legend 
} from 'recharts';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartLegendContent 
} from '@/components/ui/chart';

interface SportDistributionChartProps {
  categoryData: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['#00f0ff', '#8884d8', '#aaff00', '#FF8042'];

const SportDistributionChart: React.FC<SportDistributionChartProps> = ({ categoryData }) => {
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle>Bet Distribution by Sport</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              Football: { color: '#00f0ff' },
              Basketball: { color: '#8884d8' },
              Tennis: { color: '#aaff00' },
              Hockey: { color: '#FF8042' }
            }}
          >
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SportDistributionChart;
