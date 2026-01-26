/**
 * HandsOnWiring - Step 7, Thing 1
 * Full-width layout with deliverables and 3-hour timeline
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Hammer, ArrowRight, CheckCircle, Clock, Zap, Target, Code, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface DeliverableItem {
    icon?: string;
    text: string;
}

interface TimelineItem {
    time: string;
    activity: string;
    icon?: string;
}

interface HandsOnWiringProps {
    headline?: string;
    subheadline?: string;
    deliverablesLabel?: string;
    deliverables?: DeliverableItem[];
    timelineLabel?: string;
    timeline?: TimelineItem[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Hammer;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Hammer;
};

export const HandsOnWiring: React.FC<HandsOnWiringProps> = ({
    headline = "Hands-On Wiring Session",
    subheadline = "Build your first tele in 3 hours",
    deliverablesLabel = "What You'll Build",
    deliverables = [
        { icon: "CheckCircle", text: "A working tele with your domain knowledge" },
        { icon: "CheckCircle", text: "Custom templates for your use case" },
        { icon: "CheckCircle", text: "Live deployment ready to demo" },
        { icon: "CheckCircle", text: "Template code you own forever" },
    ],
    timelineLabel = "3-Hour Timeline",
    timeline = [
        { time: "Hour 1", activity: "Setup + knowledge wiring", icon: "Target" },
        { time: "Hour 2", activity: "Template creation + behaviors", icon: "Code" },
        { time: "Hour 3", activity: "Testing + deployment", icon: "Zap" },
    ],
    successNote = "You leave with a live, working tele",
    ctaLabel = "Fast Turnaround",
    ctaActionPhrase = "Show me fast turnaround",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Deliverables */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <Hammer className="w-7 h-7 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-sapphire">{subheadline}</p>
                        </div>
                    </div>
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-4">{deliverablesLabel}</p>
                    <div className="space-y-4">
                        {deliverables.map((item, i) => {
                            const IconComp = getIcon(item.icon);
                            return (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04]">
                                    <IconComp className="w-5 h-5 text-jade flex-shrink-0" />
                                    <span className="text-mist/80">{item.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Timeline */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{timelineLabel}</p>
                    {timeline.map((item, i) => {
                        const ItemIcon = getIcon(item.icon);
                        return (
                            <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-flamingo/20 border border-flamingo/30 flex items-center justify-center flex-shrink-0">
                                    <ItemIcon className="w-6 h-6 text-flamingo" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-mist/50" />
                                        <span className="text-sm text-mist/60">{item.time}</span>
                                    </div>
                                    <p className="text-white font-medium text-lg">{item.activity}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="p-4 rounded-lg bg-jade/10 border border-jade/20">
                        <div className="flex items-center gap-2 text-sm text-jade">
                            <CheckCircle className="w-4 h-4" />
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
export default HandsOnWiring;
