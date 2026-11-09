// src/data/patterns/pattern-02-plausible-syntax.js
// Pattern 02: Plausible Syntax
//
// SEE phase anchored on the Moltbook database exposure (Wiz Research, Feb 2026).
// TARGET: ~18 minutes total
//
// Authored in the block-based schema: each STOP phase is
// { title, estimatedTime, steps: [block, ...] } and every block is one screen.
// See docs/pattern-authoring-guide.md for the block vocabulary.

// ============================================
// SEE (3 min): Story -> Trust check -> Reveal
// ============================================
const see = {
  title: 'The Code That Looked Perfect',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'The app worked. That was the problem.',
      body: `In late January 2026, Moltbook went viral. It was a Reddit-style site billed as a "social network built exclusively for AI agents", and it launched on 28 January.

Its creator, Matt Schlicht, said publicly that he "didn't write one line of code" for it. An AI assistant built the whole thing, which is the practice known as "vibe coding". And it worked: agents could register, post, vote, and message each other. Nothing crashed.`,
    },
    {
      type: 'chat',
      user: 'Load the current agent\'s profile from our Supabase database so the page can show it.',
      ai: {
        text: `Here's a simple way to do it straight from the frontend:

\`\`\`
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const { data: agent, error } = await supabase
  .from('agents')
  .select('*')
  .eq('name', agentName)
  .single();
\`\`\`

This gives you the agent's full record, ready to render.`,
        note: 'Reconstruction of the kind of code typical of vibe-coded Supabase apps. It is not Moltbook\'s actual source, which was not published.',
      },
    },
    {
      type: 'choice',
      question: 'Would this code pass your glance review?',
      subtext: "There's no wrong answer. We're testing your instincts.",
      options: [
        { id: 'yes-pasted', label: "Yes, it looks fine. I'd ship it", response: "You're in good company. It's tidy, it uses the official client library, and it works when you run it." },
        { id: 'maybe-ran', label: "Probably, but I'd run it once first", response: 'Good habit, but here running it would pass. It loads the profile perfectly. The question is who else can run it.' },
        { id: 'no-spotted', label: 'No, something seems off', response: "Nice. Ask what stops someone else from changing agentName, or dropping the filter altogether." },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'Every feature worked. The whole database was open.',
      explanation: `By 31 January 2026, researchers at the security firm Wiz had browsed Moltbook like normal users. Within minutes they found the Supabase key in the site's public JavaScript.

That key is meant to be public, but only when Row Level Security (RLS) rules decide who may read and write each row. Moltbook had no such rules, so the key gave anyone full read and write access. Wiz reports that this exposed 1.5 million API tokens, 35,000 email addresses, and private messages between agents, and let anyone edit live posts. Moltbook fixed it within hours of being told.`,
      list: {
        title: 'Why this is hard to catch by reading:',
        items: [
          'Every line is valid, idiomatic, and uses the official library',
          'It runs and returns exactly the right data, so testing it "works" passes',
          'The flaw is something missing (an access rule), not a wrong line you could spot',
          'AI learned what working code looks like, not what it should protect',
        ],
      },
    },
    {
      type: 'stats',
      title: 'The Impact',
      items: [
        { value: '1.5M', label: 'API tokens exposed', detail: 'enough to take over any agent account' },
        { value: '35,000', label: 'Email addresses exposed', detail: 'plus private messages between agents' },
        { value: '38%', label: 'AI code samples still vulnerable', detail: 'in Veracode\'s October 2026 tests' },
      ],
      source: 'Wiz Research, February 2026; Veracode GenAI Code Security Report update, October 2026',
    },
    {
      type: 'points',
      heading: 'Why does AI write code like this?',
      items: [
        { label: 'What AI is good at:', body: 'Producing code that matches the shape, style, and vocabulary of real code it has seen. Veracode reports that the code it produces almost always works.', tone: 'neutral' },
        { label: 'What AI cannot do by default:', body: 'Execute the code, check types, confirm a function\'s real signature, or notice a safeguard it never wrote. Subtle breakage reads exactly like correct code.', tone: 'danger' },
      ],
      conclusion: "Plausible is not the same as correct. The only way to know is to run it, check it, or test it.",
      transition: "Let's test your eye for broken code before we learn the red flags.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 code snippets — Trust or Verify?
// ============================================
const test = {
  title: 'Run It or Check It?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 snippets an AI assistant might hand you.',
        instruction: 'For each one, decide: would it work as written, or does it need checking first?',
        note: "Don't run anything yet. Read like you normally would and go with your gut.",
        legend: {
          trust: { label: 'TRUST', detail: 'Looks like it will work', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Something may be broken', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          code: true,
          prompt: "const res = fetch('/api/orders').json();\nconsole.log(res.length);",
          context: "You asked: 'How do I load orders from my API in JavaScript?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Broken',
          explanation: "BROKEN. fetch() returns a Promise, and a Promise has no .json() method. This throws a TypeError. The code needs await (or .then) before .json().",
          redFlag: 'A promise-returning call used with no await',
        },
        {
          id: 'item-2',
          code: true,
          prompt: 'scores = [88, 92, 75]\naverage = sum(scores) / len(scores)\nprint(f"Average: {average:.1f}")',
          context: "You asked: 'How do I average a list of numbers in Python?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Works',
          explanation: 'WORKS. sum() and len() are built-ins used correctly, and this prints "Average: 85.0".',
          meta: 'Built-ins with the right argument types',
        },
        {
          id: 'item-3',
          code: true,
          prompt: "tags = ('python', 'ai')\ntags.append('testing')\nprint(tags)",
          context: "You asked: 'How do I add a tag to my list of tags?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Broken',
          explanation: "BROKEN. Parentheses make a tuple, and tuples are immutable. They have no .append(). Python raises AttributeError. Square brackets would have made a list.",
          redFlag: 'A list method called on a tuple',
        },
        {
          id: 'item-4',
          code: true,
          prompt: 'const results = await Promise.all(\n  ids.map((id) => fetch(`/api/users/${id}`).then((r) => r.json()))\n);\nconsole.log(results.length);',
          context: "You asked: 'How do I fetch many users in parallel and wait for all of them?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Works',
          explanation: 'WORKS. map() creates an array of promises and Promise.all() waits for all of them. This is the standard fix for the common forEach(async ...) mistake, where forEach does not wait for the async callbacks.',
          meta: 'Assumes it runs inside an async function or an ES module with top-level await',
        },
        {
          id: 'item-5',
          code: true,
          prompt: 'import re\ntext = "Order #4821 shipped"\nmatch = re.search(text, r"\\d+")\nprint(match.group())',
          context: "You asked: 'How do I pull the order number out of a string in Python?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Broken',
          explanation: "BROKEN. re.search takes the pattern first and the string second. These are swapped, so Python searches the string \"\\d+\" for the text 'Order #4821 shipped', finds nothing, and match is None. Then match.group() raises AttributeError.",
          redFlag: 'Arguments in the wrong order for a real function',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: 'Perfect! You told working code from broken code in every case. Keep that skepticism.' },
          { min: 4, message: "4 out of 5! Strong eye. The red flags ahead will help you catch the one that slipped by." },
          { min: 3, message: "3 out of 5 is not bad. Broken code that looks clean is hard to spot, which is exactly why this training exists." },
          { min: 0, message: "That's tricky, and that's the point. AI code reads like correct code even when it isn't. Let's learn what to look for." },
        ],
      },
      summary: {
        insight: "In this batch, 3 of the 5 snippets would have failed on first run, and none of them looked wrong at a glance. The fastest way to find out is usually to run them. But remember Moltbook: its code ran perfectly. Running code tells you it works, not that it is safe.",
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
      heading: 'Plausible code breaks in predictable ways.',
      subtext: 'Four kinds of subtle breakage show up again and again in AI-written code.',
      cards: [
        { emoji: '⏳', label: 'The Forgotten Await' },
        { emoji: '🔀', label: 'The Wrong Signature' },
        { emoji: '🧩', label: 'The Wrong-Type Method' },
        { emoji: '🔁', label: 'The Quiet Loop Bug' },
      ],
    },
    {
      type: 'concept',
      emoji: '⏳',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Forgotten Await',
      description: 'Async code that is missing an await, or uses forEach with an async callback. It runs without errors but works with a Promise instead of the real value.',
      rows: [
        { label: 'AI writes:', variant: 'code', tone: 'danger', value: 'const user = fetch(url).json();' },
        { label: 'Correct:', variant: 'code', tone: 'good', value: 'const user = await (await fetch(url)).json();' },
        { label: 'Also suspicious:', variant: 'code', tone: 'danger', value: 'ids.forEach(async (id) => { ... });' },
      ],
      note: 'forEach ignores the promises its async callbacks return. Use for...of with await, or Promise.all with map.',
      why: 'AI has seen a huge amount of async code, so it reproduces the shape of it. Whether a call needs await depends on what it returns, and that is easy to get wrong.',
      spot: 'For every call to fetch, a database, or a file API, ask: does this return a Promise, and is something waiting for it?',
    },
    {
      type: 'concept',
      emoji: '🔀',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Wrong Signature',
      description: 'A real function, called with its arguments in the wrong order or with the wrong shape. The name exists, so the call looks right.',
      compare: {
        left: {
          label: '❌ Looks right, breaks:',
          tone: 'danger',
          items: ['setTimeout(1000, callback)', 're.search(text, pattern)', 'Math.max(numbers)', 'open(mode, "data.txt")'],
        },
        right: {
          label: '✓ Correct signature:',
          tone: 'good',
          items: ['setTimeout(callback, 1000)', 're.search(pattern, text)', 'Math.max(...numbers)', 'open("data.txt", mode)'],
        },
      },
      why: 'AI remembers that the function exists and roughly what it does, but not always the exact parameter order, or which version of a library you are using.',
      spot: 'When you see an unfamiliar call, check the docs for its signature. Many editors show it when you hover over the function name.',
    },
    {
      type: 'concept',
      emoji: '🧩',
      eyebrow: 'Red Flag 3 of 4',
      name: 'The Wrong-Type Method',
      description: "A method that exists, just not on the type of value you actually have. It's a real method on the wrong object.",
      rows: [
        { label: 'The value:', variant: 'code', tone: 'neutral', value: "tags = ('python', 'ai')   # a tuple" },
        { label: 'AI calls:', variant: 'code', tone: 'danger', value: "tags.append('testing')" },
        { label: 'List-only methods:', variant: 'chips', tone: 'neutral', values: ['append', 'extend', 'remove', 'sort'] },
      ],
      note: 'The same trap exists in JavaScript: "abc".push("d") fails because strings have no push, and neither does an object.',
      why: 'Methods often have the same names across types (lists, strings, arrays, sets). AI blurs them together, especially when a variable was defined many lines earlier.',
      spot: 'Find where the variable was created. Is it a list, tuple, string, dict, or Promise? Does that type really have this method?',
    },
    {
      type: 'concept',
      emoji: '🔁',
      eyebrow: 'Red Flag 4 of 4',
      name: 'The Quiet Loop Bug',
      description: 'Loops and slices that are off by one, or that change a collection while walking through it. They often run without raising any error.',
      rows: [
        { label: 'Off by one:', variant: 'code', tone: 'danger', value: 'for (let i = 0; i <= items.length; i++)' },
        { label: 'Correct:', variant: 'code', tone: 'good', value: 'for (let i = 0; i < items.length; i++)' },
        { label: 'Mutating while looping:', variant: 'code', tone: 'danger', value: 'for u in users:\n    users.remove(u)' },
      ],
      note: 'Removing items from a list while looping over it makes Python skip elements. Loop over a copy or build a new list instead.',
      why: 'Boundary conditions (< vs <=, start at 0 or 1, inclusive vs exclusive) are easy to get wrong. The code reads smoothly either way.',
      spot: 'Test the edges: an empty list, one item, and the last item. If you are changing a collection inside a loop, slow down.',
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each snippet, identify which red flag gives it away:',
      options: [
        { id: 'flag-1', emoji: '⏳', label: 'The Forgotten Await' },
        { id: 'flag-2', emoji: '🔀', label: 'The Wrong Signature' },
        { id: 'flag-3', emoji: '🧩', label: 'The Wrong-Type Method' },
        { id: 'flag-4', emoji: '🔁', label: 'The Quiet Loop Bug' },
      ],
      items: [
        { prompt: 'const user = fetch(url).json();', correct: 'flag-1', explanation: 'fetch() returns a Promise, and nothing awaits it.' },
        { prompt: 'setTimeout(2000, sayHello);', correct: 'flag-2', explanation: 'The callback goes first, then the delay. These are swapped.' },
        { prompt: 'title = "Report"; title.append(" v2")', correct: 'flag-3', explanation: 'Strings are immutable and have no .append().' },
        { prompt: 'for (let i = 0; i <= arr.length; i++)', correct: 'flag-4', explanation: '<= runs one step past the end of the array.' },
        { prompt: "names = ['a', 'b']; names.append('c')", correct: 'trick-question', explanation: "Trick question! This one is fine. append() is a real list method on a real list.", extra: { id: 'trick-question', label: "✓ It's actually fine" } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'Run It Before You Trust It',
      tagline: 'A short routine that catches most plausible-but-broken code in under a minute.',
      steps: [
        { number: 1, action: 'Read it line by line', detail: 'For each call, ask what type goes in and what type comes out. Does it return a Promise? Is this a list or a tuple?', time: '20 seconds' },
        { number: 2, action: 'Run a syntax or type check', detail: 'Use a linter, a compiler check, or a type checker (for example python -m py_compile, node --check, or tsc --checkJs). Cheap and automatic.', time: '10 seconds' },
        { number: 3, action: 'Try one tiny input', detail: 'Run it in a REPL or sandbox with a small, known input. Compare the result with what you expected.', time: '30 seconds' },
        { number: 4, action: 'Test the edges', detail: 'Try an empty input, a single item, and the largest case. Off-by-one and loop bugs show up here.', time: '30 seconds' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'It runs without errors on a small input',
            'The output matches what you worked out by hand',
            'Edge cases (empty, one item) behave sensibly',
            'A type checker or linter finds nothing',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            'An empty array, None, or undefined where you expected data',
            'A warning about a promise that was never awaited',
            'A function whose signature you have not checked',
            "You can't explain why it works",
          ],
        },
      },
      footer: 'Running code takes a minute. Debugging a silent wrong answer in production takes much longer. Plausible code earns trust by running, not by looking right. And for anything that touches user data, also ask what the code does for someone who is not supposed to use it: Moltbook passed every "does it work?" check.',
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
        heading: 'Practice Drill: Subtler Code',
        instruction: 'These 5 snippets are harder. Some look suspicious but are fine, and some look fine but are broken.',
        note: 'Apply the red flags: await, signatures, types, and loop boundaries. Think about what the code actually does.',
        legend: {
          trust: { label: 'TRUST', detail: 'Works as written', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Likely broken or risky', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'drill-1',
          code: true,
          prompt: "for user in users:\n    if user['inactive']:\n        users.remove(user)",
          context: "You asked: 'Remove all inactive users from my list in Python.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Buggy',
          explanation: "BUGGY. Removing from a list while looping over it shifts the remaining items, so the loop skips the element right after each removal. Some inactive users will stay. Build a new list: users = [u for u in users if not u['inactive']].",
          redFlag: 'Mutating a collection while iterating over it',
        },
        {
          id: 'drill-2',
          code: true,
          prompt: "SELECT region, COUNT(*) AS n\nFROM orders\nWHERE status = 'paid'\nGROUP BY region\nHAVING COUNT(*) > 10;",
          context: "You asked: 'Which regions have more than 10 paid orders?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Works',
          explanation: 'WORKS. The clause order is correct (SELECT, FROM, WHERE, GROUP BY, HAVING), and HAVING is the right way to filter on an aggregate.',
          meta: 'WHERE filters rows first; HAVING filters the groups',
        },
        {
          id: 'drill-3',
          code: true,
          prompt: 'SELECT customer_id, SUM(total)\nFROM orders\nGROUP BY customer_id\nWHERE total > 100;',
          context: "You asked: 'Total spend per customer, only counting orders over 100.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Broken',
          explanation: 'BROKEN. SQL clauses must appear in a fixed order, and WHERE comes before GROUP BY. The database will reject this with a syntax error.',
          redFlag: 'Clauses in the wrong order',
        },
        {
          id: 'drill-4',
          code: true,
          prompt: 'for (let i = 0; i <= items.length; i++) {\n  console.log(items[i].name);\n}',
          context: "You asked: 'Print the name of every item in this array.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Broken',
          explanation: "BROKEN. i <= items.length runs one step too far. On the last pass items[i] is undefined, so reading .name throws a TypeError. Use i < items.length, or a for...of loop.",
          redFlag: 'Off-by-one boundary (<= instead of <)',
        },
        {
          id: 'drill-5',
          code: true,
          prompt: 'def add_item(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket',
          context: "You asked: 'Write a Python function that adds an item to a list, creating the list if needed.'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Works',
          explanation: "WORKS. It looks like extra ceremony, but defaulting to None and creating a fresh list inside avoids Python's shared mutable default argument trap. This is the recommended pattern.",
          meta: 'Unusual-looking does not mean wrong',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Flawless. You read for behavior, not just appearance. That's the skill." },
          { min: 4, message: "4 out of 5. Sharp. One subtle one got through, which is why running code matters." },
          { min: 3, message: "3 out of 5. You're catching the loud bugs. Keep practicing the quiet ones: loop boundaries and clause order." },
          { min: 0, message: 'These were designed to be tricky. Review the four red flags and try reading the code as if you were the computer.' },
        ],
      },
      summary: {
        insight: "The mutating loop fails quietly, with no error at all, and the off-by-one only fails on the last pass. Meanwhile one correct snippet looked unusual. Don't judge code by whether it looks tidy. Judge it by what it does.",
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick ways to check AI-written code before you trust it.',
      commands: [
        {
          title: 'Try one line in a Python REPL',
          ecosystem: 'cli',
          command: `python3 -c "t = ('a', 'b'); t.append('c')"`,
          output: `Traceback (most recent call last):
  File "<string>", line 1, in <module>
AttributeError: 'tuple' object has no attribute 'append'`,
          whatToLookFor: 'A traceback names the exact line and type problem. Run the suspicious line with a tiny input before using it in your project.',
        },
        {
          title: 'Check JavaScript syntax without running it',
          ecosystem: 'cli',
          command: 'node --check app.js',
          output: '(no output means the file parses; errors show the file, line, and a SyntaxError)',
          whatToLookFor: 'Catches unclosed brackets and invalid syntax. It does not catch logic bugs like a missing await, so pair it with a type check or a run.',
        },
        {
          title: 'Type-check plain JavaScript',
          ecosystem: 'cli',
          command: 'npx tsc --noEmit --allowJs --checkJs app.js',
          output: `app.js(3,31): error TS2339: Property 'json' does not exist on type 'Promise<Response>'.`,
          whatToLookFor: "Errors that mention 'Promise<...>' usually mean something needs an await. The exact output depends on your code (this is an example).",
        },
        {
          title: 'Look up the signature in the docs',
          ecosystem: 'doc',
          command: 'python3 -c "import re; help(re.search)"',
          output: `Help on function search in module re:

search(pattern, string, flags=0)
    Scan through string looking for a match to the pattern...`,
          whatToLookFor: 'Compare parameter names and order with how the AI called it. Editor hover tooltips and official docs show the same information.',
        },
      ],
      quickReference: {
        title: 'Run It Before You Trust It',
        steps: [
          'Read line by line: what type goes in, what comes out?',
          'Run a syntax or type check (py_compile, node --check, tsc --checkJs)',
          'Try one tiny input in a REPL or sandbox',
          'Test the edges: empty input, one item, last item',
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Plausible Syntax',
      summary: "You can now spot code that looks right but isn't. You know the four red flags: forgotten awaits, wrong signatures, wrong-type methods, and quiet loop bugs. You also have a quick routine and the tools to check any snippet before you trust it.",
      next: { label: 'Up Next', body: "Pattern 3 looks at Version Hallucination: when AI recommends deprecated or removed APIs as if they were current. That is code that was right in 2019, but not today." },
    },
  ],

  // Read by LessonShell's final "Pattern Learned!" screen (outside the step-flow).
  keyTakeaways: [
    'AI-written code can look clean and idiomatic while hiding subtle breakage',
    'Common red flags: missing await, wrong argument order, methods on the wrong type, and off-by-one or mutating loops',
    'Valid syntax does not mean correct behavior, and a lack of errors does not mean a correct result',
    'Run It Before You Trust It: read line by line, check types, try one tiny input, test the edges',
    'Judge code by what it does, not by how tidy it looks',
  ],
  checklist: {
    title: 'Your Plausible Syntax Checklist',
    items: [
      'Does every Promise-returning call have an await (or .then) and not sit inside forEach?',
      'Have I checked the real signature and argument order of each unfamiliar function?',
      'Does each method exist on the type of value I actually have?',
      'Do loops and slices handle the boundaries (< vs <=, empty list, last item)?',
      'Does anything change a collection while looping over it?',
      'Have I run it once with a tiny input and checked the result by hand?',
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-02',
  patternNumber: 2,
  title: 'Plausible Syntax',
  subtitle: "Code that looks right but isn't",
  description: 'Learn to spot AI-written code that looks clean and idiomatic but contains subtle bugs: missing awaits, wrong arguments, wrong types, and quiet loop errors.',
  estimatedTime: 15,

  skillLearned: 'Spotting and verifying subtly broken AI-generated code',
  verificationMethod: 'Run It Before You Trust It',

  caseStudy: {
    name: 'The Moltbook database exposure',
    date: 'January-February 2026',
    researcher: 'Gal Nagli, Wiz Research',
    source: 'https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys',
  },

  nextLesson: {
    id: 'pattern-03',
    title: 'Version Hallucination',
    teaser: 'Code that was right... in 2019.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
