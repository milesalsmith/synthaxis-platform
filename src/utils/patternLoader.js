// src/utils/patternLoader.js
// Handles loading patterns for Synthaxis AI Discernment Training
// 
// CURRICULUM STRUCTURE:
// Module 0: Why Smart People Get Fooled (foundation - 10 min)
// Patterns 1-10: Hallucination patterns (15 min each)
// Total: 10 + 150 = 160 minutes (~2.5 hours)

// ============================================
// SECTION 1: Module & Pattern Registry
// ============================================

// Foundation module
const modules = {
  0: () => import('../data/modules/module-00-why-smart-people-get-fooled.js'),
};

// Pattern modules
const patterns = {
  1: () => import('../data/patterns/pattern-01-confident-fabrication.js'),
  // Patterns 2-10: Coming soon — uncomment as they're built
  // 2: () => import('../data/patterns/pattern-02-plausible-syntax.js'),
  // 3: () => import('../data/patterns/pattern-03-version-hallucination.js'),
  // 4: () => import('../data/patterns/pattern-04-phantom-citation.js'),
  // 5: () => import('../data/patterns/pattern-05-statistics-invention.js'),
  // 6: () => import('../data/patterns/pattern-06-api-mirage.js'),
  // 7: () => import('../data/patterns/pattern-07-historical-confabulation.js'),
  // 8: () => import('../data/patterns/pattern-08-logic-phantom.js'),
  // 9: () => import('../data/patterns/pattern-09-confident-extrapolation.js'),
  // 10: () => import('../data/patterns/pattern-10-authoritative-blend.js'),
};

// ============================================
// SECTION 2: Metadata
// ============================================

export const curriculumMetadata = {
  // Foundation module
  foundation: {
    id: 'module-00',
    title: 'Why Smart People Get Fooled',
    subtitle: 'The psychology that makes AI mistakes invisible',
    estimatedTime: 10,
    status: 'available'
  },
  
  // The 10 patterns
  patterns: [
    { 
      number: 1, 
      id: 'pattern-01', 
      title: 'Confident Fabrication', 
      subtitle: 'AI invents packages, libraries, or tools that don\'t exist',
      hook: '30,000 developers installed a package that didn\'t exist',
      status: 'available',
      estimatedTime: 15
    },
    { 
      number: 2, 
      id: 'pattern-02', 
      title: 'Plausible Syntax', 
      subtitle: 'Code that looks right but won\'t run',
      hook: 'Syntax errors hidden in plain sight',
      status: 'coming',
      estimatedTime: 15
    },
    { 
      number: 3, 
      id: 'pattern-03', 
      title: 'Version Hallucination', 
      subtitle: 'Deprecated APIs recommended as current',
      hook: 'When AI suggests code from 2019',
      status: 'coming',
      estimatedTime: 15
    },
    { 
      number: 4, 
      id: 'pattern-04', 
      title: 'Phantom Citation', 
      subtitle: 'Academic sources that don\'t exist',
      hook: 'Lawyers cited fake cases in federal court',
      status: 'coming',
      estimatedTime: 15
    },
    { 
      number: 5, 
      id: 'pattern-05', 
      title: 'Statistics Invention', 
      subtitle: 'Made-up numbers stated with confidence',
      hook: '"78% of users prefer..." — or do they?',
      status: 'coming',
      estimatedTime: 15
    },
    { 
      number: 6, 
      id: 'pattern-06', 
      title: 'API Mirage', 
      subtitle: 'Endpoints and methods that don\'t exist',
      hook: 'The function that was never there',
      status: 'coming',
      estimatedTime: 15
    },
    { 
      number: 7, 
      id: 'pattern-07', 
      title: 'Historical Confabulation', 
      subtitle: 'Wrong dates, events, attributions',
      hook: 'Einstein never said that',
      status: 'coming',
      estimatedTime: 15
    },
    { 
      number: 8, 
      id: 'pattern-08', 
      title: 'Logic Phantom', 
      subtitle: 'Reasoning that sounds valid but isn\'t',
      hook: 'When the math doesn\'t math',
      status: 'coming',
      estimatedTime: 15
    },
    { 
      number: 9, 
      id: 'pattern-09', 
      title: 'Confident Extrapolation', 
      subtitle: 'Claims beyond training data',
      hook: 'AI predicts the future (incorrectly)',
      status: 'coming',
      estimatedTime: 15
    },
    { 
      number: 10, 
      id: 'pattern-10', 
      title: 'Authoritative Blend', 
      subtitle: 'Real and fake mixed together',
      hook: 'The most dangerous pattern of all',
      status: 'coming',
      estimatedTime: 15
    },
  ],
  
  // Curriculum stats
  totalPatterns: 10,
  totalTime: 160, // 10 min foundation + 150 min patterns
  framework: 'STOP Protocol',
  focus: 'Discernment'
};

// Legacy alias
export const patternMetadata = curriculumMetadata;

// ============================================
// SECTION 3: Loading Functions
// ============================================

export const loadFoundationModule = async () => {
  try {
    const moduleLoader = modules[0];
    if (!moduleLoader) {
      console.error('Foundation module not found');
      return null;
    }
    const module = await moduleLoader();
    return module.module00 || module.default;
  } catch (error) {
    console.error('Failed to load foundation module:', error);
    return null;
  }
};

export const loadPattern = async (patternNumber) => {
  try {
    const patternLoader = patterns[patternNumber];
    
    if (!patternLoader) {
      console.error(`Pattern ${patternNumber} not found or not yet available`);
      return null;
    }
    
    const module = await patternLoader();
    return module.lesson || module.default;
  } catch (error) {
    console.error('Failed to load pattern:', error);
    return null;
  }
};

// ============================================
// SECTION 4: Progress Management
// ============================================

const STORAGE_PREFIX = 'synthaxis';

export const saveProgress = (type, id, progress) => {
  try {
    const key = `${STORAGE_PREFIX}_${type}_${id}`;
    const data = {
      ...progress,
      type,
      id,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const getProgress = (type, id) => {
  try {
    const key = `${STORAGE_PREFIX}_${type}_${id}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
};

export const savePatternProgress = (patternNumber, progress) => {
  return saveProgress('pattern', patternNumber, progress);
};

export const getPatternProgress = (patternNumber) => {
  return getProgress('pattern', patternNumber);
};

export const saveFoundationProgress = (progress) => {
  return saveProgress('module', '00', progress);
};

export const getFoundationProgress = () => {
  return getProgress('module', '00');
};

export const getAllProgress = () => {
  const progress = {
    foundation: getFoundationProgress(),
    patterns: {}
  };
  
  curriculumMetadata.patterns.forEach(pattern => {
    progress.patterns[pattern.number] = getPatternProgress(pattern.number);
  });
  
  return progress;
};

// ============================================
// SECTION 5: Completion Tracking
// ============================================

export const markFoundationComplete = () => {
  saveFoundationProgress({
    completed: true,
    completedAt: new Date().toISOString()
  });
};

export const isFoundationComplete = () => {
  const progress = getFoundationProgress();
  return progress?.completed === true;
};

export const markPatternComplete = (patternNumber) => {
  savePatternProgress(patternNumber, {
    completed: true,
    completedAt: new Date().toISOString(),
    completedPhases: [0, 1, 2, 3], // All 4 STOP phases
  });
};

export const isPatternComplete = (patternNumber) => {
  const progress = getPatternProgress(patternNumber);
  return progress?.completed === true || progress?.completedPhases?.length === 4;
};

export const getCompletedPatternCount = () => {
  let count = 0;
  curriculumMetadata.patterns.forEach(pattern => {
    if (isPatternComplete(pattern.number)) {
      count++;
    }
  });
  return count;
};

export const getProgressPercentage = () => {
  const foundationDone = isFoundationComplete() ? 1 : 0;
  const patternsDone = getCompletedPatternCount();
  const total = 1 + curriculumMetadata.totalPatterns; // foundation + patterns
  return Math.round(((foundationDone + patternsDone) / total) * 100);
};

// ============================================
// SECTION 6: Navigation Helpers
// ============================================

export const getNextPattern = (patternNumber) => {
  const nextNumber = patternNumber + 1;
  const nextPattern = curriculumMetadata.patterns.find(p => p.number === nextNumber);
  
  if (nextPattern && nextPattern.status === 'available') {
    return nextPattern;
  }
  
  return null;
};

export const getPreviousPattern = (patternNumber) => {
  if (patternNumber <= 1) return null;
  return curriculumMetadata.patterns.find(p => p.number === patternNumber - 1) || null;
};

// ============================================
// SECTION 7: Utility Functions
// ============================================

export const getPatternById = (patternId) => {
  return curriculumMetadata.patterns.find(p => p.id === patternId);
};

export const getPatternByNumber = (number) => {
  return curriculumMetadata.patterns.find(p => p.number === number);
};

export const getAvailablePatterns = () => {
  return curriculumMetadata.patterns.filter(p => p.status === 'available');
};

export const getComingPatterns = () => {
  return curriculumMetadata.patterns.filter(p => p.status === 'coming');
};

export const getTotalTimeMinutes = () => curriculumMetadata.totalTime;

export const getTotalTimeFormatted = () => {
  const hours = Math.floor(curriculumMetadata.totalTime / 60);
  const minutes = curriculumMetadata.totalTime % 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};

// ============================================
// SECTION 8: Curriculum Flow
// ============================================

export const getStartingPoint = () => {
  // If foundation not complete, start there
  if (!isFoundationComplete()) {
    return { type: 'foundation', id: 'module-00' };
  }
  
  // Otherwise find first incomplete pattern
  for (const pattern of curriculumMetadata.patterns) {
    if (pattern.status === 'available' && !isPatternComplete(pattern.number)) {
      return { type: 'pattern', id: pattern.id, number: pattern.number };
    }
  }
  
  // All done!
  return { type: 'complete' };
};