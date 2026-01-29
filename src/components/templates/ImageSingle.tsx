/**
 * ImageSingle - GENERIC
 * Full-width image with caption and optional CTA
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ImageSingleProps {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    caption?: string;
    aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ImageSingle: React.FC<ImageSingleProps> = ({
    title,
    subtitle,
    imageUrl,
    imagePrompt,
    caption,
    aspectRatio = '16:9',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const aspectClass = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
        '21:9': 'aspect-[21/9]',
    }[aspectRatio];

    return (
        <div className="glass-template-container h-full flex flex-col">
            {(title || subtitle) && (
                <div className="text-center pb-6">
                    {title && <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-mist/60">{subtitle}</p>}
                </div>
            )}

            <div className="flex-grow rounded-2xl overflow-hidden border border-white/[0.06]">
                <div className={`${aspectClass} w-full`}>
                    <SmartImage
                        assetId={imageUrl || imagePrompt || 'default-image'}
                        alt={title || caption || 'Image'}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {caption && (
                <div className="pt-4 text-center">
                    <p className="text-sm text-mist/50 italic">{caption}</p>
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-center">
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

export default ImageSingle;
