
import { useMemo } from 'react';

type TypographyVariant = 
  | 'display-2xl' | 'display-xl' | 'display-lg' | 'display-md' | 'display-sm'
  | 'heading-xl' | 'heading-lg' | 'heading-md' 
  | 'body-lg' | 'body-md' | 'body-sm' 
  | 'caption';

export const useTypography = () => {
  const typography = useMemo(() => ({
    // Get typography class for text elements
    getTextClass: (variant: TypographyVariant) => {
      const baseClasses = {
        'display-2xl': 'text-display-2xl font-display text-display',
        'display-xl': 'text-display-xl font-display text-display',
        'display-lg': 'text-display-lg font-display text-display',
        'display-md': 'text-display-md font-display text-display',
        'display-sm': 'text-display-sm font-display text-display',
        'heading-xl': 'text-heading-xl font-heading text-heading',
        'heading-lg': 'text-heading-lg font-heading text-heading',
        'heading-md': 'text-heading-md font-heading text-heading',
        'body-lg': 'text-body-lg font-sans text-body',
        'body-md': 'text-body-md font-sans text-body',
        'body-sm': 'text-body-sm font-sans text-body',
        'caption': 'text-caption font-sans text-caption',
      };
      
      return baseClasses[variant];
    },
    
    // Get responsive text classes
    getResponsiveClass: (mobile: TypographyVariant, desktop: TypographyVariant) => {
      const mobileClass = typography.getTextClass(mobile);
      const desktopClass = typography.getTextClass(desktop);
      
      return `${mobileClass} md:${desktopClass.replace('text-', 'md:text-')}`;
    },
    
    // Typography utilities
    balance: 'text-balance',
    pretty: 'text-pretty',
    shadow: {
      sm: 'text-shadow-sm',
      md: 'text-shadow',
      lg: 'text-shadow-lg',
    },
  }), []);

  return typography;
};

export default useTypography;
