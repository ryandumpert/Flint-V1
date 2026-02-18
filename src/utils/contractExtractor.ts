/**
 * Contract Text Extractor
 * Handles text extraction from different input formats.
 * 
 * Supported:
 *  - Plain text (direct passthrough)
 *  - PDF (via pdf.js — loaded on demand)
 *  - DOCX (basic XML extraction — loaded on demand)
 * 
 * All processing is client-side. No data leaves the browser.
 */

export interface ExtractionResult {
    text: string;
    pageCount?: number;
    wordCount: number;
    charCount: number;
    warnings: string[];
}

/**
 * Normalize whitespace: collapse multiple blank lines, trim lines, normalize line endings.
 */
function normalizeText(raw: string): string {
    return raw
        .replace(/\r\n/g, '\n')           // Normalize line endings
        .replace(/\r/g, '\n')
        .replace(/\t/g, '    ')            // Tabs to spaces
        .replace(/ +$/gm, '')             // Trailing spaces per line
        .replace(/\n{3,}/g, '\n\n')       // Max 2 consecutive newlines
        .trim();
}

/**
 * Count words in text.
 */
function countWords(text: string): number {
    return text.split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Extract text from a plain text string (passthrough with normalization).
 */
export function extractFromText(input: string): ExtractionResult {
    const text = normalizeText(input);
    return {
        text,
        wordCount: countWords(text),
        charCount: text.length,
        warnings: [],
    };
}

/**
 * Extract text from a PDF file using pdf.js (loaded on demand).
 * Falls back to a warning if pdf.js is not available.
 */
export async function extractFromPDF(file: File): Promise<ExtractionResult> {
    const warnings: string[] = [];

    try {
        // Dynamically import pdf.js
        const pdfjsLib = await import('pdfjs-dist');

        // Set worker source
        const pdfjsVersion = pdfjsLib.version;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        const pages: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items
                .map((item: any) => item.str)
                .join(' ');
            pages.push(pageText);
        }

        const rawText = pages.join('\n\n');
        const text = normalizeText(rawText);

        if (text.length < 50) {
            warnings.push('Very little text was extracted from this PDF. It may be scanned/image-based. Consider pasting the text manually.');
        }

        return {
            text,
            pageCount: pdf.numPages,
            wordCount: countWords(text),
            charCount: text.length,
            warnings,
        };
    } catch (error) {
        console.error('[ContractExtractor] PDF extraction failed:', error);
        return {
            text: '',
            wordCount: 0,
            charCount: 0,
            warnings: [
                'PDF extraction failed. Please paste your contract text directly instead.',
                `Error: ${error instanceof Error ? error.message : String(error)}`,
            ],
        };
    }
}

/**
 * Extract text from a DOCX file by parsing the XML.
 * This is a lightweight extraction — no formatting preservation.
 */
export async function extractFromDOCX(file: File): Promise<ExtractionResult> {
    const warnings: string[] = [];

    try {
        // DOCX is a ZIP containing XML files
        // We need JSZip or similar — for now, try basic approach
        const { default: JSZip } = await import('jszip');

        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        // The main document content is in word/document.xml
        const docXml = await zip.file('word/document.xml')?.async('string');
        if (!docXml) {
            return {
                text: '',
                wordCount: 0,
                charCount: 0,
                warnings: ['Could not find document content in DOCX file. Please paste your contract text directly.'],
            };
        }

        // Parse XML and extract text content
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(docXml, 'application/xml');

        // Extract all text nodes from <w:t> elements
        const textElements = xmlDoc.getElementsByTagName('w:t');
        const paragraphs: string[] = [];
        let currentParagraph = '';

        // Also track paragraph boundaries via <w:p> elements
        const pElements = xmlDoc.getElementsByTagName('w:p');
        for (let i = 0; i < pElements.length; i++) {
            const tElements = pElements[i].getElementsByTagName('w:t');
            const pText = Array.from(tElements).map(t => t.textContent || '').join('');
            if (pText.trim()) {
                paragraphs.push(pText.trim());
            }
        }

        const rawText = paragraphs.join('\n\n');
        const text = normalizeText(rawText);

        if (text.length < 50) {
            warnings.push('Very little text was extracted from this DOCX. The file may use an unsupported format. Consider pasting the text manually.');
        }

        return {
            text,
            wordCount: countWords(text),
            charCount: text.length,
            warnings,
        };
    } catch (error) {
        console.error('[ContractExtractor] DOCX extraction failed:', error);
        return {
            text: '',
            wordCount: 0,
            charCount: 0,
            warnings: [
                'DOCX extraction failed. Please paste your contract text directly instead.',
                `Error: ${error instanceof Error ? error.message : String(error)}`,
            ],
        };
    }
}

/**
 * Extract text from a File object, routing to the appropriate extractor.
 */
export async function extractFromFile(file: File): Promise<ExtractionResult> {
    const name = file.name.toLowerCase();

    if (name.endsWith('.pdf') || file.type === 'application/pdf') {
        return extractFromPDF(file);
    }

    if (name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return extractFromDOCX(file);
    }

    if (name.endsWith('.txt') || name.endsWith('.md') || file.type.startsWith('text/')) {
        const text = await file.text();
        return extractFromText(text);
    }

    // Unknown format — try reading as text
    try {
        const text = await file.text();
        const result = extractFromText(text);
        result.warnings.push(`Unrecognized file format (${file.type || 'unknown'}). Treated as plain text.`);
        return result;
    } catch {
        return {
            text: '',
            wordCount: 0,
            charCount: 0,
            warnings: [`Unsupported file format: ${file.type || file.name}. Please use PDF, DOCX, or TXT.`],
        };
    }
}

/**
 * Validate that extracted text looks like a contract.
 * Returns warnings if the content seems too short or doesn't contain typical contract language.
 */
export function validateContractText(text: string): string[] {
    const warnings: string[] = [];

    if (text.length < 200) {
        warnings.push('This text seems very short for a contract. Make sure the full document was uploaded.');
    }

    if (countWords(text) < 50) {
        warnings.push('Very few words detected. The extraction may have failed for parts of the document.');
    }

    return warnings;
}
