// src/data/patterns/pattern-03-version-hallucination.js
// Pattern 03: Version Hallucination
//
// HOOK: "When AI suggests code from 2019"
// CASE STUDY: OpenAI Python SDK 1.0 migration (November 2023)
// TARGET: ~18 minutes total
//
// Authored in the block-based schema: each STOP phase is
// { title, estimatedTime, steps: [block, ...] } and every block is one screen.
// See docs/pattern-authoring-guide.md for the block vocabulary.

// ============================================
// SEE (3 min): Story -> Trust check -> Reveal
// ============================================
const see = {
  title: 'The Code That Used to Work',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'The code looked perfect. It just came from the past.',
      body: `Imagine you're adding an AI feature to a small Python project. You install the latest version of the official OpenAI library and ask an AI assistant to write the first call.

The answer comes back instantly, clean and confident:`,
    },
    {
      type: 'chat',
      user: 'How do I call a GPT model from Python with the openai package?',
      ai: {
        text: `Here's a simple example:

\`\`\`
import openai

openai.api_key = "YOUR_API_KEY"

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response["choices"][0]["message"]["content"])
\`\`\`

Just run this and you'll see the model's reply.`,
        note: 'Clean, short, well-formatted. Nothing about it looks wrong.',
      },
    },
    {
      type: 'choice',
      question: 'You just ran pip install openai today. Would you paste this in and run it?',
      subtext: "There's no wrong answer here. We're testing your instincts.",
      options: [
        { id: 'yes-ran-it', label: 'Yes, it looks standard', response: "Most people would. The code isn't gibberish. It was the correct way to do this, once." },
        { id: 'maybe-docs', label: "Maybe, but I'd skim the docs first", response: "Good instinct. The docs for your installed version are the tiebreaker." },
        { id: 'no-version', label: "No, I'd want to know which version this was written for", response: 'Exactly the question to ask. Hold that thought.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'That code targets a library version that no longer exists.',
      explanation: `The snippet isn't made up. It's real code that worked on older releases of the openai Python package. But it was written for the old interface, and the AI had no idea which version you installed.

On the current 1.x library, running it fails with an error saying that \`openai.ChatCompletion\` is no longer supported.`,
      list: {
        title: "Here's what actually happened:",
        items: [
          'OpenAI released version 1.0 of its Python SDK in November 2023, with a redesigned interface',
          'The old module-level call openai.ChatCompletion.create was removed',
          'The new style creates a client and calls client.chat.completions.create',
          'Tutorials, blog posts, and AI answers based on older data kept showing the old style, so people kept hitting the same error',
        ],
      },
    },
    {
      type: 'points',
      heading: 'Why is this one sneaky?',
      items: [
        { label: 'Annoying but harmless:', body: "The code throws an error right away. You lose time, then find the migration guide.", tone: 'neutral' },
        { label: 'Actually dangerous:', body: "Old APIs don't always fail loudly. Deprecated functions can linger for years, behave differently, or sit in libraries that no longer get security fixes. The code runs, so you assume it's fine.", tone: 'danger' },
      ],
      conclusion: "AI models learn from a snapshot of the past. Software keeps moving after that snapshot is taken. The AI can't feel the difference, so it won't warn you.",
      transition: "Let's test your instincts on code from different eras.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 snippets - Use it or Check first?
// ============================================
const test = {
  title: 'Current or Outdated?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 code suggestions from AI assistants.',
        instruction: 'For each one, decide: is it current for the version you have, or should you check the docs first?',
        note: "Don't look anything up yet. Go with your gut.",
        legend: {
          trust: { label: 'TRUST', detail: 'Matches current versions', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Might be outdated', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          code: true,
          prompt: 'import openai\nresponse = openai.ChatCompletion.create(\n    model="gpt-4",\n    messages=messages\n)',
          context: "Your project has openai 1.x installed. You asked: 'How do I send a chat request?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Outdated',
          explanation: 'OUTDATED. This is the pre-1.0 interface. On openai 1.x it raises an error. The current style is client = OpenAI() and client.chat.completions.create(...).',
          redFlag: 'Module-level openai.ChatCompletion call',
        },
        {
          id: 'item-2',
          code: true,
          prompt: "const buf = Buffer.from('hello', 'utf8');\nconsole.log(buf.toString('hex'));",
          context: "You're on a current version of Node.js. You asked: 'How do I turn a string into bytes?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Current',
          explanation: 'CURRENT. Buffer.from() is the recommended way to create a Buffer. The old new Buffer(...) constructor is the deprecated one.',
          meta: 'Documented in the Node.js Buffer API',
        },
        {
          id: 'item-3',
          code: true,
          prompt: "import ReactDOM from 'react-dom';\n\nReactDOM.render(<App />, document.getElementById('root'));",
          context: "Your project uses React 18 or newer. You asked: 'How do I mount my React app?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Outdated',
          explanation: 'OUTDATED. ReactDOM.render was deprecated in React 18 in favor of createRoot from react-dom/client, and newer React versions have removed it.',
          redFlag: 'ReactDOM.render on a modern React project',
        },
        {
          id: 'item-4',
          code: true,
          prompt: "from setuptools import setup\n\nsetup(\n    name='my-tool',\n    version='0.1.0',\n)",
          context: "You asked: 'How do I package my Python script?' on Python 3.12.",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Current',
          explanation: 'CURRENT. setuptools is the maintained packaging tool. Many projects now also configure it through pyproject.toml, but this import is valid.',
          meta: 'setuptools is actively maintained',
        },
        {
          id: 'item-5',
          code: true,
          prompt: 'from distutils.core import setup\n\nsetup(name="my-tool", version="0.1.0")',
          context: "You asked: 'How do I package my Python script?' on Python 3.12.",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Outdated',
          explanation: 'OUTDATED. The distutils module was removed from the standard library in Python 3.12 (PEP 632). In a clean 3.12 environment this import fails.',
          redFlag: 'distutils on Python 3.12',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You separated current from outdated in all 5. Let's make it harder." },
          { min: 4, message: '4 out of 5! Strong instincts. The patterns ahead will help with the one that slipped by.' },
          { min: 3, message: "3 out of 5. Outdated code looks just as polished as current code, which is exactly the problem." },
          { min: 0, message: "This is tricky, and that's the point. Old code doesn't look old. Let's learn what gives it away." },
        ],
      },
      summary: {
        insight: "In this batch, 3 of 5 suggestions were written for older versions. None of them looked broken. Version problems hide behind perfectly clean formatting.",
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
      heading: 'Outdated suggestions leave predictable fingerprints.',
      subtext: "You don't need to memorize every API change. You need to recognize these 4 signals.",
      cards: [
        { emoji: '📦', label: 'The Old Import' },
        { emoji: '📼', label: 'The Vintage Tutorial Style' },
        { emoji: '❓', label: 'Missing Version Context' },
        { emoji: '⚠️', label: "The Warning You Didn't Read" },
      ],
    },
    {
      type: 'concept',
      emoji: '📦',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Old Import',
      description: 'The suggestion uses an import, function, or install syntax that the library has since replaced or removed.',
      compare: {
        left: {
          label: '❌ Older style (check these):',
          tone: 'danger',
          items: ['openai.ChatCompletion.create', 'ReactDOM.render(...)', 'new Buffer(10)', 'from distutils.core import setup'],
        },
        right: {
          label: '✓ Current replacements:',
          tone: 'good',
          items: ['client.chat.completions.create', 'createRoot(...).render(...)', 'Buffer.alloc(10)', 'from setuptools import setup'],
        },
      },
      why: "AI learned from years of tutorials. Old APIs appeared in far more articles than the newest ones, so the old way often feels like the 'normal' way.",
      spot: "If a function or import looks unfamiliar next to the current docs, or you've seen an upgrade guide for that library, check it.",
    },
    {
      type: 'concept',
      emoji: '📼',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Vintage Tutorial Style',
      description: "The code works, but it's written in the style of a previous era of the language or framework.",
      rows: [
        { label: 'Older style:', variant: 'code', tone: 'danger', value: 'class Clock extends React.Component { componentWillMount() {...} }' },
        { label: 'Current style:', variant: 'code', tone: 'good', value: 'function Clock() { useEffect(() => {...}, []); }' },
      ],
      note: 'Other vintage tells: var instead of let/const, deeply nested callbacks instead of async/await, string concatenation instead of f-strings or template literals.',
      why: 'Style trends change. An answer in an older style often means it was assembled from older sources, and the APIs underneath may be older too.',
      spot: 'If the style feels like a 2016 blog post, check which version of the framework the idiom belongs to.',
    },
    {
      type: 'concept',
      emoji: '❓',
      eyebrow: 'Red Flag 3 of 4',
      name: 'Missing Version Context',
      description: 'The AI never says which version its answer applies to, and never asks which one you use.',
      rows: [
        { label: 'You asked:', variant: 'quote', tone: 'neutral', value: 'How do I call the OpenAI API in Python?' },
        { label: 'AI answered:', variant: 'quote', tone: 'danger', value: 'Here is the code. (No mention of which SDK version, no question about yours.)' },
      ],
      note: 'A trustworthy answer states its assumptions: "This is for openai 1.x. Which version do you have?"',
      why: "The AI can't see your machine. Unless you tell it your versions, it blends everything it has seen into one confident answer.",
      spot: 'If the answer does not mention a version and the library has changed a lot, assume it needs checking. Better: tell the AI your versions up front.',
    },
    {
      type: 'concept',
      emoji: '⚠️',
      eyebrow: 'Red Flag 4 of 4',
      name: "The Warning You Didn't Read",
      description: "The code runs, but your terminal or editor prints a deprecation warning, and it gets ignored.",
      rows: [
        { label: 'Your terminal says:', variant: 'code', tone: 'danger', value: 'DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version.' },
        { label: 'Warnings often mention:', variant: 'chips', tone: 'neutral', values: ['deprecated', 'scheduled for removal', 'use X instead', 'no longer supported'] },
      ],
      note: 'The warning usually names its own replacement. That is a free changelog entry.',
      why: "Deprecated doesn't mean broken today. It means broken later, often after an upgrade you didn't plan for.",
      spot: 'If the output has the word deprecated, stop and read it. Ask the AI to rewrite the code using the replacement it names.',
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each situation, identify which red flag it shows:',
      options: [
        { id: 'flag-1', emoji: '📦', label: 'The Old Import' },
        { id: 'flag-2', emoji: '📼', label: 'The Vintage Tutorial Style' },
        { id: 'flag-3', emoji: '❓', label: 'Missing Version Context' },
        { id: 'flag-4', emoji: '⚠️', label: "The Warning You Didn't Read" },
      ],
      items: [
        { prompt: "ReactDOM.render(<App />, root) in a new React 18+ project", correct: 'flag-1', explanation: 'The render call itself is the replaced API.' },
        { prompt: "An answer full of var declarations and nested callbacks for a 2025 Node project", correct: 'flag-2', explanation: 'The idioms are from an older era of JavaScript.' },
        { prompt: "An answer about a fast-changing library that never mentions a version", correct: 'flag-3', explanation: 'No version stated, and none requested.' },
        { prompt: "Terminal prints 'is deprecated and will be removed', and you ignore it", correct: 'flag-4', explanation: 'The tool already told you. Read the warning.' },
        {
          prompt: "Buffer.from('hi', 'utf8') in Node.js",
          correct: 'trick-question',
          explanation: "Trick question! This is the current recommended API. It's the old new Buffer() constructor that is deprecated.",
          extra: { id: 'trick-question', label: "✓ It's actually current" },
        },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'The Changelog Check',
      tagline: 'Match the AI answer to YOUR version, not the version it imagined.',
      steps: [
        { number: 1, action: 'Find your installed version', detail: "Don't guess. Ask your tools: pip show <package>, npm ls <package>, node --version, python --version", time: '10 seconds' },
        { number: 2, action: 'Open the official docs for THAT version', detail: "Use the version switcher on the docs site, or the tag/release page on GitHub. Skip blog posts and old Q&A answers.", time: '15 seconds' },
        { number: 3, action: 'Search for the exact function or import', detail: 'Paste the exact name the AI used. Does the current reference page for it exist and look the same?', time: '15 seconds' },
        { number: 4, action: 'Look for deprecation notes or a migration guide', detail: "Scan for 'deprecated', 'removed in', 'migration', 'breaking changes'. If you find one, ask the AI to rewrite using the replacement.", time: '30 seconds' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'The exact function appears in the docs for your version',
            'Examples in the docs look like the AI snippet',
            'No deprecation banner on the page',
            'Release notes show it was recently updated or kept',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            "The page says 'deprecated' or 'removed in vX'",
            'A migration guide exists for the library',
            "You can't find the function in the current reference",
            'The answer only matches older blog posts or answers',
          ],
        },
      },
      footer: 'A version check takes about a minute. Debugging a snippet written for the wrong version can take an afternoon.',
    },
  ],
};

// ============================================
// PRACTICE (6 min): Drill -> Toolkit -> Completion
// ============================================
const practice = {
  title: 'Your Turn',
  estimatedTime: 6,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Practice Drill: harder calls',
        instruction: 'Five more suggestions, with subtler problems. Decide whether to use each one or check the docs first.',
        note: 'Use the red flags you just learned. Pay attention to the version in each context line.',
        legend: {
          trust: { label: 'TRUST', detail: 'Current for your version', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Might be outdated', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'drill-1',
          code: true,
          prompt: 'df = df.append(new_row, ignore_index=True)',
          context: "You're using pandas 2.x. You asked: 'How do I add a row to a DataFrame?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Outdated',
          explanation: 'OUTDATED. DataFrame.append was deprecated and then removed in pandas 2.0. The usual replacement is pd.concat.',
          redFlag: 'A method removed in the major version you installed',
        },
        {
          id: 'drill-2',
          code: true,
          prompt: 'df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)',
          context: "You're using pandas 2.x. Same question: 'How do I add a row to a DataFrame?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Current',
          explanation: 'CURRENT. pd.concat is the supported way to combine DataFrames. (If you add many rows, build a list first and create the DataFrame once.)',
          meta: 'Documented in the pandas user guide',
        },
        {
          id: 'drill-3',
          code: true,
          prompt: 'arr = np.zeros(5, dtype=np.float)',
          context: "You have NumPy 1.24 or newer. You asked: 'How do I make an array of floats?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Outdated',
          explanation: 'OUTDATED. The np.float alias was deprecated and removed in NumPy 1.24. Use the built-in float or np.float64.',
          redFlag: 'Removed aliases like np.float and np.int',
        },
        {
          id: 'drill-4',
          prompt: "To start a new React app, run: npx create-react-app my-app",
          context: "You asked in 2025: 'What's the best way to start a new React project?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Outdated',
          explanation: "OUTDATED. The React team deprecated Create React App in 2025 and recommends a framework or a modern build tool such as Vite for new projects. The command may still run, which makes it easy to miss.",
          redFlag: "A tool that still works, but is no longer the recommended path",
        },
        {
          id: 'drill-5',
          code: true,
          prompt: 'from datetime import datetime, timezone\n\nnow = datetime.now(timezone.utc)',
          context: "You're on Python 3.12. You asked: 'How do I get the current UTC time?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Current',
          explanation: 'CURRENT. datetime.utcnow() is deprecated since Python 3.12 because it returns a naive datetime. datetime.now(timezone.utc) is the recommended timezone-aware form.',
          meta: 'Recommended in the Python datetime docs',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Flawless. You're reading context lines and spotting version drift quickly." },
          { min: 4, message: "4 out of 5. You're on the right track. Slow down on the 'still works' cases." },
          { min: 3, message: "3 out of 5. Notice how often the hint was in the version number. Always check it first." },
          { min: 0, message: "These are hard. Run the Changelog Check on each one and see what the docs say." },
        ],
      },
      summary: {
        insight: "Version problems come in three flavors: removed (it breaks), deprecated (it works for now), and superseded (it works, but nobody recommends it). All three need the same check: your version, the official docs, the exact function.",
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick commands and techniques to find out which version you have and whether an API is still current. Outputs below are illustrative examples.',
      commands: [
        {
          title: 'Find your installed Python package version',
          ecosystem: 'pip',
          command: 'python -m pip show openai',
          output: `Name: openai
Version: 1.x.y
Summary: The official Python library for the openai API
Home-page: https://github.com/openai/openai-python`,
          whatToLookFor: "The Version line is your source of truth. Use 'python -m pip' so you check the same Python you run.",
        },
        {
          title: 'Find your installed npm package version',
          ecosystem: 'npm',
          command: 'npm ls react',
          output: `my-app@1.0.0
└── react@18.x.y`,
          whatToLookFor: 'The exact version in your project. Also check node --version for the runtime itself.',
        },
        {
          title: 'Turn deprecations into visible errors',
          ecosystem: 'cli',
          command: 'python -W error::DeprecationWarning your_script.py',
          output: `Traceback (most recent call last):
  ...
DeprecationWarning: datetime.datetime.utcnow() is deprecated ...`,
          whatToLookFor: "Any DeprecationWarning names the old API and usually its replacement. In Node, 'node --trace-deprecation app.js' shows where a deprecated call originated.",
        },
        {
          title: 'Read the official docs for your version',
          ecosystem: 'web',
          command: "Open the library's docs, pick YOUR version, search the exact function name",
          output: '[Look for deprecation banners, "removed in" notes, and a migration guide]',
          whatToLookFor: "Docs for the latest version can differ from yours. Also check the GitHub 'Releases' or CHANGELOG page for breaking changes.",
        },
      ],
      quickReference: {
        title: 'The Changelog Check',
        steps: [
          'Find your installed version (pip show, npm ls, --version)',
          'Open the official docs for THAT version',
          'Search the exact function or import the AI used',
          "Look for 'deprecated', 'removed', or a migration guide",
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Version Hallucination',
      summary: "You can now spot when AI hands you code from the wrong era. You know the four red flags, you've practiced reading version context, and you have a repeatable way to check a suggestion against your version.",
      // NOTE: no `checklist` here on purpose; the phase-level keyTakeaways +
      // checklist below are rendered by LessonShell's final screen.
      next: { label: 'Up Next', body: "Pattern 4 looks at fake sources. In a well-known 2023 federal court case, lawyers filed a brief citing court cases that an AI had made up. Learn to catch citations that never existed." },
    },
  ],

  keyTakeaways: [
    "AI learns from a snapshot of the past, so it can confidently recommend APIs that have since been deprecated or removed",
    'Red flags: the old import, vintage tutorial style, missing version context, and ignored deprecation warnings',
    'Deprecated code often runs today and breaks after an upgrade, so a working result is not proof it is current',
    'Tell the AI your versions up front, and ask it which version its answer targets',
    'The Changelog Check: your version, the docs for that version, the exact function, the migration notes',
  ],
  checklist: {
    title: 'Your Version Check Checklist',
    items: [
      'Do I know which version of the library or runtime I actually have?',
      'Did the AI say which version its answer is written for?',
      'Does the exact function or import appear in the docs for MY version?',
      'Is there a deprecation note, "removed in" notice, or migration guide?',
      'Does the code style look older than my framework version?',
      'Did I read every deprecation warning in my terminal output?',
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-03',
  patternNumber: 3,
  title: 'Version Hallucination',
  subtitle: 'Deprecated APIs recommended as current',
  description: 'Learn to spot when AI suggests code, commands, or APIs from an older version of a library: when AI suggests code from 2019.',
  estimatedTime: 15,

  skillLearned: 'Checking AI-suggested code against your installed version',
  verificationMethod: 'The Changelog Check',

  caseStudy: {
    name: 'The OpenAI Python SDK 1.0 migration',
    date: 'November 2023',
    researcher: 'openai-python maintainers (migration guide)',
    source: 'https://github.com/openai/openai-python/discussions/742',
  },

  nextLesson: {
    id: 'pattern-04',
    title: 'Phantom Citation',
    teaser: 'Sources that never existed.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
