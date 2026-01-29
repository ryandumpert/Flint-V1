/**
 * Paragraph - GENERIC
 * Simple title, text content, and optional call to action
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ParagraphProps {
    icon?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    alignment?: 'left' | 'center' | 'right';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Paragraph: React.FC<ParagraphProps> = ({
    icon,
    title,
    subtitle,
    content,
    alignment = 'left',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const IconComp = getIcon(icon);

    const alignClass = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    }[alignment];

    return (
        <div className="glass-template-container h-full flex flex-col justify-center">
            <div className={`max-w-3xl ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`}>
                <div className={`flex flex-col ${alignClass}`}>
                    {icon && (
                        <div className="w-16 h-16 rounded-2xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center mb-6">
                            <IconComp className="w-8 h-8 text-sapphire" />
                        </div>
                    )}

                    {subtitle && (
                        <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-3">
                            {subtitle}
                        </div>
                    )}

                    {title && (
                        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-6">
                            {title}
                        </h2>
                    )}

                    {content && (
                        <p className="text-lg text-mist/60 leading-relaxed mb-8">
                            {content}
                        </p>
                    )}

                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Paragraph;
