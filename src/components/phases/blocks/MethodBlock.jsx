// src/components/phases/blocks/MethodBlock.jsx
// Presentational block for a named verification method / procedure.
//
//   { type: 'method',
//     icon?, name, tagline?,
//     steps: [{ number, action, detail, time? }],
//     columns?: { good?: { label, items[] }, warn?: { label, items[] } },
//     footer? }
//
// `accent` themes the header icon, step markers, and footer callout.

import React from 'react';
import { resolveIcon } from './blockKit';

export function MethodBlock({ block, accent }) {
  const Icon = resolveIcon(block.icon, null);
  const cols = block.columns || {};

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        {Icon && <Icon className={`w-12 h-12 ${accent.text} mx-auto mb-3`} />}
        <h2 className="text-2xl font-semibold text-white">{block.name}</h2>
        {block.tagline && <p className={accent.text}>{block.tagline}</p>}
      </div>

      <div className="space-y-3">
        {block.steps.map((step) => (
          <div key={step.number} className="bg-slate-800 rounded-xl p-4 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full ${accent.bg} flex items-center justify-center flex-shrink-0`}>
              <span className={`${accent.text} font-bold`}>{step.number}</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">{step.action}</div>
              <div className="text-slate-400 text-sm">{step.detail}</div>
            </div>
            {step.time && <div className="text-slate-500 text-sm">{step.time}</div>}
          </div>
        ))}
      </div>

      {(cols.good || cols.warn) && (
        <div className="grid grid-cols-2 gap-4">
          {cols.good && (
            <div className="bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-xl p-4">
              <div className="text-synthaxis-300 text-sm font-medium mb-2">{cols.good.label}</div>
              <ul className="space-y-1">
                {cols.good.items.map((item, i) => (
                  <li key={i} className="text-slate-300 text-sm">• {item}</li>
                ))}
              </ul>
            </div>
          )}
          {cols.warn && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <div className="text-amber-400 text-sm font-medium mb-2">{cols.warn.label}</div>
              <ul className="space-y-1">
                {cols.warn.items.map((item, i) => (
                  <li key={i} className="text-slate-300 text-sm">• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {block.footer && (
        <div className={`${accent.bg} border ${accent.border} rounded-xl p-4 text-center`}>
          <p className="text-slate-200">{block.footer}</p>
        </div>
      )}
    </div>
  );
}
