/**
 * WelcomeCarousel
 * Continuous auto-scrolling carousel using Embla Carousel
 * 
 * USE WHEN: Welcome page to showcase key questions Tele can answer
 * FEATURES: Continuous smooth scroll, pauses on hover, functional dots
 */

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface QuestionCard {
    question: string;
    subtext?: string;
    imageUrl?: string;
    imagePrompt?: string;
    actionPhrase: string;
}

interface WelcomeCarouselProps {
    cards: QuestionCard[];
    autoPlayInterval?: number;
}

export const WelcomeCarousel: React.FC<WelcomeCarouselProps> = ({
    cards: cardsProp,
    autoPlayInterval = 30000, // Not used directly, speed controls scroll
}) => {
    const { playClick } = useSound();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Default cards - used when cards prop is empty or undefined
    const defaultCards: QuestionCard[] = [
        // Journey Step 1: The Problem
        { question: "Why are 70% of AI projects failing?", subtext: "It's not the technology — the AI is brilliant. It's the absence of a user interface.", imageUrl: "/assets/carousel-slide-01.png", actionPhrase: "Show me why AI projects are failing" },
        // Journey Step 2: The Solution
        { question: "What is a tele?", subtext: "The missing UI for AI. Meets every consumer globally — any device, any channel.", imageUrl: "/assets/carousel-slide-02.png", actionPhrase: "Show me what a tele is" },
        // Journey Step 3: Platform
        { question: "What's the teleglass platform?", subtext: "Model agnostic, cloud agnostic, channel agnostic. SaaS licensed, utilization-based pricing.", imageUrl: "/assets/carousel-slide-03.png", actionPhrase: "Show me the platform" },
        // Journey Step 4: Innovations
        { question: "What makes it innovative?", subtext: "Dual agent architecture, DOM-to-LLM bridge, and generative web.", imageUrl: "/assets/carousel-slide-04.png", actionPhrase: "Show me the innovations" },
        // Journey Step 5: Wiring
        { question: "How do I wire a tele?", subtext: "Voice wiring, vibe wiring, and wire commands. Build by speaking or typing.", imageUrl: "/assets/carousel-slide-05.png", actionPhrase: "Show me how to wire a tele" },
        // Journey Step 6: Analytics
        { question: "What analytics do I get?", subtext: "Agent observability, probabilistic CRM, and conversational telemetry.", imageUrl: "/assets/carousel-slide-06.png", actionPhrase: "Show me analytics" },
        // Journey Step 7: Schedule Hackathon (GOAL)
        { question: "Ready to schedule a hackathon?", subtext: "Wire your first tele with hands-on guidance from Mobeus.", imageUrl: "/assets/hackathon-calendar.png", actionPhrase: "Show me how to schedule a hackathon" },
    ];

    // Use passed cards if valid, otherwise use defaults
    const cards = (cardsProp && cardsProp.length > 0) ? cardsProp : defaultCards;

    // Initialize Embla with auto-scroll plugin (continuous scrolling)
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            dragFree: true,
            containScroll: false, // Important for seamless loop
            slidesToScroll: 1,
        },
        [
            AutoScroll({
                speed: 1, // Pixels per frame - slow and smooth
                stopOnInteraction: true, // Stop when user clicks dots
                stopOnMouseEnter: true,
                playOnInit: true,
            }),
        ]
    );

    // Track selected index (closest to start)
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            playClick();
            emblaApi.scrollTo(index);
        },
        [emblaApi, playClick]
    );

    // Defensive: Don't render if no cards (moved AFTER hooks)
    if (!cards || cards.length === 0) {
        return null;
    }

    const handleCardClick = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="w-full py-4">
            {/* Embla Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                {/* Embla Container - no gap, use slide margins instead for seamless loop */}
                <div className="flex">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[340px] md:w-[380px] mr-6 glass-card-standard overflow-hidden cursor-pointer
                                transform transition-all duration-300 ease-out
                                hover:scale-[1.02] hover:shadow-glow
                                group"
                            onClick={() => handleCardClick(card.actionPhrase)}
                        >
                            {/* Image - Uses SmartImage for live generation fallback */}
                            <div className="aspect-[1024/661] w-full overflow-hidden bg-obsidian/30">
                                <SmartImage
                                    assetId={card.imageUrl || card.imagePrompt || card.question}
                                    alt={card.question}
                                    className="w-full h-full object-cover opacity-60 grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105"
                                />
                            </div>

                            {/* Question Content */}
                            <div className="p-5">
                                <p className="text-lg md:text-xl font-bold text-mist leading-tight mb-2">
                                    "{card.question}"
                                </p>
                                {card.subtext && (
                                    <p className="text-sapphire text-sm font-semibold">
                                        {card.subtext}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-8">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        className={`
                            h-3 rounded-full transition-all duration-300
                            ${index === selectedIndex
                                ? 'bg-sapphire w-8'
                                : 'bg-mist/30 hover:bg-mist/50 w-3'
                            }
                        `}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WelcomeCarousel;
