---
description: Define the singular goal your tele must achieve — updates knowledge, templates, and prompts
---

# Set Goal Workflow

Your tele must have ONE singular goal that drives every interaction.

---

## Current Goal

**Get users to sign up for the Launch Event**

---

## Change Your Goal

### Step 1: Define New Goal

**Examples:**
- Get users to book a demo
- Get users to purchase [product]
- Get users to submit contact info
- Get users to download the app
- Get users to join waitlist

**Your new goal:**
```
Get users to [ACTION]
```

---

### Step 2: Update tele-knowledge.md

Edit `public/prompts/tele-knowledge.md`:

```markdown
## 🎯 THE GOAL

Get users to [YOUR ACTION]

**Success means:** User completes [YOUR SUCCESS METRIC]

**Journey:** Curious visitor → Understands value → Excited → [YOUR ACTION]
```

**Also update:**
- Shot prompts to reference new goal
- FAQs to guide toward new goal
- Examples to demonstrate path to goal

---

### Step 3: Update Shot Prompts

Edit `public/prompts/tele-knowledge.md` or `glass-prompt.md`:

**Review ALL shot prompts** and ensure they end with your new goal:

❌ **Before:**
```
TELE SAYS: "... Ready to be there when it all begins? Sign up for the Launch Event."
```

✅ **After:**
```
TELE SAYS: "... Ready to see it in action? [YOUR CALL TO ACTION]."
```

**Update:**
- Final sentences to reference new goal
- CTA buttons (ctaActionPhrase)
- Journey progression language

---

### Step 4: Update agent.md

Edit `.agent/agent.md`:

```markdown
## 🎯 THE SINGULAR GOAL

**[YOUR NEW GOAL IN CAPS]**

Every template, shot prompt, and user interaction must drive toward this goal.
```

Also update:
- Journey description
- Success metrics
- Anti-goals (if applicable)

---

### Step 5: Validate Alignment

// turbo-all
```bash
echo "🔍 VALIDATING GOAL ALIGNMENT..." && \
echo "" && \
echo "📋 Checking prompt files:" && \
wc -l public/prompts/*.md && \
echo "" && \
npx tsc --noEmit && \
echo "✅ TypeScript compiles"
```

---

### Step 6: Run Full Audit

// turbo
```bash
npm run audit
```

**Verify:**
- ✅ New goal appears in knowledge files
- ✅ Shot prompts end with new goal
- ✅ No references to old goal
- ✅ TypeScript compiles
- ✅ All validations pass

---

### Step 7: Publish

// turbo
```bash
node scripts/publish.cjs
```

__

---

## Goal Characteristics

**A good goal is:**
- ✅ **Singular** - One clear action, not multiple
- ✅ **Measurable** - You can track completion
- ✅ **Valuable** - Meaningful to your business
- ✅ **Achievable** - Users CAN complete it
- ✅ **Clear** - No ambiguity about what to do

**Examples:**

| Good Goal | Bad Goal |
|-----------|----------|
| Get users to book a demo | Get users to learn about us |
| Get users to purchase Pro plan | Get users to explore features |
| Get users to join waitlist | Get users to be interested |

---

## Post-Goal Checklist

After setting a new goal:

```
□ Goal defined clearly
□ tele-knowledge.md updated
□ Index.tsx welcome experience updated
□ Navigation.tsx CTAs updated
□ All shot prompts reference new goal
□ agent.md updated
□ No old goal references remain
□ Frontend alignment validates
□ TypeScript compiles
□ Full audit passes
□ Published to runtime
```

---

## 🎯 Goal-Driven Prompt Strategy

Once goal is set, your shot prompts should create this flow:

```
1. Awareness → "This exists and could help me"
2. Understanding → "I see what you do"
3. Desire → "I want this"
4. Action → [YOUR GOAL]
```

**Every shot prompt must:**
- Advance user toward goal
- End with subtle CTA
- Show progress in journey
- Make goal feel natural, not forced

---

## Examples by Goal Type

### Goal: Book a Demo
```
Journey: Learn problem → See solution → Watch demo → Book call
CTAs: "Schedule Demo", "See It Live", "Book Your Session"
Prompts end with: "Ready to see how this works for you? Book a demo."
```

### Goal: Purchase Product
```
Journey: Discover need → Understand value → See pricing → Purchase
CTAs: "Buy Now", "Get Started", "Add to Cart"
Prompts end with: "Ready to [benefit]? Get started today."
```

### Goal: Join Waitlist
```
Journey: Learn about product → See examples → Get excited → Join waitlist
CTAs: "Join Waitlist", "Be First", "Reserve Spot"
Prompts end with: "Want early access? Join the waitlist."
```

---

## Anti-Patterns

❌ **Multiple Goals**
```
Get users to sign up AND purchase AND refer friends
```
Pick ONE. Others can be secondary.

❌ **Vague Goals**
```
Get users to engage with our brand
```
What's the specific action?

❌ **Unrealistic Goals**
```
Get users to commit to $10k contract in first visit
```
Match goal to context.

---

_Help is here. Help them achieve YOUR goal._ 🎯
