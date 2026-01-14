/**
 * StatusTracker
 * Visual status tracker for applications/orders
 */

import React from "react";
import { CheckCircle, Clock, AlertCircle, Package, Mail, CreditCard, Truck, PartyPopper } from "lucide-react";

interface StatusStep {
    id: string;
    title: string;
    description?: string;
    timestamp?: string;
    status: "completed" | "current" | "pending" | "error";
    icon?: string;
}

interface StatusTrackerProps {
    steps: StatusStep[];
    title?: string;
    referenceNumber?: string;
    animationClass?: string;
    isExiting?: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    check: CheckCircle,
    clock: Clock,
    alert: AlertCircle,
    package: Package,
    mail: Mail,
    card: CreditCard,
    truck: Truck,
    party: PartyPopper,
};

export const StatusTracker: React.FC<StatusTrackerProps> = ({
    steps = [],
    title = "Application Status",
    referenceNumber,
    animationClass = "",
    isExiting = false,
}) => {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "completed":
                return { bg: "bg-green-500", text: "text-green-600", line: "bg-green-500" };
            case "current":
                return { bg: "bg-cyan-500", text: "text-cyan-600", line: "bg-gray-200" };
            case "error":
                return { bg: "bg-red-500", text: "text-red-600", line: "bg-gray-200" };
            default:
                return { bg: "bg-gray-300", text: "text-gray-400", line: "bg-gray-200" };
        }
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 p-5 bg-gradient-to-r from-cyan-50 to-white rounded-xl border border-cyan-200">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    {referenceNumber && (
                        <p className="text-sm text-gray-500 mt-1">Reference: {referenceNumber}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-600 font-medium">In Progress</span>
                </div>
            </div>

            {/* Status Steps */}
            <div className="relative pl-8">
                {steps.map((step, idx) => {
                    const style = getStatusStyle(step.status);
                    const IconComponent = iconMap[step.icon || "check"] || CheckCircle;
                    const isLast = idx === steps.length - 1;

                    return (
                        <div key={step.id} className="relative pb-8 last:pb-0">
                            {/* Connecting Line */}
                            {!isLast && (
                                <div className={`absolute left-0 top-8 w-0.5 h-full -ml-4 ${step.status === "completed" ? style.line : "bg-gray-200"
                                    }`} />
                            )}

                            {/* Step Indicator */}
                            <div className={`absolute left-0 -ml-6 w-5 h-5 rounded-full ${style.bg} flex items-center justify-center`}>
                                {step.status === "completed" ? (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                ) : step.status === "current" ? (
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                ) : step.status === "error" ? (
                                    <AlertCircle className="w-3 h-3 text-white" />
                                ) : (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </div>

                            {/* Step Content */}
                            <div className={`p-4 rounded-xl border transition-all ${step.status === "current"
                                    ? "border-cyan-500 bg-cyan-50 shadow-md"
                                    : step.status === "error"
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-100 bg-white"
                                }`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <IconComponent className={`w-5 h-5 ${style.text}`} />
                                        <div>
                                            <h3 className={`font-semibold ${style.text}`}>{step.title}</h3>
                                            {step.description && (
                                                <p className="text-sm text-gray-500 mt-0.5">{step.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    {step.timestamp && (
                                        <span className="text-xs text-gray-400">{step.timestamp}</span>
                                    )}
                                </div>
                            </div>
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

export default StatusTracker;
