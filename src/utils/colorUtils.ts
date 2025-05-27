
// Simplified color utility functions

export type SportType = 'football' | 'basketball' | 'americanFootball' | 'baseball' | 'tennis';

export type ColorVariant = 'primary' | 'secondary' | 'light' | 'dark';

export type StateType = 'success' | 'warning' | 'error' | 'info';

// Simplified sport color mappings - Blue and Green only
export const sportColors = {
  football: {
    primary: '#2196F3',
    secondary: '#1976D2',
    light: '#E3F2FD',
    dark: '#0D47A1',
  },
  basketball: {
    primary: '#4CAF50',
    secondary: '#388E3C',
    light: '#E8F5E8',
    dark: '#1B5E20',
  },
  americanFootball: {
    primary: '#2196F3',
    secondary: '#1976D2',
    light: '#E3F2FD',
    dark: '#0D47A1',
  },
  baseball: {
    primary: '#4CAF50',
    secondary: '#388E3C',
    light: '#E8F5E8',
    dark: '#1B5E20',
  },
  tennis: {
    primary: '#4CAF50',
    secondary: '#388E3C',
    light: '#E8F5E8',
    dark: '#1B5E20',
  },
} as const;

// Simplified state color mappings
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

// Simplified Tailwind classes for sport colors
export const getSportClasses = (sport: SportType) => {
  const isGreen = sport === 'basketball' || sport === 'baseball' || sport === 'tennis';
  
  return {
    bg: isGreen ? 'bg-green-500' : 'bg-blue-500',
    bgSecondary: isGreen ? 'bg-green-600' : 'bg-blue-600',
    bgLight: isGreen ? 'bg-green-100' : 'bg-blue-100',
    bgDark: isGreen ? 'bg-green-900' : 'bg-blue-900',
    text: isGreen ? 'text-green-500' : 'text-blue-500',
    textSecondary: isGreen ? 'text-green-600' : 'text-blue-600',
    border: isGreen ? 'border-green-500' : 'border-blue-500',
    borderSecondary: isGreen ? 'border-green-600' : 'border-blue-600',
    button: isGreen ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600',
  };
};

// Simplified state classes
export const getStateClasses = (state: StateType) => {
  return {
    bg: `bg-${state}-500`,
    bgLight: `bg-${state}-100`,
    text: `text-${state}-500`,
    border: `border-${state}-500`,
  };
};

// Helper to get contrast text color
export const getContrastTextColor = (backgroundColor: string): 'text-white' | 'text-black' => {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'text-black' : 'text-white';
};

export default {
  getSportColor,
  getStateColor,
  getSportClasses,
  getStateClasses,
  getContrastTextColor,
};
