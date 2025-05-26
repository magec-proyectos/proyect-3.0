
import { useState, useEffect } from 'react';

interface UseTypingAnimationProps {
  suggestions: string[];
  isActive: boolean;
}

export const useTypingAnimation = ({ suggestions, isActive }: UseTypingAnimationProps) => {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isActive && !isTyping) {
      const interval = setInterval(() => {
        const currentSuggestion = suggestions[currentSuggestionIndex];
        
        // Typing animation
        setIsTyping(true);
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= currentSuggestion.length) {
            setTypedText(currentSuggestion.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            
            // Wait before erasing
            setTimeout(() => {
              // Erasing animation
              const eraseInterval = setInterval(() => {
                if (charIndex > 0) {
                  charIndex--;
                  setTypedText(currentSuggestion.slice(0, charIndex));
                } else {
                  clearInterval(eraseInterval);
                  setIsTyping(false);
                  setCurrentSuggestionIndex((prev) => 
                    prev === suggestions.length - 1 ? 0 : prev + 1
                  );
                }
              }, 50);
            }, 2000);
          }
        }, 100);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [currentSuggestionIndex, isActive, isTyping, suggestions]);

  return { typedText };
};
