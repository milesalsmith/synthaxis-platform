// src/components/phases/PhaseRenderer.jsx
// Thin delegate to the generic, data-driven StepFlow engine.
//
// The four hand-written phase components (See/Test/Observe/Practice) that used
// to live here have been replaced by StepFlow + the block library in ./blocks.
// Every phase is now just { title, estimatedTime, steps: [block, ...] } authored
// in the pattern data file, so patterns 2-10 need no code changes here.
//
// Props (unchanged, passed straight through by LessonShell):
//   phase        'see' | 'test' | 'observe' | 'practice'
//   content      the phase object: { title, estimatedTime, steps }
//   onComplete   advance to the next phase (or finish the lesson)
//   onBack       go to the previous phase (null on the first phase)

import React from 'react';
import StepFlow from './StepFlow';

export default function PhaseRenderer(props) {
  // key={phase} forces StepFlow to remount when the phase changes, so its
  // internal step index/resolved state resets to 0 for each phase. Without this,
  // React reuses the same StepFlow instance across phases and the leftover index
  // (e.g. 5 from a 6-step SEE phase) points past a shorter phase's steps array,
  // rendering an undefined block ("Unknown block type: undefined").
  return <StepFlow key={props.phase} {...props} />;
}
