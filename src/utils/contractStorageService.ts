/**
 * contractStorageService.ts — Client-side service for persisting contracts to Supabase
 *
 * Handles saving, listing, and loading contracts from the backend.
 * Works alongside contractAnalysisService.ts (which handles Gemini analysis).
 */

import type { AnalysisResponse } from './contractAnalysisService';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StoredContractSummary {
    id: string;
    filename: string;
    wordCount: number;
    charCount: number;
    pageCount: number | null;
    fileType: string | null;
    uploadedAt: string;
    hasAnalysis: boolean;
    summary: string | null;
    issueCount: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
}

export interface StoredContract {
    id: string;
    filename: string;
    fullText: string;
    wordCount: number;
    charCount: number;
    pageCount: number | null;
    fileType: string | null;
    uploadedAt: string;
    analysis: {
        id: string;
        summary: AnalysisResponse['summary'];
        issues: AnalysisResponse['issues'];
        obligations: AnalysisResponse['obligations'];
        financialTerms: AnalysisResponse['financialTerms'];
        modelUsed: string;
        analyzedAt: string;
    } | null;
}

// ─── Save Contract + Analysis ────────────────────────────────────────────────

export async function saveContractToStorage(
    contractText: string,
    fileName: string,
    analysis: AnalysisResponse,
    options?: {
        fileType?: string;
        wordCount?: number;
        charCount?: number;
        pageCount?: number;
    }
): Promise<{ contractId: string; analysisId: string | null }> {
    const response = await fetch('/.netlify/functions/save-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contractText,
            fileName,
            fileType: options?.fileType,
            wordCount: options?.wordCount,
            charCount: options?.charCount,
            pageCount: options?.pageCount,
            analysis,
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Save failed with status ${response.status}`);
    }

    const result = await response.json();
    return {
        contractId: result.contractId,
        analysisId: result.analysisId,
    };
}

// ─── List All Contracts ──────────────────────────────────────────────────────

export async function listContracts(): Promise<StoredContractSummary[]> {
    const response = await fetch('/.netlify/functions/get-contracts');

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Failed to fetch contracts: ${response.status}`);
    }

    const data = await response.json();
    return data.contracts || [];
}

// ─── Load a Specific Contract ────────────────────────────────────────────────

export async function loadContract(contractId: string): Promise<StoredContract> {
    const response = await fetch(`/.netlify/functions/get-contract?id=${contractId}`);

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Failed to load contract: ${response.status}`);
    }

    const data = await response.json();
    return data.contract;
}
