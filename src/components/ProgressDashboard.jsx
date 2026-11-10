// src/components/ProgressDashboard.jsx
// /progress: the learner's progress across the foundation module and the
// 10 patterns. Progress is stored in this browser (localStorage) by
// LessonShell / FoundationShell; this page only reads it.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Award, Brain, CheckCircle2, Circle, Clock, Lock, RotateCcw,
} from 'lucide-react';
import {
  curriculumMetadata,
  getPatternStatus,
  isFoundationComplete,
  getCompletedPatternCount,
  getProgressPercentage,
  getStartingPoint,
  isCurriculumComplete,
  resetAllProgress,
} from '../utils/patternLoader';

const PHASE_NAMES = ['See', 'Test', 'Observe', 'Practice'];

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '';

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return '';
  const m = Math.round(seconds / 60);
  return m < 1 ? '<1 min' : `${m} min`;
};

export default function ProgressDashboard() {
  const navigate = useNavigate();
  // Bumped after a reset so the page re-reads localStorage.
  const [version, setVersion] = useState(0);

  const foundationDone = isFoundationComplete();
  const completed = getCompletedPatternCount();
  const total = curriculumMetadata.totalPatterns;
  const percent = getProgressPercentage();
  const allDone = isCurriculumComplete();
  const start = getStartingPoint();

  const continueTarget =
    start.type === 'foundation' ? '/foundation'
      : start.type === 'pattern' ? `/learn/${start.number}`
        : '/certificate';
  const continueLabel =
    start.type === 'foundation' ? 'Start with the foundation'
      : start.type === 'pattern' ? `Continue: Pattern ${start.number}`
        : 'View your certificate';

  const handleReset = () => {
    if (window.confirm('Reset all progress on this device? This cannot be undone.')) {
      resetAllProgress();
      setVersion((v) => v + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" data-version={version}>
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <img src="/synthaxis-logo.png" alt="Synthaxis" className="h-8 w-auto" />
        </div>

        <h1 className="text-3xl font-semibold mb-2">Your Progress</h1>
        <p className="text-slate-400 mb-8">
          {completed} of {total} patterns complete
          {foundationDone ? ' · Foundation complete' : ''}
        </p>

        {/* Overall progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <div className="flex items-end justify-between mb-3">
            <span className="text-sm text-slate-400">Overall</span>
            <span className="text-2xl font-bold text-synthaxis-300">{percent}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-synthaxis-400 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => navigate(continueTarget)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-synthaxis-500 hover:bg-synthaxis-400 text-white font-semibold rounded-lg transition-colors"
            >
              {continueLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate card */}
        <div
          className={`rounded-xl p-5 mb-8 border flex items-center gap-4 ${
            allDone
              ? 'bg-synthaxis-500/10 border-synthaxis-500/40 cursor-pointer hover:border-synthaxis-400'
              : 'bg-slate-900/50 border-slate-800'
          }`}
          onClick={() => allDone && navigate('/certificate')}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${allDone ? 'bg-synthaxis-500/20' : 'bg-slate-800'}`}>
            {allDone ? <Award className="w-6 h-6 text-synthaxis-300" /> : <Lock className="w-5 h-5 text-slate-500" />}
          </div>
          <div className="flex-1">
            <div className="font-semibold">Certificate of Completion</div>
            <div className="text-sm text-slate-400">
              {allDone
                ? 'Unlocked. Add your name and download or share it.'
                : `Complete all ${total} patterns to unlock (${total - completed} to go).`}
            </div>
          </div>
          {allDone && <ArrowRight className="w-5 h-5 text-synthaxis-300" />}
        </div>

        {/* Foundation */}
        <div className="grid gap-3">
          <Row
            onClick={() => navigate('/foundation')}
            icon={<Brain className="w-4 h-4 text-amber-400" />}
            title="Why Smart People Get Fooled"
            subtitle="Foundation module"
            status={foundationDone ? { state: 'complete' } : { state: 'not-started' }}
          />

          {curriculumMetadata.patterns.map((p) => (
            <Row
              key={p.number}
              onClick={() => navigate(`/learn/${p.number}`)}
              number={p.number}
              title={p.title}
              subtitle={p.subtitle}
              status={getPatternStatus(p.number)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            Progress is saved in this browser only. Clearing site data, or switching device, starts fresh.
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset progress
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ onClick, number, icon, title, subtitle, status }) {
  const done = status.state === 'complete';
  const inProgress = status.state === 'in-progress';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
        done
          ? 'bg-synthaxis-500/5 border-synthaxis-500/30 hover:border-synthaxis-500/50'
          : inProgress
            ? 'bg-slate-800/60 border-amber-500/30 hover:border-amber-500/50'
            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="w-8 flex-shrink-0 flex justify-center">
        {icon || <span className="text-lg font-bold text-slate-600">{String(number).padStart(2, '0')}</span>}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium text-slate-100 truncate">{title}</div>
        <div className="text-xs text-slate-500 truncate">{subtitle}</div>
        {inProgress && (
          <div className="flex gap-1 mt-2">
            {PHASE_NAMES.map((name, i) => (
              <span
                key={name}
                title={name}
                className={`h-1.5 w-8 rounded-full ${i < status.phaseIndex ? 'bg-amber-400' : i === status.phaseIndex ? 'bg-amber-400/40' : 'bg-slate-700'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 text-right">
        {done ? (
          <div className="flex items-center gap-2 text-synthaxis-300 text-sm">
            <span className="hidden sm:flex flex-col items-end text-xs text-slate-500">
              {status.completedAt && <span>{formatDate(status.completedAt)}</span>}
              {status.seconds != null && (
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDuration(status.seconds)}</span>
              )}
            </span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
        ) : inProgress ? (
          <span className="text-xs text-amber-400">
            {PHASE_NAMES[status.phaseIndex] || 'In progress'}
          </span>
        ) : (
          <Circle className="w-5 h-5 text-slate-700" />
        )}
      </div>
    </button>
  );
}
