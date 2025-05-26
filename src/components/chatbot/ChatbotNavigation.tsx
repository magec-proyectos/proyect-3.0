
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, HelpCircle, Users } from 'lucide-react';

interface ChatbotNavigationProps {
  currentView: 'home' | 'chat' | 'help' | 'agents' | 'settings';
  onViewChange: (view: 'home' | 'chat' | 'help' | 'agents' | 'settings') => void;
}

export const ChatbotNavigation: React.FC<ChatbotNavigationProps> = ({
  currentView,
  onViewChange
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: MessageSquare },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'agents', label: 'Experts', icon: Users }
  ];

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="grid grid-cols-4 divide-x divide-gray-200">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onViewChange(item.id as any)}
              className={`h-16 flex flex-col items-center justify-center gap-2 rounded-none transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <IconComponent size={18} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
