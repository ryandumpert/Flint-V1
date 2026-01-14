/**
 * MetricsGrid
 * Display key metrics/stats in a visual grid layout
 */

import React from "react";
import { TrendingUp, Award, Users, Zap, Shield, Clock, CheckCircle, BarChart3 } from "lucide-react";

interface Metric {
    id: string;
    value: string;
    label: string;
    sublabel?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    icon?: string;
    highlight?: boolean;
}

interface MetricsGridProps {
    metrics: Metric[];
    columns?: 2 | 3 | 4;
    animationClass?: string;
    isExiting?: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    trending: TrendingUp,
    award: Award,
    users: Users,
    zap: Zap,
    shield: Shield,
    clock: Clock,
    check: CheckCircle,
    chart: BarChart3,
};

export const MetricsGrid: React.FC<MetricsGridProps> = ({
    metrics = [],
    columns = 3,
    animationClass = "",
    isExiting = false,
}) => {
    const gridCols = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-2 md:grid-cols-4",
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            <div className={`grid ${gridCols[columns]} gap-4`}>
                {metrics.map((metric) => {
                    const IconComponent = iconMap[metric.icon || "chart"] || BarChart3;
                    return (
                        <div
                            key={metric.id}
                            className={`p-6 rounded-xl border transition-all ${metric.highlight
                                    ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-500/20"
                                    : "bg-white border-gray-200 hover:shadow-md"
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <IconComponent className={`w-6 h-6 ${metric.highlight ? "text-white/80" : "text-cyan-500"}`} />
                                {metric.trend && (
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${metric.trend === "up"
                                            ? metric.highlight ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
                                            : metric.trend === "down"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}>
                                        {metric.trendValue || (metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "—")}
                                    </span>
                                )}
                            </div>
                            <p className={`text-3xl font-bold mb-1 ${metric.highlight ? "text-white" : "text-gray-900"}`}>
                                {metric.value}
                            </p>
                            <p className={`text-sm font-medium ${metric.highlight ? "text-white/90" : "text-gray-700"}`}>
                                {metric.label}
                            </p>
                            {metric.sublabel && (
                                <p className={`text-xs mt-1 ${metric.highlight ? "text-white/70" : "text-gray-500"}`}>
                                    {metric.sublabel}
                                </p>
                            )}
                        </div>
                    );
                })}
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

export default MetricsGrid;
