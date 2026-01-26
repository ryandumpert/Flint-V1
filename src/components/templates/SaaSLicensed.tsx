/**
 * SaaSLicensed - Step 3, Thing 2
 * Full-width layout with features and enterprise requirements
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { CreditCard, Shield, Zap, ArrowRight, Server, Lock, Clock, CheckCircle, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FeatureItem {
    icon?: string;
    text: string;
    highlight?: boolean;
}

interface SaaSLicensedProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    features?: FeatureItem[];
    comparisonLabel?: string;
    saasTitle?: string;
    saasPoints?: string[];
    selfHostedTitle?: string;
    selfHostedPoints?: string[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return CreditCard;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || CreditCard;
};

export const SaaSLicensed: React.FC<SaaSLicensedProps> = ({
    headline = "SaaS Licensed",
    subheadline = "Enterprise-ready software as a service",
    description = "No infrastructure to manage. No DevOps overhead. Deploy in hours, scale to millions — all included in your license.",
    features = [
        { icon: "Zap", text: "Deploy in hours, not months", highlight: true },
        { icon: "Shield", text: "Enterprise-grade security (SOC2, GDPR)", highlight: true },
        { icon: "CreditCard", text: "Predictable licensing" },
        { icon: "Server", text: "99.9% uptime SLA" },
        { icon: "Lock", text: "Data encryption at rest & transit" },
        { icon: "Clock", text: "24/7 support available" },
    ],
    comparisonLabel = "Why SaaS vs Self-Hosted",
    saasTitle = "With teleglass SaaS",
    saasPoints = ["Live in 3 hours", "Zero infrastructure", "Automatic updates", "No DevOps required"],
    selfHostedTitle = "Self-Hosted Alternative",
    selfHostedPoints = ["6-12 months to deploy", "Dedicated infrastructure team", "Manual security patches", "Ongoing maintenance costs"],
    ctaLabel = "Utilization Pricing",
    ctaActionPhrase = "Show me pricing",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Features */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <CreditCard className="w-7 h-7 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-sapphire">{subheadline}</p>
                        </div>
                    </div>
                    <p className="text-lg text-mist/80 mb-6">{description}</p>
                    <div className="space-y-3">
                        {features.map((f, i) => {
                            const IconComp = getIcon(f.icon);
                            return (
                                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${f.highlight ? 'bg-sapphire/10 border border-sapphire/20' : 'bg-white/[0.04]'}`}>
                                    <IconComp className={`w-5 h-5 ${f.highlight ? 'text-sapphire' : 'text-mist/60'} flex-shrink-0`} />
                                    <span className="text-mist/80">{f.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Comparison */}
                <div className="space-y-6">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{comparisonLabel}</p>

                    <div className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-5 h-5 text-jade" />
                            <span className="font-semibold text-white">{saasTitle}</span>
                        </div>
                        <div className="space-y-2">
                            {saasPoints.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-jade flex-shrink-0" />
                                    <span className="text-mist/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                        <div className="flex items-center gap-2 mb-4">
                            <Server className="w-5 h-5 text-mist/50" />
                            <span className="font-semibold text-white">{selfHostedTitle}</span>
                        </div>
                        <div className="space-y-2">
                            {selfHostedPoints.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-mist/50">
                                    <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">—</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
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
export default SaaSLicensed;
