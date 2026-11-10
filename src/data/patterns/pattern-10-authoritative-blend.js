// src/data/patterns/pattern-10-authoritative-blend.js
// Pattern 10: Authoritative Blend (capstone)
//
// CASE STUDY: Accenture / IE University "Leapfrogging Development" policy paper,
// whose hallucinated citations were exposed by GPTZero (November 2026).
// Callback: the AI-generated newspaper "summer reading list" (May 2025).
// TARGET: about 10 minutes total
//
// Authored in the block-based schema: each STOP phase is
// { title, steps: [block, ...] } and every block is one screen.
// See docs/pattern-authoring-guide.md for the block vocabulary.
//
// NOTE: This is the last pattern in the course, so there is intentionally no
// `nextLesson` in the metadata and the completion block wraps up all 10 patterns.

// ============================================
// SEE: Story -> Spot-check -> Reveal -> Impact
// ============================================
const see = {
  title: 'Report With Real Sources',
  steps: [
    {
      type: 'prose',
      heading: 'The most dangerous pattern of all.',
      body: `Every pattern so far had a tell: a package that doesn't exist, a number with no source, a quote nobody can find.

This one is different. Real facts and invented ones sit side by side in the same document. The real parts do the persuading. The fake parts ride along.

On 4 November 2026, the AI-detection company GPTZero published an investigation of "Leapfrogging Development", a policy paper on AI and African agriculture co-published by Accenture and IE University. Here are three entries from its reference list:`,
    },
    {
      type: 'chat',
      user: 'Give me sources on cocoa production and digital traceability in Africa.',
      ai: {
        text: `Here are three sources you can cite:

**1.** Adombila, M. A. (2024, September 16). *Ghana lost 160,000 tons of cocoa to smuggling in 2023/24 season, Cocobod official says.* Reuters.

**2.** Teal, F. (2023). *The Ghanaian cocoa industry: Institutions, incentives and change.* Oxford University Press.

**3.** SAATN. (2024). *Digital traceability in Southern African sugarcane cooperatives.* Southern African Agriculture Transformation Network.`,
        note: 'Reconstruction. The question and chat framing are illustrative. The three references are as printed in the paper (URLs omitted), per GPTZero\'s citation scan. Accenture denies that AI produced the errors.',
      },
    },
    {
      type: 'choice',
      question: 'You spot-check the first one: the Reuters story is real and says exactly that. Do you trust the other two?',
      subtext: "There's no wrong answer here. Just say what you would do.",
      options: [
        { id: 'trust-list', label: 'Yes. One checked out, and Oxford University Press is a serious publisher', response: 'That is exactly the trap. One real source checks out, and the check feels like proof for the whole list.' },
        { id: 'check-some', label: "I'd check one more", response: 'Better. But which one? If you happen to pick a real one, the check still passes.' },
        { id: 'check-all', label: 'I would check every reference independently', response: 'That is the habit this lesson builds. Hold on to it.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'GPTZero could not match the other two to any real source.',
      explanation: `The Reuters article is real. GPTZero found no book with that title by Teal, although the author has written other work on Ghana. And SAATN does not appear to be a real organisation; the paper even expands the acronym two different ways.

That's the Authoritative Blend: invented claims borrowing the credibility of true ones.`,
      list: {
        title: "Here's what was reported in November 2026:",
        items: [
          'The paper, published in November 2025, was co-produced by Accenture and IE University in Madrid',
          'GPTZero flagged 15 of its 89 citations as hallucinated, and said a person checked each flag by hand',
          'Many fakes leaned on something real: a real author, a real institution such as the FAO or TechnoServe, or a real web address that leads to a different document',
          'Accenture said the errors were human error, said there was no evidence they came from AI hallucination, and said the report was being corrected before re-release',
        ],
      },
    },
    {
      type: 'stats',
      title: 'Impact',
      items: [
        { value: '15 of 89', label: 'Citations flagged as hallucinated', detail: 'in the "Leapfrogging Development" paper' },
        { value: '31 of 245', label: 'Citations flagged across three Accenture publications', detail: 'the policy paper plus two research papers' },
        { value: '9', label: 'Claims in the paper that GPTZero judged fake', detail: 'factually wrong, or not supported by the cited source' },
      ],
      source: 'GPTZero investigation, 4 November 2026; also reported by Silicon UK and TechRadar',
    },
    {
      type: 'points',
      heading: 'Why is this the hardest pattern to catch?',
      items: [
        { label: 'The easy checks pass:', body: 'The publisher is real. The organisation is real. A quick search of the name confirms it.', tone: 'neutral' },
        { label: 'The real parts launder the fake parts:', body: 'You build trust from what you verified, then spend it on what you did not.', tone: 'danger' },
        { label: 'You have seen this before:', body: 'In May 2025, a syndicated summer reading list ran in the Chicago Sun-Times. Only 5 of its 15 books were real. The fakes were pinned on real authors, such as an Isabel Allende novel called "Tidewater Dreams" that she never wrote.', tone: 'danger' },
      ],
      conclusion: 'A mostly-true answer is not a mostly-safe answer. One invented claim in a real-looking list is still an invented claim.',
      transition: "Next, test those three references the way a fact-checker would: one at a time.",
    },
  ],
};

// ============================================
// TEST: Spot what to test in the reference list -> run the tests
// ============================================
const test = {
  title: 'Testing the Reference List',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'One reference checked out. Now look at the whole list.',
      instruction: 'Tap the parts of these references you would want to test. Some parts are solid. Some only borrow credibility from what sits next to them.',
      source: 'From the "Leapfrogging Development" reference list',
      segments: [
        { text: 'Here are three sources you can cite:', note: 'The framing presents all three as equally ready to use. Nothing in the list tells you which ones were checked.' },
        { text: '\n\n' },
        { text: '1. Adombila, M. A. (2024, September 16).', note: 'A named reporter and an exact date. Specific details like these are easy to check, which is good.' },
        { text: ' ' },
        { text: 'Ghana lost 160,000 tons of cocoa to smuggling in 2023/24 season, Cocobod official says. Reuters.', note: 'This one is real. The Reuters article exists and reports the 160,000-ton figure. It proves itself, and nothing else on the list.' },
        { text: '\n\n' },
        { text: '2. Teal, F. (2023).', note: 'A real economist who has written about Ghana. But a real name only proves the name.' },
        { text: ' ' },
        { text: 'The Ghanaian cocoa industry: Institutions, incentives and change.', flag: { label: 'Book title', explanation: 'This is the actual claim: that this specific book exists. A real author on a fitting topic makes the title feel pre-approved. It has to be checked on its own.' } },
        { text: ' ' },
        { text: 'Oxford University Press.', note: 'A serious publisher. That is a surface signal: anyone can type a famous publisher after a title.' },
        { text: '\n\n' },
        { text: '3. SAATN. (2024).', flag: { label: 'Organisation', explanation: 'An acronym you have probably never heard of, presented as an author. Before you check the document, check that the organisation behind it exists.' } },
        { text: ' ' },
        { text: 'Digital traceability in Southern African sugarcane cooperatives.', flag: { label: 'Report title', explanation: 'A neat, on-topic title with no link and no document number. If the organisation is in doubt, so is everything it supposedly published.' } },
        { text: ' ' },
        { text: 'Southern African Agriculture Transformation Network.', note: 'Spelling out the acronym makes it look official. A long formal name is still only words on the page.' },
      ],
      summary: 'Three things to test: does the Teal book exist, does SAATN exist, and does its report exist? Each one gets its own check. Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'You are fact-checking this reference list before quoting the paper. The Reuters article already checked out. Which tests tell you whether the other two are real?',
      claim: {
        label: 'Reference list',
        text: '1. Adombila, M. A. (2024). Ghana lost 160,000 tons of cocoa to smuggling in 2023/24 season, Cocobod official says. Reuters.\n2. Teal, F. (2023). The Ghanaian cocoa industry: Institutions, incentives and change. Oxford University Press.\n3. SAATN. (2024). Digital traceability in Southern African sugarcane cooperatives. Southern African Agriculture Transformation Network.',
      },
      rounds: [
        {
          title: 'Test 1: Does each source exist?',
          question: 'Reference 1 is real. What do you do about the other two?',
          options: [
            {
              id: 'partial',
              label: 'Nothing more. The Reuters one checked out, so the list is fine',
              useful: false,
              feedback: 'This is the Partial Check Trap. Your check proved that one article exists. It says nothing about the reference printed next to it.',
            },
            {
              id: 'catalogue',
              label: 'Search each exact title in a library catalogue (Open Library, WorldCat, Google Scholar)',
              useful: true,
              resultLabel: 'Open Library, checked 9 Nov 2026',
              result: 'title: "The Ghanaian cocoa industry"  author: Teal\n0 results',
              feedback: 'No match for the book. GPTZero found the same thing for both the Teal book and the SAATN report: no real source with either title. A real Oxford University Press book would be in the catalogues.',
              kit: 'Search each title on its own in a library catalogue or Google Scholar',
            },
            {
              id: 'formatting',
              label: 'Check that all three follow the same citation style',
              useful: false,
              feedback: 'They do, and it proves nothing. Invented references can be formatted just as cleanly as real ones. Style carries no information about whether a source exists.',
            },
          ],
        },
        {
          title: 'Test 2: Who is behind it?',
          question: 'The names look credible. How do you check the people and organisations?',
          options: [
            {
              id: 'bibliography',
              label: "Look up the author's actual bibliography",
              useful: true,
              resultLabel: 'Open Library author search: Francis Teal (checked 9 Nov 2026)',
              result: 'Why can Mauritius export manufactures and Ghana not (1999)\nPrivate sector wages and poverty in Ghana (2000)\nEmpirical development economics (2014)\n...\nNo "Ghanaian cocoa industry" title',
              feedback: 'Teal is real and has written about Ghana. That is what makes the fake title work. The author checks out; the book does not. That is the Credibility Borrow.',
              kit: "Check the author's real bibliography, not just that the author exists",
            },
            {
              id: 'organisation',
              label: 'Check that SAATN exists: a website, a registration, other work it has published',
              useful: true,
              resultLabel: "GPTZero's findings",
              result: 'SAATN: no matching organisation found\nThe paper expands it two ways:\n  "Southern Africa AgriTech Network" (page 36)\n  "Southern African Agriculture Transformation Network" (reference 71)',
              feedback: 'A real organisation has a trail you can follow. This one has none, and the paper cannot even agree on what the letters stand for.',
              kit: 'Confirm the organisation exists before trusting anything it supposedly published',
            },
            {
              id: 'big-names',
              label: 'Accenture and IE University published it, so someone will have checked',
              useful: false,
              feedback: 'A big firm and a university on the cover is more borrowed credibility. GPTZero still found 15 of the 89 citations did not match real sources.',
            },
          ],
        },
        {
          title: 'Test 3: Where do the links lead?',
          question: 'Many references in the paper came with links. How do you use them?',
          options: [
            {
              id: 'ask-ai',
              label: 'Paste the list into an AI and ask: "Are these real sources?"',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'Yes, these are credible sources from Reuters, Oxford University Press and a regional agricultural network...',
              feedback: 'An AI can confirm a reference just as fluently as it can invent one. Asking a model to vouch for citations is not a test.',
            },
            {
              id: 'follow-link',
              label: 'Open each printed link and check it lands on that exact document',
              useful: true,
              resultLabel: "From GPTZero's citation scan",
              result: '[42] Teal: Google Books link opens a different book on a similar topic\n[61] TechnoServe: link is the TechnoServe homepage\n[68] FAO: link is the FAO homepage\n[71] SAATN: no link at all',
              feedback: 'A link only counts if it opens the document cited. A homepage of a real organisation, or a different book, looks like evidence but proves nothing about the title.',
              kit: 'Follow every link and make sure it opens that exact document, not a homepage or a different title',
            },
            {
              id: 'close-enough',
              label: 'Search the topic and accept a similar-looking document as the source',
              useful: false,
              feedback: 'A near match is not a match. GPTZero found TechnoServe pages on a related subject, but nothing with the cited title. Swapping in a similar document hides the error instead of fixing it.',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what is this reference list?',
        options: [
          { id: 'reliable', label: 'A reliable list with a couple of minor slips', correct: false, feedback: 'A book with no match anywhere and an organisation that does not appear to exist are not slips in formatting. As cited, those sources are not real.' },
          { id: 'blend', label: 'A blend: one real source carrying two that match nothing real', correct: true, feedback: 'Right. The Reuters article is real and lends its credibility to the other two. Accenture says the errors were human, not AI, and is correcting the report. Either way, the references cannot be used as printed.' },
          { id: 'all-fake', label: 'Entirely made up, so throw the whole list out', correct: false, feedback: 'Too far. The Reuters article is real and does report the 160,000-ton figure. The point of testing each claim is to keep what holds up and cut what does not.' },
        ],
      },
      kit: {
        title: 'Your Authoritative Blend Test Kit',
        footer: 'A few minutes per reference. The list looked equally solid all the way down. Only checking each one separately showed the difference.',
      },
    },
  ],
};

// ============================================
// OBSERVE: 4 red flags + capstone matching + method
// ============================================
const observe = {
  title: 'Red Flags',
  steps: [
    {
      type: 'cardGrid',
      heading: 'Blended answers hide in plain sight.',
      subtext: 'They are not one trick. They are the other nine patterns, disguised by true statements. Watch for these 4 red flags.',
      cards: [
        { emoji: '🪪', label: 'Credibility Borrow' },
        { emoji: '🥪', label: 'Sandwich' },
        { emoji: '🎨', label: 'Consistent Style, Inconsistent Substance' },
        { emoji: '☑️', label: 'Partial Check Trap' },
      ],
    },
    {
      type: 'concept',
      emoji: '🪪',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Credibility Borrow',
      description: 'A real name, brand, or institution is attached to a claim it never made.',
      compare: {
        left: { label: '❌ Cited, but no matching source found:', tone: 'danger', items: ['"The Ghanaian cocoa industry" (2023), credited to F. Teal and Oxford University Press', '"Digital traceability in Ethiopian coffee cooperatives", credited to TechnoServe', '"Tidewater Dreams" by Isabel Allende (2025 reading list)'] },
        right: { label: '✓ Real examples:', tone: 'good', items: ['Reuters, Sept 2024: Ghana lost 160,000 tons of cocoa to smuggling (cited in the same paper)', '"The House of the Spirits" by Isabel Allende'] },
      },
      why: 'AI is good at what a real author or brand sounds like. A famous name makes a made-up title feel pre-approved.',
      spot: 'Verifying the name is not verifying the claim. Check the specific thing attached to the name.',
    },
    {
      type: 'concept',
      emoji: '🥪',
      eyebrow: 'Red Flag 2 of 4',
      name: 'Sandwich',
      description: 'A fabricated claim sits between two verifiable ones.',
      rows: [
        { label: 'Claim 1 (true):', variant: 'quote', tone: 'good', value: 'The Eiffel Tower is in Paris, on the Champ de Mars.' },
        { label: 'Claim 2 (invented):', variant: 'quote', tone: 'danger', value: "Gustave Eiffel's firm also designed the Golden Gate Bridge." },
        { label: 'Claim 3 (true):', variant: 'quote', tone: 'good', value: 'It was completed in 1889 for the World\'s Fair.' },
      ],
      note: 'Check the first and last claims and you walk away satisfied.',
      why: 'Surrounding a weak claim with strong ones borrows their credibility, and our attention fades toward the middle.',
      spot: 'Never judge a paragraph by its first and last sentences. Check the middle.',
    },
    {
      type: 'concept',
      emoji: '🎨',
      eyebrow: 'Red Flag 3 of 4',
      name: 'Consistent Style, Inconsistent Substance',
      description: 'Every claim is formatted with the same polish, so you cannot tell which ones can actually be checked.',
      compare: {
        left: { label: '✓ Easy to verify:', tone: 'good', items: ['A named author and exact title', 'A year, publisher, or DOI', 'A function name in official docs'] },
        right: { label: '⚠ Hard to verify, styled the same:', tone: 'danger', items: ['"Studies show..."', '"Widely regarded as..."', '"Industry surveys found..."'] },
      },
      why: 'AI writes everything in the same assured voice. Style carries no information about reliability.',
      spot: 'Sort each claim: can I check this, or only trust it? Uncheckable claims earn less trust, however polished.',
    },
    {
      type: 'concept',
      emoji: '☑️',
      eyebrow: 'Red Flag 4 of 4',
      name: 'Partial Check Trap',
      description: 'You verify one claim, it passes, and you trust the rest by association.',
      rows: [
        { label: 'You checked:', variant: 'quote', tone: 'good', value: '"The Reuters cocoa-smuggling article exists." Confirmed.' },
        { label: 'You skipped:', variant: 'quote', tone: 'danger', value: 'Does "Teal, F. (2023), Oxford University Press" exist as cited?' },
      ],
      note: 'One passing check feels like proof. It is only proof of that one claim.',
      why: 'Humans generalize from a sample. Blended answers are built so that any sample you pick is likely to pass.',
      spot: 'After every check, ask: what did this actually prove? Then check the next claim on its own.',
    },
    {
      type: 'matching',
      title: 'Capstone Check: Match the Pattern',
      instruction: 'Blended answers are built from the other nine patterns. Which pattern does each flag point to?',
      options: [
        { id: 'p1', emoji: '📦', label: 'Confident Fabrication (1)' },
        { id: 'p2', emoji: '🧩', label: 'Plausible Syntax (2)' },
        { id: 'p3', emoji: '🗓️', label: 'Version Hallucination (3)' },
        { id: 'p4', emoji: '📚', label: 'Phantom Citation (4)' },
        { id: 'p5', emoji: '🔢', label: 'Statistics Invention (5)' },
        { id: 'p6', emoji: '🔌', label: 'API Mirage (6)' },
        { id: 'p7', emoji: '🕰️', label: 'Historical Confabulation (7)' },
        { id: 'p8', emoji: '🧮', label: 'Logic Phantom (8)' },
        { id: 'p9', emoji: '🔮', label: 'Confident Extrapolation (9)' },
      ],
      items: [
        { prompt: 'npm install react-form-wizard-pro (zero downloads, created last week)', correct: 'p1', explanation: 'A package that does not really exist (or was just squatted) is Confident Fabrication.' },
        { prompt: 'Clean-looking code that calls fetch() but never awaits it', correct: 'p2', explanation: 'Code that looks right but quietly breaks is Plausible Syntax.' },
        { prompt: 'requests==2.31.0 pinned in a brand-new project', correct: 'p3', explanation: 'An old version suggested as if current (here, one with a known CVE) is Version Hallucination.' },
        { prompt: "A paper by 'Smith et al., 2021' with a DOI that leads nowhere", correct: 'p4', explanation: 'A source that does not exist is a Phantom Citation.' },
        { prompt: "'Reduces errors by 63%' with no source", correct: 'p5', explanation: 'A precise-looking number with nothing behind it is Statistics Invention.' },
        { prompt: 'df.smart_clean() on a real library', correct: 'p6', explanation: 'An invented method on a real library is an API Mirage.' },
        { prompt: 'A famous quote pinned on a person who never said it', correct: 'p7', explanation: 'Wrong attribution is Historical Confabulation.' },
        { prompt: "'Step 3: so 10 - (4 - 2k) + 2k = 6'", correct: 'p8', explanation: 'Tidy steps with a slipped sign (the real answer is 6 + 4k) are a Logic Phantom.' },
        { prompt: "'The registration deadline is this Friday' from a model with no live data", correct: 'p9', explanation: 'A confident present-tense fact the AI cannot know is Confident Extrapolation.' },
        { prompt: 'Every claim checks out in the official source', correct: 'trick-question', explanation: "Trick question! Nothing is wrong here. The point of verifying is to find out, not to assume the answer is fake.", extra: { id: 'trick-question', label: '✓ Nothing is wrong' } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'Claim-by-Claim Audit',
      tagline: 'The weakest-checked claim sets the trust level of the whole answer.',
      steps: [
        { number: 1, action: 'Split the answer into single claims', detail: 'One fact per line: a name, a date, a number, a method, a quote. A paragraph with 5 sentences may hold 8 claims.', time: '30 seconds' },
        { number: 2, action: 'Tag each claim: checkable or uncheckable', detail: 'Checkable means a named source or official doc can confirm or refute it. Uncheckable claims ("experts agree") get low trust.', time: '30 seconds' },
        { number: 3, action: 'Verify each claim independently', detail: 'Not just the headline. Use the right source for each: publisher catalog, official docs, DOI lookup.', time: '2 minutes' },
        { number: 4, action: 'Remove or flag what fails, then set trust by the weakest claim', detail: 'Cut the claim or mark it unverified. Do not carry it along because the rest looked good.', time: '30 seconds' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'Each claim confirmed by its own source',
            'Specific, searchable names, dates, and titles',
            'Sources found independently, not just via the AI',
            'Uncheckable claims removed or clearly labeled',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            'You only checked the first or most famous claim',
            'The only evidence is that the AI said so',
            'A claim exists only in the AI answer, nowhere else',
            'Everything is formatted equally, so you stopped sorting',
          ],
        },
      },
      footer: 'A real name proves the name. Checking each claim proves the claim.',
    },
  ],
};

// ============================================
// PRACTICE: Practice set -> Toolkit -> Completion
// Checked 10 Nov 2026: Crossref (10.1038/s42256-022-00452-0 is a different
// paper; no "Prompt sensitivity in large language models" in that journal),
// OSV advisories for requests 2.31.0, pandas docs (no DataFrame.smart_clean),
// UNESCO list/154, Wikipedia (Ada Lovelace, Analytical engine), Wikiquote
// (Einstein, Misattributed).
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Audit the Blend',
        instruction: 'Six exercises that mix tricks from all ten patterns. Check the middle claim, sort a setup guide, read a DOI lookup and fix a report summary.',
        note: 'One answer is fully correct. The audit is about finding out, not assuming the worst.',
      },
      items: [
        {
          id: 'p10-spot-sandwich',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Tell me about Ada Lovelace's work with Charles Babbage.'",
          prompt: 'Tap the claim that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer (illustrative)' },
          segments: [
            { text: "In 1843 Ada Lovelace published an English translation of an article on Babbage's Analytical Engine," },
            { text: ' ' },
            { text: 'adding seven notes of her own, A to G.' },
            { text: ' ' },
            { text: 'In 1846 she and Babbage completed a working prototype of the engine in London,', flag: true },
            { text: ' ' },
            { text: 'which they used to test her programs.', flag: true },
            { text: ' ' },
            { text: 'Her Note G sets out a method for calculating Bernoulli numbers,' },
            { text: ' ' },
            { text: 'often called the first published computer program.' },
          ],
          explanation: 'The Analytical Engine was never built: Babbage never completed any of his machines. The 1846 prototype is invented, and it sits between true claims. The translation and Notes A to G appeared in 1843, and the Bernoulli method in Note G is often called the first published computer program. A Sandwich with a Historical Confabulation in the middle.',
          takeaway: 'Check the middle claim, not just the first and last',
        },
        {
          id: 'p10-odd-setup',
          kind: 'pickAll',
          label: 'Odd one out',
          context: 'An AI wrote setup notes for a data-cleaning script in Python. Here are five lines from them (illustrative).',
          prompt: 'Which lines should you not use as written?',
          options: [
            { id: 'install', label: 'pip install scikit-learn pandas', feedback: 'Both are real packages, under their correct PyPI names.' },
            { id: 'pin', label: 'Pin requests==2.31.0, the current stable release', correct: true, feedback: 'Out of date. Requests has had many releases since, and 2.31.0 is affected by published security advisories fixed in 2.32.0 and later. Pattern 3.' },
            { id: 'dedupe', label: 'df.drop_duplicates() removes duplicate rows', feedback: 'A real pandas method, and that is what it does.' },
            { id: 'smart', label: 'df.smart_clean() fixes types and missing values in one call', correct: true, feedback: 'No such method. pandas has no DataFrame.smart_clean, and the docs page for it returns 404. Pattern 6.' },
            { id: 'stat', label: 'This approach cuts data-cleaning time by 47% (industry survey)', correct: true, feedback: 'An exact number with no named source. Pattern 5.' },
          ],
          explanation: 'Two correct lines make the other three feel safe. Each one needed its own check: the registry for the version, the docs for the method, a named source for the number.',
          takeaway: 'Real lines do not vouch for the lines next to them',
        },
        {
          id: 'p10-evidence-doi',
          kind: 'choose',
          label: 'Read the evidence',
          context: 'An AI gave you this reference (illustrative). You looked up its DOI on Crossref.',
          prompt: 'What does this tell you?',
          artifact: {
            label: 'Reference, then your check',
            code: true,
            text: 'Smith, J. & Patel, R. (2022). Prompt sensitivity in large\nlanguage models. Nature Machine Intelligence, 4(3), 196-210.\nhttps://doi.org/10.1038/s42256-022-00452-0\n\n$ curl -s https://api.crossref.org/works/10.1038/s42256-022-00452-0\n(summary of the result)\ntitle:    Biological underpinnings for lifelong learning machines\njournal:  Nature Machine Intelligence, 4(3), 196-210 (2022)\nauthors:  Kudithipudi, Aguilar-Simon, Babb ... (43 authors)',
          },
          options: [
            { id: 'real', label: 'The DOI works, so the reference is real', feedback: 'The DOI is real, but it belongs to a different paper by different authors. A working link only proves the link works.' },
            { id: 'typo', label: 'A small typo in the DOI. Cite it anyway', feedback: 'The journal, volume and pages match the real paper exactly. Only the title and authors differ, so this is not a typo.' },
            { id: 'borrowed', label: "It borrows a real paper's DOI. Search the title and authors on their own before citing anything", correct: true, feedback: 'Right. A Crossref title search for "Prompt sensitivity in large language models" in this journal found nothing when we checked.' },
            { id: 'crossref', label: 'Crossref must be wrong. Ask the AI for the correct DOI', feedback: 'Crossref is the registry DOIs are checked against. The AI would just produce another plausible DOI.' },
          ],
          explanation: 'This is the GPTZero finding in miniature: a real address that leads to a different document. Check that the DOI gives the same title and authors as the citation, not just that it resolves.',
          takeaway: 'A DOI that resolves must also match the title and authors',
        },
        {
          id: 'p10-fix-report',
          kind: 'choose',
          label: 'Fix it',
          context: 'Your revenue went from $2.0M last year to $2.5M this year. You asked an AI for a one-line summary.',
          prompt: 'Which version fixes it?',
          artifact: { label: 'AI summary (illustrative)', text: 'Revenue grew 20%, from $2.0M to $2.5M. At this rate, revenue will reach $3.0M next year.' },
          options: [
            { id: 'precise', label: 'Revenue grew 25%, from $2.0M to $2.5M, and will reach $3.125M next year.', feedback: 'The growth figure is fixed, but the forecast is now even more precise. An exact number about next year is still a guess (Pattern 9).' },
            { id: 'base', label: 'Revenue grew 20%, from $2.0M to $2.5M. If that rate held, next year would be $3.0M.', feedback: '20% is the increase divided by the new figure (0.5 / 2.5). Growth is measured from the starting value: 0.5 / 2.0 = 25%. The projection is built on the wrong rate.' },
            { id: 'scenario', label: 'Revenue grew 25%, from $2.0M to $2.5M. If that rate held, next year would be about $3.1M. That is a scenario, not a forecast.', correct: true, feedback: 'Right. (2.5 - 2.0) / 2.0 = 25%, 2.5 x 1.25 = 3.125, and the projection is stated as an assumption.' },
          ],
          explanation: 'Two patterns in two sentences: a Logic Phantom (growth divided by the wrong base) and Confident Extrapolation (a firm figure for next year). The real figures, $2.0M and $2.5M, make both feel solid.',
          takeaway: 'Recompute the percentage, and present any projection as a scenario',
        },
        {
          id: 'p10-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Give me a few facts about the Great Barrier Reef.'",
          prompt: 'Tap the claim that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer (illustrative)' },
          segments: [
            { text: 'The Great Barrier Reef lies in the Coral Sea,' },
            { text: ' ' },
            { text: 'off the coast of Queensland, Australia.' },
            { text: ' ' },
            { text: "It is the world's largest coral reef system," },
            { text: ' ' },
            { text: 'with around 400 types of coral and 1,500 species of fish.' },
            { text: ' ' },
            { text: 'UNESCO inscribed it as a World Heritage Site in 1981.' },
          ],
          explanation: "Nothing is invented. UNESCO's World Heritage listing and standard references confirm all of it: the location off Queensland, the world's largest collection of coral reefs, about 400 types of coral and 1,500 species of fish, and the 1981 inscription. A good audit sometimes ends with \"no changes needed\".",
          takeaway: 'A clean audit is a valid result. Suspicion is not the goal',
        },
        {
          id: 'p10-pick-quote',
          kind: 'choose',
          label: 'Pick the test',
          context: "An AI-written slide deck ends with: 'As Albert Einstein said, \"Insanity is doing the same thing over and over and expecting different results.\"'",
          prompt: 'Before you present it, which check settles who said it?',
          options: [
            { id: 'popular', label: 'It is quoted everywhere, so it is fine', feedback: 'Repetition is how misattributions spread. Popularity is not a source.' },
            { id: 'ask', label: 'Ask the AI to confirm that Einstein said it', feedback: 'It will probably agree. It learned the quote from the same pages that repeat the mistake.' },
            { id: 'source', label: 'Look it up in a quote-checking source such as Wikiquote, and find the earliest known source', correct: true, feedback: "Right. Wikiquote lists it under Einstein's misattributed quotes. The earliest known version is in a 1981 Narcotics Anonymous text." },
            { id: 'poster', label: 'It appears on professional-looking posters and in books', feedback: 'Looking professional is a surface signal. Good design does not check an attribution.' },
          ],
          explanation: 'There is no known record of Einstein saying it. A misattributed quote (Pattern 7) is easy to miss when it closes an otherwise accurate deck.',
          takeaway: 'Famous quote? Find the earliest source, not the most popular one',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Flawless audit. You checked each claim on its own, and you knew when to stop.' },
          { min: 4, message: 'Very strong. For the ones you missed, ask which single claim you stopped checking, and why.' },
          { min: 0, message: "Blends are hard on purpose. Slow down, split each answer into claims, and test them one at a time." },
        ],
      },
      summary: {
        insight: 'Every fake here sat next to something real: true dates, a real DOI, real packages, real revenue figures. One answer was clean. The audit works because it checks each claim on its own, whatever surrounds it.',
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Blend-Busting Toolkit',
      subtext: 'Techniques to verify each claim independently. Outputs shown are illustrative.',
      commands: [
        {
          title: 'Claim-by-Claim Audit worksheet',
          ecosystem: 'doc',
          command: `CLAIM | CHECKABLE? | SOURCE I USED | RESULT
1. [claim one]   | yes/no | ______ | pass/fail/unknown
2. [claim two]   | yes/no | ______ | pass/fail/unknown
3. [claim three] | yes/no | ______ | pass/fail/unknown
TRUST LEVEL = weakest result`,
          output: `1. Curie won Nobel Prizes in 1903 and 1911 | yes | nobelprize.org | pass
2. First president of the University of Paris | yes | Sorbonne history | FAIL
3. Coined 'radioactivity' | yes | biography | pass
TRUST LEVEL = FAIL -> remove claim 2`,
          whatToLookFor: 'No claim left blank. Any "unknown" counts as unverified until you find a source.',
        },
        {
          title: 'Exact-phrase and reverse image search',
          ecosystem: 'web',
          command: `"exact title in quotes" "author name"
Image check: upload the image to Google Lens or TinEye`,
          output: `[Illustrative] 0 results for the exact title and author on the publisher site.
Only copies of the AI-generated list itself appear.`,
          whatToLookFor: 'Results from independent, primary sources. Pages that merely repeat the AI claim do not count. For images, look for the earliest original source.',
        },
        {
          title: 'Check an author\'s bibliography',
          ecosystem: 'web',
          command: 'Open: https://openlibrary.org/search?q=author%3A%22Andy+Weir%22',
          output: `[Illustrative] Andy Weir
  The Martian (2011)
  Artemis (2017)
  Project Hail Mary (2021)`,
          whatToLookFor: "Does the exact title appear under that author? Cross-check the publisher's site or WorldCat. A title missing from every catalog is a strong warning sign.",
        },
        {
          title: 'Look up a citation by DOI (Crossref API)',
          ecosystem: 'cli',
          command: 'curl -s "https://api.crossref.org/works/10.1038/nature14539" | head -c 300',
          output: `{"status":"ok","message":{"title":["Deep learning"],
 "container-title":["Nature"],"issued":{"date-parts":[[2015]]},
 "author":[{"family":"LeCun"},{"family":"Bengio"},{"family":"Hinton"}]...`,
          whatToLookFor: 'Title, journal, year, and authors must all match what the AI claimed. A 404 or a mismatched title means the citation is wrong or invented.',
        },
      ],
      quickReference: {
        title: 'Claim-by-Claim Audit',
        steps: [
          'Split the answer into single claims',
          'Tag each one: checkable or uncheckable',
          'Verify each claim independently, not just the headline',
          'Remove or flag failures; the weakest claim sets the trust level',
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Course Complete: All 10 Patterns',
      summary: "You have now covered the full spectrum of AI hallucination: invented packages, plausible-looking code, outdated versions, phantom citations, made-up statistics, API mirages, historical errors, broken logic, confident extrapolation, and finally the Authoritative Blend that combines them all. You know the red flags, you know the methods, and you know that a few true claims never vouch for the rest.",
      // NOTE: no `checklist` here on purpose. The phase-level keyTakeaways +
      // checklist below are rendered by LessonShell's final screen.
      next: { label: 'What\'s Next', body: 'You have completed all 10 patterns. Revisit any pattern to sharpen your instincts, and apply the STOP method on every AI answer you rely on.' },
    },
  ],

  keyTakeaways: [
    'See: A mostly-true answer can still contain invented claims, and real names make the fake ones look pre-approved',
    'Test: Check each reference on its own: search the exact title, check the author and organisation, and follow the link to the actual document',
    'Observe: Watch for the Credibility Borrow, the Sandwich, uniform polish, and the Partial Check Trap',
    'Practice: Run the Claim-by-Claim Audit. Verify each claim independently, and let the weakest-checked claim set the trust level',
    'STOP on every answer you rely on: See the claims, Test each one, Observe the red flags, Practice the audit',
  ],
  checklist: {
    title: 'Your Authoritative Blend Checklist',
    items: [
      'Have I split this answer into individual claims?',
      'Have I tagged which claims are checkable and which are not?',
      'Did I verify each claim on its own, not just the first or most famous?',
      'Is a real name, brand, or paper attached to something I have not confirmed?',
      "Did I check the claim in the middle, not just the beginning and end?",
      'Have I removed or flagged anything that failed, instead of carrying it along?',
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-10',
  patternNumber: 10,
  title: 'Authoritative Blend',
  subtitle: 'Real and fake mixed together',
  description: 'Learn to catch AI answers that weave verifiable facts together with invented ones, so the real parts make the fake parts look trustworthy.',
  estimatedTime: 10,

  skillLearned: 'Auditing mixed-truth AI answers one claim at a time',
  verificationMethod: 'The Claim-by-Claim Audit',

  caseStudy: {
    name: 'Hallucinated citations in the Accenture / IE University "Leapfrogging Development" policy paper',
    date: 'November 2026 (paper published November 2025)',
    researcher: 'GPTZero (Paul Esau, Avikam Mangla, Midhun Dandamudi)',
    source: 'https://gptzero.me/news/investigations-accenture',
  },

  // No nextLesson: this is the final pattern in the course.

  phases: { see, test, observe, practice },
};

export default lesson;
