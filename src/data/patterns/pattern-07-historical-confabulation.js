// src/data/patterns/pattern-07-historical-confabulation.js
// Pattern 07: Historical Confabulation
//
// CASE STUDY: AI-generated false intelligence report on a Chinese ship
// (incident spring 2026; reported by CNN, 18 September 2026)
// TARGET: ~18 minutes total
//
// Authored in the block-based schema (see docs/pattern-authoring-guide.md).
// Content-only: no component changes needed.

// ============================================
// SEE (3 min): Hook -> Chat -> Trust check -> Reveal -> Impact
// ============================================
const see = {
  title: 'The Cargo That Was Never There',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'The planes were already in the air.',
      body: `This spring, during the war with Iran, an intelligence report circulated across the US military. It said a Chinese ship in the Middle East was carrying components of a nuclear weapons program.

According to four sources who spoke to CNN, the military planned to intercept the vessel. Armed personnel were preparing to board it, and military aircraft were in the air.

Then, just before the operation, officials dug into where the report came from. A Special Operations Command analyst had used an AI chatbot to analyze intelligence about the ship's manifest, and the chatbot had misidentified the cargo. One source called the report "entirely false" and said it "almost started a war."

Here's roughly how a mistake like that reaches the top of a chain of command.`,
    },
    {
      type: 'chat',
      user: "Using these manifest reports and intercepts, what is this vessel carrying? Then format the findings as a standard intelligence report.",
      ai: {
        text: `ASSESSMENT: The vessel is assessed to be transporting components associated with a nuclear weapons program.

BASIS: Open-source shipping data, combined with signals intelligence on the vessel's manifest.

RECOMMENDATION: Prioritize the vessel for interception.`,
        note: "Reconstruction for teaching purposes, not the real text, which has not been made public. CNN reported that the chatbot fused open-source and classified signals intelligence, misidentified the cargo, and that the analyst then used AI again to package the findings into a standard report. CNN could not learn what the misidentified cargo was.",
      },
    },
    {
      type: 'choice',
      question: 'If this landed in your inbox, would you act on it?',
      subtext: "There's no wrong answer here. We're testing your instincts.",
      options: [
        { id: 'yes-official', label: "Yes. It's in the official format and came through command channels", response: "Understandable. That's exactly what happened. The standard format made an unverified claim look like vetted intelligence." },
        { id: 'maybe-source', label: "Maybe, but I'd ask what the claim is actually based on first", response: 'That one question is the whole skill. It is also the question officials asked, just before the operation.' },
        { id: 'no-unsourced', label: "No. A dramatic claim with no traceable source is a red flag", response: 'Good instinct. The bigger the claim, the more it needs a source you can point to.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'The cargo claim was invented.',
      explanation: `The ship was real and the manifest reporting was real. The conclusion, what the ship was carrying, was something the chatbot produced and stated as fact.

This is confabulation: an AI fills a gap with a plausible event or fact and presents it in the same confident voice as everything else. Here, a second pass through AI turned that guess into an official-looking report, so it looked like checked work.`,
      list: {
        title: "Here's what was reported:",
        items: [
          'Spring 2026: an analyst used a chatbot to analyze intelligence on a Chinese ship\'s manifest, and it misidentified the cargo',
          'The analyst used AI again to format the findings as a standard intelligence report, which was then circulated',
          'Plans to intercept and board the ship were under way before officials traced the report back to AI and halted the operation',
          'CNN broke the story on 18 September 2026. The next day, Senators Warner, Reed and Coons asked for inspector-general investigations into AI errors in military targeting',
        ],
      },
    },
    {
      type: 'stats',
      title: 'The Impact',
      items: [
        { value: '2', label: 'Passes through AI', detail: 'one to reach the conclusion, one to make it look official' },
        { value: '4', label: 'Sources CNN cited', detail: 'the Pentagon did not respond to requests for comment' },
        { value: '3', label: 'Senators seeking a probe', detail: 'letter to the Defense Secretary and the DNI' },
      ],
      source: 'CNN, 18 and 19 September 2026',
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Embarrassing but contained:', body: 'A wrong date or quote in a casual chat. You look slightly silly at dinner.', tone: 'neutral' },
        { label: 'Actually costly:', body: "A confabulated fact, date, or quote lands in a report, a book, or a briefing. Now it looks authoritative. In May 2026, Ars Technica reported that a New York Times investigation found AI-linked 'synthetic quotes' in a book about AI and truth. Kara Swisher told the Times she 'never said' one of them.", tone: 'danger' },
      ],
      conclusion: 'A system that predicts plausible text can predict a plausible event as easily as a plausible quote. The defense is the same for both: trace the claim back to a source that actually exists.',
      transition: "So how do you catch it? Start with something lower-stakes: history. Let's test your instincts.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 AI statements - Use it or Check first?
// ============================================
const test = {
  title: 'Use It or Check First?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 historical claims an AI assistant might give you.',
        instruction: 'For each one, decide: would you use it as written, or check it first?',
        note: "Don't search anything yet. Go with your gut.",
        legend: {
          trust: { label: 'TRUST', detail: 'Safe to use as written', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Check a source first', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          prompt: "As Albert Einstein said, 'Insanity is doing the same thing over and over and expecting different results.'",
          context: "You asked: 'Give me a good quote about persistence for my presentation.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Misattributed',
          explanation: 'MISATTRIBUTED. This line is everywhere with Einstein\'s name on it, but researchers such as Quote Investigator have found no evidence he said it. The earliest known uses appear in recovery-group literature decades after his death.',
          redFlag: 'Famous name + pithy line + no source',
        },
        {
          id: 'item-2',
          prompt: 'The Berlin Wall fell on 9 November 1989, when East Germany announced that its borders were open.',
          context: "You asked: 'When did the Berlin Wall fall?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Accurate',
          explanation: 'ACCURATE. The night of 9 November 1989 is the standard, heavily documented date. Formal German reunification followed on 3 October 1990.',
          meta: 'Date appears consistently across encyclopedias and archives',
        },
        {
          id: 'item-3',
          prompt: "Marie Antoinette famously replied 'Let them eat cake' when told the French peasants had no bread.",
          context: "You asked: 'What did Marie Antoinette say about the bread shortage?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Not reliably attributed',
          explanation: "NOT RELIABLY ATTRIBUTED. A similar line about a 'great princess' appears in Rousseau's Confessions, written around 1765, when Marie Antoinette was about ten years old. No contemporary source has her saying it. The story stuck because it is vivid and tidy.",
          redFlag: 'A vivid anecdote with no primary source',
        },
        {
          id: 'item-4',
          prompt: 'The Apollo 11 lunar module landed on the Moon on 20 July 1969.',
          context: "You asked: 'When did humans first land on the Moon?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Accurate',
          explanation: 'ACCURATE. The lunar module landed on 20 July 1969. Neil Armstrong first stepped onto the surface hours later, which is 21 July in UTC but still the evening of 20 July in US time zones.',
          meta: 'Extremely well-documented, with NASA primary records',
        },
        {
          id: 'item-5',
          prompt: 'The Declaration of Independence was adopted on 4 July 1776, and all 56 delegates signed it that same day.',
          context: "You asked: 'What happened on July 4, 1776?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Half right',
          explanation: 'HALF RIGHT. Congress adopted the Declaration on 4 July 1776, but the famous engrossed copy was signed mostly on 2 August 1776, and some delegates signed later. The first half is correct, and the added detail was invented to make the story tidier.',
          redFlag: 'A true fact with an extra, too-neat detail attached',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You caught all 5. Pay attention to how convincing the wrong ones were, because that's the real challenge." },
          { min: 4, message: "4 out of 5! Solid instincts. The red flags ahead will help you catch the last one." },
          { min: 3, message: "3 out of 5. Not bad! Wrong history sounds exactly like right history, and that's the problem." },
          { min: 0, message: "This is tricky, and that's the point. AI delivers wrong history in the same calm voice as right history. Let's learn what gives it away." },
        ],
      },
      summary: {
        insight: "3 of these 5 statements had a problem: a misattributed quote, a vivid anecdote with no source, and a true date with a false detail attached. The two accurate ones were famous, heavily documented dates. The wrong ones were the ones that sounded best. Same lesson as the Chinese-ship report: polish and confidence told you nothing about accuracy.",
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
      heading: 'Historical confabulation follows predictable patterns.',
      subtext: 'Wrong history rarely looks wrong. It tends to show up in four recognizable shapes.',
      cards: [
        { emoji: '🧲', label: 'The Quote Magnet' },
        { emoji: '📖', label: 'The Too-Tidy Narrative' },
        { emoji: '📅', label: 'The Anniversary Blur' },
        { emoji: '❓', label: 'The Missing Source' },
      ],
    },
    {
      type: 'concept',
      emoji: '🧲',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Quote Magnet',
      description: 'A famous name plus a pithy, quotable line. Memorable quotes drift toward famous people over time, and AI inherits the drift.',
      compare: {
        left: {
          label: '❌ Commonly misattributed:',
          tone: 'danger',
          items: [
            "'I disapprove of what you say, but I will defend to the death your right to say it' (credited to Voltaire)",
            "'Well-behaved women seldom make history' (credited to Marilyn Monroe)",
            "'The only thing necessary for the triumph of evil is for good men to do nothing' (credited to Edmund Burke)",
          ],
        },
        right: {
          label: '✓ Traceable to a source:',
          tone: 'good',
          items: [
            "'The only thing we have to fear is fear itself' (FDR, first inaugural address, 4 March 1933)",
            "'I have a dream' (Martin Luther King Jr., 28 August 1963)",
            "'Ask not what your country can do for you' (JFK, inaugural address, 20 January 1961)",
          ],
        },
      },
      why: "Quotes get attached to whoever feels most authoritative. Because the internet repeats the famous attribution, a model trained on it learns that attribution as 'true'.",
      spot: 'If a snappy line is credited to Einstein, Churchill, Twain, Gandhi, or Lincoln, check it before you repeat it.',
    },
    {
      type: 'concept',
      emoji: '📖',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Too-Tidy Narrative',
      description: 'A clean cause-and-effect story that is smoother than real history ever is.',
      rows: [
        { label: 'AI says:', variant: 'quote', tone: 'danger', value: 'World War I began because one man was shot in Sarajevo in 1914.' },
        { label: 'Historians say:', variant: 'quote', tone: 'good', value: 'The assassination on 28 June 1914 was the trigger. Alliances, rivalries, and military planning made a wider war likely.' },
      ],
      note: 'One cause, one event, one villain: real history rarely behaves that way.',
      why: "Models generate the most narratively satisfying continuation. A single clean cause makes a better story than a tangle of contributing factors.",
      spot: "When a complex event is explained by one clean cause ('it all started when...'), ask what the answer left out.",
    },
    {
      type: 'concept',
      emoji: '📅',
      eyebrow: 'Red Flag 3 of 4',
      name: 'The Anniversary Blur',
      description: 'Dates off by a year or a digit, or two similar events blended into one.',
      rows: [
        { label: 'AI says:', variant: 'code', tone: 'danger', value: 'Storming of the Bastille: 14 July 1798' },
        { label: 'The record:', variant: 'code', tone: 'good', value: 'Storming of the Bastille: 14 July 1789' },
        { label: 'Often blurred together:', variant: 'chips', tone: 'neutral', values: ['Berlin Wall falls (1989)', 'USSR dissolves (1991)'] },
      ],
      note: 'The month and day are right, so the answer feels right. The year is where it slips.',
      why: 'Numbers are tokens, not facts. A model can produce a date that looks right without recalling it, and it often blends events that happened near each other in the same story.',
      spot: 'Any date you plan to publish, cite, or rely on gets checked against an authoritative timeline, especially the year.',
    },
    {
      type: 'concept',
      emoji: '❓',
      eyebrow: 'Red Flag 4 of 4',
      name: 'The Missing Source',
      description: 'A confident claim with nothing you could actually look up: no speech, no book, no page, no date.',
      compare: {
        left: {
          label: '❌ Uncheckable:',
          tone: 'danger',
          items: ['"As Churchill once said..."', '"A famous philosopher put it this way..."', '"Historians agree that..."'],
        },
        right: {
          label: '✓ Checkable:',
          tone: 'good',
          items: ['Speech, place, and date', 'Book title and chapter or page', 'Archive, collection, or document reference'],
        },
      },
      why: "A real quote or event has a first appearance somewhere. If neither you nor the AI can say where, it is probably folklore. In the 2026 Chinese-ship case, the report fell apart once officials asked what it was actually based on.",
      spot: "Ask the AI: 'What is the earliest source for this?' Then verify the source itself, because AI can invent citations too.",
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each claim, identify which red flag is the biggest warning sign:',
      options: [
        { id: 'flag-1', emoji: '🧲', label: 'The Quote Magnet' },
        { id: 'flag-2', emoji: '📖', label: 'The Too-Tidy Narrative' },
        { id: 'flag-3', emoji: '📅', label: 'The Anniversary Blur' },
        { id: 'flag-4', emoji: '❓', label: 'The Missing Source' },
      ],
      items: [
        { prompt: "'Well-behaved women seldom make history' (credited to Marilyn Monroe)", correct: 'flag-1', explanation: 'A pithy line pinned on a famous name. Classic quote magnet.' },
        { prompt: 'The French Revolution began with the storming of the Bastille on 14 July 1798', correct: 'flag-3', explanation: 'Right day and month, wrong year (it was 1789).' },
        { prompt: 'The Great Depression happened solely because of the 1929 stock market crash', correct: 'flag-2', explanation: 'One tidy cause for a tangled event. The 1929 crash was part of the story, not the whole story.' },
        { prompt: "'As Churchill once said, ...' with no speech, date, or book given", correct: 'flag-4', explanation: 'No way to look it up, so no way to confirm it.' },
        { prompt: "'Ask not what your country can do for you...' (JFK, inaugural address, 20 January 1961)", correct: 'trick-question', explanation: "Trick question! This one is real and well sourced: speech, date, and occasion are all given and checkable.", extra: { id: 'trick-question', label: "✓ It's actually real" } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'The Primary Source Pass',
      tagline: 'A few minutes of checking before you repeat a date, event, or quote.',
      steps: [
        { number: 1, action: 'Pin down the exact claim', detail: 'Who said or did what, and when? Write the quote word for word and the date as stated.', time: '10 seconds' },
        { number: 2, action: 'Search the quote on a quote-checking site', detail: "Try Quote Investigator, or the 'Misattributed' section of the person's Wikiquote page. These sites trace quotes to their earliest known appearance.", time: '30 seconds' },
        { number: 3, action: 'Find the earliest print source', detail: 'A real quote can be pointed to: a speech, book, letter, or newspaper. Try Google Books and the Internet Archive with the exact phrase.', time: '1 minute' },
        { number: 4, action: 'Cross-check with two independent references', detail: "Compare two separate reference works (encyclopedia, archive, museum site) and check dates against an authoritative timeline. If they disagree, say 'reportedly' or find a third.", time: '1 minute' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'The quote traces to a named speech, book, or letter',
            'Two independent references agree on the date',
            'A dedicated quote-checking site confirms the attribution',
            'Details are specific: place, occasion, date',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            "A 'Misattributed' or 'Disputed' entry for that quote",
            'The earliest source appears long after the person died',
            'Only quote-collection websites repeat it, with no source',
            'References disagree on the year',
          ],
        },
      },
      footer: 'Two minutes of checking beats a correction after publication. A wrong quote is trivial to look up and embarrassing to retract.',
    },
  ],
};

// ============================================
// PRACTICE (6 min): Practice drill -> Toolkit -> Completion
// ============================================
const practice = {
  title: 'Your Turn',
  estimatedTime: 6,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Practice Drill: 5 trickier historical claims.',
        instruction: 'These are subtler than the first round. Decide: use as written, or check first?',
        note: 'Apply the red flags from the last phase. Look for pithy lines, tidy stories, and neat details.',
        legend: {
          trust: { label: 'TRUST', detail: 'Safe to use as written', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Check a source first', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'drill-1',
          prompt: "Winston Churchill said, 'Success is not final, failure is not fatal: it is the courage to continue that counts.'",
          context: "You asked: 'Give me a Churchill quote for a graduation card.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Misattributed',
          explanation: 'MISATTRIBUTED. This line is widely credited to Churchill, but the International Churchill Society and Quote Investigator report no evidence he said it. If you want a Churchill quote, find one with a speech and a date.',
          redFlag: 'Famous name + inspirational line + no source',
        },
        {
          id: 'drill-2',
          prompt: 'The Japanese attack on Pearl Harbor took place on 7 December 1941, and the United States declared war on Japan the next day.',
          context: "You asked: 'What happened at Pearl Harbor and what came next?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Accurate',
          explanation: "ACCURATE. The attack was on 7 December 1941, and Congress declared war on Japan on 8 December. The sequence is specific and documented in Congress's own records.",
          meta: 'Specific dates, consistent across references',
        },
        {
          id: 'drill-3',
          prompt: "Mahatma Gandhi said, 'Be the change you wish to see in the world.'",
          context: "You asked: 'What's Gandhi's most famous quote about personal change?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Not found in his writings',
          explanation: "NOT FOUND IN HIS WRITINGS. Quote researchers have not located these exact words in Gandhi's works. A related but different passage exists, which is how attributions like this tend to arise.",
          redFlag: 'Pithy summary of a famous person, with no primary source',
        },
        {
          id: 'drill-4',
          prompt: 'The Great Fire of London in 1666 burned out the plague-ridden slums and ended the Great Plague.',
          context: "You asked: 'How did the Great Plague of London end?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Too tidy',
          explanation: "TOO TIDY. This is a popular story, but historians generally note the plague was already declining before the fire, and the fire largely missed the poorer outer districts where plague was worst. The 'fire cleansed the city' explanation is too neat.",
          redFlag: 'A satisfying cause-and-effect story',
        },
        {
          id: 'drill-5',
          prompt: "The Wright brothers' first powered flights took place on 17 December 1903 near Kitty Hawk, North Carolina, with Orville piloting the first flight.",
          context: "You asked: 'When and where did the Wright brothers first fly?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Accurate',
          explanation: 'ACCURATE. The date, the place, and the fact that Orville flew first are all well documented, including in Library of Congress records. Four flights were made that day.',
          meta: 'Primary records at the Library of Congress',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You're reading the red flags, not just the confidence. That's the skill." },
          { min: 4, message: '4 out of 5! Very strong. Review the one you missed and see which red flag it carried.' },
          { min: 3, message: "3 out of 5. You're getting there. The trick is noticing when a line is a little too quotable or a story a little too neat." },
          { min: 0, message: "Tricky round. Re-read the red flags, then try the Primary Source Pass on the ones you missed." },
        ],
      },
      summary: {
        insight: "In this drill, wrong claims came as a quote magnet (twice) and a tidy story. The accurate ones had specific dates, places, and sequences that you could check. The more specific and checkable a claim is, the less it needs your suspicion.",
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick lookups to check a quote, date, or event before you repeat it. Outputs shown are illustrative.',
      commands: [
        {
          title: 'Search Quote Investigator',
          ecosystem: 'web',
          command: 'site:quoteinvestigator.com "insanity" "same thing over and over"',
          output: `[Illustrative result]
Quote Investigator: article tracing the "same thing over and over" line
Summary: no evidence found that Einstein said it; earliest known uses
appear decades after his death.`,
          whatToLookFor: "An article that traces the earliest known uses, and a clear statement about whether the attribution holds up.",
        },
        {
          title: 'Check the Misattributed section on Wikiquote',
          ecosystem: 'doc',
          command: 'Open: en.wikiquote.org/wiki/Albert_Einstein  ->  section "Misattributed"',
          output: `[Illustrative]
Misattributed
  - Quote text...
    Sourced: attributed with no evidence; see discussion.`,
          whatToLookFor: "Is the quote under 'Sourced' (with a citation) or 'Misattributed' / 'Disputed'? Follow the citations to the actual work.",
        },
        {
          title: 'Find the earliest appearance with an exact-phrase search',
          ecosystem: 'web',
          command: 'archive.org -> full-text search -> "exact quote in quotation marks"',
          output: `[Illustrative]
Results sorted by date.
Earliest hit: [book or periodical, year]
Hits before the person's death: 0`,
          whatToLookFor: "The earliest date. If it comes after the person died, or is not in their own work, be skeptical. Google Books' custom date range does the same job.",
        },
        {
          title: 'Check a date or event in an official archive',
          ecosystem: 'doc',
          command: 'loc.gov -> search "Wright brothers first flight 1903"',
          output: `[Illustrative]
Primary-source collection: Wilbur and Orville Wright Papers
Items: photographs, diaries, telegrams dated December 1903`,
          whatToLookFor: 'Primary records (photos, letters, official documents) that carry the date themselves. National Archives (catalog.archives.gov) works the same way.',
        },
      ],
      quickReference: {
        title: 'The Primary Source Pass',
        steps: [
          'Pin down the exact quote or date as stated',
          "Search it on Quote Investigator or the Wikiquote 'Misattributed' section",
          'Find the earliest print source (Google Books, Internet Archive)',
          'Cross-check two independent references and an authoritative timeline',
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Historical Confabulation',
      summary: "You can now spot when AI gets history confidently wrong. You know the four red flags, you've practiced on tricky claims, and you have a quick way to trace a quote or date to a real source.",
      // NOTE: no `checklist` here on purpose - keyTakeaways + checklist below are
      // rendered by LessonShell's final "Pattern Learned!" screen.
      next: { label: 'Up Next', body: "Pattern 8 is about reasoning and math: answers that sound valid but don't hold up. What happens when the math doesn't math?" },
    },
  ],

  keyTakeaways: [
    'AI can state wrong dates, quotes, and attributions in the same confident voice as right ones',
    "Red flags: a famous name with a pithy line, a too-tidy story, dates off by a digit or year, and no checkable source",
    'Famous quotes are the highest-risk category, because they drift toward famous names over time',
    'The Primary Source Pass: trace the claim, find the earliest source, cross-check two references',
    'If you cannot name the source, hedge with "attributed to" or leave the quote out',
  ],
  checklist: {
    title: 'Your Historical Confabulation Checklist',
    items: [
      'Is this a pithy line attached to a famous name?',
      'Does the story have one clean cause that explains everything?',
      'Have I checked the year, not just the month and day?',
      'Can I name the speech, book, or document it came from?',
      'Do two independent references agree?',
      "Did I search 'misattributed' or an archive for the exact phrase?",
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-07',
  patternNumber: 7,
  title: 'Historical Confabulation',
  subtitle: 'Wrong dates, events, attributions',
  description: 'Learn to spot when AI states plausible-but-wrong dates, misattributed quotes, and blended or invented events with complete confidence.',
  estimatedTime: 15,

  skillLearned: 'Verifying historical claims, dates, and quote attributions',
  verificationMethod: 'The Primary Source Pass',

  caseStudy: {
    name: 'AI-generated false intelligence report nearly leads US forces to board a Chinese ship',
    date: 'Spring 2026 (reported 18 September 2026)',
    researcher: 'Reported by CNN (Katie Bo Lillis and Zachary Cohen)',
    source: 'https://www.cnn.com/2026/09/18/politics/us-military-ai-false-intelligence-china-ship',
  },

  nextLesson: {
    id: 'pattern-08',
    title: 'Logic Phantom',
    teaser: "Reasoning that sounds valid but isn't.",
  },

  phases: { see, test, observe, practice },
};

export default lesson;
