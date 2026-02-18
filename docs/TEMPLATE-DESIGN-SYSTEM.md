# Template Design System

> Cash - Air Loan | v1.0 | February 2026

---

## The Goal

Every template should guide users toward one outcome: **Apply for an investment property loan.**

---

## Brand Colors

| Color | Hex | Purpose |
|-------|-----|---------|
| Flamingo | `#9B5DE5` | CTAs, primary actions |
| Sapphire | `#47A1AD` | Interactive elements |
| Jade | `#5EEAD4` | Success states |
| Mist | `#F5F5F5` | Text, icons |
| Onyx | `#0D0D0D` | Backgrounds |

---

## CSS Classes

**Containers:**
- `glass-template-container` — Standard template wrapper

**Cards:**
- `glass-card-minimal` — Light background
- `glass-card-standard` — Standard background
- `glass-card-featured` — Featured highlight
- `glass-card-clickable` — Hover states

**Typography:**
- `text-template-title` — Headlines
- `text-template-subtitle` — Subtitles
- `text-template-content` — Body text

**Buttons:**
- `btn-cta` — Primary CTA (flamingo)
- `btn-sapphire` — Secondary action
- `btn-ghost` — Tertiary/back

---

## CTA Pattern

Every template should include a path to the goal:

| Template Type | CTA Text | Action |
|--------------|----------|--------|
| Introduction | "Learn More" | Show loan products |
| Features | "See It In Action" | Show demo |
| Examples | "Experience It" | Interactive demo |
| Any | "Get My Estimate" | Mortgage estimate |

---

## Volumetric Navigation

**Every clickable element must call `notifyTele(actionPhrase)`**

```tsx
const handleAction = (actionPhrase: string) => {
  playClick();
  notifyTele(actionPhrase);
};

<button onClick={() => handleAction("show me mortgage estimate")}>
  Get My Estimate
</button>
```

---

## Template Checklist

Before shipping:

- [ ] Uses `glass-template-container` wrapper
- [ ] CTA button is flamingo, rounded-full
- [ ] Every clickable calls `notifyTele()`
- [ ] Clear path toward loan application goal
- [ ] Mobile responsive

---

_Smart lending for smart investments._
