/**
 * analyze-contract.mjs — Netlify serverless function
 * 
 * Accepts full contract text, calls Gemini 2.0 Flash to produce
 * structured risk analysis, returns Issue[] + summary data.
 * 
 * Endpoint: POST /.netlify/functions/analyze-contract
 * Alias:    POST /api/analyze-contract
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// Max contract characters to send (keeps Gemini fast — ~50 pages)
const MAX_CONTRACT_CHARS = 120000;

// ─── Analysis System Prompt (compact for speed) ──────────────────────────────

const SYSTEM_PROMPT = `You are a contract risk analyst. Analyze the provided contract and return JSON.

OUTPUT (valid JSON only):
{
  "summary": { "overview": "string", "parties": "string", "contractType": "string", "term": "string", "paymentBasics": "string", "terminationRights": "string", "jurisdiction": "string" },
  "issues": [{ "id": "issue_N", "title": "string", "category": "Indemnification|Liability|Termination|Payment|IP Rights|Confidentiality|Non-Compete|Data Privacy|Insurance|Warranties|Force Majeure|Dispute Resolution|Assignment|Governing Law|Other", "severity": "critical|high|medium|low", "riskType": "legal|commercial|operational|security|privacy|compliance", "confidence": 0.0-1.0, "quote": "exact contract text 50-150 chars", "anchorStart": 0, "anchorEnd": 0, "whyConcern": "2-3 sentences", "suggestedEdits": [{ "type": "add|remove|change", "proposedText": "string", "replacementText": "string", "value": "1 sentence" }], "discussionPrompts": ["string"] }],
  "obligations": [{ "id": "ob_N", "obligation": "string", "owner": "string", "deadline": "string", "severity": "low|medium|high" }],
  "financialTerms": [{ "id": "ft_N", "category": "Fees|Late Fees|Credits|Penalties|Taxes|Insurance", "description": "string", "amount": "string", "severity": "low|medium|high", "note": "string" }]
}

SEVERITY: critical=unlimited liability/unconscionable; high=missing protections/one-sided; medium=ambiguous/unusual; low=best-practice.
RULES: Valid JSON only. Find all issues (typically 5-20). Every issue needs suggestedEdits. Plain English. anchorStart/anchorEnd are approximate char offsets.`;

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

    // Truncate very long contracts to stay within timeout
    const truncated = contractText.length > MAX_CONTRACT_CHARS;
    const textToAnalyze = truncated ? contractText.slice(0, MAX_CONTRACT_CHARS) : contractText;

    // ─── Call Gemini ─────────────────────────────────────────────────────

    const userPrompt = `Analyze this contract "${fileName}"${truncated ? ' (first ~50 pages shown)' : ''}:\n\n${textToAnalyze}`;

    try {
        console.log(`[analyze-contract] Calling Gemini — ${textToAnalyze.length} chars, file: ${fileName}`);
        const startTime = Date.now();

        const geminiResponse = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: userPrompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.1,
                    topP: 0.8,
                    maxOutputTokens: 8192,
                    responseMimeType: 'application/json',
                },
            }),
        });

        const elapsed = Date.now() - startTime;
        console.log(`[analyze-contract] Gemini responded in ${elapsed}ms — status ${geminiResponse.status}`);

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('[analyze-contract] Gemini API error:', geminiResponse.status, errorText);
            return {
                statusCode: 502,
                headers,
                body: JSON.stringify({ error: 'LLM analysis failed', detail: `Gemini returned ${geminiResponse.status}` }),
            };
        }

        const geminiData = await geminiResponse.json();
        const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            console.error('[analyze-contract] No text in response:', JSON.stringify(geminiData).slice(0, 300));
            return { statusCode: 502, headers, body: JSON.stringify({ error: 'No analysis returned from LLM' }) };
        }

        // Parse JSON
        let analysis;
        try {
            const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            analysis = JSON.parse(cleaned);
        } catch (parseError) {
            console.error('[analyze-contract] JSON parse failed:', parseError.message, rawText.slice(0, 300));
            return { statusCode: 502, headers, body: JSON.stringify({ error: 'LLM returned invalid JSON', raw: rawText.slice(0, 200) }) };
        }

        // ─── Normalize ───────────────────────────────────────────────────

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

        analysis.meta = {
            model: GEMINI_MODEL,
            analyzedAt: new Date().toISOString(),
            contractLength: contractText.length,
            analyzedLength: textToAnalyze.length,
            truncated,
            fileName,
            responseTimeMs: elapsed,
        };

        console.log(`[analyze-contract] Success — ${analysis.issues.length} issues found in ${elapsed}ms`);

        return { statusCode: 200, headers, body: JSON.stringify(analysis) };
    } catch (error) {
        console.error('[analyze-contract] Unexpected error:', error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error', detail: error.message }) };
    }
}
