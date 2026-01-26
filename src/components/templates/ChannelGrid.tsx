/**
 * ChannelGrid - REUSABLE
 * Displays channels/modes in a visual grid
 * 
 * USE WHEN: Showing multiple channels, modes, or options
 * REUSABLE: Works for any multi-option display
 */

import React from 'react';
import { MessageSquare, Phone, MessageCircle, Mic, User, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Channel {
    icon?: 'sms' | 'phone' | 'chat' | 'voice' | 'avatar';
    title: string;
    description: string;
    actionPhrase?: string;
}

interface ChannelGridProps {
    channels?: Channel[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    sms: MessageSquare,
    phone: Phone,
    chat: MessageCircle,
    voice: Mic,
    avatar: User,
};

export const ChannelGrid: React.FC<ChannelGridProps> = ({
    channels = [
        { icon: 'sms', title: 'Text', description: 'Text-based conversation' },
        { icon: 'phone', title: 'Telephone', description: 'Voice conversation' },
        { icon: 'chat', title: 'Chat', description: 'Web/mobile interface' },
        { icon: 'voice', title: 'Voice', description: 'Voice-activated assistant' },
        { icon: 'avatar', title: 'Avatar', description: 'Visual AI representation' },
    ],
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* Channel Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {channels.map((channel, index) => {
                    const IconComponent = iconMap[channel.icon || 'chat'];
                    return (
                        <div
                            key={index}
                            className={`p-6 rounded-xl bg-obsidian/40 border border-mist/10 text-center
                                ${channel.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:bg-obsidian/60' : ''} 
                                transition-all`}
                            onClick={() => channel.actionPhrase && handleAction(channel.actionPhrase)}
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-sapphire" />
                            </div>
                            <div className="text-lg font-bold text-white mb-1">
                                {channel.title}
                            </div>
                            <div className="text-sm text-mist/60">
                                {channel.description}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-right">
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChannelGrid;
