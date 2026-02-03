---
description: Generate comprehensive documentation for your tele — goal, journey, templates, and status
---

# Document Tele Workflow

Generate a complete snapshot of your tele's current state and configuration.

---

## When to Use

- Before major releases
- For stakeholder reports
- When onboarding new team members
- To track evolution over time

---

## Generate Documentation

// turbo-all
```bash
echo "📋 GENERATING TELE DOCUMENTATION..." && \
echo "" && \
echo "════════════════════════════════════════════════════════════" && \
echo "                  TELE DOCUMENTATION REPORT" && \
echo "════════════════════════════════════════════════════════════" && \
echo "" && \
echo "📅 Generated: $(date '+%Y-%m-%d %H:%M:%S')" && \
echo "" && \
echo "-----------------------------------------------------------" && \
echo "🎯 THE GOAL" && \
echo "-----------------------------------------------------------" && \
grep -A 2 "## 🎯 THE GOAL" public/prompts/tele-knowledge.md | tail -2 && \
echo "" && \
echo "-----------------------------------------------------------" && \
echo "🗺️  THE JOURNEY" && \
echo "-----------------------------------------------------------" && \
grep "→" public/prompts/tele-knowledge.md | head -7 && \
echo "" && \
echo "-----------------------------------------------------------" && \
echo "📊 CONTENT METRICS" && \
echo "-----------------------------------------------------------" && \
echo "Knowledge Base:" && \
echo "  Lines: $(wc -l < public/prompts/tele-knowledge.md) (max 500)" && \
echo "  Sections: $(grep -c '^##' public/prompts/tele-knowledge.md)" && \
echo "  FAQs: $(grep -c '^\*\*Q:' public/prompts/tele-knowledge.md)" && \
echo "" && \
echo "Glass Prompts:" && \
echo "  Lines: $(wc -l < public/prompts/glass-prompt.md) (max 1500)" && \
echo "  Shot Prompts: $(grep -c 'SHOT' public/prompts/tele-knowledge.md public/prompts/glass-prompt.md 2>/dev/null || echo 0)" && \
echo "  Template Examples: $(grep -c '^####' public/prompts/glass-prompt.md)" && \
echo "" && \
echo "-----------------------------------------------------------" && \
echo "🎨 TEMPLATES" && \
echo "-----------------------------------------------------------" && \
echo "Total Templates: $(ls -1 src/components/templates/*.tsx | wc -l | tr -d ' ')" && \
echo "Documented: $(grep -c '^####' public/prompts/glass-prompt.md)" && \
echo "" && \
echo "Categories:" && \
echo "  Core: Hero, Stats, Trio, Banner, Story" && \
echo "  Layout: Carousel, WelcomeCarousel, Split, Grid, Accordion" && \
echo "  Content: Showcase, Guide, List, Timeline, Form" && \
echo "  Comparison: Compare, Quote, Metric, Steps" && \
echo "" && \
echo "-----------------------------------------------------------" && \
echo "🎨 DESIGN SYSTEM" && \
echo "-----------------------------------------------------------" && \
echo "Glass System: Rule of 3 (15 classes)" && \
echo "  3 levels × 5 colors" && \
echo "" && \
echo "Legacy class usage:" && \
echo "  glass-subtle: $(grep -r 'glass-subtle' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "  glass-strong: $(grep -r 'glass-strong' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "  glass-prominent: $(grep -r 'glass-prominent' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "" && \
echo "New glass class usage:" && \
echo "  glass-light*: $(grep -r 'glass-light' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "  glass-medium*: $(grep -r 'glass-medium' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "  glass-heavy*: $(grep -r 'glass-heavy' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "" && \
echo "-----------------------------------------------------------" && \
echo "✅ VALIDATION STATUS" && \
echo "-----------------------------------------------------------" && \
node scripts/validate-template-docs.cjs 2>&1 | grep "VALIDATION COMPLETE" && \
node scripts/validate-frontend-alignment.cjs 2>&1 | grep "VALIDATION COMPLETE" && \
echo "" && \
echo "TypeScript: $(npx tsc --noEmit 2>&1 | grep -c '^' | xargs -I {} echo '{} errors (0 = clean)')" && \
echo "" && \
echo "-----------------------------------------------------------" && \
echo "🚀 DEPLOYMENT STATUS" && \
echo "-----------------------------------------------------------" && \
echo "Local Dev: Port 3131" && \
echo "Last Published: Check runtime logs" && \
echo "" && \
echo "-----------------------------------------------------------" && \
echo "📞 PROJECT INFO" && \
echo "-----------------------------------------------------------" && \
echo "Codebase: $(pwd)" && \
echo "Git Branch: $(git branch --show-current 2>/dev/null || echo 'Not a git repo')" && \
echo "Git Status: $(git status --short 2>/dev/null | wc -l | tr -d ' ') changed files" && \
echo "" && \
echo "════════════════════════════════════════════════════════════" && \
echo "✅ DOCUMENTATION COMPLETE" && \
echo "════════════════════════════════════════════════════════════"
```

---

## Save Report to File

The report above prints to terminal. To save:

```bash
# Run documentation and save to file
/document-tele > TELE_STATUS_$(date +%Y%m%d).md
```

---

## What Gets Documented

### 1. Goal & Journey
- Current singular goal
- User journey steps
- Compliance level

### 2. Content Metrics
- Knowledge base size and structure
- Shot prompt count
- Template documentation coverage

### 3. Templates
- Total template count
- Documented vs undocumented
- Template categories

### 4. Design System
- Glass system usage
- Legacy class migration status
- Design tokens

### 5. Validation Status
- Template docs validation
- Frontend alignment validation
- TypeScript compilation status

### 6. Deployment
- Development port
- Last publish timestamp
- Git branch and status

---

## Report Frequency

### Daily (During Active Development)
- Quick status check
- Track changes

### Weekly
- Full documentation
- Save to file for records
- Share with team

### Before Major Releases
- Complete documentation
- Validation check
- Archive snapshot

---

## Documentation Archive

Create a documentation history:

```bash
# Generate monthly snapshots
mkdir -p .docs/snapshots/
/document-tele > .docs/snapshots/$(date +%Y-%m).md
```

---

## Share with Team

After generating:

```bash
# Generate and format for sharing
/document-tele > TELE_STATUS.md

# Commit to repo
git add TELE_STATUS.md
git commit -m "docs: tele status snapshot"
git push
```

---

_Help is here. Document the journey._ 📋
