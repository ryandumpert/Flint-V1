/**
 * ContractBar — Persistent contract title + download button
 * Sits directly below the navigation menu so the user always knows
 * which contract is loaded and can download the issues PDF at any time.
 */

import React, { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import { useContract } from '@/contexts/ContractContext';
import { generateIssuesPdf } from '@/utils/generateIssuesPdf';

export const ContractBar: React.FC = () => {
    const { activeVersion, issues, hasContract, hasIssues } = useContract();
    const [isGenerating, setIsGenerating] = useState(false);

    if (!hasContract) return null;

    const title = activeVersion?.metadata?.title || 'Untitled Contract';

    const handleDownload = () => {
        if (!hasIssues || isGenerating) return;
        setIsGenerating(true);
        // Small timeout to let the button state render before the blocking PDF work
        setTimeout(() => {
            try {
                generateIssuesPdf(issues, activeVersion?.metadata);
            } catch (err) {
                console.error('[ContractBar] PDF generation failed:', err);
            } finally {
                setIsGenerating(false);
            }
        }, 50);
    };

    return (
        <div className="px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div
                    className="inline-flex items-center gap-3 px-4 py-2
            rounded-xl border border-white/[0.08]
            bg-white/[0.04] backdrop-blur-sm
            animate-in fade-in slide-in-from-top-2 duration-300"
                >
                    {/* Contract title */}
                    <FileText className="w-4 h-4 text-sapphire flex-shrink-0" />
                    <span className="text-sm font-semibold text-mist truncate max-w-[260px] md:max-w-[400px]">
                        {title}
                    </span>
                    {hasIssues && (
                        <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold
                bg-flamingo/15 text-flamingo/90 border border-flamingo/20">
                            {issues.length} issue{issues.length !== 1 ? 's' : ''}
                        </span>
                    )}

                    {/* Download PDF button */}
                    {hasIssues && (
                        <button
                            id="download-issues-pdf"
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 ml-1
                rounded-lg text-xs font-semibold
                bg-emerald-500/15 text-emerald-400 border border-emerald-500/25
                hover:bg-emerald-500/25 hover:border-emerald-500/40
                active:scale-[0.97]
                disabled:opacity-50 disabled:cursor-wait
                transition-all duration-200"
                        >
                            {isGenerating ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Download className="w-3.5 h-3.5" />
                            )}
                            <span>{isGenerating ? 'Generating…' : 'Download Report'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContractBar;
