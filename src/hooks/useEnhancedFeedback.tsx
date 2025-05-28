
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useEnhancedFeedback = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const showSuccess = useCallback((message: string, options?: FeedbackOptions) => {
    toast({
      title: "¡Éxito!",
      description: message,
      duration: options?.duration || 3000,
      action: options?.action
    });
  }, [toast]);

  const showError = useCallback((message: string, options?: FeedbackOptions) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
      duration: options?.duration || 5000,
      action: options?.action
    });
  }, [toast]);

  const showWarning = useCallback((message: string, options?: FeedbackOptions) => {
    toast({
      title: "Advertencia",
      description: message,
      duration: options?.duration || 4000,
      action: options?.action
    });
  }, [toast]);

  const showInfo = useCallback((message: string, options?: FeedbackOptions) => {
    toast({
      title: "Información",
      description: message,
      duration: options?.duration || 3000,
      action: options?.action
    });
  }, [toast]);

  const executeWithFeedback = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options: {
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ): Promise<T | null> => {
    const {
      loadingMessage = "Procesando...",
      successMessage = "Operación completada",
      errorMessage = "Ha ocurrido un error"
    } = options;
    
    setIsLoading(true);
    
    try {
      const result = await asyncFn();
      showSuccess(successMessage);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage;
      showError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    executeWithFeedback,
    isLoading
  };
};

export default useEnhancedFeedback;
