/**
 * AnyChannel - Step 2, Thing 3
 * Full-width layout with channel cards and unified experience message
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { MessageSquare, Phone, MessageCircle, Mic, User, ArrowRight, CheckCircle, Zap, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ChannelItem {
    icon?: string;
    name: string;
    desc: string;
    latency: string;
}

interface BenefitItem {
    icon?: string;
    title: string;
    description: string;
}

interface AnyChannelProps {
    headline?: string;
    subheadline?: string;
    channels?: ChannelItem[];
    benefits?: BenefitItem[];
    footerNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return MessageSquare;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || MessageSquare;
};

export const AnyChannel: React.FC<AnyChannelProps> = ({
    headline = "On Any Channel They Prefer",
    subheadline = "5 channels, one tele — same knowledge, same personality",
    channels = [
        { icon: "MessageSquare", name: "Text", desc: "SMS & messaging apps", latency: "<100ms" },
        { icon: "Phone", name: "Phone", desc: "Inbound & outbound calls", latency: "<500ms" },
        { icon: "MessageCircle", name: "Chat", desc: "Web widget & embeds", latency: "<100ms" },
        { icon: "Mic", name: "Voice", desc: "Real-time speech", latency: "<200ms" },
        { icon: "User", name: "Avatar", desc: "Visual AI presence", latency: "<300ms" },
    ],
    benefits = [
        { icon: "CheckCircle", title: "One Knowledge Base", description: "Wire once, deploy everywhere. Your tele's knowledge works across all channels." },
        { icon: "CheckCircle", title: "Consistent Personality", description: "Same voice, tone, and style — whether text, call, or avatar interaction." },
        { icon: "CheckCircle", title: "Unified Analytics", description: "Track all conversations in one place regardless of channel." },
    ],
    footerNote = "User prefers text today, voice tomorrow? Same tele handles both seamlessly.",
    ctaLabel = "See the Platform",
    ctaActionPhrase = "Show me the platform",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">{headline}</h3>
                <p className="text-sapphire text-lg">{subheadline}</p>
            </div>

            {/* Channel Grid */}
            <div className="grid md:grid-cols-5 gap-4 mb-8">
                {channels.map((c, i) => {
                    const IconComp = getIcon(c.icon);
                    return (
                        <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center hover:bg-white/[0.06] transition-all">
                            <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center mx-auto mb-3">
                                <IconComp className="w-7 h-7 text-sapphire" />
                            </div>
                            <div className="font-bold text-white text-lg mb-1">{c.name}</div>
                            <div className="text-xs text-mist/60 mb-2">{c.desc}</div>
                            <div className="inline-flex items-center gap-1 text-xs text-jade">
                                <Zap className="w-3 h-3" />
                                {c.latency}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Unified Experience Section */}
            <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((b, i) => {
                    const IconComp = getIcon(b.icon);
                    return (
                        <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <IconComp className="w-6 h-6 text-sapphire mb-3" />
                            <h4 className="text-white font-semibold mb-2">{b.title}</h4>
                            <p className="text-sm text-mist/70">{b.description}</p>
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between mt-8 p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <p className="text-mist/70">{footerNote}</p>
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
export default AnyChannel;
