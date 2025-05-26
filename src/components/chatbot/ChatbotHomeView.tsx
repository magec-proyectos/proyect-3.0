
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  BookOpen, 
  Users, 
  ChevronRight, 
  Play, 
  Zap, 
  Star, 
  Shield, 
  Clock, 
  TrendingUp 
} from 'lucide-react';

interface ChatbotHomeViewProps {
  onNewConversation: (agentId?: string) => void;
  onViewChange: (view: 'home' | 'chat' | 'help' | 'agents' | 'settings') => void;
}

export const ChatbotHomeView: React.FC<ChatbotHomeViewProps> = ({
  onNewConversation,
  onViewChange
}) => {
  const quickActions = [
    {
      title: "Ask AI Assistant",
      subtitle: "Get instant answers to your questions",
      icon: MessageSquare,
      gradient: "from-blue-500 via-purple-500 to-indigo-600",
      action: () => {
        onNewConversation();
        onViewChange('chat');
      }
    },
    {
      title: "Browse Knowledge Base",
      subtitle: "Find detailed guides and tutorials",
      icon: BookOpen,
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      action: () => onViewChange('help')
    },
    {
      title: "Choose AI Expert",
      subtitle: "Select specialized assistant for your needs",
      icon: Users,
      gradient: "from-orange-500 via-red-500 to-pink-600",
      action: () => onViewChange('agents')
    }
  ];

  const recentUpdates = [
    {
      title: "Enhanced AI Performance",
      description: "Our AI now provides 40% faster responses with improved accuracy",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      time: "2 hours ago"
    },
    {
      title: "New Knowledge Base",
      description: "Added 50+ new articles covering advanced topics",
      icon: BookOpen,
      color: "text-green-500", 
      bgColor: "bg-green-500/10",
      time: "1 day ago"
    }
  ];

  return (
    <ScrollArea className="h-full p-6">
      <div className="space-y-6">
        {/* Recent Updates */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <Clock size={16} />
            Recent Updates
          </h3>
          
          {recentUpdates.map((update, index) => {
            const IconComponent = update.icon;
            return (
              <Card key={index} className={`p-4 ${update.bgColor} border-0 hover:shadow-md transition-all cursor-pointer`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${update.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent size={16} className={update.color} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{update.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {update.time}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className="p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border-gray-200 bg-white group"
                    onClick={action.action}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.subtitle}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </ScrollArea>
  );
};
