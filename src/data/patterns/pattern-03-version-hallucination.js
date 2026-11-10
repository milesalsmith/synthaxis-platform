// src/data/patterns/pattern-03-version-hallucination.js
// Pattern 03: Version Hallucination
//
// HOOK: "When AI pins a version from the past"
// CASE STUDY: "Correct Code, Vulnerable Dependencies" (PinTrace study, arXiv, May 2026)
//   + OpenAI Developer Community thread acknowledged by OpenAI Support (April 2026)
// TARGET: about 10 minutes total
//
// Authored in the block-based schema: each STOP phase is
// { title, steps: [block, ...] } and every block is one screen.
// See docs/pattern-authoring-guide.md for the block vocabulary.

// ============================================
// SEE: Story -> Trust check -> Reveal
// ============================================
const see = {
  title: 'Code That Used to Work',
  steps: [
    {
      type: 'prose',
      heading: 'The code was fine. The version numbers were not.',
      body: `In April 2026, a developer posted on OpenAI's own Developer Community forum: when ChatGPT writes Python code that uses third-party libraries, it "consistently recommends older version numbers", often a year or more behind the latest release, and many of them have known security vulnerabilities (CVEs).

The examples were everyday ones. Ask for a small Flask API and the dependency list comes back looking something like this:`,
    },
    {
      type: 'chat',
      user: 'Write me a small Flask API that calls an external service, plus a requirements.txt.',
      ai: {
        text: `Here's a minimal setup. Pin these versions so your installs are reproducible:

\`\`\`
# requirements.txt
flask==3.1.2
requests==2.31.0
\`\`\`

Then run pip install -r requirements.txt and start the app with flask run.`,
        note: 'Reconstruction, not a verbatim transcript. The pinned versions are the ones named in the April 2026 forum post and in the May 2026 PinTrace study.',
      },
    },
    {
      type: 'choice',
      question: 'The install succeeds and the app runs. Would you commit this requirements.txt as is?',
      subtext: "There's no wrong answer here. Go with what you would really do.",
      options: [
        { id: 'yes-ran-it', label: 'Yes, it installs and works', response: "Most people would. Nothing failed, and pinning versions sounds responsible. That's exactly why this slips through." },
        { id: 'maybe-docs', label: "Maybe, but I'd check the latest release first", response: "Good instinct. The package's own release page is the tiebreaker, not the AI's memory." },
        { id: 'no-version', label: "No, I'd want to know why it chose those exact versions", response: 'Exactly the question to ask. Hold that thought.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'Those pins point to versions with known vulnerabilities.',
      explanation: `Nothing here is made up. flask 3.1.2 and requests 2.31.0 are real, published releases. But the AI picked them because they were common in its training data, not because they are safe today.

For example, requests versions before 2.32.0 are affected by CVE-2024-35195, a certificate-verification bug published in May 2024. The fix had been out for well over a year when these pins were still being suggested.`,
      list: {
        title: "Here's what actually happened:",
        items: [
          'April 2026: on the OpenAI Developer Community forum, a user reported ChatGPT pinning flask==2.3.3, flask==3.1.2, requests==2.31.0 and django==6.0.1, all with CVEs on osv.dev',
          'OpenAI Support replied that "there\'s no built-in CVE check when suggesting versions, so this gap shows up across models", and said it would pass the feedback to the team',
          'May 2026: the PinTrace study tested 10 models, including GPT-5.4, Claude Sonnet 4.6 and Gemini 3.1 Pro, on 1,000 real Stack Overflow tasks',
          'The models converged on the same small set of risky versions: the most common vulnerable pins showed up in at least 9 of the 10 models, and 75% of the requests pins were 2.31.0',
        ],
      },
    },
    {
      type: 'stats',
      title: 'What the study found',
      items: [
        { value: '36.7-55.7%', label: 'Tasks with a vulnerable pin', detail: 'at least one known CVE, depending on the model' },
        { value: '72-91%', label: 'Already public', detail: "of those CVEs were disclosed before the model's training cutoff" },
        { value: '10 of 10', label: 'Models affected', detail: 'closed and open models alike' },
      ],
      source: 'Wang et al., "Correct Code, Vulnerable Dependencies", arXiv:2605.06279, May 2026',
    },
    {
      type: 'points',
      heading: 'Why is this one sneaky?',
      items: [
        { label: 'Annoying but harmless:', body: "An old pin clashes with your Python version or other packages and the install fails. You lose time, but you know something is wrong. The study found install failure was the most common compatibility problem.", tone: 'neutral' },
        { label: 'Actually dangerous:', body: "The install succeeds, the code runs, and there is no warning. The known vulnerability ships with your project, and nobody thinks to audit a dependency list the AI just wrote.", tone: 'danger' },
      ],
      conclusion: "AI models learn from a snapshot of the past, and the most-repeated version in that snapshot wins. Software keeps moving after the snapshot is taken. The AI can't feel the difference, so it won't warn you.",
      transition: "So how would you have caught it? Let's go back to that requirements.txt and test it properly.",
    },
  ],
};

// ============================================
// TEST: Spot what to test -> Run the tests on the pins
// ============================================
const test = {
  title: 'Testing the Pins',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'Before you commit it, look at what the AI actually wrote.',
      instruction: 'Tap the parts of this answer you would want to test. Some parts are fine. Some are exactly where the problem hides.',
      source: 'From the AI answer',
      code: true,
      segments: [
        { text: "Here's a minimal setup.", note: 'An ordinary intro. Nothing to check here.' },
        { text: ' ' },
        { text: 'Pin these versions so your installs are reproducible:', flag: { label: 'Advice that locks in its own numbers', explanation: 'Pinning is good practice, which is why this sounds responsible. But a pin only freezes whatever version was picked. If the AI picked an old one from memory, you now reproduce that old version on every install.' } },
        { text: '\n\n' },
        { text: '# requirements.txt', note: 'The standard file name and comment. Familiar format, nothing to test.' },
        { text: '\n' },
        { text: 'flask', note: 'The right package for a Flask API, spelled correctly. The name is real.' },
        { text: '==3.1.2', flag: { label: 'An exact version from memory', explanation: 'The AI cannot see PyPI. This number is whatever version showed up most in its training data. Is it the latest? Does it have known security issues? Only a lookup can tell you.' } },
        { text: '\n' },
        { text: 'requests', note: 'The standard Python HTTP library. A real, widely used package.' },
        { text: '==2.31.0', flag: { label: 'Most repeated pin of all', explanation: 'In the PinTrace study, 75% of the requests pins were 2.31.0. A version that popular in old code is exactly the one an AI will repeat, whether or not it is still safe.' } },
        { text: '\n\n' },
        { text: 'Then run pip install -r requirements.txt', note: 'A correct command. But a successful install only proves these versions exist. It says nothing about whether they are current or safe.' },
        { text: ' and start the app with flask run.', note: 'Also correct. The app running is a surface signal, not a security check.' },
      ],
      summary: 'Two questions to test: how old are these pins, and do they carry known vulnerabilities? Then find out what you should pin instead. Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'The install worked and the app runs. You have a terminal, a browser, and a couple of minutes. Which tests actually tell you whether these pins are safe to commit?',
      claim: {
        label: 'requirements.txt',
        text: 'flask==3.1.2\nrequests==2.31.0',
        code: true,
      },
      rounds: [
        {
          title: 'Test 1: How old is the pin?',
          question: 'What do you check first?',
          options: [
            {
              id: 'ask-ai',
              label: 'Ask the AI: "Is requests 2.31.0 the latest stable version?"',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'Yes, 2.31.0 is a stable, widely used release of requests...',
              feedback: 'The AI is answering from the same snapshot that produced the pin. It cannot see releases that came out after its training data, so it will often agree with itself.',
            },
            {
              id: 'pypi',
              label: 'Look up the released versions: pip index versions requests (or the PyPI page)',
              useful: true,
              resultLabel: 'PyPI (checked Nov 2026)',
              result: 'requests  latest: 2.34.2 (14 May 2026)\n          pinned: 2.31.0 (22 May 2023)\n          11 releases since the pin\n\nflask     latest: 3.1.3 (19 Feb 2026)\n          pinned: 3.1.2 (19 Aug 2025)',
              feedback: 'The requests pin dates from May 2023, about three and a half years ago, and is 11 releases behind. Flask is one release behind. An old pin is not automatically dangerous, but it is your cue to check what changed.',
              kit: 'Look up the latest release on PyPI (pip index versions <name>, or pypi.org)',
            },
            {
              id: 'installs',
              label: 'Run pip install and check it finishes without errors',
              useful: false,
              feedback: 'It already did. PyPI keeps old releases available forever, so an install only proves the version exists. Vulnerable versions install just as cleanly as fixed ones.',
            },
          ],
        },
        {
          title: 'Test 2: Is it known to be vulnerable?',
          question: 'The pins are old. How do you find out whether that matters?',
          options: [
            {
              id: 'osv',
              label: 'Look up requests 2.31.0 in a vulnerability database (osv.dev)',
              useful: true,
              resultLabel: 'osv.dev for requests 2.31.0 (checked Nov 2026)',
              result: 'GHSA-9wx4-h78v-vm56  CVE-2024-35195  fixed in 2.32.0\n  Session does not verify requests after a first request with verify=False\nGHSA-9hjg-9r4m-mvj7  CVE-2024-47081  fixed in 2.32.4\n  .netrc credentials leak via malicious URLs\nGHSA-gc5v-m9x4-r6x2  CVE-2026-25645  fixed in 2.33.0\n  Insecure temp file reuse in extract_zipped_paths()',
              feedback: 'Three published advisories, all with fixes available. This is the evidence the AI never checked. OpenAI Support said as much: there is no built-in CVE check when it suggests versions.',
              kit: 'Check the exact pinned version against a vulnerability database (osv.dev, GitHub advisories)',
            },
            {
              id: 'pip-audit',
              label: 'Run pip-audit -r requirements.txt',
              useful: true,
              resultLabel: 'pip-audit (layout illustrative; advisories are the real ones on osv.dev, Nov 2026)',
              result: 'Found 4 known vulnerabilities in 2 packages\nName     Version ID                  Fix Versions\nflask    3.1.2   GHSA-68rp-wp8r-4726 3.1.3\nrequests 2.31.0  GHSA-9wx4-h78v-vm56 2.32.0\nrequests 2.31.0  GHSA-9hjg-9r4m-mvj7 2.32.4\nrequests 2.31.0  GHSA-gc5v-m9x4-r6x2 2.33.0',
              feedback: 'One command checks the whole file, including the Flask pin, which has its own advisory (CVE-2026-27205, fixed in 3.1.3). This is the check you can also run in CI so it happens every time.',
              kit: 'Audit the whole file with pip-audit -r requirements.txt',
            },
            {
              id: 'popular',
              label: 'Check how common the pin is. If thousands of projects use 2.31.0, it must be fine.',
              useful: false,
              feedback: 'Popularity is the cause of the problem, not proof of safety. 2.31.0 is common because lots of code was written before the fixes. That is exactly why the models in the PinTrace study kept repeating it.',
            },
          ],
        },
        {
          title: 'Test 3: What should you pin instead?',
          question: 'You still want pinned versions. How do you pick the right ones?',
          options: [
            {
              id: 'first-fix',
              label: 'Bump requests to 2.32.0, the version that fixed CVE-2024-35195',
              useful: false,
              resultLabel: 'osv.dev for requests 2.32.0 (checked Nov 2026)',
              result: 'GHSA-9hjg-9r4m-mvj7  CVE-2024-47081  fixed in 2.32.4\nGHSA-gc5v-m9x4-r6x2  CVE-2026-25645  fixed in 2.33.0',
              feedback: 'Fixing one advisory is not the same as being safe. 2.32.0 still has two later advisories. Check the version you are moving to, not just the one you are leaving.',
            },
            {
              id: 'changelog',
              label: "Read the project's changelog for the security fixes",
              useful: true,
              resultLabel: 'From the requests release history',
              result: '2.32.0 (2024-05-20)\n**Security**\n- Fixed an issue where setting `verify=False` on the first request\n  from a Session will cause subsequent requests to the _same origin_\n  to also ignore cert verification, regardless of the value of `verify`.',
              feedback: 'The primary source tells you what was fixed and when. It also shows the fix had been public since May 2024, long before the AI kept suggesting 2.31.0.',
              kit: "Read the project's own changelog or advisory for the fix version",
            },
            {
              id: 'recheck',
              label: 'Pin the current releases from PyPI, then check them again',
              useful: true,
              resultLabel: 'osv.dev (checked Nov 2026)',
              result: 'requests 2.34.2  no known vulnerabilities\nflask    3.1.3   no known vulnerabilities',
              feedback: 'Take the numbers from the registry, not from the AI, and run the same check on the new pins. Then keep running it: new advisories get published against old versions all the time.',
              kit: 'Pin versions taken from the registry, then re-run the audit on the new pins',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what is requests==2.31.0?',
        options: [
          { id: 'invented', label: 'A version the AI made up', correct: false, feedback: 'No. 2.31.0 is a real release, published on PyPI in May 2023. That is what makes this pattern tricky: nothing in the file is fake.' },
          { id: 'outdated', label: 'A real but outdated release with known, already-fixed vulnerabilities', correct: true, feedback: 'Right. The AI repeated the version that was most common in its training data. It installs and runs, but three advisories have been published against it, and fixed releases have been out for years.' },
          { id: 'safe', label: 'A safe choice, because it is stable and installs without errors', correct: false, feedback: 'Stable and installable is not the same as safe. The install worked because PyPI keeps old releases. The vulnerability database is what tells you about safety.' },
        ],
      },
      kit: {
        title: 'Your Version Hallucination Test Kit',
        footer: 'A few minutes of checking. The requirements.txt looked identical either way. Only the lookups showed the difference.',
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
      heading: 'Outdated suggestions leave predictable fingerprints.',
      subtext: "You don't need to memorize every API change. You need to recognize these 4 signals.",
      cards: [
        { emoji: '📦', label: 'Old Import' },
        { emoji: '📼', label: 'Vintage Tutorial Style' },
        { emoji: '❓', label: 'Missing Version Context' },
        { emoji: '⚠️', label: "Warning You Didn't Read" },
      ],
    },
    {
      type: 'concept',
      emoji: '📦',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Old Import',
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
      name: 'Vintage Tutorial Style',
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
      note: 'A trustworthy answer states its assumptions: "This is for openai 1.x. Which version do you have?" The same goes for pinned versions: an AI that writes requests==2.31.0 is quoting its memory, not checking the latest release. OpenAI Support confirmed in April 2026 that there is no built-in CVE check when ChatGPT suggests versions.',
      why: "The AI can't see your machine. Unless you tell it your versions, it blends everything it has seen into one confident answer.",
      spot: 'If the answer does not mention a version and the library has changed a lot, assume it needs checking. Better: tell the AI your versions up front.',
    },
    {
      type: 'concept',
      emoji: '⚠️',
      eyebrow: 'Red Flag 4 of 4',
      name: "Warning You Didn't Read",
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
        { id: 'flag-1', emoji: '📦', label: 'Old Import' },
        { id: 'flag-2', emoji: '📼', label: 'Vintage Tutorial Style' },
        { id: 'flag-3', emoji: '❓', label: 'Missing Version Context' },
        { id: 'flag-4', emoji: '⚠️', label: "Warning You Didn't Read" },
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
      name: 'Changelog Check',
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
// PRACTICE: Practice set -> Toolkit -> Completion
// Checked in November 2026: NumPy 2.0.2, pandas 2.3.3, Python 3.12 and
// Node 26 output by running the code; jinja2 3.1.2 advisories on osv.dev;
// React release notes and the Vite docs for the other claims.
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Right Code, Wrong Era',
        instruction: 'Six short exercises. Spot the outdated line, read a real warning, pick the right check, and update an old command.',
        note: 'Some suggestions here are current. Checking the version is not the same as distrusting the answer.',
      },
      items: [
        {
          id: 'p3-spot-numpy',
          kind: 'spot',
          label: 'Spot it',
          context: "You have NumPy 2.x. You asked: 'Make an array of five zeros, as floats.'",
          prompt: 'Tap the part that is outdated, or tell us nothing is.',
          artifact: { label: 'AI answer (illustrative)', code: true },
          segments: [
            { text: 'import numpy as np' },
            { text: '\n\n' },
            { text: 'arr = np.zeros(' },
            { text: '5' },
            { text: ', ' },
            { text: 'dtype=np.float', flag: true },
            { text: ')' },
            { text: '\n' },
            { text: 'print(arr.shape)' },
          ],
          explanation: "np.float was only an alias for Python's built-in float. NumPy deprecated it in 1.20 and removed it in 1.24, so this line raises AttributeError on any current NumPy. The error message names the fix itself: use float, or np.float64. Years of tutorials used np.float, which is why the AI repeats it.",
          takeaway: 'Old aliases like np.float are gone from current NumPy',
        },
        {
          id: 'p3-evidence-warning',
          kind: 'choose',
          label: 'Read the evidence',
          context: 'Your script runs on Python 3.12 and prints this. The output is real.',
          prompt: 'What does this tell you?',
          artifact: {
            label: 'Terminal',
            code: true,
            text: '$ python3.12 report.py\nreport.py:4: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).\n  now = datetime.utcnow()\nReport saved.',
          },
          options: [
            { id: 'ignore', label: 'It is only a warning and the report saved. Nothing to do.', feedback: 'It works today. "Scheduled for removal" means a future Python upgrade turns this line into a crash.' },
            { id: 'switch', label: 'The call still works but is on its way out. Switch to the replacement the warning names.', correct: true, feedback: 'Right. datetime.now(datetime.UTC), or datetime.now(timezone.utc), gives you the same moment with the timezone attached.' },
            { id: 'broken', label: 'The script is broken and the report is wrong.', feedback: 'Not yet. The value is still the current UTC time, just with no timezone attached. Deprecated means working, but on notice.' },
            { id: 'ask', label: 'Ask the AI whether utcnow() is still fine to use.', feedback: 'The warning comes from Python itself. It has already answered, and named the fix.' },
          ],
          explanation: 'A deprecation warning is a free changelog entry: what is going away and what replaces it. utcnow() is deprecated since Python 3.12 because it returns a datetime with no timezone, which is easy to confuse with local time.',
          takeaway: 'Read deprecation warnings. They name their own replacement',
        },
        {
          id: 'p3-pick-pin',
          kind: 'choose',
          label: 'Pick the test',
          context: "For a Flask app, the AI's requirements.txt includes jinja2==3.1.2. It installs and the app runs.",
          prompt: 'Which check tells you fastest whether this pin is safe to commit?',
          options: [
            { id: 'ask', label: 'Ask the AI: "Does jinja2 3.1.2 have any known vulnerabilities?"', feedback: 'It answers from the same training snapshot that produced the pin. OpenAI Support has said there is no built-in CVE check when it suggests versions.' },
            { id: 'popular', label: 'Search GitHub. If thousands of projects pin 3.1.2, it is fine.', feedback: 'Old pins are popular because lots of code was written before the fixes. That is exactly why AIs repeat them.' },
            { id: 'audit', label: 'Run pip-audit -r requirements.txt, or look the version up on osv.dev', correct: true, feedback: 'Right. When we checked osv.dev in November 2026, jinja2 3.1.2 had five published advisories, all fixed by 3.1.6.' },
            { id: 'tests', label: 'Run the test suite. If it passes, the pin is fine.', feedback: 'Tests check behaviour, not security advisories. A vulnerable version passes your tests just as well as a fixed one.' },
          ],
          explanation: 'jinja2 3.1.2 is a real release from April 2022. It installs and runs, and osv.dev lists five advisories against it, starting with CVE-2024-22195. A vulnerability lookup is the only option here that tests safety, and it takes seconds.',
          takeaway: 'Installs and passes tests is not the same as safe. Check osv.dev',
        },
        {
          id: 'p3-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You're on pandas 2.x. You asked: 'How do I add a row to a DataFrame?'",
          prompt: 'Tap the part that is outdated, or tell us nothing is.',
          artifact: { label: 'AI answer', code: true },
          segments: [
            { text: 'import pandas as pd' },
            { text: '\n\n' },
            { text: "new_row = {'city': 'Leeds', 'sales': 120}" },
            { text: '\n' },
            { text: 'df = pd.concat(' },
            { text: '[df, pd.DataFrame([new_row])]' },
            { text: ', ' },
            { text: 'ignore_index=True' },
            { text: ')' },
          ],
          explanation: 'Nothing is outdated. pd.concat is the supported way to combine DataFrames in pandas 2.x, which removed the old df.append. Wrapping the dict in a list makes a one-row DataFrame, and ignore_index=True renumbers the rows. We ran it on pandas 2.3.3. If you add many rows, collect them in a list and build the DataFrame once.',
          takeaway: 'Current code exists too. Knowing your version makes it quick to confirm',
        },
        {
          id: 'p3-diagnose',
          kind: 'pickAll',
          label: 'Diagnose',
          context: 'Your project runs Python 3.12, Node 22 and React 19.',
          prompt: 'Which suggestions need updating before you use them?',
          optionsCode: true,
          options: [
            { id: 'render', label: "ReactDOM.render(<App />, document.getElementById('root'));", correct: true, feedback: "Deprecated in React 18 and removed in React 19. Use createRoot(...).render(<App />) from 'react-dom/client'." },
            { id: 'alloc', label: 'const buf = Buffer.alloc(10);', feedback: 'The current Node API. It is the replacement for new Buffer(10).' },
            { id: 'distutils', label: 'from distutils.core import setup', correct: true, feedback: 'distutils was removed from the standard library in Python 3.12. Use setuptools.' },
            { id: 'utc', label: 'from datetime import datetime, timezone\nnow = datetime.now(timezone.utc)', feedback: 'The recommended timezone-aware form. Current.' },
            { id: 'newbuffer', label: 'const buf = new Buffer(10);', correct: true, feedback: 'Deprecated (DEP0005). Node prints a DeprecationWarning that names Buffer.alloc() as the replacement.' },
          ],
          explanation: 'Three need updating: one removed from React, one removed from Python, one deprecated in Node. The other two are the current replacements. All five look equally confident. Only your versions decide which are right.',
          takeaway: 'Match each suggestion to the versions you actually run',
        },
        {
          id: 'p3-fix-cra',
          kind: 'choose',
          label: 'Fix it',
          context: "You asked: 'How do I start a new React project with a simple build setup?' The AI said:",
          prompt: 'Which command fits current React guidance?',
          artifact: { label: 'AI answer (illustrative)', code: true, text: 'npx create-react-app my-app' },
          optionsCode: true,
          options: [
            { id: 'asis', label: 'npx create-react-app my-app', feedback: 'The React team deprecated Create React App on 14 February 2025. It still runs, which is why the old advice survives.' },
            { id: 'latest', label: 'npx create-react-app@latest my-app', feedback: 'The same deprecated tool. Its latest release prints a deprecation notice when you create an app.' },
            { id: 'vite', label: 'npm create vite@latest my-app -- --template react', correct: true, feedback: "Right. Vite is one of the build tools React's own docs point to. For apps that need routing and data loading, they recommend a framework instead." },
            { id: 'global', label: 'npm install -g create-react-app && create-react-app my-app', feedback: 'A global install of the same deprecated tool. Installing it differently does not change its status.' },
          ],
          explanation: "React's post \"Sunsetting Create React App\" (14 February 2025) deprecated it for new apps and pointed to frameworks, or to build tools such as Vite, Parcel or Rsbuild. The AI's answer was standard advice for years, so its training data is full of it.",
          takeaway: 'Still runs is not the same as still recommended',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Six out of six. You check the version before you trust the answer.' },
          { min: 4, message: 'Solid. Look again at the ones you missed: the "still works" cases are the easiest to wave through.' },
          { min: 0, message: 'These are hard. Run the Changelog Check on each one and see what the docs say.' },
        ],
      },
      summary: {
        insight: 'One line was removed and crashes, one is deprecated and warns, one pin installs cleanly with five advisories, and one answer was current. Same check every time: your version, the official source, the exact name.',
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
        title: 'Changelog Check',
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
    'Run the Changelog Check: your version, the docs for that version, the exact function, the migration notes',
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
  description: 'Learn to spot when AI suggests code, commands, APIs, or pinned versions from an older release of a library, including versions with known security holes.',
  estimatedTime: 10,

  skillLearned: 'Checking AI-suggested code against your installed version',
  verificationMethod: 'Changelog Check',

  caseStudy: {
    name: 'Correct Code, Vulnerable Dependencies: LLMs pinning library versions with known CVEs (PinTrace study)',
    date: 'May 2026',
    researcher: 'Chengjie Wang, Jingzheng Wu, Xiang Ling, Tianyue Luo, Chen Zhao',
    source: 'https://arxiv.org/abs/2605.06279',
  },

  nextLesson: {
    id: 'pattern-04',
    title: 'Phantom Citation',
    teaser: 'Sources that never existed.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
