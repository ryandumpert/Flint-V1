import React from "react";
import { Calendar, Clock, MapPin, CheckCircle, Video, Sparkles } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/button";

interface ConsultationSchedulerProps {
    topic: string;
    imageId?: string;
    meetingType: string;
    meetingLocation: string;
    date: string;
    time: string;
    status?: "proposed" | "confirmed" | "unavailable";
}

export const ConsultationScheduler: React.FC<ConsultationSchedulerProps> = ({
    topic,
    imageId,
    meetingType,
    meetingLocation,
    date,
    time,
    status = "proposed"
}) => {
    return (
        <div className="w-full max-w-full">
            <div className="grid md:grid-cols-2 gap-6 backdrop-blur-md bg-black/40 border border-white/10 rounded-3xl overflow-hidden p-4 md:p-6">

                {/* Left: Event Preview */}
                <div className="relative h-64 md:h-auto min-h-[300px] bg-white/5 rounded-2xl overflow-hidden group">
                    {imageId ? (
                        <SmartImage
                            assetId={imageId}
                            alt="Launch Event"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-flamingo/20 to-amethyst/20">
                            <Sparkles size={64} className="text-white/50" />
                        </div>
                    )}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium uppercase tracking-wider">
                        <Sparkles size={14} className="text-flamingo" />
                        Launch Event
                    </div>
                </div>

                {/* Right: Registration Details */}
                <div className="flex flex-col justify-between space-y-6">
                    <div>
                        <h2 className="text-3xl font-light text-white mb-2">Event Registration</h2>
                        <h3 className="text-xl text-flamingo font-medium mb-6">{topic}</h3>

                        <div className="space-y-4">
                            {/* Date & Time */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <div className="text-sm text-white/50 uppercase tracking-wider mb-1">Date & Time</div>
                                    <div className="text-lg text-white font-medium">{date}</div>
                                    <div className="text-base text-white/70 flex items-center gap-2">
                                        <Clock size={14} /> {time}
                                    </div>
                                </div>
                            </div>

                            {/* Meeting Type & Location */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div className="text-sm text-white/50 uppercase tracking-wider mb-1">Event Format</div>
                                    <div className="text-lg text-white font-medium">{meetingType}</div>
                                    <div className="text-base text-white/70">{meetingLocation}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-white/10">
                        {status === "confirmed" ? (
                            <div className="w-full py-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-400 font-medium animate-in fade-in zoom-in duration-500">
                                <CheckCircle size={20} />
                                Registration Confirmed
                            </div>
                        ) : (
                            <Button className="w-full h-12 text-lg bg-white text-black hover:bg-white/90 transition-all">
                                Register for Launch Event
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
