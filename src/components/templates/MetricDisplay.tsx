/**
 * MetricDisplay - REUSABLE
 * Displays metrics with visual indicators
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Metric {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
}

interface MetricDisplayProps {
    metrics: Metric[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
    metrics = [],
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
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                {metrics.map((metric, index) => (
                    <div key={index} className="p-6 rounded-xl bg-obsidian/40 border border-mist/10">
                        <div className="text-sm text-mist/60 mb-2 uppercase tracking-wider">{metric.label}</div>
                        <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                        {metric.change && (
                            <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-mist/50'}`}>
                                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                                {metric.change}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {ctaLabel && ctaActionPhrase && (
                <div className="text-right">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg" onClick={() => handleAction(ctaActionPhrase)}>
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MetricDisplay;
