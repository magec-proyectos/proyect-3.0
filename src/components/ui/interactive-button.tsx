import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './loading-states';

interface InteractiveButtonProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  pulse?: boolean;
  glow?: boolean;
  haptic?: boolean;
}

const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(({
  children,
  className,
  loading = false,
  success = false,
  error = false,
  icon,
  iconPosition = 'left',
  pulse = false,
  glow = false,
  haptic = false,
  disabled,
  onClick,
  ...props
}, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
    onClick?.(e);
  };

  const stateClasses = {
    success: 'bg-green-600 hover:bg-green-700 border-green-600',
    error: 'bg-red-600 hover:bg-red-700 border-red-600'
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1 }}
    >
      <Button
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          success && stateClasses.success,
          error && stateClasses.error,
          pulse && 'animate-pulse',
          glow && 'shadow-lg shadow-primary/25',
          className
        )}
        {...props}
      >
        {loading && (
          <LoadingSpinner size="sm" className="mr-2" />
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
        
        {(pulse || glow) && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
          />
        )}
      </Button>
    </motion.div>
  );
});

InteractiveButton.displayName = 'InteractiveButton';

export default InteractiveButton;