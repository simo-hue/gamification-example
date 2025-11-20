import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Initialize client (this would normally use env vars)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function challengeFriend(challengerId: string, friendId: string, quizId: string) {
    try {
        // 1. Check if a pending challenge already exists
        const { data: existing, error: fetchError } = await supabase
            .from('challenges')
            .select('*')
            .eq('challenger_id', challengerId)
            .eq('opponent_id', friendId)
            .eq('quiz_id', quizId)
            .eq('status', 'pending')
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows found"
            throw fetchError;
        }

        if (existing) {
            return { success: false, message: 'Challenge already pending!' };
        }

        // 2. Create new challenge
        const { data, error } = await supabase
            .from('challenges')
            .insert({
                challenger_id: challengerId,
                opponent_id: friendId,
                quiz_id: quizId,
                status: 'pending'
            } as any)
            .select()
            .single();

        if (error) throw error;

        return { success: true, challenge: data, message: 'Challenge sent!' };

    } catch (error) {
        console.error('Error creating challenge:', error);
        return { success: false, message: 'Failed to create challenge.' };
    }
}

export async function acceptChallenge(challengeId: string) {
    // Logic to accept and start quiz would go here
}
