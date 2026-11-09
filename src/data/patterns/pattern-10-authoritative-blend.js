// src/data/patterns/pattern-10-authoritative-blend.js
// Pattern 10: The Authoritative Blend (capstone)
//
// CASE STUDY: The AI-generated "summer reading list" syndicated to newspapers (May 2025)
// TARGET: ~18 minutes total
//
// Authored in the block-based schema: each STOP phase is
// { title, estimatedTime, steps: [block, ...] } and every block is one screen.
// See docs/pattern-authoring-guide.md for the block vocabulary.
//
// NOTE: This is the last pattern in the course, so there is intentionally no
// `nextLesson` in the metadata and the completion block wraps up all 10 patterns.

// ============================================
// SEE (3 min): Story -> Spot-check -> Reveal -> Impact
// ============================================
const see = {
  title: 'The Reading List With Real Authors',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'The most dangerous pattern of all.',
      body: `Every pattern so far had a tell: a package that doesn't exist, a number with no source, a quote nobody can find.

This one is different. Here, the AI mixes real facts with invented ones in the same answer. The real parts do the persuading. The fake parts ride along.

In May 2025, a "summer reading list" appeared in newspapers. Here is a simplified, illustrative version of the kind of answer behind it:`,
    },
    {
      type: 'chat',
      user: 'Give me a summer reading list from well-known authors.',
      ai: {
        text: `Here are four great picks for your summer:

**1. The House of the Spirits** by Isabel Allende
A sweeping multigenerational family saga.

**2. Tidewater Dreams** by Isabel Allende
A lyrical coming-of-age story set along a changing coastline.

**3. Project Hail Mary** by Andy Weir
A lone astronaut wakes up with no memory and a world to save.

**4. The Last Algorithm** by Andy Weir
A thriller about an AI that begins making its own decisions.`,
        note: 'Illustrative reconstruction. Every entry has the same format, the same confident tone, and a famous name attached.',
      },
    },
    {
      type: 'choice',
      question: 'You spot-check one entry: Isabel Allende is a real, famous author. Do you trust the whole list?',
      subtext: "There's no wrong answer here. We're testing your instincts.",
      options: [
        { id: 'trust-list', label: 'Yes. The author is real, so the list is probably fine', response: 'That is exactly the trap. A real name checks out, and the check feels like proof for the whole list.' },
        { id: 'check-some', label: "I'd check a couple of the titles", response: 'Better. But which two? If you happen to pick the real ones, the check still passes.' },
        { id: 'check-all', label: 'I would check every title independently', response: 'That is the habit this lesson builds. Hold on to it.' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'Two of those four books do not exist.',
      explanation: `"Tidewater Dreams" and "The Last Algorithm" are the kind of titles reported in the real incident. The authors are real. The other books are real. The fake ones sit right beside them.

That's the Authoritative Blend: invented claims borrowing the credibility of true ones.`,
      list: {
        title: "Here's what was reported in May 2025:",
        items: [
          'A summer reading supplement distributed by King Features (Hearst) ran in the Chicago Sun-Times and, reportedly, other newspapers',
          'Of the 15 books recommended, 10 were reported not to exist, while 5 were real',
          'The fake books were attributed to real authors, including Isabel Allende ("Tidewater Dreams") and Andy Weir ("The Last Algorithm")',
          'The freelance writer, Marco Buscaglia, reportedly admitted using AI to help produce the list and not fact-checking it',
        ],
      },
    },
    {
      type: 'stats',
      title: 'The Impact',
      items: [
        { value: '10 of 15', label: 'Books reported not to exist', detail: 'in a printed newspaper supplement' },
        { value: '5 of 15', label: 'Books that were real', detail: 'which made the list feel credible' },
        { value: 'Real authors', label: 'Names attached to fake titles', detail: 'e.g. Allende and Weir' },
      ],
      source: 'Reporting by the Chicago Sun-Times / NPR / AP, May 2025',
    },
    {
      type: 'points',
      heading: 'Why is this the hardest pattern to catch?',
      items: [
        { label: 'The easy checks pass:', body: 'The author is real. The publisher style looks right. A quick search of the name confirms it.', tone: 'neutral' },
        { label: 'The real parts launder the fake parts:', body: 'You build trust from what you verified, then spend it on what you did not.', tone: 'danger' },
        { label: 'You have seen this before:', body: 'In Mata v. Avianca (Pattern 4), the fake legal cases came wrapped in real courts and plausible citation formats. The wrapper was real. The contents were not.', tone: 'danger' },
      ],
      conclusion: 'A mostly-true answer is not a mostly-safe answer. One invented claim in a real-looking list is still an invented claim.',
      transition: "Let's see how your instincts hold up against blended answers.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 blended AI outputs - Use it or Check first?
// ============================================
const test = {
  title: 'Use It or Check First?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 AI answers. Each mixes several claims.',
        instruction: 'For each one, decide: would you use it as written, or check it first?',
        note: "Don't search anything yet. Go with your gut.",
        legend: {
          trust: { label: 'TRUST', detail: 'Every claim holds up', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'At least one claim needs checking', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          prompt: 'The Treaty of Versailles was signed in 1919 at the Palace of Versailles, ended the state of war between Germany and the Allies, and created the League of Nations, headquartered in Zurich.',
          context: "You asked: 'Give me a quick summary of the Treaty of Versailles.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'One claim is wrong',
          explanation: 'The date, the place, and the end of the war are right. The League of Nations was headquartered in Geneva, not Zurich. Three true details made the fourth feel safe.',
          redFlag: 'A wrong detail tucked behind true ones',
        },
        {
          id: 'item-2',
          prompt: 'Mount Everest sits on the border of Nepal and China, and a joint Nepal-China survey announced in 2020 gave its height as 8,848.86 meters.',
          context: "You asked: 'How tall is Mount Everest, and who measured it?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'All claims real',
          explanation: 'Both claims are well documented. The border location is standard geography, and the 2020 joint survey figure of 8,848.86 m was widely reported by both countries.',
          meta: 'Source type: national survey announcements, widely reported',
        },
        {
          id: 'item-3',
          prompt: "Kahneman and Tversky published 'Prospect Theory' in Econometrica in 1979. Kahneman later wrote 'Thinking, Fast and Slow' (2011), and Tversky extended the work in his 2003 paper 'Loss Aversion in the Wild'.",
          context: "You asked: 'What are the key sources on loss aversion?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'One source is impossible',
          explanation: "The first two sources are real. Amos Tversky died in 1996, so he cannot have published a 2003 paper. The third title was invented to complete a tidy set of citations.",
          redFlag: 'A real author name attached to a fake source',
        },
        {
          id: 'item-4',
          code: true,
          prompt: "git switch -c feature/login\ngit add .\ngit commit -m 'Add login form'\ngit push -u origin feature/login",
          context: "You asked: 'Walk me through creating a branch and pushing it.'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'All real',
          explanation: "Every command is real and does what you'd expect: create and switch to a branch, stage, commit, and push while setting the upstream. Matching the official git docs is exactly what we want.",
          meta: 'Check: git-scm.com documentation for switch, commit, and push',
        },
        {
          id: 'item-5',
          code: true,
          prompt: "import pandas as pd\ndf = pd.read_csv('sales.csv')\ndf = df.smart_clean(drop_dupes=True)\nprint(df.head())",
          context: "You asked: 'Clean up my sales CSV and show the first rows.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'One call is invented',
          explanation: "read_csv and head() are real pandas. There is no DataFrame.smart_clean(). The real tool for removing duplicates is drop_duplicates(). The invented call sits between two real ones.",
          redFlag: 'A made-up method between real ones',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You caught all the blends. Now let's learn to catch them on purpose, not by luck." },
          { min: 4, message: "4 out of 5! Strong instincts. Blended answers are built to slip past exactly that last miss." },
          { min: 3, message: "3 out of 5. That's normal. When most of an answer is true, your brain relaxes. Let's fix that." },
          { min: 0, message: "This is tricky, and that's the point. Real facts make fake ones feel safe. The next section shows you how to separate them." },
        ],
      },
      summary: {
        insight: 'In this batch, 3 of 5 answers each hid exactly one wrong claim among true ones. Nothing about the formatting told you which one.',
      },
    },
  ],
};

// ============================================
// OBSERVE (5 min): 4 red flags + capstone matching + method
// ============================================
const observe = {
  title: 'The Red Flags',
  estimatedTime: 5,
  steps: [
    {
      type: 'cardGrid',
      heading: 'Blended answers hide in plain sight.',
      subtext: 'They are not one trick. They are the other nine patterns, disguised by true statements. Watch for these 4 red flags.',
      cards: [
        { emoji: '🪪', label: 'The Credibility Borrow' },
        { emoji: '🥪', label: 'The Sandwich' },
        { emoji: '🎨', label: 'Consistent Style, Inconsistent Substance' },
        { emoji: '☑️', label: 'The Partial Check Trap' },
      ],
    },
    {
      type: 'concept',
      emoji: '🪪',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Credibility Borrow',
      description: 'A real name, brand, or institution is attached to a claim it never made.',
      compare: {
        left: { label: '❌ Reported as not existing:', tone: 'danger', items: ['"Tidewater Dreams" by Isabel Allende', '"The Last Algorithm" by Andy Weir'] },
        right: { label: '✓ Real examples:', tone: 'good', items: ['"The House of the Spirits" by Isabel Allende', '"Project Hail Mary" by Andy Weir'] },
      },
      why: 'AI is good at what a real author or brand sounds like. A famous name makes a made-up title feel pre-approved.',
      spot: 'Verifying the name is not verifying the claim. Check the specific thing attached to the name.',
    },
    {
      type: 'concept',
      emoji: '🥪',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Sandwich',
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
      name: 'The Partial Check Trap',
      description: 'You verify one claim, it passes, and you trust the rest by association.',
      rows: [
        { label: 'You checked:', variant: 'quote', tone: 'good', value: '"Isabel Allende is a real author." Confirmed.' },
        { label: 'You skipped:', variant: 'quote', tone: 'danger', value: '"Tidewater Dreams" appears in her bibliography?' },
      ],
      note: 'One passing check feels like proof. It is only proof of that one claim.',
      why: 'Humans generalize from a sample. Blended answers are built so that any sample you pick is likely to pass.',
      spot: 'After every check, ask: what did this actually prove? Then check the next claim on its own.',
    },
    {
      type: 'matching',
      title: 'Capstone Check: Match the Pattern',
      instruction: 'Blended answers are made of the earlier patterns. Which pattern does each flag point to?',
      options: [
        { id: 'p4', emoji: '📚', label: 'Phantom Citation (4)' },
        { id: 'p5', emoji: '🔢', label: 'Statistics Invention (5)' },
        { id: 'p6', emoji: '🔌', label: 'API Mirage (6)' },
        { id: 'p7', emoji: '🕰️', label: 'Historical Confabulation (7)' },
        { id: 'p3', emoji: '📦', label: 'Version Hallucination (3)' },
      ],
      items: [
        { prompt: "A paper by 'Smith et al., 2021' with a DOI that leads nowhere", correct: 'p4', explanation: 'A source that does not exist is a Phantom Citation.' },
        { prompt: "'Reduces errors by 63%' with no source", correct: 'p5', explanation: 'A precise-looking number with nothing behind it is Statistics Invention.' },
        { prompt: 'df.smart_clean() on a real library', correct: 'p6', explanation: 'An invented method on a real library is an API Mirage.' },
        { prompt: 'A famous quote pinned on a person who never said it', correct: 'p7', explanation: 'Wrong attribution is Historical Confabulation.' },
        { prompt: 'Every claim checks out in the official source', correct: 'trick-question', explanation: "Trick question! Nothing is wrong here. The point of verifying is to find out, not to assume the answer is fake.", extra: { id: 'trick-question', label: '✓ Nothing is wrong' } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'The Claim-by-Claim Audit',
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
// PRACTICE (6 min): Drill -> Toolkit -> Completion
// ============================================
const practice = {
  title: 'Your Turn',
  estimatedTime: 6,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Practice Drill: Find the Blend',
        instruction: 'Each answer mixes 3 claims. Decide whether you can use it as written, or whether at least one claim needs to go.',
        note: 'Run the audit in your head: split, tag, verify. The explanation will name the exact claim.',
        legend: {
          trust: { label: 'TRUST', detail: 'All 3 claims hold up', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'At least 1 claim is fake', button: 'Remove a claim' },
        },
      },
      items: [
        {
          id: 'drill-1',
          prompt: "Marie Curie won Nobel Prizes in both Physics (1903) and Chemistry (1911). She also served as the first president of the University of Paris, a post she held until 1914. She is credited with coining the term 'radioactivity'.",
          context: "You asked: 'Give me three key facts about Marie Curie.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Middle claim is fake',
          explanation: "Claims 1 and 3 are true. Curie became the first woman professor at the Sorbonne (University of Paris) in 1906, but she was never its president. A Sandwich: the fake claim sits between two true ones.",
          redFlag: 'The Sandwich',
        },
        {
          id: 'drill-2',
          prompt: "HTTP 404 means 'Not Found'. HTTP 429 means 'Too Many Requests'. HTTP 418 is the standard status code for 'Server Overloaded' and should trigger retries.",
          context: "You asked: 'Explain a few HTTP status codes I should handle.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Last claim is fake',
          explanation: "404 and 429 are correct. 418 is 'I'm a teapot', a joke code from an April Fools' RFC, not 'Server Overloaded'. A retry rule built on it would never do what you intend (503 is the usual overload code).",
          redFlag: 'Real codes lending authority to a false meaning',
        },
        {
          id: 'drill-3',
          prompt: "The Transformer architecture was introduced in the 2017 paper 'Attention Is All You Need'. It was written by researchers at Google, including Ashish Vaswani and Noam Shazeer. It won the Best Paper Award at NeurIPS 2017.",
          context: "You asked: 'Where did the Transformer come from?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Last claim is fake',
          explanation: "The paper, the year, and those authors are all real. But it did not receive a NeurIPS 2017 Best Paper Award. This is the Credibility Borrow: a real paper makes a made-up honor feel plausible. Check the conference's awards page.",
          redFlag: 'The Credibility Borrow',
        },
        {
          id: 'drill-4',
          prompt: "The Great Barrier Reef lies off the coast of Queensland, Australia. It is the world's largest coral reef system. UNESCO inscribed it as a World Heritage Site in 1981.",
          context: "You asked: 'Tell me about the Great Barrier Reef.'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'All 3 real',
          explanation: 'All three are well documented and easy to confirm: the location, its status as the largest coral reef system, and the 1981 UNESCO inscription. A good audit sometimes ends with "no changes needed".',
          meta: 'Source type: UNESCO World Heritage listing',
        },
        {
          id: 'drill-5',
          code: true,
          prompt: "from pathlib import Path\nimport json\ntext = Path('notes.json').read_text()\ndata = json.loads(text)\nprint(json.dumps(data, indent=2))",
          context: "You asked: 'Read a JSON file and pretty-print it in Python.'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'All real',
          explanation: 'Path.read_text(), json.loads(), and json.dumps(..., indent=2) are all standard library features that do exactly what the snippet suggests. Suspicion is not the goal; checking is.',
          meta: 'Check: Python docs for pathlib and json',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: 'Flawless audit. You separated every real claim from every fake one.' },
          { min: 4, message: 'Very strong. Re-read the one you missed and ask which single claim you stopped checking, and why.' },
          { min: 3, message: "Solid, but blends are still working on you. Use the Claim-by-Claim Audit worksheet below on real answers." },
          { min: 0, message: "Don't worry. These are hard on purpose. Slow down, split each answer into claims, and test one at a time." },
        ],
      },
      summary: {
        insight: "In this drill, the fake claim was never the first or the most famous one. It was the one you were least likely to check.",
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
        title: 'The Claim-by-Claim Audit',
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
    'Test: Do not trust your gut on polished blends. Style carries no information about reliability',
    'Observe: Watch for the Credibility Borrow, the Sandwich, uniform polish, and the Partial Check Trap',
    'Practice: Run the Claim-by-Claim Audit. Verify each claim independently, and let the weakest-checked claim set the trust level',
    'STOP on every answer you rely on: See the claims, Test your instinct, Observe the red flags, Practice the audit',
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
  estimatedTime: 15,

  skillLearned: 'Auditing mixed-truth AI answers one claim at a time',
  verificationMethod: 'The Claim-by-Claim Audit',

  caseStudy: {
    name: 'The AI-generated summer reading list in newspapers',
    date: 'May 2025',
    researcher: 'Reported by the Chicago Sun-Times and other outlets',
    source: 'Reporting by the Chicago Sun-Times / NPR / AP, May 2025',
  },

  // No nextLesson: this is the final pattern in the course.

  phases: { see, test, observe, practice },
};

export default lesson;
