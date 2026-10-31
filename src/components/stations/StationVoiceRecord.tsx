import React, { useState, useRef } from 'react';
import { Mic, Square, Play, RotateCcw, Volume2, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface StationVoiceRecordProps {
  pupilName: string;
  onVoiceSubmitted: (audioUrl: string) => void;
  savedAudioUrl?: string | null;
  onNext?: () => void;
}

export const StationVoiceRecord: React.FC<StationVoiceRecordProps> = ({
  pupilName,
  onVoiceSubmitted,
  savedAudioUrl,
  onNext,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(savedAudioUrl || null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  const paragraphText =
    "Pada suatu pagi yang hening, Detektif Cilik menemui sepucuk surat misteri di atas meja makmal. Surat itu mengandungi teka-teki tentang formula ramuan rahsia yang hilang. Dengan penuh ketelitian dan semangat membara, mereka menyiasat setiap petunjuk dan membuktikan bahawa kejujuran adalah kunci utama kejayaan.";

  const startRecording = async () => {
    try {
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
    } catch {
      alert("Sila benarkan akses mikrofon pada pelayar web anda untuk merakam suara.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      soundManager.playCorrect();
    }
  };

  const handleConfirmSubmit = () => {
    if (!audioUrl) return;
    soundManager.playCorrect();
    onVoiceSubmitted(audioUrl);
    if (onNext) onNext();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-300 max-w-3xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
        <div>
          <span className="text-xs font-black uppercase text-amber-700 tracking-wider">
            Stesen 06 • Ujian Kelancaran Vokal
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-amber-900 flex items-center gap-2">
            <span>🎙️</span> Ujian Suara Detektif: {pupilName || 'Murid'}
          </h3>
        </div>
        <button
          onClick={() => soundManager.speakMalay(paragraphText)}
          className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-xs font-bold shadow cursor-pointer transition-colors"
        >
          <Volume2 className="w-4 h-4" /> Dengar Contoh Bacaan
        </button>
      </div>

      <p className="text-xs text-slate-500">
        Baca teks perenggan di bawah dengan jelas, intonasi yang betul, dan sebutan baku bahasa Melayu:
      </p>

      <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-200 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
        "{paragraphText}"
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-full shadow-lg transform active:scale-95 transition cursor-pointer"
          >
            <Mic className="w-5 h-5 animate-pulse" /> Mula Rakam Suara
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-full shadow-lg animate-bounce cursor-pointer"
          >
            <Square className="w-5 h-5 text-red-400" /> Hentikan Rakaman ({recordingSeconds}s)
          </button>
        )}

        {audioUrl && (
          <div className="w-full max-w-md flex flex-col items-center gap-3 mt-3 px-4">
            <span className="text-xs font-bold text-slate-600">Dengar Rakaman Suara Anda:</span>
            <audio controls src={audioUrl} className="w-full h-11" />
            <button
              onClick={handleConfirmSubmit}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-full shadow-md text-sm w-full cursor-pointer transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" /> Sahkan & Hantar Rakaman Suara
            </button>
          </div>
        )}
      </div>

      {savedAudioUrl && !audioUrl && (
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-xs text-emerald-800 flex items-center justify-between">
          <span>✅ Rakaman suara terdahulu telah disimpan.</span>
          {onNext && (
            <button
              onClick={onNext}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Terus ke Sijil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
