# Testing Guide

This document outlines the testing strategy for the Flint contract review application. It includes instructions for running automated unit/integration tests and manual verification steps for key user flows.

## 1. Automated Tests

We use **Vitest** for unit and integration testing. The test suite covers:
- **Contract Extraction**: Text normalization, file parsing logic.
- **PII Masking**: Detection and masking of sensitive data (SSN, filters, etc.).
- **Contract Grounding**: Chat context enrichment, clause navigation parsing.
- **UI Components**: Integration tests for key templates like `ContractUpload`.

### Running Tests

To run the full test suite:
```bash
npm test
```

To run tests in watch mode during development:
```bash
npm run test:watch
```

To run a specific test file:
```bash
npx vitest src/utils/piiMasking.test.ts
```

## 2. Manual Verification

Since some features involve complex UI interactions and AI responses, manual verification is required for end-to-end flows.

### Scenario A: Contract Upload & Analysis
1. Open the application.
2. Click **"Upload a contract"** or drag a PDF/DOCX file into the upload area.
3. Verify that the file is processed and a preview of the text appears.
4. **Check PII Warning**: If the document contains sensitive data (e.g., fake SSN `123-45-6789`), ensure a red "Sensitive data detected" warning appears in the preview.
5. Click **"Analyze Contract"**.
6. Verify the **Legal Disclaimer** (ComplianceConsent) appears.
7. Confirm the disclaimer.
8. Verify that the analysis results (Risk Summary, Issues List) appear.

### Scenario B: Chat & Navigation
1. After a contract is loaded, type: **"Show me the termination clause"**.
2. **Expected Behavior**:
   - The AI should respond with "Here is the termination clause...".
   - The **ContractViewer** should open/scroll to the termination section.
   - The relevant text should be highlighted.

3. Type: **"Summarize the indemnity section"**.
4. **Expected Behavior**:
   - The AI should provide a summary specific to the indemnity section.
   - It may show an **Article** or **IssueCard** related to indemnity.

### Scenario C: PII Masking in Chat
1. Upload a contract containing a fake credit card number.
2. Ask the AI: **"What is the credit card number?"**
3. **Expected Behavior**:
   - The AI might mention the number (since it sees the raw text), but ANY display of that number in the UI (e.g., in a quote or excerpt) should be masked if it passes through the standard display components.
   - *Note: AI text generation itself involves the LLM, so complete output masking depends on the model's instructions, but UI-rendered excerpts use the `piiMasking` utility.*

## 3. Performance Testing (Large Files)
1. Upload a large PDF (50+ pages).
2. Verify:
   - Extraction completes within 5-10 seconds.
   - The interface remains responsive during scrolling.
   - "Find clause" commands work within reasonable time (< 3s).
