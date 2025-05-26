
import React from 'react';
import { motion } from 'framer-motion';
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
      color: 'text-neon-blue',
      hoverColor: 'hover:bg-neon-blue/10',
      activeColor: 'bg-neon-blue/20 border-neon-blue/50'
    },
    {
      id: 'players' as const,
      label: 'Players',
      icon: Users,
      color: 'text-neon-lime',
      hoverColor: 'hover:bg-neon-lime/10',
      activeColor: 'bg-neon-lime/20 border-neon-lime/50'
    },
    {
      id: 'corners' as const,
      label: 'Corners',
      icon: CornerDownLeft,
      color: 'text-purple-400',
      hoverColor: 'hover:bg-purple-400/10',
      activeColor: 'bg-purple-400/20 border-purple-400/50'
    },
    {
      id: 'fouls' as const,
      label: 'Fouls',
      icon: AlertTriangle,
      color: 'text-orange-400',
      hoverColor: 'hover:bg-orange-400/10',
      activeColor: 'bg-orange-400/20 border-orange-400/50'
    }
  ];

  return (
    <div className="glass-effect rounded-xl border border-dark-border p-2 backdrop-blur-md">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex items-center gap-3 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex-1 ${
              selectedTab === tab.id
                ? `${tab.activeColor} ${tab.color} shadow-lg`
                : `text-gray-400 ${tab.hoverColor} hover:text-white border border-transparent hover:border-dark-border/50`
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon className="h-5 w-5" />
            <span className="font-semibold">{tab.label}</span>
            
            {/* Active indicator */}
            {selectedTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent rounded-full"
                layoutId="activeTab"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FootballStatsNavigation;
