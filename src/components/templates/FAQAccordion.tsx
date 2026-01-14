/**
 * FAQAccordion
 * Expandable FAQ list with search
 */

import React, { useState, useMemo } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category?: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    searchable?: boolean;
    expandFirst?: boolean;
    animationClass?: string;
    isExiting?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
    items = [],
    searchable = true,
    expandFirst = true,
    animationClass = "",
    isExiting = false,
}) => {
    const [expandedItems, setExpandedItems] = useState<string[]>(
        expandFirst && items.length > 0 ? [items[0].id] : []
    );
    const [searchQuery, setSearchQuery] = useState("");
    const { playClick } = useSound();

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;
        const query = searchQuery.toLowerCase();
        return items.filter(
            item =>
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query)
        );
    }, [items, searchQuery]);

    const toggleItem = (itemId: string) => {
        playClick();
        setExpandedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Search */}
            {searchable && (
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none transition-all"
                    />
                </div>
            )}

            {/* FAQ Items */}
            <div className="space-y-3">
                {filteredItems.map((item) => {
                    const isExpanded = expandedItems.includes(item.id);
                    return (
                        <div key={item.id} className="rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-all text-left"
                            >
                                <div className="flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" />
                                    <span className="font-medium text-gray-900">{item.question}</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>

                            {isExpanded && (
                                <div className="p-5 pt-0 bg-white">
                                    <div className="pl-8 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No matching questions found.
                </div>
            )}

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

export default FAQAccordion;
