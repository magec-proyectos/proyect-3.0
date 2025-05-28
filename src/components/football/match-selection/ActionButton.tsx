
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  selectedMatch: string;
  onFindMatch: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  selectedMatch,
  onFindMatch
}) => {
  if (!selectedMatch) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Button 
        onClick={onFindMatch}
        className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-medium h-12"
      >
        View Match Analysis
      </Button>
    </motion.div>
  );
};

export default ActionButton;
