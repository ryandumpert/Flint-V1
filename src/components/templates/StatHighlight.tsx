/**
 * StatHighlight - REUSABLE
 * Displays big numbers with context
 * 
 * USE WHEN: Showing impactful statistics, KPIs, or metrics
 * REUSABLE: Works for any step needing to highlight numbers
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Stat {
    value: string;
    label: string;
    context?: string;
}

interface StatHighlightProps {
    stats: Stat[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const StatHighlight: React.FC<StatHighlightProps> = ({
    stats = [],
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* Stats Grid */}
            <div className={`grid gap-6 mb-8 ${stats.length === 3 ? 'md:grid-cols-3' : stats.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-4'}`}>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="text-center p-6 rounded-xl bg-obsidian/40 border border-mist/10"
                    >
                        <div className="text-5xl md:text-6xl font-bold text-sapphire mb-2">
                            {stat.value}
                        </div>
                        <div className="text-lg font-semibold text-white mb-1">
                            {stat.label}
                        </div>
                        {stat.context && (
                            <div className="text-sm text-mist/60">
                                {stat.context}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-right">
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default StatHighlight;
