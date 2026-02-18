/**
 * Contract Analysis Utilities
 * Provides the issue taxonomy, analysis output structures, and helper functions
 * for wiring AI analysis responses into the ContractContext.
 *
 * The actual analysis is performed by the AI persona (Flint) via the LLM.
 * This module bridges the AI output (JSON from glass subsections) into the
 * typed ContractContext state.
 */

import type { Issue, Severity, RiskType, SuggestedEdit, Anchor } from '@/contexts/ContractContext';

// ─── Issue Taxonomy (from blueprint.md) ──────────────────────────────────────

export const ISSUE_CATEGORIES = [
    'Parties & definitions',
    'Term & termination',
    'Payment & fees',
    'Scope of work / deliverables',
    'Change control',
    'IP ownership & licensing',
    'Confidentiality',
    'Data privacy & security',
    'Warranties',
    'Indemnification',
    'Limitation of liability',
    'Insurance',
    'Compliance / regulations',
    'Dispute resolution',
    'Governing law & venue',
    'Assignment / subcontracting',
    'Non-solicit / non-compete',
    'Service levels / uptime',
    'Audit rights',
    'Publicity',
    'Force majeure',
    'Notice',
    'Survival',
] as const;

export type IssueCategory = typeof ISSUE_CATEGORIES[number];

// ─── Severity Weights ────────────────────────────────────────────────────────

export const SEVERITY_WEIGHTS: Record<Severity, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
};

export const SEVERITY_ORDER: Severity[] = ['critical', 'high', 'medium', 'low'];

// ─── Risk Score Calculation ──────────────────────────────────────────────────

export function calculateRiskScore(issues: Issue[]): number {
    if (issues.length === 0) return 0;

    const totalWeight = issues.reduce((sum, issue) => {
        const sevWeight = SEVERITY_WEIGHTS[issue.severity] || 1;
        const conf = issue.confidence || 0.5;
        return sum + (sevWeight * conf);
    }, 0);

    // Normalize: max possible per issue is 4 (critical) * 1 (100% confidence)
    const maxPossible = issues.length * 4;
    return Math.round((totalWeight / maxPossible) * 100);
}

export function riskScoreLabel(score: number): { label: string; severity: Severity } {
    if (score >= 75) return { label: 'High Risk', severity: 'critical' };
    if (score >= 50) return { label: 'Elevated Risk', severity: 'high' };
    if (score >= 25) return { label: 'Moderate Risk', severity: 'medium' };
    return { label: 'Low Risk', severity: 'low' };
}

// ─── Issue Count Helpers ─────────────────────────────────────────────────────

export function countBySeverity(issues: Issue[]): Record<Severity, number> {
    const counts: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    issues.forEach(issue => { counts[issue.severity]++; });
    return counts;
}

export function countByCategory(issues: Issue[]): Record<string, number> {
    const counts: Record<string, number> = {};
    issues.forEach(issue => {
        counts[issue.category] = (counts[issue.category] || 0) + 1;
    });
    return counts;
}

// ─── Anchor Helpers ──────────────────────────────────────────────────────────

/**
 * Attempt to locate an issue's anchor in the contract text.
 * Falls back to quote-matching if offset bounding doesn't work.
 */
export function resolveAnchor(
    anchor: Anchor,
    quote: string,
    contractText: string
): { start: number; end: number; method: 'offset' | 'quote' | 'failed' } {
    // 1) Try offset-based
    if (
        anchor.start >= 0 &&
        anchor.end <= contractText.length &&
        anchor.start < anchor.end
    ) {
        const slice = contractText.slice(anchor.start, anchor.end);
        // Verify the text at this offset roughly matches the quote
        if (quote && slice.includes(quote.slice(0, 30))) {
            return { start: anchor.start, end: anchor.end, method: 'offset' };
        }
    }

    // 2) Fallback: search for the quote in the text
    if (quote) {
        const idx = contractText.indexOf(quote);
        if (idx !== -1) {
            return { start: idx, end: idx + quote.length, method: 'quote' };
        }

        // 3) Fuzzy: try first 50 chars of quote
        const partial = quote.slice(0, 50);
        const partialIdx = contractText.indexOf(partial);
        if (partialIdx !== -1) {
            return { start: partialIdx, end: partialIdx + quote.length, method: 'quote' };
        }
    }

    return { start: -1, end: -1, method: 'failed' };
}

// ─── AI Response Parsing ─────────────────────────────────────────────────────

/**
 * Parse a raw AI-generated issue object into a typed Issue.
 * This is used when the AI returns analysis results through the chat.
 */
export function parseIssueFromAI(
    raw: Record<string, unknown>,
    contractVersionId: string,
    contractText: string
): Issue | null {
    try {
        const title = String(raw.title || 'Untitled Issue');
        const category = String(raw.category || 'General');
        const severity = validateSeverity(raw.severity);
        const riskType = validateRiskType(raw.riskType);
        const confidence = typeof raw.confidence === 'number'
            ? Math.max(0, Math.min(1, raw.confidence))
            : 0.5;
        const quote = String(raw.quote || '');
        const whyConcern = String(raw.whyConcern || raw.explanation || '');

        // Parse anchor
        const rawAnchor = raw.anchor as Record<string, unknown> | undefined;
        const anchor: Anchor = {
            start: typeof rawAnchor?.start === 'number' ? rawAnchor.start : -1,
            end: typeof rawAnchor?.end === 'number' ? rawAnchor.end : -1,
            fingerprint: typeof rawAnchor?.fingerprint === 'string' ? rawAnchor.fingerprint : undefined,
        };

        // Resolve the anchor against actual text
        const resolved = resolveAnchor(anchor, quote, contractText);

        // Parse suggested edits
        const suggestedEdits: SuggestedEdit[] = [];
        if (Array.isArray(raw.suggestedEdits)) {
            for (const edit of raw.suggestedEdits) {
                const e = edit as Record<string, unknown>;
                suggestedEdits.push({
                    type: validateEditType(e.type),
                    proposedText: typeof e.proposedText === 'string' ? e.proposedText : undefined,
                    replacementText: typeof e.replacementText === 'string' ? e.replacementText : undefined,
                    value: String(e.value || ''),
                    tradeoffs: typeof e.tradeoffs === 'string' ? e.tradeoffs : undefined,
                });
            }
        }

        // Parse discussion prompts
        const discussionPrompts = Array.isArray(raw.discussionPrompts)
            ? raw.discussionPrompts.map(String)
            : undefined;

        return {
            id: `issue_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            contractVersionId,
            title,
            category,
            severity,
            riskType,
            confidence,
            anchor: { start: resolved.start, end: resolved.end, fingerprint: anchor.fingerprint },
            quote,
            whyConcern,
            suggestedEdits,
            discussionPrompts,
            createdAt: Date.now(),
        };
    } catch (err) {
        console.warn('[contractAnalysis] Failed to parse issue:', err);
        return null;
    }
}

/**
 * Parse multiple issues from an AI response array.
 */
export function parseIssuesFromAI(
    rawIssues: Record<string, unknown>[],
    contractVersionId: string,
    contractText: string
): Issue[] {
    return rawIssues
        .map(raw => parseIssueFromAI(raw, contractVersionId, contractText))
        .filter((issue): issue is Issue => issue !== null);
}

// ─── Validation Helpers ──────────────────────────────────────────────────────

function validateSeverity(val: unknown): Severity {
    const s = String(val).toLowerCase();
    if (['critical', 'high', 'medium', 'low'].includes(s)) return s as Severity;
    return 'medium';
}

function validateRiskType(val: unknown): RiskType {
    const r = String(val).toLowerCase();
    if (['legal', 'commercial', 'operational', 'security', 'privacy', 'compliance'].includes(r)) return r as RiskType;
    return 'legal';
}

function validateEditType(val: unknown): 'add' | 'remove' | 'change' {
    const e = String(val).toLowerCase();
    if (['add', 'remove', 'change'].includes(e)) return e as 'add' | 'remove' | 'change';
    return 'change';
}

// ─── Summary Builders ────────────────────────────────────────────────────────

/**
 * Build ContractSummary template props from issues and metadata.
 */
export function buildSummaryProps(
    issues: Issue[],
    metadata?: {
        title?: string;
        overview?: string;
        parties?: string;
        term?: string;
        paymentBasics?: string;
        terminationRights?: string;
    }
): Record<string, unknown> {
    const counts = countBySeverity(issues);
    const topRisks = issues
        .filter(i => i.severity === 'critical' || i.severity === 'high')
        .sort((a, b) => SEVERITY_WEIGHTS[b.severity] - SEVERITY_WEIGHTS[a.severity])
        .slice(0, 5)
        .map(i => ({
            title: i.title,
            severity: i.severity,
            actionPhrase: `show me the ${i.category.toLowerCase()} issue "${i.title}"`,
        }));

    return {
        headline: 'Contract Summary',
        subheadline: metadata?.title,
        overview: metadata?.overview,
        parties: metadata?.parties,
        term: metadata?.term,
        paymentBasics: metadata?.paymentBasics,
        terminationRights: metadata?.terminationRights,
        totalIssues: issues.length,
        criticalCount: counts.critical,
        highCount: counts.high,
        mediumCount: counts.medium,
        lowCount: counts.low,
        keyRisks: topRisks,
        ctaLabel: 'View All Issues',
        ctaActionPhrase: 'show me all the issues',
    };
}

/**
 * Build IssueCard template props from an Issue object.
 */
export function buildIssueCardProps(issue: Issue): Record<string, unknown> {
    return {
        title: issue.title,
        category: issue.category,
        severity: issue.severity,
        riskType: issue.riskType,
        confidence: issue.confidence,
        quote: issue.quote,
        whyConcern: issue.whyConcern,
        suggestedEdits: issue.suggestedEdits.map(edit => ({
            type: edit.type,
            proposedText: edit.proposedText,
            replacementText: edit.replacementText,
            value: edit.value,
            tradeoffs: edit.tradeoffs,
        })),
        discussionPrompts: issue.discussionPrompts,
        goToClauseActionPhrase: `go to the ${issue.category.toLowerCase()} clause`,
        askAboutActionPhrase: `tell me more about "${issue.title}"`,
    };
}

/**
 * Build ContractViewer highlight anchors from resolved issues.
 */
export function buildViewerHighlights(
    issues: Issue[],
    contractText: string
): Array<{
    issueId: string;
    title: string;
    severity: Severity;
    start: number;
    end: number;
    quote: string;
}> {
    return issues
        .map(issue => {
            const resolved = resolveAnchor(issue.anchor, issue.quote, contractText);
            if (resolved.method === 'failed') return null;

            return {
                issueId: issue.id,
                title: issue.title,
                severity: issue.severity,
                start: resolved.start,
                end: resolved.end,
                quote: issue.quote,
            };
        })
        .filter((h): h is NonNullable<typeof h> => h !== null);
}
