import React from 'react';
import { GAME_IMAGES, handleImageError } from '../assets/images';

export const DetectiveIslandIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-48" }) => (
  <div className={`relative overflow-hidden rounded-2xl ${className}`}>
    <img
      src={GAME_IMAGES.adventureMap}
      alt="Peta Pengembaraan Detektif Cilik"
      loading="eager"
      onError={(e) => handleImageError(e, '/images/detective_adventure_map.jpg')}
      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
  </div>
);

export const StationArtwork: React.FC<{ type: 'library' | 'lab' | 'clock' | 'badge' | 'briefing' }> = ({ type }) => {
  if (type === 'library') {
    return (
      <div className="relative w-full h-52 sm:h-64 rounded-3xl overflow-hidden border-4 border-emerald-400 shadow-2xl">
        <img
          src={GAME_IMAGES.libraryMystery}
          alt="Misteri Perpustakaan Purba"
          loading="eager"
          onError={(e) => handleImageError(e, '/images/library_mystery_case.jpg')}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent flex items-center p-6 sm:p-8">
          <div className="max-w-md space-y-2 text-white">
            <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded-full shadow-md">
              🏛️ Stesen 03 • Arkib Perpustakaan
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-amber-300 drop-shadow-md">
              Misteri Perpustakaan Purba
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Siasat tapak kasut berlumpur di lantai kayu, cebisan kain biru gelap pada tingkap arkib, dan ensiklopedia halaman 42.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'lab') {
    return (
      <div className="relative w-full h-52 sm:h-64 rounded-3xl overflow-hidden border-4 border-cyan-400 shadow-2xl">
        <img
          src={GAME_IMAGES.scienceLab}
          alt="Misteri Makmal Sains"
          loading="eager"
          onError={(e) => handleImageError(e, '/images/science_lab_mystery.jpg')}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent flex items-center p-6 sm:p-8">
          <div className="max-w-md space-y-2 text-white">
            <span className="px-3 py-1 bg-cyan-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded-full shadow-md">
              ⚗️ Stesen 04 • Kebuk Kebal Bawah Tanah
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-cyan-300 drop-shadow-md">
              Kod Rahsia Makmal Sains
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Selesaikan teka-teki kata hubung, kata kerja pasif berimbuhan di-... dan peribahasa untuk membuka pintu kebuk kebal!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'clock') {
    return (
      <div className="relative w-full h-56 sm:h-72 rounded-3xl overflow-hidden border-4 border-purple-400 shadow-2xl">
        <img
          src={GAME_IMAGES.clockTower}
          alt="Portal Menara Jam Kuno"
          loading="eager"
          onError={(e) => handleImageError(e, '/images/clock_tower_portal.jpg')}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent flex items-center p-6 sm:p-8">
          <div className="max-w-md space-y-2 text-white">
            <span className="px-3 py-1 bg-purple-500 text-white font-heading font-black text-xs uppercase tracking-wider rounded-full shadow-md">
              ⏰ Stesen 05 • Menara Waktu (11:55 PM)
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-yellow-300 drop-shadow-md">
              Portal Menara Jam & Pembuktian Kes
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium">
              Menaakul kenyataan 4 saksi, menyelamatkan Manuskrip Emas dan melengkapkan rakaman suara bacaan situasi akhir!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'briefing') {
    return (
      <div className="relative w-full h-48 sm:h-56 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl">
        <img
          src={GAME_IMAGES.adventureMap}
          alt="Taklimat Misi DEBACA 4.0"
          loading="eager"
          onError={(e) => handleImageError(e, '/images/detective_adventure_map.jpg')}
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/95 via-amber-950/70 to-slate-950/60 flex items-center p-6 sm:p-8">
          <div className="max-w-md space-y-2 text-white">
            <span className="px-3 py-1 bg-yellow-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded-full shadow-md">
              📂 Stesen 02 • Fail Kes Sulit
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-yellow-300 drop-shadow-md">
              Misi Memburu Manuskrip Emas
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-medium">
              Ketahui latar belakang kes pencerobohan dan 4 teras penyiasatan membaca Bahasa Melayu Tahun 4.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Golden Master Badge Artwork
  return (
    <div className="relative w-full p-6 sm:p-8 rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 border-4 border-yellow-400 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-xl shrink-0">
          <img
            src={GAME_IMAGES.goldenMasterBadge}
            alt="Lencana Emas Master DEBACA 4.0"
            loading="eager"
            onError={(e) => handleImageError(e, '/images/golden_master_badge.jpg')}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="px-3 py-1 bg-yellow-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded-full shadow-md">
            🏆 Anugerah Tertinggi
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-black text-yellow-300 mt-1">
            Lencana Emas Detektif Master
          </h3>
          <p className="text-xs text-amber-100 mt-0.5">
            Tahniah! Anda telah menamatkan semua stesen membaca, tatabahasa, penaakulan & ujian kelancaran suara.
          </p>
        </div>
      </div>
    </div>
  );
};
