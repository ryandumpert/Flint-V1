/**
 * ProbabilisticCRM - Step 6, Thing 2
 * Full-width layout with intent scoring examples and lead comparison
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Brain, Target, TrendingUp, ArrowRight, Users, Percent, BarChart3, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FeatureItem {
    icon?: string;
    title: string;
    description: string;
}

interface LeadItem {
    name: string;
    intent: string;
    score: number;
    trend?: string;
}

interface ProbabilisticCRMProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    features?: FeatureItem[];
    leadsLabel?: string;
    sampleLeads?: LeadItem[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Brain;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Brain;
};

export const ProbabilisticCRM: React.FC<ProbabilisticCRMProps> = ({
    headline = "Probabilistic CRM",
    subheadline = "Track intent, not just events",
    description = "Understand likelihood, not just events. Each user gets an intent score with confidence levels. Make decisions based on probability.",
    features = [
        { icon: "Target", title: "Intent Scoring", description: "Probability of conversion" },
        { icon: "TrendingUp", title: "Confidence Levels", description: "Each prediction scored" },
        { icon: "BarChart3", title: "Intent History", description: "Track changes over time" },
        { icon: "Users", title: "Segment Discovery", description: "Auto-cluster by intent" },
    ],
    leadsLabel = "Sample Intent Scores",
    sampleLeads = [
        { name: "Sarah from Acme Corp", intent: "Purchase Consideration", score: 87, trend: "up" },
        { name: "Mike from TechStart", intent: "Information Gathering", score: 42, trend: "stable" },
        { name: "Lisa from BigRetail", intent: "Ready to Buy", score: 94, trend: "up" },
    ],
    successNote = "Prioritize by likelihood to convert, not just activity",
    ctaLabel = "Telemetry",
    ctaActionPhrase = "Show me conversational telemetry",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Concept */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-flamingo/20 border border-flamingo/30 flex items-center justify-center">
                            <Brain className="w-7 h-7 text-flamingo" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-flamingo">{subheadline}</p>
                        </div>
                    </div>
                    <p className="text-lg text-mist/80 mb-6">{description}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {features.map((f, i) => {
                            const FeatureIcon = getIcon(f.icon);
                            return (
                                <div key={i} className="p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                                    <FeatureIcon className="w-6 h-6 text-flamingo mb-2" />
                                    <div className="text-white font-bold">{f.title}</div>
                                    <div className="text-sm text-mist/60">{f.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Sample Leads */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{leadsLabel}</p>
                    {sampleLeads.map((lead, i) => (
                        <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-white font-medium">{lead.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-lg font-bold ${lead.score >= 80 ? 'text-jade' : lead.score >= 50 ? 'text-flamingo' : 'text-mist/60'}`}>
                                        {lead.score}%
                                    </span>
                                    {lead.trend === 'up' && <TrendingUp className="w-4 h-4 text-jade" />}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-flamingo/20 text-flamingo">{lead.intent}</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${lead.score >= 80 ? 'bg-jade' : lead.score >= 50 ? 'bg-flamingo' : 'bg-mist/40'}`}
                                    style={{ width: `${lead.score}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="p-4 rounded-lg bg-flamingo/10 border border-flamingo/20">
                        <div className="flex items-center gap-2 text-sm text-flamingo">
                            <Percent className="w-4 h-4" />
                            <span>{successNote}</span>
                        </div>
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
export default ProbabilisticCRM;
