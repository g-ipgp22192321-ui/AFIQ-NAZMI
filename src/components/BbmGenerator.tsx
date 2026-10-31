import React, { useState } from 'react';
import { BBMData } from '../types';
import { SAMPLE_BBM, SUBJECT_LIST, GRADE_LEVELS } from '../data/dskpSamples';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Printer, 
  GitFork,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const BbmGenerator: React.FC = () => {
  const [bbmData, setBbmData] = useState<BBMData>(SAMPLE_BBM);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [subject, setSubject] = useState('Sains');
  const [grade, setGrade] = useState('Tahun 5 (KSSR Semakan)');
  const [topic, setTopic] = useState('Kemandirian Spesies Haiwan');
  const [type, setType] = useState('Kad Imbasan & Peta Minda');

  // Fill in the blanks student state
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [fillChecked, setFillChecked] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMessage(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setFillAnswers({});
    setFillChecked(false);

    try {
      const response = await fetch('/api/generate-bbm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, grade, topic, type }),
      });

      if (!response.ok) {
        throw new Error(`Ralat pelayan: ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        setBbmData(resData.data);
      } else {
        throw new Error(resData.error || 'Format BBM tidak sah');
      }
    } catch (err: any) {
      console.warn('Fallback to local BBM template:', err);
      setBbmData({
        ...SAMPLE_BBM,
        tajuk: `BBM & Kad Imbasan: ${topic}`,
      });
      setErrorMessage(
        'Menjana dengan set bahan standard (Kunci API Gemini tidak dikesan pada sesi ini).'
      );
    } finally {
      setLoading(false);
    }
  };

  const currentCard = bbmData.flashcards[currentCardIndex] || bbmData.flashcards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % bbmData.flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + bbmData.flashcards.length) % bbmData.flashcards.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Bahan Bantu Mengajar (BBM) & Kad Imbasan</h1>
            <p className="text-sm text-slate-500">
              Kad imbasan digital interaktif, peta pemikiran i-Think, dan latihan pengukuhan PdP
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Lembaran BBM</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2 no-print">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Generator Form */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Mata Pelajaran</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            >
              {SUBJECT_LIST.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Tahap / Tingkatan</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            >
              {GRADE_LEVELS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Fokus Bahan</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            >
              <option value="Kad Imbasan & Peta Minda">Kad Imbasan & Peta Minda</option>
              <option value="Latihan Pengukuhan & Istilah">Latihan Pengukuhan & Istilah</option>
              <option value="Peta Pemikiran i-Think Khas">Peta Pemikiran i-Think</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Masukkan topik PdP (cth: Ciri Khas Perlindungan Haiwan)..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Menjana BBM...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Jana BBM Pintar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Flashcard & BBM Interactive Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Flashcard Player (Left 6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Kad Imbasan PdP ({currentCardIndex + 1} / {bbmData.flashcards.length})
              </span>
              <span className="text-xs text-slate-400">Klik kad untuk putar (flip)</span>
            </div>

            {/* Interactive Flip Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer perspective-1000 my-4"
            >
              <div
                className={`relative w-full h-64 rounded-2xl p-6 transition-all duration-500 flex flex-col items-center justify-center text-center shadow-md select-none ${
                  isFlipped
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-emerald-500/20'
                    : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-slate-900/20'
                }`}
              >
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-xs rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <RotateCw className="w-3 h-3" />
                    {isFlipped ? 'Jawapan / Definisi' : 'Soalan / Istilah'}
                  </span>
                </div>

                {!isFlipped ? (
                  <div className="space-y-3 px-4">
                    <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">Konsep / Soalan</span>
                    <h3 className="text-xl font-bold leading-snug">
                      {currentCard?.istilahAtauSoalan}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2">
                      (Klik untuk melihat huraian & contoh)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 px-4">
                    <span className="text-emerald-200 text-xs font-semibold tracking-wider uppercase">Penerangan Lengkap</span>
                    <p className="text-base font-medium leading-relaxed">
                      {currentCard?.definisiAtauJawapan}
                    </p>
                    {currentCard?.contohAtauPetunjuk && (
                      <div className="mt-3 p-2 bg-black/20 rounded-lg text-xs text-emerald-100 inline-block">
                        💡 {currentCard.contohAtauPetunjuk}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 no-print">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex gap-1.5">
              {bbmData.flashcards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentCardIndex === i ? 'bg-emerald-600 w-6' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextCard}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Seterusnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Peta Pemikiran i-Think (Right 6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <GitFork className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Peta Pemikiran ({bbmData.petaMindaITHINK?.jenisPeta || 'Peta Pokok'})
                </h3>
                <p className="text-xs text-slate-500">Visualisasi konsep untuk murid abad ke-21 (PAK-21)</p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              i-Think KPM
            </span>
          </div>

          {/* Root node */}
          <div className="p-3 bg-slate-900 text-white text-center rounded-xl font-bold text-sm shadow-xs">
            {bbmData.petaMindaITHINK?.fokusUtama}
          </div>

          {/* Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {bbmData.petaMindaITHINK?.cabang?.map((branch, bIdx) => (
              <div key={bIdx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-bold text-xs text-emerald-800 border-b border-slate-200 pb-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>{branch.label}</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 pl-1">
                  {branch.butiran.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1">
                      <span className="text-slate-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Interactive Fill In The Blanks Exercise */}
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Latihan Pengukuhan Interaktif (Isi Tempat Kosong)</span>
              <span className="text-[10px] text-slate-400 lowercase">aktiviti kendiri</span>
            </h4>

            <div className="space-y-2.5">
              {bbmData.latihanIsiTempatKosong?.map((ex, exIdx) => {
                const userAns = fillAnswers[exIdx] || '';
                const isCorrect = userAns.trim().toLowerCase() === ex.kataKunci.trim().toLowerCase();

                return (
                  <div key={exIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {exIdx + 1}. {ex.ayat.replace('_____', `[ ${userAns || '_______'} ]`)}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-500 font-semibold mr-1">Pilihan kata:</span>
                      {ex.pilihanKata.map((word, wIdx) => (
                        <button
                          key={wIdx}
                          type="button"
                          onClick={() => {
                            setFillAnswers({ ...fillAnswers, [exIdx]: word });
                          }}
                          className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                            userAns === word
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {word}
                        </button>
                      ))}

                      {fillChecked && (
                        <span className="ml-2 font-bold flex items-center gap-1 text-[11px]">
                          {isCorrect ? (
                            <span className="text-emerald-700 flex items-center gap-0.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600" /> Betul
                            </span>
                          ) : (
                            <span className="text-red-600">Jawapan: {ex.kataKunci}</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 no-print">
              <button
                onClick={() => setFillChecked(!fillChecked)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                {fillChecked ? 'Sembunyi Semakan' : 'Semak Jawapan Latihan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
