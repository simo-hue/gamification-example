'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, X } from 'lucide-react';
import { MOCK_QUIZZES, Quiz } from '@/lib/mockData';
import { useUserStore } from '@/store/useUserStore';
import { calculateXp } from '@/lib/gamification';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function QuizPage() {
    const params = useParams();
    const router = useRouter();
    const { lives, decrementLives, addXp, incrementStreak } = useUserStore();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showReward, setShowReward] = useState(false);

    useEffect(() => {
        const foundQuiz = MOCK_QUIZZES.find(q => q.id === params.id);
        if (foundQuiz) {
            setQuiz(foundQuiz);
        }
    }, [params.id]);

    if (!quiz) return <div className="p-4">Loading...</div>;
    if (lives <= 0) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
            <h2 className="text-2xl font-bold text-red-500">Out of Lives!</h2>
            <p>Wait for them to refill or visit the shop.</p>
            <Link href="/shop" className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold">
                Go to Shop
            </Link>
            <Link href="/" className="text-zinc-500">Back to Home</Link>
        </div>
    );

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);

        const correct = index === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setIsAnswered(true);

        if (!correct) {
            decrementLives();
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            // Finish Quiz
            if (isCorrect || isAnswered) { // Ensure they answered the last one
                const xpEarned = calculateXp(quiz.xpReward, 0); // Simplified streak for now
                addXp(xpEarned);
                incrementStreak(); // Simple increment for demo
                setShowReward(true);
            }
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setIsCorrect(false);
        }
    };

    if (showReward) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🏆</span>
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-yellow-500">Quiz Complete!</h2>
                    <p className="text-xl font-medium">You earned +{quiz.xpReward} XP</p>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors"
                >
                    Continue
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link href="/" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="w-full max-w-[200px] h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mx-4">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    />
                </div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Question */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold leading-snug">{currentQuestion.text}</h2>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        let stateStyles = "border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-700";

                        if (isAnswered) {
                            if (index === currentQuestion.correctAnswer) {
                                stateStyles = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                            } else if (index === selectedOption) {
                                stateStyles = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                            } else {
                                stateStyles = "opacity-50";
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={isAnswered}
                                className={cn(
                                    "w-full p-4 text-left rounded-xl border-2 font-medium transition-all",
                                    stateStyles
                                )}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Feedback / Next Button */}
            {isAnswered && (
                <div className={cn(
                    "fixed bottom-0 left-0 right-0 p-4 pb-8 border-t animate-in slide-in-from-bottom duration-300",
                    isCorrect
                        ? "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-900"
                        : "bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-900"
                )}>
                    <div className="max-w-md mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                isCorrect ? "bg-green-500" : "bg-red-500"
                            )}>
                                {isCorrect ? <Check className="text-white" /> : <X className="text-white" />}
                            </div>
                            <div>
                                <p className={cn("font-bold text-lg", isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400")}>
                                    {isCorrect ? "Correct!" : "Incorrect"}
                                </p>
                                {!isCorrect && (
                                    <div className="mt-1 text-sm text-red-600 dark:text-red-300">
                                        <p className="font-semibold">Correct Answer: {currentQuestion.options[currentQuestion.correctAnswer]}</p>
                                        <p className="mt-1 italic opacity-90">{currentQuestion.explanation}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            className={cn(
                                "px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95",
                                isCorrect ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                            )}
                        >
                            {isLastQuestion ? "Finish" : "Next"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
