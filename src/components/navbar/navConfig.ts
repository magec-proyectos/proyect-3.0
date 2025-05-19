
import { ReactNode } from 'react';
import { 
  Home, 
  Share2 
} from 'lucide-react';
import { 
  SportIcon, 
  FootballIcon, 
  BasketballIcon, 
  AmericanFootballIcon, 
  CasinoIcon, 
  BlackjackIcon, 
  RouletteIcon 
} from './NavbarIcons';

export interface NavItem {
  path: string;
  label: string;
  icon: IconDefinition;
  subItems?: SubNavItem[];
}

export interface SubNavItem {
  path: string;
  label: string;
  icon: IconDefinition;
}

// Define a type for our icon definition
export interface IconDefinition {
  type: any;
  props: {
    size: number;
    className: string;
  };
}

// Helper function to create icon elements
const createIcon = (Icon: any, size: number = 18, className: string = "text-neon-blue"): IconDefinition => {
  return {
    type: Icon,
    props: { size, className }
  };
};

export const navItems: NavItem[] = [
  { 
    path: '/', 
    label: 'Home', 
    icon: createIcon(Home)
  },
  { 
    path: '/sports', 
    label: 'Sports', 
    icon: createIcon(SportIcon),
    subItems: [
      { path: '/football', label: 'Football', icon: createIcon(FootballIcon) },
      { path: '/basketball', label: 'Basketball', icon: createIcon(BasketballIcon) },
      { path: '/american-football', label: 'American Football', icon: createIcon(AmericanFootballIcon) }
    ]
  },
  { 
    path: '/casino', 
    label: 'Casino', 
    icon: createIcon(CasinoIcon),
    subItems: [
      { path: '/blackjack', label: 'Blackjack', icon: createIcon(BlackjackIcon) },
      { path: '/roulette', label: 'Roulette', icon: createIcon(RouletteIcon) }
    ]
  },
  { 
    path: '/social', 
    label: 'Community', 
    icon: createIcon(Share2)
  },
];
