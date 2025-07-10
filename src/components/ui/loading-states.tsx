import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text' | 'card';
}

export const Skeleton = ({ className, variant = 'default' }: SkeletonProps) => {
  const variantClasses = {
    default: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-lg h-32'
  };

  return (
    <div 
      className={cn(
        'animate-pulse bg-muted',
        variantClasses[variant],
        className
      )} 
    />
  );
};

export const LoadingDots = ({ className }: { className?: string }) => (
  <div className={cn('flex space-x-1 justify-center items-center', className)}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-primary rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2
        }}
      />
    ))}
  </div>
);

export const LoadingSpinner = ({ className, size = 'md' }: { 
  className?: string; 
  size?: 'sm' | 'md' | 'lg' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={cn('border-2 border-primary border-t-transparent rounded-full', sizeClasses[size], className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
};

export const ContentPlaceholder = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton key={i} variant="text" className={i === lines - 1 ? 'w-3/4' : 'w-full'} />
    ))}
  </div>
);