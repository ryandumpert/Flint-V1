import React, { useState, useCallback } from "react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";
import { ChevronRight, ChevronDown, Check, ArrowRight } from "lucide-react";

interface FlowStep {
    id: string;
    stepNumber: number;
    label: string;
    status: "completed" | "current" | "upcoming";
    actionPhrase?: string;
}

interface OnboardingFlowProps {
    title?: string;
    subtitle?: string;
    steps: FlowStep[];
    currentStep?: number;
    animationClass?: string;
    isExiting?: boolean;
}

/**
 * OnboardingFlow Template
 * 
 * Visual flow diagram showing all 10 onboarding steps with arrows.
 * Steps are laid out in a serpentine pattern matching the whiteboard sketch.
 * Click any step to navigate to it.
 */
export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
    title = "Merchant Onboarding Journey",
    subtitle = "10-step activation flow for new merchants",
    steps = [],
    currentStep = 1,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();

    const handleStepClick = useCallback((step: FlowStep) => {
        playClick();
        if (step.actionPhrase) {
            sendToTele(step.actionPhrase);
        }
    }, [playClick]);

    // Split steps into rows for serpentine layout
    const row1 = steps.slice(0, 4);   // Steps 1-4
    const row2 = steps.slice(4, 7);   // Steps 5-7 (reversed for flow)
    const row3 = steps.slice(7, 10);  // Steps 8-10

    const getStepStyle = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-500/30";
            case "current":
                return "bg-white border-2 border-cyan-500 text-cyan-600 shadow-xl ring-4 ring-cyan-100 animate-pulse-subtle";
            case "upcoming":
            default:
                return "bg-gray-100 border-gray-300 text-gray-500";
        }
    };

    const getConnectorStyle = (fromStatus: string, toStatus: string) => {
        if (fromStatus === "completed") {
            return "bg-gradient-to-r from-cyan-500 to-cyan-400";
        }
        return "bg-gray-300";
    };

    const renderStep = (step: FlowStep, showArrowRight: boolean = true, showArrowDown: boolean = false, isReversed: boolean = false) => (
        <div key={step.id} className="flex items-center gap-3">
            {/* Step Card */}
            <button
                onClick={() => handleStepClick(step)}
                className={`relative flex flex-col items-center justify-center w-28 h-24 rounded-xl border transition-all hover:scale-105 cursor-pointer ${getStepStyle(step.status)}`}
            >
                {/* Completion Check */}
                {step.status === "completed" && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                )}

                {/* Step Number */}
                <span className={`text-2xl font-bold ${step.status === "completed" ? "text-white/90" : ""}`}>
                    {step.stepNumber}
                </span>

                {/* Label */}
                <span className={`text-xs font-medium text-center mt-1 px-2 leading-tight ${step.status === "completed" ? "text-white/80" :
                        step.status === "current" ? "text-cyan-600" : "text-gray-500"
                    }`}>
                    {step.label}
                </span>

                {/* Current indicator pulse */}
                {step.status === "current" && (
                    <div className="absolute inset-0 rounded-xl border-2 border-cyan-400 animate-ping opacity-30" />
                )}
            </button>

            {/* Horizontal Arrow */}
            {showArrowRight && (
                <div className="flex items-center">
                    <div className={`h-1 w-8 rounded-full ${getConnectorStyle(step.status, "upcoming")}`} />
                    <ArrowRight className={`w-4 h-4 -ml-1 ${step.status === "completed" ? "text-cyan-500" : "text-gray-400"}`} />
                </div>
            )}
        </div>
    );

    const renderVerticalConnector = (fromStep: FlowStep, direction: "down" | "up" = "down") => (
        <div className="flex flex-col items-center justify-center h-12 relative">
            <div className={`w-1 h-full rounded-full ${fromStep.status === "completed" ? "bg-gradient-to-b from-cyan-500 to-cyan-400" : "bg-gray-300"}`} />
            <ChevronDown className={`w-5 h-5 absolute -bottom-1 ${fromStep.status === "completed" ? "text-cyan-500" : "text-gray-400"}`} />
        </div>
    );

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-gray-500">{subtitle}</p>
            </div>

            {/* Flow Diagram */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
                {/* Row 1: Steps 1-4 (left to right) */}
                <div className="flex justify-center items-center gap-0 mb-2">
                    {row1.map((step, idx) => renderStep(step, idx < row1.length - 1))}
                </div>

                {/* Connector from Row 1 to Row 2 */}
                {row1.length > 0 && row2.length > 0 && (
                    <div className="flex justify-end pr-14 mb-2">
                        {renderVerticalConnector(row1[row1.length - 1] || steps[0])}
                    </div>
                )}

                {/* Row 2: Steps 5-7 (right to left - reversed) */}
                <div className="flex justify-center items-center gap-0 mb-2 flex-row-reverse">
                    {row2.map((step, idx) => renderStep(step, idx < row2.length - 1))}
                </div>

                {/* Connector from Row 2 to Row 3 */}
                {row2.length > 0 && row3.length > 0 && (
                    <div className="flex justify-start pl-14 mb-2">
                        {renderVerticalConnector(row2[row2.length - 1] || steps[4])}
                    </div>
                )}

                {/* Row 3: Steps 8-10 (left to right) */}
                <div className="flex justify-center items-center gap-0">
                    {row3.map((step, idx) => renderStep(step, idx < row3.length - 1))}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-8 mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-cyan-500 to-cyan-600" />
                        <span className="text-xs text-gray-500">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border-2 border-cyan-500 bg-white" />
                        <span className="text-xs text-gray-500">Current</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gray-200 border border-gray-300" />
                        <span className="text-xs text-gray-500">Upcoming</span>
                    </div>
                </div>
            </div>

            {/* Progress Summary */}
            <div className="flex justify-center mt-6">
                <div className="inline-flex items-center gap-4 bg-gray-100 rounded-full px-6 py-3">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-cyan-600">{steps.filter(s => s.status === "completed").length}</p>
                        <p className="text-xs text-gray-500">Completed</p>
                    </div>
                    <div className="w-px h-8 bg-gray-300" />
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{steps.length}</p>
                        <p className="text-xs text-gray-500">Total Steps</p>
                    </div>
                    <div className="w-px h-8 bg-gray-300" />
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                            {Math.round((steps.filter(s => s.status === "completed").length / steps.length) * 100)}%
                        </p>
                        <p className="text-xs text-gray-500">Progress</p>
                    </div>
                </div>
            </div>

            {/* Fiserv Badge */}
            <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-3 h-3 rounded-full bg-orange-400" />
                    Powered by Fiserv Offer Engine
                </div>
            </div>

            <style>{`
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default OnboardingFlow;
