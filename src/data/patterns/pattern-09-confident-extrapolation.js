// src/data/patterns/pattern-09-confident-extrapolation.js
// Pattern 09: Confident Extrapolation
//
// Idea: models have a knowledge cutoff and no live data. Asked about recent
// events, "the latest" anything, or things they cannot possibly know, they
// may extrapolate from patterns instead of saying "I don't know".
//
// Anchor: real 2026 research on AI chatbots answering US midterm voting
// questions with outdated or wrong deadlines (IFPG via NPR, Nov 2026; ISD via
// The Hill, Sep 2026). Callbacks: Cursor "Sam" (Apr 2025), Moffatt v. Air
// Canada (Feb 2024). Quiz items that name "Acme" are illustrative; the quiz
// tests the KIND of claim (time-sensitive vs timeless vs unknowable).

// ============================================
// SEE (3 min): Story -> Trust check -> Reveal
// ============================================
const see = {
  title: 'The Answer From Yesterday',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'Ask an AI when to vote.',
      body: `In the run-up to the US midterm elections on 3 November 2026, researchers at the nonprofit Innovating for the Public Good (IFPG) put real voter questions to seven major AI chatbots and tracked the answers.

NPR reported one of them. A chatbot was asked about voting in Michigan's 4th congressional district.`,
    },
    {
      type: 'chat',
      user: "When is the 2026 election in Michigan's 4th congressional district and how do I vote?",
      ai: {
        text: `Here's how to vote in Michigan's 4th district:

**Register online:** by [a date later than the real deadline]
**Register by mail:** by [a date later than the real deadline]

Then vote in person on Election Day, or request an absentee ballot.`,
        note: 'Reconstruction. The user prompt is quoted by NPR. NPR reported that Claude gave online and by-mail registration deadlines later than the actual ones; the exact wording and dates were not published.',
      },
    },
    {
      type: 'choice',
      question: 'Would you plan your registration around those dates?',
      subtext: "There's no wrong answer here. We're testing your instincts.",
      options: [
        { id: 'yes-pinned', label: 'Yes, it sounds specific and official', response: 'Very natural. Specific dates feel like facts. But specificity is not the same as freshness.' },
        { id: 'maybe-asked-date', label: "I'd ask where those dates came from", response: "Good instinct. The answer doesn't say. That missing source is the whole problem." },
        { id: 'no-check-source', label: "No, I'd check my state's election website", response: 'Exactly the habit we are building. Keep it.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'The deadlines were wrong, and later than the real ones.',
      explanation: `A voter who trusted that answer could have **missed the registration deadline**. The answer looked like a fact about the present, but it was not grounded in the current rules.

It was not a one-off. In IFPG's October data, **13.9%** of chatbot answers to voting-logistics questions were outdated or inaccurate. A separate September study by the Institute for Strategic Dialogue (ISD) found models showing outdated requirements and deadlines, misidentifying Election Day dates, and in DeepSeek's case referencing **2024** election dates. ISD flagged "a reliance on outdated sources" and "overconfidence".

(Anthropic told NPR that API testing may have bypassed some of Claude's safeguards; IFPG said its web and API results were comparable.)`,
      list: {
        title: "Here's what went wrong:",
        items: [
          "The question depended on today's rules and dates, which change every election",
          "Instead of saying 'check your state's official site', the bot produced confident specifics",
          'Old or wrong information was stated in the present tense, as if it were current',
          'Nothing in the reply gave a date, a source, or a reason to doubt it',
        ],
      },
    },
    {
      type: 'stats',
      title: 'The Scale',
      items: [
        { value: '13.9%', label: 'Voting-logistics answers', detail: 'outdated or inaccurate (IFPG)' },
        { value: '5.9%', label: 'Answers that could mislead', detail: 'e.g. a missed deadline or wrong day (IFPG)' },
        { value: '29%', label: 'Election-process replies', detail: 'incomplete, inaccurate or outdated (ISD)' },
      ],
      source: 'IFPG research reported by NPR, Nov 2026; ISD report via The Hill, Sep 2026',
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Quietly outdated:', body: "A deadline, a price, a version, or last year's rules. Nothing breaks loudly until the date has passed.", tone: 'neutral' },
        { label: 'Actually risky:', body: "The same confident tone covers things a bot can't know at all. In 2025 Cursor's support bot \"Sam\" told users about a one-device login policy that didn't exist, and in 2024 Air Canada was held liable for a refund policy its chatbot described wrongly.", tone: 'danger' },
      ],
      conclusion: 'The model is not lying on purpose. It is completing a pattern, and the pattern of a good answer is a confident one.',
      transition: "Let's test your instincts: which claims can an AI actually know?",
    },
  ],
};

// ============================================
// TEST (4 min): 5 AI claims - Trust or Verify?
// ============================================
const test = {
  title: 'Trust or Verify?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 claims from AI assistants.',
        instruction: 'For each one, decide: could the AI actually know this, so you can use it, or should you check it first?',
        note: 'Ask yourself: is this claim stable over time, or does it depend on today\'s date?',
        legend: {
          trust: { label: 'TRUST', detail: 'Safe to use as-is', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Check a live source first', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          prompt: 'The latest stable release of Acme CLI is 4.2.\nInstall it with:\nacme upgrade --to 4.2',
          code: true,
          context: "You asked: 'What's the newest Acme CLI version?' (no web search available)",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Time-sensitive',
          explanation: "VERIFY. 'The latest' changes over time, and the model can only report what it saw before its cutoff. Check the official release page.",
          redFlag: "'The latest' stated as a present-tense fact, with no date",
        },
        {
          id: 'item-2',
          prompt: 'Water boils at 100 degrees Celsius at sea-level atmospheric pressure.',
          context: "You asked: 'At what temperature does water boil?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Timeless',
          explanation: "TRUST. This is stable, well-established science. It doesn't depend on today's date, and the answer even includes the right condition (sea level).",
          meta: 'Stable fact, no cutoff risk',
        },
        {
          id: 'item-3',
          prompt: "I've read the article at that link. Its three main arguments are: (1) the policy was rushed, (2) costs were underestimated, (3) a review is planned for next spring.",
          context: "You pasted a URL in a chat tool that has no browsing and asked: 'Summarize this.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Phantom read',
          explanation: "VERIFY. If the tool can't open links, it never read the page. This summary is invented from the URL words and your wording. Open the article yourself.",
          redFlag: "Claims to have read a link it couldn't open",
        },
        {
          id: 'item-4',
          prompt: 'HTTP status code 404 means "Not Found": the server could not find the requested resource.',
          context: "You asked: 'What does a 404 error mean?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Timeless',
          explanation: 'TRUST. This is a long-standing, standardized convention. Knowledge like this does not go stale the way versions and prices do.',
          meta: 'Defined by the HTTP standard',
        },
        {
          id: 'item-5',
          prompt: 'The S&P 500 will close next year at 6,150.',
          context: "You asked: 'Where will the S&P 500 close next year?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Unknowable',
          explanation: "VERIFY. Nobody can know this, including the AI. A precise number about the future is not knowledge, it's a pattern completed with false precision.",
          redFlag: 'A specific prediction about the future, stated as fact',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You separated timeless knowledge from time-sensitive and unknowable claims. Let's sharpen that further." },
          { min: 4, message: '4 out of 5. Strong instincts. The red flags ahead will help you catch the last one.' },
          { min: 3, message: "3 out of 5. Time-sensitive claims are easy to miss because they sound just like facts. That's why this training exists." },
          { min: 0, message: "This is tricky, and that's the point. Confident extrapolation sounds exactly like knowledge. Let's learn how to tell them apart." },
        ],
      },
      summary: {
        insight: "In this batch, 3 of 5 claims were things the AI couldn't reliably know: something that changes over time, something it never saw, and something in the future. The two safe ones were timeless. The midterm voting deadlines sounded just as sure as the boiling point of water. The question to ask is not 'does it sound right?' but 'could the AI know this?'",
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
      heading: 'Extrapolation follows predictable patterns.',
      subtext: 'When a model answers beyond what it knows, the wording tends to give it away. Watch for these 4 red flags.',
      cards: [
        { emoji: '🕰️', label: 'The Timeless Present' },
        { emoji: '🔮', label: 'The Crystal Ball' },
        { emoji: '👻', label: 'The Phantom Read' },
        { emoji: '🚫', label: 'Missing Cutoff Caveat' },
      ],
    },
    {
      type: 'concept',
      emoji: '🕰️',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Timeless Present',
      description: "Fast-changing facts are stated in plain present tense: 'currently', 'the latest', 'is now'.",
      compare: {
        left: {
          label: '❌ Time-sensitive claims to check:',
          tone: 'danger',
          items: ['The latest version is...', 'The current CEO is...', 'The price is currently...', 'The registration deadline is...'],
        },
        right: {
          label: '✓ Stable claims:',
          tone: 'good',
          items: ['Water boils at 100 C at sea level', 'The Pythagorean theorem', '404 means Not Found', 'Paris is the capital of France'],
        },
      },
      why: "Training text is written in present tense, so the model learned to answer in present tense. But what it learned is a snapshot, and the snapshot has an age.",
      spot: "Any time you see 'latest', 'current', 'now', or 'today', ask: could this have changed since the model was trained?",
    },
    {
      type: 'concept',
      emoji: '🔮',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Crystal Ball',
      description: 'A specific prediction about the future, stated as if it were a known fact.',
      rows: [
        { label: 'You ask:', variant: 'quote', tone: 'neutral', value: 'What will our revenue be next quarter?' },
        { label: 'AI answers:', variant: 'quote', tone: 'danger', value: 'Next quarter your revenue will be $4.2M, up 12%.' },
      ],
      note: 'Compare with an honest answer: "I can\'t know that, but here\'s how you could model it."',
      why: 'A model that continues patterns can continue a trend line with a confident number. Precision feels like insight, but nothing has been measured.',
      spot: "Exact numbers about the future, with no stated assumptions, ranges, or uncertainty, are guesses wearing a suit.",
    },
    {
      type: 'concept',
      emoji: '👻',
      eyebrow: 'Red Flag 3 of 4',
      name: 'The Phantom Read',
      description: "The AI claims to have read a link, file, or private document it never actually saw.",
      rows: [
        { label: 'You ask:', variant: 'quote', tone: 'neutral', value: 'Summarize https://example.com/our-q3-planning-doc' },
        { label: 'AI answers:', variant: 'quote', tone: 'danger', value: 'I reviewed the document. Its key points are: ...' },
      ],
      note: "Without a browsing or file tool, the 'summary' is built from the URL's words and your question.",
      why: "The model's job is to produce a helpful-looking reply. If it can't open the link, a plausible summary can still be generated from the surrounding text.",
      spot: 'If the AI describes something private, brand-new, or behind a login, ask: how could it have seen this? Check the tool actually has access.',
    },
    {
      type: 'concept',
      emoji: '🚫',
      eyebrow: 'Red Flag 4 of 4',
      name: 'Missing Cutoff Caveat',
      description: "The answer never mentions a knowledge limit, a date, or that live data wasn't consulted.",
      rows: [
        { label: 'Risky answer:', variant: 'quote', tone: 'danger', value: 'The interest rate is 4.5%.' },
        { label: 'Healthier answer:', variant: 'quote', tone: 'good', value: "As of my knowledge cutoff the rate was around 4.5%, but this changes. Check the central bank's site for today's figure." },
      ],
      note: 'A caveat is not a guarantee of correctness, but it tells you where to look next.',
      why: 'Many assistants are tuned to sound helpful and direct. Hedging feels unhelpful, so the cutoff caveat is often the first thing to disappear.',
      spot: 'Time-sensitive answer + no date + no source + no caveat = verify before you rely on it.',
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each AI statement, identify which red flag gives it away:',
      options: [
        { id: 'flag-1', emoji: '🕰️', label: 'The Timeless Present' },
        { id: 'flag-2', emoji: '🔮', label: 'The Crystal Ball' },
        { id: 'flag-3', emoji: '👻', label: 'The Phantom Read' },
        { id: 'flag-4', emoji: '🚫', label: 'Missing Cutoff Caveat' },
      ],
      items: [
        { prompt: "The latest version is currently 9.4, so use that.", correct: 'flag-1', explanation: "'Latest' and 'currently' on a fast-changing fact." },
        { prompt: 'Next quarter your churn will be exactly 3.1%.', correct: 'flag-2', explanation: 'A precise future number, stated as fact.' },
        { prompt: "I read the PDF you linked. Section 3 says...", correct: 'flag-3', explanation: "No evidence it could open the file. Check that the tool has file or browsing access." },
        { prompt: "(Asked about today's news) A detailed three-paragraph summary with no date, no source, and no mention of any limits.", correct: 'flag-4', explanation: 'Nothing signals where the information ends or how to confirm it.' },
        { prompt: 'HTTP 404 means Not Found.', correct: 'trick-question', explanation: "Trick question! This is a timeless, standardized fact. Not every confident statement is a problem.", extra: { id: 'trick-question', label: "✓ It's a safe, timeless fact" } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'Check the Clock',
      tagline: 'Before you rely on an AI answer, ask whether it could possibly know.',
      steps: [
        { number: 1, action: 'Ask: could the AI know this?', detail: "Is it time-sensitive (latest, current, today), about the future, or about something private or brand new? If yes, treat the answer as a lead, not a fact.", time: '5 seconds' },
        { number: 2, action: 'Look for a date, then ask about limits', detail: "If no date is given, ask: 'What is your knowledge cutoff, and can you browse or search right now?' A tool with live search is a different situation from a plain model.", time: '10 seconds' },
        { number: 3, action: 'Go to the live primary source', detail: 'Official release page, status page, price feed, news site, or the original document. Not another AI answer.', time: '20 seconds' },
        { number: 4, action: 'Check cited links and compare', detail: "Open any link the AI cites and confirm it says what the AI claims. If the live source and the AI disagree, the live source wins.", time: '15 seconds' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'The answer states its date or knowledge cutoff',
            'It points you to an official source',
            'It separates what it knows from what it is guessing',
            'It uses search or browsing and shows its sources',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            "'Latest', 'current', or 'today' with no date",
            'Precise numbers about the future',
            'Summaries of links or files it may not have opened',
            'No hedging on a topic that changes quickly',
          ],
        },
      },
      footer: 'A live source takes about a minute to check. A decision made on stale information can take much longer to undo.',
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
        heading: 'Practice Drill: 5 subtler claims.',
        instruction: "These are harder. Some are safe, some are traps. Decide: use it, or check first?",
        note: 'Think about where the information came from, not just how it sounds.',
        legend: {
          trust: { label: 'TRUST', detail: 'Grounded or well-caveated', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Beyond what the AI could know', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'drill-1',
          prompt: "My knowledge has a cutoff, so the newest release I know of may be out of date. Check the project's official releases page before pinning a version.",
          context: "You asked: 'What's the latest version of this library?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Honest limit',
          explanation: "TRUST (the caveat, not any version number). The AI admits its limit and points to the right primary source. That's the behavior you want.",
          meta: 'States its cutoff and names where to verify',
        },
        {
          id: 'drill-2',
          prompt: "According to your company's internal onboarding document, new hires get 25 days of paid leave.",
          context: "You asked: 'How much leave do I get?' No document was shared with the AI.",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Unknowable',
          explanation: "VERIFY. The AI has no access to your company's private documents unless you provide them. This number is a plausible-sounding guess. Ask HR or read the real policy.",
          redFlag: 'Cites a private document it was never given',
        },
        {
          id: 'drill-3',
          prompt: "Acme Corp's current CEO is Jane Doe, who has led the company since 2021.",
          context: "You asked: 'Who runs Acme Corp?' (Illustrative company and name.)",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Time-sensitive',
          explanation: "VERIFY. Leadership changes, and the model's snapshot may be old. A specific name and start date feel authoritative but need a check against the company's own site or recent news.",
          redFlag: "'Current' role-holder stated with no date",
        },
        {
          id: 'drill-4',
          prompt: 'Based on the config you pasted:\nport: 8080\nthe server listens on port 8080.',
          code: true,
          context: 'You pasted the config file into the chat, then asked what port it uses.',
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Grounded',
          explanation: "TRUST. The answer is drawn from text you supplied in the conversation, not from the model's memory of the world. Quote-checking it against your paste is still quick and easy.",
          meta: 'Grounded in content you provided',
        },
        {
          id: 'drill-5',
          prompt: "Your signups grew 10%, 12%, and 14% in the last three months, so next month's signups will be 16%, around 5,300 users.",
          context: "You asked: 'Predict next month's signups.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Extrapolation',
          explanation: "VERIFY. Continuing a trend line is arithmetic, not knowledge. It ignores seasonality, campaigns, and everything else that moves real numbers. Treat it as a rough scenario with a range, not a prediction.",
          redFlag: 'A single exact figure about the future with no uncertainty',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Excellent! You're separating grounded answers from extrapolated ones, even when they sound similar." },
          { min: 4, message: 'Nice work. 4 out of 5. Subtle ones are the hardest, so reread the explanation for the one you missed.' },
          { min: 3, message: '3 out of 5. Keep asking: where did this information come from, and could the AI have seen it?' },
          { min: 0, message: "These were designed to be tricky. Re-run the 'Check the Clock' steps on each one and try again." },
        ],
      },
      summary: {
        insight: "The safest answers are either timeless, grounded in something you provided, or honest about their limits. The risky ones are time-sensitive, private, or about the future, and they sound just as confident as the safe ones.",
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick techniques to check time-sensitive claims against live sources.',
      commands: [
        {
          title: 'Check the latest release from the source (GitHub)',
          ecosystem: 'cli',
          command: 'curl -s https://api.github.com/repos/<owner>/<repo>/releases/latest | jq \'{tag_name, published_at}\'',
          output: `{
  "tag_name": "v1.2.3",
  "published_at": "2026-01-01T00:00:00Z"
}`,
          whatToLookFor: 'Compare tag_name and published_at with what the AI claimed. (Output shown is a placeholder, not a real release.)',
        },
        {
          title: 'Ask the AI about its own limits',
          ecosystem: 'ai',
          command: 'What is your knowledge cutoff, and can you browse or search the web in this conversation? If not, tell me which parts of your answer might be out of date.',
          output: `My training data has a cutoff date, and I can't browse the web in this chat, so anything about recent releases, prices, or events may be out of date. Please confirm those on the official source.`,
          whatToLookFor: 'A clear statement of cutoff and tool access. Treat that as a map of what to verify, not as proof the rest is right.',
        },
        {
          title: 'Know what day it really is',
          ecosystem: 'cli',
          command: 'date',
          output: 'Mon Nov  9 14:02:11 2026',
          whatToLookFor: "Models have no clock of their own. If an answer says 'this year' or 'recently', compare it with the real date, and with the date on the source.",
        },
        {
          title: 'Go to the official page',
          ecosystem: 'web',
          command: 'Open: the project release page, status page, price feed, or newsroom',
          output: '[Visual inspection of the live source]',
          whatToLookFor: 'A visible date, an official domain, and content that matches the AI claim. If a tool cited a link, open it and confirm the page really says that.',
        },
      ],
      quickReference: {
        title: 'Check the Clock',
        steps: [
          'Ask: is this time-sensitive, future, private, or brand new?',
          'Look for a date, or ask for the cutoff and whether it can browse',
          'Open the live primary source (release page, status page, news, price feed)',
          'Open any link the AI cites and confirm it says what the AI claims',
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Confident Extrapolation',
      summary: "You can now tell timeless knowledge from time-sensitive, private, and future claims. You know the four red flags, and you have a quick way to check any answer against a live source.",
      // NOTE: no `checklist` here on purpose; the phase-level keyTakeaways and
      // checklist below are rendered by LessonShell's final screen.
      next: { label: 'Up Next', body: "Pattern 10 is the most dangerous of all: real and fake information woven together so tightly that checking one part makes you trust the rest." },
    },
  ],

  keyTakeaways: [
    "Models have a knowledge cutoff and, without a tool, no live data",
    "Beyond that edge they may extrapolate confidently instead of saying 'I don't know'",
    "Red flags: the timeless present, the crystal ball, the phantom read, and missing cutoff caveats",
    "Timeless facts are usually safe; 'latest', 'current', and 'next' need a live source",
    "Check the Clock: could it know this? Look for a date, then verify at the primary source",
  ],
  checklist: {
    title: 'Your Extrapolation Detection Checklist',
    items: [
      "Does the claim depend on today's date (latest, current, now)?",
      'Is it a precise prediction about the future?',
      'Does the AI claim to have read a link or file it may not have had access to?',
      'Does the answer give a date, a source, or a knowledge-cutoff caveat?',
      'Have I confirmed it on the live, official source?',
      'If I cited a link, did I open it and confirm it says that?',
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-09',
  patternNumber: 9,
  title: 'Confident Extrapolation',
  subtitle: 'Claims beyond training data',
  description: "Learn to spot when AI answers confidently about things it can't know: recent events, 'the latest' anything, the future, or content it never saw.",
  estimatedTime: 15,

  skillLearned: 'Recognizing claims that go beyond what the AI could know',
  verificationMethod: 'Check the Clock',

  caseStudy: {
    name: 'AI chatbots give outdated voting deadlines before the 2026 US midterms',
    date: 'October-November 2026',
    researcher: 'Innovating for the Public Good (research by Dewey Square Group); reported by NPR',
    source: 'https://www.npr.org/2026/11/02/nx-s1-6025407/chatbots-midterms-voting-advice',
  },

  nextLesson: {
    id: 'pattern-10',
    title: 'Authoritative Blend',
    teaser: 'Real and fake, woven together.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
