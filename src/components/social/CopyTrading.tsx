import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Star, 
  Trophy, 
  Target,
  DollarSign,
  Shield,
  Copy,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Zap,
  Crown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface ExpertTrader {
  id: string;
  user_id: string;
  is_verified_expert: boolean;
  expert_tier: string;
  monthly_fee: number;
  risk_level: string;
  specialization: string[];
  total_followers: number;
  win_rate_30d: number;
  profit_30d: number;
  is_accepting_copiers: boolean;
  user_profiles?: {
    display_name: string;
    avatar_url?: string;
    verification_tier: string;
  };
  is_following?: boolean;
}

interface CopyTradeSettings {
  copy_percentage: number;
  max_bet_amount: number;
  min_odds: number;
  max_odds: number;
  risk_multiplier: number;
  auto_copy_enabled: boolean;
  stop_loss_percentage: number;
}

const CopyTrading: React.FC = () => {
  const { user } = useAuth();
  const [experts, setExperts] = useState<ExpertTrader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState<ExpertTrader | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copySettings, setCopySettings] = useState<CopyTradeSettings>({
    copy_percentage: 100,
    max_bet_amount: 100,
    min_odds: 1.5,
    max_odds: 10,
    risk_multiplier: 1,
    auto_copy_enabled: true,
    stop_loss_percentage: 20
  });

  useEffect(() => {
    fetchExpertTraders();
  }, [user]);

  const fetchExpertTraders = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('expert_traders')
        .select(`
          *,
          user_profiles(
            display_name,
            avatar_url,
            verification_tier
          )
        `)
        .eq('is_accepting_copiers', true)
        .order('win_rate_30d', { ascending: false });

      if (error) throw error;

      // Check which experts user is already following
      if (user) {
        const { data: relationships } = await supabase
          .from('copy_trading_relationships')
          .select('expert_id')
          .eq('follower_id', user.id)
          .eq('is_active', true);

        const followingIds = new Set(relationships?.map(r => r.expert_id) || []);
        
        const expertsWithFollowStatus = (data || []).map(expert => ({
          ...expert,
          is_following: followingIds.has(expert.id)
        }));

        setExperts(expertsWithFollowStatus as any);
      } else {
        setExperts(data as any || []);
      }
    } catch (error) {
      console.error('Error fetching experts:', error);
      toast({
        title: "Error",
        description: "Failed to load expert traders",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startCopyTrading = async (expert: ExpertTrader) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to start copy trading",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('copy_trading_relationships')
        .insert([
          {
            follower_id: user.id,
            expert_id: expert.id,
            copy_percentage: copySettings.copy_percentage,
            max_bet_amount: copySettings.max_bet_amount,
            min_odds: copySettings.min_odds,
            max_odds: copySettings.max_odds,
            risk_multiplier: copySettings.risk_multiplier,
            auto_copy_enabled: copySettings.auto_copy_enabled,
            stop_loss_percentage: copySettings.stop_loss_percentage
          }
        ]);

      if (error) throw error;

      toast({
        title: "Copy Trading Started!",
        description: `You are now copying trades from ${expert.user_profiles?.display_name}`
      });

      setIsSettingsOpen(false);
      fetchExpertTraders();
    } catch (error) {
      console.error('Error starting copy trading:', error);
      toast({
        title: "Error",
        description: "Failed to start copy trading",
        variant: "destructive"
      });
    }
  };

  const stopCopyTrading = async (expertId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('copy_trading_relationships')
        .update({ is_active: false })
        .eq('follower_id', user.id)
        .eq('expert_id', expertId);

      if (error) throw error;

      toast({
        title: "Copy Trading Stopped",
        description: "You have stopped copying this trader"
      });

      fetchExpertTraders();
    } catch (error) {
      console.error('Error stopping copy trading:', error);
      toast({
        title: "Error",
        description: "Failed to stop copy trading",
        variant: "destructive"
      });
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'legend': return <Crown className="h-4 w-4 text-purple-500" />;
      case 'expert': return <Trophy className="h-4 w-4 text-gold-500" />;
      case 'pro': return <Star className="h-4 w-4 text-blue-500" />;
      default: return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-muted rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-3 bg-muted rounded w-24"></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-8 bg-muted rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Copy className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Copy Trading</h2>
            <p className="text-sm text-muted-foreground">Follow expert bettors and copy their trades automatically</p>
          </div>
        </div>
      </div>

      {/* Expert Traders Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {experts.map((expert) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-all group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={expert.user_profiles?.avatar_url} 
                          alt={expert.user_profiles?.display_name} 
                        />
                        <AvatarFallback>
                          {expert.user_profiles?.display_name?.charAt(0) || 'E'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">
                            {expert.user_profiles?.display_name || 'Expert Trader'}
                          </CardTitle>
                          {expert.is_verified_expert && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                          {getTierIcon(expert.expert_tier)}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getRiskColor(expert.risk_level)}>
                            {expert.risk_level} Risk
                          </Badge>
                          
                          {expert.monthly_fee > 0 && (
                            <Badge variant="outline" className="text-yellow-500">
                              ${expert.monthly_fee}/mo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Performance Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-lg font-semibold text-green-500">
                          {expert.win_rate_30d.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Win Rate (30d)</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className={`text-lg font-semibold ${expert.profit_30d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {expert.profit_30d >= 0 ? '+' : ''}${expert.profit_30d.toFixed(0)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Profit (30d)</p>
                    </div>
                  </div>

                  {/* Followers & Specialization */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Followers</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span className="font-medium">{expert.total_followers}</span>
                      </div>
                    </div>
                    
                    {expert.specialization.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {expert.specialization.map((sport) => (
                          <Badge key={sport} variant="secondary" className="text-xs">
                            {sport}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="space-y-2">
                    {expert.is_following ? (
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                          disabled
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Following
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="w-full"
                          onClick={() => stopCopyTrading(expert.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Stop Copying
                        </Button>
                      </div>
                    ) : (
                      <Dialog open={isSettingsOpen && selectedExpert?.id === expert.id} onOpenChange={setIsSettingsOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full"
                            onClick={() => setSelectedExpert(expert)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Start Copying
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Copy className="h-5 w-5 text-primary" />
                              Copy Trade Settings
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="bg-muted/30 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={expert.user_profiles?.avatar_url} />
                                  <AvatarFallback>
                                    {expert.user_profiles?.display_name?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{expert.user_profiles?.display_name}</span>
                                {expert.is_verified_expert && (
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {expert.win_rate_30d.toFixed(1)}% win rate • {expert.total_followers} followers
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="max-bet">Max Bet Amount ($)</Label>
                              <Input
                                id="max-bet"
                                type="number"
                                value={copySettings.max_bet_amount}
                                onChange={(e) => setCopySettings(prev => ({ 
                                  ...prev, 
                                  max_bet_amount: parseFloat(e.target.value) || 0 
                                }))}
                                min="1"
                                max="1000"
                              />
                            </div>

                            <div>
                              <Label>Copy Percentage: {copySettings.copy_percentage}%</Label>
                              <Slider
                                value={[copySettings.copy_percentage]}
                                onValueChange={(value) => setCopySettings(prev => ({ 
                                  ...prev, 
                                  copy_percentage: value[0] 
                                }))}
                                max={100}
                                min={10}
                                step={10}
                                className="mt-2"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="min-odds">Min Odds</Label>
                                <Input
                                  id="min-odds"
                                  type="number"
                                  value={copySettings.min_odds}
                                  onChange={(e) => setCopySettings(prev => ({ 
                                    ...prev, 
                                    min_odds: parseFloat(e.target.value) || 1.1 
                                  }))}
                                  step="0.1"
                                  min="1.1"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="max-odds">Max Odds</Label>
                                <Input
                                  id="max-odds"
                                  type="number"
                                  value={copySettings.max_odds}
                                  onChange={(e) => setCopySettings(prev => ({ 
                                    ...prev, 
                                    max_odds: parseFloat(e.target.value) || 10 
                                  }))}
                                  step="0.1"
                                  max="20"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-sm font-medium">Auto Copy</Label>
                                <p className="text-xs text-muted-foreground">Automatically copy all bets</p>
                              </div>
                              <Switch
                                checked={copySettings.auto_copy_enabled}
                                onCheckedChange={(checked) => setCopySettings(prev => ({ 
                                  ...prev, 
                                  auto_copy_enabled: checked 
                                }))}
                              />
                            </div>

                            <Button 
                              onClick={() => startCopyTrading(expert)} 
                              className="w-full"
                            >
                              Start Copy Trading
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {experts.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Copy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Expert Traders Available</h3>
          <p className="text-muted-foreground mb-6">
            Check back later for expert traders accepting new copiers.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CopyTrading;