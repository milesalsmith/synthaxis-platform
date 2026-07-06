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
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/synthaxis-ai/platform.git
cd platform

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

### Build for Production

```bash
pnpm build
pnpm preview  # Preview production build locally
```

### Deploy to Cloudflare Workers

```bash
pnpm run deploy
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
│   │   ├── LessonShell.jsx         # Pattern lesson container
│   │   ├── StopVisualisation.jsx   # Animated STOP diagram
│   │   ├── DrillMode.jsx           # Verification game
│   │   ├── RegistryMockup.jsx      # PyPI/npm mockups
│   │   └── phases/
│   │       └── PhaseRenderer.jsx   # STOP phase content
│   │
│   ├── data/
│   │   ├── modules/
│   │   │   └── module-00-why-smart-people-get-fooled.js
│   │   └── patterns/
│   │       └── pattern-01-confident-fabrication.js
│   │
│   └── utils/
│       └── patternLoader.js        # Data loading + progress
│
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
        └── PhaseRenderer.jsx
            ├── [SEE phase components]
            ├── [TEST phase components]
            ├── [OBSERVE phase components]
            └── [PRACTICE phase components]
                └── DrillMode.jsx
```

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
| **Package Manager** | pnpm | Fast, disk-efficient |

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

`LessonShell.jsx` has a `DEV_MODE` flag (line ~37):

```javascript
const DEV_MODE = true;  // Set to false for production
```

When enabled:
- STOP letters (S T O P) in header are clickable
- Jump directly to any phase for testing
- DEV badge shows in header

### Adding a New Pattern

1. **Create data file:**
   ```bash
   cp src/data/patterns/pattern-01-confident-fabrication.js \
      src/data/patterns/pattern-02-plausible-syntax.js
   ```

2. **Edit content** in the new file

3. **Register in patternLoader.js:**
   ```javascript
   const patterns = {
     1: () => import('../data/patterns/pattern-01-confident-fabrication.js'),
     2: () => import('../data/patterns/pattern-02-plausible-syntax.js'),  // Add this
   };
   ```

4. **Update metadata:**
   ```javascript
   { number: 2, status: 'available' }  // Change from 'coming'
   ```

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