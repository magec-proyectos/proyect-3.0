
import React from 'react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip
} from 'recharts';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from '@/components/ui/card';

interface BettingSkillsChartProps {
  skillRadarData: {
    subject: string;
    A: number;
    fullMark: number;
  }[];
}

const BettingSkillsChart: React.FC<BettingSkillsChartProps> = ({ skillRadarData }) => {
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle>Betting Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#888' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#888' }} />
              <Radar name="Skill Level" dataKey="A" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.4} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BettingSkillsChart;
