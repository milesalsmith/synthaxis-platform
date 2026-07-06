// src/components/phases/blocks/ProseBlocks.jsx
// Presentational blocks for plain narrative content.
//
//   { type: 'prose', heading?, body? }           -> headline + pre-line paragraph
//   { type: 'chat',  user, ai: { text, note? } } -> user/AI chat bubbles
//
// `accent` is the phase theme object (see PHASE_CONFIG) so headings/etc. match
// the current phase color. Prose uses neutral text; accent is optional here.

import React from 'react';

export function ProseBlock({ block }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {block.heading && (
        <h2 className="text-2xl font-semibold text-white">{block.heading}</h2>
      )}
      {block.body && (
        <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line">
          {block.body}
        </p>
      )}
    </div>
  );
}

export function ChatBlock({ block }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* User message */}
      <div className="flex justify-end">
        <div className="bg-blue-600 rounded-2xl rounded-br-md px-5 py-3 max-w-md">
          <p className="text-white">{block.user}</p>
        </div>
      </div>

      {/* AI response */}
      <div className="flex justify-start">
        <div className="bg-slate-700 rounded-2xl rounded-bl-md px-5 py-4 max-w-2xl">
          <div className="prose prose-invert prose-sm">
            <div className="text-slate-200 whitespace-pre-line font-mono text-sm">
              {block.ai.text}
            </div>
          </div>
          {block.ai.note && (
            <p className="text-xs text-slate-400 mt-3 italic">{block.ai.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}
