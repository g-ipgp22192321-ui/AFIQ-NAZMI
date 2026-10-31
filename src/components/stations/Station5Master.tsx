import React, { useState, useRef } from 'react';
import { DetectiveProfile } from '../../types/game';
import { STATION_5_DATA } from '../../data/detectiveData';
import { soundManager } from '../../utils/audio';
import { AudioNarrationButton } from '../AudioNarrationButton';
import { StationArtwork } from '../DetectiveArtwork';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight,
  Mic,
  Square,
  Volume2,
  RotateCcw,
  Sparkles,
  FileText,
  VolumeX,
  Play,
  AlertTriangle
} from 'lucide-react';

interface Station5MasterProps {
  profile: DetectiveProfile;
  onUpdateScore: (additional: number) => void;
  onAwardBadge: (badge: string) => void;
  onMarkComplete: (stationId: string) => void;
  onVoiceSubmitted: (audioUrl: string) => void;
  onNext: () => void;
}

export const Station5Master: React.FC<Station5MasterProps> = ({
  profile,
  onUpdateScore,
  onAwardBadge,
  onMarkComplete,
  onVoiceSubmitted,
  onNext,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  
  // Voice recording state in Mission 5
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(profile.rakamanSuaraUrl || null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceSubmitted, setVoiceSubmitted] = useState(Boolean(profile.rakamanSuaraUrl));
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  const data = STATION_5_DATA;

  // The long situation passage broken down sentence by sentence
  const situationSentences = [
    {
      num: 1,
      text: "Pada waktu tengah malam yang hening, Detektif Cilik berkejaran mendaki anak tangga batu ke puncak Menara Jam Kuno.",
    },
    {
      num: 2,
      text: "Jarum jam berdetik laju menunjukkan tepat pukul sebelas lima puluh lima malam.",
    },
    {
      num: 3,
      text: "Di dalam bilik gear raksasa yang bergemerlapan, mereka mendapati Manuskrip Emas terletak di atas meja antik bersebelahan tingkap.",
    },
    {
      num: 4,
      text: "Seorang suspek berpakaian biru gelap cuba melarikan diri melalui tingkap kaca yang terbuka luas.",
    },
    {
      num: 5,
      text: "Dengan penuh keberanian dan ketangkasan, Detektif Cilik berjaya merampas kembali manuskrip tersebut sebelum suspek melompat keluar.",
    },
    {
      num: 6,
      text: "Kejayaan ini membuktikan bahawa ketelitian membaca petunjuk, kebijaksanaan berfikir, dan kerjasama padu sentiasa membuahkan hasil yang terbilang.",
    },
  ];

  const fullSituationPassage = situationSentences.map((s) => s.text).join(' ');

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

  const questionsAnswered = data.questions.every((q) => selectedAnswers[q.id]);

  // Play audio for a specific sentence
  const handlePlaySentenceAudio = (index: number, text: string) => {
    if (activeSentenceIndex === index) {
      soundManager.stopSpeaking();
      setActiveSentenceIndex(null);
      return;
    }

    soundManager.playClick();
    setActiveSentenceIndex(index);
    soundManager.speakMalay(text, () => {
      setActiveSentenceIndex(null);
    });
  };

  // Audio Recording handlers with fallback & permission recovery
  const [micError, setMicError] = useState<string | null>(null);

  const startRecording = async () => {
    setMicError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Pelayar web ini tidak menyokong rakaman mikrofon secara terus.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone access issue:', err);
      setMicError(
        'Akses mikrofon tidak dapat dibuka secara automatik. Anda boleh klik "Benarkan" pada ikon mangga pelayar web, ATAU gunakan butang Simulasi Suara Detektif di bawah.'
      );
    }
  };

  // Alternative fallback for pupils who cannot grant mic permission
  const handleSimulateRecording = () => {
    setMicError(null);
    setIsRecording(true);
    setRecordingSeconds(0);
    soundManager.speakMalay(fullSituationPassage);

    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 6) {
          clearInterval(timerRef.current);
          setIsRecording(false);
          soundManager.playCorrect();

          // Generate simulated audio buffer using AudioContext
          try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioCtx();
            const sampleRate = 44100;
            const buffer = ctx.createBuffer(1, sampleRate * 3, sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < buffer.length; i++) {
              data[i] = Math.sin(i / 15) * Math.exp(-i / (sampleRate * 2));
            }
            // Generate a simple wav blob for playback
            const wavBlob = new Blob([new Uint8Array(44 + 44100 * 3)], { type: 'audio/wav' });
            const simUrl = URL.createObjectURL(wavBlob);
            setAudioUrl(simUrl);
          } catch {
            setAudioUrl('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
          }
          return 6;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      soundManager.playCorrect();
    } else if (isRecording) {
      setIsRecording(false);
      clearInterval(timerRef.current);
      soundManager.playCorrect();
    }
  };

  const handleSubmitVoice = () => {
    if (!audioUrl) return;

    soundManager.playCorrect();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    onVoiceSubmitted(audioUrl);
    setVoiceSubmitted(true);
    onAwardBadge(data.badgeName);
    onAwardBadge('Lencana Vokal Cemerlang');
    onMarkComplete('station5');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Artwork Banner */}
      <StationArtwork type="clock" />

      {/* Narrative Alert */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border-3 border-purple-400 shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-purple-400 animate-spin" />
            <span>Stesen 05 (Misi Terakhir) • Aras Master KBAT</span>
          </div>
          <AudioNarrationButton text={`${data.title}. ${data.story}`} label="Dengar Arahan Misi" />
        </div>
        <p className="text-purple-100 text-sm leading-relaxed">
          {data.story}
        </p>
      </div>

      {/* BAHAGIAN A: Analisis Bukti 4 Saksi */}
      <div className="bg-white p-6 rounded-3xl border-4 border-purple-300 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-purple-100 pb-2">
          <h3 className="font-heading font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <span>👥 Bahagian A: Transkrip Soal Siasat Empat Saksi</span>
          </h3>
          <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
            Analisis Bukti Logik
          </span>
        </div>

        <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 text-slate-800 text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-line shadow-inner">
          {data.readingPassage}
        </div>

        {/* Deduction Questions */}
        <div className="space-y-4 pt-2">
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
                      ? 'border-emerald-400 bg-emerald-50/40'
                      : 'border-red-400 bg-red-50/40'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-purple-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {q.teksSoalan}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                      +{q.markah} Markah
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowHint({ ...showHint, [q.id]: !showHint[q.id] })}
                      className="p-1 text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
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
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {q.pilihan.map((p, pIdx) => {
                    const isThisChoice = userChoice === p;
                    let btnClass = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800';

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

                {/* Explanation */}
                {showExplanation[q.id] && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-100 text-xs text-slate-800 space-y-1">
                    <strong>{isCorrect ? '✅ Penaakulan Tepat!' : '❌ Semakan Bukti:'}</strong>
                    <p className="text-slate-600">{q.penerangan}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BAHAGIAN B: Ujian Wajib Rakaman Suara Bacaan Situasi Akhir */}
      <div className={`p-6 sm:p-8 rounded-3xl border-4 transition-all ${
        questionsAnswered
          ? 'bg-gradient-to-br from-amber-50 via-white to-yellow-50 border-yellow-400 shadow-2xl'
          : 'bg-slate-100 border-slate-300 opacity-60'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-yellow-300 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black shadow-md">
              🎙️
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                Langkah Wajib Sebelum Membuka Sijil
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                Bahagian B: Rakaman Suara Bacaan Situasi Akhir
              </h3>
            </div>
          </div>

          <button
            onClick={() => soundManager.speakMalay(fullSituationPassage)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-full text-xs font-black shadow-md cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Dengar Keseluruhan Petikan</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
          Baca petikan situasi detik-detik penangkapan suspek di bawah. Anda boleh mendengar sebutan & intonasi Bahasa Melayu bagi <strong>setiap ayat</strong> dengan menekan butang suara pada setiap baris sebelum memulakan rakaman!
        </p>

        {/* Sentence-by-sentence reading cards with Malay audio buttons */}
        <div className="space-y-2.5 mb-6">
          {situationSentences.map((sent, idx) => {
            const isPlayingThis = activeSentenceIndex === idx;

            return (
              <div
                key={sent.num}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isPlayingThis
                    ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-400'
                    : 'bg-white border-amber-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {sent.num}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                    "{sent.text}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handlePlaySentenceAudio(idx, sent.text)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    isPlayingThis
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                  }`}
                  title="Dengar sebutan ayat ini dalam Bahasa Melayu"
                >
                  {isPlayingThis ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Henti</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                      <span>Dengar Ayat {sent.num}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* MediaRecorder Voice Booth inside Mission 5 */}
        <div className="p-6 bg-white rounded-3xl border-3 border-dashed border-amber-400 flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-amber-600" />
            <span>Pusat Rakaman Suara Detektif Cilik</span>
          </div>

          {/* Animated Soundwave Visualizer while recording */}
          {isRecording && (
            <div className="py-2 flex items-center gap-1.5">
              {[18, 36, 24, 48, 30, 52, 20, 44, 28, 40, 16, 32].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-amber-500 to-rose-500 rounded-full animate-pulse"
                  style={{
                    height: `${h}px`,
                    animationDelay: `${(i % 4) * 150}ms`,
                    animationDuration: '600ms',
                  }}
                />
              ))}
            </div>
          )}

          {/* Mic Error / Permission Helper Box */}
          {micError && (
            <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl max-w-lg text-left text-xs space-y-2">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Panduan Akses Mikrofon Pelayar Web:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {micError}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  Cuba Buka Mikrofon Semula
                </button>
                <button
                  type="button"
                  onClick={handleSimulateRecording}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Gunakan Simulasi Suara Detektif
                </button>
              </div>
            </div>
          )}

          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={!questionsAnswered}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-heading font-black text-sm sm:text-base shadow-xl transform active:scale-95 transition-all cursor-pointer ${
                questionsAnswered
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse ring-4 ring-rose-200'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Mic className="w-5 h-5" />
              <span>{audioUrl ? 'Rakam Semula Suara Bacaan' : 'Mula Rakam Suara Bacaan Petikan'}</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-black text-white rounded-full font-heading font-black text-sm sm:text-base shadow-xl animate-bounce cursor-pointer ring-4 ring-red-400"
            >
              <Square className="w-5 h-5 text-red-400 fill-current" />
              <span>Hentikan Rakaman ({recordingSeconds}s)</span>
            </button>
          )}

          {/* Audio Player and Submit button */}
          {audioUrl && (
            <div className="w-full max-w-md space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                🎧 Dengar Semula Rakaman Suara Anda:
              </span>
              <audio controls src={audioUrl} className="w-full h-11 rounded-xl shadow-inner" />

              {!voiceSubmitted ? (
                <button
                  onClick={handleSubmitVoice}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Sahkan & Hantar Rakaman (+30 Mata & Buka Sijil)</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-black flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Rakaman Suara Berjaya Dihantar! Dewan Sijil Kini Dibuka!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Completion & Final Grand Certificate Link */}
      {voiceSubmitted && (
        <div className="p-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border-4 border-white animate-in zoom-in-95">
          <div className="flex items-center gap-4">
            <span className="text-5xl drop-shadow-md">🏆</span>
            <div>
              <h4 className="font-heading font-black text-xl text-slate-950">
                Tahniah Detektif {profile.nama}! Semua Misi Telah Selesai!
              </h4>
              <p className="text-xs text-slate-800 font-bold">
                Kamu telah menewaskan pencuri bayang, membaca bukti kes, dan merakam suara bacaan dengan jayanya.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playCorrect();
              onNext();
            }}
            className="px-8 py-4 bg-slate-950 hover:bg-black text-yellow-300 font-heading font-black text-sm sm:text-base rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Buka & Cetak Sijil Rasmi</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
