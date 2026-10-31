import React from 'react';
import { Play, Sparkles, Award, Shield, Search, Mic, BookOpen, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { AudioNarrationButton } from './AudioNarrationButton';
import { DetectiveIslandIllustration } from './DetectiveArtwork';
import { DEBACA_INFO } from '../data/detectiveData';

interface CoverScreenProps {
  onStart: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStart }) => {
  const introSpeech =
    "Selamat datang ke DEBACA 4.0: Pengembaraan Detektif! Inovasi pembelajaran Bahasa Melayu Tahun Empat. Mari membaca petikan, menyiasat petunjuk tersembunyi, menakluki kod tatabahasa, dan membuktikan kehebatan kamu untuk meraih Lencana Emas Detektif Master!";

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 via-amber-800 to-slate-900 text-white shadow-2xl border-4 border-yellow-400 p-6 sm:p-12 text-center">
        {/* Decorative corner badges */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl"></div>

        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider mb-4 shadow-md">
          <Sparkles className="w-4 h-4" />
          <span>Inovasi Pedagogi Abad Ke-21 (KPM)</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl sm:text-6xl font-black text-yellow-300 tracking-tight drop-shadow-md mb-2">
          DEBACA 4.0
        </h1>
        <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-white mb-4">
          Pengembaraan Detektif Cilik
        </h2>
        <p className="text-amber-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
          {DEBACA_INFO.subtitle}. Mari membaca petikan misteri, meneliti bukti kes, dan merungkai rahsia menggunakan kebijaksanaan bahasa!
        </p>

        {/* Island Map Hero Preview */}
        <div className="max-w-2xl mx-auto my-4 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg">
          <DetectiveIslandIllustration className="w-full h-40 sm:h-52 object-cover" />
        </div>

        {/* Tagline Badge */}
        <div className="inline-block bg-slate-950/60 backdrop-blur-xs border-2 border-amber-400/60 px-6 py-2 rounded-2xl text-amber-300 font-bold text-sm tracking-wide mb-8">
          🔍 BACA • 🕵️ SIASAT • 💡 FIKIR • 🏆 BUKTIKAN!
        </div>

        {/* Action Button & Voice Narration */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              soundManager.playCorrect();
              onStart();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-heading text-lg font-black rounded-2xl shadow-xl shadow-yellow-500/30 transform active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
            <span>MULA PENYIASATAN SEKARANG</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <AudioNarrationButton text={introSpeech} label="Dengar Taklimat Suara" />
        </div>
      </div>

      {/* 4 Mission Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border-3 border-amber-200 shadow-md hover:border-amber-400 transition-colors space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold">
            📜
          </div>
          <h3 className="font-heading font-black text-slate-900 text-base">Stesen 3: Perpustakaan</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Membaca laporan saksi, mengecam maklumat tersurat & tersirat untuk mencari petunjuk pertama.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-3 border-emerald-200 shadow-md hover:border-emerald-400 transition-colors space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold">
            ⚗️
          </div>
          <h3 className="font-heading font-black text-slate-900 text-base">Stesen 4: Makmal Sains</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Membongkar kod kebuk kebal menggunakan tatabahasa kata hubung, kata kerja & peribahasa.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-3 border-blue-200 shadow-md hover:border-blue-400 transition-colors space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl font-bold">
            ⏰
          </div>
          <h3 className="font-heading font-black text-slate-900 text-base">Stesen 5: Menara Jam</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menganalisis kenyataan saksi, menaakul logik bukti dan membuat kesimpulan detektif.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-3 border-purple-200 shadow-md hover:border-purple-400 transition-colors space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl font-bold">
            🎙️
          </div>
          <h3 className="font-heading font-black text-slate-900 text-base">Bilik Ujian Suara</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ujian bacaan suara secara langsung untuk menilai kelancaran, sebutan baku & intonasi murid.
          </p>
        </div>
      </div>
    </div>
  );
};
