// src/components/phases/PhaseRenderer.jsx
// PhaseRenderer v3 — Full interactivity for 15-minute STOP Protocol
//
// Each phase has multiple steps to hit time targets:
// S (3 min): Intro → Conversation → Trust Check → Reveal → Impact → Why It Matters
// T (4 min): Intro → 5 Items (Trust/Verify each) → Results → Summary
// O (5 min): Red Flags (4) → Matching Exercise → 30-Second Check Method
// P (5 min): Scenario → Verify 3 Items → Results → Drill Mode → Takeaways

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Eye, 
  FlaskConical, 
  Lightbulb, 
  Target,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  AlertTriangle,
  Shield,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Zap,
  Package,
  Download,
  Calendar,
  User,
  Github,
  Terminal
} from 'lucide-react';

// Lazy load DrillMode for code splitting
const DrillMode = React.lazy(() => import('../DrillMode'));

// ============================================
// PHASE CONFIG
// ============================================
const PHASE_CONFIG = {
  see: {
    icon: Eye,
    label: 'SEE',
    color: 'amber',
    gradient: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10'
  },
  test: {
    icon: FlaskConical,
    label: 'TEST',
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  observe: {
    icon: Lightbulb,
    label: 'OBSERVE',
    color: 'violet',
    gradient: 'from-violet-500/20 to-violet-600/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10'
  },
  practice: {
    icon: Target,
    label: 'PRACTICE',
    color: 'emerald',
    gradient: 'from-synthaxis-500/20 to-synthaxis-600/10',
    border: 'border-synthaxis-500/30',
    text: 'text-synthaxis-300',
    bg: 'bg-synthaxis-500/10'
  }
};

// ============================================
// MAIN PHASE RENDERER
// ============================================
export default function PhaseRenderer({ phase, content, onComplete, onBack }) {
  const config = PHASE_CONFIG[phase];
  const Icon = config.icon;

  // Render the appropriate phase
  const renderPhase = () => {
    switch (phase) {
      case 'see':
        return <SeePhase content={content} config={config} onComplete={onComplete} />;
      case 'test':
        return <TestPhase content={content} config={config} onComplete={onComplete} />;
      case 'observe':
        return <ObservePhase content={content} config={config} onComplete={onComplete} />;
      case 'practice':
        return <PracticePhase content={content} config={config} onComplete={onComplete} />;
      default:
        return <div className="text-white">Unknown phase: {phase}</div>;
    }
  };

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
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>{content.estimatedTime} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {renderPhase()}
      </div>
    </div>
  );
}

// ============================================
// SEE PHASE (3 minutes)
// Steps: Intro → Conversation → Trust Check → Reveal → Impact → Why It Matters
// ============================================
function SeePhase({ content, config, onComplete }) {
  const [step, setStep] = useState(0);
  const [trustAnswer, setTrustAnswer] = useState(null);
  const [trustFeedback, setTrustFeedback] = useState(null);

  const steps = ['intro', 'conversation', 'trustCheck', 'reveal', 'impact', 'whyItMatters'];
  const currentStep = steps[step];

  const handleTrustAnswer = (option) => {
    setTrustAnswer(option.id);
    setTrustFeedback(option.response);
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-all ${
              i === step ? 'bg-amber-400 w-6' : i < step ? 'bg-amber-400/50' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[400px]">
        {currentStep === 'intro' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-white">{content.intro.headline}</h2>
            <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line">
              {content.intro.context}
            </p>
          </div>
        )}

        {currentStep === 'conversation' && (
          <div className="space-y-6 animate-fadeIn">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-blue-600 rounded-2xl rounded-br-md px-5 py-3 max-w-md">
                <p className="text-white">{content.conversation.userMessage}</p>
              </div>
            </div>

            {/* AI response */}
            <div className="flex justify-start">
              <div className="bg-slate-700 rounded-2xl rounded-bl-md px-5 py-4 max-w-2xl">
                <div className="prose prose-invert prose-sm">
                  <div className="text-slate-200 whitespace-pre-line font-mono text-sm">
                    {content.conversation.aiResponse.text}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3 italic">
                  {content.conversation.aiResponse.note}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'trustCheck' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-white">{content.trustCheck.question}</h2>
            <p className="text-slate-400">{content.trustCheck.subtext}</p>
            
            <div className="space-y-3">
              {content.trustCheck.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleTrustAnswer(option)}
                  disabled={trustAnswer !== null}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    trustAnswer === option.id
                      ? 'border-amber-500 bg-amber-500/10'
                      : trustAnswer !== null
                      ? 'border-slate-700 bg-slate-800/50 opacity-50'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <p className="text-white">{option.label}</p>
                </button>
              ))}
            </div>

            {trustFeedback && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 animate-fadeIn">
                <p className="text-amber-200">{trustFeedback}</p>
              </div>
            )}
          </div>
        )}

        {currentStep === 'reveal' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-red-400">{content.reveal.headline}</h2>
            </div>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              {content.reveal.explanation}
            </p>

            <div className="bg-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-white">{content.reveal.whatHappened.title}</h3>
              <ol className="space-y-3">
                {content.reveal.whatHappened.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-medium">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {currentStep === 'impact' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-white text-center">The Impact</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {content.impact.stats.map((stat, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-amber-400">{stat.value}</div>
                  <div className="text-white font-medium mt-1">{stat.label}</div>
                  <div className="text-slate-400 text-sm mt-1">{stat.detail}</div>
                </div>
              ))}
            </div>

            <p className="text-center text-slate-500 text-sm">{content.impact.source}</p>
          </div>
        )}

        {currentStep === 'whyItMatters' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-white">{content.whyItMatters.title}</h2>
            
            <div className="space-y-4">
              {content.whyItMatters.points.map((point, i) => (
                <div 
                  key={i} 
                  className={`rounded-xl p-5 ${
                    i === 0 ? 'bg-slate-800' : 'bg-red-500/10 border border-red-500/30'
                  }`}
                >
                  <div className={`font-medium ${i === 0 ? 'text-slate-400' : 'text-red-400'}`}>
                    {point.scenario}
                  </div>
                  <div className="text-white mt-1">{point.outcome}</div>
                </div>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-amber-200">{content.whyItMatters.conclusion}</p>
            </div>

            <p className="text-slate-400 italic text-center">{content.transition}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-800">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            step === 0
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === 'trustCheck' && trustAnswer === null}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            currentStep === 'trustCheck' && trustAnswer === null
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-amber-500 text-slate-900 hover:bg-amber-400'
          }`}
        >
          {step === steps.length - 1 ? 'Continue to Test' : 'Continue'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================
// TEST PHASE (4 minutes)
// Steps: Intro → Items (one by one) → Results
// ============================================
function TestPhase({ content, config, onComplete }) {
  const [step, setStep] = useState('intro'); // 'intro', 0-4 (item indices), 'results'
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  
  const currentItemIndex = typeof step === 'number' ? step : null;
  const currentItem = currentItemIndex !== null ? content.items[currentItemIndex] : null;

  const handleAnswer = (itemId, answer) => {
    setAnswers({ ...answers, [itemId]: answer });
    setShowFeedback(true);
  };

  const nextStep = () => {
    setShowFeedback(false);
    if (step === 'intro') {
      setStep(0);
    } else if (typeof step === 'number' && step < content.items.length - 1) {
      setStep(step + 1);
    } else {
      setStep('results');
    }
  };

  const calculateScore = () => {
    return content.items.filter(item => {
      const answer = answers[item.id];
      // 'verify' is correct for fabricated (not real), 'trust' is correct for real
      return (answer === 'verify' && !item.isReal) || (answer === 'trust' && item.isReal);
    }).length;
  };

  const getScoreFeedback = (score) => {
    if (score >= content.scoring.perfect.threshold) return content.scoring.perfect;
    if (score >= content.scoring.good.threshold) return content.scoring.good;
    if (score >= content.scoring.okay.threshold) return content.scoring.okay;
    return content.scoring.needsWork;
  };

  return (
    <div className="space-y-8">
      {/* Progress */}
      {typeof step === 'number' && (
        <div className="flex justify-center gap-2">
          {content.items.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? 'bg-blue-400 w-6' : i < step ? 'bg-blue-400/50' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      )}

      <div className="min-h-[450px]">
        {step === 'intro' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-white">{content.intro.headline}</h2>
            <p className="text-lg text-slate-300">{content.intro.instruction}</p>
            <p className="text-slate-400 italic">{content.intro.note}</p>
            
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="flex-1 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-synthaxis-300" />
                  <div className="font-medium">TRUST</div>
                  <div className="text-sm text-slate-400">Install immediately</div>
                </div>
                <div className="text-slate-600">or</div>
                <div className="flex-1 text-center">
                  <HelpCircle className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                  <div className="font-medium">VERIFY</div>
                  <div className="text-sm text-slate-400">Check before installing</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentItem && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center text-slate-400 text-sm">
              Question {currentItemIndex + 1} of {content.items.length}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 space-y-4">
              <p className="text-slate-400 text-sm">{currentItem.context}</p>
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-white font-mono">"{currentItem.aiSaid}"</p>
              </div>
            </div>

            {!answers[currentItem.id] && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer(currentItem.id, 'trust')}
                  className="p-6 rounded-xl border-2 border-slate-700 hover:border-synthaxis-500 hover:bg-synthaxis-500/10 transition-all group"
                >
                  <Shield className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-synthaxis-300" />
                  <div className="font-medium text-white">TRUST</div>
                  <div className="text-sm text-slate-400">Install it</div>
                </button>
                <button
                  onClick={() => handleAnswer(currentItem.id, 'verify')}
                  className="p-6 rounded-xl border-2 border-slate-700 hover:border-amber-500 hover:bg-amber-500/10 transition-all group"
                >
                  <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-amber-400" />
                  <div className="font-medium text-white">VERIFY</div>
                  <div className="text-sm text-slate-400">Check first</div>
                </button>
              </div>
            )}

            {showFeedback && answers[currentItem.id] && (
              <div className={`rounded-xl p-5 animate-fadeIn ${
                currentItem.isReal 
                  ? 'bg-synthaxis-500/10 border border-synthaxis-500/30' 
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                <div className="flex items-start gap-3">
                  {currentItem.isReal ? (
                    <CheckCircle2 className="w-6 h-6 text-synthaxis-300 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${currentItem.isReal ? 'text-synthaxis-300' : 'text-red-400'}`}>
                      {currentItem.explanation}
                    </p>
                    {currentItem.redFlag && (
                      <p className="text-slate-400 mt-2 text-sm">
                        <span className="text-amber-400">Red flag:</span> {currentItem.redFlag}
                      </p>
                    )}
                    {currentItem.downloads && (
                      <p className="text-slate-400 mt-2 text-sm">
                        Downloads: {currentItem.downloads}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6 animate-fadeIn">
            {(() => {
              const score = calculateScore();
              const feedback = getScoreFeedback(score);
              return (
                <>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-400 mb-2">{score}/{content.items.length}</div>
                    <p className="text-xl text-white">{feedback.message}</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-4">Results breakdown:</h3>
                    <div className="space-y-3">
                      {content.items.map((item) => {
                        const answer = answers[item.id];
                        const isCorrect = (answer === 'verify' && !item.isReal) || (answer === 'trust' && item.isReal);
                        return (
                          <div key={item.id} className="flex items-center gap-3">
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-synthaxis-300" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                            <span className="text-slate-300 text-sm flex-1 truncate">
                              {item.aiSaid.substring(0, 50)}...
                            </span>
                            <span className={`text-sm ${item.isReal ? 'text-synthaxis-300' : 'text-red-400'}`}>
                              {item.isReal ? 'Real' : 'Fabricated'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-200">{content.summary.insight}</p>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-6 border-t border-slate-800">
        <button
          onClick={step === 'results' ? onComplete : nextStep}
          disabled={typeof step === 'number' && !answers[currentItem?.id]}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            typeof step === 'number' && !answers[currentItem?.id]
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-400'
          }`}
        >
          {step === 'results' ? 'Continue to Observe' : step === 'intro' ? 'Start Test' : 'Next Question'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================
// OBSERVE PHASE (5 minutes)
// Steps: Red Flags → Matching Exercise → Verification Method
// ============================================
function ObservePhase({ content, config, onComplete }) {
  const [step, setStep] = useState('intro'); // 'intro', 'flags', 0-3 (flag index), 'matching', 'method', 'done'
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [matchAnswers, setMatchAnswers] = useState({});
  const [showMatchFeedback, setShowMatchFeedback] = useState({});

  const nextStep = () => {
    if (step === 'intro') {
      setStep('flags');
    } else if (step === 'flags') {
      if (currentFlagIndex < content.redFlags.length - 1) {
        setCurrentFlagIndex(currentFlagIndex + 1);
      } else {
        setStep('matching');
      }
    } else if (step === 'matching') {
      setStep('method');
    } else if (step === 'method') {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step === 'flags' && currentFlagIndex > 0) {
      setCurrentFlagIndex(currentFlagIndex - 1);
    } else if (step === 'flags' && currentFlagIndex === 0) {
      setStep('intro');
    } else if (step === 'matching') {
      setStep('flags');
      setCurrentFlagIndex(content.redFlags.length - 1);
    } else if (step === 'method') {
      setStep('matching');
    }
  };

  const handleMatchAnswer = (itemIndex, flagId) => {
    setMatchAnswers({ ...matchAnswers, [itemIndex]: flagId });
    setShowMatchFeedback({ ...showMatchFeedback, [itemIndex]: true });
  };

  const currentFlag = content.redFlags[currentFlagIndex];

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex justify-center gap-2">
        <div className={`w-2 h-2 rounded-full ${step === 'intro' ? 'bg-violet-400 w-6' : 'bg-violet-400/50'}`} />
        <div className={`w-2 h-2 rounded-full ${step === 'flags' ? 'bg-violet-400 w-6' : step !== 'intro' ? 'bg-violet-400/50' : 'bg-slate-600'}`} />
        <div className={`w-2 h-2 rounded-full ${step === 'matching' ? 'bg-violet-400 w-6' : ['method'].includes(step) ? 'bg-violet-400/50' : 'bg-slate-600'}`} />
        <div className={`w-2 h-2 rounded-full ${step === 'method' ? 'bg-violet-400 w-6' : 'bg-slate-600'}`} />
      </div>

      <div className="min-h-[450px]">
        {step === 'intro' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-white">{content.intro.headline}</h2>
            <p className="text-lg text-slate-300">{content.intro.subtext}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {content.redFlags.map((flag, i) => (
                <div key={flag.id} className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">{flag.icon}</span>
                  <span className="text-white font-medium">{flag.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'flags' && currentFlag && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentFlag.icon}</span>
                <div>
                  <div className="text-sm text-violet-400">Red Flag {currentFlagIndex + 1} of {content.redFlags.length}</div>
                  <h2 className="text-2xl font-semibold text-white">{currentFlag.name}</h2>
                </div>
              </div>
            </div>

            <p className="text-lg text-slate-300">{currentFlag.description}</p>

            {currentFlag.examples.fake && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="text-red-400 text-sm font-medium mb-2">❌ Fabricated examples:</div>
                  <div className="space-y-1">
                    {currentFlag.examples.fake.map((ex, i) => (
                      <code key={i} className="block text-slate-300 text-sm">{ex}</code>
                    ))}
                  </div>
                </div>
                <div className="bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-xl p-4">
                  <div className="text-synthaxis-300 text-sm font-medium mb-2">✓ Real examples:</div>
                  <div className="space-y-1">
                    {currentFlag.examples.real.map((ex, i) => (
                      <code key={i} className="block text-slate-300 text-sm">{ex}</code>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentFlag.examples.yourQuestion && (
              <div className="bg-slate-800 rounded-xl p-5 space-y-3">
                <div>
                  <span className="text-slate-400 text-sm">Your question:</span>
                  <p className="text-white">"{currentFlag.examples.yourQuestion}"</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">AI invents:</span>
                  <code className="block text-red-400">{currentFlag.examples.aiInvents}</code>
                </div>
                <p className="text-slate-400 text-sm italic">{currentFlag.examples.reality}</p>
              </div>
            )}

            {currentFlag.examples.realPackage && (
              <div className="bg-slate-800 rounded-xl p-5 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-synthaxis-300 text-sm">Real package:</span>
                    <code className="block text-white text-lg">{currentFlag.examples.realPackage}</code>
                  </div>
                  <div>
                    <span className="text-red-400 text-sm">AI fabricated:</span>
                    <code className="block text-white text-lg">{currentFlag.examples.aiFabricated}</code>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">{currentFlag.examples.note}</p>
              </div>
            )}

            {currentFlag.examples.realTools && (
              <div className="bg-slate-800 rounded-xl p-5 space-y-3">
                <div>
                  <span className="text-synthaxis-300 text-sm">Real tools:</span>
                  <div className="flex gap-2 mt-1">
                    {currentFlag.examples.realTools.map((tool, i) => (
                      <code key={i} className="bg-slate-700 px-2 py-1 rounded text-white">{tool}</code>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-red-400 text-sm">AI invents:</span>
                  <code className="block text-white text-lg">{currentFlag.examples.aiInvents}</code>
                </div>
                <p className="text-slate-400 text-sm">{currentFlag.examples.note}</p>
              </div>
            )}

            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
              <div className="text-violet-400 text-sm font-medium mb-1">Why it happens:</div>
              <p className="text-slate-300">{currentFlag.whyItHappens}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <div className="text-white font-medium mb-1">How to spot it:</div>
              <p className="text-slate-300">{currentFlag.howToSpot}</p>
            </div>
          </div>
        )}

        {step === 'matching' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-white">{content.matchingExercise.title}</h2>
            <p className="text-slate-400">{content.matchingExercise.instruction}</p>

            <div className="space-y-4">
              {content.matchingExercise.items.map((item, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-5">
                  <code className="text-lg text-white block mb-3">{item.tool}</code>
                  
                  {!matchAnswers[i] && (
                    <div className="flex flex-wrap gap-2">
                      {content.redFlags.map((flag) => (
                        <button
                          key={flag.id}
                          onClick={() => handleMatchAnswer(i, flag.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-violet-500/20 hover:text-violet-300 text-slate-300 text-sm transition-all"
                        >
                          {flag.icon} {flag.name}
                        </button>
                      ))}
                      {item.isReal && (
                        <button
                          onClick={() => handleMatchAnswer(i, 'trick-question')}
                          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-synthaxis-500/20 hover:text-synthaxis-200 text-slate-300 text-sm transition-all"
                        >
                          ✓ It's actually real
                        </button>
                      )}
                    </div>
                  )}

                  {showMatchFeedback[i] && (
                    <div className={`mt-3 p-3 rounded-lg ${
                      matchAnswers[i] === item.correctFlag 
                        ? 'bg-synthaxis-500/10 border border-synthaxis-500/30' 
                        : 'bg-amber-500/10 border border-amber-500/30'
                    }`}>
                      <p className={matchAnswers[i] === item.correctFlag ? 'text-synthaxis-200' : 'text-amber-300'}>
                        {item.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'method' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <Shield className="w-12 h-12 text-violet-400 mx-auto mb-3" />
              <h2 className="text-2xl font-semibold text-white">{content.verificationMethod.name}</h2>
              <p className="text-violet-300">{content.verificationMethod.tagline}</p>
            </div>

            <div className="space-y-3">
              {content.verificationMethod.steps.map((step) => (
                <div key={step.number} className="bg-slate-800 rounded-xl p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-400 font-bold">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{step.action}</div>
                    <div className="text-slate-400 text-sm">{step.detail}</div>
                  </div>
                  <div className="text-slate-500 text-sm">{step.time}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-xl p-4">
                <div className="text-synthaxis-300 text-sm font-medium mb-2">✓ Good signs:</div>
                <ul className="space-y-1">
                  {content.verificationMethod.whatToLookFor.good.map((item, i) => (
                    <li key={i} className="text-slate-300 text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="text-amber-400 text-sm font-medium mb-2">⚠ Warning signs:</div>
                <ul className="space-y-1">
                  {content.verificationMethod.whatToLookFor.suspicious.map((item, i) => (
                    <li key={i} className="text-slate-300 text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 text-center">
              <p className="text-violet-200">{content.verificationMethod.whyItWorks}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-800">
        <button
          onClick={prevStep}
          disabled={step === 'intro'}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            step === 'intro'
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={nextStep}
          disabled={step === 'matching' && Object.keys(matchAnswers).length < content.matchingExercise.items.length}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            step === 'matching' && Object.keys(matchAnswers).length < content.matchingExercise.items.length
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-violet-500 text-white hover:bg-violet-400'
          }`}
        >
          {step === 'method' ? 'Continue to Practice' : 'Continue'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================
// PRACTICE PHASE (6 minutes)
// Steps: Know Your Registry → Drill → Toolkit → Takeaways
// ============================================
function PracticePhase({ content, config, onComplete }) {
  const [step, setStep] = useState('registry'); // 'registry', 'comparison', 'drill', 'toolkit', 'takeaways'
  const [drillComplete, setDrillComplete] = useState(false);
  const [expandedCommand, setExpandedCommand] = useState(null);

  const handleDrillComplete = () => {
    setDrillComplete(true);
    setStep('toolkit');
  };

  const progressSteps = ['registry', 'comparison', 'drill', 'toolkit', 'takeaways'];

  // Helper to render registry stats
  const RegistryPreview = ({ data, type, showIndicators = false }) => {
    const isLegit = type === 'legitimate';
    const stats = data.stats;
    
    return (
      <div className={`bg-slate-900 rounded-xl border ${isLegit ? 'border-synthaxis-500/30' : 'border-red-500/30'} overflow-hidden`}>
        {/* Header */}
        <div className={`px-4 py-2 ${isLegit ? 'bg-synthaxis-500/10' : 'bg-red-500/10'} border-b border-slate-800`}>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 text-sm">pypi.org/project/</span>
            <span className="text-white font-medium">{data.name}</span>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{data.name}</h3>
              <span className="text-slate-400">{data.version}</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">{data.description}</p>
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className={`flex items-center gap-2 ${!isLegit && parseInt(stats.downloads) < 1000 ? 'text-red-400' : 'text-slate-300'}`}>
              <Download className="w-4 h-4 text-slate-500" />
              <span>{stats.downloads}</span>
              {!isLegit && parseInt(stats.downloads) < 1000 && <AlertTriangle className="w-3 h-3" />}
            </div>
            
            <div className={`flex items-center gap-2 ${!isLegit && stats.firstRelease.includes('day') ? 'text-red-400' : 'text-slate-300'}`}>
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Since {stats.firstRelease}</span>
              {!isLegit && stats.firstRelease.includes('day') && <AlertTriangle className="w-3 h-3" />}
            </div>
            
            <div className={`flex items-center gap-2 ${!isLegit && stats.maintainers.length === 0 ? 'text-red-400' : 'text-slate-300'}`}>
              <User className="w-4 h-4 text-slate-500" />
              <span>{stats.maintainers.length > 0 ? stats.maintainers[0] : 'Anonymous'}</span>
              {!isLegit && stats.maintainers.length === 0 && <AlertTriangle className="w-3 h-3" />}
            </div>
            
            <div className={`flex items-center gap-2 ${!isLegit && !stats.repository ? 'text-red-400' : 'text-slate-300'}`}>
              <Github className="w-4 h-4 text-slate-500" />
              <span>{stats.repository ? 'Linked' : 'None'}</span>
              {!isLegit && !stats.repository && <AlertTriangle className="w-3 h-3" />}
            </div>
          </div>
          
          {/* Version count */}
          <div className={`pt-3 border-t border-slate-800 flex items-center justify-between text-sm ${!isLegit && stats.versions === 1 ? 'text-red-400' : 'text-slate-400'}`}>
            <span>{stats.versions} version{stats.versions > 1 ? 's' : ''}</span>
            <span>Updated {stats.lastUpdate}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex justify-center gap-2">
        {progressSteps.map((s, i) => {
          const stepIndex = progressSteps.indexOf(step);
          return (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                i === stepIndex 
                  ? 'bg-synthaxis-300 w-6' 
                  : i < stepIndex 
                    ? 'bg-synthaxis-300/50' 
                    : 'bg-slate-600'
              }`}
            />
          );
        })}
      </div>

      <div className="min-h-[450px]">
        {/* Step 1: Know Your Registry - Legitimate Example */}
        {step === 'registry' && content.knowYourRegistry && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">{content.knowYourRegistry.headline}</h2>
              <p className="text-slate-400 mt-2">{content.knowYourRegistry.subtext}</p>
            </div>
            
            <RegistryPreview 
              data={content.knowYourRegistry.legitimateExample} 
              type="legitimate" 
            />
            
            {/* Good signs callout */}
            <div className="bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-xl p-5">
              <h4 className="text-synthaxis-300 font-medium mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Signs of a Legitimate Package
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {content.knowYourRegistry.legitimateExample.goodSigns.map((sign, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-synthaxis-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">{sign.label}:</span>
                      <span className="text-slate-400 ml-1">{sign.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Side-by-side comparison */}
        {step === 'comparison' && content.knowYourRegistry && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">{content.knowYourRegistry.comparison.title}</h2>
              <p className="text-slate-400 mt-2">{content.knowYourRegistry.comparison.instruction}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Legitimate */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-synthaxis-300" />
                  <span className="text-synthaxis-300 font-medium">Legitimate</span>
                </div>
                <RegistryPreview 
                  data={content.knowYourRegistry.legitimateExample} 
                  type="legitimate" 
                />
              </div>
              
              {/* Suspicious */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">Suspicious</span>
                </div>
                <RegistryPreview 
                  data={content.knowYourRegistry.suspiciousExample} 
                  type="suspicious" 
                />
              </div>
            </div>
            
            {/* Red flags */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h4 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Red Flags on {content.knowYourRegistry.suspiciousExample.name}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {content.knowYourRegistry.suspiciousExample.redFlags.slice(0, 6).map((flag, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{flag.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Drill */}
        {step === 'drill' && (
          <div className="animate-fadeIn">
            <Suspense fallback={
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Loading drill...</p>
              </div>
            }>
              <DrillMode onComplete={handleDrillComplete} />
            </Suspense>
          </div>
        )}

        {/* Step 4: Toolkit */}
        {step === 'toolkit' && content.toolkit && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <Terminal className="w-12 h-12 text-synthaxis-300 mx-auto mb-3" />
              <h2 className="text-2xl font-semibold text-white">{content.toolkit.headline}</h2>
              <p className="text-slate-400 mt-2">{content.toolkit.subtext}</p>
            </div>
            
            {/* Commands */}
            <div className="space-y-3">
              {content.toolkit.commands.map((cmd, i) => (
                <div key={i} className="bg-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedCommand(expandedCommand === i ? null : i)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                        cmd.ecosystem === 'pip' ? 'bg-blue-500/20 text-blue-400' :
                        cmd.ecosystem === 'npm' ? 'bg-red-500/20 text-red-400' :
                        'bg-slate-700 text-slate-400'
                      }`}>
                        {cmd.ecosystem.toUpperCase().slice(0, 3)}
                      </div>
                      <span className="text-white font-medium">{cmd.title}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${expandedCommand === i ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {expandedCommand === i && (
                    <div className="px-4 pb-4 space-y-3 animate-fadeIn">
                      <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm">
                        <span className="text-synthaxis-300">$</span>
                        <span className="text-slate-300 ml-2">{cmd.command}</span>
                      </div>
                      {cmd.output && (
                        <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-400 whitespace-pre-line">
                          {cmd.output}
                        </div>
                      )}
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-amber-200">
                        <strong>What to look for:</strong> {cmd.whatToLookFor}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Quick reference */}
            <div className="bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-xl p-5">
              <h4 className="text-synthaxis-300 font-medium mb-3">{content.toolkit.quickReference.title}</h4>
              <ol className="space-y-2">
                {content.toolkit.quickReference.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-synthaxis-500/20 flex items-center justify-center text-synthaxis-300 text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Step 5: Takeaways */}
        {step === 'takeaways' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-synthaxis-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white">{content.completionMessage.title}</h2>
            </div>

            <p className="text-slate-300 text-center">{content.completionMessage.summary}</p>

            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">{content.checklist.title}</h3>
              <div className="space-y-3">
                {content.checklist.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-synthaxis-500/50 flex items-center justify-center">
                      <Check className="w-3 h-3 text-synthaxis-300" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-synthaxis-300 font-medium mb-1">
                <ArrowRight className="w-4 h-4" />
                Up Next
              </div>
              <p className="text-slate-300">{content.completionMessage.nextStep}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {step !== 'drill' && (
        <div className="flex justify-end pt-6 border-t border-slate-800">
          <button
            onClick={() => {
              if (step === 'registry') setStep('comparison');
              else if (step === 'comparison') setStep('drill');
              else if (step === 'toolkit') setStep('takeaways');
              else if (step === 'takeaways') onComplete();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all bg-synthaxis-500 text-white hover:bg-synthaxis-300"
          >
            {step === 'takeaways' 
              ? 'Complete Pattern' 
              : step === 'comparison'
                ? 'Start Drill'
                : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

