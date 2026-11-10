// src/components/Certificate.jsx
// /certificate: completion certificate, unlocked once all 10 patterns are
// complete. The learner enters their name; the certificate can be printed /
// saved as PDF (browser print dialog) or shared to LinkedIn.
//
// Progress lives in localStorage, so this is a self-issued certificate with a
// reference ID, not a server-verified credential.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Lock, Printer, Share2 } from 'lucide-react';
import {
  curriculumMetadata,
  getCompletedPatternCount,
  getCurriculumCompletedAt,
  getCertificateName,
  setCertificateName,
  getCertificateId,
  isCurriculumComplete,
} from '../utils/patternLoader';

const SITE_URL = 'https://synthaxis.ai';

export default function Certificate() {
  const navigate = useNavigate();
  const [name, setName] = useState(getCertificateName());

  const allDone = isCurriculumComplete();
  const completed = getCompletedPatternCount();
  const total = curriculumMetadata.totalPatterns;
  const completedAt = getCurriculumCompletedAt();
  const issued = completedAt
    ? new Date(completedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const certId = getCertificateId(name, completedAt);
  const displayName = name.trim() || 'Your Name';

  const updateName = (value) => {
    setName(value);
    setCertificateName(value);
  };

  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`;

  // ---------- Locked ----------
  if (!allDone) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-slate-500" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Certificate locked</h1>
          <p className="text-slate-400 mb-8">
            Complete all {total} patterns to unlock your certificate. You've finished {completed} so far.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/progress')}
              className="px-5 py-3 bg-synthaxis-500 hover:bg-synthaxis-400 text-white font-semibold rounded-lg transition-colors"
            >
              See your progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Unlocked ----------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 print:bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10 print:p-0 print:max-w-none">
        {/* Controls (hidden when printing) */}
        <div className="print:hidden">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/progress')}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Your progress
            </button>
          </div>

          <h1 className="text-3xl font-semibold mb-2">Your Certificate</h1>
          <p className="text-slate-400 mb-6">
            You've completed all {total} hallucination patterns. Add your name as you'd like it to appear.
          </p>

          <label className="block text-sm text-slate-400 mb-2" htmlFor="cert-name">Name on certificate</label>
          <input
            id="cert-name"
            type="text"
            value={name}
            maxLength={60}
            onChange={(e) => updateName(e.target.value)}
            placeholder="e.g. Ada Lovelace"
            className="w-full sm:w-96 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-synthaxis-400 mb-8"
          />
        </div>

        {/* The certificate */}
        <div className="certificate-sheet relative bg-slate-900 border-2 border-synthaxis-500/50 rounded-2xl p-10 sm:p-14 text-center overflow-hidden">
          <div className="absolute inset-3 border border-synthaxis-500/20 rounded-xl pointer-events-none" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-synthaxis-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <img src="/synthaxis-logo.png" alt="Synthaxis" className="h-12 w-auto mx-auto mb-6" />
            <div className="text-xs tracking-[0.3em] uppercase text-synthaxis-300 mb-3">Certificate of Completion</div>
            <div className="text-slate-400 mb-6">This certifies that</div>

            <div className={`text-4xl sm:text-5xl font-semibold mb-6 ${name.trim() ? 'text-white' : 'text-slate-600'}`}>
              {displayName}
            </div>

            <div className="text-slate-400 mb-2">has completed</div>
            <div className="text-2xl font-semibold text-white mb-2">AI Discernment Training</div>
            <div className="text-slate-400 max-w-xl mx-auto mb-8">
              All {total} AI hallucination patterns, each built on a real incident, practised with the STOP method:
              See, Test, Observe, Practice.
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-2xl mx-auto mb-10 text-left">
              {curriculumMetadata.patterns.map((p) => (
                <div key={p.number} className="text-[11px] leading-tight text-slate-400 bg-slate-800/50 rounded-md px-2 py-1.5">
                  <span className="text-synthaxis-300 font-semibold mr-1">{p.number}</span>
                  {p.title}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 border-t border-slate-800 pt-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-600">Issued</div>
                <div className="text-slate-300">{issued}</div>
              </div>
              <div className="text-synthaxis-300 font-semibold">synthaxis.ai</div>
              <div className="sm:text-right">
                <div className="text-xs uppercase tracking-wider text-slate-600">Reference</div>
                <div className="text-slate-300 font-mono">{certId}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions (hidden when printing) */}
        <div className="print:hidden">
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-synthaxis-500 hover:bg-synthaxis-400 text-white font-semibold rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share on LinkedIn
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-4 flex items-start gap-2">
            <Award className="w-4 h-4 flex-shrink-0" />
            Your progress is stored in this browser, so this is a self-issued certificate with a reference number,
            not a server-verified credential.
          </p>
        </div>
      </div>
    </div>
  );
}
