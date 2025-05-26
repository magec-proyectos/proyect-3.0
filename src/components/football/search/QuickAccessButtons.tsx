
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Star, Zap, Target, Trophy } from 'lucide-react';

interface QuickAccessButtonsProps {
  onTagClick: (tag: string) => void;
}

const QuickAccessButtons: React.FC<QuickAccessButtonsProps> = ({ onTagClick }) => {
  const quickTags = [
    { 
      label: 'Live Matches', 
      icon: Clock, 
      gradient: 'from-red-500 to-red-600',
      pulse: true,
      color: 'text-red-400',
      bgHover: 'hover:bg-red-500/10'
    },
    { 
      label: 'Champions League', 
      icon: Trophy, 
      gradient: 'from-blue-500 to-purple-600',
      color: 'text-blue-400',
      bgHover: 'hover:bg-blue-500/10'
    },
    { 
      label: 'Premier League', 
      icon: Star, 
      gradient: 'from-purple-500 to-pink-600',
      color: 'text-purple-400',
      bgHover: 'hover:bg-purple-500/10'
    },
    { 
      label: 'High Odds', 
      icon: TrendingUp, 
      gradient: 'from-green-500 to-emerald-600',
      color: 'text-green-400',
      bgHover: 'hover:bg-green-500/10'
    },
    { 
      label: 'Sure Bets', 
      icon: Target, 
      gradient: 'from-yellow-500 to-orange-600',
      color: 'text-yellow-400',
      bgHover: 'hover:bg-yellow-500/10'
    },
    { 
      label: 'AI Picks', 
      icon: Zap, 
      gradient: 'from-cyan-500 to-blue-600',
      color: 'text-cyan-400',
      bgHover: 'hover:bg-cyan-500/10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 flex justify-center gap-3 overflow-x-auto pb-2"
    >
      {quickTags.map((tag, index) => (
        <motion.button
          key={tag.label}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTagClick(tag.label)}
          className={`group relative px-4 py-3 glass-effect border border-dark-border rounded-xl text-sm text-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl ${tag.bgHover} hover:border-opacity-50 overflow-hidden whitespace-nowrap flex-shrink-0 ${
            tag.pulse ? 'animate-pulse' : ''
          }`}
        >
          {/* Background gradient on hover */}
          <div className={`absolute inset-0 bg-gradient-to-r ${tag.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          
          <div className="relative z-10 flex items-center gap-2">
            <div className={tag.color}>
              <tag.icon className="h-4 w-4" />
            </div>
            <span className="font-medium group-hover:text-white transition-colors">
              {tag.label}
            </span>
          </div>
          
          {/* Hover shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickAccessButtons;
