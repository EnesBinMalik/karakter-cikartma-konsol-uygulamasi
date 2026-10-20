/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import { Layers, Play, CheckCircle2, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { executeAlgorithm, processSinglePair } from '../utils/algorithm';

interface TestCase {
  id: string;
  name: string;
  input: string;
  description: string;
}

const PRESET_TEST_CASES: TestCase[] = [
  {
    id: 'test-1',
    name: 'Soru Resmi Örneği (Referans Test)',
    input: 'Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0',
    description: 'Soru metnindeki resmi örnek. 3, 5, 22 ve 0 indeksleri test edilir.'
  },
  {
    id: 'test-2',
    name: 'Sınır ve Uç Değerler',
    input: 'Kodlama,0 Kodlama,6 Kodlama,7 Kodlama,99 Kodlama,-5',
    description: 'Başlangıç indeksi (0), son indeks, aşım ve negatif indeks durumları.'
  },
  {
    id: 'test-3',
    name: 'Enes Öztürk İmzalı Özel Test',
    input: 'Enes,0 Enes,1 Enes,2 Enes,3 Öztürk,0 Öztürk,3 Öztürk,5 Öztürk,20',
    description: 'Geliştirici ismi ve soyismi üzerinde her karakterin adım adım çıkartılması.'
  },
  {
    id: 'test-4',
    name: 'Türkçe Karakter Uyumluluğu',
    input: 'İstanbul,0 Şampiyon,3 Çağlayan,2 Öğrenci,1 Ağaç,3',
    description: 'İ, Ş, Ç, Ö, Ğ gibi Türkçe Unicode karakterlerin bozulmadan işlenmesi.'
  }
];

export const BatchProcessor: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('test-1');
  const [activeInput, setActiveInput] = useState<string>(PRESET_TEST_CASES[0].input);
  const [copied, setCopied] = useState<boolean>(false);

  const activeResult = executeAlgorithm(activeInput);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeResult.outputString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Test Case Selection Strip */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Toplu Test Paketi & Doğrulama Matrisi</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Çoklu girdi çiftlerini aynı anda çalıştırarak sınır şartlarını ve algoritma doğruluğunu test edin.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Test Motoru: <span className="text-slate-300 font-semibold">Enes Öztürk Suite</span>
          </div>
        </div>

        {/* Test Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {PRESET_TEST_CASES.map((tc) => {
            const isSelected = selectedCaseId === tc.id;
            return (
              <button
                key={tc.id}
                onClick={() => {
                  setSelectedCaseId(tc.id);
                  setActiveInput(tc.input);
                }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className={isSelected ? 'text-amber-300' : 'text-slate-200'}>
                    {tc.name}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {tc.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Live Input Editor */}
        <div className="pt-2 space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>Aktif Test Girdisi (Düzenlenebilir)</span>
            <span className="text-slate-500 font-mono text-[11px]">
              {activeResult.pairs.length} Adet Çift Ayrıştırıldı
            </span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={activeInput}
              onChange={(e) => setActiveInput(e.target.value)}
              placeholder="Metin,İndeks Metin2,İndeks2 ..."
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors shrink-0"
              title="Sonucu Kopyala"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate Output Card */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Konsol Ekrana Yazdırılan Çıktı:</span>
          <span className="font-mono text-[11px] text-slate-500 tabular-nums">
            Hesaplama: {activeResult.executionTimeMs} ms
          </span>
        </div>
        <div className="p-3 bg-slate-950 border border-amber-500/30 rounded-lg font-mono text-sm sm:text-base text-amber-200 font-bold select-all break-all">
          {activeResult.outputString || <span className="text-slate-600 font-normal italic">Girdi boş</span>}
        </div>
      </div>

      {/* Detailed Matrix Table */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">Ayrıntılı İndeks Ayrıştırma Tablosu</h3>
          <span className="text-xs text-slate-500 font-mono">
            {activeResult.pairs.length} Kayıt
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Girdi İfadesi</th>
                <th className="py-2.5 px-3">Metin</th>
                <th className="py-2.5 px-3">Hedef İndeks</th>
                <th className="py-2.5 px-3">Uzunluk</th>
                <th className="py-2.5 px-3">Çıkartılan Karakter</th>
                <th className="py-2.5 px-3">Durum</th>
                <th className="py-2.5 px-3">Üretilen Sonuç</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {activeResult.pairs.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 text-slate-500 tabular-nums">{idx + 1}</td>
                  <td className="py-2.5 px-3 text-slate-300 font-semibold">{p.rawToken}</td>
                  <td className="py-2.5 px-3 text-slate-400">"{p.rawString}"</td>
                  <td className="py-2.5 px-3 text-amber-300 tabular-nums font-bold">
                    {isNaN(p.index) ? 'Geçersiz' : p.index}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 tabular-nums">{p.originalLength}</td>
                  <td className="py-2.5 px-3">
                    {p.removedChar ? (
                      <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded font-bold">
                        '{p.removedChar}'
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    {p.isOutOfBounds ? (
                      <span className="text-amber-400 text-[11px] font-medium">Sınır Dışı (Korundu)</span>
                    ) : (
                      <span className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Karakter Çıkartıldı</span>
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-amber-200 font-bold">
                    "{p.resultString}"
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
