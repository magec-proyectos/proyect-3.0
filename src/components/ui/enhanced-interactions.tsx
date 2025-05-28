
import React from 'react';
import { motion } from 'framer-motion';
import { HoverEffect, LoadingState, StateTransition, VisualFeedback, RippleEffect } from './advanced-micro-interactions';
import { cn } from '@/lib/utils';

// Enhanced Button with micro-interactions
interface EnhancedInteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  success?: boolean;
  hoverEffect?: 'lift' | 'glow' | 'tilt' | 'shimmer' | 'ripple';
  children: React.ReactNode;
}

export const EnhancedInteractiveButton: React.FC<EnhancedInteractiveButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  hoverEffect = 'lift',
  className,
  children,
  ...props
}) => {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    {
      'bg-primary text-primary-foreground shadow-md': variant === 'primary',
      'bg-secondary text-secondary-foreground shadow-md': variant === 'secondary',
      'border-2 border-primary text-primary bg-transparent': variant === 'outline',
      'text-foreground hover:bg-accent': variant === 'ghost',
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    },
    className
  );

  // Separate drag-related props that conflict with Framer Motion
  const {
    onDrag,
    onDragEnd,
    onDragEnter,
    onDragExit,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    draggable,
    ...safeProps
  } = props;

  return (
    <HoverEffect variant={hoverEffect} intensity="moderate">
      <RippleEffect>
        <motion.button
          className={baseStyles}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          disabled={loading || props.disabled}
          {...safeProps}
        >
          <StateTransition state={loading ? 'loading' : success ? 'success' : 'default'}>
            {loading ? (
              <LoadingState variant="spinner" size="sm" />
            ) : success ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Success
              </motion.div>
            ) : (
              children
            )}
          </StateTransition>
        </motion.button>
      </RippleEffect>
    </HoverEffect>
  );
};

// Enhanced Card with micro-interactions
interface EnhancedInteractiveCardProps {
  children: React.ReactNode;
  hoverEffect?: 'lift' | 'glow' | 'tilt';
  clickable?: boolean;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

export const EnhancedInteractiveCard: React.FC<EnhancedInteractiveCardProps> = ({
  children,
  hoverEffect = 'lift',
  clickable = false,
  selected = false,
  className,
  onClick
}) => {
  const cardStyles = cn(
    "bg-card border border-border rounded-xl p-6 transition-all duration-200",
    {
      'cursor-pointer': clickable,
      'ring-2 ring-primary ring-offset-2': selected,
    },
    className
  );

  const CardComponent = clickable ? motion.div : 'div';

  return (
    <VisualFeedback type="info" variant="pulse" trigger={selected}>
      <HoverEffect variant={hoverEffect} intensity={clickable ? 'moderate' : 'subtle'}>
        <CardComponent
          className={cardStyles}
          onClick={onClick}
          whileTap={clickable ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {children}
        </CardComponent>
      </HoverEffect>
    </VisualFeedback>
  );
};

// Enhanced Input with micro-interactions
interface EnhancedInteractiveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  loading?: boolean;
}

export const EnhancedInteractiveInput: React.FC<EnhancedInteractiveInputProps> = ({
  label,
  error,
  success = false,
  loading = false,
  className,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <motion.label
          className="block text-sm font-medium text-foreground"
          animate={{ color: error ? '#ef4444' : focused ? '#3b82f6' : '#6b7280' }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <VisualFeedback 
        type={error ? 'error' : success ? 'success' : 'info'} 
        variant="glow" 
        trigger={Boolean(error) || success}
      >
        <motion.div
          className="relative"
          animate={{ scale: focused ? 1.01 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <input
            className={cn(
              "w-full px-3 py-2 border rounded-lg transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              {
                'border-red-500 focus:ring-red-500': error,
                'border-green-500 focus:ring-green-500': success,
                'border-border': !error && !success,
              },
              className
            )}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
          
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <LoadingState variant="spinner" size="sm" />
            </div>
          )}
          
          {success && !loading && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </VisualFeedback>
      
      {error && (
        <motion.p
          className="text-sm text-red-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// Enhanced Toast Notification
interface EnhancedToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export const EnhancedToast: React.FC<EnhancedToastProps> = ({
  type = 'info',
  title,
  message,
  visible,
  onClose,
  duration = 5000
}) => {
  React.useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  if (!visible) return null;

  return (
    <motion.div
      className={cn(
        "fixed top-4 right-4 z-50 max-w-sm w-full border rounded-lg shadow-lg p-4",
        colors[type]
      )}
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      layout
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium">{title}</h4>
          {message && (
            <p className="mt-1 text-sm opacity-90">{message}</p>
          )}
        </div>
        <motion.button
          className="flex-shrink-0 ml-2 opacity-70 hover:opacity-100"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default {
  EnhancedInteractiveButton,
  EnhancedInteractiveCard,
  EnhancedInteractiveInput,
  EnhancedToast
};
