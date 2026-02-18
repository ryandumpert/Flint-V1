/**
 * ContractQuickActions — Quick action buttons for contract analysis
 * Appears above the chat input when a contract is loaded.
 * Sends pre-formatted prompts to Flint for common contract review tasks.
 *
 * Blueprint §3: Quick Actions
 */

import React, { useState, useCallback } from 'react';
import {
    FileText, AlertTriangle, Search, Shield,
    Scale, DollarSign, ChevronDown, ChevronUp, Download
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useContract } from '@/contexts/ContractContext';
import { generateIssuesPdf } from '@/utils/generateIssuesPdf';

interface QuickAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    phrase: string;
    color: string;           // tailwind bg class
    borderColor: string;     // tailwind border class
    group: 'primary' | 'secondary';
}

const QUICK_ACTIONS: QuickAction[] = [
    // Primary — always visible
    {
        id: 'summarize',
        label: 'Summarize',
        icon: <FileText className="w-3.5 h-3.5" />,
        phrase: 'summarize the contract',
        color: 'bg-sapphire/20',
        borderColor: 'border-sapphire/30',
        group: 'primary',
    },
    {
        id: 'top-risks',
        label: 'Top Risks',
        icon: <AlertTriangle className="w-3.5 h-3.5" />,
        phrase: 'show me the top risks',
        color: 'bg-red-500/15',
        borderColor: 'border-red-500/25',
        group: 'primary',
    },
    {
        id: 'termination',
        label: 'Termination',
        icon: <Search className="w-3.5 h-3.5" />,
        phrase: 'find the termination clauses and show me the risks',
        color: 'bg-amber-500/15',
        borderColor: 'border-amber-500/25',
        group: 'primary',
    },
    {
        id: 'liability',
        label: 'Liability',
        icon: <Shield className="w-3.5 h-3.5" />,
        phrase: 'find limitation of liability clauses and show me the risks',
        color: 'bg-orange-500/15',
        borderColor: 'border-orange-500/25',
        group: 'primary',
    },
    // Secondary — visible on expand
    {
        id: 'obligations',
        label: 'Obligations',
        icon: <Scale className="w-3.5 h-3.5" />,
        phrase: 'list all obligations and deadlines in the contract',
        color: 'bg-violet-500/15',
        borderColor: 'border-violet-500/25',
        group: 'secondary',
    },
    {
        id: 'money',
        label: 'Financials',
        icon: <DollarSign className="w-3.5 h-3.5" />,
        phrase: 'show me the financial terms',
        color: 'bg-emerald-500/15',
        borderColor: 'border-emerald-500/25',
        group: 'secondary',
    },
    {
        id: 'download-report',
        label: 'Download Report',
        icon: <Download className="w-3.5 h-3.5" />,
        phrase: '__download_pdf__',
        color: 'bg-emerald-500/15',
        borderColor: 'border-emerald-500/25',
        group: 'secondary',
    },
    {
        id: 'safer-language',
        label: 'Draft Safer Language',
        icon: <FileText className="w-3.5 h-3.5" />,
        phrase: 'draft safer alternative language for the most critical issues',
        color: 'bg-cyan-500/15',
        borderColor: 'border-cyan-500/25',
        group: 'secondary',
    },
];

interface ContractQuickActionsProps {
    /** The raw sendMessage function from chat hook */
    onAction?: (phrase: string) => void;
    /** Compact mode for smaller viewports */
    compact?: boolean;
}

export const ContractQuickActions: React.FC<ContractQuickActionsProps> = ({
    onAction,
    compact = false,
}) => {
    const { issues, activeVersion } = useContract();
    const [expanded, setExpanded] = useState(false);
    const [recentAction, setRecentAction] = useState<string | null>(null);

    const handleClick = useCallback((action: QuickAction) => {
        setRecentAction(action.id);

        // Special handling for PDF download
        if (action.phrase === '__download_pdf__') {
            generateIssuesPdf(issues, activeVersion?.metadata);
            setTimeout(() => setRecentAction(null), 1200);
            return;
        }

        // Use the provided callback, or fall back to notifyTele
        if (onAction) {
            onAction(action.phrase);
        } else {
            notifyTele(action.phrase);
        }

        // Clear highlight after animation
        setTimeout(() => setRecentAction(null), 1200);
    }, [onAction, issues, activeVersion]);

    const primary = QUICK_ACTIONS.filter(a => a.group === 'primary');
    const secondary = QUICK_ACTIONS.filter(a => a.group === 'secondary');

    return (
        <div className="px-3 sm:px-4 pb-2">
            {/* Primary actions — always visible */}
            <div className="flex flex-wrap gap-1.5">
                {primary.map(action => (
                    <button
                        key={action.id}
                        onClick={() => handleClick(action)}
                        className={`
                            inline-flex items-center gap-1.5
                            ${compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs sm:text-sm'}
                            rounded-full border backdrop-blur-sm
                            ${action.color} ${action.borderColor}
                            text-mist
                            hover:brightness-125 hover:scale-[1.03]
                            active:scale-[0.97]
                            transition-all duration-200
                            ${recentAction === action.id ? 'ring-2 ring-white/20 scale-[0.97]' : ''}
                        `}
                    >
                        {action.icon}
                        <span className="font-medium">{action.label}</span>
                    </button>
                ))}

                {/* Expand toggle */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full
                        text-xs text-mist/50 hover:text-mist/80
                        bg-white/[0.03] border border-white/[0.06]
                        hover:bg-white/[0.06]
                        transition-all duration-200"
                    aria-label={expanded ? 'Show fewer actions' : 'Show more actions'}
                >
                    {expanded
                        ? <ChevronUp className="w-3 h-3" />
                        : <ChevronDown className="w-3 h-3" />
                    }
                    <span>{expanded ? 'Less' : 'More'}</span>
                </button>
            </div>

            {/* Secondary actions — conditionally visible */}
            {expanded && (
                <div className="flex flex-wrap gap-1.5 mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {secondary.map(action => (
                        <button
                            key={action.id}
                            onClick={() => handleClick(action)}
                            className={`
                                inline-flex items-center gap-1.5
                                ${compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs sm:text-sm'}
                                rounded-full border backdrop-blur-sm
                                ${action.color} ${action.borderColor}
                                text-mist
                                hover:brightness-125 hover:scale-[1.03]
                                active:scale-[0.97]
                                transition-all duration-200
                                ${recentAction === action.id ? 'ring-2 ring-white/20 scale-[0.97]' : ''}
                            `}
                        >
                            {action.icon}
                            <span className="font-medium">{action.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContractQuickActions;
