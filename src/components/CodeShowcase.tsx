/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, FileCode, CheckCircle2 } from 'lucide-react';
import { CODE_TEMPLATES } from '../utils/algorithm';

type LanguageKey = 'csharp' | 'python' | 'javascript' | 'java' | 'cpp';

interface LanguageMeta {
  key: LanguageKey;
  name: string;
  extension: string;
  runtime: string;
  runCommand: string;
  methodUsed: string;
  description: string;
}

const LANGUAGES: LanguageMeta[] = [
  {
    key: 'csharp',
    name: 'C# (.NET)',
    extension: 'Program.cs',
    runtime: '.NET 8 / 9 Console',
    runCommand: 'dotnet run',
    methodUsed: 'string.Remove(index, 1)',
    description: 'C# Console uygulaması. Konsoldan tek satırda okunan metinleri boşluklarla bölüp string.Remove metoduyla karakter çıkartır.'
  },
  {
    key: 'python',
    name: 'Python 3',
    extension: 'main.py',
    runtime: 'Python 3.10+',
    runCommand: 'python main.py',
    methodUsed: 'text[:index] + text[index+1:]',
    description: 'Python konsol scripti. Dilimleme (slicing) yöntemiyle indeks öncesi ve sonrasını güvenle birleştirir.'
  },
  {
    key: 'javascript',
    name: 'JavaScript (Node.js)',
    extension: 'index.js',
    runtime: 'Node.js 18+',
    runCommand: 'node index.js',
    methodUsed: 'text.slice(0, index) + text.slice(index + 1)',
    description: 'Node.js readline arayüzü ile standart konsol girişinden veriyi okur ve String.prototype.slice ile işler.'
  },
  {
    key: 'java',
    name: 'Java',
    extension: 'EnesOzturkAlgoritma.java',
    runtime: 'JDK 17+',
    runCommand: 'javac EnesOzturkAlgoritma.java && java EnesOzturkAlgoritma',
    methodUsed: 'StringBuilder.deleteCharAt(index)',
    description: 'Java Scanner ile konsol girdisini okur ve verimli StringBuilder.deleteCharAt metodunu kullanır.'
  },
  {
    key: 'cpp',
    name: 'C++',
    extension: 'main.cpp',
    runtime: 'C++17',
    runCommand: 'g++ -O2 main.cpp -o app && ./app',
    methodUsed: 'std::string::erase(index, 1)',
    description: 'Modern C++ stringstream ve std::string::erase fonksiyonuyla karakteri bellekten kaldırır.'
  }
];

export const CodeShowcase: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageKey>('csharp');
  const [copied, setCopied] = useState<boolean>(false);

  const currentMeta = LANGUAGES.find((l) => l.key === selectedLang)!;
  const currentCode = CODE_TEMPLATES[selectedLang];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Konsol Uygulaması Kaynak Kodları (Enes Öztürk)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              İstediğiniz programlama dilini seçip derlenebilir konsol uygulamasını kopyalayabilirsiniz.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Telif Sahibi: <span className="text-slate-300 font-semibold">Enes Öztürk © 2026</span>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.key;
            return (
              <button
                key={lang.key}
                onClick={() => setSelectedLang(lang.key)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-semibold shadow-sm'
                    : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{lang.name}</span>
              </button>
            );
          })}
        </div>

        {/* Language Details Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block">Dosya Adı:</span>
            <span className="font-mono text-slate-200 font-semibold">{currentMeta.extension}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Kullanılan Metot:</span>
            <span className="font-mono text-amber-300 font-semibold">{currentMeta.methodUsed}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Çalıştırma Komutu:</span>
            <span className="font-mono text-emerald-400 font-semibold">{currentMeta.runCommand}</span>
          </div>
        </div>
      </div>

      {/* Code Editor Preview Window */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Editor Chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="ml-2 text-xs text-slate-400 font-sans">
              {currentMeta.extension} — Enes Öztürk Telif Korumalı Kod
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md text-xs font-sans font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-5 overflow-x-auto max-h-[550px] bg-slate-950">
          <pre className="text-slate-200 leading-relaxed font-mono whitespace-pre">
            {currentCode}
          </pre>
        </div>

        {/* Footer info in code box */}
        <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-sans">
          <span>Yazar & Geliştirici: Enes Öztürk</span>
          <span>© 2026 Enes Öztürk. Tüm Hakları Saklıdır.</span>
        </div>
      </div>
    </div>
  );
};
