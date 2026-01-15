/**
 * RolePlayScore
 * Displays role-play training feedback with scores, breakdown, and suggestions
 * 
 * USE WHEN: Role-play training mode, scoring responses, providing feedback
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { Target, TrendingUp, TrendingDown, Lightbulb, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ScoreCriterion {
    criterion: string;
    score: number;
    feedback: string;
}

interface RolePlayScoreProps {
    persona: string;
    question: string;
    overallScore: number;
    criteria?: ScoreCriterion[];
    whatWorked?: string[];
    toImprove?: string[];
    betterPhrase?: string;
    nextQuestion?: string;
    isFinalAssessment?: boolean;
    strongestArea?: string;
    biggestOpportunity?: string;
    actionItems?: string[];
    actionPhrase: string;
}

export const RolePlayScore: React.FC<RolePlayScoreProps> = ({
    persona,
    question,
    overallScore,
    criteria = [],
    whatWorked = [],
    toImprove = [],
    betterPhrase,
    nextQuestion,
    isFinalAssessment = false,
    strongestArea,
    biggestOpportunity,
    actionItems = [],
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (phrase: string) => {
        playClick();
        notifyTele(phrase);
    };

    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-jade';
        if (score >= 6) return 'text-turmeric';
        return 'text-flamingo';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 9) return 'Excellent';
        if (score >= 7) return 'Good';
        if (score >= 5) return 'Developing';
        return 'Needs Work';
    };

    return (
        <div className="glass-template-container space-y-6">
            {/* Header with Persona and Question */}
            <div className="glass-card-minimal p-4">
                <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-flamingo" />
                    <span className="template-badge">{persona}</span>
                </div>
                <p className="text-template-content italic">"{question}"</p>
            </div>

            {/* Overall Score */}
            <div
                className="glass-card-featured glass-card-clickable text-center py-8"
                onClick={() => handleAction(actionPhrase)}
            >
                <div className={`text-6xl font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}/10
                </div>
                <div className="text-template-subtitle mt-2">
                    {isFinalAssessment ? 'Overall Assessment' : getScoreLabel(overallScore)}
                </div>
            </div>

            {/* Criteria Breakdown */}
            {criteria.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-template-title text-lg flex items-center gap-2">
                        <Target className="w-5 h-5 text-flamingo" />
                        Score Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {criteria.map((item, index) => (
                            <div
                                key={index}
                                className="glass-card-minimal glass-card-clickable p-3"
                                onClick={() => handleAction(`Tell me more about ${item.criterion}`)}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-template-content font-medium">{item.criterion}</span>
                                    <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}/10</span>
                                </div>
                                <p className="text-template-content text-sm opacity-70">{item.feedback}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* What Worked */}
            {whatWorked.length > 0 && (
                <div className="glass-card-standard p-4">
                    <h3 className="text-template-title text-lg flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-jade" />
                        What Worked
                    </h3>
                    <ul className="space-y-2">
                        {whatWorked.map((item, index) => (
                            <li key={index} className="text-template-bullet flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-jade flex-shrink-0 mt-1" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* To Improve */}
            {toImprove.length > 0 && (
                <div className="glass-card-standard p-4">
                    <h3 className="text-template-title text-lg flex items-center gap-2 mb-3">
                        <TrendingDown className="w-5 h-5 text-turmeric" />
                        To Improve
                    </h3>
                    <ul className="space-y-2">
                        {toImprove.map((item, index) => (
                            <li key={index} className="text-template-bullet flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-turmeric flex-shrink-0 mt-1" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Better Phrase Suggestion */}
            {betterPhrase && (
                <div
                    className="glass-card-featured glass-card-clickable p-4"
                    onClick={() => handleAction("Practice that phrase with me")}
                >
                    <h3 className="text-template-title text-lg flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-flamingo" />
                        Try This Instead
                    </h3>
                    <p className="text-template-content italic">"{betterPhrase}"</p>
                </div>
            )}

            {/* Final Assessment Sections */}
            {isFinalAssessment && (
                <>
                    {strongestArea && (
                        <div className="glass-card-standard p-4">
                            <h3 className="text-jade font-semibold mb-2">🏆 Strongest Area</h3>
                            <p className="text-template-content">{strongestArea}</p>
                        </div>
                    )}
                    {biggestOpportunity && (
                        <div className="glass-card-standard p-4">
                            <h3 className="text-turmeric font-semibold mb-2">🎯 Biggest Opportunity</h3>
                            <p className="text-template-content">{biggestOpportunity}</p>
                        </div>
                    )}
                    {actionItems.length > 0 && (
                        <div className="glass-card-featured p-4">
                            <h3 className="text-flamingo font-semibold mb-3">📋 Action Items</h3>
                            <ol className="space-y-2">
                                {actionItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="text-template-bullet flex items-start gap-2 cursor-pointer hover:text-mist transition-colors"
                                        onClick={() => handleAction(`Practice ${item}`)}
                                    >
                                        <span className="text-flamingo font-bold">{index + 1}.</span>
                                        {item}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </>
            )}

            {/* Next Question Button */}
            {nextQuestion && (
                <button
                    className="btn-cta w-full"
                    onClick={() => handleAction(nextQuestion)}
                >
                    Continue Practice →
                </button>
            )}
        </div>
    );
};

export default RolePlayScore;
