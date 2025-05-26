
import React from 'react';
import { Target, Users, CornerDownLeft, AlertTriangle } from 'lucide-react';

interface FootballStatsNavigationProps {
  selectedTab: 'goalscorers' | 'players' | 'corners' | 'fouls';
  onTabChange: (tab: 'goalscorers' | 'players' | 'corners' | 'fouls') => void;
}

const FootballStatsNavigation: React.FC<FootballStatsNavigationProps> = ({
  selectedTab,
  onTabChange
}) => {
  const tabs = [
    {
      id: 'goalscorers' as const,
      label: 'Goalscorers',
      icon: Target,
      color: 'text-blue-400'
    },
    {
      id: 'players' as const,
      label: 'Players',
      icon: Users,
      color: 'text-green-400'
    },
    {
      id: 'corners' as const,
      label: 'Corners',
      icon: CornerDownLeft,
      color: 'text-purple-400'
    },
    {
      id: 'fouls' as const,
      label: 'Fouls',
      icon: AlertTriangle,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="glass-effect rounded-lg border border-dark-border p-1">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex-1 justify-center ${
              selectedTab === tab.id
                ? `bg-white/10 ${tab.color}`
                : `text-gray-400 hover:text-white hover:bg-white/5`
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FootballStatsNavigation;
