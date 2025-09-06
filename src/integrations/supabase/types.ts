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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          password_hash: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          password_hash: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password_hash?: string
          username?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          comment_text: string
          created_at: string
          customer_name: string
          id: string
          product_id: string
        }
        Insert: {
          comment_text: string
          created_at?: string
          customer_name: string
          id?: string
          product_id: string
        }
        Update: {
          comment_text?: string
          created_at?: string
          customer_name?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          answer_en: string | null
          created_at: string
          id: string
          is_active: boolean | null
          order_index: number | null
          question: string
          question_en: string | null
        }
        Insert: {
          answer: string
          answer_en?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question: string
          question_en?: string | null
        }
        Update: {
          answer?: string
          answer_en?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question?: string
          question_en?: string | null
        }
        Relationships: []
      }
      features: {
        Row: {
          created_at: string
          description: string | null
          description_en: string | null
          icon_name: string | null
          id: string
          title: string
          title_en: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_en?: string | null
          icon_name?: string | null
          id?: string
          title: string
          title_en?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          description_en?: string | null
          icon_name?: string | null
          id?: string
          title?: string
          title_en?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          description_en: string | null
          id: string
          image_url: string
          title: string | null
          title_en: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          id?: string
          image_url: string
          title?: string | null
          title_en?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          id?: string
          image_url?: string
          title?: string | null
          title_en?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          product_id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_read: boolean | null
          message: string
          name: string
          phone: string | null
          product_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          phone?: string | null
          product_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          phone?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          created_at: string
          description: string | null
          description_en: string | null
          discount_percentage: number | null
          expires_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          title: string
          title_en: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_en?: string | null
          discount_percentage?: number | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          title: string
          title_en?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          description_en?: string | null
          discount_percentage?: number | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          title?: string
          title_en?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          description_en: string | null
          id: string
          image_url: string | null
          is_bestseller: boolean | null
          is_featured: boolean | null
          is_new: boolean | null
          is_organic: boolean | null
          name: string
          name_en: string | null
          original_price: number | null
          price: number
          updated_at: string
          whatsapp_text: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          id?: string
          image_url?: string | null
          is_bestseller?: boolean | null
          is_featured?: boolean | null
          is_new?: boolean | null
          is_organic?: boolean | null
          name: string
          name_en?: string | null
          original_price?: number | null
          price: number
          updated_at?: string
          whatsapp_text?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          id?: string
          image_url?: string | null
          is_bestseller?: boolean | null
          is_featured?: boolean | null
          is_new?: boolean | null
          is_organic?: boolean | null
          name?: string
          name_en?: string | null
          original_price?: number | null
          price?: number
          updated_at?: string
          whatsapp_text?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          customer_name: string
          id: string
          product_id: string
          rating: number
          review_text: string | null
        }
        Insert: {
          created_at?: string
          customer_name: string
          id?: string
          product_id: string
          rating: number
          review_text?: string | null
        }
        Update: {
          created_at?: string
          customer_name?: string
          id?: string
          product_id?: string
          rating?: number
          review_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          comment: string
          created_at: string
          customer_image: string | null
          customer_name: string
          id: string
          is_approved: boolean | null
          rating: number | null
        }
        Insert: {
          comment: string
          created_at?: string
          customer_image?: string | null
          customer_name: string
          id?: string
          is_approved?: boolean | null
          rating?: number | null
        }
        Update: {
          comment?: string
          created_at?: string
          customer_image?: string | null
          customer_name?: string
          id?: string
          is_approved?: boolean | null
          rating?: number | null
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
