
import { useMemo } from 'react';

type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export const useSpacing = () => {
  const spacing = useMemo(() => ({
    // Padding utilities
    getPadding: (size: SpacingSize) => `spacing-${size}`,
    
    // Gap utilities  
    getGap: (size: SpacingSize) => `gap-${size}`,
    
    // Margin utilities
    getMargin: (size: SpacingSize, direction?: 'top' | 'bottom' | 'left' | 'right') => {
      const baseClass = direction ? `m${direction[0]}-${size}` : `m-${size}`;
      return baseClass;
    },
    
    // Space between utilities
    getSpace: (size: SpacingSize) => `space-${size}`,
    
    // Consistent spacing values
    values: {
      xs: '0.25rem',
      sm: '0.5rem', 
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem',
    }
  }), []);

  return spacing;
};

export default useSpacing;
