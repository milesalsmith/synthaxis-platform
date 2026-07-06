// src/components/phases/blocks/NarrativeBlocks.jsx
// Presentational blocks for the "reveal / impact / why it matters" beats.
//
//   { type: 'reveal', icon?, headline, explanation, list?: { title, items[] } }
//   { type: 'stats',  title?, items: [{ value, label, detail }], source? }
//   { type: 'points', heading?, items: [{ label, body, tone? }], conclusion?, transition? }
//
// `accent` is the phase theme object; numbered markers and stat values use it.

import React from 'react';
import { resolveIcon } from './blockKit';

export function RevealBlock({ block, accent }) {
  const Icon = resolveIcon(block.icon, null);
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        {Icon && <Icon className="w-16 h-16 text-red-400 mx-auto mb-4" />}
        <h2 className="text-3xl font-bold text-red-400">{block.headline}</h2>
      </div>

      {block.explanation && (
        <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line">
          {block.explanation}
        </p>
      )}

      {block.list && (
        <div className="bg-slate-800 rounded-xl p-6 space-y-4">
          {block.list.title && (
            <h3 className="font-semibold text-white">{block.list.title}</h3>
          )}
          <ol className="space-y-3">
            {block.list.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-300">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full ${accent.bg} ${accent.text} flex items-center justify-center text-sm font-medium`}
                >
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export function StatsBlock({ block, accent }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {block.title && (
        <h2 className="text-2xl font-semibold text-white text-center">{block.title}</h2>
      )}
      <div className="grid grid-cols-3 gap-4">
        {block.items.map((stat, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-6 text-center">
            <div className={`text-3xl font-bold ${accent.text}`}>{stat.value}</div>
            <div className="text-white font-medium mt-1">{stat.label}</div>
            <div className="text-slate-400 text-sm mt-1">{stat.detail}</div>
          </div>
        ))}
      </div>
      {block.source && (
        <p className="text-center text-slate-500 text-sm">{block.source}</p>
      )}
    </div>
  );
}

export function PointsBlock({ block }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {block.heading && (
        <h2 className="text-2xl font-semibold text-white">{block.heading}</h2>
      )}

      <div className="space-y-4">
        {block.items.map((point, i) => {
          const danger = point.tone === 'danger';
          return (
            <div
              key={i}
              className={`rounded-xl p-5 ${
                danger ? 'bg-red-500/10 border border-red-500/30' : 'bg-slate-800'
              }`}
            >
              <div className={`font-medium ${danger ? 'text-red-400' : 'text-slate-400'}`}>
                {point.label}
              </div>
              <div className="text-white mt-1">{point.body}</div>
            </div>
          );
        })}
      </div>

      {block.conclusion && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="text-amber-200">{block.conclusion}</p>
        </div>
      )}

      {block.transition && (
        <p className="text-slate-400 italic text-center">{block.transition}</p>
      )}
    </div>
  );
}
