# 🤖 AGENT.md — Mobeus University

> **The Screen Finally Cares** — Brand Experience & Launch Event
> v97.0 | January 2026

---

## ⚠️ AFTER EDITING PROMPTS, RUN /publish

After modifying `tele-knowledge.md` or `glass-prompt.md`:

```bash
node scripts/publish.cjs
```

---

## 🎯 THE SINGULAR GOAL

**Get visitors to sign up for the Launch Event** — the historic moment when a population of conversational labor goes live.

Everything in this application serves this goal:
1. **Brand Impression** — Show what Mobeus is and why it matters
2. **Tele Introduction** — Demonstrate what a tele is and what it can do
3. **Launch Event CTA** — Drive signups for the Q1 launch

---

## 🏛️ TWO-AGENT ARCHITECTURE

| Agent | When | Does | Key Files |
|-------|------|------|-----------|
| **Build Agent** (Claude) | Development | Creates templates, writes knowledge, defines prompts | This file, `/src/`, `/public/prompts/` |
| **Runtime Agent** (Catherine) | Live sessions | Talks to users, calls `navigateToSection` | `tele-knowledge.md`, `glass-prompt.md` |

### How They Connect

```
BUILD TIME: You create templates + knowledge + prompts
     ↓
SHARED FILES: public/prompts/tele-knowledge.md, glass-prompt.md
     ↓
RUNTIME: Catherine speaks + calls navigateToSection + renders templates
```

---

## 📄 KEY FILES

| File | Purpose | Limit |
|------|---------|-------|
| `public/prompts/tele-knowledge.md` | What Catherine knows | ~500 lines |
| `public/prompts/glass-prompt.md` | How Catherine responds (tool def) | ~1400 lines |
| `src/components/templates/*.tsx` | Visual components | Any |

---

## 🔧 WORKFLOWS

| Command | Purpose |
|---------|---------|
| `/publish` | Sync prompts to Runtime Agent |
| `/add-glass` | Add a new template |
| `/add-knowledge` | Add domain knowledge |
| `/tele-should` | Add a shot prompt |
| `/audit-tele` | Check alignment with goal |

---

## 📐 THE 5 IMMUTABLE LAWS

1. **VOLUMETRIC NAVIGATION** — Every clickable calls `notifyTele(actionPhrase)`
2. **TOOL CALL MANDATORY** — Catherine calls `navigateToSection` in EVERY response
3. **NO HALLUCINATION** — Use facts from `tele-knowledge.md` only
4. **TOOL SIGNATURE STABILITY** — `navigateToSection` format never changes
5. **GOAL ORIENTATION** — Everything drives toward Launch Event signup

---

## 🎨 BRAND

| Color | Hex | Use |
|-------|-----|-----|
| Flamingo | `#9B5DE5` | CTAs, primary |
| Sapphire | `#47A1AD` | Interactive |
| Jade | `#5EEAD4` | Success |
| Mist | `#F5F5F5` | Text |
| Onyx | `#0D0D0D` | Background |

---

## 🚀 DEVELOPMENT

```bash
npm run dev -- --port 3131    # Start dev server
node scripts/publish.cjs      # Publish prompts
npx tsc --noEmit              # Type check
```

---

## 📋 TEMPLATE SKELETON

```tsx
import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Props {
  items?: Array<{ title: string; actionPhrase: string }>;
}

export const TemplateName: React.FC<Props> = ({ items = [] }) => {
  const { playClick } = useSound();

  const handleAction = (actionPhrase: string) => {
    playClick();
    notifyTele(actionPhrase);
  };

  return (
    <div className="glass-template-container">
      {items.map((item, i) => (
        <div
          key={i}
          className="glass-card-standard glass-card-clickable"
          onClick={() => handleAction(item.actionPhrase)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
```

---

_Mobeus University — The Screen Finally Cares_
_v97.0 | January 2026_
