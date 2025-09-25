import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, UserCheck, Award, TrendingUp } from 'lucide-react';
import { useFollowing } from '@/hooks/useFollowing';
import { UserProfile } from '@/hooks/useUserProfiles';
import { motion } from 'framer-motion';

interface FollowableUserCardProps {
  user: UserProfile;
  compact?: boolean;
}

const FollowableUserCard: React.FC<FollowableUserCardProps> = ({ user, compact = false }) => {
  const { isFollowing, followUser, unfollowUser } = useFollowing();
  const following = isFollowing(user.user_id);

  const handleFollowToggle = () => {
    if (following) {
      unfollowUser(user.user_id);
    } else {
      followUser(user.user_id);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'legend': return <Award className="w-3 h-3 text-yellow-500" />;
      case 'expert': return <TrendingUp className="w-3 h-3 text-blue-500" />;
      case 'verified': return <UserCheck className="w-3 h-3 text-green-500" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'legend': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-600';
      case 'expert': return 'border-blue-500/50 bg-blue-500/10 text-blue-600';
      case 'verified': return 'border-green-500/50 bg-green-500/10 text-green-600';
      default: return 'border-border bg-muted text-muted-foreground';
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-3 bg-card border border-border/50 rounded-lg hover:bg-card/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar_url || 'https://placehold.co/40'} alt={user.display_name} />
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {user.display_name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-body-sm text-foreground truncate">
                {user.display_name}
              </h3>
              {user.verification_tier !== 'none' && (
                <Badge 
                  variant="outline" 
                  className={`px-1.5 py-0.5 text-xs ${getTierColor(user.verification_tier)}`}
                >
                  {getTierIcon(user.verification_tier)}
                </Badge>
              )}
            </div>
            <p className="text-body-xs text-muted-foreground">
              @{user.username || user.display_name.toLowerCase().replace(' ', '')}
            </p>
          </div>
        </div>
        
        <Button
          variant={following ? "outline" : "default"}
          size="sm"
          onClick={handleFollowToggle}
          className="h-8 px-3"
        >
          {following ? (
            <>
              <UserCheck className="w-3 h-3 mr-1" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="w-3 h-3 mr-1" />
              Follow
            </>
          )}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-card border-border/50 hover:bg-card/80 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar_url || 'https://placehold.co/48'} alt={user.display_name} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {user.display_name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-body-md text-foreground truncate">
                  {user.display_name}
                </h3>
                {user.verification_tier !== 'none' && (
                  <Badge 
                    variant="outline" 
                    className={`px-2 py-1 text-xs ${getTierColor(user.verification_tier)}`}
                  >
                    {getTierIcon(user.verification_tier)}
                    <span className="ml-1 capitalize">{user.verification_tier}</span>
                  </Badge>
                )}
              </div>
              <p className="text-body-sm text-muted-foreground mb-2">
                @{user.username || user.display_name.toLowerCase().replace(' ', '')}
              </p>
              {user.bio && (
                <p className="text-body-sm text-foreground leading-relaxed line-clamp-2">
                  {user.bio}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <div className="font-semibold text-body-md text-foreground">
                {user.win_rate.toFixed(1)}%
              </div>
              <div className="text-body-xs text-muted-foreground">Win Rate</div>
            </div>
            <div>
              <div className="font-semibold text-body-md text-foreground">
                {user.followers_count}
              </div>
              <div className="text-body-xs text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="font-semibold text-body-md text-foreground">
                {user.level}
              </div>
              <div className="text-body-xs text-muted-foreground">Level</div>
            </div>
          </div>
          
          <Button
            variant={following ? "outline" : "default"}
            className="w-full"
            onClick={handleFollowToggle}
          >
            {following ? (
              <>
                <UserCheck className="w-4 h-4 mr-2" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Follow
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FollowableUserCard;