import React from 'react';
import { Trophy } from 'lucide-react';
import { BadgeCard, Badge } from '@/components/gamification/BadgeCard';

interface ArtifactGridProps {
    badges: Badge[];
    onSelectBadge: (badge: Badge) => void;
}

export function ArtifactGrid({ badges, onSelectBadge }: ArtifactGridProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 text-cyber-purple mb-2">
                <Trophy className="w-5 h-5" />
                <h2 className="font-bold font-orbitron tracking-wide text-sm">ARTIFACT GRID</h2>
            </div>

            {/* Hex Grid Layout - Honeycomb */}
            <div className="flex flex-wrap justify-center mx-auto pb-12 px-4 w-fit max-w-full">
                {badges.map((badge) => (
                    <div key={badge.id} className="honeycomb-cell">
                        <BadgeCard badge={badge} onClick={onSelectBadge} />
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .honeycomb-cell {
                    margin: 0 4px -25px 4px; /* Reduced negative margin to fix overlap */
                }

                /* Mobile: 2 Columns - Enforce width to force wrap */
                @media (max-width: 639px) {
                    .honeycomb-cell:nth-child(4n + 3) {
                        margin-left: 54px; /* Shift 3rd item (start of row 2) */
                    }
                }

                /* Desktop: 3 Columns */
                @media (min-width: 640px) {
                    .honeycomb-cell:nth-child(6n + 4) {
                        margin-left: 54px; /* Shift 4th item (start of row 2) */
                    }
                }
            `}</style>
        </section>
    );
}
