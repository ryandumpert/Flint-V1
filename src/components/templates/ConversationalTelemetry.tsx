/**
 * ConversationalTelemetry - Step 6, Thing 3
 * Full-width layout with metrics combination and sample dashboard
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Activity, MousePointer, MessageSquare, ArrowRight, TrendingUp, Users, Target, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface MetricItem {
    label: string;
    value: string;
    change: string;
    icon?: string;
}

interface FormulaItem {
    icon?: string;
    label: string;
}

interface ConversationalTelemetryProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    formulaItems?: FormulaItem[];
    metricsLabel?: string;
    metrics?: MetricItem[];
    journeyTitle?: string;
    journeyDesc?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Activity;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Activity;
};

export const ConversationalTelemetry: React.FC<ConversationalTelemetryProps> = ({
    headline = "Conversational Telemetry",
    subheadline = "Clicks + Words + Outcomes",
    description = "Combine traditional web analytics with conversation analytics. Understand the complete user journey from first click to final conversion.",
    formulaItems = [
        { icon: "MousePointer", label: "Web Analytics" },
        { icon: "MessageSquare", label: "Conversation" },
        { icon: "Activity", label: "Full Picture" },
    ],
    metricsLabel = "Sample Dashboard",
    metrics = [
        { label: "Page Views", value: "45.2K", change: "+12%", icon: "MousePointer" },
        { label: "Conversations", value: "8.4K", change: "+34%", icon: "MessageSquare" },
        { label: "Intent Matches", value: "7.1K", change: "+28%", icon: "Target" },
        { label: "Conversions", value: "2.3K", change: "+45%", icon: "TrendingUp" },
    ],
    journeyTitle = "Journey Tracking",
    journeyDesc = "See the path from visit to conversation to conversion",
    ctaLabel = "Schedule Hackathon",
    ctaActionPhrase = "Show me how to schedule a hackathon",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Concept */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <Activity className="w-7 h-7 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-sapphire">{subheadline}</p>
                        </div>
                    </div>
                    <p className="text-lg text-mist/80 mb-6">{description}</p>

                    {/* Visual Formula */}
                    <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                        {formulaItems.map((item, i) => {
                            const ItemIcon = getIcon(item.icon);
                            const colors = ['text-sapphire', 'text-flamingo', 'text-jade'];
                            return (
                                <React.Fragment key={i}>
                                    <div className="text-center">
                                        <ItemIcon className={`w-10 h-10 mx-auto mb-2 ${colors[i] || 'text-sapphire'}`} />
                                        <div className="text-sm text-mist/70">{item.label}</div>
                                    </div>
                                    {i < formulaItems.length - 1 && (
                                        <div className="text-3xl text-mist/30">{i === formulaItems.length - 2 ? '=' : '+'}</div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Sample Dashboard */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{metricsLabel}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {metrics.map((m, i) => {
                            const MetricIcon = getIcon(m.icon);
                            return (
                                <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                                    <div className="flex items-center justify-between mb-2">
                                        <MetricIcon className="w-5 h-5 text-sapphire" />
                                        <span className="text-xs text-jade">{m.change}</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">{m.value}</p>
                                    <p className="text-xs text-mist/60">{m.label}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                        <div className="flex items-center gap-3">
                            <Users className="w-6 h-6 text-sapphire" />
                            <div>
                                <p className="text-white font-medium">{journeyTitle}</p>
                                <p className="text-xs text-mist/60">{journeyDesc}</p>
                            </div>
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
export default ConversationalTelemetry;
