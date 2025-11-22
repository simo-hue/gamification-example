import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Infinity, ArrowLeft, BatteryFull, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SystemFailureModalProps {
    onRefill: () => void;
    onPremium: () => void;
}

export function SystemFailureModal({ onRefill, onPremium }: SystemFailureModalProps) {
    const [countdown, setCountdown] = useState(900); // 15 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 900));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            {/* Red Vignette Alarm Effect */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(255,0,0,0.2)] animate-pulse-slow" />

            <div className="relative w-full max-w-md space-y-6 text-center">

                {/* Header Section */}
                <div className="space-y-2">
                    <div className="relative inline-block">
                        <ShieldAlert className="w-16 h-16 text-cyber-red mx-auto animate-pulse" />
                        <div className="absolute inset-0 bg-cyber-red/20 blur-xl rounded-full animate-pulse" />
                    </div>

                    <h1 className="text-4xl font-bold font-orbitron text-cyber-red tracking-widest animate-glitch text-glow-danger">
                        ERRORE DI SISTEMA
                    </h1>

                    <p className="text-zinc-400 font-mono text-sm">
                        Protocolli di difesa offline. <span className="text-cyber-red font-bold">0/5 Vite rimanenti.</span>
                    </p>

                    <div className="inline-block px-4 py-1 bg-cyber-red/10 border border-cyber-red/30 rounded-full">
                        <p className="text-xs font-mono text-cyber-red animate-pulse">
                            Prossima ricarica in {formatTime(countdown)}
                        </p>
                    </div>
                </div>

                {/* Monetization Grid */}
                <div className="grid gap-4 mt-8">

                    {/* Option A: Hero (Subscription) */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onPremium}
                        className="relative overflow-visible p-1 rounded-2xl bg-gradient-to-br from-cyber-dark to-purple-900 border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)] group mt-4"
                    >
                        <div className="absolute -top-3 right-4 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 rounded-full font-orbitron shadow-lg z-10">
                            CONSIGLIATO
                        </div>

                        <div className="bg-black/40 p-4 rounded-xl flex items-center gap-4 h-full">
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50 text-yellow-500 shrink-0">
                                <Infinity className="w-6 h-6" />
                            </div>
                            <div className="text-left flex-1">
                                <h3 className="font-bold text-white font-orbitron tracking-wide">POTERE ILLIMITATO</h3>
                                <p className="text-xs text-zinc-300">Vite Infinite + No Pubblicità</p>
                            </div>
                            <div className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg text-sm whitespace-nowrap shadow-[0_0_10px_rgba(234,179,8,0.4)] animate-pulse">
                                POTENZIA
                            </div>
                        </div>
                    </motion.button>

                    {/* Option B: Refill (Microtransaction) */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onRefill}
                        className="p-4 rounded-2xl bg-cyber-gray border border-cyber-blue/30 hover:border-cyber-blue hover:bg-cyber-blue/5 transition-all flex items-center justify-between gap-4 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-cyber-blue/20 flex items-center justify-center border border-cyber-blue/50 text-cyber-blue shrink-0">
                                <BatteryFull className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-white font-orbitron tracking-wide">RICARICA EMERGENZA</h3>
                                <p className="text-xs text-zinc-400">Ricarica istantanea 5 Vite</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 border border-[#66FCF1] text-[#66FCF1] bg-transparent hover:bg-[#66FCF1] hover:text-black hover:shadow-[0_0_15px_rgba(102,252,241,0.5)] font-bold rounded-lg transition-all duration-300 whitespace-nowrap">
                            RICARICA €0.99
                        </div>
                    </motion.button>
                </div>

                {/* Option C: Bailout */}
                <Link
                    href="/"
                    className="block text-zinc-600 text-xs hover:text-white transition-colors mt-4 font-mono uppercase tracking-widest"
                >
                    [ Ritorna alla Base ]
                </Link>

            </div>
        </div>
    );
}
