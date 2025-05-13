
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Brain, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Prediction {
  homeScore: number;
  awayScore: number;
  winProbability: {
    home: number;
    draw: number;
    away: number;
  };
  btts: {
    yes: number;
    no: number;
  };
  over: {
    value: number;
    probability: number;
  };
  confidence: number;
  bets: Array<{
    type: string;
    pick: string;
    odds: number;
    confidence: number;
  }>;
}

interface PredictionBoxProps {
  prediction: Prediction;
  homeTeam: string;
  awayTeam: string;
}

const PredictionBox = ({ prediction, homeTeam, awayTeam }: PredictionBoxProps) => {
  const winProbabilityData = [
    { name: 'Home Win', value: prediction.winProbability.home },
    { name: 'Draw', value: prediction.winProbability.draw },
    { name: 'Away Win', value: prediction.winProbability.away }
  ];

  const confidenceColors = {
    high: 'text-green-500',
    medium: 'text-yellow-500',
    low: 'text-red-500'
  };

  const getConfidenceColor = (value: number) => {
    if (value >= 70) return confidenceColors.high;
    if (value >= 40) return confidenceColors.medium;
    return confidenceColors.low;
  };

  const COLORS = ['#00f0ff', '#8884d8', '#aaff00'];

  return (
    <Card className="bg-dark-card border-dark-border overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -z-10"></div>
      
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="text-neon-blue" size={20} />
          <CardTitle className="text-lg font-medium">AI Prediction</CardTitle>
        </div>
        <Badge 
          variant="outline" 
          className={`${getConfidenceColor(prediction.confidence)} border-current`}
        >
          {prediction.confidence}% Confidence
        </Badge>
      </CardHeader>
      
      <CardContent className="pb-0">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-xl font-bold">{homeTeam}</div>
          </div>
          
          <div className="text-center px-6 py-3 bg-dark-lighter rounded-lg">
            <div className="text-3xl font-bold">
              <span className="text-neon-blue">{prediction.homeScore}</span>
              <span className="text-gray-500 mx-2">-</span>
              <span className="text-neon-lime">{prediction.awayScore}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Predicted Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold">{awayTeam}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[180px]">
            <div className="text-sm text-gray-400 mb-1">Win Probability</div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={winProbabilityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {winProbabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>BTTS (Both Teams to Score)</span>
                <span className={getConfidenceColor(prediction.btts.yes)}>
                  {prediction.btts.yes}%
                </span>
              </div>
              <Progress value={prediction.btts.yes} className="h-2 bg-dark-lighter" indicatorClassName="bg-neon-blue" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Over {prediction.over.value} Goals</span>
                <span className={getConfidenceColor(prediction.over.probability)}>
                  {prediction.over.probability}%
                </span>
              </div>
              <Progress value={prediction.over.probability} className="h-2 bg-dark-lighter" indicatorClassName="bg-neon-lime" />
            </div>
            
            <div className="bg-dark-lighter p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Top Pick</div>
              <div className="font-semibold">{prediction.bets[0].type}: <span className="text-neon-blue">{prediction.bets[0].pick}</span></div>
              <div className="text-xs text-gray-400 mt-1">Odds: {prediction.bets[0].odds} | Confidence: {prediction.bets[0].confidence}%</div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-6">
        <div className="flex justify-between items-center w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-gray-400 hover:text-white">
                <Info size={14} />
                <span>How it works</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-dark-lighter border-dark-border">
              <div className="text-sm">
                <p className="font-medium text-white mb-2">AI Prediction Model</p>
                <p className="text-gray-400 mb-2">Our AI analyzes thousands of data points including:</p>
                <ul className="text-gray-400 space-y-1 list-disc pl-4 mb-2">
                  <li>Historical match results</li>
                  <li>Current form and player statistics</li>
                  <li>Team composition and injuries</li>
                  <li>Head-to-head performance</li>
                </ul>
                <p className="text-gray-400">Results are continuously validated against actual outcomes to improve accuracy.</p>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button className="gap-1 bg-neon-blue hover:bg-neon-blue/90 text-black">
            <span>Bet Builder</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PredictionBox;
