import React, { useEffect } from 'react';
import { DetectiveProfile } from '../../types/game';
import { soundManager } from '../../utils/audio';
import { StationArtwork } from '../DetectiveArtwork';
import { GAME_IMAGES, handleImageError } from '../../assets/images';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  RotateCcw, 
  Share2,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

interface Station6SijilProps {
  profile: DetectiveProfile;
  onRestart: () => void;
}

export const Station6Sijil: React.FC<Station6SijilProps> = ({ profile, onRestart }) => {
  useEffect(() => {
    soundManager.playCorrect();
    // Celebrate with double confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const todayDate = new Date().toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="no-print">
        <StationArtwork type="badge" />
      </div>

      {/* Top action bar (no print) */}
      <div className="bg-white p-5 rounded-3xl border-4 border-amber-400 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
            🏆
          </div>
          <div>
            <h2 className="font-heading text-xl font-black text-slate-900">
              Tahniah, Misi Penyiasatan Selesai!
            </h2>
            <p className="text-xs text-slate-500">
              Kamu telah berjaya menyelesaikan semua stesen penyiasatan DEBACA 4.0.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-heading font-black text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sijil Rasmi</span>
          </button>

          <button
            onClick={onRestart}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-heading font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Misi Baharu</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Paper View */}
      <div
        id="official-certificate-sheet"
        className="relative bg-gradient-to-b from-amber-50 via-white to-amber-50 p-8 sm:p-14 rounded-3xl border-8 border-double border-amber-500 shadow-2xl text-center space-y-6 overflow-hidden"
      >
        {/* Decorative corner ornaments */}
        <div className="absolute top-3 left-3 text-2xl text-amber-500 select-none">❖</div>
        <div className="absolute top-3 right-3 text-2xl text-amber-500 select-none">❖</div>
        <div className="absolute bottom-3 left-3 text-2xl text-amber-500 select-none">❖</div>
        <div className="absolute bottom-3 right-3 text-2xl text-amber-500 select-none">❖</div>

        {/* Certificate Header */}
        <div className="space-y-2 border-b-2 border-amber-400/60 pb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-500/10 border border-amber-400/40 rounded-full text-amber-900 font-bold text-xs uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <span>KEMENTERIAN PENDIDIKAN MALAYSIA • INOVASI DEBACA 4.0</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-5xl font-black text-amber-950 tracking-tight">
            SIJIL PENCAPAIAN DETEKTIF CILIK
          </h1>
          <p className="font-heading text-sm sm:text-base font-bold text-amber-800 tracking-wide">
            ANUGERAH LENCANA EMAS MASTER BAHASA MELAYU TAHUN 4
          </p>
        </div>

        {/* Certificate Body Text */}
        <div className="space-y-4 max-w-2xl mx-auto py-2">
          <p className="text-xs sm:text-sm text-slate-600 italic">
            Dengan ini diperakui bahawa Detektif Cilik yang berwibawa:
          </p>

          <div className="text-2xl sm:text-4xl font-heading font-black text-slate-900 border-b-4 border-dashed border-amber-400 pb-2 inline-block px-6">
            {profile.nama || 'Muhammad Adam bin Daniel'}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            dari kelas <strong className="text-amber-900">{profile.kelas || 'Tahun 4'}</strong>,{' '}
            <strong className="text-amber-900">{profile.sekolah || 'SK Seri Bintang'}</strong>
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            telah berjaya menyiasat semua fail kes, membongkar rahsia manuskrip, menguasai tatabahasa, 
            dan membuktikan kelancaran membaca selaras dengan Standard Kurikulum DSKP Bahasa Melayu Tahun 4.
          </p>
        </div>

        {/* Badges & Score Display */}
        <div className="bg-amber-100/60 p-4 sm:p-6 rounded-2xl border-2 border-amber-300 max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-1 text-amber-500 text-lg">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-amber-950">
            <div className="p-2 bg-white rounded-xl border border-amber-200">
              <span className="block text-xl">📜</span>
              <span>Detektif Pemula</span>
            </div>
            <div className="p-2 bg-white rounded-xl border border-amber-200">
              <span className="block text-xl">⚗️</span>
              <span>Detektif Bijak</span>
            </div>
            <div className="p-2 bg-white rounded-xl border border-amber-200">
              <span className="block text-xl">⏰</span>
              <span>Detektif Master</span>
            </div>
            <div className="p-2 bg-white rounded-xl border border-amber-200">
              <span className="block text-xl">🎙️</span>
              <span>Vokal Emas</span>
            </div>
          </div>

          <div className="text-xs font-black text-amber-900 pt-1">
            ⭐ Jumlah Mata Pencapaian: <span className="text-base font-black text-emerald-700">{profile.skor}</span> / 150 Mata
          </div>
        </div>

        {/* Recorded Voice Playback on Certificate if present */}
        {profile.rakamanSuaraUrl && (
          <div className="max-w-md mx-auto p-3 bg-white rounded-2xl border border-amber-300 text-xs no-print">
            <span className="font-bold text-slate-700 block mb-1">
              🎙️ Rakaman Suara Bacaan Murid:
            </span>
            <audio controls src={profile.rakamanSuaraUrl} className="w-full h-10" />
          </div>
        )}

        {/* Signatures & Seal */}
        <div className="pt-8 border-t-2 border-amber-300/80 grid grid-cols-2 sm:grid-cols-3 items-end gap-6 text-xs text-slate-700">
          <div>
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
              {todayDate}
            </div>
            <div className="text-[11px] text-slate-500">Tarikh Penganugerahan</div>
          </div>

          {/* Golden Seal Stamp with Realistic 3D Medal Image */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl shadow-yellow-500/50 transform hover:scale-110 transition-transform">
              <img
                src={GAME_IMAGES.goldenMasterBadge}
                alt="Cap Mohor Emas Rasmi"
                loading="eager"
                onError={(e) => handleImageError(e, '/images/golden_master_badge.jpg')}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] text-amber-800 font-black mt-1 uppercase tracking-wider">Cap Mohor Emas Rasmi</span>
          </div>

          <div>
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
              Guru Penyelaras Inovasi
            </div>
            <div className="text-[11px] text-slate-500">Panitia Bahasa Melayu</div>
          </div>
        </div>
      </div>
    </div>
  );
};
