
import { getSportClasses } from '@/utils/colorUtils';

// Helper functions for TryItNow component with solid colors
export const getButtonStyle = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  const sportClasses = getSportClasses(activeSport);
  return `${sportClasses.solid} transition-all duration-300 transform hover:scale-105 shadow-lg hover:${sportClasses.glow}`;
};

export const getAccentColor = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  const colorMap = {
    football: "blue-600", // Solid blue
    basketball: "orange-600", // Solid orange
    americanFootball: "purple-600" // Solid purple
  };
  return colorMap[activeSport];
};

export const getBorderColor = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  const colorMap = {
    football: "border-blue-600/30 hover:border-blue-600/60",
    basketball: "border-orange-600/30 hover:border-orange-600/60",
    americanFootball: "border-purple-600/30 hover:border-purple-600/60"
  };
  return colorMap[activeSport];
};

// Enhanced match name mapping
export const getMatchName = (value: string): string => {
  const mapping: Record<string, string> = {
    'liverpool_vs_arsenal': 'Liverpool vs Arsenal',
    'mancity_vs_chelsea': 'Man City vs Chelsea', 
    'barcelona_vs_realmadrid': 'Barcelona vs Real Madrid',
    'lakers_vs_celtics': 'Lakers vs Celtics',
    'bulls_vs_heat': 'Bulls vs Heat',
    'warriors_vs_nets': 'Warriors vs Nets',
    'chiefs_vs_eagles': 'Chiefs vs Eagles',
    'cowboys_vs_giants': 'Cowboys vs Giants',
    'packers_vs_bears': 'Packers vs Bears'
  };
  
  return mapping[value] || value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Enhanced prediction confidence with sport-specific variations and solid colors
export const getPredictionConfidence = (activeSport: 'football' | 'basketball' | 'americanFootball'): {value: number, label: string, color: string} => {
  const confidenceMap = {
    football: { value: 78, label: 'High', color: 'text-blue-600' },
    basketball: { value: 85, label: 'Very High', color: 'text-orange-600' },
    americanFootball: { value: 82, label: 'Very High', color: 'text-purple-600' }
  };
  
  return confidenceMap[activeSport];
};

// Enhanced animation variants with better performance
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      ease: "easeInOut",
      duration: 0.3
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export const resultVariants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring", 
      stiffness: 300, 
      damping: 25,
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  }
};

export const pulseAnimation = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(var(--color-rgb), 0)",
      "0 0 0 10px rgba(var(--color-rgb), 0.2)",
      "0 0 0 0 rgba(var(--color-rgb), 0)"
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Enhanced utility function for sports background patterns
export const getSportPattern = (activeSport: 'football' | 'basketball' | 'americanFootball') => {
  const patterns = {
    football: "url('/pattern-soccer.svg')",
    basketball: "url('/pattern-basketball.svg')",
    americanFootball: "url('/pattern-football.svg')"
  };
  return patterns[activeSport];
};

// Solid color gradients for backgrounds
export const getSportGradient = (activeSport: 'football' | 'basketball' | 'americanFootball') => {
  const gradients = {
    football: 'from-blue-600/30 to-blue-600/5',
    basketball: 'from-orange-600/30 to-orange-600/5', 
    americanFootball: 'from-purple-600/30 to-purple-600/5'
  };
  return gradients[activeSport];
};

// Enhanced loading states
export const loadingVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Interactive feedback utilities with solid colors
export const getHoverEffect = (sport: 'football' | 'basketball' | 'americanFootball') => {
  const effects = {
    football: 'hover:shadow-blue-600/20 hover:border-blue-600/60',
    basketball: 'hover:shadow-orange-600/20 hover:border-orange-600/60',
    americanFootball: 'hover:shadow-purple-600/20 hover:border-purple-600/60'
  };
  return effects[sport];
};
