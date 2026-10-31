import React, { useState } from 'react';
import { DetectiveProfile } from '../../types/game';
import { STATION_3_DATA } from '../../data/detectiveData';
import { soundManager } from '../../utils/audio';
import { AudioNarrationButton } from '../AudioNarrationButton';
import { StationArtwork } from '../DetectiveArtwork';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight,
  Eye,
  Sparkles
} from 'lucide-react';

interface Station3PemulaProps {
  profile: DetectiveProfile;
  onUpdateScore: (additional: number) => void;
  onAwardBadge: (badge: string) => void;
  onMarkComplete: (stationId: string) => void;
  onNext: () => void;
}

export const Station3Pemula: React.FC<Station3PemulaProps> = ({
  profile,
  onUpdateScore,
  onAwardBadge,
  onMarkComplete,
  onNext,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [highlightClue, setHighlightClue] = useState<string | null>(null);
  const [stationCompleted, setStationCompleted] = useState(profile.selesaiStesen.includes('station3'));

  const data = STATION_3_DATA;

  const handleSelectAnswer = (qId: string, choice: string, correct: string, markah: number) => {
    if (selectedAnswers[qId]) return;

    const isCorrect = choice === correct;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: choice }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));

    if (isCorrect) {
      soundManager.playCorrect();
      onUpdateScore(markah);
    } else {
      soundManager.playWrong();
    }
  };

  const allAnswered = data.questions.every((q) => selectedAnswers[q.id]);

  const handleFinishStation = () => {
    soundManager.playCorrect();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onAwardBadge(data.badgeName);
    onMarkComplete('station3');
    setStationCompleted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Artwork Banner */}
      <StationArtwork type="library" />

      <div className="bg-white p-4 sm:p-5 rounded-3xl border-3 border-emerald-400 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{data.badgeIcon}</span>
          <div>
            <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">
              Stesen 03 • Aras Pemula
            </span>
            <h3 className="font-heading font-black text-slate-900 text-lg">
              {data.title}
            </h3>
          </div>
        </div>

        <AudioNarrationButton text={`${data.title}. ${data.story} ${data.readingPassage}`} label="Dengar Laporan Saksi" />
      </div>

      {/* Narrative Story Card */}
      <div className="bg-emerald-950 text-white p-6 rounded-3xl border-3 border-emerald-400/60 shadow-lg space-y-2">
        <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
          <Search className="w-4 h-4" />
          <span>Latar Belakang Penyiasatan</span>
        </div>
        <p className="text-emerald-50 text-sm leading-relaxed">
          {data.story}
        </p>
      </div>

      {/* Reading Passage Box with Magnifier Clues */}
      <div className="bg-amber-50/70 p-6 rounded-3xl border-3 border-amber-300 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-amber-200 pb-2">
          <h3 className="font-heading font-black text-slate-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Dokumen Bukti Kes #1: Laporan Pengawas Perpustakaan</span>
          </h3>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
            Teks Bacaan DSKP
          </span>
        </div>

        <div className="text-slate-800 text-sm leading-relaxed font-medium bg-white p-5 rounded-2xl border border-amber-200 shadow-inner">
          "{data.readingPassage}"
        </div>

        {/* Interactive Magnifying Glass Clue Items */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>Petunjuk Tersembunyi (Klik untuk siasat bukti):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setHighlightClue("Tapak Kasut Berlumpur: Bukti penceroboh masuk dari kawasan kebun berlumpur selepas hujan.");
              }}
              className="p-2.5 bg-white hover:bg-emerald-50 border-2 border-emerald-200 text-slate-800 rounded-xl text-left font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>👟</span>
              <span className="truncate">Tapak Kasut Berlumpur</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setHighlightClue("Kain Biru Gelap: Tersangkut pada jeriji besi, membayangkan warna pakaian suspek.");
              }}
              className="p-2.5 bg-white hover:bg-emerald-50 border-2 border-emerald-200 text-slate-800 rounded-xl text-left font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>🧥</span>
              <span className="truncate">Cebisan Kain Biru</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setHighlightClue("Halaman 42: Peta pulau tersembunyi yang menghubungkan arkib ke makmal sains bawah tanah.");
              }}
              className="p-2.5 bg-white hover:bg-emerald-50 border-2 border-emerald-200 text-slate-800 rounded-xl text-left font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>📖</span>
              <span className="truncate">Halaman 42 Terbuka</span>
            </button>
          </div>

          {highlightClue && (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-medium border border-emerald-300 animate-in fade-in">
              🔍 <strong>Nota Detektif:</strong> {highlightClue}
            </div>
          )}
        </div>
      </div>

      {/* Investigation Questions */}
      <div className="space-y-4">
        <h3 className="font-heading font-black text-slate-900 text-base">
          Teka-Teki & Soalan Kefahaman Membaca (3 Soalan)
        </h3>

        {data.questions.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = Boolean(userChoice);
          const isCorrect = userChoice === q.jawapanBetul;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-3xl border-3 transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-400 bg-emerald-50/30'
                    : 'border-red-400 bg-red-50/30'
                  : 'border-slate-200 bg-white shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-amber-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {q.teksSoalan}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    +{q.markah} Markah
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowHint({ ...showHint, [q.id]: !showHint[q.id] })}
                    className="p-1 text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                    title="Petunjuk Penyiasat"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {showHint[q.id] && (
                <div className="mb-3 p-2.5 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-900">
                  💡 <strong>Petunjuk:</strong> {q.petunjuk}
                </div>
              )}

              {/* Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.pilihan.map((p, pIdx) => {
                  const isThisChoice = userChoice === p;
                  let btnClass = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                  if (isAnswered) {
                    if (p === q.jawapanBetul) {
                      btnClass = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold';
                    } else if (isThisChoice && !isCorrect) {
                      btnClass = 'border-red-500 bg-red-100 text-red-900 font-bold';
                    }
                  }

                  return (
                    <button
                      key={pIdx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectAnswer(q.id, p, q.jawapanBetul, q.markah)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                    >
                      <span>{p}</span>
                      {isAnswered && p === q.jawapanBetul && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isThisChoice && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation on answer */}
              {showExplanation[q.id] && (
                <div className="mt-3 p-3 rounded-xl bg-slate-100 text-xs text-slate-800 space-y-1">
                  <strong>{isCorrect ? '✅ Tepat Sekali!' : '❌ Jawapan Kurang Tepat:'}</strong>
                  <p className="text-slate-600">{q.penerangan}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion & Clue Award Box */}
      {allAnswered && !stationCompleted && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🗺️</span>
            <div>
              <h4 className="font-heading font-black text-lg text-yellow-300">
                Tahniah! Kamu Menjumpai {data.clueAwarded.tajuk}!
              </h4>
              <p className="text-xs text-emerald-100">{data.clueAwarded.huraian}</p>
            </div>
          </div>

          <button
            onClick={handleFinishStation}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-heading font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Tuntut Lencana Pemula
          </button>
        </div>
      )}

      {/* Next station button once completed */}
      {stationCompleted && (
        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>Stesen 3 Telah Selesai! Lencana Pemula dimasukkan ke profil.</span>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onNext();
            }}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-black text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Terus ke Stesen 4</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
