// platform/src/components/Landing.jsx
// Synthaxis.ai - The AI Discernment Training Platform
// "Discernment is the pause. When AI gives you an answer — STOP."

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Target,
  Shield,
  ArrowRight,
  Play,
  TrendingUp,
  Eye,
  Search,
  Brain,
  AlertTriangle,
  Quote
} from 'lucide-react';
import STOPVisualization from './StopVisualisation.jsx';

function Landing() {
  const navigate = useNavigate();

  // ============================================
  // SECTION 1: Data
  // ============================================
  
  const stats = [
    { value: '10', label: 'hallucination patterns', icon: Eye },
    { value: '15', label: 'minutes per pattern', icon: Clock },
    { value: '~3hrs', label: 'to AI discernment', icon: TrendingUp },
  ];

  // 10 Hallucination Patterns
  const lessons = [
    { 
      number: '01', 
      name: 'Confident Fabrication', 
      description: 'When AI invents packages, libraries, or tools that don\'t exist',
      realCase: '30,000 developers installed a fake package',
      status: 'available'
    },
    { 
      number: '02', 
      name: 'Plausible Syntax', 
      description: 'Code that looks right but won\'t run',
      realCase: 'Syntax errors hidden in confident responses',
      status: 'coming'
    },
    { 
      number: '03', 
      name: 'Version Hallucination', 
      description: 'Deprecated APIs recommended as current',
      realCase: 'Legacy methods breaking production code',
      status: 'coming'
    },
    { 
      number: '04', 
      name: 'Phantom Citation', 
      description: 'Academic sources that don\'t exist',
      realCase: 'Lawyers cited fake cases in court filings',
      status: 'coming'
    },
    { 
      number: '05', 
      name: 'Statistics Invention', 
      description: 'Made-up numbers stated with confidence',
      realCase: 'Fabricated data in business reports',
      status: 'coming'
    },
    { 
      number: '06', 
      name: 'API Mirage', 
      description: 'Endpoints and methods that don\'t exist',
      realCase: 'Integration failures from phantom APIs',
      status: 'coming'
    },
    { 
      number: '07', 
      name: 'Historical Confabulation', 
      description: 'Wrong dates, events, and attributions',
      realCase: 'Misattributed quotes spread as fact',
      status: 'coming'
    },
    { 
      number: '08', 
      name: 'Logic Phantom', 
      description: 'Reasoning that sounds valid but isn\'t',
      realCase: 'Flawed analysis accepted as insight',
      status: 'coming'
    },
    { 
      number: '09', 
      name: 'Confident Extrapolation', 
      description: 'Claims that go beyond training data',
      realCase: 'Future predictions stated as fact',
      status: 'coming'
    },
    { 
      number: '10', 
      name: 'Authoritative Blend', 
      description: 'Real and fake information mixed together',
      realCase: 'Truth and fiction woven seamlessly',
      status: 'coming'
    },
  ];

  const audiences = [
    'Product Managers',
    'Developers', 
    'Founders',
    'Researchers',
    'Anyone using AI at work'
  ];

  // ============================================
  // SECTION 2: Render
  // ============================================
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* ============================================
          HERO - "Discernment is the pause"
          ============================================ */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-synthaxis-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-20">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/synthaxis-logo.png" 
              alt="Synthaxis" 
              className="h-12 w-auto"
            />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">
              <Shield size={14} className="text-synthaxis-300" />
              AI Discernment Training
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            <span className="text-slate-400">Discernment is</span>
            <br />
            <span className="text-synthaxis-300">the pause.</span>
          </h1>

          {/* Subhead */}
          <p className="text-center text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            The breath before you copy-paste. The second look before you ship.
          </p>
          <p className="text-center text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            When AI gives you an answer — <span className="text-synthaxis-300 font-semibold">STOP.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => navigate('/foundation')}
              className="group flex items-center gap-2 px-8 py-4 bg-synthaxis-500 hover:bg-synthaxis-400 text-white font-semibold rounded-lg transition-all"
            >
              <Play size={20} />
              Why do smart people get fooled by AI?
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                <stat.icon size={24} className="text-synthaxis-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          THE PROBLEM - Why Discernment Matters
          ============================================ */}
      <section className="border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                AI gives plausible answers.
                <br />
                <span className="text-slate-500">Not always correct ones.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                30,000 developers installed a package that didn't exist. Lawyers cited fake court cases. 
                Researchers quoted fabricated statistics. The AI sounded confident every time.
              </p>
              <p className="text-slate-400 leading-relaxed">
                <span className="text-synthaxis-300">Discernment</span> — the ability to verify AI output — 
                is now the most important skill for anyone using AI professionally.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-5 bg-red-950/20 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-medium text-slate-100 mb-1">The huggingface-cli incident</div>
                    <div className="text-sm text-slate-400">
                      ChatGPT recommended a package that didn't exist. 30,000+ developers installed it. 
                      Alibaba added it to their documentation. It was a hallucination.
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-lg">
                <div className="flex items-start gap-4">
                  <Brain className="text-synthaxis-300 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-medium text-slate-100 mb-1">Patterns are learnable</div>
                    <div className="text-sm text-slate-400">
                      AI hallucinations follow recognisable patterns. Once you learn them, you can spot them. 
                      Every time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          THE STOP PROTOCOL (Animated)
          ============================================ */}
      <section className="border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">The STOP Protocol</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every pattern follows the same 15-minute structure. 
              Build the muscle memory for AI verification.
            </p>
          </div>

          {/* Animated STOP Visualization */}
          <STOPVisualization />
        </div>
      </section>

      {/* ============================================
          THE 10 PATTERNS
          ============================================ */}
      <section className="border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">The Curriculum</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Start with the psychology. Then learn the 10 patterns.
              <br />
              Each pattern teaches you to recognise and verify one type of AI mistake.
            </p>
          </div>

          <div className="grid gap-3">
            {/* Module 0: Foundation */}
            <div 
              className="p-5 border rounded-xl transition-all bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50 cursor-pointer"
              onClick={() => navigate('/foundation')}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-slate-100">Why Smart People Get Fooled</h3>
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                        Start here
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">The 3 biases that make AI mistakes invisible</p>
                    <p className="text-xs text-slate-500 mt-1">Foundation · 10 min</p>
                  </div>
                </div>
                <ArrowRight className="text-amber-400 flex-shrink-0" size={20} />
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs text-slate-600 uppercase tracking-wider">Then learn the patterns</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Pattern lessons */}
            {lessons.map((lesson) => (
              <div 
                key={lesson.number}
                className={`p-5 border rounded-xl transition-all ${
                  lesson.status === 'available' 
                    ? 'bg-slate-800/50 border-synthaxis-500/30 hover:border-synthaxis-500/50 cursor-pointer' 
                    : 'bg-slate-900/30 border-slate-800 opacity-50'
                }`}
                onClick={() => lesson.status === 'available' && navigate('/learn/1')}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-slate-600 w-8">{lesson.number}</span>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-slate-100">{lesson.name}</h3>
                      </div>
                      <p className="text-sm text-slate-400">{lesson.description}</p>
                      <p className="text-xs text-slate-600 mt-1">Real case: {lesson.realCase}</p>
                    </div>
                  </div>
                  {lesson.status === 'available' && (
                    <ArrowRight className="text-synthaxis-300 flex-shrink-0" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          AI FLUENCY FRAMEWORK ALIGNMENT
          ============================================ */}
      <section className="border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-400 mb-6">
              Built on the AI Fluency Framework
            </div>
            
            <h2 className="text-2xl font-semibold mb-6">
              Discernment is one of four core AI competencies.
              <br />
              <span className="text-slate-500">It's also the most undersupported.</span>
            </h2>
            
            <p className="text-slate-400 leading-relaxed mb-8">
              The AI Fluency Framework — developed by researchers at Ringling College, University College Cork, 
              and Anthropic — identifies four competencies: Delegation, Description, Discernment, and Diligence.
            </p>
            
            <div className="grid grid-cols-4 gap-3 mb-8">
              <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-lg opacity-50">
                <div className="text-sm font-medium text-slate-400">Delegation</div>
                <div className="text-xs text-slate-600">When to use AI</div>
              </div>
              <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-lg opacity-50">
                <div className="text-sm font-medium text-slate-400">Description</div>
                <div className="text-xs text-slate-600">How to prompt</div>
              </div>
              <div className="p-4 bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-lg">
                <div className="text-sm font-medium text-synthaxis-300">Discernment</div>
                <div className="text-xs text-slate-400">Verify outputs</div>
              </div>
              <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-lg opacity-50">
                <div className="text-sm font-medium text-slate-400">Diligence</div>
                <div className="text-xs text-slate-600">Ethics & safety</div>
              </div>
            </div>
            
            <p className="text-slate-500 text-sm">
              Synthaxis focuses entirely on Discernment — the skill that separates 
              AI-fluent professionals from everyone else.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          WHO IT'S FOR
          ============================================ */}
      <section className="border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Built for professionals who use AI daily</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                You're already using AI. You're already delegating work to it. 
                Now learn to verify its output — before your users, clients, or colleagues find the mistakes.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Start with a 10-minute foundation on why AI is so convincing, then work through 
                10 patterns at 15 minutes each. Less than 3 hours to build the most 
                important skill in an AI world.
              </p>
              <div className="flex flex-wrap gap-2">
                {audiences.map((audience) => (
                  <span key={audience} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-full">
                    {audience}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-synthaxis-300" size={24} />
                <span className="text-xl font-semibold">The time investment</span>
              </div>
              <div className="space-y-4 text-slate-400">
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <span>Foundation module</span>
                  <span className="font-semibold text-slate-100">10 min</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <span>Patterns</span>
                  <span className="font-semibold text-slate-100">10 × 15 min</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <span>Total</span>
                  <span className="font-semibold text-synthaxis-300">~3 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>At 1 lesson/day</span>
                  <span className="font-semibold text-slate-100">Less than 2 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          QUOTE / SOCIAL PROOF
          ============================================ */}
      <section className="border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center">
            <Quote className="text-slate-700 mx-auto mb-6" size={40} />
            <blockquote className="text-xl text-slate-300 italic mb-6">
              "The ones who thrive won't be the ones who know the most about AI… 
              They'll be the ones who know when to trust it, when to challenge it, 
              and when to rely on themselves instead."
            </blockquote>
            <cite className="text-slate-500 text-sm">
              — A.J. Juliani, "Discernment: The Most Important Skill in an AI World"
            </cite>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
            Learn to trust, but verify.
          </h2>
          <p className="text-slate-400 mb-4 max-w-xl mx-auto">
            Start by understanding why AI is so convincing — and why that's dangerous.
            Then learn the 10 patterns that AI mistakes follow.
          </p>
          <p className="text-slate-500 mb-8 text-sm">
            Free and open to everyone.
          </p>
          <button 
            onClick={() => navigate('/foundation')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-synthaxis-500 hover:bg-synthaxis-400 text-white font-semibold rounded-lg transition-all"
          >
            <Play size={20} />
            Start Learning
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/synthaxis-logo.png" 
                alt="Synthaxis" 
                className="h-6 w-auto opacity-70"
              />
              <span className="text-slate-500">· AI Discernment Training</span>
            </div>
            <div className="text-slate-500 text-sm">
              Built on the AI Fluency Framework.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;