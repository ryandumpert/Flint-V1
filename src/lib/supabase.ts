/**
 * Supabase client for browser-side operations.
 * Uses the publishable (anon) key — safe for client-side use with RLS.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── TypeScript types matching the DB schema ─────────────────────────────────

export interface ContractRow {
    id: string;
    filename: string;
    full_text: string;
    word_count: number;
    char_count: number;
    page_count: number | null;
    file_type: string | null;
    original_file_path: string | null;
    uploaded_at: string;
    updated_at: string;
}

export interface AnalysisRow {
    id: string;
    contract_id: string;
    summary: {
        overview: string;
        parties?: string;
        contractType?: string;
        term?: string;
        paymentBasics?: string;
        terminationRights?: string;
        jurisdiction?: string;
    };
    issues: Array<{
        id: string;
        title: string;
        category: string;
        severity: string;
        riskType: string;
        confidence: number;
        quote: string;
        anchorStart?: number;
        anchorEnd?: number;
        whyConcern: string;
        suggestedEdits: Array<{
            type: string;
            proposedText?: string;
            replacementText?: string;
            value: string;
            tradeoffs?: string;
        }>;
        discussionPrompts?: string[];
    }>;
    obligations: Array<{
        id: string;
        obligation: string;
        owner: string;
        deadline: string;
        severity?: string;
        clauseReference?: string;
    }>;
    financial_terms: Array<{
        id: string;
        category: string;
        description: string;
        amount?: string;
        severity?: string;
        note?: string;
    }>;
    model_used: string;
    analyzed_at: string;
}

export interface ContractWithAnalysis extends ContractRow {
    analyses: AnalysisRow | null;
}
