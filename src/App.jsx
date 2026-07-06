// src/App.jsx
// Main application router for Synthaxis AI Discernment Training
//
// Routes:
// /            → Landing page
// /foundation  → Module 0: Why Smart People Get Fooled
// /learn/:patternNumber → Pattern lesson (e.g., /learn/1)
//
// Legacy redirects:
// /learn/:moduleId/:lessonNumber → Redirects to /learn/:lessonNumber

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Landing from './components/Landing';
import FoundationShell from './components/FoundationShell';
import LessonShell from './components/LessonShell';

// ============================================
// Legacy Route Handler
// ============================================
// Redirects old /learn/verify/1 style URLs to new /learn/1 format
function LegacyRedirect() {
  const { lessonNumber } = useParams();
  return <Navigate to={`/learn/${lessonNumber}`} replace />;
}

// ============================================
// App Component
// ============================================
function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />
        
        {/* Module 0: Foundation */}
        <Route path="/foundation" element={<FoundationShell />} />
        
        {/* Pattern lessons - new URL format */}
        <Route path="/learn/:patternNumber" element={<LessonShell />} />
        
        {/* Legacy redirect - old URL format */}
        <Route path="/learn/:moduleId/:lessonNumber" element={<LegacyRedirect />} />
        
        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;