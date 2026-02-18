/**
 * contractExtractor.test.ts — Unit tests for contract text extraction
 *
 * Tests: normalizeText (via extractFromText), word counting, validation,
 * and file routing logic.
 *
 * Phase 7: Testing
 */

import { describe, it, expect } from 'vitest';
import { extractFromText, validateContractText } from '@/utils/contractExtractor';

// ─── extractFromText ─────────────────────────────────────────────────────────

describe('extractFromText', () => {
    it('normalizes Windows line endings', () => {
        const result = extractFromText('line one\r\nline two\r\n');
        expect(result.text).toBe('line one\nline two');
    });

    it('collapses excessive blank lines', () => {
        const result = extractFromText('paragraph one\n\n\n\n\nparagraph two');
        expect(result.text).toBe('paragraph one\n\nparagraph two');
    });

    it('trims trailing whitespace per line', () => {
        const result = extractFromText('hello   \nworld  ');
        expect(result.text).toBe('hello\nworld');
    });

    it('converts tabs to spaces within text', () => {
        const result = extractFromText('Header\n\tSubsection');
        expect(result.text).toBe('Header\n    Subsection');
    });

    it('counts words correctly', () => {
        const result = extractFromText('This contract has seven words total here');
        expect(result.wordCount).toBe(7);
    });

    it('counts characters after normalization', () => {
        const result = extractFromText('abc def');
        expect(result.charCount).toBe(7);
    });

    it('returns empty warnings for valid input', () => {
        const result = extractFromText('Some contract text here');
        expect(result.warnings).toEqual([]);
    });

    it('handles empty input', () => {
        const result = extractFromText('');
        expect(result.text).toBe('');
        expect(result.wordCount).toBe(0);
        expect(result.charCount).toBe(0);
    });

    it('handles whitespace-only input', () => {
        const result = extractFromText('   \n\n   ');
        expect(result.text).toBe('');
        expect(result.wordCount).toBe(0);
    });
});

// ─── validateContractText ────────────────────────────────────────────────────

describe('validateContractText', () => {
    it('flags very short text', () => {
        const warnings = validateContractText('Short');
        expect(warnings.length).toBeGreaterThan(0);
        expect(warnings.some(w => w.includes('short'))).toBe(true);
    });

    it('flags very few words', () => {
        const warnings = validateContractText('just a few words');
        expect(warnings.some(w => w.includes('few words'))).toBe(true);
    });

    it('returns no warnings for adequate text', () => {
        // Generate a realistic length contract snippet
        const words = Array.from({ length: 100 }, (_, i) => `word${i}`);
        const text = words.join(' ');
        const warnings = validateContractText(text);
        expect(warnings).toEqual([]);
    });
});
