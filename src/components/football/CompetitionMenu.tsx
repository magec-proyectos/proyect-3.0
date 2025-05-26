
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Users, CornerDownRight, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const CompetitionMenu = () => {
  const [activeTab, setActiveTab] = useState('goals');

  const menuItems = [
    { 
      id: 'goals', 
      label: 'Goals', 
      icon: Target, 
      count: 156,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30'
    },
    { 
      id: 'players', 
      label: 'Players', 
      icon: Users, 
      count: 89,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30'
    },
    { 
      id: 'corners', 
      label: 'Corners', 
      icon: CornerDownRight, 
      count: 234,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/30'
    },
    { 
      id: 'cards', 
      label: 'Cards', 
      icon: CreditCard, 
      count: 67,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30'
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">Competition</span>
          <Badge variant="outline" className="border-neon-blue/30 text-neon-blue bg-neon-blue/10">
            Live Markets
          </Badge>
        </div>
        <div className="text-sm text-gray-400">
          {menuItems.find(item => item.id === activeTab)?.count} available
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-dark-darker/50 backdrop-blur-sm rounded-lg p-2 border border-dark-border/50">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveTab(item.id)}
              className={`relative h-16 flex flex-col items-center justify-center gap-1 transition-all duration-300 rounded-lg ${
                isActive 
                  ? `${item.bgColor} ${item.borderColor} border text-white shadow-lg` 
                  : 'hover:bg-dark-card/50 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-lime/10 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon 
                  className={`h-5 w-5 transition-colors duration-300 ${
                    isActive ? item.color : 'text-gray-400'
                  }`} 
                />
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-xs px-1.5 py-0 transition-all duration-300 ${
                    isActive 
                      ? `${item.borderColor} ${item.color} bg-transparent` 
                      : 'border-gray-600 text-gray-500 bg-transparent'
                  }`}
                >
                  {item.count}
                </Badge>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Content based on active tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-4 p-4 bg-dark-card/30 backdrop-blur-sm rounded-lg border border-dark-border/30"
      >
        <div className="text-center text-gray-400">
          <div className="text-sm font-medium mb-1">
            {menuItems.find(item => item.id === activeTab)?.label} Markets
          </div>
          <div className="text-xs text-gray-500">
            {menuItems.find(item => item.id === activeTab)?.count} betting options available
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompetitionMenu;
