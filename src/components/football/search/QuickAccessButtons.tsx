
import React from 'react';
import { motion } from 'framer-motion';

interface QuickAccessButtonsProps {
  onTagClick: (tag: string) => void;
}

const QuickAccessButtons: React.FC<QuickAccessButtonsProps> = ({ onTagClick }) => {
  const quickTags = ['Live', 'Champions League', 'La Liga', 'Premier League', 'Upcoming matches'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 flex flex-wrap justify-center gap-3"
    >
      {quickTags.map((tag, index) => (
        <motion.button
          key={tag}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTagClick(tag)}
          className="px-4 py-2 glass-effect border border-dark-border rounded-full text-sm text-gray-300 hover:border-neon-blue/50 hover:text-neon-blue transition-all shadow-lg hover:shadow-neon-blue/10"
        >
          {tag}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickAccessButtons;
