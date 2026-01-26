/**
 * UtilizationPricing - Step 3, Thing 3
 * Full-width layout with pricing tiers and cost comparison
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Calculator, Activity, TrendingUp, ArrowRight, CheckCircle, MessageSquare, Phone, Mic, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FeatureItem {
    icon?: string;
    text: string;
}

interface ChannelPrice {
    icon?: string;
    channel: string;
    price: string;
    unit: string;
}

interface UtilizationPricingProps {
    // Header
    headline?: string;
    subheadline?: string;
    // Left column
    description?: string;
    features?: FeatureItem[];
    // Right column
    pricingSectionLabel?: string;
    channelPricing?: ChannelPrice[];
    allChannelsNote?: string;
    creditsLabel?: string;
    creditsValue?: string;
    // CTA
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

// Helper to get icon component from string name
const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Calculator;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Calculator;
};

export const UtilizationPricing: React.FC<UtilizationPricingProps> = ({
    headline = "Utilization-Based Pricing",
    subheadline = "Pay for what you use",
    description = "Transparent, scalable pricing. Start small, grow as you need. No upfront commitments, no surprises.",
    features = [
        { icon: "Activity", text: "Per-interaction billing — only pay for usage" },
        { icon: "TrendingUp", text: "Volume discounts as you scale" },
        { icon: "Calculator", text: "No minimum commitments" },
        { icon: "CheckCircle", text: "Free hackathon credits included" },
    ],
    pricingSectionLabel = "Pricing by Channel",
    channelPricing = [
        { icon: "MessageSquare", channel: "Text", price: "$0.002", unit: "per message" },
        { icon: "MessageCircle", channel: "Chat", price: "Free", unit: "included" },
        { icon: "Mic", channel: "Voice", price: "$0.03", unit: "per minute" },
        { icon: "Phone", channel: "Call", price: "$0.07", unit: "per minute" },
        { icon: "User", channel: "Avatar", price: "$0.10", unit: "per minute" },
    ],
    allChannelsNote = "All channels included — pay only for what you use",
    creditsLabel = "Hackathon credits",
    creditsValue = "$500 included",
    ctaLabel = "See Innovations",
    ctaActionPhrase = "Show me the innovations",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Pricing Concept */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-flamingo/20 border border-flamingo/30 flex items-center justify-center">
                            <Calculator className="w-7 h-7 text-flamingo" />
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

                {/* Right Column - Channel Pricing */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{pricingSectionLabel}</p>
                    {channelPricing.map((c, i) => {
                        const IconComp = getIcon(c.icon);
                        return (
                            <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-flamingo/10 border border-flamingo/20 flex items-center justify-center">
                                        <IconComp className="w-6 h-6 text-flamingo" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{c.channel}</p>
                                        <p className="text-xs text-mist/60">{c.unit}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-flamingo">{c.price}</p>
                                    <p className="text-xs text-mist/50">starting at</p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="p-4 rounded-lg bg-jade/10 border border-jade/20">
                        <div className="flex items-center gap-2 text-sm text-jade">
                            <CheckCircle className="w-4 h-4" />
                            <span>{allChannelsNote}</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                        <div className="flex items-center justify-between">
                            <span className="text-mist/70">{creditsLabel}</span>
                            <span className="text-jade font-bold">{creditsValue}</span>
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
export default UtilizationPricing;
