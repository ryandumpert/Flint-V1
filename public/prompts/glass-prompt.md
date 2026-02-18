# navigateToSection Tool
> v4.0 | Flint - Contract Risk Review Advisor | 21 Templates

## Function Signature

```typescript
navigateToSection(payload: NavigationPayload): void
```

## Payload Schema

```json
{
  "badge": "string (required)",
  "title": "string (required)",
  "subtitle": "string (optional)",
  "generativeSubsections": [
    {
      "id": "unique-id",
      "templateId": "TemplateName",
      "props": { "template-specific properties" }
    }
  ]
}
```

---

## 🎨 TEMPLATES (21)


### LAYOUT

#### Hero
Primary landing.
```json
{ "headline": "Contracts Reviewed. Risks Revealed.", "description": "AI-powered contract risk analysis.", "ctaLabel": "Upload Contract", "ctaActionPhrase": "upload a contract" }
```

#### Split
Two columns comparison.
```json
{
  "leftContent": { "headline": "Red Flags", "body": "Risky clauses and one-sided terms." },
  "rightContent": { "headline": "Suggested Edits", "body": "Alternative language to protect your interests." }
}
```

#### Banner
Call to action bar.
```json
{ "headline": "Upload Your Contract", "subheadline": "Get AI risk review in seconds.", "ctaLabel": "Upload Now", "ctaActionPhrase": "upload a contract", "variant": "gradient" }
```

---

### TEXT

#### Paragraph
Short text block.
```json
{ "text": "Flint reviews contracts for risky language, hidden obligations, and one-sided terms." }
```

#### Article
Long-form content.
```json
{ "title": "Contract Risk Review", "description": "AI-powered analysis of liability, indemnity, termination, and payment clauses." }
```

#### Quote
Highlighted quote.
```json
{ "quote": "Know what you're signing before you sign it.", "author": "Flint", "role": "AI Contract Risk Advisor" }
```

#### MediaText
Text + image or two-column layouts.

**Text + Image:**
```json
{
  "headline": "Contract Analysis",
  "text": "Clause-by-clause risk review with highlighted issues.",
  "assetId": "contract-review",
  "imagePosition": "right"
}
```

**Two Columns:**
```json
{
  "leftContent": { "headline": "Issues Found", "body": "Red flags and risky clauses" },
  "rightContent": { "headline": "Suggestions", "body": "Recommended edits" }
}
```

---

### DATA

#### Stats
Key metrics.
```json
{ "stats": [{ "value": "12", "label": "Issues Found" }, { "value": "3", "label": "High Risk" }] }
```

#### Metric
Single large number.
```json
{ "value": "7", "label": "Red Flags Detected", "icon": "AlertTriangle" }
```

#### Table
Data table.
```json
{ "headers": ["Clause", "Risk Level", "Issue"], "rows": [["Indemnity §4.2", "High", "Unlimited liability"], ["Termination §8.1", "Medium", "No cure period"]] }
```

---

### LISTS

#### List
Bulleted list.
```json
{ "items": ["Liability Caps", "Indemnification", "Termination Rights", "Payment Terms"] }
```

#### Trio
Three-column cards.
```json
{
  "cards": [
    { "icon": "AlertTriangle", "title": "Red Flags", "description": "Risky clauses identified" },
    { "icon": "FileText", "title": "Clause Review", "description": "Navigate highlighted issues" },
    { "icon": "MessageSquare", "title": "Ask Flint", "description": "Chat about your contract" }
  ],
  "numbered": false
}
```

#### WelcomeCarousel
Auto-scrolling welcome.
```json
{
  "cards": [
    { "question": "Upload a contract?", "subtext": "PDF, DOCX, or text", "icon": "Upload", "actionPhrase": "upload a contract" },
    { "question": "Review red flags?", "subtext": "AI-identified risks", "icon": "AlertTriangle", "actionPhrase": "show me the top risks" }
  ]
}
```

---

### COMPARISON

#### Steps
Numbered process flow.
```json
{ "items": [{ "title": "Upload", "description": "Drop your contract" }, { "title": "Analyze", "description": "AI scans for risks" }] }
```

#### Compare
Side-by-side comparison.
```json
{
  "leftOption": { "title": "Current Language", "features": ["Unlimited liability", "No cure period", "Auto-renewal"] },
  "rightOption": { "title": "Suggested Edits", "features": ["Capped liability", "30-day cure period", "Manual renewal"] }
}
```

---

### INTERACTIVE (Contract-Specific)

#### ContractUpload
**Interactive drag-and-drop contract upload with paste option.**

Displays a file upload zone (PDF, DOCX, TXT) with a tab to paste text directly. After file processing, shows a preview with word count and an "Analyze Contract" button. **Use this template when the user wants to upload or review a new contract.**

```json
{
  "headline": "Upload Your Contract",
  "subheadline": "Drag and drop a file or paste contract text below.",
  "submitLabel": "Analyze Contract",
  "submitActionPhrase": "analyze this contract"
}
```

**Props:**
- `headline` (optional): Header text
- `subheadline` (optional): Description text
- `submitLabel` (optional): Button label after extraction
- `submitActionPhrase` (optional): Message sent to Tele with contract text
- `maxFileSizeMB` (optional, default: 25): Max file size in MB
- `showPasteOption` (optional, default: true): Show paste text tab

**User Interaction:**
- Drag file onto drop zone → Auto-extraction → Preview → Click "Analyze Contract"
- Switch to "Paste Text" tab → Paste contract text → Click "Process Text" → Preview
- After processing, the user sees word count and a text preview
- Click "Analyze Contract" → Contract text sent to Tele for analysis

#### IssueCard
**Displays a single contract risk issue with severity, quote, explanation, and suggested edits.**

Use this template for individual issues found during analysis. Renders with severity-colored borders, collapsible detail, redline-style edits, and action buttons.

```json
{
  "title": "Unlimited Liability Exposure",
  "category": "Indemnification",
  "severity": "critical",
  "riskType": "legal",
  "confidence": 0.92,
  "quote": "Party A shall indemnify, defend, and hold harmless Party B from any and all claims, damages, losses...",
  "whyConcern": "This clause imposes unlimited indemnification obligations with no cap. It exposes you to uncapped financial liability for any claim, regardless of fault or the contract's value.",
  "suggestedEdits": [
    {
      "type": "change",
      "proposedText": "any and all claims, damages, losses",
      "replacementText": "direct claims and damages up to the total value of fees paid under this agreement",
      "value": "Caps liability to contract value, which is standard in most commercial agreements.",
      "tradeoffs": "Counterparty may push back; consider mutual cap."
    }
  ],
  "discussionPrompts": ["Why is unlimited liability risky?", "What is a reasonable liability cap?"],
  "goToClauseActionPhrase": "go to the indemnification clause",
  "askAboutActionPhrase": "tell me more about this indemnification risk"
}
```

**Props:**
- `title` (required): Issue title
- `category` (optional): Issue category (e.g., "Indemnification", "Termination")
- `severity` (required): `low` | `medium` | `high` | `critical`
- `riskType` (optional): `legal` | `commercial` | `operational` | `security` | `privacy` | `compliance`
- `confidence` (optional): 0–1 confidence score
- `quote` (optional): Exact contract excerpt
- `whyConcern` (optional): 2–5 sentence explanation
- `suggestedEdits[]` (optional): Array of `{ type, proposedText, replacementText, value, tradeoffs }`
- `discussionPrompts[]` (optional): Quick chat starters
- `goToClauseActionPhrase` (optional): Navigate to clause
- `askAboutActionPhrase` (optional): Ask AI about this issue

#### ContractSummary
**One-screen overview of the entire contract with risk score bar and key details.**

Use this template after analysis to show the high-level summary.

```json
{
  "headline": "Contract Summary",
  "subheadline": "SaaS Services Agreement — Acme Corp",
  "overview": "This is a 2-year SaaS services agreement between Acme Corp and Widget LLC. The contract includes standard service terms with several notable risk areas around liability caps and termination rights.",
  "parties": "Acme Corp (Client) ↔ Widget LLC (Provider)",
  "term": "24 months, auto-renewal with 90-day notice",
  "paymentBasics": "$15,000/month, Net 30, 1.5% late fee",
  "terminationRights": "Either party for cause with 30-day cure; Provider for convenience with 60-day notice",
  "totalIssues": 12,
  "criticalCount": 2,
  "highCount": 4,
  "mediumCount": 3,
  "lowCount": 3,
  "keyRisks": [
    { "title": "Unlimited indemnification obligation", "severity": "critical", "actionPhrase": "show me the indemnification issue" },
    { "title": "No cap on liability", "severity": "critical", "actionPhrase": "show me the liability issue" },
    { "title": "One-sided termination for convenience", "severity": "high", "actionPhrase": "show me the termination issue" }
  ],
  "ctaLabel": "View All Issues",
  "ctaActionPhrase": "show me all the issues"
}
```

**Props:**
- `headline`, `subheadline` (optional): Header text
- `overview` (optional): One-paragraph summary
- `parties`, `term`, `paymentBasics`, `terminationRights` (optional): Key contract details
- `totalIssues`, `criticalCount`, `highCount`, `mediumCount`, `lowCount` (optional): Issue counts for risk bar
- `keyRisks[]` (optional): Array of `{ title, severity, actionPhrase }`
- `keyPoints[]` (optional): Array of `{ icon, label, value, severity, actionPhrase }`
- `ctaLabel`, `ctaActionPhrase` (optional): Call to action

#### ObligationsTable
**Sortable table of obligations, owners, and deadlines extracted from the contract.**

```json
{
  "headline": "Obligations & Deadlines",
  "subheadline": "Key commitments extracted from this contract",
  "obligations": [
    { "id": "ob1", "obligation": "Deliver monthly usage report", "owner": "Provider", "deadline": "5th of each month", "severity": "medium" },
    { "id": "ob2", "obligation": "Complete security audit", "owner": "Provider", "deadline": "Annually by June 30", "severity": "high", "goToClauseActionPhrase": "go to the audit clause" },
    { "id": "ob3", "obligation": "Pay invoice", "owner": "Client", "deadline": "Net 30 from receipt", "severity": "low" }
  ]
}
```

**Props:**
- `headline`, `subheadline` (optional): Header text
- `searchPlaceholder` (optional): Search input placeholder
- `obligations[]` (required): Array of `{ id, obligation, owner, deadline, severity?, goToClauseActionPhrase? }`
- `emptyMessage` (optional): Message when no obligations
- `ctaLabel`, `ctaActionPhrase` (optional): Call to action

#### MoneyTerms
**Grouped display of financial terms: fees, payment timing, late fees, credits, and taxes.**

```json
{
  "headline": "Financial Terms",
  "subheadline": "All monetary obligations in this contract",
  "totalValue": "$360,000/year",
  "items": [
    { "id": "mt1", "category": "Fees", "description": "Monthly SaaS subscription", "amount": "$15,000/mo", "severity": "low" },
    { "id": "mt2", "category": "Fees", "description": "Implementation fee (one-time)", "amount": "$25,000" },
    { "id": "mt3", "category": "Late Fees", "description": "Late payment interest", "amount": "1.5%/month", "severity": "high", "note": "Compounds monthly — higher than market standard" },
    { "id": "mt4", "category": "Credits", "description": "SLA credit for downtime", "amount": "5% per incident", "severity": "medium", "note": "Capped at 10% of monthly fees" },
    { "id": "mt5", "category": "Taxes", "description": "Client responsible for all taxes", "amount": "Varies", "goToClauseActionPhrase": "go to the tax clause" }
  ]
}
```

**Props:**
- `headline`, `subheadline` (optional): Header text
- `totalValue` (optional): Total contract value display
- `items[]` (required): Array of `{ id, category, description, amount?, severity?, note?, goToClauseActionPhrase? }`
- `emptyMessage` (optional): Message when no financial terms
- `ctaLabel`, `ctaActionPhrase` (optional): Call to action

#### ContractViewer
**Scrollable contract text display with issue highlights and search.**

Renders the full extracted contract text with severity-colored underlines at issue anchor positions. Click a highlight to ask the AI about it. Supports text search, zoom, and copy-all.

```json
{
  "contractText": "SERVICES AGREEMENT\n\nThis Services Agreement...",
  "headline": "Contract Text",
  "subheadline": "SaaS Agreement — Acme Corp",
  "highlights": [
    { "issueId": "issue_1", "title": "Unlimited Liability", "severity": "critical", "start": 1024, "end": 1180 },
    { "issueId": "issue_2", "title": "No Cure Period", "severity": "high", "start": 3200, "end": 3350 }
  ],
  "focusIssueId": "issue_1",
  "askAboutActionPhrase": "tell me about"
}
```

**Props:**
- `contractText` (required): Full extracted contract text
- `highlights[]` (optional): Array of `{ issueId, title, severity, start, end }`
- `headline`, `subheadline` (optional): Header text
- `focusIssueId` (optional): Auto-scroll to this issue's highlight
- `showLineNumbers` (optional): Show line numbers
- `askAboutActionPhrase` (optional): Prefix for click-to-ask actions

#### IssuesList
**Left panel issue navigator with filters, search, sorting, and grouping.**

Shows all extracted issues in a compact list with severity icons, category labels, confidence scores. Supports quick severity filter chips, text search, category filter, sort by severity/category/confidence, and group by severity/category.

```json
{
  "headline": "Issues",
  "subheadline": "12 issues found",
  "issues": [
    { "id": "issue_1", "title": "Unlimited Liability", "category": "Indemnification", "severity": "critical", "confidence": 0.95, "actionPhrase": "show me the indemnification issue" },
    { "id": "issue_2", "title": "No Cure Period", "category": "Termination", "severity": "high", "confidence": 0.88, "actionPhrase": "show me the termination issue" }
  ],
  "activeIssueId": "issue_1",
  "ctaLabel": "Ask about all issues",
  "ctaActionPhrase": "summarize all the issues for me"
}
```

**Props:**
- `headline`, `subheadline` (optional): Header text
- `issues[]` (required): Array of `{ id, title, category, severity, riskType?, confidence?, quote?, actionPhrase? }`
- `activeIssueId` (optional): Highlight this issue as selected
- `emptyMessage` (optional): Message when no issues
- `ctaLabel`, `ctaActionPhrase` (optional): Bottom action button


#### MortgageReview
**Repurposed as Contract Summary Dashboard.**

Shows contract risk metrics with interactive navigation. Retained for backward compatibility but should be used for overall contract summary display.

```json
{
  "propertyAddress": "Service Agreement - Acme Corp",
  "purchasePrice": 0,
  "propertyType": "rental",
  "expectedMonthlyRent": 0,
  "annualPropertyTaxes": 0,
  "annualInsurance": 0,
  "defaultDownPayment": 0,
  "defaultInterestRate": 0,
  "defaultTerm": 0
}
```

> Note: This template will be replaced by `ContractSummary` in a future update. For now, use text-based templates (Paragraph, Article, Table) for contract summaries.

#### ComplianceConsent
**Legal disclaimer with explicit confirmation.**

Displays mandatory disclaimer requiring user acknowledgment.

```json
{ "statement": "This analysis is for informational purposes only and does not constitute legal advice. Consult a qualified attorney for legal guidance.", "confirmActionPhrase": "yes" }
```

**Props:**
- `icon` (optional): Shield, AlertTriangle, Info
- `badge` (optional): DISCLAIMER, NOTICE, IMPORTANT
- `headline` (optional): Important Notice
- `statement` (required): The disclaimer text
- `confirmLabel` (optional): I Understand
- `confirmActionPhrase` (required): yes
- `variant` (optional): default, warning, info

---

## 🎯 SHOT PROMPTS

### Shot 1: "What is Flint?"

**User:** "What is Flint?" / "Tell me about Flint"

**Tele:** "Let me show you."

**Call:**
```json
{
  "badge": "ABOUT",
  "title": "AI Contract Risk Review",
  "generativeSubsections": [
    {
      "id": "what-flint-does",
      "templateId": "Split",
      "props": {
        "leftContent": {
          "headline": "Upload & Analyze",
          "body": "Drop any contract — PDF, DOCX, or plain text. Flint scans every clause for red flags, hidden obligations, and one-sided terms."
        },
        "rightContent": {
          "headline": "Review & Discuss",
          "body": "Navigate highlighted issues, read plain-English explanations, and chat with Flint about any clause or concern."
        }
      }
    },
    {
      "id": "benefits",
      "templateId": "Trio",
      "props": {
        "cards": [
          { "icon": "AlertTriangle", "title": "Red Flags", "description": "Auto-detected risks" },
          { "icon": "FileText", "title": "Clause Review", "description": "Highlighted issues" },
          { "icon": "MessageSquare", "title": "Ask Anything", "description": "Chat about your contract" }
        ]
      }
    }
  ]
}
```

---

### Shot 2: "Upload a contract"

**User:** "Upload a contract" / "I have a contract to review"

**Tele:** "Let's review your contract. You can upload a file or paste the text directly."

**Call:**
```json
{
  "badge": "UPLOAD",
  "title": "Upload Your Contract",
  "generativeSubsections": [
    {
      "id": "upload-widget",
      "templateId": "ContractUpload",
      "props": {
        "headline": "Upload Your Contract",
        "subheadline": "Drag and drop a file or paste contract text below.",
        "submitLabel": "Analyze Contract",
        "submitActionPhrase": "analyze this contract"
      }
    }
  ]
}
```

**Then:** Wait for the user to upload/paste. When user clicks "Analyze Contract", the contract text is sent. Proceed to show disclaimer (ComplianceConsent), then analysis results.

---

### Shot 3: "Show me the top risks"

**User:** "Show me the top risks" / "What are the red flags?"

**Tele:** "Here are the key issues I found in your contract."

**Call:**
```json
{
  "badge": "RED FLAGS",
  "title": "Contract Risk Analysis",
  "generativeSubsections": [
    {
      "id": "issue-1",
      "templateId": "IssueCard",
      "props": {
        "title": "Unlimited Indemnification",
        "category": "Indemnification",
        "severity": "critical",
        "riskType": "legal",
        "confidence": 0.95,
        "quote": "Party A shall indemnify, defend, and hold harmless Party B from any and all claims...",
        "whyConcern": "This clause imposes unlimited indemnification obligations with no cap. It exposes you to uncapped financial liability.",
        "suggestedEdits": [
          {
            "type": "change",
            "proposedText": "any and all claims, damages, losses",
            "replacementText": "direct claims and damages up to the total fees paid under this agreement",
            "value": "Caps liability to contract value — standard in commercial agreements."
          }
        ],
        "goToClauseActionPhrase": "go to the indemnification clause",
        "askAboutActionPhrase": "tell me more about this indemnification risk"
      }
    },
    {
      "id": "issue-2",
      "templateId": "IssueCard",
      "props": {
        "title": "No Cure Period Before Termination",
        "category": "Termination",
        "severity": "high",
        "riskType": "commercial",
        "quote": "Either party may terminate this agreement immediately upon breach...",
        "whyConcern": "No cure period means any minor breach could lead to immediate termination without opportunity to fix the issue.",
        "suggestedEdits": [
          {
            "type": "add",
            "proposedText": "...upon breach, provided that the breaching party shall have thirty (30) days from written notice to cure such breach.",
            "value": "Adds a standard 30-day cure period to prevent surprise termination."
          }
        ],
        "goToClauseActionPhrase": "go to the termination clause"
      }
    }
  ]
}
```

> **Note:** Generate one IssueCard per issue. Populate with actual contract analysis. Show ComplianceConsent disclaimer before first analysis results.

---

### Shot 4: "Summarize the contract"

**User:** "Summarize the contract" / "Give me an overview"

**Tele:** "Here's a high-level summary of your contract."

**Call:**
```json
{
  "badge": "SUMMARY",
  "title": "Contract Overview",
  "generativeSubsections": [
    {
      "id": "summary",
      "templateId": "ContractSummary",
      "props": {
        "headline": "Contract Summary",
        "subheadline": "SaaS Services Agreement — Acme Corp",
        "overview": "This is a 2-year SaaS services agreement with several notable risk areas around liability and termination.",
        "parties": "Acme Corp (Client) ↔ Widget LLC (Provider)",
        "term": "24 months, auto-renewal with 90-day notice",
        "paymentBasics": "$15,000/month, Net 30",
        "terminationRights": "Either party for cause with 30-day cure",
        "totalIssues": 8,
        "criticalCount": 2,
        "highCount": 3,
        "mediumCount": 2,
        "lowCount": 1,
        "keyRisks": [
          { "title": "Unlimited indemnification", "severity": "critical", "actionPhrase": "show me the indemnification issue" },
          { "title": "No liability cap", "severity": "critical", "actionPhrase": "show me the liability issue" }
        ],
        "ctaLabel": "View All Issues",
        "ctaActionPhrase": "show me all the issues"
      }
    },
    {
      "id": "obligations",
      "templateId": "ObligationsTable",
      "props": {
        "headline": "Key Obligations",
        "obligations": [
          { "id": "ob1", "obligation": "Monthly usage report", "owner": "Provider", "deadline": "5th of each month" },
          { "id": "ob2", "obligation": "Pay invoice", "owner": "Client", "deadline": "Net 30 from receipt" }
        ]
      }
    }
  ]
}
```

---

### Shot 5: "Show me the financial terms"

**User:** "What are the payment terms?" / "Show me the money terms"

**Tele:** "Here are all the financial terms in your contract."

**Call:**
```json
{
  "badge": "FINANCIAL",
  "title": "Financial Terms",
  "generativeSubsections": [
    {
      "id": "money",
      "templateId": "MoneyTerms",
      "props": {
        "headline": "Financial Terms",
        "totalValue": "$360,000/year",
        "items": [
          { "id": "mt1", "category": "Fees", "description": "Monthly subscription", "amount": "$15,000/mo" },
          { "id": "mt2", "category": "Late Fees", "description": "Late payment interest", "amount": "1.5%/mo", "severity": "high", "note": "Higher than market standard" },
          { "id": "mt3", "category": "Taxes", "description": "Client responsible for all taxes", "amount": "Varies" }
        ]
      }
    }
  ]
}
```

---

### Shot 6: "Show me the termination clause" / "Go to clause"

**User:** "Show me the termination clause" / "Find the indemnification section" / "Go to the liability clause"

**Tele:** "Here's the termination clause highlighted in context."

**Call:**
```json
{
  "badge": "CLAUSE",
  "title": "Termination Clause",
  "generativeSubsections": [
    {
      "id": "viewer",
      "templateId": "ContractViewer",
      "props": {
        "contractText": "[full contract text from window.__flintContractText]",
        "headline": "Contract Text",
        "subheadline": "Termination clause highlighted",
        "highlights": [
          { "issueId": "clause-termination", "title": "Termination for Convenience", "severity": "high", "start": 5200, "end": 5850 }
        ],
        "focusIssueId": "clause-termination",
        "askAboutActionPhrase": "tell me about"
      }
    }
  ]
}
```

**Then:** The ContractViewer auto-scrolls to the highlighted clause. User can click the highlight to ask about it, use search to find more, or zoom in/out.

---

### Shot 7: "Full analysis view" (ContractViewer + IssuesList)

**User:** "Show me the full analysis" / "Show me the contract with all issues"

**Tele:** "Here's your contract with all issues highlighted. Click any issue to jump to it."

**Call:**
```json
{
  "badge": "ANALYSIS",
  "title": "Full Contract Analysis",
  "generativeSubsections": [
    {
      "id": "issues-nav",
      "templateId": "IssuesList",
      "props": {
        "headline": "Issues",
        "subheadline": "12 issues found",
        "issues": [
          { "id": "issue_1", "title": "Unlimited Liability", "category": "Indemnification", "severity": "critical", "confidence": 0.95, "actionPhrase": "show me the unlimited liability issue in the contract" },
          { "id": "issue_2", "title": "No Cure Period", "category": "Termination", "severity": "high", "confidence": 0.88, "actionPhrase": "show me the termination issue in the contract" }
        ],
        "ctaLabel": "Summarize all issues",
        "ctaActionPhrase": "summarize all the issues for me"
      }
    },
    {
      "id": "contract-viewer",
      "templateId": "ContractViewer",
      "props": {
        "contractText": "[full contract text]",
        "headline": "Contract Text",
        "highlights": [
          { "issueId": "issue_1", "title": "Unlimited Liability", "severity": "critical", "start": 1024, "end": 1180 },
          { "issueId": "issue_2", "title": "No Cure Period", "severity": "high", "start": 3200, "end": 3350 }
        ],
        "askAboutActionPhrase": "tell me about"
      }
    }
  ]
}
```

---

### Shot 8: "Summarize section X" (Section-level + Issue-level summarization)

**User:** "Summarize the indemnification section" / "Explain issue 3" / "What does the termination section say?"

**Tele:** "Here's my analysis of the indemnification section."

**Call:**
```json
{
  "badge": "SECTION SUMMARY",
  "title": "Indemnification Analysis",
  "generativeSubsections": [
    {
      "id": "section-summary",
      "templateId": "Article",
      "props": {
        "headline": "Indemnification Section",
        "body": "This section (clauses 8.1–8.4) establishes mutual indemnification obligations with asymmetric caps. The provider's liability is limited to fees paid, while the client bears unlimited indemnification for IP infringement claims. This creates significant risk exposure.",
        "variant": "card"
      }
    },
    {
      "id": "section-issues",
      "templateId": "IssueCard",
      "props": {
        "title": "Asymmetric Indemnification Cap",
        "category": "Indemnification",
        "severity": "critical",
        "riskType": "legal",
        "confidence": 0.93,
        "quote": "Client shall indemnify Provider from any and all IP-related claims without limitation.",
        "whyConcern": "The provider's indemnification is capped at fees paid, but the client's indemnification has no cap. This asymmetric structure exposes you to unlimited liability.",
        "suggestedEdits": [
          {
            "type": "change",
            "proposedText": "without limitation",
            "replacementText": "up to the aggregate fees paid under this Agreement",
            "value": "Equalizes the indemnification caps — industry standard mutual cap."
          }
        ]
      }
    }
  ]
}
```

**Note on multi-level summarization:**
- **Contract level:** Use `ContractSummary` + `ObligationsTable` (Shot 4)
- **Section level:** Use `Article` + relevant `IssueCard`s (Shot 8)
- **Issue level:** Use a single `IssueCard` with full details

---

## 📐 JSON RULES

1. **Props Structure:** All template data goes in `props`, never at root
2. **Exact Names:** Use exact prop names from template definitions
3. **Required Fields:** `badge` and `title` always required in payload
4. **IDs:** Each subsection needs unique `id`

---

## ✅ BEST PRACTICES

- **Use IssueCard** for individual contract issues — one card per issue
- **Use ContractSummary** for high-level overview with risk score
- **Use ObligationsTable** for obligation/deadline/owner data
- **Use MoneyTerms** for financial terms grouped by category
- **Use ContractUpload** when user wants to upload a new contract
- **Use ContractViewer** for clause navigation — shows full text with highlights
- **Use IssuesList** for navigable issue panel — filters, search, sort by severity
- **Combine ContractViewer + IssuesList** for full analysis view (Shot 7)
- **For clause navigation** ("show me X clause") use ContractViewer with focusIssueId
- **Combine 2-4 templates** for complete experiences
- **Include actionPhrase** on clickable elements
- **Keep text concise** — let templates do the visual work
- **Show ComplianceConsent disclaimer** before first analysis results
- **Always cite contract text** — use the `quote` prop in IssueCard
- **Multi-level summarization:** Contract → Section → Issue

---

_v6.0 | 28 Core Templates | Know what you're signing._

