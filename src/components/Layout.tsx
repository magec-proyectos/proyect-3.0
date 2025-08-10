import { ReactNode } from 'react';
import { AccessibilityPanel } from '@/components/accessibility/AccessibilityPanel';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Enable keyboard shortcuts globally
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-background">
      {/* Global Accessibility Panel */}
      <AccessibilityPanel />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Main Content */}
      {children}
    </div>
  );
};