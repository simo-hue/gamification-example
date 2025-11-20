'use client';

import Link from 'next/link';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { MOCK_QUIZZES } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Learning Path</h1>
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

      <div className="space-y-4">
        {MOCK_QUIZZES.map((quiz, index) => (
          <div
            key={quiz.id}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all",
              quiz.locked
                ? "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 opacity-75"
                : "border-blue-200 bg-white dark:border-blue-900 dark:bg-zinc-950 shadow-sm hover:border-blue-400 dark:hover:border-blue-700"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{quiz.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{quiz.description}</p>
                <div className="flex items-center space-x-2 text-xs font-medium text-blue-600 dark:text-blue-400 pt-2">
                  <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    +{quiz.xpReward} XP
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 ml-4">
                {quiz.locked ? (
                  <Lock className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
                ) : quiz.completed ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <Link href={`/quiz/${quiz.id}`}>
                    <PlayCircle className="w-10 h-10 text-blue-500 hover:scale-110 transition-transform cursor-pointer" />
                  </Link>
                )}
              </div>
            </div>

            {/* Connector Line (Visual only) */}
            {index < MOCK_QUIZZES.length - 1 && (
              <div className="absolute left-1/2 -bottom-6 w-0.5 h-4 bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 z-[-1]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
