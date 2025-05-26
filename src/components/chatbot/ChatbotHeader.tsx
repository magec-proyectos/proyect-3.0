
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  X, 
  ArrowLeft, 
  Minimize2, 
  History, 
  Bot, 
  Sparkles 
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  specialization: string;
}

interface ChatbotHeaderProps {
  currentView: 'home' | 'chat' | 'help' | 'agents' | 'settings';
  currentAgent?: Agent;
  showSidebar: boolean;
  onViewChange: (view: 'home' | 'chat' | 'help' | 'agents' | 'settings') => void;
  onToggleSidebar: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  currentView,
  currentAgent,
  showSidebar,
  onViewChange,
  onToggleSidebar,
  onMinimize,
  onClose
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
      </div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {currentView !== 'home' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange('home')}
              className="text-white hover:bg-white/20 p-2 h-auto rounded-lg transition-all"
            >
              <ArrowLeft size={18} />
            </Button>
          )}
          {currentView === 'chat' && currentAgent && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <span className="font-semibold text-lg block">{currentAgent.name}</span>
                <span className="text-white/80 text-sm">{currentAgent.specialization}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-white hover:bg-white/20 p-2 h-auto rounded-lg"
          >
            <History size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="text-white hover:bg-white/20 p-2 h-auto rounded-lg"
          >
            <Minimize2 size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 h-auto rounded-lg"
          >
            <X size={18} />
          </Button>
        </div>
      </div>

      {currentView === 'home' && (
        <motion.div 
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles size={24} className="text-yellow-300" />
            AI Assistant
          </h2>
          <p className="text-white/90 text-sm">How can I help you today?</p>
        </motion.div>
      )}
    </div>
  );
};
