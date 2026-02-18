/**
 * contractGrounding.ts — Chat context enrichment for contract analysis
 *
 * Injects contract context into chat messages so Flint has awareness of:
 * - Contract text availability on window.__flintContractText
 * - Current analysis results (issues, severity counts)
 * - Active navigation state (focused issue, active section)
 *
 * Phase 5: Conversation + Navigation
 */

import type { Issue, Severity } from '@/contexts/ContractContext';

// ─── Severity Counts ────────────────────────────────────────────────────────

export function getIssueSeverityCounts(issues: Issue[]): Record<Severity, number> {
    const counts: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const issue of issues) {
        counts[issue.severity] = (counts[issue.severity] || 0) + 1;
    }
    return counts;
}

// ─── Contract Context Summary ────────────────────────────────────────────────

export interface ContractSummaryContext {
    hasContract: boolean;
    fileName: string;
    wordCount: number;
    charCount: number;
    pageCount?: number;
    issueCount: number;
    severityCounts: Record<Severity, number>;
    topCategories: string[];
}

/**
 * Build a compact summary of the current contract state
 * for injection into chat context.
 */
export function buildContractSummaryContext(
    contractText: string | null,
    issues: Issue[],
    meta?: { fileName?: string; wordCount?: number; charCount?: number; pageCount?: number }
): ContractSummaryContext {
    if (!contractText || contractText.length === 0) {
        return {
            hasContract: false,
            fileName: '',
            wordCount: 0,
            charCount: 0,
            issueCount: 0,
            severityCounts: { critical: 0, high: 0, medium: 0, low: 0 },
            topCategories: [],
        };
    }

    const words = contractText.split(/\s+/).filter(w => w.length > 0).length;

    // Count categories
    const catCounts: Record<string, number> = {};
    for (const issue of issues) {
        catCounts[issue.category] = (catCounts[issue.category] || 0) + 1;
    }
    const topCategories = Object.entries(catCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([cat]) => cat);

    return {
        hasContract: true,
        fileName: meta?.fileName || 'Uploaded Contract',
        wordCount: meta?.wordCount || words,
        charCount: meta?.charCount || contractText.length,
        pageCount: meta?.pageCount,
        issueCount: issues.length,
        severityCounts: getIssueSeverityCounts(issues),
        topCategories,
    };
}

// ─── Chat Message Grounding ──────────────────────────────────────────────────

/**
 * Enrich a user chat message with contract context.
 * This prepends a compact context block that Flint can reference.
 *
 * Only adds context when the user's message appears contract-related.
 */
export function groundMessageWithContract(
    userMessage: string,
    summary: ContractSummaryContext
): string {
    if (!summary.hasContract) {
        return userMessage; // No contract loaded, pass through
    }

    // Check if this message is contract-related
    const contractKeywords = [
        'contract', 'clause', 'risk', 'issue', 'section', 'liability',
        'indemnif', 'terminat', 'obligation', 'payment', 'penalty',
        'summarize', 'review', 'analyze', 'draft', 'safer', 'alternative',
        'financial', 'money', 'deadline', 'critical', 'high', 'medium', 'low',
        'red flag', 'concern', 'suggest', 'edit', 'find', 'show',
    ];

    const lower = userMessage.toLowerCase();
    const isContractRelated = contractKeywords.some(kw => lower.includes(kw));

    if (!isContractRelated) {
        return userMessage; // Not contract-related, pass through
    }

    // Build compact context prefix
    const parts: string[] = [];
    parts.push(`[Contract loaded: "${summary.fileName}" — ${summary.wordCount.toLocaleString()} words]`);

    if (summary.issueCount > 0) {
        const sev = summary.severityCounts;
        const sevStr = [
            sev.critical > 0 ? `${sev.critical} critical` : '',
            sev.high > 0 ? `${sev.high} high` : '',
            sev.medium > 0 ? `${sev.medium} medium` : '',
            sev.low > 0 ? `${sev.low} low` : '',
        ].filter(Boolean).join(', ');
        parts.push(`[${summary.issueCount} issues: ${sevStr}]`);
    }

    if (summary.topCategories.length > 0) {
        parts.push(`[Top categories: ${summary.topCategories.join(', ')}]`);
    }

    return `${parts.join(' ')}\n\n${userMessage}`;
}

// ─── Navigate-to-Clause Helpers ──────────────────────────────────────────────

/**
 * Parse a user request like "show me the termination clause" or
 * "go to the indemnification section" into a search query.
 *
 * Returns null if the message doesn't appear to be a navigation request.
 */
export function parseClauseNavigationRequest(
    userMessage: string
): { searchQuery: string; sectionName: string } | null {
    const lower = userMessage.toLowerCase().trim();

    // Patterns: "show me the X clause", "go to X", "find X section", "navigate to X"
    const patterns = [
        /(?:show me|go to|find|navigate to|jump to|take me to)\s+(?:the\s+)?(.+?)(?:\s+clause|\s+section|\s+provision|\s+paragraph|\s+article)?$/i,
        /(?:where is|what does)\s+(?:the\s+)?(.+?)(?:\s+clause|\s+section|\s+say)?/i,
        /(?:read|show)\s+(?:section|clause|article)\s+(.+)/i,
    ];

    for (const pattern of patterns) {
        const match = lower.match(pattern);
        if (match && match[1]) {
            const sectionName = match[1].trim();
            // Only proceed if the extracted term is meaningful (> 2 chars)
            if (sectionName.length > 2) {
                return {
                    searchQuery: sectionName,
                    sectionName: sectionName.charAt(0).toUpperCase() + sectionName.slice(1),
                };
            }
        }
    }

    return null;
}

/**
 * Search the contract text for a clause/section reference.
 * Returns the character offset range of the first match, or null.
 */
export function findClauseInText(
    contractText: string,
    searchQuery: string
): { start: number; end: number; matchedText: string } | null {
    if (!contractText || !searchQuery) return null;

    const lower = contractText.toLowerCase();
    const query = searchQuery.toLowerCase();

    // Strategy 1: Look for section headers (e.g., "TERMINATION", "Section 5.2 Termination")
    const headerPatterns = [
        new RegExp(`(?:section|article|clause)\\s*\\d*\\.?\\d*\\s*[:.]?\\s*${escapeRegex(query)}`, 'i'),
        new RegExp(`\\b${escapeRegex(query)}\\b`, 'i'),
    ];

    for (const pattern of headerPatterns) {
        const match = contractText.match(pattern);
        if (match && match.index !== undefined) {
            // Expand to include surrounding context (up to next section header or 500 chars)
            const start = match.index;
            const nextHeader = contractText.slice(start + match[0].length)
                .search(/\n\s*(?:SECTION|ARTICLE|CLAUSE|\d+\.)/i);
            const end = nextHeader !== -1
                ? Math.min(start + match[0].length + nextHeader, start + 2000)
                : Math.min(start + 500, contractText.length);

            return {
                start,
                end,
                matchedText: contractText.slice(start, Math.min(start + 200, end)),
            };
        }
    }

    // Strategy 2: Simple substring search
    const idx = lower.indexOf(query);
    if (idx !== -1) {
        return {
            start: idx,
            end: Math.min(idx + query.length + 200, contractText.length),
            matchedText: contractText.slice(idx, Math.min(idx + 200, contractText.length)),
        };
    }

    return null;
}

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Issue Focus ─────────────────────────────────────────────────────────────

/**
 * Build a prompt for asking Flint about a specific issue.
 * Used by IssueCard "Ask about this" and ContractViewer highlight clicks.
 */
export function buildIssuePrompt(
    issue: { title: string; category: string; severity: string; quote?: string; whyConcern?: string },
    verb: string = 'tell me about'
): string {
    const parts = [
        `${verb} the "${issue.title}" issue`,
        `(${issue.category}, ${issue.severity} severity)`,
    ];
    if (issue.quote) {
        parts.push(`— the clause says: "${issue.quote.slice(0, 100)}${issue.quote.length > 100 ? '...' : ''}"`);
    }
    return parts.join(' ');
}
