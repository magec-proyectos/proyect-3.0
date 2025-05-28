
import React, { ReactNode } from 'react';
import { motion, AnimationProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionWrapperProps extends AnimationProps {
  children: ReactNode;
  className?: string;
  fallbackComponent?: 'div' | 'span' | 'section';
  enabledAnimations?: {
    scale?: boolean;
    opacity?: boolean;
    position?: boolean;
    rotation?: boolean;
  };
  whileHover?: any;
  whileTap?: any;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  className = '',
  fallbackComponent = 'div',
  enabledAnimations = {
    scale: true,
    opacity: true,
    position: true,
    rotation: false
  },
  initial,
  animate,
  exit,
  whileHover,
  whileTap,
  transition,
  ...motionProps
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Si el usuario prefiere movimiento reducido, usar componente estático
  if (prefersReducedMotion) {
    const FallbackComponent = fallbackComponent;
    return (
      <FallbackComponent className={className}>
        {children}
      </FallbackComponent>
    );
  }

  // Filtrar animaciones basadas en las preferencias del usuario
  const getFilteredAnimationValue = (value: any) => {
    if (!value || typeof value !== 'object') return value;

    const filtered = { ...value };

    // Remover animaciones de escala si están deshabilitadas
    if (!enabledAnimations.scale) {
      delete filtered.scale;
      delete filtered.scaleX;
      delete filtered.scaleY;
    }

    // Remover animaciones de opacidad si están deshabilitadas
    if (!enabledAnimations.opacity) {
      delete filtered.opacity;
    }

    // Remover animaciones de posición si están deshabilitadas
    if (!enabledAnimations.position) {
      delete filtered.x;
      delete filtered.y;
      delete filtered.translateX;
      delete filtered.translateY;
    }

    // Remover animaciones de rotación si están deshabilitadas
    if (!enabledAnimations.rotation) {
      delete filtered.rotate;
      delete filtered.rotateX;
      delete filtered.rotateY;
      delete filtered.rotateZ;
    }

    return filtered;
  };

  const filteredInitial = getFilteredAnimationValue(initial);
  const filteredAnimate = getFilteredAnimationValue(animate);
  const filteredExit = getFilteredAnimationValue(exit);
  const filteredWhileHover = getFilteredAnimationValue(whileHover);
  const filteredWhileTap = getFilteredAnimationValue(whileTap);

  return (
    <motion.div
      className={className}
      initial={filteredInitial}
      animate={filteredAnimate}
      exit={filteredExit}
      whileHover={filteredWhileHover}
      whileTap={filteredWhileTap}
      transition={transition}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
