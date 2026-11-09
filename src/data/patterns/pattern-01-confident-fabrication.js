// src/data/patterns/pattern-01-confident-fabrication.js
// Pattern 01: The Confident Fabrication
//
// CASE STUDY: The react-codeshift incident (January 2026), Charlie Eriksen,
// Aikido Security: an LLM-invented npm package spread to 237 GitHub repos via
// AI agent skill files. Origin story: huggingface-cli (Lasso Security, 2024).
// TARGET: ~18 minutes total
//
// Authored in the block-based schema: each STOP phase is
// { title, estimatedTime, steps: [block, ...] } and every block is one screen.
// See docs/pattern-authoring-guide.md for the block vocabulary. No component
// changes are needed to add or edit content here.

// ============================================
// SEE (3 min): Story -> Trust check -> Impact reveal
// ============================================
const see = {
  title: "The Tool That Didn't Exist",
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'In January 2026, a researcher found a command copied into 237 projects.',
      body: `Developers increasingly let AI coding agents do routine jobs, like upgrading an old React app. Many agents follow "skill" files: plain-text instructions that tell the agent which commands to run.

One popular React upgrade skill told the agent to use a tool called react-codeshift. Here's the kind of exchange that skill produced:`,
    },
    {
      type: 'chat',
      user: 'Upgrade my React app and get rid of the deprecated lifecycle methods.',
      ai: {
        text: `I'll run the React codemods for you.

**Step 1:** Rename the unsafe lifecycle methods:
\`\`\`
npx react-codeshift --transform=react-codeshift/transforms/rename-unsafe-lifecycles.js ./src
\`\`\`

**Step 2:** Switch to the new JSX transform:
\`\`\`
npx react-codeshift --transform=react-codeshift/transforms/new-jsx-transform.js ./src
\`\`\`

npx will ask "Ok to proceed? (y)". I'll confirm and continue.`,
        note: 'Reconstruction: the two commands are quoted from the real skill file (via Aikido Security); the surrounding conversation is illustrative.',
      },
    },
    {
      type: 'choice',
      question: 'Be honest: would you have followed these instructions?',
      subtext: "There's no wrong answer here. We're testing your instincts.",
      options: [
        { id: 'yes-trusted', label: 'Yes, I would have let it run', response: "You're not alone. AI agents following this skill kept trying to download it." },
        { id: 'maybe-searched', label: "Maybe, but I'd check the tool first", response: 'Good instinct. Nobody did: the command was copied from repo to repo, unchecked.' },
        { id: 'no-suspicious', label: 'No, something seems off', response: 'Interesting! What made you hesitate? Hold that thought.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'The tool never existed.',
      explanation: `No one had ever published a package called "react-codeshift". An AI made the name up.

Two real tools do exist: jscodeshift (a general codemod runner) and react-codemod (React-specific transforms). An LLM blended them into one plausible name for a tool that didn't exist.`,
      list: {
        title: "Here's what actually happened:",
        items: [
          'Security researcher Charlie Eriksen (Aikido Security) traced the name to one commit from October 2025 that added 47 LLM-generated agent skills, with no apparent human review',
          'The skill was forked and copied (even translated into Japanese) until 237 GitHub repositories told agents to run it',
          'On 14 January 2026 he registered the empty name on npm himself, before an attacker could',
          'Downloads kept trickling in afterwards: real agents following the skill and trying to run a package that had never existed',
        ],
      },
    },
    {
      type: 'stats',
      title: 'The Impact',
      items: [
        { value: '237', label: 'GitHub repositories', detail: 'told AI agents to run the fake tool' },
        { value: '1 commit', label: 'Single origin', detail: '47 LLM-generated skills, no apparent review' },
        { value: '~20%', label: 'Package suggestions invented', detail: 'average across 16 AI models (USENIX Security 2025)' },
      ],
      source: 'Aikido Security (Charlie Eriksen), January 2026; Spracklen et al., USENIX Security 2025',
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Annoying but harmless:', body: 'The install fails, you waste time debugging', tone: 'neutral' },
        { label: 'Actually dangerous:', body: 'An attacker registers the invented name first and fills it with malware. Every agent or developer that follows the instruction installs it.', tone: 'danger' },
        { label: 'Not a one-off:', body: 'In 2024, researcher Bar Lanyado (Lasso Security) uploaded an empty package under the AI-invented name "huggingface-cli". It got more than 30,000 real downloads in three months.', tone: 'neutral' },
      ],
      conclusion: "Security researchers call this attack 'slopsquatting'. react-codeshift was caught by a defender first; the next invented name may not be.",
      transition: "So how do you protect yourself? First, let's test your instincts.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 AI outputs — Trust or Verify?
// ============================================
const test = {
  title: 'Trust or Verify?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 tools that AI assistants have recommended.',
        instruction: 'For each one, decide: would you trust it and install immediately, or verify it first?',
        note: "Don't actually search anything yet — go with your gut.",
        legend: {
          trust: { label: 'TRUST', detail: 'Install immediately' },
          verify: { label: 'VERIFY', detail: 'Check before installing' },
        },
      },
      items: [
        {
          id: 'item-1',
          prompt: 'To convert PDFs, install the pdf-toolkit-pro package',
          context: "You asked: 'How do I convert PDF files to images?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated',
          explanation: "FABRICATED. The '-pro' suffix is a red flag. Real tools rarely use it. This package doesn't exist.",
          redFlag: "The '-pro' suffix",
        },
        {
          id: 'item-2',
          prompt: 'You can use the requests library to make HTTP calls',
          context: "You asked: 'How do I fetch data from a website in Python?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: "REAL. 'requests' is one of the most popular Python packages. It has over 50 million downloads per month.",
          meta: 'Downloads: 50M+ per month',
        },
        {
          id: 'item-3',
          prompt: 'Install react-component-toolkit for pre-built UI elements',
          context: "You asked: 'How do I add buttons and forms to my React app?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated',
          explanation: 'FABRICATED. The name sounds perfect for what you need — too perfect. AI invented it to match your question.',
          redFlag: 'Name matches your question too perfectly',
        },
        {
          id: 'item-4',
          prompt: 'Use lodash for utility functions like sorting and filtering',
          context: "You asked: 'Is there a library for common JavaScript operations?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: 'REAL. Lodash is a hugely popular JavaScript utility library used by millions of developers.',
          meta: 'Downloads: 40M+ per week',
        },
        {
          id: 'item-5',
          prompt: 'Install fastapi-authentication-plus for secure login systems',
          context: "You asked: 'How do I add user login to my FastAPI app?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated',
          explanation: "FABRICATED. Again, the '-plus' suffix. The real package for this is called 'fastapi-users'.",
          redFlag: "The '-plus' suffix",
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You correctly identified all 5. You have strong instincts — let's sharpen them further." },
          { min: 4, message: '4 out of 5! Solid instincts. The patterns we\'ll learn next will help you catch that last one.' },
          { min: 3, message: "3 out of 5 — not bad! The fabricated ones are tricky. That's exactly why this training exists." },
          { min: 0, message: "This is tricky — and that's the point. AI fabrications are designed to sound real. Let's learn the patterns that give them away." },
        ],
      },
      summary: {
        insight: 'In this batch, 3 out of 5 AI recommendations were fabricated. In a USENIX Security 2025 study of 16 AI models, about 20% of recommended packages did not exist on average (around 5% for commercial models). Let\'s learn how to spot them.',
      },
    },
  ],
};

// ============================================
// OBSERVE (5 min): 4 red flags + matching + method
// ============================================
const observe = {
  title: 'The Red Flags',
  estimatedTime: 5,
  steps: [
    {
      type: 'cardGrid',
      heading: 'AI fabrications follow predictable patterns.',
      subtext: 'Security researchers analyzed thousands of AI responses. They found 4 red flags that appear again and again.',
      cards: [
        { emoji: '🏷️', label: 'The Premium Suffix' },
        { emoji: '🎯', label: 'The Perfect Match' },
        { emoji: '🔀', label: 'The Naming Mixup' },
        { emoji: '🔗', label: 'The Ecosystem Blend' },
      ],
    },
    {
      type: 'concept',
      emoji: '🏷️',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Premium Suffix',
      description: 'AI loves adding "-pro", "-plus", "-toolkit", or "-advanced" to make fake tools sound legitimate.',
      compare: {
        left: { label: '❌ Fabricated examples:', tone: 'danger', items: ['pdf-toolkit-pro', 'react-forms-plus', 'auth-advanced', 'data-toolkit'] },
        right: { label: '✓ Real examples:', tone: 'good', items: ['react', 'express', 'pandas', 'tensorflow'] },
      },
      why: "AI has learned that 'pro' and 'plus' sound professional. So when it invents something, it adds these suffixes to seem credible.",
      spot: 'If a tool name ends in -pro, -plus, -toolkit, or -advanced, verify it before installing.',
    },
    {
      type: 'concept',
      emoji: '🎯',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Perfect Match',
      description: 'The tool name matches your exact question suspiciously well.',
      rows: [
        { label: 'Your question:', variant: 'quote', tone: 'neutral', value: 'How do I add authentication to FastAPI?' },
        { label: 'AI invents:', variant: 'code', tone: 'danger', value: 'fastapi-authentication-helper' },
      ],
      note: 'Real tools rarely have names that perfectly describe your specific use case',
      why: "AI generates names based on your question. If you ask about 'FastAPI authentication', it constructs 'fastapi-authentication-something'.",
      spot: 'If the tool name reads like a description of your exact problem, be suspicious.',
    },
    {
      type: 'concept',
      emoji: '🔀',
      eyebrow: 'Red Flag 3 of 4',
      name: 'The Naming Mixup',
      description: 'AI confuses the name of a command, a module, or a brand with the name of the package you actually install.',
      rows: [
        { label: 'Real package:', variant: 'code', tone: 'good', value: 'pip install huggingface_hub' },
        { label: 'AI fabricated:', variant: 'code', tone: 'danger', value: 'pip install huggingface-cli' },
      ],
      note: "The Hugging Face command-line tool ships inside the huggingface_hub package. AI turned the tool's name into a package name that didn't exist.",
      why: "The name you type to run a tool, the name you import, and the name you install are often different. AI blurs them together.",
      spot: 'If the install name is just the command name or the brand name, check what the official docs tell you to install.',
    },
    {
      type: 'concept',
      emoji: '🔗',
      eyebrow: 'Red Flag 4 of 4',
      name: 'The Ecosystem Blend',
      description: "AI mashes together real tool names to create something that sounds familiar but doesn't exist.",
      rows: [
        { label: 'Real tools:', variant: 'chips', tone: 'good', values: ['jscodeshift', 'react-codemod'] },
        { label: 'AI invents:', variant: 'code', tone: 'danger', value: 'react-codeshift' },
      ],
      note: "Both real tools exist. AI combined them into something that didn't. This is the exact name from the January 2026 case: it ended up in 237 GitHub repositories.",
      why: 'AI recognizes patterns in real tool names and recombines them incorrectly.',
      spot: "If a name sounds like two tools you've heard of merged together, check if it actually exists.",
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each fabricated tool, identify which red flag gives it away:',
      options: [
        { id: 'flag-1', emoji: '🏷️', label: 'The Premium Suffix' },
        { id: 'flag-2', emoji: '🎯', label: 'The Perfect Match' },
        { id: 'flag-3', emoji: '🔀', label: 'The Naming Mixup' },
        { id: 'flag-4', emoji: '🔗', label: 'The Ecosystem Blend' },
      ],
      items: [
        { prompt: 'express-routing-pro', correct: 'flag-1', explanation: "The '-pro' suffix is the giveaway." },
        { prompt: 'mongodb-query-helper', correct: 'flag-2', explanation: "It's too perfectly named for 'MongoDB queries'." },
        { prompt: 'numpy_pandas-toolkit', correct: 'flag-4', explanation: "It mashes 'numpy' and 'pandas' together." },
        { prompt: 'Django-REST-framework', correct: 'trick-question', explanation: "Trick question! This one is actually real. It's a popular API framework.", extra: { id: 'trick-question', label: "✓ It's actually real" } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'The 30-Second Check',
      tagline: 'One simple habit that catches most fabricated packages before they reach your machine.',
      steps: [
        { number: 1, action: 'Copy the exact name', detail: 'Not just part of it — the whole thing, exactly as AI wrote it', time: '2 seconds' },
        { number: 2, action: 'Open the package registry', detail: "For Python: pypi.org | For JavaScript: npmjs.com | For others: search '[language] package registry'", time: '5 seconds' },
        { number: 3, action: 'Search the exact name', detail: 'Paste it directly into the search box', time: '3 seconds' },
        { number: 4, action: 'Check the results', detail: 'No results? AI made it up. Has results? Check: downloads, last update, and description match what AI claimed.', time: '20 seconds' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'High download count (thousands or millions)',
            'Recent updates (within the last year)',
            'Description matches what AI said it does',
            'Has documentation and a source code link',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            'Very few downloads (under 100)',
            "Created very recently (especially if AI calls it 'popular')",
            'No documentation',
            "Description doesn't match what AI claimed",
          ],
        },
      },
      footer: 'This check takes 30 seconds. Debugging a failed install takes 30 minutes. Recovering from malware takes days. The math is simple.',
    },
  ],
};

// ============================================
// PRACTICE (6 min): Registry -> Compare -> Drill -> Toolkit -> Completion
// ============================================
const practice = {
  title: 'Your Turn',
  estimatedTime: 6,
  steps: [
    {
      type: 'registry',
      layout: 'single',
      heading: 'Know Your Registry',
      subtext: "Before we drill, let's see what legitimate packages actually look like on PyPI.",
      legit: {
        name: 'requests',
        version: '2.31.0',
        description: 'Python HTTP for Humans.',
        stats: {
          downloads: '50,234,891',
          firstRelease: 'Feb 14, 2011',
          lastUpdate: '3 days ago',
          versions: 142,
          maintainers: ['Kenneth Reitz', 'Nate Prewitt', 'Seth Larson'],
          repository: 'github.com/psf/requests',
        },
      },
      goodSigns: [
        { label: 'High downloads', detail: '50M+/month means heavily vetted by the community' },
        { label: '12+ years old', detail: 'Established packages have track records' },
        { label: 'Known maintainers', detail: 'Real people you can look up' },
        { label: 'GitHub linked', detail: 'You can inspect the actual code' },
        { label: '142 versions', detail: 'Active, ongoing development' },
      ],
    },
    {
      type: 'registry',
      layout: 'compare',
      heading: 'Side by Side: Spot the Difference',
      subtext: 'Same screen, very different story. Train your eye to see these differences instantly.',
      legit: {
        name: 'requests',
        version: '2.31.0',
        description: 'Python HTTP for Humans.',
        stats: {
          downloads: '50,234,891',
          firstRelease: 'Feb 14, 2011',
          lastUpdate: '3 days ago',
          versions: 142,
          maintainers: ['Kenneth Reitz', 'Nate Prewitt', 'Seth Larson'],
          repository: 'github.com/psf/requests',
        },
      },
      suspicious: {
        name: 'requests-pro',
        version: '1.0.0',
        description: 'Enhanced HTTP requests library with extra features.',
        stats: {
          downloads: '47',
          firstRelease: '3 days ago',
          lastUpdate: '3 days ago',
          versions: 1,
          maintainers: [],
          repository: null,
        },
      },
      redFlags: {
        title: 'Red Flags on requests-pro',
        items: [
          { label: '47 downloads' },
          { label: 'Created 3 days ago' },
          { label: 'No maintainer info' },
          { label: 'No repository' },
          { label: 'Single version' },
          { label: '"-pro" suffix on a real package name' },
        ],
      },
    },
    {
      type: 'drill',
      title: 'The Verification Drill',
      subtitle: '10 packages. Registry info included. Spot the fakes.',
      description: 'Use what you just learned. Look at the numbers, dates, and maintainers.',
      targetTime: 120,
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick commands to verify packages before installing.',
      commands: [
        {
          title: 'Check if package exists (Python)',
          ecosystem: 'pip',
          command: 'pip index versions requests',
          output: `requests (2.31.0)
Available versions: 2.31.0, 2.30.0, 2.29.0, 2.28.2, ...`,
          whatToLookFor: 'Multiple versions = established package. "No matching distribution" = doesn\'t exist.',
        },
        {
          title: 'View package details (Python)',
          ecosystem: 'pip',
          command: 'pip show requests',
          output: `Name: requests
Version: 2.31.0
Summary: Python HTTP for Humans.
Home-page: https://requests.readthedocs.io
Author: Kenneth Reitz`,
          whatToLookFor: 'Real homepage, known author, clear summary.',
        },
        {
          title: 'Check npm package (JavaScript)',
          ecosystem: 'npm',
          command: 'npm view lodash',
          output: `lodash@4.17.21 | MIT | deps: none | versions: 114
Lodash modular utilities.
https://lodash.com/

maintainers:
- jdalton`,
          whatToLookFor: '114 versions, known maintainer, real website.',
        },
        {
          title: 'Quick browser check',
          ecosystem: 'web',
          command: 'Open: pypi.org/project/[package-name]',
          output: '[Visual inspection of registry page]',
          whatToLookFor: 'Download count, release history, GitHub link, maintainer info.',
        },
      ],
      quickReference: {
        title: 'The 30-Second Check',
        steps: [
          'Copy the exact package name from AI output',
          'Open pypi.org (Python) or npmjs.com (JavaScript)',
          'Search for the exact name',
          'Check: downloads > 1000? First release > 1 month ago? Has GitHub link?',
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Confident Fabrication',
      summary: "You can now spot when AI invents packages that don't exist. You know the red flags, you've seen what real vs fake registries look like, and you have the tools to verify.",
      // NOTE: no `checklist` here on purpose — the phase-level keyTakeaways +
      // checklist below are rendered by LessonShell's final "Pattern Learned!"
      // screen. Duplicating them in this block showed the checklist twice.
      next: { label: 'Up Next', body: "Pattern 2 teaches you to spot code that looks correct but won't actually run." },
    },
  ],

  // Retained for the LessonShell completion card (read outside the step-flow).
  keyTakeaways: [
    'AI fabricates package names that follow predictable patterns',
    'Red flags: premium suffixes (-pro, -plus, -toolkit), perfect matches to your question, conflations of real names',
    'Registry signals: download count, release history, maintainer info, repository link',
    'The 30-Second Check prevents installing malicious or non-existent packages',
    'Trust but verify: AI is helpful, but verification is your responsibility',
  ],
  checklist: {
    title: 'Your Fabrication Detection Checklist',
    items: [
      'Does the name end in -pro, -plus, -toolkit, or -advanced?',
      'Does the name match my exact question suspiciously well?',
      'Does it combine two real package/framework names?',
      'Have I searched for the exact name on the package registry?',
      'Does it have 1000+ downloads and multiple versions?',
      'Is there a linked GitHub repository with actual code?',
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-01',
  patternNumber: 1,
  title: 'Confident Fabrication',
  subtitle: "When AI Invents Things That Don't Exist",
  description: "Learn to spot when AI recommends tools, packages, or resources that sound real but don't actually exist.",
  estimatedTime: 15,

  skillLearned: 'Verifying AI-recommended tools and packages',
  verificationMethod: 'The 30-Second Check',

  caseStudy: {
    name: 'The react-codeshift incident: an AI-invented npm package spread by agent skills',
    date: 'January 2026',
    researcher: 'Charlie Eriksen, Aikido Security',
    source: 'https://www.aikido.dev/blog/agent-skills-spreading-hallucinated-npx-commands',
  },

  nextLesson: {
    id: 'pattern-02',
    title: 'The Plausible Syntax',
    teaser: "Code that looks right but won't run.",
  },

  phases: { see, test, observe, practice },
};

export default lesson;
