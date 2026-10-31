import React, { useState } from 'react';
import { QuizData, QuizQuestion } from '../types';
import { SAMPLE_QUIZ, SUBJECT_LIST, GRADE_LEVELS } from '../data/dskpSamples';
import { 
  CheckSquare, 
  Sparkles, 
  Printer, 
  RotateCcw, 
  Award, 
  FileText, 
  PlayCircle, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export const QuizGenerator: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizData>(SAMPLE_QUIZ);
  const [activeMode, setActiveMode] = useState<'teacher' | 'interactive'>('teacher');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [subject, setSubject] = useState('Sains');
  const [grade, setGrade] = useState('Tahun 5 (KSSR Semakan)');
  const [topic, setTopic] = useState('Kemandirian Spesies Haiwan & Tumbuhan');
  const [questionType, setQuestionType] = useState('Campuran (Objektif & KBAT)');
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState('Sederhana');
  const [kbatRatio, setKbatRatio] = useState('40% KBAT');

  // Interactive Student State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSelectedAnswers({});
    setSubmittedQuiz(false);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          grade,
          topic,
          questionType,
          count,
          difficulty,
          kbatRatio,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ralat pelayan: ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        setQuiz(resData.data);
      } else {
        throw new Error(resData.error || 'Format kuiz tidak sah');
      }
    } catch (err: any) {
      console.warn('Fallback to local quiz template:', err);
      // Fallback
      setQuiz({
        tajukKuiz: `Kuiz Pengukuhan ${subject}: ${topic}`,
        arahan: 'Jawab semua soalan mengikut format penilaian standard KPM.',
        soalan: SAMPLE_QUIZ.soalan.map((q, i) => ({
          ...q,
          nombor: i + 1,
        })),
      });
      setErrorMessage(
        'Menjana dengan mod set soalan standard (Kunci API Gemini tidak dikesan pada sesi ini).'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  // Calculate score for objective questions
  const objectiveQuestions = quiz.soalan.filter((q) => q.pilihan && q.pilihan.length > 0);
  const correctCount = objectiveQuestions.filter((q, idx) => {
    const chosen = selectedAnswers[idx];
    if (!chosen) return false;
    // Check if chosen starts with same letter as jawapanBetul
    return (
      chosen.trim().toLowerCase().startsWith(q.jawapanBetul.trim().toLowerCase().slice(0, 2)) ||
      chosen.trim().toLowerCase() === q.jawapanBetul.trim().toLowerCase()
    );
  }).length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <CheckSquare className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Penjana Kuiz & Soalan UASA / SPM</h1>
              <p className="text-sm text-slate-500">
                Bina soalan objektif & KBAT dengan skema pemarkahan taksonomi Bloom
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveMode('teacher')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'teacher'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Kertas Guru & Skema</span>
          </button>

          <button
            onClick={() => setActiveMode('interactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'interactive'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Mod Murid Interaktif</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2 no-print">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Generator Controls (Teacher config) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
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
            <label className="font-semibold text-slate-700 block mb-1">Format Soalan</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            >
              <option value="Campuran (Objektif & KBAT)">Campuran (Objektif & KBAT)</option>
              <option value="Aneka Pilihan Sahaja (Objektif)">Aneka Pilihan Sahaja (Objektif)</option>
              <option value="Struktur & Respons Terbuka (KBAT)">Struktur & KBAT Terbuka</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Aras & Nisbah KBAT</label>
            <select
              value={kbatRatio}
              onChange={(e) => setKbatRatio(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            >
              <option value="20% KBAT">20% KBAT (Aras Asas)</option>
              <option value="40% KBAT">40% KBAT (Piawaian UASA)</option>
              <option value="60% KBAT">60% KBAT (Aras Tinggi SPM)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="w-full sm:w-2/3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Masukkan topik atau sub-topik (cth: Kemandirian Spesies Haiwan)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="w-full sm:w-1/3 flex items-center gap-2">
            <button
              onClick={handleGenerateQuiz}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Menggubal Soalan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Jana Set Soalan AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Teacher Paper vs Interactive Student Runner */}
      {activeMode === 'teacher' ? (
        /* Teacher Mode View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 no-print">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{quiz.tajukKuiz}</h2>
              <p className="text-xs text-slate-500">{quiz.arahan}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Kertas Soalan</span>
              </button>
            </div>
          </div>

          {/* Printable Exam Paper Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
              PENTAKSIRAN BILIK DARJAH / UJIAN AKHIR SESI AKADEMIK (UASA)
            </div>
            <h3 className="text-base font-black text-slate-900 mt-1 uppercase">{quiz.tajukKuiz}</h3>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mt-2">
              <span>Mata Pelajaran: <strong>{subject}</strong></span>
              <span>•</span>
              <span>Tahun / Tingkatan: <strong>{grade}</strong></span>
              <span>•</span>
              <span>Jumlah Soalan: <strong>{quiz.soalan.length}</strong></span>
            </div>
          </div>

          {/* Student Fill Info for printed paper */}
          <div className="grid grid-cols-2 gap-4 text-xs border border-slate-200 p-3 rounded-lg bg-slate-50">
            <div>Nama Murid: _____________________________________________</div>
            <div>Kelas / Tingkatan: _______________________</div>
          </div>

          {/* Questions List */}
          <div className="space-y-6 text-sm">
            {quiz.soalan.map((item, index) => (
              <div key={index} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.nombor || index + 1}
                    </span>
                    <div>
                      {item.petikanAtauRangsangan && (
                        <div className="mb-2 p-2.5 bg-slate-50 border-l-4 border-emerald-600 text-xs text-slate-700 rounded-r">
                          <strong>Stimulus / Petikan:</strong> {item.petikanAtauRangsangan}
                        </div>
                      )}
                      <p className="font-semibold text-slate-900 leading-relaxed">
                        {item.teksSoalan}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {item.arasTaksonomi}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      [{item.markah} Markah]
                    </span>
                  </div>
                </div>

                {/* Multiple choice options */}
                {item.pilihan && item.pilihan.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8 pt-1 text-xs">
                    {item.pilihan.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-800 font-medium"
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                )}

                {/* Teacher Marking Scheme (Collapsible / Print visible) */}
                <div className="mt-3 pt-3 border-t border-slate-100 bg-emerald-50/50 p-3 rounded-lg text-xs text-slate-800 space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Skema Jawapan & Kata Kunci:</span>
                  </div>
                  <p className="text-slate-800">
                    <strong>Jawapan:</strong> {item.jawapanBetul}
                  </p>
                  <p className="text-slate-600">
                    <strong>Huraian Pemarkahan:</strong> {item.skemaJawapan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Interactive Student Mode View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Mod Murid Interaktif
              </span>
              <h2 className="text-xl font-bold text-slate-900">{quiz.tajukKuiz}</h2>
            </div>

            {submittedQuiz && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <Award className="w-8 h-8 text-emerald-600" />
                <div>
                  <div className="text-xs text-emerald-800 font-medium">Skor Soalan Objektif:</div>
                  <div className="text-lg font-black text-emerald-700">
                    {correctCount} / {objectiveQuestions.length} ({Math.round((correctCount / (objectiveQuestions.length || 1)) * 100)}%)
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {quiz.soalan.map((q, idx) => {
              const chosen = selectedAnswers[idx];
              const isObj = q.pilihan && q.pilihan.length > 0;
              const isCorrect =
                chosen &&
                (chosen.trim().toLowerCase().startsWith(q.jawapanBetul.trim().toLowerCase().slice(0, 2)) ||
                  chosen.trim().toLowerCase() === q.jawapanBetul.trim().toLowerCase());

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    submittedQuiz
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-red-300 bg-red-50/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {q.nombor || idx + 1}
                    </span>
                    <div className="w-full">
                      {q.petikanAtauRangsangan && (
                        <div className="mb-2 p-2 bg-slate-100 text-xs text-slate-700 rounded border-l-4 border-slate-400">
                          {q.petikanAtauRangsangan}
                        </div>
                      )}
                      <p className="font-semibold text-slate-900 text-sm leading-relaxed mb-3">
                        {q.teksSoalan}
                      </p>

                      {/* Options */}
                      {isObj ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.pilihan!.map((opt, oIdx) => {
                            const isThisSelected = chosen === opt;
                            let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                            if (submittedQuiz) {
                              const isThisCorrect =
                                opt.trim().toLowerCase().startsWith(q.jawapanBetul.trim().toLowerCase().slice(0, 2));
                              if (isThisCorrect) {
                                btnStyle = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold';
                              } else if (isThisSelected && !isThisCorrect) {
                                btnStyle = 'border-red-500 bg-red-100 text-red-900';
                              }
                            } else if (isThisSelected) {
                              btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-500/20';
                            }

                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => handleAnswerSelect(idx, opt)}
                                disabled={submittedQuiz}
                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {submittedQuiz && isThisSelected && (
                                  isCorrect ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        /* Open ended / KBAT answer space */
                        <div className="space-y-2">
                          <textarea
                            rows={3}
                            placeholder="Tulis jawapan murid di sini..."
                            disabled={submittedQuiz}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                      )}

                      {/* Result explanation on submit */}
                      {submittedQuiz && (
                        <div className="mt-3 p-3 rounded-xl bg-slate-100 text-xs text-slate-800 space-y-1">
                          <div className="font-bold flex items-center gap-1.5">
                            <span className="text-emerald-700">Skema & Ulasan Guru:</span>
                          </div>
                          <p><strong>Jawapan Tepat:</strong> {q.jawapanBetul}</p>
                          <p className="text-slate-600">{q.skemaJawapan}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit or Reset button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              {Object.keys(selectedAnswers).length} daripada {quiz.soalan.length} soalan dijawab
            </div>

            <div>
              {!submittedQuiz ? (
                <button
                  onClick={() => setSubmittedQuiz(true)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Hantar Jawapan & Semak Skor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setSubmittedQuiz(false);
                  }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Cuba Jawab Semula</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
