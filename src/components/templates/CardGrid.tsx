/**
 * CardGrid
 * Grid of clickable content cards
 * 
 * USE WHEN: Multiple topics, categories, navigation options
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each card is clickable → notifyTele
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Card {
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    badge?: string;
    actionPhrase: string;
}

interface CardGridProps {
    cards: Card[];
    columns?: 2 | 3 | 4;
}

export const CardGrid: React.FC<CardGridProps> = ({
    cards = [],
    columns = 3,
}) => {
    const { playClick } = useSound();

    // Defensive: Don't render empty grid
    if (!cards || cards.length === 0) {
        return null;
    }

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getGridClass = () => {
        switch (columns) {
            case 2: return 'template-grid-2';
            case 4: return 'template-grid-4';
            default: return 'template-grid-3';
        }
    };

    return (
        <div className="glass-template-container">
            <div className={getGridClass()}>
                {cards?.map((card, index) => (
                    <div
                        key={index}
                        className="glass-card-standard glass-card-clickable group"
                        onClick={() => handleAction(card.actionPhrase)}
                    >
                        {(card.imageUrl || card.imagePrompt) && (
                            <div className="aspect-video glass-image-container mb-4 overflow-hidden rounded-lg">
                                <SmartImage
                                    assetId={card.imageUrl || card.imagePrompt || ''}
                                    alt={card.title}
                                    className="smart-image w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {/* Number badge with good contrast */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-sapphire/20 border border-sapphire/40 flex items-center justify-center flex-shrink-0">
                                <span className="text-sapphire font-bold text-sm">{index + 1}</span>
                            </div>
                            {card.badge && (
                                <span className="px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-sapphire/20 text-sapphire border border-sapphire/30">
                                    {card.badge}
                                </span>
                            )}
                        </div>
                        <h3 className="text-mist font-bold mb-2 group-hover:text-sapphire transition-colors">
                            {card.title}
                        </h3>
                        {card.description && (
                            <p className="text-mist/70 text-sm mb-3">{card.description}</p>
                        )}
                        <div className="flex items-center text-sapphire text-sm font-medium">
                            <span>Explore</span>
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardGrid;
