import React, { useState, useCallback } from "react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";
import { MessageSquare, Printer, ChevronDown, Check, ChevronUp, Plus, Minus, Circle } from "lucide-react";

interface CategoryOption {
    id: string;
    label: string;
    icon: string;
    selected?: boolean;
    actionPhrase?: string;
}

interface PlanOption {
    id: string;
    tier: string;
    title: string;
    price: string;
    description: string;
    features?: string[];
    recommended?: boolean;
    actionPhrase?: string;
}

interface DeviceOption {
    id: string;
    name: string;
    title: string;
    subtitle: string;
    price: string;
    imageUrl?: string;
    features?: string[];
}

interface FormFieldOption {
    id: string;
    label: string;
    subtitle?: string;
}

interface FormField {
    id: string;
    type: "radio" | "text" | "textarea" | "select";
    label: string;
    subtitle?: string;
    placeholder?: string;
    options?: FormFieldOption[];
    defaultValue?: string;
}

interface FormSection {
    id: string;
    title: string;
    subtitle?: string;
    fields: FormField[];
}

interface ReviewItem {
    label: string;
    value: string;
}

interface ReviewSection {
    id: string;
    title: string;
    items: ReviewItem[];
}

interface ProgressStep {
    id: string;
    label: string;
    status: "completed" | "current" | "upcoming";
}

interface OnboardingStepProps {
    stepNumber: number;
    totalSteps?: number;
    title: string;
    subtitle?: string;
    categories?: CategoryOption[];
    allowMultiple?: boolean;
    plans?: PlanOption[];
    devices?: DeviceOption[];
    formSections?: FormSection[];
    reviewSections?: ReviewSection[];
    progressSteps?: ProgressStep[];
    showBackButton?: boolean;
    bankName?: string;
    userName?: string;
    activeTab?: string;
    ctaLabel?: string;
    backLabel?: string;
    ctaActionPhrase?: string;
    backActionPhrase?: string;
    showPrivacyLink?: boolean;
    animationClass?: string;
    isExiting?: boolean;
    // Celebration mode (Step 10)
    isCelebration?: boolean;
    celebrationMessage?: string;
    celebrationDetails?: string[];
}

// Device icons
const DeviceGoIcon = () => (
    <div className="relative w-32 h-24 flex items-center justify-center">
        <div className="w-20 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg relative">
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-green-400 opacity-80" />
            <div className="absolute bottom-2 right-2 w-8 h-1 bg-gray-300 rounded" />
        </div>
    </div>
);

const DeviceFlexIcon = () => (
    <div className="relative w-32 h-24 flex items-center justify-center">
        <div className="w-12 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute top-1 left-1 right-1 bottom-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-gray-700 rounded-full" />
        </div>
    </div>
);

const DeviceMiniIcon = () => (
    <div className="relative w-32 h-24 flex items-center justify-center">
        <div className="w-28 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg relative transform rotate-[-5deg]">
            <div className="absolute top-1 left-1 right-1 bottom-4 bg-white rounded border border-gray-200" />
            <div className="absolute top-2 left-2 right-2 h-2 bg-cyan-500/20 rounded" />
            <div className="absolute top-5 left-2 right-2 space-y-1">
                <div className="h-1 bg-gray-200 rounded w-3/4" />
                <div className="h-1 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    </div>
);

const getDeviceIcon = (deviceName: string) => {
    switch (deviceName.toLowerCase()) {
        case "go": return <DeviceGoIcon />;
        case "flex": return <DeviceFlexIcon />;
        case "mini": return <DeviceMiniIcon />;
        default: return <DeviceGoIcon />;
    }
};

const PaymentCardIcon = () => (
    <svg className="w-24 h-24" viewBox="0 0 96 96" fill="none">
        <path d="M60 75c-3 0-5.5-1.5-7-4l-8-14c-1-2-3-3-5-3h-4c-3 0-5-2-5-5v-10c0-3 2-5 5-5h6c2 0 4 1 5 3l2 4" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="38" y="20" width="40" height="28" rx="3" stroke="#22c55e" strokeWidth="2.5" fill="none" transform="rotate(-15 58 34)" />
        <rect x="48" y="30" width="8" height="6" rx="1" stroke="#22c55e" strokeWidth="1.5" fill="none" transform="rotate(-15 52 33)" />
        <path d="M50 42 L72 38" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
        case "retail":
            return (<svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="12" width="32" height="28" rx="2" /><path d="M8 20h32" /><path d="M20 28h8" /></svg>);
        case "services":
            return (<svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" /><path d="M12 36l6-8 4 4 8-12 6 8" /><circle cx="24" cy="16" r="4" /></svg>);
        case "food":
            return (<svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 12v24M20 12v8c0 2-2 4-4 4s-4-2-4-4v-8" /><path d="M32 12v4c0 4-2 8-4 8v12" /><circle cx="36" cy="16" r="2" /><circle cx="36" cy="24" r="2" /></svg>);
        default:
            return (<svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="8" width="32" height="32" rx="4" /></svg>);
    }
};

// Confetti celebration component
const Confetti = () => {
    const colors = ['#22d3ee', '#f97316', '#22c55e', '#eab308', '#ec4899', '#8b5cf6'];
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[i % colors.length],
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        size: 6 + Math.random() * 8,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute animate-confetti-fall"
                    style={{
                        left: `${p.left}%`,
                        top: '-20px',
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                />
            ))}
            <style>{`
                @keyframes confetti-fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
                }
                .animate-confetti-fall {
                    animation: confetti-fall 3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

// Animated checkmark for celebration
const AnimatedCheckmark = () => (
    <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-white animate-check-draw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" className="animate-check-path" />
            </svg>
        </div>
        <style>{`
            @keyframes pulse-slow {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.9; }
            }
            @keyframes check-draw {
                0% { stroke-dashoffset: 24; }
                100% { stroke-dashoffset: 0; }
            }
            .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
            .animate-check-path { 
                stroke-dasharray: 24;
                stroke-dashoffset: 24;
                animation: check-draw 0.5s ease-out 0.3s forwards;
            }
        `}</style>
    </div>
);

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
    stepNumber,
    totalSteps = 10,
    title,
    subtitle,
    categories = [],
    allowMultiple = true,
    plans = [],
    devices = [],
    formSections = [],
    reviewSections = [],
    progressSteps = [],
    showBackButton = false,
    bankName = "First Financial Bank",
    userName = "John Doe",
    activeTab = "Merchant Services",
    ctaLabel = "Continue",
    backLabel = "Go Back",
    ctaActionPhrase,
    backActionPhrase,
    showPrivacyLink = true,
    animationClass = "",
    isExiting = false,
    isCelebration = false,
    celebrationMessage,
    celebrationDetails = [],
}) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
    const [deviceQuantities, setDeviceQuantities] = useState<Record<string, number>>({});
    const [expandedDevice, setExpandedDevice] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const { playClick } = useSound();

    const toggleCategory = useCallback((categoryId: string) => {
        playClick();
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) return prev.filter(id => id !== categoryId);
            if (allowMultiple) return [...prev, categoryId];
            return [categoryId];
        });
    }, [allowMultiple, playClick]);

    const handlePlanSelect = useCallback((planId: string, actionPhrase?: string) => {
        playClick();
        setSelectedPlan(planId);
        if (actionPhrase) sendToTele(actionPhrase);
        else if (ctaActionPhrase) sendToTele(ctaActionPhrase);
    }, [playClick, ctaActionPhrase]);

    const togglePlanDetails = useCallback((planId: string) => {
        playClick();
        setExpandedPlan(prev => prev === planId ? null : planId);
    }, [playClick]);

    const updateDeviceQuantity = useCallback((deviceId: string, delta: number) => {
        playClick();
        setDeviceQuantities(prev => {
            const newQty = Math.max(0, (prev[deviceId] || 0) + delta);
            return { ...prev, [deviceId]: newQty };
        });
    }, [playClick]);

    const toggleDeviceDetails = useCallback((deviceId: string) => {
        playClick();
        setExpandedDevice(prev => prev === deviceId ? null : deviceId);
    }, [playClick]);

    const handleFormChange = useCallback((fieldId: string, value: string) => {
        setFormValues(prev => ({ ...prev, [fieldId]: value }));
    }, []);

    const handleContinue = useCallback(() => {
        playClick();
        if (ctaActionPhrase) sendToTele(ctaActionPhrase);
    }, [ctaActionPhrase, playClick]);

    const handleBack = useCallback(() => {
        playClick();
        if (backActionPhrase) sendToTele(backActionPhrase);
    }, [backActionPhrase, playClick]);

    const progress = (stepNumber / totalSteps) * 100;
    const totalDevices = Object.values(deviceQuantities).reduce((sum, qty) => sum + qty, 0);
    const totalDevicePrice = devices.reduce((sum, d) => sum + (deviceQuantities[d.id] || 0) * (parseFloat(d.price.replace(/[$,]/g, "")) || 0), 0);

    const hasFormContent = formSections.length > 0;
    const canContinue = (categories.length === 0 && plans.length === 0 && devices.length === 0 && !hasFormContent) ||
        (categories.length > 0 && selectedCategories.length > 0) ||
        (plans.length > 0) ||
        (devices.length > 0 && totalDevices > 0) ||
        hasFormContent;

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            <div className="bg-gray-100 rounded-t-xl border border-gray-300 overflow-hidden shadow-xl">
                {/* Bank Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                    <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
                        </svg>
                    </div>
                    <nav className="flex items-center gap-8">
                        {["Accounts", "Transfers", "Pay Bills", "Manage Money", "Merchant Services"].map((tab) => (
                            <button key={tab} className={`pb-2 px-1 ${tab === activeTab ? "text-cyan-600 font-medium border-b-2 border-cyan-600" : "text-gray-600 hover:text-gray-800"}`}>{tab}</button>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <button className="flex items-center gap-1 hover:text-gray-700"><MessageSquare className="w-4 h-4" />Live Chat</button>
                        <span className="text-gray-300">|</span>
                        <button className="flex items-center gap-1 hover:text-gray-700"><Printer className="w-4 h-4" />Print</button>
                        <span className="text-gray-300">|</span>
                        <button className="flex items-center gap-1 hover:text-gray-700">{userName}<ChevronDown className="w-4 h-4" /></button>
                    </div>
                </div>

                {/* Progress Steps (for form flows) */}
                {progressSteps.length > 0 && (
                    <div className="bg-white border-b border-gray-200 px-8 py-4">
                        <div className="flex items-center justify-between max-w-4xl mx-auto">
                            {progressSteps.map((step, idx) => (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step.status === "completed" ? "bg-cyan-500 text-white" :
                                            step.status === "current" ? "bg-cyan-500 text-white" :
                                                "bg-gray-200 text-gray-500"
                                            }`}>
                                            {step.status === "completed" ? <Check className="w-3 h-3" /> : idx + 1}
                                        </div>
                                        <span className={`text-sm ${step.status === "current" ? "text-cyan-600 font-medium" : "text-gray-500"}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {idx < progressSteps.length - 1 && (
                                        <div className="w-16 h-px bg-gray-200 mx-4" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="bg-white p-8 min-h-[520px]">
                    {!hasFormContent && !isCelebration && (
                        <div className="w-32 h-1 bg-gray-200 rounded-full mb-8">
                            <div className="h-full bg-cyan-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    )}

                    {/* Celebration Mode */}
                    {isCelebration ? (
                        <div className="max-w-2xl mx-auto text-left relative">
                            <Confetti />
                            <div className="bg-white border-2 border-cyan-500 rounded-xl p-8 shadow-lg animate-fade-in-up">
                                <div className="flex items-start gap-4">
                                    <AnimatedCheckmark />
                                    <div className="flex-1">
                                        <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>
                                        {celebrationMessage && (
                                            <p className="text-gray-600 mb-4">{celebrationMessage}</p>
                                        )}
                                        {celebrationDetails.map((detail, idx) => (
                                            <p key={idx} className="text-sm text-gray-500 mb-2">{detail}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="mt-6 flex items-center gap-3">
                                    <button
                                        onClick={handleContinue}
                                        className="px-6 py-2.5 rounded font-medium bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                                    >
                                        {ctaLabel}
                                    </button>
                                    <div className="w-3 h-3 rounded-full bg-orange-400" title="Powered by Fiserv" />
                                </div>
                            </div>
                            <style>{`
                                @keyframes fade-in-up {
                                    0% { opacity: 0; transform: translateY(20px); }
                                    100% { opacity: 1; transform: translateY(0); }
                                }
                                .animate-fade-in-up {
                                    animation: fade-in-up 0.5s ease-out forwards;
                                }
                            `}</style>
                        </div>
                    ) : (
                        <div className={`mx-auto ${hasFormContent ? "max-w-3xl text-left" : "max-w-5xl text-center"}`}>
                            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
                            {subtitle && <p className="text-gray-500 mb-8">{subtitle}</p>}

                            {/* Form Sections */}
                            {formSections.map((section) => (
                                <div key={section.id} className="mb-8">
                                    <h2 className="text-base font-semibold text-gray-900 mb-1">{section.title}</h2>
                                    {section.subtitle && <p className="text-sm text-gray-500 mb-4">{section.subtitle}</p>}

                                    <div className="space-y-4">
                                        {section.fields.map((field) => (
                                            <div key={field.id}>
                                                {field.type === "radio" && field.options && (
                                                    <div className="space-y-2">
                                                        {field.options.map((opt) => (
                                                            <label
                                                                key={opt.id}
                                                                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${formValues[field.id] === opt.id
                                                                    ? "border-cyan-500 bg-cyan-50/50"
                                                                    : "border-gray-200 hover:border-gray-300"
                                                                    }`}
                                                                onClick={() => { playClick(); handleFormChange(field.id, opt.id); }}
                                                            >
                                                                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${formValues[field.id] === opt.id ? "border-cyan-500" : "border-gray-300"
                                                                    }`}>
                                                                    {formValues[field.id] === opt.id && (
                                                                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-900 font-medium">{opt.label}</p>
                                                                    {opt.subtitle && <p className="text-sm text-gray-500">{opt.subtitle}</p>}
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}

                                                {field.type === "text" && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                                        <input
                                                            type="text"
                                                            placeholder={field.placeholder}
                                                            value={formValues[field.id] || field.defaultValue || ""}
                                                            onChange={(e) => handleFormChange(field.id, e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                )}

                                                {field.type === "textarea" && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                                        <textarea
                                                            placeholder={field.placeholder}
                                                            value={formValues[field.id] || field.defaultValue || ""}
                                                            onChange={(e) => handleFormChange(field.id, e.target.value)}
                                                            rows={3}
                                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                                                        />
                                                    </div>
                                                )}

                                                {field.type === "select" && field.options && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                                        <div className="relative">
                                                            <select
                                                                value={formValues[field.id] || ""}
                                                                onChange={(e) => handleFormChange(field.id, e.target.value)}
                                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white"
                                                            >
                                                                <option value="">Select...</option>
                                                                {field.options.map((opt) => (
                                                                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Review Sections */}
                            {reviewSections.length > 0 && (
                                <div className="space-y-8 mb-8">
                                    {reviewSections.map((section, sectionIdx) => (
                                        <div key={section.id} className="text-left">
                                            <h2 className="text-lg font-semibold text-cyan-600 mb-4 pb-2 border-b border-gray-200">
                                                {sectionIdx + 1}. {section.title}
                                            </h2>
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                                {section.items.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="flex justify-between py-2 border-b border-gray-100">
                                                        <span className="text-sm text-gray-500">{item.label}</span>
                                                        <span className="text-sm font-medium text-gray-900">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Category Selection */}
                            {categories.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {categories.map((cat) => {
                                        const isSelected = selectedCategories.includes(cat.id);
                                        return (
                                            <button key={cat.id} onClick={() => toggleCategory(cat.id)} className={`relative bg-white border-2 rounded-lg p-6 transition-all hover:shadow-md ${isSelected ? "border-cyan-500 shadow-md" : "border-gray-200"}`}>
                                                <div className={`absolute top-3 right-3 w-5 h-5 border rounded flex items-center justify-center ${isSelected ? "bg-cyan-500 border-cyan-500" : "border-gray-300"}`}>
                                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <div className="text-gray-600 mb-3 flex justify-center">{getCategoryIcon(cat.icon)}</div>
                                                <span className="text-gray-700 font-medium">{cat.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Plan Selection */}
                            {plans.length > 0 && (
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    {plans.map((plan) => {
                                        const isExpanded = expandedPlan === plan.id;
                                        return (
                                            <div key={plan.id} className={`relative bg-white border-2 rounded-xl overflow-hidden transition-all hover:shadow-lg ${selectedPlan === plan.id ? "border-cyan-500 shadow-lg" : "border-gray-200"}`}>
                                                {plan.recommended && <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>}
                                                <div className="pt-6 pb-2 flex justify-center"><PaymentCardIcon /></div>
                                                <div className="px-6 pb-6">
                                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{plan.tier}</p>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.title}</h3>
                                                    <p className="text-2xl font-bold text-gray-900 mb-2">{plan.price}</p>
                                                    <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                                                    {plan.features && plan.features.length > 0 && (
                                                        <>
                                                            <button onClick={() => togglePlanDetails(plan.id)} className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700 mb-4">Details {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</button>
                                                            {isExpanded && <ul className="text-left text-sm text-gray-600 space-y-2 mb-4 border-t border-gray-100 pt-4">{plan.features.map((f, i) => <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5" />{f}</li>)}</ul>}
                                                        </>
                                                    )}
                                                    <button onClick={() => handlePlanSelect(plan.id, plan.actionPhrase)} className={`w-full py-3 rounded-lg font-medium transition-all ${selectedPlan === plan.id ? "bg-cyan-500 text-white" : "border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50"}`}>Select plan and continue</button>
                                                    <a href="#" className="block text-center text-cyan-600 text-xs mt-3 hover:underline">Privacy Policy</a>
                                                </div>
                                                {plan.recommended && <div className="absolute bottom-4 right-4"><div className="w-3 h-3 rounded-full bg-orange-400" /></div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Device Selection */}
                            {devices.length > 0 && (
                                <>
                                    <div className="grid grid-cols-3 gap-6 mb-8">
                                        {devices.map((device) => {
                                            const qty = deviceQuantities[device.id] || 0;
                                            const isExpanded = expandedDevice === device.id;
                                            return (
                                                <div key={device.id} className={`bg-white border-2 rounded-xl overflow-hidden transition-all hover:shadow-lg ${qty > 0 ? "border-cyan-500 shadow-lg" : "border-gray-200"}`}>
                                                    <div className="pt-6 pb-4 flex justify-center bg-gradient-to-b from-gray-50 to-white">
                                                        {device.imageUrl ? <img src={device.imageUrl} alt={device.name} className="w-32 h-24 object-contain" /> : getDeviceIcon(device.name)}
                                                    </div>
                                                    <div className="px-5 pb-5">
                                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{device.name}</p>
                                                        <h3 className="text-base font-semibold text-gray-900 mb-1 leading-tight">{device.title}</h3>
                                                        <p className="text-gray-500 text-sm mb-2">{device.subtitle}</p>
                                                        <p className="text-xl font-bold text-gray-900 mb-3">{device.price}</p>
                                                        {device.features && device.features.length > 0 && (
                                                            <>
                                                                <button onClick={() => toggleDeviceDetails(device.id)} className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700 mb-4">Details {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</button>
                                                                {isExpanded && <ul className="text-left text-xs text-gray-600 space-y-1.5 mb-4 border-t border-gray-100 pt-3">{device.features.map((f, i) => <li key={i} className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5" />{f}</li>)}</ul>}
                                                            </>
                                                        )}
                                                        <div className="flex items-center justify-between border border-gray-200 rounded-lg overflow-hidden">
                                                            <button onClick={() => updateDeviceQuantity(device.id, -1)} disabled={qty === 0} className={`w-12 h-10 flex items-center justify-center ${qty === 0 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"}`}><Minus className="w-4 h-4" /></button>
                                                            <span className="text-lg font-semibold text-gray-900 w-12 text-center">{qty}</span>
                                                            <button onClick={() => updateDeviceQuantity(device.id, 1)} className="w-12 h-10 flex items-center justify-center bg-cyan-500 text-white hover:bg-cyan-600"><Plus className="w-4 h-4" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {totalDevices > 0 && (
                                        <div className="bg-white/80 backdrop-blur rounded-lg p-4 mb-6 inline-flex items-center gap-6 border border-gray-200">
                                            <div className="text-left"><p className="text-sm text-gray-500">Devices</p><p className="text-lg font-bold text-gray-900">{totalDevices}</p></div>
                                            <div className="w-px h-10 bg-gray-200" />
                                            <div className="text-left"><p className="text-sm text-gray-500">Total</p><p className="text-lg font-bold text-cyan-600">${totalDevicePrice.toFixed(2)}</p></div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                {showPrivacyLink && <a href="#" className="text-cyan-600 text-sm hover:underline">Privacy Policy</a>}
                                <div className="flex items-center gap-3 ml-auto">
                                    {showBackButton && (
                                        <button onClick={handleBack} className="px-6 py-2.5 rounded font-medium text-gray-600 hover:text-gray-900 transition-colors">{backLabel}</button>
                                    )}
                                    <div className="w-3 h-3 rounded-full bg-orange-400" title="Powered by Fiserv" />
                                    <button onClick={handleContinue} disabled={!canContinue} className={`px-6 py-2.5 rounded font-medium transition-colors ${!canContinue ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}>{ctaLabel}</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">Step {stepNumber} of {totalSteps}</span>
            </div>
        </div>
    );
};

export default OnboardingStep;
