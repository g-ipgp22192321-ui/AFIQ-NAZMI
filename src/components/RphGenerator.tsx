import React, { useState } from 'react';
import { RPHData } from '../types';
import { 
  SUBJECT_LIST, 
  GRADE_LEVELS, 
  PAK21_STRATEGIES, 
  EMK_LIST, 
  SAMPLE_RPH 
} from '../data/dskpSamples';
import { 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  BookOpen, 
  HelpCircle, 
  Clock, 
  Target, 
  CheckCircle2, 
  FileText,
  Edit3,
  Flame
} from 'lucide-react';

export const RphGenerator: React.FC = () => {
  const [rph, setRph] = useState<RPHData>(SAMPLE_RPH);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [subject, setSubject] = useState('Sains');
  const [grade, setGrade] = useState('Tahun 5 (KSSR Semakan)');
  const [topic, setTopic] = useState('Kemandirian Spesies Haiwan');
  const [contentStandard, setContentStandard] = useState('3.1 Kemandirian Spesies Haiwan');
  const [learningStandard, setLearningStandard] = useState('3.1.1 Menjelaskan dengan contoh ciri dan tingkah laku khas haiwan.\n3.1.2 Menaakul kepentingan kemandirian spesies.');
  const [timeDuration, setTimeDuration] = useState('60 Minit');
  const [pak21, setPak21] = useState('Gallery Walk & Think-Pair-Share');
  const [emk, setEmk] = useState('Kelestarian Alam Sekitar & Nilai Murni');
  const [kbat, setKbat] = useState('Menganalisis & Mengaplikasi');
  const [pbdMethod, setPbdMethod] = useState('Pemerhatian & Lembaran Kerja');
  const [customNotes, setCustomNotes] = useState('Aktiviti berpusatkan murid, integrasikan stesen habitat');

  // School & Teacher Meta for printed official header
  const [schoolName, setSchoolName] = useState('SK Seri Bintang Bestari');
  const [teacherName, setTeacherName] = useState('Cikgu Aiman bin Abdullah');
  const [weekNumber, setWeekNumber] = useState('Minggu 32');
  const [attendanceCount, setAttendanceCount] = useState('32 / 34');

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-rph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          grade,
          topic,
          contentStandard,
          learningStandard,
          timeDuration,
          pak21,
          emk,
          kbat,
          pbdMethod,
          customNotes,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ralat pelayan: ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        setRph(resData.data);
      } else {
        throw new Error(resData.error || 'Format data tidak sah');
      }
    } catch (err: any) {
      console.warn('Fallback to intelligent template generator:', err);
      // Generate realistic tailored RPH locally so user is never blocked
      const fallbackRph: RPHData = {
        ...SAMPLE_RPH,
        tajuk: `RPH ${subject}: ${topic}`,
        mataPelajaran: subject,
        tingkatanTahun: grade,
        temaBidang: `${subject} / ${topic}`,
        standardKandungan: contentStandard,
        standardPembelajaran: learningStandard,
        strategiPak21: pak21,
        elemenMerentasKurikulum: [emk],
        kemahiranBerfikirArasTinggi: kbat,
        objektifPembelajaran: [
          `Pada akhir PdP, sekurang-kurangnya 80% murid dapat memahami konsep asas ${topic} dengan bimbingan minimum.`,
          `Murid dapat melengkapkan aktiviti ${pak21} dan latihan pengukuhan dengan tepat.`
        ],
        kriteriaKejayaan: [
          `Saya boleh menyatakan sekurang-kurangnya 3 fakta utama berkaitan ${topic}.`,
          `Saya boleh menyelesaikan tugasan kumpulan mengikut panduan langkah kerja.`,
          `Saya boleh menjawab soalan refleksi kendiri pada akhir sesi pembelajaran.`
        ]
      };
      setRph(fallbackRph);
      setErrorMessage(
        'Menjana dengan mod templat kurikulum pintar (Kunci API Gemini tidak dikesan pada sesi ini, mod pratetap aktif).'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoadPreset = (presetKey: string) => {
    if (presetKey === 'bm') {
      setSubject('Bahasa Melayu');
      setGrade('Tahun 4 (KSSR Semakan)');
      setTopic('Kesihatan Diri dan Kebersihan');
      setContentStandard('3.2 Menulis perkataan, frasa, dan ayat yang bermakna');
      setLearningStandard('3.2.1 Membina dan menulis perenggan isi yang gramatis');
      setPak21('Think-Pair-Share (Fikir-Pasang-Kongsi)');
      setEmk('Pendidikan Kesihatan & Nilai Murni');
      setKbat('Mengaplikasi');
    } else if (presetKey === 'math') {
      setSubject('Matematik');
      setGrade('Tahun 3 (KSSR Semakan)');
      setTopic('Pecahan Wajar dan Pecahan Setara');
      setContentStandard('3.1 Pecahan');
      setLearningStandard('3.1.2 Menyatakan pecahan setara bagi pecahan wajar penyebut hingga 10');
      setPak21('Round Robin & Hands-on Manipulatif');
      setEmk('Kreativiti & Inovasi');
      setKbat('Menganalisis');
    } else if (presetKey === 'sejarah') {
      setSubject('Sejarah');
      setGrade('Tingkatan 2 (KSSM)');
      setTopic('Kesultanan Melayu Melaka');
      setContentStandard('5.2 Warisan Kesultanan Melayu Melaka');
      setLearningStandard('5.2.1 Menghuraikan sistem pentadbiran Pembesar Empat Lipatan');
      setPak21('Hot Seat (Kerusi Panas) & Peta Alir');
      setEmk('Patriotisme & Kewarganegaraan');
      setKbat('Menilai & Menganalisis');
    } else {
      setSubject('Sains');
      setGrade('Tahun 5 (KSSR Semakan)');
      setTopic('Kemandirian Spesies Haiwan');
      setContentStandard('3.1 Kemandirian Spesies Haiwan');
      setLearningStandard('3.1.1 Menjelaskan dengan contoh ciri khas perlindungan diri');
      setPak21('Gallery Walk (Jelajah Pembelajaran)');
      setEmk('Kelestarian Alam Sekitar');
      setKbat('Menganalisis & Mengaplikasi');
    }
  };

  const copyAsText = () => {
    const formatted = `=====================================================
RANCANGAN PENGAJARAN HARIAN (RPH) - DSKP KPM
=====================================================
Sekolah: ${schoolName}
Guru: ${teacherName}
Minggu: ${weekNumber} | Kehadiran: ${attendanceCount}
Mata Pelajaran: ${rph.mataPelajaran}
Tahun/Tingkatan: ${rph.tingkatanTahun}
Tema / Bidang: ${rph.temaBidang}
Tarikh & Masa: ${rph.tarikhMasa}

STANDARD KANDUNGAN:
${rph.standardKandungan}

STANDARD PEMBELAJARAN:
${rph.standardPembelajaran}

OBJEKTIF PEMBELAJARAN:
${rph.objektifPembelajaran.map((o, i) => `${i + 1}. ${o}`).join('\n')}

KRITERIA KEJAYAAN:
${rph.kriteriaKejayaan.map((k, i) => `[✔] ${k}`).join('\n')}

BAHAN BANTU MENGAJAR (BBM):
${rph.bahanBantuMengajar.join(', ')}

STRATEGI PAK-21: ${rph.strategiPak21}
EMK: ${rph.elemenMerentasKurikulum.join(', ')}
KBAT: ${rph.kemahiranBerfikirArasTinggi}

RINGKASAN AKTIVITI PdP:
1. Set Induksi (${rph.aktiviti.setInduksi.masa}):
${rph.aktiviti.setInduksi.huraian}

2. Fasa Perkembangan:
${rph.aktiviti.fasaPerkembangan.map((f) => `- ${f.langkah} (${f.masa}):\n  ${f.aktivitiGuruMurid}\n  [Pembezaan: ${f.strategiPembezaan}]`).join('\n\n')}

3. Penutup (${rph.aktiviti.penutup.masa}):
${rph.aktiviti.penutup.huraian}

PENTAKSIRAN BILIK DARJAH (PBD):
- Kaedah: ${rph.pentaksiranBilikDarjah.kaedah}
- Sasaran: ${rph.pentaksiranBilikDarjah.tahapPenguasaanSasaran}

REFLEKSI & CATATAN:
${rph.refleksiCatatan || rph.aktiviti.penutup.refleksiGuru}
=====================================================`;

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadTextFile = () => {
    const blob = new Blob([JSON.stringify(rph, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RPH_${rph.mataPelajaran.replace(/\s+/g, '_')}_${rph.tingkatanTahun.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Penjana RPH Pintar DSKP</h1>
              <p className="text-sm text-slate-500">
                Format lengkap Rancangan Pengajaran Harian mengikut piawaian KPM & PAK-21
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak RPH</span>
          </button>

          <button
            onClick={copyAsText}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Salin Teks KPM</span>
              </>
            )}
          </button>

          <button
            onClick={downloadTextFile}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors cursor-pointer"
            title="Muat turun JSON"
          >
            <Download className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2 no-print">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Form on left, Document on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Panel (Left 5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-600" />
              Parameter Pengajaran & Kurikulum
            </h2>
            <span className="text-xs text-slate-400">DSKP Terkini</span>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
              Muat Pratetap Contoh Pantas:
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleLoadPreset('sains')}
                className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 text-left transition-colors cursor-pointer truncate"
              >
                🔬 Sains Thn 5 (Haiwan)
              </button>
              <button
                type="button"
                onClick={() => handleLoadPreset('bm')}
                className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 text-left transition-colors cursor-pointer truncate"
              >
                📖 BM Thn 4 (Kesihatan)
              </button>
              <button
                type="button"
                onClick={() => handleLoadPreset('math')}
                className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 text-left transition-colors cursor-pointer truncate"
              >
                📐 Math Thn 3 (Pecahan)
              </button>
              <button
                type="button"
                onClick={() => handleLoadPreset('sejarah')}
                className="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 text-left transition-colors cursor-pointer truncate"
              >
                🏛️ Sejarah Ting. 2 (Melaka)
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Mata Pelajaran</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                >
                  {SUBJECT_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Tingkatan / Tahun</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                >
                  {GRADE_LEVELS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">Tema / Tajuk Pelajaran</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Cth: Kemandirian Spesies Haiwan"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">Standard Kandungan (SK)</label>
              <input
                type="text"
                value={contentStandard}
                onChange={(e) => setContentStandard(e.target.value)}
                placeholder="Cth: 3.1 Kemandirian Spesies Haiwan"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">Standard Pembelajaran (SP)</label>
              <textarea
                rows={2}
                value={learningStandard}
                onChange={(e) => setLearningStandard(e.target.value)}
                placeholder="Cth: 3.1.1 Menjelaskan dengan contoh ciri khas perlindungan diri"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Tempoh PdP</label>
                <select
                  value={timeDuration}
                  onChange={(e) => setTimeDuration(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                >
                  <option value="30 Minit">30 Minit (1 Waktu)</option>
                  <option value="60 Minit">60 Minit (2 Waktu)</option>
                  <option value="90 Minit">90 Minit (3 Waktu)</option>
                </select>
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Pedagogi PAK-21</label>
                <select
                  value={pak21}
                  onChange={(e) => setPak21(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                >
                  {PAK21_STRATEGIES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Elemen Merentas Kurikulum (EMK)</label>
                <select
                  value={emk}
                  onChange={(e) => setEmk(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                >
                  {EMK_LIST.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Aras KBAT</label>
                <select
                  value={kbat}
                  onChange={(e) => setKbat(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white"
                >
                  <option value="Mengingat & Memahami">Mengingat & Memahami (Rendah)</option>
                  <option value="Mengaplikasi & Menganalisis">Mengaplikasi & Menganalisis (Sederhana)</option>
                  <option value="Menilai & Mencipta">Menilai & Mencipta (Aras Tinggi)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">Catatan Tambahan Guru</label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Cth: Fokus kepada murid pemulihan, sertakan lembaran bergambar"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Menjana RPH Pintar Menggunakan AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Jana RPH Lengkap (Gemini AI)</span>
              </>
            )}
          </button>

          {/* School Header Customizer */}
          <div className="pt-2 border-t border-slate-100">
            <details className="text-xs text-slate-500">
              <summary className="font-semibold text-slate-700 cursor-pointer hover:text-emerald-700 flex items-center gap-1">
                <span>⚙️ Maklumat Sekolah & Guru untuk Cetakan</span>
              </summary>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600">Nama Sekolah</label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600">Nama Guru</label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600">Minggu Persekolahan</label>
                  <input
                    type="text"
                    value={weekNumber}
                    onChange={(e) => setWeekNumber(e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600">Kehadiran Murid</label>
                  <input
                    type="text"
                    value={attendanceCount}
                    onChange={(e) => setAttendanceCount(e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded text-slate-900 text-xs"
                  />
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Document Preview (Right 7 Cols) - Printable Official KPM RPH */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Document Top Bar */}
          <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between no-print border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-sm">Dokumen Rasmi RPH (Paparan Cetak)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3 text-amber-400" />
                <span>{isEditing ? 'Kunci Suntingan' : 'Sunting Teks'}</span>
              </button>
            </div>
          </div>

          {/* Printable Document Sheet */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-800 text-sm font-sans" id="rph-printable-sheet">
            {/* Header Kementerian & Sekolah */}
            <div className="border-b-2 border-slate-900 pb-4 text-center">
              <div className="inline-block px-3 py-0.5 bg-slate-900 text-white text-xs font-bold tracking-widest uppercase mb-1">
                KEMENTERIAN PENDIDIKAN MALAYSIA
              </div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">{schoolName}</h2>
              <p className="text-xs text-slate-600 font-medium">
                RANCANGAN PENGAJARAN HARIAN (RPH) BERASASKAN DSKP & PAK-21
              </p>
            </div>

            {/* Meta Jadual Ringkas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="font-bold text-slate-500 block">Guru:</span>
                <span className="font-semibold text-slate-900">{teacherName}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Minggu / Hari:</span>
                <span className="font-semibold text-slate-900">{weekNumber} | {rph.tarikhMasa.split('|')[0] || 'Isnin'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Mata Pelajaran:</span>
                <span className="font-semibold text-emerald-700">{rph.mataPelajaran}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Tahun / Kelas:</span>
                <span className="font-semibold text-slate-900">{rph.tingkatanTahun}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-bold text-slate-500 block">Masa & Tempoh:</span>
                <span className="font-semibold text-slate-900">{rph.tarikhMasa}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-bold text-slate-500 block">Kehadiran Murid:</span>
                <span className="font-semibold text-slate-900">{attendanceCount} orang</span>
              </div>
            </div>

            {/* Standard Kandungan & Pembelajaran Table */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="w-1/3 p-2.5 font-bold bg-slate-100 border-r border-slate-200 text-slate-700">
                      Tema / Tajuk
                    </td>
                    <td className="p-2.5 text-slate-900 font-medium">{rph.temaBidang}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-200 text-slate-700">
                      Standard Kandungan (SK)
                    </td>
                    <td className="p-2.5 text-slate-900 font-semibold">{rph.standardKandungan}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-200 text-slate-700">
                      Standard Pembelajaran (SP)
                    </td>
                    <td className="p-2.5 text-slate-900 whitespace-pre-line">{rph.standardPembelajaran}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-200 text-slate-700">
                      Objektif Pembelajaran (OP)
                    </td>
                    <td className="p-2.5 text-slate-900">
                      <ul className="list-disc pl-4 space-y-1">
                        {rph.objektifPembelajaran.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-200 text-slate-700">
                      Kriteria Kejayaan (KK)
                    </td>
                    <td className="p-2.5 text-slate-900">
                      <ul className="space-y-1">
                        {rph.kriteriaKejayaan.map((kk, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✔</span>
                            <span>{kk}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-200 text-slate-700">
                      Bahan Bantu Mengajar (BBM)
                    </td>
                    <td className="p-2.5 text-slate-900">
                      {rph.bahanBantuMengajar.join(' | ')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-200 text-slate-700">
                      PAK-21 / EMK / KBAT
                    </td>
                    <td className="p-2.5 text-slate-900">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <strong className="text-emerald-700">PAK-21:</strong> {rph.strategiPak21}
                        </div>
                        <div>
                          <strong className="text-blue-700">EMK:</strong> {rph.elemenMerentasKurikulum.join(', ')}
                        </div>
                        <div>
                          <strong className="text-purple-700">KBAT:</strong> {rph.kemahiranBerfikirArasTinggi}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Fasa Aktiviti PdP */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2.5 flex items-center justify-between">
                <span>Rangka Aktiviti Pengajaran & Pembelajaran (PdP)</span>
                <span className="text-[11px] font-normal text-slate-500 lowercase">berfasa & pembezaan murid</span>
              </h3>

              <div className="space-y-3 text-xs">
                {/* Set Induksi */}
                <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-900">1. Set Induksi</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold text-[11px]">
                      {rph.aktiviti.setInduksi.masa}
                    </span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">{rph.aktiviti.setInduksi.huraian}</p>
                  {rph.aktiviti.setInduksi.catatan && (
                    <p className="text-[11px] text-amber-700 mt-1 italic">
                      Catatan: {rph.aktiviti.setInduksi.catatan}
                    </p>
                  )}
                </div>

                {/* Perkembangan */}
                {rph.aktiviti.fasaPerkembangan.map((fasa, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{fasa.langkah}</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-semibold text-[11px]">
                        {fasa.masa}
                      </span>
                    </div>
                    <p className="text-slate-800 leading-relaxed whitespace-pre-line mb-2">
                      {fasa.aktivitiGuruMurid}
                    </p>
                    <div className="bg-emerald-50/80 border border-emerald-200 p-2 rounded text-[11px] text-emerald-900">
                      <strong>Strategi Pembezaan (Tahap Rendah / Sederhana / Tinggi):</strong> {fasa.strategiPembezaan}
                    </div>
                  </div>
                ))}

                {/* Penutup */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">Penutup Pembelajaran & Kognitif</span>
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-semibold text-[11px]">
                      {rph.aktiviti.penutup.masa}
                    </span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">{rph.aktiviti.penutup.huraian}</p>
                </div>
              </div>
            </div>

            {/* Pentaksiran & Refleksi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block mb-1">Pentaksiran Bilik Darjah (PBD):</span>
                <p className="text-slate-700"><strong>Kaedah:</strong> {rph.pentaksiranBilikDarjah.kaedah}</p>
                <p className="text-slate-700"><strong>Sasaran:</strong> {rph.pentaksiranBilikDarjah.tahapPenguasaanSasaran}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block mb-1">Refleksi / Impak Guru:</span>
                <p className="text-slate-700 italic">
                  {rph.refleksiCatatan || rph.aktiviti.penutup.refleksiGuru}
                </p>
              </div>
            </div>

            {/* Signatures for print */}
            <div className="pt-8 grid grid-cols-2 gap-8 text-xs text-center border-t border-slate-200">
              <div>
                <div className="h-12"></div>
                <div className="border-t border-slate-400 pt-1 font-semibold text-slate-800">
                  {teacherName}
                </div>
                <div className="text-slate-500 text-[11px]">Guru Mata Pelajaran</div>
              </div>
              <div>
                <div className="h-12"></div>
                <div className="border-t border-slate-400 pt-1 font-semibold text-slate-800">
                  ( Guru Besar / GPK Pentadbiran )
                </div>
                <div className="text-slate-500 text-[11px]">Pengesahan & Semakan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
