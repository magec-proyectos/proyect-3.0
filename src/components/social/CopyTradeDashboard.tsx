import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  Activity,
  PieChart,
  BarChart3,
  Copy,
  Settings,
  Pause,
  Play,
  XCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface CopyTradePortfolio {
  total_balance: number;
  available_balance: number;
  total_invested: number;
  total_profit: number;
  roi_percentage: number;
  active_copy_trades: number;
  total_copy_trades: number;
}

interface CopyRelationship {
  id: string;
  expert_id: string;
  is_active: boolean;
  copy_percentage: number;
  max_bet_amount: number;
  total_copied_bets: number;
  total_invested: number;
  current_profit: number;
  started_at: string;
  expert_traders: {
    user_profiles: {
      display_name: string;
      avatar_url?: string;
    };
    win_rate_30d: number;
    profit_30d: number;
    risk_level: string;
  };
}

interface CopiedBet {
  id: string;
  copied_amount: number;
  original_odds: number;
  status: string;
  result?: string;
  profit_loss: number;
  copied_at: string;
  match_info: any;
  bet_details: any;
  expert_traders: {
    user_profiles: {
      display_name: string;
    };
  };
}

const CopyTradeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<CopyTradePortfolio | null>(null);
  const [relationships, setRelationships] = useState<CopyRelationship[]>([]);
  const [copiedBets, setCopiedBets] = useState<CopiedBet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch portfolio
      const { data: portfolioData } = await supabase
        .from('copy_trading_portfolios')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (portfolioData) {
        setPortfolio(portfolioData);
      }

      // Fetch copy relationships
      const { data: relationshipsData } = await supabase
        .from('copy_trading_relationships')
        .select(`
          *,
          expert_traders(
            user_profiles(display_name, avatar_url),
            win_rate_30d,
            profit_30d,
            risk_level
          )
        `)
        .eq('follower_id', user?.id)
        .order('started_at', { ascending: false });

      if (relationshipsData) {
        setRelationships(relationshipsData as any);
      }

      // Fetch recent copied bets
      const { data: betsData } = await supabase
        .from('copied_bets')
        .select(`
          *,
          expert_traders(
            user_profiles(display_name)
          )
        `)
        .eq('follower_id', user?.id)
        .order('copied_at', { ascending: false })
        .limit(10);

      if (betsData) {
        setCopiedBets(betsData as any);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCopyRelationship = async (relationshipId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('copy_trading_relationships')
        .update({ is_active: !isActive })
        .eq('id', relationshipId);

      if (error) throw error;

      toast({
        title: isActive ? "Copy Trading Paused" : "Copy Trading Resumed",
        description: isActive ? "You will not receive new copy trades" : "You will now receive copy trades again"
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Error toggling relationship:', error);
      toast({
        title: "Error",
        description: "Failed to update copy trading status",
        variant: "destructive"
      });
    }
  };

  const stopCopyRelationship = async (relationshipId: string) => {
    try {
      const { error } = await supabase
        .from('copy_trading_relationships')
        .update({ is_active: false })
        .eq('id', relationshipId);

      if (error) throw error;

      toast({
        title: "Copy Trading Stopped",
        description: "You have stopped copying this trader"
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Error stopping relationship:', error);
      toast({
        title: "Error",
        description: "Failed to stop copy trading",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'text-green-500';
      case 'lost': return 'text-red-500';
      case 'pending': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'lost': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <p className="text-2xl font-bold">${portfolio?.total_balance?.toFixed(2) || '0.00'}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">${portfolio?.total_invested?.toFixed(2) || '0.00'}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Profit</p>
                <p className={`text-2xl font-bold ${(portfolio?.total_profit || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {(portfolio?.total_profit || 0) >= 0 ? '+' : ''}${portfolio?.total_profit?.toFixed(2) || '0.00'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ROI</p>
                <p className={`text-2xl font-bold ${(portfolio?.roi_percentage || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {(portfolio?.roi_percentage || 0) >= 0 ? '+' : ''}{portfolio?.roi_percentage?.toFixed(1) || '0.0'}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="relationships" className="space-y-4">
        <TabsList>
          <TabsTrigger value="relationships">Copy Relationships ({relationships.length})</TabsTrigger>
          <TabsTrigger value="bets">Recent Bets ({copiedBets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="relationships" className="space-y-4">
          {relationships.map((relationship) => (
            <motion.div
              key={relationship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={relationship.expert_traders?.user_profiles?.avatar_url} />
                        <AvatarFallback>
                          {relationship.expert_traders?.user_profiles?.display_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-medium">
                          {relationship.expert_traders?.user_profiles?.display_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Started {formatDistanceToNow(new Date(relationship.started_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Copied Bets</p>
                          <p className="font-medium">{relationship.total_copied_bets}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Invested</p>
                          <p className="font-medium">${relationship.total_invested.toFixed(0)}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Profit</p>
                          <p className={`font-medium ${relationship.current_profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {relationship.current_profit >= 0 ? '+' : ''}${relationship.current_profit.toFixed(0)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={relationship.is_active ? "default" : "secondary"}
                          className={relationship.is_active ? "bg-green-500" : ""}
                        >
                          {relationship.is_active ? 'Active' : 'Paused'}
                        </Badge>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCopyRelationship(relationship.id, relationship.is_active)}
                        >
                          {relationship.is_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => stopCopyRelationship(relationship.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {relationships.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Copy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Copy Relationships</h3>
                <p className="text-muted-foreground">
                  Start following expert traders to see them here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="bets" className="space-y-4">
          {copiedBets.map((bet) => (
            <motion.div
              key={bet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(bet.result || bet.status)}
                        <span className="font-medium">{bet.match_info?.match || 'Unknown Match'}</span>
                        <Badge variant="outline" className={getStatusColor(bet.result || bet.status)}>
                          {bet.result || bet.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Copied from {bet.expert_traders?.user_profiles?.display_name} • 
                        {formatDistanceToNow(new Date(bet.copied_at), { addSuffix: true })}
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-muted-foreground">Prediction: </span>
                        <span className="font-medium">{bet.bet_details?.prediction || 'N/A'}</span>
                        <span className="text-muted-foreground"> @ </span>
                        <span className="font-medium text-primary">{bet.original_odds}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-medium">${bet.copied_amount.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">P&L</p>
                        <p className={`font-medium ${bet.profit_loss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {bet.profit_loss >= 0 ? '+' : ''}${bet.profit_loss.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {copiedBets.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Copied Bets</h3>
                <p className="text-muted-foreground">
                  Your copied bets will appear here once you start following experts.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CopyTradeDashboard;