import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/sonner'
import { RealPost } from './useRealSocialData'

const POSTS_PER_PAGE = 10

export const useSocialQuery = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Infinite query for posts
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['social-posts'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data, error } = await supabase
        .from('user_posts')
        .select(`
          *,
          user_profiles!user_posts_user_id_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .range(pageParam * POSTS_PER_PAGE, (pageParam + 1) * POSTS_PER_PAGE - 1)

      if (error) throw error
      return data as unknown as RealPost[]
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === POSTS_PER_PAGE ? allPages.length : undefined
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  // Flatten posts data
  const posts = postsData?.pages.flatMap(page => page) || []

  // Create post mutation with optimistic updates
  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('user_posts')
        .insert({
          user_id: user.id,
          content: content.trim(),
          prediction_type: 'general',
          match_info: { match: 'Custom Prediction' },
          prediction_details: { prediction: 'User Prediction' },
          confidence_level: 70,
          is_public: true
        })
        .select(`
          *,
          user_profiles!user_posts_user_id_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .single()

      if (error) throw error
      return data as unknown as RealPost
    },
    onMutate: async (content) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['social-posts'] })

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['social-posts'])

      // Optimistically update to the new value
      if (user) {
        const optimisticPost: RealPost = {
          id: `temp-${Date.now()}`,
          user_id: user.id,
          content: content.trim(),
          prediction_type: 'general',
          match_info: { match: 'Custom Prediction' },
          prediction_details: { prediction: 'User Prediction' },
          confidence_level: 70,
          is_public: true,
          likes_count: 0,
          comments_count: 0,
          shares_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_profiles: {
            id: user.id,
            display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            avatar_url: user.user_metadata?.avatar_url || '',
            username: user.email?.split('@')[0] || 'user'
          }
        }

        queryClient.setQueryData(['social-posts'], (old: any) => {
          if (!old) return { pages: [[optimisticPost]], pageParams: [0] }
          return {
            ...old,
            pages: [[optimisticPost, ...old.pages[0]], ...old.pages.slice(1)]
          }
        })
      }

      return { previousPosts }
    },
    onError: (err, content, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['social-posts'], context.previousPosts)
      }
      toast.error('Failed to create post')
    },
    onSuccess: (newPost) => {
      // Replace optimistic post with real post
      queryClient.setQueryData(['social-posts'], (old: any) => {
        if (!old) return { pages: [[newPost]], pageParams: [0] }
        
        const updatedPages = old.pages.map((page: RealPost[], pageIndex: number) => {
          if (pageIndex === 0) {
            return page.map(post => 
              post.id.startsWith('temp-') ? newPost : post
            )
          }
          return page
        })
        
        return { ...old, pages: updatedPages }
      })
      toast.success('Post created successfully!')
    },
  })

  // Reaction mutation with optimistic updates
  const reactionMutation = useMutation({
    mutationFn: async ({ postId, reactionType }: { postId: string, reactionType: string }) => {
      if (!user) throw new Error('User not authenticated')

      // Check if user already reacted
      const { data: existingReaction } = await supabase
        .from('post_reactions')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .eq('reaction_type', reactionType)
        .single()

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase
          .from('post_reactions')
          .delete()
          .eq('id', existingReaction.id)
        
        if (error) throw error
        return { action: 'removed', postId, reactionType }
      } else {
        // Add reaction
        const { error } = await supabase
          .from('post_reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            reaction_type: reactionType
          })
        
        if (error) throw error
        return { action: 'added', postId, reactionType }
      }
    },
    onMutate: async ({ postId, reactionType }) => {
      await queryClient.cancelQueries({ queryKey: ['social-posts'] })
      
      const previousPosts = queryClient.getQueryData(['social-posts'])
      
      // Optimistically update the posts
      queryClient.setQueryData(['social-posts'], (old: any) => {
        if (!old) return old
        
        const updatedPages = old.pages.map((page: RealPost[]) => 
          page.map(post => {
            if (post.id === postId && reactionType === 'like') {
              return {
                ...post,
                likes_count: post.likes_count + 1 // We'll adjust this based on actual action later
              }
            }
            return post
          })
        )
        
        return { ...old, pages: updatedPages }
      })
      
      return { previousPosts }
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['social-posts'], context.previousPosts)
      }
      toast.error('Failed to update reaction')
    },
    onSuccess: () => {
      // Refetch posts to get accurate counts
      queryClient.invalidateQueries({ queryKey: ['social-posts'] })
    }
  })

  // Get user reactions query
  const getUserReactions = async (postIds: string[]) => {
    if (!user || postIds.length === 0) return {}

    try {
      const { data } = await supabase
        .from('post_reactions')
        .select('post_id, reaction_type')
        .eq('user_id', user.id)
        .in('post_id', postIds)

      const reactions: Record<string, string[]> = {}
      data?.forEach(reaction => {
        if (!reactions[reaction.post_id]) {
          reactions[reaction.post_id] = []
        }
        reactions[reaction.post_id].push(reaction.reaction_type)
      })

      return reactions
    } catch (error) {
      console.error('Error fetching user reactions:', error)
      return {}
    }
  }

  return {
    posts,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
    createPost: createPostMutation.mutate,
    isCreatingPost: createPostMutation.isPending,
    handleReaction: reactionMutation.mutate,
    isUpdatingReaction: reactionMutation.isPending,
    getUserReactions,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['social-posts'] })
  }
}