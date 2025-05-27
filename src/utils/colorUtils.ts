
// Enhanced color utility functions for the new color system

export type SportType = 'football' | 'basketball' | 'americanFootball' | 'baseball' | 'tennis';

export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'light' | 'dark';

export type StateType = 'success' | 'warning' | 'error' | 'info';

// Sport color mappings
export const sportColors = {
  football: {
    primary: '#2196F3',
    secondary: '#1976D2',
    accent: '#03DAC6',
    light: '#E3F2FD',
    dark: '#0D47A1',
  },
  basketball: {
    primary: '#FF9800',
    secondary: '#F57C00',
    accent: '#4CAF50',
    light: '#FFF3E0',
    dark: '#E65100',
  },
  americanFootball: {
    primary: '#9C27B0',
    secondary: '#7B1FA2',
    accent: '#E91E63',
    light: '#F3E5F5',
    dark: '#4A148C',
  },
  baseball: {
    primary: '#4CAF50',
    secondary: '#388E3C',
    accent: '#FFC107',
    light: '#E8F5E8',
    dark: '#1B5E20',
  },
  tennis: {
    primary: '#009688',
    secondary: '#00695C',
    accent: '#CDDC39',
    light: '#E0F2F1',
    dark: '#004D40',
  },
} as const;

// State color mappings
export const stateColors = {
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
} as const;

// Get sport color by type and variant
export const getSportColor = (sport: SportType, variant: ColorVariant = 'primary'): string => {
  return sportColors[sport]?.[variant] || sportColors.football.primary;
};

// Get state color
export const getStateColor = (state: StateType): string => {
  return stateColors[state];
};

// Generate Tailwind classes for sport colors
export const getSportClasses = (sport: SportType) => {
  const prefix = `sport-${sport}`;
  return {
    bg: `bg-${prefix}-primary`,
    bgSecondary: `bg-${prefix}-secondary`,
    bgAccent: `bg-${prefix}-accent`,
    bgLight: `bg-${prefix}-light`,
    bgDark: `bg-${prefix}-dark`,
    text: `text-${prefix}-primary`,
    textSecondary: `text-${prefix}-secondary`,
    textAccent: `text-${prefix}-accent`,
    border: `border-${prefix}-primary`,
    borderSecondary: `border-${prefix}-secondary`,
    gradient: `bg-gradient-sport-${sport}`,
    glow: `shadow-glow-${sport === 'football' ? 'blue' : sport === 'basketball' ? 'orange' : 'purple'}`,
    button: `btn-sport-${sport}`,
    card: `sport-card-${sport}`,
  };
};

// Generate Tailwind classes for state colors
export const getStateClasses = (state: StateType) => {
  return {
    bg: `bg-${state}-500`,
    bgLight: `bg-${state}-100`,
    bgDark: `bg-${state}-900`,
    text: `text-${state}-500`,
    textLight: `text-${state}-400`,
    textDark: `text-${state}-600`,
    border: `border-${state}`,
    feedback: `feedback-${state}`,
  };
};

// Helper to get contrast text color
export const getContrastTextColor = (backgroundColor: string): 'text-white' | 'text-black' => {
  // Simple luminance calculation for accessibility
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'text-black' : 'text-white';
};

// Generate gradient combinations
export const getGradientClasses = (sport: SportType) => {
  const gradients = {
    football: 'from-sport-football-primary to-sport-football-accent',
    basketball: 'from-sport-basketball-primary to-sport-basketball-accent',
    americanFootball: 'from-sport-american-football-primary to-sport-american-football-accent',
    baseball: 'from-sport-baseball-primary to-sport-baseball-accent',
    tennis: 'from-sport-tennis-primary to-sport-tennis-accent',
  };
  
  return `bg-gradient-to-r ${gradients[sport]}`;
};

// Opacity variations
export const getOpacityVariant = (baseClass: string, opacity: number): string => {
  const opacityMap = {
    5: '/5',
    10: '/10',
    20: '/20',
    30: '/30',
    40: '/40',
    50: '/50',
    60: '/60',
    70: '/70',
    80: '/80',
    90: '/90',
  };
  
  return `${baseClass}${opacityMap[opacity as keyof typeof opacityMap] || ''}`;
};

// Animation classes based on sport
export const getSportAnimationClasses = (sport: SportType) => {
  return {
    hover: 'hover-scale hover-glow',
    glow: `hover:shadow-glow-${sport === 'football' ? 'blue' : sport === 'basketball' ? 'orange' : 'purple'}`,
    float: 'animate-float',
    pulse: 'animate-pulse',
    scale: 'animate-scale-in',
  };
};

export default {
  getSportColor,
  getStateColor,
  getSportClasses,
  getStateClasses,
  getContrastTextColor,
  getGradientClasses,
  getOpacityVariant,
  getSportAnimationClasses,
};
