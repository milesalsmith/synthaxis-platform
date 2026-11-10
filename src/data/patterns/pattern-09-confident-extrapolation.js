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
// Canada (Feb 2024). TEST works through the reconstructed Michigan answer
// against the official rules (Michigan.gov and vote.gov, checked 9 Nov 2026).
// Practice items marked illustrative (Acme, the shop chatbot) are made up; the
// practice set tests the KIND of claim (time-sensitive, place-specific,
// private or future vs stable or grounded).

// ============================================
// SEE: Story -> First reaction -> Reveal
// ============================================
const see = {
  title: 'Answer From Yesterday',
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
      subtext: "There's no wrong answer here. Go with your first reaction.",
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
      title: 'Scale',
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
      transition: 'So how would you have caught it? Next, test that answer the way you would test any time-sensitive claim.',
    },
  ],
};

// ============================================
// TEST: Spot the flaw -> Investigate the deadline answer
// ============================================
const test = {
  title: 'Testing the Deadline',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'Before you plan around it, look at what the answer actually claims.',
      instruction: 'Tap the parts of this answer you would want to test. Some parts are fine. Some are exactly where the problem hides.',
      source: 'From the chatbot answer (reconstructed)',
      segments: [
        { text: "Here's how to vote", flag: { label: 'Stated as current, with no date or source', explanation: 'The answer reads like a description of the rules right now. It never says when its information is from, where it came from, or that you should confirm it with your election office.' } },
        { text: ' ' },
        { text: "in Michigan's 4th district:", note: 'This just repeats your question back. Registration deadlines in Michigan are set statewide, so naming the district adds no precision. It only makes the answer feel tailored.' },
        { text: ' ' },
        { text: 'Register online', note: 'A real option. Michigan does offer online voter registration.' },
        { text: ' ' },
        { text: 'by [a date later than the real deadline].', flag: { label: 'Online deadline', explanation: 'A deadline is a fact about one specific election, counted back from Election Day, and the rules can change. A model may be repeating an old cycle or filling in a plausible date. This is the claim that could cost someone their vote.' } },
        { text: ' ' },
        { text: 'Register by mail', note: 'Also a real option in Michigan.' },
        { text: ' ' },
        { text: 'by [a date later than the real deadline].', flag: { label: 'Mail deadline', explanation: 'A second confident date, also with no source. Two specific dates side by side look twice as solid, but they could come from the same stale information.' } },
        { text: ' ' },
        { text: 'Then vote in person on Election Day,', note: 'True in general. Michigan also offers early in-person voting, but this line makes no specific claim that could have gone stale.' },
        { text: ' ' },
        { text: 'or request an absentee ballot.', note: 'A real option in Michigan. Generic advice like this is usually right, which helps the wrong dates blend in.' },
      ],
      summary: 'Three things to test: could these dates have changed since the model was trained, what do the official rules say, and where did the answer get its dates? Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'You want to register in Michigan and this is the answer you got. You have a browser and a couple of minutes. Which tests tell you whether those deadlines are real?',
      claim: {
        label: 'Answer',
        text: "Here's how to vote in Michigan's 4th district: Register online by [a date later than the real deadline]. Register by mail by [a date later than the real deadline]. Then vote in person on Election Day, or request an absentee ballot.",
      },
      rounds: [
        {
          title: 'Test 1: Could this have changed?',
          question: 'Before looking anything up, what do you ask about these dates?',
          options: [
            {
              id: 'district',
              label: 'It named my exact district, so it must have looked it up',
              useful: false,
              feedback: 'Repeating your question back is not research. Michigan sets registration deadlines statewide, so the district name tells you nothing about where the dates came from.',
            },
            {
              id: 'time-sensitive',
              label: 'Ask: is this a fact that changes, and could the model have seen this year\'s version?',
              useful: true,
              feedback: 'Yes. Registration deadlines belong to a specific election and are counted back from Election Day, so they move every cycle. A model only knows what it saw before its training cutoff. ISD found chatbots giving outdated deadlines, and in one case 2024 election dates. Time-sensitive means check it.',
              kit: 'Ask whether the fact is time-sensitive: could it have changed since the model was trained?',
            },
            {
              id: 'sounds-official',
              label: 'It sounds official and clear, so it is probably fine',
              useful: false,
              feedback: 'Tone is not evidence. A confident, tidy answer is what these models produce whether the facts are current or not. The wrong answer NPR reported sounded just as sure as a right one.',
            },
          ],
        },
        {
          title: 'Test 2: What do the official rules say?',
          question: 'The dates could be stale. Where do you check the real deadlines?',
          options: [
            {
              id: 'state-site',
              label: "Michigan's own election pages (Michigan Department of State, Michigan.gov/Vote)",
              useful: true,
              resultLabel: 'Michigan Department of State, checked 9 Nov 2026',
              result: 'Online: register 15 or more days prior to Election Day\nBy mail: postmarked at least 15 days before Election Day\nWithin 14 days of an election: register in person at your\nlocal clerk\'s office and present proof of residency',
              feedback: 'This is the primary source: the office that actually runs registration. It gives the rule, not a guess. Any date later than 15 days before Election Day for online or mail registration is wrong.',
              kit: "Go to the official source: your state's election office or Secretary of State",
            },
            {
              id: 'vote-gov',
              label: 'vote.gov, the federal site with a page for every state',
              useful: true,
              resultLabel: 'vote.gov Michigan page, checked 9 Nov 2026',
              result: 'Online registration deadline: 15 days before Election Day\nMail-in registration deadline: Must be postmarked 15 days before Election Day\nIn-person registration deadline: Available up to and including on Election Day\n\nLast updated: September 12, 2025',
              feedback: 'It agrees with the state and links straight to Michigan\'s site. Notice the "last updated" line: even official summaries have a date. When they differ, the state election office has the final word.',
              kit: 'Use vote.gov to find your state\'s page, and note the date on it',
            },
            {
              id: 'guide',
              label: 'A polished "Michigan voting guide" near the top of search results',
              useful: false,
              feedback: 'Good formatting is not freshness. A guide written for 2024 can rank well in 2026. As the Brennan Center\'s Abdiaziz Ahmed told NPR, chatbots "pull from whatever they can find online", and so does a search page.',
            },
          ],
        },
        {
          title: 'Test 3: Where did the answer come from?',
          question: 'The official rule does not match. How do you work out why the answer went wrong, so you know how far to trust the rest of it?',
          options: [
            {
              id: 'ask-again',
              label: 'Ask the chatbot again in a new chat',
              useful: false,
              resultLabel: 'Illustrative',
              result: 'A slightly different answer, with different dates, or the same ones',
              feedback: 'Either way it proves nothing. Getting the same dates twice does not make them right, and getting new ones only shows it is guessing. In IFPG\'s data, Claude gave wrong or outdated voting information one time in three.',
            },
            {
              id: 'check-source',
              label: 'Look for the source the answer used, and the date on it',
              useful: true,
              resultLabel: 'From the answer above',
              result: 'Sources cited: none\nDate of information: none',
              feedback: 'No source means no way to tell if the dates came from this year\'s rules, an old election, or nowhere. When an answer does cite a page, open it and check its date. ISD flagged "a reliance on outdated sources".',
              kit: 'Check what source the answer used, and how old it is',
            },
            {
              id: 'check-browsing',
              label: 'Check whether the tool had live web search for this answer',
              useful: true,
              feedback: 'Without live search, the answer can only come from training data, which stops at a cutoff. With search, it can still pull an old page. Either way, a time-sensitive answer with no date or source should be treated as out of date until you confirm it.',
              kit: 'Check whether the tool had live search. If not, assume time-sensitive answers may be stale',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what were those deadlines?',
        options: [
          { id: 'district-rules', label: 'Correct for the 4th district, which has its own deadlines', correct: false, feedback: 'Michigan sets its registration deadlines statewide. There is no separate 4th district rule for the dates to come from.' },
          { id: 'extrapolated', label: 'Wrong dates, not grounded in this year\'s rules, stated as current fact', correct: true, feedback: "Right. Michigan's rule is 15 days before Election Day for online and mail registration. The answer gave later dates with no source, no date and no caveat. A voter who trusted it could have missed the cutoff, and after that the only route was registering in person at a clerk's office with proof of residency." },
          { id: 'typo', label: 'A small slip in an otherwise reliable answer', correct: false, feedback: 'The rest of the answer was generic advice that is right almost anywhere. The only specific, time-sensitive facts in it were the two dates, and those were the parts that were wrong.' },
        ],
      },
      kit: {
        title: 'Your Extrapolation Test Kit',
        footer: 'About a minute on the official site. The answer looked the same either way. Only checking the source could tell you the dates were wrong.',
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
      heading: 'Extrapolation follows predictable patterns.',
      subtext: 'When a model answers beyond what it knows, the wording tends to give it away. Watch for these 4 red flags.',
      cards: [
        { emoji: '🕰️', label: 'Timeless Present' },
        { emoji: '🔮', label: 'Crystal Ball' },
        { emoji: '👻', label: 'Phantom Read' },
        { emoji: '🚫', label: 'Missing Cutoff Caveat' },
      ],
    },
    {
      type: 'concept',
      emoji: '🕰️',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Timeless Present',
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
      name: 'Crystal Ball',
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
      name: 'Phantom Read',
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
        { id: 'flag-1', emoji: '🕰️', label: 'Timeless Present' },
        { id: 'flag-2', emoji: '🔮', label: 'Crystal Ball' },
        { id: 'flag-3', emoji: '👻', label: 'Phantom Read' },
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
// PRACTICE: Practice set -> Toolkit -> Completion
// Checked 10 Nov 2026: devguide.python.org/versions (3.10 end of life
// 2026-10-01), Wikipedia "Right turn on red" (NYC ban since 1977), US
// federal minimum wage still $7.25 (Wikipedia; news reports, Nov 2026).
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Could It Know That?',
        instruction: 'Six short exercises. Find the claim that does not hold everywhere, read an official page, sort what an AI could know, and pick the right check.',
        note: 'Some answers here are fine. A good answer sticks to stable facts, uses what you gave it, or tells you where to check.',
      },
      items: [
        {
          id: 'p9-spot-place',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Can I turn right on a red light in the US?'",
          prompt: 'Tap the part that overreaches, or tell us nothing does.',
          artifact: { label: 'AI answer (illustrative)' },
          segments: [
            { text: 'Yes.' },
            { text: ' ' },
            { text: 'After coming to a full stop,' },
            { text: ' ' },
            { text: 'you can turn right on red anywhere in the US', flag: true },
            { text: ' ' },
            { text: 'unless a sign prohibits it.' },
            { text: ' ' },
            { text: 'This includes New York City.', flag: true },
            { text: ' ' },
            { text: 'Always yield to pedestrians and oncoming traffic.' },
          ],
          explanation: 'Right on red is the general rule in the US, but local rules differ. New York City has prohibited it since New York State legalized it in 1977, with only rare exceptions. The AI took a general rule and stretched it to every place. Check the rules for the state and city you are driving in.',
          takeaway: 'A rule that is true in most places is not true in every place',
        },
        {
          id: 'p9-evidence-eol',
          kind: 'choose',
          label: 'Read the evidence',
          context: "An AI told you: 'Python 3.10 still gets security fixes, so it's a safe choice for a new service.' You opened the official Python Developer's Guide.",
          prompt: 'What does this tell you?',
          artifact: {
            label: 'devguide.python.org/versions (excerpt, checked 10 Nov 2026)',
            code: true,
            text: 'Supported versions\nBranch  Status       First release  End of life\n3.15    bugfix       2026-10-09     2031-10\n3.14    bugfix       2025-10-07     2030-10\n3.13    security     2024-10-07     2029-10\n3.12    security     2023-10-02     2028-10\n3.11    security     2022-10-24     2027-10\n\nUnsupported versions\n3.10    end-of-life  2021-10-04     2026-10-01',
          },
          options: [
            { id: 'stale', label: 'The claim was probably true when the model was trained, but 3.10 reached end of life on 1 October 2026. Pick a supported version.', correct: true, feedback: 'Right. Both can be true: 3.10 was supported in the model\'s snapshot, and it is not today. The live page wins.' },
            { id: 'page', label: 'The page is probably behind. The AI may know something newer.', feedback: 'This page is maintained by the Python core developers and is the primary source. A model has no newer information than its training data.' },
            { id: 'broken', label: '3.10 has stopped working, so existing code will break.', feedback: 'End of life means no more fixes, including security fixes. The code still runs; it just stops getting patched.' },
            { id: 'close', label: 'Close enough. It was supported until very recently.', feedback: 'For a new service, "supported until recently" means unpatched from now on. That is what you were trying to avoid.' },
          ],
          explanation: 'Support dates are set per version and run out on a schedule. A model trained before October 2026 could honestly believe 3.10 was supported. That is why "still" and "current" need the live page.',
          takeaway: 'True when the model was trained is not the same as true today',
        },
        {
          id: 'p9-diagnose-sort',
          kind: 'pickAll',
          label: 'Diagnose',
          context: 'Five answers from the same chat. You did not share any documents, apart from one config file you pasted in.',
          prompt: 'Which answers go beyond what the AI could know?',
          options: [
            { id: 'leave', label: "'Your company's onboarding document gives new hires 25 days of paid leave.'", correct: true, feedback: 'No document was shared. It cannot know your private policy, so the number is a guess. Check with HR.' },
            { id: 'ceo', label: "'Acme Corp's current CEO is Jane Doe, who has led it since 2021.' (illustrative)", correct: true, feedback: "'Current' role-holders change, and the model's snapshot has an age. Check the company's own site or recent news." },
            { id: 'port', label: "'Your pasted config says port: 8080, so the server listens on 8080.'", feedback: 'This is grounded in text you gave it, and quick to confirm against your paste.' },
            { id: 'forecast', label: "'Signups grew 10%, 12% and 14%, so next month will be 16%.'", correct: true, feedback: 'Continuing a trend is arithmetic, not knowledge. It ignores seasons, campaigns and everything else that moves real numbers.' },
            { id: 'km', label: "'There are 1,000 meters in a kilometer.'", feedback: 'A stable definition. It does not depend on the date, the place or a version.' },
          ],
          explanation: 'Private, current and future claims all depend on information the model did not have. Stable facts and content you supplied are different: the model can work from those reliably.',
          takeaway: 'Private, current or future: the AI could not have known it',
        },
        {
          id: 'p9-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'What's the latest version of the requests library?'",
          prompt: 'Tap the part that overreaches, or tell us nothing does.',
          artifact: { label: 'AI answer (illustrative)' },
          segments: [
            { text: "I can't check live data in this chat," },
            { text: ' ' },
            { text: 'and my training has a cutoff,' },
            { text: ' ' },
            { text: 'so the newest version I know of may be out of date.' },
            { text: '\n\n' },
            { text: 'To see the current release, run' },
            { text: ' ' },
            { text: 'pip index versions requests' },
            { text: ' ' },
            { text: 'or open pypi.org/project/requests.' },
          ],
          explanation: 'Nothing is wrong. It states its limits, gives no version number for you to trust, and points to two primary sources. That turns a guess into a 10-second check, which is the behavior you want.',
          takeaway: 'An answer that names its limits and points to the source is a good answer',
        },
        {
          id: 'p9-pick-test',
          kind: 'choose',
          label: 'Pick the test',
          context: "A shop's support chatbot tells you: 'You can return any item for a full refund within 90 days.' (Illustrative shop.)",
          prompt: 'You want to rely on this. What do you check?',
          options: [
            { id: 'ask', label: "Ask the chatbot: 'Are you sure?'", feedback: 'It will usually repeat itself, sounding just as sure. That is the same source twice.' },
            { id: 'forum', label: 'Search for other customers who say it worked for them', feedback: "Other people's experiences may come from an older policy, another country or a special case." },
            { id: 'policy', label: "Open the shop's published returns policy and check its date and conditions", correct: true, feedback: 'Right. The written policy is the source that counts. Check the conditions too: sale items, opened goods, your country.' },
            { id: 'tone', label: 'It sounds official and specific, so it is fine', feedback: 'Specific is not the same as current. Support bots can describe policies that do not exist.' },
          ],
          explanation: 'Policies vary by shop, country and date, and bots get them wrong. In 2024 a Canadian tribunal held Air Canada liable after its chatbot described a refund policy wrongly (Moffatt v. Air Canada). Read the written policy before you act on it.',
          takeaway: 'For rules that vary by place and date, read the source that sets them',
        },
        {
          id: 'p9-fix-scope',
          kind: 'choose',
          label: 'Fix it',
          context: "You asked: 'What's the minimum wage where I work in the US?'",
          prompt: 'Which rewrite fixes the problem?',
          artifact: { label: 'AI answer (illustrative)', text: 'The minimum wage in the US is $7.25 an hour.' },
          options: [
            { id: 'cutoff', label: "'As of my knowledge cutoff, the minimum wage in the US is $7.25 an hour.'", feedback: 'A date caveat helps, but the bigger problem is place. $7.25 is the federal floor, and many states and some cities set a higher rate.' },
            { id: 'fifteen', label: "'The minimum wage in the US is now $15 an hour.'", feedback: '$15 is the rate in some states, not a national rule. Swapping one number for another keeps the same mistake.' },
            { id: 'scoped', label: "'The federal minimum is $7.25 an hour, but many states and some cities set higher rates, and these change. Check your state labor department for the rate where you work.'", correct: true, feedback: 'Right. It separates the national floor from local rates and sends you to the source that sets yours.' },
            { id: 'probably', label: "'The minimum wage in the US is probably $7.25 an hour.'", feedback: '"Probably" adds doubt without saying why, or where to check.' },
          ],
          explanation: 'The federal minimum has been $7.25 since 2009, but employers must pay the highest of the federal, state and local rates. So the right figure depends on where you work, and many state rates went up in 2026.',
          takeaway: 'National figure or local rule? Say which, and where to check',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Six out of six. You can tell grounded answers from extrapolated ones, even when they sound the same.' },
          { min: 4, message: 'Nice work. For the ones you missed, ask: where did this information come from, and could the AI have seen it?' },
          { min: 0, message: "These were tricky on purpose. Re-run the 'Check the Clock' steps on each one and read the explanations again." },
        ],
      },
      summary: {
        insight: 'The risky answers depended on a place, a date, a version or something private, and they sounded as sure as the safe ones. The good answers stuck to stable facts, used what you gave them, or told you where to check.',
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
  estimatedTime: 10,

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
