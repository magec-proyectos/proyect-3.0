
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  TrendingUp, 
  Calculator, 
  BookOpen,
  MessageSquare,
  Lightbulb
} from 'lucide-react';

interface QuickSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: HelpCircle,
    text: "How can you help me?",
    category: "General"
  },
  {
    icon: TrendingUp,
    text: "Show me betting trends",
    category: "Sports"
  },
  {
    icon: Calculator,
    text: "Calculate my potential winnings",
    category: "Tools"
  },
  {
    icon: BookOpen,
    text: "Explain betting strategies",
    category: "Education"
  },
  {
    icon: MessageSquare,
    text: "What are the latest news?",
    category: "News"
  },
  {
    icon: Lightbulb,
    text: "Give me a betting tip",
    category: "Tips"
  }
];

export const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({
  onSuggestionClick
}) => {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-3"
    >
      <div className="text-center">
        <h4 className="text-sm font-medium text-gray-300 mb-2">
          Quick Suggestions
        </h4>
        <p className="text-xs text-gray-500">
          Try one of these to get started
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {suggestions.map((suggestion, index) => {
          const IconComponent = suggestion.icon;
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                onClick={() => onSuggestionClick(suggestion.text)}
                className="w-full justify-start h-auto p-3 border-dark-border text-gray-300 hover:text-white hover:bg-dark-lighter"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-soft-blue/20 flex items-center justify-center flex-shrink-0">
                    <IconComponent size={14} className="text-soft-blue" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{suggestion.text}</div>
                    <div className="text-xs text-gray-500">{suggestion.category}</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
