export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ad_categories: {
        Row: {
          display_order: number | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ad_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_interactions: {
        Row: {
          ad_id: string | null
          created_at: string | null
          id: string
          interaction_type: string
          metadata: Json | null
          user_ip_hash: string | null
        }
        Insert: {
          ad_id?: string | null
          created_at?: string | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          user_ip_hash?: string | null
        }
        Update: {
          ad_id?: string | null
          created_at?: string | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          user_ip_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_interactions_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "classified_ads"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_earnings: {
        Row: {
          affiliate_id: string | null
          amount: number
          created_at: string | null
          id: string
          link_id: string | null
          payout_date: string | null
          status: string | null
        }
        Insert: {
          affiliate_id?: string | null
          amount: number
          created_at?: string | null
          id?: string
          link_id?: string | null
          payout_date?: string | null
          status?: string | null
        }
        Update: {
          affiliate_id?: string | null
          amount?: number
          created_at?: string | null
          id?: string
          link_id?: string | null
          payout_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_earnings_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_earnings_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_links: {
        Row: {
          affiliate_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          product_id: string | null
          status: string | null
          unique_code: string
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          affiliate_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          product_id?: string | null
          status?: string | null
          unique_code: string
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          affiliate_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          product_id?: string | null
          status?: string | null
          unique_code?: string
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_links_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_links_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      classified_ads: {
        Row: {
          ad_type: string
          category: string
          contact_info: Json
          created_at: string | null
          description: string
          expires_at: string | null
          featured: boolean | null
          id: string
          image_urls: string[] | null
          location: string | null
          metadata: Json | null
          price: number | null
          status: string | null
          subcategory: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          ad_type: string
          category: string
          contact_info: Json
          created_at?: string | null
          description: string
          expires_at?: string | null
          featured?: boolean | null
          id?: string
          image_urls?: string[] | null
          location?: string | null
          metadata?: Json | null
          price?: number | null
          status?: string | null
          subcategory?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          ad_type?: string
          category?: string
          contact_info?: Json
          created_at?: string | null
          description?: string
          expires_at?: string | null
          featured?: boolean | null
          id?: string
          image_urls?: string[] | null
          location?: string | null
          metadata?: Json | null
          price?: number | null
          status?: string | null
          subcategory?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      link_analytics: {
        Row: {
          click_timestamp: string | null
          conversion_status: boolean | null
          created_at: string | null
          id: string
          ip_hash: string | null
          link_id: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          click_timestamp?: string | null
          conversion_status?: boolean | null
          created_at?: string | null
          id?: string
          ip_hash?: string | null
          link_id?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          click_timestamp?: string | null
          conversion_status?: boolean | null
          created_at?: string | null
          id?: string
          ip_hash?: string | null
          link_id?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_analytics_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          business_id: string | null
          category: string
          commission_rate: number
          created_at: string | null
          description: string | null
          id: string
          image_urls: string[] | null
          metadata: Json | null
          name: string
          price: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          category: string
          commission_rate: number
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          metadata?: Json | null
          name: string
          price: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          category?: string
          commission_rate?: number
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          metadata?: Json | null
          name?: string
          price?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
          whatsapp_number?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: "affiliate" | "business" | "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
