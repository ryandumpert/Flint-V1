/**
 * VibeWiringDetail - Step 5, Thing 2
 * Full-width layout with command examples and precision benefits
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Terminal, Code, Zap, ArrowRight, CheckCircle, FileCode, Settings, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FeatureItem {
    icon?: string;
    text: string;
}

interface CommandExample {
    cmd: string;
    desc: string;
    example: string;
}

interface VibeWiringDetailProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    features?: FeatureItem[];
    commandsLabel?: string;
    commands?: CommandExample[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Terminal;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Terminal;
};

export const VibeWiringDetail: React.FC<VibeWiringDetailProps> = ({
    headline = "Vibe Wiring",
    subheadline = "Type commands, Claude generates",
    description = "When you need precision control. Use slash commands with detailed descriptions to get exactly what you want. More structure, same speed.",
    features = [
        { icon: "Code", text: "Slash commands for precise control" },
        { icon: "FileCode", text: "Detailed descriptions = better output" },
        { icon: "Settings", text: "Configure specific behaviors" },
        { icon: "CheckCircle", text: "Ideal for complex requirements" },
    ],
    commandsLabel = "Key Commands",
    commands = [
        { cmd: "/add-glass", desc: "Create new visual templates", example: "comparison chart showing features across 3 product tiers" },
        { cmd: "/add-knowledge", desc: "Wire domain expertise", example: "our product pricing and feature matrix" },
        { cmd: "/tele-should", desc: "Define behaviors", example: "always recommend the Pro tier for teams over 5" },
    ],
    successNote = "Each command teaches Claude what to build or how to behave",
    ctaLabel = "Wire Commands",
    ctaActionPhrase = "Show me wire commands",
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
                            <Terminal className="w-7 h-7 text-flamingo" />
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

                {/* Right Column - Command Examples */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{commandsLabel}</p>
                    {commands.map((c, i) => (
                        <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <div className="flex items-center gap-2 mb-2">
                                <code className="text-flamingo font-mono font-bold">{c.cmd}</code>
                                <span className="text-xs text-mist/50">— {c.desc}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-obsidian/60 border border-mist/20">
                                <code className="text-sapphire text-sm font-mono">{c.cmd} {c.example}</code>
                            </div>
                        </div>
                    ))}
                    <div className="p-4 rounded-lg bg-flamingo/10 border border-flamingo/20">
                        <div className="flex items-center gap-2 text-sm text-flamingo">
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
export default VibeWiringDetail;
