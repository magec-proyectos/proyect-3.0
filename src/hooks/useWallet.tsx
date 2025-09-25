import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/sonner'

export interface UserWallet {
  user_id: string
  balance: number
  total_earned: number
  total_spent: number
  recent_tips_sent: any[]
  recent_tips_received: any[]
}

export interface UserTip {
  id: string
  sender_id: string
  recipient_id: string
  post_id?: string
  amount: number
  message?: string
  created_at: string
  sender_name?: string
  recipient_name?: string
}

export const useWallet = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Fetch user wallet
  const {
    data: wallet,
    isLoading: isLoadingWallet,
    error: walletError
  } = useQuery({
    queryKey: ['user-wallet', user?.id],
    queryFn: async () => {
      if (!user) return null

      const { data, error } = await supabase
        .rpc('get_user_wallet', { wallet_user_id: user.id })

      if (error) throw error
      return data?.[0] as UserWallet || null
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  // Fetch tip history
  const {
    data: tipHistory = [],
    isLoading: isLoadingTips
  } = useQuery({
    queryKey: ['tip-history', user?.id],
    queryFn: async () => {
      if (!user) return []

      const { data, error } = await supabase
        .from('user_tips')
        .select(`
          *,
          sender_profiles:user_profiles!user_tips_sender_id_fkey (
            display_name
          ),
          recipient_profiles:user_profiles!user_tips_recipient_id_fkey (
            display_name
          )
        `)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      return data.map(tip => ({
        ...tip,
        sender_name: (tip.sender_profiles as any)?.display_name,
        recipient_name: (tip.recipient_profiles as any)?.display_name
      })) as UserTip[]
    },
    enabled: !!user,
  })

  // Send tip mutation using the database function
  const sendTipMutation = useMutation({
    mutationFn: async ({
      recipientId,
      amount,
      message,
      postId
    }: {
      recipientId: string
      amount: number
      message?: string
      postId?: string
    }) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .rpc('send_tip', {
          recipient_user_id: recipientId,
          tip_amount: amount,
          tip_message: message || null,
          related_post_id: postId || null
        })

      if (error) throw error
      
      const result = data as { success: boolean; error?: string; message?: string }
      if (!result.success) {
        throw new Error(result.error || 'Failed to send tip')
      }
      
      return result
    },
    onMutate: async ({ amount }) => {
      // Optimistic update
      if (wallet) {
        queryClient.setQueryData(['user-wallet', user?.id], {
          ...wallet,
          balance: wallet.balance - amount,
          total_spent: wallet.total_spent + amount
        })
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['user-wallet'] })
      queryClient.invalidateQueries({ queryKey: ['tip-history'] })
      toast.success(result.message || 'Tip sent successfully!')
    },
    onError: (error, variables) => {
      // Revert optimistic update
      queryClient.invalidateQueries({ queryKey: ['user-wallet'] })
      toast.error(error.message || 'Failed to send tip')
    }
  })

  // Add funds mutation (simulation for demo)
  const addFundsMutation = useMutation({
    mutationFn: async (amount: number) => {
      if (!user) throw new Error('User not authenticated')

      // In a real app, this would integrate with a payment processor
      // For demo purposes, we'll directly update the wallet
      const { data, error } = await supabase
        .from('user_wallets')
        .update({ 
          balance: (wallet?.balance || 0) + amount,
          total_earned: (wallet?.total_earned || 0) + amount 
        })
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-wallet'] })
      toast.success('Funds added successfully!')
    },
    onError: () => {
      toast.error('Failed to add funds')
    }
  })

  // Withdraw funds mutation (simulation for demo)
  const withdrawFundsMutation = useMutation({
    mutationFn: async (amount: number) => {
      if (!user) throw new Error('User not authenticated')
      
      if (!wallet || wallet.balance < amount) {
        throw new Error('Insufficient balance')
      }

      // In a real app, this would integrate with a payment processor
      const { data, error } = await supabase
        .from('user_wallets')
        .update({ 
          balance: wallet.balance - amount,
          total_spent: wallet.total_spent + amount 
        })
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-wallet'] })
      toast.success('Withdrawal processed successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to process withdrawal')
    }
  })

  return {
    wallet,
    tipHistory,
    isLoadingWallet,
    isLoadingTips,
    walletError,
    sendTip: sendTipMutation.mutate,
    isSendingTip: sendTipMutation.isPending,
    addFunds: addFundsMutation.mutate,
    isAddingFunds: addFundsMutation.isPending,
    withdrawFunds: withdrawFundsMutation.mutate,
    isWithdrawing: withdrawFundsMutation.isPending
  }
}