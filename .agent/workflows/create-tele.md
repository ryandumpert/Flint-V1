---
description: Complete setup wizard for creating a new tele from this template
---

# Create Tele Workflow

**Use this when:** Forking this repository to create your own tele.

This workflow guides you through setting up your tele's foundation: goal, journey, branding, and content structure.

---

## Prerequisites

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone [your-fork-url]
cd [your-project-name]

# 3. Install dependencies
npm install
```

---

## Step 1: Define Your Goal

**Your tele must have ONE singular goal.**

Examples:
- Get users to sign up for the Launch Event
- Get users to book a demo
- Get users to purchase a product
- Get users to submit contact info
- Get users to download the app

**Your goal:**
```
[DEFINE YOUR GOAL HERE]
```

---

## Step 2: Define Your Journey

**How will users progress toward your goal? (3-7 steps max)**

Template:
```
1. [Entry/Awareness] → First impression
2. [Learn/Understand] → What you offer
3. [See/Experience] → How it works
4. [Feel/Connect] → Why it matters
5. [Act/Convert] → Achieve goal
```

**Your journey:**
```
1. 
2. 
3. 
4. 
5. 
```

---

## Step 3: Clear Example Content

// turbo-all
```bash
echo "🧹 CLEARING EXAMPLE CONTENT..." && \
echo "" && \
# Backup current files
echo "📦 Creating backup..." && \
mkdir -p .backup/$(date +%Y%m%d_%H%M%S) && \
cp public/prompts/tele-knowledge.md .backup/$(date +%Y%m%d_%H%M%S)/ && \
cp public/prompts/glass-prompt.md .backup/$(date +%Y%m%d_%H%M%S)/ && \
cp src/pages/Index.tsx .backup/$(date +%Y%m%d_%H%M%S)/ && \
echo "✅ Backup created in .backup/" && \
echo "" && \
echo "⚠️  NEXT: Manually edit these files to remove Mobeus-specific content:" && \
echo "   1. public/prompts/tele-knowledge.md" && \
echo "   2. public/prompts/glass-prompt.md" && \
echo "   3. src/pages/Index.tsx (welcome experience)" && \
echo "" && \
echo "💡 TIP: Search for 'Mobeus', 'Launch Event', 'Catherine' and replace"
```

---

## Step 4: Set Your Branding

### A. Update Logo & Images

```bash
# Replace these files in src/assets/:
- logo.svg → Your logo
- hero-image.jpg → Your hero image
- favicon.ico → Your favicon
```

### B. Update Company Name

Search and replace across project:
- `Mobeus` → `[Your Company]`
- `Catherine` → `[Your Tele Name]` (or keep Catherine)
- `The Screen Finally Cares` → `[Your Tagline]`
- `Launch Event` → `[Your Goal Action]`

**Key files to update:**
- `public/prompts/tele-knowledge.md`
- `public/prompts/glass-prompt.md`
- `src/pages/Index.tsx`
- `src/components/Navigation.tsx`
- `.agent/agent.md`

### C. Update Colors (Optional)

Edit `src/index.css`:
```css
--color-primary: #A78BFA;    /* Your primary color */
--color-secondary: #67E8F9;  /* Your secondary color */
--color-accent: #F472B6;     /* Your accent color */
```

---

## Step 5: Write Your Foundation

### A. Update `tele-knowledge.md`

Add YOUR facts, data, and domain knowledge:

```markdown
## WHO WE ARE
[Your company description]

## WHAT WE DO
[Your product/service]

## THE GOAL
Get users to [YOUR GOAL]

## KEY FACTS
- [Fact 1]
- [Fact 2]
- [Fact 3]

## FREQUENTLY ASKED
**Q: [Common question]**
A: [Your answer]
```

**Limits:**
- Max 500 lines
- Focus on facts, not opinions
- Be specific, not generic

### B. Create Your First Shot Prompts

Add to `glass-prompt.md` or `tele-knowledge.md`:

```markdown
### SHOT 1: "Help" / "What can you do?"

\`\`\`json
{
  "badge": "START",
  "title": "Welcome",
  "generativeSubsections": [
    {
      "id": "welcome",
      "templateId": "Hero",
      "props": {
        "badge": "WELCOME",
        "headline": "[Your Welcome Message]",
        "description": "[What you help with]",
        "ctaLabel": "[Next Step]",
        "ctaActionPhrase": "[Action phrase]"
      }
    }
  ]
}
\`\`\`

TELE SAYS: "[Your conversational response]"
```

**Start with 3-5 essential prompts:**
1. Help/Welcome
2. About/Company Info
3. How It Works
4. Main CTA/Goal

---

## Step 6: Validate Everything

// turbo-all
```bash
echo "🔍 VALIDATING YOUR TELE..." && \
echo "" && \
# Run comprehensive audit
node scripts/validate-template-docs.cjs && \
echo "" && \
node scripts/validate-frontend-alignment.cjs && \
echo "" && \
npx tsc --noEmit && \
echo "" && \
echo "✅ VALIDATION COMPLETE"
```

**Fix any errors before proceeding.**

---

## Step 7: Test Locally

```bash
npm run dev -- --port 3131
```

Open `http://localhost:3131` and test:

```
✓ Welcome experience loads
✓ Logo/branding correct
✓ Chat works
✓ Shot prompts respond
✓ CTAs point to your goal
✓ Mobile responsive
```

---

## Step 8: Publish to Runtime

// turbo
```bash
node scripts/publish.cjs
```

This deploys your `tele-knowledge.md` and `glass-prompt.md` to the Runtime Agent.

---

## Step 9: Deploy Frontend

```bash
# Build production bundle
npm run build

# Deploy dist/ to your host:
# - Vercel: vercel --prod
# - Netlify: netlify deploy --prod
# - AWS Amplify: amplify publish
```

---

## ✅ Post-Setup Checklist

After completing all steps:

```
□ Goal is clearly defined
□ Journey has 3-7 steps
□ Example content removed
□ Your branding applied (logo, colors, company name)
□ tele-knowledge.md has your domain facts
□ 3-5 shot prompts created
□ /audit-tele passes (0 errors)
□ TypeScript compiles
□ Tested locally
□ Published to runtime
□ Frontend deployed
```

---

## 🔄 Next Steps

Now that your foundation is set:

1. **Add more shot prompts:** Use `/add-skill`
2. **Enrich knowledge:** Use `/add-knowledge`
3. **Create custom templates:** Use `/add-glass` (if needed)
4. **Optimize journey:** Analyze user paths, refine prompts
5. **Monitor metrics:** Track progress toward your goal

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Validation fails | Review error messages, fix JSON/props |
| Old branding shows | Search entire project for old company name |
| Templates not rendering | Check glass-prompt.md examples match interfaces |
| TypeScript errors | Run `npx tsc --noEmit` for details |
| Can't publish | Check network, API keys, runtime connection |

---

## 💡 Pro Tips

**Content Strategy:**
- Start simple (3-5 prompts), expand later (12-24)
- Every prompt should advance toward goal
- Use 2-3 templates per prompt for rich experiences
- Write conversationally, not robotically

**Technical:**
- Run `/audit-tele` before every `/publish`
- Keep templates under 30 (delete unused)
- Validate often (prevents big mistakes)
- Use version control (commit after each major step)

**Design:**
- Stick to Rule of 3 glass system
- Mobile-first responsive
- Clear CTAs everywhere
- Brand-aligned colors

---

## 📚 Recommended Reading

After setup, review:
- `FORK_THIS_TELE.md` - Platform overview
- `.agent/agent.md` - Your project authority
- `.agent/workflows/` - All available commands

---

_Congratulations! Your tele is ready to help._ 🎉

**Next:** Run `/add-skill` to add more shot prompts.
