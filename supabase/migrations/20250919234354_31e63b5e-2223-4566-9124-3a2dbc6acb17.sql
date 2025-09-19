-- Create user wallets table for managing balances
CREATE TABLE public.user_wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  balance NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  total_earned NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  total_spent NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;

-- Create tips/transactions table
CREATE TABLE public.user_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  post_id UUID,
  amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  message TEXT,
  transaction_type TEXT NOT NULL DEFAULT 'tip',
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_tips ENABLE ROW LEVEL SECURITY;

-- Create wallet policies
CREATE POLICY "Users can view their own wallet" 
ON public.user_wallets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallet" 
ON public.user_wallets 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wallet" 
ON public.user_wallets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all wallets" 
ON public.user_wallets 
FOR ALL 
USING (is_admin());

-- Create tips policies
CREATE POLICY "Users can send tips" 
ON public.user_tips 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can view tips they sent or received" 
ON public.user_tips 
FOR SELECT 
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Admins can view all tips" 
ON public.user_tips 
FOR ALL 
USING (is_admin());

-- Create function to handle tip transactions
CREATE OR REPLACE FUNCTION public.send_tip(
  recipient_user_id UUID,
  tip_amount NUMERIC,
  tip_message TEXT DEFAULT NULL,
  related_post_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sender_user_id UUID;
  sender_balance NUMERIC;
  result JSONB;
BEGIN
  -- Get sender ID
  sender_user_id := auth.uid();
  
  IF sender_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;
  
  IF sender_user_id = recipient_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', 'Cannot tip yourself');
  END IF;
  
  IF tip_amount <= 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid tip amount');
  END IF;
  
  -- Check sender balance
  SELECT balance INTO sender_balance 
  FROM public.user_wallets 
  WHERE user_id = sender_user_id;
  
  IF sender_balance IS NULL THEN
    -- Create wallet for sender with initial balance
    INSERT INTO public.user_wallets (user_id, balance) 
    VALUES (sender_user_id, 100.00);
    sender_balance := 100.00;
  END IF;
  
  IF sender_balance < tip_amount THEN
    RETURN jsonb_build_object('success', false, 'error', 'Insufficient balance');
  END IF;
  
  -- Create recipient wallet if doesn't exist
  INSERT INTO public.user_wallets (user_id, balance) 
  VALUES (recipient_user_id, 0.00)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Perform transaction
  BEGIN
    -- Deduct from sender
    UPDATE public.user_wallets 
    SET 
      balance = balance - tip_amount,
      total_spent = total_spent + tip_amount,
      updated_at = now()
    WHERE user_id = sender_user_id;
    
    -- Add to recipient
    UPDATE public.user_wallets 
    SET 
      balance = balance + tip_amount,
      total_earned = total_earned + tip_amount,
      updated_at = now()
    WHERE user_id = recipient_user_id;
    
    -- Record tip transaction
    INSERT INTO public.user_tips (
      sender_id, 
      recipient_id, 
      post_id, 
      amount, 
      message
    ) VALUES (
      sender_user_id, 
      recipient_user_id, 
      related_post_id, 
      tip_amount, 
      tip_message
    );
    
    result := jsonb_build_object(
      'success', true, 
      'message', 'Tip sent successfully',
      'amount', tip_amount
    );
    
  EXCEPTION WHEN OTHERS THEN
    result := jsonb_build_object(
      'success', false, 
      'error', 'Transaction failed: ' || SQLERRM
    );
  END;
  
  RETURN result;
END;
$$;

-- Create function to get user wallet info
CREATE OR REPLACE FUNCTION public.get_user_wallet(wallet_user_id UUID DEFAULT NULL)
RETURNS TABLE(
  user_id UUID,
  balance NUMERIC,
  total_earned NUMERIC,
  total_spent NUMERIC,
  recent_tips_sent JSONB,
  recent_tips_received JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  target_user_id := COALESCE(wallet_user_id, auth.uid());
  
  IF target_user_id IS NULL THEN
    RETURN;
  END IF;
  
  -- Ensure wallet exists
  INSERT INTO public.user_wallets (user_id, balance) 
  VALUES (target_user_id, 100.00)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN QUERY
  SELECT 
    uw.user_id,
    uw.balance,
    uw.total_earned,
    uw.total_spent,
    (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', ut.id,
          'recipient_id', ut.recipient_id,
          'amount', ut.amount,
          'message', ut.message,
          'created_at', ut.created_at,
          'recipient_name', up.display_name
        ) ORDER BY ut.created_at DESC
      ), '[]'::jsonb)
      FROM public.user_tips ut
      LEFT JOIN public.user_profiles up ON ut.recipient_id = up.user_id
      WHERE ut.sender_id = target_user_id
      LIMIT 10
    ) as recent_tips_sent,
    (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', ut.id,
          'sender_id', ut.sender_id,
          'amount', ut.amount,
          'message', ut.message,
          'created_at', ut.created_at,
          'sender_name', up.display_name
        ) ORDER BY ut.created_at DESC
      ), '[]'::jsonb)
      FROM public.user_tips ut
      LEFT JOIN public.user_profiles up ON ut.sender_id = up.user_id
      WHERE ut.recipient_id = target_user_id
      LIMIT 10
    ) as recent_tips_received
  FROM public.user_wallets uw
  WHERE uw.user_id = target_user_id;
END;
$$;

-- Create trigger to update wallet timestamps
CREATE OR REPLACE FUNCTION public.update_wallet_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_user_wallets_timestamp
  BEFORE UPDATE ON public.user_wallets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_wallet_timestamp();

-- Create indexes for performance
CREATE INDEX idx_user_tips_sender_id ON public.user_tips(sender_id);
CREATE INDEX idx_user_tips_recipient_id ON public.user_tips(recipient_id);
CREATE INDEX idx_user_tips_post_id ON public.user_tips(post_id);
CREATE INDEX idx_user_tips_created_at ON public.user_tips(created_at DESC);