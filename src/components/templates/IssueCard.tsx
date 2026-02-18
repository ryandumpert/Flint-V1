/**
 * IssueCard — Contract Risk Issue Display
 * Shows a single contract issue with severity badge, quoted text,
 * explanation, suggested edit (redline-style), and action buttons.
 * 
 * Follows blueprint.md Template: Issue Card specification.
 * NO ENGLISH DEFAULTS — All content from JSON.
 */

import React, { useState } from 'react';
import {
    AlertTriangle, AlertCircle, Info, ShieldAlert,
    Copy, MessageSquare, ExternalLink, ChevronDown, ChevronUp,
    Plus, Minus, ArrowRightLeft, Check
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

type Severity = 'low' | 'medium' | 'high' | 'critical';
type EditType = 'add' | 'remove' | 'change';

interface SuggestedEditData {
    type: EditType;
    proposedText?: string;
    replacementText?: string;
    value?: string;        // why this helps
    tradeoffs?: string;
}

interface IssueCardProps {
    title?: string;
    category?: string;
    severity?: Severity;
    riskType?: string;
    confidence?: number;
    quote?: string;
    whyConcern?: string;
    suggestedEdits?: SuggestedEditData[];
    discussionPrompts?: string[];
    goToClauseActionPhrase?: string;
    askAboutActionPhrase?: string;
}

const severityConfig: Record<Severity, { label: string; color: string; bg: string; border: string; icon: React.FC<any> }> = {
    critical: { label: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: ShieldAlert },
    high: { label: 'HIGH', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: AlertTriangle },
    medium: { label: 'MEDIUM', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: AlertCircle },
    low: { label: 'LOW', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Info },
};

const editTypeConfig: Record<EditType, { label: string; icon: React.FC<any>; color: string }> = {
    add: { label: 'Add', icon: Plus, color: 'text-emerald-400' },
    remove: { label: 'Remove', icon: Minus, color: 'text-red-400' },
    change: { label: 'Change', icon: ArrowRightLeft, color: 'text-amber-400' },
};

export const IssueCard: React.FC<IssueCardProps> = ({
    title = 'Untitled Issue',
    category,
    severity = 'medium',
    riskType,
    confidence,
    quote,
    whyConcern,
    suggestedEdits,
    discussionPrompts,
    goToClauseActionPhrase,
    askAboutActionPhrase,
}) => {
    const { playClick } = useSound();
    const [isExpanded, setIsExpanded] = useState(true);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const sev = severityConfig[severity] || severityConfig.medium;
    const SevIcon = sev.icon;

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const handleCopy = async (text: string, field: string) => {
        playClick();
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch {
            // Fallback
            console.warn('[IssueCard] Clipboard copy failed');
        }
    };

    return (
        <div className={`rounded-2xl border ${sev.border} ${sev.bg} overflow-hidden transition-all duration-300`}>
            {/* ─── Header ─── */}
            <button
                onClick={() => { playClick(); setIsExpanded(!isExpanded); }}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl ${sev.bg} border ${sev.border} flex items-center justify-center flex-shrink-0`}>
                        <SevIcon className={`w-4 h-4 ${sev.color}`} />
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-white font-semibold text-base truncate">{title}</h4>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {category && (
                                <span className="text-xs text-mist/50 font-medium">{category}</span>
                            )}
                            {riskType && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-mist/30" />
                                    <span className="text-xs text-mist/40 capitalize">{riskType}</span>
                                </>
                            )}
                            {confidence !== undefined && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-mist/30" />
                                    <span className="text-xs text-mist/40">{Math.round(confidence * 100)}% confidence</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${sev.bg} ${sev.color} border ${sev.border}`}>
                        {sev.label}
                    </span>
                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-mist/40" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-mist/40" />
                    )}
                </div>
            </button>

            {/* ─── Expanded Content ─── */}
            {isExpanded && (
                <div className="px-5 pb-5 space-y-4 border-t border-white/[0.04]">
                    {/* Quote */}
                    {quote && (
                        <div className="mt-4 relative group">
                            <div className="pl-4 border-l-2 border-white/20 py-1">
                                <p className="text-xs font-medium text-mist/40 uppercase tracking-wider mb-1.5">Contract Text</p>
                                <p className="text-sm text-mist/70 italic leading-relaxed font-mono">&ldquo;{quote}&rdquo;</p>
                            </div>
                            <button
                                onClick={() => handleCopy(quote, 'quote')}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                                aria-label="Copy quote"
                                title="Copy quote"
                            >
                                {copiedField === 'quote' ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5 text-mist/50" />
                                )}
                            </button>
                        </div>
                    )}

                    {/* Why Concern */}
                    {whyConcern && (
                        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <p className="text-xs font-medium text-mist/40 uppercase tracking-wider mb-1.5">Why This Matters</p>
                            <p className="text-sm text-mist/70 leading-relaxed">{whyConcern}</p>
                        </div>
                    )}

                    {/* Suggested Edits */}
                    {suggestedEdits && suggestedEdits.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-xs font-medium text-mist/40 uppercase tracking-wider">Suggested Edits</p>
                            {suggestedEdits.map((edit, i) => {
                                const editConf = editTypeConfig[edit.type] || editTypeConfig.change;
                                const EditIcon = editConf.icon;

                                return (
                                    <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                                        {/* Edit Header */}
                                        <div className="flex items-center gap-2 px-3.5 py-2 border-b border-white/[0.04]">
                                            <EditIcon className={`w-3.5 h-3.5 ${editConf.color}`} />
                                            <span className={`text-xs font-bold uppercase tracking-wider ${editConf.color}`}>{editConf.label}</span>
                                        </div>

                                        <div className="p-3.5 space-y-2">
                                            {/* Redline display */}
                                            {edit.type === 'remove' && edit.proposedText && (
                                                <div className="relative group">
                                                    <p className="text-sm text-red-300/70 line-through font-mono leading-relaxed">{edit.proposedText}</p>
                                                    <button
                                                        onClick={() => handleCopy(edit.proposedText!, `edit-${i}`)}
                                                        className="absolute top-0 right-0 p-1 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                                                        aria-label="Copy suggestion"
                                                    >
                                                        {copiedField === `edit-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-mist/50" />}
                                                    </button>
                                                </div>
                                            )}

                                            {edit.type === 'add' && edit.proposedText && (
                                                <div className="relative group">
                                                    <p className="text-sm text-emerald-300/80 font-mono leading-relaxed bg-emerald-500/5 rounded px-2 py-1">{edit.proposedText}</p>
                                                    <button
                                                        onClick={() => handleCopy(edit.proposedText!, `edit-${i}`)}
                                                        className="absolute top-0 right-0 p-1 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                                                        aria-label="Copy suggestion"
                                                    >
                                                        {copiedField === `edit-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-mist/50" />}
                                                    </button>
                                                </div>
                                            )}

                                            {edit.type === 'change' && (
                                                <div className="space-y-2 relative group">
                                                    {edit.proposedText && (
                                                        <p className="text-sm text-red-300/70 line-through font-mono leading-relaxed">{edit.proposedText}</p>
                                                    )}
                                                    {edit.replacementText && (
                                                        <p className="text-sm text-emerald-300/80 font-mono leading-relaxed bg-emerald-500/5 rounded px-2 py-1">{edit.replacementText}</p>
                                                    )}
                                                    <button
                                                        onClick={() => handleCopy(edit.replacementText || edit.proposedText || '', `edit-${i}`)}
                                                        className="absolute top-0 right-0 p-1 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                                                        aria-label="Copy suggestion"
                                                    >
                                                        {copiedField === `edit-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-mist/50" />}
                                                    </button>
                                                </div>
                                            )}

                                            {/* Value explanation */}
                                            {edit.value && (
                                                <p className="text-xs text-mist/50 mt-2">{edit.value}</p>
                                            )}

                                            {/* Tradeoffs */}
                                            {edit.tradeoffs && (
                                                <p className="text-xs text-amber-300/40 mt-1 italic">Tradeoff: {edit.tradeoffs}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        {goToClauseActionPhrase && (
                            <button
                                onClick={() => handleAction(goToClauseActionPhrase)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                    bg-white/5 text-mist/60 border border-white/[0.06]
                                    hover:bg-white/10 hover:text-white transition-all"
                            >
                                <ExternalLink className="w-3 h-3" />
                                Go to clause
                            </button>
                        )}

                        {quote && (
                            <button
                                onClick={() => handleCopy(quote, 'quote-btn')}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                    bg-white/5 text-mist/60 border border-white/[0.06]
                                    hover:bg-white/10 hover:text-white transition-all"
                            >
                                {copiedField === 'quote-btn' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                {copiedField === 'quote-btn' ? 'Copied!' : 'Copy quote'}
                            </button>
                        )}

                        {askAboutActionPhrase && (
                            <button
                                onClick={() => handleAction(askAboutActionPhrase)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                    bg-white/5 text-mist/60 border border-white/[0.06]
                                    hover:bg-white/10 hover:text-white transition-all"
                            >
                                <MessageSquare className="w-3 h-3" />
                                Ask about this
                            </button>
                        )}

                        {/* Discussion Prompts */}
                        {discussionPrompts && discussionPrompts.length > 0 && (
                            <>
                                <span className="w-px h-4 bg-white/10 mx-1" />
                                {discussionPrompts.map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAction(prompt)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium
                                            bg-primary/5 text-primary/70 border border-primary/10
                                            hover:bg-primary/10 hover:text-primary transition-all"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueCard;
