// Helper functions for TryItNow component
export const getButtonStyle = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "bg-gradient-to-r from-soft-blue to-soft-cyan hover:from-soft-blue hover:to-soft-cyan text-white shadow-md shadow-soft-blue/20";
    case 'basketball':
      return "bg-gradient-to-r from-soft-green to-soft-lime hover:from-soft-green hover:to-soft-lime text-white shadow-md shadow-soft-green/20";
    case 'americanFootball':
      return "bg-gradient-to-r from-soft-purple-400 to-soft-purple-500 hover:from-soft-purple-400 hover:to-soft-purple-500 text-white shadow-md shadow-purple-400/20";
    default:
      return "bg-gradient-to-r from-soft-blue to-soft-cyan hover:from-soft-blue hover:to-soft-cyan text-white shadow-md shadow-soft-blue/20";
  }
};

export const getAccentColor = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "soft-blue";
    case 'basketball':
      return "soft-green";
    case 'americanFootball':
      return "purple-400";
    default:
      return "soft-blue";
  }
};

export const getBorderColor = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "border-soft-blue/30";
    case 'basketball':
      return "border-soft-green/30";
    case 'americanFootball':
      return "border-purple-400/30";
    default:
      return "border-soft-blue/30";
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
      return { value: 78, label: 'High', color: 'text-soft-blue' };
    case 'basketball':
      return { value: 65, label: 'Medium', color: 'text-soft-green' };
    case 'americanFootball':
      return { value: 82, label: 'Very High', color: 'text-purple-400' };
    default:
      return { value: 75, label: 'High', color: 'text-soft-blue' };
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
