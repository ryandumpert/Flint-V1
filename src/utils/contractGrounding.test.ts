/**
 * contractGrounding.test.ts — Unit tests for chat grounding utilities
 *
 * Tests: context building, message enrichment, clause navigation parsing,
 * clause search, and issue prompt building.
 *
 * Phase 7: Testing
 */

import { describe, it, expect } from 'vitest';
import {
    buildContractSummaryContext,
    groundMessageWithContract,
    parseClauseNavigationRequest,
    findClauseInText,
    buildIssuePrompt,
    getIssueSeverityCounts,
} from '@/utils/contractGrounding';
import type { Issue, Severity } from '@/contexts/ContractContext';

// ─── Helper: Create mock issue ───────────────────────────────────────────────

function mockIssue(overrides: Partial<Issue> = {}): Issue {
    return {
        id: 'issue_1',
        contractVersionId: 'cv_1',
        title: 'Test Issue',
        category: 'Liability',
        severity: 'high' as Severity,
        riskType: 'legal',
        confidence: 0.9,
        anchor: { start: 0, end: 100 },
        quote: 'Some contract text here',
        whyConcern: 'This is concerning because...',
        suggestedEdits: [],
        createdAt: Date.now(),
        ...overrides,
    };
}

// ─── getIssueSeverityCounts ──────────────────────────────────────────────────

describe('getIssueSeverityCounts', () => {
    it('counts issues by severity', () => {
        const issues = [
            mockIssue({ severity: 'critical' }),
            mockIssue({ severity: 'high' }),
            mockIssue({ severity: 'high' }),
            mockIssue({ severity: 'medium' }),
        ];
        const counts = getIssueSeverityCounts(issues);
        expect(counts.critical).toBe(1);
        expect(counts.high).toBe(2);
        expect(counts.medium).toBe(1);
        expect(counts.low).toBe(0);
    });

    it('returns zeros for empty array', () => {
        const counts = getIssueSeverityCounts([]);
        expect(counts).toEqual({ critical: 0, high: 0, medium: 0, low: 0 });
    });
});

// ─── buildContractSummaryContext ─────────────────────────────────────────────

describe('buildContractSummaryContext', () => {
    it('returns hasContract: false for null text', () => {
        const ctx = buildContractSummaryContext(null, []);
        expect(ctx.hasContract).toBe(false);
    });

    it('returns hasContract: false for empty text', () => {
        const ctx = buildContractSummaryContext('', []);
        expect(ctx.hasContract).toBe(false);
    });

    it('returns hasContract: true for valid text', () => {
        const ctx = buildContractSummaryContext('Some contract text', []);
        expect(ctx.hasContract).toBe(true);
    });

    it('counts words from text', () => {
        const ctx = buildContractSummaryContext('one two three four five', []);
        expect(ctx.wordCount).toBe(5);
    });

    it('uses metadata word count when provided', () => {
        const ctx = buildContractSummaryContext('text', [], { wordCount: 999 });
        expect(ctx.wordCount).toBe(999);
    });

    it('extracts top categories from issues', () => {
        const issues = [
            mockIssue({ category: 'Liability' }),
            mockIssue({ category: 'Liability' }),
            mockIssue({ category: 'Termination' }),
        ];
        const ctx = buildContractSummaryContext('text', issues);
        expect(ctx.topCategories[0]).toBe('Liability');
        expect(ctx.topCategories).toContain('Termination');
    });
});

// ─── groundMessageWithContract ───────────────────────────────────────────────

describe('groundMessageWithContract', () => {
    const activeSummary = buildContractSummaryContext(
        'Some contract text about liability and termination',
        [mockIssue({ severity: 'critical', category: 'Liability' })],
        { fileName: 'test.pdf', wordCount: 5000 }
    );

    it('passes through when no contract loaded', () => {
        const noContractSummary = buildContractSummaryContext(null, []);
        const result = groundMessageWithContract('hello', noContractSummary);
        expect(result).toBe('hello');
    });

    it('passes through non-contract-related messages', () => {
        const result = groundMessageWithContract('what time is it?', activeSummary);
        expect(result).toBe('what time is it?');
    });

    it('enriches contract-related messages', () => {
        const result = groundMessageWithContract('show me the top risks', activeSummary);
        expect(result).toContain('[Contract loaded:');
        expect(result).toContain('test.pdf');
        expect(result).toContain('show me the top risks');
    });

    it('includes severity counts when issues exist', () => {
        const result = groundMessageWithContract('summarize the contract', activeSummary);
        expect(result).toContain('1 critical');
    });

    it('includes top categories', () => {
        const result = groundMessageWithContract('find liability clause', activeSummary);
        expect(result).toContain('Liability');
    });
});

// ─── parseClauseNavigationRequest ────────────────────────────────────────────

describe('parseClauseNavigationRequest', () => {
    it('parses "show me the termination clause"', () => {
        const result = parseClauseNavigationRequest('show me the termination clause');
        expect(result).not.toBeNull();
        expect(result!.searchQuery).toContain('termination');
    });

    it('parses "go to indemnification"', () => {
        const result = parseClauseNavigationRequest('go to indemnification');
        expect(result).not.toBeNull();
        expect(result!.searchQuery).toContain('indemnification');
    });

    it('parses "find the liability section"', () => {
        const result = parseClauseNavigationRequest('find the liability section');
        expect(result).not.toBeNull();
        expect(result!.searchQuery).toContain('liability');
    });

    it('parses "navigate to payment terms"', () => {
        const result = parseClauseNavigationRequest('navigate to payment terms');
        expect(result).not.toBeNull();
        expect(result!.searchQuery).toContain('payment terms');
    });

    it('returns null for non-navigation messages', () => {
        expect(parseClauseNavigationRequest('hello there')).toBeNull();
        expect(parseClauseNavigationRequest('what is the weather')).toBeNull();
    });

    it('returns null for very short search terms', () => {
        // "go to X" where X is < 3 chars
        expect(parseClauseNavigationRequest('go to AB')).toBeNull();
    });

    it('capitalizes section name', () => {
        const result = parseClauseNavigationRequest('show me the termination clause');
        expect(result!.sectionName[0]).toBe(result!.sectionName[0].toUpperCase());
    });
});

// ─── findClauseInText ────────────────────────────────────────────────────────

describe('findClauseInText', () => {
    const sampleContract = `
AGREEMENT FOR SERVICES

Section 1. Definitions
"Services" means the consulting services described in Exhibit A.

Section 2. Term and Termination
This Agreement shall commence on the Effective Date and continue for a period of twelve (12) months.
Either party may terminate this Agreement with thirty (30) days written notice.

Section 3. Indemnification
Each party shall indemnify and hold harmless the other party from any claims arising from breach of this Agreement.

Section 4. Limitation of Liability
IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT, SPECIAL, OR CONSEQUENTIAL DAMAGES.
`;

    it('finds section by heading name', () => {
        const result = findClauseInText(sampleContract, 'termination');
        expect(result).not.toBeNull();
        expect(result!.matchedText.toLowerCase()).toContain('terminat');
    });

    it('finds section by keyword', () => {
        const result = findClauseInText(sampleContract, 'indemnification');
        expect(result).not.toBeNull();
        expect(result!.start).toBeGreaterThan(0);
    });

    it('returns character offsets', () => {
        const result = findClauseInText(sampleContract, 'liability');
        expect(result).not.toBeNull();
        expect(result!.start).toBeLessThan(result!.end);
        expect(result!.start).toBeGreaterThanOrEqual(0);
    });

    it('returns null for non-existent clause', () => {
        const result = findClauseInText(sampleContract, 'arbitration');
        expect(result).toBeNull();
    });

    it('returns null for empty inputs', () => {
        expect(findClauseInText('', 'test')).toBeNull();
        expect(findClauseInText('text', '')).toBeNull();
    });

    it('returns matched text excerpt', () => {
        const result = findClauseInText(sampleContract, 'definitions');
        expect(result).not.toBeNull();
        expect(result!.matchedText.length).toBeGreaterThan(0);
        expect(result!.matchedText.length).toBeLessThanOrEqual(200);
    });
});

// ─── buildIssuePrompt ────────────────────────────────────────────────────────

describe('buildIssuePrompt', () => {
    it('includes issue title', () => {
        const prompt = buildIssuePrompt({
            title: 'Unlimited Liability',
            category: 'Liability',
            severity: 'critical',
        });
        expect(prompt).toContain('Unlimited Liability');
    });

    it('includes category and severity', () => {
        const prompt = buildIssuePrompt({
            title: 'Test',
            category: 'Indemnification',
            severity: 'high',
        });
        expect(prompt).toContain('Indemnification');
        expect(prompt).toContain('high');
    });

    it('includes quote excerpt when provided', () => {
        const prompt = buildIssuePrompt({
            title: 'Test',
            category: 'Liability',
            severity: 'medium',
            quote: 'Party A shall be liable for all damages',
        });
        expect(prompt).toContain('Party A shall be liable');
    });

    it('truncates long quotes', () => {
        const longQuote = 'x'.repeat(200);
        const prompt = buildIssuePrompt({
            title: 'Test',
            category: 'Liability',
            severity: 'low',
            quote: longQuote,
        });
        expect(prompt).toContain('...');
    });

    it('uses custom verb', () => {
        const prompt = buildIssuePrompt(
            { title: 'Test', category: 'Liability', severity: 'high' },
            'explain'
        );
        expect(prompt).toContain('explain');
    });
});
