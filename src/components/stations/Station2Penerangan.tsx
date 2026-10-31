import React from 'react';
import { DetectiveProfile } from '../../types/game';
import { DEBACA_INFO } from '../../data/detectiveData';
import { soundManager } from '../../utils/audio';
import { AudioNarrationButton } from '../AudioNarrationButton';
import { StationArtwork } from '../DetectiveArtwork';
import { 
  ShieldAlert, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Flame, 
  Sparkles,
  Award
} from 'lucide-react';

interface Station2PeneranganProps {
  profile: DetectiveProfile;
  onNext: () => void;
  onMarkComplete: (stationId: string) => void;
}

export const Station2Penerangan: React.FC<Station2PeneranganProps> = ({
  profile,
  onNext,
  onMarkComplete,
}) => {
  const briefingText =
    "Panggilan kecemasan untuk semua Detektif Cilik! Manuskrip warisan bahasa telah disembunyikan oleh musuh misteri di tiga lokasi berbeza di Pulau Pengembaraan. Tugas kamu adalah membaca setiap petikan laporan dengan teliti, menyelesaikan teka-teki tatabahasa, dan menaakul bukti untuk mendapatkan 3 Cebisan Kunci Emas. Bersedia? Mari kita mulakan misi di Stesen 3!";

  const handleStartMission = () => {
    soundManager.playCorrect();
    onMarkComplete('station2');
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Artwork Banner */}
      <StationArtwork type="briefing" />

      {/* Case File Alert Box */}
      <div className="bg-gradient-to-br from-slate-900 to-amber-950 text-white p-6 sm:p-8 rounded-3xl border-4 border-amber-400 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-yellow-400 font-heading font-black text-lg">
          <ShieldAlert className="w-6 h-6 animate-pulse" />
          <span>Laporan Kes: Kecurian Manuskrip Emas</span>
        </div>

        <p className="text-amber-100 text-sm sm:text-base leading-relaxed font-medium">
          Salam Detektif <strong>{profile.nama || 'Cilik'}</strong>! Ibu Pejabat Penyiasat memerlukan bantuan kamu. 
          Manuskrip Emas mengandungi rahsia kebijaksanaan Bahasa Melayu telah diceroboh. 
          Petunjuk telah bertaburan di <span className="text-yellow-300 font-bold">Perpustakaan Purba</span>, <span className="text-yellow-300 font-bold">Makmal Sains Bawah Tanah</span>, dan <span className="text-yellow-300 font-bold">Portal Menara Jam</span>.
        </p>

        {/* 4 Rules of Detective */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/15 flex items-start gap-3">
            <span className="text-2xl">🔍</span>
            <div>
              <div className="font-black text-yellow-300 text-xs">1. BACA PETIKAN</div>
              <p className="text-[11px] text-slate-300">Baca laporan saksi dengan teliti, perhatikan maklumat tersurat & tersirat.</p>
            </div>
          </div>

          <div className="p-3 bg-white/10 rounded-2xl border border-white/15 flex items-start gap-3">
            <span className="text-2xl">🕵️</span>
            <div>
              <div className="font-black text-yellow-300 text-xs">2. SIASAT PETUNJUK</div>
              <p className="text-[11px] text-slate-300">Gunakan kanta pembesar detektif untuk mengesan kata kunci tersembunyi.</p>
            </div>
          </div>

          <div className="p-3 bg-white/10 rounded-2xl border border-white/15 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-black text-yellow-300 text-xs">3. FIKIR & KOD BAHASA</div>
              <p className="text-[11px] text-slate-300">Selesaikan soalan tatabahasa kata hubung, kata kerja & peribahasa.</p>
            </div>
          </div>

          <div className="p-3 bg-white/10 rounded-2xl border border-white/15 flex items-start gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-black text-yellow-300 text-xs">4. BUKTIKAN KES</div>
              <p className="text-[11px] text-slate-300">Rakam suara bacaan dan raih Sijil Lencana Emas Master kebanggaan!</p>
            </div>
          </div>
        </div>
      </div>

      {/* DSKP Standards Card */}
      <div className="bg-white p-6 rounded-3xl border-3 border-amber-200 shadow-md space-y-3">
        <h3 className="font-heading font-black text-slate-900 text-sm flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Fokus Standard Pembelajaran DSKP Bahasa Melayu Tahun 4:</span>
        </h3>
        <ul className="space-y-2 text-xs text-slate-700">
          {DEBACA_INFO.dskpStandards.map((std, i) => (
            <li key={i} className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{std}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action to proceed */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleStartMission}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-heading font-black text-base rounded-2xl shadow-xl shadow-amber-500/30 transform active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Mulakan Penyiasatan di Stesen 3</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
