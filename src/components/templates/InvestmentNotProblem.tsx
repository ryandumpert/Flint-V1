/**
 * InvestmentNotProblem - Step 1, Thing 2
 * Full-width layout with investment stats and timeline
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { DollarSign, CheckCircle, ArrowRight, TrendingUp, Building2, Landmark, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface StatItem {
    icon?: string;
    value: string;
    label: string;
}

interface InvestmentNotProblemProps {
    headline?: string;
    subheadline?: string;
    points?: string[];
    conclusion?: string;
    statsSectionLabel?: string;
    stats?: StatItem[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return DollarSign;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || DollarSign;
};

export const InvestmentNotProblem: React.FC<InvestmentNotProblemProps> = ({
    headline = "Investment Isn't the Problem",
    subheadline = "Billions are flowing in",
    points = [
        "$1.3 trillion spent globally on AI",
        "Enterprise budgets at all-time highs",
        "VCs backing AI at unprecedented rates",
        "Government incentives accelerating adoption",
        "Every Fortune 500 has an AI initiative"
    ],
    conclusion = "\"Money isn't the constraint. Projects fail despite massive investment.\"",
    statsSectionLabel = "Global AI Investment",
    stats = [
        { icon: "TrendingUp", value: "$200B", label: "VC funding 2024" },
        { icon: "Building2", value: "$150B", label: "Enterprise spend" },
        { icon: "Landmark", value: "$50B", label: "Government grants" },
        { icon: "DollarSign", value: "38%", label: "YoY growth" },
    ],
    successNote = "✓ Money is abundant. Funding isn't the blocker.",
    ctaLabel = "What IS the problem?",
    ctaActionPhrase = "Show me the adoption problem",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Message */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <DollarSign className="w-7 h-7 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-green-400">{subheadline}</p>
                        </div>
                    </div>
                    <div className="space-y-4 mb-6">
                        {points.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span className="text-mist/80">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-mist/60 italic">{conclusion}</p>
                </div>

                {/* Right Column - Investment Stats */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{statsSectionLabel}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, i) => {
                            const IconComp = getIcon(stat.icon);
                            return (
                                <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center">
                                    <IconComp className="w-8 h-8 text-sapphire mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-xs text-mist/60">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-green-400 text-sm font-medium">{successNote}</p>
                    </div>
                    {ctaLabel && (
                        <button
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all"
                            onClick={() => handleAction(ctaActionPhrase || '')}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default InvestmentNotProblem;
