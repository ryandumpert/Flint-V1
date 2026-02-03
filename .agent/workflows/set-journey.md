---
description: Define the ordered journey your tele guides users through — 7 steps or fewer
---

# Set Journey Workflow

Define how users progress from first interaction to achieving your goal.

---

## Current Journey

```
1. Land → Meet Catherine, see what a tele is
2. Learn → Understand Mobeus and "The Screen Finally Cares"
3. See → Watch examples of teles in action
4. Feel → Get excited about the impact
5. Act → Sign up for the Launch Event
```

**Compliance:** LOW — Users explore freely, gentle guidance

---

## Change Your Journey

### Step 1: Map Your Journey (3-7 Steps)

**Template:**
```
1. [Awareness] → First impression
2. [Education] → What you offer / How it works
3. [Demonstration] → See it in action
4. [Connection] → Why it matters / Benefits
5. [Conversion] → Achieve goal
```

**Your journey:**
```
1. 
2. 
3. 
4. 
5. 
(6. optional)
(7. optional)
```

**Rules:**
- ✅ 3-7 steps maximum (5 is ideal)
- ✅ Each step = stage of user understanding
- ✅ Final step = your goal
- ✅ Natural progression (no jumps)

---

### Step 2: Define Touchpoints

For each step, define what triggers it:

**Example:**
```
Step 1 (Land):
- Triggers: "Help", "What can you do?", "Start"
- Templates: Hero, WelcomeCarousel
- Shot prompts: Welcome, Introduction

Step 2 (Learn):
- Triggers: "What is [product]?", "Tell me about [company]"
- Templates: Story, Stats, Quote
- Shot prompts: About Us, Company Info

Step 3 (See):
- Triggers: "Show me examples", "Demo", "How does it work?"
- Templates: Showcase, Guide, Steps
- Shot prompts: Examples, Use Cases, Demo

Step 4 (Feel):
- Triggers: "Why does this matter?", "What's the benefit?"
- Templates: Quote, Story, Metric
- Shot prompts: Impact, Benefits, Mission

Step 5 (Act):
- Triggers: "When can I get this?", "How do I sign up?"
- Templates: Form, Banner (with CTA)
- Shot prompts: Goal-specific (Launch Event, Book Demo, etc.)
```

---

### Step 3: Update tele-knowledge.md

Edit `public/prompts/tele-knowledge.md`:

```markdown
## 🗺️ THE JOURNEY

Users progress through [NUMBER] stages to reach the goal:

1. **[STEP 1 NAME]** → [What happens in this step]
2. **[STEP 2 NAME]** → [What happens in this step]
3. **[STEP 3 NAME]** → [What happens in this step]
4. **[STEP 4 NAME]** → [What happens in this step]
5. **[FINAL STEP]** → [YOUR GOAL]

**Compliance Level:** [LOW/MEDIUM/HIGH] — [How strictly journey is enforced]

**Touchpoints:**
- **Entry:** "[trigger phrases]"
- **[Step 2]:** "[trigger phrases]"
- **[Step 3]:** "[trigger phrases]"
- **Goal:** "[trigger phrases]"
```

---

### Step 4: Map Shot Prompts to Journey

Organize your shot prompts by journey stage.

In `tele-knowledge.md` or `glass-prompt.md`:

```markdown
## 🎯 JOURNEY SHOT PROMPTS

These prompts align with the [NUMBER]-step journey.

---

### STEP 1: [NAME] — [Description]

**User says:** "[trigger]" / "[alternate trigger]"

**We say:** "[Response that accomplishes this stage]"

**We call:**
\`\`\`json
{
  // JSON for templates that serve this stage
}
\`\`\`
TELE SAYS: "[Conversational response that sets context for this stage]"

---

### STEP 2: [NAME] — [Description]

[Continue for each step...]
```

**Ensure:**
- Each stage has 2-4 shot prompts
- Prompts naturally lead to next stage
- Final stage prompts include goal CTA

---

### Step 5: Update Index.tsx Welcome

Edit `src/pages/Index.tsx`:

Update the welcome experience to match journey Stage 1:

```tsx
// Stage 1 templates (Land/Meet/Introduction)
const initialSections = [
  {
    id: "welcome",
    templateId: "WelcomeCarousel", // Or Hero, or Quote
    props: {
      // Props that introduce journey stage 1
    }
  }
];
```

---

### Step 6: Update agent.md

Edit `.agent/agent.md`:

```markdown
## 🗺️ THE JOURNEY

**[NUMBER] Steps to [GOAL]:**

1. **[Step 1]** → [Description]
2. **[Step 2]** → [Description]
3. **[Step 3]** → [Description]
4. **[Step 4]** → [Description]
5. **[Step 5]** → [GOAL]

**Compliance Level:** [LOW/MEDIUM/HIGH] — [Enforcement description]
```

---

### Step 7: Validate Journey Structure

// turbo-all
```bash
echo "🔍 VALIDATING JOURNEY STRUCTURE..." && \
echo "" && \
echo "📊 Journey Analysis:" && \
echo "  Steps in tele-knowledge.md: $(grep -c '^\*\*.*→' public/prompts/tele-knowledge.md || echo 0)" && \
echo "  Shot prompts: $(grep -c 'SHOT' public/prompts/tele-knowledge.md || echo 0)" && \
echo "" && \
echo "💡 Recommended: 12-24 shot prompts across 3-7 journey steps" && \
echo "" && \
echo "📋 Checking alignment:" && \
node scripts/validate-frontend-alignment.cjs && \
echo "" && \
npx tsc --noEmit && \
echo "" && \
echo "✅ VALIDATION COMPLETE"
```

---

### Step 8: Test Journey Flow

Start dev server and test the flow:

```bash
npm run dev -- --port 3131
```

**Test each stage:**
```
1. Open app → Stage 1 loads correctly
2. Trigger Stage 2 → Response matches journey
3. Trigger Stage 3 → Builds on previous stages
4. Trigger Stage 4 → Emotional connection
5. Trigger Goal → Clear CTA, easy to complete
```

**Verify:**
- ✅ Users can skip stages (low compliance)  
- ✅ OR users must progress linearly (high compliance)
- ✅ Each stage teaches something new
- ✅ Natural flow (not forced)
- ✅ Goal feels inevitable, not pushy

---

### Step 9: Run Full Audit

// turbo
```bash
/audit-tele
```

---

### Step 10: Publish

// turbo
```bash
node scripts/publish.cjs
```

---

## Journey Types & Examples

### Low Compliance (Free Exploration)
**Best for:** Brand experiences, educational content

```
User can ask anything, anytime
Journey is suggested, not enforced
All paths eventually lead to goal
Example: Mobeus University (current)
```

### Medium Compliance (Guided Flow)
**Best for:** Product demos, consultative sales

```
User can jump ahead, but flow is clear
Some stages unlock others
Missing info prompts backfill
Example: SaaS demo teles
```

### High Compliance (Strict Funnel)
**Best for:** Forms, checkouts, onboarding

```
Must complete Stage 1 before Stage 2
Linear progression enforced
Can't skip stages
Example: Multi-step form tele
```

---

## Journey Best Practices

### ✅ Do:
- Keep it simple (3-5 steps ideal)
- Make each step valuable on its own
- Use consistent language across stages
- Test the flow with real users
- Adjust based on drop-off analytics

### ❌ Don't:
- Force users through too many stages
- Make stages feel repetitive
- Hide the goal until the end
- Create dead-ends
- Ignore user's actual questions

---

## Post-Journey Checklist

```
□ Journey defined (3-7 steps)
□ Touchpoints mapped for each step
□ tele-knowledge.md updated
□ Shot prompts organized by stage
□ Index.tsx welcome matches Stage 1
□ agent.md updated
□ Compliance level set
□ Flow tested end-to-end
□ Analytics tracking journey stages
□ Full audit passes
□ Published to runtime
```

---

## Example Journeys

### E-Commerce Tele
```
1. Browse → See product catalogs
2. Discover → Find specific product  
3. Learn → See details, reviews, specs
4. Compare → Compare options
5. Purchase → Add to cart, checkout
```

### SaaS Demo Tele
```
1. Land → Understand the problem
2. Learn → See the solution
3. Demo → Watch it work
4. Price → See plans and pricing
5. Book → Schedule demo call
```

### Event Registration
```
1. Discover → Learn about event
2. Explore → See agenda, speakers
3. Engage → Watch previews, testimonials
4. Decide → Compare ticket tiers
5. Register → Complete signup form
```

---

_Help is here. Guide them through._ 🗺️
