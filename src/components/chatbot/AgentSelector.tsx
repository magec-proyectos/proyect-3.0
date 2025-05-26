
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Bot, Sparkles, TrendingUp, Calculator, BookOpen } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  specialization: string;
  avatar_url?: string;
}

interface AgentSelectorProps {
  agents: Agent[];
  onSelectAgent: (agentId: string) => void;
  currentAgentId?: string;
}

const getSpecializationIcon = (specialization: string) => {
  switch (specialization.toLowerCase()) {
    case 'sports':
      return TrendingUp;
    case 'betting':
      return Calculator;
    case 'general':
      return Bot;
    case 'education':
      return BookOpen;
    default:
      return Sparkles;
  }
};

const getSpecializationColor = (specialization: string) => {
  switch (specialization.toLowerCase()) {
    case 'sports':
      return 'bg-green-500/20 text-green-400';
    case 'betting':
      return 'bg-blue-500/20 text-blue-400';
    case 'general':
      return 'bg-gray-500/20 text-gray-400';
    case 'education':
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-soft-blue/20 text-soft-blue';
  }
};

export const AgentSelector: React.FC<AgentSelectorProps> = ({
  agents,
  onSelectAgent,
  currentAgentId
}) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-3"
    >
      <div className="text-center mb-4">
        <h4 className="text-sm font-medium text-gray-300 mb-1">
          Choose Your AI Assistant
        </h4>
        <p className="text-xs text-gray-500">
          Each agent specializes in different areas
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {agents.map((agent) => {
          const IconComponent = getSpecializationIcon(agent.specialization);
          const isSelected = agent.id === currentAgentId;
          
          return (
            <motion.div
              key={agent.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'bg-soft-blue/20 border-soft-blue/50' 
                    : 'bg-dark-lighter border-dark-border hover:bg-dark-lighter/80'
                }`}
                onClick={() => onSelectAgent(agent.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={agent.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-soft-blue to-soft-cyan">
                      <IconComponent size={20} className="text-white" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-white truncate">
                        {agent.name}
                      </h5>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getSpecializationColor(agent.specialization)}`}
                      >
                        {agent.specialization}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {agent.description}
                    </p>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 flex items-center gap-1 text-xs text-soft-blue"
                      >
                        <Sparkles size={12} />
                        Currently selected
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
