// src/components/phases/blocks/PracticeSetBlock.jsx
// Self-navigating PRACTICE drill made of varied exercise types, so practice is
// not a row of identical binary buttons. Each item is one screen; the learner
// gets one attempt, then sees the explanation. A results screen closes the set.
//
//   { type: 'practiceSet',
//     intro: { heading, instruction?, note? },
//     items: [ item, ... ],                 // 5-6 items, mix the kinds
//     scoring?: { tiers: [{ min, message }] },
//     summary?: { insight } }
//
// Item kinds (every item: { id, kind, label, context?, prompt, explanation,
// takeaway? }; label is the badge, e.g. 'Spot it', 'Diagnose', 'Pick the test',
// 'Fix it', 'Read the evidence', 'Odd one out'):
//
//   kind: 'spot'      tap the part that is wrong.
//     artifact: { label?, code? }, segments: [{ text, flag?: true }]
//     A clean item has no flags: the right answer is "Nothing wrong here".
//     Any flagged segment counts as correct.
//
//   kind: 'choose'    pick one answer.
//     artifact?: { label?, text, code? },
//     options: [{ id, label, correct?: true, feedback? }]
//
//   kind: 'pickAll'   select every option that applies, then check.
//     artifact?: { label?, text, code? },
//     options: [{ id, label, correct?: true, feedback? }]
//     Correct only if the selection matches exactly.

import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, CheckCircle2, XCircle, Target, Quote, Trophy, ShieldCheck,
} from 'lucide-react';

const isCorrect = (item, answer) => {
  if (answer == null) return false;
  if (item.kind === 'spot') {
    const flags = (item.segments || []).map((s, i) => (s.flag ? i : -1)).filter((i) => i >= 0);
    return answer === 'clean' ? flags.length === 0 : flags.includes(answer);
  }
  if (item.kind === 'pickAll') {
    const want = item.options.filter((o) => o.correct).map((o) => o.id).sort();
    const got = [...answer].sort();
    return want.length === got.length && want.every((id, i) => id === got[i]);
  }
  return !!item.options.find((o) => o.id === answer)?.correct;
};

function Artifact({ artifact, children }) {
  if (!artifact && !children) return null;
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
        <Quote className="w-3.5 h-3.5" />
        {artifact?.label || 'AI output'}
      </div>
      <div
        className={`bg-slate-900 rounded-lg p-3 text-slate-200 leading-7 ${
          artifact?.code ? 'font-mono text-sm whitespace-pre-wrap' : 'whitespace-pre-line'
        }`}
      >
        {children || artifact.text}
      </div>
    </div>
  );
}

function SpotItem({ item, answer, onAnswer }) {
  const segments = item.segments || [];
  const answered = answer != null;
  const hasFlags = segments.some((s) => s.flag);

  const cls = (s, i) => {
    if (!answered) return 'hover:bg-slate-700/70 cursor-pointer border-b border-dashed border-slate-600';
    if (s.flag) return 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-500/50';
    if (answer === i) return 'bg-red-500/20 text-red-200 ring-1 ring-red-500/40';
    return '';
  };

  return (
    <div className="space-y-4">
      <Artifact artifact={item.artifact || {}}>
        {segments.map((s, i) =>
          s.text.trim() ? (
            <span
              key={i}
              role="button"
              tabIndex={answered ? -1 : 0}
              onClick={() => !answered && onAnswer(i)}
              onKeyDown={(e) => !answered && (e.key === 'Enter' || e.key === ' ') && onAnswer(i)}
              className={`rounded px-0.5 transition-colors ${cls(s, i)}`}
            >
              {s.text}
            </span>
          ) : (
            <span key={i}>{s.text}</span>
          )
        )}
      </Artifact>
      <button
        onClick={() => !answered && onAnswer('clean')}
        disabled={answered}
        className={`w-full p-3 rounded-xl border text-sm transition-all ${
          answered
            ? !hasFlags
              ? 'border-synthaxis-500/60 bg-synthaxis-500/10 text-synthaxis-200'
              : answer === 'clean'
                ? 'border-red-500/50 bg-red-500/10 text-red-300'
                : 'border-slate-800 text-slate-600'
            : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Nothing wrong here
        </span>
      </button>
    </div>
  );
}

function OptionsItem({ item, answer, onAnswer }) {
  const multi = item.kind === 'pickAll';
  const [picked, setPicked] = useState([]);
  const answered = answer != null;
  const chosen = multi ? (answered ? answer : picked) : answer != null ? [answer] : [];

  const toggle = (id) => {
    if (answered) return;
    if (!multi) return onAnswer(id);
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  return (
    <div className="space-y-4">
      {item.artifact && <Artifact artifact={item.artifact} />}
      {multi && !answered && <p className="text-sm text-slate-400">Select all that apply.</p>}
      <div className="space-y-2">
        {item.options.map((opt) => {
          const sel = chosen.includes(opt.id);
          const right = opt.correct;
          const missed = answered && multi && right && !sel;
          const style = !answered
            ? sel
              ? 'border-synthaxis-500/60 bg-synthaxis-500/10'
              : 'border-slate-700 bg-slate-800 hover:border-slate-500'
            : missed
              ? 'border-amber-500/50 bg-amber-500/10'
              : right
                ? 'border-synthaxis-500/60 bg-synthaxis-500/10'
                : sel
                  ? 'border-red-500/50 bg-red-500/10'
                  : 'border-slate-800 bg-slate-800/40 opacity-60';
          const showFeedback = answered && opt.feedback && (sel || right);
          return (
            <div key={opt.id}>
              <button
                onClick={() => toggle(opt.id)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl border transition-all ${style}`}
              >
                <div className="flex items-start gap-3">
                  {answered ? (
                    missed ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    ) : right ? (
                      <CheckCircle2 className="w-5 h-5 text-synthaxis-300 flex-shrink-0 mt-0.5" />
                    ) : sel ? (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <span className="w-5 h-5 flex-shrink-0" />
                    )
                  ) : multi ? (
                    <span className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 ${sel ? 'bg-synthaxis-500 border-synthaxis-400' : 'border-slate-500'}`} />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-slate-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-white flex-1 ${item.optionsCode ? 'font-mono text-sm whitespace-pre-wrap' : ''}`}>{opt.label}</span>
                  {missed && <span className="text-xs font-medium text-amber-300 flex-shrink-0 mt-0.5">You missed this</span>}
                </div>
              </button>
              {showFeedback && (
                <p className={`mt-1.5 ml-8 text-sm animate-fadeIn ${missed ? 'text-amber-200' : right ? 'text-synthaxis-200' : 'text-red-300'}`}>
                  {opt.feedback}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {multi && !answered && (
        <button
          onClick={() => onAnswer(picked)}
          disabled={picked.length === 0}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            picked.length === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-synthaxis-400 hover:bg-synthaxis-300 text-slate-900'
          }`}
        >
          Check my answer
        </button>
      )}
    </div>
  );
}

export function PracticeSetBlock({ block, accent, onComplete, onBack }) {
  const items = block.items || [];
  const [stage, setStage] = useState('intro'); // 'intro' | number | 'results'
  const [answers, setAnswers] = useState({});

  const idx = typeof stage === 'number' ? stage : null;
  const item = idx !== null ? items[idx] : null;
  const answer = idx !== null ? answers[item.id] : undefined;
  const answered = answer != null;
  const score = items.filter((it) => isCorrect(it, answers[it.id])).length;

  const next = () => {
    if (stage === 'intro') setStage(items.length ? 0 : 'results');
    else if (idx !== null) setStage(idx < items.length - 1 ? idx + 1 : 'results');
    else onComplete && onComplete();
  };
  const back = () => {
    if (stage === 'intro') onBack && onBack();
    else if (idx === 0) setStage('intro');
    else if (idx !== null) setStage(idx - 1);
    else setStage(items.length - 1);
  };

  const tier = (block.scoring?.tiers || [])
    .slice()
    .sort((a, b) => b.min - a.min)
    .find((t) => score >= t.min);

  const nextDisabled = idx !== null && !answered;
  const nextLabel =
    stage === 'intro' ? 'Start practice'
      : idx !== null ? (idx < items.length - 1 ? 'Next' : 'See results')
        : 'Continue';

  return (
    <div className="space-y-6">
      <div className="min-h-[420px]">
        {stage === 'intro' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Target className={`w-7 h-7 ${accent.text}`} />
              <h2 className="text-2xl font-semibold text-white">{block.intro?.heading}</h2>
            </div>
            {block.intro?.instruction && <p className="text-lg text-slate-300">{block.intro.instruction}</p>}
            <div className="flex flex-wrap gap-2">
              {[...new Set(items.map((it) => it.label))].map((l) => (
                <span key={l} className={`text-xs px-3 py-1 rounded-full ${accent.bg} ${accent.text}`}>{l}</span>
              ))}
            </div>
            {block.intro?.note && (
              <div className="bg-slate-800 rounded-xl p-4 text-slate-300">{block.intro.note}</div>
            )}
          </div>
        )}

        {item && (
          <div key={item.id} className="space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${accent.bg} ${accent.text}`}>
                {item.label}
              </span>
              <span className="text-xs text-slate-500">{idx + 1} of {items.length}</span>
            </div>
            {item.context && <p className="text-sm text-slate-400 whitespace-pre-line">{item.context}</p>}
            <h3 className="text-xl font-semibold text-white whitespace-pre-line">{item.prompt}</h3>

            {item.kind === 'spot' ? (
              <SpotItem item={item} answer={answer} onAnswer={(a) => setAnswers({ ...answers, [item.id]: a })} />
            ) : (
              <OptionsItem item={item} answer={answer} onAnswer={(a) => setAnswers({ ...answers, [item.id]: a })} />
            )}

            {answered && (
              <div
                className={`rounded-xl p-4 border animate-fadeIn ${
                  isCorrect(item, answer) ? 'bg-synthaxis-500/10 border-synthaxis-500/40' : 'bg-amber-500/10 border-amber-500/30'
                }`}
              >
                <div className={`font-semibold mb-1 ${isCorrect(item, answer) ? 'text-synthaxis-200' : 'text-amber-300'}`}>
                  {isCorrect(item, answer) ? 'Correct' : 'Not quite'}
                </div>
                <p className="text-slate-200 text-sm whitespace-pre-line">{item.explanation}</p>
              </div>
            )}
          </div>
        )}

        {stage === 'results' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <Trophy className={`w-10 h-10 mx-auto ${accent.text}`} />
              <div className="text-4xl font-bold text-white">{score} / {items.length}</div>
              {tier && <p className="text-slate-300">{tier.message}</p>}
            </div>
            <div className="space-y-2">
              {items.map((it) => {
                const ok = isCorrect(it, answers[it.id]);
                return (
                  <div key={it.id} className="flex items-start gap-3 bg-slate-800 rounded-lg p-3">
                    {ok
                      ? <CheckCircle2 className="w-5 h-5 text-synthaxis-300 flex-shrink-0 mt-0.5" />
                      : <XCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />}
                    <div className="text-sm">
                      <span className="text-slate-500">{it.label}: </span>
                      <span className="text-slate-200">{it.takeaway || it.prompt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {block.summary?.insight && (
              <div className={`${accent.bg} border ${accent.border} rounded-xl p-4`}>
                <p className="text-slate-200">{block.summary.insight}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-800">
        <button
          onClick={back}
          disabled={stage === 'intro' && !onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            stage === 'intro' && !onBack ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={next}
          disabled={nextDisabled}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            nextDisabled ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : accent.button
          }`}
        >
          {nextLabel}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
