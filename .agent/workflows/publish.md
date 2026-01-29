---
description: Sync local prompt files to Telelabor — make your tele go live
---

# Publish Workflow

Publish updated prompts to the Runtime Agent.

## When to Use

After editing:
- `public/prompts/tele-knowledge.md`
- `public/prompts/glass-prompt.md`

## Command

// turbo
```bash
node scripts/publish.cjs
```

## What It Does

1. Reads markdown files from `public/prompts/`
2. Detects changes using hash comparison
3. Updates the Runtime Agent's knowledge
4. Regenerates system prompt

## Expected Output

```
✓ tele-knowledge.md
✓ glass-prompt.md

✅ Successfully published X component(s)
```

---

_The Screen Finally Cares_
