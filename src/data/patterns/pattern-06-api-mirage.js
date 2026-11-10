// src/data/patterns/pattern-06-api-mirage.js
// Pattern 06: API Mirage
//
// The library is REAL. The method, parameter, flag, or endpoint is not.
// Case study: OneLogin's official MCP server ships tools for a non-existent
// /api/2/login_pages endpoint, removed as "hallucinated" (February 2026).
// Callback: Soundslice / ChatGPT "ASCII tab import" (July 2025).
// TARGET: about 10 minutes total
//
// Block-based schema: see docs/pattern-authoring-guide.md.

// ============================================
// SEE: Story -> Would you run it? -> Reveal -> Why it matters
// ============================================
const see = {
  title: 'Endpoint That Was Never There',
  steps: [
    {
      type: 'prose',
      heading: 'This time, the vendor is real.',
      body: `OneLogin is a real identity and single sign-on platform with a documented REST API. In October 2025, an MCP server appeared in OneLogin's own verified GitHub organisation. An MCP server is a connector that lets Claude and other AI clients act on your account by calling tools. It was published on npm as @onelogin/onelogin-mcp.

A commit on the day of the first release was titled "complete OneLogin API coverage with 177 tools". Five of those tools managed custom login pages, so an admin could ask an AI assistant to build a branded sign-in page.`,
    },
    {
      type: 'chat',
      user: 'Create a custom branded login page for our OneLogin tenant.',
      ai: {
        text: `I can do that with the OneLogin MCP tools. I'll call create_login_page:

POST /api/2/login_pages
- name: "Acme branded login"
- html_content: your form, using OneLogin's template variables {{username_field}} and {{password_field}}
- javascript_content: calls submitLogin() on submit

Then I'll return the preview_url so you can test it before enabling.`,
        note: 'Reconstruction, not a transcript of a real session. The tool name, the /api/2/login_pages route, preview_url and the {{username_field}}, {{password_field}} and submitLogin() details come from the tool descriptions in the published npm package (versions 1.0.0 to 1.0.7).',
      },
    },
    {
      type: 'choice',
      question: "The vendor is real, and the connector comes from the vendor's own GitHub organisation. Would you let the AI run this?",
      subtext: 'The route is tidy, the description is detailed, and 170-odd sibling tools sit next to it.',
      options: [
        { id: 'yes-ran', label: 'Yes. The vendor shipped it, so the endpoint must exist', response: "That's the trap. A real vendor, a real package and many real neighbours make one invented route feel safe." },
        { id: 'maybe-ran', label: "I'd try it. If it fails, I'll know", response: "Sometimes. But as you'll see, one of this server's made-up routes failed with a 401 that looked like a permissions problem, not a missing endpoint." },
        { id: 'no-docs', label: "I'd look for /api/2/login_pages in OneLogin's API reference", response: 'Good habit. You would not have found it. Keep that habit for the rest of this lesson.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'There is no /api/2/login_pages.',
      explanation: `On 5 February 2026, an issue on the repository asked for login-pages.js to be removed: "fantasy stuff from AI - remove it please". The fix, titled "Remove hallucinated login_pages API module", said the five tools targeted an endpoint "that does not exist in the OneLogin API v2 specification". They had been in every npm release since October 2025 and were gone in version 1.0.8 the same day.

OneLogin's API does have a "Login Page" section, but it is in version 1 and it logs a user in (POST /api/1/login/auth). It does not store HTML pages. The AI stretched a real name into a neat create, read, update and delete resource.

It was not the only phantom. In April 2026, an issue reported that the client_app tools failed with 404 and 400, and the fix, "remove phantom client_app tools", said they hit a route that "is not a real route". In September, generate_report kept returning 401 even with "Manage All" credentials. A maintainer explained it wasn't a permissions problem: POST /api/2/reports/generate "does not exist", and production answers unknown /api/2 paths with 401.`,
      list: {
        title: "Here's what happened:",
        items: [
          'The AI knew OneLogin had a real API, real branding endpoints and a v1 "Login Page" section',
          'It extended them into a tidy REST resource: list, get, create, update and delete on /api/2/login_pages',
          'It wrote confident details to match, such as template variables and a submitLogin() function for a route that never existed',
          'It shipped for about three and a half months because the vendor, the package and most of the tools were real',
          'Same shape as Soundslice in 2025, when ChatGPT told people a real product could import ASCII tab. It could not',
        ],
      },
    },
    {
      type: 'stats',
      title: 'How common is this in code?',
      items: [
        { value: '38.58%', label: 'Valid calls to rarely used APIs', detail: 'GPT-4o on the CloudAPIBench benchmark' },
        { value: '47.94%', label: 'With API docs added to the prompt', detail: 'better, but about half still invalid' },
        { value: '38 tools', label: 'Removed from the OneLogin MCP server in one day', detail: 'no public OneLogin API behind them, 2 February 2026' },
      ],
      source: 'Jain et al., "On Mitigating Code LLM Hallucinations with API Documentation" (arXiv 2407.09726, 2024); github.com/onelogin/onelogin-mcp, commit 3ebd9ae and PR #29 (February 2026)',
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Loud failure:', body: "The phantom client_app tools returned 404 and 400. You lose time, and if you paste the error back to the AI, it may invent a different route.", tone: 'neutral' },
        { label: 'Misleading failure:', body: 'Some APIs answer unknown routes with 401. The invented reports endpoint looked like a permissions problem, so the reporter tried new credentials with "Manage All". It still failed, because the route never existed.', tone: 'danger' },
        { label: 'Silent failure:', body: "A made-up option on a real function can be ignored without any error. You believe retries, validation, or a safety setting is on when it isn't.", tone: 'danger' },
      ],
      conclusion: 'This is the API Mirage: real library, imaginary surface. The AI fills gaps in its memory with whatever the naming conventions suggest.',
      transition: "So how could an admin have caught /api/2/login_pages before running it? Let's test the tool call.",
    },
  ],
};

// ============================================
// TEST: test the tool call from SEE. Spot what to test, then run the tests.
// OneLogin facts below were read from developers.onelogin.com (v2 API menu,
// Branding > Create Account Brand, v1 Create Session Login Token), the
// onelogin/onelogin-python-sdk main branch, and onelogin-mcp issue #63 and
// PR #29 on 9 Nov 2026.
// ============================================
const test = {
  title: 'Testing the Tool Call',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'Before the AI runs anything, read what it plans to call.',
      instruction: 'Tap the parts of this plan you would want to test. Some parts are fine. Some are exactly where the problem hides.',
      source: 'From the AI answer, using the OneLogin MCP tools',
      code: true,
      segments: [
        { text: 'I can do that with the OneLogin MCP tools.', note: "True. The connector is real and comes from OneLogin's own GitHub organisation. That vouches for the package, not for every route inside it." },
        { text: ' ' },
        { text: "I'll call create_login_page:", note: 'This tool really was in the published package. But a tool in a connector is just a wrapper someone wrote. It proves nothing about the API behind it.' },
        { text: '\n\n' },
        { text: 'POST', note: 'POST is the normal verb for creating something. Right shape, tells you nothing.' },
        { text: ' ' },
        { text: '/api/2/login_pages', flag: { label: 'Exact route', explanation: "Everything depends on this exact path existing in OneLogin's v2 API. It follows the usual REST pattern, which is why it looks right. Tidy is not the same as documented." } },
        { text: '\n' },
        { text: '- name: "Acme branded login"', note: 'Your own label for the page. Nothing to check.' },
        { text: '\n' },
        { text: '- html_content: your form,', note: 'A page builder that accepts HTML sounds plausible. Plausible is still not documented.' },
        { text: ' ' },
        { text: "using OneLogin's template variables {{username_field}} and {{password_field}}", flag: { label: 'Specific details for an unchecked route', explanation: 'Named template variables feel like they came from real docs. If the route is invented, details like these were invented to match it. Search for them too.' } },
        { text: '\n' },
        { text: '- javascript_content: calls submitLogin() on submit', note: 'Another named detail hanging off the same route. It stands or falls with /api/2/login_pages.' },
        { text: '\n\n' },
        { text: "Then I'll return the preview_url", flag: { label: 'A promised response field', explanation: 'The plan assumes the API sends back a preview_url. That is a claim about the response of a route nobody has confirmed. The safety step only works if the endpoint is real.' } },
        { text: ' so you can test it before enabling.', note: 'Sounds careful, and previewing is a good habit. It just cannot protect you from a route that is not there.' },
      ],
      summary: "Three things to test: is the route in OneLogin's reference, do the details around it exist anywhere official, and what would the API really send back? Next, run the tests.",
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'You are the OneLogin admin. You have a browser, a sandbox tenant and a few minutes. Which tests actually tell you whether /api/2/login_pages is real?',
      claim: {
        label: 'Tool call',
        text: 'create_login_page\nPOST /api/2/login_pages',
        code: true,
      },
      rounds: [
        {
          title: 'Test 1: Is the route documented?',
          question: 'What do you check first?',
          options: [
            {
              id: 'vendor-org',
              label: "It ships in OneLogin's own GitHub org and npm scope, so it's covered",
              useful: false,
              feedback: "The vendor's name vouches for the package, not for each route in it. This route shipped from that organisation for about three and a half months, and 38 other tools with no public API behind them were removed in a single day in February 2026.",
            },
            {
              id: 'api-ref',
              label: "Search OneLogin's v2 API reference for login_pages",
              useful: true,
              resultLabel: 'developers.onelogin.com, v2 menu (checked 9 Nov 2026)',
              result: 'Branding: Account Brands, Email Settings, Message Templates,\n          Languages, Custom Messages\nlogin_pages: not listed in v2\nLogin Page (V1): POST /api/1/login/auth  (logs a user in)',
              feedback: 'The v2 reference has a Branding section but no login_pages resource. The only "Login Page" is a separate v1 API for signing a user in. It does not store pages.',
              kit: "Search the vendor's API reference for the exact route, in the version you are calling",
            },
            {
              id: 'description',
              label: 'Read the tool description: it lists fields, template variables and a preview URL',
              useful: false,
              feedback: 'An AI can write a detailed description as easily as a route. The template variables and submitLogin() were in the description too. Detail is a surface signal, not evidence.',
            },
          ],
        },
        {
          title: 'Test 2: Is it missing, or just undocumented?',
          question: 'The reference does not list it. How do you confirm before you file a bug?',
          options: [
            {
              id: 'sdk',
              label: "Check OneLogin's official SDK for the route",
              useful: true,
              resultLabel: 'onelogin/onelogin-python-sdk, main branch (checked 9 Nov 2026)',
              result: '$ grep -r login_pages onelogin-python-sdk\n(no matches)\n\nBrandingServiceApi:\n  POST   /api/2/branding/brands\n  GET    /api/2/branding/brands/{brand_id}\n  PUT    /api/2/branding/brands/{brand_id}\n  DELETE /api/2/branding/brands/{brand_id}',
              feedback: "The vendor's own SDK covers branding but has no login_pages anywhere. Two official sources agree, and neither knows the route.",
              kit: "Cross-check the vendor's SDK or OpenAPI spec for the exact path",
            },
            {
              id: 'compare-call',
              label: 'In the sandbox, call a documented route and the suspect route with the same token',
              useful: true,
              resultLabel: 'Illustrative, based on the 401 body in OneLogin docs and the maintainer note in issue #63',
              result: 'GET /api/2/branding/brands   200 OK\nGET /api/2/login_pages       401 {"message":"Unauthorized","statusCode":401,"name":"UnauthorizedError"}',
              feedback: 'If the same token works on a documented route, the token is not the problem. OneLogin answers unknown /api/2 paths with 401, so a 401 here does not mean the route exists. Use read-only requests, and only in a tenant you are allowed to test.',
              kit: 'Read the status code properly: a 401 on an unknown path is not proof the route exists',
            },
            {
              id: 'admin-creds',
              label: 'It said 401, so re-run it with new "Manage All" credentials',
              useful: false,
              resultLabel: 'What happened in issue #63 (generate_report, September 2026)',
              result: '"generate_report responds with 401 response even when mcp server is configured to use a new set of api creds with manage all permissions"',
              feedback: 'A maintainer replied that it was not a permissions problem: POST /api/2/reports/generate does not exist. More permissions cannot fix a route that was never built.',
            },
          ],
        },
        {
          title: 'Test 3: What is the real way?',
          question: 'You still need a branded sign-in page. Where do you get the right approach?',
          options: [
            {
              id: 'ask-ai',
              label: 'Paste the error back to the AI and ask for the correct endpoint',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'Sorry about that, the endpoint has moved. Use POST /api/2/branding/login_pages instead...',
              feedback: 'The model that invented the first route will happily invent a second. You are back to Test 1 with a new guess.',
            },
            {
              id: 'branding-docs',
              label: 'Read the Branding section of the v2 reference',
              useful: true,
              resultLabel: 'From the Create Account Brand page (checked 9 Nov 2026)',
              result: 'POST /api/2/branding/brands\nname, custom_color, custom_accent_color, logo, background,\ncustom_label_text_for_login_screen, login_instruction, ...\n\n"To apply this brand to the login page for a specific application\nyou need to take the newly created brand id value and update the\napplications brand_id attribute."',
              feedback: 'This is how OneLogin really brands a login page: a brand with colours, logo, background and login text, linked to an app. There are no HTML or JavaScript fields. The page also marks the Branding API as an early preview.',
              kit: "Take the route for the job from the vendor's reference, not from the AI",
            },
            {
              id: 'v1-login',
              label: 'Use the v1 Login Page API instead, since the name matches',
              useful: false,
              feedback: 'Same name, different job. POST /api/1/login/auth checks a user\'s username and password and returns a session token. It does not create or store pages. Matching a name is how this mirage started.',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what is /api/2/login_pages?',
        options: [
          { id: 'hidden', label: "A real but undocumented route your credentials can't reach", correct: false, feedback: 'That is the trap the 401 sets. The maintainers removed it because it does not exist in the OneLogin API v2 specification, and the official SDK has no trace of it.' },
          { id: 'mirage', label: 'An AI-invented route on a real API, shipped inside an official connector', correct: true, feedback: 'Right. The vendor, the package and most of the tools were real. This route was not. PR #29 removed all five login page tools in version 1.0.8 on 5 February 2026.' },
          { id: 'v1-renamed', label: "OneLogin's v1 Login Page API under a newer version number", correct: false, feedback: 'Close in name only. The v1 Login Page API signs a user in. It never stored HTML pages, and nothing replaced it at /api/2/login_pages.' },
        ],
      },
      kit: {
        title: 'Your API Mirage Test Kit',
        footer: 'A few minutes in the reference and the SDK. The tool call looked equally convincing either way. Only the tests could tell the difference.',
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
      heading: 'API mirages follow predictable patterns.',
      subtext: "AI predicts what a library's API probably looks like. These four habits show up again and again.",
      cards: [
        { emoji: '🔀', label: 'Borrowed Method' },
        { emoji: '🪞', label: 'Symmetry Guess' },
        { emoji: '🎁', label: 'Helpful Parameter' },
        { emoji: '🛣️', label: 'Endpoint by Convention' },
      ],
    },
    {
      type: 'concept',
      emoji: '🔀',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Borrowed Method',
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
      name: 'Symmetry Guess',
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
      name: 'Helpful Parameter',
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
      name: 'Endpoint by Convention',
      description: 'The AI invents a REST URL that follows the usual pattern, for a real service whose API has no such route.',
      rows: [
        { label: 'Documented (illustrative):', variant: 'chips', tone: 'good', values: ['GET /v2/users/{id}', 'POST /v2/exports'] },
        { label: 'AI invents:', variant: 'code', tone: 'danger', value: 'GET /v2/users/{id}/export' },
      ],
      note: "The URL is tidy and RESTful, which is exactly why it looks credible. OneLogin's MCP server shipped five tools for /api/2/login_pages, a route its API never had. Tidy is not the same as documented.",
      why: 'APIs often follow shared conventions, so the AI can generate a URL that looks right for almost any service. It cannot know which routes the vendor actually built.',
      spot: 'Find the route in the vendor\'s API reference or OpenAPI spec. A convention-shaped URL is a guess until you see it listed.',
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each suspicious call, identify which red flag gives it away:',
      options: [
        { id: 'flag-1', emoji: '🔀', label: 'Borrowed Method' },
        { id: 'flag-2', emoji: '🪞', label: 'Symmetry Guess' },
        { id: 'flag-3', emoji: '🎁', label: 'Helpful Parameter' },
        { id: 'flag-4', emoji: '🛣️', label: 'Endpoint by Convention' },
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
// PRACTICE: Practice set -> Toolkit -> Completion
// Checked in November 2026: docs.github.com REST "Starring" page (lists
// GET /repos/{owner}/{repo}/stargazers, no /stars route); unauthenticated
// curl to api.github.com returned 404 for /repos/psf/requests/stars and 401
// "Requires authentication" for /stargazers. git 2.54 output and the
// git-scm.com git-push page (no --force-if-safe). pandas 2.3.3 (read_csv
// has skip_blank_lines, not skip_blank_rows), Node 26 and Python 3.9 were
// run for every code claim.
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Six Calls to Check',
        instruction: 'Pick the right check, read real tool output, spot one wrong word in good code, and fix a call that is almost right.',
        note: 'Some of these calls are fine. A new or unfamiliar name is not the same as an invented one.',
      },
      items: [
        {
          id: 'p6-pick-test',
          kind: 'choose',
          label: 'Pick the test',
          context: "You asked: 'How do I list the people who starred a GitHub repo, using the REST API?' The AI replied: 'Call GET /repos/{owner}/{repo}/stars.'",
          prompt: 'What do you do first?',
          options: [
            { id: 'ask', label: 'Ask the AI to confirm the endpoint is correct', feedback: 'It will usually confirm its own answer, or swap in a new guess. Neither tells you what GitHub built.' },
            { id: 'token', label: 'Call it, and if it fails, retry with a token that has more scopes', feedback: 'More permissions cannot create a route that was never built. You saw this with OneLogin in the SEE phase.' },
            { id: 'docs', label: "Search GitHub's REST API docs for the exact path", correct: true, feedback: 'Right. The Starring page lists "List stargazers": GET /repos/{owner}/{repo}/stargazers. There is no /stars route for a repository.' },
            { id: 'convention', label: 'It follows REST naming and GitHub has stars, so it is fine', feedback: 'That is Endpoint by Convention. Tidy is not the same as documented.' },
          ],
          explanation: 'When we checked without a token, /stars returned 404 Not Found, while the real /stargazers returned 401 "Requires authentication" with a link to its docs page. Status codes mean different things on different APIs, so the reference decides, not the error.',
          takeaway: 'Find the exact path in the reference before you call it',
        },
        {
          id: 'p6-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Read config.json in Python and print its name field, or \"unknown\" if it is missing.'",
          prompt: 'Tap the part that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer', code: true },
          segments: [
            { text: 'import json' },
            { text: '\n\n' },
            { text: "with open('config.json') as f:" },
            { text: '\n    ' },
            { text: 'data = json.load(f)' },
            { text: '\n\n' },
            { text: 'print(' },
            { text: "data.get('name', 'unknown')" },
            { text: ')' },
          ],
          explanation: 'Nothing is invented, and it runs. json.load() reads from a file; json.loads(), with an s, reads from a string. dict.get() returns the default when the key is missing. Every name is in the Python docs, so there is nothing to fix.',
          takeaway: 'Every name checked out in the docs, so use it',
        },
        {
          id: 'p6-diagnose-js',
          kind: 'pickAll',
          label: 'Diagnose',
          context: 'An AI wrote some JavaScript that uses this array:',
          prompt: "Which calls would fail with 'is not a function'?",
          artifact: { label: 'AI answer', code: true, text: 'const items = [3, 1, 2];' },
          optionsCode: true,
          options: [
            { id: 'at', label: 'items.at(-1)', feedback: 'Real. It returns the last element, 2.' },
            { id: 'findLast', label: 'items.findLast(n => n > 1)', feedback: 'Real. It returns the last match, 2.' },
            { id: 'toSorted', label: 'items.toSorted()', feedback: 'Real. It returns a sorted copy and leaves items unchanged.' },
            { id: 'last', label: 'items.last()', correct: true, feedback: 'Not an array method. Some other languages and libraries have last(). In JavaScript, use items.at(-1).' },
            { id: 'contains', label: 'items.contains(2)', correct: true, feedback: 'Not an array method. The real one is items.includes(2).' },
          ],
          explanation: "at(), findLast() and toSorted() are newer, so they can look invented. They are real. last() and contains() sound familiar, and they are not. Gut feeling can't tell these apart, but node -e \"console.log(typeof [].last)\" can: it prints 'undefined'.",
          takeaway: 'Unfamiliar is not the same as invented: test the exact name',
        },
        {
          id: 'p6-evidence-git',
          kind: 'choose',
          label: 'Read the evidence',
          context: "After a rebase, the AI told you to run 'git push --force-if-safe origin main'. You ran it.",
          prompt: 'What does this tell you?',
          artifact: {
            label: 'Terminal (git 2.54)',
            code: true,
            text: "$ git push --force-if-safe origin main\nerror: unknown option `force-if-safe'\nusage: git push [<options>] [<repository> [<refspec>...]]\n    ...\n    -f, --[no-]force      force updates\n    --[no-]force-with-lease[=<refname>:<expect>]\n                          require old value of ref to be at this value",
          },
          options: [
            { id: 'old', label: 'My git is too old. Upgrade and try again.', feedback: "'unknown option' means this git has no such flag. This is a current git, and the flag is not in the git-push docs either." },
            { id: 'lease', label: 'The flag does not exist. The safe option is --force-with-lease, listed right there.', correct: true, feedback: 'Right. --force-with-lease only overwrites the remote branch if it still matches what you last fetched.' },
            { id: 'force', label: 'Use -f instead. It does the same thing.', feedback: "-f overwrites the remote branch whatever is on it, including a teammate's new commits. That is the opposite of 'if safe'." },
            { id: 'config', label: 'It needs a config setting turned on first.', feedback: 'Git said the option is unknown, not disabled. Looking for a setting to switch on a made-up flag wastes time.' },
          ],
          explanation: 'The tool is the fastest reference you have. Its usage text lists the real options, and the made-up name reads like a description of --force-with-lease. Read the error before you ask the AI again.',
          takeaway: "'unknown option' means it doesn't exist: read the usage text",
        },
        {
          id: 'p6-spot-param',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Load sales.csv, skip blank lines, and total sales per region.'",
          prompt: 'Tap the part that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer', code: true },
          segments: [
            { text: 'import pandas as pd' },
            { text: '\n\n' },
            { text: 'df = pd.read_csv(' },
            { text: "'sales.csv', " },
            { text: 'skip_blank_rows=True', flag: true },
            { text: ')' },
            { text: '\n' },
            { text: "totals = df.groupby('region')" },
            { text: ".agg({'sales': 'sum'})" },
            { text: '\n' },
            { text: 'print(totals.to_markdown())' },
          ],
          explanation: "pandas calls it skip_blank_lines, not skip_blank_rows, and it is already True by default. The wrong name raises TypeError: read_csv() got an unexpected keyword argument 'skip_blank_rows'. The rest is real: groupby().agg() is standard pandas, and to_markdown() exists (it needs the tabulate package). One wrong word in otherwise good code is what an API mirage usually looks like.",
          takeaway: 'Check every argument name, even in code that is otherwise right',
        },
        {
          id: 'p6-fix-contains',
          kind: 'choose',
          label: 'Fix it',
          context: "You asked: 'In Python, check whether a username contains \"admin\".' The AI wrote:",
          prompt: 'Which line should replace the first one?',
          artifact: { label: 'AI answer', code: true, text: 'if name.contains("admin"):\n    deny_access()' },
          optionsCode: true,
          options: [
            { id: 'in', label: 'if "admin" in name:', correct: true, feedback: 'Right. The in operator is how Python checks for a substring.' },
            { id: 'includes', label: 'if name.includes("admin"):', feedback: 'That is JavaScript. Python strings have no includes() method.' },
            { id: 'find', label: 'if name.find("admin"):', feedback: "find() is real, but it returns a position, not True or False. It returns -1 (truthy) when 'admin' is missing and 0 (falsy) when the name starts with it. This would block names without 'admin' and let 'admin_user' through." },
            { id: 'str', label: 'if name.str.contains("admin"):', feedback: '.str.contains() is real, but only on a pandas Series. On a plain string it raises AttributeError.' },
          ],
          explanation: 'Python strings have no contains() method, so the original raises AttributeError. The name is borrowed from other languages and from pandas. The find() option is the nasty one: a real method that runs without an error and gives the wrong answer.',
          takeaway: 'A real method can still be the wrong one: confirm what it returns',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Six out of six. You check the exact name, and you trust real calls once they check out.' },
          { min: 4, message: 'Solid. The ones you missed are the near-misses that slip through code review.' },
          { min: 0, message: 'These are hard because everything looks plausible. Keep the habit: exact symbol, official reference, minimal call.' },
        ],
      },
      summary: {
        insight: 'One answer was entirely fine, and three of the JavaScript methods were real even though they look new. Each mirage was a single wrong word: a route, a flag, a parameter, a method. The docs, the tool itself or a quick run told them apart.',
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
          whatToLookFor: "404 suggests the route doesn't exist. Don't treat 401 or 403 as proof that it does: some APIs, OneLogin's among them, answer unknown routes with 401. Use only read-only requests on routes you're allowed to call, and confirm in the vendor docs.",
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
  estimatedTime: 10,

  skillLearned: 'Verifying exact APIs, methods, flags, and endpoints against official docs',
  verificationMethod: "Docs Or It Didn't Happen",

  caseStudy: {
    name: "OneLogin's official MCP server removes hallucinated tools for a /api/2/login_pages endpoint that never existed",
    date: 'February 2026',
    researcher: 'Reported in the onelogin/onelogin-mcp GitHub repository (issue #22, PR #29); later phantom-endpoint fixes in issues #50 and #63',
    source: 'https://github.com/onelogin/onelogin-mcp/pull/29',
  },

  nextLesson: {
    id: 'pattern-07',
    title: 'Historical Confabulation',
    teaser: 'Wrong dates, wrong quotes, wrong people.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
