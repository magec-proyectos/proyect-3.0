
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

interface BetTypeAnalysisChartProps {
  betTypeData: {
    name: string;
    value: number;
    accuracy: number;
  }[];
}

const BetTypeAnalysisChart: React.FC<BetTypeAnalysisChartProps> = ({ betTypeData }) => {
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle>Bet Type Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              value: { color: '#00f0ff' },
              accuracy: { color: '#aaff00' }
            }}
          >
            <BarChart
              data={betTypeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" />
              <YAxis dataKey="name" type="category" stroke="#888" />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="value" name="% of Bets" fill="#00f0ff" />
              <Bar dataKey="accuracy" name="Accuracy (%)" fill="#aaff00" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetTypeAnalysisChart;
