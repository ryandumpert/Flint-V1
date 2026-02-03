import React from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

export interface MediaTextProps {
    layout?: "imageLeft" | "imageRight" | "twoColumn";
    title?: string;
    subtitle?: string;
    paragraph?: string;
    imagePrompt?: string;
    imageUrl?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    // Two column specific
    leftColumn?: {
        title?: string;
        subtitle?: string;
        paragraph: string;
    };
    rightColumn?: {
        title?: string;
        subtitle?: string;
        paragraph: string;
    };
    headline?: string;
}

export const MediaText: React.FC<MediaTextProps> = ({
    layout = "imageLeft",
    title,
    subtitle,
    paragraph,
    imagePrompt,
    imageUrl,
    ctaLabel,
    ctaActionPhrase,
    leftColumn,
    rightColumn,
    headline
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Two Column Layout
    if (layout === "twoColumn" && leftColumn && rightColumn) {
        return (
            <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
                {headline && (
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">{headline}</h2>
                )}
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        {leftColumn.title && (
                            <h3 className="text-2xl font-bold text-white">{leftColumn.title}</h3>
                        )}
                        {leftColumn.subtitle && (
                            <p className="text-lg text-[var(--color-secondary)] font-semibold">{leftColumn.subtitle}</p>
                        )}
                        <p className="text-mist/70 leading-relaxed text-lg">{leftColumn.paragraph}</p>
                    </div>
                    <div className="space-y-4">
                        {rightColumn.title && (
                            <h3 className="text-2xl font-bold text-white">{rightColumn.title}</h3>
                        )}
                        {rightColumn.subtitle && (
                            <p className="text-lg text-[var(--color-secondary)] font-semibold">{rightColumn.subtitle}</p>
                        )}
                        <p className="text-mist/70 leading-relaxed text-lg">{rightColumn.paragraph}</p>
                    </div>
                </div>
                {ctaLabel && ctaActionPhrase && (
                    <div className="mt-10 text-center">
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
    }

    // Image + Text Layouts (imageLeft or imageRight)
    const isImageLeft = layout === "imageLeft";

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Text Content */}
                <div className={`flex flex-col justify-center ${!isImageLeft ? 'md:order-2' : ''}`}>
                    {subtitle && (
                        <div className="text-sm text-[var(--color-secondary)] font-semibold uppercase tracking-wider mb-3">
                            {subtitle}
                        </div>
                    )}
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                            {title}
                        </h2>
                    )}
                    {paragraph && (
                        <p className="text-mist/70 leading-relaxed text-lg mb-6">
                            {paragraph}
                        </p>
                    )}
                    {ctaLabel && ctaActionPhrase && (
                        <div className="pt-4">
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

                {/* Image */}
                <div className={`flex items-center justify-center ${!isImageLeft ? 'md:order-1' : ''}`}>
                    {(imagePrompt || imageUrl) && (
                        <div className="glass-medium rounded-2xl overflow-hidden w-full">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || 'media-text'}
                                alt={title || 'Visual content'}
                                className="w-full aspect-[4/3] object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MediaText;
