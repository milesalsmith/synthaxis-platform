// src/components/phases/blocks/DrillBlock.jsx
// Self-navigating interactive block that wraps the timed DrillMode. DrillMode
// runs its own countdown / item flow and calls onComplete when finished, so the
// step-flow hides its footer and lets the drill drive advancement.
//
//   { type: 'drill', title?, subtitle?, description?, targetTime?, items? }
//
// Content props are forwarded to DrillMode; when omitted, DrillMode falls back
// to its built-in defaults (backward compatible).

import React, { Suspense } from 'react';

const DrillMode = React.lazy(() => import('../../DrillMode'));

export function DrillBlock({ block, onComplete }) {
  return (
    <div className="animate-fadeIn">
      <Suspense
        fallback={
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading drill...</p>
          </div>
        }
      >
        <DrillMode
          title={block.title}
          subtitle={block.subtitle}
          description={block.description}
          targetTime={block.targetTime}
          items={block.items}
          onComplete={onComplete}
        />
      </Suspense>
    </div>
  );
}
