/**
 * MoneyTerms — Financial Terms Display
 * Table showing fees, payment timing, late fees, credits, and taxes.
 * 
 * Follows blueprint.md Template: Money Terms specification.
 * NO ENGLISH DEFAULTS — All content from JSON.
 */

import React from 'react';
import {
    DollarSign, AlertTriangle, ExternalLink, ArrowRight
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

type Severity = 'low' | 'medium' | 'high' | 'critical';

interface MoneyTermItem {
    id: string;
    category: string;     // e.g., "Fees", "Payment Timing", "Late Fees", "Credits", "Taxes"
    description: string;
    amount?: string;       // e.g., "$5,000/mo", "Net 30", "2% per month"
    severity?: Severity;
    note?: string;
    goToClauseActionPhrase?: string;
}

interface MoneyTermsProps {
    headline?: string;
    subheadline?: string;
    items?: MoneyTermItem[];
    totalValue?: string;
    emptyMessage?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const severityColors: Record<Severity, { text: string; bg: string; border: string; dot: string }> = {
    critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500' },
    high: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', dot: 'bg-orange-500' },
    medium: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
    low: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-500' },
};

const categoryIcons: Record<string, string> = {
    fees: '💰',
    'payment timing': '🕐',
    'late fees': '⚠️',
    interest: '📈',
    credits: '💳',
    refunds: '🔄',
    taxes: '🧾',
};

export const MoneyTerms: React.FC<MoneyTermsProps> = ({
    headline = 'Financial Terms',
    subheadline,
    items,
    totalValue,
    emptyMessage = 'No financial terms extracted.',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Group items by category
    const grouped = (items || []).reduce<Record<string, MoneyTermItem[]>>((acc, item) => {
        const cat = item.category || 'Other';
        acc[cat] = acc[cat] || [];
        acc[cat].push(item);
        return acc;
    }, {});

    const categories = Object.keys(grouped);
    const hasItems = categories.length > 0;

    return (
        <div className="glass-medium rounded-2xl p-5 md:p-7 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">{headline}</h3>
                        {subheadline && <p className="text-mist/50 text-sm">{subheadline}</p>}
                    </div>
                </div>

                {totalValue && (
                    <div className="text-right">
                        <p className="text-xs text-mist/40 uppercase tracking-wider">Total Value</p>
                        <p className="text-lg font-bold text-white">{totalValue}</p>
                    </div>
                )}
            </div>

            {/* Items grouped by category */}
            {hasItems ? (
                <div className="flex-grow space-y-4 overflow-y-auto">
                    {categories.map((cat) => (
                        <div key={cat}>
                            {/* Category header */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm">
                                    {categoryIcons[cat.toLowerCase()] || '📄'}
                                </span>
                                <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">{cat}</span>
                                <span className="flex-grow h-px bg-white/[0.06]" />
                            </div>

                            <div className="space-y-2">
                                {grouped[cat].map((item) => {
                                    const sev = item.severity ? severityColors[item.severity] : null;

                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex items-center gap-3 p-3.5 rounded-xl
                                                ${sev ? `${sev.bg} border ${sev.border}` : 'bg-white/[0.02] border border-white/[0.06]'}
                                                ${item.goToClauseActionPhrase ? 'cursor-pointer hover:scale-[1.005] transition-transform' : ''}`}
                                            onClick={() => item.goToClauseActionPhrase && handleAction(item.goToClauseActionPhrase)}
                                        >
                                            {/* Severity indicator */}
                                            {sev && <span className={`w-2 h-2 rounded-full ${sev.dot} flex-shrink-0`} />}

                                            {/* Description */}
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm text-white">{item.description}</p>
                                                {item.note && (
                                                    <p className="text-xs text-mist/40 mt-0.5">{item.note}</p>
                                                )}
                                            </div>

                                            {/* Amount */}
                                            {item.amount && (
                                                <span className={`text-sm font-semibold flex-shrink-0 ${sev ? sev.text : 'text-white'}`}>
                                                    {item.amount}
                                                </span>
                                            )}

                                            {/* Go to clause */}
                                            {item.goToClauseActionPhrase && (
                                                <ExternalLink className="w-3.5 h-3.5 text-mist/30 flex-shrink-0" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center py-12 text-mist/40 gap-2">
                    <AlertTriangle className="w-6 h-6 text-mist/20" />
                    <span>{emptyMessage}</span>
                </div>
            )}

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="pt-5 flex justify-end">
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

export default MoneyTerms;
