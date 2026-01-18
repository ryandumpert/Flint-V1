/**
 * ToolCard
 * Shows a tool or file with description, location, and code example
 * Perfect for explaining tools they'll use at the hackathon
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { FileCode, FolderOpen, Terminal, ChevronRight, Copy, Check } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ToolCardProps {
    name?: string;
    type?: 'file' | 'command' | 'workflow';
    location?: string;
    description?: string;
    purpose?: string;
    codeExample?: string;
    codeLanguage?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const TYPE_ICONS = {
    file: FileCode,
    command: Terminal,
    workflow: FolderOpen,
};

const TYPE_COLORS = {
    file: 'sapphire',
    command: 'jade',
    workflow: 'turmeric',
};

const TYPE_LABELS = {
    file: 'FILE',
    command: 'COMMAND',
    workflow: 'WORKFLOW',
};

export const ToolCard: React.FC<ToolCardProps> = ({
    name = 'tool-name',
    type = 'file',
    location = 'location/path',
    description = 'What this tool does',
    purpose = 'Why you need it at the hackathon',
    codeExample,
    codeLanguage = 'typescript',
    ctaLabel = 'Learn More',
    ctaActionPhrase = 'Go home'
}) => {
    const { playClick } = useSound();
    const [copied, setCopied] = React.useState(false);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const handleCopy = () => {
        if (codeExample) {
            navigator.clipboard.writeText(codeExample);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const IconComponent = TYPE_ICONS[type];
    const color = TYPE_COLORS[type];
    const label = TYPE_LABELS[type];

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-${color}/20 border border-${color}/40 flex items-center justify-center`}>
                    <IconComponent className={`w-7 h-7 text-${color}`} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <span className={`template-badge-${color === 'sapphire' ? 'sapphire' : color === 'jade' ? 'sapphire' : 'turmeric'}`}>{label}</span>
                    </div>
                    <h2 className="text-template-title text-2xl font-mono">{name}</h2>
                    <p className="text-mist/60 text-sm font-mono">{location}</p>
                </div>
            </div>

            {/* Description */}
            <div className="glass-card-minimal p-5 mb-4">
                <h3 className="text-template-subtitle mb-2">What it does</h3>
                <p className="text-template-content">{description}</p>
            </div>

            {/* Purpose */}
            <div className="glass-card-minimal p-5 mb-6">
                <h3 className="text-template-subtitle mb-2">Why you need it</h3>
                <p className="text-template-content">{purpose}</p>
            </div>

            {/* Code Example */}
            {codeExample && (
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-template-subtitle">Example</h3>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1 text-mist/60 hover:text-mist text-sm transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-jade" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="glass-card-minimal p-4 overflow-x-auto">
                        <pre className="text-sm font-mono text-mist/90">
                            <code>{codeExample}</code>
                        </pre>
                    </div>
                </div>
            )}

            {/* CTA */}
            <button
                className="btn-sapphire w-full py-3 text-lg flex items-center justify-center gap-2"
                onClick={() => handleAction(ctaActionPhrase)}
            >
                {ctaLabel}
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ToolCard;
