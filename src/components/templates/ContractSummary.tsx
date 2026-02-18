/**
 * ContractSummary — Contract Overview Display
 * Shows a one-paragraph overview with bullet list of key contract details.
 * 
 * Follows blueprint.md Template: Contract Summary specification.
 * NO ENGLISH DEFAULTS — All content from JSON.
 */

import React from 'react';
import {
    FileText, Users, Calendar, DollarSign, AlertTriangle,
    XCircle, Shield, ArrowRight
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

type Severity = 'low' | 'medium' | 'high' | 'critical';
type LucideIcon = React.FC<any>;

interface KeyPoint {
    icon?: string;
    label: string;
    value: string;
    severity?: Severity;
    actionPhrase?: string;
}

interface RiskSummaryItem {
    title: string;
    severity: Severity;
    actionPhrase?: string;
}

interface ContractSummaryProps {
    headline?: string;
    subheadline?: string;
    overview?: string;
    parties?: string;
    term?: string;
    paymentBasics?: string;
    terminationRights?: string;
    keyPoints?: KeyPoint[];
    keyRisks?: RiskSummaryItem[];
    totalIssues?: number;
    criticalCount?: number;
    highCount?: number;
    mediumCount?: number;
    lowCount?: number;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const severityColors: Record<Severity, { text: string; bg: string; border: string }> = {
    critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    high: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    medium: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    low: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
};

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return FileText;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || FileText;
};

export const ContractSummary: React.FC<ContractSummaryProps> = ({
    headline = 'Contract Summary',
    subheadline,
    overview,
    parties,
    term,
    paymentBasics,
    terminationRights,
    keyPoints,
    keyRisks,
    totalIssues,
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const hasIssueCounts = totalIssues !== undefined || criticalCount !== undefined;

    return (
        <div className="glass-medium rounded-2xl p-5 md:p-7 h-full flex flex-col">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{headline}</h3>
                        {subheadline && <p className="text-mist/50 text-sm">{subheadline}</p>}
                    </div>
                </div>
            </div>

            {/* Risk Score Bar (if counts provided) */}
            {hasIssueCounts && (
                <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-mist/60">Issues Found</span>
                        <span className="text-lg font-bold text-white">{totalIssues ?? ((criticalCount || 0) + (highCount || 0) + (mediumCount || 0) + (lowCount || 0))}</span>
                    </div>
                    <div className="flex gap-1.5 h-2 rounded-full overflow-hidden bg-white/5">
                        {(criticalCount || 0) > 0 && (
                            <div className="bg-red-500 rounded-full" style={{ flex: criticalCount }} title={`${criticalCount} critical`} />
                        )}
                        {(highCount || 0) > 0 && (
                            <div className="bg-orange-500 rounded-full" style={{ flex: highCount }} title={`${highCount} high`} />
                        )}
                        {(mediumCount || 0) > 0 && (
                            <div className="bg-amber-500 rounded-full" style={{ flex: mediumCount }} title={`${mediumCount} medium`} />
                        )}
                        {(lowCount || 0) > 0 && (
                            <div className="bg-blue-500 rounded-full" style={{ flex: lowCount }} title={`${lowCount} low`} />
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                        {(criticalCount || 0) > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-red-400">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                {criticalCount} Critical
                            </span>
                        )}
                        {(highCount || 0) > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-orange-400">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                {highCount} High
                            </span>
                        )}
                        {(mediumCount || 0) > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-amber-400">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                {mediumCount} Medium
                            </span>
                        )}
                        {(lowCount || 0) > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-blue-400">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                {lowCount} Low
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Overview */}
            {overview && (
                <div className="mb-6">
                    <p className="text-mist/70 leading-relaxed">{overview}</p>
                </div>
            )}

            {/* Key Details Grid */}
            {(parties || term || paymentBasics || terminationRights) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {parties && (
                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-medium text-mist/40 uppercase tracking-wider mb-1">Parties</p>
                                <p className="text-sm text-white">{parties}</p>
                            </div>
                        </div>
                    )}
                    {term && (
                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-medium text-mist/40 uppercase tracking-wider mb-1">Term</p>
                                <p className="text-sm text-white">{term}</p>
                            </div>
                        </div>
                    )}
                    {paymentBasics && (
                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <DollarSign className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-medium text-mist/40 uppercase tracking-wider mb-1">Payment</p>
                                <p className="text-sm text-white">{paymentBasics}</p>
                            </div>
                        </div>
                    )}
                    {terminationRights && (
                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <XCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-medium text-mist/40 uppercase tracking-wider mb-1">Termination</p>
                                <p className="text-sm text-white">{terminationRights}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Key Points (custom) */}
            {keyPoints && keyPoints.length > 0 && (
                <div className="space-y-2 mb-6">
                    <p className="text-xs font-medium text-mist/40 uppercase tracking-wider mb-2">Key Points</p>
                    {keyPoints.map((point, i) => {
                        const PointIcon = getIcon(point.icon);
                        const sevColor = point.severity ? severityColors[point.severity] : null;

                        return (
                            <div
                                key={i}
                                onClick={() => point.actionPhrase && handleAction(point.actionPhrase)}
                                className={`flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]
                                    ${point.actionPhrase ? 'cursor-pointer hover:bg-white/[0.04] transition-colors' : ''}`}
                            >
                                <PointIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${sevColor ? sevColor.text : 'text-primary'}`} />
                                <div className="min-w-0">
                                    <span className="text-xs font-medium text-mist/50">{point.label}</span>
                                    <p className="text-sm text-white">{point.value}</p>
                                </div>
                                {sevColor && (
                                    <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${sevColor.bg} ${sevColor.text} border ${sevColor.border} flex-shrink-0`}>
                                        {point.severity}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Key Risks */}
            {keyRisks && keyRisks.length > 0 && (
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <p className="text-xs font-medium text-mist/40 uppercase tracking-wider">Key Risks</p>
                    </div>
                    <div className="space-y-2">
                        {keyRisks.map((risk, i) => {
                            const sevColor = severityColors[risk.severity] || severityColors.medium;
                            return (
                                <div
                                    key={i}
                                    onClick={() => risk.actionPhrase && handleAction(risk.actionPhrase)}
                                    className={`flex items-center gap-3 p-3 rounded-xl ${sevColor.bg} border ${sevColor.border}
                                        ${risk.actionPhrase ? 'cursor-pointer hover:scale-[1.01] transition-transform' : ''}`}
                                >
                                    <Shield className={`w-4 h-4 ${sevColor.text} flex-shrink-0`} />
                                    <span className="text-sm text-white flex-grow">{risk.title}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${sevColor.text}`}>
                                        {risk.severity}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Spacer */}
            <div className="flex-grow" />

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="pt-4 flex justify-end">
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

export default ContractSummary;
