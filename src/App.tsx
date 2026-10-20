/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { TerminalConsole } from './components/TerminalConsole';
import { VisualInspector } from './components/VisualInspector';
import { BatchProcessor } from './components/BatchProcessor';
import { CodeShowcase } from './components/CodeShowcase';
import { CopyrightModal } from './components/CopyrightModal';
import { Footer } from './components/Footer';
import { Terminal, Shield, CheckCircle2, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('terminal');
  const [isCopyrightOpen, setIsCopyrightOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenCopyright={() => setIsCopyrightOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                <span>ENES ÖZTÜRK YAZILIM ALGORİTMASI</span>
                <span>·</span>
                <span className="text-slate-400">© 2026 TÜM HAKLARI SAKLIDIR</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
                Karakter Çıkartma Konsol Uygulaması
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Ekrandan virgül ile ayrılmış metin ve indeks çiftlerini alan, ilgili indisteki karakteri çıkartıp
                konsola yazdıran algoritma motoru ve interaktif stüdyo.
              </p>
            </div>

            {/* Quick Author Trust Seal */}
            <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl shrink-0 self-start md:self-auto">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px]">Telif & İmza:</span>
                <span className="text-slate-200 font-semibold">Enes Öztürk</span>
              </div>
            </div>
          </div>

          {/* 3 Core Rules KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>0-Tabanlı İndeksleme</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Karakter pozisyonları 0'dan başlar: <code className="text-slate-300 font-mono">Algoritma,3</code> için 3. karakter <strong className="text-amber-300 font-mono">'o'</strong> çıkartılarak <strong className="text-slate-200 font-mono">"Algritma"</strong> elde edilir.
              </p>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Güvenli Sınır Denetimi</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Verilen indeks metin uzunluğunu aşarsa (<code className="text-slate-300 font-mono">Algoritma,22</code>) veya negatifse metin değiştirilmeden korunur.
              </p>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>Toplu Çift Desteği</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Tek satırda boşluklarla ayrılmış çoklu çiftler girilebilir: <code className="text-slate-300 font-mono">Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0</code>
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Content Views */}
        <section>
          {activeTab === 'terminal' && <TerminalConsole />}
          {activeTab === 'visualizer' && <VisualInspector />}
          {activeTab === 'batch' && <BatchProcessor />}
          {activeTab === 'code' && <CodeShowcase />}
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenCopyright={() => setIsCopyrightOpen(true)} />

      {/* Copyright Modal */}
      <CopyrightModal
        isOpen={isCopyrightOpen}
        onClose={() => setIsCopyrightOpen(false)}
      />
    </div>
  );
}
