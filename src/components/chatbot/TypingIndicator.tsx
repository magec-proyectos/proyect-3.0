
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const TypingIndicator: React.FC = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [-4, 0, -4] }
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex gap-2 justify-start"
    >
      <Avatar className="w-6 h-6">
        <AvatarFallback>
          <Bot size={12} />
        </AvatarFallback>
      </Avatar>
      <div className="bg-dark-lighter p-3 rounded-lg">
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-sm mr-2">AI is typing</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                variants={dotVariants}
                animate="animate"
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                className="w-1.5 h-1.5 bg-soft-blue rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
