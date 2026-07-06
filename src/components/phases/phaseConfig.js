// src/components/phases/phaseConfig.js
// Per-phase theming for the STOP protocol (See / Test / Observe / Practice).
// Shared by PhaseRenderer and the generic StepFlow so colors stay consistent.
//
// Class strings are written out in full (not interpolated) so Tailwind's JIT
// scanner keeps them. `text`/`bg`/`border` are faint accents for surfaces;
// `dot` is the active progress dot; `button` is the solid Continue CTA.

import { Eye, FlaskConical, Lightbulb, Target } from 'lucide-react';

export const PHASE_CONFIG = {
  see: {
    icon: Eye,
    label: 'SEE',
    color: 'amber',
    gradient: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    dot: 'bg-amber-400',
    button: 'bg-amber-500 text-slate-900 hover:bg-amber-400',
  },
  test: {
    icon: FlaskConical,
    label: 'TEST',
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    dot: 'bg-blue-400',
    button: 'bg-blue-500 text-white hover:bg-blue-400',
  },
  observe: {
    icon: Lightbulb,
    label: 'OBSERVE',
    color: 'violet',
    gradient: 'from-violet-500/20 to-violet-600/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    dot: 'bg-violet-400',
    button: 'bg-violet-500 text-white hover:bg-violet-400',
  },
  practice: {
    icon: Target,
    label: 'PRACTICE',
    color: 'emerald',
    gradient: 'from-synthaxis-500/20 to-synthaxis-600/10',
    border: 'border-synthaxis-500/30',
    text: 'text-synthaxis-300',
    bg: 'bg-synthaxis-500/10',
    dot: 'bg-synthaxis-300',
    button: 'bg-synthaxis-500 text-white hover:bg-synthaxis-300',
  },
};

export default PHASE_CONFIG;
