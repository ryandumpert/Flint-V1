/**
 * Contract Context — In-memory contract state for Flint
 * Stores the active contract text, metadata, and analysis results.
 * No persistence — everything is session-scoped.
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ─── Data Model (from blueprint.md) ──────────────────────────────────────────

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type RiskType = 'legal' | 'commercial' | 'operational' | 'security' | 'privacy' | 'compliance';
export type EditType = 'add' | 'remove' | 'change';

export interface Anchor {
    start: number;
    end: number;
    fingerprint?: string;
    contextWindow?: { before: number; after: number };
}

export interface SuggestedEdit {
    type: EditType;
    proposedText?: string;
    replacementText?: string;
    target?: Anchor;
    value: string;        // why it helps
    tradeoffs?: string;
}

export interface Issue {
    id: string;
    contractVersionId: string;
    title: string;
    category: string;
    severity: Severity;
    riskType: RiskType;
    confidence: number;   // 0–1
    anchor: Anchor;
    quote: string;
    whyConcern: string;
    suggestedEdits: SuggestedEdit[];
    discussionPrompts?: string[];
    createdAt: number;
}

export interface ContractMetadata {
    title: string;
    counterparty?: string;
    jurisdiction?: string;
    type?: string;
    sourceFilename?: string;
    mimeType?: string;
    sizeBytes?: number;
}

export interface ContractVersion {
    id: string;
    extractedText: string;
    textHash: string;
    metadata: ContractMetadata;
    createdAt: number;
}

export type AnalysisStatus = 'idle' | 'uploading' | 'extracting' | 'analyzing' | 'complete' | 'error';

// ─── Context Shape ───────────────────────────────────────────────────────────

interface ContractContextValue {
    // Current contract
    activeVersion: ContractVersion | null;
    issues: Issue[];
    analysisStatus: AnalysisStatus;
    analysisError: string | null;

    // Actions
    setContractText: (text: string, metadata?: Partial<ContractMetadata>) => void;
    setIssues: (issues: Issue[]) => void;
    setAnalysisStatus: (status: AnalysisStatus) => void;
    setAnalysisError: (error: string | null) => void;
    clearContract: () => void;

    // Derived
    hasContract: boolean;
    hasIssues: boolean;
    issuesBySeverity: Record<Severity, Issue[]>;
    issuesByCategory: Record<string, Issue[]>;
}

const ContractContext = createContext<ContractContextValue | null>(null);

// ─── Simple hash for caching ─────────────────────────────────────────────────

function simpleHash(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
}

// ─── Provider ────────────────────────────────────────────────────────────────

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeVersion, setActiveVersion] = useState<ContractVersion | null>(null);
    const [issues, setIssuesState] = useState<Issue[]>([]);
    const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    const setContractText = useCallback((text: string, metadata?: Partial<ContractMetadata>) => {
        const version: ContractVersion = {
            id: `cv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            extractedText: text,
            textHash: simpleHash(text),
            metadata: {
                title: metadata?.title || 'Untitled Contract',
                counterparty: metadata?.counterparty,
                jurisdiction: metadata?.jurisdiction,
                type: metadata?.type,
                sourceFilename: metadata?.sourceFilename,
                mimeType: metadata?.mimeType,
                sizeBytes: metadata?.sizeBytes || new Blob([text]).size,
            },
            createdAt: Date.now(),
        };
        setActiveVersion(version);
        setIssuesState([]);
        setAnalysisStatus('idle');
        setAnalysisError(null);
    }, []);

    const setIssues = useCallback((newIssues: Issue[]) => {
        setIssuesState(newIssues);
    }, []);

    const clearContract = useCallback(() => {
        setActiveVersion(null);
        setIssuesState([]);
        setAnalysisStatus('idle');
        setAnalysisError(null);
    }, []);

    // Derived data
    const hasContract = activeVersion !== null && activeVersion.extractedText.length > 0;
    const hasIssues = issues.length > 0;

    const issuesBySeverity = issues.reduce<Record<Severity, Issue[]>>((acc, issue) => {
        acc[issue.severity] = acc[issue.severity] || [];
        acc[issue.severity].push(issue);
        return acc;
    }, { low: [], medium: [], high: [], critical: [] });

    const issuesByCategory = issues.reduce<Record<string, Issue[]>>((acc, issue) => {
        acc[issue.category] = acc[issue.category] || [];
        acc[issue.category].push(issue);
        return acc;
    }, {});

    const value: ContractContextValue = {
        activeVersion,
        issues,
        analysisStatus,
        analysisError,
        setContractText,
        setIssues,
        setAnalysisStatus,
        setAnalysisError,
        clearContract,
        hasContract,
        hasIssues,
        issuesBySeverity,
        issuesByCategory,
    };

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    );
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useContract(): ContractContextValue {
    const ctx = useContext(ContractContext);
    if (!ctx) {
        throw new Error('useContract must be used within a ContractProvider');
    }
    return ctx;
}

export default ContractContext;
