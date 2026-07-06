// src/data/patterns/_TEMPLATE.js
// ---------------------------------------------------------------------------
// PATTERN AUTHORING TEMPLATE  (block-based schema)
// ---------------------------------------------------------------------------
// Copy this file to pattern-NN-<slug>.js and fill it in. Authoring a new
// pattern is PURE CONTENT — you never touch component code. Each phase is a
// list of `steps`, and every step is one "block" object: { type, ...props }.
// One block = one screen. StepFlow renders them in order, shows progress dots,
// and handles all navigation.
//
// The 15 available block types (registered in
// src/components/phases/blocks/BlockRenderer.jsx):
//
//   NARRATIVE / PROSE
//     prose       — headline + paragraphs of copy
//     chat        — an AI-chat mock (question + selectable replies)
//     reveal      — "here's what actually happened" reveal card
//     stats       — big impact numbers
//     points      — bulleted takeaway points
//
//   CONCEPT / TEACHING
//     cardGrid    — grid of concept cards
//     concept     — a single red-flag / concept screen (compare + rows;
//                   supports quote/code/chips variants)
//     method      — numbered step-by-step method (number/action/detail/time)
//     commands    — copyable command snippets (title + code)
//     registry    — package-registry preview (layout: 'single' | 'compare')
//
//   INTERACTIVE  (single-screen — StepFlow gates "Continue" until answered)
//     choice      — pick one option, get a response
//     matching    — match prompts to answers (items have correct/extra)
//
//   SELF-NAVIGATING (block owns its own next/back; StepFlow hides the footer)
//     judgementSet — the TEST quiz (items have correct:'trust'|'verify',
//                    tone:'good'|'bad')
//     drill        — the rapid verification drill (see DrillMode props below)
//     completion   — light in-flow "pattern learned" beat: title + summary +
//                    next teaser. Do NOT give it a checklist — LessonShell's
//                    final screen renders the phase-level keyTakeaways/checklist.
//
// PROP-LEVEL REFERENCE: pattern-01-confident-fabrication.js is the canonical,
// known-good worked example of every block above. When you need the exact
// fields for a block, copy that block from pattern-01 and edit the content.
// ---------------------------------------------------------------------------

// ── SEE: hook them with a real story ──────────────────────────────────────
const see = {
  title: 'TODO: phase title',
  estimatedTime: 3, // minutes
  steps: [
    // e.g. { type: 'prose', ... }, { type: 'chat', ... },
    // { type: 'choice', ... }, { type: 'reveal', ... },
    // { type: 'stats', ... }, { type: 'points', ... },
  ],
};

// ── TEST: prime their intuition with a quiz ───────────────────────────────
const test = {
  title: 'TODO: phase title',
  estimatedTime: 4,
  steps: [
    // Typically a single self-navigating judgementSet block:
    // { type: 'judgementSet', title, items: [{ ..., correct: 'trust'|'verify', tone: 'good'|'bad' }] }
  ],
};

// ── OBSERVE: teach the red flags ──────────────────────────────────────────
const observe = {
  title: 'TODO: phase title',
  estimatedTime: 5,
  steps: [
    // e.g. { type: 'cardGrid', ... }, one { type: 'concept', ... } per red flag,
    // then a { type: 'matching', ... } check and a { type: 'method', ... } recap.
  ],
};

// ── PRACTICE: apply it, then wrap up ──────────────────────────────────────
// NOTE: keyTakeaways + checklist live on the phase (NOT inside a step).
// LessonShell's final "Pattern Learned!" screen renders them automatically for
// every pattern. Keep them here — and do NOT duplicate the checklist on the
// completion block, or it shows twice.
const practice = {
  title: 'TODO: phase title',
  estimatedTime: 6,
  steps: [
    // e.g. { type: 'registry', ... }, { type: 'drill', ... },
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

// ── DRILL block props (content-driven DrillMode) ──────────────────────────
// {
//   type: 'drill',
//   title, subtitle, description,   // frame the drill intro (optional)
//   targetTime: '~2min',            // shown as the "target" stat (optional)
//   items: [                        // omit to fall back to the built-in set
//     {
//       name, isReal: true|false, difficulty: 'easy'|'medium'|'hard',
//       registry: { downloads, lastUpdate, firstRelease, maintainers: [], hasRepo, versions },
//       explanation, learnPoint,
//     },
//   ],
// }

export const lesson = {
  id: 'pattern-NN',
  patternNumber: 0, // TODO
  title: 'TODO: Pattern Title',
  subtitle: 'TODO: one-line subtitle',
  description: 'TODO: one-sentence description of what the learner will spot.',
  estimatedTime: 15,

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
