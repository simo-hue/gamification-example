import React from 'react';
import { Shield } from 'lucide-react';
import { MissionCard, Mission } from '@/components/gamification/MissionCard';

interface MissionControlProps {
    missions: Mission[];
    onClaim: (id: string) => void;
}

export function MissionControl({ missions, onClaim }: MissionControlProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 text-cyber-blue mb-2">
                <Shield className="w-5 h-5" />
                <h2 className="font-bold font-orbitron tracking-wide text-sm">MISSION CONTROL</h2>
            </div>

            <div className="grid gap-3">
                {missions.map(mission => (
                    <MissionCard
                        key={mission.id}
                        mission={mission}
                        onClaim={onClaim}
                    />
                ))}
            </div>
        </section>
    );
}
