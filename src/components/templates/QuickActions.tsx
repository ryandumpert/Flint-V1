/**
 * QuickActions
 * Grid of action buttons/cards for common tasks
 */

import React from "react";
import { Play, Eye, Download, Share, Settings, HelpCircle, MessageCircle, Zap, ArrowRight } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface QuickAction {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    color?: string;
    actionPhrase: string;
}

interface QuickActionsProps {
    actions: QuickAction[];
    title?: string;
    subtitle?: string;
    columns?: 2 | 3 | 4;
    animationClass?: string;
    isExiting?: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    play: Play,
    eye: Eye,
    download: Download,
    share: Share,
    settings: Settings,
    help: HelpCircle,
    chat: MessageCircle,
    zap: Zap,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    cyan: { bg: "bg-cyan-100", text: "text-cyan-600", border: "border-cyan-200" },
    orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
    green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
    blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
};

export const QuickActions: React.FC<QuickActionsProps> = ({
    actions = [],
    title,
    subtitle,
    columns = 3,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();

    const handleActionClick = (action: QuickAction) => {
        playClick();
        sendToTele(action.actionPhrase);
    };

    const gridCols = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-2 md:grid-cols-4",
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Header */}
            {title && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
                </div>
            )}

            {/* Actions Grid */}
            <div className={`grid ${gridCols[columns]} gap-4`}>
                {actions.map((action) => {
                    const IconComponent = iconMap[action.icon || "zap"] || Zap;
                    const colors = colorMap[action.color || "cyan"] || colorMap.cyan;

                    return (
                        <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            className={`group p-5 rounded-xl border-2 ${colors.border} bg-white hover:shadow-lg hover:scale-[1.02] transition-all text-left`}
                        >
                            <div className={`inline-flex p-3 rounded-lg ${colors.bg} mb-3`}>
                                <IconComponent className={`w-6 h-6 ${colors.text}`} />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                            {action.description && (
                                <p className="text-sm text-gray-500">{action.description}</p>
                            )}
                            <div className="flex items-center gap-1 mt-3 text-sm font-medium text-cyan-600 group-hover:gap-2 transition-all">
                                <span>Go</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </button>
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

export default QuickActions;
