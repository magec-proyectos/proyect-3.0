import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, Users, Circle } from 'lucide-react';
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
  return (
    <div className="space-y-6">
      {/* Tendencias para ti */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-primary" />
          <h3 className="font-semibold">Tendencias para ti</h3>
        </div>
        <div className="space-y-3">
          {trendingPosts.slice(0, 3).map((post, index) => (
            <div key={post.id} className="hover:bg-accent/50 p-2 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">#{index + 1} Tendencia</span>
                <Badge variant="outline" className="text-xs">
                  {post.likes} likes
                </Badge>
              </div>
              <p className="font-medium truncate">{post.bet.match}</p>
              <p className="text-sm text-muted-foreground truncate">{post.content}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* A quién seguir */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} className="text-primary" />
          <h3 className="font-semibold">A quién seguir</h3>
        </div>
        <div className="space-y-3">
          {suggestedUsers.slice(0, 3).map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="rounded-full">
                Seguir
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Predicciones en vivo */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Circle size={20} className="text-red-500 fill-red-500" />
          <h3 className="font-semibold">En vivo ahora</h3>
        </div>
        <div className="space-y-3">
          {liveMatches.map((match, index) => (
            <div key={index} className="hover:bg-accent/50 p-2 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{match.teams}</p>
                  <p className="text-xs text-muted-foreground">{match.score}</p>
                </div>
                <Badge className="bg-red-500 text-white animate-pulse">
                  LIVE
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SocialDiscovery;