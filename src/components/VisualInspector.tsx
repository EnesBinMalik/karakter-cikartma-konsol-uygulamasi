/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import { Sliders, ArrowRight, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { processSinglePair } from '../utils/algorithm';

export const VisualInspector: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Algoritma');
  const [targetIndex, setTargetIndex] = useState<number>(3);

  // Process current state
  const pair = processSinglePair(`${inputText},${targetIndex}`);
  const strLength = inputText.length;

  const presets = [
    { text: 'Algoritma', index: 3, label: 'Algoritma, 3 (Örnek 1)' },
    { text: 'Algoritma', index: 5, label: 'Algoritma, 5 (Örnek 2)' },
    { text: 'Algoritma', index: 22, label: 'Algoritma, 22 (Sınır Dışı)' },
    { text: 'Algoritma', index: 0, label: 'Algoritma, 0 (İlk Karakter)' },
    { text: 'EnesÖztürk', index: 4, label: 'EnesÖztürk, 4' },
    { text: 'Yazılım', index: 2, label: 'Yazılım, 2' }
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Görsel Karakter İndeks İnceleyicisi</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              String içindeki her karakterin indeksini, kesim aralıklarını ve birleştirme mantığını adım adım inceleyin.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Geliştirici: <span className="text-slate-300 font-semibold">Enes Öztürk</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-400 mr-1">Hazır Durumlar:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(p.text);
                setTargetIndex(p.index);
              }}
              className={`px-2.5 py-1 text-xs rounded-md border font-mono transition-colors ${
                inputText === p.text && targetIndex === p.index
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-semibold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <span>Metin İfadesi (String)</span>
              <span className="text-slate-500 font-mono text-[11px]">Uzunluk: {strLength} karakter</span>
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Bir metin girin..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <span>Çıkartılacak İndeks</span>
              <span className="text-slate-500 font-mono text-[11px]">0-tabanlı</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTargetIndex((prev) => prev - 1)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-mono text-xs border border-slate-700"
              >
                -1
              </button>
              <input
                type="number"
                value={targetIndex}
                onChange={(e) => setTargetIndex(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-center text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => setTargetIndex((prev) => prev + 1)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-mono text-xs border border-slate-700"
              >
                +1
              </button>
            </div>
          </div>
        </div>

        {/* Index Range Slider */}
        <div className="space-y-1 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>İndeks Kaydırıcı:</span>
            <span className="font-mono text-amber-400 font-semibold">Hedef İndeks = {targetIndex}</span>
          </div>
          <input
            type="range"
            min="-1"
            max={Math.max(10, strLength + 5)}
            value={targetIndex}
            onChange={(e) => setTargetIndex(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Character Grid Display */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">Karakter İndeks Şeması</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
              <span>Korunan Karakterler</span>
            </span>
            <span className="flex items-center gap-1.5 text-rose-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span>Çıkartılan Karakter</span>
            </span>
          </div>
        </div>

        {/* Character Tiles Container */}
        {inputText.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-lg">
            Metin boş. Lütfen yukarıdan bir metin ifadesi yazınız.
          </div>
        ) : (
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max">
              {pair.characters.map((item) => {
                const isTarget = item.isRemoved;
                return (
                  <div
                    key={item.index}
                    className={`flex flex-col items-center justify-center transition-all ${
                      isTarget ? 'scale-105' : 'opacity-90'
                    }`}
                  >
                    {/* Character Card */}
                    <div
                      className={`w-12 h-14 rounded-lg flex items-center justify-center font-mono text-lg font-bold border-2 transition-all shadow-md ${
                        isTarget
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300 line-through ring-2 ring-rose-500/40'
                          : item.charGroup === 'prefix'
                          ? 'bg-slate-800/90 border-slate-700 text-slate-100'
                          : 'bg-slate-800/90 border-slate-700 text-slate-100'
                      }`}
                    >
                      {item.char === ' ' ? <span className="text-xs text-slate-500 font-normal">␣</span> : item.char}
                    </div>

                    {/* Index Label */}
                    <span
                      className={`mt-1.5 text-[11px] font-mono tabular-nums font-semibold ${
                        isTarget ? 'text-rose-400 font-bold' : 'text-slate-500'
                      }`}
                    >
                      [{item.index}]
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`mt-0.5 text-[9px] uppercase font-sans tracking-tight px-1 py-0.2 rounded ${
                        isTarget
                          ? 'bg-rose-500/30 text-rose-300 font-bold'
                          : 'text-slate-600'
                      }`}
                    >
                      {isTarget ? 'Çıkart' : item.charGroup === 'prefix' ? 'Sol' : 'Sağ'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Callout */}
        {pair.isOutOfBounds ? (
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-amber-300 text-sm">
                Sınır Dışı İndeks ({targetIndex} ∉ [0, {strLength - 1}])
              </span>
              <p className="text-slate-300 leading-relaxed">
                Verilen <code className="text-amber-200 font-mono">{targetIndex}</code> indeksi geçerli aralık olan{' '}
                <code className="text-amber-200 font-mono">0 .. {Math.max(0, strLength - 1)}</code> dışında kalmaktadır.
                Kural gereği hiçbir karakter çıkartılmadı ve orijinal metin <strong className="text-white font-mono">"{inputText}"</strong> aynen korundu.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-emerald-300 text-sm">
                Başarılı Karakter Çıkarma: [{targetIndex}] '{pair.removedChar}'
              </span>
              <p className="text-slate-300 leading-relaxed">
                İndeks <code className="text-emerald-200 font-mono">{targetIndex}</code> konumundaki{' '}
                <strong className="text-rose-400 font-mono">'{pair.removedChar}'</strong> karakteri çıkartıldı.
              </p>
            </div>
          </div>
        )}

        {/* Mathematical Breakdown Equation */}
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3 font-mono text-xs">
          <div className="text-slate-400 font-sans text-xs font-semibold">
            String Parçalama & Birleştirme Matematiği:
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-300 text-xs sm:text-sm">
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
              Substring(0, {Math.max(0, pair.index)}) = "{pair.prefix}"
            </span>
            <span className="text-slate-500">+</span>
            <span className="px-2 py-1 bg-rose-500/20 text-rose-300 rounded border border-rose-500/40 line-through">
              '{pair.removedChar ?? "YOK"}'
            </span>
            <span className="text-slate-500">+</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
              Substring({pair.index + 1}) = "{pair.suffix}"
            </span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded border border-amber-500/40 text-base">
              "{pair.resultString}"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
