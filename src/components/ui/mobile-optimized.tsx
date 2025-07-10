import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// Mobile-first responsive container
export const ResponsiveContainer = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      'w-full',
      isMobile ? 'px-4 py-2' : 'px-6 py-4',
      className
    )}>
      {children}
    </div>
  );
};

// Touch-optimized button with proper sizing
export const TouchButton = ({ 
  children, 
  className, 
  size = 'default',
  onClick,
  disabled,
  type = 'button',
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const isMobile = useIsMobile();
  
  const sizeClasses = {
    sm: isMobile ? 'min-h-[44px] px-4 text-sm' : 'min-h-[36px] px-3 text-sm',
    default: isMobile ? 'min-h-[48px] px-6 text-base' : 'min-h-[40px] px-4 text-base',
    lg: isMobile ? 'min-h-[52px] px-8 text-lg' : 'min-h-[44px] px-6 text-lg'
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        'relative rounded-lg font-medium transition-all duration-200',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90 active:bg-primary/80',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
};

// Mobile-friendly card with touch feedback
export const TouchCard = ({ 
  children, 
  className,
  onTap,
  interactive = false
}: { 
  children: React.ReactNode; 
  className?: string;
  onTap?: () => void;
  interactive?: boolean;
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      whileTap={interactive ? { scale: 0.98 } : undefined}
      onClick={onTap}
      className={cn(
        'bg-card border border-border rounded-lg',
        isMobile ? 'p-4' : 'p-6',
        interactive && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Responsive grid that adapts to screen size
export const ResponsiveGrid = ({ 
  children, 
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 }
}: { 
  children: React.ReactNode; 
  className?: string;
  cols?: { mobile: number; tablet: number; desktop: number };
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2', 
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };
  
  return (
    <div className={cn(
      'grid gap-4',
      `${gridClasses[cols.mobile]}`,
      `md:${gridClasses[cols.tablet]}`,
      `lg:${gridClasses[cols.desktop]}`,
      className
    )}>
      {children}
    </div>
  );
};

// Mobile bottom sheet overlay
export const MobileSheet = ({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode; 
}) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-background rounded-t-xl border-t border-border max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4">
          {/* Handle */}
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};