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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_prompt_history: {
        Row: {
          context: string | null
          created_at: string
          id: string
          message_id: string | null
          query_text: string | null
          rating: number
          user_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          message_id?: string | null
          query_text?: string | null
          rating: number
          user_id: string
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          message_id?: string | null
          query_text?: string | null
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_prompt_history_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "admin_chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      briefings: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          pinned: boolean
          published: boolean
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          pinned?: boolean
          published?: boolean
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          pinned?: boolean
          published?: boolean
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      entities: {
        Row: {
          bio: string | null
          category: string | null
          created_at: string | null
          entity_type: string
          id: string
          lat: number | null
          lng: number | null
          metadata: Json | null
          name: string
          neighborhood: string | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          bio?: string | null
          category?: string | null
          created_at?: string | null
          entity_type?: string
          id?: string
          lat?: number | null
          lng?: number | null
          metadata?: Json | null
          name: string
          neighborhood?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          bio?: string | null
          category?: string | null
          created_at?: string | null
          entity_type?: string
          id?: string
          lat?: number | null
          lng?: number | null
          metadata?: Json | null
          name?: string
          neighborhood?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      entity_aliases: {
        Row: {
          alias: string
          created_at: string | null
          entity_id: string
          id: string
        }
        Insert: {
          alias: string
          created_at?: string | null
          entity_id: string
          id?: string
        }
        Update: {
          alias?: string
          created_at?: string | null
          entity_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_aliases_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_relationships: {
        Row: {
          created_at: string | null
          id: string
          relationship_type: string
          source_id: string
          target_id: string
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          relationship_type?: string
          source_id: string
          target_id: string
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          relationship_type?: string
          source_id?: string
          target_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_relationships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_relationships_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_sources: {
        Row: {
          created_at: string | null
          entity_id: string
          id: string
          source_label: string | null
          source_url: string | null
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          id?: string
          source_label?: string | null
          source_url?: string | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          id?: string
          source_label?: string | null
          source_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_sources_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_items: {
        Row: {
          content: string
          created_at: string
          external_url: string | null
          id: string
          published_at: string | null
          raw_data: Json | null
          source_id: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          external_url?: string | null
          id?: string
          published_at?: string | null
          raw_data?: Json | null
          source_id?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          external_url?: string | null
          id?: string
          published_at?: string | null
          raw_data?: Json | null
          source_id?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feed_items_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "feed_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_sources: {
        Row: {
          active: boolean
          config: Json
          created_at: string
          id: string
          last_fetched_at: string | null
          name: string
          source_type: string
          source_url: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          config?: Json
          created_at?: string
          id?: string
          last_fetched_at?: string | null
          name: string
          source_type?: string
          source_url?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          config?: Json
          created_at?: string
          id?: string
          last_fetched_at?: string | null
          name?: string
          source_type?: string
          source_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          active: boolean
          created_at: string
          cta_link: string
          cta_text: string
          id: string
          image_url: string
          sort_order: number
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          cta_link?: string
          cta_text?: string
          id?: string
          image_url?: string
          sort_order?: number
          subtitle?: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          cta_link?: string
          cta_text?: string
          id?: string
          image_url?: string
          sort_order?: number
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      image_cache: {
        Row: {
          created_at: string
          fetched_at: string
          id: string
          image_url: string
          listing_id: string
          listing_type: string
          quality_score: number | null
          source_url: string | null
        }
        Insert: {
          created_at?: string
          fetched_at?: string
          id?: string
          image_url: string
          listing_id: string
          listing_type: string
          quality_score?: number | null
          source_url?: string | null
        }
        Update: {
          created_at?: string
          fetched_at?: string
          id?: string
          image_url?: string
          listing_id?: string
          listing_type?: string
          quality_score?: number | null
          source_url?: string | null
        }
        Relationships: []
      }
      media_overrides: {
        Row: {
          created_at: string
          id: string
          image_url: string
          listing_id: string
          listing_type: string
          notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          listing_id: string
          listing_type: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          listing_id?: string
          listing_type?: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      moderation_decisions: {
        Row: {
          created_at: string | null
          decision: string
          id: string
          queue_item_id: string
          reason: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          decision: string
          id?: string
          queue_item_id: string
          reason?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          decision?: string
          id?: string
          queue_item_id?: string
          reason?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderation_decisions_queue_item_id_fkey"
            columns: ["queue_item_id"]
            isOneToOne: false
            referencedRelation: "moderation_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_queue: {
        Row: {
          ai_explanation: string | null
          content_id: string | null
          content_preview: string | null
          content_type: string
          created_at: string | null
          id: string
          severity: string
          status: string
          updated_at: string | null
        }
        Insert: {
          ai_explanation?: string | null
          content_id?: string | null
          content_preview?: string | null
          content_type?: string
          created_at?: string | null
          id?: string
          severity?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          ai_explanation?: string | null
          content_id?: string | null
          content_preview?: string | null
          content_type?: string
          created_at?: string | null
          id?: string
          severity?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scan_results: {
        Row: {
          created_at: string
          findings: Json | null
          id: string
          scan_type: string
          upgrade_ideas: Json | null
        }
        Insert: {
          created_at?: string
          findings?: Json | null
          id?: string
          scan_type: string
          upgrade_ideas?: Json | null
        }
        Update: {
          created_at?: string
          findings?: Json | null
          id?: string
          scan_type?: string
          upgrade_ideas?: Json | null
        }
        Relationships: []
      }
      search_intent_cache: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          parsed_intent: Json
          query: string
          query_hash: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          parsed_intent?: Json
          query: string
          query_hash: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          parsed_intent?: Json
          query?: string
          query_hash?: string
        }
        Relationships: []
      }
      site_copy: {
        Row: {
          context: string
          copy_key: string
          copy_value: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          context?: string
          copy_key: string
          copy_value?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          context?: string
          copy_key?: string
          copy_value?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_modules: {
        Row: {
          config: Json
          created_at: string
          id: string
          label: string
          section_key: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          label: string
          section_key: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          label?: string
          section_key?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      ticker_items: {
        Row: {
          active: boolean
          category: string
          created_at: string
          headline: string
          id: string
          link: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          category?: string
          created_at?: string
          headline: string
          id?: string
          link?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string
          created_at?: string
          headline?: string
          id?: string
          link?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitor_logs: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          id: string
          ip_address: string
          latitude: number | null
          longitude: number | null
          page_path: string | null
          referrer: string | null
          region: string | null
          user_agent: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip_address: string
          latitude?: number | null
          longitude?: number | null
          page_path?: string | null
          referrer?: string | null
          region?: string | null
          user_agent?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip_address?: string
          latitude?: number | null
          longitude?: number | null
          page_path?: string | null
          referrer?: string | null
          region?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
