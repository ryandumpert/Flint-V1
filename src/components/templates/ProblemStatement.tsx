/**
 * ProblemStatement - PURPOSE-SPECIFIC (Step 1: The Problem)
 * Shows why AI projects fail with dramatic stats and root cause
 * 
 * ⚠️ NO DEFAULTS - ALL PROPS MUST BE PROVIDED BY RUNTIME AGENT
 * 
 * USE WHEN: Explaining the AI adoption problem
 */

import React from 'react';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ProblemStatementProps {
    headline: string;
    statValue: string;
    statLabel: string;
    notTheProblem: string[];
    realProblemLabel: string;
    theProblem: string;
    quote: string;
    ctaLabel: string;
    ctaActionPhrase: string;
}

export const ProblemStatement: React.FC<ProblemStatementProps> = ({
    headline,
    statValue,
    statLabel,
    notTheProblem,
    realProblemLabel,
    theProblem,
    quote,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    // Guard against missing props
    if (!notTheProblem) {
        return (
            <div className="glass-template-container p-8 text-center">
                <p className="text-flamingo">⚠️ Template props missing. Runtime Agent must provide all props.</p>
            </div>
        );
    }

    return (
        <div className="glass-template-container space-y-8">
            {/* Big Stat */}
            <div className="text-center py-8">
                <div className="text-7xl md:text-9xl font-bold text-flamingo mb-4">
                    {statValue}
                </div>
                <div className="text-xl text-mist/80">
                    {statLabel}
                </div>
            </div>

            {/* Not the Problem */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {notTheProblem.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-obsidian/40 border border-mist/10"
                    >
                        <X className="w-5 h-5 text-mist/40" />
                        <span className="text-mist/60 line-through">{item}</span>
                    </div>
                ))}
            </div>

            {/* The Actual Problem */}
            <div className="p-6 rounded-xl bg-flamingo/10 border border-flamingo/30">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-flamingo flex-shrink-0 mt-1" />
                    <div>
                        <div className="text-lg font-bold text-white mb-2">
                            {realProblemLabel}
                        </div>
                        <div className="text-mist/80 text-lg">
                            {theProblem}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quote */}
            <blockquote className="text-center text-xl italic text-mist/70 border-l-4 border-sapphire pl-6 py-4">
                "{quote}"
            </blockquote>

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

export default ProblemStatement;
