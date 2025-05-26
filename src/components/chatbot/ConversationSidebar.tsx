
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Plus, 
  MessageSquare, 
  Bot,
  Clock,
  Trash2,
  Edit3,
  Check,
  Search,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  onUpdateConversation: (conversationId: string, title: string) => void;
  onDeleteConversation: (conversationId: string) => void;
  onClose: () => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  currentConversationId,
  agents,
  onSelectConversation,
  onNewConversation,
  onUpdateConversation,
  onDeleteConversation,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

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

  const filteredConversations = conversations.filter(conv => 
    getConversationTitle(conv).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getAgentName(conv.agent_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEditing = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditTitle(getConversationTitle(conversation));
  };

  const saveEdit = () => {
    if (editingId && editTitle.trim()) {
      onUpdateConversation(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
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

      {/* Search */}
      <div className="p-4 border-b border-dark-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-dark-lighter border-dark-border text-white placeholder-gray-400"
          />
        </div>
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
          {filteredConversations.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const isActive = conversation.id === currentConversationId;
              const isEditing = editingId === conversation.id;
              
              return (
                <motion.div
                  key={conversation.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      isActive 
                        ? 'bg-soft-blue/20 border-soft-blue/50 text-white' 
                        : 'bg-dark-lighter border-dark-border text-gray-300 hover:text-white hover:bg-dark-lighter/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Bot size={16} className="mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <div className="space-y-2">
                            <Input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="h-8 text-sm bg-dark-card border-dark-border"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEdit();
                                if (e.key === 'Escape') cancelEdit();
                              }}
                              autoFocus
                            />
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" onClick={saveEdit} className="h-6 px-2">
                                <Check size={12} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={cancelEdit} className="h-6 px-2">
                                <X size={12} />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div 
                              className="font-medium truncate cursor-pointer"
                              onClick={() => {
                                onSelectConversation(conversation.id);
                                onClose();
                              }}
                            >
                              {getConversationTitle(conversation)}
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {getAgentName(conversation.agent_id)}
                                </Badge>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock size={10} />
                                  {formatTime(conversation.updated_at)}
                                </span>
                              </div>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MoreVertical size={12} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-dark-card border-dark-border">
                                  <DropdownMenuItem 
                                    onClick={() => startEditing(conversation)}
                                    className="text-gray-300 hover:text-white"
                                  >
                                    <Edit3 size={14} className="mr-2" />
                                    Rename
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => onDeleteConversation(conversation.id)}
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <Trash2 size={14} className="mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
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
