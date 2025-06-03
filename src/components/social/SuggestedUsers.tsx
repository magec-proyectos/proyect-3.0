
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Users, Target } from 'lucide-react';
import { useFollowing } from '@/contexts/FollowingContext';
import { motion } from 'framer-motion';

const SuggestedUsers = () => {
  const { suggestedUsers, followUser, isFollowing } = useFollowing();

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'expert': return 'bg-purple-600 text-white';
      case 'pro': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'expert': return <Target className="w-3 h-3" />;
      case 'pro': return <TrendingUp className="w-3 h-3" />;
      default: return <Users className="w-3 h-3" />;
    }
  };

  if (suggestedUsers.length === 0) {
    return null;
  }

  return (
    <Card className="bg-dark-card border-dark-border mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-neon-blue" />
          Usuarios Recomendados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestedUsers.slice(0, 3).map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-dark-lighter hover:bg-dark-card/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {user.verified && (
                  <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-neon-blue bg-dark rounded-full" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-white">{user.name}</h4>
                  <Badge className={`text-xs ${getTierColor(user.tier)}`}>
                    {getTierIcon(user.tier)}
                    {user.tier.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400">@{user.username}</p>
                <div className="flex gap-3 mt-1 text-xs text-gray-400">
                  <span>{user.stats.winRate}% aciertos</span>
                  <span>{user.stats.followers} seguidores</span>
                  <span>Racha: {user.stats.streak}</span>
                </div>
              </div>
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => followUser(user.id)}
              disabled={isFollowing(user.id)}
              className="bg-neon-blue/10 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all"
            >
              {isFollowing(user.id) ? 'Siguiendo' : 'Seguir'}
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;
