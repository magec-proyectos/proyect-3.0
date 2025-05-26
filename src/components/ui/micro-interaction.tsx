
import React from 'react';
import { motion } from 'framer-motion';

interface MicroInteractionProps {
  children: React.ReactNode;
  type: 'hover-lift' | 'press' | 'glow' | 'shake' | 'pulse' | 'float';
  className?: string;
  disabled?: boolean;
  trigger?: 'hover' | 'tap' | 'both' | 'auto';
}

const animationVariants = {
  'hover-lift': {
    rest: { y: 0, scale: 1 },
    hover: { y: -2, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } },
    tap: { y: 0, scale: 0.98 }
  },
  'press': {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  },
  'glow': {
    rest: { 
      boxShadow: "0 0 0px rgba(79, 195, 247, 0)" 
    },
    hover: { 
      boxShadow: "0 0 20px rgba(79, 195, 247, 0.4)",
      transition: { duration: 0.3 }
    }
  },
  'shake': {
    rest: { x: 0 },
    trigger: { 
      x: [-2, 2, -2, 2, 0],
      transition: { duration: 0.5 }
    }
  },
  'pulse': {
    rest: { scale: 1 },
    auto: {
      scale: [1, 1.05, 1],
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
      y: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

export const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  type,
  className = "",
  disabled = false,
  trigger = 'both'
}) => {
  const variants = animationVariants[type];
  
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const getAnimateProps = () => {
    if (trigger === 'auto' && variants.auto) {
      return { animate: 'auto' };
    }
    return {};
  };

  const getWhileProps = () => {
    const props: any = {};
    
    if ((trigger === 'hover' || trigger === 'both') && variants.hover) {
      props.whileHover = 'hover';
    }
    
    if ((trigger === 'tap' || trigger === 'both') && variants.tap) {
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

export default MicroInteraction;
