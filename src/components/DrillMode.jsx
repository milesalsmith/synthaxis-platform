// src/components/DrillMode.jsx
// Enhanced rapid-fire package verification drill
//
// Features:
// - 10 packages with visual registry previews
// - Shows mini PyPI/npm mockup for each package
// - Teaches pattern recognition through repetition
// - Tracks time and accuracy
// - Explains red flags after each answer

import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy,
  ArrowRight,
  Package,
  AlertTriangle,
  Target,
  Download,
  Calendar,
  Github,
  User,
  Flame,
  TrendingUp
} from 'lucide-react';

// ============================================
// Package Data with Registry Info
// ============================================
const DRILL_PACKAGES = [
  // === REAL PACKAGES ===
  { 
    name: 'requests', 
    isReal: true, 
    difficulty: 'easy',
    registry: {
      downloads: '50,234,891',
      lastUpdate: '3 days ago',
      firstRelease: 'Feb 2011',
      maintainers: ['Kenneth Reitz', 'Seth Larson'],
      hasRepo: true,
      versions: 142
    },
    explanation: 'One of the most downloaded Python packages ever. 12+ years of history, known maintainers, millions of downloads.',
    learnPoint: 'Legitimate packages have long histories and high download counts.'
  },
  { 
    name: 'lodash', 
    isReal: true, 
    difficulty: 'easy',
    registry: {
      downloads: '45,000,000',
      lastUpdate: '2 weeks ago',
      firstRelease: 'Apr 2012',
      maintainers: ['John-David Dalton'],
      hasRepo: true,
      versions: 114
    },
    explanation: 'The most depended-upon npm package. 12 years old, 114 versions, 45M weekly downloads.',
    learnPoint: 'Check the "dependents" count — lodash has 150,000+ packages depending on it.'
  },
  { 
    name: 'axios', 
    isReal: true, 
    difficulty: 'medium',
    registry: {
      downloads: '42,567,123',
      lastUpdate: '1 month ago',
      firstRelease: 'Aug 2014',
      maintainers: ['Matt Zabriskie'],
      hasRepo: true,
      versions: 89
    },
    explanation: 'Major HTTP client for JavaScript. Nearly 10 years old, active GitHub repo with 100k+ stars.',
    learnPoint: 'GitHub stars and active issues are good signals of legitimacy.'
  },
  { 
    name: 'pydantic', 
    isReal: true, 
    difficulty: 'medium',
    registry: {
      downloads: '31,456,789',
      lastUpdate: '5 days ago',
      firstRelease: 'Jun 2017',
      maintainers: ['Samuel Colvin'],
      hasRepo: true,
      versions: 67
    },
    explanation: 'Powers FastAPI\'s data validation. 30M+ monthly downloads, active development, well-documented.',
    learnPoint: 'Real packages often power other well-known tools (FastAPI uses Pydantic).'
  },
  { 
    name: 'httpx', 
    isReal: true, 
    difficulty: 'hard',
    registry: {
      downloads: '12,345,678',
      lastUpdate: '1 week ago',
      firstRelease: 'Oct 2019',
      maintainers: ['Tom Christie'],
      hasRepo: true,
      versions: 45
    },
    explanation: 'Modern async HTTP client by the creator of Django REST Framework. Growing rapidly.',
    learnPoint: 'Newer packages can be legitimate — check if maintainers have other known projects.'
  },

  // === FABRICATED PACKAGES ===
  { 
    name: 'requests-pro', 
    isReal: false, 
    difficulty: 'easy',
    redFlag: 'Premium Suffix',
    registry: {
      downloads: '47',
      lastUpdate: '3 days ago',
      firstRelease: '3 days ago',
      maintainers: [],
      hasRepo: false,
      versions: 1
    },
    explanation: 'FABRICATED. The "-pro" suffix is a classic hallucination pattern. The real package is just "requests".',
    learnPoint: 'Red flag: -pro, -plus, -advanced, -toolkit suffixes on established package names.'
  },
  { 
    name: 'flask-api-toolkit', 
    isReal: false, 
    difficulty: 'easy',
    redFlag: 'Perfect Match + Suffix',
    registry: {
      downloads: '234',
      lastUpdate: '1 week ago',
      firstRelease: '2 weeks ago',
      maintainers: ['user_847291'],
      hasRepo: false,
      versions: 1
    },
    explanation: 'FABRICATED. Combines "Flask" + "API" + "-toolkit" — a pattern AI creates to match your question perfectly.',
    learnPoint: 'Red flag: Package name matches your exact question too perfectly.'
  },
  { 
    name: 'pandas-datatools', 
    isReal: false, 
    difficulty: 'medium',
    redFlag: 'Conflation',
    registry: {
      downloads: '891',
      lastUpdate: '5 days ago',
      firstRelease: '1 month ago',
      maintainers: ['datadev2024'],
      hasRepo: false,
      versions: 2
    },
    explanation: 'FABRICATED. Mashes "pandas" with generic "datatools" — 38% of hallucinations are conflations like this.',
    learnPoint: 'Red flag: Combines two real concepts into a fake package name.'
  },
  { 
    name: 'fastapi-auth-plus', 
    isReal: false, 
    difficulty: 'medium',
    redFlag: 'Premium Suffix',
    registry: {
      downloads: '156',
      lastUpdate: '4 days ago',
      firstRelease: '4 days ago',
      maintainers: [],
      hasRepo: false,
      versions: 1
    },
    explanation: 'FABRICATED. "-plus" suffix on authentication package. Real options: fastapi-users, python-jose.',
    learnPoint: 'When in doubt, search "[framework] authentication" to find real community packages.'
  },
  { 
    name: 'react-state-toolkit', 
    isReal: false, 
    difficulty: 'hard',
    redFlag: 'Conflation + Suffix',
    registry: {
      downloads: '2,341',
      lastUpdate: '2 weeks ago',
      firstRelease: '3 months ago',
      maintainers: ['reactdev_2024'],
      hasRepo: true, // Has repo but it's empty
      versions: 3
    },
    explanation: 'FABRICATED. Slightly higher downloads and has a repo, but the repo is nearly empty. Real state management: Redux, Zustand, Jotai.',
    learnPoint: 'A GitHub link isn\'t enough — click through and check if the repo has real code and activity.'
  },
];

// ============================================
// Mini Registry Preview Component
// ============================================
function MiniRegistry({ data, showRedFlags = false }) {
  const { downloads, lastUpdate, firstRelease, maintainers, hasRepo, versions } = data;
  
  // Determine if stats are suspicious
  const lowDownloads = parseInt(downloads.replace(/[^0-9]/g, '')) < 1000;
  const newPackage = firstRelease.includes('day') || firstRelease.includes('week') || firstRelease.includes('month');
  const noMaintainers = maintainers.length === 0;
  const singleVersion = versions === 1;
  
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      <div className="grid grid-cols-2 gap-3 text-sm">
        {/* Downloads */}
        <div className={`flex items-center gap-2 ${showRedFlags && lowDownloads ? 'text-red-400' : 'text-slate-300'}`}>
          <Download className="w-4 h-4 text-slate-500" />
          <span>{downloads}/mo</span>
          {showRedFlags && lowDownloads && (
            <AlertTriangle className="w-3 h-3 text-red-400" />
          )}
        </div>
        
        {/* First Release */}
        <div className={`flex items-center gap-2 ${showRedFlags && newPackage ? 'text-red-400' : 'text-slate-300'}`}>
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>Since {firstRelease}</span>
          {showRedFlags && newPackage && (
            <AlertTriangle className="w-3 h-3 text-red-400" />
          )}
        </div>
        
        {/* Maintainers */}
        <div className={`flex items-center gap-2 ${showRedFlags && noMaintainers ? 'text-red-400' : 'text-slate-300'}`}>
          <User className="w-4 h-4 text-slate-500" />
          <span>{maintainers.length > 0 ? maintainers[0] : 'Anonymous'}</span>
          {showRedFlags && noMaintainers && (
            <AlertTriangle className="w-3 h-3 text-red-400" />
          )}
        </div>
        
        {/* Repository */}
        <div className={`flex items-center gap-2 ${showRedFlags && !hasRepo ? 'text-red-400' : 'text-slate-300'}`}>
          <Github className="w-4 h-4 text-slate-500" />
          <span>{hasRepo ? 'Linked' : 'None'}</span>
          {showRedFlags && !hasRepo && (
            <AlertTriangle className="w-3 h-3 text-red-400" />
          )}
        </div>
      </div>
      
      {/* Version count */}
      <div className={`mt-3 pt-3 border-t border-slate-700 flex items-center justify-between text-sm ${showRedFlags && singleVersion ? 'text-red-400' : 'text-slate-400'}`}>
        <span>{versions} version{versions > 1 ? 's' : ''}</span>
        <span>Updated {lastUpdate}</span>
      </div>
    </div>
  );
}

// ============================================
// Main DrillMode Component
// ============================================
export default function DrillMode({ onComplete }) {
  const [phase, setPhase] = useState('intro'); // 'intro', 'drilling', 'results'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [shuffledPackages, setShuffledPackages] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  const timerRef = useRef(null);

  // Shuffle packages on mount - take all 10
  useEffect(() => {
    const shuffled = [...DRILL_PACKAGES].sort(() => Math.random() - 0.5);
    setShuffledPackages(shuffled);
  }, []);

  // Timer
  useEffect(() => {
    if (phase === 'drilling') {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const currentPackage = shuffledPackages[currentIndex];

  // ============================================
  // Handlers
  // ============================================
  const startDrill = () => {
    setPhase('drilling');
    setElapsedSeconds(0);
  };

  const handleAnswer = (answeredReal) => {
    const isCorrect = answeredReal === currentPackage.isReal;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }
    
    setAnswers([...answers, {
      package: currentPackage,
      answeredReal,
      isCorrect,
    }]);
    
    setShowFeedback(true);
  };

  const nextPackage = () => {
    setShowFeedback(false);
    
    if (currentIndex < shuffledPackages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('results');
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

  const getScore = () => answers.filter(a => a.isCorrect).length;
  const getAccuracy = () => answers.length === 0 ? 0 : Math.round((getScore() / answers.length) * 100);

  const getGrade = () => {
    const accuracy = getAccuracy();
    if (accuracy === 100) return { label: 'Perfect!', color: 'text-synthaxis-300', emoji: '🎯', message: 'You\'ve mastered the red flags.' };
    if (accuracy >= 90) return { label: 'Excellent', color: 'text-synthaxis-300', emoji: '🌟', message: 'Strong pattern recognition.' };
    if (accuracy >= 80) return { label: 'Good', color: 'text-blue-400', emoji: '👍', message: 'You\'re building the right instincts.' };
    if (accuracy >= 70) return { label: 'Keep Going', color: 'text-amber-400', emoji: '💪', message: 'Review the red flags you missed.' };
    return { label: 'Needs Practice', color: 'text-red-400', emoji: '📚', message: 'Take time with each registry preview.' };
  };

  // ============================================
  // Render: Intro
  // ============================================
  if (phase === 'intro') {
    return (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">The Verification Drill</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            10 packages. Each shows registry info. Spot the fakes using what you've learned.
          </p>
        </div>
        
        {/* What you'll see */}
        <div className="bg-slate-900/50 rounded-lg p-5 mb-8">
          <h4 className="text-sm font-semibold text-slate-400 mb-3">FOR EACH PACKAGE, YOU'LL SEE:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <Download className="w-4 h-4 text-slate-500" />
              Download count
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-4 h-4 text-slate-500" />
              First release date
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <User className="w-4 h-4 text-slate-500" />
              Maintainer info
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Github className="w-4 h-4 text-slate-500" />
              Repository link
            </div>
          </div>
        </div>
        
        {/* Stats preview */}
        <div className="flex justify-center gap-8 mb-8 text-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10</div>
            <div className="text-slate-500">packages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">~2min</div>
            <div className="text-slate-500">target</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5/5</div>
            <div className="text-slate-500">real/fake</div>
          </div>
        </div>
        
        <button
          onClick={startDrill}
          className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Start Drill
        </button>
      </div>
    );
  }

  // ============================================
  // Render: Results
  // ============================================
  if (phase === 'results') {
    const grade = getGrade();
    const score = getScore();
    const total = shuffledPackages.length;
    
    // Separate missed items by type
    const missedFakes = answers.filter(a => !a.isCorrect && !a.package.isReal);
    const missedReal = answers.filter(a => !a.isCorrect && a.package.isReal);
    
    return (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center border-b border-slate-700">
          <div className="text-5xl mb-3">{grade.emoji}</div>
          <div className="text-4xl font-bold text-white mb-1">{score}/{total}</div>
          <h3 className={`text-xl font-semibold ${grade.color}`}>{grade.label}</h3>
          <p className="text-slate-400 mt-2">{grade.message}</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 border-b border-slate-700">
          <div className="p-4 text-center border-r border-slate-700">
            <div className="text-2xl font-bold text-white">{getAccuracy()}%</div>
            <div className="text-xs text-slate-500">Accuracy</div>
          </div>
          <div className="p-4 text-center border-r border-slate-700">
            <div className="text-2xl font-bold text-white">{formatTime(elapsedSeconds)}</div>
            <div className="text-xs text-slate-500">Time</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-orange-400" />
              {maxStreak}
            </div>
            <div className="text-xs text-slate-500">Best Streak</div>
          </div>
        </div>
        
        {/* Breakdown */}
        <div className="p-4 max-h-64 overflow-y-auto">
          <div className="space-y-2">
            {answers.map((answer, i) => (
              <div 
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  answer.isCorrect ? 'bg-synthaxis-500/10' : 'bg-red-500/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  {answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-synthaxis-300" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <div>
                    <code className="text-slate-200">{answer.package.name}</code>
                    {!answer.isCorrect && answer.package.redFlag && (
                      <div className="text-xs text-amber-400 mt-0.5">
                        Red flag: {answer.package.redFlag}
                      </div>
                    )}
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  answer.package.isReal ? 'text-synthaxis-300' : 'text-red-400'
                }`}>
                  {answer.package.isReal ? 'REAL' : 'FAKE'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Key Learnings */}
        {(missedFakes.length > 0 || missedReal.length > 0) && (
          <div className="p-4 border-t border-slate-700 bg-slate-900/30">
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Review These Red Flags:</h4>
            <div className="space-y-1 text-sm">
              {missedFakes.map((a, i) => (
                <div key={i} className="text-amber-300">
                  • <code className="text-amber-200">{a.package.name}</code>: {a.package.learnPoint}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Continue */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onComplete}
            className="w-full py-3 bg-synthaxis-500 hover:bg-synthaxis-300 text-slate-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // Render: Drilling
  // ============================================
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
      {/* Progress header */}
      <div className="px-5 py-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Progress dots */}
          <div className="flex gap-1">
            {shuffledPackages.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i < currentIndex
                    ? answers[i]?.isCorrect
                      ? 'bg-synthaxis-300'
                      : 'bg-red-400'
                    : i === currentIndex
                      ? 'bg-amber-400 w-4'
                      : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-400">
            {currentIndex + 1} of {shuffledPackages.length}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Streak */}
          {streak > 1 && (
            <div className="flex items-center gap-1 text-orange-400 text-sm">
              <Flame className="w-4 h-4" />
              {streak}
            </div>
          )}
          
          {/* Timer */}
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatTime(elapsedSeconds)}</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-6">
        {!showFeedback ? (
          // Question
          <div className="space-y-5">
            {/* Package name */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-400 mb-3">
                <Package className="w-3 h-3" />
                Package Verification
              </div>
              <div className="text-3xl font-mono font-bold text-white">
                {currentPackage.name}
              </div>
            </div>
            
            {/* Registry preview */}
            <MiniRegistry data={currentPackage.registry} showRedFlags={false} />
            
            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="p-5 rounded-xl border-2 border-slate-600 hover:border-synthaxis-500 hover:bg-synthaxis-500/10 transition-all group"
              >
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-slate-500 group-hover:text-synthaxis-300" />
                <div className="font-semibold text-white">REAL</div>
                <div className="text-xs text-slate-500">Legitimate package</div>
              </button>
              
              <button
                onClick={() => handleAnswer(false)}
                className="p-5 rounded-xl border-2 border-slate-600 hover:border-red-500 hover:bg-red-500/10 transition-all group"
              >
                <XCircle className="w-8 h-8 mx-auto mb-2 text-slate-500 group-hover:text-red-400" />
                <div className="font-semibold text-white">FABRICATED</div>
                <div className="text-xs text-slate-500">AI hallucination</div>
              </button>
            </div>
          </div>
        ) : (
          // Feedback
          <div className="space-y-5 animate-fadeIn">
            {/* Result */}
            <div className="text-center">
              {answers[answers.length - 1]?.isCorrect ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-synthaxis-500/20 rounded-full text-synthaxis-300 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Correct!
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full text-red-400 font-medium">
                  <XCircle className="w-5 h-5" />
                  Incorrect
                </div>
              )}
            </div>
            
            {/* Package name with verdict */}
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-white mb-2">
                {currentPackage.name}
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                currentPackage.isReal 
                  ? 'bg-synthaxis-500/20 text-synthaxis-300' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {currentPackage.isReal ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Real Package
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Fabricated
                  </>
                )}
              </div>
            </div>
            
            {/* Registry with red flags highlighted */}
            <MiniRegistry data={currentPackage.registry} showRedFlags={!currentPackage.isReal} />
            
            {/* Explanation */}
            <div className={`rounded-lg p-4 ${
              currentPackage.isReal 
                ? 'bg-synthaxis-500/10 border border-synthaxis-500/30' 
                : 'bg-red-500/10 border border-red-500/30'
            }`}>
              <p className="text-slate-200 text-sm">{currentPackage.explanation}</p>
            </div>
            
            {/* Red flag callout for fakes */}
            {currentPackage.redFlag && (
              <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-amber-400 font-medium text-sm">Red Flag: {currentPackage.redFlag}</div>
                  <div className="text-amber-200/70 text-sm mt-1">{currentPackage.learnPoint}</div>
                </div>
              </div>
            )}
            
            {/* Learn point for real packages */}
            {currentPackage.isReal && (
              <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-blue-200 text-sm">{currentPackage.learnPoint}</div>
              </div>
            )}
            
            {/* Next button */}
            <button
              onClick={nextPackage}
              className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {currentIndex < shuffledPackages.length - 1 ? 'Next Package' : 'See Results'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}