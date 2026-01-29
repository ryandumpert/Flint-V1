/**
 * Compare - GENERIC
 * Side-by-side comparison with good/bad variants
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, X, Check, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface CompareColumn {
    icon?: string;
    title: string;
    value?: string;
    items: string[];
    variant: 'bad' | 'good';
}

interface CompareSummary {
    title: string;
    description?: string;
}

interface CompareProps {
    headline?: string;
    subheadline?: string;
    columns?: CompareColumn[];
    summary?: CompareSummary;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Compare: React.FC<CompareProps> = ({
    headline,
    subheadline,
    columns,
    summary,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container h-full flex flex-col">


            {columns && columns.length > 0 && (
                <div className={`grid gap-6 flex-grow ${columns.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                    {columns.map((col, index) => {
                        const ColIcon = getIcon(col.icon);
                        const isBad = col.variant === 'bad';

                        return (
                            <div
                                key={index}
                                className={`relative p-8 rounded-2xl flex flex-col
                                    ${isBad
                                        ? 'bg-white/[0.02] border border-white/[0.05]'
                                        : 'bg-gradient-to-b from-jade/10 to-jade/5 border border-jade/20'
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                                        ${isBad
                                            ? 'bg-white/[0.04] border border-white/[0.08]'
                                            : 'bg-jade/15 border border-jade/25'
                                        }`}>
                                        <ColIcon className={`w-6 h-6 ${isBad ? 'text-mist/40' : 'text-jade'}`} />
                                    </div>
                                    <div>
                                        <span className={`text-sm font-medium uppercase tracking-wider
                                            ${isBad ? 'text-mist/40' : 'text-jade/80'}`}>
                                            {col.title}
                                        </span>
                                        {col.value && (
                                            <div className={`text-3xl md:text-4xl font-bold tracking-tight
                                                ${isBad ? 'text-red-400/80' : 'text-jade'}`}>
                                                {col.value}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 flex-grow">
                                    {col.items.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0
                                                ${isBad
                                                    ? 'bg-red-400/10 border border-red-400/20'
                                                    : 'bg-jade/15 border border-jade/25'
                                                }`}>
                                                {isBad
                                                    ? <X className="w-3 h-3 text-red-400/70" />
                                                    : <Check className="w-3 h-3 text-jade" />
                                                }
                                            </div>
                                            <span className={`text-sm leading-relaxed ${isBad ? 'text-mist/50' : 'text-mist/80'}`}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {summary && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-jade/10 to-jade/5 border border-jade/20
                    flex items-center justify-between gap-6">
                    <div>
                        <p className="text-white font-semibold text-lg">{summary.title}</p>
                        {summary.description && <p className="text-mist/50 text-sm mt-1">{summary.description}</p>}
                    </div>
                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-2 px-6 py-3 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 transition-all flex-shrink-0 shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}

            {!summary && ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
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

export default Compare;
