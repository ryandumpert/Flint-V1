# Template Design System

> Mobeus University | v97.0 | January 2026

---

## The Goal

Every template should guide users toward one outcome: **Sign up for the Launch Event.**

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
| Introduction | "Learn More" | Show more about Mobeus |
| Features | "See It In Action" | Show demo |
| Examples | "Experience It" | Interactive demo |
| Any | "Join the Launch" | Launch event signup |

---

## Volumetric Navigation

**Every clickable element must call `notifyTele(actionPhrase)`**

```tsx
const handleAction = (actionPhrase: string) => {
  playClick();
  notifyTele(actionPhrase);
};

<button onClick={() => handleAction("show me the launch event")}>
  Join the Launch
</button>
```

---

## Template Checklist

Before shipping:

- [ ] Uses `glass-template-container` wrapper
- [ ] CTA button is flamingo, rounded-full
- [ ] Every clickable calls `notifyTele()`
- [ ] Clear path toward launch event goal
- [ ] Mobile responsive

---

_The Screen Finally Cares_
