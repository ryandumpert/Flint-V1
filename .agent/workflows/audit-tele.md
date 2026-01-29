---
description: Audit tele alignment — verify everything drives toward the Launch Event goal
---

# Audit Tele Workflow

Comprehensive check that all parts of your tele are aligned with the singular goal.

## When to Use

- Before publishing
- After major changes
- Before demos
- Periodic health check

---

## 🎯 THE GOAL

Everything must drive toward: **Get users to sign up for the Launch Event.**

---

## Quick Audit

// turbo-all
```bash
echo "════════════════════════════════════════════════════════════" && \
echo "               TELE AUDIT — The Screen Finally Cares" && \
echo "════════════════════════════════════════════════════════════" && \
echo "" && \
echo "📏 FILE LENGTHS:" && \
echo "  tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (max 500)" && \
echo "  glass-prompt.md: $(wc -l < public/prompts/glass-prompt.md) lines (max 1500)" && \
echo "" && \
echo "📊 COUNTS:" && \
echo "  Shot prompts: $(grep -c 'SHOT' public/prompts/tele-knowledge.md) (target: 24)" && \
echo "  Templates: $(ls -1 src/components/templates/*.tsx 2>/dev/null | wc -l | tr -d ' ') (max 80)" && \
echo "" && \
echo "🎯 GOAL CHECK:" && \
grep -i "launch" public/prompts/tele-knowledge.md | head -3 && \
echo "" && \
echo "✅ COMPILATION:" && \
npx tsc --noEmit 2>&1 | tail -5 && \
echo "════════════════════════════════════════════════════════════"
```

---

## Alignment Checklist

After audit, verify:

```
□ Goal is clear: Launch Event signup
□ Shot prompts direct toward goal
□ Templates render correctly
□ Every clickable calls notifyTele()
□ TypeScript compiles
□ /publish executed
```

---

_The Screen Finally Cares_
