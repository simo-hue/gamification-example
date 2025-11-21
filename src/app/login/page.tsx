'use client';



import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Database } from '@/types/supabase';
import { Loader2, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

function LoginContent() {
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const errorMessage = searchParams.get('message');

    // Ensure client-side rendering for particles
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleGoogleLogin = async () => {
        console.log('🔵 Google login button clicked');
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
            if (error) throw error;
        } catch (err: any) {
            console.error('❌ Login error:', err);
            alert(err.message || 'Failed to initiate login');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0B0C10] font-sans selection:bg-cyan-500/30">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            {/* Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(69,162,158,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-[480px] mx-4"
            >
                <div className="relative bg-[#121418] border border-white/10 rounded-[32px] p-10 shadow-2xl shadow-black/50 overflow-hidden">

                    {/* Top Glow Accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-cyan-400/50 blur-[2px]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-cyan-400/10 blur-3xl rounded-full" />

                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center mb-12 space-y-6">
                        {/* Shield Icon */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative w-24 h-24 rounded-full border-2 border-white/10 bg-[#0B0C10] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center">
                                    <Shield className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-cyan-100 to-cyan-500 drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                                DEEPSAFE
                            </h1>
                            <p className="text-cyan-500/80 font-mono text-xs tracking-[0.2em] uppercase">
                                &gt; Initialize Protocol...
                            </p>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-4 rounded-xl border border-white/90 bg-transparent flex items-start gap-4"
                        >
                            <AlertCircle className="w-6 h-6 text-white shrink-0" strokeWidth={1.5} />
                            <div>
                                <h3 className="text-white font-bold font-orbitron tracking-wide text-sm mb-1">ACCESS DENIED</h3>
                                <p className="text-zinc-400 text-xs leading-relaxed">
                                    {errorMessage || 'Authentication failed. Please try again.'}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Google Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full group relative h-16 rounded-xl bg-[#1F2833] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-colors duration-300" />

                        <div className="relative flex items-center justify-center gap-4 h-full">
                            {loading ? (
                                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                            ) : (
                                <>
                                    <div className="bg-white p-1.5 rounded-full">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>
                                    <span className="text-white font-bold font-orbitron tracking-wider text-sm group-hover:text-cyan-100 transition-colors">
                                        AUTHENTICATE VIA GOOGLE
                                    </span>
                                </>
                            )}
                        </div>
                    </button>

                    {/* Footer Status */}
                    <div className="mt-12 pt-6 border-t border-white/5 text-center space-y-3">
                        <div className="flex items-center justify-center gap-2 text-[10px] text-cyan-500/70 font-mono tracking-widest uppercase">
                            <CheckCircle className="w-3 h-3" />
                            <span>Secure Connection: Established</span>
                        </div>
                        <p className="text-[10px] text-zinc-600 font-mono">
                            [ ENCRYPTION: AES-256 | PROTOCOL: HTTPS ]
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-cyber-dark">
                <Loader2 className="w-8 h-8 animate-spin text-cyber-blue" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
