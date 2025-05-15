
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRoulette } from '@/contexts/RouletteContext';
import StreakBadge from './win-loss-history/StreakBadge';
import EmptyState from './win-loss-history/EmptyState';
import WinLossHistoryContent from './win-loss-history/WinLossHistoryContent';
import { Streak } from './win-loss-history/types';

const WinLossHistory: React.FC = () => {
  const { previousResults, gameStats } = useRoulette();
  
  // Calculate recent streak for display
  const recentStreak = React.useMemo((): Streak => {
    if (previousResults.length < 2) return { type: 'none', count: 0 };
    
    let streakCount = 1;
    let streakType = '';
    
    // Check latest result
    const latest = previousResults[0];
    const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(latest);
    const isOdd = latest % 2 === 1 && latest !== 0;
    const isEven = latest % 2 === 0 && latest !== 0;
    
    if (isRed) {
      streakType = 'red';
    } else if (!isRed && latest !== 0) {
      streakType = 'black';
    } else if (isOdd) {
      streakType = 'odd';
    } else if (isEven) {
      streakType = 'even';
    }
    
    // Count streak backwards
    for (let i = 1; i < previousResults.length; i++) {
      const current = previousResults[i];
      const currentIsRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(current);
      const currentIsOdd = current % 2 === 1 && current !== 0;
      const currentIsEven = current % 2 === 0 && current !== 0;
      
      if ((streakType === 'red' && currentIsRed) ||
          (streakType === 'black' && !currentIsRed && current !== 0) ||
          (streakType === 'odd' && currentIsOdd) ||
          (streakType === 'even' && currentIsEven)) {
        streakCount++;
      } else {
        break;
      }
    }
    
    return { type: streakType, count: streakCount };
  }, [previousResults]);
  
  // Empty state when no data is available
  if (previousResults.length === 0) {
    return (
      <Card className="bg-black/30 border border-amber-900/30">
        <CardHeader>
          <CardTitle className="text-amber-200">Win/Loss History</CardTitle>
        </CardHeader>
        <EmptyState />
      </Card>
    );
  }
  
  return (
    <Card className="bg-black/30 border border-amber-900/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-amber-200">Win/Loss History</CardTitle>
          
          <StreakBadge recentStreak={recentStreak} />
        </div>
      </CardHeader>
      <CardContent>
        <WinLossHistoryContent previousResults={previousResults} />
      </CardContent>
    </Card>
  );
};

export default WinLossHistory;
