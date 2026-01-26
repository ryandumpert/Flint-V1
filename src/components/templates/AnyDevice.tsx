/**
 * AnyDevice - Step 2, Thing 2
 * Full-width layout with device showcase and responsive features
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Smartphone, Monitor, Tablet, ArrowRight, CheckCircle, Maximize, RefreshCw, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface DeviceItem {
    icon?: string;
    name: string;
    desc: string;
    resolution: string;
    share: string;
}

interface FeatureItem {
    icon?: string;
    text: string;
}

interface AnyDeviceProps {
    headline?: string;
    subheadline?: string;
    devices?: DeviceItem[];
    whyMattersLabel?: string;
    description?: string;
    features?: FeatureItem[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Smartphone;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Smartphone;
};

export const AnyDevice: React.FC<AnyDeviceProps> = ({
    headline = "On Any Device They Have",
    subheadline = "Responsive by default",
    devices = [
        { icon: "Smartphone", name: "Mobile", desc: "iOS & Android", resolution: "375-428px", share: "58%" },
        { icon: "Tablet", name: "Tablet", desc: "iPad & Android tablets", resolution: "768-1024px", share: "12%" },
        { icon: "Monitor", name: "Desktop", desc: "All web browsers", resolution: "1280px+", share: "30%" },
    ],
    whyMattersLabel = "Why This Matters",
    description = "One codebase, every device. The tele adapts to whatever screen your user has — automatically. No device-specific builds. No fractured experiences.",
    features = [
        { icon: "Maximize", text: "Fluid layouts that adapt to any screen size" },
        { icon: "RefreshCw", text: "Real-time responsive adjustments" },
        { icon: "CheckCircle", text: "Touch, mouse, and keyboard optimized" },
    ],
    successNote = "✓ Zero extra configuration for responsive design",
    ctaLabel = "Any Channel",
    ctaActionPhrase = "Show me channels",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Device Cards */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <Smartphone className="w-7 h-7 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-sapphire">{subheadline}</p>
                        </div>
                    </div>
                    {devices.map((d, i) => {
                        const IconComp = getIcon(d.icon);
                        return (
                            <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center flex-shrink-0">
                                    <IconComp className="w-7 h-7 text-sapphire" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-white text-lg">{d.name}</span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-sapphire/20 text-sapphire">{d.share} traffic</span>
                                    </div>
                                    <p className="text-sm text-mist/70">{d.desc}</p>
                                    <p className="text-xs text-mist/50 font-mono mt-1">{d.resolution}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Column - Features */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-4">{whyMattersLabel}</p>
                    <p className="text-lg text-mist/80 mb-6">{description}</p>
                    <div className="space-y-4 mb-6">
                        {features.map((f, i) => {
                            const IconComp = getIcon(f.icon);
                            return (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.04]">
                                    <IconComp className="w-5 h-5 text-sapphire flex-shrink-0" />
                                    <span className="text-mist/80">{f.text}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-4 rounded-lg bg-sapphire/10 border border-sapphire/20 mb-6">
                        <p className="text-sapphire text-sm font-medium">{successNote}</p>
                    </div>
                    {ctaLabel && (
                        <button
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all"
                            onClick={() => handleAction(ctaActionPhrase || '')}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default AnyDevice;
