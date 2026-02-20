/**
 * get-contract.mjs — Get a single contract with its full text + analysis
 *
 * Used when the user selects a stored contract to review.
 */

import { createClient } from '@supabase/supabase-js';

export const config = { path: '/api/contract' };

function getSupabase() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Missing Supabase credentials');
    return createClient(url, key);
}

export default async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    try {
        const url = new URL(req.url);
        const contractId = url.searchParams.get('id');

        if (!contractId) {
            return Response.json(
                { error: 'Contract ID is required (pass ?id=...)' },
                { status: 400 }
            );
        }

        const supabase = getSupabase();

        // Get the contract with full text + complete analysis
        const { data, error } = await supabase
            .from('contracts')
            .select(`
                *,
                analyses (*)
            `)
            .eq('id', contractId)
            .single();

        if (error || !data) {
            console.error('[get-contract] Error:', error);
            return Response.json(
                { error: 'Contract not found', detail: error?.message },
                { status: 404 }
            );
        }

        // Flatten the analysis (Supabase returns it as an array due to the relation)
        const analysis = Array.isArray(data.analyses) ? data.analyses[0] : data.analyses;

        const contract = {
            id: data.id,
            filename: data.filename,
            fullText: data.full_text,
            wordCount: data.word_count,
            charCount: data.char_count,
            pageCount: data.page_count,
            fileType: data.file_type,
            uploadedAt: data.uploaded_at,
            analysis: analysis
                ? {
                    id: analysis.id,
                    summary: analysis.summary,
                    issues: analysis.issues,
                    obligations: analysis.obligations,
                    financialTerms: analysis.financial_terms,
                    modelUsed: analysis.model_used,
                    analyzedAt: analysis.analyzed_at,
                }
                : null,
        };

        return Response.json(
            { contract },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (err) {
        console.error('[get-contract] Error:', err);
        return Response.json(
            { error: err.message || 'Internal server error' },
            { status: 500 }
        );
    }
};
