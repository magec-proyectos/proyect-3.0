
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, TrendingUp, BarChart3, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EnhancedLoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const MotionComponent = prefersReducedMotion ? 'div' : motion.div;
  const animationProps = prefersReducedMotion ? {} : {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <MotionComponent
      className={`${sizeClasses[size]} ${className}`}
      {...animationProps}
    >
      <Loader2 className="w-full h-full text-primary" />
    </MotionComponent>
  );
};

interface SportsLoadingProps {
  type?: 'matches' | 'stats' | 'predictions';
  progress?: number;
  message?: string;
}

export const SportsLoading: React.FC<SportsLoadingProps> = ({
  type = 'matches',
  progress,
  message
}) => {
  const prefersReducedMotion = useReducedMotion();

  const getIcon = () => {
    switch (type) {
      case 'matches':
        return <Activity className="w-8 h-8 text-primary" />;
      case 'stats':
        return <BarChart3 className="w-8 h-8 text-primary" />;
      case 'predictions':
        return <TrendingUp className="w-8 h-8 text-primary" />;
      default:
        return <Activity className="w-8 h-8 text-primary" />;
    }
  };

  const getMessage = () => {
    if (message) return message;
    
    switch (type) {
      case 'matches':
        return 'Cargando partidos en vivo...';
      case 'stats':
        return 'Analizando estadísticas...';
      case 'predictions':
        return 'Generando predicciones IA...';
      default:
        return 'Cargando...';
    }
  };

  const pulseAnimation = prefersReducedMotion ? {} : {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-primary/20">
      <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
        <motion.div {...(prefersReducedMotion ? {} : pulseAnimation)}>
          {getIcon()}
        </motion.div>
        
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-foreground">{getMessage()}</h3>
          
          {progress !== undefined && (
            <div className="w-full space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">{progress}% completado</p>
            </div>
          )}
        </div>
        
        <EnhancedLoadingSpinner size="sm" />
      </CardContent>
    </Card>
  );
};

interface SkeletonGridProps {
  rows?: number;
  columns?: number;
  aspectRatio?: 'square' | 'video' | 'card';
  className?: string;
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  rows = 3,
  columns = 3,
  aspectRatio = 'card',
  className = ''
}) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    card: 'aspect-[4/3]'
  };

  return (
    <div className={`grid gap-4 ${className}`} style={{
      gridTemplateColumns: `repeat(${columns}, 1fr)`
    }}>
      {Array.from({ length: rows * columns }).map((_, index) => (
        <div key={index} className={`animate-pulse bg-muted rounded-lg ${aspectClasses[aspectRatio]}`} />
      ))}
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  progress?: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Cargando...',
  progress
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <SportsLoading message={message} progress={progress} />
    </motion.div>
  );
};
