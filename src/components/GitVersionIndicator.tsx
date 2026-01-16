import React, { useState, useEffect } from 'react';

/**
 * STATIC BUILD INFO
 * Updated manually by engineer - do NOT rely on automated generation
 * Last updated: Jan 16, 2026, 1:04 AM EST
 */
const STATIC_BUILD_INFO = {
    hash: 'static',
    timestamp: 'Jan 16, 2026, 1:04 AM',
    author: 'Richie Etwaru',
    branch: 'main',
};

export const GitVersionIndicator: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        // Listen for chat state changes
        const handleChatStateChange = (event: CustomEvent) => {
            setIsChatOpen(event.detail?.isOpen || false);
        };

        window.addEventListener('chatStateChange' as any, handleChatStateChange);

        return () => {
            window.removeEventListener('chatStateChange' as any, handleChatStateChange);
        };
    }, []);

    if (isChatOpen) return null;

    return (
        <div
            className="fixed top-4 right-4 z-50 pointer-events-none select-none transition-opacity duration-300"
            style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.175)',
                letterSpacing: '0.5px',
                textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                textAlign: 'right',
                lineHeight: '1.5',
            }}
        >
            <div style={{ fontSize: '10px', opacity: 0.6 }}>Last Compiled</div>
            <div style={{ fontWeight: 'bold' }}>{STATIC_BUILD_INFO.timestamp}</div>
            <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px' }}>Engineer</div>
            <div style={{ fontWeight: 'bold' }}>{STATIC_BUILD_INFO.author}</div>
            <div style={{ fontSize: '9px', opacity: 0.4, marginTop: '4px' }}>{STATIC_BUILD_INFO.hash} · {STATIC_BUILD_INFO.branch}</div>
        </div>
    );
};
