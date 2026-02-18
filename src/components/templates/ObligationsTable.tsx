/**
 * ObligationsTable — Obligations & Deadlines Display
 * Table showing obligations with owner, deadline/trigger, and contract anchor.
 * 
 * Follows blueprint.md Template: Obligations & Deadlines specification.
 * NO ENGLISH DEFAULTS — All content from JSON.
 */

import React, { useState, useMemo } from 'react';
import {
    ClipboardList, ChevronUp, ChevronDown, Search,
    ExternalLink, Calendar, User, AlertTriangle
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

type Severity = 'low' | 'medium' | 'high' | 'critical';

interface ObligationItem {
    id: string;
    obligation: string;
    owner: string;
    deadline: string;
    severity?: Severity;
    goToClauseActionPhrase?: string;
}

interface ObligationsTableProps {
    headline?: string;
    subheadline?: string;
    searchPlaceholder?: string;
    obligations?: ObligationItem[];
    emptyMessage?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const severityColors: Record<Severity, { text: string; bg: string; dot: string }> = {
    critical: { text: 'text-red-400', bg: 'bg-red-500/10', dot: 'bg-red-500' },
    high: { text: 'text-orange-400', bg: 'bg-orange-500/10', dot: 'bg-orange-500' },
    medium: { text: 'text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-500' },
    low: { text: 'text-blue-400', bg: 'bg-blue-500/10', dot: 'bg-blue-500' },
};

export const ObligationsTable: React.FC<ObligationsTableProps> = ({
    headline = 'Obligations & Deadlines',
    subheadline,
    searchPlaceholder = 'Search obligations...',
    obligations,
    emptyMessage = 'No obligations extracted.',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [sortKey, setSortKey] = useState<'obligation' | 'owner' | 'deadline' | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const handleSort = (key: 'obligation' | 'owner' | 'deadline') => {
        playClick();
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const filteredAndSorted = useMemo(() => {
        let items = obligations || [];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            items = items.filter(item =>
                item.obligation.toLowerCase().includes(q) ||
                item.owner.toLowerCase().includes(q) ||
                item.deadline.toLowerCase().includes(q)
            );
        }

        if (sortKey) {
            items = [...items].sort((a, b) => {
                const aVal = a[sortKey].toLowerCase();
                const bVal = b[sortKey].toLowerCase();
                if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return items;
    }, [obligations, sortKey, sortDir, searchQuery]);

    const SortIndicator = ({ column }: { column: string }) => {
        if (sortKey !== column) return null;
        return sortDir === 'asc'
            ? <ChevronUp className="w-3.5 h-3.5" />
            : <ChevronDown className="w-3.5 h-3.5" />;
    };

    return (
        <div className="glass-medium rounded-2xl p-5 md:p-7 h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">{headline}</h3>
                        {subheadline && <p className="text-mist/50 text-sm">{subheadline}</p>}
                    </div>
                </div>

                {searchPlaceholder && (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mist/40" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.1] rounded-xl text-white text-sm
                                placeholder:text-mist/30 focus:outline-none focus:border-primary/50 transition-colors w-64"
                        />
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="flex-grow overflow-x-auto rounded-xl border border-white/[0.06]">
                {filteredAndSorted.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                                <th
                                    onClick={() => handleSort('obligation')}
                                    className="px-5 py-3 text-left text-xs font-semibold text-mist/60 uppercase tracking-wider cursor-pointer hover:text-white select-none"
                                >
                                    <div className="flex items-center gap-1.5">
                                        Obligation
                                        <SortIndicator column="obligation" />
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort('owner')}
                                    className="px-5 py-3 text-left text-xs font-semibold text-mist/60 uppercase tracking-wider cursor-pointer hover:text-white select-none"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        Owner
                                        <SortIndicator column="owner" />
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort('deadline')}
                                    className="px-5 py-3 text-left text-xs font-semibold text-mist/60 uppercase tracking-wider cursor-pointer hover:text-white select-none"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        Deadline / Trigger
                                        <SortIndicator column="deadline" />
                                    </div>
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold text-mist/60 uppercase tracking-wider w-16">
                                    Ref
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSorted.map((item) => {
                                const sev = item.severity ? severityColors[item.severity] : null;
                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b border-white/[0.04] bg-transparent hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-start gap-2">
                                                {sev && <span className={`w-2 h-2 rounded-full ${sev.dot} mt-1.5 flex-shrink-0`} />}
                                                <span className="text-sm text-white">{item.obligation}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-mist/70">{item.owner}</td>
                                        <td className="px-5 py-3.5 text-sm text-mist/70">{item.deadline}</td>
                                        <td className="px-5 py-3.5 text-center">
                                            {item.goToClauseActionPhrase ? (
                                                <button
                                                    onClick={() => handleAction(item.goToClauseActionPhrase!)}
                                                    className="inline-flex items-center justify-center p-1.5 rounded-lg
                                                        bg-white/5 hover:bg-white/10 transition-colors"
                                                    aria-label="Go to clause"
                                                    title="Go to clause"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5 text-mist/50" />
                                                </button>
                                            ) : (
                                                <span className="text-mist/20">—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-mist/40 gap-2">
                        <AlertTriangle className="w-6 h-6 text-mist/20" />
                        <span>{emptyMessage}</span>
                    </div>
                )}
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="pt-5 flex justify-end">
                    <button
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/[0.1] text-white font-semibold rounded-full
                            hover:bg-white/10 transition-all text-sm"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ObligationsTable;
