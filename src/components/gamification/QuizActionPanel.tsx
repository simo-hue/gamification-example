import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
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
            className={cn(
                "fixed bottom-0 left-0 right-0 z-[100] border-t-2 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden pb-8", // Added pb-8 for safe area
                isCorrect
                    ? "bg-cyber-dark border-cyber-green"
                    : "bg-cyber-dark border-cyber-red"
            )}
        >
            <div className="p-6 space-y-4">
                {/* Top Row: Result Header */}
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2",
                        isCorrect
                            ? "bg-cyber-green/20 border-cyber-green text-cyber-green"
                            : "bg-cyber-red/20 border-cyber-red text-cyber-red"
                    )}>
                        {isCorrect ? <ShieldCheck className="w-6 h-6" /> : <X className="w-6 h-6" />}
                    </div>
                    <h3 className={cn(
                        "text-xl font-bold font-orbitron tracking-wider",
                        isCorrect ? "text-cyber-green text-glow" : "text-cyber-red text-glow-danger"
                    )}>
                        {isCorrect ? "ACCESS GRANTED" : "THREAT DETECTED"}
                    </h3>
                </div>

                {/* Middle Row: Explanation */}
                <div className="space-y-2">
                    {!isCorrect && (
                        <div className="flex items-start gap-2 text-cyber-red font-bold text-sm uppercase tracking-wide">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>Correct: {correctAnswerText}</span>
                        </div>
                    )}
                    <p className="text-white text-sm leading-relaxed font-medium opacity-90">
                        {explanation}
                    </p>
                </div>

                {/* Bottom Row: Massive CTA Button */}
                <button
                    onClick={onNext}
                    className={cn(
                        "w-full h-14 rounded-xl font-bold font-orbitron text-lg tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg mt-2",
                        isCorrect
                            ? "bg-cyber-green text-black hover:brightness-110"
                            : "bg-cyber-red text-white hover:brightness-110"
                    )}
                >
                    {isLastQuestion ? "COMPLETE MISSION" : "CONTINUE"} <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
}
