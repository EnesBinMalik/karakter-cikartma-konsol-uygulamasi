/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  CornerDownLeft,
  Info
} from 'lucide-react';
import { executeAlgorithm, CODE_TEMPLATES } from '../utils/algorithm';

interface TerminalEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  command?: string;
  output?: string;
  timestamp: string;
  details?: {
    pairs: Array<{
      token: string;
      result: string;
      explanation: string;
      removedChar: string | null;
      isOutOfBounds: boolean;
    }>;
    executionTimeMs: number;
  };
}

const INITIAL_BANNER: TerminalEntry[] = [
  {
    id: 'sys-1',
    type: 'system',
    timestamp: '00:00:00',
    output: `╔════════════════════════════════════════════════════════════════════════╗
║     KARAKTER ÇIKARTMA KONSOL UYGULAMASI - ENES ÖZTÜRK                  ║
║     Telif Hakları © 2026 Enes Öztürk. Tüm Hakları Saklıdır.            ║
╚════════════════════════════════════════════════════════════════════════╝
Kullanım: Ekrandan [Metin],[İndeks] biçiminde girdi alarak belirtilen
indeksteki karakteri çıkartıp ekrana yazdırır.
Birden fazla ifadeyi boşluk bırakarak yazabilirsiniz.

Örnek Giriş : Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0
Beklenen    : Algritma Algortma Algoritma lgoritma

Kullanılabilir komutlar:
  • 'ornek'    -> Sorudaki örnek girdiyi çalıştırır
  • 'yardim'   -> Komut listesini ve ipuçlarını gösterir
  • 'temizle'  -> Konsol ekranını temizler
  • 'hakkinda' -> Yazar ve telif bilgilerini görüntüler
  • 'kod [dil]'-> csharp, python, js, java, cpp kodlarını gösterir`
  }
];

export const TerminalConsole: React.FC = () => {
  const [history, setHistory] = useState<TerminalEntry[]>(INITIAL_BANNER);
  const [inputVal, setInputVal] = useState<string>('Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRunCommand = (cmdToRun?: string) => {
    const rawCmd = (cmdToRun !== undefined ? cmdToRun : inputVal).trim();
    if (!rawCmd) return;

    const now = new Date().toLocaleTimeString('tr-TR');
    const newEntryId = `cmd-${Date.now()}`;

    // Add to command history
    setCommandHistory((prev) => [rawCmd, ...prev]);
    setHistoryPointer(-1);

    const inputEntry: TerminalEntry = {
      id: `${newEntryId}-in`,
      type: 'input',
      command: rawCmd,
      timestamp: now
    };

    const lower = rawCmd.toLowerCase();

    // Check special commands
    if (lower === 'temizle' || lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'yardim' || lower === 'help') {
      const helpEntry: TerminalEntry = {
        id: `${newEntryId}-out`,
        type: 'system',
        timestamp: now,
        output: `=== KULLANIM KILAVUZU (Yazar: Enes Öztürk) ===
1. Format: Metin,İndeks
   Örnek: Algoritma,3  -> Algritma
2. Toplu Giriş:
   Örnek: Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0
   Çıktı: Algritma Algortma Algoritma lgoritma
3. İndeks Kuralları:
   - İndeksler 0-tabanlıdır (İlk karakter: 0).
   - İndeks metin boyutunu aşarsa veya negatifse metin değiştirilmez (Algoritma,22 -> Algoritma).
4. Konsol Komutları:
   - ornek        : Test örneğini çalıştırır
   - kod csharp   : C# konsol kaynak kodunu ekrana basar
   - kod python   : Python konsol kodunu ekrana basar
   - hakkinda     : Enes Öztürk telif ve imza bildirimi
   - temizle      : Ekranı temizler`
      };
      setHistory((prev) => [...prev, inputEntry, helpEntry]);
      setInputVal('');
      return;
    }

    if (lower === 'ornek' || lower === 'example') {
      handleRunCommand('Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0');
      return;
    }

    if (lower === 'hakkinda' || lower === 'about') {
      const aboutEntry: TerminalEntry = {
        id: `${newEntryId}-out`,
        type: 'system',
        timestamp: now,
        output: `────────────────────────────────────────────────────────────────
Yazar & Geliştirici : Enes Öztürk
Telif Hakları        : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
Proje Adı           : String İfadeden İndekse Göre Karakter Çıkartma Konsol Motoru
Lisans Türü         : Özel Telif Korumalı (Proprietary - Enes Öztürk)
────────────────────────────────────────────────────────────────`
      };
      setHistory((prev) => [...prev, inputEntry, aboutEntry]);
      setInputVal('');
      return;
    }

    if (lower.startsWith('kod ') || lower.startsWith('code ')) {
      const lang = lower.split(' ')[1] as keyof typeof CODE_TEMPLATES;
      const validLangs: (keyof typeof CODE_TEMPLATES)[] = ['csharp', 'python', 'javascript', 'java', 'cpp'];
      
      if (validLangs.includes(lang)) {
        const codeEntry: TerminalEntry = {
          id: `${newEntryId}-out`,
          type: 'output',
          timestamp: now,
          output: CODE_TEMPLATES[lang]
        };
        setHistory((prev) => [...prev, inputEntry, codeEntry]);
      } else {
        const errorEntry: TerminalEntry = {
          id: `${newEntryId}-out`,
          type: 'error',
          timestamp: now,
          output: `Desteklenen diller: csharp, python, javascript, java, cpp. Örnek: 'kod csharp'`
        };
        setHistory((prev) => [...prev, inputEntry, errorEntry]);
      }
      setInputVal('');
      return;
    }

    // Standard execution of algorithm
    const result = executeAlgorithm(rawCmd);
    const outputEntry: TerminalEntry = {
      id: `${newEntryId}-out`,
      type: 'output',
      timestamp: now,
      output: result.outputString,
      details: {
        pairs: result.pairs.map((p) => ({
          token: p.rawToken,
          result: p.resultString,
          explanation: p.explanation,
          removedChar: p.removedChar,
          isOutOfBounds: p.isOutOfBounds
        })),
        executionTimeMs: result.executionTimeMs
      }
    };

    setHistory((prev) => [...prev, inputEntry, outputEntry]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRunCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextPointer = Math.min(historyPointer + 1, commandHistory.length - 1);
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPointer = historyPointer - 1;
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer]);
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInputVal('');
      }
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPresets = [
    { label: 'Örnek Soru Girdisi', cmd: 'Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0' },
    { label: 'Tekli Test: Algoritma,3', cmd: 'Algoritma,3' },
    { label: 'Sınır Testi: Algoritma,22', cmd: 'Algoritma,22' },
    { label: 'Baş Karakter: Algoritma,0', cmd: 'Algoritma,0' },
    { label: 'Türkçe: EnesÖztürk,4 Yazılım,2', cmd: 'EnesÖztürk,4 Yazılım,2' },
  ];

  return (
    <div className="space-y-4">
      {/* Quick Launch & Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hızlı Örnekler:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {quickPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputVal(preset.cmd);
                handleRunCommand(preset.cmd);
              }}
              className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-amber-300 border border-slate-700 rounded-md transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setHistory([])}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors ml-auto"
          title="Terminali Temizle"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Temizle</span>
        </button>
      </div>

      {/* Terminal Window */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Window Chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600"></div>
            <span className="ml-2 text-xs text-slate-400 font-sans font-medium hidden sm:inline">
              enes@ozturk-algoritma: ~/workspace/string-index-remover
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="hidden md:inline">Enes Öztürk © 2026</span>
            <span className="text-amber-400/90 font-medium">BASH / C# CLI</span>
          </div>
        </div>

        {/* Console Log Area */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[520px] min-h-[380px] overflow-y-auto">
          {history.length === 0 && (
            <div className="text-slate-500 py-12 text-center">
              <TerminalIcon className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-400" />
              <p>Terminal temizlendi. Bir ifade giriniz veya 'ornek' yazınız.</p>
              <p className="text-xs text-slate-600 mt-1">Geliştirici: Enes Öztürk</p>
            </div>
          )}

          {history.map((entry) => {
            if (entry.type === 'system') {
              return (
                <div key={entry.id} className="text-amber-300/90 whitespace-pre-wrap leading-relaxed bg-amber-500/5 p-3 rounded-lg border border-amber-500/20">
                  {entry.output}
                </div>
              );
            }

            if (entry.type === 'error') {
              return (
                <div key={entry.id} className="text-rose-400 whitespace-pre-wrap bg-rose-500/10 p-2.5 rounded border border-rose-500/20">
                  {entry.output}
                </div>
              );
            }

            if (entry.type === 'input') {
              return (
                <div key={entry.id} className="flex items-start gap-2 text-slate-300 pt-2">
                  <span className="text-amber-400 font-semibold select-none shrink-0">enes@algoritma:~$</span>
                  <span className="text-white font-medium break-all">{entry.command}</span>
                </div>
              );
            }

            if (entry.type === 'output') {
              return (
                <div key={entry.id} className="space-y-2.5 pl-0 sm:pl-4">
                  {/* Primary Output Banner */}
                  <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-slate-900/90 border border-amber-500/30">
                    <div className="space-y-1">
                      <div className="text-[11px] text-amber-400 font-sans font-medium uppercase tracking-wider">
                        Ekrana Yazdırılan Çıktı:
                      </div>
                      <div className="text-sm sm:text-base font-bold text-amber-200 tracking-wide select-all">
                        {entry.output}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(entry.output || '', entry.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md text-xs transition-colors shrink-0"
                      title="Çıktıyı Kopyala"
                    >
                      {copiedId === entry.id ? (
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

                  {/* Token Breakdown Details */}
                  {entry.details && entry.details.pairs.length > 0 && (
                    <div className="bg-slate-900/40 rounded-lg p-2.5 border border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                      <div className="text-[11px] text-slate-500 font-sans flex items-center justify-between">
                        <span>Adım Adım Ayrıştırma Analizi:</span>
                        <span className="tabular-nums font-mono text-[10px] text-slate-600">
                          Çalışma Süresi: {entry.details.executionTimeMs} ms
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {entry.details.pairs.map((p, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-2 rounded bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-2"
                          >
                            <div>
                              <span className="text-slate-300 font-bold">{p.token}</span>
                              <span className="text-slate-500 mx-1.5">→</span>
                              <span className="text-emerald-400 font-bold">{p.result}</span>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                {p.explanation}
                              </p>
                            </div>
                            {p.removedChar ? (
                              <span className="px-1.5 py-0.5 text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded shrink-0">
                                -'{p.removedChar}'
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 border border-slate-700 rounded shrink-0">
                                Sabit
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Row */}
        <div className="border-t border-slate-800 bg-slate-900/90 p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunCommand();
            }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-1 text-amber-400 font-semibold select-none shrink-0">
              <TerminalIcon className="w-4 h-4" />
              <span>&gt;</span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Giriş yapın (Örn: Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0)"
              className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-slate-600 font-mono text-xs sm:text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-md text-xs transition-colors shrink-0"
            >
              <span>Çalıştır</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-amber-400/80" />
              <span>Girdi formatı: <code className="text-slate-300">Metin,İndeks</code> (Aralarında virgül ile)</span>
            </span>
            <span className="hidden sm:inline">İmza & Telif: Enes Öztürk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
