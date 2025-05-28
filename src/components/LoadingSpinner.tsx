
import React from 'react';
import { EnhancedLoadingSpinner, SportsLoading } from '@/components/ui/enhanced-loading';

interface LoadingSpinnerProps {
  type?: 'simple' | 'sports';
  sportsType?: 'matches' | 'stats' | 'predictions';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  progress?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = 'simple',
  sportsType = 'matches',
  size = 'md',
  message,
  progress
}) => {
  if (type === 'sports') {
    return (
      <div className="flex items-center justify-center py-16">
        <SportsLoading 
          type={sportsType} 
          message={message}
          progress={progress}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16">
      <EnhancedLoadingSpinner size={size} />
    </div>
  );
};

export default LoadingSpinner;
