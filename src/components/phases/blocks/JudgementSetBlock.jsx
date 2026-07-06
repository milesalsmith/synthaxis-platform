// src/components/phases/blocks/JudgementSetBlock.jsx
// Self-navigating interactive block: the "Trust or Verify?" judgement quiz.
// Runs its own intro -> per-item -> results flow and calls onComplete() when the
// learner leaves the results screen. Pattern-agnostic: correctness comes from
// item.correct ('trust'|'verify'), not any package-specific field.
//
//   { type: 'judgementSet',
//     intro?: { heading, instruction?, note?, legend?: { trust, verify } },
//     items: [{ id, prompt, context?, correct: 'trust'|'verify',
//               tone: 'good'|'bad', verdictLabel, explanation, redFlag?, meta? }],
//     scoring: { tiers: [{ min, message }] },   // highest matching min wins
//     summary?: { insight } }

import React, { useState } from 'react';
import {
  Shield, HelpCircle, ChevronRight, CheckCircle2, XCircle,
} from 'lucide-react';

export function JudgementSetBlock({ block, accent, onComplete }) {
  const [step, setStep] = useState('intro'); // 'intro' | number | 'results'
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  const items = block.items;
  const idx = typeof step === 'number' ? step : null;
  const item = idx !== null ? items[idx] : null;

  const choose = (id, value) => {
    setAnswers({ ...answers, [id]: value });
    setShowFeedback(true);
  };

  const advance = () => {
    setShowFeedback(false);
    if (step === 'intro') setStep(0);
    else if (typeof step === 'number' && step < items.length - 1) setStep(step + 1);
    else if (typeof step === 'number') setStep('results');
    else onComplete && onComplete();
  };

  const score = items.filter((it) => answers[it.id] === it.correct).length;
  const scoreMessage = () => {
    const tiers = [...(block.scoring?.tiers || [])].sort((a, b) => b.min - a.min);
    const hit = tiers.find((t) => score >= t.min);
    return hit ? hit.message : '';
  };

  const nextDisabled = typeof step === 'number' && !answers[item?.id];

  return (
    <div className="space-y-8">
      {typeof step === 'number' && (
        <div className="flex justify-center gap-2">
          {items.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${
              i === step ? `${accent.text.replace('text', 'bg')} w-6` : i < step ? 'bg-blue-400/50' : 'bg-slate-600'
            }`} />
          ))}
        </div>
      )}

      <div className="min-h-[450px]">
        {step === 'intro' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-white">{block.intro?.heading}</h2>
            {block.intro?.instruction && <p className="text-lg text-slate-300">{block.intro.instruction}</p>}
            {block.intro?.note && <p className="text-slate-400 italic">{block.intro.note}</p>}
            {block.intro?.legend && (
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="flex-1 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-synthaxis-300" />
                    <div className="font-medium">{block.intro.legend.trust.label}</div>
                    <div className="text-sm text-slate-400">{block.intro.legend.trust.detail}</div>
                  </div>
                  <div className="text-slate-600">or</div>
                  <div className="flex-1 text-center">
                    <HelpCircle className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                    <div className="font-medium">{block.intro.legend.verify.label}</div>
                    <div className="text-sm text-slate-400">{block.intro.legend.verify.detail}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {item && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center text-slate-400 text-sm">Question {idx + 1} of {items.length}</div>
            <div className="bg-slate-800 rounded-xl p-6 space-y-4">
              {item.context && <p className="text-slate-400 text-sm">{item.context}</p>}
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-white font-mono">"{item.prompt}"</p>
              </div>
            </div>

            {!answers[item.id] && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => choose(item.id, 'trust')}
                  className="p-6 rounded-xl border-2 border-slate-700 hover:border-synthaxis-500 hover:bg-synthaxis-500/10 transition-all group">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-synthaxis-300" />
                  <div className="font-medium text-white">TRUST</div>
                  <div className="text-sm text-slate-400">Install it</div>
                </button>
                <button onClick={() => choose(item.id, 'verify')}
                  className="p-6 rounded-xl border-2 border-slate-700 hover:border-amber-500 hover:bg-amber-500/10 transition-all group">
                  <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-amber-400" />
                  <div className="font-medium text-white">VERIFY</div>
                  <div className="text-sm text-slate-400">Check first</div>
                </button>
              </div>
            )}

            {showFeedback && answers[item.id] && (
              <div className={`rounded-xl p-5 animate-fadeIn border ${
                item.tone === 'good' ? 'bg-synthaxis-500/10 border-synthaxis-500/30' : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="flex items-start gap-3">
                  {item.tone === 'good'
                    ? <CheckCircle2 className="w-6 h-6 text-synthaxis-300 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className={`font-medium ${item.tone === 'good' ? 'text-synthaxis-300' : 'text-red-400'}`}>
                      {item.explanation}
                    </p>
                    {item.redFlag && (
                      <p className="text-slate-400 mt-2 text-sm">
                        <span className="text-amber-400">Red flag:</span> {item.redFlag}
                      </p>
                    )}
                    {item.meta && <p className="text-slate-400 mt-2 text-sm">{item.meta}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-400 mb-2">{score}/{items.length}</div>
              <p className="text-xl text-white">{scoreMessage()}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Results breakdown:</h3>
              <div className="space-y-3">
                {items.map((it) => {
                  const correct = answers[it.id] === it.correct;
                  return (
                    <div key={it.id} className="flex items-center gap-3">
                      {correct
                        ? <CheckCircle2 className="w-5 h-5 text-synthaxis-300" />
                        : <XCircle className="w-5 h-5 text-red-400" />}
                      <span className="text-slate-300 text-sm flex-1 truncate">{it.prompt.substring(0, 50)}...</span>
                      <span className={`text-sm ${it.tone === 'good' ? 'text-synthaxis-300' : 'text-red-400'}`}>
                        {it.verdictLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {block.summary?.insight && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-blue-200">{block.summary.insight}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6 border-t border-slate-800">
        <button
          onClick={advance}
          disabled={nextDisabled}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            nextDisabled ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-400'
          }`}
        >
          {step === 'results' ? 'Continue' : step === 'intro' ? 'Start' : idx === items.length - 1 ? 'See Results' : 'Next Question'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
