import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/sonner'

export interface PrivateGroup {
  id: string
  name: string
  description?: string
  cover_image_url?: string
  group_type: 'prediction' | 'discussion' | 'copy_trading'
  is_invite_only: boolean
  max_members: number
  is_vip: boolean
  owner_id: string
  created_at: string
  updated_at: string
}

export interface GroupMembership {
  id: string
  group_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  status: 'active' | 'pending' | 'banned'
  joined_at: string
  invited_by?: string
  user_profiles?: {
    user_id: string
    display_name: string
    avatar_url?: string
    username?: string
  }
}

export interface GroupPost {
  id: string
  group_id: string
  user_id: string
  content: string
  prediction_type: string
  match_info: any
  prediction_details: any
  confidence_level: number
  stake_amount?: number
  potential_return?: number
  likes_count: number
  comments_count: number
  is_vip_content: boolean
  created_at: string
  updated_at: string
  user_profiles?: {
    user_id: string
    display_name: string
    avatar_url?: string
    username?: string
  }
}

export const usePrivateGroups = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Fetch user's groups
  const {
    data: userGroups = [],
    isLoading: isLoadingGroups,
    error: groupsError
  } = useQuery({
    queryKey: ['user-groups', user?.id],
    queryFn: async () => {
      if (!user) return []

      const { data, error } = await supabase
        .from('private_groups')
        .select(`
          *,
          group_memberships!inner (
            role,
            status,
            joined_at
          )
        `)
        .eq('group_memberships.user_id', user.id)
        .eq('group_memberships.status', 'active')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as (PrivateGroup & { group_memberships: GroupMembership[] })[]
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  })

  // Fetch group members
  const getGroupMembers = (groupId: string) => {
    return useQuery({
      queryKey: ['group-members', groupId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('group_memberships')
          .select(`
            *,
            user_profiles (
              user_id,
              display_name,
              avatar_url,
              username
            )
          `)
          .eq('group_id', groupId)
          .eq('status', 'active')
          .order('joined_at', { ascending: true })

        if (error) throw error
        return data as unknown as GroupMembership[]
      },
      enabled: !!groupId,
    })
  }

  // Fetch group posts
  const getGroupPosts = (groupId: string) => {
    return useQuery({
      queryKey: ['group-posts', groupId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('group_posts')
          .select(`
            *,
            user_profiles (
              user_id,
              display_name,
              avatar_url,
              username
            )
          `)
          .eq('group_id', groupId)
          .order('created_at', { ascending: false })

        if (error) throw error
        return data as unknown as GroupPost[]
      },
      enabled: !!groupId,
    })
  }

  // Create group mutation
  const createGroupMutation = useMutation({
    mutationFn: async (groupData: {
      name: string
      description?: string
      groupType: 'prediction' | 'discussion' | 'copy_trading'
      isInviteOnly: boolean
      maxMembers: number
      isVip: boolean
    }) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('private_groups')
        .insert({
          name: groupData.name,
          description: groupData.description,
          group_type: groupData.groupType,
          is_invite_only: groupData.isInviteOnly,
          max_members: groupData.maxMembers,
          is_vip: groupData.isVip,
          owner_id: user.id
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-groups'] })
      toast.success('Private group created successfully!')
    },
    onError: () => {
      toast.error('Failed to create group')
    }
  })

  // Join group mutation
  const joinGroupMutation = useMutation({
    mutationFn: async (groupId: string) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('group_memberships')
        .insert({
          group_id: groupId,
          user_id: user.id,
          role: 'member',
          status: 'active'
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-groups'] })
      toast.success('Joined group successfully!')
    },
    onError: () => {
      toast.error('Failed to join group')
    }
  })

  // Leave group mutation
  const leaveGroupMutation = useMutation({
    mutationFn: async (groupId: string) => {
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('group_memberships')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-groups'] })
      toast.success('Left group successfully')
    },
    onError: () => {
      toast.error('Failed to leave group')
    }
  })

  // Create group post mutation
  const createGroupPostMutation = useMutation({
    mutationFn: async ({
      groupId,
      content,
      predictionType = 'general',
      isVipContent = false
    }: {
      groupId: string
      content: string
      predictionType?: string
      isVipContent?: boolean
    }) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('group_posts')
        .insert({
          group_id: groupId,
          user_id: user.id,
          content,
          prediction_type: predictionType,
          match_info: { match: 'Group Prediction' },
          prediction_details: { prediction: 'Group Prediction' },
          confidence_level: 70,
          is_vip_content: isVipContent
        })
        .select(`
          *,
          user_profiles!group_posts_user_id_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['group-posts', variables.groupId] })
      toast.success('Group post created!')
    },
    onError: () => {
      toast.error('Failed to create group post')
    }
  })

  return {
    userGroups,
    isLoadingGroups,
    groupsError,
    getGroupMembers,
    getGroupPosts,
    createGroup: createGroupMutation.mutate,
    isCreatingGroup: createGroupMutation.isPending,
    joinGroup: joinGroupMutation.mutate,
    isJoiningGroup: joinGroupMutation.isPending,
    leaveGroup: leaveGroupMutation.mutate,
    isLeavingGroup: leaveGroupMutation.isPending,
    createGroupPost: createGroupPostMutation.mutate,
    isCreatingGroupPost: createGroupPostMutation.isPending
  }
}