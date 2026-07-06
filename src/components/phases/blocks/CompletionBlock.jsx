// src/components/phases/blocks/CompletionBlock.jsx
// Presentational block: end-of-phase summary with an optional checklist and a
// "what's next" callout.
//
//   { type: 'completion',
//     icon?, title, summary?,
//     checklist?: { title, items[] },
//     next?: { label?, body } }
//
// `accent` themes the header icon, checklist marks, and the next-step callout.

import React from 'react';
import { Check, CheckCircle2, ArrowRight } from 'lucide-react';

export function CompletionBlock({ block, accent }) {
  const next = block.next;
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <CheckCircle2 className={`w-16 h-16 ${accent.text} mx-auto mb-4`} />
        <h2 className="text-2xl font-semibold text-white">{block.title}</h2>
      </div>

      {block.summary && (
        <p className="text-slate-300 text-center">{block.summary}</p>
      )}

      {block.checklist && (
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">{block.checklist.title}</h3>
          <div className="space-y-3">
            {block.checklist.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 ${accent.border} flex items-center justify-center`}>
                  <Check className={`w-3 h-3 ${accent.text}`} />
                </div>
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {next && (
        <div className={`${accent.bg} border ${accent.border} rounded-xl p-4`}>
          <div className={`flex items-center gap-2 ${accent.text} font-medium mb-1`}>
            <ArrowRight className="w-4 h-4" />
            {next.label || 'Up Next'}
          </div>
          <p className="text-slate-300">{next.body}</p>
        </div>
      )}
    </div>
  );
}
