# Pattern Authoring Guide

How to add one of the 10 hallucination-pattern lessons to Synthaxis. **Authoring a
pattern is pure content** — you write one data file and register it. You never edit
component code.

## Fastest path: hand off a rough draft

You don't have to write the data file by hand. Copy
`content-drafts/_DRAFT_TEMPLATE.md`, brain-dump the lesson (link to the real
hallucination + rough questions/red flags — bullet points are fine), and hand it
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
- Each phase is `{ title, estimatedTime, steps: [...] }`.
- Each **step** is one **block**: `{ type, ...props }`.
- **One block = one screen.** `StepFlow` renders blocks in order, draws the progress
  dots, and owns navigation.

## Step 1 — Create the file

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

## Step 2 — Register it

Two small edits in `src/utils/patternLoader.js`:

1. **Add the lazy import** to the loader map (uncomment the line for your number):

   ```js
   2: () => import('../data/patterns/pattern-02-plausible-syntax.js'),
   ```

2. **Flip the status** in `curriculumMetadata.patterns` from `'coming'` to
   `'available'` for that pattern.

That's it — the card unlocks and `/learn/2` routes to it.

## Step 3 — Validate

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
| `choice` | **interactive** | Pick one option → response |
| `matching` | **interactive** | Match prompts to answers |
| `judgementSet` | **self-nav** | The TEST quiz |
| `drill` | **self-nav** | Rapid verification drill |
| `completion` | **self-nav** | Final summary card |

### Two block behaviours to know

- **Interactive** (`choice`, `matching`): single-screen. `StepFlow` **gates the
  Continue button** until the learner answers.
- **Self-navigating** (`judgementSet`, `drill`, `completion`): the block owns its own
  next/back, so `StepFlow` **hides the footer** and lets the block drive.

## Two content rules that matter

1. **`keyTakeaways` and `checklist` live on the `practice` phase object**, *not* inside
   a step. `LessonShell`'s final "Pattern Learned!" screen renders them for every
   pattern automatically. Keep them exactly where the template puts them — and **do
   NOT also put a `checklist` on the `completion` block**, or it renders twice. The
   `completion` block is a light in-flow beat: `title` + `summary` + `next` teaser only.

2. **`judgementSet` item correctness** is data: each item needs
   `correct: 'trust' | 'verify'` and `tone: 'good' | 'bad'`. Scoring is derived from
   these — there is no per-pattern quiz code.

## The `drill` block

The drill is fully content-driven. Supply your own package set via `items`; omit it to
fall back to the built-in default set.

```js
{
  type: 'drill',
  title: 'The Verification Drill',   // frames the intro (optional)
  subtitle: '…', description: '…',    // optional
  targetTime: '~2min',               // shown as the "target" stat (optional)
  items: [
    {
      name: 'requests',
      isReal: true,
      difficulty: 'easy',
      registry: {
        downloads: '50,234,891', lastUpdate: '3 days ago',
        firstRelease: 'Feb 2011', maintainers: ['…'], hasRepo: true, versions: 142,
      },
      explanation: 'Why this call is right…',
      learnPoint: 'The lesson to remember…',
    },
    // …the intro's package count and real/fake tally are computed from items.
  ],
}
```

## Adding a brand-new block type (rare)

Only needed if a pattern requires a screen shape none of the 15 blocks cover:

1. Add a component in `src/components/phases/blocks/`.
2. Register it in `REGISTRY` in
   `src/components/phases/blocks/BlockRenderer.jsx` (one line).
3. If it self-navigates or is interactive, declare it in the sets in
   `src/components/phases/blocks/blockKit.js` (`INTERACTIVE_TYPES` /
   `SELF_NAV_TYPES`) so `StepFlow` handles its footer/gating correctly.

For all normal authoring you should never need this.
```
