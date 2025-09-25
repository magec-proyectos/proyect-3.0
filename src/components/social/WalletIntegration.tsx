import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Wallet, DollarSign, TrendingUp, TrendingDown, Send, 
  Plus, Minus, CreditCard, Banknote, History, ArrowUpRight,
  ArrowDownLeft, Gift, Zap
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface WalletIntegrationProps {
  onSendTip?: (recipientId: string, amount: number, message?: string) => void;
}

const WalletIntegration: React.FC<WalletIntegrationProps> = ({ onSendTip }) => {
  const { user } = useAuth();
  const {
    wallet,
    tipHistory,
    isLoadingWallet,
    sendTip,
    isSendingTip,
    addFunds,
    isAddingFunds,
    withdrawFunds,
    isWithdrawing
  } = useWallet();

  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const [tipForm, setTipForm] = useState({
    recipientId: '',
    amount: 5,
    message: ''
  });

  const [fundsAmount, setFundsAmount] = useState(50);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const handleSendTip = () => {
    sendTip({
      recipientId: tipForm.recipientId,
      amount: tipForm.amount,
      message: tipForm.message
    });
    
    if (onSendTip) {
      onSendTip(tipForm.recipientId, tipForm.amount, tipForm.message);
    }
    
    setTipForm({ recipientId: '', amount: 5, message: '' });
    setIsTipModalOpen(false);
  };

  const handleAddFunds = () => {
    addFunds(fundsAmount);
    setIsAddFundsModalOpen(false);
  };

  const handleWithdraw = () => {
    withdrawFunds(withdrawAmount);
    setIsWithdrawModalOpen(false);
    setWithdrawAmount(0);
  };

  if (isLoadingWallet) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-16 bg-muted rounded" />
              <div className="h-16 bg-muted rounded" />
              <div className="h-16 bg-muted rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-2xl font-bold text-green-500">
                    ${wallet?.balance?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold text-blue-500">
                    ${wallet?.total_earned?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg border border-orange-500/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-orange-500">
                    ${wallet?.total_spent?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-orange-500" />
              </div>
            </motion.div>
          </div>

          <div className="flex gap-2 mt-6">
            <Dialog open={isAddFundsModalOpen} onOpenChange={setIsAddFundsModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Funds to Wallet</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      value={fundsAmount}
                      onChange={(e) => setFundsAmount(+e.target.value)}
                      min="10"
                      max="1000"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[25, 50, 100, 200].map(amount => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setFundsAmount(amount)}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <Button onClick={handleAddFunds} disabled={isAddingFunds} className="w-full">
                    {isAddingFunds ? 'Processing...' : `Add $${fundsAmount}`}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Minus className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(+e.target.value)}
                      min="10"
                      max={wallet?.balance || 0}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Available: ${wallet?.balance?.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    onClick={handleWithdraw}
                    disabled={isWithdrawing || withdrawAmount <= 0 || withdrawAmount > (wallet?.balance || 0)}
                    className="w-full"
                  >
                    {isWithdrawing ? 'Processing...' : `Withdraw $${withdrawAmount}`}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isTipModalOpen} onOpenChange={setIsTipModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Gift className="w-4 h-4 mr-2" />
                  Send Tip
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Tip</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Recipient ID</Label>
                    <Input
                      placeholder="User ID to tip"
                      value={tipForm.recipientId}
                      onChange={(e) => setTipForm(prev => ({ ...prev, recipientId: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      value={tipForm.amount}
                      onChange={(e) => setTipForm(prev => ({ ...prev, amount: +e.target.value }))}
                      min="1"
                      max={wallet?.balance || 0}
                    />
                  </div>
                  <div>
                    <Label>Message (Optional)</Label>
                    <Textarea
                      placeholder="Add a personal message..."
                      value={tipForm.message}
                      onChange={(e) => setTipForm(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                  <Button
                    onClick={handleSendTip}
                    disabled={isSendingTip || !tipForm.recipientId || tipForm.amount <= 0}
                    className="w-full"
                  >
                    {isSendingTip ? 'Sending...' : `Send $${tipForm.amount}`}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tipHistory.length === 0 ? (
            <div className="text-center py-8">
              <Banknote className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start by sending a tip or adding funds to your wallet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tipHistory.slice(0, 10).map((tip) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      tip.sender_id === user?.id 
                        ? 'bg-red-500/10 text-red-500' 
                        : 'bg-green-500/10 text-green-500'
                    }`}>
                      {tip.sender_id === user?.id ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {tip.sender_id === user?.id ? 'Sent to' : 'Received from'}{' '}
                        {tip.sender_id === user?.id ? tip.recipient_name : tip.sender_name}
                      </p>
                      {tip.message && (
                        <p className="text-sm text-muted-foreground">{tip.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(tip.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    tip.sender_id === user?.id ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {tip.sender_id === user?.id ? '-' : '+'}${tip.amount}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletIntegration;