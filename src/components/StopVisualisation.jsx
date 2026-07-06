// platform/src/components/STOPVisualization.jsx
// Animated STOP Protocol visualizer - AI Discernment Training
// "When AI gives you an answer — STOP."

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Target, 
  Search, 
  CheckCircle 
} from 'lucide-react';

export default function STOPVisualization() {
  // ============================================
  // 01. STATE
  // ============================================
  const [activePhase, setActivePhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // ============================================
  // 02. STOP PROTOCOL PHASES DATA
  // ============================================
  const phases = [
    {
      letter: "S",
      name: "See",
      time: 2,
      description: "See the AI output that fooled real people. Before you learn to spot problems, you need to see how convincing AI hallucinations can be—and why smart people get fooled.",
      icon: Eye,
      color: "amber",
      textColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      activeBg: "bg-amber-500/20",
      activeBorder: "border-amber-500/50",
    },
    {
      letter: "T",
      name: "Test",
      time: 3,
      description: "Test yourself—can you spot the problem? Before we show you the answer, try to find it yourself. This productive struggle primes your brain to remember the pattern.",
      icon: Target,
      color: "blue",
      textColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      activeBg: "bg-blue-500/20",
      activeBorder: "border-blue-500/50",
    },
    {
      letter: "O",
      name: "Observe",
      time: 6,
      description: "Observe the pattern and learn the verification technique. This is the core of each lesson—hands-on practice with real examples, building your pattern recognition muscle.",
      icon: Search,
      color: "violet",
      textColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/30",
      activeBg: "bg-violet-500/20",
      activeBorder: "border-violet-500/50",
    },
    {
      letter: "P",
      name: "Practice",
      time: 4,
      description: "Practice on fresh examples with no scaffolding. Prove to yourself you've got it. Apply the pattern to new AI outputs and build lasting verification skills.",
      icon: CheckCircle,
      color: "emerald",
      textColor: "text-synthaxis-300",
      bgColor: "bg-synthaxis-500/10",
      borderColor: "border-synthaxis-500/30",
      activeBg: "bg-synthaxis-500/20",
      activeBorder: "border-synthaxis-500/50",
    }
  ];

  // ============================================
  // 03. AUTO-ANIMATION EFFECT
  // ============================================
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setActivePhase((prev) => (prev + 1) % phases.length);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activePhase, isAnimating, phases.length]);

  // ============================================
  // 04. CALCULATE PROGRESS
  // ============================================
  const totalTime = phases.reduce((sum, p) => sum + p.time, 0);
  const elapsedTime = phases.slice(0, activePhase + 1).reduce((sum, p) => sum + p.time, 0);

  // ============================================
  // 05. RENDER
  // ============================================
  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* STOP Letters - Horizontal */}
      <div className="flex gap-3 mb-8">
        {phases.map((phase, i) => {
          const isActive = activePhase === i;
          const PhaseIcon = phase.icon;
          
          return (
            <button
              key={phase.letter}
              onClick={() => {
                setActivePhase(i);
                setIsAnimating(false);
              }}
              className={`
                flex-1 p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer
                ${isActive 
                  ? `${phase.activeBg} ${phase.activeBorder} scale-105 shadow-lg` 
                  : `${phase.bgColor} ${phase.borderColor} hover:scale-102`
                }
              `}
            >
              <div className="flex flex-col items-center gap-2">
                {/* Big Letter */}
                <div className={`text-4xl font-bold transition-all duration-300 ${
                  isActive ? phase.textColor : 'text-slate-500'
                }`}>
                  {phase.letter}
                </div>
                
                {/* Phase Name */}
                <div className={`font-semibold text-sm transition-colors duration-300 ${
                  isActive ? 'text-slate-100' : 'text-slate-400'
                }`}>
                  {phase.name}
                </div>
                
                {/* Time */}
                <div className={`text-xs transition-colors duration-300 ${
                  isActive ? phase.textColor : 'text-slate-600'
                }`}>
                  {phase.time} min
                </div>

                {/* Icon (visible when active) */}
                <PhaseIcon 
                  size={20} 
                  className={`transition-all duration-300 ${
                    isActive ? `${phase.textColor} opacity-100` : 'opacity-0'
                  }`} 
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Detail */}
      <div className={`
        border-2 rounded-xl p-8 transition-all duration-300
        ${phases[activePhase].activeBg} ${phases[activePhase].activeBorder}
      `}>
        <div className="flex items-start gap-6">
          
          {/* Icon */}
          <div className={`
            flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center
            ${phases[activePhase].bgColor} border ${phases[activePhase].borderColor}
          `}>
            {React.createElement(phases[activePhase].icon, {
              size: 32,
              className: phases[activePhase].textColor
            })}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-3xl font-bold ${phases[activePhase].textColor}`}>
                {phases[activePhase].letter}
              </span>
              <h3 className="text-2xl font-semibold text-slate-100">
                {phases[activePhase].name}
              </h3>
              <span className={`
                px-2 py-1 text-xs font-medium rounded
                ${phases[activePhase].bgColor} ${phases[activePhase].textColor}
              `}>
                {phases[activePhase].time} minutes
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {phases[activePhase].description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Phase {activePhase + 1} of {phases.length}</span>
            <span>{elapsedTime} / {totalTime} min</span>
          </div>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden flex">
            {phases.map((phase, i) => (
              <div 
                key={phase.letter}
                className={`
                  h-full transition-all duration-500 ease-out
                  ${i <= activePhase ? phase.textColor.replace('text-', 'bg-') : 'bg-transparent'}
                `}
                style={{ width: `${(phase.time / totalTime) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-6 text-center">
        <p className="text-slate-400 text-sm mb-2">
          "When AI gives you an answer — <span className="text-synthaxis-300 font-semibold">STOP.</span>"
        </p>
        <p className="text-slate-500 text-xs">
          <span className="text-slate-300 font-semibold">15 minutes</span> per lesson · 
          <span className="text-slate-300 font-semibold"> 4 phases</span> · 
          <span className="text-slate-300 font-semibold"> 1 pattern</span>
        </p>
        {!isAnimating && (
          <button 
            onClick={() => setIsAnimating(true)}
            className="mt-3 text-synthaxis-300 hover:text-synthaxis-200 transition-colors text-sm"
          >
            ▶ Resume animation
          </button>
        )}
      </div>
    </div>
  );
}