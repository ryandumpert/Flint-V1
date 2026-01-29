/**
 * Showcase - GENERIC
 * Premium showcase with headline, benefits, tagline, and CTA
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface BenefitItem {
    icon?: string;
    text: string;
    actionPhrase?: string;
}

interface ShowcaseProps {
    headline?: string;
    subheadline?: string;
    benefits?: BenefitItem[];
    tagline?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Showcase: React.FC<ShowcaseProps> = ({
    headline,
    subheadline,
    benefits,
    tagline,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container h-full flex flex-col">


            {benefits && benefits.length > 0 && (
                <div className={`grid gap-5 flex-grow ${benefits.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' :
                    benefits.length === 3 ? 'md:grid-cols-3' :
                        'md:grid-cols-2 lg:grid-cols-4'
                    }`}>
                    {benefits.map((benefit, index) => {
                        const IconComp = getIcon(benefit.icon);
                        return (
                            <div
                                key={index}
                                onClick={() => benefit.actionPhrase && handleAction(benefit.actionPhrase)}
                                className={`group relative p-6 rounded-2xl 
                                    bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]
                                    ${benefit.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.06]' : ''}
                                    transition-all duration-300`}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-sapphire/10 border border-sapphire/20 
                                    flex items-center justify-center mb-5
                                    group-hover:bg-sapphire/15 group-hover:border-sapphire/30 transition-all">
                                    <IconComp className="w-7 h-7 text-sapphire" />
                                </div>
                                <span className="text-lg text-white font-medium leading-snug block">{benefit.text}</span>
                                {benefit.actionPhrase && (
                                    <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-mist/20 
                                        group-hover:text-sapphire group-hover:translate-x-1 transition-all" />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {tagline && (
                <div className="text-center py-10">
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full 
                        bg-gradient-to-r from-sapphire/10 to-sapphire/5 border border-sapphire/20">
                        <span className="w-2 h-2 rounded-full bg-sapphire animate-pulse" />
                        <span className="text-lg text-sapphire font-medium">"{tagline}"</span>
                    </div>
                </div>
            )}

            <div className="flex-grow" />

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-6 pb-2 flex justify-end">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
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

export default Showcase;
