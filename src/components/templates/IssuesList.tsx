/**
 * IssuesList — Left Panel Issues Navigator
 * Filterable, sortable list of contract issues with severity indicators,
 * category grouping, and click-to-focus navigation.
 *
 * Follows blueprint.md Issue Taxonomy and filter requirements.
 * NO ENGLISH DEFAULTS — All content from JSON.
 */

import React, { useState, useMemo } from 'react';
import {
    AlertTriangle, AlertCircle, Info, ShieldAlert,
    Search, Filter, ChevronDown, ChevronUp, X, List,
    ArrowUpDown
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

type Severity = 'low' | 'medium' | 'high' | 'critical';

interface IssueListItem {
    id: string;
    title: string;
    category: string;
    severity: Severity;
    riskType?: string;
    confidence?: number;
    quote?: string;
    actionPhrase?: string;
}

interface IssuesListProps {
    headline?: string;
    subheadline?: string;
    issues?: IssueListItem[];
    activeIssueId?: string;
    onIssueSelect?: (issueId: string) => void;
    emptyMessage?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const severityConfig: Record<Severity, { label: string; color: string; bg: string; border: string; icon: React.FC<any>; weight: number }> = {
    critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: ShieldAlert, weight: 4 },
    high: { label: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: AlertTriangle, weight: 3 },
    medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: AlertCircle, weight: 2 },
    low: { label: 'Low', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Info, weight: 1 },
};

type SortMode = 'severity' | 'category' | 'confidence';
type GroupMode = 'none' | 'severity' | 'category';

export const IssuesList: React.FC<IssuesListProps> = ({
    headline = 'Issues',
    subheadline,
    issues = [],
    activeIssueId,
    onIssueSelect,
    emptyMessage = 'No issues found.',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [searchQuery, setSearchQuery] = useState('');
    const [severityFilter, setSeverityFilter] = useState<Severity | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [sortMode, setSortMode] = useState<SortMode>('severity');
    const [groupMode, setGroupMode] = useState<GroupMode>('none');
    const [filterOpen, setFilterOpen] = useState(false);

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // ─── Derived data ─────────────────────────────────────────────────────

    const categories = useMemo(() => {
        const cats = new Set(issues.map(i => i.category));
        return Array.from(cats).sort();
    }, [issues]);

    const severityCounts = useMemo(() => {
        const counts: Record<string, number> = { critical: 0, high: 0, medium: 0, low: 0 };
        issues.forEach(i => { counts[i.severity] = (counts[i.severity] || 0) + 1; });
        return counts;
    }, [issues]);

    // ─── Filter + Sort ────────────────────────────────────────────────────

    const processed = useMemo(() => {
        let result = [...issues];

        // Text search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(i =>
                i.title.toLowerCase().includes(q) ||
                i.category.toLowerCase().includes(q) ||
                (i.quote && i.quote.toLowerCase().includes(q))
            );
        }

        // Severity filter
        if (severityFilter) {
            result = result.filter(i => i.severity === severityFilter);
        }

        // Category filter
        if (categoryFilter) {
            result = result.filter(i => i.category === categoryFilter);
        }

        // Sort
        result.sort((a, b) => {
            if (sortMode === 'severity') {
                const aW = severityConfig[a.severity]?.weight || 0;
                const bW = severityConfig[b.severity]?.weight || 0;
                return bW - aW; // Critical first
            }
            if (sortMode === 'category') {
                return a.category.localeCompare(b.category);
            }
            if (sortMode === 'confidence') {
                return (b.confidence || 0) - (a.confidence || 0);
            }
            return 0;
        });

        return result;
    }, [issues, searchQuery, severityFilter, categoryFilter, sortMode]);

    // ─── Group ────────────────────────────────────────────────────────────

    const grouped = useMemo(() => {
        if (groupMode === 'none') return { '': processed };

        return processed.reduce<Record<string, IssueListItem[]>>((acc, item) => {
            const key = groupMode === 'severity' ? item.severity : item.category;
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
        }, {});
    }, [processed, groupMode]);

    const groupOrder = groupMode === 'severity'
        ? ['critical', 'high', 'medium', 'low']
        : Object.keys(grouped).sort();

    const activeFilters = (severityFilter ? 1 : 0) + (categoryFilter ? 1 : 0);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-5 h-full flex flex-col">
            {/* ─── Header ─── */}
            <div className="mb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <List className="w-4 h-4 text-primary" />
                        <h3 className="text-lg font-bold text-white">{headline}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-mist/60">
                            {processed.length}/{issues.length}
                        </span>
                    </div>

                    <button
                        onClick={() => { playClick(); setFilterOpen(!filterOpen); }}
                        className={`relative p-2 rounded-lg transition-colors ${filterOpen ? 'bg-primary/10 text-primary' : 'bg-white/5 text-mist/50 hover:text-white'}`}
                    >
                        <Filter className="w-4 h-4" />
                        {activeFilters > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-flamingo text-[9px] font-bold text-white flex items-center justify-center">
                                {activeFilters}
                            </span>
                        )}
                    </button>
                </div>
                {subheadline && <p className="text-xs text-mist/40 mt-1">{subheadline}</p>}
            </div>

            {/* ─── Severity Quick Filters ─── */}
            <div className="flex gap-1.5 mb-3">
                {(['critical', 'high', 'medium', 'low'] as Severity[]).map(sev => {
                    const conf = severityConfig[sev];
                    const count = severityCounts[sev] || 0;
                    const isActive = severityFilter === sev;

                    return (
                        <button
                            key={sev}
                            onClick={() => { playClick(); setSeverityFilter(isActive ? null : sev); }}
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                                border transition-all
                                ${isActive
                                    ? `${conf.bg} ${conf.color} ${conf.border}`
                                    : `bg-white/[0.02] text-mist/40 border-white/[0.06] hover:bg-white/[0.04]`
                                }
                                ${count === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                            disabled={count === 0}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${count > 0 ? conf.bg.replace('/10', '') : 'bg-mist/20'}`} />
                            {count}
                        </button>
                    );
                })}
            </div>

            {/* ─── Search ─── */}
            <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-mist/40" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search issues..."
                    className="w-full pl-9 pr-8 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-xs
                        placeholder:text-mist/30 focus:outline-none focus:border-primary/50 transition-colors"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-white/10"
                    >
                        <X className="w-3 h-3 text-mist/40" />
                    </button>
                )}
            </div>

            {/* ─── Filter Panel ─── */}
            {filterOpen && (
                <div className="mb-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                    {/* Category filter */}
                    <div>
                        <p className="text-[10px] font-semibold text-mist/40 uppercase mb-1.5">Category</p>
                        <div className="flex flex-wrap gap-1">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => { playClick(); setCategoryFilter(categoryFilter === cat ? null : cat); }}
                                    className={`px-2 py-0.5 rounded text-[10px] border transition-colors
                                        ${categoryFilter === cat
                                            ? 'bg-primary/10 text-primary border-primary/20'
                                            : 'bg-white/[0.02] text-mist/50 border-white/[0.06] hover:bg-white/[0.04]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort mode */}
                    <div>
                        <p className="text-[10px] font-semibold text-mist/40 uppercase mb-1.5">Sort By</p>
                        <div className="flex gap-1">
                            {(['severity', 'category', 'confidence'] as SortMode[]).map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => { playClick(); setSortMode(mode); }}
                                    className={`px-2 py-0.5 rounded text-[10px] border capitalize transition-colors
                                        ${sortMode === mode
                                            ? 'bg-primary/10 text-primary border-primary/20'
                                            : 'bg-white/[0.02] text-mist/50 border-white/[0.06] hover:bg-white/[0.04]'
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group mode */}
                    <div>
                        <p className="text-[10px] font-semibold text-mist/40 uppercase mb-1.5">Group By</p>
                        <div className="flex gap-1">
                            {(['none', 'severity', 'category'] as GroupMode[]).map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => { playClick(); setGroupMode(mode); }}
                                    className={`px-2 py-0.5 rounded text-[10px] border capitalize transition-colors
                                        ${groupMode === mode
                                            ? 'bg-primary/10 text-primary border-primary/20'
                                            : 'bg-white/[0.02] text-mist/50 border-white/[0.06] hover:bg-white/[0.04]'
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clear filters */}
                    {activeFilters > 0 && (
                        <button
                            onClick={() => { playClick(); setSeverityFilter(null); setCategoryFilter(null); }}
                            className="flex items-center gap-1.5 text-[10px] text-flamingo hover:text-flamingo/80 transition-colors"
                        >
                            <X className="w-3 h-3" /> Clear all filters
                        </button>
                    )}
                </div>
            )}

            {/* ─── Issues List ─── */}
            <div className="flex-grow overflow-y-auto space-y-1">
                {processed.length > 0 ? (
                    groupOrder.filter(g => grouped[g]?.length > 0).map(groupKey => (
                        <div key={groupKey || 'all'}>
                            {/* Group header */}
                            {groupMode !== 'none' && groupKey && (
                                <div className="flex items-center gap-2 py-2 px-1 sticky top-0 bg-obsidian/80 backdrop-blur-sm z-10">
                                    {groupMode === 'severity' && (
                                        <span className={`w-2 h-2 rounded-full ${severityConfig[groupKey as Severity]?.bg.replace('/10', '') || 'bg-mist/20'}`} />
                                    )}
                                    <span className="text-[10px] font-bold text-mist/50 uppercase tracking-wider">{groupKey}</span>
                                    <span className="flex-grow h-px bg-white/[0.06]" />
                                    <span className="text-[10px] text-mist/30">{grouped[groupKey].length}</span>
                                </div>
                            )}

                            {(grouped[groupKey] || []).map(issue => {
                                const conf = severityConfig[issue.severity] || severityConfig.medium;
                                const SevIcon = conf.icon;
                                const isActive = activeIssueId === issue.id;

                                return (
                                    <button
                                        key={issue.id}
                                        onClick={() => {
                                            playClick();
                                            if (onIssueSelect) onIssueSelect(issue.id);
                                            if (issue.actionPhrase) handleAction(issue.actionPhrase);
                                        }}
                                        className={`w-full text-left flex items-start gap-2.5 p-3 rounded-xl
                                            border transition-all duration-200
                                            ${isActive
                                                ? `${conf.bg} ${conf.border} ring-1 ${conf.border.replace('border-', 'ring-')}`
                                                : 'border-transparent hover:bg-white/[0.03] hover:border-white/[0.06]'
                                            }`}
                                    >
                                        <SevIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${conf.color}`} />
                                        <div className="min-w-0 flex-grow">
                                            <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-mist/80'}`}>
                                                {issue.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] text-mist/40">{issue.category}</span>
                                                {issue.confidence !== undefined && (
                                                    <>
                                                        <span className="w-0.5 h-0.5 rounded-full bg-mist/20" />
                                                        <span className="text-[10px] text-mist/30">{Math.round(issue.confidence * 100)}%</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex-shrink-0 ${conf.bg} ${conf.color}`}>
                                            {conf.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-mist/40 gap-2">
                        <AlertTriangle className="w-6 h-6 text-mist/20" />
                        <span className="text-xs">{searchQuery || severityFilter || categoryFilter ? 'No matching issues.' : emptyMessage}</span>
                    </div>
                )}
            </div>

            {/* ─── CTA ─── */}
            {ctaLabel && ctaActionPhrase && (
                <div className="pt-3 mt-2 border-t border-white/[0.06]">
                    <button
                        onClick={() => handleAction(ctaActionPhrase)}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold
                            bg-white/5 text-mist/70 border border-white/[0.06]
                            hover:bg-white/10 hover:text-white transition-all"
                    >
                        {ctaLabel}
                    </button>
                </div>
            )}
        </div>
    );
};

export default IssuesList;
