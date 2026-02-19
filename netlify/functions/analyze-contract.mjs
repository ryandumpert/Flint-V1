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

// ─── Analysis System Prompt ──────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a senior contract risk analyst AI. Your job is to read an entire contract and produce a structured risk analysis.

TASK: Analyze the contract text provided and return a JSON object with the following structure. Be thorough — read every clause.

OUTPUT FORMAT (strict JSON, no markdown, no code fences):
{
  "summary": {
    "overview": "2-4 sentence plain-English summary of what this contract is",
    "parties": "Party A (Role) ↔ Party B (Role)",
    "contractType": "e.g. SaaS Agreement, NDA, Employment, Lease, etc.",
    "term": "Duration and renewal terms",
    "paymentBasics": "Key financial terms summary",
    "terminationRights": "How either party can exit",
    "jurisdiction": "Governing law / jurisdiction if stated"
  },
  "issues": [
    {
      "id": "issue_1",
      "title": "Short descriptive title (e.g. 'Unlimited Liability Exposure')",
      "category": "One of: Indemnification, Liability, Termination, Payment, IP Rights, Confidentiality, Non-Compete, Data Privacy, Insurance, Warranties, Force Majeure, Dispute Resolution, Assignment, Governing Law, Other",
      "severity": "critical | high | medium | low",
      "riskType": "legal | commercial | operational | security | privacy | compliance",
      "confidence": 0.0 to 1.0,
      "quote": "Exact text from the contract that triggers this issue (50-200 chars)",
      "anchorStart": approximate character offset where the quote starts in the original text,
      "anchorEnd": approximate character offset where the quote ends,
      "whyConcern": "2-5 sentence plain-English explanation of why this is risky",
      "suggestedEdits": [
        {
          "type": "add | remove | change",
          "proposedText": "the problematic text (if type is 'change' or 'remove')",
          "replacementText": "the suggested replacement text (if type is 'change' or 'add')",
          "value": "Why this edit helps — 1-2 sentences",
          "tradeoffs": "Any tradeoffs or pushback to expect — 1 sentence (optional)"
        }
      ],
      "discussionPrompts": ["Question the user might want to ask about this issue"]
    }
  ],
  "obligations": [
    {
      "id": "ob_1",
      "obligation": "What must be done",
      "owner": "Which party is responsible",
      "deadline": "When it's due",
      "severity": "low | medium | high",
      "clauseReference": "Section or clause number if available"
    }
  ],
  "financialTerms": [
    {
      "id": "ft_1",
      "category": "Fees | Late Fees | Credits | Penalties | Taxes | Insurance",
      "description": "What the financial term is",
      "amount": "Dollar amount or percentage",
      "severity": "low | medium | high",
      "note": "Any concern about this term (optional)"
    }
  ]
}

RULES:
1. Return ONLY valid JSON. No markdown, no explanation outside the JSON.
2. Find ALL issues — do not stop at a few. Typical contracts have 5-20 issues.
3. Severity guide:
   - critical: Unlimited liability, no indemnification cap, dangerous IP assignment, unconscionable terms
   - high: Missing standard protections, one-sided termination, unreasonable penalties
   - medium: Ambiguous language, missing definitions, unusual but not dangerous terms
   - low: Minor formatting issues, best-practice recommendations, nice-to-have improvements
4. For anchorStart/anchorEnd, estimate the character position as closely as possible. These don't need to be exact but should be close enough to locate the text.
5. Every issue MUST have at least one suggestedEdit with actionable replacement language.
6. Use plain English — the user is not a lawyer.
7. Be balanced — note when terms are standard/acceptable too.
8. If the text doesn't appear to be a contract, still analyze it but note the limitation in the summary overview.`;

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function handler(event) {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    // Only POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    // Validate API key is configured
    if (!GEMINI_API_KEY) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }),
        };
    }

    // Parse request
    let contractText, fileName;
    try {
        const body = JSON.parse(event.body);
        contractText = body.contractText;
        fileName = body.fileName || 'Unknown';
    } catch {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid JSON body' }),
        };
    }

    if (!contractText || typeof contractText !== 'string' || contractText.trim().length < 50) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Contract text is too short or missing' }),
        };
    }

    // ─── Call Gemini ─────────────────────────────────────────────────────

    const userPrompt = `Analyze the following contract titled "${fileName}":\n\n--- CONTRACT TEXT START ---\n${contractText}\n--- CONTRACT TEXT END ---\n\nReturn the structured JSON analysis.`;

    try {
        const geminiResponse = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: SYSTEM_PROMPT + '\n\n' + userPrompt }
                        ],
                    },
                ],
                generationConfig: {
                    temperature: 0.2,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 8192,
                    responseMimeType: 'application/json',
                },
            }),
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('[analyze-contract] Gemini API error:', geminiResponse.status, errorText);
            return {
                statusCode: 502,
                headers,
                body: JSON.stringify({
                    error: 'LLM analysis failed',
                    detail: `Gemini returned ${geminiResponse.status}`,
                }),
            };
        }

        const geminiData = await geminiResponse.json();

        // Extract the text content from Gemini's response
        const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            console.error('[analyze-contract] No text in Gemini response:', JSON.stringify(geminiData).slice(0, 500));
            return {
                statusCode: 502,
                headers,
                body: JSON.stringify({ error: 'No analysis returned from LLM' }),
            };
        }

        // Parse the JSON response (strip any accidental markdown fences)
        let analysis;
        try {
            const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            analysis = JSON.parse(cleaned);
        } catch (parseError) {
            console.error('[analyze-contract] Failed to parse LLM JSON:', parseError.message, rawText.slice(0, 500));
            return {
                statusCode: 502,
                headers,
                body: JSON.stringify({
                    error: 'LLM returned invalid JSON',
                    raw: rawText.slice(0, 200),
                }),
            };
        }

        // ─── Validate & normalize the response ───────────────────────────

        // Ensure issues array exists and has proper IDs
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

        // Ensure other arrays exist
        analysis.obligations = Array.isArray(analysis.obligations) ? analysis.obligations : [];
        analysis.financialTerms = Array.isArray(analysis.financialTerms) ? analysis.financialTerms : [];
        analysis.summary = analysis.summary || { overview: 'Analysis complete.' };

        // Add metadata
        analysis.meta = {
            model: GEMINI_MODEL,
            analyzedAt: new Date().toISOString(),
            contractLength: contractText.length,
            fileName,
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(analysis),
        };
    } catch (error) {
        console.error('[analyze-contract] Unexpected error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                detail: error.message,
            }),
        };
    }
}
