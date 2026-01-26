/**
 * AgentObservability - Step 6, Thing 1
 * Full-width layout with observability features and sample trace
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Eye, Search, Activity, ArrowRight, Clock, MessageSquare, Zap, CheckCircle, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface TraceStep {
    action: string;
    detail: string;
    time: string;
}

interface MetricItem {
    icon?: string;
    label: string;
    value: string;
}

interface FeatureItem {
    icon?: string;
    text: string;
}

interface AgentObservabilityProps {
    // Header
    headline?: string;
    subheadline?: string;
    // Left column
    description?: string;
    features?: FeatureItem[];
    // Right column
    traceSectionLabel?: string;
    traceSteps?: TraceStep[];
    metrics?: MetricItem[];
    // CTA
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

// Helper to get icon component from string name
const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Eye;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Eye;
};

export const AgentObservability: React.FC<AgentObservabilityProps> = ({
    headline = "Agent Observability",
    subheadline = "See what the AI is doing",
    description = "Full transparency into runtime behavior. Watch decisions in real-time, understand reasoning, debug visually. No black boxes.",
    features = [
        { icon: "Eye", text: "Watch AI decisions in real-time" },
        { icon: "Search", text: "Understand why each path was chosen" },
        { icon: "Activity", text: "Debug conversations visually" },
        { icon: "Clock", text: "Performance metrics per interaction" },
    ],
    traceSectionLabel = "Sample Conversation Trace",
    traceSteps = [
        { action: "User input", detail: "\"Show me pricing\"", time: "0ms" },
        { action: "Intent detected", detail: "pricing_inquiry (0.94)", time: "45ms" },
        { action: "Template selected", detail: "PricingTable", time: "62ms" },
        { action: "Response rendered", detail: "3 tiers displayed", time: "89ms" },
    ],
    metrics = [
        { icon: "MessageSquare", label: "Conversations", value: "12.4k" },
        { icon: "Zap", label: "Avg Response", value: "89ms" },
        { icon: "CheckCircle", label: "Accuracy", value: "97.2%" },
    ],
    ctaLabel = "Probabilistic CRM",
    ctaActionPhrase = "Show me probabilistic CRM",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Features */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <Eye className="w-7 h-7 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-sapphire">{subheadline}</p>
                        </div>
                    </div>
                    <p className="text-lg text-mist/80 mb-6">{description}</p>
                    <div className="space-y-4">
                        {features.map((item, i) => {
                            const IconComp = getIcon(item.icon);
                            return (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04]">
                                    <IconComp className="w-5 h-5 text-sapphire flex-shrink-0" />
                                    <span className="text-mist/80">{item.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Sample Trace */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{traceSectionLabel}</p>
                    <div className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                        {traceSteps.map((step, i) => (
                            <div key={i} className={`flex items-center gap-4 py-3 ${i < traceSteps.length - 1 ? 'border-b border-white/[0.08]' : ''}`}>
                                <div className="w-8 h-8 rounded-full bg-sapphire/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs text-sapphire font-bold">{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <span className="text-white text-sm font-medium">{step.action}</span>
                                    <p className="text-xs text-mist/60 font-mono">{step.detail}</p>
                                </div>
                                <span className="text-xs text-jade font-mono">{step.time}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {metrics.map((m, i) => {
                            const IconComp = getIcon(m.icon);
                            return (
                                <div key={i} className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-center">
                                    <IconComp className="w-5 h-5 text-sapphire mx-auto mb-1" />
                                    <p className="text-xs text-mist/60">{m.label}</p>
                                    <p className="text-white font-bold">{m.value}</p>
                                </div>
                            );
                        })}
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
export default AgentObservability;
