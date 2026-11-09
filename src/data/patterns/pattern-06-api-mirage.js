// src/data/patterns/pattern-06-api-mirage.js
// Pattern 06: API Mirage
//
// The library is REAL. The method, parameter, flag, or endpoint is not.
// No case study: the SEE story is clearly illustrative.
// TARGET: ~18 minutes total
//
// Block-based schema: see docs/pattern-authoring-guide.md.

// ============================================
// SEE (3 min): Story -> Instinct check -> Reveal -> Why it matters
// ============================================
const see = {
  title: 'The Function That Was Never There',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'This time, the library is real.',
      body: `Imagine you're building a small report in Python. You use pandas every week, so you trust it. You just can't remember how to turn a table into Markdown for your README.

You ask an AI assistant. (This scenario is illustrative, but the mistake in it is a very common kind.)`,
    },
    {
      type: 'chat',
      user: 'How do I print a pandas DataFrame as a Markdown table so I can paste it into a README?',
      ai: {
        text: `pandas can do this directly. Here's how:

\`\`\`
import pandas as pd

df = pd.read_csv("sales.csv")
print(df.to_markdown_table())
\`\`\`

This prints a clean Markdown table you can paste straight into your README. You can also pass \`index=False\` to hide the row numbers.`,
        note: 'pandas is real. The method name follows the library conventions. It sounds right.',
      },
    },
    {
      type: 'choice',
      question: 'You know pandas is real. Would you run this without checking?',
      subtext: 'Nothing to install, nothing suspicious. Just one method call.',
      options: [
        { id: 'yes-ran', label: 'Yes, pandas is real so the method must be too', response: "That's the trap. A real library makes a made-up method feel safe." },
        { id: 'maybe-ran', label: "I'd run it. If it fails, I'll know", response: "Reasonable for a loud failure like this one. Some invented options don't fail loudly, and we'll get to those." },
        { id: 'no-docs', label: "I'd check the docs for that exact method name", response: 'Good habit. Keep it for the rest of this lesson.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'to_markdown_table() does not exist.',
      explanation: `pandas is real. DataFrame.to_markdown() is real. But to_markdown_table() is a blend of the right idea and a plausible-sounding name.

Run it and you get:

AttributeError: 'DataFrame' object has no attribute 'to_markdown_table'

Unlike Pattern 1, there is no fake package to catch. The package check passes. The failure is one level deeper, inside a library you already trust.`,
      list: {
        title: "Here's what happened:",
        items: [
          'The AI knew pandas has methods like to_csv(), to_json(), and to_html()',
          'It extrapolated the naming pattern and produced a method that fits it',
          'The real method is to_markdown(), and it needs the optional tabulate package',
          'The index=False tip may well be right. Mixing true and false details is what makes the whole answer feel credible',
        ],
      },
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Loud failure:', body: "A made-up method raises an error. You lose a few minutes, and you may paste the error back to the AI, which then invents a different method.", tone: 'neutral' },
        { label: 'Silent failure:', body: "A made-up option on a real function can be ignored without any error. You believe retries, validation, or a safety setting is on when it isn't.", tone: 'danger' },
        { label: 'Wrong endpoint:', body: "An invented REST URL may return 404, or it may hit a different real endpoint with side effects you didn't intend.", tone: 'danger' },
      ],
      conclusion: 'This is the API Mirage: real library, imaginary surface. The AI fills gaps in its memory with whatever the naming conventions suggest.',
      transition: "Let's test your instincts on some API calls.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 AI snippets - Use it or Check first?
// ============================================
const test = {
  title: 'Use It or Check First?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 API calls that AI assistants suggested.',
        instruction: 'Every library here is real. For each call, decide: would you use it as written, or check the docs first?',
        note: "Go with your gut. Don't look anything up yet.",
        legend: {
          trust: { label: 'TRUST', detail: 'Use it as written', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Check the docs first', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          code: true,
          prompt: "import pandas as pd\ndf = pd.read_csv('users.csv')\nclean = df.drop_nulls()",
          context: "You asked: 'How do I remove rows with missing values in pandas?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated method',
          explanation: "NOT IN PANDAS. drop_nulls() belongs to Polars, a sibling library. In pandas the method is dropna().",
          redFlag: 'A method name borrowed from a similar library',
        },
        {
          id: 'item-2',
          code: true,
          prompt: 'import requests\nr = requests.get(url, timeout=5)\nprint(r.status_code)',
          context: "You asked: 'How do I stop a request from hanging forever?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: "REAL. requests.get accepts a documented timeout argument, in seconds. It is one of the first things the requests docs recommend setting.",
          meta: 'Documented in the requests quickstart: Timeouts',
        },
        {
          id: 'item-3',
          code: true,
          prompt: "const items = ['a', 'b', 'c'];\nitems.removeAt(1);",
          context: "You asked: 'How do I remove an element at an index in a JavaScript array?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated method',
          explanation: "NOT REAL. JavaScript arrays have no removeAt(). The standard way is splice(1, 1). It looks plausible because other languages and libraries have a method by this name.",
          redFlag: "A convenient method the language doesn't actually have",
        },
        {
          id: 'item-4',
          code: true,
          prompt: 'git switch -c feature/login',
          context: "You asked: 'How do I create and move to a new git branch?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: 'REAL. git switch was added in Git 2.23 (2019), and -c creates a new branch and switches to it. It is the newer alternative to git checkout -b.',
          meta: 'Documented in: git switch --help',
        },
        {
          id: 'item-5',
          code: true,
          prompt: "const res = await fetch(url, {\n  method: 'GET',\n  retries: 3,\n});",
          context: "You asked: 'How do I make fetch retry on failure?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated option',
          explanation: "NOT A FETCH OPTION. fetch has no retries setting. Unknown options are simply ignored, so this runs without any error and never retries. You would need your own retry loop or a library that provides one.",
          redFlag: "An option that would be nice to have, passed to a function that doesn't have it",
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You caught every mirage. Let's sharpen the instincts behind it." },
          { min: 4, message: '4 out of 5. Solid. The red flags ahead will help with the one that slipped through.' },
          { min: 3, message: "3 out of 5. These are hard because the libraries are real. That's exactly the trap." },
          { min: 0, message: "Tricky, and that's the point. A real library lends credibility to invented details. Let's learn how to spot them." },
        ],
      },
      summary: {
        insight: "In this batch, 3 out of 5 calls didn't exist. Notice that the library was real every time. Checking the package isn't enough. You have to check the exact symbol.",
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
      heading: 'API mirages follow predictable patterns.',
      subtext: "AI predicts what a library's API probably looks like. These four habits show up again and again.",
      cards: [
        { emoji: '🔀', label: 'The Borrowed Method' },
        { emoji: '🪞', label: 'The Symmetry Guess' },
        { emoji: '🎁', label: 'The Helpful Parameter' },
        { emoji: '🛣️', label: 'The Endpoint by Convention' },
      ],
    },
    {
      type: 'concept',
      emoji: '🔀',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Borrowed Method',
      description: 'The method is real, but it belongs to a sibling library or another language. The AI mixes them up.',
      compare: {
        left: { label: "❌ Not in pandas (Polars-style):", tone: 'danger', items: ['df.drop_nulls()', 'df.with_columns(...)', 'df.group_by(...)'] },
        right: { label: '✓ Real pandas:', tone: 'good', items: ['df.dropna()', 'df.assign(...)', 'df.groupby(...)'] },
      },
      why: 'Libraries that solve the same problem share vocabulary. The AI saw both and blends them, especially when your question is vague about which one you use.',
      spot: 'Ask: which library does this method belong to? If you know a sibling library, check whether the name is borrowed from it.',
    },
    {
      type: 'concept',
      emoji: '🪞',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Symmetry Guess',
      description: 'If a library has get(), the AI assumes it has set(). If it has add(), it assumes remove(). Real APIs are often less tidy.',
      rows: [
        { label: 'Real methods:', variant: 'chips', tone: 'good', values: ['dict.get(key)', 'dict.pop(key)', 'dict.update(...)'] },
        { label: 'AI guesses:', variant: 'code', tone: 'danger', value: "my_dict.set('a', 1)" },
      ],
      note: "Python dicts have no set(). You assign with d['a'] = 1 or call update(). Other types, like JavaScript's Map, do have set(), so the guess is only sometimes wrong.",
      why: "Symmetry is a good guess in general, and that's why it's convincing. Real APIs have gaps and quirks that symmetry can't predict.",
      spot: 'When a method is the neat opposite of one you know, confirm it exists in this type, not just in another.',
    },
    {
      type: 'concept',
      emoji: '🎁',
      eyebrow: 'Red Flag 3 of 4',
      name: 'The Helpful Parameter',
      description: 'The AI adds an option that would be very convenient if it existed, such as retries, caching, or strict mode.',
      rows: [
        { label: 'Real call:', variant: 'code', tone: 'good', value: 'requests.get(url, timeout=5)' },
        { label: 'AI adds:', variant: 'code', tone: 'danger', value: 'requests.get(url, timeout=5, retries=3)' },
      ],
      note: "requests.get has no retries argument. Real retries need an HTTPAdapter with max_retries. In some libraries, unknown options are ignored silently instead of raising an error.",
      why: "The AI writes the call that solves your problem, not the call the library offers. Convenience is a strong pull in its predictions.",
      spot: 'For every argument and flag, ask: where is this listed in the reference? Be extra careful when it conveniently solves exactly your problem.',
    },
    {
      type: 'concept',
      emoji: '🛣️',
      eyebrow: 'Red Flag 4 of 4',
      name: 'The Endpoint by Convention',
      description: 'The AI invents a REST URL that follows the usual pattern, for a real service whose API has no such route.',
      rows: [
        { label: 'Documented (illustrative):', variant: 'chips', tone: 'good', values: ['GET /v2/users/{id}', 'POST /v2/exports'] },
        { label: 'AI invents:', variant: 'code', tone: 'danger', value: 'GET /v2/users/{id}/export' },
      ],
      note: 'The URL is tidy and RESTful, which is exactly why it looks credible. Tidy is not the same as documented.',
      why: 'APIs often follow shared conventions, so the AI can generate a URL that looks right for almost any service. It cannot know which routes the vendor actually built.',
      spot: 'Find the route in the vendor\'s API reference or OpenAPI spec. A convention-shaped URL is a guess until you see it listed.',
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each suspicious call, identify which red flag gives it away:',
      options: [
        { id: 'flag-1', emoji: '🔀', label: 'The Borrowed Method' },
        { id: 'flag-2', emoji: '🪞', label: 'The Symmetry Guess' },
        { id: 'flag-3', emoji: '🎁', label: 'The Helpful Parameter' },
        { id: 'flag-4', emoji: '🛣️', label: 'The Endpoint by Convention' },
      ],
      items: [
        { prompt: 'pandas: df.drop_nulls()', correct: 'flag-1', explanation: 'drop_nulls() is Polars. pandas uses dropna().' },
        { prompt: "Python: my_dict.set('a', 1)", correct: 'flag-2', explanation: 'It guesses a set() to pair with get(). Python dicts have no such method.' },
        { prompt: 'fetch(url, { retries: 3 })', correct: 'flag-3', explanation: "A convenient option the function doesn't define. It is silently ignored." },
        { prompt: 'GET /v1/invoices/{id}/download (not in the vendor docs)', correct: 'flag-4', explanation: 'It follows the pattern, but the docs never list it.' },
        { prompt: 'df.to_markdown()', correct: 'trick-question', explanation: "Trick question! This one is real. It is a documented pandas method and needs the tabulate package installed.", extra: { id: 'trick-question', label: "✓ It's actually real" } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: "Docs Or It Didn't Happen",
      tagline: 'If you can\'t point to the line in the reference, treat the call as a guess.',
      steps: [
        { number: 1, action: 'Isolate the exact symbol', detail: 'Pull out the method, parameter, flag, or URL, spelled exactly as the AI wrote it, plus the library version you actually use.', time: '5 seconds' },
        { number: 2, action: 'Search the official reference', detail: 'Open the docs for your version (not a blog post or a forum answer) and search the exact name. For REST, use the vendor API reference or OpenAPI spec.', time: '15 seconds' },
        { number: 3, action: 'Ask the tool itself', detail: "Introspect locally: dir() and help() in Python, --help for CLIs, editor autocomplete or go-to-definition in TypeScript. The installed code can't hallucinate.", time: '15 seconds' },
        { number: 4, action: 'Run a minimal call', detail: 'Try the smallest possible example. Then confirm the behavior, not just the absence of an error. Silently ignored options pass without complaint.', time: '30 seconds' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'The exact name appears in the official reference for your version',
            'dir(), help(), or --help list it',
            'Editor autocomplete suggests it and shows the signature',
            'A minimal call produces the documented behavior',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            "The name only appears in other languages or sibling libraries",
            'AttributeError, TypeError, "unknown option", or a 404',
            'Search results are all forum posts, none from official docs',
            "The call runs, but the option has no visible effect",
          ],
        },
      },
      footer: "A real library does not make a real method. Spending a minute in the reference is cheaper than debugging a function that was never there.",
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
        heading: 'Practice Drill: 5 harder calls.',
        instruction: 'These are subtler. Some real calls look odd, and some fake ones look polished. Decide whether to use it or check first.',
        note: 'Think about which red flag applies, then decide.',
        legend: {
          trust: { label: 'TRUST', detail: 'Use it as written', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Check the docs first', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'drill-1',
          code: true,
          prompt: "import pandas as pd\ndf = pd.read_csv('sales.csv')\nprint(df.to_markdown_table())",
          context: "You asked: 'Print my DataFrame as a Markdown table.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated method',
          explanation: "NOT REAL. This one is close. The documented method is to_markdown(), which needs the tabulate package. The invented name extends the pattern of to_csv() and to_json().",
          redFlag: 'Near-miss name that extends a real naming pattern',
        },
        {
          id: 'drill-2',
          code: true,
          prompt: "totals = df.groupby('region').agg({'sales': 'sum'})",
          context: "You asked: 'How do I total sales per region in pandas?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: 'REAL. groupby() followed by agg() with a column-to-function mapping is standard, documented pandas. Complex-looking does not mean invented.',
          meta: 'Documented in: pandas user guide, Group by',
        },
        {
          id: 'drill-3',
          code: true,
          prompt: 'import json\ndata = json.parse(text)',
          context: "You asked: 'How do I turn a JSON string into a dict in Python?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Fabricated method',
          explanation: "NOT REAL. JSON.parse is JavaScript. Python's json module uses json.loads() for strings and json.load() for files.",
          redFlag: 'Method name borrowed from another language',
        },
        {
          id: 'drill-4',
          code: true,
          prompt: 'curl -I https://example.com',
          context: "You asked: 'How can I see only the response headers from a URL?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: 'REAL. curl -I (--head) sends a HEAD request and prints the headers. A few servers treat HEAD differently from GET, but the flag itself is documented.',
          meta: "Documented in: man curl, under -I, --head",
        },
        {
          id: 'drill-5',
          code: true,
          prompt: 'GET /v2/users/{id}/export\nAuthorization: Bearer <token>',
          context: "Illustrative: a fictional service called Taskly. Its API reference lists only GET /v2/users/{id} and POST /v2/exports. You asked how to export one user's data.",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Undocumented endpoint',
          explanation: "NOT IN THE REFERENCE. The route follows REST conventions, but nothing documents it. The proper way is whatever the reference describes, here POST /v2/exports. A guessed URL can 404 or hit something unintended.",
          redFlag: "Tidy URL that follows convention but isn't documented",
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect drill. You can tell a documented call from a plausible one." },
          { min: 4, message: '4 out of 5. Strong. Subtle near-misses like to_markdown_table() are the ones to double-check.' },
          { min: 3, message: '3 out of 5. Keep the habit: exact symbol, official reference, minimal call.' },
          { min: 0, message: 'These are hard because everything looks plausible. That is why the method matters more than gut feeling.' },
        ],
      },
      summary: {
        insight: "Three of these five were invented, and none looked wrong at a glance. Your reliable defense isn't a sharper eye. It's checking the exact symbol against the docs.",
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick ways to check an exact symbol before you rely on it.',
      commands: [
        {
          title: 'Does this method exist? (Python)',
          ecosystem: 'cli',
          command: `python3 -c "import pandas as pd; print(hasattr(pd.DataFrame,'to_markdown_table'))"`,
          output: 'False',
          whatToLookFor: 'False means the attribute is not on the installed version. Swap in a real name, such as to_markdown, to see True.',
        },
        {
          title: 'Read the real signature (Python)',
          ecosystem: 'cli',
          command: `python3 -c "import pandas as pd; help(pd.DataFrame.dropna)"`,
          output: `Help on function dropna in module pandas.core.frame:

dropna(self, *, axis=0, how=..., thresh=..., subset=None, inplace=False, ...)
    Remove missing values.`,
          whatToLookFor: 'The parameter list is the source of truth for your installed version. The exact output varies by version. If an argument is not listed, it does not exist.',
        },
        {
          title: 'Is this a git command?',
          ecosystem: 'cli',
          command: 'git undo',
          output: "git: 'undo' is not a git command. See 'git --help'.",
          whatToLookFor: "Real subcommands print their usage or run. Use 'git help -a' to list built-in commands, or 'git <cmd> --help' for details. Note that someone's custom alias can make a command exist on one machine only.",
        },
        {
          title: 'Does the endpoint exist? (REST)',
          ecosystem: 'web',
          command: `curl -s -o /dev/null -w '%{http_code}' https://api.example.com/v2/users/42/export`,
          output: '404',
          whatToLookFor: "404 suggests the route doesn't exist. 401 or 403 means a route exists but needs credentials. Use only read-only requests on routes you're allowed to call, and still confirm in the vendor docs.",
        },
        {
          title: 'Does this JavaScript method exist?',
          ecosystem: 'cli',
          command: `node -e "console.log(typeof [].removeAt)"`,
          output: 'undefined',
          whatToLookFor: "'undefined' means no such method on arrays. A real one, like [].at, prints 'function' on a current Node version.",
        },
      ],
      quickReference: {
        title: "Docs Or It Didn't Happen",
        steps: [
          'Copy the exact symbol and note your library version',
          'Search the official reference for that name',
          'Introspect locally: dir(), help(), --help, autocomplete',
          'Run a minimal call and confirm the behavior, not just "no error"',
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: API Mirage',
      summary: "You can now spot when AI invents methods, parameters, flags, and endpoints on libraries that are completely real. You know the four red flags and you have a repeatable way to verify the exact symbol.",
      next: { label: 'Up Next', body: "Pattern 7 looks at a different kind of invention: wrong dates, wrong quotes, and wrong people stated with total confidence." },
    },
  ],

  keyTakeaways: [
    'A real library does not guarantee a real method, parameter, flag, or endpoint',
    "Red flags: borrowed methods, symmetry guesses, helpful parameters, endpoints that follow convention",
    'Invented options can be silently ignored, so "no error" does not mean it works',
    "Docs Or It Didn't Happen: exact symbol, official reference for your version, local introspection, minimal call",
    "Pasting an error back to the AI can produce a new invention. Go to the docs instead",
  ],
  checklist: {
    title: 'Your API Mirage Checklist',
    items: [
      'Have I found this exact method, parameter, or flag in the official reference for my version?',
      'Could this name belong to a sibling library or another language?',
      'Is it a neat mirror of another method (get/set, add/remove) that I have not confirmed?',
      'Is it a convenient option that conveniently solves my exact problem?',
      'Is this REST route listed in the vendor API reference or OpenAPI spec?',
      'Did I run a minimal call and confirm the behavior, not just the absence of an error?',
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-06',
  patternNumber: 6,
  title: 'API Mirage',
  subtitle: "Endpoints and methods that don't exist",
  description: "Learn to spot when AI invents methods, parameters, CLI flags, or endpoints on libraries and services that are completely real.",
  estimatedTime: 15,

  skillLearned: 'Verifying exact APIs, methods, flags, and endpoints against official docs',
  verificationMethod: "Docs Or It Didn't Happen",

  nextLesson: {
    id: 'pattern-07',
    title: 'Historical Confabulation',
    teaser: 'Wrong dates, wrong quotes, wrong people.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
