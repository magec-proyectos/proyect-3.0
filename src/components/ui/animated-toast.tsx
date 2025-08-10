import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  duration?: number;
  onRemove: (id: string) => void;
}

export const AnimatedToast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = 'default',
  duration = 5000,
  onRemove
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    
    // Auto-dismiss
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, [duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(id), 300);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-success-green/10 border-success-green/20 text-success-green';
      case 'warning':
        return 'bg-warning-amber/10 border-warning-amber/20 text-warning-amber';
      case 'error':
        return 'bg-error-red/10 border-error-red/20 text-error-red';
      default:
        return 'bg-card border-border text-card-foreground';
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-md",
        "transition-all duration-300 ease-out",
        "animate-slide-in-right",
        getVariantStyles(),
        isVisible && !isExiting && "translate-x-0 opacity-100",
        isExiting && "animate-slide-out-right opacity-0",
        !isVisible && "translate-x-full opacity-0"
      )}
      onClick={handleDismiss}
      role="alert"
      aria-live="polite"
    >
      {/* Progress bar */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 h-1 bg-current opacity-30",
          "animate-[progress_5s_linear_forwards]"
        )}
        style={{
          animation: `progress ${duration}ms linear forwards`
        }}
      />

      {/* Content */}
      <div className="space-y-1">
        {title && (
          <h4 className="font-semibold leading-none tracking-tight">
            {title}
          </h4>
        )}
        {description && (
          <p className="text-sm opacity-90">
            {description}
          </p>
        )}
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

// Toast Manager Component
interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  duration?: number;
}

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Add toast function (would be exposed via context)
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      ...toast,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <AnimatedToast
          key={toast.id}
          {...toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};

// CSS for progress bar animation
const progressKeyframes = `
@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}
`;