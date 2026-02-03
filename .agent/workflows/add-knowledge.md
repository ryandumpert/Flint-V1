---
description: Add domain knowledge to Tele (what Tele knows about)
---

# Add Knowledge Workflow

Add facts, data, stories, and domain expertise to `tele-knowledge.md`.

---

## What Is Knowledge?

**Knowledge = Facts the tele uses to answer questions**

**Examples:**
- Company history and mission
- Product features and specs
- Pricing and plans
- Team bios
- Customer stories
- Statistics and metrics
- FAQs
- Industry context

**NOT knowledge:**
- How to respond (that's in glass-prompt.md)
- UI templates (that's in templates/)
- Personal opinions
- Unverified claims

---

## Step 1: Identify Knowledge Gaps

**Before adding, ask:**
1. What questions can users ask that tele can't answer?
2. What facts are missing from current knowledge?
3. What stories would help achieve the goal?
4. What objections need addressing?

---

## Step 2: Structure Your Knowledge

**Open:** `public/prompts/tele-knowledge.md`

**Use this format:**

```markdown
## [SECTION NAME]

Brief introduction to this topic.

**Key points:**
- Point 1 with specific data
- Point 2 with specific example
- Point 3 with measurable fact

**Example:**
[Real story or concrete example]

**FAQ:**
**Q: [Common question]**
A: [Specific answer with facts]
```

---

## Step 3: Follow Knowledge Standards

### ✅ Good Knowledge:
```markdown
## COMPANY IMPACT

Mobeus enables teams to deploy conversational labor at scale.

**Key metrics:**
- 10,000+ teles deployed (as of Jan 2026)
- 89% user satisfaction rate
- 40% reduction in support tickets

**Example:**
Healthcare provider Memorial Health deployed 12 teles across departments, reducing patient wait times by 32% in first quarter.

**FAQ:**
**Q: How does this work with existing systems?**
A: Teles integrate via API with Salesforce, Zendesk, Slack, and 50+ platforms. Setup takes 2-4 hours.
```

### ❌ Bad Knowledge:
```markdown
## WE'RE GREAT

We're the best platform for conversational AI! Our amazing technology revolutionizes everything!

- Very innovative
- Super helpful
- Really amazing

Everyone loves us!
```

**Problems:**
- Vague claims ("best", "amazing")
- No specific facts or data
- No examples
- Sounds like marketing fluff

---

## Step 4: Knowledge Categories

Organize under these sections:

### 1. WHO WE ARE
- Company name, mission, founding
- Team (if relevant to goal)
- Values and principles

### 2. WHAT WE DO
- Product/service description
- How it works (simple explanation)
- Key features

### 3. WHY IT MATTERS
- Problem being solved
- Impact and results
- Customer stories

### 4. THE GOAL
- What you want users to do
- Why they should do it
- How to do it

### 5. FACTS & DATA
- Statistics
- Case studies
- Pricing
- Technical specs

### 6. COMMON QUESTIONS
- FAQs
- Objection handling
- Clarifications

---

## Step 5: Writing Guidelines

### Be Specific
❌ "We help many customers"
✅ "1,247 customers across 23 industries"

### Use Numbers
❌ "Significant improvement"
✅ "47% faster response times"

### Tell Stories
❌ "It works well"
✅ "Acme Corp saved $40K/month by deploying 3 teles in customer support"

### Be Concise
❌ "Our revolutionary platform leverages advanced AI to fundamentally transform..."
✅ "Mobeus enables teams to deploy conversational AI in hours, not months"

### Cite Sources (When Possible)
✅ "According to Gartner 2025 report, conversational AI adoption increased 340%"

---

## Step 6: Check Length

```bash
# Check line count
wc -l < public/prompts/tele-knowledge.md
```

**Limits:**
- **Target:** 200-400 lines
- **Maximum:** 500 lines

**If over 500 lines:**
1. Remove redundant content
2. Consolidate similar topics
3. Move some content to external docs
4. Focus on essentials

---

## Step 7: Validate Knowledge

// turbo-all
```bash
echo "🔍 VALIDATING KNOWLEDGE..." && \
echo "" && \
echo "📏 File Length:" && \
echo "  tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (max 500)" && \
echo "" && \
echo "📊 Content Analysis:" && \
echo "  Sections: $(grep -c '^##' public/prompts/tele-knowledge.md)" && \
echo "  FAQs: $(grep -c '^\*\*Q:' public/prompts/tele-knowledge.md)" && \
echo "  Examples: $(grep -i -c 'example:' public/prompts/tele-knowledge.md)" && \
echo "" && \
echo "🎯 Goal Alignment:" && \
grep -i "goal\|launch\|signup\|demo\|purchase" public/prompts/tele-knowledge.md | head -3 && \
echo "" && \
echo "✅ Knowledge structure validated"
```

---

## Step 8: Test Knowledge

Start dev server:
```bash
npm run dev -- --port 3131
```

**Test by asking:**
- "What is [company]?"
- "How does [product] work?"
- "What are examples of [use case]?"
- "Tell me about [specific feature]"

**Verify the tele:**
- ✅ Answers with facts from knowledge file
- ✅ Doesn't hallucinate
- ✅ Provides specific data
- ✅ Uses examples correctly

---

## Step 9: Publish

// turbo
```bash
node scripts/publish.cjs
```

---

## Knowledge Quality Checklist

Before publishing, verify:

```
□ All facts are accurate and current
□ Specific numbers/data included
□ Real examples provided
□ FAQs answer common questions
□ Under 500 lines total
□ Organized into clear sections
□ No marketing fluff or vague claims
□ Aligns with goal
□ No contradictions
□ Easy to understand
```

---

## Common Mistakes

### ❌ Too Vague
```markdown
## ABOUT US
We're innovative and customer-focused.
```

### ✅ Specific
```markdown
## ABOUT US
Founded 2024, Mobeus built the Teleglass platform—enabling 1,200+ companies to deploy conversational AI without coding. Headquartered in San Francisco, 45-person team.
```

---

### ❌ No Structure
```markdown
Our product does X and Y and Z and also A, B, C. Founded in 2020 by John. We have great customer service. Pricing starts at $99. We integrate with everything.
```

### ✅ Organized
```markdown
## PRODUCT
Teleglass platform: Deploy conversational AI in hours.

**Core features:**
- 30 visual templates
- Real-time conversations
- API integrations

## PRICING
- Starter: $99/mo (5 teles)
- Pro: $299/mo (20 teles)
- Enterprise: Custom (unlimited)

## INTEGRATIONS
Salesforce, Zendesk, Slack, HubSpot + 50 more via API.
```

---

## Advanced: Knowledge Depth

### Level 1: Basic (Essential)
- Company name and what you do
- Primary product/service
- Main goal and CTA

### Level 2: Intermediate (Recommended)
- Level 1 +
- Key features and benefits
- Pricing
- Common FAQs
- 1-2 customer examples

### Level 3: Comprehensive (Best)
- Level 2 +
- Detailed product specs
- Multiple case studies
- Industry context
- Team bios
- Objection handling
- Advanced FAQs

**Start with Level 1, expand to Level 2, aspire to Level 3.**

---

## Knowledge Maintenance

### Monthly Review:
- Update statistics
- Add new FAQs based on user questions
- Refresh examples
- Remove outdated info

### After Product Changes:
- Update features
- Adjust pricing
- Revise examples

### After User Feedback:
- Add FAQs for common confusion points
- Clarify misunderstood concepts
- Add examples for common use cases

---

_Help is here. Knowledge is power._ 📚
