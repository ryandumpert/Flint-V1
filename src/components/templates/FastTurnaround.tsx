/**
 * FastTurnaround - Step 7, Thing 2
 * Full-width layout with side-by-side comparison: 18-month vs 3-hour
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Zap, ArrowRight, X, CheckCircle, Clock, Calendar, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ComparisonItem {
    text: string;
}

interface FastTurnaroundProps {
    headline?: string;
    subheadline?: string;
    traditionalTitle?: string;
    traditionalTime?: string;
    traditionalItems?: string[];
    hackathonTitle?: string;
    hackathonTime?: string;
    hackathonItems?: string[];
    footerTitle?: string;
    footerDesc?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const FastTurnaround: React.FC<FastTurnaroundProps> = ({
    headline = "Fast Turnaround",
    subheadline = "Traditional AI vs Hackathon",
    traditionalTitle = "Traditional AI Deployment",
    traditionalTime = "18+ months",
    traditionalItems = [
        "Requirements gathering (3 months)",
        "Vendor selection (2 months)",
        "Infrastructure setup (4 months)",
        "Custom development (6 months)",
        "Testing & deployment (3 months)",
    ],
    hackathonTitle = "Hackathon Approach",
    hackathonTime = "3 hours",
    hackathonItems = [
        "Wire knowledge (30 min)",
        "Build templates (60 min)",
        "Configure behaviors (45 min)",
        "Test & deploy (45 min)",
        "Live demo ready",
    ],
    footerTitle = "Same result. 99.9% less time.",
    footerDesc = "Your tele goes live during the hackathon, not after months of planning.",
    ctaLabel = "Full Support",
    ctaActionPhrase = "Show me support",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-flamingo/20 border border-flamingo/30 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-flamingo" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">{headline}</h3>
                    <p className="text-flamingo">{subheadline}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Traditional */}
                <div className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-mist/50" />
                        <div>
                            <span className="font-bold text-white">{traditionalTitle}</span>
                            <span className="text-3xl font-bold text-red-400 block">{traditionalTime}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {traditionalItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-mist/60">
                                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hackathon */}
                <div className="p-6 rounded-xl bg-jade/10 border border-jade/20">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-6 h-6 text-jade" />
                        <div>
                            <span className="font-bold text-white">{hackathonTitle}</span>
                            <span className="text-3xl font-bold text-jade block">{hackathonTime}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {hackathonItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-mist/80">
                                <CheckCircle className="w-4 h-4 text-jade flex-shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div>
                    <p className="text-white font-semibold">{footerTitle}</p>
                    <p className="text-sm text-mist/60">{footerDesc}</p>
                </div>
                {ctaLabel && (
                    <button
                        className="inline-flex items-center gap-2 px-6 py-3 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all flex-shrink-0"
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
export default FastTurnaround;
