/**
 * Quote - GENERIC
 * Large quote/testimonial display
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface QuoteProps {
    quote: string;
    author?: string;
    role?: string;
    variant?: 'default' | 'accent' | 'subtle';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const Quote: React.FC<QuoteProps> = ({
    quote,
    author,
    role,
    variant = 'default',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const colors = {
        default: { accent: 'text-sapphire', bg: 'from-sapphire/5 to-transparent', border: 'border-sapphire/15' },
        accent: { accent: 'text-flamingo', bg: 'from-flamingo/5 to-transparent', border: 'border-flamingo/15' },
        subtle: { accent: 'text-mist/40', bg: 'from-white/[0.02] to-transparent', border: 'border-white/[0.05]' },
    };
    const theme = colors[variant];

    return (
        <div className="glass-template-container h-full flex flex-col items-center justify-center py-12">

            <div className={`relative max-w-3xl w-full px-8 md:px-16 py-12 rounded-3xl 
                bg-gradient-to-b ${theme.bg} border ${theme.border}`}>

                <div className={`absolute -top-4 left-8 text-6xl ${theme.accent} opacity-20 font-serif`}>"</div>
                <div className={`absolute -bottom-8 right-8 text-6xl ${theme.accent} opacity-20 font-serif`}>"</div>

                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-white 
                    text-center leading-relaxed tracking-tight">
                    {quote}
                </blockquote>

                {(author || role) && (
                    <div className="text-center mt-10 pt-8 border-t border-white/[0.06]">
                        {author && <p className="text-lg font-semibold text-white">{author}</p>}
                        {role && <p className={`text-sm ${theme.accent} mt-1 font-medium`}>{role}</p>}
                    </div>
                )}
            </div>

            {ctaLabel && ctaActionPhrase && (
                <div className="mt-12">
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

export default Quote;
