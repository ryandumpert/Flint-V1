/**
 * piiMasking.test.ts — Unit tests for PII detection and masking
 *
 * Phase 7: Testing
 */

import { describe, it, expect } from 'vitest';
import { detectPII, maskPII, getPIISummary, containsHighSeverityPII } from '@/utils/piiMasking';

// ─── SSN Detection ───────────────────────────────────────────────────────────

describe('SSN detection', () => {
    it('detects SSN with dashes', () => {
        const detections = detectPII('SSN: 123-45-6789');
        expect(detections.some(d => d.type === 'ssn')).toBe(true);
    });

    it('detects SSN with spaces', () => {
        const detections = detectPII('SSN: 123 45 6789');
        expect(detections.some(d => d.type === 'ssn')).toBe(true);
    });

    it('masks SSN correctly', () => {
        const result = maskPII('My SSN is 123-45-6789.');
        expect(result).toContain('●●●-●●-●●●●');
        expect(result).not.toContain('123-45-6789');
    });

    it('flags SSN as high severity', () => {
        const detections = detectPII('SSN: 123-45-6789');
        const ssn = detections.find(d => d.type === 'ssn');
        expect(ssn?.level).toBe('high');
    });
});

// ─── Credit Card Detection ───────────────────────────────────────────────────

describe('Credit card detection', () => {
    it('detects card number with spaces', () => {
        const detections = detectPII('Card: 4111 1111 1111 1111');
        expect(detections.some(d => d.type === 'credit_card')).toBe(true);
    });

    it('detects card number with dashes', () => {
        const detections = detectPII('Card: 4111-1111-1111-1111');
        expect(detections.some(d => d.type === 'credit_card')).toBe(true);
    });

    it('masks credit card correctly', () => {
        const result = maskPII('Card: 4111 1111 1111 1111');
        expect(result).toContain('●●●● ●●●● ●●●● ●●●●');
    });

    it('flags credit card as high severity', () => {
        const detections = detectPII('CC: 4111 1111 1111 1111');
        const cc = detections.find(d => d.type === 'credit_card');
        expect(cc?.level).toBe('high');
    });
});

// ─── Email Detection ─────────────────────────────────────────────────────────

describe('Email detection', () => {
    it('detects email addresses', () => {
        const detections = detectPII('Contact: john@example.com');
        expect(detections.some(d => d.type === 'email')).toBe(true);
    });

    it('partially masks email', () => {
        const result = maskPII('Email: john@example.com');
        // Should preserve domain and partially mask local
        expect(result).toContain('@example.com');
        expect(result).not.toContain('john@');
    });

    it('flags email as medium severity', () => {
        const detections = detectPII('Email: test@test.com');
        const email = detections.find(d => d.type === 'email');
        expect(email?.level).toBe('medium');
    });
});

// ─── maskPII ─────────────────────────────────────────────────────────────────

describe('maskPII', () => {
    it('returns original text when no PII found', () => {
        const text = 'This is a normal contract clause about liability.';
        expect(maskPII(text)).toBe(text);
    });

    it('handles empty string', () => {
        expect(maskPII('')).toBe('');
    });

    it('masks multiple PII instances', () => {
        const text = 'SSN: 123-45-6789, Email: john@example.com';
        const masked = maskPII(text);
        expect(masked).not.toContain('123-45-6789');
        expect(masked).not.toContain('john@');
    });
});

// ─── getPIISummary ───────────────────────────────────────────────────────────

describe('getPIISummary', () => {
    it('returns zero counts for clean text', () => {
        const summary = getPIISummary('Clean contract text here.');
        expect(summary.totalDetections).toBe(0);
        expect(summary.highSeverity).toBe(0);
        expect(summary.types).toEqual([]);
    });

    it('counts high severity items', () => {
        const summary = getPIISummary('SSN: 123-45-6789, Card: 4111 1111 1111 1111');
        expect(summary.highSeverity).toBeGreaterThan(0);
    });

    it('lists detected types', () => {
        const summary = getPIISummary('SSN: 123-45-6789, Email: john@example.com');
        expect(summary.types).toContain('ssn');
        expect(summary.types).toContain('email');
    });
});

// ─── containsHighSeverityPII ─────────────────────────────────────────────────

describe('containsHighSeverityPII', () => {
    it('returns true for SSN', () => {
        expect(containsHighSeverityPII('SSN: 123-45-6789')).toBe(true);
    });

    it('returns true for credit card', () => {
        expect(containsHighSeverityPII('Card: 4111 1111 1111 1111')).toBe(true);
    });

    it('returns false for email only', () => {
        expect(containsHighSeverityPII('Email: john@example.com')).toBe(false);
    });

    it('returns false for clean text', () => {
        expect(containsHighSeverityPII('Normal contract text.')).toBe(false);
    });
});
