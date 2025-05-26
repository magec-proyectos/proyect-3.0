
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Plus,
  Minimize2,
  Maximize2,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useChatbot } from '@/hooks/useChatbot';
import { useAuth } from '@/contexts/AuthContext';

const GlobalChatbot: React.FC = () => {
  const { user } = useAuth();
  const {
    isOpen,
    setIsOpen,
    settings,
    agents,
    conversations,
    messages,
    messagesLoading,
    startNewConversation,
    sendMessage,
    selectConversation,
    currentConversationId,
    isCreatingConversation,
    isSendingMessage
  } = useChatbot();

  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showAgentSelection, setShowAgentSelection] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Don't render if chatbot is disabled or user is not authenticated
  if (!settings?.global_enabled || !user) {
    return null;
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const messageToSend = inputMessage;
    setInputMessage('');
    
    try {
      await sendMessage(messageToSend);
    } catch (error) {
      console.error('Failed to send message:', error);
      setInputMessage(messageToSend); // Restore message on error
    }
  };

  const handleNewConversation = async (agentId?: string) => {
    setShowAgentSelection(false);
    await startNewConversation(agentId);
  };

  const currentAgent = agents?.find(agent => 
    conversations?.find(conv => conv.id === currentConversationId)?.agent_id === agent.id
  );

  const chatbotStyle = {
    position: 'fixed' as const,
    bottom: settings?.chatbot_position?.bottom || '24px',
    right: settings?.chatbot_position?.right || '24px',
    zIndex: 1000
  };

  return (
    <div style={chatbotStyle}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="w-80 h-96 bg-dark-card border-dark-border shadow-2xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-dark-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-soft-blue to-soft-cyan flex items-center justify-center">
                    <Headphones className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">
                      {currentAgent?.name || 'AI Assistant'}
                    </h3>
                    {currentAgent && (
                      <Badge variant="outline" className="text-xs">
                        {currentAgent.specialization}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Conversation Selector */}
                  <div className="p-2 border-b border-dark-border">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAgentSelection(!showAgentSelection)}
                        className="border-dark-border text-gray-400 hover:text-white flex-1"
                      >
                        <Plus size={16} className="mr-1" />
                        New Chat
                      </Button>
                    </div>

                    {showAgentSelection && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-1"
                      >
                        {agents?.map(agent => (
                          <Button
                            key={agent.id}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNewConversation(agent.id)}
                            className="w-full justify-start text-left text-gray-300 hover:text-white"
                          >
                            <div>
                              <div className="font-medium">{agent.name}</div>
                              <div className="text-xs text-gray-500">{agent.description}</div>
                            </div>
                          </Button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {messagesLoading ? (
                      <div className="flex items-center justify-center h-20">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-soft-blue"></div>
                      </div>
                    ) : messages?.length === 0 ? (
                      <div className="text-center text-gray-400 text-sm py-8">
                        {settings?.welcome_message || 'Hi! How can I help you today?'}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages?.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-2 ${
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {message.role === 'assistant' && (
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={currentAgent?.avatar_url} />
                                <AvatarFallback>
                                  <Bot size={12} />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`max-w-[80%] p-2 rounded-lg text-sm ${
                                message.role === 'user'
                                  ? 'bg-soft-blue text-white'
                                  : 'bg-dark-lighter text-gray-300'
                              }`}
                            >
                              {message.content}
                            </div>
                            {message.role === 'user' && (
                              <Avatar className="w-6 h-6">
                                <AvatarFallback>
                                  <User size={12} />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-dark-border">
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="bg-dark-lighter border-dark-border text-white placeholder-gray-400"
                        disabled={isSendingMessage || isCreatingConversation}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        disabled={!inputMessage.trim() || isSendingMessage || isCreatingConversation}
                        className="bg-soft-blue hover:bg-soft-blue/80"
                      >
                        {isSendingMessage || isCreatingConversation ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Send size={16} />
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-soft-blue to-soft-cyan shadow-2xl hover:shadow-3xl border-2 border-white/20 transition-all duration-300"
            >
              <Headphones size={28} className="text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalChatbot;
