
import React, { Suspense, ReactNode } from 'react';
import { useLazyLoading } from '@/hooks/useLazyLoading';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  height?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  errorFallback,
  threshold = 0.1,
  rootMargin = '100px',
  className = '',
  height = 'h-64'
}) => {
  const { elementRef, isVisible, isLoading, error, retry } = useLazyLoading({
    threshold,
    rootMargin
  });

  const defaultFallback = (
    <div className={`${height} w-full animate-pulse bg-muted rounded-lg`}>
      <Skeleton className="w-full h-full" />
    </div>
  );

  const defaultErrorFallback = (
    <Alert className="border-destructive">
      <AlertDescription className="flex items-center justify-between">
        <span>Error al cargar el contenido</span>
        <Button
          variant="outline"
          size="sm"
          onClick={retry}
          className="ml-2"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Reintentar
        </Button>
      </AlertDescription>
    </Alert>
  );

  if (error) {
    return (
      <div ref={elementRef} className={className}>
        {errorFallback || defaultErrorFallback}
      </div>
    );
  }

  if (!isVisible) {
    return (
      <div ref={elementRef} className={className}>
        {fallback || defaultFallback}
      </div>
    );
  }

  return (
    <div ref={elementRef} className={className}>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </div>
  );
};

export default LazySection;
