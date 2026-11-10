// src/data/patterns/_TEMPLATE.js
// ---------------------------------------------------------------------------
// PATTERN AUTHORING TEMPLATE  (block-based schema)
// ---------------------------------------------------------------------------
// Copy this file to pattern-NN-<slug>.js and fill it in. Authoring a new
// pattern is PURE CONTENT: you never touch component code. Each phase is a
// list of `steps`, and every step is one "block" object: { type, ...props }.
// One block = one screen. StepFlow renders them in order, shows progress dots,
// and handles all navigation.
//
// The 17 available block types (registered in
// src/components/phases/blocks/BlockRenderer.jsx):
//
//   NARRATIVE / PROSE
//     prose          headline + paragraphs of copy
//     chat           an AI-chat mock (question + selectable replies)
//     reveal         "here's what actually happened" reveal card
//     stats          big impact numbers
//     points         bulleted takeaway points
//     completion     light in-flow "pattern learned" beat: title + summary +
//                    next teaser. Do NOT give it a checklist. LessonShell's
//                    final screen renders the phase-level keyTakeaways/checklist.
//
//   CONCEPT / TEACHING
//     cardGrid       grid of concept cards
//     concept        a single red-flag / concept screen (compare + rows;
//                    supports quote/code/chips variants)
//     method         numbered step-by-step method (number/action/detail/time)
//     commands       copyable command snippets (title + code)
//     registry       package-registry preview (layout: 'single' | 'compare')
//
//   INTERACTIVE  (single-screen: StepFlow gates "Continue" until answered)
//     choice         pick one option, get a response
//     matching       match prompts to answers (items have correct/extra)
//     spotTheFlaw    TEST step 1: tap the parts of the SEE artifact worth
//                    testing (segments with flag/note)
//
//   SELF-NAVIGATING (block owns its own next/back; StepFlow hides the footer)
//     investigation  TEST step 2: run real tests on the claim, then a verdict
//                    and a test kit (rounds/verdict/kit)
//     practiceSet    PRACTICE drill: 5-6 varied items (kind: 'spot' |
//                    'choose' | 'pickAll'), see the PRACTICE section below
//     judgementSet   legacy trust-or-verify set (not used by any pattern)
//     drill          legacy real-or-fake package drill (not used by any
//                    pattern)
//
// PROP-LEVEL REFERENCE: pattern-01-confident-fabrication.js is the canonical,
// known-good worked example of every block above. When you need the exact
// fields for a block, copy that block from pattern-01 and edit the content.
// ---------------------------------------------------------------------------

// ── SEE: hook them with a real story ──────────────────────────────────────
const see = {
  title: 'TODO: phase title',
  steps: [
    // e.g. { type: 'prose', ... }, { type: 'chat', ... },
    // { type: 'choice', ... }, { type: 'reveal', ... },
    // { type: 'stats', ... }, { type: 'points', ... },
  ],
};

// ── TEST: dissect the SEE case, then test it ──────────────────────────────
// Always exactly two steps, built from the case shown in SEE (no new example).
// Full rules: docs/pattern-authoring-guide.md, "TEST phase format".
const test = {
  title: 'TODO: phase title',
  steps: [
    // 1. Which parts are worth testing? Split the SEE artifact into 6-12
    //    segments; flag the 2-3 that matter, give the rest a note.
    // {
    //   type: 'spotTheFlaw',
    //   heading, instruction, source, code: true|false,
    //   segments: [
    //     { text: 'TODO', note: 'Why this part checks out.' },
    //     { text: ' ' },
    //     { text: 'TODO', flag: { label: 'What to test', explanation: 'Why it needs checking.' } },
    //   ],
    //   summary: 'TODO: what to test, leading into the next step.',
    // },
    //
    // 2. Run the tests, then make the call. 3 rounds, each with at least one
    //    useful and one useless option. Useless options explain why they fail.
    //    Results are real (note source + date checked) or labelled illustrative.
    // {
    //   type: 'investigation',
    //   heading, intro,
    //   claim: { label, text, code: true|false },
    //   rounds: [
    //     {
    //       title: 'Test 1: TODO', question: 'TODO',
    //       options: [
    //         { id, label, useful: true, resultLabel: 'Source (checked DATE)', result: 'TODO',
    //           feedback: 'What this tells you.', kit: 'Short line for the test kit' },
    //         { id, label, useful: false, resultLabel: 'Typical reply (illustrative)', result: 'TODO',
    //           feedback: 'Why this test does not settle it.' },
    //       ],
    //     },
    //   ],
    //   verdict: { question, options: [{ id, label, correct: true|false, feedback }] },
    //   kit: { title: 'Your TODO Test Kit', footer: 'TODO' },
    // },
  ],
};

// ── OBSERVE: teach the red flags ──────────────────────────────────────────
const observe = {
  title: 'TODO: phase title',
  steps: [
    // e.g. { type: 'cardGrid', ... }, one { type: 'concept', ... } per red flag,
    // then a { type: 'matching', ... } check and a { type: 'method', ... } recap.
  ],
};

// ── PRACTICE: apply it, then wrap up ──────────────────────────────────────
// NOTE: keyTakeaways + checklist live on the phase (NOT inside a step).
// LessonShell's final "Pattern Learned!" screen renders them automatically for
// every pattern. Keep them here, and do NOT duplicate the checklist on the
// completion block, or it shows twice.
const practice = {
  title: 'TODO: phase title',
  steps: [
    // [practiceSet, commands, completion]. Full rules: authoring guide,
    // "PRACTICE phase format". Fresh examples, not the SEE/TEST case.
    // Mix kinds and labels; include one item that is entirely fine.
    // {
    //   type: 'practiceSet',
    //   intro: { heading: 'Practice: TODO', instruction: 'TODO', note: 'TODO' },
    //   items: [
    //     { id, kind: 'spot', label: 'Spot it', context, prompt,
    //       artifact: { label: 'AI answer', code: true|false },
    //       segments: [{ text: 'TODO' }, { text: 'TODO', flag: true }],
    //       explanation, takeaway },
    //     { id, kind: 'choose', label: 'Read the evidence' | 'Pick the test' | 'Fix it',
    //       context, prompt, artifact: { label, text, code },
    //       options: [{ id, label, correct: true, feedback }, { id, label, feedback }],
    //       explanation, takeaway },
    //     { id, kind: 'pickAll', label: 'Diagnose', prompt,
    //       options: [{ id, label, correct: true, feedback }, { id, label, feedback }],
    //       explanation, takeaway },
    //   ],
    //   scoring: { tiers: [{ min: 6, message }, { min: 4, message }, { min: 0, message }] },
    //   summary: { insight: 'TODO' },
    // },
    // { type: 'commands', ... }, { type: 'completion', ... }
  ],

  keyTakeaways: [
    // 'Short, memorable takeaway one.',
  ],

  checklist: {
    title: 'TODO: Your Detection Checklist',
    items: [
      // 'Checklist item one.',
    ],
  },
};

export const lesson = {
  id: 'pattern-NN',
  patternNumber: 0, // TODO
  title: 'TODO: Pattern Title',
  subtitle: 'TODO: one-line subtitle',
  description: 'TODO: one-sentence description of what the learner will spot.',
  estimatedTime: 10, // whole lesson, minutes (no per-phase times)

  skillLearned: 'TODO',
  verificationMethod: 'TODO',

  // Optional: real-world case study for credibility.
  caseStudy: {
    name: 'TODO',
    date: 'TODO',
    researcher: 'TODO',
    source: 'https://TODO',
  },

  // Optional: teaser for the next pattern.
  nextLesson: {
    id: 'pattern-NN+1',
    title: 'TODO',
    teaser: 'TODO',
  },

  phases: { see, test, observe, practice },
};

export default lesson;
