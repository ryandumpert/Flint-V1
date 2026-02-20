/**
 * save-contract.mjs — Store contract text + analysis results in Supabase
 *
 * Called after Gemini analysis completes. Saves both the contract and its analysis.
 */

import { createClient } from '@supabase/supabase-js';

export const config = { path: '/api/save-contract' };

function getSupabase() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Missing Supabase credentials');
    return createClient(url, key);
}

export default async (req) => {
    // CORS
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    if (req.method !== 'POST') {
        return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        const { contractText, fileName, fileType, wordCount, charCount, pageCount, analysis } =
            await req.json();

        if (!contractText || !fileName) {
            return Response.json(
                { error: 'contractText and fileName are required' },
                { status: 400 }
            );
        }

        const supabase = getSupabase();

        // 1. Insert the contract
        const { data: contract, error: contractError } = await supabase
            .from('contracts')
            .insert({
                filename: fileName,
                full_text: contractText,
                word_count: wordCount || contractText.split(/\s+/).filter(Boolean).length,
                char_count: charCount || contractText.length,
                page_count: pageCount || null,
                file_type: fileType || null,
            })
            .select()
            .single();

        if (contractError) {
            console.error('[save-contract] Contract insert error:', contractError);
            return Response.json(
                { error: 'Failed to save contract', detail: contractError.message },
                { status: 500 }
            );
        }

        // 2. If analysis data is provided, save it too
        let analysisData = null;
        if (analysis) {
            const { data: analysisRow, error: analysisError } = await supabase
                .from('analyses')
                .insert({
                    contract_id: contract.id,
                    summary: analysis.summary || {},
                    issues: analysis.issues || [],
                    obligations: analysis.obligations || [],
                    financial_terms: analysis.financialTerms || [],
                    model_used: analysis.meta?.model || 'gemini-2.0-flash-lite',
                })
                .select()
                .single();

            if (analysisError) {
                console.error('[save-contract] Analysis insert error:', analysisError);
                // Contract was saved, but analysis failed — don't fail the whole request
            } else {
                analysisData = analysisRow;
            }
        }

        return Response.json(
            {
                success: true,
                contractId: contract.id,
                analysisId: analysisData?.id || null,
                message: `Contract "${fileName}" saved successfully`,
            },
            {
                status: 201,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (err) {
        console.error('[save-contract] Error:', err);
        return Response.json(
            { error: err.message || 'Internal server error' },
            { status: 500 }
        );
    }
};
