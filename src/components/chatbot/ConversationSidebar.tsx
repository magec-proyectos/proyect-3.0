
import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Plus, 
  MessageSquare, 
  Bot,
  Clock,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  id: string;
  title?: string;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  specialization: string;
  avatar_url?: string;
}

interface ConversationSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  agents: Agent[];
  onSelectConversation: (conversationId: string) => void;
  onNewConversation: (agentId?: string) => void;
  onClose: () => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  currentConversationId,
  agents,
  onSelectConversation,
  onNewConversation,
  onClose
}) => {
  const getAgentName = (agentId: string) => {
    return agents.find(agent => agent.id === agentId)?.name || 'AI Assistant';
  };

  const getConversationTitle = (conversation: Conversation) => {
    return conversation.title || `Chat with ${getAgentName(conversation.agent_id)}`;
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  return (
    <Card className="w-80 h-96 md:h-[32rem] bg-dark-card border-dark-border shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-soft-blue" size={20} />
          <h3 className="text-white font-medium">Conversations</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1"
        >
          <X size={16} />
        </Button>
      </div>

      {/* New Conversation Button */}
      <div className="p-4 border-b border-dark-border">
        <Button
          onClick={() => onNewConversation()}
          className="w-full bg-soft-blue hover:bg-soft-blue/80 text-white"
        >
          <Plus size={16} className="mr-2" />
          New Conversation
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {conversations.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
              No conversations yet
            </div>
          ) : (
            conversations.map((conversation) => {
              const isActive = conversation.id === currentConversationId;
              
              return (
                <motion.div
                  key={conversation.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onSelectConversation(conversation.id);
                      onClose();
                    }}
                    className={`w-full p-3 h-auto justify-start text-left ${
                      isActive 
                        ? 'bg-soft-blue/20 border-soft-blue/50 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-dark-lighter'
                    }`}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <Bot size={16} className="mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {getConversationTitle(conversation)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getAgentName(conversation.agent_id)}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={10} />
                            {formatTime(conversation.updated_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Footer with Agent Selection */}
      <div className="p-4 border-t border-dark-border">
        <div className="text-xs text-gray-400 mb-2">Quick Start</div>
        <div className="grid grid-cols-2 gap-2">
          {agents.slice(0, 4).map((agent) => (
            <Button
              key={agent.id}
              variant="outline"
              size="sm"
              onClick={() => {
                onNewConversation(agent.id);
                onClose();
              }}
              className="border-dark-border text-gray-400 hover:text-white h-auto p-2"
            >
              <div className="text-center">
                <div className="text-xs font-medium truncate">{agent.name}</div>
                <div className="text-xs text-gray-500 truncate">{agent.specialization}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
