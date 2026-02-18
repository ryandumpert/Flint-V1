# Migration Plan: Cash (Air Loan) → Flint (Contract Risk Review)

## Phase 0 Inventory

### Stack
- **Framework:** Vite + React 18 + TypeScript
- **Styling:** Tailwind CSS 3 + custom CSS (`index.css` ~83KB)
- **Routing:** react-router-dom v7
- **AI Integration:** Mobeus UIFramework (external CDN), Google GenAI (image/video gen)
- **State:** React Context (CarColor, Lightboard, ShadowEffects, Volume)
- **Components:** 84 in `src/components/`, 39 templates

### Persona Implementation
- **Current persona name:** `Cash`
- **Current company:** `Air Loan`
- **System prompts:** `public/prompts/glass-prompt.md`, `public/prompts/tele-knowledge.md`
- **UI references:** `index.html` (meta tags, structured data), `SEO.tsx`, `Logo.tsx`, `TelelaborIcons.tsx`, `Navigation.tsx`, `ImageGeneratingState.tsx`
- **Template references:** `MortgageReview.tsx`, `WelcomeCarousel.tsx`, all mortgage-specific templates

### Key Infrastructure (PRESERVE)
- `navigateToSection` mechanism in `Index.tsx` (lines 872-1034)
- `DynamicSectionLoader.tsx` (generative template renderer)
- `TEMPLATE_REGISTRY` in `src/data/templateRegistry.ts`
- `useUIFrameworkChat.tsx` (chat hook)
- `TelelaborSection.tsx` (chat + avatar panel)
- `glass` system — NO renames

### Loan-Specific Components (REMOVE/REPLACE)
- `MortgageReview.tsx` — replace with `ContractSummary.tsx`
- `RentalPropertyReview.tsx` — remove
- `FlipPropertyReview.tsx` — remove
- `RentalDataCapture.tsx` — replace with `ContractUpload.tsx`
- `FlipDataCapture.tsx` — remove
- `ComplianceConsent.tsx` — repurpose for legal disclaimer
- `ConsultationScheduler.tsx` — remove
- `PartyConfirmation.tsx` — repurpose for contract party confirmation

### Contexts to Remove/Repurpose
- `CarColorContext.tsx` — remove (loan-specific)

---

## Task List (Incremental)

### Phase 2: Domain Swap ✅ COMPLETE
- [x] Create migration plan
- [x] Rename all `Cash` → `Flint` in UI labels, aria, alt text, comments
- [x] Rename `Air Loan` → `Flint` company branding
- [x] Update `index.html` meta tags, structured data, SEO
- [x] Update `SEO.tsx` defaults and presets
- [x] Update `Logo.tsx` branding
- [x] Update `TelelaborIcons.tsx` avatar labels
- [x] Update `ImageGeneratingState.tsx` labels
- [x] Update `Navigation.tsx` labels + nav items (contract-specific)
- [x] Update `WelcomeCarousel.tsx` comment
- [x] Update `uiFrameworkRegistration.ts` comment
- [x] Replace loan-specific welcome variants in `Index.tsx` with contract-review content
- [x] Rewrite `glass-prompt.md` with contract review templates + shot prompts
- [x] Rewrite `tele-knowledge.md` with Flint persona + contract domain knowledge
- [x] Fix logo imports (point to existing `air-loan-logo.png`)
- [x] Build passes ✅

### Phase 3: Contract Ingestion Pipeline ✅ COMPLETE
- [x] Create `ContractUpload.tsx` template (drag-drop, PDF/DOCX/TXT, paste text, preview, stats)
- [x] Create contract text extraction utility (`contractExtractor.ts` — PDF via pdfjs-dist, DOCX via jszip, TXT)
- [x] Create contract storage model (in-memory `ContractVersion`, `Issue`, `SuggestedEdit`, `Anchor` types)
- [x] Create contract context/provider (`ContractContext.tsx` — session-scoped state, derived groupings)
- [x] Wire upload → extract → store pipeline (ContractUpload → contractExtractor → notifyTele)
- [x] Register `ContractUpload` template in registry and `glass-prompt.md`
- [x] Wire `ContractProvider` into `App.tsx`
- [x] Install dependencies (`pdfjs-dist`, `jszip`)
- [x] Build passes ✅

### Phase 4: Analysis + Template Output ✅ COMPLETE
- [x] Create `IssueCard.tsx` template (severity-colored, redline edits, copy/navigate/ask actions)
- [x] Create `ContractSummary.tsx` template (overview, risk score bar, key details grid, key risks)
- [x] Create `ObligationsTable.tsx` template (sortable, searchable, severity dots, clause refs)
- [x] Create `MoneyTerms.tsx` template (grouped by category, severity-colored, total value display)
- [x] Create `ContractViewer.tsx` (center panel with highlights, search, zoom, copy-all, click-to-inspect)
- [x] Create `IssuesList.tsx` (left panel with severity filters, search, sort, group-by, active state)
- [x] Create `contractAnalysis.ts` utility (taxonomy, scoring, anchor resolution, AI response parsing, prop builders)
- [x] Register all 7 contract templates in `templateRegistry.ts` (v108.0, 28 core + 3 aliases)
- [x] Document all templates in `glass-prompt.md` with JSON examples and prop specs (v6.0)
- [x] Update shot prompts (3, 4, 5) to use new templates
- [x] Build passes ✅

### Phase 5: Conversation + Navigation ✅ COMPLETE
- [x] Wire chat grounding to contract text (`contractGrounding.ts` — context enrichment, clause search, issue prompts)
- [x] Add quick action buttons in chat (`ContractQuickActions.tsx` — 7 actions: Summarize, Top Risks, Termination, Liability, Obligations, Financials, Draft Safer Language)
- [x] Integrate quick actions into chat panel (`TelelaborSection.tsx` — appears above input when contract loaded)
- [x] Support "show me clause" → navigate + highlight (Shot 6 in glass-prompt.md, `parseClauseNavigationRequest` + `findClauseInText`)
- [x] Support contract summarization at multiple levels (Shots 4/8 — contract level, section level, issue level)
- [x] Full analysis view pattern documented (Shot 7 — ContractViewer + IssuesList combined)
- [x] Updated glass-prompt.md best practices for new templates (v6.0 → 8 shots total)
- [x] Build passes ✅

### Phase 6: Hardening ✅ COMPLETE
- [x] Add legal disclaimer (`LegalDisclaimer.tsx` — persistent dismissible banner, session-scoped, not legal advice warning)
- [x] Integrate legal disclaimer into Index.tsx (renders at bottom of viewport)
- [x] Data handling notice in UI (`DataHandlingNotice.tsx` — full and compact modes, 4 privacy data points)
- [x] Replace ContractUpload privacy one-liner with expandable DataHandlingNotice
- [x] PII masking utility (`piiMasking.ts` — SSN, credit card, email, phone, bank routing, DOB detection + masking)
- [x] PII detection warning in ContractUpload preview (alerts when high-severity PII detected)
- [x] Build passes ✅

### Phase 7: Testing ✅ COMPLETE
- [x] Set up Vitest + testing-library (`vitest.config.ts`, `setup.ts`, `npm test` script)
- [x] Unit tests for core utilities (`contractExtractor`, `piiMasking`, `contractGrounding` — 64 tests)
- [x] Integration tests for `ContractUpload` UI flow (2 tests)
- [x] Performance benchmarks for long texts (`performance.test.ts` — verified 1MB extraction < 10ms, masking < 2s)
- [x] Created `TESTING.md` guide for manual verification scenarios

### Phase 8: Cleanup ✅ COMPLETE
- [x] Removed 5 legacy mortgage/loan templates: `MortgageReview`, `RentalPropertyReview`, `FlipPropertyReview`, `RentalDataCapture`, `FlipDataCapture`
- [x] Removed 3 legacy template aliases from registry (`TextImageLeft`, `TextImageRight`, `TwoColumns`)
- [x] Removed legacy window types from `vite-env.d.ts` (`updateLeaseCalculator`, `updateFinanceAndLeaseCalculator`, `updateMortgageReview`)
- [x] Removed `CarColorContext` — deleted file, removed from `App.tsx`, `Index.tsx`, and `uiFrameworkRegistration.ts`
- [x] Cleaned template registry: 31 entries → 22 entries (v2.0)
- [x] Created `README.md` — features, tech stack, project structure, testing, privacy
- [x] Build passes ✅
- [x] All 68 tests pass ✅

---

## 🎉 MIGRATION COMPLETE

All 8 phases successfully delivered. The application has been fully migrated from a mortgage/loan product to a contract review platform.

