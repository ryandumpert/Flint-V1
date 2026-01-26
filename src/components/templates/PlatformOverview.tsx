/**
 * PlatformOverview - PURPOSE-SPECIFIC (Step 3: Platform)
 * Shows the teleglass platform: triple agnostic + SaaS pricing
 * 
 * USE WHEN: Explaining the teleglass platform
 */

import React from 'react';
import { Cpu, ArrowRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface PillarItem {
    icon: string;
    title: string;
    description: string;
}

interface PlatformOverviewProps {
    agnosticLabel?: string;
    agnosticPillars?: PillarItem[];
    pricingLabel?: string;
    pricingPillars?: PillarItem[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Cpu;
};

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({
    agnosticLabel = "Triple Agnostic Architecture",
    agnosticPillars = [
        { icon: "Cpu", title: "Model Agnostic", description: "OpenAI/Claude/Gemini/Llama" },
        { icon: "Cloud", title: "Cloud Agnostic", description: "AWS/GCP/Azure/on-prem" },
        { icon: "Share2", title: "Channel Agnostic", description: "Text/phone/chat/voice/avatar" }
    ],
    pricingLabel = "SaaS Licensing & Pricing",
    pricingPillars = [
        { icon: "CreditCard", title: "SaaS Licensed", description: "Enterprise-ready SaaS" },
        { icon: "Activity", title: "Utilization-Based", description: "Pay per use" },
        { icon: "Calculator", title: "Per Interaction", description: "Transparent pricing" }
    ],
    ctaLabel = "See Innovations",
    ctaActionPhrase = "Show me innovations",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container space-y-8">
            {/* Triple Agnostic */}
            <div>
                <div className="text-sm font-semibold text-sapphire uppercase tracking-wider mb-4">
                    {agnosticLabel}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {agnosticPillars.map((pillar, index) => {
                        const IconComp = getIcon(pillar.icon);
                        return (
                            <div
                                key={index}
                                className="p-5 rounded-xl bg-obsidian/40 border border-mist/10"
                            >
                                <div className="w-10 h-10 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center mb-4">
                                    <IconComp className="w-5 h-5 text-sapphire" />
                                </div>
                                <div className="text-lg font-bold text-white mb-2">
                                    {pillar.title}
                                </div>
                                <div className="text-sm text-mist/70">
                                    {pillar.description}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SaaS Pricing */}
            <div>
                <div className="text-sm font-semibold text-sapphire uppercase tracking-wider mb-4">
                    {pricingLabel}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {pricingPillars.map((pillar, index) => {
                        const IconComp = getIcon(pillar.icon);
                        return (
                            <div
                                key={index}
                                className="p-5 rounded-xl bg-obsidian/40 border border-mist/10"
                            >
                                <div className="w-10 h-10 rounded-lg bg-flamingo/20 border border-flamingo/30 flex items-center justify-center mb-4">
                                    <IconComp className="w-5 h-5 text-flamingo" />
                                </div>
                                <div className="text-lg font-bold text-white mb-2">
                                    {pillar.title}
                                </div>
                                <div className="text-sm text-mist/70">
                                    {pillar.description}
                                </div>
                            </div>
                        );
                    })}
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

export default PlatformOverview;
