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
                    xp: number
                    current_hearts: number
                    highest_streak: number
                    is_premium: boolean
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    avatar_url?: string | null
                    xp?: number
                    current_hearts?: number
                    highest_streak?: number
                    is_premium?: boolean
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    avatar_url?: string | null
                    xp?: number
                    current_hearts?: number
                    highest_streak?: number
                    is_premium?: boolean
                }
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
            }
            challenges: {
                Row: {
                    id: string
                    challenger_id: string
                    opponent_id: string
                    quiz_id: string
                    challenger_score: number | null
                    opponent_score: number | null
                    status: 'pending' | 'completed' | 'declined'
                    created_at: string
                }
                Insert: {
                    id?: string
                    challenger_id: string
                    opponent_id: string
                    quiz_id: string
                    challenger_score?: number | null
                    opponent_score?: number | null
                    status?: 'pending' | 'completed' | 'declined'
                    created_at?: string
                }
                Update: {
                    id?: string
                    challenger_id?: string
                    opponent_id?: string
                    quiz_id?: string
                    challenger_score?: number | null
                    opponent_score?: number | null
                    status?: 'pending' | 'completed' | 'declined'
                    created_at?: string
                }
            }
        }
    }
}
