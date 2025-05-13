
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Team {
  id: string;
  name: string;
  logo: string;
  form: string[];
  stats: {
    goals: {
      for: number;
      against: number;
    };
    possession: number;
    xG: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
  };
}

interface StatsPanelProps {
  homeTeam: Team;
  awayTeam: Team;
}

const StatsPanel = ({ homeTeam, awayTeam }: StatsPanelProps) => {
  const formToColor = (result: string) => {
    switch (result.toLowerCase()) {
      case 'w': return 'bg-green-500';
      case 'd': return 'bg-yellow-500';
      case 'l': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const statsData = [
    { name: 'Goals', home: homeTeam.stats.goals.for, away: awayTeam.stats.goals.for },
    { name: 'Poss.', home: homeTeam.stats.possession, away: awayTeam.stats.possession },
    { name: 'xG', home: homeTeam.stats.xG, away: awayTeam.stats.xG },
    { name: 'Shots', home: homeTeam.stats.shots, away: awayTeam.stats.shots },
    { name: 'Shots OT', home: homeTeam.stats.shotsOnTarget, away: awayTeam.stats.shotsOnTarget },
    { name: 'Corners', home: homeTeam.stats.corners, away: awayTeam.stats.corners },
  ];

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Team Statistics</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="comparison">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="home">
              <div className="flex items-center gap-2">
                <img src={homeTeam.logo} alt={homeTeam.name} className="w-5 h-5" />
                <span>{homeTeam.name}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="away">
              <div className="flex items-center gap-2">
                <img src={awayTeam.logo} alt={awayTeam.name} className="w-5 h-5" />
                <span>{awayTeam.name}</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col items-center">
                <div className="flex gap-1">
                  {homeTeam.form.map((result, i) => (
                    <div 
                      key={`home-${i}`}
                      className={`w-6 h-6 rounded-full ${formToColor(result)} flex items-center justify-center text-xs font-bold`}
                    >
                      {result.toUpperCase()}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400 mt-1">Form</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Badge className="bg-dark-lighter text-gray-300">Last 5 matches</Badge>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex gap-1">
                  {awayTeam.form.map((result, i) => (
                    <div 
                      key={`away-${i}`}
                      className={`w-6 h-6 rounded-full ${formToColor(result)} flex items-center justify-center text-xs font-bold`}
                    >
                      {result.toUpperCase()}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400 mt-1">Form</span>
              </div>
            </div>
            
            <div className="h-[300px] mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statsData}
                  layout="vertical"
                  margin={{ top: 10, right: 10, left: 40, bottom: 10 }}
                >
                  <XAxis type="number" domain={[0, 'dataMax']} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="home" fill="#00f0ff" name={homeTeam.name} />
                  <Bar dataKey="away" fill="#aaff00" name={awayTeam.name} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          {/* Home and Away tabs content would go here */}
          <TabsContent value="home" className="space-y-4 mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-lighter p-4 rounded-lg">
                <div className="text-sm text-gray-400">Goals For</div>
                <div className="text-2xl font-bold text-white">{homeTeam.stats.goals.for}</div>
              </div>
              <div className="bg-dark-lighter p-4 rounded-lg">
                <div className="text-sm text-gray-400">Goals Against</div>
                <div className="text-2xl font-bold text-white">{homeTeam.stats.goals.against}</div>
              </div>
              <div className="bg-dark-lighter p-4 rounded-lg">
                <div className="text-sm text-gray-400">xG</div>
                <div className="text-2xl font-bold text-white">{homeTeam.stats.xG}</div>
              </div>
              <div className="bg-dark-lighter p-4 rounded-lg">
                <div className="text-sm text-gray-400">Possession</div>
                <div className="text-2xl font-bold text-white">{homeTeam.stats.possession}%</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="away" className="space-y-4 mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-lighter p-4 rounded-lg">
                <div className="text-sm text-gray-400">Goals For</div>
                <div className="text-2xl font-bold text-white">{awayTeam.stats.goals.for}</div>
              </div>
              <div className="bg-dark-lighter p-4 rounded-lg">
                <div className="text-sm text-gray-400">Goals Against</div>
                <div className="text-2xl font-bold text-white">{awayTeam.stats.goals.against}</div>
              </div>
              <div className="bg-dark-lighter p-4 rounded-lg">
                <div className="text-sm text-gray-400">xG</div>
                <div className="text-2xl font-bold text-white">{awayTeam.stats.xG}</div>
              </div>
              <div className="bg-dark-lighter p-4 rounded-lg">
                <div className="text-sm text-gray-400">Possession</div>
                <div className="text-2xl font-bold text-white">{awayTeam.stats.possession}%</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
