
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Zap, Star, Shield, ChevronRight } from 'lucide-react';

export const ChatbotHelpView: React.FC = () => {
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

  return (
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
  );
};
