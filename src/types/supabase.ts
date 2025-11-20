export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    updated_at: string | null
                    username: string | null
                    avatar_url: string | null
                    xp: number | null
                    current_hearts: number | null
                    highest_streak: number | null
                    is_premium: boolean | null
                    referral_code: string | null
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    avatar_url?: string | null
                    xp?: number | null
                    current_hearts?: number | null
                    highest_streak?: number | null
                    is_premium?: boolean | null
                    referral_code?: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    avatar_url?: string | null
                    xp?: number | null
                    current_hearts?: number | null
                    highest_streak?: number | null
                    is_premium?: boolean | null
                    referral_code?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            friendships: {
                Row: {
                    id: string
                    user_id: string
                    friend_id: string
                    status: 'pending' | 'accepted' | 'blocked'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    friend_id: string
                    status?: 'pending' | 'accepted' | 'blocked'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    friend_id?: string
                    status?: 'pending' | 'accepted' | 'blocked'
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "friendships_friend_id_fkey"
                        columns: ["friend_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "friendships_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            challenges: {
                Row: {
                    id: string
                    challenger_id: string
                    opponent_id: string
                    quiz_id: string
                    quiz_seed: number | null
                    challenger_score: number | null
                    opponent_score: number | null
                    winner_id: string | null
                    status: 'pending' | 'completed' | 'declined'
                    created_at: string
                }
                Insert: {
                    id?: string
                    challenger_id: string
                    opponent_id: string
                    quiz_id: string
                    quiz_seed?: number | null
                    challenger_score?: number | null
                    opponent_score?: number | null
                    winner_id?: string | null
                    status?: 'pending' | 'completed' | 'declined'
                    created_at?: string
                }
                Update: {
                    id?: string
                    challenger_id?: string
                    opponent_id?: string
                    quiz_id?: string
                    quiz_seed?: number | null
                    challenger_score?: number | null
                    opponent_score?: number | null
                    winner_id?: string | null
                    status?: 'pending' | 'completed' | 'declined'
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "challenges_challenger_id_fkey"
                        columns: ["challenger_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "challenges_opponent_id_fkey"
                        columns: ["opponent_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "challenges_winner_id_fkey"
                        columns: ["winner_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            user_progress: {
                Row: {
                    id: string
                    user_id: string
                    quiz_id: string
                    score: number
                    completed_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    quiz_id: string
                    score: number
                    completed_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    quiz_id?: string
                    score?: number
                    completed_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "user_progress_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            redeem_code: {
                Args: {
                    code: string
                }
                Returns: Json
            }
            decrement_hearts: {
                Args: Record<string, never>
                Returns: void
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
