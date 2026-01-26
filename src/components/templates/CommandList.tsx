/**
 * CommandList - REUSABLE
 * Displays a list of commands with descriptions
 * 
 * USE WHEN: Showing wire commands, CLI commands, or any command reference
 * REUSABLE: Works for any command-based content
 */

import React from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Command {
    command: string;
    name: string;
    description: string;
    actionPhrase?: string;
}

interface CommandListProps {
    commands: Command[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const CommandList: React.FC<CommandListProps> = ({
    commands = [],
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* Command List */}
            <div className="space-y-2 mb-8">
                {commands.map((cmd, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-xl bg-obsidian/40 border border-mist/10 
                            ${cmd.actionPhrase ? 'cursor-pointer hover:bg-obsidian/60 hover:border-sapphire/30' : ''} 
                            transition-all`}
                        onClick={() => cmd.actionPhrase && handleAction(cmd.actionPhrase)}
                    >
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                            <Terminal className="w-5 h-5 text-sapphire" />
                        </div>

                        {/* Command */}
                        <div className="flex-shrink-0 w-44">
                            <code className="text-base font-mono font-bold text-white">{cmd.command}</code>
                            <p className="text-xs text-mist/50">{cmd.name}</p>
                        </div>

                        {/* Description */}
                        <div className="flex-1 hidden md:block">
                            <p className="text-sm text-mist/70">{cmd.description}</p>
                        </div>

                        {/* Arrow */}
                        {cmd.actionPhrase && (
                            <ArrowRight className="w-4 h-4 text-sapphire flex-shrink-0" />
                        )}
                    </div>
                ))}
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

export default CommandList;
