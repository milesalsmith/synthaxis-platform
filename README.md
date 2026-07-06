# Synthaxis.ai

<div align="center">

![Synthaxis Logo](public/synthaxis-logo.png)

**AI Discernment Training Platform**

*Discernment is the pause. The breath before you copy-paste. The second look before you ship.*

[![Built with React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Deployed on Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Live Demo](https://synthaxis.ai) · [Report Bug](https://github.com/synthaxis-ai/platform/issues) · [Request Feature](https://github.com/synthaxis-ai/platform/issues)

</div>

---

## The Problem

AI gives plausible answers. Not always correct ones.

- **30,000 developers** installed a package that didn't exist
- **Lawyers cited fake cases** in federal court filings  
- **Researchers quoted fabricated statistics** in published work

The AI sounded confident every time. The humans trusted it every time.

**Discernment** — the ability to verify AI output — is now the most important skill for anyone using AI professionally. Yet it's the most undersupported competency in AI literacy training.

## The Solution

Synthaxis teaches the **10 hallucination patterns** that AI mistakes follow. Learn to recognize them, spot them forever.

| Pattern | What It Is |
|---------|------------|
| **Confident Fabrication** | AI invents packages, libraries, tools that don't exist |
| **Plausible Syntax** | Code that looks right but won't run |
| **Version Hallucination** | Deprecated APIs recommended as current |
| **Phantom Citation** | Academic sources that don't exist |
| **Statistics Invention** | Made-up numbers stated with confidence |
| **API Mirage** | Endpoints and methods that don't exist |
| **Historical Confabulation** | Wrong dates, events, attributions |
| **Logic Phantom** | Reasoning that sounds valid but isn't |
| **Confident Extrapolation** | Claims beyond training data |
| **Authoritative Blend** | Real and fake mixed together |

## The Method

### The STOP Protocol

Every pattern lesson follows the same 15-minute structure:

```
S — See      (3 min)  See the AI output that fooled real people
T — Test     (4 min)  Test yourself — can you spot the problem?
O — Observe  (5 min)  Observe the pattern + learn verification techniques  
P — Practice (6 min)  Practice on fresh examples, no scaffolding
```

### The Curriculum

```
Module 0: Why Smart People Get Fooled     10 min   ✅ Available
├── The Trust Test
├── Three Cognitive Biases
├── The AI Persuasion Formula
└── Transition to Patterns

Pattern 1: Confident Fabrication          15 min   ✅ Available
Pattern 2: Plausible Syntax               15 min   🔲 Coming Soon
Pattern 3: Version Hallucination          15 min   🔲 Coming Soon
...
Pattern 10: Authoritative Blend           15 min   🔲 Coming Soon

Total: ~3 hours to AI discernment
```

## Built On Research

Synthaxis is grounded in the **AI Fluency Framework** — developed by researchers at Ringling College, University College Cork, and Anthropic — which identifies four core competencies:

| Competency | Focus | Synthaxis Coverage |
|------------|-------|-------------------|
| Delegation | When to use AI | — |
| Description | How to prompt | — |
| **Discernment** | **Verify outputs** | **✅ Full focus** |
| Diligence | Ethics & safety | — |

Everyone teaches prompting. Almost nobody teaches verification. Synthaxis focuses entirely on **Discernment** — the skill that separates AI-fluent professionals from everyone else.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/synthaxis-ai/platform.git
cd platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm run preview  # Preview production build in the Workers runtime
```

### Deploy to Cloudflare Workers

```bash
npm run deploy   # builds, then deploys to synthaxis.ai via Wrangler
```

---

## Project Structure

```
platform/
├── public/
│   └── synthaxis-logo.png          # Brand logo
├── src/
│   ├── App.jsx                     # Router
│   ├── main.jsx                    # Entry point
│   ├── index.css                   # Global styles
│   │
│   ├── components/
│   │   ├── Landing.jsx             # Marketing homepage
│   │   ├── FoundationShell.jsx     # Module 0 container
│   │   ├── Module0Renderer.jsx     # Module 0 content
│   │   ├── LessonShell.jsx         # Pattern lesson container (STOP nav + completion)
│   │   ├── StopVisualisation.jsx   # Animated STOP diagram
│   │   ├── DrillMode.jsx           # Verification game (content-driven via props)
│   │   ├── RegistryMockup.jsx      # PyPI/npm mockups
│   │   └── phases/
│   │       ├── PhaseRenderer.jsx   # Thin delegate → StepFlow
│   │       ├── StepFlow.jsx        # Generic data-driven phase engine
│   │       ├── phaseConfig.js      # Per-phase theming (colors/icons/labels)
│   │       └── blocks/             # The block library (one screen = one block)
│   │           ├── BlockRenderer.jsx  # type → component dispatcher (registry)
│   │           ├── blockKit.js        # icons + interactive/self-nav type sets
│   │           └── *.jsx              # prose, chat, concept, registry, drill, …
│   │
│   ├── data/
│   │   ├── modules/
│   │   │   └── module-00-why-smart-people-get-fooled.js
│   │   └── patterns/
│   │       ├── _TEMPLATE.js         # Scaffold + block catalogue for new patterns
│   │       └── pattern-01-confident-fabrication.js   # Pure data (steps/blocks)
│   │
│   └── utils/
│       └── patternLoader.js        # Data loading + progress + registry
│
├── content-drafts/                 # Rough lesson drafts (git-ignored except template)
│   └── _DRAFT_TEMPLATE.md           # Brain-dump checklist → agent builds the pattern
├── docs/
│   └── pattern-authoring-guide.md  # How to author a pattern (schema + blocks)
├── tailwind.config.js              # Brand colors + theme
├── vite.config.js                  # Build configuration
└── package.json
```

### Architecture Overview

```
App.jsx (Router)
    │
    ├── Landing.jsx ─────────────────────────── /
    │
    ├── FoundationShell.jsx ─────────────────── /foundation
    │   └── Module0Renderer.jsx
    │
    └── LessonShell.jsx ─────────────────────── /learn/:patternNumber
        └── PhaseRenderer.jsx  (thin delegate)
            └── StepFlow.jsx   (reads phase.steps; progress, gating, nav)
                └── BlockRenderer.jsx  (block.type → component)
                    └── blocks/*  (prose, chat, judgementSet, registry,
                                   drill → DrillMode.jsx, completion, …)
```

### Lesson engine (block-based)

Lessons are **pure data**. A pattern file exports four phases (`see`, `test`,
`observe`, `practice`); each phase is `{ title, estimatedTime, steps: [...] }`, and
each step is one **block** — `{ type, ...props }` — rendered full-screen.

```
phase = { title, estimatedTime, steps: [ block, block, ... ] }
block = { type: 'prose' | 'chat' | 'reveal' | 'stats' | 'points'
                | 'cardGrid' | 'concept' | 'method' | 'commands' | 'registry'
                | 'choice' | 'matching'          // single-screen interactive
                | 'judgementSet' | 'drill' | 'completion',  // self-navigating
          ...props }
```

`StepFlow` renders the steps, draws progress dots, **gates** the Continue button on
single-screen interactive blocks, and **hands navigation** to self-navigating blocks.
Adding a new block type = one component + one line in `BlockRenderer`'s registry.
Adding a whole pattern = **no code** — just a data file. See
[`docs/pattern-authoring-guide.md`](docs/pattern-authoring-guide.md).

---

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Framework** | React 18 | Component model, hooks, ecosystem |
| **Build** | Vite | Fast HMR, optimized builds |
| **Styling** | Tailwind CSS 3 | Utility-first, custom brand colors |
| **Routing** | React Router 7 | Declarative, parameterized routes |
| **Icons** | Lucide React | Clean, consistent iconography |
| **Deployment** | Cloudflare Workers | Edge deployment, free tier |
| **Package Manager** | npm | Standard, ships with Node |

### Brand Colors

```javascript
// tailwind.config.js
synthaxis: {
  300: '#4ecdd0',  // Accent text on dark backgrounds
  400: '#1fa5a9',  // Hover states
  500: '#0a5f63',  // Primary (logo color)
  600: '#085255',  // Active/pressed states
}
```

---

## Development

### Dev Mode

`LessonShell.jsx` derives `DEV_MODE` automatically from the Vite environment
(line ~38):

```javascript
const DEV_MODE = import.meta.env.DEV;  // true in `npm run dev`, false in builds
```

When active (dev only):
- STOP letters (S T O P) in header are clickable
- Jump directly to any phase for testing
- DEV badge shows in header

No manual toggling needed — production builds ship with it off.

### Adding a New Pattern

Patterns are **pure content** — no engine code changes. Two ways:

**Fastest — hand off a rough draft.** Copy `content-drafts/_DRAFT_TEMPLATE.md`,
brain-dump the lesson (link to the real hallucination + rough questions/red flags),
and it gets converted into a validated, registered pattern file.

**By hand — from the template:**

1. **Create the data file** from the scaffold:
   ```bash
   cp src/data/patterns/_TEMPLATE.js \
      src/data/patterns/pattern-02-plausible-syntax.js
   ```

2. **Author the four phases** as `steps` of blocks. `_TEMPLATE.js` lists every
   block type; `pattern-01-confident-fabrication.js` is the canonical worked
   example for exact props. Full reference:
   [`docs/pattern-authoring-guide.md`](docs/pattern-authoring-guide.md).

3. **Register in `patternLoader.js`** (add the lazy import):
   ```javascript
   2: () => import('../data/patterns/pattern-02-plausible-syntax.js'),
   ```

4. **Flip status** in `curriculumMetadata.patterns`:
   ```javascript
   { number: 2, status: 'available' }  // was 'coming'
   ```

> Keep `keyTakeaways` + `checklist` on the `practice` phase (LessonShell renders the
> final summary from them). Don't also put a `checklist` on the `completion` block —
> it would render twice.

### Progress Storage

User progress is stored in `localStorage`:

```javascript
synthaxis_module_00    // Foundation module completion
synthaxis_pattern_1    // Pattern 1 progress
synthaxis_pattern_2    // Pattern 2 progress
// etc.
```

---

## Target Audience

- **Product Managers** using AI for specs and prototypes
- **Developers** using AI for code and documentation
- **Founders** shipping fast with AI assistance
- **Researchers** using AI for analysis and writing
- **Anyone** who uses AI professionally and needs to verify its output

---

## Roadmap

### Phase 1: MVP ✅
- [x] Landing page
- [x] Module 0: Why Smart People Get Fooled
- [x] Pattern 1: Confident Fabrication
- [x] STOP Protocol framework
- [x] Interactive DrillMode
- [x] Block-based lesson engine (patterns authored as pure data)
- [x] Pattern authoring workflow (template, guide, rough-draft handoff)

### Phase 2: Core Patterns 🔲
- [ ] Pattern 2: Plausible Syntax
- [ ] Pattern 3: Version Hallucination
- [ ] Pattern 4: Phantom Citation
- [ ] Pattern 5: Statistics Invention

### Phase 3: Complete Curriculum 🔲
- [ ] Patterns 6-10
- [ ] Progress dashboard
- [ ] Completion certificates

### Phase 4: Platform Features 🔲
- [ ] User accounts
- [ ] Example database (crowdsourced hallucinations)
- [ ] Team/organization features
- [ ] API for LMS integration

---

## Research & Credits

### Hallucination Research

- **USENIX Security 2025** — 576,000 code samples, 16 models, ~20% hallucination rate
- **Socket Security** — 38% conflations, 13% typo variants, 51% pure fabrications
- **Lasso Security** — huggingface-cli incident, 30,000+ downloads
- **Seth Larson (PSF)** — Coined "slopsquatting" term

### Framework

Built on concepts from the **AI Fluency Framework**:
- Ringling College of Art and Design
- University College Cork
- Anthropic

### Quote

> "The ones who thrive won't be the ones who know the most about AI… They'll be the ones who know when to trust it, when to challenge it, and when to rely on themselves instead."
> 
> — A.J. Juliani, "Discernment: The Most Important Skill in an AI World"

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Contact

**Synthaxis** — AI Discernment Training

- Website: [synthaxis.ai](https://synthaxis.ai)
- GitHub: [@synthaxis-ai](https://github.com/synthaxis-ai)

---

<div align="center">

**Learn to trust, but verify.**

*Free and open to everyone.*

</div>