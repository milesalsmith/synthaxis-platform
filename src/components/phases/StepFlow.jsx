// src/components/phases/StepFlow.jsx
// Generic, data-driven phase renderer. A phase is just { title, estimatedTime,
// steps: [block, ...] } and each block is one full-screen step. This replaces
// the four hand-written phase components — every pattern reuses this engine and
// only supplies data.
//
// Navigation rules (see blockKit):
//   - self-navigating blocks (judgementSet, drill) own their footer; we hide
//     ours and hand them onComplete/onBack.
//   - single-screen interactive blocks (choice, matching) gate our Continue
//     until they call onResolved.
//   - everything else advances freely.

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import BlockRenderer from './blocks/BlockRenderer';
import { isInteractive, ownsNavigation } from './blocks/blockKit';
import { PHASE_CONFIG } from './phaseConfig';

export default function StepFlow({ phase, content, onComplete, onBack }) {
  const config = PHASE_CONFIG[phase] || PHASE_CONFIG.see;
  const Icon = config.icon;
  const steps = content.steps || [];

  const [index, setIndex] = useState(0);
  const [resolved, setResolved] = useState({});

  const step = steps[index];
  const selfNav = step && ownsNavigation(step.type);
  const gated = step && isInteractive(step.type) && !resolved[index];
  const isLast = index === steps.length - 1;

  const advance = () => {
    if (!isLast) setIndex(index + 1);
    else onComplete && onComplete();
  };
  const goBack = () => {
    if (index > 0) setIndex(index - 1);
    else onBack && onBack();
  };
  const markResolved = () => setResolved((r) => ({ ...r, [index]: true }));

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Phase header */}
      <div className={`bg-gradient-to-r ${config.gradient} border-b ${config.border}`}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config.bg}`}>
                <Icon className={`w-5 h-5 ${config.text}`} />
              </div>
              <div>
                <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
                <h1 className="text-xl font-semibold text-white">{content.title}</h1>
              </div>
            </div>
            {content.estimatedTime != null && (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{content.estimatedTime} min</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phase content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Progress dots */}
          {steps.length > 1 && (
            <div className="flex justify-center gap-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? `${config.dot} w-6` : i < index ? `${config.dot} opacity-50 w-2` : 'bg-slate-600 w-2'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Current block */}
          <div className="min-h-[420px]">
            <BlockRenderer
              key={index}
              block={step}
              accent={config}
              onResolved={markResolved}
              onComplete={advance}
              onBack={goBack}
            />
          </div>

          {/* Shared footer (hidden for self-navigating blocks) */}
          {!selfNav && (
            <div className="flex justify-between items-center pt-6 border-t border-slate-800">
              <button
                onClick={goBack}
                disabled={index === 0 && !onBack}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  index === 0 && !onBack
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={advance}
                disabled={gated}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  gated ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : config.button
                }`}
              >
                {isLast ? 'Continue' : 'Continue'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
