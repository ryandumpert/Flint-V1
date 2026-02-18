/**
 * LegalDisclaimer — Persistent legal disclaimer banner
 *
 * Sits at the bottom of the viewport as a subtle, dismissible reminder
 * that Flint's analysis is not legal advice.
 *
 * Phase 6: Hardening — Legal disclaimer
 */

import React, { useState, useEffect } from 'react';
import { Scale, X, Info } from 'lucide-react';

const DISMISSED_KEY = 'flint_legal_dismissed';

export const LegalDisclaimer: React.FC = () => {
    const [isDismissed, setIsDismissed] = useState(true); // Start hidden to avoid flash

    useEffect(() => {
        // Check if user has previously dismissed for this session
        const dismissed = sessionStorage.getItem(DISMISSED_KEY);
        setIsDismissed(!!dismissed);
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem(DISMISSED_KEY, 'true');
        setIsDismissed(true);
    };

    if (isDismissed) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
            style={{ paddingRight: 'var(--chat-glass-width, 0px)' }}
        >
            <div className="pointer-events-auto mx-auto max-w-[1400px] px-4 pb-3">
                <div
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl
                        bg-slate-900/90 backdrop-blur-md
                        border border-amber-500/15
                        shadow-lg shadow-black/30
                        animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                    <Scale className="w-4 h-4 text-amber-400/70 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-amber-200/60 flex-1">
                        <span className="font-semibold text-amber-300/80">Not legal advice.</span>{' '}
                        Flint provides AI-assisted contract analysis for informational purposes only.
                        Always consult a qualified attorney before making legal decisions.
                    </p>
                    <button
                        onClick={handleDismiss}
                        className="p-1 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5
                            transition-all flex-shrink-0"
                        aria-label="Dismiss legal disclaimer"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalDisclaimer;
