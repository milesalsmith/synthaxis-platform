// src/components/phases/blocks/ConceptBlocks.jsx
// Presentational blocks for teaching a concept (e.g. one "red flag").
//
//   { type: 'cardGrid', heading?, subtext?, cards: [{ emoji?, label }] }
//
//   { type: 'concept',
//     emoji?, eyebrow?, name, description,
//     compare?: { left: { label, tone, items[] }, right: { label, tone, items[] } },
//     rows?:    [{ label, tone?, variant?: 'quote'|'code'|'chips', value?, values? }],
//     note?, why?, spot? }
//
// One concept renders as a single full-screen step; the step-flow provides
// next/back. `accent` themes the eyebrow and the "why it happens" callout.

import React from 'react';

const TONE_TEXT = {
  danger: 'text-red-400',
  good: 'text-synthaxis-300',
  neutral: 'text-slate-400',
};
const TONE_LIST_BOX = {
  danger: 'bg-red-500/10 border-red-500/30',
  good: 'bg-synthaxis-500/10 border-synthaxis-500/30',
  neutral: 'bg-slate-800 border-slate-700',
};

export function CardGridBlock({ block }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {block.heading && (
        <h2 className="text-2xl font-semibold text-white">{block.heading}</h2>
      )}
      {block.subtext && <p className="text-lg text-slate-300">{block.subtext}</p>}
      <div className="grid grid-cols-2 gap-4">
        {block.cards.map((card, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
            {card.emoji && <span className="text-2xl">{card.emoji}</span>}
            <span className="text-white font-medium">{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConceptRow({ row }) {
  const toneText = TONE_TEXT[row.tone] || 'text-slate-400';
  return (
    <div>
      <span className={`text-sm ${toneText}`}>{row.label}</span>
      {row.variant === 'chips' ? (
        <div className="flex gap-2 mt-1">
          {(row.values || []).map((v, i) => (
            <code key={i} className="bg-slate-700 px-2 py-1 rounded text-white">{v}</code>
          ))}
        </div>
      ) : row.variant === 'code' ? (
        <code className={`block text-lg ${row.tone === 'danger' ? 'text-red-400' : 'text-white'}`}>
          {row.value}
        </code>
      ) : (
        <p className="text-white">{row.variant === 'quote' ? `"${row.value}"` : row.value}</p>
      )}
    </div>
  );
}

export function ConceptBlock({ block, accent }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        {block.emoji && <span className="text-4xl">{block.emoji}</span>}
        <div>
          {block.eyebrow && <div className={`text-sm ${accent.text}`}>{block.eyebrow}</div>}
          <h2 className="text-2xl font-semibold text-white">{block.name}</h2>
        </div>
      </div>

      {block.description && <p className="text-lg text-slate-300">{block.description}</p>}

      {block.compare && (
        <div className="grid grid-cols-2 gap-4">
          {['left', 'right'].map((side) => {
            const col = block.compare[side];
            if (!col) return null;
            return (
              <div key={side} className={`border rounded-xl p-4 ${TONE_LIST_BOX[col.tone] || TONE_LIST_BOX.neutral}`}>
                <div className={`text-sm font-medium mb-2 ${TONE_TEXT[col.tone] || 'text-slate-400'}`}>
                  {col.label}
                </div>
                <div className="space-y-1">
                  {col.items.map((ex, i) => (
                    <code key={i} className="block text-slate-300 text-sm">{ex}</code>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {block.rows && (
        <div className="bg-slate-800 rounded-xl p-5 space-y-3">
          {block.rows.map((row, i) => (
            <ConceptRow key={i} row={row} />
          ))}
          {block.note && <p className="text-slate-400 text-sm italic">{block.note}</p>}
        </div>
      )}

      {block.why && (
        <div className={`${accent.bg} border ${accent.border} rounded-xl p-4`}>
          <div className={`text-sm font-medium mb-1 ${accent.text}`}>Why it happens:</div>
          <p className="text-slate-300">{block.why}</p>
        </div>
      )}

      {block.spot && (
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="text-white font-medium mb-1">How to spot it:</div>
          <p className="text-slate-300">{block.spot}</p>
        </div>
      )}
    </div>
  );
}
