/**
 * TripleAgnostic - Step 3, Thing 1
 * Full-width layout with 3 pillars and vendor options
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Cpu, Cloud, Share2, ArrowRight, CheckCircle, RefreshCw, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface PillarItem {
    icon?: string;
    title: string;
    desc: string;
    options: string[];
    color?: string;
}

interface TripleAgnosticProps {
    headline?: string;
    subheadline?: string;
    pillars?: PillarItem[];
    footerIcon?: string;
    footerTitle?: string;
    footerDesc?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Cpu;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Cpu;
};

export const TripleAgnostic: React.FC<TripleAgnosticProps> = ({
    headline = "Triple Agnostic Architecture",
    subheadline = "No lock-in. Freedom to choose. Switch anytime.",
    pillars = [
        {
            icon: "Cpu",
            title: "Model Agnostic",
            desc: "Switch LLMs without rewiring",
            options: ["OpenAI GPT-4", "Anthropic Claude", "Google Gemini", "Meta Llama"],
            color: "sapphire"
        },
        {
            icon: "Cloud",
            title: "Cloud Agnostic",
            desc: "Deploy anywhere you need",
            options: ["AWS", "Google Cloud", "Microsoft Azure", "On-Premises"],
            color: "flamingo"
        },
        {
            icon: "Share2",
            title: "Channel Agnostic",
            desc: "Same tele, all channels",
            options: ["Text/SMS", "Phone Calls", "Web Chat", "Voice & Avatar"],
            color: "jade"
        },
    ],
    footerIcon = "RefreshCw",
    footerTitle = "Switch providers with a config change",
    footerDesc = "No migrations, no rewrites, no downtime",
    ctaLabel = "SaaS Licensing",
    ctaActionPhrase = "Show me SaaS licensing",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };
    const FooterIcon = getIcon(footerIcon);

    return (
        <div className="glass-template-container">
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">{headline}</h3>
                <p className="text-sapphire text-lg">{subheadline}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {pillars.map((p, i) => {
                    const PillarIcon = getIcon(p.icon);
                    return (
                        <div key={i} className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                    <PillarIcon className="w-6 h-6 text-sapphire" />
                                </div>
                                <div>
                                    <div className="font-bold text-white text-lg">{p.title}</div>
                                    <div className="text-sm text-mist/60">{p.desc}</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {p.options.map((opt, j) => (
                                    <div key={j} className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-sapphire flex-shrink-0" />
                                        <span className="text-mist/80">{opt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="flex items-center gap-4">
                    <FooterIcon className="w-6 h-6 text-jade" />
                    <div>
                        <p className="text-white font-semibold">{footerTitle}</p>
                        <p className="text-sm text-mist/60">{footerDesc}</p>
                    </div>
                </div>
                {ctaLabel && (
                    <button
                        className="inline-flex items-center gap-2 px-6 py-3 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all"
                        onClick={() => handleAction(ctaActionPhrase || '')}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};
export default TripleAgnostic;
