import React, { useState } from 'react';
import { StudioAppResponse } from '../types';
import { 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  Play, 
  Copy, 
  Check, 
  Terminal, 
  Cpu, 
  ArrowRight, 
  Lightbulb,
  Layers,
  Wand2
} from 'lucide-react';

interface StudioSandboxProps {
  initialPrompt?: string;
}

export const StudioSandbox: React.FC<StudioSandboxProps> = ({ initialPrompt = '' }) => {
  const [promptText, setPromptText] = useState(
    initialPrompt ||
      'Bina aplikasi interaktif penjana aktiviti PdP PAK-21 dan latihan soalan formatif pantas untuk bilik darjah sekolah rendah.'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StudioAppResponse | null>({
    tajukAplikasi: 'Modul Interaktif PdP Pintar Abad Ke-21 (KPM)',
    ringkasanKonsep:
      'Aplikasi sokongan guru untuk menjana soalan pantas, mencetus perbincangan murid mengikut kaedah PAK-21, dan menyediakan ringkasan objektif dalam satu paparan.',
    fiturUtama: [
      'Penjana Soalan Spontan Berdasarkan Aras Taksonomi Bloom',
      'Pemilih Kaedah PAK-21 (Think-Pair-Share, Round Robin, Gallery Walk)',
      'Pengukur Masa Aktiviti (Timer PdP Interaktif)',
      'Refleksi Segera & Tiket Keluar (Exit Ticket)'
    ],
    kandunganInteraktif: {
      arahan: 'Gunakan modul di bawah untuk mengaktifkan sesi pembelajaran murid:',
      modul: [
        {
          namaModul: '1. Pemilih Kaedah PAK-21 Spontan',
          penerangan: 'Pilih kaedah aktiviti kumpulan yang bersesuaian dengan peruntukan masa.',
          elemenInteraktif: 'Aktiviti Disyorkan: Think-Pair-Share (3 minit fikir individu, 5 minit bincang berpasangan).',
          dataSampel: ['Think-Pair-Share', 'Hot Seat', 'Gallery Walk', 'Round Table']
        },
        {
          namaModul: '2. Pencetus KBAT (Soalan Aras Tinggi)',
          penerangan: 'Kemukakan soalan untuk menguji penaakulan murid.',
          elemenInteraktif: 'Soalan: "Jika situasi ini berlaku sebaliknya, apakah alternatif penyelesaian yang terbaik?"',
          dataSampel: ['Mengapa perkara ini penting?', 'Bagaimanakah kita boleh membuktikannya?', 'Apakah alternatif lain?']
        }
      ]
    },
    panduanPenggunaan:
      'Pilih mana-mana modul interaktif di atas semasa fasa perkembangan PdP untuk meningkatkan penglibatan aktif murid.',
    cadanganLangkahSeterusnya: [
      'Gabungkan hasil dapatan aktiviti ini ke dalam Rekod Transit PBD',
      'Cetak lembaran rumusan untuk fail RPH guru'
    ]
  });

  // Interactive Mini-App Runner inside Sandbox
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins
  const [timerRunning, setTimerRunning] = useState(false);
  const [activePak21Index, setActivePak21Index] = useState(0);

  const handleProcessRequest = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/process-studio-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPromptText: promptText,
          appletContext: 'AI Studio app 77509bc8-47b1-4da4-83c4-e36670aff717',
        }),
      });

      if (!response.ok) {
        throw new Error(`Ralat pelayan: ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        setResult(resData.data);
      }
    } catch (err: any) {
      console.warn('Fallback sandbox response:', err);
      // Fallback
      setResult({
        tajukAplikasi: `Aplikasi PdP Pintar: ${promptText.slice(0, 40)}...`,
        ringkasanKonsep: 'Aplikasi disesuaikan untuk menyokong proses PdP bilik darjah dan aktiviti murid.',
        fiturUtama: ['Aktiviti Pengukuhan Pintar', 'Kuiz Format Interaktif', 'Jejak Prestasi PBD'],
        kandunganInteraktif: {
          arahan: 'Modul pembelajaran aktif untuk bilik darjah:',
          modul: [
            {
              namaModul: 'Modul Utama',
              penerangan: 'Aktiviti penglibatan murid berasaskan arahan yang dimasukkan.',
              elemenInteraktif: 'Latihan kendiri dan semakan kendiri berpandukan rubrik.',
              dataSampel: ['Langkah 1: Terokai Konsep', 'Langkah 2: Aplikasi Kumpulan', 'Langkah 3: Rumusan']
            }
          ]
        },
        panduanPenggunaan: 'Gunakan bersama modul RPH dan PBD dalam sistem ini.',
        cadanganLangkahSeterusnya: ['Eksport ke fail rekod', 'Kongsi pautan bersama murid']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (presetPrompt: string) => {
    setPromptText(presetPrompt);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Sliders className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Studio Aplikasi & Penjana Modul AI Khas</h1>
            <p className="text-sm text-slate-500">
              Suaikan arahan khusus atau tampal prompt dari sesi AI Studio (77509bc8-47b1-4da4-83c4-e36670aff717)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200 font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>Enjin AI Studio KPM</span>
          </span>
        </div>
      </div>

      {/* Prompt Customizer Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 no-print">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-indigo-600" />
            Tampal Prompt / Spesifikasi Dari AI Studio
          </label>
          <span className="text-xs text-slate-400">Menyokong Bahasa Melayu & English</span>
        </div>

        <textarea
          rows={3}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Tampal prompt asal atau arahan aplikasi yang anda mahukan di sini..."
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
        />

        {/* Quick Inspiration Presets */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
            Cadangan Modul & Prompt Pantas Guru:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() =>
                handleApplyPreset(
                  'Bina aktiviti pemikiran KBAT dan soalan pencetus minda untuk Sains Sekolah Rendah (Fasa Set Induksi).'
                )
              }
              className="p-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg border border-slate-200 text-left transition-colors cursor-pointer truncate"
            >
              💡 Pencetus Minda KBAT
            </button>
            <button
              type="button"
              onClick={() =>
                handleApplyPreset(
                  'Bina modul permainan kosa kata dan bina ayat untuk Bahasa Melayu Tahun 4 mengikut kaedah PAK-21.'
                )
              }
              className="p-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg border border-slate-200 text-left transition-colors cursor-pointer truncate"
            >
              🎮 Permainan Kosa Kata PAK-21
            </button>
            <button
              type="button"
              onClick={() =>
                handleApplyPreset(
                  'Bina rubrik penilaian pembentangan kumpulan dan senarai semak Pentaksiran Bilik Darjah (PBD).'
                )
              }
              className="p-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg border border-slate-200 text-left transition-colors cursor-pointer truncate"
            >
              📋 Rubrik Penilaian PBD
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleProcessRequest}
            disabled={loading || !promptText.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Memproses Permintaan Studio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Jana / Suai Aplikasi Mini</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Mini-App Output */}
      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Layers className="w-4 h-4" />
              Hasil Pembinaan Aplikasi Pintar
            </span>
            <h2 className="text-xl font-bold text-slate-900">{result.tajukAplikasi}</h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{result.ringkasanKonsep}</p>
          </div>

          {/* Features pills */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ciri-Ciri Utama:</h3>
            <div className="flex flex-wrap gap-2">
              {result.fiturUtama.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg text-xs font-medium flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{feat}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Live Interactive Widget Showcase */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm">Widget Interaktif Masa Nyata PdP</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Preview
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Interactive Timer Widget */}
              <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 space-y-3">
                <span className="font-bold text-indigo-200 block">⏱️ Pemasa Aktiviti PAK-21</span>
                <div className="text-3xl font-mono font-black text-center py-2 text-amber-300 tracking-wider">
                  {Math.floor(timerSeconds / 60)
                    .toString()
                    .padStart(2, '0')}
                  :{(timerSeconds % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      if (!timerRunning) {
                        setTimerRunning(true);
                        const interval = setInterval(() => {
                          setTimerSeconds((prev) => {
                            if (prev <= 1) {
                              clearInterval(interval);
                              setTimerRunning(false);
                              return 0;
                            }
                            return prev - 1;
                          });
                        }, 1000);
                      }
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer transition-colors"
                  >
                    Mula
                  </button>
                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSeconds(300);
                    }}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium cursor-pointer transition-colors"
                  >
                    Reset (5 Minit)
                  </button>
                </div>
              </div>

              {/* PAK-21 Strategy Switcher Widget */}
              <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 space-y-2">
                <span className="font-bold text-indigo-200 block">🎯 Strategi Aktiviti Semasa</span>
                <p className="text-sm font-semibold text-white">
                  {result.kandunganInteraktif.modul[activePak21Index]?.namaModul ||
                    'Think-Pair-Share (Fikir-Pasang-Kongsi)'}
                </p>
                <p className="text-slate-300 text-xs">
                  {result.kandunganInteraktif.modul[activePak21Index]?.penerangan ||
                    'Murid berfikir secara individu selama 2 minit, kemudian berbincang dengan pasangan.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() =>
                      setActivePak21Index(
                        (prev) => (prev + 1) % (result.kandunganInteraktif.modul.length || 1)
                      )
                    }
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs cursor-pointer transition-colors"
                  >
                    Tukar Modul Seterusnya
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Module details breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {result.kandunganInteraktif.arahan}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.kandunganInteraktif.modul.map((mod, mIdx) => (
                <div key={mIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">{mod.namaModul}</h4>
                  <p className="text-slate-600">{mod.penerangan}</p>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-800 font-medium">
                    {mod.elemenInteraktif}
                  </div>
                  {mod.dataSampel && mod.dataSampel.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[11px] font-semibold text-slate-500 block mb-1">Contoh Bahan:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                        {mod.dataSampel.map((sample, sIdx) => (
                          <li key={sIdx}>{sample}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-bold block">💡 Cadangan Pelaksanaan di Sekolah:</span>
            <ul className="list-disc pl-4 space-y-0.5 text-emerald-800">
              {result.cadanganLangkahSeterusnya.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
