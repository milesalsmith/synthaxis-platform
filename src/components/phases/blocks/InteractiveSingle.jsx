// src/components/phases/blocks/InteractiveSingle.jsx
// Single-screen interactive blocks. Each manages its own answer state and calls
// onResolved() once the learner has engaged enough to advance; the step-flow
// keeps its shared "Continue" disabled until then.
//
//   { type: 'choice', question, subtext?, options: [{ id, label, response? }] }
//
//   { type: 'matching', title, instruction,
//     options: [{ id, emoji?, label }],
//     items:  [{ prompt, correct, explanation, extra?: { id, label } }] }

import React, { useState } from 'react';

// --- choice: pick one option, see its response ---------------------------
export function ChoiceBlock({ block, accent, onResolved }) {
  const [answer, setAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const pick = (option) => {
    if (answer !== null) return;
    setAnswer(option.id);
    setFeedback(option.response || null);
    onResolved && onResolved({ answer: option.id });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-white">{block.question}</h2>
      {block.subtext && <p className="text-slate-400">{block.subtext}</p>}

      <div className="space-y-3">
        {block.options.map((option) => (
          <button
            key={option.id}
            onClick={() => pick(option)}
            disabled={answer !== null}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              answer === option.id
                ? `${accent.border} ${accent.bg}`
                : answer !== null
                ? 'border-slate-700 bg-slate-800/50 opacity-50'
                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
            }`}
          >
            <p className="text-white">{option.label}</p>
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`${accent.bg} border ${accent.border} rounded-xl p-4 animate-fadeIn`}>
          <p className="text-slate-200">{feedback}</p>
        </div>
      )}
    </div>
  );
}

// --- matching: assign a category to each item ----------------------------
export function MatchingBlock({ block, accent, onResolved }) {
  const [answers, setAnswers] = useState({});

  const answer = (itemIndex, choiceId) => {
    if (answers[itemIndex]) return;
    const next = { ...answers, [itemIndex]: choiceId };
    setAnswers(next);
    if (Object.keys(next).length >= block.items.length) {
      onResolved && onResolved({ answers: next });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-white">{block.title}</h2>
      {block.instruction && <p className="text-slate-400">{block.instruction}</p>}

      <div className="space-y-4">
        {block.items.map((item, i) => {
          const chosen = answers[i];
          const correct = chosen === item.correct;
          return (
            <div key={i} className="bg-slate-800 rounded-xl p-5">
              <code className="text-lg text-white block mb-3">{item.prompt}</code>

              {!chosen && (
                <div className="flex flex-wrap gap-2">
                  {block.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => answer(i, opt.id)}
                      className={`px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-sm transition-all hover:${accent.bg} hover:${accent.text}`}
                    >
                      {opt.emoji ? `${opt.emoji} ` : ''}{opt.label}
                    </button>
                  ))}
                  {item.extra && (
                    <button
                      onClick={() => answer(i, item.extra.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-synthaxis-500/20 hover:text-synthaxis-200 text-slate-300 text-sm transition-all"
                    >
                      {item.extra.label}
                    </button>
                  )}
                </div>
              )}

              {chosen && (
                <div className={`mt-3 p-3 rounded-lg border ${
                  correct
                    ? 'bg-synthaxis-500/10 border-synthaxis-500/30'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}>
                  <p className={correct ? 'text-synthaxis-200' : 'text-amber-300'}>
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
