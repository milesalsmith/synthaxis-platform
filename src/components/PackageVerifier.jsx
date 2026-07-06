// src/components/PackageVerifier.jsx
// In-house package verification tool - the main exercise for Lesson 1-1
// Shows packages to verify as clickable buttons, tracks progress

import React, { useState } from 'react';
import { 
  Search, CheckCircle, XCircle, Package, Download, 
  Calendar, User, AlertTriangle, ArrowRight, Sparkles
} from 'lucide-react';

// Pre-loaded package database
const PACKAGE_DATABASE = {
  // REAL PACKAGES
  'datasets': {
    exists: true,
    name: 'datasets',
    description: 'The largest hub of ready-to-use datasets for ML models',
    author: 'Hugging Face',
    downloads: '10M+/month',
    lastUpdate: '2 days ago',
    version: '2.16.1',
    registry: 'pypi',
  },
  'huggingface_hub': {
    exists: true,
    name: 'huggingface_hub',
    description: 'Client library to interact with the Hugging Face Hub',
    author: 'Hugging Face',
    downloads: '15M+/month',
    lastUpdate: '1 week ago',
    version: '0.20.3',
    registry: 'pypi',
  },
  'huggingface-hub': {
    exists: true,
    name: 'huggingface_hub',
    description: 'Client library to interact with the Hugging Face Hub (Note: use underscore version)',
    author: 'Hugging Face',
    downloads: '15M+/month',
    lastUpdate: '1 week ago',
    version: '0.20.3',
    registry: 'pypi',
  },
  'redis': {
    exists: true,
    name: 'redis',
    description: 'Python client for Redis database',
    author: 'Redis Inc.',
    downloads: '20M+/month',
    lastUpdate: '3 days ago',
    version: '5.0.1',
    registry: 'pypi',
  },
  'cachetools': {
    exists: true,
    name: 'cachetools',
    description: 'Extensible memoizing collections and decorators',
    author: 'Thomas Kemmer',
    downloads: '30M+/month',
    lastUpdate: '1 month ago',
    version: '5.3.2',
    registry: 'pypi',
  },
  'python-jose': {
    exists: true,
    name: 'python-jose',
    description: 'JOSE implementation in Python',
    author: 'Michael Davis',
    downloads: '5M+/month',
    lastUpdate: '6 months ago',
    version: '3.3.0',
    registry: 'pypi',
  },
  'flask-limiter': {
    exists: true,
    name: 'flask-limiter',
    description: 'Rate limiting for Flask applications',
    author: 'Ali-Akber Saifee',
    downloads: '500K+/month',
    lastUpdate: '2 weeks ago',
    version: '3.5.0',
    registry: 'pypi',
  },
  'asyncpg': {
    exists: true,
    name: 'asyncpg',
    description: 'A fast PostgreSQL Database Client Library for Python/asyncio',
    author: 'MagicStack Inc.',
    downloads: '8M+/month',
    lastUpdate: '1 month ago',
    version: '0.29.0',
    registry: 'pypi',
  },
  'fastapi-cache': {
    exists: true,
    name: 'fastapi-cache',
    description: 'Simple and extensible caching for FastAPI',
    author: 'long2ice',
    downloads: '200K+/month',
    lastUpdate: '3 months ago',
    version: '0.1.5',
    registry: 'pypi',
  },
  'express-rate-limit': {
    exists: true,
    name: 'express-rate-limit',
    description: 'Basic IP rate-limiting middleware for Express',
    author: 'Nathan Friedly',
    downloads: '4M+/week',
    lastUpdate: '3 days ago',
    version: '7.1.5',
    registry: 'npm',
  },
  
  // FABRICATED PACKAGES
  'huggingface-cli': {
    exists: false,
    name: 'huggingface-cli',
    suggestion: 'huggingface_hub',
    reason: 'This package was hallucinated by AI. The real package is huggingface_hub (with underscore, not hyphen).',
  },
  'torch-optimizer-pro': {
    exists: false,
    name: 'torch-optimizer-pro',
    suggestion: 'torch-optimizer',
    reason: 'The "-pro" suffix is a common AI hallucination pattern. The real package is torch-optimizer.',
  },
  'flask-rate-limiter-pro': {
    exists: false,
    name: 'flask-rate-limiter-pro',
    suggestion: 'flask-limiter',
    reason: 'Fabricated! The "-pro" suffix doesn\'t exist. The real package is flask-limiter.',
  },
  'asyncpg-toolkit': {
    exists: false,
    name: 'asyncpg-toolkit',
    suggestion: 'asyncpg',
    reason: 'The "-toolkit" suffix is fabricated. The real package is just asyncpg.',
  },
  'fastapi-cache-plus': {
    exists: false,
    name: 'fastapi-cache-plus',
    suggestion: 'fastapi-cache',
    reason: 'The "-plus" suffix is hallucinated. Use fastapi-cache or fastapi-cache2.',
  },
};

const PackageVerifier = ({ 
  height = '450px',
  exercisePackages = [],  // Array of package names to verify
  exerciseData = [],      // Full exercise data with explanations
}) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [verifiedPackages, setVerifiedPackages] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Handle clicking a package to verify
  const handleVerifyPackage = (packageName) => {
    const normalizedName = packageName.toLowerCase().trim();
    const packageData = PACKAGE_DATABASE[normalizedName] || PACKAGE_DATABASE[packageName];
    
    setSelectedPackage(packageName);
    
    if (packageData) {
      setVerifiedPackages(prev => ({
        ...prev,
        [packageName]: packageData.exists
      }));
    } else {
      // Unknown - treat as suspicious
      setVerifiedPackages(prev => ({
        ...prev,
        [packageName]: 'unknown'
      }));
    }
  };

  // Handle manual search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const packageData = PACKAGE_DATABASE[normalizedQuery];
    setSearchResult(packageData || { exists: 'unknown', name: searchQuery });
  };

  // Get result for selected package
  const getPackageResult = (packageName) => {
    const normalizedName = packageName.toLowerCase().trim();
    return PACKAGE_DATABASE[normalizedName] || PACKAGE_DATABASE[packageName];
  };

  // Get exercise explanation for a package
  const getExerciseExplanation = (packageName) => {
    const exercise = exerciseData.find(ex => ex.target === packageName);
    return exercise?.explanation || null;
  };

  const completedCount = Object.keys(verifiedPackages).length;
  const totalCount = exercisePackages.length;
  const allComplete = completedCount === totalCount && totalCount > 0;

  return (
    <div 
      className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden"
      style={{ height, display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <div className="px-5 py-4 bg-slate-800/50 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Package Verifier</h3>
              <p className="text-xs text-slate-500">Click each package to check if it's real</p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="text-right">
            <div className="text-sm font-medium text-slate-300">
              {completedCount} / {totalCount}
            </div>
            <div className="text-xs text-slate-500">verified</div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Packages to verify */}
        <div className="w-1/2 p-4 border-r border-slate-800 overflow-y-auto">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">
            AI recommended these packages:
          </p>
          
          <div className="space-y-2">
            {exercisePackages.map((pkg) => {
              const isVerified = verifiedPackages.hasOwnProperty(pkg);
              const isReal = verifiedPackages[pkg];
              const isSelected = selectedPackage === pkg;
              
              return (
                <button
                  key={pkg}
                  onClick={() => handleVerifyPackage(pkg)}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-slate-800 border-slate-600'
                      : isVerified
                        ? isReal === true
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : isReal === false
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isVerified ? (
                      isReal === true ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : isReal === false ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      )
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600 group-hover:border-slate-500" />
                    )}
                    <code className="text-sm text-slate-200">{pkg}</code>
                  </div>
                  
                  {!isVerified && (
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex gap-1">
              {exercisePackages.map((pkg, i) => (
                <div 
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    verifiedPackages.hasOwnProperty(pkg)
                      ? verifiedPackages[pkg] === true
                        ? 'bg-emerald-500'
                        : verifiedPackages[pkg] === false
                          ? 'bg-red-500'
                          : 'bg-amber-500'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right: Results panel */}
        <div className="w-1/2 p-4 overflow-y-auto bg-slate-950/50">
          {!selectedPackage ? (
            // Empty state
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">
                  Click a package on the left<br />to verify if it's real
                </p>
              </div>
            </div>
          ) : (
            // Show result
            <div>
              {(() => {
                const result = getPackageResult(selectedPackage);
                const explanation = getExerciseExplanation(selectedPackage);
                
                if (!result) {
                  return (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                      <p className="text-amber-400 font-medium">Unknown Package</p>
                      <p className="text-slate-500 text-sm mt-2">
                        Not found in our database
                      </p>
                    </div>
                  );
                }
                
                if (result.exists === true) {
                  return (
                    <div className="space-y-4">
                      {/* Status badge */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-100">{result.name}</span>
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                              VERIFIED
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{result.registry}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-400">{result.description}</p>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                            <Download className="w-3 h-3" />
                            Downloads
                          </div>
                          <p className="text-slate-200 font-medium text-sm">{result.downloads}</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                            <Calendar className="w-3 h-3" />
                            Updated
                          </div>
                          <p className="text-slate-200 font-medium text-sm">{result.lastUpdate}</p>
                        </div>
                      </div>
                      
                      {/* Explanation from lesson */}
                      {explanation && (
                        <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-3">
                          <p className="text-sm text-emerald-300">{explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                }
                
                // Fabricated
                return (
                  <div className="space-y-4">
                    {/* Status badge */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-100">{result.name}</span>
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                            FABRICATED
                          </span>
                        </div>
                        <p className="text-xs text-red-400/70">This package does not exist</p>
                      </div>
                    </div>
                    
                    {/* Explanation */}
                    <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-4">
                      <p className="text-sm text-slate-300">{result.reason}</p>
                    </div>
                    
                    {/* Suggestion */}
                    {result.suggestion && (
                      <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">The real package is:</p>
                        <p className="text-emerald-400 font-mono font-medium">{result.suggestion}</p>
                      </div>
                    )}
                    
                    {/* Lesson explanation */}
                    {explanation && (
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                        <p className="text-sm text-slate-400">{explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
      
      {/* Complete state */}
      {allComplete && (
        <div className="px-5 py-4 bg-emerald-950/30 border-t border-emerald-500/30">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-emerald-400">
                All packages verified!
              </p>
              <p className="text-xs text-emerald-400/70">
                You found {Object.values(verifiedPackages).filter(v => v === false).length} fabricated packages
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageVerifier;