/**
 * ContractUpload — Interactive template for Flint contract ingestion
 * Drag-and-drop + paste interface for uploading contracts.
 * Supports PDF, DOCX, and plain text.
 * 
 * Follows existing template patterns (glass styling, notifyTele communication).
 */

import React, { useState, useCallback, useRef, DragEvent } from 'react';
import {
    Upload, FileText, FileUp, AlertTriangle, CheckCircle,
    Loader2, X, ClipboardPaste
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { extractFromFile, extractFromText, validateContractText, ExtractionResult } from '@/utils/contractExtractor';
import { DataHandlingNotice } from '@/components/DataHandlingNotice';
import { containsHighSeverityPII } from '@/utils/piiMasking';
import { useContract } from '@/contexts/ContractContext';
import { analyzeContract, mapToIssues, buildFlintNotification, type AnalysisResponse } from '@/utils/contractAnalysisService';
import { saveContractToStorage } from '@/utils/contractStorageService';

interface ContractUploadProps {
    headline?: string;
    subheadline?: string;
    submitLabel?: string;
    submitActionPhrase?: string;
    maxFileSizeMB?: number;
    showPasteOption?: boolean;
}

type UploadStage = 'idle' | 'dragging' | 'extracting' | 'preview' | 'analyzing' | 'error';

export const ContractUpload: React.FC<ContractUploadProps> = ({
    headline = 'Upload Your Contract',
    subheadline = 'Drag and drop a file or paste contract text below.',
    submitLabel = 'Analyze Contract',
    submitActionPhrase = 'analyze this contract',
    maxFileSizeMB = 25,
    showPasteOption = true,
}) => {
    const { playClick } = useSound();
    const { setContractText, setIssues, setAnalysisStatus, setAnalysisError, activeVersion } = useContract();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [stage, setStage] = useState<UploadStage>('idle');
    const [extractedText, setExtractedText] = useState('');
    const [pastedText, setPastedText] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileStats, setFileStats] = useState<{ words: number; chars: number; pages?: number } | null>(null);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [analysisProgress, setAnalysisProgress] = useState('');
    const [activeTab, setActiveTab] = useState<'file' | 'paste'>('file');

    // ─── File Processing ─────────────────────────────────────────────────

    const processFile = useCallback(async (file: File) => {
        // Size check
        if (file.size > maxFileSizeMB * 1024 * 1024) {
            setStage('error');
            setErrorMessage(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is ${maxFileSizeMB} MB.`);
            return;
        }

        setStage('extracting');
        setFileName(file.name);
        setWarnings([]);
        setErrorMessage('');

        try {
            const result: ExtractionResult = await extractFromFile(file);

            if (!result.text || result.text.length === 0) {
                setStage('error');
                setErrorMessage(result.warnings.join(' ') || 'No text could be extracted from this file.');
                setWarnings(result.warnings);
                return;
            }

            // Validate
            const validationWarnings = validateContractText(result.text);
            const allWarnings = [...result.warnings, ...validationWarnings];

            setExtractedText(result.text);
            setFileStats({
                words: result.wordCount,
                chars: result.charCount,
                pages: result.pageCount,
            });
            setWarnings(allWarnings);
            setStage('preview');
        } catch (err) {
            setStage('error');
            setErrorMessage(`Extraction failed: ${err instanceof Error ? err.message : String(err)}`);
        }
    }, [maxFileSizeMB]);

    // ─── Drag & Drop ─────────────────────────────────────────────────────

    const handleDragOver = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setStage('dragging');
    }, []);

    const handleDragLeave = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setStage('idle');
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setStage('idle');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }, [processFile]);

    // ─── File Input ──────────────────────────────────────────────────────

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    }, [processFile]);

    const openFileDialog = useCallback(() => {
        playClick();
        fileInputRef.current?.click();
    }, [playClick]);

    // ─── Paste Handling ──────────────────────────────────────────────────

    const handlePasteSubmit = useCallback(() => {
        if (!pastedText.trim()) return;
        playClick();

        const result = extractFromText(pastedText);
        const validationWarnings = validateContractText(result.text);

        setExtractedText(result.text);
        setFileName('Pasted Text');
        setFileStats({
            words: result.wordCount,
            chars: result.charCount,
        });
        setWarnings([...result.warnings, ...validationWarnings]);
        setStage('preview');
    }, [pastedText, playClick]);

    // ─── Submit to AI ────────────────────────────────────────────────────

    const handleAnalyze = useCallback(async () => {
        playClick();
        setStage('analyzing');
        setAnalysisProgress('Sending contract to AI for analysis...');

        // Store the contract text on the window for the AI to access
        (window as any).__flintContractText = extractedText;
        (window as any).__flintContractMeta = {
            fileName,
            wordCount: fileStats?.words || 0,
            charCount: fileStats?.chars || 0,
            pageCount: fileStats?.pages,
        };

        // Sync to ContractContext so the rest of the app knows a contract is loaded
        setContractText(extractedText, {
            title: fileName,
            sourceFilename: fileName,
            sizeBytes: fileStats?.chars || 0,
        });
        setAnalysisStatus('analyzing');

        try {
            // ─── Call Gemini analysis via Netlify function ───────────
            setAnalysisProgress('AI is reading the full contract...');
            const analysis: AnalysisResponse = await analyzeContract(extractedText, fileName);

            // ─── Store structured results ────────────────────────────
            setAnalysisProgress('Processing results...');

            // Map raw issues into ContractContext Issue[] format
            const versionId = (window as any).__flintContractMeta?.versionId || `cv_${Date.now()}`;
            const mappedIssues = mapToIssues(analysis.issues, versionId);
            setIssues(mappedIssues);

            // Store full analysis on window for Flint and templates to access
            (window as any).__flintAnalysisResults = analysis;

            setAnalysisStatus('complete');

            // ─── Save to Supabase (background — don't block UI) ──────
            saveContractToStorage(extractedText, fileName, analysis, {
                wordCount: fileStats?.words,
                charCount: fileStats?.chars,
                pageCount: fileStats?.pages,
            }).then(({ contractId }) => {
                console.log(`[ContractUpload] Saved to Supabase: ${contractId}`);
                (window as any).__flintContractId = contractId;
            }).catch((err) => {
                console.warn('[ContractUpload] Failed to save to Supabase (non-blocking):', err);
            });

            // ─── Notify Flint with structured analysis summary ───────
            const flintMessage = buildFlintNotification(analysis);
            notifyTele(flintMessage);

            setStage('preview');
            setAnalysisProgress('');

        } catch (error) {
            console.error('[ContractUpload] Analysis failed:', error);
            const errorMsg = error instanceof Error ? error.message : 'Analysis failed unexpectedly';
            setAnalysisStatus('error');
            setAnalysisError(errorMsg);
            setStage('error');
            setErrorMessage(`Analysis failed: ${errorMsg}. You can try again or chat with Flint directly.`);
            setAnalysisProgress('');

            // Fallback: still notify Flint with the preview so the user isn't stuck
            const preview = extractedText.slice(0, 2000);
            notifyTele(`${submitActionPhrase}\n\nContract: "${fileName}"\nWord count: ${fileStats?.words || 0}\n\nNote: Automated analysis failed, but here are the first 2000 characters for manual review:\n${preview}`);
        }
    }, [extractedText, fileName, fileStats, submitActionPhrase, playClick, setContractText, setIssues, setAnalysisStatus, setAnalysisError]);

    // ─── Reset ───────────────────────────────────────────────────────────

    const handleReset = useCallback(() => {
        playClick();
        setStage('idle');
        setExtractedText('');
        setPastedText('');
        setFileName('');
        setFileStats(null);
        setWarnings([]);
        setErrorMessage('');
    }, [playClick]);

    // ─── Render ──────────────────────────────────────────────────────────

    return (
        <div className="glass-medium rounded-2xl p-6 md:p-8 h-full">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h3>
                {subheadline && <p className="text-mist/60">{subheadline}</p>}
            </div>

            {/* Data Handling Notice — expandable privacy disclosure */}
            <DataHandlingNotice compact className="mb-6" />

            {/* ─── EXTRACTION IN PROGRESS ─── */}
            {stage === 'extracting' && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-mist/60 text-lg">Extracting text from <span className="text-white font-medium">{fileName}</span>...</p>
                    <p className="text-mist/40 text-sm">This may take a moment for large files.</p>
                </div>
            )}

            {/* ─── ANALYSIS IN PROGRESS ─── */}
            {stage === 'analyzing' && (
                <div className="flex flex-col items-center justify-center py-16 gap-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border-2 border-primary/20 flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping" />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-white text-lg font-medium">Analyzing Contract</p>
                        <p className="text-mist/60 text-sm">{analysisProgress || 'Reading the full document...'}</p>
                        <p className="text-mist/40 text-xs">Gemini AI is reviewing every clause for risks, obligations, and financial terms.</p>
                    </div>
                    <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                </div>
            )}

            {/* ─── ERROR STATE ─── */}
            {stage === 'error' && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-red-300 text-center max-w-md">{errorMessage}</p>
                    <button
                        onClick={handleReset}
                        className="mt-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-mist hover:bg-white/10 transition-all"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* ─── PREVIEW / READY TO ANALYZE ─── */}
            {stage === 'preview' && (
                <div className="space-y-4">
                    {/* File Info Bar */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-white font-medium">{fileName}</p>
                                <p className="text-mist/50 text-sm">
                                    {fileStats?.words?.toLocaleString()} words · {fileStats?.chars?.toLocaleString()} characters
                                    {fileStats?.pages && ` · ${fileStats.pages} pages`}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleReset}
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                            aria-label="Remove file"
                        >
                            <X className="w-4 h-4 text-mist/50" />
                        </button>
                    </div>

                    {/* Warnings */}
                    {warnings.length > 0 && (
                        <div className="space-y-2">
                            {warnings.map((w, i) => (
                                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-amber-300/70">{w}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Text Preview */}
                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 max-h-48 overflow-y-auto">
                        <p className="text-mist/40 text-xs font-medium uppercase tracking-wider mb-2">Preview</p>
                        <p className="text-mist/60 text-sm whitespace-pre-wrap leading-relaxed font-mono">
                            {extractedText.slice(0, 1000)}
                            {extractedText.length > 1000 && (
                                <span className="text-mist/30">... ({(extractedText.length - 1000).toLocaleString()} more characters)</span>
                            )}
                        </p>
                    </div>

                    {/* PII Detection Warning */}
                    {containsHighSeverityPII(extractedText) && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/15">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-red-300/80 font-medium mb-0.5">Sensitive data detected</p>
                                <p className="text-xs text-red-300/50">
                                    This document may contain personally identifiable information (SSN, credit card numbers, etc.).
                                    Sensitive data will be masked in the review display but is still processed for analysis.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Analyze Button */}
                    <button
                        onClick={handleAnalyze}
                        className="w-full px-6 py-4 rounded-full font-semibold text-lg
                            bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all flex items-center justify-center gap-3"
                    >
                        <CheckCircle className="w-5 h-5" />
                        {submitLabel}
                    </button>
                </div>
            )}

            {/* ─── IDLE / UPLOAD INTERFACE ─── */}
            {(stage === 'idle' || stage === 'dragging') && (
                <div className="space-y-4">
                    {/* Tab Switcher */}
                    {showPasteOption && (
                        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                            <button
                                onClick={() => { setActiveTab('file'); playClick(); }}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                                    ${activeTab === 'file'
                                        ? 'bg-white/10 text-white'
                                        : 'text-mist/50 hover:text-mist/70'
                                    }`}
                            >
                                <FileUp className="w-4 h-4" />
                                Upload File
                            </button>
                            <button
                                onClick={() => { setActiveTab('paste'); playClick(); }}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                                    ${activeTab === 'paste'
                                        ? 'bg-white/10 text-white'
                                        : 'text-mist/50 hover:text-mist/70'
                                    }`}
                            >
                                <ClipboardPaste className="w-4 h-4" />
                                Paste Text
                            </button>
                        </div>
                    )}

                    {/* File Upload Tab */}
                    {activeTab === 'file' && (
                        <>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={openFileDialog}
                                className={`relative cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200
                                    ${stage === 'dragging'
                                        ? 'border-primary bg-primary/5 scale-[1.01]'
                                        : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                                    }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    aria-label="Upload contract file"
                                />

                                <div className="flex flex-col items-center gap-4">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all
                                        ${stage === 'dragging'
                                            ? 'bg-primary/20 border border-primary/30'
                                            : 'bg-white/5 border border-white/10'
                                        }`}
                                    >
                                        <Upload className={`w-7 h-7 transition-colors ${stage === 'dragging' ? 'text-primary' : 'text-mist/50'}`} />
                                    </div>

                                    <div>
                                        <p className="text-white font-medium text-lg mb-1">
                                            {stage === 'dragging' ? 'Drop your file here' : 'Drag and drop your contract'}
                                        </p>
                                        <p className="text-mist/40 text-sm">
                                            or <span className="text-primary underline underline-offset-2">browse files</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 text-mist/30 text-xs">
                                        <span>PDF</span>
                                        <span className="w-1 h-1 rounded-full bg-mist/20" />
                                        <span>DOCX</span>
                                        <span className="w-1 h-1 rounded-full bg-mist/20" />
                                        <span>TXT</span>
                                        <span className="w-1 h-1 rounded-full bg-mist/20" />
                                        <span>Max {maxFileSizeMB} MB</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Paste Text Tab */}
                    {activeTab === 'paste' && (
                        <div className="space-y-4">
                            <textarea
                                value={pastedText}
                                onChange={(e) => setPastedText(e.target.value)}
                                placeholder="Paste your contract text here..."
                                className="w-full min-h-[200px] px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white text-sm
                                    placeholder:text-mist/30 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10
                                    resize-y font-mono leading-relaxed"
                                aria-label="Paste contract text"
                            />

                            {/* Word count hint */}
                            {pastedText.length > 0 && (
                                <p className="text-mist/40 text-xs text-right">
                                    {pastedText.split(/\s+/).filter(w => w.length > 0).length.toLocaleString()} words
                                </p>
                            )}

                            <button
                                onClick={handlePasteSubmit}
                                disabled={!pastedText.trim()}
                                className={`w-full px-6 py-4 rounded-full font-semibold text-lg transition-all
                                    ${pastedText.trim()
                                        ? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]'
                                        : 'bg-white/5 text-mist/40 cursor-not-allowed'
                                    }`}
                            >
                                Process Text
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ContractUpload;
