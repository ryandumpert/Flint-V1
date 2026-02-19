/**
 * analyze-contract.mjs — Netlify serverless function
 * 
 * Accepts full contract text, calls Gemini 2.0 Flash Lite to produce
 * structured risk analysis, returns Issue[] + summary data.
 * 
 * Endpoint: POST /.netlify/functions/analyze-contract
 * Alias:    POST /api/analyze-contract
 */

// Export config for Netlify to set timeout
export const config = {
    timeout: 26,
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// Cap contract at ~30 pages to keep response fast
const MAX_CONTRACT_CHARS = 80000;

// ─── Compact System Prompt ───────────────────────────────────────────────────

const SYSTEM_PROMPT = `Contract risk analyst. Return JSON only.

Schema:
{"summary":{"overview":"2 sentences","parties":"A↔B","contractType":"","term":"","paymentBasics":"","terminationRights":""},"issues":[{"id":"issue_N","title":"","category":"Indemnification|Liability|Termination|Payment|IP Rights|Confidentiality|Non-Compete|Data Privacy|Warranties|Force Majeure|Dispute Resolution|Other","severity":"critical|high|medium|low","riskType":"legal|commercial|operational","confidence":0.9,"quote":"exact text 50-100 chars","whyConcern":"1-2 sentences","suggestedEdits":[{"type":"change","proposedText":"","replacementText":"","value":"1 sentence"}]}],"obligations":[{"id":"ob_N","obligation":"","owner":"","deadline":"","severity":"medium"}],"financialTerms":[{"id":"ft_N","category":"Fees|Late Fees|Penalties|Taxes","description":"","amount":"","severity":"medium"}]}

Find the top 10 most important issues. Severity: critical=unlimited liability/unconscionable; high=missing protections; medium=ambiguous; low=best-practice. Plain English. Valid JSON only.`;

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function handler(event) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    if (!GEMINI_API_KEY) {
        console.error('[analyze-contract] GEMINI_API_KEY is not set');
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }) };
    }

    let contractText, fileName;
    try {
        const body = JSON.parse(event.body);
        contractText = body.contractText;
        fileName = body.fileName || 'Unknown';
    } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
    }

    if (!contractText || typeof contractText !== 'string' || contractText.trim().length < 50) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Contract text too short or missing' }) };
    }

    // Truncate to keep within timeout
    const truncated = contractText.length > MAX_CONTRACT_CHARS;
    const textToAnalyze = truncated ? contractText.slice(0, MAX_CONTRACT_CHARS) : contractText;

    const userPrompt = `Analyze: "${fileName}"${truncated ? ' (truncated)' : ''}\n\n${textToAnalyze}`;

    try {
        console.log(`[analyze-contract] Starting — ${textToAnalyze.length} chars, model: ${GEMINI_MODEL}`);
        const startTime = Date.now();

        const geminiResponse = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                contents: [
                    { role: 'user', parts: [{ text: userPrompt }] },
                ],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 4096,
                    responseMimeType: 'application/json',
                },
            }),
        });

        const elapsed = Date.now() - startTime;
        console.log(`[analyze-contract] Gemini responded in ${elapsed}ms — status ${geminiResponse.status}`);

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('[analyze-contract] Gemini error:', geminiResponse.status, errorText.slice(0, 500));
            return {
                statusCode: 502,
                headers,
                body: JSON.stringify({ error: 'LLM analysis failed', detail: `Gemini ${geminiResponse.status}` }),
            };
        }

        const geminiData = await geminiResponse.json();
        const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            console.error('[analyze-contract] Empty response:', JSON.stringify(geminiData).slice(0, 300));
            return { statusCode: 502, headers, body: JSON.stringify({ error: 'No analysis returned' }) };
        }

        let analysis;
        try {
            analysis = JSON.parse(rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim());
        } catch (e) {
            console.error('[analyze-contract] JSON parse failed:', e.message, rawText.slice(0, 300));
            return { statusCode: 502, headers, body: JSON.stringify({ error: 'Invalid JSON from LLM' }) };
        }

        // Normalize
        if (Array.isArray(analysis.issues)) {
            analysis.issues = analysis.issues.map((issue, idx) => ({
                ...issue,
                id: issue.id || `issue_${idx + 1}`,
                severity: ['critical', 'high', 'medium', 'low'].includes(issue.severity) ? issue.severity : 'medium',
                riskType: issue.riskType || 'legal',
                confidence: typeof issue.confidence === 'number' ? Math.min(1, Math.max(0, issue.confidence)) : 0.8,
                suggestedEdits: Array.isArray(issue.suggestedEdits) ? issue.suggestedEdits : [],
                discussionPrompts: Array.isArray(issue.discussionPrompts) ? issue.discussionPrompts : [],
            }));
        } else {
            analysis.issues = [];
        }

        analysis.obligations = Array.isArray(analysis.obligations) ? analysis.obligations : [];
        analysis.financialTerms = Array.isArray(analysis.financialTerms) ? analysis.financialTerms : [];
        analysis.summary = analysis.summary || { overview: 'Analysis complete.' };
        analysis.meta = { model: GEMINI_MODEL, analyzedAt: new Date().toISOString(), contractLength: contractText.length, truncated, fileName, responseTimeMs: elapsed };

        console.log(`[analyze-contract] Done — ${analysis.issues.length} issues in ${elapsed}ms`);
        return { statusCode: 200, headers, body: JSON.stringify(analysis) };
    } catch (error) {
        console.error('[analyze-contract] Error:', error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal error', detail: error.message }) };
    }
}
