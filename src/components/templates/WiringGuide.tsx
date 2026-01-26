/**
 * WiringGuide - PURPOSE-SPECIFIC (Step 5: Wiring)
 * Shows voice wiring, vibe wiring, and wire commands
 * 
 * ⚠️ NO DEFAULTS - ALL PROPS MUST BE PROVIDED BY RUNTIME AGENT
 * 
 * USE WHEN: Explaining how to wire a tele
 */

import React from 'react';
import { Mic, Zap, ArrowRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface WiringMode {
    icon: string;
    title: string;
    description: string;
    color: string;
    examples: string[];
}

interface WireCommand {
    cmd: string;
    desc: string;
}

interface WiringGuideProps {
    wiringModes: WiringMode[];
    commandsLabel: string;
    coreCommands: WireCommand[];
    ctaLabel: string;
    ctaActionPhrase: string;
}

const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Mic;
};

export const WiringGuide: React.FC<WiringGuideProps> = ({
    wiringModes,
    commandsLabel,
    coreCommands,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    // Guard against missing props
    if (!wiringModes || !coreCommands) {
        return (
            <div className="glass-template-container p-8 text-center">
                <p className="text-flamingo">⚠️ Template props missing. Runtime Agent must provide all props.</p>
            </div>
        );
    }

    return (
        <div className="glass-template-container space-y-8">
            {/* Wiring Modes */}
            <div className="grid md:grid-cols-2 gap-6">
                {wiringModes.map((mode, index) => {
                    const ModeIcon = getIcon(mode.icon);
                    return (
                        <div
                            key={index}
                            className="p-6 rounded-xl bg-obsidian/40 border border-mist/10"
                        >
                            <div className={`w-12 h-12 rounded-xl ${mode.color === 'sapphire' ? 'bg-sapphire/20 border-sapphire/30' : 'bg-flamingo/20 border-flamingo/30'} border flex items-center justify-center mb-4`}>
                                <ModeIcon className={`w-6 h-6 ${mode.color === 'sapphire' ? 'text-sapphire' : 'text-flamingo'}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
                            <p className="text-mist/70 mb-4">{mode.description}</p>
                            <div className="space-y-2">
                                {mode.examples.map((ex, i) => (
                                    <code key={i} className="block text-xs text-mist/50 bg-obsidian/50 px-3 py-2 rounded">
                                        {ex}
                                    </code>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Wire Commands */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-sapphire" />
                    <span className="text-sm font-semibold text-sapphire uppercase tracking-wider">
                        {commandsLabel}
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {coreCommands.map((cmd, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl bg-obsidian/40 border border-mist/10"
                        >
                            <code className="text-sm font-mono font-bold text-white">{cmd.cmd}</code>
                            <p className="text-xs text-mist/50 mt-1">{cmd.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-right">
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default WiringGuide;
