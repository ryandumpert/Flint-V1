/**
 * GenerativeWebDetail - Step 4, Thing 3
 * Full-width layout with concept explanation and comparison
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Layout, Sparkles, Layers, ArrowRight, X, CheckCircle, Zap, RefreshCw, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FeatureItem {
    icon?: string;
    text: string;
}

interface GenerativeWebDetailProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    features?: FeatureItem[];
    comparisonLabel?: string;
    traditionalTitle?: string;
    traditionalPoints?: string[];
    generativeTitle?: string;
    generativePoints?: string[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Sparkles;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Sparkles;
};

export const GenerativeWebDetail: React.FC<GenerativeWebDetailProps> = ({
    headline = "Generative Web",
    subheadline = "AI-Rendered Visual Interfaces",
    description = "Not static pages — interfaces assembled in real-time. The AI composes the perfect layout for each user, each moment, each conversation.",
    features = [
        { icon: "Layout", text: "Surfaces assembled in real-time" },
        { icon: "Layers", text: "Templates are building blocks" },
        { icon: "Sparkles", text: "Every view purpose-built for the moment" },
        { icon: "RefreshCw", text: "Adapts as conversation evolves" },
    ],
    comparisonLabel = "Static vs Generative",
    traditionalTitle = "Traditional Static Sites",
    traditionalPoints = ["Same page for every user", "Fixed navigation paths", "Content changes require deploys", "One-size-fits-all experience"],
    generativeTitle = "Generative Web",
    generativePoints = ["Unique view per conversation", "AI-guided navigation", "Instant content updates", "Context-aware experience"],
    successNote = "Context-aware rendering for every user",
    ctaLabel = "Learn Wiring",
    ctaActionPhrase = "Show me how to wire a tele",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Explanation */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-flamingo/20 border border-flamingo/30 flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-flamingo" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-flamingo">{subheadline}</p>
                        </div>
                    </div>
                    <p className="text-lg text-mist/80 mb-6">{description}</p>
                    <div className="space-y-4">
                        {features.map((item, i) => {
                            const IconComp = getIcon(item.icon);
                            return (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04]">
                                    <IconComp className="w-5 h-5 text-flamingo flex-shrink-0" />
                                    <span className="text-mist/80">{item.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Comparison */}
                <div className="space-y-6">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{comparisonLabel}</p>

                    {/* Traditional */}
                    <div className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                        <div className="flex items-center gap-2 mb-3">
                            <X className="w-5 h-5 text-red-400" />
                            <span className="font-semibold text-white">{traditionalTitle}</span>
                        </div>
                        <div className="space-y-2">
                            {traditionalPoints.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-mist/60">
                                    <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Generative */}
                    <div className="p-5 rounded-xl bg-flamingo/10 border border-flamingo/20">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-5 h-5 text-flamingo" />
                            <span className="font-semibold text-white">{generativeTitle}</span>
                        </div>
                        <div className="space-y-2">
                            {generativePoints.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-mist/80">
                                    <CheckCircle className="w-3 h-3 text-flamingo flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-jade/10 border border-jade/20">
                        <div className="flex items-center gap-2 text-sm text-jade">
                            <Zap className="w-4 h-4" />
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
export default GenerativeWebDetail;
