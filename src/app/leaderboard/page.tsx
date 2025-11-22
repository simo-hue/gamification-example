'use client';

import { useState } from 'react';
import { Trophy, Users, Globe, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FriendList } from '@/components/social/FriendList';

// Mock data for now, will be replaced by Supabase fetch
const MOCK_LEADERBOARD = {
    global: [
        { id: '1', username: 'AI_Master', xp: 2500, avatar: '🤖', rank: 1 },
        { id: '2', username: 'DeepLearner', xp: 2350, avatar: '🧠', rank: 2 },
        { id: '3', username: 'SafetyFirst', xp: 2100, avatar: '🛡️', rank: 3 },
        { id: '4', username: 'NeuralNet', xp: 1800, avatar: '🕸️', rank: 4 },
        { id: '5', username: 'You', xp: 1200, avatar: '👤', rank: 15 },
    ],
    friends: [
        { id: '2', username: 'DeepLearner', xp: 2350, avatar: '🧠', rank: 1 },
        { id: '5', username: 'You', xp: 1200, avatar: '👤', rank: 2 },
        { id: '6', username: 'NewbieBot', xp: 500, avatar: '👶', rank: 3 },
    ]
};

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');

    const list = MOCK_LEADERBOARD[activeTab];

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Trophy className="text-yellow-500 fill-current" />
                    Classifica
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">Scopri chi guida la rivoluzione della sicurezza.</p>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
                <button
                    onClick={() => setActiveTab('global')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                        activeTab === 'global'
                            ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600 dark:text-blue-400"
                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                    )}
                >
                    <Globe className="w-4 h-4" />
                    Globale
                </button>
                <button
                    onClick={() => setActiveTab('friends')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                        activeTab === 'friends'
                            ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600 dark:text-blue-400"
                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                    )}
                >
                    <Users className="w-4 h-4" />
                    Amici
                </button>
            </div>

            {activeTab === 'friends' ? (
                <FriendList
                    friends={MOCK_LEADERBOARD.friends}
                    currentUserId="5" // Mock ID for "You"
                    referralCode="ABC123" // Mock code
                />
            ) : (
                <div className="space-y-3">
                    {MOCK_LEADERBOARD.global.map((user) => (
                        <div
                            key={user.id}
                            className={cn(
                                "flex items-center p-4 rounded-xl border-2 transition-all",
                                user.username === 'You'
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800"
                                    : "border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 flex items-center justify-center font-bold rounded-full mr-4",
                                user.rank <= 3 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500" : "text-zinc-500"
                            )}>
                                {user.rank}
                            </div>

                            <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-xl mr-3">
                                {user.avatar}
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-sm">{user.username}</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.xp} XP</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
