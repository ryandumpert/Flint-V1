# Template Design System Reference

> Mobeus University | v74.0 | January 2026

---

## Design Tokens

### Icon Containers
```
Standard:  w-10 h-10 rounded-lg bg-sapphire/20 border border-sapphire/30
Large:     w-12 h-12 rounded-xl bg-sapphire/20 border border-sapphire/30
Featured:  w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30
```

### Icon Sizes
```
Standard:  w-5 h-5 text-sapphire
Large:     w-6 h-6 text-sapphire
Featured:  w-7 h-7 text-sapphire
```

### Card Backgrounds
```
Minimal:   bg-obsidian/30 border border-mist/10 rounded-xl
Standard:  bg-obsidian/40 border border-mist/10 rounded-xl
Featured:  bg-obsidian/50 border border-mist/15 rounded-2xl
Hover:     hover:border-sapphire/30 hover:bg-obsidian/60
```

### Text Hierarchy
```
Headline:    text-2xl md:text-3xl font-bold text-white
Title:       text-lg font-bold text-white
Subtitle:    text-sm text-sapphire
Description: text-sm text-mist/70
Detail:      text-xs text-mist/50
```

### Buttons
```
CTA:       px-8 py-4 bg-flamingo text-white font-semibold rounded-full text-lg
Secondary: px-6 py-3 border border-mist/30 text-white rounded-full
Inline:    px-4 py-2 bg-sapphire/20 text-sapphire rounded-lg text-sm
```

### Spacing
```
Section gap:    space-y-6 or space-y-8
Card padding:   p-4 (minimal) | p-5 (standard) | p-6 (featured)
Grid gap:       gap-4 or gap-6
```

---

## Template Wireframe Patterns

### Pattern 1: Two-Column (Image + Content)
```
┌─────────────────────────────────────┐
│ ┌───────────┐  ┌─────────────────┐  │
│ │   IMAGE   │  │   HEADLINE      │  │
│ │           │  │   Subtitle      │  │
│ │           │  │                 │  │
│ └───────────┘  │   Form/Content  │  │
│                │                 │  │
│ ┌─ Benefits ─┐ │   [CTA Button]  │  │
│ └────────────┘ └─────────────────┘  │
└─────────────────────────────────────┘
```
**Used by:** HackathonScheduler, JourneyPromise, HeroSection

### Pattern 2: Grid Cards
```
┌─────────────────────────────────────┐
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │  Icon   │ │  Icon   │ │  Icon   │ │
│ │  Title  │ │  Title  │ │  Title  │ │
│ │  Desc   │ │  Desc   │ │  Desc   │ │
│ └─────────┘ └─────────┘ └─────────┘ │
│                                     │
│                    [CTA Button] ──▶ │
└─────────────────────────────────────┘
```
**Used by:** FeatureGrid, JourneyUseCases, AboutCompany stats

### Pattern 3: Vertical List
```
┌─────────────────────────────────────┐
│ ┌─ Icon ─┐  Title  │  Desc  │  ─▶  │
│ └────────┘                         │
│ ┌─ Icon ─┐  Title  │  Desc  │  ─▶  │
│ └────────┘                         │
│ ┌─ Icon ─┐  Title  │  Desc  │  ─▶  │
│ └────────┘                         │
│                                    │
│                    [CTA Button] ──▶│
└─────────────────────────────────────┘
```
**Used by:** JourneyWireCommands, JourneyConcepts

### Pattern 4: Full-Width Banner
```
┌─────────────────────────────────────┐
│            HEADLINE                 │
│            Subtitle                 │
│                                     │
│    [Primary CTA]  [Secondary CTA]   │
└─────────────────────────────────────┘
```
**Used by:** ActionBanner

---

## Journey Flow & Button Placement

### CTA Placement Rules
1. **Primary CTA** → Always bottom-right aligned OR centered for banners
2. **Secondary CTA** → Left of primary, ghost style
3. **Card actions** → Inline with card, indicated by arrow

### Journey CTAs (Goal-Oriented)
| Template | CTA Text | Action | Notes |
|----------|----------|--------|-------|
| JourneyPromise | "Learn More" | Platform info | Entry point |
| Platform FeatureGrid | "See Innovations" | innovations | Step 3 |
| Innovations FeatureGrid | "Learn How to Wire" | wiring | Step 4 |
| Wiring | "See Analytics" | analytics | Step 5 |
| Analytics FeatureGrid | "Schedule Hackathon" | **GOAL** | Step 6 |
| HackathonScheduler | [Submit Form] | **GOAL ACHIEVED** | Final |

---

## Color Usage

### Primary Actions (Flamingo)
- CTA buttons: `bg-flamingo`
- Highlight badges: `bg-flamingo/20 text-flamingo`
- Accent numbers: `text-flamingo`

### Interactive Elements (Sapphire)
- Icon containers: `bg-sapphire/20 border-sapphire/30`
- Icon color: `text-sapphire`
- Hover borders: `hover:border-sapphire/30`
- Link text: `text-sapphire`

### Success States (Jade)
- Success icons: `bg-jade/20 text-jade`
- Confirmation: `text-jade`

---

## Template-to-Goal Mapping

Each template should guide users toward scheduling a hackathon:

| Template | Journey Step | Next Step CTA |
|----------|--------------|---------------|
| WelcomeCarousel | Entry | Multiple entry points |
| JourneyPromise | 1 (Problem) | "Learn More" |
| FeatureGrid (Platform) | 3 (Platform) | "See Innovations" |
| FeatureGrid (Innovations) | 4 (Innovations) | "Learn How to Wire" |
| JourneyBuildModes | 5 (Wiring: Voice) | "See Wire Commands" |
| JourneyWireCommands | 5 (Wiring: Commands) | "See Analytics" |
| FeatureGrid (Analytics) | 6 (Analytics) | "Schedule Hackathon" |
| **HackathonScheduler** | **7 (GOAL)** | **[Submit Form]** |

---

## Consistency Checklist

Before adding a new template, verify:

- [ ] Uses `glass-template-container` wrapper
- [ ] Icon containers are `w-10 h-10` or `w-12 h-12`
- [ ] Icons are `w-5 h-5` or `w-6 h-6`
- [ ] CTA button is flamingo, rounded-full, px-8 py-4
- [ ] CTA has ArrowRight icon
- [ ] Card backgrounds use `bg-obsidian/40 border-mist/10`
- [ ] Hover states include `hover:border-sapphire/30`
- [ ] Text follows hierarchy (lg for titles, sm for descriptions)
- [ ] Spacing uses space-y-6 or gap-4/gap-6
- [ ] Has volumetric navigation (notifyTele on clicks)
