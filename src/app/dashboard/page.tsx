'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { SagaMap, SagaLevel } from '@/components/gamification/SagaMap';
import { cn } from '@/lib/utils';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [levels, setLevels] = useState<SagaLevel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSagaState() {
      try {
        const { data, error } = await supabase.rpc('get_user_saga_state');

        // ... (Mock data fallback logic kept for safety, but we focus on the main path)
        if (error) {
          console.warn('Error fetching saga state, using mock data:', error);
          // Fallback to mock data (simplified for brevity in this view)
          const mockLevels: SagaLevel[] = [
            { id: '1', day_number: 1, title: 'Introduction to Cyber Safety', is_boss_level: false, xp_reward: 50, module_title: 'Week 1: Foundations', theme_color: '#45A29E', order_index: 1, status: 'active' },
            { id: '2', day_number: 2, title: 'Spotting Phishing Emails', is_boss_level: false, xp_reward: 50, module_title: 'Week 1: Foundations', theme_color: '#45A29E', order_index: 2, status: 'locked' },
          ];
          setLevels(mockLevels);
          setLoading(false);
          return;
        }

        const result = data as any;
        // Assuming get_user_saga_state returns all levels and user progress
        // If it doesn't return progress with status, we might need to adjust.
        // But based on previous code, it seemed to return { levels: [], completed_level_ids: [] }

        const completedIds = new Set((result.completed_level_ids || []).map((i: any) => i.quiz_id));
        const rawLevels = result.levels || [];

        if (rawLevels.length === 0) {
          setLoading(false);
          return;
        }

        // 1. Determine Status & Max Day
        let maxUnlockedDay = 0;
        let isNextUnlocked = true; // The first non-completed level is the active one

        const processedLevels: SagaLevel[] = rawLevels.map((l: any) => {
          const isCompleted = completedIds.has(l.id);
          let status: 'locked' | 'active' | 'completed' = 'locked';

          if (isCompleted) {
            status = 'completed';
            maxUnlockedDay = Math.max(maxUnlockedDay, l.day_number);
          } else if (isNextUnlocked) {
            status = 'active';
            maxUnlockedDay = Math.max(maxUnlockedDay, l.day_number);
            isNextUnlocked = false;
          }

          return {
            id: l.id,
            day_number: l.day_number,
            title: l.title,
            is_boss_level: l.is_boss_level,
            xp_reward: l.xp_reward,
            module_title: l.module_title,
            theme_color: l.theme_color,
            order_index: l.order_index,
            status
          };
        });

        // 2. Fog of War Filter
        // Show: All levels <= maxUnlockedDay + 20 (Show significant chunk of future levels)
        const visibleLevels = processedLevels.filter(l => l.day_number <= maxUnlockedDay + 20);

        setLevels(visibleLevels);
      } catch (err) {
        console.error('Unexpected error:', err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchSagaState();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading your journey...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Your Journey</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Master AI Safety one step at a time.</p>
      </div>

      {/* Pending Challenges Notification */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-xl flex items-center justify-between animate-in slide-in-from-top-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center text-xl">
            ⚔️
          </div>
          <div>
            <h3 className="font-bold text-sm text-yellow-900 dark:text-yellow-100">New Challenge!</h3>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">DeepLearner challenged you.</p>
          </div>
        </div>
        <Link
          href="/quiz/1"
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-lg transition-colors"
        >
          Accept
        </Link>
      </div>

      {/* Learning Path */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Saga Map</h2>
          <span className="text-sm text-zinc-500">Week 1-4</span>
        </div>

        <SagaMap levels={levels} />
      </div>
    </div>
  );
}
