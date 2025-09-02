import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useFollowing } from '@/contexts/FollowingContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  MapPin,
  Globe,
  CheckCircle,
  UserPlus,
  UserCheck,
  Crown,
  Star,
  Zap,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { BadgeGrid, BadgeData } from '@/components/ui/badge-display';
import BadgeSystem from '@/components/social/BadgeSystem';

interface UserProfile {
  user_id: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  banner_url: string;
  location: string;
  website: string;
  level: number;
  experience_points: number;
  win_rate: number;
  total_predictions: number;
  correct_predictions: number;
  current_streak: number;
  best_streak: number;
  total_winnings: number;
  followers_count: number;
  following_count: number;
  posts_count: number;
  likes_received: number;
  is_verified: boolean;
  verification_tier: string;
  reputation_score: number;
  join_date: string;
  last_active: string;
  badges: any;
  achievements: any;
}

interface UserPost {
  id: string;
  content: string;
  prediction_type: string;
  match_info: any;
  prediction_details: any;
  status: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  confidence_score: number;
  stake_amount: number;
  potential_return: number;
  actual_return: number;
  result_confirmed: boolean;
}

const PublicUserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const { followUser, unfollowUser, isFollowing } = useFollowing();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowingState] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadProfile();
      loadPosts();
      if (currentUser) {
        setFollowingState(isFollowing(userId));
      }
    }
  }, [userId, currentUser]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_profile_with_stats', {
          profile_user_id: userId
        });

      if (error) throw error;

      if (data && data.length > 0) {
        setProfile(data[0]);
      } else {
        toast.error('Perfil no encontrado o privado');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleFollowToggle = async () => {
    if (!currentUser || !userId) {
      toast.error('Inicia sesión para seguir usuarios');
      return;
    }

    setFollowLoading(true);
    try {
      if (following) {
        await unfollowUser(userId);
        setFollowingState(false);
      } else {
        await followUser(userId);
        setFollowingState(true);
      }
    } finally {
      setFollowLoading(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'legend': return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'expert': return <Target className="w-4 h-4 text-purple-400" />;
      case 'verified': return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'legend': return 'from-yellow-500 to-orange-500';
      case 'expert': return 'from-purple-500 to-pink-500';
      case 'verified': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'lost': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Perfil no encontrado</h1>
          <p className="text-gray-400">Este perfil no existe o es privado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-r from-dark-card to-dark border-b border-dark-border">
        {profile.banner_url && (
          <img 
            src={profile.banner_url} 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
        
        {/* Profile Header */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <Avatar className="w-32 h-32 border-4 border-dark-border">
                <AvatarImage src={profile.avatar_url} alt={profile.display_name} />
                <AvatarFallback className="text-2xl">
                  {profile.display_name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              {/* Level Badge */}
              <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${getTierColor(profile.verification_tier)} p-2 rounded-full border-2 border-dark`}>
                <span className="text-white font-bold text-sm">{profile.level}</span>
              </div>
            </motion.div>

            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{profile.display_name}</h1>
                {profile.is_verified && getTierIcon(profile.verification_tier)}
                <Badge className={`bg-gradient-to-r ${getTierColor(profile.verification_tier)} text-white border-0`}>
                  {profile.verification_tier.toUpperCase()}
                </Badge>
              </div>
              
              {profile.bio && (
                <p className="text-gray-300 mb-4 max-w-2xl">{profile.bio}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" 
                       className="text-neon-blue hover:underline">
                      {profile.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Desde {formatDate(profile.join_date)}
                </div>
              </div>
            </div>

            {/* Follow Button */}
            {currentUser && currentUser.id !== profile.user_id && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleFollowToggle}
                  disabled={followLoading}
                  variant={following ? "outline" : "default"}
                  className={following 
                    ? "border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black" 
                    : "bg-neon-blue text-black hover:bg-neon-blue/90"
                  }
                >
                  {following ? (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Siguiendo
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Seguir
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {profile.win_rate.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {profile.total_predictions}
              </div>
              <div className="text-xs text-gray-400">Predicciones</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {profile.current_streak}
              </div>
              <div className="text-xs text-gray-400">Racha Actual</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {profile.followers_count}
              </div>
              <div className="text-xs text-gray-400">Seguidores</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {profile.reputation_score}
              </div>
              <div className="text-xs text-gray-400">Reputación</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {formatCurrency(profile.total_winnings)}
              </div>
              <div className="text-xs text-gray-400">Ganancias</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-dark-card border border-dark-border">
            <TabsTrigger value="posts" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
              Predicciones ({profile.posts_count})
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
              Estadísticas
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
              Logros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="space-y-4">
              {posts.length === 0 ? (
                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-8 text-center text-gray-400">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Este usuario aún no ha publicado predicciones</p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="bg-dark-card border-dark-border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(post.status)}>
                            {post.status === 'won' ? 'Ganada' : 
                             post.status === 'lost' ? 'Perdida' : 'Pendiente'}
                          </Badge>
                          <Badge variant="outline" className="border-gray-600">
                            {post.prediction_type.replace('_', ' ')}
                          </Badge>
                          {post.confidence_score && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-gray-400">{post.confidence_score}/10</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-400">
                          {formatDate(post.created_at)}
                        </span>
                      </div>

                      <p className="text-white mb-4">{post.content}</p>

                      {post.match_info && (
                        <div className="bg-dark border border-dark-border rounded p-3 mb-4">
                          <div className="text-sm text-gray-400 mb-1">Partido</div>
                          <div className="text-white font-medium">
                            {post.match_info.home_team} vs {post.match_info.away_team}
                          </div>
                          {post.match_info.league && (
                            <div className="text-sm text-gray-400">{post.match_info.league}</div>
                          )}
                        </div>
                      )}

                      {post.prediction_details && (
                        <div className="bg-dark border border-dark-border rounded p-3 mb-4">
                          <div className="text-sm text-gray-400 mb-1">Predicción</div>
                          <div className="text-white font-medium">
                            {post.prediction_details.prediction}
                          </div>
                          {post.prediction_details.odds && (
                            <div className="text-sm text-neon-blue">
                              Cuota: {post.prediction_details.odds}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <span>{post.likes_count} likes</span>
                          <span>{post.comments_count} comentarios</span>
                        </div>
                        {post.result_confirmed && post.actual_return > 0 && (
                          <div className="text-green-400 font-medium">
                            +{formatCurrency(post.actual_return)}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Rendimiento
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mejor Racha:</span>
                    <span className="text-white font-medium">{profile.best_streak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicciones Correctas:</span>
                    <span className="text-white font-medium">{profile.correct_predictions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ganancias Totales:</span>
                    <span className="text-green-400 font-medium">{formatCurrency(profile.total_winnings)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Social
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Siguiendo:</span>
                    <span className="text-white font-medium">{profile.following_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Likes Recibidos:</span>
                    <span className="text-white font-medium">{profile.likes_received}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Última Actividad:</span>
                    <span className="text-white font-medium">{formatDate(profile.last_active)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <BadgeSystem userId={profile.user_id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PublicUserProfile;