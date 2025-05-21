
// Helper functions for TryItNow component
export const getButtonStyle = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "bg-gradient-to-r from-neon-blue to-neon-blue/70 hover:from-neon-blue hover:to-neon-blue text-black";
    case 'basketball':
      return "bg-gradient-to-r from-neon-lime to-neon-lime/70 hover:from-neon-lime hover:to-neon-lime text-black";
    case 'americanFootball':
      return "bg-gradient-to-r from-purple-500 to-purple-500/70 hover:from-purple-500 hover:to-purple-500 text-white";
    default:
      return "bg-gradient-to-r from-neon-blue to-neon-blue/70 hover:from-neon-blue hover:to-neon-blue text-black";
  }
};

export const getAccentColor = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "neon-blue";
    case 'basketball':
      return "neon-lime";
    case 'americanFootball':
      return "purple-500";
    default:
      return "neon-blue";
  }
};

export const getBorderColor = (activeSport: 'football' | 'basketball' | 'americanFootball'): string => {
  switch (activeSport) {
    case 'football':
      return "border-neon-blue/20";
    case 'basketball':
      return "border-neon-lime/20";
    case 'americanFootball':
      return "border-purple-500/20";
    default:
      return "border-neon-blue/20";
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
      return { value: 78, label: 'High', color: 'text-neon-blue' };
    case 'basketball':
      return { value: 65, label: 'Medium', color: 'text-neon-lime' };
    case 'americanFootball':
      return { value: 82, label: 'Very High', color: 'text-purple-500' };
    default:
      return { value: 75, label: 'High', color: 'text-neon-blue' };
  }
};

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export const resultVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring", stiffness: 300, damping: 25 }
};

