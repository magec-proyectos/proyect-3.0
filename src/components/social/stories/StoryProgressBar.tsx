import React from 'react';
import { motion } from 'framer-motion';

interface StoryProgressBarProps {
  stories: any[];
  currentIndex: number;
  progress: number;
}

const StoryProgressBar: React.FC<StoryProgressBarProps> = ({
  stories,
  currentIndex,
  progress
}) => {
  return (
    <div className="flex gap-1 pt-4">
      {stories.map((_, index) => (
        <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: index < currentIndex 
                ? "100%" 
                : index === currentIndex 
                  ? `${progress}%` 
                  : "0%"
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      ))}
    </div>
  );
};

export default StoryProgressBar;