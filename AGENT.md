# 🤖 AGENT.md - Thoughtworks AI-Works Development Reference

> **Internal Enablement Platform**
> Last updated: January 14, 2026

---

## 1. PROJECT OVERVIEW

This is the **Thoughtworks AI-Works** internal enablement platform—an AI-powered guide for Thoughtworks employees learning about and selling the AI-Works Platform.

### What This Platform Does
Catherine (the AI agent) helps **Thoughtworks employees** understand the AI-Works Platform by:
1. Explaining the Super Spec and Architectural Synthesis approach
2. Training on the 3 Environments (Developer Portal, IDE, AIOps)
3. Providing competitive intelligence for sales conversations
4. **Enabling internal teams** to sell, build, and operate the platform

### Core Components
| Component | File/Location | Purpose |
|-----------|---------------|---------|
| **Catherine** | External AI | Voice agent that SPEAKS and calls `navigateToSection` |
| **Glass** | This codebase | React app that DISPLAYS templates based on Catherine commands |
| **glass-prompt.md** | Root | Instructions for Catherine on HOW to generate Glass JSON |
| **tele-knowledge.md** | Root | Domain knowledge for Catherine on WHAT to say |

### Context Circle
```
┌─────────────────────────────┐
│     tele-knowledge.md       │  ← WHAT Catherine knows and says
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│     glass-prompt.md         │  ← HOW Catherine shows it (templates + JSON)
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│   Template Components       │  ← WHAT the user sees (React)
└─────────────────────────────┘
```

---

## 2. TEMPLATE LIBRARY

### Available Template
| Template | Purpose | Key Props |
|----------|---------|-----------|
| **SplitContent** | Image + text layout | `title`, `content`, `bulletPoints[]`, `imagePrompt` |

---

## 3. KEY FILES

| File | Purpose | Max Lines |
|------|---------|-----------|
| `glass-prompt.md` | Catherine instructions | 200 |
| `tele-knowledge.md` | Domain knowledge | 150 |
| `src/data/templateRegistry.ts` | Template registry | - |
| `src/pages/Index.tsx` | Main app entry | - |
| `src/components/Navigation.tsx` | Top nav bar | - |

---

## 4. SMARTIMAGE SYSTEM (Hybrid Image Generation)

The platform uses a **hybrid image system** that automatically chooses between pre-generated and AI-generated images.

### How It Works
```
┌─────────────────────────────────────────────────────────────┐
│                    SmartImage Component                      │
│                                                             │
│   assetId ──► Check ASSET_REGISTRY ──► Found? ──► Load file │
│                       │                                     │
│                       └── Not found? ──► AI Generate ──► Cache │
└─────────────────────────────────────────────────────────────┘
```

### Usage in Templates
```tsx
// Option 1: Use imageUrl (pre-generated, instant)
<SmartImage assetId="/assets/hero.png" />

// Option 2: Use imagePrompt (AI-generated, ~3-5s)
<SmartImage assetId="Modern enterprise architecture diagram, blue and white" />
```

### Key Files
| File | Purpose |
|------|---------|
| `src/components/ui/SmartImage.tsx` | Main image component |
| `src/data/assetRegistry.ts` | Pre-generated asset definitions |
| `src/utils/mobeusGenAI.ts` | AI image generation API |

### Asset Registry Pattern
```typescript
// To add a pre-generated asset:
export const ASSET_REGISTRY = {
  "my-asset-id": {
    id: "my-asset-id",
    path: "/assets/my-image.png",
    alt: "Description",
    description: "What this image shows",
    generationPrompt: "Fallback prompt if file missing",
    category: "platform"
  }
};
```

### Best Practices
| Scenario | Use |
|----------|-----|
| **Logos, avatars, icons** | Pre-generated (`imageUrl`) |
| **Hero images, illustrations** | AI-generated (`imagePrompt`) |
| **Product screenshots** | Pre-generated |
| **Abstract concepts** | AI-generated |

**⚠️ Note:** AI-generated images are cached per-session. Same prompt = instant second load.

---

## 5. CATHERINE INTEGRATION

### navigateToSection Tool
```json
{
  "badge": "BADGE_TEXT",
  "title": "Section Title",
  "subtitle": "Optional subtitle",
  "generativeSubsections": [
    { "id": "unique-id", "templateId": "TemplateName", "props": { } }
  ]
}
```

### sendToTele / notifyTele
Every interactive element MUST trigger Catherine with "Show" prefix:
```typescript
import { sendToTele } from "@/utils/teleInteraction";
sendToTele("Show me more about this feature");  // ALWAYS starts with "Show"
```

---

## 6. 4 IMMUTABLE LAWS

1. **Tool Signature Stability** — `navigateToSection` MUST NEVER change
2. **No Hallucination** — If a feature isn't documented, acknowledge it
3. **Mandatory Tool Call** — `navigateToSection` in EVERY Catherine response
4. **Factual Accuracy** — Use EXACT figures from tele-knowledge.md

---

## 7. DEVELOPMENT COMMANDS

```bash
npm run dev -- --port 1010    # Start dev server
npx tsc --noEmit              # Type check
npm run build                 # Build production
```

---

## 8. THE ENABLEMENT FLOW

### Catherine's 3-Phase Journey
1. **Introduction** — Explain the Super Spec and 3-3-3 Delivery Model
2. **Training** — Walk through 3 Environments, CodeConcise, Component Libraries
3. **Sales Support** — Competitive intelligence, objection handling, pricing

### Key Talking Points
| Audience | Focus |
|----------|-------|
| **CIOs/Execs** | 3-3-3 Delivery: 3 days validate, 3 weeks prototype, 3 months production |
| **Developers** | Zero Technical Debt: Regenerate from spec, don't patch code |
| **Sales/Principals** | Competitive: Legacy modernization sets us apart from Globant, Ascendion |
| **Architects** | Context Library: Institutional memory for compliance, security, standards |

---

## 9. COMPETITIVE POSITIONING

| Competitor | Their Claim | Our Counter |
|------------|-------------|-------------|
| **Globant** | New development | "We do new dev *and* legacy modernization" |
| **Ascendion** | "4,000 agents" | "30 years of architectural wisdom. Quality over quantity." |
| **Deloitte** | Strategy consulting | "Production-grade code and engineering credibility" |
| **Sapient** | Code-to-spec accuracy | "The spec itself is architecturally sound" |

---

## 10. PRICING & ENGAGEMENT

| Phase | Duration | Description |
|-------|----------|-------------|
| **Phase 1** | 3 Days | Concept validation |
| **Phase 2** | 3 Weeks | Working prototype |
| **Phase 3** | 3 Months | Production system |

**Pricing Range:** $675K - $2.35M for fixed-price engagements (platform licensing is custom)

---

## 11. WORKFLOWS (Slash Commands)

Use these workflows to modify the platform:

| Workflow | Command | Purpose |
|----------|---------|---------|
| **Add Experience** | `/add-glass` | Add a new template (experience) to the platform |
| **Add Knowledge** | `/add-knowledge` | Add domain knowledge to Catherine (what she knows) |
| **Tele Should** | `/tele-should` | Add shot prompts (how Catherine responds to specific requests) |

### /add-glass
Add a new template component:
1. Create template in `src/components/templates/[Name].tsx`
2. Register in `src/data/templateRegistry.ts`
3. Add schema to `glass-prompt.md`
4. Add shot prompt example
5. Verify with `npx tsc --noEmit`

### /add-knowledge
Add domain knowledge to `tele-knowledge.md`:
- Keep under 150 lines
- Use bullet format with key points
- Include example phrases Catherine might say

### /tele-should
Add shot prompts to `glass-prompt.md`:
- Keep under 200 lines
- Format: USER trigger → JSON → CATHERINE SAYS
- Follow JSON structure: `badge`, `title`, `subtitle`, `generativeSubsections`

---

*This document is the authoritative technical reference for the Thoughtworks AI-Works platform.*
