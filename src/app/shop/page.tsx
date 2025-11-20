'use client';

import { Heart, Zap, Shield, Lock, Star } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import { cn } from '@/lib/utils';

export default function ShopPage() {
    const { lives, maxLives, refillLives, hasInfiniteLives, setInfiniteLives } = useUserStore();

    const handleRefill = () => {
        if (lives < maxLives) {
            // In a real app, this would check currency or show an ad
            refillLives();
            alert("Lives refilled!");
        }
    };

    const handlePremium = () => {
        // Mock purchase
        setInfiniteLives(true);
        alert("Premium activated! Infinite lives enabled.");
    };

    return (
        <div className="space-y-8 pb-8">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Zap className="text-yellow-500 fill-current" />
                    Shop
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">Boost your learning with power-ups.</p>
            </div>

            {/* Hearts Section */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold px-2">Refill Hearts</h2>
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-500">
                            <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <h3 className="font-bold">Full Refill</h3>
                            <p className="text-sm text-zinc-500">Get back to 5 hearts</p>
                        </div>
                    </div>
                    <button
                        onClick={handleRefill}
                        disabled={lives === maxLives || hasInfiniteLives}
                        className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                    >
                        {lives === maxLives ? 'Full' : 'Free'}
                    </button>
                </div>
            </section>

            {/* Premium Section */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold px-2">Premium</h2>
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-3xl shadow-lg">
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-2xl font-bold">Deepsafe Plus</h3>
                                <p className="text-blue-100">Unlock your full potential</p>
                            </div>
                            <Shield className="w-10 h-10 text-blue-200" />
                        </div>

                        <ul className="space-y-2 text-sm font-medium text-blue-50">
                            <li className="flex items-center gap-2">
                                <Heart className="w-4 h-4 fill-current" /> Infinite Lives
                            </li>
                            <li className="flex items-center gap-2">
                                <Zap className="w-4 h-4 fill-current" /> No Ads
                            </li>
                            <li className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-current" /> Exclusive Badges
                            </li>
                        </ul>

                        <button
                            onClick={handlePremium}
                            disabled={hasInfiniteLives}
                            className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl shadow-md active:scale-95 transition-transform disabled:opacity-80"
                        >
                            {hasInfiniteLives ? 'Active' : '$4.99 / Month'}
                        </button>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-xl" />
                </div>
            </section>

            {/* Badges Section */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold px-2">Your Badges</h2>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { name: '7 Day Streak', icon: '🔥', unlocked: true },
                        { name: 'Quiz Master', icon: '🎓', unlocked: false },
                        { name: 'Early Bird', icon: '🌅', unlocked: true },
                        { name: 'Socialite', icon: '🤝', unlocked: false },
                        { name: 'Defender', icon: '🛡️', unlocked: false },
                        { name: 'Scholar', icon: '📚', unlocked: true },
                    ].map((badge, i) => (
                        <div key={i} className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl border-2 aspect-square text-center gap-2",
                            badge.unlocked
                                ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                                : "border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950 opacity-50 grayscale"
                        )}>
                            <span className="text-3xl">{badge.icon}</span>
                            <span className="text-[10px] font-bold leading-tight">{badge.name}</span>
                            {!badge.unlocked && <Lock className="w-3 h-3 text-zinc-400" />}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
