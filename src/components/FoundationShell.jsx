// src/components/FoundationShell.jsx
// Shell for Module 0: Why Smart People Get Fooled
//
// Simpler than LessonShell — no STOP Protocol phases
// Just loads the foundation module and renders Module0Renderer

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Clock,
  Zap
} from 'lucide-react';
import Module0Renderer from './Module0Renderer';
import { 
  loadFoundationModule, 
  markFoundationComplete,
  curriculumMetadata 
} from '../utils/patternLoader';

export default function FoundationShell() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load module content
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const moduleContent = await loadFoundationModule();
        
        if (!moduleContent) {
          setError('Failed to load module content');
          return;
        }
        
        setContent(moduleContent);
      } catch (err) {
        console.error('Error loading foundation module:', err);
        setError('Something went wrong loading the module');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Handle completion — navigate to Pattern 1
  const handleComplete = () => {
    markFoundationComplete();
    navigate('/learn/1');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !content) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
          <p className="text-slate-400 mb-6">{error || 'Failed to load module'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo as home button */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              title="Back to home"
            >
              <img 
                src="/synthaxis-logo.png" 
                alt="Synthaxis" 
                className="h-7 w-auto"
              />
            </button>

            {/* Module title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h1 className="text-white font-semibold text-sm">
                  {content.title}
                </h1>
                <p className="text-slate-500 text-xs">Foundation Module</p>
              </div>
            </div>

            {/* Time estimate */}
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{content.estimatedTime} min</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Module0Renderer 
          content={content} 
          onComplete={handleComplete}
        />
      </main>
    </div>
  );
}