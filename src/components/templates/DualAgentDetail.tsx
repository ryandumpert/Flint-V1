/**
 * DualAgentDetail - Step 4, Thing 1
 * Full-width layout with detailed agent comparison
 */
import React from 'react';
import { Users, ArrowRight, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface AgentInfo {
    title: string;
    description: string;
    icon: string;
    capabilities: string[];
}

interface DualAgentDetailProps {
    headline?: string;
    subheadline?: string;
    buildAgent?: AgentInfo;
    runtimeAgent?: AgentInfo;
    footerTitle?: string;
    footerDesc?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Users;
};

export const DualAgentDetail: React.FC<DualAgentDetailProps> = ({
    headline = "Dual Agent Architecture",
    subheadline = "Build Agent + Runtime Agent",
    buildAgent = {
        title: "Build Agent (Claude)",
        description: "Creates during development",
        icon: "Hammer",
        capabilities: ["Wires knowledge", "Generates templates", "Configures behaviors", "Admin mode"]
    },
    runtimeAgent = {
        title: "Runtime Agent (OpenAI)",
        description: "Serves live users",
        icon: "Zap",
        capabilities: ["Sub-second responses", "Live conversations", "navigateToSection", "24/7"]
    },
    footerTitle = "Never simultaneous",
    footerDesc = "Separation = precision + speed",
    ctaLabel = "DOM Bridge",
    ctaActionPhrase = "Show me DOM bridge",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const BuildIcon = getIcon(buildAgent.icon);
    const RuntimeIcon = getIcon(runtimeAgent.icon);

    return (
        <div className="glass-template-container">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                    <Users className="w-7 h-7 text-sapphire" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">{headline}</h3>
                    <p className="text-sapphire">{subheadline}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Build Agent */}
                <div className="p-6 rounded-xl bg-sapphire/10 border border-sapphire/20">
                    <div className="flex items-center gap-3 mb-4">
                        <BuildIcon className="w-8 h-8 text-sapphire" />
                        <div>
                            <div className="font-bold text-white text-lg">{buildAgent.title}</div>
                            <div className="text-sm text-sapphire">{buildAgent.description}</div>
                        </div>
                    </div>
                    <div className="space-y-3 mb-4">
                        {buildAgent.capabilities.map((cap, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-mist/70">
                                <div className="w-2 h-2 rounded-full bg-sapphire" />
                                <span>{cap}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Runtime Agent */}
                <div className="p-6 rounded-xl bg-flamingo/10 border border-flamingo/20">
                    <div className="flex items-center gap-3 mb-4">
                        <RuntimeIcon className="w-8 h-8 text-flamingo" />
                        <div>
                            <div className="font-bold text-white text-lg">{runtimeAgent.title}</div>
                            <div className="text-sm text-flamingo">{runtimeAgent.description}</div>
                        </div>
                    </div>
                    <div className="space-y-3 mb-4">
                        {runtimeAgent.capabilities.map((cap, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-mist/70">
                                <div className="w-2 h-2 rounded-full bg-flamingo" />
                                <span>{cap}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Summary */}
            <div className="flex items-center justify-between p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div>
                    <p className="text-white font-semibold">{footerTitle}</p>
                    <p className="text-sm text-mist/60">{footerDesc}</p>
                </div>
                {ctaLabel && (
                    <button
                        className="inline-flex items-center gap-2 px-6 py-3 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default DualAgentDetail;
