// src/data/patterns/pattern-01-confident-fabrication.js
// Pattern 01: The Confident Fabrication
//
// CASE STUDY: The react-codeshift incident (January 2026), Charlie Eriksen,
// Aikido Security: an LLM-invented npm package spread to 237 GitHub repos via
// AI agent skill files. Origin story: huggingface-cli (Lasso Security, 2024).
// TARGET: about 10 minutes total
//
// Authored in the block-based schema: each STOP phase is
// { title, steps: [block, ...] } and every block is one screen.
// See docs/pattern-authoring-guide.md for the block vocabulary. No component
// changes are needed to add or edit content here.

// ============================================
// SEE: Story -> Trust check -> Impact reveal
// ============================================
const see = {
  title: "Tool That Didn't Exist",
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
      title: 'Impact',
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
      transition: "So how would you have caught it before it ran? Let's test the command.",
    },
  ],
};

// ============================================
// TEST: test the command from SEE. Spot what to test, then run the tests.
// Registry data below was read from registry.npmjs.org / api.npmjs.org on
// 9 Nov 2026.
// ============================================
const test = {
  title: 'Testing the Command',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'Before anything runs, look at what the agent was told to do.',
      instruction: 'Tap the parts of this instruction you would want to test. Some parts are fine. Some are exactly where the problem hides.',
      source: 'From the React upgrade skill',
      code: true,
      segments: [
        { text: 'npx', note: 'npx is the standard npm runner. Worth knowing what it does, though: it downloads and runs a package if you do not already have it.' },
        { text: ' ' },
        { text: 'react-codeshift', flag: { label: 'Package name', explanation: 'This is the claim that matters. npx fetches whatever is published under this exact name. If the name was invented, the command fetches nothing, or something an attacker put there.' } },
        { text: ' ' },
        { text: '--transform=', note: 'A normal flag for codemod runners like jscodeshift. Familiar syntax is part of why the line looks right.' },
        { text: 'react-codeshift/transforms/', flag: { label: 'Same unverified name, again', explanation: 'The transform path assumes the package exists and ships a transforms folder. One unchecked name, used twice, looks twice as solid.' } },
        { text: 'rename-unsafe-lifecycles.js', note: 'A real transform name. It comes from react-codemod, the official React codemod package. Real details next to an invented name make the whole line feel legitimate.' },
        { text: ' ' },
        { text: './src', note: 'Your own source folder. Fine.' },
        { text: '\n\n' },
        { text: `npx will ask "Ok to proceed? (y)". I'll confirm and continue.`, flag: { label: 'Auto-confirming the install prompt', explanation: 'That prompt is npx warning you it is about to download a package you do not have. It is the last chance to check, and the agent plans to skip it.' } },
      ],
      summary: 'Three things to test: does the package exist, who is behind it, and should anything install without a check? Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'You are reviewing this before it runs. You have a terminal, a browser, and a couple of minutes. Which tests actually tell you whether react-codeshift is real?',
      claim: {
        label: 'Instruction',
        text: 'npx react-codeshift --transform=react-codeshift/transforms/rename-unsafe-lifecycles.js ./src',
        code: true,
      },
      rounds: [
        {
          title: 'Test 1: Does it exist?',
          question: 'What do you check first?',
          options: [
            {
              id: 'ask-ai',
              label: 'Ask the AI: "Is react-codeshift a real package?"',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'Yes, react-codeshift is a codemod tool for React projects...',
              feedback: 'The model that invented the name will often confirm it. Asking the source to check itself is not a test.',
            },
            {
              id: 'npm-view',
              label: 'Look up the exact name on the registry: npm view react-codeshift',
              useful: true,
              resultLabel: 'Registry today (checked 9 Nov 2026)',
              result: 'react-codeshift@1.0.0\n\u{1F6AB} Placeholder to prevent dependency confusion.\nversions: 1 | created: 2026-01-14\nmaintainers: debugducky\nrepository: none',
              feedback: 'Before 14 January 2026 this lookup found nothing: the name had never been published. Today it exists only as a placeholder a researcher registered to block attackers. Either way, there is no real tool here.',
              kit: 'Look up the exact name on the registry (npm view <name>, or npmjs.com)',
            },
            {
              id: 'github-search',
              label: 'Search GitHub for "react-codeshift"',
              useful: false,
              resultLabel: 'Code search (January 2026)',
              result: '237 repositories reference react-codeshift',
              feedback: 'Lots of mentions is not the same as a real tool. Those repositories were copies of the same AI-generated skill. Repetition made the name look established.',
            },
          ],
        },
        {
          title: 'Test 2: Who is behind it?',
          question: 'Something called react-codeshift is on npm now. How do you tell whether it is the real thing?',
          options: [
            {
              id: 'compare',
              label: 'Compare it with the tools its name sounds like',
              useful: true,
              resultLabel: 'Registry data, week of 3 to 9 Nov 2026',
              result: 'jscodeshift      72 versions  since 2015  repo: facebook/jscodeshift      7,660,827/week\nreact-codemod    21 versions  since 2015  repo: reactjs/react-codemod      18,168/week\nreact-codeshift   1 version   since 2026  repo: none                       11/week',
              feedback: 'The real tools have a decade of releases, source repositories and known maintainers. react-codeshift has one version, no code and no repository. The name is a blend of the two real ones.',
              kit: 'Compare against the real tools it resembles: versions, age, repository, downloads',
            },
            {
              id: 'repo',
              label: 'Open its repository and README',
              useful: true,
              resultLabel: 'Package page',
              result: 'repository: none\nREADME: placeholder notice only',
              feedback: 'No source to read means nothing to trust. A real codemod tool has code you can inspect.',
              kit: 'Check for a linked repository with real code',
            },
            {
              id: 'try-it',
              label: 'Run it in a scratch folder and see what happens',
              useful: false,
              feedback: 'Running an unknown package is the risk you are trying to avoid. npx executes its code on your machine, wherever you run it from.',
            },
          ],
        },
        {
          title: 'Test 3: What is the real tool?',
          question: 'You still need to upgrade the app. Where do you get the right command?',
          options: [
            {
              id: 'guess',
              label: 'Try similar names until one installs (react-codeshift-cli, react-codeshifter...)',
              useful: false,
              feedback: 'Guessing names is exactly how slopsquatting catches people. Whatever installs first is not necessarily what you want.',
            },
            {
              id: 'docs',
              label: 'Find the official React codemod docs',
              useful: true,
              resultLabel: 'From the react-codemod README',
              result: 'npx react-codemod <transform> <path>\n\nnpx react-codemod rename-unsafe-lifecycles ./src',
              feedback: 'The transform the skill wanted is real. It lives in react-codemod, published by the React team. The official docs give you the real package for the real job.',
              kit: 'Take the command from official docs, not from the AI',
            },
            {
              id: 'yes-flag',
              label: 'Let the agent retry with --yes so it stops asking',
              useful: false,
              feedback: 'That skips the one prompt that warns you a new package is about to be downloaded.',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what is react-codeshift?',
        options: [
          { id: 'small-tool', label: 'A real tool with a small community', correct: false, feedback: 'One version, created the day a researcher claimed it, with no code and no repository. Small community tools still have source and history.' },
          { id: 'invented', label: 'An AI-invented name, now held by a defensive placeholder', correct: true, feedback: 'Right. An LLM blended jscodeshift and react-codemod into a name nobody had published. It exists on npm today only because Aikido Security registered it before an attacker could.' },
          { id: 'renamed', label: 'An older name for react-codemod', correct: false, feedback: 'Close, but no. The transforms belong to react-codemod. The React team never published anything as react-codeshift.' },
        ],
      },
      kit: {
        title: 'Your Fabrication Test Kit',
        footer: 'About a minute of checking. The command looked identical either way. Only the tests could tell the difference.',
      },
    },
  ],
};

// ============================================
// OBSERVE: 4 red flags + matching + method
// ============================================
const observe = {
  title: 'Red Flags',
  steps: [
    {
      type: 'cardGrid',
      heading: 'AI fabrications follow predictable patterns.',
      subtext: 'Security researchers analyzed thousands of AI responses. They found 4 red flags that appear again and again.',
      cards: [
        { emoji: '🏷️', label: 'Premium Suffix' },
        { emoji: '🎯', label: 'Perfect Match' },
        { emoji: '🔀', label: 'Naming Mixup' },
        { emoji: '🔗', label: 'Ecosystem Blend' },
      ],
    },
    {
      type: 'concept',
      emoji: '🏷️',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Premium Suffix',
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
      name: 'Perfect Match',
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
      name: 'Naming Mixup',
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
      name: 'Ecosystem Blend',
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
        { id: 'flag-1', emoji: '🏷️', label: 'Premium Suffix' },
        { id: 'flag-2', emoji: '🎯', label: 'Perfect Match' },
        { id: 'flag-3', emoji: '🔀', label: 'Naming Mixup' },
        { id: 'flag-4', emoji: '🔗', label: 'Ecosystem Blend' },
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
      name: '30-Second Check',
      tagline: 'One simple habit that catches most fabricated packages before they reach your machine.',
      steps: [
        { number: 1, action: 'Copy the exact name', detail: 'Not just part of it. The whole thing, exactly as AI wrote it', time: '2 seconds' },
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
// PRACTICE: Registry compare -> Practice set -> Toolkit -> Completion
// Registry data checked on pypi.org, pypistats.org and registry.npmjs.org
// in November 2026. Names used as made-up examples (requests-promax,
// react-drag-drop-pro, fastapi-auth-plus, json-turbo-validate,
// sklearn-learn, scikit) returned 404 at the time of writing.
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'registry',
      layout: 'compare',
      heading: 'Know Your Registry',
      subtext: 'A long-established package next to a made-up one. Learn to read the difference at a glance.',
      legit: {
        name: 'requests',
        version: '2.34.2',
        description: 'Python HTTP for Humans.',
        stats: {
          downloads: '1.2 billion last month',
          firstRelease: 'Feb 14, 2011',
          lastUpdate: 'May 14, 2026',
          versions: 163,
          maintainers: ['nateprewitt', 'graffatcolmingov', 'Lukasa'],
          repository: 'github.com/psf/requests',
        },
      },
      suspicious: {
        illustrative: true,
        name: 'requests-promax',
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
        title: 'Red Flags on requests-promax',
        items: [
          { label: '47 downloads' },
          { label: 'Created 3 days ago' },
          { label: 'No maintainer info' },
          { label: 'No repository' },
          { label: 'Single version' },
          { label: 'Famous name plus a suffix' },
        ],
      },
    },
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Six Different Checks',
        instruction: 'No two exercises are the same. Spot the invented part, read real registry output, pick the right test, and fix a broken install line.',
        note: 'Some AI answers here are completely fine. Checking an answer is not the same as distrusting it.',
      },
      items: [
        {
          id: 'p1-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'How do I parse a date string like \"3 March 2026\" in Python?'",
          prompt: 'Tap the part that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer', code: true },
          segments: [
            { text: 'Install python-dateutil:\n\n' },
            { text: 'pip install python-dateutil' },
            { text: '\n\nThen:\n\n' },
            { text: 'from dateutil import parser' },
            { text: '\n' },
            { text: 'parser.parse("3 March 2026")' },
          ],
          explanation: "Nothing is invented. python-dateutil has been on PyPI since 2008, with dozens of releases and a public repository (github.com/dateutil/dateutil). You install python-dateutil but import dateutil. That mismatch is normal and documented, so it isn't a red flag on its own. The registry settles it in seconds.",
          takeaway: 'A real package can still have an install name that differs from its import name',
        },
        {
          id: 'p1-spot-invented',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'What's a simple drag-and-drop library for React?'",
          prompt: 'Tap the part that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer' },
          segments: [
            { text: 'For simple drag and drop, ' },
            { text: 'react-drag-drop-pro', flag: true },
            { text: ' is a lightweight option. ' },
            { text: 'It works with React 18 and 19' },
            { text: ' and gives you two hooks, ' },
            { text: 'useDraggable() and useDroppable()' },
            { text: '.\n\nInstall it with: ' },
            { text: 'npm install react-drag-drop-pro', flag: true },
          ],
          explanation: "react-drag-drop-pro returns 404 on the npm registry. It doesn't exist. The hooks are real, though: useDraggable and useDroppable come from @dnd-kit/core, a real library. The AI attached a real API to an invented name, which is why it sounds right. An unclaimed name is a risk, because anyone can register it and wait for people to copy this command.",
          takeaway: 'A real API attached to an invented package name',
        },
        {
          id: 'p1-evidence-404',
          kind: 'choose',
          label: 'Read the evidence',
          context: 'You checked the name before installing it. This is the real output.',
          prompt: 'What does this tell you?',
          artifact: {
            label: 'Terminal',
            code: true,
            text: "$ npm view react-drag-drop-pro\nnpm error code E404\nnpm error 404 Not Found - GET https://registry.npmjs.org/react-drag-drop-pro - Not found\nnpm error 404  The requested resource 'react-drag-drop-pro@*' could not be found or you do not have permission to access it.",
          },
          options: [
            { id: 'down', label: 'The registry is having problems. Try again later.', feedback: 'An outage looks like a network or timeout error. A clean 404 for one name means the registry answered and there is no such package.' },
            { id: 'missing', label: "The package doesn't exist. Find the real library the AI meant.", correct: true, feedback: 'Right. Then search for what you actually need (here, @dnd-kit/core or react-dnd) and check that instead.' },
            { id: 'private', label: "It's a private package. Ask the AI for access.", feedback: 'The "permission" wording is generic npm text. The AI has no access to give you, and it invented the name in the first place.' },
            { id: 'pip', label: "It's probably a Python package. Try pip install.", feedback: 'The AI said npm and React. Switching registries until something installs is how people land on a squatted name.' },
          ],
          explanation: "A 404 is good news: you caught it before installing anything. Remember the name, though. If it shows up next month with one version and no repository, someone registered it because AIs keep recommending it.",
          takeaway: 'A 404 means the package does not exist, so go and find the real one',
        },
        {
          id: 'p1-evidence-page',
          kind: 'pickAll',
          label: 'Read the evidence',
          context: "The AI recommended 'fastapi-auth-plus' for login in FastAPI. You looked it up and the registry page shows this.",
          prompt: 'Which of these are warning signs?',
          artifact: {
            label: 'Registry page (illustrative)',
            text: 'fastapi-auth-plus 1.0.0\n"Official authentication add-on for FastAPI"\n\nFirst released: 2 days ago\nVersions: 1\nMaintainer: dev_9921\nRepository: none\nLicense: MIT\nREADME: install and quick-start sections',
          },
          options: [
            { id: 'official', label: '"Official", but the maintainer is not the FastAPI project', correct: true, feedback: 'Official FastAPI tools are published by the FastAPI project and linked from its docs. Anyone can type "Official".' },
            { id: 'age', label: 'First released 2 days ago, with 1 version', correct: true, feedback: 'A brand-new single release is what a squatter uploads, often right after a name starts appearing in AI answers.' },
            { id: 'repo', label: 'No repository linked', correct: true, feedback: 'No source to inspect and no history. You would be running code nobody can review.' },
            { id: 'license', label: 'MIT license', feedback: 'A license is a single text field. It tells you nothing about who published the package or why.' },
            { id: 'readme', label: 'Has a README with a quick-start', feedback: 'READMEs are easy to copy, or to generate with the same AI. A polished README proves nothing either way.' },
          ],
          explanation: 'Age, history, a source repository and a publisher you can identify are the signals that count. License and README are the cheapest parts to fake. This page and package are illustrative: the name was unregistered when we wrote this.',
          takeaway: 'Trust age, history, the repository and the publisher. Licenses and READMEs are easy to fake',
        },
        {
          id: 'p1-pick-test',
          kind: 'choose',
          label: 'Pick the test',
          context: "An AI tells you: 'Use json-turbo-validate. It's a drop-in replacement for ajv and 10x faster.'",
          prompt: 'What do you do first?',
          options: [
            { id: 'ask', label: 'Ask the AI for the GitHub link to confirm it exists', feedback: 'It can invent a link as easily as a name. A plausible URL is not evidence.' },
            { id: 'registry', label: 'Look up the exact name on npmjs.com, then open the repository and check who publishes it and since when', correct: true, feedback: 'This takes 30 seconds and settles it. (This name returned 404 when we checked.)' },
            { id: 'install', label: 'Install it in a branch and run your tests', feedback: "Installing runs the package's install scripts. A malicious package has already done its work before your tests start." },
            { id: 'google', label: 'Search for it. If there are results, it is fine.', feedback: "Search results can be other AI-written pages, or the squatter's own page. Results show that someone wrote about it, not that it's safe." },
          ],
          explanation: 'Check the registry before you install. Checking costs nothing, and once something is installed you can only clean up afterwards.',
          takeaway: 'Check the registry before installing, never after',
        },
        {
          id: 'p1-fix',
          kind: 'choose',
          label: 'Fix it',
          context: 'The AI wrote setup instructions for a machine learning notebook:',
          prompt: 'Which command should you run?',
          artifact: { label: 'AI answer', code: true, text: 'pip install sklearn pandas matplotlib' },
          optionsCode: true,
          options: [
            { id: 'asis', label: 'pip install sklearn pandas matplotlib', feedback: '"sklearn" on PyPI is a deprecated placeholder. Installing it raises an error that tells you to use scikit-learn.' },
            { id: 'real', label: 'pip install scikit-learn pandas matplotlib', correct: true, feedback: 'Right. The project is called scikit-learn on PyPI, even though you write "import sklearn".' },
            { id: 'learn', label: 'pip install sklearn-learn pandas matplotlib', feedback: 'An invented name. It returned 404 on PyPI when we checked, so it is free for anyone to register.' },
            { id: 'scikit', label: 'pip install scikit pandas matplotlib', feedback: 'Also not a real package (404 when we checked). Guessing at names is exactly the habit to avoid.' },
          ],
          explanation: "The scikit-learn maintainers registered 'sklearn' themselves so nobody malicious could take it, because people mix up the import name and the project name. Most look-alike names are not protected like this. When the install name and the import name might differ, check the registry or the official install docs.",
          takeaway: 'Install the project name (scikit-learn), not the import name (sklearn)',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Six out of six. You check before you install, and you can tell real warning signs from noise.' },
          { min: 4, message: 'Solid. Review the ones you missed: they are the mistakes people make under time pressure.' },
          { min: 0, message: 'This is why we practise. Go back over the explanations, then try the next pattern with the registry open in another tab.' },
        ],
      },
      summary: {
        insight: 'One answer was completely fine, one attached a real API to an invented name, and one failed because the install name differs from the import name. The skill is not suspecting everything. It is knowing which 30-second check settles each case.',
      },
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
          output: `requests (2.34.2)
Available versions: 2.34.2, 2.34.1, 2.34.0, 2.33.1, 2.33.0, 2.32.5, ...`,
          whatToLookFor: 'A long version history means an established package. An error saying no matching distribution was found means it doesn\'t exist. (pip only lists versions that support your Python version.)',
        },
        {
          title: 'View package details (Python)',
          ecosystem: 'pip',
          command: 'pip show requests',
          output: `Name: requests
Version: 2.34.2
Summary: Python HTTP for Humans.
Author-email: Kenneth Reitz <me@kennethreitz.org>
...`,
          whatToLookFor: 'Works on packages you already have installed. Check the summary and author match what you expected.',
        },
        {
          title: 'Check npm package (JavaScript)',
          ecosystem: 'npm',
          command: 'npm view lodash',
          output: `lodash@4.18.1 | MIT | deps: none | versions: 117
Lodash modular utilities.
https://lodash.com/
...
maintainers:
- jdalton <john.david.dalton@gmail.com>`,
          whatToLookFor: '117 versions, a known maintainer, a real website. A 404 means the package does not exist.',
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
        title: '30-Second Check',
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
      // NOTE: no `checklist` here on purpose. The phase-level keyTakeaways +
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
    'A 30-Second Check prevents installing malicious or non-existent packages',
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
  estimatedTime: 10,

  skillLearned: 'Verifying AI-recommended tools and packages',
  verificationMethod: '30-Second Check',

  caseStudy: {
    name: 'The react-codeshift incident: an AI-invented npm package spread by agent skills',
    date: 'January 2026',
    researcher: 'Charlie Eriksen, Aikido Security',
    source: 'https://www.aikido.dev/blog/agent-skills-spreading-hallucinated-npx-commands',
  },

  nextLesson: {
    id: 'pattern-02',
    title: 'Plausible Syntax',
    teaser: "Code that looks right but won't run.",
  },

  phases: { see, test, observe, practice },
};

export default lesson;
