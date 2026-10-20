/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 */

import React from 'react';
import { ShieldCheck, Terminal } from 'lucide-react';

interface FooterProps {
  onOpenCopyright: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCopyright }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 mt-12 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-300">
              Karakter Çıkartma Konsol Algoritması
            </span>
            <span className="text-slate-600">·</span>
            <span>Geliştirici: Enes Öztürk</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCopyright}
              className="text-amber-400/90 hover:text-amber-300 hover:underline flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Telif Hakları Bildirimi</span>
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">
              © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
