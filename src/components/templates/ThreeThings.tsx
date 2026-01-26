/**
 * ThreeThings - REUSABLE
 * Displays exactly 3 things in a clean, consistent format
 * 
 * USE WHEN: Showing the "3 main things" about any topic
 * REUSABLE: Matches the 3-things architecture pattern
 */

import React from 'react';
import { Cpu, Cloud, Share2, ArrowRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Thing {
    icon?: string;
    title: string;
    description: string;
    actionPhrase?: string;
}

interface ThreeThingsProps {
    things: Thing[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ThreeThings: React.FC<ThreeThingsProps> = ({
    things = [],
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getIcon = (iconName?: string): LucideIcon => {
        if (!iconName) return Cpu;
        const icon = (LucideIcons as any)[iconName];
        return icon || Cpu;
    };

    // Only show first 3 things
    const displayThings = things.slice(0, 3);

    return (
        <div className="glass-template-container">
            {/* Three Things Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {displayThings.map((thing, index) => {
                    const IconComponent = getIcon(thing.icon);
                    return (
                        <div
                            key={index}
                            className={`p-6 rounded-xl bg-obsidian/40 border border-mist/10
                                ${thing.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:bg-obsidian/60' : ''} 
                                transition-all`}
                            onClick={() => thing.actionPhrase && handleAction(thing.actionPhrase)}
                        >
                            {/* Number Badge */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-sapphire flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                    <IconComponent className="w-5 h-5 text-sapphire" />
                                </div>
                            </div>

                            <div className="text-lg font-bold text-white mb-2">
                                {thing.title}
                            </div>
                            <div className="text-sm text-mist/70 leading-relaxed">
                                {thing.description}
                            </div>
                        </div>
                    );
                })}
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

export default ThreeThings;
