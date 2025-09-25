import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Star, 
  Shield, Award, Target, Copy, Settings, Plus,
  BarChart3, Activity, Wallet, AlertTriangle, User
} from 'lucide-react';
import { useCopyTrading } from '@/hooks/useCopyTrading';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const CopyTradingDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    expertTraders,
    copyRelationships,
    isLoadingExperts,
    becomeExpert,
    isBecomingExpert,
    startCopying,
    isStartingCopy,
    stopCopying,
    updateCopySettings
  } = useCopyTrading();

  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);

  // Expert application form
  const [expertForm, setExpertForm] = useState({
    specialization: [] as string[],
    riskLevel: 'medium' as 'low' | 'medium' | 'high',
    maxCopyAmount: 1000,
    minCopyAmount: 10,
    commissionRate: 5
  });

  // Copy trading form
  const [copyForm, setCopyForm] = useState({
    maxBetAmount: 100,
    copyPercentage: 50,
    allowedSports: ['football', 'basketball'],
    autoEnabled: true
  });

  const handleBecomeExpert = () => {
    becomeExpert(expertForm);
    setIsExpertModalOpen(false);
  };

  const handleStartCopying = () => {
    if (!selectedExpert) return;
    
    startCopying({
      expertId: selectedExpert.id,
      ...copyForm
    });
    setIsCopyModalOpen(false);
    setSelectedExpert(null);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'high': return 'text-red-500 bg-red-500/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTierBadge = (tier: string) => {
    const config = {
      standard: { label: 'Standard', color: 'bg-blue-500' },
      premium: { label: 'Premium', color: 'bg-purple-500' },
      elite: { label: 'Elite', color: 'bg-gold-500' }
    };
    return config[tier as keyof typeof config] || config.standard;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Copy Trading</h2>
          <p className="text-muted-foreground">Follow expert traders and copy their strategies</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isExpertModalOpen} onOpenChange={setIsExpertModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Become Expert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Become Expert Trader</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Specialization</Label>
                  <Select onValueChange={(value) => setExpertForm(prev => ({ ...prev, specialization: [value] }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                      <SelectItem value="general">General Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Risk Level</Label>
                  <Select onValueChange={(value: any) => setExpertForm(prev => ({ ...prev, riskLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Copy ($)</Label>
                    <Input
                      type="number"
                      value={expertForm.minCopyAmount}
                      onChange={(e) => setExpertForm(prev => ({ ...prev, minCopyAmount: +e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Max Copy ($)</Label>
                    <Input
                      type="number"
                      value={expertForm.maxCopyAmount}
                      onChange={(e) => setExpertForm(prev => ({ ...prev, maxCopyAmount: +e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Commission Rate (%)</Label>
                  <Input
                    type="number"
                    max="20"
                    value={expertForm.commissionRate}
                    onChange={(e) => setExpertForm(prev => ({ ...prev, commissionRate: +e.target.value }))}
                  />
                </div>
                
                <Button onClick={handleBecomeExpert} disabled={isBecomingExpert} className="w-full">
                  {isBecomingExpert ? 'Applying...' : 'Apply to be Expert'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="experts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="experts">Expert Traders</TabsTrigger>
          <TabsTrigger value="my-copies">My Copies ({copyRelationships.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="experts" className="space-y-4">
          <div className="grid gap-4">
            {expertTraders.map((expert) => (
              <Card key={expert.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={expert.user_profiles?.avatar_url} />
                      <AvatarFallback>
                        {expert.user_profiles?.display_name?.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{expert.user_profiles?.display_name}</h3>
                        {expert.is_verified_expert && (
                          <Shield className="w-4 h-4 text-blue-500" />
                        )}
                        <Badge className={getTierBadge(expert.expert_tier).color}>
                          {getTierBadge(expert.expert_tier).label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {expert.specialization.join(', ')} • {expert.total_followers} followers
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${expert.profit_30d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {expert.profit_30d >= 0 ? '+' : ''}{expert.profit_30d}%
                      </div>
                      <p className="text-xs text-muted-foreground">30d Profit</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {expert.win_rate_30d}%
                      </div>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                    
                    <Badge className={getRiskColor(expert.risk_level)}>
                      {expert.risk_level} risk
                    </Badge>
                    
                    <Button
                      onClick={() => {
                        setSelectedExpert(expert);
                        setIsCopyModalOpen(true);
                      }}
                      disabled={isStartingCopy}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-copies" className="space-y-4">
          {copyRelationships.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">You're not copying any experts yet</p>
              <p className="text-sm text-muted-foreground mt-2">Start by finding an expert trader to follow</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {copyRelationships.map((relationship) => (
                <Card key={relationship.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Expert Trader</h3>
                        <p className="text-sm text-muted-foreground">
                          Copying {relationship.copy_percentage}% • Max ${relationship.max_bet_amount}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${relationship.current_profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${relationship.current_profit}
                        </div>
                        <p className="text-xs text-muted-foreground">Current P&L</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {relationship.total_copied_bets}
                        </div>
                        <p className="text-xs text-muted-foreground">Bets Copied</p>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => stopCopying(relationship.id)}
                      >
                        Stop Copying
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Copy Trading Modal */}
      <Dialog open={isCopyModalOpen} onOpenChange={setIsCopyModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Copy {selectedExpert?.user_profiles?.display_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Max Bet Amount ($)</Label>
                <Input
                  type="number"
                  value={copyForm.maxBetAmount}
                  onChange={(e) => setCopyForm(prev => ({ ...prev, maxBetAmount: +e.target.value }))}
                />
              </div>
              <div>
                <Label>Copy Percentage (%)</Label>
                <Input
                  type="number"
                  max="100"
                  value={copyForm.copyPercentage}
                  onChange={(e) => setCopyForm(prev => ({ ...prev, copyPercentage: +e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label>Allowed Sports</Label>
              <div className="flex gap-2 mt-2">
                {['football', 'basketball', 'tennis'].map(sport => (
                  <Badge
                    key={sport}
                    variant={copyForm.allowedSports.includes(sport) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      setCopyForm(prev => ({
                        ...prev,
                        allowedSports: prev.allowedSports.includes(sport)
                          ? prev.allowedSports.filter(s => s !== sport)
                          : [...prev.allowedSports, sport]
                      }));
                    }}
                  >
                    {sport}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button onClick={handleStartCopying} disabled={isStartingCopy} className="w-full">
              {isStartingCopy ? 'Starting...' : 'Start Copying'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CopyTradingDashboard;