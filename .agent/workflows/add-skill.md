---
description: Tell Tele how to respond to specific user requests (shot prompts)
---

# Add Skill Workflow

Add a new skill (shot prompt) to teach your tele how to respond.

## Shot Prompt Structure

```markdown
### SHOT N: "Trigger phrase" / "Alternate phrase"
\`\`\`json
{
  "badge": "BADGE",
  "title": "Title",
  "generativeSubsections": [
    { "id": "section1", "templateId": "TemplateName", "props": { ... } },
    { "id": "section2", "templateId": "TemplateName", "props": { ... } }
  ]
}
\`\`\`
TELE SAYS: "What Catherine says before showing the templates (2-4 sentences)."
```

## Rules

1. **Always call navigateToSection** — No text-only responses
2. **Use 2-3 templates** per shot prompt for rich experiences
3. **Keep TELE SAYS conversational** — Natural, warm, helpful
4. **End with a question or CTA** — Guide toward Launch Event
5. **VALIDATE BEFORE ADDING** — Props MUST match glass-prompt.md examples exactly

## ⚠️ CRITICAL: Template Props Validation

**BEFORE adding any shot prompt:**

```bash
# Check that your template props match glass-prompt.md
node scripts/validate-template-docs.cjs
```

**If validation fails:**
1. Fix your JSON to match the documented props in glass-prompt.md
2. OR update glass-prompt.md if the docs are wrong (then validate again)

**Common mistakes:**
- Using `items` instead of `benefits` for Showcase
- Using `text` when template expects `description`
- Missing required props (check the ✅ in glass-prompt.md)

## Where to Add

Add to `public/prompts/tele-knowledge.md` in the SHOT PROMPTS section.

## After Adding

// turbo-all
```bash
# 1. Validate template docs
node scripts/validate-template-docs.cjs && \
echo "" && \
# 2. Publish
node scripts/publish.cjs
```

---

_The Screen Finally Cares_
