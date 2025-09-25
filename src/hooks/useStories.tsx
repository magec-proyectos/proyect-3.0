import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/sonner'

export interface UserStory {
  id: string
  user_id: string
  media_type: 'image' | 'video' | 'text'
  media_url?: string
  prediction_content: any
  views_count: number
  created_at: string
  expires_at: string
  user_profiles?: {
    user_id: string
    display_name: string
    avatar_url?: string
    username?: string
  }
}

export interface StoryView {
  id: string
  story_id: string
  viewer_id: string
  viewed_at: string
}

export const useStories = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Fetch all active stories
  const {
    data: stories = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_stories')
        .select(`
          *,
          user_profiles (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as unknown as UserStory[]
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

  // Fetch user's own stories
  const {
    data: myStories = [],
    isLoading: isLoadingMyStories
  } = useQuery({
    queryKey: ['my-stories', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await supabase
        .from('user_stories')
        .select('*')
        .eq('user_id', user.id)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as unknown as UserStory[]
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 2,
  })

  // Create story mutation
  const createStoryMutation = useMutation({
    mutationFn: async ({ content, contentType }: {
      content: string
      contentType: 'text' | 'image' | 'video'
    }) => {
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('user_stories')
        .insert({
          user_id: user.id,
          media_type: contentType,
          media_url: contentType === 'text' ? null : content,
          prediction_content: contentType === 'text' ? { text: content } : { caption: content },
          prediction_type: 'general',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] })
      queryClient.invalidateQueries({ queryKey: ['my-stories'] })
      toast.success('Story created successfully!')
    },
    onError: () => {
      toast.error('Failed to create story')
    }
  })

  // View story mutation
  const viewStoryMutation = useMutation({
    mutationFn: async (storyId: string) => {
      if (!user) throw new Error('User not authenticated')

      // Check if already viewed
      const { data: existingView } = await supabase
        .from('story_views')
        .select('id')
        .eq('story_id', storyId)
        .eq('viewer_id', user.id)
        .single()

      if (existingView) return

      const { error } = await supabase
        .from('story_views')
        .insert({
          story_id: storyId,
          viewer_id: user.id
        })

      if (error) throw error
    },
    onError: (error) => {
      console.error('Failed to record story view:', error)
    }
  })

  // Delete story mutation
  const deleteStoryMutation = useMutation({
    mutationFn: async (storyId: string) => {
      const { error } = await supabase
        .from('user_stories')
        .delete()
        .eq('id', storyId)
        .eq('user_id', user?.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] })
      queryClient.invalidateQueries({ queryKey: ['my-stories'] })
      toast.success('Story deleted successfully!')
    },
    onError: () => {
      toast.error('Failed to delete story')
    }
  })

  return {
    stories,
    myStories,
    isLoading,
    isLoadingMyStories,
    error,
    createStory: createStoryMutation.mutate,
    isCreatingStory: createStoryMutation.isPending,
    viewStory: viewStoryMutation.mutate,
    deleteStory: deleteStoryMutation.mutate,
    isDeletingStory: deleteStoryMutation.isPending
  }
}