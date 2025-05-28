
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// Enhanced hover effects with context awareness
interface HoverEffectProps {
  children: React.ReactNode;
  variant?: 'lift' | 'glow' | 'tilt' | 'shimmer' | 'ripple' | 'scale' | 'bounce';
  intensity?: 'subtle' | 'moderate' | 'strong';
  className?: string;
  disabled?: boolean;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({
  children,
  variant = 'lift',
  intensity = 'moderate',
  className,
  disabled = false
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const intensityValues = {
    subtle: { scale: 1.02, y: -2, glow: 8, rotate: 1 },
    moderate: { scale: 1.05, y: -4, glow: 12, rotate: 3 },
    strong: { scale: 1.08, y: -6, glow: 16, rotate: 5 }
  };

  const values = intensityValues[intensity];

  const variants = {
    lift: {
      rest: { y: 0, scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.12)" },
      hover: { 
        y: -values.y, 
        scale: values.scale,
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }
    },
    glow: {
      rest: { boxShadow: "0 0 0px rgba(59, 130, 246, 0)" },
      hover: { 
        boxShadow: `0 0 ${values.glow}px rgba(59, 130, 246, 0.4)`,
        transition: { duration: 0.3 }
      }
    },
    tilt: {
      rest: { rotateY: 0, rotateX: 0 },
      hover: { 
        rotateY: values.rotate, 
        rotateX: values.rotate,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }
    },
    scale: {
      rest: { scale: 1 },
      hover: { 
        scale: values.scale,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }
    },
    bounce: {
      rest: { y: 0 },
      hover: { 
        y: [0, -values.y, 0],
        transition: { duration: 0.6, times: [0, 0.5, 1] }
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={variants[variant] || variants.lift}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

// Ripple effect component
interface RippleEffectProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  color = 'rgba(255, 255, 255, 0.3)',
  duration = 600
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = (event: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, duration);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseDown={createRipple}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              backgroundColor: color,
            }}
            initial={{ width: 20, height: 20, opacity: 0.5 }}
            animate={{ 
              width: 200, 
              height: 200, 
              opacity: 0,
              x: -90,
              y: -90
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Loading state component with context awareness
interface LoadingStateProps {
  variant?: 'spinner' | 'pulse' | 'dots' | 'bars' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'currentColor',
  className
}) => {
  const sizeMap = {
    sm: { spinner: 'w-4 h-4', dot: 'w-1 h-1', bar: 'w-1 h-4' },
    md: { spinner: 'w-6 h-6', dot: 'w-2 h-2', bar: 'w-2 h-6' },
    lg: { spinner: 'w-8 h-8', dot: 'w-3 h-3', bar: 'w-3 h-8' }
  };

  const sizes = sizeMap[size];

  const components = {
    spinner: (
      <div className={cn(sizes.spinner, "animate-spin", className)}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeOpacity="0.2"/>
          <path d="M12 2a10 10 0 0 1 7.07 2.93" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    ),
    dots: (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className={cn(sizes.dot, "rounded-full")}
            style={{ backgroundColor: color }}
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
    ),
    bars: (
      <div className={cn("flex space-x-1 items-end", className)}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className={sizes.bar}
            style={{ backgroundColor: color }}
            animate={{
              scaleY: [1, 2, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    ),
    pulse: (
      <motion.div
        className={cn(sizes.spinner, "rounded-full", className)}
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ),
    skeleton: (
      <div className={cn("bg-gray-200 rounded", className)}>
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    )
  };

  return components[variant];
};

// State transition component
interface StateTransitionProps {
  children: React.ReactNode;
  state: 'idle' | 'loading' | 'success' | 'error';
  className?: string;
}

export const StateTransition: React.FC<StateTransitionProps> = ({
  children,
  state,
  className
}) => {
  const variants = {
    idle: { scale: 1, opacity: 1, filter: 'grayscale(0%)' },
    loading: { scale: 0.98, opacity: 0.7, filter: 'grayscale(20%)' },
    success: { scale: 1.02, opacity: 1, filter: 'grayscale(0%) hue-rotate(120deg)' },
    error: { scale: 0.98, opacity: 1, filter: 'grayscale(0%) hue-rotate(0deg)' }
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      animate={state}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered animations
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" }
      });
    }
  }, [isInView, controls, delay]);

  const directions = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: 50 },
    right: { opacity: 0, x: -50 }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={directions[direction]}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

// Visual feedback component for different states
interface VisualFeedbackProps {
  children: React.ReactNode;
  type: 'success' | 'error' | 'warning' | 'info';
  variant?: 'glow' | 'pulse' | 'shake' | 'bounce';
  trigger: boolean;
  className?: string;
}

export const VisualFeedback: React.FC<VisualFeedbackProps> = ({
  children,
  type,
  variant = 'glow',
  trigger,
  className
}) => {
  const colors = {
    success: 'rgba(34, 197, 94, 0.4)',
    error: 'rgba(239, 68, 68, 0.4)',
    warning: 'rgba(251, 146, 60, 0.4)',
    info: 'rgba(59, 130, 246, 0.4)'
  };

  const variants = {
    glow: {
      initial: { boxShadow: "0 0 0px rgba(0,0,0,0)" },
      animate: { boxShadow: `0 0 20px ${colors[type]}` }
    },
    pulse: {
      initial: { scale: 1 },
      animate: { scale: [1, 1.05, 1] }
    },
    shake: {
      initial: { x: 0 },
      animate: { x: [-2, 2, -2, 2, 0] }
    },
    bounce: {
      initial: { y: 0 },
      animate: { y: [0, -10, 0] }
    }
  };

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="initial"
      animate={trigger ? "animate" : "initial"}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default {
  HoverEffect,
  RippleEffect,
  LoadingState,
  StateTransition,
  ScrollReveal,
  VisualFeedback
};
