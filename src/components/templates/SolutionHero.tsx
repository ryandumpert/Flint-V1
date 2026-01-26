/**
 * SolutionHero - PURPOSE-SPECIFIC (Step 2: The Solution)
 * Hero section explaining what a tele is
 * 
 * USE WHEN: Introducing the tele solution
 */

import React from 'react';
import { Globe, ArrowRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface BenefitItem {
    icon: string;
    text: string;
}

interface SolutionHeroProps {
    headline?: string;
    subheadline?: string;
    tagline?: string;
    benefits?: BenefitItem[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Globe;
};

export const SolutionHero: React.FC<SolutionHeroProps> = ({
    headline = "A Tele is the UI for AI",
    subheadline = "The missing interface making AI accessible to everyone",
    tagline = "A tele serves as an agentic user interface",
    benefits = [
        { icon: "Globe", text: "Meets consumers globally" },
        { icon: "Smartphone", text: "Any device" },
        { icon: "Radio", text: "Any channel" }
    ],
    ctaLabel = "See the Platform",
    ctaActionPhrase = "Show me the platform",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container space-y-8">
            {/* Hero Text */}
            <div className="text-center py-8">
                <div className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {headline}
                </div>
                <div className="text-xl text-mist/70 max-w-2xl mx-auto">
                    {subheadline}
                </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                    const IconComponent = getIcon(benefit.icon);
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-5 rounded-xl bg-obsidian/40 border border-mist/10"
                        >
                            <div className="w-12 h-12 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-6 h-6 text-sapphire" />
                            </div>
                            <div className="text-lg text-white font-medium">
                                {benefit.text}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tagline */}
            <div className="text-center py-6">
                <div className="inline-block px-6 py-3 rounded-full bg-sapphire/10 border border-sapphire/30">
                    <span className="text-lg text-sapphire font-semibold">
                        "{tagline}"
                    </span>
                </div>
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

export default SolutionHero;
