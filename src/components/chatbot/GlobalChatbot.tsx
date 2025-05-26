
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
  History,
  ChevronLeft,
  MessageSquare,
  Settings,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useChatbot } from '@/hooks/useChatbot';
import { useAuth } from '@/contexts/AuthContext';
import { ConversationSidebar } from './ConversationSidebar';
import { TypingIndicator } from './TypingIndicator';
import { QuickSuggestions } from './QuickSuggestions';
import { AgentSelector } from './AgentSelector';
import { SettingsPanel } from './SettingsPanel';

const GlobalChatbot: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
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
    updateConversation,
    deleteConversation,
    currentConversationId,
    isCreatingConversation,
    isSendingMessage
  } = useChatbot();

  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showAgentSelection, setShowAgentSelection] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Touch gesture handling for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);

    if (!isVerticalSwipe) {
      if (isRightSwipe && !showSidebar) {
        setShowSidebar(true);
      } else if (isLeftSwipe && showSidebar) {
        setShowSidebar(false);
      }
    }
  };

  // Debug logging
  useEffect(() => {
    console.log('GlobalChatbot Debug:', {
      authLoading,
      user: !!user,
      settings: !!settings,
      settingsEnabled: settings?.global_enabled,
      shouldRender: !authLoading && (!!settings?.global_enabled || settings === undefined)
    });
  }, [authLoading, user, settings]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing when sending message
  useEffect(() => {
    if (isSendingMessage) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [isSendingMessage]);

  const shouldShowChatbot = !authLoading && (settings?.global_enabled !== false);

  if (!shouldShowChatbot) {
    return null;
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    const messageToSend = inputMessage;
    setInputMessage('');
    
    try {
      await sendMessage(messageToSend);
    } catch (error) {
      console.error('Failed to send message:', error);
      setInputMessage(messageToSend);
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleNewConversation = async (agentId?: string) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    setShowAgentSelection(false);
    await startNewConversation(agentId);
  };

  const handleOpenChatbot = () => {
    setIsOpen(true);
    if (!user) {
      setShowLoginPrompt(true);
    }
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
            className="relative"
          >
            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ x: 320, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 320, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-full ml-4 top-0"
                >
                  <SettingsPanel onClose={() => setShowSettings(false)} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
              {showSidebar && (
                <motion.div
                  initial={{ x: -320, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -320, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-full mr-4 top-0"
                >
                  <ConversationSidebar
                    conversations={conversations || []}
                    currentConversationId={currentConversationId}
                    agents={agents || []}
                    onSelectConversation={selectConversation}
                    onNewConversation={handleNewConversation}
                    onUpdateConversation={updateConversation}
                    onDeleteConversation={deleteConversation}
                    onClose={() => setShowSidebar(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Card 
              className="w-80 md:w-96 h-96 md:h-[32rem] bg-dark-card border-dark-border shadow-2xl flex flex-col"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-dark-border">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="text-gray-400 hover:text-white p-1 md:hidden"
                  >
                    <History size={16} />
                  </Button>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-soft-blue to-soft-cyan flex items-center justify-center">
                    <Bot className="text-white" size={16} />
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
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="text-gray-400 hover:text-white p-1 hidden md:flex"
                  >
                    <History size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <Settings size={16} />
                  </Button>
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
                  {/* Login Prompt for Unauthenticated Users */}
                  {showLoginPrompt && !user && (
                    <div className="p-4 bg-dark-lighter border-b border-dark-border">
                      <div className="text-center text-sm text-gray-300 mb-3">
                        Please log in to use the AI assistant
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowLoginPrompt(false);
                          setIsOpen(false);
                        }}
                        className="w-full border-dark-border text-gray-400 hover:text-white"
                      >
                        Log In
                      </Button>
                    </div>
                  )}

                  {/* Agent Selection and Conversation Controls - Only show if user is authenticated */}
                  {user && (
                    <div className="p-2 border-b border-dark-border">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAgentSelection(!showAgentSelection)}
                          className="border-dark-border text-gray-400 hover:text-white"
                        >
                          <Users size={16} className="mr-1" />
                          Agents
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleNewConversation()}
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
                          className="mt-3"
                        >
                          <AgentSelector
                            agents={agents || []}
                            onSelectAgent={(agentId) => {
                              handleNewConversation(agentId);
                              setShowAgentSelection(false);
                            }}
                            currentAgentId={currentAgent?.id}
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {!user ? (
                      <div className="text-center text-gray-400 text-sm py-8">
                        Welcome! Please log in to start chatting with our AI assistant.
                      </div>
                    ) : messagesLoading ? (
                      <div className="flex items-center justify-center h-20">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-soft-blue"></div>
                      </div>
                    ) : messages?.length === 0 ? (
                      <div className="space-y-4">
                        <div className="text-center text-gray-400 text-sm py-8">
                          {settings?.welcome_message || 'Hi! How can I help you today?'}
                        </div>
                        <QuickSuggestions onSuggestionClick={handleQuickSuggestion} />
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
                              } ${message.is_streaming ? 'animate-pulse' : ''}`}
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
                        {isTyping && <TypingIndicator />}
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
                        placeholder={user ? "Type your message..." : "Please log in to chat..."}
                        className="bg-dark-lighter border-dark-border text-white placeholder-gray-400"
                        disabled={!user || isSendingMessage || isCreatingConversation}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        disabled={!user || !inputMessage.trim() || isSendingMessage || isCreatingConversation}
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
              onClick={handleOpenChatbot}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-soft-blue to-soft-cyan shadow-2xl hover:shadow-3xl border-2 border-white/20 transition-all duration-300"
            >
              <Bot size={28} className="text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalChatbot;
