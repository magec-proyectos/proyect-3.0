-- Create copy trading system tables
CREATE TABLE public.expert_traders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  is_verified_expert BOOLEAN NOT NULL DEFAULT false,
  expert_tier TEXT NOT NULL DEFAULT 'standard',
  monthly_fee NUMERIC DEFAULT 0.00,
  commission_rate NUMERIC DEFAULT 0.05,
  min_copy_amount NUMERIC DEFAULT 10.00,
  max_copy_amount NUMERIC DEFAULT 1000.00,
  risk_level TEXT NOT NULL DEFAULT 'medium',
  specialization TEXT[] DEFAULT '{}',
  performance_stats JSONB NOT NULL DEFAULT '{}',
  total_followers INTEGER DEFAULT 0,
  total_copied_amount NUMERIC DEFAULT 0.00,
  win_rate_30d NUMERIC DEFAULT 0.00,
  profit_30d NUMERIC DEFAULT 0.00,
  is_accepting_copiers BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create copy trading relationships
CREATE TABLE public.copy_trading_relationships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID NOT NULL,
  expert_id UUID NOT NULL REFERENCES public.expert_traders(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  copy_percentage NUMERIC NOT NULL DEFAULT 100.00,
  max_bet_amount NUMERIC NOT NULL DEFAULT 100.00,
  min_odds NUMERIC DEFAULT 1.50,
  max_odds NUMERIC DEFAULT 10.00,
  allowed_sports TEXT[] DEFAULT '{"football", "basketball", "tennis"}',
  risk_multiplier NUMERIC DEFAULT 1.00,
  auto_copy_enabled BOOLEAN NOT NULL DEFAULT true,
  stop_loss_percentage NUMERIC DEFAULT 20.00,
  profit_target_percentage NUMERIC DEFAULT 50.00,
  total_copied_bets INTEGER DEFAULT 0,
  total_invested NUMERIC DEFAULT 0.00,
  total_profit NUMERIC DEFAULT 0.00,
  current_profit NUMERIC DEFAULT 0.00,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(follower_id, expert_id)
);

-- Create copied bets tracking
CREATE TABLE public.copied_bets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  copy_relationship_id UUID NOT NULL REFERENCES public.copy_trading_relationships(id) ON DELETE CASCADE,
  original_post_id UUID NOT NULL REFERENCES public.user_posts(id) ON DELETE CASCADE,
  follower_id UUID NOT NULL,
  expert_id UUID NOT NULL,
  copied_amount NUMERIC NOT NULL,
  original_odds NUMERIC NOT NULL,
  bet_details JSONB NOT NULL DEFAULT '{}',
  match_info JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  result TEXT,
  profit_loss NUMERIC DEFAULT 0.00,
  is_auto_copied BOOLEAN NOT NULL DEFAULT true,
  copied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  settled_at TIMESTAMP WITH TIME ZONE
);

-- Create copy trading portfolio
CREATE TABLE public.copy_trading_portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  total_balance NUMERIC NOT NULL DEFAULT 0.00,
  available_balance NUMERIC NOT NULL DEFAULT 0.00,
  total_invested NUMERIC DEFAULT 0.00,
  total_profit NUMERIC DEFAULT 0.00,
  total_loss NUMERIC DEFAULT 0.00,
  roi_percentage NUMERIC DEFAULT 0.00,
  active_copy_trades INTEGER DEFAULT 0,
  total_copy_trades INTEGER DEFAULT 0,
  risk_score NUMERIC DEFAULT 5.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.expert_traders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_trading_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copied_bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_trading_portfolios ENABLE ROW LEVEL SECURITY;

-- RLS Policies for expert_traders
CREATE POLICY "Public can view expert traders" 
ON public.expert_traders 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their expert profile" 
ON public.expert_traders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their expert profile" 
ON public.expert_traders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for copy_trading_relationships
CREATE POLICY "Users can view their copy relationships" 
ON public.copy_trading_relationships 
FOR SELECT 
USING (auth.uid() = follower_id OR expert_id IN (
  SELECT id FROM public.expert_traders WHERE user_id = auth.uid()
));

CREATE POLICY "Users can create copy relationships" 
ON public.copy_trading_relationships 
FOR INSERT 
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can update their copy relationships" 
ON public.copy_trading_relationships 
FOR UPDATE 
USING (auth.uid() = follower_id);

-- RLS Policies for copied_bets
CREATE POLICY "Users can view their copied bets" 
ON public.copied_bets 
FOR SELECT 
USING (auth.uid() = follower_id OR expert_id IN (
  SELECT id FROM public.expert_traders WHERE user_id = auth.uid()
));

CREATE POLICY "System can create copied bets" 
ON public.copied_bets 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for copy_trading_portfolios
CREATE POLICY "Users can view their own portfolio" 
ON public.copy_trading_portfolios 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio" 
ON public.copy_trading_portfolios 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_expert_traders_user_id ON public.expert_traders(user_id);
CREATE INDEX idx_expert_traders_win_rate ON public.expert_traders(win_rate_30d DESC);
CREATE INDEX idx_copy_relationships_follower ON public.copy_trading_relationships(follower_id);
CREATE INDEX idx_copy_relationships_expert ON public.copy_trading_relationships(expert_id);
CREATE INDEX idx_copied_bets_relationship ON public.copied_bets(copy_relationship_id);
CREATE INDEX idx_copied_bets_status ON public.copied_bets(status);

-- Create function to update expert trader stats
CREATE OR REPLACE FUNCTION public.update_expert_trader_stats(expert_trader_id UUID)
RETURNS void AS $$
DECLARE
  total_bets INTEGER;
  won_bets INTEGER;
  total_profit NUMERIC;
  follower_count INTEGER;
BEGIN
  -- Calculate win rate and profit from copied bets (last 30 days)
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE result = 'won'),
    COALESCE(SUM(profit_loss), 0)
  INTO total_bets, won_bets, total_profit
  FROM public.copied_bets 
  WHERE expert_id = expert_trader_id 
    AND copied_at >= now() - INTERVAL '30 days'
    AND status = 'settled';
  
  -- Get follower count
  SELECT COUNT(*) 
  INTO follower_count
  FROM public.copy_trading_relationships 
  WHERE expert_id = expert_trader_id AND is_active = true;
  
  -- Update expert trader stats
  UPDATE public.expert_traders 
  SET 
    win_rate_30d = CASE 
      WHEN total_bets > 0 THEN (won_bets::NUMERIC / total_bets::NUMERIC) * 100
      ELSE 0 
    END,
    profit_30d = total_profit,
    total_followers = follower_count,
    updated_at = now()
  WHERE id = expert_trader_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;