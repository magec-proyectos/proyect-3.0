
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
  Zap,
  Users,
  TrendingUp,
  Shield,
  Clock,
  ChevronRight,
  Sparkles,
  Settings,
  History
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
  const [currentView, setCurrentView] = useState<'home' | 'chat' | 'help' | 'agents' | 'settings'>('home');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
    setIsMinimized(false);
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
      title: "Ask AI Assistant",
      subtitle: "Get instant answers to your questions",
      icon: MessageSquare,
      gradient: "from-blue-500 via-purple-500 to-indigo-600",
      action: () => {
        handleNewConversation();
        setCurrentView('chat');
      }
    },
    {
      title: "Browse Knowledge Base",
      subtitle: "Find detailed guides and tutorials",
      icon: BookOpen,
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      action: () => setCurrentView('help')
    },
    {
      title: "Choose AI Expert",
      subtitle: "Select specialized assistant for your needs",
      icon: Users,
      gradient: "from-orange-500 via-red-500 to-pink-600",
      action: () => setCurrentView('agents')
    }
  ];

  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics and set up your account quickly.",
      articles: "12 articles",
      icon: Play,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      estimated: "5 min read"
    },
    {
      title: "Advanced Features", 
      description: "Explore powerful tools and advanced functionality.",
      articles: "28 articles",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      estimated: "10 min read"
    },
    {
      title: "Best Practices",
      description: "Tips and strategies from our expert team.",
      articles: "15 articles",
      icon: Star,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      estimated: "7 min read"
    },
    {
      title: "Troubleshooting",
      description: "Quick solutions to common issues and problems.",
      articles: "22 articles",
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      estimated: "3 min read"
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
    <div style={chatbotStyle}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: isMinimized ? 0.3 : 1, 
              y: isMinimized ? 200 : 0 
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            {/* Sidebar */}
            <AnimatePresence>
              {showSidebar && !isMinimized && (
                <motion.div
                  initial={{ x: -340, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -340, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
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

            <Card className={`bg-white shadow-2xl flex flex-col overflow-hidden border-0 transition-all duration-300 ${
              isMinimized ? 'w-20 h-20 rounded-full' : 'w-80 md:w-96 h-[650px] rounded-2xl'
            }`}>
              {!isMinimized && (
                <>
                  {/* Enhanced Header */}
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
                            onClick={() => setCurrentView('home')}
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
                          onClick={() => setShowSidebar(!showSidebar)}
                          className="text-white hover:bg-white/20 p-2 h-auto rounded-lg"
                        >
                          <History size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMinimized(true)}
                          className="text-white hover:bg-white/20 p-2 h-auto rounded-lg"
                        >
                          <Minimize2 size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsOpen(false)}
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

                  {/* Content */}
                  <div className="flex-1 overflow-hidden bg-gray-50">
                    {/* Home View */}
                    {currentView === 'home' && (
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
                    )}

                    {/* Help View */}
                    {currentView === 'help' && (
                      <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-gray-200 bg-white">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Knowledge Base</h3>
                          <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              placeholder="Search for help articles..."
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
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <Card className="p-5 hover:shadow-lg transition-all cursor-pointer bg-white border-gray-200 group">
                                    <div className="flex items-start gap-4">
                                      <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        <IconComponent size={20} className={category.color} />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-2">{category.title}</h4>
                                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{category.description}</p>
                                        <div className="flex items-center gap-3">
                                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                            {category.articles}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs">
                                            {category.estimated}
                                          </Badge>
                                        </div>
                                      </div>
                                      <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    </div>
                                  </Card>
                                </motion.div>
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
                            <motion.div 
                              className="text-center py-12"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare size={24} className="text-white" />
                              </div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">Start a conversation</h4>
                              <p className="text-gray-600 text-sm max-w-xs mx-auto mb-4">
                                {settings?.welcome_message || 'Ask me anything! I\'m here to help you get the most out of our platform.'}
                              </p>
                              <div className="flex flex-wrap gap-2 justify-center">
                                {['How does it work?', 'Getting started', 'Best practices'].map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setInputMessage(suggestion)}
                                    className="text-xs"
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </motion.div>
                          ) : (
                            <div className="space-y-6">
                              {messages?.map((message, index) => (
                                <motion.div 
                                  key={message.id} 
                                  className="space-y-3"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
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
                                    <div className={`p-4 rounded-2xl text-sm transition-all ${
                                      message.role === 'user'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto max-w-[85%] rounded-br-md shadow-lg'
                                        : 'bg-gray-100 text-gray-900 max-w-[90%] rounded-bl-md hover:bg-gray-50'
                                    } ${message.is_streaming ? 'animate-pulse' : ''}`}>
                                      <div className="leading-relaxed">{message.content}</div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                              {isSendingMessage && <TypingIndicator />}
                              <div ref={messagesEndRef} />
                            </div>
                          )}
                        </ScrollArea>

                        {/* Enhanced Input */}
                        <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200 bg-white">
                          <div className="flex gap-3 items-end">
                            <div className="flex-1 relative">
                              <Input
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="pr-12 py-3 bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl transition-all"
                                disabled={isSendingMessage || isCreatingConversation}
                              />
                              <Button
                                type="submit"
                                size="sm"
                                disabled={!inputMessage.trim() || isSendingMessage || isCreatingConversation}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all"
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

                  {/* Enhanced Bottom Navigation */}
                  {currentView === 'home' && (
                    <div className="border-t border-gray-200 bg-white">
                      <div className="grid grid-cols-4 divide-x divide-gray-200">
                        <Button
                          variant="ghost"
                          className="h-16 flex flex-col items-center justify-center gap-2 rounded-none text-blue-600 bg-blue-50"
                        >
                          <MessageSquare size={18} />
                          <span className="text-xs font-medium">Home</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentView('chat')}
                          className="h-16 flex flex-col items-center justify-center gap-2 rounded-none text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <MessageSquare size={18} />
                          <span className="text-xs font-medium">Chat</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentView('help')}
                          className="h-16 flex flex-col items-center justify-center gap-2 rounded-none text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <HelpCircle size={18} />
                          <span className="text-xs font-medium">Help</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentView('agents')}
                          className="h-16 flex flex-col items-center justify-center gap-2 rounded-none text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Users size={18} />
                          <span className="text-xs font-medium">Experts</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Minimized State */}
              {isMinimized && (
                <motion.div
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={() => setIsMinimized(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageSquare size={24} className="text-blue-600" />
                </motion.div>
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
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-2xl hover:shadow-3xl border-0 transition-all duration-300 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 group"
            >
              <MessageSquare size={28} className="text-white group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalChatbot;
