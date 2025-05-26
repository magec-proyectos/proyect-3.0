
import React from 'react';
import { Clock, Star, Target, TrendingUp, Calendar, Trophy } from 'lucide-react';

interface QuickAccessButtonsProps {
  onTagClick: (tag: string) => void;
}

const QuickAccessButtons: React.FC<QuickAccessButtonsProps> = ({ onTagClick }) => {
  const quickTags = [
    { 
      label: 'Live Matches', 
      icon: Clock, 
      color: 'text-red-400',
      bgHover: 'hover:bg-red-500/10'
    },
    { 
      label: 'Premier League', 
      icon: Star, 
      color: 'text-purple-400',
      bgHover: 'hover:bg-purple-500/10'
    },
    { 
      label: 'AI Picks', 
      icon: Target, 
      color: 'text-cyan-400',
      bgHover: 'hover:bg-cyan-500/10'
    },
    { 
      label: 'Top Trends', 
      icon: TrendingUp, 
      color: 'text-green-400',
      bgHover: 'hover:bg-green-500/10'
    },
    { 
      label: 'Today\'s Games', 
      icon: Calendar, 
      color: 'text-blue-400',
      bgHover: 'hover:bg-blue-500/10'
    },
    { 
      label: 'Champions League', 
      icon: Trophy, 
      color: 'text-yellow-400',
      bgHover: 'hover:bg-yellow-500/10'
    }
  ];

  return (
    <div className="mt-8 flex justify-center gap-4 flex-wrap">
      {quickTags.map((tag, index) => (
        <button
          key={tag.label}
          onClick={() => onTagClick(tag.label)}
          className={`group relative px-6 py-4 glass-effect border border-dark-border rounded-xl text-sm text-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl ${tag.bgHover} hover:border-opacity-50 overflow-hidden whitespace-nowrap flex-shrink-0 hover:scale-105`}
        >
          <div className="relative z-10 flex items-center gap-3">
            <div className={tag.color}>
              <tag.icon className="h-5 w-5" />
            </div>
            <span className="font-medium group-hover:text-white transition-colors">
              {tag.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickAccessButtons;
