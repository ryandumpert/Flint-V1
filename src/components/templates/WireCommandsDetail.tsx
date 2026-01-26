/**
 * WireCommandsDetail - Step 5, Thing 3
 * Full-width layout with detailed command reference
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Zap, ArrowRight, Layout, Brain, MessageSquare, Target, Map, Rocket, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface CommandItem {
    cmd: string;
    desc: string;
    icon?: string;
    example: string;
    category: string;
}

interface WireCommandsDetailProps {
    headline?: string;
    subheadline?: string;
    commands?: CommandItem[];
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

export const WireCommandsDetail: React.FC<WireCommandsDetailProps> = ({
    headline = "Wire Commands",
    subheadline = "Six commands to build anything",
    commands = [
        { cmd: "/add-glass", desc: "Create visual templates", icon: "Layout", example: "a pricing table with 3 tiers", category: "Build" },
        { cmd: "/add-knowledge", desc: "Teach domain facts", icon: "Brain", example: "our product features and benefits", category: "Build" },
        { cmd: "/tele-should", desc: "Define specific behaviors", icon: "MessageSquare", example: "recommend Pro tier for teams", category: "Configure" },
        { cmd: "/set-goal", desc: "Set the singular outcome", icon: "Target", example: "Schedule Hackathon", category: "Configure" },
        { cmd: "/set-journey", desc: "Order the user steps", icon: "Map", example: "7 steps from problem to solution", category: "Configure" },
        { cmd: "/publish", desc: "Go live instantly", icon: "Rocket", example: "sync to production", category: "Deploy" },
    ],
    footerTitle = "Master 6 commands, build unlimited teles",
    footerDesc = "Everything you need to create complex AI experiences in hours, not weeks",
    ctaLabel = "See Analytics",
    ctaActionPhrase = "Show me analytics",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-sapphire" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">{headline}</h3>
                    <p className="text-sapphire">{subheadline}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
                {commands.map((c, i) => {
                    const CmdIcon = getIcon(c.icon);
                    return (
                        <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                                    <CmdIcon className="w-5 h-5 text-sapphire" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <code className="text-lg font-mono text-sapphire font-bold">{c.cmd}</code>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.08] text-mist/60">{c.category}</span>
                                    </div>
                                    <p className="text-sm text-mist/70 mb-2">{c.desc}</p>
                                    <div className="p-2 rounded bg-obsidian/50 border border-mist/10">
                                        <code className="text-xs text-mist/60 font-mono">{c.cmd} {c.example}</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
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
export default WireCommandsDetail;
