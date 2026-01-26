/**
 * InnovationStack - PURPOSE-SPECIFIC (Step 4: Innovations)
 * Shows the 3 key innovations that power teleglass
 * 
 * ⚠️ NO DEFAULTS - ALL PROPS MUST BE PROVIDED BY RUNTIME AGENT
 * 
 * USE WHEN: Explaining dual agent, DOM bridge, generative web
 */

import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp, ArrowRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface InnovationItem {
    icon: string;
    number: number;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
}

interface InnovationStackProps {
    innovations: InnovationItem[];
    ctaLabel: string;
    ctaActionPhrase: string;
}

const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Users;
};

export const InnovationStack: React.FC<InnovationStackProps> = ({
    innovations,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const toggleExpand = (index: number) => {
        playClick();
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Guard against missing props
    if (!innovations) {
        return (
            <div className="glass-template-container p-8 text-center">
                <p className="text-flamingo">⚠️ Template props missing. Runtime Agent must provide all props.</p>
            </div>
        );
    }

    return (
        <div className="glass-template-container space-y-4">
            {innovations.map((innovation, index) => {
                const isExpanded = expandedIndex === index;
                const IconComp = getIcon(innovation.icon);
                return (
                    <div
                        key={index}
                        className="rounded-xl bg-obsidian/40 border border-mist/10 overflow-hidden hover:border-sapphire/30 transition-all"
                    >
                        {/* Header */}
                        <div
                            className="flex items-center gap-4 p-5 cursor-pointer hover:bg-obsidian/60 transition-colors"
                            onClick={() => toggleExpand(index)}
                        >
                            {/* Number + Icon */}
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                    <IconComp className="w-7 h-7 text-sapphire" />
                                </div>
                                <div className="absolute -top-2 -left-2 w-6 h-6 bg-sapphire rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {innovation.number}
                                </div>
                            </div>

                            {/* Title */}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">{innovation.title}</h3>
                                <p className="text-sm text-sapphire">{innovation.subtitle}</p>
                            </div>

                            {/* Expand Icon */}
                            <div className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                {isExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-mist/50" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-mist/50" />
                                )}
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                            <div className="px-5 pb-5 pt-0 border-t border-mist/10">
                                <div className="pt-4 pl-18">
                                    <p className="text-sm text-mist/70 mb-4 leading-relaxed">
                                        {innovation.description}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {innovation.details.map((detail, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-sapphire flex-shrink-0" />
                                                <span className="text-sm text-mist/80">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-right pt-4">
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

export default InnovationStack;
