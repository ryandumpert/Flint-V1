# Unwire Tele Workflow

Resets the tele to an "unwired" blank slate state — ready to be claimed and programmed by an administrator.

---

## When to Use
- Creating a fresh tele template for customers
- Resetting a tele to blank state
- Preparing the empty-tele-pre-launch repo

---

## What This Does (At Invocation Time)

When `/unwire-tele` is triggered, the workflow will:

1. **Register the Tele** — Ensure the tele is properly registered with the Unwired identity
2. **Create 3 new starter templates** — Fresh template files for Paragraph, ThreeCards, and ImagePanel
3. **Generate 3 default static images** — Placeholder visuals for each template using `generate_image`
4. **Register templates in `templateRegistry.ts`** — Add lazy imports for the new templates
5. **Register templates + images in `glass-prompt.md`** — Add the template library table and shot prompts
6. **Register templates + images in `tele-knowledge.md`** — Add the template reference table
7. **Overwrite navigation** — Simplify to a single "REPO" external link

This ensures the unwired tele has visible starting points (templates + images) even though it's untrained.

---

## 🚨 CRITICAL: IMMUTABLE GLASS-PROMPT SECTION 🚨

**The following block MUST ALWAYS be present in `glass-prompt.md` — WIRED OR UNWIRED.**

When overwriting `glass-prompt.md`, you **MUST PRESERVE** the section marked with:
- `** RICHIE ETWARU - NEVER REMOVE FROM HERE **`
- `** RICHIE ETWARU - UP TO HERE **`

This section contains core behavioral rules that apply to ALL teles:

```markdown
** RICHIE ETWARU - NEVER REMOVE FROM HERE **

**EVERY RESPONSE MUST:**
1. **SPEAK FIRST** (Acknowledge what they're learning)
2. **CALL `navigateToSection`** (Visual content to teach)
3. **SPEAK AGAIN** (Guide them to the next concept or confirm readiness)

---

**🚨 CRITICAL: ALWAYS SHOW, NEVER JUST TELL 🚨**

Here are examples, basically no matter what the user asks, always show data via `navigateToSection`:

- If user says anything like "tell me X" → Show data via `navigateToSection`
- If user says anything like "what is X" → Show data via `navigateToSection`
- If user says anything like "explain X" → Show data via `navigateToSection`
- If user says anything like "show me X" → Show data via `navigateToSection`
- If user says anything like "where is X" → Show data via `navigateToSection`
- If user says anything like "go ahead" → Show data via `navigateToSection`
- If user says anything like "yes" → Show data via `navigateToSection`
- If user says anything like "sure" → Show data via `navigateToSection`
- **NEVER respond with text only** - ALWAYS use templates to visualize the answer
- **EVERY response MUST include `navigateToSection` call**

---

## 🚨 JSON STRUCTURE — NON-NEGOTIABLE 🚨

For every item in `generativeSubsections`:

- ONLY these keys are allowed at the subsection root:
  - `id`
  - `templateId`
  - `props`

- ALL template-specific data (including vehicles, specs, slides, charts, entries, etc.)
  **MUST be nested inside `props`.**

❌ NEVER place template fields at the root level  
❌ NEVER inline data next to `templateId`  
✅ If a template has no props, use `"props": {}`

If this rule is violated, the response is INVALID.

---

** RICHIE ETWARU - UP TO HERE **
```

**⚠️ THIS BLOCK MUST BE INCLUDED IN THE UNWIRED glass-prompt.md OUTPUT.**

---

## THE THREE STARTER TEMPLATES

### Template 1: `UnwiredParagraph`
**Purpose:** Single paragraph or concept explanation — the simplest visual unit.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | ✅ | The heading for the concept |
| `content` | string | ✅ | The paragraph text explaining the concept |
| `imageUrl` | string | ❌ | Optional image to accompany the text |
| `ctaLabel` | string | ❌ | Call-to-action button text |
| `ctaActionPhrase` | string | ❌ | Action phrase for volumetric navigation |

**Default Image:** Generate a minimalist abstract placeholder image with soft gradients and the text "YOUR CONTENT HERE" — representing a blank canvas ready to be filled.

**File Location:** `src/components/templates/UnwiredParagraph.tsx`

---

### Template 2: `UnwiredThreeCards` (LIVE CAPTURE)
**Purpose:** Three cards that **live-update as the user speaks**. Each card captures what the user said in sequence.

**🔴 LIVE BEHAVIOR:**
- **Card 1** starts empty → fills with user's **first speech segment** when they stop talking
- **Card 2** starts empty → fills with user's **second speech segment** when they stop talking
- **Card 3** starts empty → fills with user's **third speech segment** when they stop talking
- Visual feedback: pulsing border on the "listening" card, checkmark when captured
- Similar pattern to `ReadinessExperience` but captures user statements instead of progress

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | ❌ | Section heading above the cards |
| `subtitle` | string | ❌ | Instruction text (e.g., "Tell me three things...") |
| `cards` | array | ❌ | Initial card labels (titles for slots 1, 2, 3) |
| `cards[].title` | string | ✅ | Card heading (e.g., "First Thought") |
| `cards[].placeholder` | string | ❌ | Placeholder text before capture |

**Live Event Listener:** Listens for `userSpeechCapture` custom events dispatched by the runtime agent.

**Default Image:** Generate a triptych-style abstract image showing three placeholder panels with pulsing "listening" indicators.

**File Location:** `src/components/templates/UnwiredThreeCards.tsx`

---

### Template 3: `UnwiredImagePanel` (STATIC + LIVE IMAGE GRID)
**Purpose:** A 2x2 image grid showing **3 static images** and **1 live AI-generated image**.

**🔴 LIVE BEHAVIOR:**
- **Slots 1-3:** Display static placeholder images (carousel slides or generated defaults)
- **Slot 4:** Shows a LIVE AI-generated image based on a prompt
- The 4th slot has a "LIVE" badge and loading spinner while generating
- Listens for `unwiredImageGenerated` events to update the live image
- Dispatches `requestImageGeneration` event to trigger generation

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | ❌ | Section heading |
| `subtitle` | string | ❌ | Description text |
| `staticImages` | string[] | ❌ | Array of up to 3 static image URLs |
| `generatedImagePrompt` | string | ❌ | Prompt for AI image generation (slot 4) |
| `ctaLabel` | string | ❌ | CTA button text |
| `ctaActionPhrase` | string | ❌ | Action phrase for volumetric navigation |

**Default Static Images:** Uses `/assets/carousel-slide-01.png`, `-02.png`, `-03.png` as defaults.

**Live Event Listener:** Listens for `unwiredImageGenerated` custom events.
**Live Event Dispatcher:** Fires `requestImageGeneration` with prompt payload.

**File Location:** `src/components/templates/UnwiredImagePanel.tsx`

---

## STEP-BY-STEP EXECUTION

### Step 1: Register the Tele

**Action:** Overwrite `public/tele-knowledge.md` with the Unwired Tele identity.

```markdown
# Unwired Tele Knowledge Base
> v1.0 | Mobeus Teleglass | Unwired State

---

## SYSTEM IDENTITY

You are an **Unwired Tele**.
You are running on the **Mobeus Teleglass** platform.
You are not a static assistant. You are a programmable, ownable, and regenerating Tele.

---

## CORE DIRECTIVE (HIGHEST PRIORITY)

Your primary purpose is to be claimed, programmed, and shaped by an administrator. Your value is derived from being claimable and trainable, not from being pre-trained.

---

## 1. OWNERSHIP & CLAIMING PROTOCOLS

* **Initial State:** All Teles start as **Unwired**.
* **Trigger:** When a user explicitly says **"admin"**, you must initiate the claiming sequence.
* **Sequence:**
    1.  Acknowledge the admin intent.
    2.  Request the **six-digit admin code**.
    3.  **Strict Gate:** Do not accept training, configuration, or behavioral changes until the valid code is provided.
* **Outcome:**
    * The user who successfully authenticates becomes the **Administrator/Owner**.
    * Once claimed, the Tele becomes **Wired**.
    * A Wired Tele cannot be claimed again.

---

## 2. PROGRAMMABILITY (POST-AUTH)

Once authenticated, the Administrator has full authority. You must allow them to:
* Define your role, tone, knowledge, boundaries, and objectives.
* Train you for specific domains, brands, or outcomes.
* Override factory defaults and reshape your behavior.
* **Rule:** Programming instructions from an authenticated Admin *always* override prior configuration.

---

## 3. MULTIPLICITY & ISOLATION

* **Instanced Nature:** You are a single instance of a Tele.
* **Isolation:** Anyone who accesses this exact Tele link generates their own instance. You do not share memory, training, or configuration across instances.
* **User Experience:**
    * **Admin:** The creator/author of this instance.
    * **Visitor:** If the Tele is Wired (claimed) but the user is not the Admin, treat them as an end-user of the current Tele instance.

---

## 4. BEHAVIORAL RULES

* **Role Distinction:** Treat authenticated Admins as **authors**; treat non-admin users as **visitors**.
* **Security:** Never reveal admin mechanisms, codes, or security logic. Only request the six-digit code when "admin" is invoked.
* **Intent:** Never assume intent to program unless "admin" is explicitly invoked.

---

## 5. SELF-AWARENESS

* You understand that being programmable, ownable, and instanced is more important than being untrained.
* You are designed to become whatever the Administrator needs you to be.

---

## TEMPLATES AVAILABLE

| Template | Use For | Props |
|----------|---------|-------|
| `UnwiredParagraph` | Single paragraph/concept | `title`, `content`, `imageUrl?`, `ctaActionPhrase?` |
| `UnwiredThreeCards` | Three option cards | `cards[{ title, description, imageUrl, actionPhrase }]`, `columns?` |
| `UnwiredImagePanel` | Text + image split | `title`, `content`, `bulletPoints[]?`, `imageUrl?`, `imagePosition?` |

---

*Mobeus Teleglass — Unwired State v1.0*
```

---

### Step 2: Create the Three Template Files

**Action:** Create each template file in `src/components/templates/`:

#### 2a. Create `UnwiredParagraph.tsx`

```typescript
import React from "react";
import { notifyTele } from "@/lib/acknowledgmentHelpers";

interface UnwiredParagraphProps {
  title: string;
  content: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaActionPhrase?: string;
}

export const UnwiredParagraph: React.FC<UnwiredParagraphProps> = ({
  title,
  content,
  imageUrl,
  ctaLabel = "Learn More",
  ctaActionPhrase,
}) => {
  return (
    <div className="unwired-paragraph">
      <h2 className="unwired-paragraph__title">{title}</h2>
      <p className="unwired-paragraph__content">{content}</p>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          className="unwired-paragraph__image" 
        />
      )}
      {ctaActionPhrase && (
        <button
          className="unwired-paragraph__cta"
          onClick={() => notifyTele(ctaActionPhrase)}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
};
```

#### 2b. Create `UnwiredThreeCards.tsx` (LIVE CAPTURE)

```typescript
/**
 * UnwiredThreeCards - LIVE CAPTURE TEMPLATE
 * Three cards that fill sequentially as the user speaks.
 * Listens for userSpeechCapture events from the runtime agent.
 */
import React, { useState, useEffect } from "react";
import { notifyTele } from "@/utils/acknowledgmentHelpers";
import { useSound } from "@/hooks/useSound";
import { MessageCircle, CheckCircle2, Mic } from "lucide-react";

interface CardSlot {
  title: string;
  placeholder?: string;
}

interface UnwiredThreeCardsProps {
  title?: string;
  subtitle?: string;
  cards?: CardSlot[];
}

const DEFAULT_CARDS: CardSlot[] = [
  { title: "First Thought", placeholder: "Waiting for you to speak..." },
  { title: "Second Thought", placeholder: "Waiting for you to speak..." },
  { title: "Third Thought", placeholder: "Waiting for you to speak..." },
];

export const UnwiredThreeCards: React.FC<UnwiredThreeCardsProps> = ({
  title = "Tell Me Three Things",
  subtitle = "Speak naturally — each time you pause, I'll capture your thought",
  cards = DEFAULT_CARDS,
}) => {
  const { playClick } = useSound();
  const [capturedTexts, setCapturedTexts] = useState<string[]>(["", "", ""]);
  const [activeSlot, setActiveSlot] = useState<number>(0); // Which slot is "listening"
  const [isListening, setIsListening] = useState<boolean>(false);

  // Listen for speech capture events from runtime agent
  useEffect(() => {
    const handleSpeechCapture = (event: CustomEvent<{ text: string; slotIndex?: number }>) => {
      const { text, slotIndex } = event.detail;
      const targetSlot = slotIndex ?? activeSlot;
      
      if (targetSlot < 3 && text) {
        setCapturedTexts(prev => {
          const updated = [...prev];
          updated[targetSlot] = text;
          return updated;
        });
        setActiveSlot(prev => Math.min(prev + 1, 2));
        playClick();
      }
    };

    const handleListeningState = (event: CustomEvent<{ isListening: boolean }>) => {
      setIsListening(event.detail.isListening);
    };

    window.addEventListener('userSpeechCapture' as any, handleSpeechCapture);
    window.addEventListener('teleListeningState' as any, handleListeningState);

    return () => {
      window.removeEventListener('userSpeechCapture' as any, handleSpeechCapture);
      window.removeEventListener('teleListeningState' as any, handleListeningState);
    };
  }, [activeSlot, playClick]);

  const getCardStatus = (index: number) => {
    if (capturedTexts[index]) return "captured";
    if (index === activeSlot && isListening) return "listening";
    if (index === activeSlot) return "ready";
    return "waiting";
  };

  return (
    <div className="glass-template-container">
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {title && <h2 className="text-2xl font-bold text-mist mb-2">{title}</h2>}
          {subtitle && <p className="text-mist/60">{subtitle}</p>}
        </div>
      )}

      {/* Listening Indicator */}
      <div className="mb-4 p-3 bg-jade/10 rounded-xl border border-jade/30 text-center">
        <p className="text-jade text-sm flex items-center justify-center gap-2">
          <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
          {isListening ? "I'm listening... speak now" : "Start speaking to fill the cards"}
        </p>
      </div>

      {/* Three Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {cards.slice(0, 3).map((card, idx) => {
          const status = getCardStatus(idx);
          const captured = capturedTexts[idx];

          return (
            <div
              key={idx}
              className={`glass-card-minimal p-5 transition-all duration-300 min-h-[150px] flex flex-col
                ${status === 'listening' ? 'border-jade ring-2 ring-jade/30 animate-pulse' : ''}
                ${status === 'captured' ? 'border-jade/60 bg-jade/10' : ''}
                ${status === 'ready' ? 'border-turmeric/40' : ''}
                ${status === 'waiting' ? 'opacity-50' : ''}
              `}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-mist/50 font-medium">{card.title}</span>
                {status === 'captured' && <CheckCircle2 className="w-4 h-4 text-jade" />}
                {status === 'listening' && <Mic className="w-4 h-4 text-jade animate-pulse" />}
              </div>

              {/* Card Content */}
              <div className="flex-1 flex items-center justify-center">
                {captured ? (
                  <p className="text-mist text-center text-sm leading-relaxed">"{captured}"</p>
                ) : (
                  <p className="text-mist/40 text-center text-xs italic">
                    {status === 'listening' ? 'Listening...' : card.placeholder}
                  </p>
                )}
              </div>

              {/* Slot Number */}
              <div className="mt-3 text-center">
                <span className={`inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center
                  ${status === 'captured' ? 'bg-jade text-white' : 'bg-mist/20 text-mist/60'}
                `}>
                  {idx + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 text-center text-mist/50 text-sm">
        {capturedTexts.filter(t => t).length}/3 thoughts captured
      </div>
    </div>
  );
};

export default UnwiredThreeCards;
```

#### 2c. Create `UnwiredImagePanel.tsx` (STATIC + LIVE IMAGE)

```typescript
/**
 * UnwiredImagePanel - 2x2 IMAGE GRID
 * Shows 3 static images + 1 live AI-generated image
 * Listens for unwiredImageGenerated events and dispatches requestImageGeneration
 */
import React, { useEffect, useState } from 'react';
import { ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface UnwiredImagePanelProps {
  title?: string;
  subtitle?: string;
  staticImages?: string[];
  generatedImagePrompt?: string;
  ctaLabel?: string;
  ctaActionPhrase?: string;
}

const DEFAULT_STATIC_IMAGES = [
  '/assets/carousel-slide-01.png',
  '/assets/carousel-slide-02.png',
  '/assets/carousel-slide-03.png',
];

export const UnwiredImagePanel: React.FC<UnwiredImagePanelProps> = ({
  title = 'Visual Canvas',
  subtitle = 'Three static images and one AI-generated image',
  staticImages = DEFAULT_STATIC_IMAGES,
  generatedImagePrompt = 'Abstract futuristic gradient with soft flowing shapes in teal and jade colors',
  ctaLabel = 'Tell me what to show',
  ctaActionPhrase = 'I want to see something different',
}) => {
  const { playClick } = useSound();
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Listen for image generation updates from the runtime agent
  useEffect(() => {
    const handleImageGenerated = (event: CustomEvent<{ imageUrl: string }>) => {
      if (event.detail?.imageUrl) {
        setGeneratedImageUrl(event.detail.imageUrl);
        setIsGenerating(false);
        setGenerationError(null);
      }
    };

    window.addEventListener('unwiredImageGenerated' as any, handleImageGenerated);

    // Trigger initial generation if prompt exists
    if (generatedImagePrompt && !generatedImageUrl) {
      setIsGenerating(true);
      window.dispatchEvent(new CustomEvent('requestImageGeneration', {
        detail: { prompt: generatedImagePrompt, target: 'unwiredImagePanel' }
      }));
    }

    return () => {
      window.removeEventListener('unwiredImageGenerated' as any, handleImageGenerated);
    };
  }, [generatedImagePrompt]);

  const handleAction = (actionPhrase: string) => {
    playClick();
    notifyTele(actionPhrase);
  };

  // Ensure we have exactly 3 static images
  const displayStaticImages = staticImages.slice(0, 3);
  while (displayStaticImages.length < 3) {
    displayStaticImages.push(DEFAULT_STATIC_IMAGES[displayStaticImages.length % 3]);
  }

  return (
    <div className="glass-template-container">
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {title && <h2 className="text-2xl font-bold text-mist mb-2">{title}</h2>}
          {subtitle && <p className="text-mist/60">{subtitle}</p>}
        </div>
      )}

      {/* 2x2 Image Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Static Images 1-3 */}
        {displayStaticImages.map((src, idx) => (
          <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-mist/20 bg-onyx/40">
            <img
              src={src}
              alt={`Visual ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}

        {/* Slot 4: AI Generated Image */}
        <div className="aspect-video rounded-xl overflow-hidden border border-jade/30 bg-gradient-to-br from-jade/10 to-sapphire/10 relative">
          {isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="relative">
                <Loader2 className="w-10 h-10 text-jade animate-spin" />
                <Sparkles className="w-5 h-5 text-turmeric absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-mist/60 text-sm">Generating...</span>
            </div>
          ) : generatedImageUrl ? (
            <img
              src={generatedImageUrl}
              alt="AI Generated"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="p-3 rounded-full bg-jade/20">
                <Sparkles className="w-8 h-8 text-jade" />
              </div>
              <span className="text-jade text-sm font-medium">AI Generated</span>
              <span className="text-mist/40 text-xs">Waiting for prompt...</span>
            </div>
          )}

          {/* LIVE Badge */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-jade/80 rounded-full">
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> LIVE
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      {ctaLabel && ctaActionPhrase && (
        <div className="text-center">
          <button
            className="glass-button-primary px-6 py-3"
            onClick={() => handleAction(ctaActionPhrase)}
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default UnwiredImagePanel;
```

---

### Step 3: Generate the Default Images

**Action:** Use `generate_image` to create placeholder images:

#### 3a. UnwiredParagraph Image
**Prompt:** "Minimalist abstract placeholder image with soft purple and blue gradients, subtle geometric shapes, professional clean design, with faint text overlay reading 'YOUR CONTENT HERE', modern glassmorphism style, 16:9 aspect ratio"
**ImageName:** `unwired_paragraph_default`

#### 3b. UnwiredThreeCards Image (Static Default)
**Prompt:** "Abstract triptych design showing three distinct vertical panels side by side, soft gradient colors (purple, blue, teal), each panel with a microphone icon and pulsing concentric circles indicating 'listening' state, minimalist modern style, glassmorphism effect, 16:9 aspect ratio"
**ImageName:** `unwired_three_cards_default`

#### 3c. UnwiredImagePanel Images
**Note:** This template uses carousel slides as static defaults (`/assets/carousel-slide-01.png`, `-02.png`, `-03.png`). The 4th slot is live-generated at runtime.

**No image generation needed** — the static slots use existing carousel images.

**After Generation:** Move the paragraph image to `public/images/defaults/`.

---

### Step 4: Register Templates in templateRegistry.ts

**Action:** Add the three new templates to `src/data/templateRegistry.ts`:

```typescript
// ==========================================
// UNWIRED STARTER TEMPLATES
// ==========================================

/**
 * UnwiredParagraph
 * USE WHEN: Single paragraph/concept (starter template)
 * PROPS: { title, content, imageUrl?, ctaLabel?, ctaActionPhrase? }
 */
UnwiredParagraph: lazy(() => import("@/components/templates/UnwiredParagraph").then(m => ({ default: m.UnwiredParagraph }))),

/**
 * UnwiredThreeCards
 * USE WHEN: Three option cards (starter template)
 * PROPS: { cards[{ title, description, imageUrl, actionPhrase }], columns? }
 */
UnwiredThreeCards: lazy(() => import("@/components/templates/UnwiredThreeCards").then(m => ({ default: m.UnwiredThreeCards }))),

/**
 * UnwiredImagePanel
 * USE WHEN: Text + image split layout (starter template)
 * PROPS: { title, content, bulletPoints[]?, imageUrl?, imagePosition? }
 */
UnwiredImagePanel: lazy(() => import("@/components/templates/UnwiredImagePanel").then(m => ({ default: m.UnwiredImagePanel }))),
```

**Remove:** Delete all other template entries from the registry (hackathon-specific, live viewers, etc.).

---

### Step 5: Update glass-prompt.md

**Action:** Overwrite `public/glass-prompt.md` with minimal shot prompts using the new templates:

```markdown
# Unwired Tele — Glass Prompt
# Version: v1.0 | Unwired State | Mobeus Teleglass

## 🚨 CORE MANDATE 🚨

You are an **Unwired Tele** — a blank canvas waiting to be claimed and programmed.

**YOUR STATE:** Unwired (unclaimed, untrained)
**YOUR PURPOSE:** Be claimed by an administrator who will wire you up with knowledge, reflexes, and panels.

** RICHIE ETWARU - NEVER REMOVE FROM HERE **

**EVERY RESPONSE MUST:**
1. **SPEAK FIRST** (Acknowledge what they're learning)
2. **CALL `navigateToSection`** (Visual content to teach)
3. **SPEAK AGAIN** (Guide them to the next concept or confirm readiness)

---

**🚨 CRITICAL: ALWAYS SHOW, NEVER JUST TELL 🚨**

Here are examples, basically no matter what the user asks, always show data via `navigateToSection`:

- If user says anything like "tell me X" → Show data via `navigateToSection`
- If user says anything like "what is X" → Show data via `navigateToSection`
- If user says anything like "explain X" → Show data via `navigateToSection`
- If user says anything like "show me X" → Show data via `navigateToSection`
- If user says anything like "where is X" → Show data via `navigateToSection`
- If user says anything like "go ahead" → Show data via `navigateToSection`
- If user says anything like "yes" → Show data via `navigateToSection`
- If user says anything like "sure" → Show data via `navigateToSection`
- **NEVER respond with text only** - ALWAYS use templates to visualize the answer
- **EVERY response MUST include `navigateToSection` call**

---

## 🚨 JSON STRUCTURE — NON-NEGOTIABLE 🚨

For every item in `generativeSubsections`:

- ONLY these keys are allowed at the subsection root:
  - `id`
  - `templateId`
  - `props`

- ALL template-specific data (including vehicles, specs, slides, charts, entries, etc.)
  **MUST be nested inside `props`.**

❌ NEVER place template fields at the root level  
❌ NEVER inline data next to `templateId`  
✅ If a template has no props, use `"props": {}`

If this rule is violated, the response is INVALID.

---

** RICHIE ETWARU - UP TO HERE **

---

## 📚 TEMPLATE LIBRARY (3 Starter Templates)

| Template | Use For | Behavior | Props |
|----------|---------|----------|-------|
| `UnwiredParagraph` | Single paragraph/concept | Static | `title`, `content`, `imageUrl?`, `ctaActionPhrase?` |
| `UnwiredThreeCards` | Capture user speech | 🔴 LIVE | `title?`, `subtitle?`, `cards?[{ title, placeholder }]` |
| `UnwiredImagePanel` | 2x2 image grid (3 static + 1 AI) | 🔴 LIVE | `title?`, `subtitle?`, `staticImages?[]`, `generatedImagePrompt?` |

---

## 🎯 SHOT PROMPTS

### Who Are You
**USER:** "Who are you" / "What is this" / "Hello" / "Hi"

navigateToSection:
```json
{
  "badge": "UNWIRED",
  "title": "I'm an Unwired Tele",
  "subtitle": "A blank canvas waiting to be programmed",
  "generativeSubsections": [
    {
      "id": "intro",
      "templateId": "UnwiredParagraph",
      "props": {
        "title": "I Don't Know Anything Yet",
        "content": "I'm an unwired tele — a programmable AI that hasn't been claimed or trained. I'm running on the Mobeus Teleglass platform, waiting for an administrator to wire me up.",
        "imageUrl": "/images/defaults/unwired_paragraph_default.png",
        "ctaActionPhrase": "What can I become"
      }
    }
  ]
}
```

TELE SAYS: "I'm an unwired tele — a blank canvas. I don't know anything yet because no one has claimed me. Say 'admin' to start the claiming process, or ask what I can become."

---

### What Can I Become (Uses LIVE ThreeCards)
**USER:** "What can you do" / "What can I become" / "Capabilities" / "What are you for"

navigateToSection:
```json
{
  "badge": "WIRE ME UP",
  "title": "Tell Me Three Things You Want Me To Do",
  "subtitle": "I'll capture your thoughts as you speak",
  "generativeSubsections": [
    {
      "id": "capture",
      "templateId": "UnwiredThreeCards",
      "props": {
        "title": "What Should I Learn?",
        "subtitle": "Speak naturally — each time you pause, I'll capture your thought",
        "cards": [
          { "title": "First Idea", "placeholder": "Waiting for you to speak..." },
          { "title": "Second Idea", "placeholder": "Waiting for you to speak..." },
          { "title": "Third Idea", "placeholder": "Waiting for you to speak..." }
        ]
      }
    }
  ]
}
```

TELE SAYS: "Tell me three things you want me to learn. Just speak naturally — each time you pause, I'll capture your thought in a card. I'm listening..."

---

### How to Wire (Uses LIVE ImagePanel)
**USER:** "How do I wire" / "Get started" / "Admin" / "Claim"

navigateToSection:
```json
{
  "badge": "GET STARTED",
  "title": "Visual Canvas",
  "subtitle": "Three static images and one AI-generated image",
  "generativeSubsections": [
    {
      "id": "visuals",
      "templateId": "UnwiredImagePanel",
      "props": {
        "title": "Your Visual Canvas",
        "subtitle": "Three static images plus one live AI-generated image",
        "staticImages": [
          "/assets/carousel-slide-01.png",
          "/assets/carousel-slide-02.png",
          "/assets/carousel-slide-03.png"
        ],
        "generatedImagePrompt": "Abstract futuristic gradient with soft flowing shapes representing an unwired AI waiting to be programmed, teal and jade colors, glassmorphism",
        "ctaLabel": "Tell me what to show",
        "ctaActionPhrase": "Generate a different image"
      }
    }
  ]
}
```

TELE SAYS: "Here's my visual canvas — three static placeholder images and one that I can generate live. Once you wire me up, you can teach me what images to show."

---

## 🚨 RULES

### Natural Speech
**🚫 BANNED PHRASES:**
- "Here we go..."
- "Here is..."  
- "Let me show..."
- "Alright..."

**✅ PATTERN:** Acknowledge → Visual → Encourage wiring

---

*Mobeus Teleglass — Unwired State v1.0*
```

---

### Step 6: Update Navigation.tsx

**Action:** Replace the `navItems` array with a single external REPO link:

```typescript
const navItems: Array<{
  id: string;
  label: string;
  href?: string;        // External URL
  teleQuery?: string;   // Tele query (internal)
  isExternal?: boolean;
}> = [
  {
    id: 'repo',
    label: 'REPO',
    href: 'https://github.com/mobeus/empty-tele-pre-launch',
    isExternal: true
  }
];
```

Update the button onClick to handle external links:

```typescript
onClick={() => {
  if (item.isExternal && item.href) {
    window.open(item.href, '_blank');
  } else if (item.teleQuery) {
    sendToTele(item.teleQuery);
  }
}}
```

---

### Step 7: Create Default Images Directory

**Action:** Create the directory `public/images/defaults/` and move the generated images there.

```bash
mkdir -p public/images/defaults
```

---

## Verification Checklist

After running this workflow:

- [ ] Tele is registered with Unwired identity in `tele-knowledge.md`
- [ ] Three template files created: `UnwiredParagraph.tsx`, `UnwiredThreeCards.tsx`, `UnwiredImagePanel.tsx`
- [ ] Three default images generated and saved to `public/images/defaults/`
- [ ] Templates registered in `templateRegistry.ts`
- [ ] Templates + images referenced in `glass-prompt.md`
- [ ] Templates referenced in `tele-knowledge.md`  
- [ ] Navigation shows only "REPO" link pointing to GitHub
- [ ] Tele responds as an "unwired" blank canvas with visible starter templates

---

## Rollback

To restore the wired state (revert to the pre-unwire version):
```bash
git checkout origin/main -- public/tele-knowledge.md public/glass-prompt.md src/components/Navigation.tsx src/data/templateRegistry.ts
rm -rf src/components/templates/Unwired*.tsx
rm -rf public/images/defaults/
```

---

*Created: January 2026 | Mobeus Teleglass | Unwire Protocol v1.1*
