
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Enhanced hover effects for buttons and cards
interface HoverEffectProps {
  children: React.ReactNode;
  variant?: 'lift' | 'glow' | 'tilt' | 'shimmer' | 'ripple' | 'magnetic';
  intensity?: 'subtle' | 'moderate' | 'strong';
  className?: string;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({
  children,
  variant = 'lift',
  intensity = 'moderate',
  className = ""
}) => {
  const intensityMap = {
    subtle: { scale: 0.5, distance: 2, rotation: 1 },
    moderate: { scale: 1, distance: 4, rotation: 3 },
    strong: { scale: 1.5, distance: 8, rotation: 6 }
  };
  
  const { scale, distance, rotation } = intensityMap[intensity];

  const variants = {
    lift: {
      rest: { y: 0, scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
      hover: { 
        y: -distance * 2, 
        scale: 1 + (0.02 * scale),
        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }
    },
    glow: {
      rest: { boxShadow: "0 0 0px rgba(59, 130, 246, 0)" },
      hover: { 
        boxShadow: `0 0 ${20 * scale}px rgba(59, 130, 246, ${0.4 * scale})`,
        transition: { duration: 0.3 }
      }
    },
    tilt: {
      rest: { rotateX: 0, rotateY: 0 },
      hover: { 
        rotateX: rotation, 
        rotateY: rotation,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }
    },
    shimmer: {
      rest: {},
      hover: {}
    },
    ripple: {
      rest: { scale: 1 },
      hover: { scale: 1 + (0.05 * scale) },
      tap: { scale: 1 - (0.05 * scale) }
    },
    magnetic: {
      rest: { x: 0, y: 0 },
      hover: { x: distance, y: -distance }
    }
  };

  return (
    <motion.div
      className={cn("relative", className)}
      variants={variants[variant]}
      initial="rest"
      whileHover="hover"
      whileTap={variant === 'ripple' ? 'tap' : undefined}
      style={{ 
        perspective: variant === 'tilt' ? '1000px' : undefined,
        transformStyle: variant === 'tilt' ? 'preserve-3d' : undefined
      }}
    >
      {variant === 'shimmer' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
      {children}
    </motion.div>
  );
};

// Advanced loading states
interface LoadingStateProps {
  variant?: 'pulse' | 'dots' | 'spinner' | 'wave' | 'skeleton' | 'progress';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  text?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  className = ""
}) => {
  const sizeMap = {
    sm: { container: 'w-4 h-4', dot: 'w-1 h-1', text: 'text-xs' },
    md: { container: 'w-8 h-8', dot: 'w-2 h-2', text: 'text-sm' },
    lg: { container: 'w-12 h-12', dot: 'w-3 h-3', text: 'text-base' }
  };
  
  const colorMap = {
    primary: 'text-primary border-primary',
    secondary: 'text-secondary border-secondary',
    accent: 'text-accent border-accent'
  };

  const { container, dot, text: textSize } = sizeMap[size];
  const colors = colorMap[color];

  const renderVariant = () => {
    switch (variant) {
      case 'pulse':
        return (
          <motion.div
            className={cn(container, "rounded-full bg-current opacity-75", colors)}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        );

      case 'dots':
        return (
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(dot, "rounded-full bg-current", colors)}
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              />
            ))}
          </div>
        );

      case 'wave':
        return (
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className={cn("w-1 bg-current rounded", colors)}
                style={{ height: size === 'sm' ? '12px' : size === 'md' ? '20px' : '28px' }}
                animate={{ scaleY: [1, 2, 1] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.1 
                }}
              />
            ))}
          </div>
        );

      case 'progress':
        return (
          <div className={cn("w-24 h-1 bg-gray-200 rounded-full overflow-hidden", className)}>
            <motion.div
              className={cn("h-full bg-current rounded-full", colors)}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: '30%' }}
            />
          </div>
        );

      case 'skeleton':
        return (
          <div className="space-y-2">
            <motion.div 
              className="h-4 bg-gray-200 rounded"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="h-4 bg-gray-200 rounded w-3/4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </div>
        );

      default: // spinner
        return (
          <motion.div
            className={cn(
              container,
              "border-2 border-transparent border-t-current rounded-full",
              colors
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        );
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {renderVariant()}
      {text && (
        <motion.p 
          className={cn(textSize, "text-gray-600", colors)}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Transition animations between states
interface StateTransitionProps {
  children: React.ReactNode;
  state: string | number;
  variant?: 'fade' | 'slide' | 'scale' | 'flip' | 'push';
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const StateTransition: React.FC<StateTransitionProps> = ({
  children,
  state,
  variant = 'fade',
  direction = 'up',
  className = ""
}) => {
  const getVariants = () => {
    const distance = 20;
    
    switch (variant) {
      case 'slide':
        const slideDirections = {
          up: { initial: { y: distance }, animate: { y: 0 }, exit: { y: -distance } },
          down: { initial: { y: -distance }, animate: { y: 0 }, exit: { y: distance } },
          left: { initial: { x: distance }, animate: { x: 0 }, exit: { x: -distance } },
          right: { initial: { x: -distance }, animate: { x: 0 }, exit: { x: distance } }
        };
        return slideDirections[direction];

      case 'scale':
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.8, opacity: 0 }
        };

      case 'flip':
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 }
        };

      case 'push':
        const pushDirections = {
          up: { 
            initial: { y: '100%' }, 
            animate: { y: 0 }, 
            exit: { y: '-100%' } 
          },
          down: { 
            initial: { y: '-100%' }, 
            animate: { y: 0 }, 
            exit: { y: '100%' } 
          },
          left: { 
            initial: { x: '100%' }, 
            animate: { x: 0 }, 
            exit: { x: '-100%' } 
          },
          right: { 
            initial: { x: '-100%' }, 
            animate: { x: 0 }, 
            exit: { x: '100%' } 
          }
        };
        return pushDirections[direction];

      default: // fade
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        className={className}
        variants={getVariants()}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          duration: 0.3 
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Visual feedback for user interactions
interface FeedbackProps {
  children: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  variant?: 'flash' | 'shake' | 'bounce' | 'pulse' | 'glow';
  trigger?: boolean;
  className?: string;
}

export const VisualFeedback: React.FC<FeedbackProps> = ({
  children,
  type = 'success',
  variant = 'flash',
  trigger = false,
  className = ""
}) => {
  const colors = {
    success: 'bg-green-500/20 border-green-500',
    error: 'bg-red-500/20 border-red-500',
    warning: 'bg-yellow-500/20 border-yellow-500',
    info: 'bg-blue-500/20 border-blue-500'
  };

  const animations = {
    flash: {
      initial: { backgroundColor: 'transparent' },
      animate: trigger ? { backgroundColor: ['transparent', colors[type].split(' ')[0], 'transparent'] } : {},
      transition: { duration: 0.6 }
    },
    shake: {
      animate: trigger ? { x: [-2, 2, -2, 2, 0] } : {},
      transition: { duration: 0.5 }
    },
    bounce: {
      animate: trigger ? { y: [0, -10, 0] } : {},
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    pulse: {
      animate: trigger ? { scale: [1, 1.05, 1] } : {},
      transition: { duration: 0.3 }
    },
    glow: {
      animate: trigger ? { 
        boxShadow: [
          '0 0 0px rgba(59, 130, 246, 0)',
          '0 0 20px rgba(59, 130, 246, 0.5)',
          '0 0 0px rgba(59, 130, 246, 0)'
        ]
      } : {},
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div
      className={cn(className)}
      {...animations[variant]}
    >
      {children}
      <AnimatePresence>
        {trigger && variant === 'flash' && (
          <motion.div
            className={cn("absolute inset-0 rounded border-2", colors[type])}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Ripple effect component
interface RippleEffectProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  color = 'rgba(255, 255, 255, 0.3)',
  className = ""
}) => {
  const [ripples, setRipples] = React.useState<Array<{
    id: number;
    x: number;
    y: number;
  }>>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: color,
            }}
            initial={{ width: 0, height: 0, x: '-50%', y: '-50%' }}
            animate={{ width: 100, height: 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default {
  HoverEffect,
  LoadingState,
  StateTransition,
  VisualFeedback,
  RippleEffect
};
