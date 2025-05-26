
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Target } from 'lucide-react';

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
      className="mt-8 flex justify-center gap-4"
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
          className={`group relative px-6 py-4 glass-effect border border-dark-border rounded-xl text-sm text-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl ${tag.bgHover} hover:border-opacity-50 overflow-hidden whitespace-nowrap flex-shrink-0`}
        >
          <div className="relative z-10 flex items-center gap-3">
            <div className={tag.color}>
              <tag.icon className="h-5 w-5" />
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
