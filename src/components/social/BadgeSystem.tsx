import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BadgeDisplay, BadgeGrid, CategoryBadges, BadgeStats, BadgeData } from '@/components/ui/badge-display';
import { 
  Trophy, 
  Award,
  Zap,
  Lock,
  Target,
  Users,
  TrendingUp,
  Star,
  Clock,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface BadgeSystemProps {
  userId?: string;
  showAllBadges?: boolean;
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({ 
  userId, 
  showAllBadges = false 
}) => {
  const { user } = useAuth();
  const [userBadges, setUserBadges] = useState<BadgeData[]>([]);
  const [allBadges, setAllBadges] = useState<BadgeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const targetUserId = userId || user?.id;

  useEffect(() => {
    if (targetUserId) {
      loadBadges();
      if (showAllBadges) {
        loadAllBadges();
      }
    }
  }, [targetUserId, showAllBadges]);

  const loadBadges = async () => {
    if (!targetUserId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .rpc('get_user_badges_with_details', {
          user_uuid: targetUserId
        });

      if (error) throw error;
      setUserBadges((data || []) as BadgeData[]);
    } catch (error) {
      console.error('Error loading user badges:', error);
      toast.error('Error al cargar badges');
    } finally {
      setLoading(false);
    }
  };

  const loadAllBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('badges_catalog')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setAllBadges((data || []) as BadgeData[]);
    } catch (error) {
      console.error('Error loading all badges:', error);
    }
  };

  const checkForNewBadges = async () => {
    if (!user || !targetUserId || targetUserId !== user.id) return;

    try {
      setChecking(true);
      const { data, error } = await supabase
        .rpc('check_and_award_badges', {
          user_uuid: targetUserId
        });

      if (error) throw error;

      const badgesAwarded = data as number;
      if (badgesAwarded > 0) {
        toast.success(`¡Felicidades! Conseguiste ${badgesAwarded} nuevo${badgesAwarded > 1 ? 's' : ''} badge${badgesAwarded > 1 ? 's' : ''}!`);
        loadBadges(); // Reload to show new badges
      } else {
        toast.info('No hay nuevos badges disponibles en este momento');
      }
    } catch (error) {
      console.error('Error checking badges:', error);
      toast.error('Error al verificar badges');
    } finally {
      setChecking(false);
    }
  };

  const getUnearnedBadges = () => {
    if (!showAllBadges || allBadges.length === 0) return [];
    
    const earnedBadgeKeys = new Set(userBadges.map(b => b.badge_key));
    return allBadges.filter(badge => !earnedBadgeKeys.has(badge.badge_key));
  };

  const getRecentBadges = () => {
    return userBadges
      .filter(badge => badge.earned_at)
      .sort((a, b) => new Date(b.earned_at!).getTime() - new Date(a.earned_at!).getTime())
      .slice(0, 5);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando badges...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Sistema de Badges</CardTitle>
                <p className="text-gray-400 text-sm">
                  {userBadges.length} badge{userBadges.length !== 1 ? 's' : ''} conseguido{userBadges.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {user && targetUserId === user.id && (
              <Button
                onClick={checkForNewBadges}
                disabled={checking}
                className="bg-gradient-to-r from-neon-blue to-blue-600 hover:from-neon-blue/90 hover:to-blue-600/90 text-black"
              >
                {checking ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Verificando...
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Verificar Nuevos Badges
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <BadgeStats badges={userBadges} />
        </CardContent>
      </Card>

      {/* Recent Badges */}
      {getRecentBadges().length > 0 && (
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Badges Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getRecentBadges().map((badge, index) => (
                <motion.div
                  key={badge.badge_key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-dark rounded border border-dark-border"
                >
                  <BadgeDisplay badge={badge} size="lg" animated={false} />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{badge.name}</h4>
                    <p className="text-gray-400 text-sm">{badge.description}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Conseguido el {formatDate(badge.earned_at!)}
                    </p>
                  </div>
                  <Badge className={`
                    ${badge.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      badge.rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                      badge.rarity === 'rare' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                      'bg-gradient-to-r from-gray-400 to-gray-600'
                    } text-white border-0
                  `}>
                    {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs for different views */}
      <Tabs defaultValue="earned" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-dark-card border border-dark-border">
          <TabsTrigger value="earned" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
            Conseguidos ({userBadges.length})
          </TabsTrigger>
          {showAllBadges && (
            <TabsTrigger value="available" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
              Disponibles ({getUnearnedBadges().length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="earned" className="mt-6">
          {userBadges.length === 0 ? (
            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Aún no has conseguido ningún badge</p>
                <p className="text-gray-500 text-sm mt-2">
                  ¡Sigue haciendo predicciones para desbloquear tu primer badge!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <CategoryBadges 
                badges={userBadges} 
                category="prediction" 
                title="Badges de Predicción"
                description="Por tu precisión y habilidad en las predicciones"
              />
              
              <CategoryBadges 
                badges={userBadges} 
                category="streak" 
                title="Badges de Racha"
                description="Por tus rachas de victorias consecutivas"
              />
              
              <CategoryBadges 
                badges={userBadges} 
                category="social" 
                title="Badges Sociales"
                description="Por tu participación en la comunidad"
              />
              
              <CategoryBadges 
                badges={userBadges} 
                category="earnings" 
                title="Badges de Ganancias"
                description="Por tus éxitos financieros"
              />
              
              <CategoryBadges 
                badges={userBadges} 
                category="general" 
                title="Badges Generales"
                description="Por tu progreso y nivel en la plataforma"
              />
              
              <CategoryBadges 
                badges={userBadges} 
                category="special" 
                title="Badges Especiales"
                description="Logros únicos y exclusivos"
              />
            </div>
          )}
        </TabsContent>

        {showAllBadges && (
          <TabsContent value="available" className="mt-6">
            <div className="space-y-8">
              {getUnearnedBadges().length === 0 ? (
                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-8 text-center">
                    <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <p className="text-white font-medium">¡Increíble!</p>
                    <p className="text-gray-400 mt-2">Has conseguido todos los badges disponibles</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <CategoryBadges 
                    badges={getUnearnedBadges()} 
                    category="prediction" 
                    title="Badges de Predicción Disponibles"
                  />
                  
                  <CategoryBadges 
                    badges={getUnearnedBadges()} 
                    category="streak" 
                    title="Badges de Racha Disponibles"
                  />
                  
                  <CategoryBadges 
                    badges={getUnearnedBadges()} 
                    category="social" 
                    title="Badges Sociales Disponibles"
                  />
                  
                  <CategoryBadges 
                    badges={getUnearnedBadges()} 
                    category="earnings" 
                    title="Badges de Ganancias Disponibles"
                  />
                  
                  <CategoryBadges 
                    badges={getUnearnedBadges()} 
                    category="general" 
                    title="Badges Generales Disponibles"
                  />
                  
                  <CategoryBadges 
                    badges={getUnearnedBadges()} 
                    category="special" 
                    title="Badges Especiales Disponibles"
                  />
                </>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default BadgeSystem;