/**
 * UseCaseStory - PURPOSE: Show imagined use case as a story
 * 
 * Features:
 * - Hero with their challenge
 * - How a tele transforms their world
 * - Material outcome they'd see immediately
 * - List of previous use cases below (clickable)
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { Sparkles, User, Zap, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface PreviousCase {
    title: string;
    hero: string;
    actionPhrase: string;
}

interface UseCaseStoryProps {
    // Current use case
    heroName?: string;
    heroRole?: string;
    heroChallenge?: string;
    teleConnection?: string;  // What the tele connects (e.g., "patients to doctors")
    transformation?: string;   // How it changes their world
    materialOutcome?: string;  // Immediate result if started today
    timeToValue?: string;      // e.g., "This week", "Today", "This month"

    // Previous use cases
    previousCases?: PreviousCase[];

    // CTA
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const UseCaseStory: React.FC<UseCaseStoryProps> = ({
    heroName = "Sarah",
    heroRole = "a clinic administrator",
    heroChallenge = "spends 4 hours daily answering the same patient questions",
    teleConnection = "patients to their health information",
    transformation = "Patients get instant answers. Sarah focuses on care, not FAQ. After-hours questions handled automatically.",
    materialOutcome = "This week: 50% fewer phone calls. This month: 20 hours reclaimed.",
    timeToValue = "This week",
    previousCases = [],
    ctaLabel = "Imagine another",
    ctaActionPhrase = "Let me imagine another use case",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container space-y-8">
            {/* Story Header */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-flamingo/20 border border-flamingo/30 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-flamingo" />
                </div>
                <div>
                    <div className="text-sm text-flamingo font-semibold uppercase tracking-wider">Imagined Use Case</div>
                    <div className="text-2xl font-bold text-white">A Tele for {heroRole}</div>
                </div>
            </div>

            {/* The Story */}
            <div className="space-y-6">
                {/* The Hero */}
                <div className="p-6 rounded-xl bg-obsidian/40 border border-mist/10">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-sapphire" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white mb-1">Meet {heroName}</div>
                            <div className="text-mist/70">
                                {heroName} is {heroRole} who {heroChallenge}.
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Connection */}
                <div className="p-6 rounded-xl bg-sapphire/10 border border-sapphire/20">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-5 h-5 text-sapphire" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white mb-1">A tele connects</div>
                            <div className="text-sapphire font-medium text-lg">
                                {teleConnection}
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Transformation */}
                <div className="p-6 rounded-xl bg-obsidian/40 border border-mist/10">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-jade/20 border border-jade/30 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-5 h-5 text-jade" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white mb-1">The Transformation</div>
                            <div className="text-mist/70">
                                {transformation}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Material Outcome */}
                <div className="p-6 rounded-xl bg-flamingo/10 border border-flamingo/20">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-flamingo/20 border border-flamingo/30 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-flamingo" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="text-lg font-bold text-white">If started today</div>
                                <div className="px-2 py-0.5 rounded-full bg-flamingo/20 text-flamingo text-xs font-semibold">
                                    {timeToValue}
                                </div>
                            </div>
                            <div className="text-flamingo font-medium">
                                {materialOutcome}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between">
                <button
                    className="inline-flex items-center gap-2 px-6 py-3 bg-sapphire/20 border border-sapphire/30 text-sapphire font-semibold rounded-full hover:bg-sapphire/30 transition-all"
                    onClick={() => handleAction("Tell me about your situation")}
                >
                    <Sparkles className="w-4 h-4" />
                    Tell me yours
                </button>
                <button
                    className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                    onClick={() => handleAction(ctaActionPhrase)}
                >
                    {ctaLabel}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Previous Use Cases */}
            {previousCases.length > 0 && (
                <div className="pt-6 border-t border-mist/10">
                    <div className="text-sm text-mist/50 uppercase tracking-wider mb-4">Previous Use Cases</div>
                    <div className="space-y-2">
                        {previousCases.map((prevCase, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-xl bg-obsidian/30 border border-mist/10 cursor-pointer hover:border-sapphire/30 hover:bg-obsidian/50 transition-all"
                                onClick={() => handleAction(prevCase.actionPhrase)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-mist/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-mist/50" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{prevCase.title}</div>
                                        <div className="text-sm text-mist/50">{prevCase.hero}</div>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-mist/30" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UseCaseStory;
