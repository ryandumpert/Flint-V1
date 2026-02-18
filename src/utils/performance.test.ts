/**
 * performance.test.ts — Performance benchmarks for critical utilities
 *
 * Simulates large contract processing to ensure operations complete within acceptable limits.
 *
 * Phase 7: Testing
 */

import { describe, it, expect } from 'vitest';
import { extractFromText } from '@/utils/contractExtractor';
import { maskPII } from '@/utils/piiMasking';

describe('Performance Benchmarks', () => {
    // Generate a large text payload (~1MB)
    const heavyPayload = Array.from({ length: 5000 }, (_, i) =>
        `Section ${i}: This is a sample clause with some text content and PII like SSN: 123-45-6789.`
    ).join('\n\n');

    it('extractFromText processes 1MB text quickly', () => {
        const start = performance.now();
        const result = extractFromText(heavyPayload);
        const end = performance.now();

        expect(result.text.length).toBeGreaterThan(0);
        expect(end - start).toBeLessThan(500); // Should be < 500ms
    });

    it('maskPII handles 1MB text with many patterns within reasonable limits', () => {
        const start = performance.now();
        const masked = maskPII(heavyPayload);
        const end = performance.now();

        expect(masked).not.toContain('123-45-6789');
        // 1MB with 5000 matches is heavy — allow up to 3s for slower environments
        expect(end - start).toBeLessThan(3000);
    });
});
