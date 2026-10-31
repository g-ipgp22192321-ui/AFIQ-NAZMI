import React, { useState } from 'react';
import { DetectiveProfile } from '../../types/game';
import { STATION_4_DATA } from '../../data/detectiveData';
import { soundManager } from '../../utils/audio';
import { AudioNarrationButton } from '../AudioNarrationButton';
import { StationArtwork } from '../DetectiveArtwork';
import confetti from 'canvas-confetti';
import { 
  FlaskConical, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight,
  Sparkles,
  Key
} from 'lucide-react';

interface Station4BijakProps {
  profile: DetectiveProfile;
  onUpdateScore: (additional: number) => void;
  onAwardBadge: (badge: string) => void;
  onMarkComplete: (stationId: string) => void;
  onNext: () => void;
}

export const Station4Bijak: React.FC<Station4BijakProps> = ({
  profile,
  onUpdateScore,
  onAwardBadge,
  onMarkComplete,
  onNext,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [stationCompleted, setStationCompleted] = useState(profile.selesaiStesen.includes('station4'));

  const data = STATION_4_DATA;

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
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });

    onAwardBadge(data.badgeName);
    onMarkComplete('station4');
    setStationCompleted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Artwork Banner */}
      <StationArtwork type="lab" />

      <div className="bg-white p-4 sm:p-5 rounded-3xl border-3 border-cyan-400 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{data.badgeIcon}</span>
          <div>
            <span className="text-[11px] font-black uppercase text-cyan-700 tracking-wider">
              Stesen 04 • Aras Sederhana
            </span>
            <h3 className="font-heading font-black text-slate-900 text-lg">
              {data.title}
            </h3>
          </div>
        </div>

        <AudioNarrationButton text={`${data.title}. ${data.story}`} label="Dengar Arahan Makmal" />
      </div>

      {/* Story Narrative Box */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border-3 border-cyan-400/60 shadow-lg space-y-2">
        <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <FlaskConical className="w-4 h-4" />
          <span>Cabaran Kod Kebuk Kebal Makmal</span>
        </div>
        <p className="text-cyan-50 text-sm leading-relaxed">
          {data.story}
        </p>
      </div>

      {/* Interactive Vault Passage */}
      <div className="bg-cyan-50/60 p-6 rounded-3xl border-3 border-cyan-300 shadow-md space-y-3">
        <h3 className="font-heading font-black text-slate-900 text-sm flex items-center gap-2">
          <Key className="w-4 h-4 text-cyan-700" />
          <span>Dekripsi Perenggan Kod Rahsia Makmal:</span>
        </h3>
        <div className="p-4 bg-white rounded-2xl border border-cyan-200 text-slate-800 text-sm leading-relaxed font-medium shadow-inner">
          "{data.readingPassage}"
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <h3 className="font-heading font-black text-slate-900 text-base">
          Soalan Tatabahasa & Kosa Kata Kontekstual (3 Soalan)
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
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-cyan-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {q.teksSoalan}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">
                    +{q.markah} Markah
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowHint({ ...showHint, [q.id]: !showHint[q.id] })}
                    className="p-1 text-slate-400 hover:text-cyan-600 transition-colors cursor-pointer"
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
                  <strong>{isCorrect ? '✅ Syabas, Kod Berjaya Diteka!' : '❌ Semakan Jawapan:'}</strong>
                  <p className="text-slate-600">{q.penerangan}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Clue Award Box */}
      {allAnswered && !stationCompleted && (
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🧪</span>
            <div>
              <h4 className="font-heading font-black text-lg text-yellow-300">
                Pintu Kebuk Kebal Terbuka! {data.clueAwarded.tajuk}!
              </h4>
              <p className="text-xs text-cyan-100">{data.clueAwarded.huraian}</p>
            </div>
          </div>

          <button
            onClick={handleFinishStation}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-heading font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Tuntut Lencana Bijak
          </button>
        </div>
      )}

      {/* Next station button */}
      {stationCompleted && (
        <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-2xl border-2 border-cyan-300">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-900">
            <Award className="w-5 h-5 text-cyan-600" />
            <span>Stesen 4 Telah Selesai! Lencana Bijak dimasukkan ke profil.</span>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onNext();
            }}
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-heading font-black text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Terus ke Stesen 5 (Menara Jam)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
