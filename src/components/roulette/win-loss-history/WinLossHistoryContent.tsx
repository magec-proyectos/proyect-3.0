
import React, { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartLine, ChartBar, History } from 'lucide-react';
import { HistoryDataItem, RollingStatsItem, ColorDistributionItem, Streak } from './types';

import NumbersTab from './NumbersTab';
import TrendsTab from './TrendsTab';
import DistributionTab from './DistributionTab';
import StreakBadge from './StreakBadge';

interface WinLossHistoryContentProps {
  previousResults: number[];
}

const WinLossHistoryContent: React.FC<WinLossHistoryContentProps> = ({ previousResults }) => {
  // Generate numerical data from previous results for visualization
  const historyData = useMemo((): HistoryDataItem[] => {
    // Convert previous results to chart-friendly format
    return previousResults.map((number, index) => {
      const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number);
      const isBlack = ![0, 37].includes(number) && !isRed;
      const isGreen = number === 0 || number === 37;
      
      // Explicitly cast the color to the expected union type
      const color: 'red' | 'black' | 'green' = 
        isRed ? 'red' : isBlack ? 'black' : 'green';
      
      return {
        spin: previousResults.length - index,
        number,
        color,
        isOdd: number % 2 === 1 && number !== 0,
        isEven: number % 2 === 0 && number !== 0,
        isLow: number >= 1 && number <= 18,
        isHigh: number >= 19 && number <= 36,
        isZero: number === 0,
      };
    }).reverse(); // Reverse to show oldest to newest
  }, [previousResults]);
  
  // Calculate rolling stats for a line chart
  const rollingStats = useMemo((): RollingStatsItem[] => {
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
  const colorDistribution = useMemo((): ColorDistributionItem[] => {
    const redCount = historyData.filter(item => item.color === 'red').length;
    const blackCount = historyData.filter(item => item.color === 'black').length;
    const greenCount = historyData.filter(item => item.color === 'green').length;
    
    return [
      { name: 'Red', value: redCount },
      { name: 'Black', value: blackCount },
      { name: 'Green', value: greenCount }
    ];
  }, [historyData]);
  
  const recentStreak = useMemo((): Streak => {
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
    } else {
      streakType = 'none';
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

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-amber-200 font-medium">History Analysis</h3>
        {recentStreak.count >= 2 && (
          <StreakBadge recentStreak={recentStreak} />
        )}
      </div>
      
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
          <NumbersTab historyData={historyData} colorDistribution={colorDistribution} />
        </TabsContent>
        
        <TabsContent value="trends" className="mt-0">
          <TrendsTab rollingStats={rollingStats} />
        </TabsContent>
        
        <TabsContent value="distribution" className="mt-0">
          <DistributionTab colorDistribution={colorDistribution} historyData={historyData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WinLossHistoryContent;
