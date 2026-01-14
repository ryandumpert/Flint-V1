/**
 * SegmentSelector
 * Visual selector for choosing customer segments or target groups
 */

import React, { useState } from "react";
import { Users, MapPin, Briefcase, TrendingUp, Check, Filter } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface Segment {
    id: string;
    name: string;
    description: string;
    icon?: string;
    count?: string;
    percentage?: string;
    selected?: boolean;
}

interface SegmentCategory {
    id: string;
    name: string;
    segments: Segment[];
}

interface SegmentSelectorProps {
    categories: SegmentCategory[];
    multiSelect?: boolean;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    animationClass?: string;
    isExiting?: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    users: Users,
    location: MapPin,
    industry: Briefcase,
    volume: TrendingUp,
};

export const SegmentSelector: React.FC<SegmentSelectorProps> = ({
    categories = [],
    multiSelect = true,
    ctaLabel = "Apply Segments",
    ctaActionPhrase,
    animationClass = "",
    isExiting = false,
}) => {
    const [selectedSegments, setSelectedSegments] = useState<string[]>(
        categories.flatMap(c => c.segments.filter(s => s.selected).map(s => s.id))
    );
    const { playClick } = useSound();

    const toggleSegment = (segmentId: string) => {
        playClick();
        setSelectedSegments(prev => {
            if (prev.includes(segmentId)) {
                return prev.filter(id => id !== segmentId);
            }
            if (multiSelect) {
                return [...prev, segmentId];
            }
            return [segmentId];
        });
    };

    const handleApply = () => {
        playClick();
        if (ctaActionPhrase) {
            sendToTele(ctaActionPhrase);
        }
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                <Filter className="w-6 h-6 text-cyan-600" />
                <div>
                    <p className="font-semibold text-gray-900">Target Audience Segments</p>
                    <p className="text-sm text-gray-600">Select which merchant segments to target</p>
                </div>
                <div className="ml-auto px-3 py-1 bg-cyan-100 rounded-full text-cyan-700 text-sm font-medium">
                    {selectedSegments.length} selected
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-6">
                {categories.map((category) => (
                    <div key={category.id}>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            {category.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {category.segments.map((segment) => {
                                const isSelected = selectedSegments.includes(segment.id);
                                const IconComponent = iconMap[segment.icon || "users"] || Users;
                                return (
                                    <button
                                        key={segment.id}
                                        onClick={() => toggleSegment(segment.id)}
                                        className={`relative flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                                ? "border-cyan-500 bg-cyan-50 shadow-md"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                            }`}
                                    >
                                        {/* Checkbox */}
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-300"
                                            }`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <IconComponent className={`w-4 h-4 ${isSelected ? "text-cyan-600" : "text-gray-400"}`} />
                                                <span className="font-medium text-gray-900 truncate">{segment.name}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-0.5">{segment.description}</p>
                                            {(segment.count || segment.percentage) && (
                                                <div className="flex items-center gap-3 mt-2">
                                                    {segment.count && (
                                                        <span className="text-xs text-gray-400">{segment.count}</span>
                                                    )}
                                                    {segment.percentage && (
                                                        <span className="text-xs text-cyan-600 font-medium">{segment.percentage}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleApply}
                    disabled={selectedSegments.length === 0}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedSegments.length > 0
                            ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    {ctaLabel} ({selectedSegments.length})
                </button>
            </div>

            {/* Fiserv Badge */}
            <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-3 h-3 rounded-full bg-orange-400" />
                    Powered by Fiserv
                </div>
            </div>
        </div>
    );
};

export default SegmentSelector;
