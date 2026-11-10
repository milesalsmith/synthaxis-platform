// src/data/patterns/pattern-07-historical-confabulation.js
// Pattern 07: Historical Confabulation
//
// CASE STUDY: AI-generated false intelligence report on a Chinese ship
// (incident spring 2026; reported by CNN, 18 September 2026)
// TARGET: about 10 minutes total
//
// Authored in the block-based schema (see docs/pattern-authoring-guide.md).
// Content-only: no component changes needed.

// ============================================
// SEE: Hook -> Chat -> Gut check -> Reveal -> Impact
// ============================================
const see = {
  title: 'Cargo That Was Never There',
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
      subtext: "There's no wrong answer here. Go with your first reaction.",
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
      title: 'Impact',
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
      transition: "So how would you have caught it before the boarding party went in? Let's test the report.",
    },
  ],
};

// ============================================
// TEST: Spot what to test in the report -> Investigate it
// ============================================
const test = {
  title: 'Testing the Report',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'Before anyone acts on it, look at what the report actually says.',
      instruction: 'Tap the parts of this report you would want to test. Some parts are fine. Some are exactly where the problem hides.',
      source: 'From the AI-formatted report (reconstruction)',
      segments: [
        { text: 'ASSESSMENT:', note: 'A standard section heading. It tells you the format, not whether anyone checked the content. The format is a surface signal.' },
        { text: ' ' },
        { text: 'The vessel', note: 'The ship was real and was being tracked. This part checks out, and real details like this make the rest feel solid.' },
        { text: ' ' },
        { text: 'is assessed to be transporting', flag: { label: 'Assessed by whom?', explanation: 'The passive voice hides who did the assessing. Here it was a chatbot, not an analyst weighing evidence. Ask who made this judgment and how.' } },
        { text: ' ' },
        { text: 'components associated with a nuclear weapons program.', flag: { label: 'Cargo claim', explanation: 'This is the claim that matters, and nothing in the report shows where it came from. A manifest lists goods. Deciding those goods are nuclear-weapons parts is an inference, and here it was wrong.' } },
        { text: '\n\n' },
        { text: 'BASIS:', note: 'Another standard heading. Having a BASIS section is not the same as having a basis.' },
        { text: ' ' },
        { text: 'Open-source shipping data,', note: 'A real kind of source: ship tracking and shipping records are routinely used. The question is what they actually show, not that they were consulted.' },
        { text: ' ' },
        { text: "combined with signals intelligence on the vessel's manifest.", flag: { label: 'A blend, not a source', explanation: 'This names two categories of data, not a specific document, intercept or line. Fusing them is where the chatbot went wrong, and the blend makes it impossible to see which input, if any, supports the cargo claim.' } },
        { text: '\n\n' },
        { text: 'RECOMMENDATION:', note: 'Standard format again. It looks like the end of a finished analysis.' },
        { text: ' ' },
        { text: 'Prioritize the vessel for interception.', note: 'This follows logically from the assessment. That is the danger: if the assessment is wrong, the recommendation is wrong too, however reasonable it sounds.' },
      ],
      summary: 'Three things to test: who made the judgment, what raw source supports the cargo claim, and which parts were observed versus inferred. Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'The report is on your desk and an operation depends on it. You can go back to the underlying intelligence and talk to the people who produced it. Which tests actually tell you whether the cargo claim is true?',
      claim: {
        label: 'Report',
        text: "ASSESSMENT: The vessel is assessed to be transporting components associated with a nuclear weapons program.\n\nBASIS: Open-source shipping data, combined with signals intelligence on the vessel's manifest.\n\nRECOMMENDATION: Prioritize the vessel for interception.",
      },
      rounds: [
        {
          title: 'Test 1: Where did it come from?',
          question: 'What do you check first?',
          options: [
            {
              id: 'format',
              label: "Check that it's in the standard format and came through command channels",
              useful: false,
              feedback: 'It was, and that is how it got as far as it did. A second pass through AI produced the official format. The format tells you how the report was packaged, not whether the claim is true.',
            },
            {
              id: 'provenance',
              label: 'Ask how the report was produced: who wrote it, and with what tools',
              useful: true,
              resultLabel: 'What officials found, per CNN',
              result: 'An analyst used an AI chatbot to analyze intelligence on the ship\'s manifest.\nThe chatbot misidentified the cargo.\nThe analyst used AI again to format the findings as a standard report.',
              feedback: 'This is the question officials asked just before the operation, and it unravelled the report. Once you know a chatbot made the key judgment, the claim needs checking from scratch.',
              kit: 'Ask how the claim was produced: who made the judgment, and with what tools',
            },
            {
              id: 'thorough',
              label: 'It combines classified and open-source data, so it must be thorough',
              useful: false,
              feedback: 'More inputs do not make a conclusion more reliable. Fusing the two was where the chatbot went wrong. A blend of sources can hide the fact that none of them supports the claim.',
            },
          ],
        },
        {
          title: 'Test 2: What does the raw source say?',
          question: 'You know AI was involved. How do you check the cargo claim itself?',
          options: [
            {
              id: 'resummarise',
              label: 'Ask the same tool to re-summarise the intelligence and confirm its assessment',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'Based on the available reporting, the vessel is assessed to be carrying components associated with a nuclear weapons program...',
              feedback: 'The tool that made the mistake will usually repeat it in fresh words. Asking the source to check itself is not a test.',
            },
            {
              id: 'trace',
              label: 'Trace the cargo claim to the raw material: which manifest entry or intercept says it?',
              useful: true,
              resultLabel: 'Illustrative',
              result: 'Manifest entries: goods listed by type and quantity\nIntercepts: references to the shipment\nAny line that says "nuclear weapons components": none found',
              feedback: 'If no underlying document says it, the claim came from the analysis, not the evidence. CNN could not learn what the real cargo was, so this result is an example, but the method is the point: find the exact line, or admit there isn\'t one.',
              kit: 'Trace each claim to the specific raw source that says it',
            },
            {
              id: 'split',
              label: 'Split the report into what was observed and what was inferred',
              useful: true,
              resultLabel: 'Illustrative',
              result: 'Observed: a real vessel, real manifest reporting, real shipping data\nInferred: what the cargo is for\nInferred by: an AI chatbot',
              feedback: 'Everything observed checks out. The one part that would justify boarding a ship is the inference, and a chatbot made it. That is where the testing effort belongs.',
              kit: 'Separate what was observed from what was inferred, and note who did the inferring',
            },
          ],
        },
        {
          title: 'Test 3: Can anyone else confirm it?',
          question: 'Before an armed boarding, what would actually settle the question?',
          options: [
            {
              id: 'repeated',
              label: 'Note that several briefings and units are already citing the assessment',
              useful: false,
              feedback: 'They are all citing the same report. Repetition across a chain of command is one source echoed, not several sources agreeing.',
            },
            {
              id: 'independent',
              label: 'Get independent corroboration: a second source or method that did not rely on this report',
              useful: true,
              resultLabel: 'Illustrative',
              result: 'An analyst working from the raw intelligence, without AI, does not reach the same conclusion.\nNo other source points to nuclear-weapons cargo.',
              feedback: 'A claim this serious should be confirmed by something that did not come from the same chain. If it can\'t be, it is not ready to act on.',
              kit: 'Get independent corroboration from a second source or method',
            },
            {
              id: 'reword',
              label: 'Ask the AI to rewrite the report more cautiously, with hedged language',
              useful: false,
              feedback: 'Softer wording changes how the claim sounds, not whether it is true. The evidence is exactly what it was before.',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what is the cargo claim?',
        options: [
          { id: 'confirmed', label: 'Confirmed intelligence that just needed a closer read', correct: false, feedback: 'Nothing confirmed it. One source told CNN the report was "entirely false".' },
          { id: 'inference', label: 'An AI inference, presented as an assessment, with no source behind it', correct: true, feedback: 'Right. The ship and the manifest reporting were real. The cargo conclusion was something a chatbot produced, and a second AI pass dressed it up as finished intelligence.' },
          { id: 'formatting', label: 'A sound assessment let down by poor formatting', correct: false, feedback: 'The formatting was the polished part. The problem was the claim inside it.' },
        ],
      },
      kit: {
        title: 'Your Historical Confabulation Test Kit',
        footer: 'The report looked the same whether the claim was true or not. Only tracing it back could tell the difference, and officials did it just in time.',
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
      heading: 'Historical confabulation follows predictable patterns.',
      subtext: 'Wrong history rarely looks wrong. It tends to show up in four recognizable shapes.',
      cards: [
        { emoji: '🧲', label: 'Quote Magnet' },
        { emoji: '📖', label: 'Too-Tidy Narrative' },
        { emoji: '📅', label: 'Anniversary Blur' },
        { emoji: '❓', label: 'Missing Source' },
      ],
    },
    {
      type: 'concept',
      emoji: '🧲',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Quote Magnet',
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
      name: 'Too-Tidy Narrative',
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
      name: 'Anniversary Blur',
      description: 'Dates off by a year or a digit, or two similar events blended into one.',
      rows: [
        { label: 'AI says:', variant: 'code', tone: 'danger', value: 'Storming of the Bastille: 14 July 1798' },
        { label: 'Historical record:', variant: 'code', tone: 'good', value: 'Storming of the Bastille: 14 July 1789' },
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
      name: 'Missing Source',
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
        { id: 'flag-1', emoji: '🧲', label: 'Quote Magnet' },
        { id: 'flag-2', emoji: '📖', label: 'Too-Tidy Narrative' },
        { id: 'flag-3', emoji: '📅', label: 'Anniversary Blur' },
        { id: 'flag-4', emoji: '❓', label: 'Missing Source' },
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
      name: 'Primary Source Pass',
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
// PRACTICE: Practice set -> Toolkit -> Completion
// Checked in November 2026: Quote Investigator (2013/09/03/success-final and
// 2017/10/23/be-change); Wikiquote pages for Winston Churchill (Harrow
// School speech, 29 October 1941; 'Success is not final' under
// Misattributed) and Mahatma Gandhi (Indian Opinion, 9 August 1913; CWMG
// vol. 12, p. 158); Wikipedia articles on the Great Plague of London, the
// Wright Flyer, the Berlin Wall and its fall, the Cuban Missile Crisis,
// Apollo 11, the Chernobyl disaster, the dissolution of the Soviet Union,
// and the US declarations of war on Japan and Germany (1941).
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Six Claims About the Past',
        instruction: 'Spot a misattributed quote, check a timeline, read what quote researchers found, fix a sequence, and pick the right check.',
        note: 'Some of these are accurate. Specific details are a good sign once you have checked them.',
      },
      items: [
        {
          id: 'p7-spot-churchill',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Give me a Churchill quote for a graduation card, and say where he said it.'",
          prompt: 'Tap the part that is invented, or tell us nothing is.',
          artifact: { label: 'AI answer (illustrative)' },
          segments: [
            { text: 'Here is a good one:' },
            { text: '\n\n' },
            { text: '"Success is not final, failure is not fatal:', flag: true },
            { text: ' it is the courage to continue that counts."', flag: true },
            { text: '\n\n' },
            { text: 'Churchill said it', flag: true },
            { text: ' in his speech at Harrow School', flag: true },
            { text: ' on 29 October 1941,' },
            { text: ' the same speech in which he told the boys to "never give in".' },
          ],
          explanation: "The speech is real: Churchill spoke at Harrow School on 29 October 1941 and said 'never give in'. The quote is not his. Quote Investigator found no substantive evidence that Churchill said it. The earliest close match is a 1938 Budweiser beer advert, and the link to Churchill appeared in the 1960s. A real speech next to a borrowed line is what makes this convincing.",
          takeaway: 'A real speech and date can be attached to a line he never said',
        },
        {
          id: 'p7-diagnose-timeline',
          kind: 'pickAll',
          label: 'Diagnose',
          context: 'An AI wrote a timeline for your history handout. Every line looks familiar.',
          prompt: 'Which lines need correcting?',
          artifact: {
            label: 'AI answer (illustrative)',
            text: 'Berlin Wall built: 13 August 1961\nCuban Missile Crisis: October 1962\nApollo 11 Moon landing: 20 July 1969\nChernobyl disaster: 26 April 1968\nBerlin Wall falls: 9 November 1989\nSoviet Union dissolved: 26 December 1989',
          },
          options: [
            { id: 'built', label: 'Berlin Wall built: 13 August 1961', feedback: 'Correct as written. Construction began on 13 August 1961.' },
            { id: 'cuba', label: 'Cuban Missile Crisis: October 1962', feedback: 'Correct as written. The crisis ran from 16 to 28 October 1962.' },
            { id: 'apollo', label: 'Apollo 11 Moon landing: 20 July 1969', feedback: 'Correct as written.' },
            { id: 'chernobyl', label: 'Chernobyl disaster: 26 April 1968', correct: true, feedback: 'Wrong year. It was 26 April 1986. Two swapped digits keep the date looking familiar.' },
            { id: 'falls', label: 'Berlin Wall falls: 9 November 1989', feedback: 'Correct as written.' },
            { id: 'ussr', label: 'Soviet Union dissolved: 26 December 1989', correct: true, feedback: 'Wrong year. The Soviet Union was dissolved on 26 December 1991. The year was blended with the fall of the Wall, two years earlier.' },
          ],
          explanation: 'Both errors keep the right day and month and slip on the year. That is the Anniversary Blur. Checking each year against an encyclopedia or a timeline takes a couple of minutes.',
          takeaway: 'The right day and month do not mean the right year',
        },
        {
          id: 'p7-evidence-gandhi',
          kind: 'choose',
          label: 'Read the evidence',
          context: "An AI gave you 'Be the change you wish to see in the world' as a Gandhi quote. You looked it up. This is what you found.",
          prompt: 'What should you do with the quote?',
          artifact: {
            label: 'Wikiquote and Quote Investigator (checked 10 Nov 2026)',
            text: 'What Gandhi wrote (Indian Opinion, 9 August 1913; Collected Works, vol. 12, p. 158):\n"We but mirror the world. All the tendencies present in the outer world are to be found in the world of our body. If we could change ourselves, the tendencies in the world would also change."\n\n"Be the change you wish to see in the world":\nNot found as a direct quotation in his Collected Works. Earliest close match known to Quote Investigator: Arleen Lorrance, 1974.',
          },
          options: [
            { id: 'use', label: 'Use it. The 1913 passage shows Gandhi said it.', feedback: 'The passage shares the idea, not the words. Putting quote marks around words he did not write is still a misquote.' },
            { id: 'real', label: 'Quote the 1913 passage, or call the famous line a saying often attributed to him.', correct: true, feedback: 'Right. You keep the idea and stay accurate.' },
            { id: 'wiki', label: 'Ignore it. Anyone can edit Wikiquote.', feedback: 'True, so follow its citations. Here they lead to the Collected Works and to Quote Investigator, which you can check yourself.' },
            { id: 'ask', label: 'Ask the AI for the page number in his Collected Works.', feedback: 'It can invent a page number as easily as a quote. You already have the real source in front of you.' },
          ],
          explanation: 'This is how many misattributions start. A real person writes a longer, related idea, and a shorter, catchier version later gets pinned to their name. You do not have to drop the idea. Quote what he actually wrote.',
          takeaway: 'A related idea is not the same words: quote what was written',
        },
        {
          id: 'p7-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'Tell me about the Wright brothers' first flights.'",
          prompt: 'Tap the part that is wrong, or tell us nothing is.',
          artifact: { label: 'AI answer' },
          segments: [
            { text: 'On 17 December 1903,' },
            { text: ' near Kitty Hawk, North Carolina,' },
            { text: ' Orville Wright made the first flight.' },
            { text: ' It lasted 12 seconds' },
            { text: ' and covered 120 feet.' },
            { text: ' The brothers made four flights that day.' },
            { text: ' The longest, by Wilbur,' },
            { text: ' covered 852 feet in 59 seconds.' },
          ],
          explanation: "Nothing is wrong. The date, Orville flying first, 12 seconds and 120 feet, four flights, and Wilbur's 852 feet in 59 seconds all match the standard record. The site, now in Kill Devil Hills, is about 4 miles south of Kitty Hawk, so 'near Kitty Hawk' is fair. Specific details that check out are a reason to trust the answer.",
          takeaway: 'Specific details that check out deserve your trust',
        },
        {
          id: 'p7-fix-sequence',
          kind: 'choose',
          label: 'Fix it',
          context: "You asked: 'What happened after Pearl Harbor?' The AI wrote: 'After the attack on 7 December 1941, the US declared war on Japan and Germany the next day.'",
          prompt: 'Which version is correct?',
          options: [
            { id: 'asis', label: 'The US declared war on Japan and Germany on 8 December 1941.', feedback: 'Only Japan on 8 December. War with Germany came three days later.' },
            { id: 'germany-first', label: 'The US declared war on Germany first, then on Japan on 11 December.', feedback: 'Backwards. Japan came first, on 8 December.' },
            { id: 'right', label: 'The US declared war on Japan on 8 December. Germany declared war on the US on 11 December, and the US declared war on Germany the same day.', correct: true, feedback: 'Right. Congress voted to declare war on Germany hours after Germany declared war on the US.' },
            { id: 'same-day', label: 'Congress declared war on Japan on 7 December, the day of the attack.', feedback: "The attack was on 7 December. Congress voted the next day, after Roosevelt's speech." },
          ],
          explanation: 'The AI squeezed two events into one tidy sentence. Real sequences have gaps, and here the gap matters: Germany declared war on the US first, not the other way round. Check the sequence against a dated record, not only the headline date.',
          takeaway: 'Check the sequence, not just the headline date',
        },
        {
          id: 'p7-pick-test',
          kind: 'choose',
          label: 'Pick the test',
          context: "You asked: 'How did the Great Plague of London end?' The AI replied: 'The Great Fire of 1666 burned out the plague-ridden slums and ended the epidemic.'",
          prompt: 'What settles it fastest?',
          options: [
            { id: 'ask', label: 'Ask the AI for its source', feedback: 'It may name a real book that says something different, or invent one. You would still have to check it.' },
            { id: 'popular', label: 'It is a well-known story, so it is probably right', feedback: 'Widely repeated is not the same as true. Neat stories spread because they are neat.' },
            { id: 'check', label: 'Check two things in a reliable reference: when plague deaths fell, and which areas the fire burned', correct: true, feedback: 'Right. If deaths were falling before the fire, or the worst-hit areas did not burn, the story fails.' },
            { id: 'specific', label: 'It gives a year and a cause, so it is specific enough to trust', feedback: 'A date makes a claim checkable, not true. You still have to check it.' },
          ],
          explanation: 'Deaths were already falling by late 1665, and the King returned to London in February 1666. The fire, in September 1666, destroyed the City of London, but most of the later plague cases were in the suburbs. Some people believed the fire ended the epidemic. The timing and the map say otherwise.',
          takeaway: 'Test a tidy cause against the timing and the map',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: "Six out of six. You're reading the evidence, not the confidence. That's the skill." },
          { min: 4, message: 'Solid. Look again at the ones you missed and which red flag they carried.' },
          { min: 0, message: 'Tricky round. Re-read the red flags, then try the Primary Source Pass on the ones you missed.' },
        ],
      },
      summary: {
        insight: 'One answer was entirely accurate. The wrong ones leaned on real details: a real speech, a related passage, the right days and months. Checking a source told them apart. How confident the answer sounded did not.',
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
        title: 'Primary Source Pass',
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
  estimatedTime: 10,

  skillLearned: 'Verifying historical claims, dates, and quote attributions',
  verificationMethod: 'Primary Source Pass',

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
