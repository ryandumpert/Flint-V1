/**
 * CopperWireLanguage
 * 
 * THE COPPER WIRE LANGUAGE™ — The Human Language for Programming Artificial Intelligence
 * 
 * A static template showcasing the complete naming structure for the Mobeus Teleglass platform.
 * This is how humans remember to program conversational AI.
 * 
 * Your creativity, our labor. Mobeus is a labor company.
 * The Teleglass is the conversational cloud.
 */

import React from "react";
import { ChevronRight, Zap, Brain, Eye, MessageSquare, Cable, Sparkles, Users, Shield } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { notifyTele } from "@/utils/acknowledgmentHelpers";

// ============================================================================
// THE COPPER WIRE LANGUAGE™ — NAMING STRUCTURE
// ============================================================================

const NAMING_STRUCTURE = {
    // THE PLATFORM
    platform: {
        old: "Platform",
        new: "Teleglass",
        description: "The Conversational Cloud",
        metaphor: "Your AI lives here"
    },

    // THE AI
    ai: {
        old: "AI Assistant",
        new: "Tele",
        description: "A programmable, ownable, regenerating conversational AI",
        metaphor: "Magic starts empty, becomes whatever you need"
    },

    // THE BRIDGE
    bridge: {
        old: "navigateToSection",
        new: "Bridge",
        description: "The marshmallow bridge between thought and display",
        metaphor: "Connects what tele knows to what user sees"
    },

    // THE COPPER WIRES (What you program)
    copperWires: [
        {
            icon: Brain,
            old: "tele-knowledge.md",
            new: "Memory",
            command: "/teach",
            description: "What your tele knows",
            examples: ["Facts", "Expertise", "Domain knowledge", "Context"]
        },
        {
            icon: MessageSquare,
            old: "Shot Prompts",
            new: "Reflexes",
            command: "/reflex",
            description: "Automatic responses to triggers",
            examples: ["When user says X, show Y", "Intent → Response mappings"]
        },
        {
            icon: Eye,
            old: "Templates",
            new: "Panels",
            command: "/panel",
            description: "Visual components on the glass",
            examples: ["Cards", "Timelines", "Forms", "Carousels"]
        },
        {
            icon: Zap,
            old: "Site Functions",
            new: "Powers",
            command: "/power",
            description: "Actions your tele can perform",
            examples: ["Scroll", "Navigate", "Send", "Store"]
        },
        {
            icon: Cable,
            old: "MCP Servers",
            new: "Connections",
            command: "/connect",
            description: "External integrations",
            examples: ["APIs", "Databases", "Services", "Tools"]
        },
        {
            icon: Shield,
            old: "RAG",
            new: "Archives",
            command: "/archive",
            description: "Searchable knowledge bases",
            examples: ["Documents", "PDFs", "Embeddings", "Vector stores"]
        }
    ],

    // THE AGENTS
    agents: {
        build: {
            old: "Build Agent / Claude",
            new: "Architect",
            description: "Builds your tele during development"
        },
        runtime: {
            old: "Runtime Agent / OpenAI",
            new: "Performer",
            description: "Serves users in production"
        }
    },

    // THE MODES
    modes: {
        admin: {
            old: "Admin Mode",
            new: "Voice Design",
            description: "Speak to program your tele"
        },
        vibe: {
            old: "Vibe Coding",
            new: "Vibe Design",
            description: "Iterate through conversation"
        }
    },

    // THE FILES
    files: {
        knowledge: {
            old: "tele-knowledge.md",
            new: "memory.md",
            description: "What tele knows"
        },
        prompts: {
            old: "glass-prompt.md",
            new: "instincts.md",
            description: "How tele responds"
        }
    },

    // THE COMMANDS (Wire Commands)
    commands: [
        { old: "/add-glass", new: "/panel", description: "Create visual panels" },
        { old: "/add-knowledge", new: "/teach", description: "Teach tele facts" },
        { old: "/tele-should", new: "/reflex", description: "Define reflexes" },
        { old: "/create-site-function", new: "/power", description: "Grant powers" },
        { old: "(new)", new: "/sync", description: "Publish to cloud" },
        { old: "(new)", new: "/connect", description: "Add connections" },
        { old: "(new)", new: "/archive", description: "Add archives" }
    ],

    // PROPOSED NEW POWERS (Site Functions)
    proposedPowers: [
        { name: "Reach", description: "Send communications (email, SMS, push)" },
        { name: "Plan", description: "Schedule future actions" },
        { name: "Remember", description: "Persist data to storage" },
        { name: "Recall", description: "Retrieve stored data" },
        { name: "Imagine", description: "Generate images with AI" },
        { name: "Voice", description: "Text-to-speech output" },
        { name: "Discover", description: "Search the web" },
        { name: "Interpret", description: "Translate languages" },
        { name: "See", description: "Analyze images" },
        { name: "Scribe", description: "Generate documents" },
        { name: "Alert", description: "Push notifications" },
        { name: "Pay", description: "Process payments" }
    ]
};

// ============================================================================
// PRESS RELEASE CONTENT
// ============================================================================

const PRESS_RELEASE = {
    type: "FOR IMMEDIATE RELEASE",
    headline: "Mobeus Announces Teleglass Platform and Wire 1.0 — The First Platform Where Humans Wire Up Their Own AI",
    subheadline: "Revolutionary 'Copper Wire Language' enables anyone to program conversational AI without code",
    date: "January 20, 2026",
    location: "NEW YORK",
    contact: {
        name: "Media Relations",
        email: "press@mobeus.com",
        phone: "(888) 662-3871"
    },
    body: `Mobeus, Inc., the labor company pioneering programmable conversational AI, today announced the Teleglass™ platform and Wire 1.0, a groundbreaking development environment that enables any human to create, own, and operate their own conversational AI — without writing a single line of code.

Wire 1.0 introduces The Copper Wire Language™, a revolutionary naming structure that replaces complex technical terminology with intuitive concepts anyone can remember. Instead of "navigateToSection," users simply think "Bridge." Instead of "templates," they design "Panels." The language transforms AI programming from an engineering discipline into a human-centered design practice.

"We asked ourselves: what if programming AI felt like describing what you want to a colleague?" said Richie Etwaru, CEO and Founder of Mobeus. "The answer is the Copper Wire Language. You wire up Memory. You wire up Reflexes. You wire up Panels. You wire up Powers. That's it. Your conversational cloud comes alive."

The Teleglass platform introduces six "Copper Wires" — the fundamental building blocks for creating conversational AI:

• Memory — What your AI knows (domain expertise, facts, context)
• Reflexes — How your AI responds (automatic reactions to user intent)  
• Panels — What users see (visual interfaces on the glass)
• Powers — What your AI can do (actions, integrations, capabilities)
• Connections — External systems (APIs, databases, services)
• Archives — Knowledge bases (documents, embeddings, RAG)

"Your creativity, our labor," Etwaru continued. "Mobeus is a labor company. We provide the infrastructure, the copper wires, the conversational cloud. You bring the vision. In hours, not months, you have a working AI that reflects your expertise and serves your users."

Wire 1.0 and the Teleglass platform will be available to early access partners in Spring 2026, with general availability expected in Q3 2026. Interested organizations can request early access at mobeus.com/wire.`,
    quotes: [
        {
            text: "Wire up your AI. That's the whole pitch. Six copper wires — Memory, Reflexes, Panels, Powers, Connections, Archives. You wire them up. Your conversational cloud comes alive. You're not coding. You're not prompting. You're wiring.",
            author: "Richie Etwaru",
            title: "CEO and Founder, Mobeus"
        },
        {
            text: "The Copper Wire Language is the Rosetta Stone between human intent and machine capability. When we launch Wire 1.0, a salesperson will be able to wire up a sales assistant. A teacher will wire up a tutor. A support manager will wire up a help desk. Anyone becomes an AI creator.",
            author: "Richie Etwaru",
            title: "CEO and Founder, Mobeus"
        }
    ],
    about: "Mobeus, Inc. is a labor company building the infrastructure for the conversational economy. The company's Teleglass platform enables organizations to create, deploy, and operate conversational AI applications — called teles — that combine voice, vision, and action. Founded in 2024 and headquartered in New York, Mobeus is backed by leading investors and serves enterprise customers across healthcare, financial services, retail, and professional services. Learn more at mobeus.com.",
    legal: "Teleglass, Wire, and The Copper Wire Language are trademarks of Mobeus, Inc. This press release contains forward-looking statements that involve risks and uncertainties. Actual results may differ materially from the results predicted."
};

// ============================================================================
// COMPONENT
// ============================================================================

export const CopperWireLanguage: React.FC = () => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container space-y-8">

            {/* Hero Section */}
            <div className="text-center space-y-4 pb-6 border-b border-white/10">
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                    <span className="text-amber-400 font-bold text-sm tracking-wider">WIRE 1.0 — LAUNCHING SPRING 2026</span>
                </div>
                <h1 className="text-4xl font-bold text-white">
                    Wire Up Your AI
                </h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto">
                    The Copper Wire Language™ — how humans remember to program artificial intelligence.
                    Your creativity, our labor. You wire up the conversational cloud.
                </p>
            </div>

            {/* The Core Concept */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card-standard p-6 text-center">
                    <Sparkles className="w-10 h-10 text-flamingo mx-auto mb-3" />
                    <h3 className="text-template-title mb-2">{NAMING_STRUCTURE.ai.new}</h3>
                    <p className="text-template-subtitle">{NAMING_STRUCTURE.ai.description}</p>
                    <p className="text-sm text-amber-400 mt-2 italic">"{NAMING_STRUCTURE.ai.metaphor}"</p>
                </div>
                <div className="glass-card-standard p-6 text-center">
                    <Cable className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <h3 className="text-template-title mb-2">The Bridge</h3>
                    <p className="text-template-subtitle">{NAMING_STRUCTURE.bridge.description}</p>
                    <p className="text-sm text-amber-400 mt-2 italic">formerly: navigateToSection</p>
                </div>
                <div className="glass-card-standard p-6 text-center">
                    <Users className="w-10 h-10 text-jade mx-auto mb-3" />
                    <h3 className="text-template-title mb-2">{NAMING_STRUCTURE.platform.new}</h3>
                    <p className="text-template-subtitle">{NAMING_STRUCTURE.platform.description}</p>
                    <p className="text-sm text-amber-400 mt-2 italic">"{NAMING_STRUCTURE.platform.metaphor}"</p>
                </div>
            </div>

            {/* The Copper Wires */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Cable className="w-6 h-6 text-amber-500" />
                    The Copper Wires
                </h2>
                <p className="text-white/60">These are what you program. Each wire connects your tele to a capability.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {NAMING_STRUCTURE.copperWires.map((wire, idx) => (
                        <div
                            key={idx}
                            className="glass-card-clickable p-5 hover:border-amber-500/50 transition-all cursor-pointer group"
                            onClick={() => handleAction(`Tell me about ${wire.new}`)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                                    <wire.icon className="w-6 h-6 text-amber-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-lg font-bold text-white">{wire.new}</span>
                                        <code className="text-xs px-2 py-0.5 rounded bg-flamingo/20 text-flamingo">{wire.command}</code>
                                    </div>
                                    <p className="text-sm text-white/40 line-through mb-1">was: {wire.old}</p>
                                    <p className="text-sm text-white/70">{wire.description}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {wire.examples.map((ex, i) => (
                                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50">{ex}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Wire Commands */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Wire Commands</h2>
                <p className="text-white/60">Type a command, describe what you want. The Architect does the rest.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {NAMING_STRUCTURE.commands.map((cmd, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer"
                            onClick={() => handleAction(`Explain ${cmd.new} command`)}
                        >
                            <code className="text-lg font-bold text-amber-400">{cmd.new}</code>
                            <p className="text-xs text-white/50 mt-1">{cmd.old !== "(new)" ? `was: ${cmd.old}` : "NEW"}</p>
                            <p className="text-sm text-white/70 mt-2">{cmd.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Proposed Powers */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-jade" />
                    Proposed Powers (12 New Capabilities)
                </h2>
                <p className="text-white/60">Future powers to grant your tele. Each is a copper wire to a new capability.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {NAMING_STRUCTURE.proposedPowers.map((power, idx) => (
                        <div
                            key={idx}
                            className="p-3 rounded-lg bg-jade/5 border border-jade/20 hover:border-jade/40 transition-all text-center cursor-pointer"
                            onClick={() => handleAction(`Tell me about the ${power.name} power`)}
                        >
                            <span className="text-lg font-bold text-jade">{power.name}</span>
                            <p className="text-xs text-white/50 mt-1">{power.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* The Agents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card-standard p-6">
                    <h3 className="text-xl font-bold text-white mb-2">The Architect</h3>
                    <p className="text-white/40 text-sm line-through mb-2">was: Build Agent / Claude</p>
                    <p className="text-white/70">{NAMING_STRUCTURE.agents.build.description}</p>
                    <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <p className="text-sm text-blue-400">Works during development. Builds panels, teaches memory, wires reflexes.</p>
                    </div>
                </div>
                <div className="glass-card-standard p-6">
                    <h3 className="text-xl font-bold text-white mb-2">The Performer</h3>
                    <p className="text-white/40 text-sm line-through mb-2">was: Runtime Agent / OpenAI</p>
                    <p className="text-white/70">{NAMING_STRUCTURE.agents.runtime.description}</p>
                    <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-sm text-green-400">Works in production. Talks to users, crosses the Bridge, displays panels.</p>
                    </div>
                </div>
            </div>

            {/* Press Release Section */}
            <div className="mt-8 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                {/* PR Header */}
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/10">
                    <div>
                        <span className="text-xs font-bold tracking-widest text-amber-400">{PRESS_RELEASE.type}</span>
                    </div>
                    <div className="text-right text-xs text-white/50">
                        <p><strong>Media Contact:</strong></p>
                        <p>{PRESS_RELEASE.contact.name}</p>
                        <p>{PRESS_RELEASE.contact.email}</p>
                        <p>{PRESS_RELEASE.contact.phone}</p>
                    </div>
                </div>

                {/* Headline */}
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{PRESS_RELEASE.headline}</h2>
                    <p className="text-lg text-white/60 mt-2 italic">{PRESS_RELEASE.subheadline}</p>
                </div>

                {/* Dateline + Body */}
                <div className="prose prose-invert max-w-none text-white/80 text-sm leading-relaxed mb-8">
                    <p className="mb-4">
                        <strong>{PRESS_RELEASE.location}</strong> — {PRESS_RELEASE.date} — {PRESS_RELEASE.body.split('\n\n')[0]}
                    </p>
                    {PRESS_RELEASE.body.split('\n\n').slice(1).map((para, idx) => (
                        <p key={idx} className="mb-4 whitespace-pre-line">{para}</p>
                    ))}
                </div>

                {/* Quotes */}
                <div className="space-y-6 mb-8">
                    {PRESS_RELEASE.quotes.map((quote, idx) => (
                        <blockquote key={idx} className="border-l-4 border-flamingo pl-6 py-2">
                            <p className="text-base text-white italic">"{quote.text}"</p>
                            <footer className="mt-2 text-sm text-white/60">
                                — <strong className="text-flamingo">{quote.author}</strong>, {quote.title}
                            </footer>
                        </blockquote>
                    ))}
                </div>

                {/* About Section */}
                <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-bold text-white mb-2">About Mobeus</h4>
                    <p className="text-xs text-white/60 leading-relaxed">{PRESS_RELEASE.about}</p>
                </div>

                {/* Legal */}
                <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-[10px] text-white/30 italic">{PRESS_RELEASE.legal}</p>
                </div>

                {/* End Mark */}
                <div className="text-center mt-6">
                    <span className="text-white/40 font-bold">###</span>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-6">
                <button
                    onClick={() => handleAction("Start learning the Copper Wire Language")}
                    className="btn-cta text-lg px-8 py-4"
                >
                    Start Learning the Language
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CopperWireLanguage;
