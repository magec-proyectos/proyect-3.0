import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/sonner'

export interface ExpertTrader {
  id: string
  user_id: string
  is_accepting_copiers: boolean
  expert_tier: 'standard' | 'premium' | 'elite'
  profit_30d: number
  win_rate_30d: number
  total_copied_amount: number
  total_followers: number
  performance_stats: any
  risk_level: 'low' | 'medium' | 'high'
  specialization: string[]
  max_copy_amount: number
  min_copy_amount: number
  commission_rate: number
  monthly_fee: number
  is_verified_expert: boolean
  user_profiles?: {
    user_id: string
    display_name: string
    avatar_url?: string
    username?: string
  }
}

export interface CopyTradingRelationship {
  id: string
  expert_id: string
  follower_id: string
  max_bet_amount: number
  copy_percentage: number
  is_active: boolean
  allowed_sports: string[]
  current_profit: number
  total_profit: number
  total_invested: number
  total_copied_bets: number
  profit_target_percentage: number
  stop_loss_percentage: number
  auto_copy_enabled: boolean
  risk_multiplier: number
  max_odds: number
  min_odds: number
}

export const useCopyTrading = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Fetch expert traders
  const {
    data: expertTraders = [],
    isLoading: isLoadingExperts,
    error: expertsError
  } = useQuery({
    queryKey: ['expert-traders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expert_traders')
        .select(`
          *,
          user_profiles (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .eq('is_accepting_copiers', true)
        .order('profit_30d', { ascending: false })

      if (error) throw error
      return data as unknown as ExpertTrader[]
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Fetch user's copy trading relationships
  const {
    data: copyRelationships = [],
    isLoading: isLoadingRelationships
  } = useQuery({
    queryKey: ['copy-relationships', user?.id],
    queryFn: async () => {
      if (!user) return []

      const { data, error } = await supabase
        .from('copy_trading_relationships')
        .select('*')
        .eq('follower_id', user.id)
        .eq('is_active', true)

      if (error) throw error
      return data as CopyTradingRelationship[]
    },
    enabled: !!user,
  })

  // Become expert trader mutation
  const becomeExpertMutation = useMutation({
    mutationFn: async (expertData: {
      specialization: string[]
      riskLevel: 'low' | 'medium' | 'high'
      maxCopyAmount: number
      minCopyAmount: number
      commissionRate: number
    }) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('expert_traders')
        .insert({
          user_id: user.id,
          specialization: expertData.specialization,
          risk_level: expertData.riskLevel,
          max_copy_amount: expertData.maxCopyAmount,
          min_copy_amount: expertData.minCopyAmount,
          commission_rate: expertData.commissionRate / 100, // Convert percentage to decimal
          is_accepting_copiers: true,
          expert_tier: 'standard'
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expert-traders'] })
      toast.success('You are now an expert trader!')
    },
    onError: () => {
      toast.error('Failed to become expert trader')
    }
  })

  // Start copying expert mutation
  const startCopyingMutation = useMutation({
    mutationFn: async (copyData: {
      expertId: string
      maxBetAmount: number
      copyPercentage: number
      allowedSports: string[]
      autoEnabled: boolean
    }) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('copy_trading_relationships')
        .insert({
          expert_id: copyData.expertId,
          follower_id: user.id,
          max_bet_amount: copyData.maxBetAmount,
          copy_percentage: copyData.copyPercentage,
          allowed_sports: copyData.allowedSports,
          auto_copy_enabled: copyData.autoEnabled,
          is_active: true
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['copy-relationships'] })
      queryClient.invalidateQueries({ queryKey: ['expert-traders'] })
      toast.success('Started copying expert trader!')
    },
    onError: () => {
      toast.error('Failed to start copying expert')
    }
  })

  // Stop copying expert mutation
  const stopCopyingMutation = useMutation({
    mutationFn: async (relationshipId: string) => {
      const { error } = await supabase
        .from('copy_trading_relationships')
        .update({ is_active: false })
        .eq('id', relationshipId)
        .eq('follower_id', user?.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['copy-relationships'] })
      toast.success('Stopped copying expert trader')
    },
    onError: () => {
      toast.error('Failed to stop copying expert')
    }
  })

  // Update copy settings mutation
  const updateCopySettingsMutation = useMutation({
    mutationFn: async ({
      relationshipId,
      settings
    }: {
      relationshipId: string
      settings: Partial<CopyTradingRelationship>
    }) => {
      const { error } = await supabase
        .from('copy_trading_relationships')
        .update(settings)
        .eq('id', relationshipId)
        .eq('follower_id', user?.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['copy-relationships'] })
      toast.success('Copy settings updated!')
    },
    onError: () => {
      toast.error('Failed to update settings')
    }
  })

  return {
    expertTraders,
    copyRelationships,
    isLoadingExperts,
    isLoadingRelationships,
    expertsError,
    becomeExpert: becomeExpertMutation.mutate,
    isBecomingExpert: becomeExpertMutation.isPending,
    startCopying: startCopyingMutation.mutate,
    isStartingCopy: startCopyingMutation.isPending,
    stopCopying: stopCopyingMutation.mutate,
    isStoppingCopy: stopCopyingMutation.isPending,
    updateCopySettings: updateCopySettingsMutation.mutate,
    isUpdatingSettings: updateCopySettingsMutation.isPending
  }
}