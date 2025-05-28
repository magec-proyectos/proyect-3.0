
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, Lightbulb, Target, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface EnhancedTooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  variant?: 'default' | 'info' | 'tip' | 'warning';
  showIcon?: boolean;
  delayDuration?: number;
}

interface OnboardingStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface OnboardingTooltipProps {
  steps: OnboardingStep[];
  isActive?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  className?: string;
}

const tooltipVariants = {
  default: 'bg-popover text-popover-foreground border',
  info: 'bg-blue-50 text-blue-900 border-blue-200',
  tip: 'bg-amber-50 text-amber-900 border-amber-200',
  warning: 'bg-red-50 text-red-900 border-red-200'
};

const iconVariants = {
  default: Info,
  info: Info,
  tip: Lightbulb,
  warning: Target
};

export const EnhancedTooltip: React.FC<EnhancedTooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  className,
  variant = 'default',
  showIcon = false,
  delayDuration = 400
}) => {
  const Icon = iconVariants[variant];
  
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align={align}
          className={cn(
            tooltipVariants[variant],
            showIcon && "flex items-center gap-2",
            className
          )}
        >
          {showIcon && <Icon className="w-4 h-4" />}
          <span>{content}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  steps,
  isActive = false,
  onComplete,
  onSkip,
  className
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(isActive);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (isActive && currentStepData) {
      const element = document.querySelector(currentStepData.target) as HTMLElement;
      setTargetElement(element);
      setIsVisible(true);
      
      // Scroll element into view
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep, isActive, currentStepData]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete?.();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip?.();
  };

  if (!isVisible || !currentStepData || !targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  const tooltip = {
    top: { top: rect.top - 10, left: rect.left + rect.width / 2, transform: 'translate(-50%, -100%)' },
    right: { top: rect.top + rect.height / 2, left: rect.right + 10, transform: 'translateY(-50%)' },
    bottom: { top: rect.bottom + 10, left: rect.left + rect.width / 2, transform: 'translateX(-50%)' },
    left: { top: rect.top + rect.height / 2, left: rect.left - 10, transform: 'translate(-100%, -50%)' }
  };

  const position = tooltip[currentStepData.position];

  const animationProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleSkip} />
      
      {/* Highlight */}
      <div
        className="fixed pointer-events-none z-45 border-2 border-primary rounded-md"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
        }}
      />
      
      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          {...animationProps}
          className={cn(
            "fixed z-50 bg-white rounded-lg shadow-xl border p-4 max-w-sm",
            className
          )}
          style={position}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {currentStepData.icon && currentStepData.icon}
              <h3 className="font-semibold text-sm">{currentStepData.title}</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{currentStepData.content}</p>
          
          {currentStepData.action && (
            <Button
              variant="outline"
              size="sm"
              onClick={currentStepData.action.onClick}
              className="w-full mb-3"
            >
              {currentStepData.action.label}
            </Button>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    index === currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" size="sm" onClick={previousStep}>
                  Anterior
                </Button>
              )}
              <Button size="sm" onClick={nextStep}>
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

// Hook for managing onboarding state
export const useOnboarding = (storageKey: string) => {
  const [isCompleted, setIsCompleted] = useState(() => {
    return localStorage.getItem(`onboarding-${storageKey}`) === 'completed';
  });

  const markCompleted = () => {
    localStorage.setItem(`onboarding-${storageKey}`, 'completed');
    setIsCompleted(true);
  };

  const reset = () => {
    localStorage.removeItem(`onboarding-${storageKey}`);
    setIsCompleted(false);
  };

  return {
    isCompleted,
    markCompleted,
    reset
  };
};

export default EnhancedTooltip;
