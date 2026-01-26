/**
 * MeetsGlobally - Step 2, Thing 1
 * Full-width layout with global reach stats and regional breakdown
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Globe, ArrowRight, MapPin, Clock, Languages, Users, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface StatItem {
    icon?: string;
    value: string;
    label: string;
}

interface RegionItem {
    name: string;
    users: string;
    growth: string;
    progress: number;
}

interface MeetsGloballyProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    stats?: StatItem[];
    regionsSectionLabel?: string;
    regions?: RegionItem[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Globe;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Globe;
};

export const MeetsGlobally: React.FC<MeetsGloballyProps> = ({
    headline = "Meets Every Consumer Globally",
    subheadline = "Where they are, when they need it",
    description = "A tele doesn't wait for users to find it. It meets them where they already are — any location, any timezone, any language preference. Global reach without global complexity.",
    stats = [
        { icon: "MapPin", value: "195", label: "Countries" },
        { icon: "Clock", value: "24/7", label: "Available" },
        { icon: "Languages", value: "40+", label: "Languages" },
    ],
    regionsSectionLabel = "Regional Reach",
    regions = [
        { name: "Americas", users: "120M+", growth: "+45%", progress: 60 },
        { name: "EMEA", users: "85M+", growth: "+62%", progress: 45 },
        { name: "APAC", users: "200M+", growth: "+78%", progress: 85 },
    ],
    successNote = "✓ One tele, global reach. No per-region setup.",
    ctaLabel = "Any Device",
    ctaActionPhrase = "Show me any device",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Message */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <Globe className="w-7 h-7 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-sapphire">{subheadline}</p>
                        </div>
                    </div>
                    <p className="text-lg text-mist/80 mb-6">{description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {stats.map((stat, i) => {
                            const IconComp = getIcon(stat.icon);
                            return (
                                <div key={i} className="text-center p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                                    <IconComp className="w-6 h-6 text-sapphire mx-auto mb-2" />
                                    <span className="text-sapphire font-bold block">{stat.value}</span>
                                    <span className="text-xs text-mist/60">{stat.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Regional Breakdown */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{regionsSectionLabel}</p>
                    {regions.map((region, i) => (
                        <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-lg font-bold text-white">{region.name}</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-sapphire/20 text-sapphire">{region.growth}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-mist/50" />
                                <span className="text-mist/70">{region.users} potential users</span>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-white/[0.08] overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-sapphire to-jade"
                                    style={{ width: `${region.progress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="p-4 rounded-lg bg-sapphire/10 border border-sapphire/20">
                        <p className="text-sapphire text-sm font-medium">{successNote}</p>
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
export default MeetsGlobally;
