// src/components/phases/blocks/SpotTheFlawBlock.jsx
// Interactive single-screen block: the learner taps the parts of an AI answer
// that deserve testing. Each tap explains itself: flagged parts reveal the
// problem, ordinary parts explain why they check out. StepFlow keeps Continue
// gated until every flag is found (or the learner asks to see the rest).
//
//   { type: 'spotTheFlaw',
//     heading, instruction?,
//     source?,            // small label above the text, e.g. 'From the AI answer'
//     code?: boolean,     // monospace + preserved line breaks
//     segments: [{ text, flag?: { label, explanation }, note? }],
//     summary? }          // shown once every flag is found
//
// Authoring: split the text into 6-12 meaningful chunks (including the boring
// ones) so the clickable areas don't give the answer away. Whitespace-only
// segments render as plain text.

import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle2, Eye } from 'lucide-react';

export function SpotTheFlawBlock({ block, accent, onResolved }) {
  const [picked, setPicked] = useState([]); // segment indexes in tap order
  const [revealed, setRevealed] = useState(false);

  const segments = block.segments || [];
  const flagIdx = segments.map((s, i) => (s.flag ? i : -1)).filter((i) => i >= 0);
  const found = flagIdx.filter((i) => picked.includes(i));
  const allFound = found.length === flagIdx.length;
  const done = allFound || revealed;

  const tap = (i) => {
    if (picked.includes(i) || !segments[i].text.trim()) return;
    const next = [...picked, i];
    setPicked(next);
    if (flagIdx.every((f) => next.includes(f))) onResolved && onResolved();
  };

  const revealRest = () => {
    setRevealed(true);
    onResolved && onResolved();
  };

  const segmentClass = (s, i) => {
    const isPicked = picked.includes(i);
    const showFlag = s.flag && (isPicked || revealed);
    if (showFlag) return 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-500/50';
    if (isPicked) return 'bg-slate-700/60 text-slate-400';
    return 'hover:bg-slate-700/70 cursor-pointer border-b border-dashed border-slate-600';
  };

  // Findings panel: everything tapped (in order), plus unfound flags once revealed.
  const findings = [
    ...picked,
    ...(revealed ? flagIdx.filter((i) => !picked.includes(i)) : []),
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-semibold text-white">{block.heading}</h2>
        {block.instruction && <p className="text-slate-400 mt-2">{block.instruction}</p>}
      </div>

      <div className="bg-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            {block.source || 'Tap the parts you would test'}
          </span>
          <span className={`text-xs font-medium ${accent.text}`}>
            Found {found.length} of {flagIdx.length}
          </span>
        </div>
        <div
          className={`bg-slate-900 rounded-lg p-4 leading-8 text-slate-200 ${
            block.code ? 'font-mono text-sm whitespace-pre-wrap' : 'text-base whitespace-pre-line'
          }`}
        >
          {segments.map((s, i) =>
            s.text.trim() ? (
              <span
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => tap(i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && tap(i)}
                className={`rounded px-0.5 transition-colors ${segmentClass(s, i)}`}
              >
                {s.text}
              </span>
            ) : (
              <span key={i}>{s.text}</span>
            )
          )}
        </div>
      </div>

      {findings.length > 0 && (
        <div className="space-y-2">
          {findings.map((i) => {
            const s = segments[i];
            return s.flag ? (
              <div key={i} className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 animate-fadeIn">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-amber-300 font-medium">
                    {picked.includes(i) ? s.flag.label : `Missed: ${s.flag.label}`}
                  </div>
                  <div className="text-slate-300 text-sm">{s.flag.explanation}</div>
                </div>
              </div>
            ) : (
              <div key={i} className="flex items-start gap-3 bg-slate-800/60 border border-slate-700 rounded-lg p-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div className="text-slate-400 text-sm">
                  <span className="text-slate-300">"{s.text.trim().slice(0, 60)}{s.text.trim().length > 60 ? '...' : ''}"</span>{' '}
                  {s.note || 'On its own, this part is not the problem.'}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {done && block.summary && (
        <div className={`${accent.bg} border ${accent.border} rounded-xl p-4 animate-fadeIn`}>
          <p className="text-slate-200">{block.summary}</p>
        </div>
      )}

      {!done && picked.length > 0 && (
        <button
          onClick={revealRest}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Eye className="w-4 h-4" />
          Show me what I missed
        </button>
      )}
    </div>
  );
}
