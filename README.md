# Flint — AI Contract Review

**Flint** is an AI-powered contract review assistant built on the [Telelabor](https://telelabor.com) platform. Upload any contract (PDF, DOCX, or plain text) and Flint will identify risks, flag issues, and explain legal terms — all processed locally in your browser.

## Features

- **Contract Upload** — Drag & drop PDF, DOCX, or TXT files, or paste text directly
- **AI-Powered Analysis** — Gemini-based clause-by-clause risk identification
- **Issue Detection** — Flags critical, high, medium, and low severity issues
- **Contract Viewer** — Full-text viewer with highlighted risk zones and clause navigation
- **PII Protection** — Automatic detection and masking of sensitive personal data
- **Legal Disclaimer** — Clear, persistent notice that analysis is informational only
- **Chat Navigation** — Ask Flint to "show me the termination clause" and it scrolls right to it

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Vanilla CSS + Tailwind utilities |
| AI | Google Gemini (via `@google/generative-ai`) |
| PDF Parsing | pdf.js (loaded on demand) |
| DOCX Parsing | JSZip (loaded on demand) |
| Testing | Vitest + React Testing Library |
| Platform | Telelabor Runtime |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Production build
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── templates/          # 22 UI templates (contract review + general)
│   │   ├── ContractUpload.tsx
│   │   ├── ContractViewer.tsx
│   │   ├── ContractSummary.tsx
│   │   ├── IssueCard.tsx
│   │   ├── IssuesList.tsx
│   │   ├── ObligationsTable.tsx
│   │   ├── MoneyTerms.tsx
│   │   └── ...
│   ├── DataHandlingNotice.tsx
│   ├── LegalDisclaimer.tsx
│   └── Navigation.tsx
├── contexts/
│   ├── ContractContext.tsx  # Contract state management
│   ├── LightboardContext.tsx
│   └── VolumeContext.tsx
├── data/
│   └── templateRegistry.ts # Template lazy-loading registry
├── utils/
│   ├── contractExtractor.ts   # Text extraction (PDF, DOCX, TXT)
│   ├── contractGrounding.ts   # Chat context enrichment
│   └── piiMasking.ts          # PII detection and masking
├── test/
│   └── setup.ts
└── pages/
    └── Index.tsx
```

## Testing

```bash
# Run all tests (68 tests across 5 suites)
npm test

# Watch mode
npm run test:watch
```

See [`TESTING.md`](./TESTING.md) for manual verification scenarios.

## Privacy & Security

- **Browser-only processing** — No contract data leaves your device
- **Session-scoped** — All data is cleared when you close the tab
- **PII masking** — Sensitive data (SSN, credit cards, etc.) is automatically masked in UI
- **No logging** — Contract text is never logged or persisted

## License

Proprietary — Prime Intelligence / Ryan Dumpert
