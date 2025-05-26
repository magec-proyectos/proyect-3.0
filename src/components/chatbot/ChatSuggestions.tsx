
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Lightbulb, TrendingUp, Settings } from 'lucide-react';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    {
      text: "How does this platform work?",
      icon: MessageSquare,
      category: "Getting Started"
    },
    {
      text: "What are the best practices?",
      icon: Lightbulb,
      category: "Tips"
    },
    {
      text: "Show me advanced features",
      icon: TrendingUp,
      category: "Features"
    },
    {
      text: "Help with account settings",
      icon: Settings,
      category: "Support"
    }
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Popular questions</h4>
      <div className="grid grid-cols-1 gap-2">
        {suggestions.map((suggestion, index) => {
          const IconComponent = suggestion.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                onClick={() => onSuggestionClick(suggestion.text)}
                className="w-full text-left p-3 h-auto bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <IconComponent size={14} className="text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">{suggestion.text}</div>
                    <div className="text-xs text-gray-500">{suggestion.category}</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSuggestions;
