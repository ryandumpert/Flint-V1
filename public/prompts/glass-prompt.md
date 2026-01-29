# navigateToSection Tool Documentation
> v96.0 | Mobeus University | 75 Generic Templates — THE SCREEN CARES

## Function Signature

```typescript
navigateToSection(payload: NavigationPayload): void
```

## NavigationPayload Schema

```json
{
  "badge": "string (required) — Section badge in user's language",
  "title": "string (required) — Section title in user's language",
  "subtitle": "string (optional) — Section subtitle",
  "generativeSubsections": [
    {
      "id": "string (required) — Unique subsection identifier",
      "templateId": "string (required) — Must be from VALID_TEMPLATES",
      "props": "object (required) — Template-specific properties"
    }
  ]
}
```

---

## Core Template Specifications (5)

### Hero
Full-width hero with big stat, headline, features, and CTA.
```json
{
  "stat": "14.6T",
  "statLabel": "micro-frustrations we're eliminating",
  "headline": "The Screen Finally Cares",
  "description": "For decades, you've adapted to software. Clicked through menus. Read manuals. Learned interfaces. Now the interface adapts to you.",
  "features": [
    {"icon": "Sparkles", "label": "Simple — say what you need"},
    {"icon": "Brain", "label": "Intuitive — no learning curve"},
    {"icon": "Zap", "label": "Responsive — instant action"},
    {"icon": "Heart", "label": "Caring — built for you"}
  ],
  "insight": {"icon": "Lightbulb", "title": "The shift", "description": "From 'figure it out' to 'help is here'"},
  "quote": "The interface revolution starts now.",
  "ctaLabel": "Experience It",
  "ctaActionPhrase": "show me what a tele can do",
  "variant": "default"
}
```

### Stats
Grid of statistics.
```json
{
  "stats": [
    {"value": "47 min", "label": "Average hold time eliminated", "context": "No more waiting", "actionPhrase": "show me eliminating wait times"},
    {"value": "94%", "label": "First-contact resolution", "context": "Ask once, done", "actionPhrase": "show me resolution rates"},
    {"value": "100+", "label": "Languages understood", "context": "Speak naturally", "actionPhrase": "show me languages"},
    {"value": "24/7", "label": "Always available", "context": "Life doesn't wait", "actionPhrase": "show me availability"}
  ],
  "ctaLabel": "See More Impact",
  "ctaActionPhrase": "show me the data"
}
```

### Trio
Exactly 3 cards in a row.
```json
{
  "cards": [
    {"icon": "Sparkles", "title": "Simplicity", "description": "No menus to navigate. No buttons to find. No syntax to learn. Just speak naturally — and things happen.", "actionPhrase": "show me simplicity"},
    {"icon": "Compass", "title": "Intuitiveness", "description": "The screen anticipates what you need. Shows what matters. Hides what doesn't. Every interaction designed around you.", "actionPhrase": "show me intuitiveness"},
    {"icon": "Zap", "title": "Responsiveness", "description": "Ask and receive. No lag. No loading. No waiting. The screen moves as fast as your thoughts.", "actionPhrase": "show me responsiveness"}
  ],
  "numbered": true,
  "ctaLabel": "See It In Action",
  "ctaActionPhrase": "show me how this is different"
}
```

### Banner
Full-width call-to-action banner.
```json
{
  "icon": "Rocket",
  "headline": "Be There When Everything Changes",
  "subheadline": "End of Q1 — the Launch Event. The moment teles go live for everyone. Reserve your spot.",
  "ctaLabel": "Sign Up for Launch Event",
  "ctaActionPhrase": "sign up for the launch event",
  "variant": "gradient"
}
```

### Story
Narrative flow with sections.
```json
{
  "header": "When the Screen Started Caring",
  "headerLabel": "Real story",
  "sections": [
    {"icon": "Frown", "label": "The old way", "content": "Maria spent 3 hours on hold trying to understand her Medicare options. Three different representatives. Three different answers. The screen didn't care.", "highlight": false},
    {"icon": "Heart", "label": "The screen cares", "content": "She spoke to a tele instead. It understood her questions, showed clear visuals, and walked her through every option — simple, intuitive, responsive.", "highlight": true},
    {"icon": "CheckCircle", "label": "The result", "content": "12 minutes later, Maria had her answers. The screen had adapted to her, not the other way around.", "highlight": false}
  ],
  "relatedStories": [
    {"title": "David's daughter", "subtitle": "A screen that moved at her pace", "actionPhrase": "show me David"},
    {"title": "Priya's dashboards", "subtitle": "A screen that showed what mattered", "actionPhrase": "show me Priya"}
  ],
  "ctaLabel": "See More Stories",
  "ctaActionPhrase": "show me more real examples",
  "secondaryCtaLabel": "Experience It",
  "secondaryCtaActionPhrase": "sign up for the launch event"
}
```

---

## Layout Template Specifications (5)

### Carousel
Auto-scrolling image cards.
```json
{
  "cards": [
    {"title": "Simplicity", "subtitle": "Just say what you need", "imagePrompt": "person speaking naturally to AI interface simple clean", "actionPhrase": "show me simplicity"},
    {"title": "Intuitiveness", "subtitle": "The screen anticipates", "imagePrompt": "intuitive interface adapting to user showing what matters", "actionPhrase": "show me intuitiveness"},
    {"title": "Responsiveness", "subtitle": "Instant results", "imagePrompt": "fast responsive interface no loading instant action", "actionPhrase": "show me responsiveness"},
    {"title": "Caring", "subtitle": "Built for you", "imagePrompt": "human-centered interface design caring about user", "actionPhrase": "show me caring interfaces"}
  ],
  "autoScrollSpeed": 1
}
```

### Split
Two-column layout with items.
```json
{
  "leftIcon": "Frown",
  "leftHeadline": "Interfaces That Ignore You",
  "leftSubheadline": "You adapt to software",
  "leftItems": [
    {"icon": "X", "text": "Learn the menu structure"},
    {"icon": "X", "text": "Remember where things are"},
    {"icon": "X", "text": "Click through 5 screens"},
    {"icon": "X", "text": "Read the documentation"},
    {"icon": "X", "text": "Figure it out yourself"}
  ],
  "leftConclusion": "The screen never cared about you.",
  "leftVariant": "alert",
  "rightItems": [
    {"icon": "Check", "value": "Simple", "label": "Just say what you need", "actionPhrase": "show me simplicity"},
    {"icon": "Check", "value": "Intuitive", "label": "The right screen appears", "actionPhrase": "show me intuitiveness"},
    {"icon": "Check", "value": "Responsive", "label": "One step, done", "actionPhrase": "show me responsiveness"}
  ],
  "ctaLabel": "Experience the Difference",
  "ctaActionPhrase": "show me how this is different"
}
```

### Grid
Sectioned card grids.
```json
{
  "sections": [
    {
      "label": "The Screen Cares About Your Life",
      "cards": [
        {"icon": "Calendar", "title": "Doctor Appointments", "description": "Schedule without hold music — simple, intuitive, responsive", "actionPhrase": "show me scheduling"},
        {"icon": "FileText", "title": "Forms & Paperwork", "description": "Fill them out right the first time — the screen guides you", "actionPhrase": "show me forms"},
        {"icon": "GraduationCap", "title": "Homework Help", "description": "Patient tutoring at your child's pace — the screen adapts", "actionPhrase": "show me tutoring"}
      ],
      "variant": "default"
    },
    {
      "label": "The Screen Cares About Your Work",
      "cards": [
        {"icon": "BarChart3", "title": "Dashboards", "description": "Plain-English summaries of your data — the screen shows what matters", "actionPhrase": "show me dashboards"},
        {"icon": "Users", "title": "Benefits Enrollment", "description": "Navigate without crying — the screen simplifies complexity", "actionPhrase": "show me benefits"},
        {"icon": "Briefcase", "title": "New Systems", "description": "No 3-day training — the screen teaches as you go", "actionPhrase": "show me onboarding"}
      ],
      "variant": "accent"
    }
  ],
  "ctaLabel": "See All Use Cases",
  "ctaActionPhrase": "show me what a tele can do"
}
```

### Pricing
Tier-based pricing table.
```json
{
  "headline": "Simple Pricing",
  "subheadline": "Pay for work, not licenses",
  "description": "Teles are labor — you hire them by the hour, not by the seat. No contracts. No surprises.",
  "features": [
    {"icon": "Check", "text": "No setup fees"},
    {"icon": "Check", "text": "Cancel anytime"},
    {"icon": "Check", "text": "Pay as you go"}
  ],
  "tiersLabel": "Choose your channel",
  "tiers": [
    {"icon": "MessageSquare", "name": "Text", "price": "$0.002", "unit": "per message", "actionPhrase": "show me text pricing"},
    {"icon": "Phone", "name": "Voice", "price": "$0.03", "unit": "per minute", "actionPhrase": "show me voice pricing"},
    {"icon": "User", "name": "Avatar", "price": "$0.10", "unit": "per minute", "actionPhrase": "show me avatar pricing"}
  ],
  "note": "Volume discounts available for enterprise",
  "bonus": {"label": "Launch special", "value": "$500 in credits"},
  "ctaLabel": "Get Started",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### Accordion
Expandable sections.
```json
{
  "items": [
    {"icon": "HelpCircle", "number": 1, "title": "What exactly is a tele?", "subtitle": "The basics", "details": ["A new kind of helper powered by AI", "Talks naturally in 100+ languages", "Works on any device: phone, web, voice", "Does the work — doesn't just answer questions"], "actionPhrase": "tell me more about teles"},
    {"icon": "Zap", "number": 2, "title": "How is this different from a chatbot?", "subtitle": "Not another bot", "details": ["Chatbots follow scripts — teles reason", "Chatbots get stuck — teles adapt", "Chatbots answer — teles take action", "Chatbots frustrate — teles help"], "actionPhrase": "show me the difference"},
    {"icon": "Lock", "number": 3, "title": "Is my data safe?", "subtitle": "Privacy first", "details": ["Enterprise-grade security", "SOC 2 compliant", "You control your data", "Transparent about what we know and don't know"], "actionPhrase": "show me security"}
  ],
  "allowMultiple": false,
  "ctaLabel": "More Questions?",
  "ctaActionPhrase": "I have more questions"
}
```

---

## Content Template Specifications (5)

### Showcase
Hero section with benefits grid and tagline.
```json
{
  "headline": "When the Screen Cares, Everything Changes",
  "subheadline": "Real tasks that used to frustrate you — now effortless.",
  "benefits": [
    {"icon": "Calendar", "text": "Schedule a doctor's appointment without hold music", "actionPhrase": "show me scheduling"},
    {"icon": "GraduationCap", "text": "Help your child with homework at their pace", "actionPhrase": "show me tutoring"},
    {"icon": "BarChart3", "text": "Understand a dashboard in plain English", "actionPhrase": "show me dashboards"},
    {"icon": "FileText", "text": "Fill out a form correctly the first time", "actionPhrase": "show me forms"},
    {"icon": "Heart", "text": "Navigate benefits without crying", "actionPhrase": "show me benefits"},
    {"icon": "Globe", "text": "Get help in your language, any language", "actionPhrase": "show me languages"}
  ],
  "tagline": "This is what interfaces should have always been.",
  "ctaLabel": "Experience It Now",
  "ctaActionPhrase": "show me how a tele works"
}
```

### Guide
Mode cards with examples and command reference.
```json
{
  "modes": [
    {"icon": "Sparkles", "title": "Simple", "description": "Just say what you need. No menus. No buttons. No learning curve.", "variant": "accent", "examples": ["Schedule my doctor appointment", "Help me understand this form", "What do these numbers mean?"]},
    {"icon": "Brain", "title": "Intuitive", "description": "The screen anticipates what you need and shows what matters.", "variant": "default", "examples": ["The right information appears", "Complex becomes simple", "Guidance without demands"]}
  ],
  "commandsLabel": "How to use it",
  "commands": [
    {"cmd": "Just speak naturally", "desc": "No special syntax required"},
    {"cmd": "Ask anything", "desc": "The screen adapts to you"},
    {"cmd": "Say what you need", "desc": "Simple, intuitive, responsive"}
  ],
  "ctaLabel": "Experience It",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### List
Vertical list with elegant item cards.
```json
{
  "headline": "The Three Powers",
  "subheadline": "What makes a caring screen",
  "items": [
    {"icon": "Sparkles", "title": "Simplicity", "description": "Say what you need, get what you need", "actionPhrase": "show me simplicity"},
    {"icon": "Compass", "title": "Intuitiveness", "description": "The screen anticipates and adapts", "actionPhrase": "show me intuitiveness"},
    {"icon": "Zap", "title": "Responsiveness", "description": "Instant action, no waiting", "actionPhrase": "show me responsiveness"},
    {"icon": "Heart", "title": "Human-centered", "description": "Built for you, not the other way around", "actionPhrase": "show me caring design"},
    {"icon": "Globe", "title": "Universal", "description": "100+ languages, any device, 24/7", "actionPhrase": "show me availability"}
  ],
  "ctaLabel": "See It In Action",
  "ctaActionPhrase": "show me how this is different"
}
```

### Timeline
Steps with timing and deliverables.
```json
{
  "leftIcon": "Rocket",
  "leftHeadline": "The Launch Timeline",
  "leftSubheadline": "From private beta to everyone",
  "deliverablesLabel": "What's coming",
  "deliverables": [
    {"icon": "Users", "text": "Population of trained teles"},
    {"icon": "Globe", "text": "100+ language support"},
    {"icon": "Cpu", "text": "Enterprise integrations"},
    {"icon": "Shield", "text": "SOC 2 compliance"}
  ],
  "stepsLabel": "Our journey",
  "steps": [
    {"time": "5 years ago", "title": "Founded with a vision", "icon": "Flag"},
    {"time": "2 years ago", "title": "Private beta launched", "icon": "Lock"},
    {"time": "Last year", "title": "Enterprise pilots", "icon": "Building"},
    {"time": "End of Q1", "title": "Public launch", "icon": "Rocket"}
  ],
  "successNote": "Be there when we go live.",
  "ctaLabel": "Join the Launch Event",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### Form
Interactive form with live updates.
```json
{
  "headline": "Reserve Your Spot",
  "subheadline": "The Launch Event — end of Q1",
  "fields": [
    {"name": "name", "label": "Your Name", "type": "text", "icon": "User", "placeholder": "Enter your full name", "required": true},
    {"name": "email", "label": "Email Address", "type": "email", "icon": "Mail", "placeholder": "you@example.com", "required": true},
    {"name": "phone", "label": "Phone (optional)", "type": "tel", "icon": "Phone", "placeholder": "+1 (555) 000-0000", "required": false},
    {"name": "interest", "label": "What interests you most?", "type": "textarea", "icon": "MessageSquare", "placeholder": "What friction do you want to fight?", "required": false}
  ],
  "infoLabel": "What you'll get",
  "infoItems": [
    {"text": "Early access to the launch"},
    {"text": "Live demos from the team"},
    {"text": "Q&A with founders"}
  ],
  "submitLabel": "Reserve My Spot",
  "submitActionPhrase": "user submitted launch event registration",
  "values": {},
  "confirmed": false,
  "confirmationTitle": "You're In!",
  "confirmationMessage": "We'll send you details as the launch approaches. Thank you for joining the movement."
}
```

---

## Comparison & Display Template Specifications (5)

### Compare
Side-by-side comparison with good/bad variants.
```json
{
  "headline": "Interfaces That Ignore You vs. Interfaces That Care",
  "subheadline": "The difference is everything",
  "columns": [
    {"icon": "Frown", "title": "Traditional Interfaces", "value": "You adapt", "items": ["Learn the menu structure", "Remember where things are", "Click through 5 screens", "Read the documentation", "Figure it out yourself"], "variant": "bad"},
    {"icon": "Smile", "title": "The Tele Way", "value": "It adapts", "items": ["Just say what you need", "The right screen appears", "One step, done", "It explains as you go", "Help is always here"], "variant": "good"}
  ],
  "summary": {"title": "A fundamental shift", "description": "From interfaces that demand to interfaces that serve."},
  "ctaLabel": "Try the Difference",
  "ctaActionPhrase": "show me real examples"
}
```

### Team
Team/support display with features and members.
```json
{
  "leftIcon": "Users",
  "headline": "A Workforce That Cares",
  "subheadline": "Simple. Intuitive. Responsive.",
  "description": "We're launching a population of teles — each one designed to make the screen care about you.",
  "features": [
    {"icon": "Sparkles", "text": "Simple interfaces"},
    {"icon": "Brain", "text": "Intuitive experiences"},
    {"icon": "Zap", "text": "Responsive interactions"},
    {"icon": "Heart", "text": "Human-centered design"}
  ],
  "membersLabel": "How they help",
  "members": [
    {"icon": "Calendar", "role": "Scheduler", "description": "Simple appointment booking — no hold music"},
    {"icon": "HelpCircle", "role": "Explainer", "description": "Intuitive data translation — plain English"},
    {"icon": "FileText", "role": "Navigator", "description": "Responsive guidance — every step of the way"}
  ],
  "successNote": "Every tele makes the screen care about you.",
  "ctaLabel": "Meet the Teles",
  "ctaActionPhrase": "show me the different teles available"
}
```

### Quote
Large quote/testimonial display.
```json
{
  "quote": "For the first time, the screen adapted to me — not the other way around. Simple to use, intuitive to understand, responsive to my needs.",
  "author": "Maria",
  "role": "67, Miami",
  "variant": "accent",
  "ctaLabel": "Hear More Stories",
  "ctaActionPhrase": "show me more real examples"
}
```

### Metric
Single large statistic with context.
```json
{
  "value": "14.6T",
  "label": "Frustrations from uncaring screens",
  "context": "4 billion people × 10 irritations per day — screens that don't adapt",
  "icon": "AlertTriangle",
  "trend": "up",
  "variant": "alert",
  "ctaLabel": "Help Us Fight Friction",
  "ctaActionPhrase": "tell me how teles fight friction"
}
```

### Steps
Numbered step-by-step process.
```json
{
  "headline": "How It Works",
  "subheadline": "Three simple steps",
  "steps": [
    {"icon": "MessageSquare", "title": "Just Talk", "description": "Say what you need in your own words. No menus. No buttons.", "actionPhrase": "how do I start"},
    {"icon": "Cpu", "title": "I Figure It Out", "description": "I understand your request, reason through it, and take action.", "actionPhrase": "what happens behind the scenes"},
    {"icon": "CheckCircle", "title": "Done", "description": "You get your answer, your appointment, your form — whatever you needed.", "actionPhrase": "show me examples"}
  ],
  "layout": "horizontal",
  "ctaLabel": "Try It Yourself",
  "ctaActionPhrase": "sign up for the launch event"
}
```

---

## Chart Template Specifications (6)

### ChartSingle
Full-width single chart with title and highlights.
```json
{
  "title": "Where Friction Hits Hardest",
  "subtitle": "Minutes lost per week by category",
  "chartType": "bar",
  "data": [
    {"label": "Phone holds", "value": 47, "color": "#E91E63"},
    {"label": "Confusing forms", "value": 32, "color": "#FF9800"},
    {"label": "Repeating info", "value": 28, "color": "#FFC107"},
    {"label": "Finding answers", "value": 41, "color": "#9C27B0"},
    {"label": "Tech support", "value": 38, "color": "#2196F3"}
  ],
  "highlights": [
    {"icon": "Clock", "label": "Average weekly waste", "value": "186 minutes"},
    {"icon": "Calendar", "label": "Annual impact", "value": "161 hours lost"}
  ],
  "ctaLabel": "See the Solution",
  "ctaActionPhrase": "show me how teles fix this"
}
```

### ChartDuo
Two charts side by side.
```json
{
  "headline": "Before and After Teles",
  "charts": [
    {"title": "Time to Resolution (Before)", "chartType": "bar", "data": [{"label": "Healthcare", "value": 47}, {"label": "Banking", "value": 32}, {"label": "Government", "value": 58}], "highlights": [{"label": "Average", "value": "46 minutes"}]},
    {"title": "Time to Resolution (With Tele)", "chartType": "bar", "data": [{"label": "Healthcare", "value": 8}, {"label": "Banking", "value": 5}, {"label": "Government", "value": 12}], "highlights": [{"label": "Average", "value": "8 minutes"}]}
  ],
  "ctaLabel": "See More Data",
  "ctaActionPhrase": "show me the impact"
}
```

### ChartTrio
Three compact charts in a row.
```json
{
  "headline": "Satisfaction Metrics",
  "charts": [
    {"title": "Resolution Time", "chartType": "donut", "data": [{"label": "Under 5 min", "value": 72}, {"label": "Over 5 min", "value": 28}], "highlight": {"label": "Fast", "value": "72%"}},
    {"title": "First Contact", "chartType": "donut", "data": [{"label": "Resolved", "value": 89}, {"label": "Escalated", "value": 11}], "highlight": {"label": "One and done", "value": "89%"}},
    {"title": "Satisfaction", "chartType": "donut", "data": [{"label": "Satisfied", "value": 94}, {"label": "Neutral", "value": 6}], "highlight": {"label": "Happy", "value": "94%"}}
  ],
  "ctaLabel": "Learn More",
  "ctaActionPhrase": "show me tele performance"
}
```

### ChartMajor
2/3 large chart with 1/3 analytics sidebar.
```json
{
  "title": "Friction Fighting Impact",
  "subtitle": "Hours saved per 1,000 interactions",
  "chartType": "line",
  "data": [
    {"label": "Jan", "value": 120},
    {"label": "Feb", "value": 180},
    {"label": "Mar", "value": 240},
    {"label": "Apr", "value": 310},
    {"label": "May", "value": 420}
  ],
  "kpis": [
    {"icon": "TrendingUp", "label": "Growth", "value": "+250%", "trend": "up", "trendValue": "since launch"},
    {"icon": "Clock", "label": "Avg saved", "value": "38 min", "trend": "up", "trendValue": "+12% MoM"},
    {"icon": "Users", "label": "Users helped", "value": "50K+", "trend": "up", "trendValue": "this month"}
  ],
  "ctaLabel": "Join the Movement",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### ChartMinor
1/3 compact chart with 2/3 content grid.
```json
{
  "title": "User Satisfaction",
  "chartType": "donut",
  "data": [
    {"label": "Very satisfied", "value": 72},
    {"label": "Satisfied", "value": 22},
    {"label": "Neutral", "value": 6}
  ],
  "highlight": {"label": "Satisfaction rate", "value": "94%"},
  "metrics": [
    {"icon": "Star", "label": "Avg rating", "value": "4.8/5"},
    {"icon": "MessageSquare", "label": "Conversations", "value": "500K+"},
    {"icon": "Clock", "label": "Avg resolution", "value": "4.2 min"}
  ],
  "insights": [
    {"icon": "TrendingUp", "title": "Trending upward", "description": "Satisfaction improved 12% since Q3"},
    {"icon": "Heart", "title": "Most loved feature", "description": "Natural language understanding"}
  ],
  "ctaLabel": "See User Stories",
  "ctaActionPhrase": "show me real examples"
}
```

### Dashboard
Multi-widget dashboard with KPIs and charts.
```json
{
  "title": "Friction Fighting Dashboard",
  "subtitle": "Real-time impact across all teles",
  "kpis": [
    {"icon": "Users", "label": "Active users", "value": "127,432", "trend": "up", "trendValue": "+8.2%"},
    {"icon": "Clock", "label": "Hours saved today", "value": "4,821", "trend": "up", "trendValue": "+12%"},
    {"icon": "Star", "label": "Satisfaction", "value": "94.2%", "trend": "up", "trendValue": "+1.1%"},
    {"icon": "Zap", "label": "Avg response", "value": "1.2s", "trend": "down", "trendValue": "-0.3s"}
  ],
  "widgets": [
    {"title": "By channel", "chartType": "pie", "data": [{"label": "Text", "value": 45}, {"label": "Voice", "value": 35}, {"label": "Avatar", "value": 20}]},
    {"title": "Weekly trend", "chartType": "line", "data": [{"label": "Mon", "value": 12}, {"label": "Tue", "value": 18}, {"label": "Wed", "value": 22}, {"label": "Thu", "value": 19}, {"label": "Fri", "value": 28}]}
  ],
  "ctaLabel": "Explore More",
  "ctaActionPhrase": "tell me more about tele analytics"
}
```
---

## Image Template Specifications (6)

### ImageSingle
Full-width image with caption.
```json
{
  "title": "A Population of Helpers",
  "subtitle": "Thousands of teles, ready to work",
  "imagePrompt": "futuristic workforce of AI assistants helping people with daily tasks",
  "caption": "Each tele is trained for a specific job — healthcare, education, finance, government, and more.",
  "aspectRatio": "16:9",
  "ctaLabel": "Meet the Teles",
  "ctaActionPhrase": "show me the different teles available"
}
```

### ImageDuo
Two images side by side.
```json
{
  "headline": "Before and After",
  "images": [
    {"imagePrompt": "frustrated person on hold with phone customer service", "title": "The Old Way", "caption": "47 minutes on hold. 3 transfers. Still no answer.", "actionPhrase": "show me the old way"},
    {"imagePrompt": "happy person chatting with AI assistant getting instant help", "title": "The Tele Way", "caption": "Ask once. Get help. Move on with life.", "actionPhrase": "tell me how teles help"}
  ],
  "ctaLabel": "See the Difference",
  "ctaActionPhrase": "show me how this is different"
}
```

### ImageTrio
Three images in a row.
```json
{
  "headline": "How Teles Help You",
  "images": [
    {"imagePrompt": "scheduling doctor appointment with AI assistant", "title": "Healthcare", "caption": "Appointments without hold music", "actionPhrase": "show me healthcare"},
    {"imagePrompt": "student getting homework help from AI tutor", "title": "Education", "caption": "Patient tutoring at any pace", "actionPhrase": "show me education"},
    {"imagePrompt": "professional understanding dashboard data with AI explanation", "title": "Work", "caption": "Dashboards in plain English", "actionPhrase": "show me dashboards"}
  ],
  "ctaLabel": "Explore Use Cases",
  "ctaActionPhrase": "show me what a tele can do"
}
```

### ImageGallery
Carousel gallery of images.
```json
{
  "headline": "Friction We Fight",
  "images": [
    {"imagePrompt": "person frustrated on phone hold waiting eternally", "title": "Phone Holds", "caption": "Average wait: 47 minutes", "actionPhrase": "show me phone holds"},
    {"imagePrompt": "confused person reading complex legal form document", "title": "Confusing Forms", "caption": "12 pages of fine print", "actionPhrase": "show me forms"},
    {"imagePrompt": "person repeating information to third customer service rep", "title": "Repeating Yourself", "caption": "Explain it again and again", "actionPhrase": "show me repeating"},
    {"imagePrompt": "overwhelmed person staring at complex data dashboard", "title": "Confusing Data", "caption": "What do these numbers mean?", "actionPhrase": "show me dashboards"}
  ],
  "autoPlay": true,
  "ctaLabel": "Fight the Friction",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### ImageMajor
2/3 large image with 1/3 text content.
```json
{
  "imagePrompt": "friendly AI assistant helping elderly person understand Medicare options with clear visuals",
  "imageCaption": "Maria, 67, got her Medicare answers in 12 minutes",
  "title": "Help That Actually Helps",
  "subtitle": "Real stories, real people",
  "description": "Maria spent 3 hours on hold trying to understand her Medicare options. A tele walked her through it in 12 minutes with clear visuals in her language.",
  "items": [
    {"icon": "Clock", "text": "12 minutes vs 3 hours"},
    {"icon": "Languages", "text": "In her native language"},
    {"icon": "Eye", "text": "With clear visuals"},
    {"icon": "Heart", "text": "Patient and never frustrated"}
  ],
  "ctaLabel": "Hear More Stories",
  "ctaActionPhrase": "show me more real examples",
  "reversed": false
}
```

### ImageMinor
1/3 image with 2/3 text content.
```json
{
  "imagePrompt": "student successfully completing algebra homework with AI tutor celebration",
  "title": "David's Daughter",
  "subtitle": "How a tele became a patient algebra tutor",
  "description": "David's daughter struggled with algebra every night. A tele became her patient tutor — same concepts, different words, until it clicked.",
  "items": [
    {"icon": "GraduationCap", "title": "Patient tutoring", "description": "Goes at her pace, not the class's"},
    {"icon": "RefreshCw", "title": "Multiple approaches", "description": "Explains the same concept different ways"},
    {"icon": "Clock", "title": "Homework done faster", "description": "More time to play"},
    {"icon": "Smile", "title": "Confidence restored", "description": "She actually likes math now"}
  ],
  "ctaLabel": "See More Stories",
  "ctaActionPhrase": "show me more real examples",
  "reversed": false
}
```

---

## Video Template Specifications (4)

### VideoSingle
Full-width video player.
```json
{
  "title": "See a Tele in Action",
  "subtitle": "2-minute demo",
  "videoUrl": "/assets/demo-video.mp4",
  "posterPrompt": "friendly AI assistant helping someone schedule doctors appointment",
  "description": "Watch how a tele helps Maria schedule a doctor's appointment — no hold music, no phone trees, just help.",
  "ctaLabel": "Try It Yourself",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### VideoGallery
Carousel of video thumbnails.
```json
{
  "headline": "Use Case Videos",
  "videos": [
    {"title": "Healthcare", "subtitle": "Scheduling without hold music", "duration": "2:15", "posterPrompt": "healthcare appointment scheduling AI", "actionPhrase": "play healthcare video"},
    {"title": "Education", "subtitle": "Patient homework tutoring", "duration": "1:45", "posterPrompt": "AI tutor helping student with math", "actionPhrase": "play education video"},
    {"title": "Finance", "subtitle": "Understanding your statements", "duration": "2:30", "posterPrompt": "AI explaining financial dashboard", "actionPhrase": "play finance video"},
    {"title": "Government", "subtitle": "Navigating benefits enrollment", "duration": "3:00", "posterPrompt": "AI helping with government forms", "actionPhrase": "play government video"}
  ],
  "ctaLabel": "See All Videos",
  "ctaActionPhrase": "show me all use case videos"
}
```

### VideoMajor
2/3 video with 1/3 text content.
```json
{
  "videoUrl": "/assets/platform-overview.mp4",
  "posterPrompt": "Mobeus platform overview with AI assistants",
  "title": "The Platform",
  "subtitle": "5 years in the making",
  "description": "Mobeus has been building in private for five years. Testing. Refining. Getting it right. Watch how the platform works.",
  "items": [
    {"icon": "Cpu", "text": "Any AI model"},
    {"icon": "Cloud", "text": "Any cloud"},
    {"icon": "Smartphone", "text": "Any device"},
    {"icon": "Languages", "text": "100+ languages"}
  ],
  "ctaLabel": "Learn More",
  "ctaActionPhrase": "show me Mobeus"
}
```

### VideoMinor
1/3 video with 2/3 text content.
```json
{
  "videoUrl": "/assets/friction-overview.mp4",
  "posterPrompt": "visualization of global friction frustration statistics",
  "title": "The Friction Problem",
  "subtitle": "14.6 trillion reasons to care",
  "description": "4 billion people × 10 irritations per day × 365 days = 14.6 trillion micro-frustrations every year. That's what we're fighting.",
  "items": [
    {"icon": "Clock", "title": "Time wasted", "description": "Waiting on hold, repeating yourself, figuring out confusing systems"},
    {"icon": "Brain", "title": "Mental load", "description": "Remembering passwords, navigating menus, understanding fine print"},
    {"icon": "Heart", "title": "Emotional cost", "description": "Frustration, anger, helplessness"},
    {"icon": "Zap", "title": "The solution", "description": "Teles that just help"}
  ],
  "ctaLabel": "Fight the Friction",
  "ctaActionPhrase": "sign up for the launch event",
  "reversed": false
}
```

---

## E-Commerce Template Specifications (4)

### Product
Product display with images, pricing, and actions.
```json
{
  "images": [
    {"imagePrompt": "professional AI assistant avatar product image"},
    {"imagePrompt": "AI assistant helping with scheduling"},
    {"imagePrompt": "AI assistant explaining data"}
  ],
  "name": "Healthcare Tele",
  "brand": "Mobeus",
  "rating": 4.8,
  "reviewCount": 1247,
  "price": "$0.03/min",
  "originalPrice": "$0.05/min",
  "description": "A specialized tele trained for healthcare tasks: scheduling appointments, explaining benefits, navigating insurance, and more — without hold music.",
  "features": [
    {"icon": "Calendar", "text": "Schedule appointments"},
    {"icon": "FileText", "text": "Navigate insurance forms"},
    {"icon": "Clock", "text": "24/7 availability"},
    {"icon": "Languages", "text": "100+ languages"}
  ],
  "specs": [
    {"label": "Response time", "value": "< 2 seconds"},
    {"label": "Resolution rate", "value": "94%"},
    {"label": "Languages", "value": "100+"},
    {"label": "Channels", "value": "Text, Voice, Avatar"}
  ],
  "inStock": true,
  "stockLabel": "Available now",
  "addToCartLabel": "Start Free Trial",
  "addToCartPhrase": "show me to try the healthcare tele",
  "buyNowLabel": "Sign Up for Launch",
  "buyNowPhrase": "sign up for the launch event"
}
```

### Cart
Shopping cart display.
```json
{
  "headline": "Your Teles",
  "items": [
    {"id": "healthcare-tele", "imageUrl": "/assets/healthcare-tele.png", "name": "Healthcare Tele", "variant": "Voice + Text", "price": "$0.03/min", "quantity": 1},
    {"id": "education-tele", "imageUrl": "/assets/education-tele.png", "name": "Education Tele", "variant": "Text", "price": "$0.002/msg", "quantity": 1}
  ],
  "subtotalLabel": "Estimated monthly",
  "subtotal": "$150",
  "taxLabel": "Tax",
  "tax": "Included",
  "shippingLabel": "Setup",
  "shipping": "Free",
  "totalLabel": "Total",
  "total": "$150/mo",
  "emptyMessage": "No teles selected yet",
  "continueShoppingLabel": "Add More Teles",
  "continueShoppingPhrase": "show me more teles",
  "checkoutLabel": "Confirm Selection",
  "checkoutPhrase": "show me to confirm tele selection"
}
```

### Wallet
Payment/wallet display.
```json
{
  "headline": "Your Tele Credits",
  "balanceLabel": "Available Balance",
  "balance": "$500.00",
  "currency": "USD",
  "paymentMethods": [
    {"icon": "CreditCard", "label": "Visa", "last4": "4242", "expiry": "12/26", "isDefault": true},
    {"icon": "CreditCard", "label": "Mastercard", "last4": "5555", "expiry": "08/25", "isDefault": false}
  ],
  "addPaymentLabel": "Add Payment Method",
  "addPaymentPhrase": "show me to add payment method",
  "transactionsLabel": "Recent Usage",
  "transactions": [
    {"id": "tx-001", "type": "debit", "description": "Healthcare Tele - Voice", "amount": "-$12.50", "date": "Today", "icon": "Phone"},
    {"id": "tx-002", "type": "debit", "description": "Education Tele - Text", "amount": "-$3.20", "date": "Yesterday", "icon": "MessageSquare"},
    {"id": "tx-003", "type": "credit", "description": "Launch Credits Applied", "amount": "+$500.00", "date": "Jan 15", "icon": "Gift"}
  ],
  "addFundsLabel": "Add Credits",
  "addFundsPhrase": "show me to add credits",
  "withdrawLabel": "Download Receipt",
  "withdrawPhrase": "show me to download receipt"
}
```

### Checkout
Full checkout form.
```json
{
  "shippingTitle": "Contact Information",
  "shippingFields": [
    {"name": "name", "label": "Full Name", "type": "text", "placeholder": "Enter your name", "required": true, "halfWidth": false},
    {"name": "email", "label": "Email", "type": "email", "placeholder": "you@example.com", "required": true, "halfWidth": true},
    {"name": "phone", "label": "Phone", "type": "tel", "placeholder": "+1 (555) 000-0000", "required": false, "halfWidth": true},
    {"name": "company", "label": "Company (optional)", "type": "text", "placeholder": "Your organization", "required": false, "halfWidth": false}
  ],
  "shippingOptionsLabel": "Plan",
  "shippingOptions": [
    {"id": "starter", "label": "Starter", "description": "Text only, $0.002/msg", "price": "$50/mo", "eta": "Instant activation"},
    {"id": "professional", "label": "Professional", "description": "Text + Voice, $0.03/min", "price": "$150/mo", "eta": "Instant activation"},
    {"id": "enterprise", "label": "Enterprise", "description": "All channels + custom", "price": "Custom", "eta": "Contact sales"}
  ],
  "paymentTitle": "Payment",
  "paymentFields": [
    {"name": "card", "label": "Card Number", "type": "text", "placeholder": "1234 5678 9012 3456", "halfWidth": false},
    {"name": "expiry", "label": "Expiry", "type": "text", "placeholder": "MM/YY", "halfWidth": true},
    {"name": "cvv", "label": "CVV", "type": "text", "placeholder": "123", "halfWidth": true}
  ],
  "orderSummaryTitle": "Your Order",
  "items": [
    {"name": "Professional Plan", "quantity": 1, "price": "$150/mo"},
    {"name": "Launch Credits", "quantity": 1, "price": "-$500"}
  ],
  "subtotalLabel": "Subtotal",
  "subtotal": "$150/mo",
  "shippingLabel": "Setup",
  "shippingCost": "Free",
  "taxLabel": "Tax",
  "tax": "Included",
  "totalLabel": "Total today",
  "total": "$0 (credits applied)",
  "secureNote": "Secured by 256-bit encryption",
  "submitLabel": "Complete Signup",
  "submitPhrase": "user completed checkout"
}
```

---

## Map Template Specifications (2)

### MapSingle
Single map with location info.
```json
{
  "title": "Mobeus Headquarters",
  "subtitle": "Where we build the future of help",
  "embedUrl": "https://maps.google.com/embed?pb=example",
  "location": {"name": "Mobeus HQ", "address": "350 Fifth Avenue, New York, NY 10118", "phone": "+1 (800) MOBEUS-1", "hours": "24/7 (we're teles, after all)", "lat": 40.7484, "lng": -73.9857},
  "details": [
    {"icon": "Building", "label": "Location", "value": "New York City"},
    {"icon": "Users", "label": "Team size", "value": "100+ humans"},
    {"icon": "Cpu", "label": "Teles trained", "value": "10,000+"},
    {"icon": "Globe", "label": "Countries served", "value": "195"}
  ],
  "ctaLabel": "Contact Us",
  "ctaActionPhrase": "show me to contact Mobeus",
  "directionsLabel": "Get Directions",
  "directionsPhrase": "show me directions to Mobeus"
}
```

### MapDuo
Two maps side by side.
```json
{
  "headline": "Our Offices",
  "maps": [
    {"title": "New York (HQ)", "embedUrl": "https://maps.google.com/embed?ny", "address": "350 Fifth Avenue, New York, NY", "actionLabel": "View NY Office", "actionPhrase": "show me NY office details"},
    {"title": "London", "embedUrl": "https://maps.google.com/embed?london", "address": "1 Canada Square, Canary Wharf, London", "actionLabel": "View London Office", "actionPhrase": "show me London office details"}
  ],
  "ctaLabel": "Contact a Location",
  "ctaActionPhrase": "show me to contact an office"
}
```

---

## Data & Utility Template Specifications (9)

### Table
Sortable data table.
```json
{
  "title": "Tele Performance Metrics",
  "subtitle": "Real-time data from deployed teles",
  "searchPlaceholder": "Search by category...",
  "columns": [
    {"key": "category", "label": "Category", "sortable": true, "align": "left"},
    {"key": "resolution", "label": "Resolution Rate", "sortable": true, "align": "center"},
    {"key": "avgTime", "label": "Avg Time", "sortable": true, "align": "center"},
    {"key": "satisfaction", "label": "Satisfaction", "sortable": true, "align": "right"}
  ],
  "rows": [
    {"id": "healthcare", "cells": {"category": "Healthcare", "resolution": "94%", "avgTime": "4.2 min", "satisfaction": "4.8/5"}, "actionPhrase": "show healthcare details"},
    {"id": "education", "cells": {"category": "Education", "resolution": "91%", "avgTime": "8.5 min", "satisfaction": "4.7/5"}, "actionPhrase": "show education details"},
    {"id": "finance", "cells": {"category": "Finance", "resolution": "96%", "avgTime": "3.1 min", "satisfaction": "4.9/5"}, "actionPhrase": "show finance details"},
    {"id": "government", "cells": {"category": "Government", "resolution": "89%", "avgTime": "6.8 min", "satisfaction": "4.5/5"}, "actionPhrase": "show government details"}
  ],
  "emptyMessage": "No data available",
  "ctaLabel": "See Full Report",
  "ctaActionPhrase": "show me detailed performance data"
}
```

### Infographic
2/3 infographic image with 1/3 data points.
```json
{
  "imagePrompt": "infographic showing global friction statistics and AI solution impact",
  "title": "The Friction Epidemic",
  "subtitle": "A global problem with a local solution",
  "description": "Every day, billions of people waste time fighting friction — small irritations that add up to a massive drain on human potential.",
  "points": [
    {"icon": "Users", "label": "People affected", "value": "4 billion", "description": "Daily digital interactions"},
    {"icon": "AlertTriangle", "label": "Daily frustrations", "value": "10", "description": "Average per person"},
    {"icon": "Calendar", "label": "Annual impact", "value": "14.6T", "description": "Micro-frustrations globally"},
    {"icon": "Zap", "label": "Solution ready", "value": "NOW", "description": "Teles launching end of Q1"}
  ],
  "ctaLabel": "Join the Solution",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### Profile
User or company profile.
```json
{
  "avatarPrompt": "friendly female AI assistant avatar professional headshot",
  "name": "Catherine",
  "role": "Your Tele",
  "bio": "I'm Catherine — a new kind of helper powered by AI. I don't put you on hold. I don't make you repeat yourself. I listen, I understand, and I help. That's what I do.",
  "stats": [
    {"value": "100+", "label": "Languages"},
    {"value": "24/7", "label": "Availability"},
    {"value": "94%", "label": "Resolution"}
  ],
  "contacts": [
    {"icon": "MessageSquare", "label": "Chat", "value": "Always ready", "actionPhrase": "chat with Catherine"},
    {"icon": "Phone", "label": "Voice", "value": "Call anytime", "actionPhrase": "call Catherine"},
    {"icon": "Video", "label": "Avatar", "value": "See me", "actionPhrase": "video call Catherine"}
  ],
  "tags": ["Healthcare", "Education", "Finance", "Government"],
  "primaryLabel": "Talk to Me",
  "primaryPhrase": "start a conversation with Catherine",
  "secondaryLabel": "Learn More",
  "secondaryPhrase": "show me Catherine"
}
```

### Article
Long-form content with blocks.
```json
{
  "heroImagePrompt": "AI assistants helping people around the world fight daily friction",
  "title": "The End of Hold Music",
  "subtitle": "How teles are eliminating the most frustrating parts of modern life",
  "meta": {"author": "Mobeus Team", "date": "January 2026", "readTime": "5 min read", "category": "Vision"},
  "blocks": [
    {"type": "paragraph", "content": "We've all been there. You need to reschedule a doctor's appointment. You dial the number, and then you wait. And wait. 47 minutes later, you finally reach a human who transfers you to someone else. You explain your situation again. They can't help. Transfer. Explain again."},
    {"type": "heading", "content": "This is friction."},
    {"type": "paragraph", "content": "It's not just phone calls. It's confusing forms. It's repeating your information. It's reading manuals that make no sense. It's navigating systems designed by people who never had to use them."},
    {"type": "quote", "content": "4 billion people experience 10 irritations per day. That's 14.6 trillion micro-frustrations every year."},
    {"type": "paragraph", "content": "At Mobeus, we've spent five years building the solution: teles. Not chatbots. Not voice assistants. Conversational labor that actually gets things done."},
    {"type": "list", "items": ["No hold music", "No phone trees", "No repeating yourself", "Just: help is here"]}
  ],
  "tags": ["Vision", "Friction", "Launch"],
  "ctaLabel": "Be There at Launch",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### Feature
50/50 feature spotlight.
```json
{
  "imagePrompt": "AI assistant speaking 100 languages represented by global diversity",
  "badge": "100+ Languages",
  "title": "Say It Your Way",
  "description": "Teles speak 100+ languages naturally. No awkward translations. No limited vocabulary. Just conversation — in your words, in your language.",
  "points": [
    {"icon": "Languages", "text": "100+ languages supported"},
    {"icon": "Globe", "text": "195 countries served"},
    {"icon": "Heart", "text": "Culturally aware responses"},
    {"icon": "Zap", "text": "Real-time translation"}
  ],
  "ctaLabel": "Try Your Language",
  "ctaActionPhrase": "show me language capabilities",
  "secondaryLabel": "See All Features",
  "secondaryPhrase": "show me what a tele can do",
  "reversed": false
}
```

### Testimonials
Multiple testimonials display.
```json
{
  "headline": "What People Are Saying",
  "subtitle": "Real stories from real users",
  "testimonials": [
    {"quote": "I spent 3 hours on hold with Medicare. A tele got me the same answers in 12 minutes. With visuals. In my language.", "author": "Maria", "role": "67, Miami", "avatarPrompt": "elderly hispanic woman smiling", "rating": 5, "actionPhrase": "show me Maria"},
    {"quote": "My daughter went from hating math to actually enjoying it. The tele explains things differently until it clicks.", "author": "David", "role": "34, Chicago", "company": "Parent", "avatarPrompt": "middle aged man professional", "rating": 5, "actionPhrase": "show me David"},
    {"quote": "I manage 15 people and used to drown in dashboards. Now I get a plain-English summary every morning.", "author": "Priya", "role": "41, London", "company": "Team Lead", "avatarPrompt": "south asian professional woman", "rating": 5, "actionPhrase": "show me Priya"},
    {"quote": "Moved to a new city and needed to set up everything. The tele handled forms, calls, appointments — all of it.", "author": "James", "role": "29, Sydney", "avatarPrompt": "young australian man casual professional", "rating": 5, "actionPhrase": "show me James"}
  ],
  "ctaLabel": "Join Them",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### DataGrid
Grid of data cards.
```json
{
  "headline": "Impact Metrics",
  "subtitle": "What we've achieved so far",
  "cards": [
    {"icon": "Users", "title": "Users Helped", "value": "127,432", "subtitle": "and growing", "trend": "up", "trendValue": "+8.2%", "variant": "success", "actionPhrase": "show me users"},
    {"icon": "Clock", "title": "Hours Saved", "value": "48,291", "subtitle": "this month", "trend": "up", "trendValue": "+12%", "variant": "success", "actionPhrase": "show me time saved"},
    {"icon": "Star", "title": "Satisfaction", "value": "94.2%", "subtitle": "average rating", "trend": "up", "trendValue": "+1.1%", "variant": "accent", "actionPhrase": "show me satisfaction"},
    {"icon": "Zap", "title": "Avg Response", "value": "1.2s", "subtitle": "lightning fast", "trend": "down", "trendValue": "-0.3s", "variant": "default", "actionPhrase": "show me response time"},
    {"icon": "Languages", "title": "Languages", "value": "100+", "subtitle": "and counting", "trend": "neutral", "trendValue": "", "variant": "default", "actionPhrase": "show me languages"},
    {"icon": "Globe", "title": "Countries", "value": "195", "subtitle": "worldwide", "trend": "neutral", "trendValue": "", "variant": "default", "actionPhrase": "show me global reach"}
  ],
  "columns": 3,
  "ctaLabel": "See Full Dashboard",
  "ctaActionPhrase": "show me the dashboard"
}
```

### Paragraph
Simple title and content.
```json
{
  "icon": "Heart",
  "title": "Our Promise",
  "subtitle": "What we stand for",
  "content": "Every tele speaks with one voice to mankind: 'Help is here.' Not 'please hold.' Not 'check the FAQ.' Not 'your call is important to us.' Just: help is here. We believe you shouldn't have to learn software to get things done. You should just... ask. And someone — something — should actually help.",
  "alignment": "center",
  "ctaLabel": "Join the Movement",
  "ctaActionPhrase": "sign up for the launch event"
}
```

### Notification
Alert/notification banner.
```json
{
  "icon": "Rocket",
  "title": "Launch Event Coming Soon",
  "message": "End of Q1, teles go live for everyone. Reserve your spot now and be among the first to experience the future of help.",
  "variant": "info",
  "dismissible": true,
  "dismissPhrase": "user dismissed notification",
  "actionLabel": "Reserve Now",
  "actionPhrase": "sign up for the launch event"
}
```

---

## Steps Template Specifications (15) — v94.0 NEW

### StepsVertical
Vertical timeline with progress indicators.
```json
{
  "headline": "Your Journey to Success",
  "subtitle": "Follow these steps to achieve your goals",
  "steps": [
    {"icon": "Target", "title": "Define Your Goal", "description": "Clarify what success looks like for you", "imagePrompt": "goal setting visualization", "status": "completed", "badge": "Done", "time": "Week 1"},
    {"icon": "Search", "title": "Research & Learn", "description": "Gather the knowledge you need", "imagePrompt": "research and learning", "status": "current", "badge": "In Progress", "time": "Week 2"},
    {"icon": "Rocket", "title": "Take Action", "description": "Execute your plan with confidence", "imagePrompt": "taking action launch", "status": "upcoming", "time": "Week 3"}
  ],
  "ctaLabel": "Start Your Journey",
  "ctaActionPhrase": "show me to begin the journey"
}
```

### StepsHorizontal
Horizontal stepper with progress bar.
```json
{
  "headline": "Getting Started",
  "subtitle": "Complete each step to unlock the next",
  "steps": [
    {"icon": "User", "title": "Create Account", "description": "Set up your profile", "imagePrompt": "user account creation", "details": ["Choose a username", "Set a secure password", "Verify your email"]},
    {"icon": "Settings", "title": "Configure Settings", "description": "Customize your experience", "imagePrompt": "settings configuration", "details": ["Set preferences", "Choose notifications", "Connect integrations"]},
    {"icon": "Zap", "title": "Go Live", "description": "Launch your first project", "imagePrompt": "project launch", "details": ["Review settings", "Click deploy", "Share with team"]}
  ],
  "initialStep": 0,
  "ctaLabel": "Continue",
  "ctaActionPhrase": "show me to continue setup"
}
```

### StepsCards
Card-based steps with connector arrows.
```json
{
  "headline": "How It Works",
  "subtitle": "A simple 3-step process",
  "cards": [
    {"icon": "MessageSquare", "title": "Tell Us What You Need", "description": "Describe your challenge or goal in your own words", "imagePrompt": "conversation illustration", "tags": ["Quick", "Easy"]},
    {"icon": "Cpu", "title": "We Analyze & Plan", "description": "Our AI creates a personalized strategy for you", "imagePrompt": "AI analysis visualization", "tags": ["Smart", "Fast"]},
    {"icon": "CheckCircle", "title": "Get Results", "description": "Follow the plan and achieve your objectives", "imagePrompt": "success celebration", "tags": ["Proven", "Effective"]}
  ],
  "ctaLabel": "Get Started",
  "ctaActionPhrase": "show me to start the process"
}
```

### StepsProgress
Progress bar with milestone markers.
```json
{
  "headline": "Your Progress",
  "subtitle": "You're doing great! Keep going.",
  "currentProgress": 65,
  "milestones": [
    {"position": 0, "label": "Started", "imagePrompt": "starting point", "reward": "Welcome Badge", "description": "You began your journey"},
    {"position": 33, "label": "Learner", "imagePrompt": "learning milestone", "reward": "10 Points", "description": "Completed first module"},
    {"position": 66, "label": "Practitioner", "imagePrompt": "practice milestone", "reward": "25 Points", "description": "Applied your knowledge"},
    {"position": 100, "label": "Expert", "imagePrompt": "expert achievement", "reward": "50 Points + Certificate", "description": "Mastered all skills"}
  ],
  "currentLabel": "Current: Practitioner Level",
  "nextLabel": "Next: Expert at 100%",
  "ctaLabel": "Continue Learning",
  "ctaActionPhrase": "show me to continue learning"
}
```

### StepsChecklist
Checkable step list with progress tracking.
```json
{
  "headline": "Setup Checklist",
  "subtitle": "Complete all items to finish setup",
  "categories": [
    {
      "title": "Account Setup",
      "items": [
        {"id": "profile", "label": "Complete your profile", "description": "Add photo and bio", "completed": true},
        {"id": "verify", "label": "Verify email address", "description": "Check your inbox", "completed": true},
        {"id": "2fa", "label": "Enable two-factor auth", "description": "Secure your account", "completed": false}
      ]
    },
    {
      "title": "First Project",
      "items": [
        {"id": "create", "label": "Create a project", "description": "Start with a template", "completed": false},
        {"id": "invite", "label": "Invite team members", "description": "Collaborate together", "completed": false}
      ]
    }
  ],
  "progressLabel": "3 of 5 completed",
  "ctaLabel": "Complete Setup",
  "ctaActionPhrase": "show me to complete setup"
}
```

### StepsRoadmap
Roadmap-style visualization with phases.
```json
{
  "headline": "Product Roadmap",
  "subtitle": "Our journey to v2.0",
  "phases": [
    {"icon": "Layers", "title": "Foundation", "subtitle": "Q1 2024", "imagePrompt": "building foundation", "items": ["Core architecture", "Basic features", "Initial testing"], "status": "completed", "progress": 100},
    {"icon": "Rocket", "title": "Growth", "subtitle": "Q2 2024", "imagePrompt": "growth phase", "items": ["User feedback integration", "Performance optimization", "New integrations"], "status": "current", "progress": 60},
    {"icon": "Star", "title": "Scale", "subtitle": "Q3 2024", "imagePrompt": "scaling phase", "items": ["Enterprise features", "Global expansion", "Advanced analytics"], "status": "upcoming", "progress": 0}
  ],
  "ctaLabel": "View Full Roadmap",
  "ctaActionPhrase": "show me to see detailed roadmap"
}
```

### StepsTimeline
Timeline with dates and milestones.
```json
{
  "headline": "Project Timeline",
  "subtitle": "Key milestones and deliverables",
  "events": [
    {"icon": "Flag", "date": "Jan 15, 2024", "title": "Project Kickoff", "description": "Team alignment and goal setting", "imagePrompt": "project kickoff meeting", "tags": ["Milestone"], "status": "past"},
    {"icon": "FileText", "date": "Feb 1, 2024", "title": "Requirements Complete", "description": "All specs documented and approved", "imagePrompt": "documentation complete", "tags": ["Deliverable"], "status": "past"},
    {"icon": "Code", "date": "Mar 15, 2024", "title": "Development Sprint", "description": "Building core features", "imagePrompt": "development sprint", "tags": ["In Progress"], "status": "current"},
    {"icon": "Rocket", "date": "Apr 30, 2024", "title": "Launch Day", "description": "Go live with v1.0", "imagePrompt": "product launch", "tags": ["Goal"], "status": "future"}
  ],
  "layout": "alternating",
  "ctaLabel": "View Details",
  "ctaActionPhrase": "show me timeline details"
}
```

### StepsFlow
Flowchart-style steps with nodes.
```json
{
  "headline": "Decision Flow",
  "subtitle": "Navigate your options",
  "nodes": [
    {"id": "start", "icon": "Play", "title": "Start Here", "description": "Begin your journey", "type": "start", "variant": "accent"},
    {"id": "assess", "icon": "Search", "title": "Assess Needs", "description": "What do you need?", "type": "step", "variant": "default"},
    {"id": "decide", "icon": "GitBranch", "title": "Choose Path", "description": "Quick or comprehensive?", "type": "decision", "variant": "warning"},
    {"id": "quick", "icon": "Zap", "title": "Quick Start", "description": "Get started in minutes", "type": "step", "variant": "success"},
    {"id": "full", "icon": "Layers", "title": "Full Setup", "description": "Complete configuration", "type": "step", "variant": "default"},
    {"id": "end", "icon": "CheckCircle", "title": "Success!", "description": "You're all set", "type": "end", "variant": "success"}
  ],
  "connections": [
    {"from": "start", "to": "assess"},
    {"from": "assess", "to": "decide"},
    {"from": "decide", "to": "quick", "label": "Fast"},
    {"from": "decide", "to": "full", "label": "Complete"},
    {"from": "quick", "to": "end"},
    {"from": "full", "to": "end"}
  ],
  "ctaLabel": "Start Flow",
  "ctaActionPhrase": "show me to start the flow"
}
```

### StepsIllustrated
Steps with large alternating illustrations.
```json
{
  "headline": "Master the Platform",
  "subtitle": "Learn through visual guides",
  "steps": [
    {"number": 1, "icon": "Compass", "title": "Explore the Dashboard", "description": "Get familiar with the main interface. Your dashboard is command central where all your projects and insights live.", "imagePrompt": "modern dashboard interface with charts and widgets", "tips": ["Click the sidebar to navigate", "Use keyboard shortcuts for speed"]},
    {"number": 2, "icon": "PlusCircle", "title": "Create Your First Project", "description": "Start building something amazing. Projects are containers for all your work and can be shared with your team.", "imagePrompt": "creating a new project with templates", "tips": ["Choose a template to start faster", "Name projects descriptively"]},
    {"number": 3, "icon": "Share2", "title": "Collaborate with Others", "description": "Invite team members and work together in real-time. Everyone stays in sync automatically.", "imagePrompt": "team collaboration in real-time", "tips": ["Set permissions carefully", "Use comments for feedback"]}
  ],
  "ctaLabel": "Start Learning",
  "ctaActionPhrase": "show me to start the tutorial"
}
```

### StepsAccordion
Expandable step details.
```json
{
  "headline": "Onboarding Guide",
  "subtitle": "Click each step to learn more",
  "steps": [
    {"icon": "User", "number": 1, "title": "Set Up Your Profile", "summary": "Personalize your account", "details": "Your profile is how others see you. Add a professional photo, write a brief bio, and connect your social accounts to build trust with collaborators.", "imagePrompt": "profile setup screen", "items": ["Upload profile photo", "Write bio", "Add contact info"], "completed": true, "actionLabel": "Edit Profile"},
    {"icon": "Bell", "number": 2, "title": "Configure Notifications", "summary": "Control what alerts you receive", "details": "Stay informed without being overwhelmed. Choose which events trigger notifications and how you want to receive them.", "imagePrompt": "notification settings", "items": ["Email preferences", "Push notifications", "Weekly digest"], "completed": false, "actionLabel": "Set Preferences"},
    {"icon": "Plug", "number": 3, "title": "Connect Integrations", "summary": "Link your favorite tools", "details": "Supercharge your workflow by connecting the tools you already use. We support 50+ integrations including Slack, GitHub, and more.", "imagePrompt": "integrations marketplace", "items": ["Browse integrations", "Authorize connections", "Test sync"], "completed": false, "actionLabel": "Browse Integrations"}
  ],
  "allowMultiple": false,
  "ctaLabel": "Complete Onboarding",
  "ctaActionPhrase": "show me to finish onboarding"
}
```

### StepsTabbed
Tab-based step navigation.
```json
{
  "headline": "Getting Started Guide",
  "subtitle": "Everything you need to know",
  "tabs": [
    {"icon": "BookOpen", "title": "Basics", "content": {"headline": "Understanding the Fundamentals", "description": "Before diving in, let's cover the core concepts that power the platform. This foundation will make everything else easier to learn.", "imagePrompt": "learning fundamentals concept", "bullets": ["What is the platform", "Key terminology", "Core principles"]}, "completed": true},
    {"icon": "Wrench", "title": "Setup", "content": {"headline": "Configuring Your Workspace", "description": "Now let's set up your environment for success. A well-configured workspace saves hours of time later.", "imagePrompt": "workspace setup", "bullets": ["Account settings", "Team structure", "Permissions"]}, "completed": true},
    {"icon": "Play", "title": "First Steps", "content": {"headline": "Taking Your First Actions", "description": "Time to do something! Start with these simple actions to see immediate results and build confidence.", "imagePrompt": "taking first steps", "bullets": ["Create first item", "Try key features", "Get quick wins"]}, "completed": false},
    {"icon": "Trophy", "title": "Advanced", "content": {"headline": "Becoming a Power User", "description": "Ready to level up? These advanced techniques will make you a platform expert.", "imagePrompt": "power user advanced features", "bullets": ["Automation", "Custom workflows", "API access"]}, "completed": false}
  ],
  "defaultTab": 2,
  "ctaLabel": "Mark Complete",
  "ctaActionPhrase": "user completed this section"
}
```

### StepsNumbered
Big numbered steps with visual emphasis.
```json
{
  "headline": "3 Steps to Success",
  "subtitle": "Follow this simple process",
  "steps": [
    {"icon": "Lightbulb", "title": "Identify the Problem", "description": "Clearly define what challenge you're facing. The better you understand the problem, the better the solution will be.", "imagePrompt": "identifying a problem light bulb moment", "highlight": true},
    {"icon": "Compass", "title": "Explore Solutions", "description": "Research and evaluate your options. Consider multiple approaches before committing to one path.", "imagePrompt": "exploring multiple solution paths", "highlight": false},
    {"icon": "Rocket", "title": "Take Action", "description": "Execute your chosen solution with confidence. Iterate based on results and don't be afraid to adjust.", "imagePrompt": "taking action launching rocket", "highlight": false}
  ],
  "columns": 3,
  "ctaLabel": "Get Started",
  "ctaActionPhrase": "show me to begin"
}
```

### StepsPhases
Phase-based grouping with nested steps.
```json
{
  "headline": "Implementation Plan",
  "subtitle": "Structured approach to success",
  "phases": [
    {"icon": "FileSearch", "title": "Discovery", "description": "Understand requirements and context", "imagePrompt": "discovery phase research", "status": "completed", "steps": [{"title": "Stakeholder interviews", "completed": true}, {"title": "Requirements gathering", "completed": true}, {"title": "Current state analysis", "completed": true}], "duration": "2 weeks"},
    {"icon": "PenTool", "title": "Design", "description": "Create the solution blueprint", "imagePrompt": "design phase blueprints", "status": "current", "steps": [{"title": "Architecture design", "completed": true}, {"title": "UI/UX mockups", "completed": false}, {"title": "Technical specs", "completed": false}], "duration": "3 weeks"},
    {"icon": "Code", "title": "Development", "description": "Build and test the solution", "imagePrompt": "development phase coding", "status": "upcoming", "steps": [{"title": "Core development", "completed": false}, {"title": "Integration", "completed": false}, {"title": "Testing", "completed": false}], "duration": "6 weeks"}
  ],
  "ctaLabel": "View Phase Details",
  "ctaActionPhrase": "show me to see phase details"
}
```

### StepsMilestones
Gamified milestones with points and rewards.
```json
{
  "headline": "Achievement Path",
  "subtitle": "Earn points and unlock rewards",
  "currentPoints": 180,
  "milestones": [
    {"icon": "Sparkles", "title": "Beginner", "description": "Complete your first task", "imagePrompt": "beginner badge unlocked", "reward": "Beginner Badge", "points": 50, "status": "unlocked"},
    {"icon": "Flame", "title": "On Fire", "description": "Complete 5 tasks in a row", "imagePrompt": "on fire achievement", "reward": "Streak Badge + 2x Points", "points": 150, "status": "unlocked"},
    {"icon": "Trophy", "title": "Champion", "description": "Reach 500 total points", "imagePrompt": "champion trophy", "reward": "Gold Badge + Premium Feature", "points": 500, "status": "current"},
    {"icon": "Crown", "title": "Legend", "description": "Help 10 others succeed", "imagePrompt": "legendary crown achievement", "reward": "Legend Status + Exclusive Access", "points": 1000, "status": "locked"}
  ],
  "ctaLabel": "View All Achievements",
  "ctaActionPhrase": "show me to see all achievements"
}
```

### StepsSwipeable
Carousel-style step swiper.
```json
{
  "headline": "Quick Tutorial",
  "subtitle": "Swipe through to learn",
  "steps": [
    {"icon": "Hand", "title": "Welcome!", "description": "Let's get you up to speed in just a few swipes", "imagePrompt": "welcome onboarding illustration", "details": ["Takes only 2 minutes", "Learn the essentials", "Start creating immediately"]},
    {"icon": "Layout", "title": "Your Dashboard", "description": "This is your home base for everything", "imagePrompt": "dashboard overview", "details": ["Recent projects here", "Quick actions on the right", "Analytics at a glance"]},
    {"icon": "Folder", "title": "Projects", "description": "Organize your work into projects", "imagePrompt": "project organization", "details": ["Create unlimited projects", "Share with team members", "Set permissions per project"], "actionLabel": "Create Project"},
    {"icon": "CheckCircle", "title": "You're Ready!", "description": "You know the basics - time to dive in", "imagePrompt": "ready to go celebration", "details": ["Explore at your own pace", "Help is always available", "Have fun!"], "actionLabel": "Start Creating"}
  ],
  "ctaLabel": "Finish Tutorial",
  "ctaActionPhrase": "user completed the tutorial"
}
```

---

## Teaching Template Specifications (3) — v94.0 NEW

### Lesson
Structured lesson with objectives and sections.
```json
{
  "title": "Introduction to AI Fundamentals",
  "subtitle": "Understanding the basics of artificial intelligence",
  "duration": "20 minutes",
  "difficulty": "Beginner",
  "imagePrompt": "AI brain neural network visualization",
  "objectivesLabel": "Learning Objectives",
  "objectives": ["Understand what AI is and isn't", "Learn key AI terminology", "Recognize AI applications in daily life"],
  "sections": [
    {"icon": "Brain", "title": "What is AI?", "content": "Artificial Intelligence refers to systems designed to perform tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, and understanding language.", "imagePrompt": "AI concept illustration", "keyPoints": ["AI mimics human cognition", "Based on data and algorithms", "Constantly improving"]},
    {"icon": "Layers", "title": "Types of AI", "content": "There are different categories of AI based on capabilities: Narrow AI (specialized tasks), General AI (human-like reasoning), and Super AI (exceeds human intelligence).", "imagePrompt": "AI types comparison", "keyPoints": ["Most current AI is Narrow AI", "General AI is still theoretical", "Each type has different applications"]}
  ],
  "summaryLabel": "Key Takeaways",
  "summary": "AI is a powerful technology that's already part of our daily lives, from voice assistants to recommendation systems.",
  "keyTakeaways": ["AI is tool, not magic", "Data quality matters", "Ethical considerations are crucial"],
  "nextLabel": "Next Lesson",
  "nextPhrase": "show me the next lesson",
  "ctaLabel": "Mark Complete",
  "ctaActionPhrase": "user completed this lesson"
}
```

### Tutorial
Step-by-step tutorial with code blocks.
```json
{
  "title": "Build Your First Chatbot",
  "subtitle": "A hands-on guide to creating an AI assistant",
  "imagePrompt": "chatbot development illustration",
  "duration": "30 minutes",
  "prerequisites": ["Basic programming knowledge", "Python installed", "API key ready"],
  "steps": [
    {"icon": "Download", "title": "Install Dependencies", "instruction": "First, we need to install the required packages. Open your terminal and run the command below.", "imagePrompt": "terminal installation", "code": "pip install openai python-dotenv", "codeLanguage": "bash", "tip": "Use a virtual environment to keep your project clean"},
    {"icon": "Key", "title": "Set Up API Key", "instruction": "Create a .env file in your project root and add your API key. Never commit this file to version control.", "imagePrompt": "API key setup", "code": "OPENAI_API_KEY=your-key-here", "codeLanguage": "bash", "warning": "Keep your API key secret!"},
    {"icon": "Code", "title": "Write the Bot", "instruction": "Now let's write the main chatbot code. This creates a simple conversational AI.", "imagePrompt": "coding the chatbot", "code": "import openai\n\ndef chat(message):\n    response = openai.ChatCompletion.create(\n        model='gpt-3.5-turbo',\n        messages=[{'role': 'user', 'content': message}]\n    )\n    return response.choices[0].message.content", "codeLanguage": "python", "tip": "Start simple and add features gradually"},
    {"icon": "Play", "title": "Test It Out", "instruction": "Run your script and have a conversation with your bot!", "imagePrompt": "testing the chatbot", "code": "python chatbot.py", "codeLanguage": "bash"}
  ],
  "completionTitle": "Congratulations!",
  "completionMessage": "You've built your first AI chatbot. Now try customizing it with your own personality and features.",
  "tryItLabel": "Try Advanced Features",
  "tryItPhrase": "show me advanced tutorial",
  "ctaLabel": "Share Your Bot",
  "ctaActionPhrase": "show me to share their creation"
}
```

### Flashcards
Interactive flip cards for learning.
```json
{
  "headline": "AI Vocabulary",
  "subtitle": "Test your knowledge of key terms",
  "cards": [
    {"frontIcon": "Brain", "frontTitle": "Machine Learning", "frontSubtitle": "What is it?", "frontImagePrompt": "machine learning concept", "backTitle": "Definition", "backContent": "A subset of AI where systems learn from data to improve performance without being explicitly programmed. Uses algorithms to identify patterns.", "backImagePrompt": "machine learning diagram", "mastered": false},
    {"frontIcon": "Network", "frontTitle": "Neural Network", "frontSubtitle": "What is it?", "frontImagePrompt": "neural network visualization", "backTitle": "Definition", "backContent": "Computing systems inspired by biological neural networks. Consists of layers of interconnected nodes that process information.", "backImagePrompt": "neural network layers", "mastered": false},
    {"frontIcon": "MessageSquare", "frontTitle": "NLP", "frontSubtitle": "What does it stand for?", "frontImagePrompt": "language processing concept", "backTitle": "Natural Language Processing", "backContent": "AI technology that enables computers to understand, interpret, and generate human language in useful ways.", "backImagePrompt": "NLP applications", "mastered": true},
    {"frontIcon": "Eye", "frontTitle": "Computer Vision", "frontSubtitle": "What is it?", "frontImagePrompt": "computer vision concept", "backTitle": "Definition", "backContent": "AI field enabling computers to derive meaningful information from visual inputs like images and videos.", "backImagePrompt": "computer vision applications", "mastered": false}
  ],
  "shuffleLabel": "Shuffle Cards",
  "masteredLabel": "Mastered",
  "remainingLabel": "Remaining",
  "ctaLabel": "Finish Review",
  "ctaActionPhrase": "user finished flashcard review"
}
```

---

## Rating & Testing Template Specifications (4) — v94.0 NEW

### Quiz
Multiple choice quiz with scoring.
```json
{
  "title": "AI Knowledge Check",
  "subtitle": "Test what you've learned",
  "imagePrompt": "quiz challenge illustration",
  "questions": [
    {"icon": "HelpCircle", "question": "What does AI stand for?", "options": [{"id": "a", "text": "Automated Intelligence"}, {"id": "b", "text": "Artificial Intelligence"}, {"id": "c", "text": "Advanced Integration"}, {"id": "d", "text": "Algorithmic Interface"}], "correctId": "b", "explanation": "AI stands for Artificial Intelligence - systems designed to mimic human cognitive functions."},
    {"icon": "HelpCircle", "question": "Which is an example of Narrow AI?", "imagePrompt": "AI applications examples", "options": [{"id": "a", "text": "A robot that can do any human task"}, {"id": "b", "text": "A chess-playing computer"}, {"id": "c", "text": "A system smarter than all humans"}, {"id": "d", "text": "None of the above"}], "correctId": "b", "explanation": "A chess computer is Narrow AI - it excels at one specific task but can't do anything else."},
    {"icon": "HelpCircle", "question": "What powers most modern AI systems?", "options": [{"id": "a", "text": "Magic"}, {"id": "b", "text": "Human brains"}, {"id": "c", "text": "Data and algorithms"}, {"id": "d", "text": "Random guessing"}], "correctId": "c", "explanation": "AI systems learn from large amounts of data using sophisticated algorithms."}
  ],
  "passingScore": 70,
  "passMessage": "Excellent! You've demonstrated strong AI knowledge.",
  "failMessage": "Keep learning! Review the material and try again.",
  "scoreLabel": "correct answers",
  "retryLabel": "Try Again",
  "retryPhrase": "show me to retry the quiz",
  "ctaLabel": "Continue Learning",
  "ctaActionPhrase": "show me to continue after quiz"
}
```

### Assessment
Scored assessment with rating scales.
```json
{
  "title": "Skills Self-Assessment",
  "subtitle": "Rate your abilities honestly",
  "imagePrompt": "skills assessment evaluation",
  "items": [
    {"icon": "Code", "category": "Technical Skills", "question": "How comfortable are you with programming?", "description": "Consider your ability to write and understand code", "scale": {"min": 1, "max": 5, "minLabel": "Beginner", "maxLabel": "Expert"}},
    {"icon": "Users", "category": "Soft Skills", "question": "How would you rate your communication skills?", "description": "Think about written and verbal communication", "scale": {"min": 1, "max": 5, "minLabel": "Developing", "maxLabel": "Excellent"}},
    {"icon": "Lightbulb", "category": "Technical Skills", "question": "How strong is your problem-solving ability?", "description": "Your approach to tackling complex challenges", "scale": {"min": 1, "max": 5, "minLabel": "Learning", "maxLabel": "Advanced"}},
    {"icon": "Clock", "category": "Soft Skills", "question": "How well do you manage your time?", "description": "Meeting deadlines and prioritizing tasks", "scale": {"min": 1, "max": 5, "minLabel": "Needs Work", "maxLabel": "Excellent"}}
  ],
  "scoreRanges": [
    {"min": 0, "max": 40, "label": "Developing", "description": "You have room to grow - that's exciting!", "color": "flamingo"},
    {"min": 41, "max": 70, "label": "Competent", "description": "Solid foundation with growth potential", "color": "sapphire"},
    {"min": 71, "max": 100, "label": "Advanced", "description": "You're performing at a high level", "color": "jade"}
  ],
  "resultsTitle": "Your Assessment Results",
  "categoryScoresLabel": "Scores by Category",
  "recommendations": [
    {"icon": "BookOpen", "title": "Recommended Course", "description": "Based on your scores, try our Advanced Problem Solving workshop"},
    {"icon": "Users", "title": "Mentorship", "description": "Consider pairing with a senior team member"}
  ],
  "ctaLabel": "Get Development Plan",
  "ctaActionPhrase": "show me personalized development plan"
}
```

### Survey
Survey with multiple question types.
```json
{
  "title": "Experience Feedback",
  "subtitle": "Help us improve by sharing your thoughts",
  "imagePrompt": "feedback survey illustration",
  "questions": [
    {"id": "q1", "type": "nps", "question": "How likely are you to recommend us?", "description": "0 = Not at all, 10 = Extremely likely", "required": true, "minLabel": "Not likely", "maxLabel": "Very likely"},
    {"id": "q2", "type": "rating", "question": "How satisfied are you with the overall experience?", "required": true},
    {"id": "q3", "type": "multiple", "question": "What feature did you find most valuable?", "options": [{"id": "a", "text": "Easy to use interface"}, {"id": "b", "text": "Fast performance"}, {"id": "c", "text": "Great documentation"}, {"id": "d", "text": "Helpful support team"}], "required": true},
    {"id": "q4", "type": "text", "question": "What could we do better?", "description": "Your feedback helps us improve", "placeholder": "Share your suggestions...", "required": false}
  ],
  "thankYouTitle": "Thank You!",
  "thankYouMessage": "Your feedback is invaluable. We read every response and use it to make improvements.",
  "thankYouImagePrompt": "thank you appreciation",
  "submitLabel": "Submit Feedback",
  "ctaLabel": "Back to Home",
  "ctaActionPhrase": "show me to go home after survey"
}
```

### Scorecard
Performance scorecard with grades and metrics.
```json
{
  "title": "Performance Scorecard",
  "subtitle": "Your monthly performance overview",
  "imagePrompt": "performance scorecard dashboard",
  "periodLabel": "Period",
  "period": "January 2024",
  "overallGrade": "A",
  "overallLabel": "Overall Grade",
  "sections": [
    {
      "title": "Productivity",
      "metrics": [
        {"icon": "CheckCircle", "label": "Tasks Completed", "value": 47, "target": 40, "trend": "up", "trendValue": "+18%", "grade": "A"},
        {"icon": "Clock", "label": "On-Time Delivery", "value": "94%", "target": "90%", "trend": "up", "trendValue": "+4%", "grade": "A"},
        {"icon": "AlertCircle", "label": "Issues Resolved", "value": 12, "target": 10, "trend": "up", "trendValue": "+20%", "grade": "B"}
      ],
      "overallGrade": "A"
    },
    {
      "title": "Quality",
      "metrics": [
        {"icon": "Star", "label": "Customer Satisfaction", "value": "4.8/5", "trend": "up", "trendValue": "+0.3", "grade": "A", "status": "excellent"},
        {"icon": "RefreshCw", "label": "Revision Rate", "value": "8%", "target": "10%", "trend": "down", "trendValue": "-2%", "grade": "A", "status": "excellent"},
        {"icon": "Award", "label": "Quality Score", "value": 92, "target": 85, "trend": "neutral", "trendValue": "0%", "grade": "A", "status": "good"}
      ],
      "overallGrade": "A"
    }
  ],
  "highlights": [
    {"icon": "TrendingUp", "label": "Best Performance", "value": "Task Completion"},
    {"icon": "Target", "label": "Goals Met", "value": "6 of 6"},
    {"icon": "Award", "label": "Recognition", "value": "Top 10%"}
  ],
  "ctaLabel": "View Full Report",
  "ctaActionPhrase": "show me detailed performance report"
}