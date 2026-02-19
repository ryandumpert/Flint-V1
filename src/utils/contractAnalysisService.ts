/**
 * contractAnalysisService.ts — Client-side service for contract analysis
 * 
 * Calls the Netlify serverless function to analyze contracts via Gemini,
 * then maps the response into the app's ContractContext data model.
 */

import type { Issue, Severity, SuggestedEdit, Anchor } from '@/contexts/ContractContext';

// ─── API Response Types ──────────────────────────────────────────────────────

export interface AnalysisResponse {
    summary: {
        overview: string;
        parties?: string;
        contractType?: string;
        term?: string;
        paymentBasics?: string;
        terminationRights?: string;
        jurisdiction?: string;
    };
    issues: RawIssue[];
    obligations: RawObligation[];
    financialTerms: RawFinancialTerm[];
    meta: {
        model: string;
        analyzedAt: string;
        contractLength: number;
        fileName: string;
    };
}

interface RawIssue {
    id: string;
    title: string;
    category: string;
    severity: Severity;
    riskType: string;
    confidence: number;
    quote: string;
    anchorStart?: number;
    anchorEnd?: number;
    whyConcern: string;
    suggestedEdits: Array<{
        type: 'add' | 'remove' | 'change';
        proposedText?: string;
        replacementText?: string;
        value: string;
        tradeoffs?: string;
    }>;
    discussionPrompts?: string[];
}

export interface RawObligation {
    id: string;
    obligation: string;
    owner: string;
    deadline: string;
    severity?: Severity;
    clauseReference?: string;
}

export interface RawFinancialTerm {
    id: string;
    category: string;
    description: string;
    amount?: string;
    severity?: Severity;
    note?: string;
}

// ─── API Call ────────────────────────────────────────────────────────────────

const API_URL = '/.netlify/functions/analyze-contract';

export async function analyzeContract(
    contractText: string,
    fileName: string
): Promise<AnalysisResponse> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractText, fileName }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(
            errorBody.error || `Analysis failed with status ${response.status}`
        );
    }

    return response.json();
}

// ─── Map to ContractContext Issue[] ──────────────────────────────────────────

export function mapToIssues(
    rawIssues: RawIssue[],
    contractVersionId: string
): Issue[] {
    return rawIssues.map((raw) => {
        const anchor: Anchor = {
            start: raw.anchorStart ?? 0,
            end: raw.anchorEnd ?? 0,
            fingerprint: raw.quote?.slice(0, 50),
        };

        const suggestedEdits: SuggestedEdit[] = (raw.suggestedEdits || []).map((edit) => ({
            type: edit.type,
            proposedText: edit.proposedText,
            replacementText: edit.replacementText,
            value: edit.value,
            tradeoffs: edit.tradeoffs,
        }));

        return {
            id: raw.id,
            contractVersionId,
            title: raw.title,
            category: raw.category,
            severity: raw.severity,
            riskType: raw.riskType as Issue['riskType'],
            confidence: raw.confidence,
            anchor,
            quote: raw.quote,
            whyConcern: raw.whyConcern,
            suggestedEdits,
            discussionPrompts: raw.discussionPrompts,
            createdAt: Date.now(),
        };
    });
}

// ─── Build Flint notification message ────────────────────────────────────────

export function buildFlintNotification(analysis: AnalysisResponse): string {
    const { summary, issues, obligations, financialTerms } = analysis;

    const severityCounts = {
        critical: issues.filter(i => i.severity === 'critical').length,
        high: issues.filter(i => i.severity === 'high').length,
        medium: issues.filter(i => i.severity === 'medium').length,
        low: issues.filter(i => i.severity === 'low').length,
    };

    const categories = [...new Set(issues.map(i => i.category))];

    // Sort issues by severity priority for top issues
    const severityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    const sortedIssues = [...issues].sort((a, b) =>
        (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3)
    );
    const topIssues = sortedIssues.slice(0, 5);

    const parts = [
        `Contract analysis complete for "${analysis.meta.fileName}".`,
        ``,
        `CONTRACT DETAILS:`,
        `- Type: ${summary.contractType || 'Not specified'}`,
        `- Parties: ${summary.parties || 'Not specified'}`,
        `- Term: ${summary.term || 'Not specified'}`,
        `- Payment: ${summary.paymentBasics || 'Not specified'}`,
        `- Termination: ${summary.terminationRights || 'Not specified'}`,
        `- Jurisdiction: ${summary.jurisdiction || 'Not specified'}`,
        ``,
        `SUMMARY: ${summary.overview}`,
        ``,
        `ISSUES FOUND: ${issues.length} total`,
        severityCounts.critical > 0 ? `  🔴 ${severityCounts.critical} critical` : '',
        severityCounts.high > 0 ? `  🟠 ${severityCounts.high} high` : '',
        severityCounts.medium > 0 ? `  🟡 ${severityCounts.medium} medium` : '',
        severityCounts.low > 0 ? `  🟢 ${severityCounts.low} low` : '',
        ``,
        `Categories: ${categories.join(', ')}`,
        obligations.length > 0 ? `Obligations: ${obligations.length} tracked` : '',
        financialTerms.length > 0 ? `Financial terms: ${financialTerms.length} identified` : '',
        ``,
        `TOP ISSUES (use these to populate IssueCard templates):`,
    ];

    topIssues.forEach((issue, idx) => {
        const edits = (issue.suggestedEdits || [])
            .map(e => `${e.type}: "${e.proposedText || ''}" → "${e.replacementText || ''}" (${e.value})`)
            .join('; ');
        parts.push(
            ``,
            `Issue ${idx + 1}: "${issue.title}"`,
            `  Severity: ${issue.severity} | Category: ${issue.category} | Risk: ${issue.riskType}`,
            `  Quote: "${issue.quote}"`,
            `  Concern: ${issue.whyConcern}`,
            edits ? `  Suggested edits: ${edits}` : '',
        );
    });

    parts.push(
        ``,
        `INSTRUCTIONS: First show the ComplianceConsent disclaimer. After user confirms, present ContractSummary with the data above, then show IssueCards for the top issues. Use the REAL data provided above — do not make up different issues.`,
    );

    return parts.filter(Boolean).join('\n');
}
