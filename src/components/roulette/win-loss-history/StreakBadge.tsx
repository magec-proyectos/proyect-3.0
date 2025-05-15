
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Streak } from './types';

type StreakBadgeProps = {
  recentStreak: Streak;
};

const StreakBadge: React.FC<StreakBadgeProps> = ({ recentStreak }) => {
  if (recentStreak.count < 2) return null;
  
  const getStreakLabel = () => {
    switch(recentStreak.type) {
      case 'red': return <span className="text-red-500">Red</span>;
      case 'black': return <span className="text-gray-100">Black</span>;
      case 'odd': return <span className="text-amber-300">Odd</span>;
      case 'even': return <span className="text-amber-300">Even</span>;
      default: return null;
    }
  };
  
  return (
    <Badge variant="outline" className="bg-amber-900/40 text-amber-200 border-amber-900 animate-pulse">
      {getStreakLabel()} streak: {recentStreak.count}
    </Badge>
  );
};

export default StreakBadge;
