/**
 * DataHandlingNotice — Data privacy and handling disclosure
 *
 * Expandable notice component that explains how Flint handles contract data.
 * Designed to be embedded in upload screens and accessible from the chat panel.
 *
 * Phase 6: Hardening — Data handling notice
 */

import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp, Lock, Eye, Trash2 } from 'lucide-react';

interface DataHandlingNoticeProps {
    /** Compact mode shows just the one-liner with expand control */
    compact?: boolean;
    /** Additional CSS classes */
    className?: string;
}

const DATA_POINTS = [
    {
        icon: <Lock className="w-4 h-4 text-emerald-400" />,
        title: 'Browser-only Processing',
        description: 'Your contract text is processed entirely in your browser. No document data is uploaded to external servers or stored remotely.',
    },
    {
        icon: <Eye className="w-4 h-4 text-blue-400" />,
        title: 'AI Analysis Context',
        description: 'Contract text is sent to the AI model for analysis via an encrypted connection. The AI does not retain or learn from your documents.',
    },
    {
        icon: <Trash2 className="w-4 h-4 text-amber-400" />,
        title: 'Session-scoped Data',
        description: 'All contract data exists only for the duration of your browser session. Closing the tab or refreshing the page clears all contract data from memory.',
    },
    {
        icon: <Shield className="w-4 h-4 text-violet-400" />,
        title: 'No PII Extraction',
        description: 'Flint does not extract, store, or transmit personally identifiable information (PII) such as names, addresses, or financial details outside the analysis context.',
    },
];

export const DataHandlingNotice: React.FC<DataHandlingNoticeProps> = ({
    compact = false,
    className = '',
}) => {
    const [isExpanded, setIsExpanded] = useState(!compact);

    if (!compact) {
        // Full mode — always expanded
        return (
            <div className={`rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5 md:p-6 ${className}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-semibold text-base">How Your Data is Handled</h4>
                        <p className="text-mist/50 text-xs">Your privacy is our priority</p>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    {DATA_POINTS.map((point, i) => (
                        <div
                            key={i}
                            className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                        >
                            <div className="mt-0.5 flex-shrink-0">{point.icon}</div>
                            <div>
                                <p className="text-white/90 text-sm font-medium mb-0.5">{point.title}</p>
                                <p className="text-mist/45 text-xs leading-relaxed">{point.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Compact mode — collapsible
    return (
        <div className={`rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] ${className}`}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left hover:bg-white/[0.02] transition-colors rounded-xl"
            >
                <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-emerald-300/70 flex-1">
                    Your data is processed locally and never stored.
                </span>
                {isExpanded
                    ? <ChevronUp className="w-3.5 h-3.5 text-mist/30 flex-shrink-0" />
                    : <ChevronDown className="w-3.5 h-3.5 text-mist/30 flex-shrink-0" />
                }
            </button>

            {isExpanded && (
                <div className="px-4 pb-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    {DATA_POINTS.map((point, i) => (
                        <div key={i} className="flex gap-2.5 py-1.5">
                            <div className="mt-0.5 flex-shrink-0">{point.icon}</div>
                            <div>
                                <p className="text-white/80 text-xs font-medium">{point.title}</p>
                                <p className="text-mist/40 text-[11px] leading-relaxed">{point.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DataHandlingNotice;
