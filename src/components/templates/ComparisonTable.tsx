/**
 * ComparisonTable
 * Side-by-side feature comparison between options
 */

import React from "react";
import { Check, X, Minus } from "lucide-react";

interface ComparisonFeature {
    name: string;
    category?: string;
    values: (boolean | string)[];
}

interface ComparisonOption {
    id: string;
    name: string;
    description?: string;
    highlighted?: boolean;
}

interface ComparisonTableProps {
    options: ComparisonOption[];
    features: ComparisonFeature[];
    animationClass?: string;
    isExiting?: boolean;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
    options = [],
    features = [],
    animationClass = "",
    isExiting = false,
}) => {
    const renderValue = (value: boolean | string) => {
        if (typeof value === "boolean") {
            return value ? (
                <Check className="w-5 h-5 text-green-500 mx-auto" />
            ) : (
                <X className="w-5 h-5 text-gray-300 mx-auto" />
            );
        }
        return <span className="text-gray-700">{value}</span>;
    };

    // Group features by category
    const groupedFeatures: { category: string; items: ComparisonFeature[] }[] = [];
    let currentCategory = "";

    features.forEach(feature => {
        const cat = feature.category || "Features";
        if (cat !== currentCategory) {
            groupedFeatures.push({ category: cat, items: [] });
            currentCategory = cat;
        }
        groupedFeatures[groupedFeatures.length - 1].items.push(feature);
    });

    return (
        <div className={`w-full overflow-x-auto ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            <table className="w-full border-collapse">
                {/* Header */}
                <thead>
                    <tr>
                        <th className="text-left p-4 bg-gray-50 border-b border-gray-200 w-1/3">
                            <span className="text-sm font-medium text-gray-500">Features</span>
                        </th>
                        {options.map((option) => (
                            <th
                                key={option.id}
                                className={`text-center p-4 border-b border-gray-200 ${option.highlighted ? "bg-cyan-50" : "bg-gray-50"
                                    }`}
                            >
                                <div className={`font-bold ${option.highlighted ? "text-cyan-600" : "text-gray-900"}`}>
                                    {option.name}
                                </div>
                                {option.description && (
                                    <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {groupedFeatures.map((group, gIdx) => (
                        <React.Fragment key={group.category}>
                            {/* Category Row */}
                            <tr className="bg-gray-100">
                                <td colSpan={options.length + 1} className="p-3 text-sm font-semibold text-gray-700">
                                    {group.category}
                                </td>
                            </tr>

                            {/* Feature Rows */}
                            {group.items.map((feature, fIdx) => (
                                <tr key={fIdx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-700">{feature.name}</td>
                                    {feature.values.map((value, vIdx) => (
                                        <td
                                            key={vIdx}
                                            className={`p-4 text-center ${options[vIdx]?.highlighted ? "bg-cyan-50/50" : ""}`}
                                        >
                                            {renderValue(value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

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

export default ComparisonTable;
