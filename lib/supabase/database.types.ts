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
      reddit_accounts: {
        Row: {
          created_at: string
          id: string
          reddit_user_id: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          reddit_user_id: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          reddit_user_id?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "reddit_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      user_info: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          points: number
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          points?: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          points?: number
        }
        Relationships: []
      }
      user_submission_interactions: {
        Row: {
          created_at: string
          id: string
          interaction: "upvote" | "comment" | "both"
          submission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interaction: "upvote" | "comment" | "both"
          submission_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interaction?: "upvote" | "comment" | "both"
          submission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_submission_interactions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "user_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_submission_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      user_submissions: {
        Row: {
          comments_received: number
          context: string | null
          created_at: string
          id: string
          reddit_account_id: string | null
          reddit_metrics: Json | null
          reddit_url: string
          status: string
          subreddit: string
          title: string
          type: string
          upvotes_received: number
          user_id: string
        }
        Insert: {
          comments_received?: number
          context?: string | null
          created_at?: string
          id?: string
          reddit_account_id?: string | null
          reddit_metrics?: Json | null
          reddit_url: string
          status?: string
          subreddit: string
          title: string
          type: string
          upvotes_received?: number
          user_id: string
        }
        Update: {
          comments_received?: number
          context?: string | null
          created_at?: string
          id?: string
          reddit_account_id?: string | null
          reddit_metrics?: Json | null
          reddit_url?: string
          status?: string
          subreddit?: string
          title?: string
          type?: string
          upvotes_received?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_submissions_reddit_account_id_fkey"
            columns: ["reddit_account_id"]
            isOneToOne: false
            referencedRelation: "reddit_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database["public"]

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"]

export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"]
