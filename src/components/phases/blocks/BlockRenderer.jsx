// src/components/phases/blocks/BlockRenderer.jsx
// Dispatches a block data object to its component. This is the single seam the
// step-flow renders through; adding a new block type = add a component + one
// entry in REGISTRY here.
//
// Props threaded to blocks:
//   accent      - phase theme object (PHASE_CONFIG entry)
//   onResolved  - single-screen interactive blocks call this once answered
//   onComplete  - self-navigating blocks call this to advance past themselves
//   onBack      - self-navigating blocks may call this to go back

import React from 'react';
import { ProseBlock, ChatBlock } from './ProseBlocks';
import { RevealBlock, StatsBlock, PointsBlock } from './NarrativeBlocks';
import { MethodBlock } from './MethodBlock';
import { CommandsBlock } from './CommandsBlock';
import { CompletionBlock } from './CompletionBlock';
import { CardGridBlock, ConceptBlock } from './ConceptBlocks';
import { RegistryBlock } from './RegistryBlock';
import { ChoiceBlock, MatchingBlock } from './InteractiveSingle';
import { JudgementSetBlock } from './JudgementSetBlock';
import { DrillBlock } from './DrillBlock';

const REGISTRY = {
  prose: ProseBlock,
  chat: ChatBlock,
  reveal: RevealBlock,
  stats: StatsBlock,
  points: PointsBlock,
  method: MethodBlock,
  commands: CommandsBlock,
  completion: CompletionBlock,
  cardGrid: CardGridBlock,
  concept: ConceptBlock,
  registry: RegistryBlock,
  choice: ChoiceBlock,
  matching: MatchingBlock,
  judgementSet: JudgementSetBlock,
  drill: DrillBlock,
};

export default function BlockRenderer({ block, accent, onResolved, onComplete, onBack }) {
  const Component = REGISTRY[block?.type];

  if (!Component) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
        Unknown block type: <code>{String(block?.type)}</code>
      </div>
    );
  }

  return (
    <Component
      block={block}
      accent={accent}
      onResolved={onResolved}
      onComplete={onComplete}
      onBack={onBack}
    />
  );
}
