
import React from 'react';
import { motion } from 'framer-motion';

interface MicroInteractionProps {
  children: React.ReactNode;
  type: 'hover-lift' | 'press' | 'glow' | 'shake' | 'pulse' | 'float' | 'scale' | 'rotate' | 'slide';
  className?: string;
  disabled?: boolean;
  trigger?: 'hover' | 'tap' | 'both' | 'auto';
  intensity?: 'subtle' | 'moderate' | 'strong';
}

const getAnimationVariants = (type: string, intensity: string = 'moderate') => {
  const intensityMap = {
    subtle: { scale: 0.5, distance: 1, rotation: 2 },
    moderate: { scale: 1, distance: 2, rotation: 5 },
    strong: { scale: 1.5, distance: 4, rotation: 10 }
  };
  
  const { scale, distance, rotation } = intensityMap[intensity as keyof typeof intensityMap];

  const variants = {
    'hover-lift': {
      rest: { y: 0, scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.12)" },
      hover: { 
        y: -distance * 2, 
        scale: 1 + (0.02 * scale), 
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        transition: { type: "spring", stiffness: 400, damping: 25 }
      },
      tap: { y: 0, scale: 1 - (0.02 * scale) }
    },
    'press': {
      rest: { scale: 1 },
      hover: { scale: 1 + (0.05 * scale) },
      tap: { scale: 1 - (0.05 * scale) }
    },
    'glow': {
      rest: { 
        boxShadow: "0 0 0px rgba(79, 195, 247, 0)" 
      },
      hover: { 
        boxShadow: `0 0 ${20 * scale}px rgba(79, 195, 247, ${0.4 * scale})`,
        transition: { duration: 0.3 }
      }
    },
    'shake': {
      rest: { x: 0 },
      trigger: { 
        x: [-distance, distance, -distance, distance, 0],
        transition: { duration: 0.5 }
      }
    },
    'pulse': {
      rest: { scale: 1 },
      auto: {
        scale: [1, 1 + (0.05 * scale), 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    'float': {
      rest: { y: 0 },
      auto: {
        y: [-distance, distance, -distance],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    'scale': {
      rest: { scale: 1 },
      hover: { scale: 1 + (0.1 * scale) },
      tap: { scale: 1 - (0.1 * scale) }
    },
    'rotate': {
      rest: { rotate: 0 },
      hover: { rotate: rotation },
      tap: { rotate: -rotation }
    },
    'slide': {
      rest: { x: 0 },
      hover: { x: distance * 2 },
      tap: { x: distance }
    }
  };

  return variants[type as keyof typeof variants] || variants['hover-lift'];
};

export const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  type,
  className = "",
  disabled = false,
  trigger = 'both',
  intensity = 'moderate'
}) => {
  const variants = getAnimationVariants(type, intensity);
  
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const getAnimateProps = () => {
    if (trigger === 'auto' && 'auto' in variants) {
      return { animate: 'auto' };
    }
    return {};
  };

  const getWhileProps = () => {
    const props: any = {};
    
    if ((trigger === 'hover' || trigger === 'both') && 'hover' in variants) {
      props.whileHover = 'hover';
    }
    
    if ((trigger === 'tap' || trigger === 'both') && 'tap' in variants) {
      props.whileTap = 'tap';
    }
    
    return props;
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="rest"
      {...getAnimateProps()}
      {...getWhileProps()}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
};

// New enhanced wrapper components
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'moderate' | 'strong';
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = "", 
  intensity = 'moderate' 
}) => (
  <MicroInteraction type="hover-lift" intensity={intensity} className={className}>
    {children}
  </MicroInteraction>
);

export const PulsatingElement: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = "", 
  intensity = 'subtle' 
}) => (
  <MicroInteraction type="pulse" trigger="auto" intensity={intensity} className={className}>
    {children}
  </MicroInteraction>
);

export const FloatingElement: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = "", 
  intensity = 'subtle' 
}) => (
  <MicroInteraction type="float" trigger="auto" intensity={intensity} className={className}>
    {children}
  </MicroInteraction>
);

export default MicroInteraction;
