
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Insights = () => {
  // Sample data for charts
  const performanceData = [
    { month: 'Jan', winRate: 68, profit: 120 },
    { month: 'Feb', winRate: 72, profit: 145 },
    { month: 'Mar', winRate: 65, profit: 90 },
    { month: 'Apr', winRate: 70, profit: 110 },
    { month: 'May', winRate: 75, profit: 160 },
    { month: 'Jun', winRate: 73, profit: 140 },
  ];

  const categoryData = [
    { name: 'Football', value: 45 },
    { name: 'Basketball', value: 25 },
    { name: 'Tennis', value: 18 },
    { name: 'Hockey', value: 12 },
  ];

  const leagueData = [
    { name: 'Premier League', bets: 45, winRate: 72 },
    { name: 'La Liga', bets: 32, winRate: 65 },
    { name: 'Bundesliga', bets: 27, winRate: 70 },
    { name: 'Serie A', bets: 23, winRate: 68 },
    { name: 'Ligue 1', bets: 19, winRate: 62 },
  ];

  const COLORS = ['#00f0ff', '#8884d8', '#aaff00', '#FF8042'];

  return (
    <div className="min-h-screen bg-dark text-white pb-16">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Betting Insights</h1>
          <p className="text-gray-400 mb-8">Track your betting performance and get data-driven insights to improve your strategy.</p>
          
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs defaultValue="performance" className="w-full md:w-auto">
              <TabsList className="bg-dark-lighter border-dark-border">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-4">
              <Select defaultValue="last-6-months">
                <SelectTrigger className="w-[180px] bg-dark-lighter border-dark-border">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent className="bg-dark-lighter border-dark-border">
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="year-to-date">Year to Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-dark-card border-dark-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-neon-blue">71%</span>
                  <span className="text-sm text-green-500">+3.2% vs last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-card border-dark-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-neon-lime">$765</span>
                  <span className="text-sm text-green-500">+12.5% vs last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-card border-dark-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Bets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-white">146</span>
                  <span className="text-sm text-gray-400">Last 6 months</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} 
                      />
                      <Legend />
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
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle>Bet Distribution by Sport</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
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
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle>League Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={leagueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    />
                    <Legend />
                    <Bar dataKey="bets" name="Number of Bets" fill="#00f0ff" />
                    <Bar dataKey="winRate" name="Win Rate (%)" fill="#aaff00" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Insights;
