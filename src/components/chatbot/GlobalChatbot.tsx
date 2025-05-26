
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
  Minimize2,
  Play,
  BookOpen,
  Lightbulb,
  Star,
  Zap
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
    await startNewConversation(agentId);
    setCurrentView('chat');
  };

  const handleOpenChatbot = () => {
    setIsOpen(true);
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
      title: "Start a conversation",
      subtitle: "Ask our AI assistant anything",
      icon: MessageSquare,
      color: "from-blue-500 to-purple-600",
      action: () => setCurrentView('chat')
    },
    {
      title: "Browse help articles",
      subtitle: "Find answers in our knowledge base",
      icon: BookOpen,
      color: "from-green-500 to-blue-500",
      action: () => setCurrentView('help')
    }
  ];

  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using our platform and getting set up.",
      articles: "12 articles",
      icon: Play,
      color: "text-blue-600"
    },
    {
      title: "Features & Tools", 
      description: "Explore advanced features and learn how to use our tools effectively.",
      articles: "28 articles",
      icon: Zap,
      color: "text-purple-600"
    },
    {
      title: "Best Practices",
      description: "Tips and strategies to get the most out of our platform.",
      articles: "15 articles",
      icon: Star,
      color: "text-orange-600"
    },
    {
      title: "Troubleshooting",
      description: "Common issues and how to resolve them quickly.",
      articles: "22 articles",
      icon: Lightbulb,
      color: "text-green-600"
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

            <Card className="w-80 md:w-96 h-[600px] bg-white shadow-2xl flex flex-col overflow-hidden border-0">
              {/* Header with Synthesia-style gradient */}
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  {currentView !== 'home' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentView('home')}
                      className="text-white hover:bg-white/20 p-2 h-auto"
                    >
                      <ArrowLeft size={20} />
                    </Button>
                  )}
                  <div className="flex-1 text-center">
                    {currentView === 'chat' && currentAgent && (
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <Bot size={18} className="text-white" />
                        </div>
                        <div className="text-left">
                          <span className="font-semibold text-lg block">{currentAgent.name}</span>
                          <span className="text-white/80 text-sm">{currentAgent.specialization}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 p-2 h-auto"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {currentView === 'home' && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">How can we help?</h2>
                    <p className="text-white/90 text-sm">Get instant support from our AI assistant</p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden bg-gray-50">
                {/* Home View */}
                {currentView === 'home' && (
                  <div className="p-6 space-y-6 h-full overflow-y-auto">
                    {/* Featured Updates */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Latest Updates</h3>
                      
                      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Star size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">New AI Features Available</h4>
                            <p className="text-sm text-gray-700">Discover enhanced AI capabilities and improved response accuracy...</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Zap size={16} className="text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Platform Performance Update</h4>
                            <p className="text-sm text-gray-700">Experience faster load times and improved reliability...</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quick Actions</h3>
                      <div className="space-y-3">
                        {quickActions.map((action, index) => {
                          const IconComponent = action.icon;
                          return (
                            <Card
                              key={index}
                              className="p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-gray-200 bg-white"
                              onClick={action.action}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-sm`}>
                                  <IconComponent size={20} className="text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                                  <p className="text-sm text-gray-600">{action.subtitle}</p>
                                </div>
                                <ArrowLeft size={16} className="text-gray-400 rotate-180" />
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Help View */}
                {currentView === 'help' && (
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-200 bg-white">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Help Center</h3>
                      <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search for help..."
                          className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <ScrollArea className="flex-1 p-6">
                      <div className="space-y-6">
                        <div className="text-sm text-gray-600 mb-4">{helpCategories.length} categories • 77 articles</div>
                        {helpCategories.map((category, index) => {
                          const IconComponent = category.icon;
                          return (
                            <Card key={index} className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border-gray-200">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <IconComponent size={18} className={category.color} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-2">{category.title}</h4>
                                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{category.description}</p>
                                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                    {category.articles}
                                  </Badge>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Chat View */}
                {currentView === 'chat' && (
                  <>
                    <ScrollArea className="flex-1 p-6 bg-white">
                      {messagesLoading ? (
                        <div className="flex items-center justify-center h-32">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      ) : messages?.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare size={24} className="text-blue-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Start a conversation</h4>
                          <p className="text-gray-600 text-sm max-w-xs mx-auto">
                            {settings?.welcome_message || 'Ask me anything! I\'m here to help you get the most out of our platform.'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {messages?.map((message) => (
                            <div key={message.id} className="space-y-3">
                              {message.role === 'assistant' && (
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                    <Bot size={14} className="text-white" />
                                  </div>
                                  <span className="font-medium">{currentAgent?.name || 'AI Assistant'}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-400">Just now</span>
                                </div>
                              )}
                              <div className={`${message.role === 'user' ? 'ml-8' : ''}`}>
                                <div className={`p-4 rounded-2xl text-sm ${
                                  message.role === 'user'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto max-w-[85%] rounded-br-md'
                                    : 'bg-gray-100 text-gray-900 max-w-[90%] rounded-bl-md'
                                } ${message.is_streaming ? 'animate-pulse' : ''}`}>
                                  <div className="leading-relaxed">{message.content}</div>
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
                    <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200 bg-white">
                      <div className="flex gap-3 items-end">
                        <div className="flex-1 relative">
                          <Input
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="pr-12 py-3 bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl"
                            disabled={isSendingMessage || isCreatingConversation}
                          />
                          <Button
                            type="submit"
                            size="sm"
                            disabled={!inputMessage.trim() || isSendingMessage || isCreatingConversation}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg"
                          >
                            <Send size={14} />
                          </Button>
                        </div>
                      </div>
                    </form>
                  </>
                )}

                {/* Agents View */}
                {currentView === 'agents' && (
                  <div className="p-6 bg-white">
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
                  <div className="grid grid-cols-3 divide-x divide-gray-200">
                    <Button
                      variant="ghost"
                      className="h-16 flex flex-col items-center justify-center gap-2 rounded-none text-blue-600 hover:bg-blue-50"
                    >
                      <MessageSquare size={20} />
                      <span className="text-xs font-medium">Home</span>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView('chat')}
                      className="h-16 flex flex-col items-center justify-center gap-2 rounded-none text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    >
                      <MessageSquare size={20} />
                      <span className="text-xs font-medium">Chat</span>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentView('help')}
                      className="h-16 flex flex-col items-center justify-center gap-2 rounded-none text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    >
                      <HelpCircle size={20} />
                      <span className="text-xs font-medium">Help</span>
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
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-2xl hover:shadow-3xl border-0 transition-all duration-300 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700"
            >
              <MessageSquare size={28} className="text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalChatbot;
