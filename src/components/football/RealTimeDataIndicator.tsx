
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const RealTimeDataIndicator = () => {
  return (
    <motion.div 
      className="mb-6 flex justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Badge className="bg-dark-card/60 backdrop-blur-sm border-dark-border text-gray-300 px-4 py-2">
        <Shield className="h-4 w-4 mr-2" />
        Secure Betting Platform
      </Badge>
    </motion.div>
  );
};

export default RealTimeDataIndicator;
