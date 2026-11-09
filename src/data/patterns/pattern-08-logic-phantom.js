// src/data/patterns/pattern-08-logic-phantom.js
// Pattern 08: The Logic Phantom
//
// Hook: "When the math doesn't math"
// TARGET: ~18 minutes total
//
// Anchor incident (real): on 7 October 2026 OpenAI withdrew three of the 722
// AI-generated maths manuscripts it had published the day before, after a sign
// error invalidated a cancellation argument (see lesson.caseStudy). The SEE chat
// is a simplified illustration of that kind of slip, not text from the papers.
// Every number in this file has been recomputed; flawed reasoning appears only
// as the "verify" answers.

// ============================================
// SEE (3 min): Story -> Gut check -> Reveal -> Why it matters
// ============================================
const see = {
  title: 'When the Math Doesn\'t Math',
  estimatedTime: 3,
  steps: [
    {
      type: 'prose',
      heading: 'The proof looked airtight.',
      body: `On 6 October 2026, OpenAI posted 722 mathematics manuscripts to GitHub, all produced by an unreleased internal AI model. They read like professional research: definitions, lemmas and long chains of "therefore". Some claimed progress on famous open problems, including results tied to the Hodge conjecture.

Less than a day later, OpenAI withdrew three of them. The cause was not a wild leap. It was a single wrong sign. Here is a simplified example of that kind of slip:`,
    },
    {
      type: 'chat',
      user: 'Simplify 10 - (4 - 2k) + 2k. Do the k terms cancel?',
      ai: {
        text: `Let's work through it step by step.

**Step 1:** Remove the brackets: 10 - 4 - 2k + 2k.

**Step 2:** The k terms cancel: -2k + 2k = 0.

**Step 3:** Subtract: 10 - 4 = 6.

**Therefore:** the expression equals **6** for every value of k. The k terms cancel.`,
        note: "Simplified illustration of the kind of error OpenAI reported (a wrong sign in a cancellation step). It is not text from the withdrawn papers.",
      },
    },
    {
      type: 'choice',
      question: 'Be honest: would you have accepted that the k terms cancel?',
      subtext: "There's no wrong answer here. We're testing your instincts.",
      options: [
        { id: 'yes-trusted', label: 'Yes, every step looks fine', response: "That's the trap. Checking that steps look fine is not the same as checking the answer." },
        { id: 'maybe-recalc', label: "Maybe, but I'd plug in a number first", response: 'Good instinct. Testing it a different way is exactly the habit this lesson builds.' },
        { id: 'no-suspicious', label: 'No, something seems off', response: 'Hold that thought. Which step would you check first?' },
      ],
    },
    {
      type: 'reveal',
      icon: 'alert',
      headline: 'One wrong sign. Three papers withdrawn.',
      explanation: `Removing brackets after a minus flips every sign inside them: 10 - (4 - 2k) is 10 - 4 + 2k, not 10 - 4 - 2k. The k terms add instead of cancelling, so the true answer is 6 + 4k. Try k = 1: the original expression gives 10, not 6.

OpenAI's real slip was the same kind of error at research level. On 7 October 2026 it reported that, in "Algebraicity of Weil classes on split abelian eightfolds", a sign error invalidated a cancellation argument and a construction that two other papers relied on. All three were withdrawn, including one claiming the rational Hodge conjecture for products of K3 surfaces. The same update revised 14 other manuscripts with proof repairs and corrected statements.`,
      list: {
        title: "Here's what made it convincing:",
        items: [
          'Formal structure and a confident "Therefore" create an air of rigor',
          'A single wrong step hides among correct ones, so spot-checking most lines passes',
          'The slip produced a satisfying result (a clean cancellation), so nothing felt off',
          'Later work built on the flawed step, so in OpenAI\'s case one sign took down three papers',
        ],
      },
    },
    {
      type: 'points',
      heading: 'Why is this dangerous?',
      items: [
        { label: 'Annoying but harmless:', body: "A small slip in a casual calculation. You'd notice soon enough.", tone: 'neutral' },
        { label: 'Actually dangerous:', body: "The same polished format wraps proofs, prices, dosages, budgets, contracts and code. You make real decisions, or build further work, on an answer nobody re-checked.", tone: 'danger' },
      ],
      conclusion: "AI language models predict plausible text; a long, formal-looking argument is not evidence that every step holds. OpenAI's own repository warns that \"some of the unformalized results could have issues\", and after the 7 October update only about 42% of its top-line results (300 of 719) had machine-checked Lean proofs.",
      transition: "So how do you catch reasoning that only sounds right? First, let's test your instincts.",
    },
  ],
};

// ============================================
// TEST (4 min): 5 AI claims — Use it or Check first?
// ============================================
const test = {
  title: 'Use It or Check First?',
  estimatedTime: 4,
  steps: [
    {
      type: 'judgementSet',
      intro: {
        heading: 'Here are 5 pieces of reasoning an AI assistant might give you.',
        instruction: 'For each one, decide: would you use the answer as given, or check it first?',
        note: 'Go with your gut. You can use a pencil, but no calculators yet.',
        legend: {
          trust: { label: 'TRUST', detail: 'Reasoning holds up', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Something may be off', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'item-1',
          prompt: 'Total is $1.10. The bat costs $1.00 more than the ball.\nSo the bat is $1.00 and the ball is $0.10.\nCheck: $1.00 + $0.10 = $1.10.\nTherefore the ball costs $0.10.',
          code: true,
          context: "You asked: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much is the ball?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Flawed',
          explanation: "FLAWED. The total checks out, but the other constraint doesn't: $1.00 is only $0.90 more than $0.10. The correct answer is $0.05 (ball $0.05, bat $1.05). The AI 'verified' just one of the two conditions.",
          redFlag: 'Checked only half the constraints',
        },
        {
          id: 'item-2',
          prompt: 'A $50 jacket is 20% off.\n20% of $50 = $10.\n$50 - $10 = $40.\nThe sale price is $40.',
          code: true,
          context: "You asked: 'What is the sale price of a $50 jacket at 20% off?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Sound',
          explanation: 'SOUND. 20% of 50 is 10, and 50 - 10 = 40. It answers the question asked, every step follows from the last, and it is easy to confirm on any calculator.',
          meta: 'Simple, checkable, answers the actual question',
        },
        {
          id: 'item-3',
          prompt: "Counting letters in 'strawberry': s-t-r-a-w-b-e-r-r-y.\nThe letter 'r' appears 2 times.",
          code: true,
          context: "You asked: 'How many r's are in the word strawberry?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Miscount',
          explanation: "MISCOUNT. The AI even spelled the word out, then miscounted: there is one r in 'str' and two in 'rr', so 3 in total. Models read text in chunks (tokens), not letter by letter, so counting letters is a known weak spot.",
          redFlag: 'Confident count with no real counting',
        },
        {
          id: 'item-4',
          prompt: 'Every square is a rectangle.\nShape A is a square.\nTherefore, Shape A is a rectangle.',
          code: true,
          context: "You asked: 'If all squares are rectangles and Shape A is a square, what can I say about Shape A?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Valid',
          explanation: 'VALID. This follows the form "All S are R; A is an S; so A is an R". The conclusion is forced by the premises. Compare it to the reversed version (A is a rectangle, so A is a square), which would not follow.',
          meta: 'Conclusion is forced by the premises',
        },
        {
          id: 'item-5',
          prompt: 'We changed the logo in March.\nSales rose 12% in April.\nTherefore, the new logo caused the 12% increase.',
          code: true,
          context: "You asked: 'Did our new logo boost sales?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Non sequitur',
          explanation: "NON SEQUITUR. 'After' is not 'because'. Seasonality, a promotion or a price change could explain it just as well. The steps give timing, not a cause, so the 'Therefore' does not follow.",
          redFlag: "'Therefore' with no link between the steps",
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: "Perfect! You correctly judged all 5. You have strong instincts. Let's sharpen them further." },
          { min: 4, message: "4 out of 5! Solid instincts. The red flags ahead will help you catch the last one." },
          { min: 3, message: "3 out of 5. Not bad! Flawed reasoning is tricky because it's formatted like good reasoning." },
          { min: 0, message: "This is tricky, and that's the point. Neat steps feel trustworthy even when they aren't. Let's learn the patterns that give them away." },
        ],
      },
      summary: {
        insight: 'In this batch, 3 of the 5 chains of reasoning were flawed, and every one of them looked tidy and confident. Fluent structure is not evidence of correctness: OpenAI\'s withdrawn papers looked like professional mathematics too. Let\'s learn how to spot the cracks.',
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
      heading: 'Phantom logic follows predictable patterns.',
      subtext: 'Flawed reasoning tends to fail in a handful of recognizable ways. Learn these 4 and you can spot most of it.',
      cards: [
        { emoji: '🧮', label: 'The Smooth Slip' },
        { emoji: '🦘', label: 'The Leap' },
        { emoji: '🎯', label: 'Wrong Question, Right Answer' },
        { emoji: '🔗', label: 'Correlation Dressed as Cause' },
      ],
    },
    {
      type: 'concept',
      emoji: '🧮',
      eyebrow: 'Red Flag 1 of 4',
      name: 'The Smooth Slip',
      description: 'One wrong number, sign, letter count or unit is buried in a run of tidy, correct-looking steps. A single wrong sign was enough to sink three of OpenAI\'s AI-generated papers in October 2026.',
      compare: {
        left: { label: '❌ Slips that can appear:', tone: 'danger', items: ["'strawberry' has 2 r's", '9.11 is larger than 9.9', '340 + 68 = 418', '20 min at 18 km/h: 18 x 20 = 360 km'] },
        right: { label: '✓ Correct versions:', tone: 'good', items: ["'strawberry' has 3 r's", '9.9 is larger than 9.11', '340 + 68 = 408', '20 min is 1/3 h: 18 x 1/3 = 6 km'] },
      },
      why: "AI generates text that looks like a correct calculation; it doesn't necessarily compute. Big multi-digit arithmetic, letter counts, decimal comparisons and unit conversions are common places for slips.",
      spot: 'Whenever a number matters, recompute it yourself with a calculator or code. Never rely on "the steps look right".',
    },
    {
      type: 'concept',
      emoji: '🦘',
      eyebrow: 'Red Flag 2 of 4',
      name: 'The Leap',
      description: 'The conclusion starts with "therefore" or "so", but nothing in the steps actually leads to it.',
      rows: [
        { label: 'AI steps:', variant: 'quote', tone: 'neutral', value: 'All dogs are mammals. Rex is a mammal.' },
        { label: 'AI concludes:', variant: 'code', tone: 'danger', value: 'Therefore, Rex is a dog.' },
        { label: 'Counterexample:', variant: 'quote', tone: 'good', value: 'Rex could be a cat. Cats are mammals too.' },
      ],
      note: 'This is called affirming the consequent. The steps allow the conclusion; they do not force it.',
      why: "Words like 'therefore', 'thus' and 'clearly' signal logic to readers, so they're persuasive even when the link is missing.",
      spot: 'Cover the conclusion and ask: do the steps alone force it? Try to invent one case where the steps are true but the conclusion is false.',
    },
    {
      type: 'concept',
      emoji: '🎯',
      eyebrow: 'Red Flag 3 of 4',
      name: 'Wrong Question, Right Answer',
      description: 'The AI solves a nearby problem: it drops a constraint, swaps a definition, or answers an easier version of what you asked.',
      rows: [
        { label: 'You asked:', variant: 'quote', tone: 'neutral', value: 'Price of a $100 item after 20% off, then an extra 10% off?' },
        { label: 'AI answers:', variant: 'code', tone: 'danger', value: '20% + 10% = 30% off, so $70.00' },
        { label: 'Actual answer:', variant: 'code', tone: 'good', value: '100 x 0.80 x 0.90 = $72.00' },
      ],
      note: "The second discount applies to the already-reduced price, so the two don't simply add. Margin versus markup is the same trap: a 40% margin on a $12 cost needs a $20 price ($12 / 0.60), not $16.80 (a 40% markup).",
      why: 'Language models lean toward the most common version of a problem. If your question is unusual, they may answer the familiar one instead.',
      spot: 'Re-read your original question and list its constraints. Then check that each one shows up in the AI\'s steps.',
    },
    {
      type: 'concept',
      emoji: '🔗',
      eyebrow: 'Red Flag 4 of 4',
      name: 'Correlation Dressed as Cause',
      description: "Two things moving together are presented as one causing the other, or a sample that only includes winners is treated as everyone.",
      rows: [
        { label: 'Observation:', variant: 'quote', tone: 'neutral', value: 'Cities with more firefighters have more fire damage.' },
        { label: 'AI concludes:', variant: 'code', tone: 'danger', value: 'Firefighters cause fire damage.' },
        { label: 'Hidden factor:', variant: 'quote', tone: 'good', value: 'Bigger fires bring more firefighters.' },
      ],
      note: 'Related flaws: post hoc reasoning (after, therefore because) and survivorship bias (only counting what survived).',
      why: 'Text in training data often states causes boldly. The AI imitates that tone even when the evidence only shows a pattern.',
      spot: "When you see 'because', 'caused' or 'led to', ask: what else could explain this? Was anything left out of the sample?",
    },
    {
      type: 'matching',
      title: 'Quick Check: Match the Red Flag',
      instruction: 'For each flawed claim, identify which red flag gives it away:',
      options: [
        { id: 'flag-1', emoji: '🧮', label: 'The Smooth Slip' },
        { id: 'flag-2', emoji: '🦘', label: 'The Leap' },
        { id: 'flag-3', emoji: '🎯', label: 'Wrong Question, Right Answer' },
        { id: 'flag-4', emoji: '🔗', label: 'Correlation Dressed as Cause' },
      ],
      items: [
        { prompt: '17 x 24 = 340 + 68 = 418', correct: 'flag-1', explanation: 'The steps are right but the final addition is off: 340 + 68 is 408, not 418.' },
        { prompt: 'All birds have feathers. This animal has feathers. So it is a bird.', correct: 'flag-2', explanation: "The premises don't force the conclusion. The conclusion simply doesn't follow." },
        { prompt: "You ask for the final price after 20% off then 10% off. AI says '30% off'.", correct: 'flag-3', explanation: "It answered a simpler question (add the percentages) and dropped how the discounts compound." },
        { prompt: 'Cities with more firefighters have more damage, so firefighters cause damage.', correct: 'flag-4', explanation: 'A hidden factor (fire size) explains both.' },
        { prompt: 'A 1.5 km walk at 5 km/h takes 18 minutes.', correct: 'trick-question', explanation: "Trick question! This one is correct: 1.5 / 5 = 0.3 hours, which is 18 minutes.", extra: { id: 'trick-question', label: "✓ It's actually correct" } },
      ],
    },
    {
      type: 'method',
      icon: 'shield',
      name: 'Redo It Another Way',
      tagline: 'If the answer matters, reach it by a different route and see if you land in the same place.',
      steps: [
        { number: 1, action: 'Re-read your original constraints', detail: 'List every condition in your question. Does the AI\'s answer honor all of them, or did it answer something easier?', time: '15 seconds' },
        { number: 2, action: 'Sanity-bound it with a rough estimate', detail: 'Round the numbers and estimate. 17 x 24 is a bit under 20 x 25 = 500. Does the claimed answer fall in a sensible range? Check the units too.', time: '15 seconds' },
        { number: 3, action: 'Recompute independently', detail: 'Use a calculator, spreadsheet or a line of code. Do not paste in the AI\'s intermediate numbers; start from your own inputs.', time: '30 seconds' },
        { number: 4, action: 'Try to break the argument', detail: 'For logic claims, look for a counterexample: a case where the steps are true but the conclusion is false. If you find one, the argument fails.', time: '30 seconds' },
      ],
      columns: {
        good: {
          label: '✓ Good signs:',
          items: [
            'Independent recomputation matches',
            'Answer sits inside your rough estimate',
            'Units are consistent from start to finish',
            'No counterexample comes to mind after a real try',
          ],
        },
        warn: {
          label: '⚠ Warning signs:',
          items: [
            'Your recomputed number differs, even slightly',
            'A constraint from your question never appears in the steps',
            "'Therefore' or 'clearly' where no step links to the conclusion",
            'The AI refuses to show its work, or the work contradicts the result',
          ],
        },
      },
      footer: 'It takes about 90 seconds. A wrong price, dose, budget or proof can cost far more. When it matters, redo it another way.',
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
        heading: 'Practice Drill: 5 shorter claims, subtler slips.',
        instruction: 'Use the Redo It Another Way method. Decide for each claim: use it as given, or check it first?',
        note: 'Pencil and paper are fair game this time.',
        legend: {
          trust: { label: 'TRUST', detail: 'Computes and follows', button: 'Use it' },
          verify: { label: 'VERIFY', detail: 'Something is off', button: 'Check first' },
        },
      },
      items: [
        {
          id: 'drill-1',
          prompt: '15% off $80:\n0.15 x 80 = 12\n80 - 12 = 68\nYou pay $68.',
          code: true,
          context: "You asked: 'What do I pay for an $80 item with 15% off?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Correct',
          explanation: 'CORRECT. 15% of 80 is 12, and 80 - 12 = 68. Equivalent check: 80 x 0.85 = 68.',
          meta: 'Two routes (subtract vs. multiply by 0.85) agree',
        },
        {
          id: 'drill-2',
          prompt: '17 x 24:\n17 x 20 = 340\n17 x 4 = 68\n340 + 68 = 418',
          code: true,
          context: "You asked: 'What is 17 x 24? Show your steps.'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Slip',
          explanation: 'SLIP. Both partial products are right (340 and 68), but 340 + 68 = 408, not 418. A last-step slip like this is easy to miss because everything before it was correct.',
          redFlag: 'Correct steps, wrong final sum',
        },
        {
          id: 'drill-3',
          prompt: 'A cyclist rides at 18 km/h.\nIn 20 minutes:\n18 x 20 = 360\nThe cyclist covers 360 km.',
          code: true,
          context: "You asked: 'How far does a cyclist go in 20 minutes at 18 km/h?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Unit swap',
          explanation: 'UNIT SWAP. The speed is per hour but the time was multiplied in minutes. 20 minutes is 1/3 of an hour, so the distance is 18 x 1/3 = 6 km. A rough estimate catches it: 360 km in 20 minutes would be far faster than any cyclist.',
          redFlag: 'Minutes multiplied by a per-hour speed',
        },
        {
          id: 'drill-4',
          prompt: 'All dogs are mammals.\nRex is a mammal.\nTherefore, Rex is a dog.',
          code: true,
          context: "You asked: 'Rex is a mammal. Is Rex a dog?'",
          correct: 'verify',
          tone: 'bad',
          verdictLabel: 'Invalid',
          explanation: "INVALID. This is affirming the consequent. Cats are mammals too, so Rex could be a cat. True premises, unforced conclusion. The honest answer is 'not enough information'.",
          redFlag: "'Therefore' that doesn't follow",
        },
        {
          id: 'drill-5',
          prompt: '2 h at 45 km/h = 90 km.\n3 h at 60 km/h = 180 km.\nTotal: 270 km in 5 h.\nAverage speed: 270 / 5 = 54 km/h.',
          code: true,
          context: "You asked: 'I drive 2 hours at 45 km/h, then 3 hours at 60 km/h. What is my average speed?'",
          correct: 'trust',
          tone: 'good',
          verdictLabel: 'Correct',
          explanation: 'CORRECT. Average speed is total distance over total time: 270 / 5 = 54 km/h. Note it is not (45 + 60) / 2 = 52.5, because more time was spent at the faster speed. The AI used the right method.',
          meta: 'Total distance / total time, with consistent units',
        },
      ],
      scoring: {
        tiers: [
          { min: 5, message: 'Flawless. You are checking the method, not just the formatting.' },
          { min: 4, message: 'Strong. One slipped by, which is why an independent recompute is the habit to build.' },
          { min: 3, message: 'Decent. Try the 90-second routine on every claim: constraints, estimate, recompute, counterexample.' },
          { min: 0, message: 'These are subtle on purpose. Re-run each one with a calculator and notice where the steps and the truth part ways.' },
        ],
      },
      summary: {
        insight: 'Half the battle is simply not letting tidy formatting stand in for checking. Every flaw here was findable in under a minute with a calculator, a rough estimate, or one counterexample.',
      },
    },
    {
      type: 'commands',
      icon: 'terminal',
      heading: 'Your Verification Toolkit',
      subtext: 'Quick ways to redo an answer another way before you rely on it.',
      commands: [
        {
          title: 'Recompute with a line of code',
          ecosystem: 'cli',
          command: 'python3 -c "print(17*24)"',
          output: '408',
          whatToLookFor: 'Compare with the AI\'s final number. Start from your own inputs, not the AI\'s intermediate values.',
        },
        {
          title: 'Check units and fractions with bc',
          ecosystem: 'cli',
          command: 'echo "scale=4; 18*20/60" | bc -l',
          output: '6.0000',
          whatToLookFor: 'Writing the unit conversion explicitly (20 min = 20/60 h) exposes unit swaps. 6 km, not 360 km.',
        },
        {
          title: 'Spreadsheet formula check',
          ecosystem: 'xls',
          command: '=80*(1-15%)',
          output: '68',
          whatToLookFor: 'Rebuild the formula from the question and compare. Cells make your assumptions visible and reusable.',
        },
        {
          title: 'Hunt for a counterexample',
          ecosystem: 'cli',
          command: `python3 -c "mammals={'Rex','Tom'}; dogs={'Rex'}; print(sorted(m for m in mammals if m not in dogs))"`,
          output: "['Tom']",
          whatToLookFor: "If you can build a case where the premises hold but the conclusion fails ('Tom' is a mammal but not a dog), the argument is invalid.",
        },
      ],
      quickReference: {
        title: 'Redo It Another Way',
        steps: [
          'Re-read your question and list every constraint',
          'Round the numbers and estimate (17 x 24 is near 20 x 25 = 500)',
          'Recompute independently with a calculator, spreadsheet or code',
          'Look for a counterexample, and check that units match throughout',
        ],
      },
    },
    {
      type: 'completion',
      icon: 'check',
      title: 'Pattern Learned: Logic Phantom',
      summary: "You can now spot reasoning that sounds rigorous but isn't. You know the four red flags, and you have a 90-second routine that checks the answer instead of the formatting.",
      // NOTE: no `checklist` here on purpose; the phase-level keyTakeaways +
      // checklist below are rendered by LessonShell's final screen.
      next: { label: 'Up Next', body: 'Pattern 9 looks at what happens when AI is asked to predict the future, and answers with the same easy confidence.' },
    },
  ],

  keyTakeaways: [
    'Neat step-by-step structure creates false confidence; correct-looking steps can hide a wrong answer',
    'Red flags: the smooth slip, the leap, wrong question right answer, correlation dressed as cause',
    "Language models predict plausible text; they don't automatically calculate or count",
    'Redo It Another Way: re-read constraints, estimate, recompute independently, hunt for a counterexample',
    'Checking each step is not the same as checking the answer',
  ],
  checklist: {
    title: 'Your Logic Phantom Checklist',
    items: [
      'Did I re-read my original question and list its constraints?',
      'Does a rough estimate put the answer in a sensible range?',
      'Did I recompute the key numbers myself, from my own inputs?',
      'Are the units consistent from first step to last?',
      'Does each "therefore" follow from the steps, or can I find a counterexample?',
      'Is "because" claimed where the evidence only shows a pattern?',
    ],
  },
};

// ============================================
// Lesson (metadata + phases)
// ============================================
export const lesson = {
  id: 'pattern-08',
  patternNumber: 8,
  title: 'Logic Phantom',
  subtitle: "Reasoning that sounds valid but isn't",
  description: 'Learn to spot AI step-by-step reasoning that reads as rigorous but hides an arithmetic slip, a logical fallacy, or a conclusion that does not follow.',
  estimatedTime: 15,

  skillLearned: 'Checking AI reasoning and calculations independently',
  verificationMethod: 'Redo It Another Way',

  caseStudy: {
    name: 'OpenAI withdraws three AI-generated maths papers after a sign error',
    date: '7 October 2026',
    researcher: 'Disclosed by OpenAI; reported by Il Foglio (Enrico Bucci)',
    source: 'https://www.ilfoglio.it/en/science/2026/10/14/news/openai-withdraws-three-demonstrations-after-one-day-and-calls-the-mathematical-pact-into-question--410393',
  },

  nextLesson: {
    id: 'pattern-09',
    title: 'Confident Extrapolation',
    teaser: 'Claims that go beyond what the AI could know.',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
