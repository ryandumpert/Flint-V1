/**
 * SplitContent
 * Image on one side, text content on the other.
 * Perfect for feature explanations and detailed breakdowns.
 */

import React from "react";
import { ChevronRight, CheckCircle } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { notifyTele } from "@/utils/acknowledgmentHelpers";
import { SmartImage } from "@/components/ui/SmartImage";

interface BulletPoint {
    text: string;
    actionPhrase?: string;
}

interface SplitContentProps {
    title: string;
    subtitle?: string;
    content: string;
    bulletPoints?: (string | BulletPoint)[];
    imageUrl?: string;
    imagePrompt?: string;
    imagePosition?: "left" | "right";
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const SplitContent: React.FC<SplitContentProps> = ({
    title,
    subtitle,
    content,
    bulletPoints = [],
    imageUrl,
    imagePrompt,
    imagePosition = "left",
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const ImageSection = () => (
        <div className="flex-shrink-0 w-full md:w-2/5">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-mist/10 to-mist/5 border border-mist/10">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : imagePrompt ? (
                    // Live AI generation using SmartImage
                    <SmartImage
                        assetId={imagePrompt}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center p-4">
                        <p className="text-sm text-mist/40 text-center">
                            Visual representation
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

    const ContentSection = () => (
        <div className="flex-1 space-y-4">
            {/* Title & Subtitle */}
            <div>
                <h3 className="text-xl font-semibold text-mist mb-1">{title}</h3>
                {subtitle && (
                    <p className="text-sm text-flamingo">{subtitle}</p>
                )}
            </div>

            {/* Main Content */}
            <p className="text-mist/70 leading-relaxed">{content}</p>

            {/* Bullet Points */}
            {bulletPoints.length > 0 && (
                <ul className="space-y-2">
                    {bulletPoints.map((point, idx) => {
                        const isObject = typeof point === "object";
                        const text = isObject ? point.text : point;
                        const actionPhrase = isObject ? point.actionPhrase : undefined;

                        return (
                            <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-flamingo mt-0.5 flex-shrink-0" />
                                {actionPhrase ? (
                                    <button
                                        onClick={() => handleAction(actionPhrase)}
                                        className="text-sm text-mist/80 hover:text-flamingo transition-colors text-left"
                                    >
                                        {text}
                                    </button>
                                ) : (
                                    <span className="text-sm text-mist/80">{text}</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* CTA Button */}
            {ctaLabel && ctaActionPhrase && (
                <button
                    onClick={() => handleAction(ctaActionPhrase)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-flamingo/20 text-flamingo border border-flamingo/30 hover:bg-flamingo/30 transition-colors"
                >
                    {ctaLabel}
                    <ChevronRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );

    return (
        <div className="backdrop-blur-md bg-mist/10 border border-mist/20 rounded-2xl p-6">
            <div className={`flex flex-col md:flex-row gap-6 ${imagePosition === "right" ? "md:flex-row-reverse" : ""
                }`}>
                <ImageSection />
                <ContentSection />
            </div>
        </div>
    );
};

export default SplitContent;
