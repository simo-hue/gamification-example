import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, ShieldCheck, AlertTriangle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizActionPanelProps {
    isCorrect: boolean;
    correctAnswerText: string;
    explanation: string;
    onNext: () => void;
    isLastQuestion: boolean;
}

export function QuizActionPanel({
    isCorrect,
    correctAnswerText,
    explanation,
    onNext,
    isLastQuestion
}: QuizActionPanelProps) {
    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 pb-8"
        >
            <div className={cn(
                "max-w-md mx-auto rounded-3xl border backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden relative",
                isCorrect
                    ? "bg-[#0B0C10]/90 border-cyber-green/30 shadow-[0_0_30px_rgba(102,252,241,0.15)]"
                    : "bg-[#0B0C10]/90 border-cyber-red/30 shadow-[0_0_30px_rgba(255,0,85,0.15)]"
            )}>
                {/* Top Accent Line */}
                <div className={cn(
                    "absolute top-0 left-0 right-0 h-1",
                    isCorrect ? "bg-cyber-green" : "bg-cyber-red"
                )} />

                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg",
                            isCorrect
                                ? "bg-cyber-green/10 border-cyber-green/30 text-cyber-green"
                                : "bg-cyber-red/10 border-cyber-red/30 text-cyber-red"
                        )}>
                            {isCorrect ? <ShieldCheck className="w-6 h-6" /> : <X className="w-6 h-6" />}
                        </div>
                        <div>
                            <h3 className={cn(
                                "text-xl font-black font-orbitron tracking-wider",
                                isCorrect ? "text-cyber-green drop-shadow-[0_0_10px_rgba(102,252,241,0.5)]" : "text-cyber-red drop-shadow-[0_0_10px_rgba(255,0,85,0.5)]"
                            )}>
                                {isCorrect ? "ACCESS GRANTED" : "THREAT DETECTED"}
                            </h3>
                            <p className={cn(
                                "text-xs font-mono tracking-widest uppercase opacity-80",
                                isCorrect ? "text-cyber-green" : "text-cyber-red"
                            )}>
                                {isCorrect ? "Protocol Verified" : "Security Breach"}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/5">
                        {!isCorrect && (
                            <div className="flex items-start gap-2 text-cyber-red font-bold text-sm uppercase tracking-wide pb-2 border-b border-white/5 mb-2">
                                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>Correct: {correctAnswerText}</span>
                            </div>
                        )}
                        <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                            {explanation}
                        </p>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onNext}
                        className={cn(
                            "w-full h-14 rounded-xl font-bold font-orbitron text-lg tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg group relative overflow-hidden border",
                            isCorrect
                                ? "bg-cyber-green/10 border-cyber-green/50 text-cyber-green hover:bg-cyber-green/20 shadow-[0_0_20px_rgba(102,252,241,0.1)]"
                                : "bg-cyber-red/10 border-cyber-red/50 text-cyber-red hover:bg-cyber-red/20 shadow-[0_0_20px_rgba(255,0,85,0.1)]"
                        )}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isLastQuestion ? "COMPLETE MISSION" : "NEXT QUESTION"}
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
