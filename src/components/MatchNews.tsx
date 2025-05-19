
import React from 'react';
import { motion } from 'framer-motion';
import { News, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: 'injury' | 'transfer' | 'preview' | 'general';
  imageUrl?: string;
}

interface MatchNewsProps {
  news: NewsItem[];
  isLoading?: boolean;
}

const MatchNews: React.FC<MatchNewsProps> = ({ news, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Latest News</h3>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-dark-card rounded-lg p-4">
              <div className="h-4 bg-dark-lighter rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-dark-lighter rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-dark-lighter rounded w-full"></div>
              <div className="h-3 bg-dark-lighter rounded w-1/4 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        <News className="mx-auto mb-2" size={24} />
        <p>No relevant news available for this match</p>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'injury':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'transfer':
        return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'preview':
        return 'text-neon-blue bg-neon-blue/10 border-neon-blue/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Latest News</h3>
        <Badge variant="outline" className="bg-dark-lighter">
          <News className="mr-1" size={14} />
          <span>{news.length} updates</span>
        </Badge>
      </div>
      
      <div className="space-y-4">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-card rounded-lg overflow-hidden hover:border-neon-blue/30 transition-all border border-dark-border"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className={`${getCategoryColor(item.category)}`}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </Badge>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  <span>{item.date}</span>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">{item.title}</h4>
              <p className="text-sm text-gray-400 mb-3">{item.summary}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Source: {item.source}</span>
                <button className="text-xs text-neon-blue hover:underline">Read more</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchNews;
