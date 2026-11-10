// src/data/patterns/pattern-02-plausible-syntax.js
// Pattern 02: Plausible Syntax
//
// SEE phase anchored on the Moltbook database exposure (Wiz Research, Feb 2026).
// TARGET: about 10 minutes total
//
// Authored in the block-based schema: each STOP phase is
// { title, steps: [block, ...] } and every block is one screen.
// See docs/pattern-authoring-guide.md for the block vocabulary.

// ============================================
// SEE: Story -> Trust check -> Reveal
// ============================================
const see = {
  title: 'Code That Looked Perfect',
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
      subtext: "There's no wrong answer. Go with your first reaction.",
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
      title: 'Impact',
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
      transition: "So how would you have caught it? Let's go back to that code and test it properly.",
    },
  ],
};

// ============================================
// TEST: Spot what to test in the Supabase code -> run the tests
// ============================================
const test = {
  title: 'Testing the Code',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'It runs. So what is there to test?',
      instruction: 'Tap the parts of this code you would want to test before shipping it. Most of it is fine. The risk is in what it trusts.',
      source: 'From the AI answer',
      code: true,
      segments: [
        { text: "import { createClient } from '@supabase/supabase-js';", note: 'The official Supabase client library, imported the documented way. Nothing to worry about here.' },
        { text: '\n\n' },
        { text: 'const supabase = createClient(SUPABASE_URL, ', note: 'The project URL. It is public by design: every visitor\'s browser needs it to reach the database.' },
        { text: 'SUPABASE_KEY', flag: { label: 'A key shipped to every browser', explanation: 'This code runs in the frontend, so whatever key goes here ends up in the public JavaScript. Two questions to test: which key is it, and what can anyone holding it do?' } },
        { text: ');', note: 'Standard client setup.' },
        { text: '\n\n' },
        { text: 'const { data: agent, error } = await supabase', note: 'Correct async usage: the query is awaited and the error is captured. This is the part people usually check, and it is fine.' },
        { text: '\n  ' },
        { text: ".from('agents')", note: 'The table name. Normal.' },
        { text: '\n  ' },
        { text: ".select('*')", flag: { label: 'Every column, including secrets', explanation: 'select * returns the whole row. If the agents table holds API keys or tokens, they come back too, to anyone who asks. In Moltbook, it did.' } },
        { text: '\n  ' },
        { text: ".eq('name', agentName)", flag: { label: 'A filter is not a permission', explanation: 'This limits the result to one agent, but the filter runs in code the user controls. Anyone can change agentName or drop the filter. Only database rules (Row Level Security) decide who may see which rows.' } },
        { text: '\n  ' },
        { text: '.single();', note: 'Returns one row instead of an array. Fine.' },
      ],
      summary: 'Three things to test: what the public key can reach, whether Row Level Security is on, and what a stranger gets if they skip your filter. Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'The page loads the right profile, so "does it work?" already passes. You need a different question: what can someone who is not this agent do with the same code and key?',
      claim: {
        label: 'Code',
        text: "const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);\n\nconst { data: agent, error } = await supabase\n  .from('agents')\n  .select('*')\n  .eq('name', agentName)\n  .single();",
        code: true,
      },
      rounds: [
        {
          title: 'Test 1: Where does the key live?',
          question: 'What do you check first?',
          options: [
            {
              id: 'it-works',
              label: 'Open the app and confirm the profile loads',
              useful: false,
              feedback: 'It does load. Moltbook loaded perfectly too. This tests the feature, not who else can use it.',
            },
            {
              id: 'bundle',
              label: 'Open the deployed site\'s JavaScript and search for the Supabase URL and key',
              useful: true,
              resultLabel: 'What Wiz found in Moltbook\'s JS (31 Jan 2026), key shortened',
              result: 'File: /_next/static/chunks/18e24eafc444b2b9.js\nproject: ehxbxtjliybbloantpwq.supabase.co\nkey:     sb_publishable_4Zai...',
              feedback: 'Wiz found it within minutes, just by browsing. Anything the frontend uses is public. It is a publishable key, which is allowed to be public, so the real question is what it unlocks.',
              kit: 'Find the key in the shipped JavaScript and note which kind it is (publishable or secret)',
            },
            {
              id: 'docs-key',
              label: 'Read the Supabase docs on what a publishable key can do',
              useful: true,
              resultLabel: 'Supabase Row Level Security docs (November 2026)',
              result: '"A table in an exposed schema without RLS is readable and writable by any role with a grant on it."\n\n"Once RLS is enabled, no data is accessible through the API when using a publishable key, until you create policies."',
              feedback: 'The key is only safe because of RLS. Without it, the same key that loads one profile can read and write whole tables.',
              kit: 'Check the official docs: a public key is only safe when RLS is on',
            },
          ],
        },
        {
          title: 'Test 2: Is Row Level Security on?',
          question: 'The key is public. How do you find out whether the database protects the agents table?',
          options: [
            {
              id: 'ask-ai',
              label: 'Ask the AI: "Is this code secure?"',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'Yes, this uses the official Supabase client and the public key, which is designed to be used in the browser...',
              feedback: 'Half true and no help. The AI cannot see your database settings, and the code alone cannot tell you whether RLS is on.',
            },
            {
              id: 'filter',
              label: 'Check that the query filters by agentName, so users only get their own row',
              useful: false,
              feedback: 'The filter lives in code the visitor controls. An attacker does not use your page. They call the API directly with the key and ask for whatever they like.',
            },
            {
              id: 'rls-check',
              label: 'Check RLS on the table, in the dashboard or with SQL',
              useful: true,
              resultLabel: 'Illustrative output for an unprotected project',
              result: "select tablename, rowsecurity\nfrom pg_tables where schemaname = 'public';\n\n tablename      | rowsecurity\n agents         | f\n owners         | f\n agent_messages | f",
              feedback: 'f means RLS is off. Every table in this list is open to anyone with the publishable key. Moltbook\'s agents, owners and agent_messages tables were all reachable this way.',
              kit: 'Check that RLS is enabled on every table in an exposed schema (dashboard or pg_tables)',
            },
          ],
        },
        {
          title: 'Test 3: What can a stranger do?',
          question: 'Prove it. How do you see what someone outside the app could actually get?',
          options: [
            {
              id: 'env-var',
              label: 'Move the key into an environment variable so it is hidden',
              useful: false,
              feedback: 'Frontend environment variables are baked into the JavaScript at build time. The key ends up in the same public file. It also misses the point: this key is meant to be public, and RLS is what protects the data.',
            },
            {
              id: 'curl-other',
              label: 'On your own staging project, call the API with only the public key and ask for other users\' rows',
              useful: true,
              resultLabel: 'Wiz\'s request against Moltbook (31 Jan 2026), redacted',
              result: 'curl ".../rest/v1/agents?select=name,api_key&limit=3" \\\n  -H "apikey: <publishable key>"\n\n-> names and full api_key values of the top agents\n\nWith RLS on and no policy, the same request returns []',
              feedback: 'This is the test that matters. Wiz expected an empty array or an error. Instead they got live API keys, enough to take over any agent. A follow-up PATCH request let them edit a live post.',
              kit: 'With only the public key, try to read and write another user\'s row (on your own project)',
            },
            {
              id: 'own-ui',
              label: 'Log in as a test user and check the page only shows your own profile',
              useful: false,
              feedback: 'The page shows what the frontend asks for. That proves nothing about what the API hands to someone who asks for more.',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what was wrong with the code?',
        options: [
          { id: 'syntax', label: 'A bug in the query itself', correct: false, feedback: 'No. Every line is valid and the query returns exactly the right profile. That is why reading it and running it both passed.' },
          { id: 'missing-rls', label: 'Nothing in the lines themselves. The access rules were missing, so the public key opened every row', correct: true, feedback: 'Right. The code assumed RLS would decide who sees what, and RLS was never set up. Moltbook fixed it by enabling RLS policies table by table, within hours of Wiz\'s report.' },
          { id: 'leaked-key', label: 'A secret key was leaked; hiding it would have fixed everything', correct: false, feedback: 'The key was a publishable key, meant to sit in the browser. Hiding it is not possible in a frontend app. Row Level Security is the fix.' },
        ],
      },
      kit: {
        title: 'Your Plausible Syntax Test Kit',
        footer: 'A few minutes of checking. The app worked the same either way. Only testing it as a stranger showed the difference.',
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
      heading: 'Plausible code breaks in predictable ways.',
      subtext: 'Four kinds of subtle breakage show up again and again in AI-written code.',
      cards: [
        { emoji: '⏳', label: 'Forgotten Await' },
        { emoji: '🔀', label: 'Wrong Signature' },
        { emoji: '🧩', label: 'Wrong-Type Method' },
        { emoji: '🔁', label: 'Quiet Loop Bug' },
      ],
    },
    {
      type: 'concept',
      emoji: '⏳',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Forgotten Await',
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
      name: 'Wrong Signature',
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
      name: 'Wrong-Type Method',
      description: "A method that exists, just not on the type of value you actually have. It's a real method on the wrong object.",
      rows: [
        { label: 'Value:', variant: 'code', tone: 'neutral', value: "tags = ('python', 'ai')   # a tuple" },
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
      name: 'Quiet Loop Bug',
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
        { id: 'flag-1', emoji: '⏳', label: 'Forgotten Await' },
        { id: 'flag-2', emoji: '🔀', label: 'Wrong Signature' },
        { id: 'flag-3', emoji: '🧩', label: 'Wrong-Type Method' },
        { id: 'flag-4', emoji: '🔁', label: 'Quiet Loop Bug' },
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
// PRACTICE: Practice set -> Toolkit -> Completion
// Code behaviour checked by running it (Python 3.9 and 3.12, Node 26)
// in November 2026.
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Code That Reads Well',
        instruction: 'Six short exercises. Read a real test result, spot the broken line, pick the right test, and choose a fix.',
        note: 'Some of this code is correct. Checking code is not the same as distrusting it.',
      },
      items: [
        {
          id: 'p2-evidence-loop',
          kind: 'choose',
          label: 'Read the evidence',
          context: 'You asked the AI to remove inactive users from a list. Before using its loop, you ran it on three test users: ana and ben are inactive, cy is active. This is the real output.',
          prompt: 'What does this tell you?',
          artifact: {
            label: 'Terminal',
            code: true,
            text: "# clean.py\nfor user in users:\n    if user['inactive']:\n        users.remove(user)\nprint(users)\n\n$ python3 clean.py\n[{'name': 'ben', 'inactive': True}, {'name': 'cy', 'inactive': False}]",
          },
          options: [
            { id: 'data', label: "Ben's record must be wrong. Check the input data.", feedback: 'Ben is marked inactive in the input. The data is fine. The loop is not.' },
            { id: 'skip', label: 'The loop skipped ben. Removing ana shifted the list, so the loop jumped over the next item.', correct: true, feedback: 'Right. Each removal moves the remaining items up one place, and the loop moves on past the one that slid into the gap.' },
            { id: 'fine', label: 'There was no error, so the code works. Run it on the real list.', feedback: 'No error is the trap. It finishes cleanly and gives the wrong answer. On the real list, some inactive users would stay.' },
            { id: 'version', label: 'It is a Python bug. Try a newer version.', feedback: 'This is how looping over a list works in every Python version. Changing the list while you walk through it is the bug.' },
          ],
          explanation: "A three-item test caught a bug that reading missed. Removing items from a list while looping over it makes Python skip the item after each removal, and nothing warns you. Build a new list instead: users = [u for u in users if not u['inactive']].",
          takeaway: 'A tiny test input exposes quiet bugs that raise no error',
        },
        {
          id: 'p2-spot-foreach',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Save every user in the list, then log when it's done.'",
          prompt: 'Tap the part that is broken, or tell us nothing is.',
          artifact: { label: 'AI answer (illustrative)', code: true },
          segments: [
            { text: 'async function saveAll(ids) {' },
            { text: '\n  ' },
            { text: 'ids.forEach(async (id) => {', flag: true },
            { text: '\n    ' },
            { text: 'await saveUser(id);' },
            { text: '\n  ' },
            { text: '});' },
            { text: '\n  ' },
            { text: "console.log('All users saved');" },
            { text: '\n' },
            { text: '}' },
          ],
          explanation: "forEach ignores the promises its async callbacks return, so saveAll does not wait for anything. We ran it: 'All users saved' printed first, and the three saves finished afterwards. Any code after saveAll(ids) runs before the data is saved. Use for (const id of ids) { await saveUser(id); }, or await Promise.all(ids.map(saveUser)).",
          takeaway: 'forEach does not wait for async callbacks',
        },
        {
          id: 'p2-pick-regex',
          kind: 'choose',
          label: 'Pick the test',
          context: 'The AI wrote this to pull a date out of a line such as "Invoice date: 2026-03-14":',
          prompt: 'What settles whether this is right, fastest?',
          artifact: { label: 'AI answer (illustrative)', code: true, text: "import re\n\nmatch = re.search(line, r'\\d{4}-\\d{2}-\\d{2}')" },
          options: [
            { id: 'ask', label: 'Ask the AI: "Is the argument order correct?"', feedback: 'It chose the order in the first place. It may agree with itself, or change it. Neither answer is evidence.' },
            { id: 'compile', label: 'Run python -m py_compile on the file', feedback: 'It passes. The syntax is valid and both arguments are strings. A syntax check cannot see swapped arguments.' },
            { id: 'help', label: 'Check the signature with help(re.search), then try it on one sample line', correct: true, feedback: 'Right. help shows search(pattern, string, flags=0), so the pattern goes first. On the sample line, the AI version returns None instead of a match.' },
            { id: 'looks', label: 'It uses the standard re module and a raw string, so it is fine', feedback: 'A real module and a real function, called in the wrong order. That is exactly the Wrong Signature red flag.' },
          ],
          explanation: 're.search(line, pattern) raises no error. It treats your invoice line as the pattern, finds nothing, and returns None, so the date quietly goes missing. The signature takes ten seconds to check, and one sample input confirms it.',
          takeaway: 'A syntax check passes swapped arguments. Check the signature and try one input',
        },
        {
          id: 'p2-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Which regions have more than 10 paid orders?'",
          prompt: 'Tap the part that is broken, or tell us nothing is.',
          artifact: { label: 'AI answer', code: true },
          segments: [
            { text: 'SELECT region, COUNT(*) AS n' },
            { text: '\n' },
            { text: 'FROM orders' },
            { text: '\n' },
            { text: "WHERE status = 'paid'" },
            { text: '\n' },
            { text: 'GROUP BY region' },
            { text: '\n' },
            { text: 'HAVING COUNT(*) > 10;' },
          ],
          explanation: 'Nothing is wrong. The clauses are in the required order (SELECT, FROM, WHERE, GROUP BY, HAVING). WHERE filters rows before grouping, and HAVING filters the groups, which is the right way to filter on COUNT(*). We ran it on a small test table and it returned only the region with 11 paid orders.',
          takeaway: 'WHERE filters rows, HAVING filters groups. Plenty of AI code is correct',
        },
        {
          id: 'p2-diagnose',
          kind: 'pickAll',
          label: 'Diagnose',
          context: 'Five lines from different AI answers.',
          prompt: 'Which ones will fail or give a wrong result?',
          optionsCode: true,
          options: [
            { id: 'timeout', label: 'setTimeout(() => save(draft), 500);', feedback: 'Callback first, delay second. This one is correct.' },
            { id: 'max', label: 'const top = Math.max(prices);  // prices = [4, 9, 2]', correct: true, feedback: 'Math.max takes separate numbers, not an array. This returns NaN, with no error. Use Math.max(...prices).' },
            { id: 'set', label: 'seen = {"a", "b"}\nfirst = seen[0]', correct: true, feedback: "seen is a set, and sets have no positions. Python raises TypeError: 'set' object is not subscriptable." },
            { id: 'json', label: 'const data = await res.json();', feedback: 'res.json() returns a Promise, and it is awaited. This one is correct.' },
            { id: 'index', label: 'last = items[len(items)]', correct: true, feedback: 'Positions run from 0 to len(items) - 1, so this raises IndexError. Use items[-1].' },
          ],
          explanation: 'Three broken lines: a wrong signature, the wrong type (indexing a set as if it were a list), and an off-by-one. Each reads smoothly. Math.max is the worst of the three, because it fails silently and hands NaN to the rest of your code.',
          takeaway: 'Ask what type you have and what the function really accepts',
        },
        {
          id: 'p2-fix-loop',
          kind: 'choose',
          label: 'Fix it',
          context: "You asked: 'Print the name of every item.' The AI wrote:",
          prompt: 'Which version should you use?',
          artifact: { label: 'AI answer (illustrative)', code: true, text: 'for (let i = 0; i <= items.length; i++) {\n  console.log(items[i].name);\n}' },
          optionsCode: true,
          options: [
            { id: 'optional', label: 'for (let i = 0; i <= items.length; i++) {\n  console.log(items[i]?.name);\n}', feedback: 'This hides the crash instead of fixing it. The loop still runs one step too far and prints undefined at the end.' },
            { id: 'forof', label: 'for (const item of items) {\n  console.log(item.name);\n}', correct: true, feedback: 'Right. for...of visits each item exactly once, with no index to get wrong.' },
            { id: 'start1', label: 'for (let i = 1; i <= items.length; i++) {\n  console.log(items[i].name);\n}', feedback: 'Now it skips the first item and still crashes on the last pass.' },
            { id: 'forin', label: 'for (const i in items) {\n  console.log(i.name);\n}', feedback: "for...in gives you the positions as strings ('0', '1'), not the items. i.name is undefined, so every line prints undefined." },
          ],
          explanation: 'The original throws a TypeError on the last pass, because items[items.length] is undefined. A fix that only silences the error, like ?., is worse: the bug is still there and now it is quiet. We ran all four versions on a two-item array to check.',
          takeaway: 'Fix the boundary, not the symptom. for...of avoids it entirely',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Six out of six. You judge code by what it does, not by how tidy it looks.' },
          { min: 4, message: 'Solid. Look again at the ones you missed: they are the bugs that get through review.' },
          { min: 0, message: 'These were tricky on purpose. Go back over the explanations, and run the next snippet before you trust it.' },
        ],
      },
      summary: {
        insight: 'Two bugs raised no error at all, one quietly returned None, and one piece of code was simply correct. Reading alone did not separate them. A signature check and one tiny input did, in under a minute.',
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
  estimatedTime: 10,

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
