// src/data/patterns/pattern-08-logic-phantom.js
// Pattern 08: Logic Phantom
//
// Hook: "When the math doesn't math"
// TARGET: about 10 minutes total
//
// Anchor incident (real): on 7 October 2026 OpenAI withdrew three of the 722
// AI-generated maths manuscripts it had published the day before, after a sign
// error invalidated a cancellation argument (see lesson.caseStudy). The SEE chat
// is a simplified illustration of that kind of slip, not text from the papers.
// Every number in this file has been recomputed; flawed reasoning appears only
// as the "verify" answers.

// ============================================
// SEE: Story -> Gut check -> Reveal -> Why it matters
// ============================================
const see = {
  title: 'When the Math Doesn\'t Math',
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
      subtext: "There's no wrong answer here. Go with your first reaction.",
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
      transition: "So how do you catch reasoning that only sounds right? Start with this one: find the step worth testing, then test it.",
    },
  ],
};

// ============================================
// TEST: Spot the step worth testing, then test it
// ============================================
const test = {
  title: 'Testing the Derivation',
  steps: [
    {
      type: 'spotTheFlaw',
      heading: 'Before you accept the answer, find the step it all rests on.',
      instruction: 'Tap the parts of this derivation you would want to test. Most lines are fine. One small part decides everything.',
      source: 'From the AI answer',
      code: true,
      segments: [
        { text: "Let's work through it step by step.", note: 'A friendly opener. It promises care but checks nothing. Step-by-step layout is a surface signal, not evidence.' },
        { text: '\n\n' },
        { text: 'Step 1: Remove the brackets: ', note: 'The right first move. Removing brackets is exactly how you would start.' },
        { text: '10 - 4 - 2k + 2k', flag: { label: 'Sign inside the brackets', explanation: 'A minus in front of brackets flips every sign inside. 10 - (4 - 2k) becomes 10 - 4 + 2k, not 10 - 4 - 2k. This one character is where the derivation goes wrong.' } },
        { text: '\n\n' },
        { text: 'Step 2: The k terms cancel: -2k + 2k = 0.', flag: { label: 'Cancellation that everything rests on', explanation: 'The arithmetic on this line is correct, but it only works if Step 1 was right. The whole result rests on this cancellation, so it is the step to check most carefully.' } },
        { text: '\n\n' },
        { text: 'Step 3: Subtract: 10 - 4 = 6.', note: 'Correct. If you spot-check this line, it passes. That is part of the trap: most lines really are fine.' },
        { text: '\n\n' },
        { text: 'Therefore: ', note: '"Therefore" signals logic. It does not supply any.' },
        { text: 'the expression equals 6 for every value of k.', flag: { label: 'A claim you can test in seconds', explanation: '"For every value of k" is a strong claim. One value of k that gives something other than 6 is enough to disprove it.' } },
        { text: ' The k terms cancel.', note: 'This just repeats Step 2. Saying it twice does not make it more true.' },
      ],
      summary: 'Three things to test: the sign in Step 1, the cancellation that depends on it, and the claim that the answer is 6 for every k. Next, run the tests.',
    },
    {
      type: 'investigation',
      heading: 'Run the tests.',
      intro: 'You have a pencil, a calculator and a couple of minutes. Which tests actually tell you whether the k terms cancel?',
      claim: {
        label: 'What the AI claims',
        text: '10 - (4 - 2k) + 2k = 6 for every value of k',
        code: true,
      },
      rounds: [
        {
          title: 'Test 1: Does the answer survive a number?',
          question: 'What do you check first?',
          options: [
            {
              id: 'ask-ai',
              label: 'Ask the model to re-check its own working',
              useful: false,
              resultLabel: 'Typical reply (illustrative)',
              result: 'I have re-checked each step. Removing the brackets gives 10 - 4 - 2k + 2k, the k terms cancel, and the result is 6.',
              feedback: 'A re-check by the same model tends to repeat the same reasoning, slip included. It reads the steps again; it does not test them.',
            },
            {
              id: 'plug-in',
              label: 'Plug in k = 1 and compute the original expression',
              useful: true,
              resultLabel: 'Computed with python3',
              result: '10 - (4 - 2*1) + 2*1 = 10 - 2 + 2 = 10\nClaimed answer: 6',
              feedback: 'One number settles it. If the expression were 6 for every k, it would be 6 at k = 1. It is 10, so the claim is false.',
              kit: 'Plug a simple value into the original expression and compare with the claimed answer',
            },
            {
              id: 'neat',
              label: 'Read the steps again: they are short and neatly laid out',
              useful: false,
              feedback: 'Neat layout is how both right and wrong derivations look. Rereading the same lines in the same order tends to miss the same slip.',
            },
          ],
        },
        {
          title: 'Test 2: Where does it break?',
          question: 'The claim is wrong. How do you find the faulty step and the right answer?',
          options: [
            {
              id: 'redo',
              label: 'Redo the bracket step yourself, without looking at the AI\'s line',
              useful: true,
              resultLabel: 'Your own working',
              result: '-(4 - 2k) = -4 + 2k\n10 - 4 + 2k + 2k = 6 + 4k',
              feedback: 'Done independently, the sign flips and the k terms add instead of cancelling. Step 1 is where it went wrong, and the true answer is 6 + 4k.',
              kit: 'Redo the key step yourself from the original, not from the AI\'s intermediate line',
            },
            {
              id: 'k-zero',
              label: 'Check k = 0 to confirm',
              useful: false,
              resultLabel: 'Computed with python3',
              result: 'k = 0: original = 6, claimed = 6',
              feedback: 'It matches, but only by luck. At k = 0 every k term vanishes, so the error cannot show up. Pick test values that make the suspicious part matter.',
            },
            {
              id: 'several',
              label: 'Compare the original with 6 + 4k at a few values',
              useful: true,
              resultLabel: 'Computed with python3',
              result: 'k    original   6 + 4k   AI says\n-1   2          2        6\n 1   10         10       6\n 2   14         14       6',
              feedback: 'Your corrected answer matches the original at every value tried. The AI\'s 6 matches none of these.',
              kit: 'Check your corrected answer against the original at a few values, avoiding ones that hide the error',
            },
          ],
        },
        {
          title: 'Test 3: What else rests on it?',
          question: 'In OpenAI\'s case the slip sat inside a research paper. How do you judge a result like that?',
          options: [
            {
              id: 'top-lab',
              label: 'It came from a top AI lab, so it was surely checked',
              useful: false,
              feedback: 'Three papers were withdrawn within a day, and OpenAI\'s own repository warns that some unformalized results could have issues. Who published it tells you nothing about a single sign.',
            },
            {
              id: 'lean',
              label: 'Check whether a formal (Lean) proof covers this exact result',
              useful: true,
              resultLabel: 'Reported by Il Foglio, 14 Oct 2026',
              result: 'At release: 162 of 722 main results formalized in Lean\nAfter 7 Oct update: 300 of 719 (about 42%)\nWithdrawn or heavily revised papers: almost all outside the Lean-verified part',
              feedback: 'A machine-checked proof covers every step it contains. Most of the catalogue had none. Even then, Lean only checks what is written in the code, so someone still has to confirm the formal statement matches the theorem claimed.',
              kit: 'Check whether a formal or independent check covers this exact step, not just the collection',
            },
            {
              id: 'depends',
              label: 'Trace what depends on the flawed step',
              useful: true,
              resultLabel: 'From OpenAI\'s 7 Oct change log, as reported',
              result: 'Weil classes paper: sign error invalidates a cancellation argument\nIts construction was used by 2 other papers\nAll 3 withdrawn, including the rational Hodge conjecture for products of K3 surfaces',
              feedback: 'One wrong sign did not just spoil one line. Anything built on the broken step falls with it, so check the step before you build on it.',
              kit: 'Ask what the conclusion, and any later work, depends on, then check that step first',
            },
          ],
        },
      ],
      verdict: {
        question: 'So what does 10 - (4 - 2k) + 2k equal?',
        options: [
          { id: 'six', label: '6, because the k terms cancel', correct: false, feedback: 'k = 1 gives 10, not 6. The cancellation only happens because Step 1 dropped a sign.' },
          { id: 'six-plus', label: '6 + 4k. Step 1 missed the sign flip, so the k terms add', correct: true, feedback: 'Right. -(4 - 2k) is -4 + 2k. The k terms add to 4k, and the answer is 6 + 4k. One plugged-in number exposed it, and redoing the step showed where.' },
          { id: 'mostly', label: 'Usually 6. It only differs for some values of k', correct: false, feedback: 'It is 6 only when k = 0. For every other value the AI\'s answer is wrong, so "6 for every value of k" is false.' },
        ],
      },
      kit: {
        title: 'Your Logic Phantom Test Kit',
        footer: 'Under a minute with a pencil or one line of code. The derivation looked equally tidy either way. Only testing it showed the difference.',
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
      heading: 'Phantom logic follows predictable patterns.',
      subtext: 'Flawed reasoning tends to fail in a handful of recognizable ways. Learn these 4 and you can spot most of it.',
      cards: [
        { emoji: '🧮', label: 'Smooth Slip' },
        { emoji: '🦘', label: 'Leap' },
        { emoji: '🎯', label: 'Wrong Question, Right Answer' },
        { emoji: '🔗', label: 'Correlation Dressed as Cause' },
      ],
    },
    {
      type: 'concept',
      emoji: '🧮',
      eyebrow: 'Red Flag 1 of 4',
      name: 'Smooth Slip',
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
      name: 'Leap',
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
        { id: 'flag-1', emoji: '🧮', label: 'Smooth Slip' },
        { id: 'flag-2', emoji: '🦘', label: 'Leap' },
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
// PRACTICE: Practice set -> Toolkit -> Completion
// All AI answers in the practice set are illustrative; every number in them
// (right and wrong) was recomputed with python3.
// ============================================
const practice = {
  title: 'Your Turn',
  steps: [
    {
      type: 'practiceSet',
      intro: {
        heading: 'Practice: Check the Working',
        instruction: 'Six short exercises. Find the step that slipped, read a recomputed result, name the flaw, pick the fastest test and fix a unit mix-up.',
        note: 'Some AI answers here are correct. Redoing the working is how you find out, not an accusation.',
      },
      items: [
        {
          id: 'p8-spot-slip',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'The annual plan is $240 a year and the monthly plan is $22 a month. How much does the annual plan save me?'",
          prompt: 'Tap the step that is wrong, or tell us nothing is.',
          artifact: { label: 'AI answer (illustrative)', code: true },
          segments: [
            { text: 'Annual plan: $240 a year.' },
            { text: '\n' },
            { text: 'Per month, that is 240 / 12 = $20.' },
            { text: '\n' },
            { text: 'Monthly plan for a year: 22 x 12 = $254.', flag: true },
            { text: '\n' },
            { text: 'Difference: 254 - 240 = $14.' },
            { text: '\n\n' },
            { text: 'So the annual plan saves you $14 a year.', flag: true },
          ],
          explanation: '22 x 12 is 264, not 254. Every other line is fine, and 254 - 240 = 14 is even correct arithmetic, which is why the slip hides. The real saving is 264 - 240 = $24. A second route confirms it: you save $2 a month (22 - 20), and 2 x 12 = 24.',
          takeaway: 'One wrong product in a row of right ones. Cross-check by a second route',
        },
        {
          id: 'p8-evidence-interest',
          kind: 'pickAll',
          label: 'Read the evidence',
          context: "You asked: 'I put $5,000 in savings at 4% a year, compounded annually. What will I have after each of the next 3 years?' You recomputed the AI's answer with one line of Python.",
          prompt: 'Which lines of the AI answer are wrong?',
          artifact: {
            label: 'AI answer (illustrative), then your check',
            code: true,
            text: 'Year 1: $5,200\nYear 2: $5,400\nYear 3: $5,600\nTotal interest: $600\n\n$ python3 -c "print([round(5000*1.04**n, 2) for n in (1, 2, 3)])"\n[5200.0, 5408.0, 5624.32]',
          },
          options: [
            { id: 'y1', label: 'Year 1: $5,200', feedback: 'This line matches. In the first year, simple and compound interest give the same result, so it cannot reveal the error.' },
            { id: 'y2', label: 'Year 2: $5,400', correct: true, feedback: 'Python says $5,408. In year 2 you also earn interest on the $200 from year 1.' },
            { id: 'y3', label: 'Year 3: $5,600', correct: true, feedback: 'Python says $5,624.32. The gap grows every year.' },
            { id: 'total', label: 'Total interest: $600', correct: true, feedback: 'That is simple interest: 5,000 x 4% x 3. With compounding it is $624.32.' },
          ],
          explanation: 'The AI answered an easier question: simple interest instead of compound. Year 1 matching is luck, like testing k = 0 earlier in this lesson. Check where the error would show, here year 2 or later.',
          takeaway: 'A first line that matches proves nothing. Check where the error would show',
        },
        {
          id: 'p8-diagnose-cause',
          kind: 'choose',
          label: 'Diagnose',
          context: 'You asked an AI to look at your app data. Part of its answer:',
          prompt: 'What is wrong with this reasoning?',
          artifact: {
            label: 'AI answer (illustrative)',
            text: 'Users who switched on dark mode stayed subscribed 30% longer than users who did not. Therefore, making dark mode the default will cut cancellations by about 30%.',
          },
          options: [
            { id: 'maths', label: 'An arithmetic slip in the 30%', feedback: 'Nothing here is computed. The 30% may well be accurate. The problem is what it is taken to mean.' },
            { id: 'cause', label: 'It treats a pattern as a cause', correct: true, feedback: 'Right. Users who dig into settings may be more engaged to begin with. Engagement could explain both.' },
            { id: 'question', label: 'It answers a different question from the one asked', feedback: 'It does address your data. The flaw is the link from the data to the conclusion.' },
            { id: 'fine', label: 'Nothing. The data supports the conclusion', feedback: 'The data shows two things moving together. It does not show that changing one changes the other.' },
          ],
          explanation: '"Therefore" joins an observation to a promise the data cannot make. To find out whether dark mode reduces cancellations, test it: turn it on by default for a random half of new users and compare.',
          takeaway: 'Moving together is not causing. Ask what else explains both',
        },
        {
          id: 'p8-spot-clean',
          kind: 'spot',
          label: 'Spot it',
          context: "You asked: 'I drive 2 hours at 45 km/h, then 3 hours at 60 km/h. What is my average speed?'",
          prompt: 'Tap the step that is wrong, or tell us nothing is.',
          artifact: { label: 'AI answer (illustrative)', code: true },
          segments: [
            { text: 'First leg: 2 x 45 = 90 km.' },
            { text: '\n' },
            { text: 'Second leg: 3 x 60 = 180 km.' },
            { text: '\n' },
            { text: 'Total: 90 + 180 = 270 km' },
            { text: ' ' },
            { text: 'in 2 + 3 = 5 hours.' },
            { text: '\n' },
            { text: 'Average speed: 270 / 5 = 54 km/h.' },
            { text: '\n\n' },
            { text: 'Not (45 + 60) / 2 = 52.5, because you spent longer at the faster speed.' },
          ],
          explanation: 'Every step holds. Average speed is total distance over total time, the units stay in km and hours throughout, and the last line even heads off the common shortcut. The check took seconds, and the answer is safe to use.',
          takeaway: 'Correct working exists too. Checking tells you which kind you have',
        },
        {
          id: 'p8-pick-test',
          kind: 'choose',
          label: 'Pick the test',
          context: "An AI tells you: 'The sum of the first 50 odd numbers is 2,550.'",
          prompt: 'What settles it fastest?',
          options: [
            { id: 'ask', label: 'Ask the AI to double-check its answer', feedback: 'The same model often repeats the same reasoning. A second confident reply is not a second source.' },
            { id: 'search', label: 'Search the web to see whether 2,550 is the usual answer', feedback: 'Even if many pages say it, that shows it is repeated, not that it fits your question.' },
            { id: 'code', label: 'Run one line: python3 -c "print(sum(range(1, 100, 2)))"', correct: true, feedback: 'It prints 2500. range(1, 100, 2) is 1, 3, 5 ... 99: exactly the first 50 odd numbers.' },
            { id: 'formula', label: 'Trust it if the AI shows a neat formula', feedback: 'A neat formula can be the right formula for the wrong question. Layout is not evidence.' },
          ],
          explanation: 'The answer is 2,500. The sum of the first n odd numbers is n x n (try it small: 1 + 3 + 5 = 9). 2,550 is the sum of the first 50 even numbers, so the AI answered a nearby question.',
          takeaway: 'Recompute it yourself. A second AI opinion is not a test',
        },
        {
          id: 'p8-fix-units',
          kind: 'choose',
          label: 'Fix it',
          context: "You asked: 'How long does a 1.2 GB download take on a 50 Mbps connection?'",
          prompt: 'Which is the corrected working?',
          artifact: { label: 'AI answer (illustrative)', code: true, text: '1.2 GB = 1,200 MB\n1,200 / 50 = 24\nAbout 24 seconds.' },
          optionsCode: true,
          options: [
            { id: 'asis', label: '1,200 MB / 50 Mbps = 24 seconds', feedback: 'MB is megabytes, Mbps is megabits per second. The units do not match, so the division means nothing.' },
            { id: 'div8', label: '1,200 / 50 / 8 = 3 seconds', feedback: 'Right idea, wrong direction. A byte is 8 bits, so the file is more megabits than megabytes, not fewer.' },
            { id: 'right', label: '1,200 MB x 8 = 9,600 Mb\n9,600 / 50 = 192 s (about 3 min 12 s)', correct: true, feedback: 'Right. Convert to bits first, then divide. Megabits over megabits per second gives seconds.' },
            { id: 'minutes', label: '1,200 / 50 = 24 minutes', feedback: 'Swapping seconds for minutes does not fix the units. It just moves the error.' },
          ],
          explanation: 'A lower-case b means bits, an upper-case B means bytes, and 1 byte is 8 bits. Writing the unit next to every number shows the mismatch at once. Real downloads are usually a little slower again, because of network overhead.',
          takeaway: 'Write the units on every line. Bits and bytes differ by 8',
        },
      ],
      scoring: {
        tiers: [
          { min: 6, message: 'Six out of six. You check the answer, not the formatting.' },
          { min: 4, message: 'Solid. Redo the ones you missed with a calculator and notice where the steps and the truth part ways.' },
          { min: 0, message: 'These are subtle on purpose. Go back over the explanations, then try the 90-second routine on each one.' },
        ],
      },
      summary: {
        insight: 'One answer was correct. The others slipped a product, used the wrong formula, answered a nearby question, confused bits with bytes, or turned a pattern into a cause. Each took under a minute to settle by redoing it another way.',
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
  estimatedTime: 10,

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
