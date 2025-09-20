import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Radio, Flame, Clock, Sparkles } from 'lucide-react';

interface SocialDiscoveryProps {
  trendingPosts: any[];
  suggestedUsers: any[];
  liveMatches: any[];
}

const SocialDiscovery: React.FC<SocialDiscoveryProps> = ({
  trendingPosts,
  suggestedUsers,
  liveMatches
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Trending Posts */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-body-lg font-semibold">
              <TrendingUp size={18} className="text-primary" />
              Trending
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {trendingPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.id}
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full text-primary font-semibold text-xs">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <Badge variant="secondary" className="text-xs h-5">
                      {post.bet?.match?.split(' vs ')[0] || 'Sports'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{post.likes} likes</span>
                  </div>
                  <p className="text-body-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {post.content.length > 60 ? post.content.substring(0, 60) + '...' : post.content}
                  </p>
                </div>
              </motion.div>
            ))}
            <Button variant="ghost" className="w-full text-primary hover:text-primary/80 text-body-sm h-8">
              Show more
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggested Users */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-body-lg font-semibold">
              <Users size={18} className="text-primary" />
              Who to follow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedUsers.slice(0, 3).map((user) => (
              <motion.div
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors group"
                whileHover={{ scale: 1.01 }}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    {user.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-body-sm text-foreground group-hover:text-primary transition-colors">
                    {user.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-3 h-7 text-xs"
                >
                  Follow
                </Button>
              </motion.div>
            ))}
            <Button variant="ghost" className="w-full text-primary hover:text-primary/80 text-body-sm h-8">
              Show more
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Live Matches */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-body-lg font-semibold">
              <Radio size={18} className="text-green-500" />
              Live matches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {liveMatches.map((match, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                whileHover={{ x: 2 }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-500 font-medium">LIVE</span>
                  </div>
                  <h4 className="font-semibold text-body-sm text-foreground group-hover:text-primary transition-colors">
                    {match.teams}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-body-md font-bold text-primary">{match.score}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={10} />
                      {45 + Math.floor(Math.random() * 45)}'
                    </div>
                  </div>
                </div>
                <Badge variant="destructive" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs h-5">
                  🔥 Hot
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SocialDiscovery;