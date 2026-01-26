/**
 * TechNotProblem - Step 1, Thing 1
 * Full-width layout with AI model cards showcasing technology isn't the issue
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Cpu, CheckCircle, ArrowRight, Brain, Sparkles, Zap, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ModelItem {
    icon?: string;
    name: string;
    company: string;
    capability: string;
}

interface TechNotProblemProps {
    headline?: string;
    subheadline?: string;
    points?: string[];
    conclusion?: string;
    modelsSectionLabel?: string;
    models?: ModelItem[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Cpu;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Cpu;
};

export const TechNotProblem: React.FC<TechNotProblemProps> = ({
    headline = "Technology Isn't the Problem",
    subheadline = "AI is incredibly powerful",
    points = [
        "GPT-4, Claude, Gemini — models improve weekly",
        "Capabilities exceed most business needs",
        "Technical barriers have largely fallen",
        "APIs are accessible and well-documented",
        "Cost per token has dropped 90% in 2 years"
    ],
    conclusion = "\"The technology works brilliantly. That's not where projects fail.\"",
    modelsSectionLabel = "Leading AI Models",
    models = [
        { icon: "Brain", name: "GPT-4", company: "OpenAI", capability: "Reasoning & analysis" },
        { icon: "Sparkles", name: "Claude", company: "Anthropic", capability: "Long-form content" },
        { icon: "Zap", name: "Gemini", company: "Google", capability: "Multimodal processing" },
    ],
    successNote = "✓ All models production-ready. Technology is solved.",
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
                            <Cpu className="w-7 h-7 text-green-400" />
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

                {/* Right Column - Model Cards */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{modelsSectionLabel}</p>
                    {models.map((model, i) => {
                        const IconComp = getIcon(model.icon);
                        return (
                            <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                    <IconComp className="w-6 h-6 text-sapphire" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white">{model.name}</span>
                                        <span className="text-xs text-mist/50">by {model.company}</span>
                                    </div>
                                    <p className="text-sm text-mist/70">{model.capability}</p>
                                </div>
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                        );
                    })}
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 mt-4">
                        <p className="text-green-400 text-sm font-medium">{successNote}</p>
                    </div>
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
export default TechNotProblem;
