/**
 * ActionBanner - REUSABLE
 * Call-to-action banner with headline and button
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ActionBannerProps {
    headline: string;
    subheadline?: string;
    ctaLabel: string;
    ctaActionPhrase: string;
}

export const ActionBanner: React.FC<ActionBannerProps> = ({
    headline,
    subheadline,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(ctaActionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div className="p-8 rounded-xl bg-gradient-to-r from-sapphire/20 to-flamingo/20 border border-mist/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{headline}</h3>
                        {subheadline && <p className="text-mist/70 text-lg">{subheadline}</p>}
                    </div>
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg whitespace-nowrap" onClick={handleAction}>
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionBanner;
