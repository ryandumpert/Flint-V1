# Mobeus University Tele Documentation

> Generated: January 25, 2026 | Version: 3.0 — Hackathon Discovery Journey

---

## 🎯 Goal

**Primary Goal:** Schedule a hackathon (Step 7)

**Success Metric:** User submits hackathon booking form

**User Journey:** Curious about AI adoption → Understands teles solve the adoption problem → Books a 3-hour hackathon

---

## 🗺️ The Journey

Users move through **7 steps** from discovery to goal:

| Step | Name | User State | What Happens |
|------|------|------------|--------------|
| 1 | **The Problem** | Curious | Learn that 70% of AI projects fail — not tech, but adoption |
| 2 | **The Solution** | Understanding | Discover that a tele is the UI for AI |
| 3 | **Platform** | Interested | See the triple-agnostic platform (model/cloud/channel) |
| 4 | **Innovations** | Engaged | Learn dual-agent architecture, DOM-bridge, generative web |
| 5 | **Wiring** | Hands-on | See voice wiring, vibe wiring, wire commands |
| 6 | **Analytics** | Convinced | Understand observability, CRM, telemetry |
| 7 | **Hackathon** | **Ready** | **GOAL: Schedule a 3-hour hackathon** |

---

## 💬 Example Conversations

### Starting the Journey

```
USER: "Why do AI projects fail?"

TELE: "70% of AI projects never reach production. It's not the 
technology — the AI is brilliant. It's the absence of a user 
interface. Want to see how to fix this?"

[Shows: ProblemStatement with 70% stat + what's NOT the problem]
```

### Mid-Journey Interaction

```
USER: "What's a tele?"

TELE: "A tele is the missing UI for AI. It meets every consumer 
globally — any device, any channel, any language. It's how you 
turn brilliant AI into something people actually use."

[Shows: SolutionHero + MeetsGlobally + ActionBanner]
```

### Reaching the Goal

```
USER: "I want to schedule a hackathon"

TELE: "Wire your first tele! In a 3-hour hackathon, you'll get 
hands-on experience with voice and vibe wiring. Let me collect 
your details."

[Shows: HackathonForm with booking fields]
```

---

## 🎨 Template Library

This tele uses **36 templates** to create visual experiences:

### Core Journey Templates

| Template | Purpose | Used In |
|----------|---------|---------|
| `ProblemStatement` | Show 70% fail stat + root cause | Step 1 |
| `AdoptionIsProblem` | Explain adoption as the real issue | Step 1 |
| `SolutionHero` | Introduce tele as the solution | Step 2 |
| `MeetsGlobally` | 24/7, 195+ countries, 100+ languages | Step 2 |
| `PlatformOverview` | Triple-agnostic platform | Step 3 |
| `InnovationStack` | 3 innovations | Step 4 |
| `WiringGuide` | Voice + vibe wiring modes | Step 5 |
| `AnalyticsView` | 3 analytics capabilities | Step 6 |
| `HackathonForm` | Collect booking info | Step 7 (GOAL) |

### Reusable Templates

| Template | Purpose |
|----------|---------|
| `ActionBanner` | CTA with button (used in every section) |
| `ThreeThings` | Display 3 items in a grid |
| `ConceptCard` | Explain a single concept |
| `StatHighlight` | Show a big stat with label |
| `WelcomeCarousel` | Auto-scrolling journey cards |

### Detail Templates

| Template | Purpose |
|----------|---------|
| `DualAgentDetail` | Explain 2-agent architecture |
| `DOMBridgeDetail` | Explain navigateToSection |
| `GenerativeWebDetail` | Explain generative templates |
| `VoiceWiringDetail` | How to wire by speaking |
| `VibeWiringDetail` | How to wire by typing |
| `WireCommandsDetail` | All /commands explained |
| `AgentObservability` | See AI decisions |
| `ProbabilisticCRM` | Intent scores |
| `ConversationalTelemetry` | Clicks + words + outcomes |

---

## 📝 Shot Prompts (30 Total)

### Journey Shot Prompts (22)

| # | Name | Templates | Purpose |
|---|------|-----------|---------|
| 1 | Welcome | WelcomeCarousel | Entry point |
| 2 | The Problem | ProblemStatement, ActionBanner | Why AI fails |
| 3 | Adoption Problem | AdoptionIsProblem, ActionBanner | Adoption detail |
| 4 | The Solution | SolutionHero, ActionBanner | Tele intro |
| 5 | Meets Globally | MeetsGlobally, ActionBanner | Global reach |
| 6 | Any Device | AnyDevice, ActionBanner | Device agnostic |
| 7 | Any Channel | AnyChannel, ActionBanner | Channel agnostic |
| 8 | Platform Overview | PlatformOverview, ActionBanner | Platform summary |
| 9 | Utilization Pricing | UtilizationPricing, ActionBanner | Usage-based |
| 10 | Innovations | InnovationStack, ActionBanner | 3 innovations |
| 11 | Dual Agent | DualAgentDetail, ActionBanner | Architecture |
| 12 | DOM Bridge | DOMBridgeDetail, ActionBanner | navigateToSection |
| 13 | Generative Web | GenerativeWebDetail, ActionBanner | Templates |
| 14 | Wiring Overview | WiringGuide, ActionBanner | Voice + vibe |
| 15 | Voice Wiring | VoiceWiringDetail, ActionBanner | Speak to wire |
| 16 | Vibe Wiring | VibeWiringDetail, ActionBanner | Type commands |
| 17 | Wire Commands | WireCommandsDetail, ActionBanner | /commands |
| 18 | Analytics Overview | AnalyticsView, ActionBanner | 3 capabilities |
| 19 | Agent Observability | AgentObservability, ActionBanner | See AI decisions |
| 20 | Probabilistic CRM | ProbabilisticCRM, ActionBanner | Intent scores |
| 21 | Conversational Telemetry | ConversationalTelemetry, ActionBanner | Clicks + words |
| 22 | **Schedule Hackathon** | HackathonForm | **GOAL** |

### Utility Shot Prompts (8)

| # | Name | Purpose |
|---|------|---------|
| 23 | Hands-On Wiring | Hackathon benefit |
| 24 | Fast Turnaround | Hackathon benefit |
| 25 | Full Support | Hackathon benefit |
| 26 | Form Collection | Collect booking data |
| 27 | Confirmation | Confirm booking |
| 28 | Use Cases | Example applications |
| 29 | About Mobeus | Company info |
| 30 | Why Teles Work | Value proposition |

---

## 📊 Metrics & Constraints

| Metric | Current | Limit | Status |
|--------|---------|-------|--------|
| tele-knowledge.md | 151 | 500 | ✅ |
| glass-prompt.md | 500 | 1500 | ✅ |
| Shot Prompts | 30 | 24 | ⚠️ Over limit |
| Templates | 36 | 30 | ⚠️ Over limit |
| Carousel images | 5 | 7 | ⚠️ Missing 2 |

---

## ⚠️ Issues Found

### CRITICAL

1. **Missing carousel images**
   - `carousel-slide-04.png` missing
   - `carousel-slide-05.png` missing
   - **Fix:** Generate or copy images for these slides

### WARNING

2. **Shot prompts over limit** (30 vs 24)
   - Some could be consolidated
   - Consider merging related prompts

3. **Templates over limit** (36 vs 30)
   - Good variety but approaching ceiling
   - Some are very specific (could be generalized)

---

## 🚀 Opportunities for Improvement

### Content Enhancements

1. **Consolidate Shot Prompts**
   - Current: 30 shot prompts (over 24 limit)
   - Improvement: Merge Voice/Vibe/Commands wiring into one
   - Impact: Reduces token usage, cleaner structure

2. **Add Missing Carousel Images**
   - Current: 5 of 7 exist
   - Improvement: Generate slides 04 and 05
   - Impact: Complete visual journey

### Template Enhancements

1. **Rename Specific Templates**
   - `AdoptionIsProblem` → `ProblemDetail`
   - `HackathonForm` → `BookingForm`
   - More reusable for other teles

---

## 🔧 Technical Reference

### Key Files

| File | Purpose |
|------|---------|
| `public/prompts/tele-knowledge.md` | What the tele knows (151 lines) |
| `public/prompts/glass-prompt.md` | How the tele responds (500 lines) |
| `src/pages/Index.tsx` | Welcome experience |
| `src/components/Navigation.tsx` | Menu items |
| `src/components/templates/` | 36 visual templates |
| `src/data/templateRegistry.ts` | Template registration |

### Wire Commands

| Command | Purpose |
|---------|---------|
| `/add-glass` | Create new templates |
| `/add-knowledge` | Add domain knowledge |
| `/tele-should` | Define response patterns |
| `/set-goal` | Define the singular goal |
| `/set-journey` | Define the user journey |
| `/audit-tele` | Verify alignment |
| `/publish` | Deploy changes |

---

## 📅 Changelog

| Date | Change | Author |
|------|--------|--------|
| Jan 25, 2026 | Hackathon Discovery Journey (30 shot prompts) | Mobeus |
| Jan 25, 2026 | Added default props to all templates | Mobeus |
| Jan 25, 2026 | Generated initial documentation | /document-tele |

---

_Generated by /document-tele workflow_
