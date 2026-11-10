// src/data/patterns/pattern-05-statistics-invention.js
// Pattern 05: Statistics Invention
//
// CASE STUDY: EY Canada "Points of Attack" report, investigated by GPTZero
// (May 2026). The SEE chat is a labelled reconstruction of figures documented
// in the report. TEST works through those same figures. In the practice
// set, the 'real' items cite named, checkable sources.
// TARGET: about 10 minutes total
//
// Authored in the block-based schema: see docs/pattern-authoring-guide.md.

// ============================================
// SEE: Story -> Trust check -> Reveal -> Why it matters
// ============================================
const see = {
  title: 'One $200 Billion, Two Different Things',
  steps: [
    {
      type: 'prose',
      heading: 'A Big Four report, a headline number, and a famous source.',
      body: `In late 2025, EY Canada published a 44-page cybersecurity report: *Points of Attack: Uncovering Cyber Threats and Fraud in Loyalty Systems*. It was credited to three EY Canada employees, including two partners.

Its executive summary opens with the kind of figures that end up on slides: how big the loyalty economy is, and how much of it goes unused. Below are the report's key numbers and the sources it gave for them, written as an AI assistant might hand them to you:`,
    },
    {
      type: 'chat',
      user: 'Give me headline statistics on the loyalty-points economy and fraud for an executive summary, with sources.',
      ai: {
        text: `The global loyalty points market is worth **$200 billion**, and **30-50%** of those points go unused. *(Forbes, "The $200 Billion Loyalty Economy")*

There is **$200 billion** in unredeemed rewards globally. *(McKinsey & Company, "Loyalty Economics Report," 2022)*

**72%** of customer loyalty programs have reported theft or fraud, and loyalty fraud attacks have risen **89%** since 2019.`,
        note: 'Reconstruction: these are the figures and sources GPTZero documented in the published EY report, arranged as a chat. It is not verbatim AI output, and EY has not said how the report was drafted.',
      },
    },
    {
      type: 'choice',
      question: 'Be honest: would you have put these numbers in your deck?',
      subtext: "There's no wrong answer here. Go with your first reaction.",
      options: [
        { id: 'yes-pasted', label: 'Yes. Forbes, McKinsey, and EY behind it. I would paste it in', response: "You're not alone. Two famous sources plus a Big Four byline feels finished, so most people stop right here." },
        { id: 'maybe-searched', label: "Maybe, but I'd look up the McKinsey report first", response: "Good instinct. That one search would have found nothing, because the report does not exist." },
        { id: 'no-suspicious', label: 'No, something seems off', response: 'Interesting! Look at the two $200 billion figures again. Hold that thought.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'Two invented citations, two incompatible numbers.',
      explanation: `In May 2026, the AI-detection company GPTZero checked every source in the report. It found that the Forbes citation had a broken link and a title matching none of the named author's articles, and that the McKinsey "Loyalty Economics Report (2022)" does not exist. GPTZero said the report bore the marks of AI generation, including fake statistics and internal contradictions.

The numbers also contradict each other, and you only need the report itself to see it. If $200 billion is the *whole* market and up to 50% goes unused, unredeemed points are at most $100 billion. For $200 billion to be the *unredeemed* part, the market would need to be at least $400 billion.`,
      list: {
        title: 'What GPTZero found when it traced the figures:',
        items: [
          'The fake McKinsey citation traced back to an obscure fintech blog post that cited the same non-existent report six months earlier',
          'The 72% fraud figure was credited to Paystone on one page and to Forter on another; GPTZero said it seems to come from a 2017 Ipsos survey',
          'The "89% since 2019" rise appears elsewhere in the report as a single-year rise, 2018 to 2019, from a real but out-of-date Forter index',
          'EY Canada removed the report from its website and said it was reviewing how it was published',
        ],
      },
    },
    {
      type: 'stats',
      title: 'Impact',
      items: [
        { value: '16 of 27', label: 'Cited sources', detail: 'fabricated, misattributed, or broken links' },
        { value: '$200B', label: 'One figure', detail: 'used for both the market and the unused part of it' },
        { value: '60+', label: 'Newspapers', detail: 'carried an article that referenced the report' },
      ],
      source: 'GPTZero investigation (May 2026); Computing, May 2026',
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Embarrassing but recoverable:', body: 'Someone checks the sources, the report is pulled, and the firm says it is reviewing what happened.', tone: 'neutral' },
        { label: 'Actually dangerous:', body: 'The numbers had already escaped. GPTZero found the report referenced in a Canberra Times article syndicated to more than 60 Australian newspapers, and found ChatGPT, Claude and Perplexity repeating claims from it.', tone: 'danger' },
      ],
      conclusion: 'Precision and prestige are not evidence. A Big Four byline and a McKinsey label made these numbers feel checked, and nobody had checked them.',
      transition: "So how would you have caught it before the numbers reached a slide? Let's test the report.",
    },
  ],
};

// ============================================
// TEST: Spot what to test in the EY figures -> run the tests
// ============================================
const test = {
  title: 'Testing the Report',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'Before these numbers go in a deck, look at what is actually being claimed.',
      instruction: 'Tap the parts you would want to test. Some parts are fine or only look convincing. A few are where the problem hides.',
      source: "From the report's headline figures",
      segments: [
        { text: 'The global loyalty points market is worth $200 billion, and 30-50% of those points go unused.', note: 'A headline market size and a wide range, which sounds honest. On its own you cannot judge it yet, but keep both numbers in mind: they let you check the other figures with simple arithmetic.' },
        { text: ' ' },
        { text: '(Forbes, "The $200 Billion Loyalty Economy")', note: 'A famous publisher and a title that repeats the number. That is a surface signal, not a check. (GPTZero later found this link broken and no Forbes article by the named author with this title.)' },
        { text: '\n\n' },
        { text: 'There is $200 billion in unredeemed rewards globally.', flag: { label: 'Same $200 billion, different thing', explanation: 'Two sentences ago, $200 billion was the whole market. Here it is only the unused part. Both cannot be true, and you can catch it without opening a single source.' } },
        { text: ' ' },
        { text: '(McKinsey & Company, "Loyalty Economics Report," 2022)', flag: { label: 'A named report you can look for', explanation: 'A specific title, publisher and year. That makes it checkable: if the report is real, it will be on McKinsey\'s own site. If it is not there, the figure has no source.' } },
        { text: '\n\n' },
        { text: '72% of customer loyalty programs have reported theft or fraud,', flag: { label: 'A precise figure with no source', explanation: 'No publisher, no year, no survey. Where did 72% come from, and how old is it? In the full report, this number was credited to two different sources on two different pages.' } },
        { text: ' ' },
        { text: 'and loyalty fraud attacks have risen 89% since 2019.', note: 'Also unsourced here, and worth a look later. In the full report it traces to a real (if out-of-date) Forter fraud index, though it was paraphrased loosely. Precise-sounding, but not the strongest lead.' },
      ],
      summary: 'Three things to test: do the two $200 billion figures agree, does the McKinsey report exist, and where does the 72% actually come from? Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'You have the report, a calculator and a browser. Which tests actually tell you whether these figures hold up?',
      claim: {
        label: 'Headline figures',
        text: 'The global loyalty points market is worth $200 billion, and 30-50% of those points go unused. (Forbes)\nThere is $200 billion in unredeemed rewards globally. (McKinsey & Company, "Loyalty Economics Report," 2022)\n72% of customer loyalty programs have reported theft or fraud.',
      },
      rounds: [
        {
          title: 'Test 1: Do the numbers agree?',
          question: 'Before searching for anything, what do you check?',
          options: [
            {
              id: 'recompute',
              label: 'Recompute: what is 30-50% of $200 billion?',
              useful: true,
              resultLabel: 'Your calculator',
              result: '0.30 x $200B = $60B\n0.50 x $200B = $100B\n\nUnused points: $60B to $100B, not $200B\nFor $200B to be unused: market of at least $400B',
              feedback: 'If the whole market is $200 billion, unused points can be at most $100 billion. The two figures cannot both be right, so at least one of them is wrong.',
              kit: 'Recompute the figures against each other before you check any source',
            },
            {
              id: 'pages',
              label: 'Line up the pages: what does each $200 billion describe?',
              useful: true,
              resultLabel: 'From the report (as documented by GPTZero)',
              result: 'p. 4 (executive summary): $200B = the whole global market\np. 10:                    $200B = the unredeemed points',
              feedback: 'One number doing two jobs. Real figures come from data, so they rarely line up this neatly. A number reused for two different things suggests nobody worked either of them out.',
              kit: 'Check that one number is not being used for two different things',
            },
            {
              id: 'byline',
              label: 'Note that a Big Four firm published it, with two partners credited',
              useful: false,
              feedback: 'A byline tells you who signed it, not whether anyone checked it. This report carried three EY Canada names and still had 16 of its 27 sources fabricated, misattributed or broken.',
            },
          ],
        },
        {
          title: 'Test 2: Does the source exist?',
          question: 'The unredeemed $200 billion is credited to a McKinsey report. How do you check it?',
          options: [
            {
              id: 'publisher-site',
              label: 'Search McKinsey\'s own site for "Loyalty Economics Report"',
              useful: true,
              resultLabel: 'What GPTZero found',
              result: 'No McKinsey publication with this title.\nLink given in the report: https://www.mckinsey.com (the homepage)',
              feedback: 'A real report has its own page, or at least a press release or summary on the publisher\'s site. This one has neither, and the link points at the homepage, which is a link that cannot be wrong.',
              kit: 'Search for the named report on the publisher\'s own site; a homepage link is not a citation',
            },
            {
              id: 'exact-title',
              label: 'Search the exact title in quotes across the web',
              useful: true,
              resultLabel: 'What GPTZero found',
              result: 'Financial IT blog post, about six months before the EY report:\n"more than $200 billion in points sit idle each year"\nSources: "McKinsey & Company: Loyalty Economics Report (2022)"',
              feedback: 'The only trail leads to a fintech blog citing the same non-existent report. Finding a citation somewhere else does not confirm it. Here it shows where the invented source was copied from.',
              kit: 'If the only hits are other people citing it, follow the trail: echoes are not a source',
            },
            {
              id: 'syndicated',
              label: 'Trust it: the report was picked up by more than 60 newspapers',
              useful: false,
              feedback: 'That was one Canberra Times article, syndicated across Australia. Syndication copies a story. It adds reach, not evidence, and none of those papers checked McKinsey.',
            },
          ],
        },
        {
          title: 'Test 3: Where does the 72% come from?',
          question: 'The fraud figure has no source in the summary. How do you find out where it came from?',
          options: [
            {
              id: 'ask-ai',
              label: 'Ask an AI chatbot whether 72% is right',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'Yes. Around 72% of loyalty programs have reported fraud, according to industry research...',
              feedback: 'GPTZero found ChatGPT, Claude and Perplexity already repeating claims from this report. Asking an AI can hand the same report back to you as confirmation.',
            },
            {
              id: 'every-mention',
              label: 'Search the report for every place the 72% appears',
              useful: true,
              resultLabel: 'From the report (as documented by GPTZero)',
              result: 'p. 6:  72% ... credited to Paystone (a 2019 blog post)\np. 11: 72% ... credited to Forter ("NRF 2020 summary")\nReference table: neither source listed',
              feedback: 'One number, two different sources, and neither in the reference list. When the credit changes from page to page, nobody went back to the original.',
              kit: 'Check whether one number is credited to different sources in different places',
            },
            {
              id: 'origin',
              label: 'Follow the cited pages back to the original study',
              useful: true,
              resultLabel: 'What GPTZero found',
              result: 'Paystone and Forter both repeat the figure.\nLikely origin: a 2017 Ipsos survey',
              feedback: 'Two vendor blogs repeating a survey from years earlier. The number may be real, but it is old, secondhand, and presented as current.',
              kit: 'Follow repeats back to the original study, and note how old it is',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what are these headline figures?',
        options: [
          { id: 'sloppy', label: 'Solid numbers with a few sloppy citations', correct: false, feedback: 'The problem is not formatting. The two $200 billion figures contradict each other, and the source for one of them does not exist. A bad citation here means there is no evidence behind the number.' },
          { id: 'unsupported', label: 'Unsupported: contradictory figures, an invented source, and an old secondhand stat', correct: true, feedback: 'Right. The $200 billion is used for two incompatible things, the McKinsey report does not exist, and the 72% is a 2017 survey figure credited to two different blogs. None of it should go in a deck as fact.' },
          { id: 'wrong-firm', label: 'Real figures, just credited to the wrong firm', correct: false, feedback: 'Tempting, because a 2020 Forbes article does use the phrase "$200 billion loyalty economy". But the unredeemed $200 billion traces only to a blog citing the same invented report, and the two figures still cannot both be true.' },
        ],
      },
      kit: {
        title: 'Your Statistics Invention Test Kit',
        footer: 'A calculator and two searches. The figures looked just as polished either way. Only the tests showed there was nothing behind them.',
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
      heading: 'Invented statistics follow predictable patterns.',
      subtext: 'They are written to sound like research. Four red flags show up again and again.',
      cards: [
        { emoji: '🔬', label: 'Suspiciously Precise Number' },
        { emoji: '👤', label: 'Vague Authority' },
        { emoji: '🎯', label: 'Convenient Round Number' },
        { emoji: '🧮', label: 'Impossible Math' },
      ],
    },
    {
      type: 'concept',
      emoji: '🔬',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Suspiciously Precise Number',
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
      name: 'Vague Authority',
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
      name: 'Convenient Round Number',
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
      name: 'Impossible Math',
      description: "The figures contradict each other, or can't be produced by the sample size.",
      rows: [
        { label: 'Shares that should total 100%:', variant: 'code', tone: 'danger', value: 'Chrome 64% + Safari 22% + Edge 9% + Firefox 8% = 103%' },
        { label: 'Sample size mismatch:', variant: 'code', tone: 'danger', value: '47.3% of 212 people = 100.3 people' },
        { label: 'Growth mismatch:', variant: 'code', tone: 'danger', value: '$4.2B to $9.1B in 4 years is "31% a year"  (it is about 21%)' },
      ],
      note: 'You do not need any source to catch these. A calculator is enough. In the EY Canada report, $200B was the whole market on one page and only the unused part on another. You can see the contradiction just by comparing the two pages.',
      why: "AI writes numbers by pattern, not by calculation. Each number looks fine alone, but they weren't computed from the same data.",
      spot: 'Check that parts sum to the whole, that percentages divide cleanly by the sample size, and that growth rates match the start and end values.',
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each claim, identify which red flag gives it away:',
      options: [
        { id: 'flag-1', emoji: '🔬', label: 'Suspiciously Precise Number' },
        { id: 'flag-2', emoji: '👤', label: 'Vague Authority' },
        { id: 'flag-3', emoji: '🎯', label: 'Convenient Round Number' },
        { id: 'flag-4', emoji: '🧮', label: 'Impossible Math' },
      ],
      items: [
        { prompt: '73.4% of developers now use AI tools every single day.', correct: 'flag-1', explanation: 'A decimal with no date, sample, or source attached.' },
        { prompt: 'Experts agree that most customers prefer subscription pricing.', correct: 'flag-2', explanation: "'Experts' is an unnamed crowd, and 'most' is not a measurement." },
        { prompt: "Sales by region: North 45%, South 38%, West 30% (of total sales).", correct: 'flag-4', explanation: 'The shares add up to 113%. Parts of one whole cannot exceed 100%.' },
        { prompt: 'Our tool improves conversion by exactly 50%, according to research.', correct: 'flag-3', explanation: 'Round, flattering, and conveniently perfect for a sales page, with no named research.' },
        { prompt: 'The U.S. Census Bureau counted about 331 million residents in 2020 (census.gov).', correct: 'trick-question', explanation: "Trick question! This one names its publisher, year, and a checkable location. It's a good claim.", extra: { id: 'trick-question', label: "✓ It's actually checkable" } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'Numbers Trace',
      tagline: 'Follow every statistic back to where it came from, or flag it as unsourced.',
      steps: [
        { number: 1, action: 'Copy the claim exactly', detail: 'The figure, the source name, and the year, word for word (not your paraphrase)', time: '10 seconds' },
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
// PRACTICE: Practice set -> Toolkit -> Completion
// Checked in November 2026: World Bank API (SP.POP.TOTL, IND and CHN,
// last updated 8 Oct 2026); UN Day of Eight Billion (15 Nov 2022, UN DESA
// projections); UN forecast that India passed China by the end of April
// 2023; NBER working paper w18871 (Bloom et al., CTrip, 13% performance
// increase). Survey, churn and market figures are illustrative; the
// arithmetic was recomputed in python3.
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Six Numbers to Trace',
        instruction: 'Recompute a survey, spot an unsourced figure, pick the right check, fix a growth rate, and read real data.',
        note: 'Some of these are fine. Precision is not the problem. Traceability is.',
      },
      items: [
        {
          id: 'p5-diagnose-survey',
          kind: 'pickAll',
          label: 'Diagnose',
          context: 'An AI summarized a small customer survey for your report.',
          prompt: 'Which of these are real problems? A calculator is enough.',
          artifact: {
            label: 'AI summary (illustrative)',
            text: 'Customer survey, n = 40\n\nVery satisfied: 47.3%\nSatisfied: 30.0%\nUnsatisfied: 27.5%\n\nTotal satisfied: 77.3%, up from 60% last year, an increase of 17.3%.',
          },
          options: [
            { id: 'sum', label: 'The three shares add up to 104.8%', correct: true, feedback: 'Every respondent is in exactly one group, so the shares should total 100%. Rounding cannot explain 4.8 points.' },
            { id: 'people', label: '47.3% of 40 people is 18.92 people', correct: true, feedback: 'With 40 people, each person is 2.5%. 18 people is 45% and 19 is 47.5%. No whole number of people gives 47.3%.' },
            { id: 'eleven', label: '27.5% of 40 people is 11 people', feedback: 'That one works: 11 out of 40 is exactly 27.5%. A decimal is fine when the sample size allows it.' },
            { id: 'total', label: 'Total satisfied is 47.3% plus 30.0%', feedback: '47.3 + 30.0 = 77.3, so this line agrees with the lines above it. They are wrong, but this sum is not.' },
            { id: 'points', label: 'Going from 60% to 77.3% is called "an increase of 17.3%"', correct: true, feedback: 'That is 17.3 percentage points. As a percentage, the rise is about 29% (17.3 / 60).' },
          ],
          explanation: 'Three of the five checks fail, and you needed no source to find them. Invented figures are written one at a time, so they rarely fit together.',
          takeaway: 'Shares must sum to 100%, fit the sample size, and points are not percent',
        },
        {
          id: 'p5-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'When did the world reach 8 billion people?'",
          prompt: 'Tap the part that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer' },
          segments: [
            { text: 'The United Nations' },
            { text: ' estimated that' },
            { text: ' the world population reached 8 billion' },
            { text: ' on 15 November 2022.' },
            { text: ' The date is a projection' },
            { text: ' by UN DESA,' },
            { text: " the UN's Department of Economic and Social Affairs." },
          ],
          explanation: "Nothing is invented. The UN marked 15 November 2022 as the Day of Eight Billion, based on UN DESA projections. Note the wording: 'estimated' and 'projection'. Nobody counted the 8 billionth person, and real statisticians say so. A named publisher, a date and honest hedging: this one passes the trace.",
          takeaway: 'A named source, a date and honest hedging: checking can confirm a claim',
        },
        {
          id: 'p5-pick-test',
          kind: 'choose',
          label: 'Pick the test',
          context: "You asked: 'Find me a stat that proves remote work boosts productivity.' The AI replied: 'Research confirms remote workers are exactly 25% more productive.'",
          prompt: 'What settles whether you can use this?',
          options: [
            { id: 'ask', label: 'Ask the AI which study it came from', feedback: 'It may name a real study that says something else, or invent one. Either way, you still have to open the study.' },
            { id: 'repeat', label: 'Search the figure and count how many sites repeat it', feedback: 'Repetition shows that a number spread, not that anyone measured it. Copies often trace back to one blog, or to nothing.' },
            { id: 'study', label: 'Find the study itself and read who was measured, for how long, and how productivity was defined', correct: true, feedback: 'Right. If there is no study to open, there is no stat. If there is one, its setting decides what you can claim.' },
            { id: 'round', label: 'A round 25% is probably a fair average of several studies', feedback: 'Nothing in the answer says it is an average. A round number that fits your argument perfectly is a red flag, not a summary.' },
          ],
          explanation: "Real research on this exists, and it is narrower than any slogan. A widely cited NBER working paper (Bloom and others, 2013) found a 13% performance increase for call centre staff at the Chinese travel agency CTrip, over nine months. That is a real number in one setting. It does not show that 'remote workers are 25% more productive'.",
          takeaway: 'Open the study: its sample and setting decide what you can claim',
        },
        {
          id: 'p5-spot-churn',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'What churn rate should I expect for my new subscription app?'",
          prompt: 'Tap the part you would not put in your plan, or tell us nothing is wrong.',
          artifact: { label: 'AI answer (illustrative)' },
          segments: [
            { text: 'Churn depends heavily on your category, price and how you find users.' },
            { text: ' ' },
            { text: 'Based on industry benchmarks,', flag: true },
            { text: ' ' },
            { text: '73.4% of new subscribers', flag: true },
            { text: ' cancel within 90 days.' },
            { text: ' ' },
            { text: 'So focus on the first three months:' },
            { text: ' track cancellations by sign-up month' },
            { text: ' and look at where people drop off.' },
          ],
          explanation: "'Industry benchmarks' names no industry, publisher or year, and 73.4% has no sample behind it. The advice around it is sensible, which makes the number feel just as solid. It isn't. Churn varies widely by product, so one precise figure for every app is a guess. Use your own data, or a named benchmark you can open.",
          takeaway: 'A precise decimal credited to "industry benchmarks" is unsourced',
        },
        {
          id: 'p5-fix-cagr',
          kind: 'choose',
          label: 'Fix it',
          context: 'An AI summarized a market report for your strategy memo:',
          prompt: 'Which sentence should go in the memo?',
          artifact: {
            label: 'AI summary (illustrative)',
            code: true,
            text: 'Market size 2021: $2.0B\nMarket size 2024: $3.0B\nGrowth: "a 50% compound annual growth rate (CAGR)"',
          },
          options: [
            { id: 'asis', label: 'The market grew at a 50% compound annual rate from 2021 to 2024.', feedback: 'At 50% a year, $2.0B would reach $6.75B by 2024, not $3.0B.' },
            { id: 'simple', label: 'The market grew about 16.7% a year (50% divided by 3).', feedback: 'Dividing by the number of years ignores compounding. Each year grows on top of the last, so the real annual rate is lower.' },
            { id: 'right', label: 'The market grew 50% in total over three years, about 14.5% a year (CAGR).', correct: true, feedback: 'Right. (3.0 / 2.0)^(1/3) - 1 is about 0.145. Total growth and annual growth are different numbers.' },
            { id: 'total', label: 'The market grew 150% from 2021 to 2024.', feedback: '$3.0B is 150% of $2.0B, but the increase is 50%. Mixing up "is 150% of" and "grew 150%" is another common slip.' },
          ],
          explanation: 'The AI confused total growth with annual growth. One line catches it: python3 -c "print((3.0/2.0)**(1/3)-1)" prints about 0.145.',
          takeaway: 'Recompute growth rates from the start and end values',
        },
        {
          id: 'p5-evidence-worldbank',
          kind: 'choose',
          label: 'Read the evidence',
          context: "An AI wrote: 'According to the World Bank, India overtook China as the world's most populous country in 2023.' You pulled the World Bank series.",
          prompt: 'What does this tell you?',
          artifact: {
            label: 'World Bank API, SP.POP.TOTL (fetched 10 Nov 2026, simplified)',
            code: true,
            text: '$ curl -s "https://api.worldbank.org/v2/country/IND;CHN/indicator/SP.POP.TOTL?format=json&date=2022:2024"\n\nChina  2022  1,412,175,000\nChina  2023  1,410,710,000\nChina  2024  1,408,975,000\nIndia  2022  1,425,423,212\nIndia  2023  1,438,069,596\nIndia  2024  1,450,935,791',
          },
          options: [
            { id: 'confirms', label: 'It confirms the claim: India is ahead in 2023.', feedback: 'India is ahead in 2023, but it is already ahead in 2022. This series does not show a 2023 overtake.' },
            { id: 'mismatch', label: 'The trend is right, but this source does not support "in 2023". Reword it, or cite the source that gives that date.', correct: true, feedback: 'Right. The 2023 date comes from the UN, which forecast that India would pass China by the end of April 2023. Cite that instead.' },
            { id: 'outdated', label: 'The World Bank data must be out of date. The AI probably has newer figures.', feedback: 'This series was last updated in October 2026. The AI has no data feed. It wrote a sentence that sounded right.' },
            { id: 'close', label: 'The numbers are too close to say anything.', feedback: 'They differ by more than 10 million people in every year shown. The data is clear. It just does not match the citation.' },
          ],
          explanation: 'Estimates differ between sources and get revised. That is normal. What matters is that the figure, the year and the source all match. Here the year came from one source and the citation from another, and only opening the data showed it.',
          takeaway: 'Check that the cited source says what the claim says, including the year',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Six out of six. You recompute, you trace, and you know when a number checks out.' },
          { min: 4, message: 'Solid. Look again at the ones you missed and which check would have caught them.' },
          { min: 0, message: 'Tough round. Replay the red flags: precision, vague authority, convenient fit, impossible math. Then run the Numbers Trace on the ones you missed.' },
        ],
      },
      summary: {
        insight: 'One answer was fine, two failed on arithmetic alone, and one cited real data that did not say what the claim said. None of them looked wrong. A calculator and the primary source told them apart.',
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
          whatToLookFor: "Compare to the claim. Here the AI said '31% a year', but the real compound rate from $4.2B to $9.1B over 4 years is about 21%. Also try: print(100/212*100) to see what 100 of 212 respondents is.",
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
        title: 'Numbers Trace',
        steps: [
          'Copy the figure, source, and year exactly as AI wrote them',
          'Search the exact figure in quotes, then the publisher site with site:',
          'Open the primary report or dataset: check sample, date, funder, definition',
          "Recompute the math. If you can't trace it, call it unsourced or drop it",
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Statistics Invention',
      summary: "You can now spot when AI produces numbers that sound like research. You know the four red flags (precision without context, vague authority, convenient fit, and impossible math), and you have a way to trace any figure back to its source.",
      // NOTE: no `checklist` here on purpose. Phase-level keyTakeaways +
      // checklist below are rendered by LessonShell's final screen.
      next: { label: 'Up Next', body: "Pattern 6, API Mirage: AI recommends functions and endpoints that look perfectly real, and were never there." },
    },
  ],

  keyTakeaways: [
    'AI generates statistics by pattern, not by looking them up. Precision is not evidence',
    'Red flags: suspiciously precise numbers, vague authorities, figures that conveniently fit your argument, and math that does not add up',
    'Real statistics have a named source, a date, a method, and numbers that reproduce when you recompute them',
    "The Numbers Trace: copy the claim, find the primary source, read the fine print, recompute the math",
    "If you can't trace it, say 'unsourced' or drop it. Never present it as fact",
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
  estimatedTime: 10,

  skillLearned: 'Tracing AI-provided statistics to their primary source',
  verificationMethod: 'Numbers Trace',

  caseStudy: {
    name: 'EY Canada "Points of Attack" loyalty-fraud report',
    date: 'May 2026',
    researcher: 'Om Ogale, Paul Esau and Alex Cui, GPTZero',
    source: 'https://gptzero.me/news/investigations/ey',
  },

  nextLesson: {
    id: 'pattern-06',
    title: 'API Mirage',
    teaser: 'Functions and endpoints that were never there.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
