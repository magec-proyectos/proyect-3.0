// Helper functions for TryItNow component
export const getButtonStyle = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case 'basketball':
      return "bg-green-500 hover:bg-green-600 text-white";
    case 'americanFootball':
      return "bg-blue-500 hover:bg-blue-600 text-white";
    default:
      return "bg-blue-500 hover:bg-blue-600 text-white";
  }
};

export const getAccentColor = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "blue-500";
    case 'basketball':
      return "green-500";
    case 'americanFootball':
      return "blue-500";
    default:
      return "blue-500";
  }
};

export const getBorderColor = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "border-blue-500/30";
    case 'basketball':
      return "border-green-500/30";
    case 'americanFootball':
      return "border-blue-500/30";
    default:
      return "border-blue-500/30";
  }
};

// Function to get match name from value
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
  
  return mapping[value] || value;
};

// Get prediction confidence level for the UI
export const getPredictionConfidence = (activeSport: 'football' | 'basketball' | 'americanFootball'): {value: number, label: string, color: string} => {
  switch (activeSport) {
    case 'football':
      return { value: 78, label: 'High', color: 'text-blue-500' };
    case 'basketball':
      return { value: 65, label: 'Medium', color: 'text-green-500' };
    case 'americanFootball':
      return { value: 82, label: 'Very High', color: 'text-blue-500' };
    default:
      return { value: 75, label: 'High', color: 'text-blue-500' };
  }
};

// Animation variants - Enhanced for better UX
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      ease: "easeInOut"
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
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export const resultVariants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { type: "spring", stiffness: 300, damping: 25 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
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

// Utility function for sports background patterns
export const getSportPattern = (activeSport: 'football' | 'basketball' | 'americanFootball') => {
  switch (activeSport) {
    case 'football':
      return "url('/pattern-soccer.svg')";
    case 'basketball':
      return "url('/pattern-basketball.svg')";
    case 'americanFootball':
      return "url('/pattern-football.svg')";
    default:
      return "url('/pattern-soccer.svg')";
  }
};
