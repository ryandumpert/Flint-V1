/**
 * ImageCarousel
 * A beautiful image carousel supporting both pre-generated and AI-generated images
 * Uses SmartImage for hybrid image handling (local or AI-generated)
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ImageSlide {
    /** Either a path to pre-generated asset OR a prompt for AI generation */
    imageId: string;
    /** Optional caption displayed below the image */
    caption?: string;
    /** Action phrase for volumetric navigation when clicked */
    actionPhrase?: string;
}

interface ImageCarouselProps {
    /** Optional title for the carousel section */
    title?: string;
    /** Optional subtitle for additional context */
    subtitle?: string;
    /** Array of image slides */
    slides?: ImageSlide[];
    /** Whether to auto-play the carousel */
    autoPlay?: boolean;
    /** Speed of auto-scroll (pixels per frame) */
    scrollSpeed?: number;
    /** Show navigation arrows */
    showArrows?: boolean;
    /** Show dot indicators */
    showDots?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
    title,
    subtitle,
    slides = [],
    autoPlay = true,
    scrollSpeed = 0.8,
    showArrows = true,
    showDots = true,
}) => {
    const { playClick } = useSound();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Initialize Embla with optional auto-scroll plugin
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            dragFree: true,
        },
        autoPlay
            ? [
                AutoScroll({
                    speed: scrollSpeed,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                    playOnInit: true,
                }),
            ]
            : []
    );

    // Track selected index
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

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return;
        playClick();
        emblaApi.scrollPrev();
    }, [emblaApi, playClick]);

    const scrollNext = useCallback(() => {
        if (!emblaApi) return;
        playClick();
        emblaApi.scrollNext();
    }, [emblaApi, playClick]);

    const scrollTo = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            playClick();
            emblaApi.scrollTo(index);
        },
        [emblaApi, playClick]
    );

    // Handle image click for volumetric navigation
    const handleSlideClick = (actionPhrase?: string) => {
        if (!actionPhrase) return;
        playClick();
        notifyTele(actionPhrase);
    };

    // Defensive: Don't render if no slides (after hooks)
    if (!slides || slides.length === 0) {
        return (
            <div className="glass-template-container text-center py-12">
                <p className="text-template-content">No images to display</p>
            </div>
        );
    }

    return (
        <div className="glass-template-container relative">
            {/* Header */}
            {(title || subtitle) && (
                <div className="text-center mb-8">
                    {title && (
                        <h2 className="text-template-title text-2xl md:text-3xl mb-2">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-template-subtitle">{subtitle}</p>
                    )}
                </div>
            )}

            {/* Carousel Container */}
            <div className="relative">
                {/* Navigation Arrows */}
                {showArrows && slides.length > 1 && (
                    <>
                        <button
                            onClick={scrollPrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                                bg-onyx/80 hover:bg-onyx border border-mist/20 hover:border-flamingo/50
                                rounded-full p-3 transition-all duration-300
                                backdrop-blur-sm shadow-lg hover:shadow-flamingo/20"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6 text-mist" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                                bg-onyx/80 hover:bg-onyx border border-mist/20 hover:border-flamingo/50
                                rounded-full p-3 transition-all duration-300
                                backdrop-blur-sm shadow-lg hover:shadow-flamingo/20"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6 text-mist" />
                        </button>
                    </>
                )}

                {/* Embla Viewport */}
                <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                    {/* Embla Container */}
                    <div className="flex gap-4">
                        {slides.map((slide, idx) => (
                            <div
                                key={idx}
                                className={`flex-shrink-0 w-[85%] md:w-[600px] lg:w-[700px]
                                    relative overflow-hidden rounded-2xl
                                    border border-mist/10 hover:border-flamingo/30
                                    transition-all duration-500 ease-out
                                    ${slide.actionPhrase ? 'cursor-pointer hover:scale-[1.02]' : ''}
                                    ${idx === selectedIndex ? 'opacity-100' : 'opacity-60'}`}
                                onClick={() => handleSlideClick(slide.actionPhrase)}
                            >
                                {/* Image - uses SmartImage for hybrid handling */}
                                <div className="aspect-[16/10] w-full">
                                    <SmartImage
                                        assetId={slide.imageId}
                                        alt={slide.caption || `Slide ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Caption Overlay */}
                                {slide.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 
                                        bg-gradient-to-t from-onyx via-onyx/80 to-transparent
                                        px-6 py-4 pt-12">
                                        <p className="text-mist text-lg md:text-xl font-medium">
                                            {slide.caption}
                                        </p>
                                    </div>
                                )}

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-flamingo/5 opacity-0 hover:opacity-100 
                                    transition-opacity duration-300 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dot Indicators */}
            {showDots && slides.length > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`
                                h-3 rounded-full transition-all duration-300
                                ${index === selectedIndex
                                    ? 'bg-flamingo w-8 shadow-lg shadow-flamingo/30'
                                    : 'bg-mist/30 hover:bg-mist/50 w-3'
                                }
                            `}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Image Count Badge */}
            <div className="absolute top-4 right-4 template-badge">
                {selectedIndex + 1} / {slides.length}
            </div>
        </div>
    );
};

export default ImageCarousel;
