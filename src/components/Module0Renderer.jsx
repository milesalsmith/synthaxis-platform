// src/components/Module0Renderer.jsx
// Renders "Why Smart People Get Fooled" foundation module
//
// Different from PhaseRenderer — this isn't STOP Protocol
// It's psychological priming before the patterns begin
//
// Flow: Trust Test → 3 Biases → Formula → Transition → Start Patterns

import React, { useState } from 'react';
import {
  Brain,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  AlertTriangle,
  Zap,
  ArrowRight,
  Check,
  GraduationCap,
  Sparkles,
  Bot,
  Plus,
  Equal,
  Shield,
  Target
} from 'lucide-react';

// ============================================
// Bias Icons Map
// ============================================
const BIAS_ICONS = {
  authority: GraduationCap,
  fluency: Sparkles,
  automation: Bot
};

const BIAS_COLORS = {
  authority: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-600/10'
  },
  fluency: {
    bg: 'bg-violet-500/20',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    gradient: 'from-violet-500/20 to-violet-600/10'
  },
  automation: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    gradient: 'from-amber-500/20 to-amber-600/10'
  }
};

// ============================================
// Main Component
// ============================================
export default function Module0Renderer({ content, onComplete }) {
  const [section, setSection] = useState('trustTest'); // 'trustTest', 'biases', 'formula', 'transition'
  const [trustTestStep, setTrustTestStep] = useState('question'); // 'question', 'reveal'
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentBiasIndex, setCurrentBiasIndex] = useState(0);
  const [biasStep, setBiasStep] = useState('intro'); // 'intro', 'learning', 'quiz'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

  const sections = ['trustTest', 'biases', 'formula', 'transition'];
  const currentSectionIndex = sections.indexOf(section);

  // ============================================
  // Trust Test Section
  // ============================================
  const renderTrustTest = () => {
    const { trustTest } = content;
    
    if (trustTestStep === 'question') {
      return (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{trustTest.intro.headline}</h2>
            <p className="text-slate-400 mt-2">{trustTest.intro.subtext}</p>
          </div>

          {/* Topic */}
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-slate-800 rounded-full text-slate-400 text-sm">
              Topic: {trustTest.explanations.topic}
            </span>
          </div>

          {/* Two options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A */}
            <button
              onClick={() => setSelectedOption('A')}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                selectedOption === 'A'
                  ? 'border-synthaxis-500 bg-synthaxis-500/10'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Explanation A</span>
                {selectedOption === 'A' && <CheckCircle className="w-5 h-5 text-synthaxis-300" />}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {trustTest.explanations.optionA.text}
              </p>
            </button>

            {/* Option B */}
            <button
              onClick={() => setSelectedOption('B')}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                selectedOption === 'B'
                  ? 'border-synthaxis-500 bg-synthaxis-500/10'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Explanation B</span>
                {selectedOption === 'B' && <CheckCircle className="w-5 h-5 text-synthaxis-300" />}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {trustTest.explanations.optionB.text}
              </p>
            </button>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setTrustTestStep('reveal')}
              disabled={!selectedOption}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
                selectedOption
                  ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              See Result
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    // Reveal step
    const choseA = selectedOption === 'A';
    const reveal = choseA ? trustTest.reveal.ifChoseA : trustTest.reveal.ifChoseB;
    
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Result header */}
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            choseA ? 'bg-amber-500/20' : 'bg-synthaxis-500/20'
          }`}>
            {choseA ? (
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            ) : (
              <CheckCircle className="w-8 h-8 text-synthaxis-300" />
            )}
          </div>
          <h2 className={`text-2xl font-bold ${choseA ? 'text-amber-400' : 'text-synthaxis-300'}`}>
            {reveal.headline}
          </h2>
          <p className="text-slate-300 mt-3 max-w-lg mx-auto">
            {reveal.message}
          </p>
        </div>

        {/* Show what was wrong/right about each */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A - the fluent but wrong one */}
          <div className={`p-5 rounded-xl border ${
            choseA ? 'border-red-500/30 bg-red-500/5' : 'border-slate-700'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">Explanation A — Misleading</span>
            </div>
            <ul className="space-y-2 text-sm">
              {trustTest.explanations.optionA.issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400">
                  <span className="text-red-400 mt-0.5">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          {/* Option B - the clunky but correct one */}
          <div className={`p-5 rounded-xl border ${
            !choseA ? 'border-synthaxis-500/30 bg-synthaxis-500/5' : 'border-slate-700'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-synthaxis-300" />
              <span className="text-synthaxis-300 font-medium">Explanation B — Accurate</span>
            </div>
            <ul className="space-y-2 text-sm">
              {trustTest.explanations.optionB.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400">
                  <span className="text-synthaxis-300 mt-0.5">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Universal insight */}
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            {trustTest.reveal.universal.headline}
          </h3>
          <p className="text-slate-300">
            {trustTest.reveal.universal.message}
          </p>
        </div>
      </div>
    );
  };

  // ============================================
  // Biases Section
  // ============================================
  const renderBiases = () => {
    const { biases } = content;
    const currentBias = biases.items[currentBiasIndex];
    const biasColors = BIAS_COLORS[currentBias?.id] || BIAS_COLORS.authority;
    const BiasIcon = BIAS_ICONS[currentBias?.id] || GraduationCap;

    if (biasStep === 'intro') {
      return (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">{biases.intro.headline}</h2>
            <p className="text-slate-400 mt-2">{biases.intro.subtext}</p>
          </div>

          {/* Three bias cards preview */}
          <div className="grid grid-cols-3 gap-4">
            {biases.items.map((bias, i) => {
              const colors = BIAS_COLORS[bias.id];
              const Icon = BIAS_ICONS[bias.id];
              return (
                <div
                  key={bias.id}
                  className={`p-5 rounded-xl border ${colors.border} ${colors.bg}`}
                >
                  <div className="text-4xl mb-3">{bias.icon}</div>
                  <h3 className={`font-semibold ${colors.text}`}>{bias.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{bias.oneLiner}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-slate-400">Let's explore each one.</p>
          </div>
        </div>
      );
    }

    if (biasStep === 'learning' && currentBias) {
      return (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress */}
          <div className="flex justify-center gap-2">
            {biases.items.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentBiasIndex
                    ? `${biasColors.text.replace('text', 'bg')} w-6`
                    : i < currentBiasIndex
                      ? 'bg-slate-500'
                      : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Bias header */}
          <div className="text-center">
            <div className={`w-20 h-20 ${biasColors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-5xl">{currentBias.icon}</span>
            </div>
            <h2 className={`text-2xl font-bold ${biasColors.text}`}>{currentBias.name}</h2>
            <p className="text-white text-lg mt-2">"{currentBias.oneLiner}"</p>
          </div>

          {/* Description */}
          <div className="bg-slate-800 rounded-xl p-5">
            <p className="text-slate-300">{currentBias.description}</p>
          </div>

          {/* How AI exploits it */}
          <div className={`${biasColors.bg} border ${biasColors.border} rounded-xl p-5`}>
            <div className={`flex items-center gap-2 ${biasColors.text} font-medium mb-2`}>
              <AlertTriangle className="w-4 h-4" />
              How AI Exploits This
            </div>
            <p className="text-slate-300">{currentBias.aiExploit}</p>
          </div>

          {/* Example */}
          <div className="bg-slate-800 rounded-xl p-5 space-y-4">
            <div className="text-slate-400 text-sm font-medium">Example:</div>
            
            {currentBias.example.aiSays && (
              <div className="bg-slate-900 rounded-lg p-4">
                <div className="text-xs text-slate-500 mb-2">AI output:</div>
                <p className="text-slate-200 text-sm italic">
                  {currentBias.example.aiSays}
                </p>
              </div>
            )}
            
            {currentBias.example.userThinks && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Brain className="w-4 h-4" />
                  You think: "{currentBias.example.userThinks}"
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <ChevronRight className="w-4 h-4" />
                  You do: {currentBias.example.userDoes}
                </div>
              </div>
            )}
            
            <div className="pt-3 border-t border-slate-700">
              <div className="text-slate-500 text-sm mb-1">Reality:</div>
              <p className="text-slate-300 text-sm">{currentBias.example.reality}</p>
            </div>
          </div>

          {/* Red flag takeaway */}
          <div className={`flex items-center gap-3 ${biasColors.bg} border ${biasColors.border} rounded-lg p-4`}>
            <Lightbulb className={`w-5 h-5 ${biasColors.text} flex-shrink-0`} />
            <span className={`${biasColors.text} font-medium`}>{currentBias.example.redFlag}</span>
          </div>
        </div>
      );
    }

    if (biasStep === 'quiz') {
      const currentQuizItem = biases.quiz.items[currentQuizIndex];
      const userAnswer = quizAnswers[currentQuizIndex];
      
      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">{biases.quiz.instruction}</h2>
            <p className="text-slate-400 mt-2">
              Question {currentQuizIndex + 1} of {biases.quiz.items.length}
            </p>
          </div>

          {/* Scenario */}
          <div className="bg-slate-800 rounded-xl p-5">
            <p className="text-slate-200">{currentQuizItem.scenario}</p>
          </div>

          {/* Answer options */}
          {!showQuizFeedback && (
            <div className="grid grid-cols-3 gap-3">
              {biases.items.map((bias) => {
                const colors = BIAS_COLORS[bias.id];
                return (
                  <button
                    key={bias.id}
                    onClick={() => {
                      setQuizAnswers({ ...quizAnswers, [currentQuizIndex]: bias.id });
                      setShowQuizFeedback(true);
                    }}
                    className={`p-4 rounded-xl border-2 ${colors.border} hover:${colors.bg} transition-all text-center`}
                  >
                    <span className="text-2xl mb-2 block">{bias.icon}</span>
                    <span className={`${colors.text} font-medium text-sm`}>{bias.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Feedback */}
          {showQuizFeedback && (
            <div className="space-y-4 animate-fadeIn">
              <div className={`flex items-center gap-3 p-4 rounded-xl ${
                userAnswer === currentQuizItem.correctBias
                  ? 'bg-synthaxis-500/20 border border-synthaxis-500/30'
                  : 'bg-amber-500/20 border border-amber-500/30'
              }`}>
                {userAnswer === currentQuizItem.correctBias ? (
                  <CheckCircle className="w-6 h-6 text-synthaxis-300" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                )}
                <div>
                  <div className={`font-medium ${
                    userAnswer === currentQuizItem.correctBias ? 'text-synthaxis-300' : 'text-amber-400'
                  }`}>
                    {userAnswer === currentQuizItem.correctBias ? 'Correct!' : `That was ${biases.items.find(b => b.id === currentQuizItem.correctBias)?.name}`}
                  </div>
                  <p className="text-slate-300 text-sm mt-1">{currentQuizItem.explanation}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (currentQuizIndex < biases.quiz.items.length - 1) {
                    setCurrentQuizIndex(currentQuizIndex + 1);
                    setShowQuizFeedback(false);
                  } else {
                    setSection('formula');
                  }
                }}
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {currentQuizIndex < biases.quiz.items.length - 1 ? 'Next Question' : 'Continue'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  // ============================================
  // Formula Section
  // ============================================
  const renderFormula = () => {
    const { formula } = content;
    
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">{formula.intro.headline}</h2>
          <p className="text-slate-400 mt-2">{formula.intro.subtext}</p>
        </div>

        {/* The equation */}
        <div className="bg-slate-800 rounded-xl p-8">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {formula.equation.components.map((comp, i) => (
              <React.Fragment key={comp.label}>
                <div className="text-center">
                  <div className="text-4xl mb-2">{comp.icon}</div>
                  <div className="text-white font-semibold">{comp.label}</div>
                  <div className="text-slate-500 text-xs max-w-[100px]">{comp.description}</div>
                </div>
                {i < formula.equation.components.length - 1 && (
                  <Plus className="w-6 h-6 text-slate-500" />
                )}
              </React.Fragment>
            ))}
            
            <Equal className="w-6 h-6 text-slate-500 mx-2" />
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-red-400 font-bold">{formula.equation.result.label}</div>
              <div className="text-slate-500 text-xs max-w-[120px]">{formula.equation.result.description}</div>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
          <p className="text-amber-200 text-lg">{formula.insight.text}</p>
          <p className="text-white font-semibold mt-3">{formula.insight.emphasis}</p>
        </div>
      </div>
    );
  };

  // ============================================
  // Transition Section
  // ============================================
  const renderTransition = () => {
    const { transition } = content;
    
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center">
          <div className="w-16 h-16 bg-synthaxis-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-synthaxis-300" />
          </div>
          <h2 className="text-2xl font-bold text-synthaxis-300">{transition.content.headline}</h2>
          <p className="text-slate-300 mt-2">{transition.content.subtext}</p>
        </div>

        {/* Setup points */}
        <div className="space-y-3">
          {transition.content.setup.map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-slate-800 rounded-lg p-4"
            >
              <div className="w-8 h-8 rounded-full bg-synthaxis-500/20 flex items-center justify-center text-synthaxis-300 font-bold">
                {i + 1}
              </div>
              <span className="text-white">{point}</span>
            </div>
          ))}
        </div>

        {/* Pattern preview */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">{transition.content.preview.title}</h3>
          <p className="text-slate-400 text-sm mb-4">{transition.content.preview.description}</p>
          
          <div className="space-y-2">
            {transition.content.preview.patterns.map((pattern) => (
              <div
                key={pattern.number}
                className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-synthaxis-500/20 flex items-center justify-center text-synthaxis-300 font-bold text-sm">
                  {pattern.number}
                </div>
                <div>
                  <span className="text-white font-medium">{pattern.name}</span>
                  <span className="text-slate-500 text-sm ml-2">— {pattern.teaser}</span>
                </div>
              </div>
            ))}
            <div className="text-center text-slate-500 text-sm py-2">
              {transition.content.preview.more}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-synthaxis-300">{transition.cta.headline}</h3>
          <p className="text-slate-400 text-sm mt-2">{transition.cta.subtext}</p>
        </div>
      </div>
    );
  };

  // ============================================
  // Navigation Logic
  // ============================================
  const handleNext = () => {
    if (section === 'trustTest') {
      if (trustTestStep === 'reveal') {
        setSection('biases');
        setBiasStep('intro');
      }
    } else if (section === 'biases') {
      if (biasStep === 'intro') {
        setBiasStep('learning');
      } else if (biasStep === 'learning') {
        if (currentBiasIndex < content.biases.items.length - 1) {
          setCurrentBiasIndex(currentBiasIndex + 1);
        } else {
          setBiasStep('quiz');
        }
      }
      // Quiz handles its own navigation
    } else if (section === 'formula') {
      setSection('transition');
    } else if (section === 'transition') {
      onComplete();
    }
  };

  const getButtonText = () => {
    if (section === 'trustTest' && trustTestStep === 'reveal') return 'Learn Why';
    if (section === 'biases' && biasStep === 'intro') return 'Explore Biases';
    if (section === 'biases' && biasStep === 'learning') {
      return currentBiasIndex < content.biases.items.length - 1 ? 'Next Bias' : 'Test Yourself';
    }
    if (section === 'formula') return 'Continue';
    if (section === 'transition') return 'Begin Pattern 1';
    return 'Continue';
  };

  const showNavigation = !(section === 'biases' && biasStep === 'quiz');

  // ============================================
  // Render
  // ============================================
  return (
    <div className="space-y-8">
      {/* Section progress */}
      <div className="flex justify-center gap-2">
        {sections.map((s, i) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSectionIndex
                ? 'bg-amber-400 w-6'
                : i < currentSectionIndex
                  ? 'bg-amber-400/50'
                  : 'bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        {section === 'trustTest' && renderTrustTest()}
        {section === 'biases' && renderBiases()}
        {section === 'formula' && renderFormula()}
        {section === 'transition' && renderTransition()}
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex justify-end pt-6 border-t border-slate-800">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-amber-500 text-slate-900 hover:bg-amber-400 transition-all"
          >
            {getButtonText()}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}