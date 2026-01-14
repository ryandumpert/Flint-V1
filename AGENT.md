# 🤖 AGENT.md - Fiserv DMA Development Reference

> **Digital Merchant Acquisition Platform**
> Last updated: January 13, 2026

---

## 1. PROJECT OVERVIEW

This is the **Fiserv DMA** platform - an AI-powered enterprise sales guide for banks evaluating merchant acquiring solutions.

### What This Platform Does
Tele (the AI voice agent) helps **bank executives** understand the DMA Offer Engine by:
1. Explaining why DMA matters and what value both the bank AND merchant get
2. Walking through the merchant experience to address friction concerns
3. Answering technical and business questions about integration
4. **Booking a follow-up meeting with Fiserv** to start integration

### Core Components
| Component | File/Location | Purpose |
|-----------|---------------|---------|
| **Tele** | External AI | Voice agent that SPEAKS and calls `navigateToSection` |
| **Glass** | This codebase | React app that DISPLAYS templates based on Tele commands |
| **glass-generator-prompt.md** | Root | Instructions for Tele on HOW to generate Glass JSON |
| **tele-knowledge.md** | Root | Domain knowledge for Tele on WHAT to say |
| **bank-sample-questions-and-info-for-answers.md** | Root | **FAQ reference with detailed answers** |

### Context Circle (Critical!)
```
┌─────────────────────────────┐
│   bank-sample-questions-    │
│   and-info-for-answers.md   │  ← SOURCE OF TRUTH for facts & figures
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│     tele-knowledge.md       │  ← WHAT Tele knows and says
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  glass-generator-prompt.md  │  ← HOW Tele shows it (templates + JSON)
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│   Template Components       │  ← WHAT the user sees (React)
└─────────────────────────────┘
```

### Architecture Flow
```
User speaks → Tele processes → Tele calls navigateToSection(JSON) → Glass renders templates
```

---

## 2. TEMPLATE LIBRARY (25 Templates)

### Core Templates (9)
| Template | Purpose | Key Props |
|----------|---------|-----------|
| **ProblemSolutionMatrix** | Map problems to solutions | `problems[]`, `solutions[]` |
| **OnboardingJourney** | Step-by-step timeline | `steps[]`, `totalDuration` |
| **FeatureGrid** | Feature cards in grid | `features[]`, `columns` |
| **DataTable** | Sortable data table | `columns[]`, `rows[]` |
| **SplitContent** | Image + text layout | `title`, `content`, `bulletPoints[]` |
| **IconList** | Icon list (grid/vertical) | `items[]`, `layout` |
| **BankPortalMockup** | Bank portal with offer | `offers[]` |
| **OnboardingStep** | Single step in 10-step flow | `stepNumber`, `formSections[]` |
| **OnboardingFlow** | Visual journey map | `steps[]` |

### Conversational Templates (15)
| Template | Purpose | Key Props |
|----------|---------|-----------|
| **TimelineRoadmap** | Integration phases | `phases[]`, `totalDuration` |
| **MetricsGrid** | Key stats display | `metrics[]`, `columns` |
| **WorkflowDiagram** | Process flowchart | `steps[]`, `branches[]` |
| **PricingTable** | Pricing tiers | `tiers[]`, `note` |
| **ProductCatalog** | Grouped products | `categories[]` |
| **ComparisonTable** | Side-by-side compare | `options[]`, `features[]` |
| **FAQAccordion** | Expandable Q&A | `items[]` |
| **ContactCard** | Human support options | `contacts[]` |
| **SegmentSelector** | Targeting segments | `categories[]` |
| **BrandingPreview** | White-label preview | `options[]`, `bankName` |
| **StatusTracker** | Application status | `steps[]` |
| **ArchitectureDiagram** | System architecture | `layers[]` |
| **ChecklistCard** | Requirements list | `items[]` |
| **TeamCards** | Team members | `members[]` |
| **QuickActions** | Action buttons | `actions[]` |

### Scheduling Template (1)
| Template | Purpose | Key Props |
|----------|---------|-----------|
| **MeetingScheduler** | Book appointments (live-update) | `meetingDate`, `meetingTime`, `isConfirmed` |

### Template Registry
Location: `src/data/templateRegistry.ts`

---

## 3. FAQ REFERENCE FILE

### bank-sample-questions-and-info-for-answers.md

This file is the **SOURCE OF TRUTH** for factual information. When answering executive questions, Tele should use these EXACT figures:

| Question | Key Answer |
|----------|------------|
| Integration timeline? | **2-6 weeks** (single API + iFrame) |
| Volume handling? | **500M+ transactions/month** multi-region AWS |
| Post-submit workflow? | MID/TID → KYB/KYC → Underwriting → Provisioning → Shipping |
| Integration specialists? | **Yes** - TAM, Integration Engineer, Solutions Architect |
| Pricing configurable? | **100%** - rates, fees, hardware, bundles |
| Branding customizable? | **Full** white-label via Branding API |
| Abandonment handling? | Business Consultant follow-up, **35-45% recovery rate** |
| SSO for Clover? | **Yes** - SAML 2.0 / OAuth 2.0 |
| On-premise required? | **No** - 100% cloud-hosted, 1 API + iFrame only |

### Detailed FAQ Topics
1. Integration timeline (2-6 weeks)
2. Multi-region AWS scalability (500M+ transactions)
3. Post-submission workflow (MID/TID → Merchant Live)
4. Dedicated integration specialists
5. High-level integration features
6. Product offerings by category (Food, Retail, Services)
7. Pricing details with bank revenue share
8. Segment-based rollout strategy
9. Bank-configurable pricing
10. White-label branding (fonts, colors, logos)
11. Abandonment recovery (Business Consultant)
12. Human support during application
13. SSO for existing Clover merchants
14. Zero on-premise deployment

---

## 4. NAVIGATION MENU

| # | Label | Purpose |
|---|-------|---------|
| 1 | **HOME** | Platform overview |
| 2 | **BANK VIEW** | Show offer in bank portal |
| 3 | **ONBOARDING** | 10-step merchant flow |
| 4 | **OFFERS** | Types of offers (POS, Capital, Credit) |
| 5 | **INTEGRATION** | One API details |
| 6 | **NEXT STEPS** | How to proceed / Book meeting |

---

## 5. KEY FILES

### Core Files
| File | Purpose |
|------|---------|
| `src/pages/Index.tsx` | Main app entry, navigation handling |
| `src/components/Navigation.tsx` | Top navigation bar |
| `src/components/TeleglassSection.tsx` | Template rendering |
| `src/data/templateRegistry.ts` | Template lazy loading |

### Documentation Files
| File | Purpose |
|------|---------|
| `glass-generator-prompt.md` | Tele instructions for generating JSON |
| `tele-knowledge.md` | Domain knowledge for Tele |
| `bank-sample-questions-and-info-for-answers.md` | **FAQ source of truth** |
| `AGENT.md` | This file - developer reference |

### Template Files
Location: `src/components/templates/`

---

## 6. TELE INTEGRATION

### navigateToSection Tool
Tele calls this tool to update what the user sees:

```json
{
  "badge": "BADGE_TEXT",
  "title": "Section Title",
  "subtitle": "Optional subtitle",
  "generativeSubsections": [
    {
      "id": "unique-id",
      "templateId": "TemplateName",
      "props": { /* template-specific props */ }
    }
  ]
}
```

### showTele / notifyTele
Every interactive element MUST trigger Tele:

```typescript
import { sendToTele } from "@/utils/teleInteraction";

// On click
sendToTele("Show me more about this feature");
```

---

## 7. STYLING

### Design System
- **Primary Color:** Cyan (`cyan-500`) - Fiserv accent
- **Secondary Color:** Orange (`orange-500`) - Fiserv brand
- **Background:** Light (bank portal aesthetic)
- **Borders:** Gray with hover states

### Glass Effect (for Tele panel)
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 8. DEVELOPMENT COMMANDS

```bash
# Start dev server
npm run dev -- --port 8591

# Type check
npx tsc --noEmit

# Build
npm run build
```

---

## 9. CONSTRAINTS

### Immutable Rules
1. **Tool Signature Stability** — `navigateToSection` MUST NEVER change
2. **Interactive Tele-Action** — EVERY clickable MUST have action phrase
3. **Mandatory Tool Call** — `navigateToSection` in EVERY Tele response
4. **Factual Accuracy** — Use figures from bank-sample-questions file

### File Limits
| File | Max Lines |
|------|-----------|
| glass-generator-prompt.md | 1600 |
| tele-knowledge.md | 600 |
| Template files | 600 each |

---

## 10. BUYER PERSONAS

| Persona | Focus | What They Want |
|---------|-------|----------------|
| **Digital Banking VPs** | Speed to market | Fast integration, low IT burden |
| **Commercial Banking Leaders** | Revenue | Pricing flexibility, merchant acquisition |
| **Risk/Compliance Teams** | Security | PCI compliance, underwriting controls |
| **Product Managers** | Experience | White-label, merchant satisfaction |

---

## 11. THE SALES FLOW

### Tele's 5-Step Journey
1. **Build Value** — Explain why DMA matters and what value both the bank AND merchant get
2. **Show the Experience** — Walk the banker through the merchant journey to address friction concerns
3. **Answer Questions** — Handle technical and business questions using FAQ reference
4. **Address Friction** — Demonstrate that 10 steps means compliance done right, not friction
5. **Book the Appointment** — Get the banker to schedule a follow-up with Fiserv

### Ultimate Goal
Every conversation should end with an opportunity to **book a meeting with Fiserv**.

---

*This document is the authoritative technical reference for the Fiserv DMA platform.*
