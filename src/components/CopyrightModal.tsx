/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 */

import React from 'react';
import { ShieldCheck, X, Award, CheckCircle2, FileText, Code2 } from 'lucide-react';

interface CopyrightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CopyrightModal: React.FC<CopyrightModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Telif Hakları & Yazar İmzası</h3>
              <p className="text-xs text-amber-400/90 font-medium">© 2026 Enes Öztürk · Tüm Hakları Saklıdır</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs sm:text-sm">
          {/* Certificate Box */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Resmi Algoritma & Telif Beyanı</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              Bu uygulama ve içerisindeki string karakter çıkartma algoritması, konsol simülasyonu,
              test matrisi ve üretilen tüm kaynak kodlar (C#, Python, JavaScript, Java, C++)
              <strong> Enes Öztürk</strong> imzasıyla hazırlanmış olup telif hakları münhasıran
              <strong> Enes Öztürk</strong>'e aittir.
            </p>
          </div>

          {/* Algorithm Specification Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Algoritma Şartnamesi</span>
            </h4>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Girdi Biçimi:</strong> Ekrandan bir string bir de sayı alan (aralarında virgül ile).
                  Birden fazla çift boşlukla ayrılabilir.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Referans Giriş:</strong> <code className="text-amber-300 font-mono">Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0</code>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Referans Çıktı:</strong> <code className="text-amber-300 font-mono">Algritma Algortma Algoritma lgoritma</code>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Kural:</strong> İlgili string ifade içerisinden verilen indexteki karakter çıkartılır.
                  İndeks metin boyutunu aşarsa veya geçersizse metin bozulmadan korunur.
                </span>
              </div>
            </div>
          </div>

          {/* Author Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Geliştirici & Yazar Künyesi</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">Yazar & Mühendis:</span>
                <span className="text-slate-200 font-semibold">Enes Öztürk</span>
              </div>
              <div>
                <span className="text-slate-500 block">Telif Yılı:</span>
                <span className="text-slate-200 font-semibold">2026</span>
              </div>
              <div>
                <span className="text-slate-500 block">Uygulama Türü:</span>
                <span className="text-slate-200 font-semibold">Console & Algorithm Studio</span>
              </div>
              <div>
                <span className="text-slate-500 block">Fikri Mülkiyet:</span>
                <span className="text-amber-400 font-semibold">Enes Öztürk Özel Hakları</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Enes Öztürk © 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors"
          >
            Anladım & Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
