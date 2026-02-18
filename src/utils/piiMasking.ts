/**
 * piiMasking.ts — PII detection and masking for contract text display
 *
 * Detects common PII patterns (SSN, email, phone, credit card, etc.) and
 * replaces them with masked placeholders in displayed text.
 *
 * This is a display-only utility — it does NOT modify stored contract text.
 * The original text is preserved in ContractContext for AI analysis.
 *
 * Phase 6: Hardening — PII masking considerations
 */

// ─── Pattern Definitions ─────────────────────────────────────────────────────

interface PIIPattern {
    name: string;
    regex: RegExp;
    mask: (match: string) => string;
    /** Sensitivity level for logging/reporting */
    level: 'high' | 'medium' | 'low';
}

const PII_PATTERNS: PIIPattern[] = [
    // SSN: 123-45-6789 or 123 45 6789
    {
        name: 'ssn',
        regex: /\b(\d{3})[-\s](\d{2})[-\s](\d{4})\b/g,
        mask: () => '●●●-●●-●●●●',
        level: 'high',
    },
    // Credit card: 16 digits with optional separators
    {
        name: 'credit_card',
        regex: /\b(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})\b/g,
        mask: (_match) => '●●●● ●●●● ●●●● ●●●●',
        level: 'high',
    },
    // Email addresses
    {
        name: 'email',
        regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
        mask: (match) => {
            const [local, domain] = match.split('@');
            if (!local || !domain) return '●●●@●●●.●●●';
            const maskedLocal = local[0] + '●'.repeat(Math.max(local.length - 2, 1)) + (local.length > 1 ? local[local.length - 1] : '');
            return `${maskedLocal}@${domain}`;
        },
        level: 'medium',
    },
    // US phone: (123) 456-7890, 123-456-7890, 123.456.7890
    {
        name: 'phone',
        regex: /\b(?:\+1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g,
        mask: (match) => {
            // Only mask if it looks like a phone (not part of a section number like 12.345)
            if (match.replace(/\D/g, '').length < 7) return match;
            return '(●●●) ●●●-●●●●';
        },
        level: 'medium',
    },
    // Bank account / routing numbers (9 digits alone on word boundary)
    {
        name: 'bank_routing',
        regex: /\b\d{9}\b/g,
        mask: () => '●●●●●●●●●',
        level: 'medium',
    },
    // Date of birth patterns: MM/DD/YYYY, DD-MM-YYYY, etc. (only if preceded by "dob", "born", "birth")
    {
        name: 'dob',
        regex: /(?:(?:dob|born|birth|date of birth)[:\s]+)(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/gi,
        mask: (match) => match.replace(/\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/, '●●/●●/●●●●'),
        level: 'medium',
    },
];

// ─── Core API ────────────────────────────────────────────────────────────────

export interface PIIDetection {
    type: string;
    original: string;
    masked: string;
    index: number;
    level: 'high' | 'medium' | 'low';
}

/**
 * Detect PII in text. Returns a list of detections without modifying the input.
 */
export function detectPII(text: string): PIIDetection[] {
    if (!text) return [];

    const detections: PIIDetection[] = [];

    for (const pattern of PII_PATTERNS) {
        // Reset regex lastIndex for global patterns
        pattern.regex.lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = pattern.regex.exec(text)) !== null) {
            const original = match[0];
            const masked = pattern.mask(original);

            // Only add if the mask actually changed something
            if (masked !== original) {
                detections.push({
                    type: pattern.name,
                    original,
                    masked,
                    index: match.index,
                    level: pattern.level,
                });
            }
        }
    }

    // Sort by position in text
    detections.sort((a, b) => a.index - b.index);
    return detections;
}

/**
 * Mask all detected PII in text. Returns the masked string.
 * This is for display purposes only — never modify the stored contract text.
 */
export function maskPII(text: string): string {
    if (!text) return text;

    let result = text;
    const detections = detectPII(text);

    // Apply masks in reverse order to preserve indices
    for (let i = detections.length - 1; i >= 0; i--) {
        const d = detections[i];
        result = result.slice(0, d.index) + d.masked + result.slice(d.index + d.original.length);
    }

    return result;
}

/**
 * Get a summary of PII found in text for logging/notification.
 * Does NOT include the actual PII values.
 */
export function getPIISummary(text: string): {
    totalDetections: number;
    highSeverity: number;
    types: string[];
} {
    const detections = detectPII(text);
    const types = [...new Set(detections.map(d => d.type))];
    const highSeverity = detections.filter(d => d.level === 'high').length;

    return {
        totalDetections: detections.length,
        highSeverity,
        types,
    };
}

/**
 * Check if text contains any high-severity PII.
 * Useful for gating UI or showing warnings.
 */
export function containsHighSeverityPII(text: string): boolean {
    const detections = detectPII(text);
    return detections.some(d => d.level === 'high');
}
