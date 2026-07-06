// src/components/RegistryMockup.jsx
// Interactive mockups of PyPI/npm registry pages
// Used to teach users what legitimate vs suspicious packages look like
//
// Features:
// - Realistic PyPI/npm page layouts
// - Highlighted indicators (good/bad signals)
// - Interactive tooltips explaining each element
// - Side-by-side comparison mode

import React, { useState } from 'react';
import {
  Download,
  Calendar,
  User,
  Github,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Package,
  Clock,
  Star,
  GitBranch,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// ============================================
// Indicator Component - Shows good/bad signals
// ============================================
function Indicator({ type, label, tooltip, showTooltip = true }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const styles = {
    good: {
      bg: 'bg-synthaxis-500/10',
      border: 'border-synthaxis-500/30',
      text: 'text-synthaxis-300',
      icon: CheckCircle
    },
    bad: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      icon: XCircle
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      icon: AlertTriangle
    }
  };
  
  const style = styles[type] || styles.warning;
  const Icon = style.icon;
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${style.bg} ${style.border} border ${style.text} text-xs font-medium cursor-help`}>
        <Icon className="w-3 h-3" />
        {label}
      </div>
      
      {showTooltip && isHovered && tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-xs text-slate-200 whitespace-nowrap z-50 shadow-xl">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  );
}

// ============================================
// PyPI Package Page Mockup
// ============================================
export function PyPIMockup({ 
  packageData, 
  showIndicators = true,
  highlightElements = [],
  compact = false 
}) {
  const {
    name,
    version,
    description,
    author,
    authorEmail,
    downloads,
    lastUpdate,
    firstRelease,
    license,
    pythonVersions,
    repository,
    homepage,
    maintainers = [],
    releases = [],
    isSuspicious = false
  } = packageData;

  const isHighlighted = (element) => highlightElements.includes(element);
  
  return (
    <div className={`bg-[#0d1117] rounded-xl border ${isSuspicious ? 'border-red-500/30' : 'border-slate-700'} overflow-hidden`}>
      {/* PyPI-style header */}
      <div className="bg-[#1a1f2e] px-5 py-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-[#3775a9]" />
          <span className="text-slate-400 text-sm">pypi.org</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 text-sm">project</span>
          <span className="text-slate-600">/</span>
          <span className="text-white font-medium">{name}</span>
        </div>
      </div>
      
      <div className="p-5">
        {/* Package title and version */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              {name}
              <span className="text-lg font-normal text-slate-400">{version}</span>
            </h2>
            <p className="text-slate-400 mt-1">{description}</p>
          </div>
          
          {showIndicators && (
            <div className="flex-shrink-0">
              {isSuspicious ? (
                <Indicator type="bad" label="Suspicious" tooltip="Multiple red flags detected" />
              ) : (
                <Indicator type="good" label="Verified" tooltip="Established package with good signals" />
              )}
            </div>
          )}
        </div>
        
        {/* Stats row */}
        <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-4'} gap-4 mb-5`}>
          {/* Downloads */}
          <div className={`p-3 rounded-lg ${isHighlighted('downloads') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Download className="w-3 h-3" />
              Downloads / month
            </div>
            <div className="text-white font-semibold">{downloads}</div>
            {showIndicators && isHighlighted('downloads') && (
              <Indicator 
                type={parseInt(downloads.replace(/[^0-9]/g, '')) > 10000 ? 'good' : 'bad'} 
                label={parseInt(downloads.replace(/[^0-9]/g, '')) > 10000 ? 'High volume' : 'Very low'}
                tooltip={parseInt(downloads.replace(/[^0-9]/g, '')) > 10000 
                  ? 'Popular packages have thousands of downloads' 
                  : 'New or unused packages have few downloads'}
              />
            )}
          </div>
          
          {/* Last Update */}
          <div className={`p-3 rounded-lg ${isHighlighted('lastUpdate') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Calendar className="w-3 h-3" />
              Last updated
            </div>
            <div className="text-white font-semibold">{lastUpdate}</div>
            {showIndicators && isHighlighted('lastUpdate') && (
              <Indicator 
                type={lastUpdate.includes('day') || lastUpdate.includes('week') || lastUpdate.includes('month') ? 'good' : 'warning'} 
                label={lastUpdate.includes('day') || lastUpdate.includes('week') ? 'Active' : 'Check history'}
                tooltip="Active packages are regularly maintained"
              />
            )}
          </div>
          
          {/* First Release */}
          {!compact && (
            <div className={`p-3 rounded-lg ${isHighlighted('firstRelease') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Clock className="w-3 h-3" />
                First released
              </div>
              <div className="text-white font-semibold">{firstRelease}</div>
              {showIndicators && isHighlighted('firstRelease') && (
                <Indicator 
                  type={firstRelease.includes('2024') || firstRelease.includes('2025') || firstRelease.includes('days') ? 'warning' : 'good'} 
                  label={firstRelease.includes('2024') || firstRelease.includes('2025') || firstRelease.includes('days') ? 'New package' : 'Established'}
                  tooltip="Older packages have track records"
                />
              )}
            </div>
          )}
          
          {/* Repository */}
          {!compact && (
            <div className={`p-3 rounded-lg ${isHighlighted('repository') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Github className="w-3 h-3" />
                Repository
              </div>
              <div className="text-white font-semibold">
                {repository ? (
                  <span className="text-blue-400 flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    View source
                  </span>
                ) : (
                  <span className="text-red-400">Not linked</span>
                )}
              </div>
              {showIndicators && isHighlighted('repository') && (
                <Indicator 
                  type={repository ? 'good' : 'bad'} 
                  label={repository ? 'Source available' : 'No source'}
                  tooltip={repository ? 'You can inspect the code' : 'Cannot verify what this package does'}
                />
              )}
            </div>
          )}
        </div>
        
        {/* Maintainers */}
        <div className={`p-3 rounded-lg mb-4 ${isHighlighted('maintainers') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
            <User className="w-3 h-3" />
            Maintainers
          </div>
          {maintainers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {maintainers.map((m, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-700 rounded text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-xs">
                    {m.charAt(0).toUpperCase()}
                  </div>
                  {m}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-red-400 text-sm">No maintainer information</span>
          )}
          {showIndicators && isHighlighted('maintainers') && (
            <div className="mt-2">
              <Indicator 
                type={maintainers.length > 0 ? 'good' : 'bad'} 
                label={maintainers.length > 0 ? 'Known maintainers' : 'Anonymous'}
                tooltip={maintainers.length > 0 ? 'You can verify who maintains this' : 'No accountability'}
              />
            </div>
          )}
        </div>
        
        {/* Release history preview */}
        {releases.length > 0 && (
          <div className={`p-3 rounded-lg ${isHighlighted('releases') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
              <GitBranch className="w-3 h-3" />
              Release History ({releases.length} releases)
            </div>
            <div className="space-y-1">
              {releases.slice(0, 3).map((r, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{r.version}</span>
                  <span className="text-slate-500">{r.date}</span>
                </div>
              ))}
            </div>
            {showIndicators && isHighlighted('releases') && (
              <div className="mt-2">
                <Indicator 
                  type={releases.length > 3 ? 'good' : 'warning'} 
                  label={releases.length > 3 ? 'Active development' : 'Limited history'}
                  tooltip="Multiple releases show ongoing maintenance"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// npm Package Page Mockup
// ============================================
export function NpmMockup({ 
  packageData, 
  showIndicators = true,
  highlightElements = [],
  compact = false 
}) {
  const {
    name,
    version,
    description,
    author,
    downloads,
    lastPublish,
    repository,
    license,
    weeklyDownloads,
    dependents,
    isSuspicious = false
  } = packageData;

  const isHighlighted = (element) => highlightElements.includes(element);
  
  return (
    <div className={`bg-[#1a1a1a] rounded-xl border ${isSuspicious ? 'border-red-500/30' : 'border-slate-700'} overflow-hidden`}>
      {/* npm-style header */}
      <div className="bg-[#cb3837] px-5 py-2">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">npm</span>
        </div>
      </div>
      
      <div className="p-5">
        {/* Package title */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-slate-400 mt-1">{description}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
              <span>{version}</span>
              <span>•</span>
              <span>Public</span>
              <span>•</span>
              <span>Published {lastPublish}</span>
            </div>
          </div>
          
          {showIndicators && (
            <div className="flex-shrink-0">
              {isSuspicious ? (
                <Indicator type="bad" label="Suspicious" tooltip="Multiple red flags detected" />
              ) : (
                <Indicator type="good" label="Trusted" tooltip="Established package" />
              )}
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className={`p-3 rounded-lg ${isHighlighted('downloads') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
            <div className="text-slate-500 text-xs mb-1">Weekly Downloads</div>
            <div className="text-white font-bold text-lg">{weeklyDownloads}</div>
          </div>
          <div className={`p-3 rounded-lg ${isHighlighted('dependents') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
            <div className="text-slate-500 text-xs mb-1">Dependents</div>
            <div className="text-white font-bold text-lg">{dependents}</div>
          </div>
          <div className={`p-3 rounded-lg ${isHighlighted('repository') ? 'ring-2 ring-amber-500 bg-amber-500/5' : 'bg-slate-800/50'}`}>
            <div className="text-slate-500 text-xs mb-1">Repository</div>
            <div className="text-white font-bold text-lg">
              {repository ? (
                <Github className="w-5 h-5 text-blue-400" />
              ) : (
                <span className="text-red-400 text-sm">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Side-by-Side Comparison
// ============================================
export function RegistryComparison({ 
  legitimate, 
  suspicious,
  highlightDifferences = true,
  onSelectPackage
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Legitimate */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-synthaxis-300" />
            <span className="text-synthaxis-300 font-medium">Legitimate Package</span>
          </div>
          <PyPIMockup 
            packageData={legitimate} 
            showIndicators={highlightDifferences}
            highlightElements={['downloads', 'firstRelease', 'repository', 'maintainers']}
            compact
          />
        </div>
        
        {/* Suspicious */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Suspicious Package</span>
          </div>
          <PyPIMockup 
            packageData={suspicious} 
            showIndicators={highlightDifferences}
            highlightElements={['downloads', 'firstRelease', 'repository', 'maintainers']}
            compact
          />
        </div>
      </div>
    </div>
  );
}

// ============================================
// CLI Verification Commands
// ============================================
export function CLIVerification({ commands }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  return (
    <div className="space-y-3">
      {commands.map((cmd, i) => (
        <div key={i} className="bg-slate-800 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <div className="text-white font-medium">{cmd.title}</div>
                <div className="text-slate-500 text-sm">{cmd.description}</div>
              </div>
            </div>
            {expandedIndex === i ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>
          
          {expandedIndex === i && (
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm">
                <span className="text-synthaxis-300">$</span>
                <span className="text-slate-300 ml-2">{cmd.command}</span>
              </div>
              {cmd.output && (
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-400 whitespace-pre-line">
                  {cmd.output}
                </div>
              )}
              {cmd.interpretation && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-amber-200">
                  <strong>What to look for:</strong> {cmd.interpretation}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// Sample Data for Examples
// ============================================
export const SAMPLE_PACKAGES = {
  // Legitimate packages
  requests: {
    name: 'requests',
    version: '2.31.0',
    description: 'Python HTTP for Humans.',
    author: 'Kenneth Reitz',
    downloads: '50,234,891',
    lastUpdate: '3 days ago',
    firstRelease: 'Feb 14, 2011',
    repository: 'https://github.com/psf/requests',
    license: 'Apache 2.0',
    maintainers: ['Kenneth Reitz', 'Nate Prewitt', 'Seth Larson'],
    releases: [
      { version: '2.31.0', date: 'May 22, 2023' },
      { version: '2.30.0', date: 'May 3, 2023' },
      { version: '2.29.0', date: 'Apr 26, 2023' },
      { version: '2.28.2', date: 'Jan 12, 2023' },
    ],
    isSuspicious: false
  },
  
  pandas: {
    name: 'pandas',
    version: '2.2.0',
    description: 'Powerful data structures for data analysis.',
    author: 'The Pandas Development Team',
    downloads: '89,123,456',
    lastUpdate: '1 week ago',
    firstRelease: 'Dec 17, 2008',
    repository: 'https://github.com/pandas-dev/pandas',
    license: 'BSD-3-Clause',
    maintainers: ['Wes McKinney', 'Jeff Reback', 'jbrockmendel'],
    releases: [
      { version: '2.2.0', date: 'Jan 19, 2024' },
      { version: '2.1.4', date: 'Dec 8, 2023' },
      { version: '2.1.3', date: 'Nov 10, 2023' },
    ],
    isSuspicious: false
  },
  
  // Suspicious packages
  requestsPro: {
    name: 'requests-pro',
    version: '1.0.0',
    description: 'Enhanced HTTP requests library with extra features.',
    author: '',
    downloads: '47',
    lastUpdate: '3 days ago',
    firstRelease: '3 days ago',
    repository: null,
    license: 'MIT',
    maintainers: [],
    releases: [
      { version: '1.0.0', date: '3 days ago' },
    ],
    isSuspicious: true
  },
  
  pandasToolkit: {
    name: 'pandas-toolkit',
    version: '1.0.0',
    description: 'Toolkit for pandas data manipulation.',
    author: 'unknown',
    downloads: '156',
    lastUpdate: '1 week ago',
    firstRelease: '2 weeks ago',
    repository: null,
    license: 'MIT',
    maintainers: ['user12345'],
    releases: [
      { version: '1.0.0', date: '2 weeks ago' },
    ],
    isSuspicious: true
  }
};

// ============================================
// CLI Commands Reference
// ============================================
export const CLI_COMMANDS = {
  pip: [
    {
      title: 'Check if package exists',
      description: 'Search PyPI for the package',
      command: 'pip index versions requests',
      output: `requests (2.31.0)
Available versions: 2.31.0, 2.30.0, 2.29.0, 2.28.2, ...
  INSTALLED: 2.31.0`,
      interpretation: 'Multiple versions = established package. Single version + recent date = suspicious.'
    },
    {
      title: 'View package info',
      description: 'Get detailed package metadata',
      command: 'pip show requests',
      output: `Name: requests
Version: 2.31.0
Summary: Python HTTP for Humans.
Home-page: https://requests.readthedocs.io
Author: Kenneth Reitz
License: Apache 2.0`,
      interpretation: 'Look for: known author, real homepage, established license.'
    },
    {
      title: 'Check package on PyPI directly',
      description: 'Open the PyPI page in browser',
      command: 'python -m webbrowser https://pypi.org/project/requests/',
      output: '[Opens browser]',
      interpretation: 'Always verify visually before installing unknown packages.'
    }
  ],
  npm: [
    {
      title: 'View package info',
      description: 'Get package metadata from registry',
      command: 'npm view lodash',
      output: `lodash@4.17.21 | MIT | deps: none | versions: 114
Lodash modular utilities.
https://lodash.com/

dist-tags:
latest: 4.17.21

maintainers:
- mathias
- jdalton`,
      interpretation: 'Many versions + known maintainers + real website = legitimate.'
    },
    {
      title: 'Check download stats',
      description: 'See weekly download numbers',
      command: 'npm view lodash downloads',
      output: '45,234,567 weekly downloads',
      interpretation: 'High downloads = widely used and vetted by community.'
    }
  ]
};

export default { PyPIMockup, NpmMockup, RegistryComparison, CLIVerification, SAMPLE_PACKAGES, CLI_COMMANDS };