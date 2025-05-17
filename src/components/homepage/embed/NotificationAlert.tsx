
import React from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NotificationAlertProps {
  platformName: string | null;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({ platformName }) => {
  if (!platformName) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mb-6"
    >
      <Alert className="bg-neon-blue/10 border-neon-blue/20 text-white">
        <AlertDescription className="flex items-center">
          <span className="mr-2">✓</span> Ready to export your betting strategy to {platformName}
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default NotificationAlert;
