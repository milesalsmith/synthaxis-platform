// src/components/phases/blocks/blockKit.js
// Shared helpers for the block-based lesson engine.
//
// Blocks are plain data objects: { type, ...props }. Each phase is a list of
// "steps", and each step is one block rendered full-screen. This file holds the
// bits every block needs: a string->icon map (so lesson data can say
// icon: 'alert' instead of importing components) and the set of interactive
// block types (so the step-flow knows when to gate the Continue button).

import {
  AlertTriangle,
  Shield,
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Terminal,
  Lightbulb,
  Target,
  Eye,
  FlaskConical,
  Package,
} from 'lucide-react';

// Lesson data references icons by name; keep this the single source of truth.
export const ICONS = {
  alert: AlertTriangle,
  shield: Shield,
  shieldCheck: ShieldCheck,
  help: HelpCircle,
  check: CheckCircle2,
  x: XCircle,
  terminal: Terminal,
  bulb: Lightbulb,
  target: Target,
  eye: Eye,
  flask: FlaskConical,
  package: Package,
};

export function resolveIcon(name, fallback = null) {
  return ICONS[name] || fallback;
}

// Single-screen interactive blocks: the step-flow owns the footer but keeps the
// shared "Continue" button disabled until the block reports itself resolved
// (via onResolved). Learner must act before advancing.
export const INTERACTIVE_TYPES = new Set([
  'choice',
  'matching',
]);

// Self-navigating blocks run their own multi-screen internal flow (e.g. walking
// through quiz items to a results screen). The step-flow hides its footer for
// these and hands them onComplete/onBack so they can drive advancement.
export const SELF_NAV_TYPES = new Set([
  'judgementSet',
  'drill',
]);

export function isInteractive(type) {
  return INTERACTIVE_TYPES.has(type);
}

export function ownsNavigation(type) {
  return SELF_NAV_TYPES.has(type);
}
