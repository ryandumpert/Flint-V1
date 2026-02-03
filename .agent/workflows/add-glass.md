---
description: Add a new experience/template to the platform
---

# Add Glass Workflow

Create a new visual template component with full validation.

---

## When to Use

- Need a template that doesn't exist in the current 30
- Existing templates don't fit your use case
- Want highly specialized visual component

**TIP:** Check existing 30 templates first! Most use cases are covered.

---

## Step 1: Design the Template

Before coding, answer:

1. **What's the purpose?** (e.g., "Show pricing tiers")
2. **What data does it need?** (e.g., plans, prices, features)
3. **How does it look?** (sketch or wireframe)
4. **Does an existing template work?** (Check glass-prompt.md)

---

## Step 2: Create the TypeScript File

Create: `src/components/templates/[TemplateName].tsx`

**Template skeleton:**

```tsx
/**
 * [TemplateName] - RICH GENERIC
 * [Brief description of what this template shows]
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

// Define your props interface
interface [TemplateName]Props {
    icon?: string;
    badge?: string;
    headline?: string;
    subheadline?: string;
    // Add your specific props here
    items?: Array<{
        title?: string;
        description?: string;
        actionPhrase?: string;
    }>;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const [TemplateName]: React.FC<[TemplateName]Props> = ({
    icon,
    badge,
    headline,
    subheadline,
    items = [],
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const IconComponent = getIcon(icon);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            {/* Badge */}
            {badge && (
                <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {badge}
                </span>
            )}

            {/* Header */}
            {(icon || headline) && (
                <div className="flex items-center gap-4 mb-6">
                    {icon && (
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                    )}
                    <div>
                        {headline && <h3 className="text-xl md:text-2xl font-bold text-white">{headline}</h3>}
                        {subheadline && <p className="text-sm text-mist/60 mt-1">{subheadline}</p>}
                    </div>
                </div>
            )}

            {/* Items */}
            {items && items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="glass-light rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all"
                            onClick={() => item.actionPhrase && handleAction(item.actionPhrase)}
                        >
                            {item.title && <div className="font-semibold text-white mb-1">{item.title}</div>}
                            {item.description && <div className="text-sm text-mist/60">{item.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <button
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full 
                        hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    onClick={() => handleAction(ctaActionPhrase)}
                >
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default [TemplateName];
```

**Rules:**
- Every clickable MUST call `notifyTele(actionPhrase)`
- Use centralized glass classes (Rule of 3)
- Mobile-first responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- NO English defaults - all content from props

---

## Step 3: Register in Template Registry

Add to `src/data/templateRegistry.ts`:

```typescript
[TemplateName]: lazy(() => import("@/components/templates/[TemplateName]").then(m => ({ default: m.[TemplateName] }))),
```

**Place it in the appropriate category** (Content, Layout, etc.)

---

## Step 4: Add Documentation to glass-prompt.md

⚠️ **CRITICAL:** Add a JSON example that EXACTLY matches your TypeScript interface.

Add to `public/prompts/glass-prompt.md`:

```markdown
#### [TemplateName] ⭐
[Brief description of what this template shows]

**Example:**
\`\`\`json
{
  "headline": "Example Headline",
  "items": [
    { "title": "Item 1", "description": "Description 1", "actionPhrase": "action 1" },
    { "title": "Item 2", "description": "Description 2" }
  ],
  "ctaLabel": "Get Started",
  "ctaActionPhrase": "start now"
}
\`\`\`

---
```

**Ensure:**
- JSON is valid
- Props match TypeScript interface EXACTLY
- Include example for nested objects/arrays
- Show optional vs required props

---

## Step 5: Validate Everything

// turbo-all
```bash
echo "🔍 VALIDATING NEW TEMPLATE..." && \
echo "" && \
# 1. TypeScript compilation
echo "📝 TypeScript:" && \
npx tsc --noEmit && \
echo "✅ TypeScript compiles" && \
echo "" && \
# 2. Template documentation validation
echo "📋 Template Documentation:" && \
node scripts/validate-template-docs.cjs && \
echo "" && \
# 3. Count templates
echo "📊 Template Count:" && \
echo "  Total templates: $(ls -1 src/components/templates/*.tsx | wc -l | tr -d ' ') (max 30)" && \
echo "" && \
echo "✅ VALIDATION COMPLETE"
```

**This MUST pass with 0 errors, 0 warnings.**

---

## Step 6: Test Locally

```bash
npm run dev -- --port 3131
```

Test your template by adding a shot prompt that uses it:

```markdown
### SHOT TEST: "test [templatename]"

\`\`\`json
{
  "badge": "TEST",
  "title": "Template Test",
  "generativeSubsections": [
    {
      "id": "test",
      "templateId": "[TemplateName]",
      "props": {
        // Your example JSON here
      }
    }
  ]
}
\`\`\`

TELE SAYS: "Here's the new template."
```

**Verify:**
- Template renders
- All props display correctly
- Clicks trigger notifyTele()
- Responsive on mobile
- Follows design system

---

## Step 7: Publish

// turbo
```bash
node scripts/publish.cjs
```

---

## Design System Reference

### Glass Classes (Rule of 3)

| Color | Light (16px) | Medium (24px) | Heavy (40px) |
|-------|--------------|---------------|--------------|
| Neutral | `.glass-light` | `.glass-medium` | `.glass-heavy` |
| Dark | `.glass-light-dark` | `.glass-medium-dark` | `.glass-heavy-dark` |
| Primary | `.glass-light-primary` | `.glass-medium-primary` | `.glass-heavy-primary` |
| Secondary | `.glass-light-secondary` | `.glass-medium-secondary` | `.glass-heavy-secondary` |
| Accent | `.glass-light-accent` | `.glass-medium-accent` | `.glass-heavy-accent` |

### Usage Guidelines

| Use Case | Class |
|----------|-------|
| Standard content cards | `glass-medium` |
| Background elements | `glass-light` |
| Modals, overlays | `glass-heavy` |
| Chat panels | `glass-heavy-dark` |
| Highlighted content | `glass-medium-primary` |
| Info boxes | `glass-medium-secondary` |
| Special emphasis | `glass-medium-accent` |

### Buttons

```tsx
// Primary CTA
<button className="px-6 py-3 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90">

// Secondary
<button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10">

// Ghost
<button className="px-4 py-2 text-primary hover:bg-primary/10 rounded-full">
```

---

## ⚠️ Common Mistakes

### ❌ Wrong:
```tsx
// Hardcoded English
<h1>Welcome to Our Platform</h1>

// No notifyTele call
<div onClick={doSomething}>

// Direct function reference (breaks event propagation)
<button onClick={notifyTele(phrase)}>

// Inline colors (not design system)
<div className="bg-purple-500">
```

### ✅ Right:
```tsx
// All content from props
<h1>{headline}</h1>

// Calls notifyTele
<div onClick={() => handleAction(actionPhrase)}>

// Arrow function wrapper
<button onClick={() => handleAction(phrase)}>

// Design system class
<div className="bg-primary">
```

---

## 🎯 Best Practices

1. **Start simple** - Basic version first, add features later
2. **Mobile-first** - Use responsive grid/flex
3. **Validate early** - Run validation after EVERY change
4. **Test thoroughly** - Desktop + mobile, all props, all clicks
5. **Document well** - Clear examples in glass-prompt.md
6. **Keep it lean** - Only add templates you'll actually use

---

## 📊 Template Limits

**Maximum:** 30 templates total

**Current count:** Run `/audit-tele` to see

**Before adding:** Consider if existing templates can be adapted

---

_The Screen Finally Cares_
