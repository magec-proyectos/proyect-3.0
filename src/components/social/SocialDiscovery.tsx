import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, Users, Circle, Flame, Star, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from './PostItem';

interface SocialDiscoveryProps {
  trendingPosts: Post[];
  suggestedUsers: any[];
  liveMatches: any[];
}

const SocialDiscovery: React.FC<SocialDiscoveryProps> = ({
  trendingPosts,
  suggestedUsers,
  liveMatches
}) => {
  const containerVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Trending for you */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-to-br from-surface-primary to-surface-secondary border-border/50 hover:border-primary/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500">
              <TrendingUp size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg">Trending for you</h3>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/30 animate-pulse">
              🔥 HOT
            </Badge>
          </div>
          <div className="space-y-4">
            {trendingPosts.slice(0, 3).map((post, index) => (
              <motion.div 
                key={post.id} 
                className="hover:bg-accent/30 p-3 rounded-lg cursor-pointer transition-all duration-200 group"
                whileHover={{ scale: 1.02, x: 4 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    <span className="text-sm text-muted-foreground">Trending in Sports</span>
                  </div>
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                    {post.likes} 💜
                  </Badge>
                </div>
                <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {post.bet.match}
                </p>
                <p className="text-sm text-muted-foreground truncate">{post.content}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Who to follow */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-to-br from-surface-primary to-surface-secondary border-border/50 hover:border-primary/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg">Who to follow</h3>
          </div>
          <div className="space-y-4">
            {suggestedUsers.slice(0, 3).map((user, index) => (
              <motion.div 
                key={user.id} 
                className="flex items-center justify-between group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 ring-2 ring-border group-hover:ring-primary/50 transition-all">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {user.name}
                      </p>
                      {index === 0 && <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">⭐ Pro</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary font-semibold shadow-elevation-1 hover:shadow-elevation-2 transition-all"
                >
                  Follow
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Live predictions */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-to-br from-surface-primary to-surface-secondary border-border/50 hover:border-primary/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
              <Circle size={20} className="text-white fill-white" />
            </div>
            <h3 className="font-bold text-lg">Live now</h3>
            <Badge className="bg-red-500 text-white animate-pulse shadow-glow-orange">
              🔴 LIVE
            </Badge>
          </div>
          <div className="space-y-4">
            {liveMatches.map((match, index) => (
              <motion.div 
                key={index} 
                className="hover:bg-accent/30 p-3 rounded-lg cursor-pointer transition-all duration-200 group border border-transparent hover:border-primary/20"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {match.teams}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm font-bold text-primary">{match.score}</p>
                      <span className="text-xs text-muted-foreground">• 67' min</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                      🎯 Hot bet
                    </Badge>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SocialDiscovery;