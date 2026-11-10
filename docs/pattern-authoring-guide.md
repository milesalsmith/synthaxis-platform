# Pattern Authoring Guide

How to add one of the 10 hallucination-pattern lessons to Synthaxis. **Authoring a
pattern is pure content.** You write one data file and register it. You never edit
component code.

## Fastest path: hand off a rough draft

You don't have to write the data file by hand. Copy
`content-drafts/_DRAFT_TEMPLATE.md`, brain-dump the lesson (link to the real
hallucination + rough questions/red flags; bullet points are fine), and hand it
back. The rough draft gets converted into a validated, registered
`pattern-NN-<slug>.js`. The rest of this doc explains the schema that conversion
targets, for when you want to read or tweak the result.

## The model in one picture

```
LessonShell  →  PhaseRenderer  →  StepFlow  →  BlockRenderer  →  <block components>
                                     ↑              ↑
                              reads phase.steps   picks a component by block.type
```

- A lesson has four **phases**: `see`, `test`, `observe`, `practice`.
- Each phase is `{ title, steps: [...] }`. Don't add per-phase time estimates; the
  lesson as a whole is about 10 minutes (`lesson.estimatedTime: 10`).
- Each **step** is one **block**: `{ type, ...props }`.
- **One block = one screen.** `StepFlow` renders blocks in order, draws the progress
  dots, and owns navigation.

## Step 1: Create the file

Copy the template:

```bash
cp src/data/patterns/_TEMPLATE.js \
   src/data/patterns/pattern-02-plausible-syntax.js
```

Fill in the top-level metadata and the four phase `steps` arrays. The template lists
every available block type and its purpose. For the **exact props** of any block, copy
that block from the canonical worked example:

> **`src/data/patterns/pattern-01-confident-fabrication.js`** is the reference
> implementation of every block. When in doubt, copy a block from pattern-01 and edit
> the content.

## Step 2: Register it

Two small edits in `src/utils/patternLoader.js`:

1. **Add the lazy import** to the loader map (uncomment the line for your number):

   ```js
   2: () => import('../data/patterns/pattern-02-plausible-syntax.js'),
   ```

2. **Flip the status** in `curriculumMetadata.patterns` from `'coming'` to
   `'available'` for that pattern.

That's it. The card unlocks and `/learn/2` routes to it.

## Step 3: Validate

Fast syntax + shape check (no full build needed):

```bash
npx esbuild src/data/patterns/pattern-02-plausible-syntax.js \
  --bundle --format=esm --outfile=/tmp/p.js && rm /tmp/p.js
```

Then run the app and click through all four phases:

```bash
npm run dev   # http://localhost:3000/learn/2
```

## Block catalogue

| Type | Category | What it is |
|------|----------|-----------|
| `prose` | narrative | Headline + paragraphs |
| `chat` | narrative | AI-chat mock (question + replies) |
| `reveal` | narrative | "Here's what actually happened" card |
| `stats` | narrative | Big impact numbers |
| `points` | narrative | Bulleted takeaways |
| `cardGrid` | teaching | Grid of concept cards |
| `concept` | teaching | One red-flag screen (compare + rows; quote/code/chips variants) |
| `method` | teaching | Numbered method (`number`/`action`/`detail`/`time`) |
| `commands` | teaching | Copyable command snippets |
| `registry` | teaching | Package-registry preview (single or compare layout) |
| `completion` | narrative | Final summary card |
| `choice` | **interactive** | Pick one option → response |
| `matching` | **interactive** | Match prompts to answers |
| `spotTheFlaw` | **interactive** | TEST step 1: tap the parts of the SEE artifact worth testing |
| `investigation` | **self-nav** | TEST step 2: run real tests on the claim, then a verdict and test kit |
| `practiceSet` | **self-nav** | PRACTICE drill: varied exercises (spot it, read the evidence, pick the test, fix it) |
| `judgementSet` | **self-nav** | Legacy trust-or-verify set (no longer used by any pattern) |
| `drill` | **self-nav** | Legacy real-or-fake package drill (no longer used by any pattern) |

### Two block behaviours to know

- **Interactive** (`choice`, `matching`, `spotTheFlaw`): single-screen. `StepFlow`
  **gates the Continue button** until the learner answers.
- **Self-navigating** (`investigation`, `practiceSet`, `judgementSet`, `drill`): the block owns its
  own next/back, so `StepFlow` **hides the footer** and lets the block drive.

## TEST phase format

TEST is always exactly two steps, `[spotTheFlaw, investigation]`, and both are built
from the case the learner just saw in SEE (the same command, citation, figure or
code). Don't bring in a new example. `test` in `pattern-01-confident-fabrication.js`
is the canonical version.

```js
const test = {
  title: '…',
  steps: [
    { type: 'spotTheFlaw', … },    // 1. which parts are worth testing?
    { type: 'investigation', … },  // 2. run the tests, make the call
  ],
};
```

**1. `spotTheFlaw`**: the SEE artifact, split into `segments`.

- Split the text into 6-12 chunks, boring ones included, so the clickable areas don't
  give the answer away. Whitespace-only segments (`' '`, `'\n\n'`) render as plain text.
- Mark the 2-3 parts worth testing with `flag: { label, explanation }`. The
  explanation says why this part needs checking.
- Give ordinary segments a `note` saying why they check out. Without one the learner
  gets a generic "not the problem" line.
- `source` labels the box, `code: true` suits commands and code, and `summary` shows
  once every flag is found. Use it to lead into the tests.
- Continue stays locked until every flag is found or the learner reveals the rest.

**2. `investigation`**: the learner runs real checks on the flagged claim.

- `claim: { label?, text, code? }` is the exact thing under test.
- Write 3 `rounds` (`title`, `question`, `options`), one per test. Each round needs at
  least 1 `useful: true` option and at least 1 `useful: false` option. A round passes
  once the learner has run a useful test.
- Useless options must teach why they fail (asking the AI if it's sure, counting
  mentions, running the thing to see what happens). Put the reason in `feedback`.
- `result` is what the test returns (shown monospace) and `resultLabel` says where it
  came from. Results must be real, with the source and date checked (pattern-01 notes
  them in a comment and in `resultLabel`), or labelled 'Illustrative' in `resultLabel`.
- Give each useful option a short `kit` line. The closing test kit lists them in
  round order (falling back to `label`).
- `verdict: { question, options }`: about 3 options, exactly one `correct: true`, and
  every option gets `feedback`.
- `kit: { title?, footer? }` frames the closing screen.

## Two content rules that matter

1. **`keyTakeaways` and `checklist` live on the `practice` phase object**, *not* inside
   a step. `LessonShell`'s final "Pattern Learned!" screen renders them for every
   pattern automatically. Keep them exactly where the template puts them, and **do
   NOT also put a `checklist` on the `completion` block**, or it renders twice. The
   `completion` block is a light in-flow beat: `title` + `summary` + `next` teaser only.

2. **Correctness is data.** In `practiceSet`, correct answers are flagged segments
   or options with `correct: true`. Scoring is derived from these, so there is no
   per-pattern quiz code.

## PRACTICE phase format

PRACTICE is `[practiceSet, commands, completion]`. Pattern 1 also opens with a
`registry` compare screen. `practice` in `pattern-01-confident-fabrication.js` is the
canonical version.

Practice must not be a row of identical binary buttons. A `practiceSet` is 5-6
items using fresh examples (not the SEE/TEST case) that drill this pattern's red
flags. Mix the item kinds and badge labels:

| Kind | What the learner does | Typical labels |
|------|-----------------------|----------------|
| `spot` | Taps the wrong part of an artifact, or "Nothing wrong here" | Spot it |
| `choose` | Picks one answer | Read the evidence, Pick the test, Diagnose, Fix it |
| `pickAll` | Selects every option that applies, then checks | Diagnose, Odd one out |

Rules:

- Use at least 3 kinds and 4 labels, in an unpredictable order.
- At least one item is entirely fine (a `spot` with no flags). Checking is not the
  same as distrusting.
- `spot`: split the artifact into 5-10 `segments`, dull ones included; mark the wrong
  ones `flag: true`. Any flagged segment counts as correct.
- **Read the evidence** shows the real result of a check (registry output, a docs
  excerpt, a calculator result) and asks what it means. **Pick the test** offers
  plausible weak checks (ask the AI, popularity, looks professional) that each
  explain why they fail. **Fix it** asks for the corrected version.
- Every wrong option gets `feedback`; every item gets an `explanation` and a one-line
  `takeaway` (shown on the results screen).
- Add `intro: { heading, instruction, note }`, `scoring.tiers` (top tier `min` equals
  the item count) and `summary.insight`.
- Facts follow the same rules as TEST: real and checked (note the source and date in
  a comment), or labelled illustrative in the artifact label. Names presented as
  invented must be checked to not exist (a 404 on the registry, no Crossref match).

```js
{
  type: 'practiceSet',
  intro: { heading: 'Practice: …', instruction: '…', note: '…' },
  items: [
    { id, kind: 'spot', label: 'Spot it', context, prompt,
      artifact: { label: 'AI answer', code: true },
      segments: [{ text: '…' }, { text: '…', flag: true }],
      explanation, takeaway },
    { id, kind: 'choose', label: 'Read the evidence', context, prompt,
      artifact: { label: 'Terminal', code: true, text: '…' },
      options: [{ id, label, correct: true, feedback }, { id, label, feedback }],
      explanation, takeaway },
    { id, kind: 'pickAll', label: 'Diagnose', prompt, artifact?,
      options: [{ id, label, correct: true, feedback }, …],
      explanation, takeaway },
  ],
  scoring: { tiers: [{ min: 6, message }, { min: 4, message }, { min: 0, message }] },
  summary: { insight: '…' },
}
```

Set `optionsCode: true` on an item to render its options in monospace (useful for
"Fix it" items with commands or code).

## Adding a brand-new block type (rare)

Only needed if a pattern requires a screen shape none of the 18 blocks cover:

1. Add a component in `src/components/phases/blocks/`.
2. Register it in `REGISTRY` in
   `src/components/phases/blocks/BlockRenderer.jsx` (one line).
3. If it self-navigates or is interactive, declare it in the sets in
   `src/components/phases/blocks/blockKit.js` (`INTERACTIVE_TYPES` /
   `SELF_NAV_TYPES`) so `StepFlow` handles its footer/gating correctly.

For all normal authoring you should never need this.
```
