/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 */

import React from 'react';
import { ShieldCheck, Terminal, Layers, Sliders, Code2 } from 'lucide-react';

export type TabType = 'terminal' | 'visualizer' | 'batch' | 'code';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenCopyright: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenCopyright,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
              Enes Öztürk <span className="text-amber-400 font-normal">·</span> Algoritma Konsolu
            </span>
          </div>

          {/* Zone 2: Navigation Links / Tab Controls */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80">
            <button
              onClick={() => onTabChange('terminal')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'terminal'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Konsol Terminali</span>
            </button>

            <button
              onClick={() => onTabChange('visualizer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'visualizer'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Görsel İnceleyici</span>
            </button>

            <button
              onClick={() => onTabChange('batch')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'batch'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Toplu Testler</span>
            </button>

            <button
              onClick={() => onTabChange('code')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'code'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Kaynak Kodlar</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenCopyright}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Enes Öztürk Telif Hakları ve Bilgileri"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Telif & İmza: Enes Öztürk</span>
              <span className="sm:hidden">Telif</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-between pb-3 pt-1 border-t border-slate-800/60 overflow-x-auto gap-2">
          <button
            onClick={() => onTabChange('terminal')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'terminal' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Konsol
          </button>
          <button
            onClick={() => onTabChange('visualizer')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'visualizer' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            İnceleyici
          </button>
          <button
            onClick={() => onTabChange('batch')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'batch' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Testler
          </button>
          <button
            onClick={() => onTabChange('code')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'code' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Kodlar
          </button>
        </div>
      </div>
    </header>
  );
};
