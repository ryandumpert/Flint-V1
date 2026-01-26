/**
 * ConceptCard - REUSABLE
 * Deep dive into a single concept with expandable details
 * 
 * USE WHEN: Explaining any single concept in depth
 * REUSABLE: Works for any concept or feature explanation
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, Lightbulb } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ConceptCardProps {
    title: string;
    subtitle?: string;
    description: string;
    details?: string[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
    title,
    subtitle,
    description,
    details = [],
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const toggleExpand = () => {
        playClick();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="glass-template-container">
            <div className="rounded-xl bg-obsidian/40 border border-mist/10 overflow-hidden">
                {/* Header */}
                <div
                    className="flex items-center gap-4 p-6 cursor-pointer hover:bg-obsidian/60 transition-colors"
                    onClick={toggleExpand}
                >
                    <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                        <Lightbulb className="w-7 h-7 text-sapphire" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                        {subtitle && (
                            <p className="text-sm text-sapphire">{subtitle}</p>
                        )}
                    </div>
                    <div className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        {isExpanded ? (
                            <ChevronUp className="w-6 h-6 text-mist/50" />
                        ) : (
                            <ChevronDown className="w-6 h-6 text-mist/50" />
                        )}
                    </div>
                </div>

                {/* Content - Always show description, expand for details */}
                <div className="px-6 pb-6">
                    <p className="text-mist/70 text-lg leading-relaxed mb-4">
                        {description}
                    </p>

                    {/* Expandable Details */}
                    {isExpanded && details.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-3 pt-4 border-t border-mist/10">
                            {details.map((detail, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-sapphire flex-shrink-0" />
                                    <span className="text-sm text-mist/80">{detail}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-right mt-6">
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

export default ConceptCard;
