/**
 * HackathonForm - PURPOSE-SPECIFIC (Step 7: Schedule Hackathon - GOAL)
 * Live scheduling form with voice-updated fields and celebration animation
 * 
 * Props flow from agent:
 * - name: User's name (live updated via voice)
 * - email: User's email (live updated via voice)
 * - preferredDate: Selected date in YYYY-MM-DD format (live updated)
 * - confirmed: When true, triggers celebration animation
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, User, Mail, Send, CheckCircle, Sparkles, PartyPopper } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { notifyTele } from '@/utils/acknowledgmentHelpers';

interface HackathonFormProps {
    headline?: string;
    subheadline?: string;
    // Live props from agent
    name?: string;
    email?: string;
    preferredDate?: string;
    confirmed?: boolean;
}

// Confetti particle component
const ConfettiParticle: React.FC<{ delay: number; color: string }> = ({ delay, color }) => (
    <div
        className="absolute w-3 h-3 rounded-sm animate-confetti"
        style={{
            left: `${Math.random() * 100}%`,
            background: color,
            animationDelay: `${delay}ms`,
            transform: `rotate(${Math.random() * 360}deg)`,
        }}
    />
);

// Mini calendar component
const MiniCalendar: React.FC<{ selectedDate: string | null }> = ({ selectedDate }) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;
    const isSelectedInCurrentMonth = selectedDateObj &&
        selectedDateObj.getMonth() === currentMonth &&
        selectedDateObj.getFullYear() === currentYear;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const days = useMemo(() => {
        const result = [];
        // Empty cells for days before the 1st
        for (let i = 0; i < firstDayOfMonth; i++) {
            result.push(<div key={`empty-${i}`} className="w-8 h-8" />);
        }
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate();
            const isSelected = isSelectedInCurrentMonth && selectedDateObj?.getDate() === day;
            const isPast = day < today.getDate();

            result.push(
                <div
                    key={day}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-300 ${isSelected
                            ? 'bg-flamingo text-white scale-110 shadow-lg shadow-flamingo/30'
                            : isToday
                                ? 'bg-sapphire/30 text-white ring-2 ring-sapphire'
                                : isPast
                                    ? 'text-mist/30'
                                    : 'text-mist/70 hover:bg-white/10'
                        }`}
                >
                    {day}
                </div>
            );
        }
        return result;
    }, [currentMonth, currentYear, selectedDateObj, firstDayOfMonth, daysInMonth, isSelectedInCurrentMonth]);

    return (
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">{monthNames[currentMonth]} {currentYear}</span>
                {selectedDate && (
                    <span className="text-xs text-flamingo flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Selected
                    </span>
                )}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="w-8 h-6 text-xs text-mist/50 font-medium">{d}</div>
                ))}
                {days}
            </div>
        </div>
    );
};

export const HackathonForm: React.FC<HackathonFormProps> = ({
    headline = "Schedule Your Hackathon",
    subheadline = "Wire your first tele with hands-on guidance from Mobeus.",
    name: propName = '',
    email: propEmail = '',
    preferredDate: propDate = '',
    confirmed = false,
}) => {
    const { playClick } = useSound();
    const [localName, setLocalName] = useState(propName);
    const [localEmail, setLocalEmail] = useState(propEmail);
    const [localDate, setLocalDate] = useState(propDate);
    const [showCelebration, setShowCelebration] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Sync props to local state when they change (live updates from agent)
    useEffect(() => {
        if (propName && propName !== localName) setLocalName(propName);
    }, [propName]);

    useEffect(() => {
        if (propEmail && propEmail !== localEmail) setLocalEmail(propEmail);
    }, [propEmail]);

    useEffect(() => {
        if (propDate && propDate !== localDate) setLocalDate(propDate);
    }, [propDate]);

    // Trigger celebration when confirmed prop changes to true
    useEffect(() => {
        if (confirmed && !showCelebration) {
            setShowCelebration(true);
            setSubmitted(true);
            playClick();
            // Reset celebration after animation
            setTimeout(() => setShowCelebration(false), 4000);
        }
    }, [confirmed, showCelebration, playClick]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        notifyTele(`Confirm hackathon for ${localName} on ${localDate}`);
    };

    const confettiColors = ['#9B5DE5', '#47A1AD', '#5EEAD4', '#CC850A', '#7C3AED'];

    // Celebration state
    if (submitted || confirmed) {
        return (
            <div className="glass-template-container relative overflow-hidden">
                {/* Confetti animation */}
                {showCelebration && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <ConfettiParticle
                                key={i}
                                delay={i * 50}
                                color={confettiColors[i % confettiColors.length]}
                            />
                        ))}
                    </div>
                )}

                <div className="p-12 rounded-xl bg-white/[0.04] border border-sapphire/30 text-center relative">
                    <div className={`transition-all duration-700 ${showCelebration ? 'scale-110' : 'scale-100'}`}>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <PartyPopper className={`w-10 h-10 text-flamingo ${showCelebration ? 'animate-bounce' : ''}`} />
                            <CheckCircle className={`w-16 h-16 text-sapphire ${showCelebration ? 'animate-pulse' : ''}`} />
                            <PartyPopper className={`w-10 h-10 text-flamingo ${showCelebration ? 'animate-bounce' : ''}`} style={{ transform: 'scaleX(-1)' }} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                            {showCelebration ? "🎉 You're All Set!" : "Request Submitted!"}
                        </h3>
                        {localName && (
                            <p className="text-xl text-sapphire mb-2">Welcome, {localName}!</p>
                        )}
                        {localDate && (
                            <p className="text-lg text-mist/80 mb-4">
                                Hackathon scheduled for <span className="text-flamingo font-semibold">{new Date(localDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                            </p>
                        )}
                        <p className="text-mist/60">We'll confirm your hackathon within 24 hours.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-template-container">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Info + Calendar */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{headline}</h3>
                        <p className="text-mist/70 text-lg">{subheadline}</p>
                    </div>

                    {/* Live Calendar Display */}
                    <MiniCalendar selectedDate={localDate} />

                    {/* What You'll Build */}
                    <div className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                        <h4 className="text-sm font-semibold text-flamingo mb-3 uppercase tracking-wider">What You'll Build</h4>
                        <ul className="space-y-2 text-mist/80">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sapphire" />
                                A fully working conversational AI (tele)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sapphire" />
                                Custom knowledge & personality
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sapphire" />
                                Voice & visual interactions
                            </li>
                        </ul>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4">
                        <div className="flex-1 p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                            <p className="text-3xl font-bold text-white">3</p>
                            <p className="text-sm text-mist/60">Hours</p>
                        </div>
                        <div className="flex-1 p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                            <p className="text-3xl font-bold text-white">7</p>
                            <p className="text-sm text-mist/60">Steps</p>
                        </div>
                        <div className="flex-1 p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                            <p className="text-3xl font-bold text-white">1</p>
                            <p className="text-sm text-mist/60">Live Tele</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="p-6 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="flex items-center gap-2 text-sm text-mist/70 mb-2">
                                <User className="w-4 h-4" /> Name
                                {localName && <Sparkles className="w-3 h-3 text-sapphire animate-pulse ml-auto" />}
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Your name"
                                className={`w-full px-4 py-3 rounded-lg text-white placeholder:text-mist/40 focus:outline-none focus:ring-2 focus:ring-sapphire/50 transition-all ${localName ? 'ring-2 ring-sapphire/30' : ''}`}
                                style={{ background: 'rgba(15, 20, 30, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
                                value={localName}
                                onChange={(e) => setLocalName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm text-mist/70 mb-2">
                                <Mail className="w-4 h-4" /> Email
                                {localEmail && <Sparkles className="w-3 h-3 text-sapphire animate-pulse ml-auto" />}
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="you@company.com"
                                className={`w-full px-4 py-3 rounded-lg text-white placeholder:text-mist/40 focus:outline-none focus:ring-2 focus:ring-sapphire/50 transition-all ${localEmail ? 'ring-2 ring-sapphire/30' : ''}`}
                                style={{ background: 'rgba(15, 20, 30, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
                                value={localEmail}
                                onChange={(e) => setLocalEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm text-mist/70 mb-2">
                                <Calendar className="w-4 h-4" /> Preferred Date
                                {localDate && <Sparkles className="w-3 h-3 text-flamingo animate-pulse ml-auto" />}
                            </label>
                            <input
                                type="date"
                                required
                                className={`w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire/50 transition-all [color-scheme:dark] ${localDate ? 'ring-2 ring-flamingo/30' : ''}`}
                                style={{ background: 'rgba(15, 20, 30, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
                                value={localDate}
                                onChange={(e) => setLocalDate(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!localName || !localEmail || !localDate}
                            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg mt-2 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send className="w-5 h-5" /> Schedule Hackathon
                        </button>
                    </form>
                    <p className="text-xs text-mist/50 text-center mt-4">
                        Free 3-hour session • No credit card required
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HackathonForm;
