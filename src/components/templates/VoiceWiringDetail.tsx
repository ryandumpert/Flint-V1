/**
 * VoiceWiringDetail - Step 5, Thing 1
 * Full-width layout with example and how-it-works breakdown
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Mic, MessageSquare, Zap, ArrowRight, Clock, Sparkles, Code, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FeatureItem {
    icon?: string;
    text: string;
}

interface VoiceWiringDetailProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    features?: FeatureItem[];
    examplesLabel?: string;
    examples?: string[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Mic;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Mic;
};

export const VoiceWiringDetail: React.FC<VoiceWiringDetailProps> = ({
    headline = "Voice Wiring",
    subheadline = "Speak to Claude, tele learns instantly",
    description = "The fastest way to build. Just describe what you want in natural language — Claude generates production-ready templates in seconds. No coding required.",
    features = [
        { icon: "MessageSquare", text: "Talk in natural language" },
        { icon: "Sparkles", text: "Claude generates templates instantly" },
        { icon: "Code", text: "Production-ready code output" },
        { icon: "Clock", text: "5-second average generation time" },
    ],
    examplesLabel = "Example Voice Commands",
    examples = [
        "Add a pricing table with three tiers: Starter at $29, Pro at $99, and Enterprise custom pricing",
        "Create a testimonial carousel with customer quotes and photos",
        "Make my tele explain our onboarding process in 5 steps",
    ],
    successNote = "Each command generates a complete, styled template",
    ctaLabel = "Vibe Wiring",
    ctaActionPhrase = "Show me vibe wiring",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Explanation */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <Mic className="w-7 h-7 text-sapphire" />
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

                {/* Right Column - Examples */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{examplesLabel}</p>
                    {examples.map((example, i) => (
                        <div key={i} className="p-5 rounded-xl bg-sapphire/10 border border-sapphire/20">
                            <div className="flex items-start gap-3">
                                <Mic className="w-5 h-5 text-sapphire flex-shrink-0 mt-0.5" />
                                <p className="text-mist/80 italic">"{example}"</p>
                            </div>
                        </div>
                    ))}
                    <div className="p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                        <div className="flex items-center gap-2 text-sm text-mist/70">
                            <Zap className="w-4 h-4 text-jade" />
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
export default VoiceWiringDetail;
