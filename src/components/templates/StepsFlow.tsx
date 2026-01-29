/**
 * StepsFlow - GENERIC
 * Flowchart-style steps with branches
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, ArrowDown, LucideIcon, Zap, CircleDot } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface FlowNode {
    id: string;
    icon?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    type: 'start' | 'step' | 'decision' | 'end';
    variant?: 'default' | 'success' | 'warning' | 'accent';
    actionPhrase?: string;
}

interface FlowConnection {
    from: string;
    to: string;
    label?: string;
}

interface StepsFlowProps {
    headline?: string;
    subtitle?: string;
    nodes?: FlowNode[];
    connections?: FlowConnection[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return CircleDot;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || CircleDot;
};

export const StepsFlow: React.FC<StepsFlowProps> = ({
    headline,
    subtitle,
    nodes,
    connections,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const variantStyles = {
        default: 'border-white/[0.1] bg-gradient-to-b from-white/[0.04] to-transparent',
        success: 'border-jade/30 bg-jade/10',
        warning: 'border-flamingo/30 bg-flamingo/10',
        accent: 'border-sapphire/30 bg-sapphire/10',
    };

    const typeStyles = {
        start: 'rounded-full',
        step: 'rounded-xl',
        decision: 'rounded-xl rotate-0', // Diamond shape would need custom CSS
        end: 'rounded-full',
    };

    return (
        <div className="glass-template-container h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="pb-8">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {nodes && nodes.length > 0 && (
                <div className="flex-grow flex flex-col items-center gap-4">
                    {nodes.map((node, i) => {
                        const IconComp = getIcon(node.icon);
                        const variant = node.variant || 'default';
                        const isLast = i === nodes.length - 1;

                        return (
                            <React.Fragment key={node.id}>
                                <div
                                    onClick={() => node.actionPhrase && handleAction(node.actionPhrase)}
                                    className={`relative w-full max-w-md p-5 border transition-all
                                        ${variantStyles[variant]} ${typeStyles[node.type]}
                                        ${node.actionPhrase ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                                >
                                    <div className="flex gap-4">
                                        {/* Icon or Image */}
                                        {(node.imageUrl || node.imagePrompt) ? (
                                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                <SmartImage
                                                    assetId={node.imageUrl || node.imagePrompt || node.id}
                                                    alt={node.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                                                ${node.type === 'start' ? 'bg-jade' :
                                                    node.type === 'end' ? 'bg-flamingo' :
                                                        'bg-white/[0.05] border border-white/[0.1]'}`}>
                                                <IconComp className={`w-5 h-5 ${node.type === 'start' || node.type === 'end' ? 'text-white' : 'text-sapphire'}`} />
                                            </div>
                                        )}

                                        <div className="flex-grow">
                                            <h3 className="font-bold text-white mb-1">{node.title}</h3>
                                            {node.description && (
                                                <p className="text-sm text-mist/60">{node.description}</p>
                                            )}
                                        </div>

                                        {/* Node type indicator */}
                                        {node.type === 'decision' && (
                                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-sapphire rounded-full" />
                                        )}
                                    </div>
                                </div>

                                {/* Connector arrow */}
                                {!isLast && (
                                    <div className="flex flex-col items-center">
                                        <div className="w-0.5 h-4 bg-gradient-to-b from-sapphire to-transparent" />
                                        <ArrowDown className="w-5 h-5 text-sapphire" />

                                        {/* Connection label */}
                                        {connections && connections[i]?.label && (
                                            <span className="text-xs text-mist/40 mt-1">{connections[i].label}</span>
                                        )}
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-center">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
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

export default StepsFlow;
