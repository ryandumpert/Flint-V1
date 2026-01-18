/**
 * PhaseOverview
 * Displays a single hackathon phase with icon, timing, goal, and activities
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { Mic, MessageSquare, Layout, BookOpen, FileText, Palette, Clock, Target, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface PhaseOverviewProps {
    phaseNumber?: number;
    title?: string;
    timing?: string;
    duration?: string;
    goal?: string;
    description?: string;
    activities?: string[];
    nextPhaseLabel?: string;
    nextPhaseActionPhrase?: string;
}

const PHASE_ICONS: Record<number, React.ElementType> = {
    1: Mic,
    2: MessageSquare,
    3: Layout,
    4: BookOpen,
    5: FileText,
    6: Palette,
};

const PHASE_COLORS: Record<number, string> = {
    1: 'flamingo',
    2: 'sapphire',
    3: 'jade',
    4: 'turmeric',
    5: 'amethyst',
    6: 'flamingo',
};

export const PhaseOverview: React.FC<PhaseOverviewProps> = ({
    phaseNumber = 1,
    title = 'Phase Title',
    timing = '0:00 - 0:30',
    duration = '30 min',
    goal = 'Phase goal',
    description = 'What you will learn in this phase',
    activities = [],
    nextPhaseLabel = 'Next Phase',
    nextPhaseActionPhrase = 'Go home'
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const IconComponent = PHASE_ICONS[phaseNumber] || Mic;
    const color = PHASE_COLORS[phaseNumber] || 'flamingo';

    return (
        <div className="glass-template-container">
            {/* Phase Header */}
            <div className="flex items-center gap-6 mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-${color}/20 border-2 border-${color} flex items-center justify-center`}>
                    <IconComponent className={`w-10 h-10 text-${color}`} />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="template-badge">PHASE {phaseNumber}</span>
                        <span className="flex items-center gap-1 text-mist/60 text-sm">
                            <Clock className="w-4 h-4" />
                            {timing}
                        </span>
                        <span className="template-badge-mist">{duration}</span>
                    </div>
                    <h2 className="text-template-title text-3xl">{title}</h2>
                </div>
            </div>

            {/* Goal */}
            <div className="glass-card-standard p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <Target className={`w-5 h-5 text-${color}`} />
                    <span className="text-template-subtitle">Goal</span>
                </div>
                <p className="text-template-title text-xl">{goal}</p>
            </div>

            {/* Description */}
            <p className="text-template-content text-lg mb-6">{description}</p>

            {/* Activities */}
            {activities.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-template-subtitle mb-4">What You'll Do:</h3>
                    <div className="space-y-3">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className={`w-6 h-6 rounded-full bg-${color}/20 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                    <span className={`text-${color} text-sm font-semibold`}>{index + 1}</span>
                                </div>
                                <p className="text-template-content">{activity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Next Phase CTA */}
            <button
                className="btn-cta w-full py-4 text-lg flex items-center justify-center gap-2"
                onClick={() => handleAction(nextPhaseActionPhrase)}
            >
                {nextPhaseLabel}
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default PhaseOverview;
