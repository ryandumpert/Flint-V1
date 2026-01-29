/**
 * Form - GENERIC
 * Interactive form with live-updating fields
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, User, Mail, Send, CheckCircle, Sparkles, PartyPopper, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { notifyTele } from '@/utils/acknowledgmentHelpers';

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'date' | 'tel' | 'textarea';
    icon?: string;
    placeholder?: string;
    required?: boolean;
}

interface InfoItem {
    text: string;
}

interface FormProps {
    headline?: string;
    subheadline?: string;
    fields?: FormField[];
    infoLabel?: string;
    infoItems?: InfoItem[];
    submitLabel?: string;
    submitActionPhrase?: string;
    values?: Record<string, string>;
    confirmed?: boolean;
    confirmationTitle?: string;
    confirmationMessage?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return User;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || User;
};

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
        for (let i = 0; i < firstDayOfMonth; i++) {
            result.push(<div key={`empty-${i}`} className="w-9 h-9" />);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate();
            const isSelected = isSelectedInCurrentMonth && selectedDateObj?.getDate() === day;
            const isPast = day < today.getDate();

            result.push(
                <div
                    key={day}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ${isSelected
                        ? 'bg-flamingo text-white scale-110 shadow-lg shadow-flamingo/30'
                        : isToday
                            ? 'bg-sapphire/20 text-sapphire border border-sapphire/30'
                            : isPast
                                ? 'text-mist/20'
                                : 'text-mist/60 hover:bg-white/5'
                        }`}
                >
                    {day}
                </div>
            );
        }
        return result;
    }, [currentMonth, currentYear, selectedDateObj, firstDayOfMonth, daysInMonth, isSelectedInCurrentMonth]);

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]">
            <div className="flex items-center justify-between mb-5">
                <span className="text-lg font-semibold text-white">{monthNames[currentMonth]} {currentYear}</span>
                {selectedDate && (
                    <span className="text-xs text-flamingo flex items-center gap-1 px-3 py-1 rounded-full bg-flamingo/10">
                        <Sparkles className="w-3 h-3" />
                        Selected
                    </span>
                )}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="w-9 h-8 text-xs text-mist/40 font-medium flex items-center justify-center">{d}</div>
                ))}
                {days}
            </div>
        </div>
    );
};

export const Form: React.FC<FormProps> = ({
    headline,
    subheadline,
    fields,
    infoLabel,
    infoItems,
    submitLabel,
    submitActionPhrase,
    values: propValues = {},
    confirmed = false,
    confirmationTitle,
    confirmationMessage,
}) => {
    const { playClick } = useSound();
    const [localValues, setLocalValues] = useState<Record<string, string>>(propValues);
    const [showCelebration, setShowCelebration] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        Object.entries(propValues).forEach(([key, val]) => {
            if (val && val !== localValues[key]) {
                setLocalValues(prev => ({ ...prev, [key]: val }));
            }
        });
    }, [propValues]);

    useEffect(() => {
        if (confirmed && !showCelebration) {
            setShowCelebration(true);
            setSubmitted(true);
            playClick();
            setTimeout(() => setShowCelebration(false), 4000);
        }
    }, [confirmed, showCelebration, playClick]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        if (submitActionPhrase && fields) {
            const summary = fields.map(f => `${f.label}: ${localValues[f.name] || ''}`).join(', ');
            notifyTele(`${submitActionPhrase} - ${summary}`);
        }
    };

    const hasDateField = fields?.some(f => f.type === 'date');
    const dateValue = hasDateField && fields ? localValues[fields.find(f => f.type === 'date')!.name] : null;

    if (submitted || confirmed) {
        return (
            <div className="glass-template-container h-full flex items-center justify-center">
                <div className="p-16 rounded-3xl bg-gradient-to-b from-jade/10 to-jade/5 border border-jade/20 text-center max-w-lg">
                    <div className={`transition-all duration-700 ${showCelebration ? 'scale-110' : 'scale-100'}`}>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <PartyPopper className={`w-10 h-10 text-flamingo ${showCelebration ? 'animate-bounce' : ''}`} />
                            <div className="w-20 h-20 rounded-full bg-jade/20 border border-jade/30 flex items-center justify-center">
                                <CheckCircle className={`w-10 h-10 text-jade ${showCelebration ? 'animate-pulse' : ''}`} />
                            </div>
                            <PartyPopper className={`w-10 h-10 text-flamingo ${showCelebration ? 'animate-bounce' : ''}`} style={{ transform: 'scaleX(-1)' }} />
                        </div>
                        {confirmationTitle && <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{confirmationTitle}</h3>}
                        {confirmationMessage && <p className="text-lg text-mist/60 max-w-sm mx-auto">{confirmationMessage}</p>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-template-container h-full flex flex-col">
            <div className="grid md:grid-cols-2 gap-8 flex-grow">

                <div className="flex flex-col gap-6">

                    {hasDateField && <MiniCalendar selectedDate={dateValue || null} />}

                    {infoItems && infoItems.length > 0 && (
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] flex-grow">
                            {infoLabel && <h4 className="text-sm font-semibold text-flamingo mb-4 uppercase tracking-wider">{infoLabel}</h4>}
                            <ul className="space-y-3">
                                {infoItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-mist/70">
                                        <span className="w-2 h-2 rounded-full bg-sapphire mt-2 flex-shrink-0" />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]">
                    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                        {fields && fields.map((field) => {
                            const IconComp = getIcon(field.icon);
                            const value = localValues[field.name] || '';
                            const hasValue = !!value;

                            return (
                                <div key={field.name}>
                                    <label className="flex items-center gap-2 text-sm text-mist/60 mb-3 font-medium">
                                        <IconComp className="w-4 h-4" />
                                        {field.label}
                                        {hasValue && <Sparkles className="w-3 h-3 text-sapphire animate-pulse ml-auto" />}
                                    </label>
                                    <input
                                        type={field.type}
                                        required={field.required}
                                        placeholder={field.placeholder}
                                        className={`w-full px-5 py-4 rounded-xl 
                                            bg-white/[0.02] border text-white text-lg
                                            placeholder:text-mist/30 
                                            focus:outline-none focus:bg-white/[0.04]
                                            transition-all duration-200
                                            ${hasValue
                                                ? 'border-sapphire/40 ring-1 ring-sapphire/20'
                                                : 'border-white/[0.06] hover:border-white/[0.12]'
                                            }`}
                                        value={value}
                                        onChange={(e) => setLocalValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                                    />
                                </div>
                            );
                        })}

                        <div className="flex-grow" />

                        {submitLabel && (
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 
                                    bg-flamingo text-white font-semibold rounded-2xl 
                                    hover:bg-flamingo/90 hover:scale-[1.01] active:scale-[0.99]
                                    transition-all text-lg shadow-lg shadow-flamingo/20"
                            >
                                <Send className="w-5 h-5" />
                                {submitLabel}
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
