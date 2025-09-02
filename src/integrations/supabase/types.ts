export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          admin_user_id: string
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          admin_user_id: string
          created_at: string
          expires_at: string
          id: string
          session_token: string
        }
        Insert: {
          admin_user_id: string
          created_at?: string
          expires_at: string
          id?: string
          session_token: string
        }
        Update: {
          admin_user_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          session_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          last_login: string | null
          password_hash: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash?: string
          username?: string
        }
        Relationships: []
      }
      api_configurations: {
        Row: {
          api_name: string
          api_url: string
          configuration: Json | null
          created_at: string | null
          error_count: number | null
          id: string
          is_active: boolean | null
          last_successful_call: string | null
          priority: number | null
          rate_limit_per_minute: number | null
          success_count: number | null
          timeout_seconds: number | null
          updated_at: string | null
        }
        Insert: {
          api_name: string
          api_url: string
          configuration?: Json | null
          created_at?: string | null
          error_count?: number | null
          id?: string
          is_active?: boolean | null
          last_successful_call?: string | null
          priority?: number | null
          rate_limit_per_minute?: number | null
          success_count?: number | null
          timeout_seconds?: number | null
          updated_at?: string | null
        }
        Update: {
          api_name?: string
          api_url?: string
          configuration?: Json | null
          created_at?: string | null
          error_count?: number | null
          id?: string
          is_active?: boolean | null
          last_successful_call?: string | null
          priority?: number | null
          rate_limit_per_minute?: number | null
          success_count?: number | null
          timeout_seconds?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      badges_catalog: {
        Row: {
          badge_key: string
          category: string
          color_scheme: string
          created_at: string | null
          description: string
          icon_name: string
          id: string
          is_active: boolean | null
          is_secret: boolean | null
          max_level: number | null
          name: string
          rarity: string
          requirements: Json
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          badge_key: string
          category?: string
          color_scheme?: string
          created_at?: string | null
          description: string
          icon_name: string
          id?: string
          is_active?: boolean | null
          is_secret?: boolean | null
          max_level?: number | null
          name: string
          rarity?: string
          requirements?: Json
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          badge_key?: string
          category?: string
          color_scheme?: string
          created_at?: string | null
          description?: string
          icon_name?: string
          id?: string
          is_active?: boolean | null
          is_secret?: boolean | null
          max_level?: number | null
          name?: string
          rarity?: string
          requirements?: Json
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      betting_markets: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          sport_type: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          sport_type: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          sport_type?: string
        }
        Relationships: []
      }
      casino_odds: {
        Row: {
          bookmaker: string
          created_at: string | null
          data_source: string
          event_name: string
          game_type: string
          id: string
          odds_data: Json
          scraped_at: string | null
        }
        Insert: {
          bookmaker: string
          created_at?: string | null
          data_source: string
          event_name: string
          game_type: string
          id?: string
          odds_data: Json
          scraped_at?: string | null
        }
        Update: {
          bookmaker?: string
          created_at?: string | null
          data_source?: string
          event_name?: string
          game_type?: string
          id?: string
          odds_data?: Json
          scraped_at?: string | null
        }
        Relationships: []
      }
      chatbot_agents: {
        Row: {
          avatar_url: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          specialization: string
          system_prompt: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          specialization?: string
          system_prompt: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          specialization?: string
          system_prompt?: string
          updated_at?: string
        }
        Relationships: []
      }
      chatbot_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      content_items: {
        Row: {
          author_id: string | null
          content: string | null
          content_type: string
          created_at: string
          id: string
          published_at: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          content_type?: string
          created_at?: string
          id?: string
          published_at?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string | null
          content_type?: string
          created_at?: string
          id?: string
          published_at?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          agent_id: string | null
          created_at: string
          id: string
          is_active: boolean
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "chatbot_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      failed_login_attempts: {
        Row: {
          attempted_at: string
          id: string
          ip_address: unknown
          user_agent: string | null
          username: string
        }
        Insert: {
          attempted_at?: string
          id?: string
          ip_address: unknown
          user_agent?: string | null
          username: string
        }
        Update: {
          attempted_at?: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          username?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          ip_address: unknown | null
          page_path: string
          page_title: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          page_path: string
          page_title?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean
          last_login: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean
          last_login?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          last_login?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      scraping_metadata: {
        Row: {
          created_at: string | null
          error_count: number | null
          id: string
          is_active: boolean | null
          last_error: string | null
          last_scraped: string | null
          rate_limit_delay_ms: number | null
          scrape_interval_minutes: number | null
          source_name: string
          success_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_count?: number | null
          id?: string
          is_active?: boolean | null
          last_error?: string | null
          last_scraped?: string | null
          rate_limit_delay_ms?: number | null
          scrape_interval_minutes?: number | null
          source_name: string
          success_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_count?: number | null
          id?: string
          is_active?: boolean | null
          last_error?: string | null
          last_scraped?: string | null
          rate_limit_delay_ms?: number | null
          scrape_interval_minutes?: number | null
          source_name?: string
          success_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sports_competitions: {
        Row: {
          country: string
          created_at: string | null
          external_id: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          priority_score: number | null
          season: string | null
          sport_type: string
          tier: number | null
          updated_at: string | null
        }
        Insert: {
          country: string
          created_at?: string | null
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          priority_score?: number | null
          season?: string | null
          sport_type: string
          tier?: number | null
          updated_at?: string | null
        }
        Update: {
          country?: string
          created_at?: string | null
          external_id?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          priority_score?: number | null
          season?: string | null
          sport_type?: string
          tier?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sports_matches: {
        Row: {
          away_score: number | null
          away_team: string
          betting_trends: Json | null
          competition_id: string | null
          country: string | null
          created_at: string | null
          data_source: string
          external_id: string | null
          home_score: number | null
          home_team: string
          id: string
          last_updated: string | null
          league: string
          live_stats: Json | null
          market_types: Json | null
          match_date: string
          match_week: number | null
          odds_away: number | null
          odds_draw: number | null
          odds_home: number | null
          priority_level: number | null
          season: string | null
          sport_type: string
          status: string | null
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team: string
          betting_trends?: Json | null
          competition_id?: string | null
          country?: string | null
          created_at?: string | null
          data_source: string
          external_id?: string | null
          home_score?: number | null
          home_team: string
          id?: string
          last_updated?: string | null
          league: string
          live_stats?: Json | null
          market_types?: Json | null
          match_date: string
          match_week?: number | null
          odds_away?: number | null
          odds_draw?: number | null
          odds_home?: number | null
          priority_level?: number | null
          season?: string | null
          sport_type: string
          status?: string | null
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team?: string
          betting_trends?: Json | null
          competition_id?: string | null
          country?: string | null
          created_at?: string | null
          data_source?: string
          external_id?: string | null
          home_score?: number | null
          home_team?: string
          id?: string
          last_updated?: string | null
          league?: string
          live_stats?: Json | null
          market_types?: Json | null
          match_date?: string
          match_week?: number | null
          odds_away?: number | null
          odds_draw?: number | null
          odds_home?: number | null
          priority_level?: number | null
          season?: string | null
          sport_type?: string
          status?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      sports_teams: {
        Row: {
          country: string | null
          created_at: string | null
          external_id: string | null
          founded_year: number | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          short_name: string | null
          sport_type: string
          venue: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          external_id?: string | null
          founded_year?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          short_name?: string | null
          sport_type: string
          venue?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          external_id?: string | null
          founded_year?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          short_name?: string | null
          sport_type?: string
          venue?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_type: string
          setting_value: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_type?: string
          setting_value: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_type?: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_key: string
          earned_at: string | null
          earned_for: Json | null
          id: string
          level: number | null
          progress: Json | null
          user_id: string
        }
        Insert: {
          badge_key: string
          earned_at?: string | null
          earned_for?: Json | null
          id?: string
          level?: number | null
          progress?: Json | null
          user_id: string
        }
        Update: {
          badge_key?: string
          earned_at?: string | null
          earned_for?: Json | null
          id?: string
          level?: number | null
          progress?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_key_fkey"
            columns: ["badge_key"]
            isOneToOne: false
            referencedRelation: "badges_catalog"
            referencedColumns: ["badge_key"]
          },
        ]
      }
      user_follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_posts: {
        Row: {
          actual_return: number | null
          comments_count: number | null
          confidence_score: number | null
          content: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          is_premium: boolean | null
          likes_count: number | null
          match_info: Json
          potential_return: number | null
          prediction_details: Json
          prediction_type: string
          result_confirmed: boolean | null
          result_confirmed_at: string | null
          shares_count: number | null
          stake_amount: number | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_return?: number | null
          comments_count?: number | null
          confidence_score?: number | null
          content: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          likes_count?: number | null
          match_info?: Json
          potential_return?: number | null
          prediction_details?: Json
          prediction_type: string
          result_confirmed?: boolean | null
          result_confirmed_at?: string | null
          shares_count?: number | null
          stake_amount?: number | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_return?: number | null
          comments_count?: number | null
          confidence_score?: number | null
          content?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          likes_count?: number | null
          match_info?: Json
          potential_return?: number | null
          prediction_details?: Json
          prediction_type?: string
          result_confirmed?: boolean | null
          result_confirmed_at?: string | null
          shares_count?: number | null
          stake_amount?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          achievements: Json | null
          avatar_url: string | null
          badges: Json | null
          banner_url: string | null
          best_streak: number | null
          bio: string | null
          comments_received: number | null
          correct_predictions: number | null
          created_at: string | null
          current_streak: number | null
          display_name: string | null
          email_notifications: boolean | null
          experience_points: number | null
          followers_count: number | null
          following_count: number | null
          id: string
          is_premium: boolean | null
          is_public: boolean | null
          is_verified: boolean | null
          join_date: string | null
          last_active: string | null
          level: number | null
          likes_received: number | null
          location: string | null
          next_level_xp: number | null
          posts_count: number | null
          premium_since: string | null
          premium_tier: string | null
          push_notifications: boolean | null
          reputation_score: number | null
          show_statistics: boolean | null
          total_login_days: number | null
          total_predictions: number | null
          total_winnings: number | null
          trust_score: number | null
          updated_at: string | null
          user_id: string
          verification_tier: string | null
          website: string | null
          win_rate: number | null
        }
        Insert: {
          achievements?: Json | null
          avatar_url?: string | null
          badges?: Json | null
          banner_url?: string | null
          best_streak?: number | null
          bio?: string | null
          comments_received?: number | null
          correct_predictions?: number | null
          created_at?: string | null
          current_streak?: number | null
          display_name?: string | null
          email_notifications?: boolean | null
          experience_points?: number | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          is_premium?: boolean | null
          is_public?: boolean | null
          is_verified?: boolean | null
          join_date?: string | null
          last_active?: string | null
          level?: number | null
          likes_received?: number | null
          location?: string | null
          next_level_xp?: number | null
          posts_count?: number | null
          premium_since?: string | null
          premium_tier?: string | null
          push_notifications?: boolean | null
          reputation_score?: number | null
          show_statistics?: boolean | null
          total_login_days?: number | null
          total_predictions?: number | null
          total_winnings?: number | null
          trust_score?: number | null
          updated_at?: string | null
          user_id: string
          verification_tier?: string | null
          website?: string | null
          win_rate?: number | null
        }
        Update: {
          achievements?: Json | null
          avatar_url?: string | null
          badges?: Json | null
          banner_url?: string | null
          best_streak?: number | null
          bio?: string | null
          comments_received?: number | null
          correct_predictions?: number | null
          created_at?: string | null
          current_streak?: number | null
          display_name?: string | null
          email_notifications?: boolean | null
          experience_points?: number | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          is_premium?: boolean | null
          is_public?: boolean | null
          is_verified?: boolean | null
          join_date?: string | null
          last_active?: string | null
          level?: number | null
          likes_received?: number | null
          location?: string | null
          next_level_xp?: number | null
          posts_count?: number | null
          premium_since?: string | null
          premium_tier?: string | null
          push_notifications?: boolean | null
          reputation_score?: number | null
          show_statistics?: boolean | null
          total_login_days?: number | null
          total_predictions?: number | null
          total_winnings?: number | null
          trust_score?: number | null
          updated_at?: string | null
          user_id?: string
          verification_tier?: string | null
          website?: string | null
          win_rate?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      verification_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          meets_requirements: boolean | null
          reason: string
          requested_tier: string
          requirements_details: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          supporting_evidence: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          meets_requirements?: boolean | null
          reason: string
          requested_tier: string
          requirements_details?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          supporting_evidence?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          meets_requirements?: boolean | null
          reason?: string
          requested_tier?: string
          requirements_details?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          supporting_evidence?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_verification_request: {
        Args: { admin_user_id: string; notes?: string; request_id: string }
        Returns: boolean
      }
      auto_verify_user: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      check_and_award_badges: {
        Args: { user_uuid: string }
        Returns: number
      }
      check_verification_requirements: {
        Args: { tier: string; user_uuid: string }
        Returns: Json
      }
      get_suggested_users: {
        Args: { limit_count?: number; requesting_user_id: string }
        Returns: {
          avatar_url: string
          display_name: string
          followers_count: number
          level: number
          reputation_score: number
          user_id: string
          verification_tier: string
          win_rate: number
        }[]
      }
      get_user_badges_with_details: {
        Args: { user_uuid: string }
        Returns: {
          badge_key: string
          category: string
          color_scheme: string
          description: string
          earned_at: string
          earned_for: Json
          icon_name: string
          level: number
          name: string
          rarity: string
        }[]
      }
      get_user_profile_with_stats: {
        Args: { profile_user_id: string }
        Returns: {
          achievements: Json
          avatar_url: string
          badges: Json
          banner_url: string
          best_streak: number
          bio: string
          correct_predictions: number
          current_streak: number
          display_name: string
          experience_points: number
          followers_count: number
          following_count: number
          is_verified: boolean
          join_date: string
          last_active: string
          level: number
          likes_received: number
          location: string
          posts_count: number
          reputation_score: number
          total_predictions: number
          total_winnings: number
          user_id: string
          verification_tier: string
          website: string
          win_rate: number
        }[]
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      update_user_level: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      update_user_win_rate: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      verify_admin_password: {
        Args: { input_password: string; input_username: string }
        Returns: boolean
      }
      verify_admin_password_internal: {
        Args: { input_password: string; input_username: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "moderator", "user"],
    },
  },
} as const
