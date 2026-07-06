// src/components/phases/blocks/RegistryBlock.jsx
// Presentational block: a mock package-registry (PyPI) page, used to teach what
// legitimate vs suspicious packages look like. Domain-specific to the
// "fabricated package" pattern; other patterns simply won't use it.
//
//   { type: 'registry',
//     layout: 'single' | 'compare',
//     heading?, subtext?,
//     legit:      { name, version, description, stats },
//     suspicious?: { name, version, description, stats },   // layout: 'compare'
//     goodSigns?:  [{ label, detail }],                     // layout: 'single'
//     redFlags?:   { title?, items: [{ label }] } }         // layout: 'compare'
//
//   stats: { downloads, firstRelease, lastUpdate, versions, maintainers[], repository }

import React from 'react';
import {
  Package, Download, Calendar, User, Github,
  AlertTriangle, CheckCircle2, XCircle, Check, X,
} from 'lucide-react';

function RegistryPreview({ data, type }) {
  const isLegit = type === 'legitimate';
  const s = data.stats;
  const lowDownloads = !isLegit && parseInt(s.downloads) < 1000;
  const freshRelease = !isLegit && s.firstRelease.includes('day');
  const noMaintainer = !isLegit && s.maintainers.length === 0;
  const noRepo = !isLegit && !s.repository;

  return (
    <div className={`bg-slate-900 rounded-xl border ${isLegit ? 'border-synthaxis-500/30' : 'border-red-500/30'} overflow-hidden`}>
      <div className={`px-4 py-2 ${isLegit ? 'bg-synthaxis-500/10' : 'bg-red-500/10'} border-b border-slate-800`}>
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 text-sm">pypi.org/project/</span>
          <span className="text-white font-medium">{data.name}</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">{data.name}</h3>
            <span className="text-slate-400">{data.version}</span>
          </div>
          <p className="text-slate-400 text-sm mt-1">{data.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className={`flex items-center gap-2 ${lowDownloads ? 'text-red-400' : 'text-slate-300'}`}>
            <Download className="w-4 h-4 text-slate-500" />
            <span>{s.downloads}</span>
            {lowDownloads && <AlertTriangle className="w-3 h-3" />}
          </div>
          <div className={`flex items-center gap-2 ${freshRelease ? 'text-red-400' : 'text-slate-300'}`}>
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Since {s.firstRelease}</span>
            {freshRelease && <AlertTriangle className="w-3 h-3" />}
          </div>
          <div className={`flex items-center gap-2 ${noMaintainer ? 'text-red-400' : 'text-slate-300'}`}>
            <User className="w-4 h-4 text-slate-500" />
            <span>{s.maintainers.length > 0 ? s.maintainers[0] : 'Anonymous'}</span>
            {noMaintainer && <AlertTriangle className="w-3 h-3" />}
          </div>
          <div className={`flex items-center gap-2 ${noRepo ? 'text-red-400' : 'text-slate-300'}`}>
            <Github className="w-4 h-4 text-slate-500" />
            <span>{s.repository ? 'Linked' : 'None'}</span>
            {noRepo && <AlertTriangle className="w-3 h-3" />}
          </div>
        </div>

        <div className={`pt-3 border-t border-slate-800 flex items-center justify-between text-sm ${!isLegit && s.versions === 1 ? 'text-red-400' : 'text-slate-400'}`}>
          <span>{s.versions} version{s.versions > 1 ? 's' : ''}</span>
          <span>Updated {s.lastUpdate}</span>
        </div>
      </div>
    </div>
  );
}

export function RegistryBlock({ block }) {
  const compare = block.layout === 'compare';

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        {block.heading && (
          <h2 className="text-2xl font-semibold text-white">{block.heading}</h2>
        )}
        {block.subtext && <p className="text-slate-400 mt-2">{block.subtext}</p>}
      </div>

      {compare ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-synthaxis-300" />
              <span className="text-synthaxis-300 font-medium">Legitimate</span>
            </div>
            <RegistryPreview data={block.legit} type="legitimate" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">Suspicious</span>
            </div>
            <RegistryPreview data={block.suspicious} type="suspicious" />
          </div>
        </div>
      ) : (
        <RegistryPreview data={block.legit} type="legitimate" />
      )}

      {block.goodSigns && (
        <div className="bg-synthaxis-500/10 border border-synthaxis-500/30 rounded-xl p-5">
          <h4 className="text-synthaxis-300 font-medium mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Signs of a Legitimate Package
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {block.goodSigns.map((sign, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-synthaxis-300 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium">{sign.label}:</span>
                  <span className="text-slate-400 ml-1">{sign.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {block.redFlags && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
          <h4 className="text-red-400 font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {block.redFlags.title || 'Red Flags'}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {block.redFlags.items.slice(0, 6).map((flag, i) => (
              <div key={i} className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{flag.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
