
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Users, Target, UserPlus, UserCheck, Loader2 } from 'lucide-react';
import { useFollowing } from '@/contexts/FollowingContext';
import { motion } from 'framer-motion';

interface UserProfileCardProps {
  userId: string;
  name: string;
  username: string;
  avatar: string;
  stats: {
    winRate: number;
    totalPredictions: number;
    followers: number;
    streak: number;
  };
  verified?: boolean;
  tier?: 'amateur' | 'pro' | 'expert';
  showFollowButton?: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  userId,
  name,
  username,
  avatar,
  stats,
  verified = false,
  tier = 'amateur',
  showFollowButton = true
}) => {
  const { followUser, unfollowUser, isFollowing, loading } = useFollowing();
  const following = isFollowing(userId);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'expert': return 'bg-purple-600 text-white border-purple-500';
      case 'pro': return 'bg-blue-600 text-white border-blue-500';
      default: return 'bg-gray-600 text-white border-gray-500';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'expert': return <Target className="w-3 h-3" />;
      case 'pro': return <TrendingUp className="w-3 h-3" />;
      default: return <Users className="w-3 h-3" />;
    }
  };

  const handleFollowToggle = async () => {
    setIsActionLoading(true);
    try {
      if (following) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <Card className="bg-dark-card border-dark-border hover:border-neon-blue/30 transition-all">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-12 h-12 border-2 border-dark-border">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            {verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1"
              >
                <CheckCircle className="w-5 h-5 text-neon-blue bg-dark rounded-full p-0.5" />
              </motion.div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white truncate">{name}</h3>
              <Badge className={`text-xs ${getTierColor(tier)} border`}>
                {getTierIcon(tier)}
                <span className="ml-1">{tier.toUpperCase()}</span>
              </Badge>
            </div>
            
            <p className="text-sm text-gray-400 mb-2">@{username}</p>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-gray-400">Aciertos:</span>
                <span className="font-medium text-green-400">{stats.winRate}%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">Seguidores:</span>
                <span className="font-medium text-white">{stats.followers}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">Predicciones:</span>
                <span className="font-medium text-white">{stats.totalPredictions}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">Racha:</span>
                <span className="font-medium text-orange-400">{stats.streak}</span>
              </div>
            </div>
          </div>
          
          {showFollowButton && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant={following ? "outline" : "default"}
                onClick={handleFollowToggle}
                disabled={isActionLoading}
                className={following 
                  ? "border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black" 
                  : "bg-neon-blue text-black hover:bg-neon-blue/90"
                }
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Cargando...
                  </>
                ) : following ? (
                  <>
                    <UserCheck className="w-4 h-4 mr-1" />
                    Siguiendo
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-1" />
                    Seguir
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
