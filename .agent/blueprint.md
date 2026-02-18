# Blueprint: Contract Risk Review Web App (Migration from `cash-v1`)

## Overview
Build a minimalistic contract review web application that:

1. Lets a user upload a contract document.
2. Automatically analyzes the contract to identify red flags and risky language.
3. Presents issues in a highly scannable UI with highlighted source text, explanation, and suggested edits.
4. Provides an AI persona chat that can discuss the contract, navigate to specific sections, summarize, and read back content.

This blueprint assumes you are **migrating** an existing app (`cash-v1`) that already contains:
- An AI persona/chat UX
- A templating system for structured AI output
- A `navigateToSection` (or similarly named) navigation mechanism

If names differ, map them during repo recon and preserve the equivalent behaviors.

## Goals
- Fast identification of contractual risk and ambiguity.
- Frictionless review workflow: highlight → understand → apply edit.
- High trust: every claim links back to exact contract text.
- Minimal UI: contract viewer, issues list, chat.
- Works well for long contracts.

## Non-Goals
- Full document authoring suite (Word-like editor).
- Automated negotiation with counterparties.
- Jurisdiction-specific legal opinions.
- Replacing legal counsel.

## Assumptions
- Users have rights/authority to upload contracts.
- The app can process common document formats (PDF and DOCX) and plain text.
- The underlying AI provider is already integrated in `cash-v1` (reuse that integration).
- Authentication/tenancy in `cash-v1` (if any) should be retained.

## User Experience

### Primary Screens

#### 1) Contract Workspace
A single workspace centered around a single contract version.

Layout (minimal):
- **Left panel**: Issues list (filter + severity)
- **Center panel**: Contract viewer (text with highlights + anchor navigation)
- **Right panel**: AI persona chat (context-aware, with quick actions)

If the existing app has a different layout, preserve its shell but enforce these three functional zones.

#### 2) Upload / New Contract
- Drag-and-drop upload
- Metadata (optional): contract name, counterparty, date, jurisdiction, contract type
- “Analyze” action triggers initial review

#### 3) History (Optional)
- Contract versions list
- Re-run analysis on a specific version

### Key Interactions
- Clicking an issue scrolls the contract viewer to the clause and highlights it (reuse `navigateToSection`).
- User can apply suggested edits:
  - **Add**: insert suggested language at an anchor location
  - **Remove**: propose deletion
  - **Change**: redline-like replacement
- Chat supports:
  - “Summarize the whole contract”
  - “Summarize section X”
  - “Read section X aloud” (text read-back UI; actual audio optional)
  - “Where is the termination clause?”
  - “Why is this risky?”

## Data Model

### Contract
- `id`
- `ownerId` / `workspaceId`
- `title`
- `counterparty` (optional)
- `jurisdiction` (optional)
- `type` (optional)
- `createdAt`, `updatedAt`

### ContractVersion
- `id`
- `contractId`
- `uploadedBy`
- `sourceFilename`
- `mimeType`
- `sizeBytes`
- `storageRef` (object storage key or db blob ref)
- `extractedText` (stored or derived)
- `textHash` (for caching)
- `createdAt`

### Issue (Red Flag)
- `id`
- `contractVersionId`
- `title`
- `category` (see taxonomy below)
- `severity` (`low` | `medium` | `high` | `critical`)
- `riskType` (`legal` | `commercial` | `operational` | `security` | `privacy` | `compliance`)
- `confidence` (0–1)
- `anchor` (stable pointer into contract text)
- `quote` (exact contract excerpt)
- `whyConcern` (brief explanation)
- `suggestedEdits[]`
- `discussionPrompts[]` (optional quick chat starters)
- `createdAt`

### SuggestedEdit
- `type` (`add` | `remove` | `change`)
- `proposedText` (for add/change)
- `replacementText` (for change)
- `target` (anchor or range)
- `value` (why it helps)
- `tradeoffs` (optional)

### Chat
- `threadId`
- `contractVersionId`
- `messages[]` with role + content + references

### Anchor Format
Anchors must be stable across minor formatting changes.

Prefer a hybrid:
- `startOffset` + `endOffset` in **normalized extracted text**
- plus a `fingerprint` (hash of nearby context window)

Example:
```json
{
  "start": 10234,
  "end": 10412,
  "fingerprint": "sha256:...",
  "contextWindow": { "before": 80, "after": 80 }
}
```

## Contract Viewer

### Requirements
- Render extracted text in a scrollable container.
- Support highlights for issue anchors.
- Support deep linking (e.g., `?issue=...` or `#anchor=...`).
- Provide a “copy quote” action.
- Provide a “compare with suggested edit” redline view per issue.

### Highlight Rendering
- Maintain a map of `Issue.anchor` → DOM range.
- If offsets drift (PDF/DOCX extraction variance), fallback to matching `fingerprint` context.
- If still not found, display issue with a warning badge: “Could not locate in text; showing quote only.”

## Issue Taxonomy
Implement at least these categories:

- Parties & definitions
- Term & termination
- Payment & fees
- Scope of work / deliverables
- Change control
- IP ownership & licensing
- Confidentiality
- Data privacy & security
- Warranties
- Indemnification
- Limitation of liability
- Insurance
- Compliance / regulations
- Dispute resolution
- Governing law & venue
- Assignment / subcontracting
- Non-solicit / non-compete
- Service levels / uptime
- Audit rights
- Publicity
- Force majeure
- Notice
- Survival

## AI Persona

The AI persona for this application must be named `Flint`.

- The previous persona name was `Cash`.
- All references to `Cash` in prompts, configuration, routing, environment variables, tests, and UI labels must be renamed to `Flint`.
- The rename must be comprehensive and leave no residual `Cash` persona identifiers in the system.
- This rename does not apply to `glass` (template flow system), which must remain unchanged.


### Persona Objectives
The persona must:
- Identify risky or unusual provisions.
- Explain concerns in plain English.
- Provide actionable drafting suggestions.
- Always cite the contract text it is referencing.
- Provide summaries and read-back.
- Support clause-level navigation using the existing `navigateToSection` tooling.

### Guardrails
- Include a disclaimer that it is not legal advice.
- Distinguish:
  - what the contract says (quote)
  - why it may matter (risk)
  - drafting options (suggestions)
- If asked jurisdiction-specific legal conclusions, respond with general guidance and suggest consulting counsel.

### Capabilities

#### 1) Initial Review (Automated)
Triggered after upload (and on demand).

Outputs:
- `Issue[]` list with anchors and suggested edits.
- Contract summary.
- Key obligations & deadlines.
- Key monetary terms.

#### 2) Conversational Review
Chat must support:
- Q&A grounded in contract
- “Show me the clause” → navigate + highlight
- “Read section X” → return exact text for that section (and optionally a TTS-ready string)
- “Summarize” at:
  - contract level
  - section level
  - issue level

#### 3) Quick Actions
In chat UI, add buttons:
- “Summarize contract”
- “List top 10 risks”
- “Find termination”
- “Find limitation of liability”
- “Draft safer alternative language”

## AI Output Templates
All structured AI outputs must be rendered through templates that make review fast.

### Template: Issue Card
Each issue renders as a card with:
- **Title**
- **Category** + **Severity** badge
- **Quote** (exact excerpt)
- **Why it’s a concern** (2–5 sentences)
- **Suggested edit**
  - `add` / `remove` / `change`
  - Show in redline format
- **Why this helps** (value)
- Actions:
  - `Go to clause` (calls `navigateToSection`)
  - `Copy quote`
  - `Copy suggestion`
  - `Ask AI about this`

### Template: Contract Summary
- One-paragraph overview
- Bullet list:
  - parties
  - term
  - payment basics
  - termination rights
  - key risks

### Template: Obligations & Deadlines
Table:
- Obligation
- Owner (who)
- Deadline / trigger
- Where in contract (anchor)

### Template: Money Terms
Table:
- Fees
- Payment timing
- Late fees / interest
- Credits / refunds
- Taxes

## API Surface
Rework existing endpoints from `cash-v1` to contract-centric routes. Prefer the existing server/API style.

Minimum required endpoints:
- `POST /api/contracts` — create contract
- `POST /api/contracts/:id/upload` — upload file, create version
- `POST /api/contracts/:id/analyze` — run initial review on latest version
- `GET /api/contracts/:id` — contract metadata
- `GET /api/contracts/:id/versions/:versionId/text` — extracted text
- `GET /api/contracts/:id/versions/:versionId/issues` — issues
- `POST /api/contracts/:id/versions/:versionId/chat` — chat message

If `cash-v1` uses RPC/GraphQL instead of REST, provide equivalent operations.

## Document Processing

### Supported Inputs
- PDF
- DOCX
- TXT

### Extraction
- Convert to normalized plain text.
- Preserve rough sectioning when possible (headings, numbering).
- Store both:
  - original file (secured)
  - extracted normalized text

### Chunking
If the existing app already chunks content for AI context, reuse it.

Recommended approach:
- Chunk by headings/numbered clauses when detected.
- Otherwise chunk by paragraphs ~800–1200 tokens with overlap.

## Retrieval Grounding
For chat and analysis:
- Always ground answers in extracted text.
- Use retrieval (chunk search) for long documents.
- Return references:
  - issue ids
  - anchors
  - quotes

## Minimalistic UI Requirements
- Keep typography clean.
- Avoid dense dashboards.
- Prefer whitespace and clear hierarchy.
- Provide only the essentials:
  - Upload
  - Issues
  - Viewer
  - Chat
  - Filters

## Filters and Sorting
Issues list supports:
- Severity filter
- Category filter
- “Show only unresolved” (if resolution state exists)
- Sort by:
  - severity
  - document order
  - confidence

## Accessibility
- Keyboard navigation through issues.
- Visible focus states.
- High contrast for highlight colors.
- Screen-reader friendly labels.

## Security and Privacy
- Contracts are sensitive:
  - Encrypt at rest if storage supports.
  - Restrict access to owner/workspace.
  - Do not log full contract text in plaintext logs.
- Add a “data handling” notice in UI.

## Error Handling
- Upload failures: clear messaging + retry.
- Extraction failures: allow user to paste text.
- Analysis failures: show partial results if available.
- Anchor mismatch: show quote and request re-run.

## Performance
- Large PDFs must remain usable:
  - Virtualize contract viewer rendering.
  - Lazy render highlights.
- Cache:
  - extraction by `textHash`
  - analysis results by `textHash` + prompt version

## Testing
Minimum test coverage:

### Unit
- Anchor creation and resolution
- Text normalization
- Issue schema validation

### Integration
- Upload → extract → analyze → issues displayed
- Click issue → viewer navigates and highlights
- Chat → persona references correct quote/anchor

### Regression
- Very long contract (100+ pages):
  - viewer remains responsive
  - analysis completes within configured limits

## Migration Checklist (from `cash-v1`)
- Rename AI persona from `Cash` to `Flint` everywhere (prompts, config, tests, UI, routing, environment variables).
- Remove loan-specific persona prompts and templates.
- Replace domain copy.
- Replace any loan calculators/workflows with contract upload.
- Keep and repurpose:
  - persona engine
  - templating renderer (`glass` system — do not rename)
  - `navigateToSection` mechanism
  - conversation UI

## Done Definition
The project is done when:
- A user can upload a contract and receive a structured issues report.
- Each issue links to a highlighted location in the contract text.
- The AI persona can discuss and navigate the contract accurately.
- The UI is minimalistic and contract-review focused.
- Tests pass and basic security controls are in place.

