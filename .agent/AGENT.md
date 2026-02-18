# Agent Instructions: Contract Risk Review Persona Migration

## Purpose
Transform the existing `cash-v1` application (loan-scenario AI persona) into a contract review application with:

1. **Contract upload + storage**
2. **AI persona that reviews and discusses the contract**

The new AI persona must be named `Flint`. The previous persona was named `cash` and must be fully replaced with `Flint` across prompts, configuration, routing, tooling, and UI references.

Do **not** rename or modify `glass`. `glass` refers to the template flow/rendering system in front of the user and must remain unchanged.

This file defines **how you (the agent) work**. It must not contain the final product spec. The product spec lives in `blueprint.md`, which you must treat as the source of truth for *what to build*.

> **Non-overlap rule**: `agent.md` describes *process and execution strategy*. `blueprint.md` describes *requirements and implementation details*. Do not copy blueprint content into this file.

## Inputs
- Repository: `cash-v1` (current state)
- Target spec: `blueprint.md`

## Outputs
- A working application that satisfies `blueprint.md`
- Updated/added files, tests, and documentation as required by the blueprint

## Operating Principles
- **Do not rewrite everything**: prefer targeted refactors that preserve existing working patterns.
- **Follow existing app conventions**: routing, state, component style, build tooling, linting.
- **Minimalistic UI**: remove loan-specific UI affordances and replace with contract-focused UI, but keep design language.
- **Security-first**: treat contracts as sensitive data; prefer local processing or secure server-side flows as in blueprint.

## Execution Workflow

### Phase 0 — Repo Recon
1. Identify the app framework and runtime:
   - Web stack (Next.js/React/Vite/etc.)
   - Backend (API routes, server, cloud functions)
   - Storage (local, database, object storage)
2. Map existing “persona” implementation:
   - Locate persona configuration (system prompts, tools, templates)
   - Identify the *current persona name* (`cash`) and how it is selected
   - Rename and reconfigure `cash` to `Flint` consistently across the codebase
   - Explicitly preserve all `glass`-related modules, naming, and flow logic (no renaming)
3. Locate key UX infrastructure:
   - `navigateToSection` (or similarly named) mechanism
   - Template rendering system for AI output
   - File upload components (if any)
   - Conversation UI + message schema

**Deliverable (internal):** a short inventory note in your scratchpad (not committed) listing file paths and responsibilities.

### Phase 1 — Create a Migration Plan
Use `blueprint.md` to produce a concrete task list:
- Routes/pages to add/modify
- Components to add/modify
- API endpoints to add/modify
- Data model/storage changes
- Prompting/tooling changes
- Testing plan

Prefer incremental commits:
1. Remove loan domain artifacts
2. Add contract domain primitives
3. Add contract upload
4. Add analysis generation
5. Add highlight + redline UI
6. Add chat features and navigation
7. Harden security and add tests

### Phase 2 — Domain Swap (Loan → Contract)
Replace the domain language everywhere:
- Rename copy, labels, examples, and placeholders
- Remove loan calculators, scenario widgets, underwriting-specific prompts
- Re-scope persona instructions to contract review

Rules:
- Preserve the base shell layout, theme, and navigation patterns.
- Remove dead code paths rather than leaving disabled toggles.

### Phase 3 — Contract Ingestion Pipeline
Implement the contract upload and processing flow as described in `blueprint.md`.

Checklist:
- Supported file types and size limits
- Text extraction and normalization
- Chunking/indexing strategy (if used)
- Storage and retrieval
- Re-analysis triggers (re-upload, revision)

### Phase 4 — Analysis + Template Output
Implement the contract analysis pass:
- Generate a set of **issues** (red flags) with location anchors
- Attach **explanations** and **suggested edits** (add/remove/change)
- Provide **value rationale** for each edit

Then wire templates:
- All user-facing AI output templates must be clearly and explicitly defined in `glass-prompt.md`.
- If a template already exists in `glass-prompt.md`, update it to reflect the contract domain but preserve its structural conventions.
- Any section, comment, or block in `glass-prompt.md` marked "do not remove" must be preserved exactly as written.
- Do not delete or rename existing `glass` flow constructs; extend them for contract use.
- Ensure each issue renders with clear:
  - Exact quoted text
  - Why it matters
  - Suggested edit (diff/redline style)
  - Risk category + severity
  - Optional fallback language

### Phase 5 — Conversation + Navigation
Upgrade the chat persona to:
- Answer questions grounded in the uploaded contract
- Navigate/quote specific sections
- Read back full contract or selected ranges
- Summarize at multiple granularities

Maintain and reuse:
- Existing chat UI patterns
- Existing `navigateToSection` integration
- Existing message schema (extend minimally)

### Phase 6 — Hardening
Implement:
- PII/secret handling (masking where appropriate)
- Access controls (workspace/user boundary)
- Audit logging of access and actions
- Safe-mode behaviors (uncertainty, disclaimers, escalation)

### Phase 7 — Testing + QA
Add tests described in `blueprint.md`:
- Unit tests for parsing and issue extraction helpers
- Integration tests for upload → analyze → render
- UI tests for highlight navigation

Also:
- Validate performance on long contracts
- Validate correctness of anchors across formats

### Phase 8 — Documentation
Ensure:
- Setup instructions remain accurate
- Add any new environment variables
- Update README only as required by blueprint

## Required Implementation Behaviors

### Use the Blueprint as Authority
- When you see a mismatch between existing behavior and `blueprint.md`, change the code to match the blueprint.
- If code conventions conflict with blueprint’s intent, prefer blueprint.

### Keep Diffs Reviewable
- Prefer renames and small PR-sized commits.
- Avoid formatting-only churn.

### Template Fidelity
- The UI must make it easy to:
  - Spot concerning language quickly
  - Understand why it matters
  - Apply suggested edits with minimal friction

### Safety + Legal Guardrails
- Do not present advice as a substitute for counsel.
- Always distinguish:
  - factual extraction (what the contract says)
  - risk interpretation (why it may matter)
  - optional drafting suggestions (alternatives)

## Acceptance Criteria
The migration is complete when:
- The app satisfies every requirement in `blueprint.md`
- All loan-specific features are removed or fully repurposed
- A user can:
  - upload a contract
  - receive a structured red-flag report with highlights and suggestions
  - chat with the persona about any clause with anchored references
  - get summaries and read-back behavior

## Start Command
1. Open and follow `blueprint.md`.
2. Execute the phases above.

