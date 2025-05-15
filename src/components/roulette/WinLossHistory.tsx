
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRoulette } from '@/contexts/RouletteContext';
import { 
  ChartContainer, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell as RechartsCell } from 'recharts';
import { 
  ArrowUp, ArrowDown, ChartLine, ChartBar, History, CalendarDays
} from 'lucide-react';

const WinLossHistory: React.FC = () => {
  const { previousResults, gameStats } = useRoulette();
  
  // Generate numerical data from previous results for visualization
  const historyData = useMemo(() => {
    // Convert previous results to chart-friendly format
    return previousResults.map((number, index) => {
      const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number);
      const isBlack = ![0, 37].includes(number) && !isRed;
      const isGreen = number === 0 || number === 37;
      
      return {
        spin: previousResults.length - index,
        number,
        color: isRed ? 'red' : isBlack ? 'black' : 'green',
        isOdd: number % 2 === 1 && number !== 0,
        isEven: number % 2 === 0 && number !== 0,
        isLow: number >= 1 && number <= 18,
        isHigh: number >= 19 && number <= 36,
        isZero: number === 0,
      };
    }).reverse(); // Reverse to show oldest to newest
  }, [previousResults]);
  
  // Calculate rolling stats for a line chart
  const rollingStats = useMemo(() => {
    let redCount = 0;
    let blackCount = 0;
    let oddCount = 0;
    let evenCount = 0;
    
    return historyData.map((spin, index) => {
      if (spin.color === 'red') redCount++;
      if (spin.color === 'black') blackCount++;
      if (spin.isOdd) oddCount++;
      if (spin.isEven) evenCount++;
      
      return {
        spin: spin.spin,
        redPercentage: Math.round((redCount / (index + 1)) * 100),
        blackPercentage: Math.round((blackCount / (index + 1)) * 100),
        oddPercentage: Math.round((oddCount / (index + 1)) * 100),
        evenPercentage: Math.round((evenCount / (index + 1)) * 100),
      };
    });
  }, [historyData]);
  
  // Calculate color distribution for visualization
  const colorDistribution = useMemo(() => {
    const redCount = historyData.filter(item => item.color === 'red').length;
    const blackCount = historyData.filter(item => item.color === 'black').length;
    const greenCount = historyData.filter(item => item.color === 'green').length;
    
    return [
      { name: 'Red', value: redCount },
      { name: 'Black', value: blackCount },
      { name: 'Green', value: greenCount }
    ];
  }, [historyData]);
  
  const recentStreak = useMemo(() => {
    if (historyData.length < 2) return { type: 'none', count: 0 };
    
    let streakCount = 1;
    let streakType = '';
    
    // Check latest result
    const latest = historyData[historyData.length - 1];
    
    if (latest.color === 'red') {
      streakType = 'red';
    } else if (latest.color === 'black') {
      streakType = 'black';
    } else if (latest.isOdd) {
      streakType = 'odd';
    } else if (latest.isEven) {
      streakType = 'even';
    }
    
    // Count streak backwards
    for (let i = historyData.length - 2; i >= 0; i--) {
      const current = historyData[i];
      
      if ((streakType === 'red' && current.color === 'red') ||
          (streakType === 'black' && current.color === 'black') ||
          (streakType === 'odd' && current.isOdd) ||
          (streakType === 'even' && current.isEven)) {
        streakCount++;
      } else {
        break;
      }
    }
    
    return { type: streakType, count: streakCount };
  }, [historyData]);
  
  // Return labels based on streak type
  const getStreakLabel = () => {
    if (recentStreak.count < 2) return null;
    
    switch(recentStreak.type) {
      case 'red': return <span className="text-red-500">Red</span>;
      case 'black': return <span className="text-gray-100">Black</span>;
      case 'odd': return <span className="text-amber-300">Odd</span>;
      case 'even': return <span className="text-amber-300">Even</span>;
      default: return null;
    }
  };
  
  // Empty state when no data is available
  if (historyData.length === 0) {
    return (
      <Card className="bg-black/30 border border-amber-900/30">
        <CardHeader>
          <CardTitle className="text-amber-200">Win/Loss History</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-amber-200/70">No spin data available yet.</p>
          <p className="text-amber-200/50 text-sm mt-2">Place bets and spin the wheel to see history.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-black/30 border border-amber-900/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-amber-200">Win/Loss History</CardTitle>
          
          {recentStreak.count > 1 && (
            <Badge variant="outline" className="bg-amber-900/40 text-amber-200 border-amber-900 animate-pulse">
              {getStreakLabel()} streak: {recentStreak.count}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="numbers">
          <TabsList className="bg-black/40 border-b border-amber-900/20 w-full mb-4">
            <TabsTrigger value="numbers" className="data-[state=active]:bg-amber-900/30 data-[state=active]:text-amber-200">
              <History className="h-4 w-4 mr-2" />
              Numbers
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-amber-900/30 data-[state=active]:text-amber-200">
              <ChartLine className="h-4 w-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="distribution" className="data-[state=active]:bg-amber-900/30 data-[state=active]:text-amber-200">
              <ChartBar className="h-4 w-4 mr-2" />
              Distribution
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="numbers" className="mt-0">
            <div className="flex flex-wrap justify-center gap-2 p-2">
              {historyData.map((result, idx) => (
                <div 
                  key={idx} 
                  className={`relative w-10 h-10 ${
                    result.color === 'red' ? 'bg-red-600' : 
                    result.color === 'black' ? 'bg-black' : 
                    'bg-green-600'
                  } rounded-full flex items-center justify-center text-white border border-white/20`}
                >
                  {result.number}
                  <span className="absolute -bottom-5 text-xs text-amber-200/60">#{result.spin}</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div className="bg-black/20 rounded p-3">
                <div className="text-amber-200/80 mb-1">Color Distribution</div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="bg-red-600 w-3 h-3 rounded-full"></div>
                  <div className="text-amber-200/90">Red: {colorDistribution[0].value}</div>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="bg-black w-3 h-3 rounded-full border border-white/20"></div>
                  <div className="text-amber-200/90">Black: {colorDistribution[1].value}</div>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="bg-green-600 w-3 h-3 rounded-full"></div>
                  <div className="text-amber-200/90">Green: {colorDistribution[2].value}</div>
                </div>
              </div>
              
              <div className="bg-black/20 rounded p-3">
                <div className="text-amber-200/80 mb-1">Number Properties</div>
                <div className="text-amber-200/90">
                  Odd: {historyData.filter(data => data.isOdd).length}
                </div>
                <div className="text-amber-200/90">
                  Even: {historyData.filter(data => data.isEven).length}
                </div>
                <div className="text-amber-200/90">
                  Low (1-18): {historyData.filter(data => data.isLow).length}
                </div>
                <div className="text-amber-200/90">
                  High (19-36): {historyData.filter(data => data.isHigh).length}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-0">
            <div className="h-64 my-4">
              <ChartContainer 
                config={{
                  redPercentage: { color: '#ef4444' },
                  blackPercentage: { color: '#ffffff' },
                  oddPercentage: { color: '#fbbf24' },
                  evenPercentage: { color: '#22c55e' }
                }}
              >
                <ResponsiveContainer>
                  <LineChart
                    data={rollingStats}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="spin" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="redPercentage" name="Red %" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="blackPercentage" name="Black %" stroke="#f9fafb" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="oddPercentage" name="Odd %" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="evenPercentage" name="Even %" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, strokeWidth: 1 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="text-xs text-amber-200/70 text-center mt-2">
              The chart shows how percentages evolve over time as more spins occur
            </div>
          </TabsContent>
          
          <TabsContent value="distribution" className="mt-0">
            <div className="h-64 my-4">
              <ChartContainer
                config={{
                  Red: { color: '#ef4444' },
                  Black: { color: '#1e1e1e' },
                  Green: { color: '#16a34a' }
                }}
              >
                <ResponsiveContainer>
                  <BarChart
                    data={colorDistribution}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#8884d8" name="Count">
                      {colorDistribution.map((entry, index) => (
                        <RechartsCell 
                          key={`cell-${index}`} 
                          fill={entry.name === 'Red' ? '#ef4444' : entry.name === 'Black' ? '#1e1e1e' : '#16a34a'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-black/20 rounded p-3">
                <div className="text-amber-200/80 mb-2">Hot Numbers</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 37 })
                    .map((_, i) => ({ 
                      number: i, 
                      count: historyData.filter(data => data.number === i).length 
                    }))
                    .filter(item => item.count > 0)
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3)
                    .map(item => {
                      const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(item.number);
                      const bgColor = item.number === 0 ? 'bg-green-600' : isRed ? 'bg-red-600' : 'bg-black';
                      
                      return (
                        <div key={item.number} className="flex items-center space-x-2">
                          <div className={`${bgColor} w-6 h-6 rounded-full flex items-center justify-center text-white text-sm`}>
                            {item.number}
                          </div>
                          <span className="text-amber-200">×{item.count}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
              
              <div className="bg-black/20 rounded p-3">
                <div className="text-amber-200/80 mb-2">Cold Numbers</div>
                <div className="text-xs text-amber-200/70">
                  Numbers that haven't appeared in the last {historyData.length} spins
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {Array.from({ length: 37 })
                    .map((_,i) => i)
                    .filter(num => !historyData.some(data => data.number === num))
                    .slice(0, 6)
                    .map(num => {
                      const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
                      const bgColor = num === 0 ? 'bg-green-600/30' : isRed ? 'bg-red-600/30' : 'bg-black/50';
                      
                      return (
                        <div 
                          key={num} 
                          className={`${bgColor} w-6 h-6 rounded-full flex items-center justify-center text-white/80 text-xs border border-white/10`}
                        >
                          {num}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WinLossHistory;
