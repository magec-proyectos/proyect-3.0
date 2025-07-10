
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Team } from '@/types/football';

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

  const radarData = [
    { subject: 'Attacking', A: 80, B: 65, fullMark: 100 },
    { subject: 'Defending', A: 75, B: 60, fullMark: 100 },
    { subject: 'Passing', A: 85, B: 70, fullMark: 100 },
    { subject: 'Possession', A: homeTeam.stats.possession, B: awayTeam.stats.possession, fullMark: 100 },
    { subject: 'Set Pieces', A: 70, B: 75, fullMark: 100 },
  ];

  return (
    <Card className="glass-effect border-dark-border overflow-hidden">
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
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center"
              >
                <div className="flex gap-1">
                  {homeTeam.form.map((result, i) => (
                    <div 
                      key={`home-${i}`}
                      className={`w-6 h-6 rounded-full ${formToColor(result)} flex items-center justify-center text-xs font-bold shadow-md`}
                    >
                      {result.toUpperCase()}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400 mt-1">Form</span>
              </motion.div>
              
              <div className="flex flex-col items-center">
                <Badge className="glass-effect text-gray-300 border-none">Last 5 matches</Badge>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center"
              >
                <div className="flex gap-1">
                  {awayTeam.form.map((result, i) => (
                    <div 
                      key={`away-${i}`}
                      className={`w-6 h-6 rounded-full ${formToColor(result)} flex items-center justify-center text-xs font-bold shadow-md`}
                    >
                      {result.toUpperCase()}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400 mt-1">Form</span>
              </motion.div>
            </div>
            
            <motion.div 
              className="h-[300px] mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
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
            </motion.div>
          </TabsContent>
          
          <TabsContent value="home" className="space-y-4 mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-effect p-4 rounded-lg">
                <div className="text-sm text-gray-400">Goals For</div>
                <div className="text-2xl font-bold text-white">{homeTeam.stats.goals.for}</div>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <div className="text-sm text-gray-400">Goals Against</div>
                <div className="text-2xl font-bold text-white">{homeTeam.stats.goals.against}</div>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <div className="text-sm text-gray-400">xG</div>
                <div className="text-2xl font-bold text-white">{homeTeam.stats.xG}</div>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <div className="text-sm text-gray-400">Possession</div>
                <div className="text-2xl font-bold text-white">{homeTeam.stats.possession}%</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm text-gray-400 mb-3">Performance Radar</h4>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#666' }} />
                    <Radar name={homeTeam.name} dataKey="A" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.5} />
                    <Legend />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="away" className="space-y-4 mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-effect p-4 rounded-lg">
                <div className="text-sm text-gray-400">Goals For</div>
                <div className="text-2xl font-bold text-white">{awayTeam.stats.goals.for}</div>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <div className="text-sm text-gray-400">Goals Against</div>
                <div className="text-2xl font-bold text-white">{awayTeam.stats.goals.against}</div>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <div className="text-sm text-gray-400">xG</div>
                <div className="text-2xl font-bold text-white">{awayTeam.stats.xG}</div>
              </div>
              <div className="glass-effect p-4 rounded-lg">
                <div className="text-sm text-gray-400">Possession</div>
                <div className="text-2xl font-bold text-white">{awayTeam.stats.possession}%</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm text-gray-400 mb-3">Performance Radar</h4>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#666' }} />
                    <Radar name={awayTeam.name} dataKey="B" stroke="#aaff00" fill="#aaff00" fillOpacity={0.5} />
                    <Legend />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
