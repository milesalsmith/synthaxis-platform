// src/components/phases/blocks/CommandsBlock.jsx
// Presentational block: a set of collapsible CLI commands + optional quick ref.
//
//   { type: 'commands',
//     icon?, heading?, subtext?,
//     commands: [{ title, ecosystem, command, output?, whatToLookFor? }],
//     quickReference?: { title, steps[] } }
//
// `accent` themes the header icon, the `$` prompt, and the quick-reference card.

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { resolveIcon } from './blockKit';

const ECOSYSTEM_BADGE = {
  pip: 'bg-blue-500/20 text-blue-400',
  npm: 'bg-red-500/20 text-red-400',
};

export function CommandsBlock({ block, accent }) {
  const [expanded, setExpanded] = useState(null);
  const Icon = resolveIcon(block.icon, null);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        {Icon && <Icon className={`w-12 h-12 ${accent.text} mx-auto mb-3`} />}
        {block.heading && (
          <h2 className="text-2xl font-semibold text-white">{block.heading}</h2>
        )}
        {block.subtext && <p className="text-slate-400 mt-2">{block.subtext}</p>}
      </div>

      <div className="space-y-3">
        {block.commands.map((cmd, i) => (
          <div key={i} className="bg-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                    ECOSYSTEM_BADGE[cmd.ecosystem] || 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {cmd.ecosystem.toUpperCase().slice(0, 3)}
                </div>
                <span className="text-white font-medium">{cmd.title}</span>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-slate-400 transition-transform ${expanded === i ? 'rotate-90' : ''}`}
              />
            </button>

            {expanded === i && (
              <div className="px-4 pb-4 space-y-3 animate-fadeIn">
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm">
                  <span className={accent.text}>$</span>
                  <span className="text-slate-300 ml-2">{cmd.command}</span>
                </div>
                {cmd.output && (
                  <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-400 whitespace-pre-line">
                    {cmd.output}
                  </div>
                )}
                {cmd.whatToLookFor && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-amber-200">
                    <strong>What to look for:</strong> {cmd.whatToLookFor}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {block.quickReference && (
        <div className={`${accent.bg} border ${accent.border} rounded-xl p-5`}>
          <h4 className={`${accent.text} font-medium mb-3`}>{block.quickReference.title}</h4>
          <ol className="space-y-2">
            {block.quickReference.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <span className={`w-6 h-6 rounded-full ${accent.bg} flex items-center justify-center ${accent.text} text-sm font-bold flex-shrink-0`}>
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
