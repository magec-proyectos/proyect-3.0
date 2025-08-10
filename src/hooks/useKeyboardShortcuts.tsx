import { useEffect } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export const useKeyboardShortcuts = () => {
  const { toggleHighContrast, increaseFontSize, decreaseFontSize } = useAccessibility();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Alt key is pressed
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case 'c':
            event.preventDefault();
            toggleHighContrast();
            break;
          case '=':
          case '+':
            event.preventDefault();
            increaseFontSize();
            break;
          case '-':
            event.preventDefault();
            decreaseFontSize();
            break;
        }
      }

      // Escape key to close panels
      if (event.key === 'Escape') {
        // Close any open panels
        const panels = document.querySelectorAll('[data-panel-open="true"]');
        panels.forEach(panel => {
          const closeBtn = panel.querySelector('[data-close-panel]') as HTMLElement;
          if (closeBtn) closeBtn.click();
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleHighContrast, increaseFontSize, decreaseFontSize]);
};

// Hook for managing focus trapping in modals/dialogs
export const useFocusTrap = (isActive: boolean, containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus first element when trap becomes active
    if (firstElement) {
      firstElement.focus();
    }

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive, containerRef]);
};