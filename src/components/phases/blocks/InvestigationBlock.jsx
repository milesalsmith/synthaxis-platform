// src/components/phases/blocks/InvestigationBlock.jsx
// Self-navigating block: the learner actually tests a claim. Each round asks
// "which test do you run?"; picking one shows what that test would return and
// whether it settles anything. Weak tests (e.g. asking the AI if it's sure)
// are allowed and explained, then the learner tries another. After the rounds
// comes a verdict, then a summary of the test kit for this pattern.
//
//   { type: 'investigation',
//     heading, intro?,
//     claim: { label?, text, code? },
//     rounds: [{
//       title, question,
//       options: [{ id, label, useful: boolean,
//                   result?, resultLabel?,   // what the test returns (shown monospace)
//                   feedback,                // what it tells you (or why it doesn't help)
//                   kit? }],                 // short line for the final test kit
//     }],
//     verdict: { question, options: [{ id, label, correct: boolean, feedback }] },
//     kit?: { title?, footer? } }
//
// A round is passed once the learner has run at least one useful test.

import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, FlaskConical, CheckCircle2, XCircle, Wrench, Quote,
} from 'lucide-react';

export function InvestigationBlock({ block, accent, onComplete, onBack }) {
  const rounds = block.rounds || [];
  const [stage, setStage] = useState('intro'); // 'intro' | number | 'verdict' | 'kit'
  const [tried, setTried] = useState({}); // { [roundIndex]: [optionId, ...] }
  const [verdict, setVerdict] = useState(null);

  const roundIdx = typeof stage === 'number' ? stage : null;
  const round = roundIdx !== null ? rounds[roundIdx] : null;
  const triedHere = (roundIdx !== null && tried[roundIdx]) || [];
  const roundPassed = round && round.options.some((o) => o.useful && triedHere.includes(o.id));

  const runTest = (opt) => {
    if (triedHere.includes(opt.id)) return;
    setTried({ ...tried, [roundIdx]: [...triedHere, opt.id] });
  };

  const next = () => {
    if (stage === 'intro') setStage(rounds.length ? 0 : 'verdict');
    else if (roundIdx !== null) setStage(roundIdx < rounds.length - 1 ? roundIdx + 1 : 'verdict');
    else if (stage === 'verdict') setStage('kit');
    else onComplete && onComplete();
  };

  const back = () => {
    if (stage === 'intro') onBack && onBack();
    else if (roundIdx === 0) setStage('intro');
    else if (roundIdx !== null) setStage(roundIdx - 1);
    else if (stage === 'verdict') setStage(rounds.length ? rounds.length - 1 : 'intro');
    else if (stage === 'kit') setStage('verdict');
  };

  const nextDisabled = (roundIdx !== null && !roundPassed) || (stage === 'verdict' && !verdict);
  const nextLabel =
    stage === 'intro' ? 'Start testing'
      : roundIdx !== null ? (roundIdx < rounds.length - 1 ? 'Next test' : 'Make the call')
        : stage === 'verdict' ? 'See your test kit'
          : 'Continue';

  // Kit = the useful tests from every round, in order.
  const kitItems = rounds.flatMap((r) => r.options.filter((o) => o.useful).map((o) => o.kit || o.label));

  const Claim = ({ compact }) => (
    <div className={`bg-slate-800 rounded-xl ${compact ? 'p-4' : 'p-5'}`}>
      <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
        <Quote className="w-3.5 h-3.5" />
        {block.claim?.label || 'Claim'}
      </div>
      <div
        className={`bg-slate-900 rounded-lg p-3 text-slate-200 ${
          block.claim?.code ? 'font-mono text-sm whitespace-pre-wrap' : 'whitespace-pre-line'
        } ${compact ? 'text-sm' : ''}`}
      >
        {block.claim?.text}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="min-h-[420px]">
        {stage === 'intro' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <FlaskConical className={`w-7 h-7 ${accent.text}`} />
              <h2 className="text-2xl font-semibold text-white">{block.heading}</h2>
            </div>
            {block.intro && <p className="text-lg text-slate-300 whitespace-pre-line">{block.intro}</p>}
            <Claim />
          </div>
        )}

        {round && (
          <div className="space-y-5 animate-fadeIn">
            <Claim compact />
            <div>
              <div className={`text-sm font-medium ${accent.text}`}>{round.title}</div>
              <h3 className="text-xl font-semibold text-white mt-1">{round.question}</h3>
            </div>

            <div className="space-y-3">
              {round.options.map((opt) => {
                const ran = triedHere.includes(opt.id);
                return (
                  <div key={opt.id}>
                    <button
                      onClick={() => runTest(opt)}
                      disabled={ran}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        ran
                          ? opt.useful
                            ? 'border-synthaxis-500/50 bg-synthaxis-500/10'
                            : 'border-slate-700 bg-slate-800/50'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {ran ? (
                          opt.useful
                            ? <CheckCircle2 className="w-5 h-5 text-synthaxis-300 flex-shrink-0" />
                            : <XCircle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                        ) : (
                          <FlaskConical className="w-5 h-5 text-slate-500 flex-shrink-0" />
                        )}
                        <span className="text-white">{opt.label}</span>
                      </div>
                    </button>

                    {ran && (
                      <div className="mt-2 ml-8 space-y-2 animate-fadeIn">
                        {opt.result && (
                          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                            {opt.resultLabel && (
                              <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">{opt.resultLabel}</div>
                            )}
                            <div className="font-mono text-xs text-slate-300 whitespace-pre-wrap">{opt.result}</div>
                          </div>
                        )}
                        <p className={`text-sm ${opt.useful ? 'text-synthaxis-200' : 'text-slate-400'}`}>
                          {opt.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {triedHere.length > 0 && !roundPassed && (
              <p className="text-sm text-amber-300">That test didn't settle it. Try another one.</p>
            )}
          </div>
        )}

        {stage === 'verdict' && block.verdict && (
          <div className="space-y-5 animate-fadeIn">
            <Claim compact />
            <h3 className="text-xl font-semibold text-white">{block.verdict.question}</h3>
            <div className="space-y-3">
              {block.verdict.options.map((opt) => {
                const chosen = verdict === opt.id;
                const show = verdict !== null;
                return (
                  <div key={opt.id}>
                    <button
                      onClick={() => verdict === null && setVerdict(opt.id)}
                      disabled={verdict !== null}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        show && opt.correct
                          ? 'border-synthaxis-500/60 bg-synthaxis-500/10'
                          : chosen
                            ? 'border-red-500/50 bg-red-500/10'
                            : show
                              ? 'border-slate-800 bg-slate-800/40 opacity-60'
                              : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                      }`}
                    >
                      <span className="text-white">{opt.label}</span>
                    </button>
                    {show && (chosen || opt.correct) && (
                      <p className={`mt-2 ml-1 text-sm animate-fadeIn ${opt.correct ? 'text-synthaxis-200' : 'text-red-300'}`}>
                        {opt.feedback}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {stage === 'kit' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Wrench className={`w-7 h-7 ${accent.text}`} />
              <h2 className="text-2xl font-semibold text-white">{block.kit?.title || 'Your Test Kit'}</h2>
            </div>
            <p className="text-slate-400">The tests that actually settled it:</p>
            <ol className="space-y-3">
              {kitItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-slate-800 rounded-xl p-4">
                  <span className={`w-7 h-7 rounded-full ${accent.bg} ${accent.text} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                    {i + 1}
                  </span>
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ol>
            {block.kit?.footer && (
              <div className={`${accent.bg} border ${accent.border} rounded-xl p-4`}>
                <p className="text-slate-200">{block.kit.footer}</p>
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
