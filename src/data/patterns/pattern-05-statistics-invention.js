// src/data/patterns/pattern-05-statistics-invention.js
// Pattern 05: Statistics Invention
//
// NOTE: The SEE story is ILLUSTRATIVE (no single famous incident). No caseStudy
// is attached on purpose. Fabricated figures inside quiz items are the 'fake'
// answers; the 'real' items cite named, checkable sources.
// TARGET: ~18 minutes total
//
// Authored in the block-based schema: see docs/pattern-authoring-guide.md.

// ============================================
// SEE (3 min): Story -> Trust check -> Reveal -> Why it matters
// ============================================
const see = {
  title: 'The Study That Never Was',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: '"78% of users prefer..." - or do they?',
      body: `Imagine you're a marketer finishing a pitch deck for tomorrow morning. Slide 6 needs one punchy statistic to show that customers want AI-powered support.

You ask an AI assistant for a number you can cite. (This story is illustrative, but the pattern is very real.) Here's the conversation:`,
    },
    {
      type: 'chat',
      user: 'Give me a strong statistic showing that customers want AI customer support, with a source.',
      ai: {
        text: `According to a 2023 Gartner study, **78% of mid-sized businesses** have adopted AI-driven customer support, and **63.4% of customers** say they prefer it over waiting for a human agent.

The study also found that companies using AI support reduced costs by an average of **41%** in the first year.

You can cite this as: *Gartner, "The State of AI Customer Service," 2023.*`,
        note: 'Specific numbers. A famous name. A year. A citation. It reads like research.',
      },
    },
    {
      type: 'choice',
      question: 'Be honest: would you have put this on slide 6?',
      subtext: "There's no wrong answer here. We're testing your instincts.",
      options: [
        { id: 'yes-pasted', label: 'Yes, it has a source and a year - I would paste it in', response: "You're not alone. A named source plus precise numbers feels finished, so most people stop right here." },
        { id: 'maybe-searched', label: "Maybe, but I'd search for the study first", response: "Good instinct. Searching takes a minute, but under deadline most people skip it." },
        { id: 'no-suspicious', label: 'No, something seems off', response: 'Interesting! What made you hesitate? Hold that thought.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'In this story, the study does not exist.',
      explanation: `The AI did not look anything up. It generated text that *looks like* a market-research citation: a big-brand name, a year, a plausible report title, and precise percentages.

Nothing in that answer was retrieved from a real report. The numbers were produced because precise figures are what a "good statistic" sounds like.`,
      list: {
        title: "Here's how the story plays out:",
        items: [
          'You search for the report title and find nothing - or worse, you never search',
          'The slide goes out; a sharp-eyed investor asks, "Where is that from?"',
          'You cannot produce the report, and now every other number in the deck is in doubt',
          'If the figure gets copied into a blog post, it starts to look "well-sourced" because it appears in more than one place',
        ],
      },
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Embarrassing but recoverable:', body: 'Someone asks for the source, you cannot find it, you remove the slide', tone: 'neutral' },
        { label: 'Actually dangerous:', body: 'The invented number drives a real decision: a budget, a product bet, a headline, a medical or legal claim. Nobody checks it because it looks so precise.', tone: 'danger' },
      ],
      conclusion: 'Precision is not evidence. A number like 63.4% feels measured, but AI can produce it as easily as it produces a round one.',
      transition: "So how do you tell a real statistic from a made-up one? First, let's test your instincts.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 AI claims - Use it or Check first?
// ============================================
const test = {
  title: 'Use It or Check First?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 statistics an AI assistant might hand you.',
        instruction: 'For each one, decide: would you use it as-is, or check it first?',
        note: "Don't actually search anything yet - go with your gut.",
        legend: {
          trust: { label: 'TRUST', detail: 'Use it as written', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Check the source first', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          prompt: 'According to a 2023 Gartner study, 78% of mid-sized businesses have adopted AI-driven customer support.',
          context: "You asked: 'Give me a stat for my pitch deck.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Unsourced',
          explanation: "UNSOURCED. A famous name and a year, but no report title, link, or sample. Anyone can attach 'Gartner' to a number, and AI does it constantly. Until you find the actual report, treat it as invented.",
          redFlag: 'Big-brand name with no checkable report',
        },
        {
          id: 'item-2',
          prompt: "About 71% of the Earth's surface is covered by water (USGS).",
          context: "You asked: 'How much of the planet is water?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: "REAL. The U.S. Geological Survey publishes this figure in its water-science materials, and it is stable, widely repeated, and easy to confirm. Note the 'about': honest statistics admit approximation.",
          meta: 'Checkable: USGS Water Science School',
        },
        {
          id: 'item-3',
          prompt: 'In our survey of 212 users, 47.3% preferred the new design.',
          context: "You asked: 'Summarize my survey results with percentages.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Impossible',
          explanation: 'IMPOSSIBLE. With 212 respondents, 100 people is 47.2% and 101 people is 47.6%. No whole number of people gives 47.3%. The percentage and the sample size cannot both be true.',
          redFlag: "Percentage doesn't fit the sample size",
        },
        {
          id: 'item-4',
          prompt: 'Studies show that humans only use 10% of their brains.',
          context: "You asked: 'Give me a fun fact about the brain for my newsletter.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Myth',
          explanation: "MYTH. 'Studies show' names no study. This claim is a long-debunked popular myth: brain imaging shows activity throughout the brain. AI repeats it because the internet repeats it.",
          redFlag: "'Studies show' with no study",
        },
        {
          id: 'item-5',
          prompt: 'The U.S. Census Bureau counts the population of the United States every 10 years.',
          context: "You asked: 'How often does the US count its population?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: 'REAL. The decennial census is required by the U.S. Constitution and the Census Bureau runs it every ten years (most recently 2020). It names its publisher and is trivially confirmed at census.gov.',
          meta: 'Checkable: census.gov',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You correctly identified all 5. You have strong instincts - let's sharpen them further." },
          { min: 4, message: "4 out of 5! Solid instincts. The patterns we'll learn next will help you catch that last one." },
          { min: 3, message: "3 out of 5 - not bad! Bad statistics are built to feel authoritative. That's exactly why this training exists." },
          { min: 0, message: "This is tricky - and that's the point. Fabricated numbers are designed to sound measured. Let's learn what gives them away." },
        ],
      },
      summary: {
        insight: "In this batch, 3 of the 5 claims should not be used as written. Notice what the good ones had in common: a named publisher you can look up, and honest wording like 'about'. The bad ones had precision and confidence, but nothing to trace.",
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
      heading: 'Invented statistics follow predictable patterns.',
      subtext: 'They are written to sound like research. Four red flags show up again and again.',
      cards: [
        { emoji: '🔬', label: 'The Suspiciously Precise Number' },
        { emoji: '👤', label: 'The Vague Authority' },
        { emoji: '🎯', label: 'The Convenient Round Number' },
        { emoji: '🧮', label: 'The Impossible Math' },
      ],
    },
    {
      type: 'concept',
      emoji: '🔬',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Suspiciously Precise Number',
      description: 'A figure with a decimal point and no context: sample size, date, or definition.',
      compare: {
        left: { label: '❌ Precision with nothing behind it:', tone: 'danger', items: ['73.4% of marketers use AI daily', '63.4% of customers prefer it', 'Costs fell by 41.7%', 'Market worth $4.37B'] },
        right: { label: '✓ Precision with a trail:', tone: 'good', items: ['"About 71% of Earth\'s surface" (USGS)', '299,792,458 m/s (defined by the SI)', '"7,988,550,201 people in 2022" (World Bank series SP.POP.TOTL)', 'Survey: n=1,204, margin of error +/-3 pts'] },
      },
      why: 'Decimals sound measured, so the model produces them to sound credible. A precise number is only as good as the method behind it, and AI has no method to show you.',
      spot: "Ask: precise according to whom? If the number has no date, definition, or sample attached, don't trust the decimal.",
    },
    {
      type: 'concept',
      emoji: '👤',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Vague Authority',
      description: 'The claim leans on an unnamed crowd or a famous brand, but never points at a specific document.',
      rows: [
        { label: 'Unnamed crowd:', variant: 'quote', tone: 'danger', value: 'Studies show... Experts agree... Research suggests...' },
        { label: 'Brand, no document:', variant: 'quote', tone: 'danger', value: 'According to a 2023 Gartner study...' },
        { label: 'What a real citation has:', variant: 'chips', tone: 'good', values: ['Report title', 'Author / publisher', 'Date', 'Link or DOI'] },
      ],
      note: 'A real source can be found by someone else, in a few minutes, without you taking its word for it.',
      why: 'Big names and "studies" borrow authority. Models have seen thousands of real citations, so they can generate one with the right shape and nothing inside.',
      spot: 'If you cannot name the exact report, you cannot cite it. "A study" is not a source.',
    },
    {
      type: 'concept',
      emoji: '🎯',
      eyebrow: 'Red Flag 3 of 4',
      name: 'The Convenient Round Number',
      description: 'The statistic supports exactly the argument you were making, in a tidy, memorable form.',
      rows: [
        { label: 'You asked:', variant: 'quote', tone: 'neutral', value: 'Give me a stat that proves remote work boosts productivity.' },
        { label: 'AI answers:', variant: 'quote', tone: 'danger', value: 'Research confirms remote workers are exactly 25% more productive.' },
      ],
      note: 'Real research is messy: mixed results, caveats, narrow samples. A clean number that happens to fit your slide deserves extra suspicion.',
      why: "AI is built to be helpful and to agree with your framing. Asked for support, it will often supply a number shaped like the support you wanted.",
      spot: "If the stat is suspiciously perfect for your argument, search for the opposite finding. If you can't find the study at all, it's not evidence.",
    },
    {
      type: 'concept',
      emoji: '🧮',
      eyebrow: 'Red Flag 4 of 4',
      name: 'The Impossible Math',
      description: "The figures contradict each other, or can't be produced by the sample size.",
      rows: [
        { label: 'Shares that should total 100%:', variant: 'code', tone: 'danger', value: 'Chrome 64% + Safari 22% + Edge 9% + Firefox 8% = 103%' },
        { label: 'Sample size mismatch:', variant: 'code', tone: 'danger', value: '47.3% of 212 people = 100.3 people' },
        { label: 'Growth mismatch:', variant: 'code', tone: 'danger', value: '$4.2B to $9.1B in 4 years is "31% a year"  (it is about 21%)' },
      ],
      note: 'You do not need any source to catch these. A calculator is enough.',
      why: "AI writes numbers by pattern, not by calculation. Each number looks fine alone, but they weren't computed from the same data.",
      spot: 'Check that parts sum to the whole, that percentages divide cleanly by the sample size, and that growth rates match the start and end values.',
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each claim, identify which red flag gives it away:',
      options: [
        { id: 'flag-1', emoji: '🔬', label: 'The Suspiciously Precise Number' },
        { id: 'flag-2', emoji: '👤', label: 'The Vague Authority' },
        { id: 'flag-3', emoji: '🎯', label: 'The Convenient Round Number' },
        { id: 'flag-4', emoji: '🧮', label: 'The Impossible Math' },
      ],
      items: [
        { prompt: '73.4% of developers now use AI tools every single day.', correct: 'flag-1', explanation: 'A decimal with no date, sample, or source attached.' },
        { prompt: 'Experts agree that most customers prefer subscription pricing.', correct: 'flag-2', explanation: "'Experts' is an unnamed crowd, and 'most' is not a measurement." },
        { prompt: "Sales by region: North 45%, South 38%, West 30% (of total sales).", correct: 'flag-4', explanation: 'The shares add up to 113%. Parts of one whole cannot exceed 100%.' },
        { prompt: 'Our tool improves conversion by exactly 50%, according to research.', correct: 'flag-3', explanation: 'Round, flattering, and conveniently perfect for a sales page - with no named research.' },
        { prompt: 'The U.S. Census Bureau counted about 331 million residents in 2020 (census.gov).', correct: 'trick-question', explanation: "Trick question! This one names its publisher, year, and a checkable location. It's a good claim.", extra: { id: 'trick-question', label: "✓ It's actually checkable" } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'The Numbers Trace',
      tagline: 'Follow every statistic back to where it came from - or flag it as unsourced.',
      steps: [
        { number: 1, action: 'Copy the claim exactly', detail: 'The figure, the source name, and the year, word for word - not your paraphrase', time: '10 seconds' },
        { number: 2, action: 'Find the primary source', detail: 'Search the exact figure in quotes, then search the publisher\'s own site for the report title. Look for the report or dataset itself, not a blog repeating it.', time: '60 seconds' },
        { number: 3, action: 'Read the fine print', detail: 'Who ran it, when, how many people or data points, how the thing was defined, and who paid for it. Does the real number match what AI said?', time: '60 seconds' },
        { number: 4, action: 'Recompute the math', detail: 'Do the parts sum to the whole? Does the percentage fit the sample size? Does the growth rate match the start and end values?', time: '30 seconds' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'A named report or dataset you can open',
            'Sample size, date, and method stated',
            'Published by an organization that gathers this data',
            'The numbers reproduce when you recompute them',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            "Only 'a study' or a brand name",
            'The exact figure appears nowhere except in AI-written text',
            'Report exists but says something different',
            "Parts don't sum, or the math doesn't reproduce",
          ],
        },
      },
      footer: "If you can't trace it, you have two honest options: label it 'unsourced' or drop it. Never present it as fact.",
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
        heading: 'Practice Drill: 5 harder claims.',
        instruction: 'These are subtler than the first round. Use the four red flags and the Numbers Trace: use it as written, or check first?',
        note: 'Some of these are real. Precision alone is not the problem - traceability is.',
        legend: {
          trust: { label: 'TRUST', detail: 'Use it as written', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Check the source first', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'drill-1',
          prompt: 'Market size 2021: $2.0B\nMarket size 2024: $3.0B\nGrowth: "a 50% compound annual\ngrowth rate (CAGR) over 3 years"',
          context: "AI summarizing a market report for your strategy memo:",
          code: true,
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Wrong math',
          explanation: 'WRONG MATH. Going from 2.0 to 3.0 is a 50% increase in total, over three years. The compound annual rate is (3.0/2.0)^(1/3) - 1, which is about 14.5%. The claim confuses total growth with annual growth, a classic AI slip.',
          redFlag: 'Growth rate inconsistent with start and end values',
        },
        {
          id: 'drill-2',
          prompt: 'The speed of light in a vacuum is exactly 299,792,458 metres per second.',
          context: "You asked: 'What is the exact speed of light?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: "REAL. Here the precision is legitimate: since 1983 the metre has been defined from this value, so it is exact by definition (published by the BIPM as part of the SI). A precise number is not automatically fake; what matters is whether a primary source stands behind it.",
          meta: 'Checkable: BIPM SI Brochure / NIST',
        },
        {
          id: 'drill-3',
          prompt: 'Based on industry benchmarks, 73.4% of new subscribers cancel within 90 days.',
          context: "You asked: 'What churn rate should I expect for my app?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Unsourced',
          explanation: "UNSOURCED. 'Industry benchmarks' is a vague authority, and 73.4% is a precise number with no sample, year, or industry. Churn varies enormously by product and price; one confident figure for 'new subscribers' is a guess dressed as data.",
          redFlag: "'Industry benchmarks' plus a precise decimal",
        },
        {
          id: 'drill-4',
          prompt: 'Research confirms remote workers are exactly 25% more productive than office workers.',
          context: "You asked: 'Find me a stat that proves remote work boosts productivity.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Convenient',
          explanation: 'CONVENIENT. It supports your exact argument, is perfectly round, and names no research. Real studies on remote work exist but vary in setting and outcome; no single clean number covers all workers. Be especially wary when the answer is shaped like your request.',
          redFlag: 'Round number that fits your argument perfectly',
        },
        {
          id: 'drill-5',
          prompt: 'The United Nations estimated that the world population reached 8 billion on 15 November 2022 (UN World Population Prospects 2022).',
          context: "You asked: 'When did the world reach 8 billion people?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Real',
          explanation: "REAL. The UN named a specific day and framed it as a modeled estimate, from a named publication. Note the careful wording ('estimated'): real statisticians hedge. Still worth a quick look at un.org, but the claim has a clear, findable source.",
          meta: 'Checkable: UN DESA, World Population Prospects 2022',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Flawless. You're checking traceability, not just trusting how precise the number looks." },
          { min: 4, message: "4 out of 5 - strong. Review the one you missed and which red flag it carried." },
          { min: 3, message: "3 out of 5 - you're getting there. Remember: no source, no stat. Try the Numbers Trace on the ones you missed." },
          { min: 0, message: "Tough round. Replay the red flags: precision, vague authority, convenient fit, impossible math. Then try again." },
        ],
      },
      summary: {
        insight: "The pattern: confident statistics that fail the trace. Real statistics - even very precise ones - come with a named source, a date, and a method. Invented ones come with polish.",
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick techniques for tracing a statistic before it goes in your deck.',
      commands: [
        {
          title: 'Search the exact figure and source in quotes',
          ecosystem: 'web',
          command: '"78% of mid-sized businesses" "Gartner" AI customer support',
          output: `[Search results]
- Blog posts and listicles repeating the figure
- No result from gartner.com
- No report title, PDF, or press release`,
          whatToLookFor: 'Real stats trace back to one original publisher. If the only hits are copycat posts (or nothing), the number may have no origin.',
        },
        {
          title: "Search the publisher's own site",
          ecosystem: 'web',
          command: 'site:gartner.com "customer service" AI adoption survey 2023',
          output: `[Search results]
- Press releases and research pages on gartner.com
- Check: does any title or summary contain the number and
  the claim AI gave you?`,
          whatToLookFor: 'The report title, date, and headline figure should appear on the publisher\'s own page. Paywalled reports usually still have a public press release or summary.',
        },
        {
          title: 'Recompute the math yourself',
          ecosystem: 'cli',
          command: `python3 -c "print(((9.1/4.2)**(1/4)-1)*100)"`,
          output: `21.31...`,
          whatToLookFor: "Compare to the claim. Here the AI said '31% a year' - the real compound rate from $4.2B to $9.1B over 4 years is about 21%. Also try: print(100/212*100) to see what 100 of 212 respondents is.",
        },
        {
          title: 'Pull the number from a primary data portal',
          ecosystem: 'cli',
          command: `curl -s "https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?format=json&date=2022&per_page=1"`,
          output: `[{"page":1, ... "sourceid":"2", ...},
 [{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},
   "country":{"value":"World"},"date":"2022","value":7988550201}]]`,
          whatToLookFor: "Primary portals (data.worldbank.org, census.gov, ourworldindata.org, FRED at fred.stlouisfed.org) show the series, units, and date. Values get revised, so compare the definition and year, not only the digits.",
        },
      ],
      quickReference: {
        title: 'The Numbers Trace',
        steps: [
          'Copy the figure, source, and year exactly as AI wrote them',
          'Search the exact figure in quotes, then the publisher site with site:',
          'Open the primary report or dataset: check sample, date, funder, definition',
          "Recompute the math - and if you can't trace it, call it unsourced or drop it",
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Statistics Invention',
      summary: "You can now spot when AI produces numbers that sound like research. You know the four red flags - precision without context, vague authority, convenient fit, and impossible math - and you have a way to trace any figure back to its source.",
      // NOTE: no `checklist` here on purpose - phase-level keyTakeaways +
      // checklist below are rendered by LessonShell's final screen.
      next: { label: 'Up Next', body: "Pattern 6, API Mirage: AI recommends functions and endpoints that look perfectly real - and were never there." },
    },
  ],

  keyTakeaways: [
    'AI generates statistics by pattern, not by looking them up - precision is not evidence',
    'Red flags: suspiciously precise numbers, vague authorities, figures that conveniently fit your argument, and math that does not add up',
    'Real statistics have a named source, a date, a method, and numbers that reproduce when you recompute them',
    "The Numbers Trace: copy the claim, find the primary source, read the fine print, recompute the math",
    "If you can't trace it, say 'unsourced' or drop it - never present it as fact",
  ],
  checklist: {
    title: 'Your Statistics Check Checklist',
    items: [
      'Can I name the exact report or dataset, not just "a study" or a brand?',
      'Have I found it on the publisher\'s own site or a primary data portal?',
      'Do the sample size, date, and definition match the claim?',
      'Do the parts sum to the whole, and does the percentage fit the sample size?',
      'Does the number conveniently support exactly what I wanted to say?',
      "If I can't trace it, have I labeled it unsourced or removed it?",
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-05',
  patternNumber: 5,
  title: 'Statistics Invention',
  subtitle: 'Made-up numbers stated with confidence',
  description: "Learn to spot when AI produces precise-looking percentages, market sizes, and 'studies show' claims that have no traceable source.",
  estimatedTime: 15,

  skillLearned: 'Tracing AI-provided statistics to their primary source',
  verificationMethod: 'The Numbers Trace',

  // No caseStudy: the SEE story is illustrative, not a documented incident.

  nextLesson: {
    id: 'pattern-06',
    title: 'API Mirage',
    teaser: 'Functions and endpoints that were never there.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
