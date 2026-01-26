/**
 * FullSupport - Step 7, Thing 3
 * Full-width layout with support tiers and team roles
 * ALL CONTENT IS DYNAMIC via props for multi-language support
 */
import React from 'react';
import { Users, ArrowRight, CheckCircle, MessageSquare, Headphones, Code, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface SupportFeature {
    icon?: string;
    text: string;
}

interface TeamMember {
    icon?: string;
    role: string;
    description: string;
}

interface FullSupportProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    features?: SupportFeature[];
    teamLabel?: string;
    team?: TeamMember[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Users;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Users;
};

export const FullSupport: React.FC<FullSupportProps> = ({
    headline = "Full Mobeus Support",
    subheadline = "You're not alone in the hackathon",
    description = "Every hackathon includes dedicated Mobeus team members who guide you through the entire process. Real experts, real-time help, real results.",
    features = [
        { icon: "Headphones", text: "Live support during entire session" },
        { icon: "MessageSquare", text: "Real-time problem solving" },
        { icon: "Code", text: "Templates built with you" },
        { icon: "CheckCircle", text: "Deployment assistance included" },
    ],
    teamLabel = "Your Hackathon Team",
    team = [
        { icon: "Users", role: "Solutions Architect", description: "Guides technical decisions" },
        { icon: "Code", role: "Wiring Specialist", description: "Helps build templates" },
        { icon: "Headphones", role: "Success Manager", description: "Ensures outcomes" },
    ],
    successNote = "$500 in credits included with every hackathon",
    ctaLabel = "Schedule Now",
    ctaActionPhrase = "I want to schedule a hackathon",
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Support Features */}
                <div className="p-8 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                            <Users className="w-7 h-7 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{headline}</h3>
                            <p className="text-sapphire">{subheadline}</p>
                        </div>
                    </div>
                    <p className="text-lg text-mist/80 mb-6">{description}</p>
                    <div className="space-y-4">
                        {features.map((item, i) => {
                            const IconComp = getIcon(item.icon);
                            return (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04]">
                                    <IconComp className="w-5 h-5 text-sapphire flex-shrink-0" />
                                    <span className="text-mist/80">{item.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Team */}
                <div className="space-y-4">
                    <p className="text-sm text-mist/50 uppercase tracking-wider mb-2">{teamLabel}</p>
                    {team.map((member, i) => {
                        const MemberIcon = getIcon(member.icon);
                        return (
                            <div key={i} className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-flamingo/20 border border-flamingo/30 flex items-center justify-center flex-shrink-0">
                                    <MemberIcon className="w-6 h-6 text-flamingo" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">{member.role}</p>
                                    <p className="text-sm text-mist/60">{member.description}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="p-4 rounded-lg bg-jade/10 border border-jade/20">
                        <div className="flex items-center gap-2 text-sm text-jade">
                            <CheckCircle className="w-4 h-4" />
                            <span>{successNote}</span>
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
export default FullSupport;
