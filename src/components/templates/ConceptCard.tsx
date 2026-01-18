/**
 * ConceptCard
 * Single-focus concept explanation with optional image
 * 
 * USE WHEN: Explaining a single concept, definition, "what is X"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card is clickable → notifyTele (via CTA)
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ConceptCardProps {
    title?: string;
    definition?: string;
    details?: string;
    imageUrl?: string;
    imagePrompt?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    actionPhrase?: string; // Alternative prop name
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
    title = 'Concept',
    definition = '',
    details,
    imageUrl,
    imagePrompt,
    ctaLabel = 'Learn more',
    ctaActionPhrase,
    actionPhrase,
}) => {
    const { playClick } = useSound();

    // Debug log to see what props are passed
    console.log('[ConceptCard] Props:', { title, definition, details, ctaActionPhrase, actionPhrase });

    const handleAction = (phrase: string) => {
        playClick();
        notifyTele(phrase);
    };

    // Use actionPhrase as fallback for ctaActionPhrase
    const finalActionPhrase = ctaActionPhrase || actionPhrase;

    const hasImage = imageUrl || imagePrompt;

    return (
        <div className="glass-template-container">
            <div className={`flex ${hasImage ? 'flex-col md:flex-row' : 'flex-col'} gap-6`}>
                {hasImage && (
                    <div className="flex-shrink-0 w-full md:w-1/3">
                        <div className="aspect-square glass-image-container">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || ''}
                                alt={title}
                                className="smart-image w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="text-template-title text-2xl mb-3" style={{ color: '#EDF1F3' }}>{title}</h3>
                    {definition && (
                        <p className="text-template-content text-lg mb-4" style={{ color: 'rgba(237, 241, 243, 0.85)' }}>{definition}</p>
                    )}
                    {details && (
                        <p className="text-template-content mb-4" style={{ color: 'rgba(237, 241, 243, 0.7)' }}>{details}</p>
                    )}
                    {finalActionPhrase && (
                        <button
                            className="btn-cta glass-card-clickable"
                            onClick={() => handleAction(finalActionPhrase)}
                        >
                            {ctaLabel}
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConceptCard;
