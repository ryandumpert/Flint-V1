/**
 * ContractViewer — Center Panel Contract Text Display
 * Renders extracted contract text in a scrollable container with
 * issue anchor highlights, click-to-inspect, and copy-quote support.
 *
 * Follows blueprint.md Contract Viewer specification.
 * NO ENGLISH DEFAULTS — All content from JSON.
 */

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
    FileText, Copy, Check, AlertTriangle,
    ChevronUp, ChevronDown, Search, X, ZoomIn, ZoomOut,
    MessageSquare
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

type Severity = 'low' | 'medium' | 'high' | 'critical';

interface HighlightAnchor {
    issueId: string;
    title: string;
    severity: Severity;
    start: number;
    end: number;
    quote?: string;
}

interface ContractViewerProps {
    contractText?: string;
    highlights?: HighlightAnchor[];
    headline?: string;
    subheadline?: string;
    focusIssueId?: string;
    showLineNumbers?: boolean;
    askAboutActionPhrase?: string;
    onIssueClick?: (issueId: string) => void;
}

const severityColors: Record<Severity, { bg: string; text: string; ring: string; underline: string }> = {
    critical: { bg: 'bg-red-500/15', text: 'text-red-400', ring: 'ring-red-500/40', underline: 'decoration-red-500/60' },
    high: { bg: 'bg-orange-500/15', text: 'text-orange-400', ring: 'ring-orange-500/40', underline: 'decoration-orange-500/60' },
    medium: { bg: 'bg-amber-500/15', text: 'text-amber-400', ring: 'ring-amber-500/40', underline: 'decoration-amber-500/60' },
    low: { bg: 'bg-blue-500/15', text: 'text-blue-400', ring: 'ring-blue-500/40', underline: 'decoration-blue-500/60' },
};

export const ContractViewer: React.FC<ContractViewerProps> = ({
    contractText = '',
    highlights = [],
    headline,
    subheadline,
    focusIssueId,
    showLineNumbers = false,
    askAboutActionPhrase,
}) => {
    const { playClick } = useSound();
    const containerRef = useRef<HTMLDivElement>(null);
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [hoveredIssue, setHoveredIssue] = useState<string | null>(null);

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const handleCopy = async (text: string) => {
        playClick();
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 2000);
        } catch {
            console.warn('[ContractViewer] Clipboard copy failed');
        }
    };

    // ─── Build annotated text segments ────────────────────────────────────

    const segments = useMemo(() => {
        if (!contractText) return [];

        // Sort highlights by start position
        const sorted = [...highlights]
            .filter(h => h.start >= 0 && h.end <= contractText.length && h.start < h.end)
            .sort((a, b) => a.start - b.start);

        const result: Array<{
            text: string;
            highlight?: HighlightAnchor;
            startOffset: number;
        }> = [];

        let cursor = 0;

        for (const h of sorted) {
            // Skip overlapping highlights
            if (h.start < cursor) continue;

            // Add unhighlighted text before this highlight
            if (h.start > cursor) {
                result.push({
                    text: contractText.slice(cursor, h.start),
                    startOffset: cursor,
                });
            }

            // Add highlighted text
            result.push({
                text: contractText.slice(h.start, h.end),
                highlight: h,
                startOffset: h.start,
            });

            cursor = h.end;
        }

        // Add remaining text
        if (cursor < contractText.length) {
            result.push({
                text: contractText.slice(cursor),
                startOffset: cursor,
            });
        }

        return result;
    }, [contractText, highlights]);

    // ─── Search highlighting ──────────────────────────────────────────────

    const searchMatches = useMemo(() => {
        if (!searchQuery || searchQuery.length < 2) return [];
        const positions: number[] = [];
        const lowerText = contractText.toLowerCase();
        const lowerQuery = searchQuery.toLowerCase();
        let idx = 0;
        while ((idx = lowerText.indexOf(lowerQuery, idx)) !== -1) {
            positions.push(idx);
            idx += lowerQuery.length;
        }
        return positions;
    }, [contractText, searchQuery]);

    // ─── Auto-scroll to focused issue ─────────────────────────────────────

    useEffect(() => {
        if (!focusIssueId || !containerRef.current) return;
        const el = containerRef.current.querySelector(`[data-issue-id="${focusIssueId}"]`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [focusIssueId]);

    // ─── Render text with optional search highlighting ────────────────────

    const renderText = useCallback((text: string, baseOffset: number) => {
        if (!searchQuery || searchQuery.length < 2) return text;

        const lowerText = text.toLowerCase();
        const lowerQuery = searchQuery.toLowerCase();
        const parts: React.ReactNode[] = [];
        let cursor = 0;
        let idx = 0;
        let key = 0;

        while ((idx = lowerText.indexOf(lowerQuery, cursor)) !== -1) {
            if (idx > cursor) {
                parts.push(text.slice(cursor, idx));
            }
            parts.push(
                <mark key={key++} className="bg-amber-400/30 text-white rounded px-0.5">
                    {text.slice(idx, idx + searchQuery.length)}
                </mark>
            );
            cursor = idx + searchQuery.length;
        }

        if (cursor < text.length) {
            parts.push(text.slice(cursor));
        }

        return parts.length > 0 ? <>{parts}</> : text;
    }, [searchQuery]);

    if (!contractText) {
        return (
            <div className="glass-medium rounded-2xl p-5 md:p-7 h-full flex flex-col items-center justify-center">
                <FileText className="w-12 h-12 text-mist/20 mb-4" />
                <p className="text-mist/40 text-center">No contract text loaded.<br />Upload a contract to view it here.</p>
            </div>
        );
    }

    return (
        <div className="glass-medium rounded-2xl p-5 md:p-7 h-full flex flex-col">
            {/* ─── Header ─── */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        {headline && <h3 className="text-lg font-bold text-white">{headline}</h3>}
                        {subheadline && <p className="text-xs text-mist/50">{subheadline}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search Toggle */}
                    <button
                        onClick={() => { playClick(); setSearchVisible(!searchVisible); }}
                        className={`p-2 rounded-lg transition-colors ${searchVisible ? 'bg-primary/10 text-primary' : 'bg-white/5 text-mist/50 hover:text-white'}`}
                        title="Search contract"
                    >
                        <Search className="w-4 h-4" />
                    </button>

                    {/* Zoom */}
                    <button
                        onClick={() => { playClick(); setFontSize(Math.max(10, fontSize - 1)); }}
                        className="p-2 rounded-lg bg-white/5 text-mist/50 hover:text-white transition-colors"
                        title="Zoom out"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-mist/40 w-8 text-center">{fontSize}</span>
                    <button
                        onClick={() => { playClick(); setFontSize(Math.min(24, fontSize + 1)); }}
                        className="p-2 rounded-lg bg-white/5 text-mist/50 hover:text-white transition-colors"
                        title="Zoom in"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>

                    {/* Highlight count */}
                    {highlights.length > 0 && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {highlights.length} issue{highlights.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>
            </div>

            {/* ─── Search Bar ─── */}
            {searchVisible && (
                <div className="flex items-center gap-2 mb-4 p-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <Search className="w-4 h-4 text-mist/40 flex-shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search contract text..."
                        className="flex-grow bg-transparent text-white text-sm placeholder:text-mist/30 focus:outline-none"
                        autoFocus
                    />
                    {searchQuery && (
                        <span className="text-xs text-mist/40 flex-shrink-0">
                            {searchMatches.length} match{searchMatches.length !== 1 ? 'es' : ''}
                        </span>
                    )}
                    <button
                        onClick={() => { setSearchQuery(''); setSearchVisible(false); }}
                        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-3.5 h-3.5 text-mist/40" />
                    </button>
                </div>
            )}

            {/* ─── Contract Text Body ─── */}
            <div
                ref={containerRef}
                className="flex-grow overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 md:p-6"
                style={{ fontSize: `${fontSize}px` }}
            >
                <div className="font-mono leading-relaxed text-mist/70 whitespace-pre-wrap break-words">
                    {segments.map((seg, i) => {
                        if (seg.highlight) {
                            const sev = severityColors[seg.highlight.severity] || severityColors.medium;
                            const isFocused = focusIssueId === seg.highlight.issueId;
                            const isHovered = hoveredIssue === seg.highlight.issueId;

                            return (
                                <span
                                    key={i}
                                    data-issue-id={seg.highlight.issueId}
                                    className={`relative inline cursor-pointer rounded-sm transition-all duration-200
                                        ${sev.bg} underline underline-offset-2 ${sev.underline}
                                        ${isFocused ? `ring-2 ${sev.ring} ${sev.bg}` : ''}
                                        ${isHovered ? 'brightness-125' : ''}`}
                                    onMouseEnter={() => setHoveredIssue(seg.highlight!.issueId)}
                                    onMouseLeave={() => setHoveredIssue(null)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playClick();
                                        if (askAboutActionPhrase) {
                                            handleAction(`${askAboutActionPhrase} "${seg.highlight!.title}"`);
                                        }
                                    }}
                                    title={`${seg.highlight.severity.toUpperCase()}: ${seg.highlight.title}`}
                                >
                                    {renderText(seg.text, seg.startOffset)}

                                    {/* Tooltip on hover */}
                                    {isHovered && (
                                        <span className={`absolute bottom-full left-0 mb-2 px-3 py-2 rounded-lg ${sev.bg} border ${sev.ring.replace('ring-', 'border-')}
                                            text-xs font-sans whitespace-nowrap z-50 shadow-lg pointer-events-none`}
                                        >
                                            <span className={`font-bold ${sev.text}`}>{seg.highlight.severity.toUpperCase()}</span>
                                            <span className="text-mist/60 mx-1.5">·</span>
                                            <span className="text-white">{seg.highlight.title}</span>
                                        </span>
                                    )}
                                </span>
                            );
                        }

                        return (
                            <span key={i}>
                                {renderText(seg.text, seg.startOffset)}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* ─── Footer Actions ─── */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
                <div className="text-xs text-mist/30">
                    {contractText.length.toLocaleString()} chars · {contractText.split(/\s+/).length.toLocaleString()} words
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => handleCopy(contractText)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                            bg-white/5 text-mist/60 border border-white/[0.06]
                            hover:bg-white/10 hover:text-white transition-all"
                    >
                        {copiedText === contractText ? (
                            <><Check className="w-3 h-3 text-emerald-400" /> Copied</>
                        ) : (
                            <><Copy className="w-3 h-3" /> Copy all</>
                        )}
                    </button>

                    {askAboutActionPhrase && (
                        <button
                            onClick={() => handleAction(askAboutActionPhrase)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                bg-primary/5 text-primary/70 border border-primary/10
                                hover:bg-primary/10 hover:text-primary transition-all"
                        >
                            <MessageSquare className="w-3 h-3" /> Ask about this contract
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContractViewer;
