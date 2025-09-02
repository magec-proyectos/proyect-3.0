-- Create badges_catalog table for predefined badges
CREATE TABLE public.badges_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Badge Info
  badge_key TEXT NOT NULL UNIQUE, -- 'predictor_pro', 'hot_streak', etc.
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL, -- Lucide icon name
  
  -- Visual styling
  color_scheme TEXT NOT NULL DEFAULT 'blue', -- 'gold', 'silver', 'bronze', 'blue', 'green', 'purple', 'red'
  rarity TEXT NOT NULL DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  
  -- Requirements
  requirements JSONB NOT NULL DEFAULT '{}'::jsonb,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'prediction', 'social', 'streak', 'earnings', 'special')),
  
  -- Badge properties
  is_active BOOLEAN DEFAULT true,
  is_secret BOOLEAN DEFAULT false, -- Hidden until earned
  max_level INTEGER DEFAULT 1, -- For progressive badges
  sort_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_badges table for earned badges
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_key TEXT NOT NULL REFERENCES badges_catalog(badge_key) ON DELETE CASCADE,
  
  -- Badge progress
  level INTEGER DEFAULT 1,
  progress JSONB DEFAULT '{}'::jsonb, -- Track progress towards next level
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Context when earned
  earned_for JSONB DEFAULT '{}'::jsonb, -- What triggered the badge
  
  UNIQUE(user_id, badge_key)
);

-- Enable RLS
ALTER TABLE public.badges_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Create policies for badges_catalog
CREATE POLICY "Everyone can view active badges catalog" 
ON public.badges_catalog 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage badges catalog" 
ON public.badges_catalog 
FOR ALL 
USING (is_admin());

-- Create policies for user_badges
CREATE POLICY "Users can view their own badges" 
ON public.user_badges 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Public can view all user badges" 
ON public.user_badges 
FOR SELECT 
USING (true);

CREATE POLICY "System can award badges" 
ON public.user_badges 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their badge progress" 
ON public.user_badges 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all user badges" 
ON public.user_badges 
FOR ALL 
USING (is_admin());

-- Create indexes
CREATE INDEX idx_badges_catalog_category ON public.badges_catalog(category);
CREATE INDEX idx_badges_catalog_rarity ON public.badges_catalog(rarity);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_user_badges_badge_key ON public.user_badges(badge_key);
CREATE INDEX idx_user_badges_earned_at ON public.user_badges(earned_at);

-- Enable realtime
ALTER TABLE public.badges_catalog REPLICA IDENTITY FULL;
ALTER TABLE public.user_badges REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.badges_catalog;
ALTER publication supabase_realtime ADD TABLE public.user_badges;

-- Insert predefined badges
INSERT INTO public.badges_catalog (badge_key, name, description, icon_name, color_scheme, rarity, requirements, category) VALUES
-- Prediction badges
('predictor_pro', 'Predictor Pro', 'Alcanza un 75% de aciertos con más de 100 predicciones', 'target', 'purple', 'epic', '{"min_predictions": 100, "min_win_rate": 75}', 'prediction'),
('prediction_master', 'Master Predictor', 'Alcanza un 85% de aciertos con más de 200 predicciones', 'crown', 'gold', 'legendary', '{"min_predictions": 200, "min_win_rate": 85}', 'prediction'),
('rookie_predictor', 'Rookie Predictor', 'Realiza tu primera predicción correcta', 'user-check', 'green', 'common', '{"min_correct_predictions": 1}', 'prediction'),
('sharp_shooter', 'Sharp Shooter', 'Consigue 50 predicciones correctas', 'crosshair', 'blue', 'rare', '{"min_correct_predictions": 50}', 'prediction'),

-- Streak badges
('hot_streak', 'Hot Streak', 'Consigue una racha de 5 victorias consecutivas', 'flame', 'red', 'rare', '{"min_streak": 5}', 'streak'),
('fire_streak', 'On Fire', 'Consigue una racha de 10 victorias consecutivas', 'zap', 'orange', 'epic', '{"min_streak": 10}', 'streak'),
('legendary_streak', 'Legendary Streak', 'Consigue una racha de 20 victorias consecutivas', 'star', 'gold', 'legendary', '{"min_streak": 20}', 'streak'),

-- Social badges
('social_butterfly', 'Social Butterfly', 'Consigue 100 seguidores', 'users', 'blue', 'rare', '{"min_followers": 100}', 'social'),
('influencer', 'Influencer', 'Consigue 500 seguidores', 'trending-up', 'purple', 'epic', '{"min_followers": 500}', 'social'),
('community_leader', 'Community Leader', 'Consigue 1000 seguidores', 'crown', 'gold', 'legendary', '{"min_followers": 1000}', 'social'),
('likes_magnet', 'Likes Magnet', 'Recibe 500 likes en total', 'heart', 'red', 'rare', '{"min_likes_received": 500}', 'social'),

-- Earnings badges
('profit_maker', 'Profit Maker', 'Gana más de €1000 en total', 'trending-up', 'green', 'rare', '{"min_total_winnings": 1000}', 'earnings'),
('money_master', 'Money Master', 'Gana más de €5000 en total', 'dollar-sign', 'gold', 'epic', '{"min_total_winnings": 5000}', 'earnings'),
('jackpot_king', 'Jackpot King', 'Gana más de €10000 en total', 'gem', 'gold', 'legendary', '{"min_total_winnings": 10000}', 'earnings'),

-- Level badges
('rising_star', 'Rising Star', 'Alcanza el nivel 10', 'star', 'blue', 'common', '{"min_level": 10}', 'general'),
('veteran_player', 'Veteran Player', 'Alcanza el nivel 25', 'shield', 'purple', 'rare', '{"min_level": 25}', 'general'),
('elite_member', 'Elite Member', 'Alcanza el nivel 50', 'crown', 'gold', 'epic', '{"min_level": 50}', 'general'),

-- Special badges
('early_adopter', 'Early Adopter', 'Uno de los primeros 100 usuarios registrados', 'clock', 'gold', 'legendary', '{"special": "early_adopter"}', 'special'),
('perfectionist', 'Perfectionist', 'Consigue 10 predicciones perfectas seguidas', 'check-circle', 'gold', 'legendary', '{"perfect_streak": 10}', 'special'),
('night_owl', 'Night Owl', 'Realiza predicciones después de medianoche', 'moon', 'purple', 'rare', '{"night_predictions": 10}', 'special'),
('weekend_warrior', 'Weekend Warrior', 'Activo todos los fines de semana durante un mes', 'calendar', 'blue', 'rare', '{"weekend_activity": 4}', 'special');

-- Create function to check and award badges
CREATE OR REPLACE FUNCTION public.check_and_award_badges(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile_data RECORD;
  badge_data RECORD;
  badges_awarded INTEGER := 0;
  badge_requirements JSONB;
BEGIN
  -- Get user profile data
  SELECT * INTO profile_data 
  FROM public.user_profiles 
  WHERE user_id = user_uuid;
  
  IF profile_data IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Check all active badges
  FOR badge_data IN 
    SELECT * FROM public.badges_catalog 
    WHERE is_active = true 
    AND badge_key NOT IN (
      SELECT badge_key FROM public.user_badges WHERE user_id = user_uuid
    )
  LOOP
    badge_requirements := badge_data.requirements;
    
    -- Check if user meets requirements
    IF (
      -- Prediction requirements
      (badge_requirements->>'min_predictions' IS NULL OR 
       profile_data.total_predictions >= (badge_requirements->>'min_predictions')::integer) AND
      (badge_requirements->>'min_win_rate' IS NULL OR 
       profile_data.win_rate >= (badge_requirements->>'min_win_rate')::decimal) AND
      (badge_requirements->>'min_correct_predictions' IS NULL OR 
       profile_data.correct_predictions >= (badge_requirements->>'min_correct_predictions')::integer) AND
       
      -- Streak requirements
      (badge_requirements->>'min_streak' IS NULL OR 
       profile_data.best_streak >= (badge_requirements->>'min_streak')::integer) AND
       
      -- Social requirements
      (badge_requirements->>'min_followers' IS NULL OR 
       profile_data.followers_count >= (badge_requirements->>'min_followers')::integer) AND
      (badge_requirements->>'min_likes_received' IS NULL OR 
       profile_data.likes_received >= (badge_requirements->>'min_likes_received')::integer) AND
       
      -- Earnings requirements
      (badge_requirements->>'min_total_winnings' IS NULL OR 
       profile_data.total_winnings >= (badge_requirements->>'min_total_winnings')::decimal) AND
       
      -- Level requirements
      (badge_requirements->>'min_level' IS NULL OR 
       profile_data.level >= (badge_requirements->>'min_level')::integer)
    ) THEN
      -- Award the badge
      INSERT INTO public.user_badges (user_id, badge_key, earned_for)
      VALUES (
        user_uuid, 
        badge_data.badge_key,
        jsonb_build_object(
          'current_stats', jsonb_build_object(
            'predictions', profile_data.total_predictions,
            'win_rate', profile_data.win_rate,
            'streak', profile_data.best_streak,
            'followers', profile_data.followers_count,
            'level', profile_data.level
          ),
          'awarded_at', now()
        )
      );
      
      badges_awarded := badges_awarded + 1;
    END IF;
  END LOOP;
  
  RETURN badges_awarded;
END;
$$;

-- Create function to get user badges with details
CREATE OR REPLACE FUNCTION public.get_user_badges_with_details(user_uuid UUID)
RETURNS TABLE(
  badge_key TEXT,
  name TEXT,
  description TEXT,
  icon_name TEXT,
  color_scheme TEXT,
  rarity TEXT,
  category TEXT,
  level INTEGER,
  earned_at TIMESTAMP WITH TIME ZONE,
  earned_for JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bc.badge_key,
    bc.name,
    bc.description,
    bc.icon_name,
    bc.color_scheme,
    bc.rarity,
    bc.category,
    ub.level,
    ub.earned_at,
    ub.earned_for
  FROM public.user_badges ub
  JOIN public.badges_catalog bc ON ub.badge_key = bc.badge_key
  WHERE ub.user_id = user_uuid
  ORDER BY ub.earned_at DESC;
END;
$$;

-- Create trigger to auto-check badges when profile updates
CREATE OR REPLACE FUNCTION public.auto_check_badges()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  badges_awarded INTEGER;
BEGIN
  -- Check for new badges when profile updates
  IF NEW.total_predictions > OLD.total_predictions OR 
     NEW.win_rate > OLD.win_rate OR 
     NEW.followers_count > OLD.followers_count OR
     NEW.level > OLD.level OR
     NEW.best_streak > OLD.best_streak OR
     NEW.total_winnings > OLD.total_winnings THEN
    
    badges_awarded := public.check_and_award_badges(NEW.user_id);
    
    -- Could add notification logic here if badges were awarded
    IF badges_awarded > 0 THEN
      -- Future: trigger notification
      NULL;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for auto badge checking
CREATE TRIGGER auto_check_badges_trigger
  AFTER UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_check_badges();