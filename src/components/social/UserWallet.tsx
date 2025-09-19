import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Gift, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface WalletData {
  user_id: string;
  balance: number;
  total_earned: number;
  total_spent: number;
  recent_tips_sent: Array<{
    id: string;
    recipient_id: string;
    recipient_name: string;
    amount: number;
    message: string;
    created_at: string;
  }>;
  recent_tips_received: Array<{
    id: string;
    sender_id: string;
    sender_name: string;
    amount: number;
    message: string;
    created_at: string;
  }>;
}

const UserWallet: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchWalletData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('get_user_wallet');
      
      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const walletInfo = data[0] as WalletData;
        setWalletData(walletInfo);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, [user]);

  if (!user) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please log in to view your wallet</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center">
          <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
          <p className="text-muted-foreground">Loading wallet...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="text-primary" size={20} />
            My Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Balance</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                ${walletData?.balance?.toFixed(2) || "0.00"}
              </p>
            </div>
            
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-sm text-muted-foreground">Earned</span>
              </div>
              <p className="text-xl font-semibold text-green-500">
                ${walletData?.total_earned?.toFixed(2) || "0.00"}
              </p>
            </div>
            
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown size={16} className="text-red-500" />
                <span className="text-sm text-muted-foreground">Spent</span>
              </div>
              <p className="text-xl font-semibold text-red-500">
                ${walletData?.total_spent?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={fetchWalletData}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh Balance
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Gift className="text-red-500" size={16} />
              Recent Tips Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            {walletData?.recent_tips_sent?.length ? (
              <div className="space-y-2">
                {walletData.recent_tips_sent.map((tip) => (
                  <div key={tip.id} className="flex justify-between items-center p-2 bg-background rounded border border-border">
                    <div>
                      <p className="font-medium text-sm">{tip.recipient_name}</p>
                      {tip.message && (
                        <p className="text-xs text-muted-foreground truncate">{tip.message}</p>
                      )}
                    </div>
                    <span className="text-red-500 font-medium">-${tip.amount}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No tips sent yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Gift className="text-green-500" size={16} />
              Recent Tips Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            {walletData?.recent_tips_received?.length ? (
              <div className="space-y-2">
                {walletData.recent_tips_received.map((tip) => (
                  <div key={tip.id} className="flex justify-between items-center p-2 bg-background rounded border border-border">
                    <div>
                      <p className="font-medium text-sm">{tip.sender_name}</p>
                      {tip.message && (
                        <p className="text-xs text-muted-foreground truncate">{tip.message}</p>
                      )}
                    </div>
                    <span className="text-green-500 font-medium">+${tip.amount}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No tips received yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserWallet;