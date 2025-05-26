
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowLeft,
  Search,
  HelpCircle,
  MessageSquare,
  Minimize2
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
import { AgentSelector } from './AgentSelector';

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
  const [currentView, setCurrentView] = useState<'home' | 'chat' | 'help' | 'agents'>('home');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      setCurrentView('chat');
    } catch (error) {
      console.error('Failed to send message:', error);
      setInputMessage(messageToSend);
    }
  };

  const handleNewConversation = async (agentId?: string) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    await startNewConversation(agentId);
    setCurrentView('chat');
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

  const quickActions = [
    {
      title: "Hacer una pregunta",
      icon: HelpCircle,
      action: () => setCurrentView('chat')
    },
    {
      title: "Buscar ayuda",
      icon: Search,
      action: () => setCurrentView('help')
    }
  ];

  const helpCategories = [
    {
      title: "Video",
      description: "Learn how to create videos in our platform.",
      articles: "76 artículos"
    },
    {
      title: "Audio", 
      description: "Learn how to select a language and accent, add soundtracks, adjust pronunciation and more.",
      articles: "21 artículos"
    },
    {
      title: "Avatars",
      description: "Learn all about our stock and custom avatars, how to use them, how they are created and more.",
      articles: "27 artículos"
    },
    {
      title: "Sports Betting",
      description: "Learn about betting strategies, odds calculation and more.",
      articles: "15 artículos"
    }
  ];

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
                    onSelectConversation={(id) => {
                      selectConversation(id);
                      setCurrentView('chat');
                      setShowSidebar(false);
                    }}
                    onNewConversation={handleNewConversation}
                    onUpdateConversation={updateConversation}
                    onDeleteConversation={deleteConversation}
                    onClose={() => setShowSidebar(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Card className="w-80 md:w-96 h-[500px] bg-white shadow-2xl flex flex-col overflow-hidden">
              {/* Header with gradient like Synthesia */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-4 text-white">
                <div className="flex items-center justify-between mb-4">
                  {currentView !== 'home' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentView('home')}
                      className="text-white hover:bg-white/20 p-2"
                    >
                      <ArrowLeft size={20} />
                    </Button>
                  )}
                  <div className="flex-1 text-center">
                    {currentView === 'chat' && currentAgent && (
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                        <span className="font-medium">{currentAgent.name}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {currentView === 'home' && (
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">¿Cómo podemos ayudarte?</h2>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                {/* Home View */}
                {currentView === 'home' && (
                  <div className="p-4 space-y-4">
                    {!user && showLoginPrompt && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-center text-sm text-blue-800 mb-3">
                          Please log in to use the AI assistant
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowLoginPrompt(false);
                            setIsOpen(false);
                          }}
                          className="w-full"
                        >
                          Log In
                        </Button>
                      </div>
                    )}

                    {/* Update Cards */}
                    <div className="space-y-3">
                      <Card className="p-4 bg-gray-50 border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-1">Knowledge Base Update: Video Translations</h3>
                        <p className="text-sm text-gray-600">Great news - all our videos in our knowledge base are now...</p>
                      </Card>

                      <Card className="p-4 bg-gray-50 border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-1">Sports Betting Status</h3>
                        <p className="text-sm text-gray-600">Keep up to date with the latest betting platform updates</p>
                      </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      {quickActions.map((action, index) => {
                        const IconComponent = action.icon;
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={action.action}
                            className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <IconComponent size={16} className="text-blue-600" />
                              </div>
                              <span className="text-gray-900">{action.title}</span>
                            </div>
                            <div className="ml-auto">
                              {action.title === "Hacer una pregunta" && (
                                <HelpCircle size={16} className="text-blue-600" />
                              )}
                              {action.title === "Buscar ayuda" && (
                                <Search size={16} className="text-blue-600" />
                              )}
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Help View */}
                {currentView === 'help' && (
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 text-center">Ayuda</h3>
                      <div className="mt-3">
                        <Input
                          placeholder="Buscar ayuda"
                          className="bg-gray-50 border-gray-200"
                        />
                      </div>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        <div className="text-sm text-gray-600 mb-4">{helpCategories.length} colecciones</div>
                        {helpCategories.map((category, index) => (
                          <div key={index} className="border-b border-gray-100 pb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{category.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                            <span className="text-xs text-gray-500">{category.articles}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Chat View */}
                {currentView === 'chat' && (
                  <>
                    <ScrollArea className="flex-1 p-4">
                      {!user ? (
                        <div className="text-center text-gray-500 text-sm py-8">
                          Welcome! Please log in to start chatting with our AI assistant.
                        </div>
                      ) : messagesLoading ? (
                        <div className="flex items-center justify-center h-20">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        </div>
                      ) : messages?.length === 0 ? (
                        <div className="space-y-4">
                          <div className="text-center text-gray-500 text-sm py-8">
                            {settings?.welcome_message || 'Hi! How can I help you today?'}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {messages?.map((message) => (
                            <div key={message.id} className="space-y-2">
                              {message.role === 'assistant' && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Bot size={12} className="text-blue-600" />
                                  </div>
                                  <span className="font-medium">{currentAgent?.name || 'AI Agent'}</span>
                                </div>
                              )}
                              <div className={`${message.role === 'user' ? 'ml-8' : ''}`}>
                                <div className={`p-3 rounded-lg text-sm ${
                                  message.role === 'user'
                                    ? 'bg-blue-600 text-white ml-auto max-w-[80%]'
                                    : 'bg-gray-100 text-gray-900 max-w-[90%]'
                                } ${message.is_streaming ? 'animate-pulse' : ''}`}>
                                  {message.content}
                                </div>
                              </div>
                            </div>
                          ))}
                          {isSendingMessage && <TypingIndicator />}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </ScrollArea>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="flex gap-2 items-center">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder={user ? "Haz una pregunta..." : "Please log in to chat..."}
                          className="flex-1 bg-white border-gray-200"
                          disabled={!user || isSendingMessage || isCreatingConversation}
                        />
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-gray-600 p-2"
                          >
                            😊
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-gray-600 p-2"
                          >
                            📎
                          </Button>
                        </div>
                      </div>
                    </form>
                  </>
                )}

                {/* Agents View */}
                {currentView === 'agents' && (
                  <div className="p-4">
                    <AgentSelector
                      agents={agents || []}
                      onSelectAgent={(agentId) => {
                        handleNewConversation(agentId);
                        setCurrentView('chat');
                      }}
                      currentAgentId={currentAgent?.id}
                    />
                  </div>
                )}
              </div>

              {/* Bottom Navigation - Synthesia Style */}
              {currentView === 'home' && (
                <div className="border-t border-gray-200 bg-white">
                  <div className="grid grid-cols-3">
                    <Button
                      variant="ghost"
                      className="h-16 flex flex-col items-center justify-center gap-1 rounded-none text-blue-600"
                    >
                      <MessageSquare size={20} />
                      <span className="text-xs">Inicio</span>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView('chat')}
                      className="h-16 flex flex-col items-center justify-center gap-1 rounded-none text-gray-500 hover:text-gray-700"
                    >
                      <MessageSquare size={20} />
                      <span className="text-xs">Mensajes</span>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView('help')}
                      className="h-16 flex flex-col items-center justify-center gap-1 rounded-none text-gray-500 hover:text-gray-700"
                    >
                      <HelpCircle size={20} />
                      <span className="text-xs">Ayuda</span>
                    </Button>
                  </div>
                </div>
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
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl hover:shadow-3xl border-2 border-white/20 transition-all duration-300"
            >
              <HelpCircle size={28} className="text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalChatbot;
