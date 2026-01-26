/**
 * AnalyticsView - PURPOSE-SPECIFIC (Step 6: Analytics)
 * Shows the 3 analytics capabilities
 */

import React from 'react';
import { Eye, ArrowRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface AnalyticItem {
    icon: string;
    title: string;
    description: string;
}

interface AnalyticsViewProps {
    analytics?: AnalyticItem[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Eye;
};

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
    analytics = [
        { icon: "Eye", title: "Agent Observability", description: "See what AI is doing and why. Full transparency into every decision." },
        { icon: "Brain", title: "Probabilistic CRM", description: "Track intent with confidence levels, not binary leads." },
        { icon: "Activity", title: "Conversational Telemetry", description: "Combine clicks + words + outcomes for complete picture." }
    ],
    ctaLabel = "Schedule hackathon",
    ctaActionPhrase = "Show me hackathon",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container space-y-6">
            {analytics.map((item, index) => {
                const IconComp = getIcon(item.icon);
                return (
                    <div key={index} className="p-6 rounded-xl bg-obsidian/40 border border-mist/10">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                                <IconComp className="w-6 h-6 text-sapphire" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-mist/70">{item.description}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-right pt-4">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg" onClick={() => handleAction(ctaActionPhrase)}>
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnalyticsView;
