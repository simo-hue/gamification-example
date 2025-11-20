import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function redeemReferral(code: string, userId: string) {
    try {
        // 1. Find referrer
        const { data: referrer, error: fetchError } = await supabase
            .from('profiles')
            .select('id, xp, current_hearts')
            .eq('referral_code', code.toUpperCase())
            .single();

        const referrerData = referrer as any;

        if (fetchError || !referrerData) {
            return { success: false, message: 'Invalid code.' };
        }

        if (referrerData.id === userId) {
            return { success: false, message: 'Cannot redeem your own code.' };
        }

        // 2. Award Referrer (+1 Heart)
        await (supabase as any).from('profiles').update({
            current_hearts: Math.min(5, referrerData.current_hearts + 1)
        }).eq('id', referrerData.id);

        // 3. Award New User (+50 XP)
        await (supabase as any).from('profiles').update({
            xp: 50
        }).eq('id', userId);

        // Note: In a real app we'd use an RPC function to increment safely

        return { success: true, message: 'Code redeemed! +50 XP for you.' };

    } catch (error) {
        console.error('Error redeeming code:', error);
        return { success: false, message: 'Redemption failed.' };
    }
}
