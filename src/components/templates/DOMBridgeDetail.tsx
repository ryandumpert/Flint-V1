/**
 * DOMBridgeDetail - Step 4, Thing 2
 * Full-width layout with function breakdown and flow diagram
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Link, Code, Zap, ArrowRight, ArrowDown, MessageSquare, Layout, CheckCircle, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FeatureItem {
    icon?: string;
    text: string;
}

interface FlowStep {
    icon?: string;
    title: string;
    description: string;
    color?: string;
}

interface DOMBridgeDetailProps {
    headline?: string;
    subheadline?: string;
    codeExample?: string;
    features?: FeatureItem[];
    flowLabel?: string;
    flowSteps?: FlowStep[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Link;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Link;
};

export const DOMBridgeDetail: React.FC<DOMBridgeDetailProps> = ({
    headline = "DOM-to-LLM Bridge",
    subheadline = "navigateToSection() — One Function",
    codeExample = `navigateToSection({
  badge: "SECTION",
  title: "Title",
  generativeSubsections: [...]
})`,
    features = [
        { icon: "Code", text: "Structured JSON payload" },
        { icon: "Zap", text: "Instant DOM rendering (<50ms)" },
        { icon: "Link", text: "No polling, no WebSockets" },
        { icon: "CheckCircle", text: "Type-safe template props" },
    ],
    flowLabel = "How It Works",
    flowSteps = [
        { icon: "MessageSquare", title: "User Speaks", description: "\"Show me the pricing options\"", color: "sapphire" },
        { icon: "Zap", title: "AI Processes", description: "Runtime agent interprets intent, selects templates", color: "flamingo" },
        { icon: "Layout", title: "UI Updates", description: "navigateToSection() renders the perfect view", color: "jade" },
    ],
    ctaLabel = "Generative Web",
    ctaActionPhrase = "Show me generative web",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Function Details */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <Link className="w-7 h-7 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-sapphire">{subheadline}</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-obsidian/60 border border-mist/20 mb-6">
                        <code className="text-sm text-sapphire font-mono block overflow-x-auto whitespace-pre">
                            {codeExample}
                        </code>
                    </div>
                    <div className="space-y-3">
                        {features.map((item, i) => {
                            const IconComp = getIcon(item.icon);
                            return (
                                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.04]">
                                    <IconComp className="w-5 h-5 text-sapphire flex-shrink-0" />
                                    <span className="text-mist/80 text-sm">{item.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Flow Diagram */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{flowLabel}</p>

                    {flowSteps.map((step, i) => {
                        const StepIcon = getIcon(step.icon);
                        return (
                            <React.Fragment key={i}>
                                <div className={`p-5 rounded-xl bg-${step.color || 'sapphire'}/10 border border-${step.color || 'sapphire'}/20`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <StepIcon className={`w-6 h-6 text-${step.color || 'sapphire'}`} />
                                        <span className="font-semibold text-white">{step.title}</span>
                                    </div>
                                    <p className="text-sm text-mist/70">{step.description}</p>
                                </div>
                                {i < flowSteps.length - 1 && (
                                    <div className="flex justify-center">
                                        <ArrowDown className="w-5 h-5 text-mist/40" />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}

                    {ctaLabel && (
                        <button
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all mt-2"
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
export default DOMBridgeDetail;
