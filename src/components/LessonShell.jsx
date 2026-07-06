// src/components/LessonShell.jsx
// Simple shell for pattern lessons — PhaseRenderer owns the experience
//
// This component handles:
// - Loading pattern data
// - Tracking current STOP phase (0-3)
// - Minimal header with progress
// - Lesson completion state
//
// PhaseRenderer handles everything else (steps, interactions, navigation)

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle,
  ArrowRight,
  Eye
} from 'lucide-react';
import { loadPattern, savePatternProgress, getPatternByNumber } from '../utils/patternLoader';
import PhaseRenderer from './phases/PhaseRenderer';

// ============================================
// STOP Protocol Definition
// ============================================
const STOP_PHASES = ['see', 'test', 'observe', 'practice'];

const PHASE_COLORS = {
  see: { letter: 'S', bg: 'bg-amber-500/20', text: 'text-amber-400' },
  test: { letter: 'T', bg: 'bg-blue-500/20', text: 'text-blue-400' },
  observe: { letter: 'O', bg: 'bg-violet-500/20', text: 'text-violet-400' },
  practice: { letter: 'P', bg: 'bg-synthaxis-500/20', text: 'text-synthaxis-300' }
};

// Dev mode: automatically true during `npm run dev`, false in production builds.
// Vite sets import.meta.env.DEV based on the build mode, so this never needs
// to be flipped by hand. Force-enable locally with: `const DEV_MODE = true;`
const DEV_MODE = import.meta.env.DEV;

// ============================================
// Main Component
// ============================================
export default function LessonShell() {
  const { patternNumber } = useParams();
  const navigate = useNavigate();
  
  // Core state
  const [patternData, setPatternData] = useState(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Timer
  const [totalSeconds, setTotalSeconds] = useState(0);
  const timerRef = useRef(null);

  const currentPhase = STOP_PHASES[currentPhaseIndex];
  const patternNum = parseInt(patternNumber) || 1;

  // ============================================
  // Load Pattern Data
  // ============================================
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await loadPattern(patternNum);
        if (!data) {
          throw new Error(`Pattern ${patternNum} not found`);
        }
        setPatternData(data);
      } catch (err) {
        console.error('Failed to load pattern:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
    
    // Reset state when pattern changes
    setCurrentPhaseIndex(0);
    setTotalSeconds(0);
    setIsComplete(false);
  }, [patternNum]);

  // ============================================
  // Timer
  // ============================================
  useEffect(() => {
    if (!isLoading && patternData && !isComplete) {
      timerRef.current = setInterval(() => {
        setTotalSeconds(s => s + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isLoading, patternData, isComplete]);

  // ============================================
  // Save Progress
  // ============================================
  useEffect(() => {
    if (patternData && !isLoading) {
      savePatternProgress(patternNum, {
        currentPhaseIndex,
        totalSeconds,
        lastUpdated: new Date().toISOString()
      });
    }
  }, [currentPhaseIndex, totalSeconds, patternData, patternNum, isLoading]);

  // ============================================
  // Phase Navigation
  // ============================================
  const handlePhaseComplete = () => {
    if (currentPhaseIndex < STOP_PHASES.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      window.scrollTo(0, 0);
    } else {
      // All phases complete!
      setIsComplete(true);
      savePatternProgress(patternNum, {
        completed: true,
        completedAt: new Date().toISOString(),
        totalSeconds,
        completedPhases: [0, 1, 2, 3]
      });
    }
  };

  const handleBack = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  // ============================================
  // Helpers
  // ============================================
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ============================================
  // Loading State
  // ============================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Eye className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
          <p className="text-slate-400">Loading pattern...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // Error State
  // ============================================
  if (error || !patternData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-white mb-2">Pattern not found</h2>
          <p className="text-slate-400 mb-6">
            {error || `We couldn't find pattern ${patternNum}.`}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-synthaxis-500 hover:bg-synthaxis-400 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // Completion State
  // ============================================
  if (isComplete) {
    const nextPattern = getPatternByNumber(patternNum + 1);
    
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          {/* Success icon */}
          <div className="w-20 h-20 bg-synthaxis-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-synthaxis-300" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">Pattern Learned!</h2>
          <p className="text-slate-400 mb-1">{patternData.title}</p>
          <p className="text-sm text-slate-500 mb-8">
            Completed in {formatTime(totalSeconds)}
          </p>

          {/* Key Takeaways */}
          {patternData.phases?.practice?.keyTakeaways && (
            <div className="text-left bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">Key Takeaways</h3>
              <ul className="space-y-2">
                {patternData.phases.practice.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-synthaxis-300 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Checklist */}
          {patternData.phases?.practice?.checklist && (
            <div className="text-left bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-8">
              <h3 className="text-sm font-semibold text-synthaxis-300 mb-3">
                {patternData.phases.practice.checklist.title}
              </h3>
              <ul className="space-y-2">
                {patternData.phases.practice.checklist.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-synthaxis-300">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors"
            >
              Back to Home
            </button>
            {nextPattern && nextPattern.status === 'available' && (
              <button
                onClick={() => navigate(`/learn/${patternNum + 1}`)}
                className="px-6 py-3 bg-synthaxis-500 hover:bg-synthaxis-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                Next Pattern
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // Main Render — Header + PhaseRenderer
  // ============================================
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Minimal sticky header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="hover:opacity-80 transition-opacity"
                title="Back to home"
              >
                <img 
                  src="/synthaxis-logo.png" 
                  alt="Synthaxis" 
                  className="h-7 w-auto"
                />
              </button>
              <div className="border-l border-slate-700 pl-3">
                <div className="text-xs text-synthaxis-300 font-medium">
                  Pattern {patternNum}
                </div>
                <h1 className="text-sm font-semibold text-white">
                  {patternData.title}
                </h1>
              </div>
            </div>

            {/* Right: STOP progress + Timer */}
            <div className="flex items-center gap-4">
              {/* STOP letters - clickable in dev mode */}
              <div className="flex items-center gap-1">
                {STOP_PHASES.map((phase, i) => {
                  const colors = PHASE_COLORS[phase];
                  const isComplete = i < currentPhaseIndex;
                  const isCurrent = i === currentPhaseIndex;
                  
                  return (
                    <button
                      key={phase}
                      onClick={() => DEV_MODE && setCurrentPhaseIndex(i)}
                      disabled={!DEV_MODE}
                      className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center transition-all ${
                        isComplete
                          ? 'bg-synthaxis-500/20 text-synthaxis-300'
                          : isCurrent
                            ? `${colors.bg} ${colors.text}`
                            : 'bg-slate-800 text-slate-600'
                      } ${DEV_MODE ? 'cursor-pointer hover:ring-2 hover:ring-white/20' : ''}`}
                      title={DEV_MODE ? `Jump to ${phase.toUpperCase()}` : undefined}
                    >
                      {colors.letter}
                    </button>
                  );
                })}
              </div>

              {/* Timer */}
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-sm">{formatTime(totalSeconds)}</span>
              </div>
              
              {/* Dev mode indicator */}
              {DEV_MODE && (
                <div className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded font-medium">
                  DEV
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Phase content — PhaseRenderer owns everything below the header */}
      <div className="pt-16">
        <PhaseRenderer
          phase={currentPhase}
          content={patternData.phases[currentPhase]}
          onComplete={handlePhaseComplete}
          onBack={currentPhaseIndex > 0 ? handleBack : null}
        />
      </div>
    </div>
  );
}