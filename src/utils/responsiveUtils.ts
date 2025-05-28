
// Responsive design utilities for consistent breakpoints and layouts

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Responsive grid classes for consistent layouts
export const getResponsiveGridClasses = (
  mobile: number = 1,
  tablet: number = 2,
  desktop: number = 3
) => {
  return `grid grid-cols-${mobile} md:grid-cols-${tablet} lg:grid-cols-${desktop}`;
};

// Responsive spacing classes
export const getResponsiveSpacing = (
  mobile: string = 'p-4',
  tablet: string = 'md:p-6',
  desktop: string = 'lg:p-8'
) => {
  return `${mobile} ${tablet} ${desktop}`;
};

// Responsive text size classes
export const getResponsiveTextClasses = (
  mobile: string = 'text-sm',
  tablet: string = 'md:text-base',
  desktop: string = 'lg:text-lg'
) => {
  return `${mobile} ${tablet} ${desktop}`;
};

// Responsive container classes
export const getResponsiveContainer = (
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'xl'
) => {
  return `container mx-auto px-4 sm:px-6 lg:px-8 max-w-${maxWidth}`;
};

// Mobile-first media query helpers
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
} as const;

// Responsive visibility classes
export const getResponsiveVisibility = (
  showOn: Breakpoint[] = ['lg']
) => {
  const baseClass = 'hidden';
  const showClasses = showOn.map(bp => `${bp}:block`).join(' ');
  return `${baseClass} ${showClasses}`;
};

// Mobile navigation classes
export const getMobileNavClasses = (isOpen: boolean) => {
  return {
    overlay: `fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`,
    sidebar: `fixed top-0 left-0 h-full w-80 bg-background border-r transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`,
    content: `transition-transform duration-300 ${
      isOpen ? 'transform translate-x-80' : ''
    }`
  };
};

// Touch-friendly sizing for mobile
export const getTouchFriendlyClasses = () => {
  return {
    button: 'min-h-[44px] min-w-[44px] touch-manipulation',
    input: 'min-h-[44px] touch-manipulation',
    link: 'min-h-[44px] flex items-center touch-manipulation',
  };
};

// Responsive card layouts
export const getResponsiveCardGrid = (
  columns: { mobile?: number; tablet?: number; desktop?: number } = {}
) => {
  const { mobile = 1, tablet = 2, desktop = 3 } = columns;
  return `grid grid-cols-${mobile} md:grid-cols-${tablet} lg:grid-cols-${desktop} gap-4 md:gap-6`;
};

export default {
  breakpoints,
  getResponsiveGridClasses,
  getResponsiveSpacing,
  getResponsiveTextClasses,
  getResponsiveContainer,
  getResponsiveVisibility,
  getMobileNavClasses,
  getTouchFriendlyClasses,
  getResponsiveCardGrid,
  mediaQueries,
};
