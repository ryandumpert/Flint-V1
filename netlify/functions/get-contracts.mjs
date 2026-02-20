/**
 * get-contracts.mjs — List all stored contracts (summaries only, no full text)
 */

import { createClient } from '@supabase/supabase-js';

export const config = { path: '/api/contracts' };

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
        const supabase = getSupabase();

        // Get contracts with their analysis summary (not full text — too large)
        const { data, error } = await supabase
            .from('contracts')
            .select(`
                id,
                filename,
                word_count,
                char_count,
                page_count,
                file_type,
                uploaded_at,
                analyses (
                    id,
                    summary,
                    issues,
                    model_used,
                    analyzed_at
                )
            `)
            .order('uploaded_at', { ascending: false });

        if (error) {
            console.error('[get-contracts] Error:', error);
            return Response.json(
                { error: 'Failed to fetch contracts', detail: error.message },
                { status: 500 }
            );
        }

        // Flatten: add issue counts to each contract for quick display
        const contracts = (data || []).map((c) => {
            const analysis = Array.isArray(c.analyses) ? c.analyses[0] : c.analyses;
            const issues = analysis?.issues || [];
            return {
                id: c.id,
                filename: c.filename,
                wordCount: c.word_count,
                charCount: c.char_count,
                pageCount: c.page_count,
                fileType: c.file_type,
                uploadedAt: c.uploaded_at,
                hasAnalysis: !!analysis,
                summary: analysis?.summary?.overview || null,
                issueCount: issues.length,
                criticalCount: issues.filter((i) => i.severity === 'critical').length,
                highCount: issues.filter((i) => i.severity === 'high').length,
                mediumCount: issues.filter((i) => i.severity === 'medium').length,
                lowCount: issues.filter((i) => i.severity === 'low').length,
            };
        });

        return Response.json(
            { contracts },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (err) {
        console.error('[get-contracts] Error:', err);
        return Response.json(
            { error: err.message || 'Internal server error' },
            { status: 500 }
        );
    }
};
