import React, { useState } from 'react';
import { StationId, DetectiveProfile } from '../types/game';
import { soundManager } from '../utils/audio';
import { GAME_IMAGES, handleImageError } from '../assets/images';
import { CheckCircle2, Lock, Play, Sparkles, Compass, Eye, ShieldCheck } from 'lucide-react';

interface InteractiveMapBoardProps {
  profile: DetectiveProfile;
  onSelectStation: (stnId: StationId) => void;
  isStationUnlocked: (stnId: StationId) => boolean;
}

export const InteractiveMapBoard: React.FC<InteractiveMapBoardProps> = ({
  profile,
  onSelectStation,
  isStationUnlocked,
}) => {
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  // Exact coordinates matching the landmarks on the realistic 3D generated map
  const checkpoints: Array<{
    id: StationId;
    num: string;
    tajuk: string;
    lokasi: string;
    ikon: string;
    top: string; // percentage from top
    left: string; // percentage from left
    badgeWarna: string;
  }> = [
    {
      id: 'station1',
      num: '1',
      tajuk: 'Kem Pendaftaran Detektif',
      lokasi: 'Khemah Pantai Detektif',
      ikon: '🏕️',
      top: '67%',
      left: '26%',
      badgeWarna: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'station2',
      num: '2',
      tajuk: 'Bilik Strategi & Fail Kes',
      lokasi: 'Kubu Rahsia Gua Batu',
      ikon: '🔍',
      top: '73%',
      left: '49%',
      badgeWarna: 'bg-yellow-500 text-slate-950',
    },
    {
      id: 'station3',
      num: '3',
      tajuk: 'Misteri Perpustakaan Purba',
      lokasi: 'Katedral Arkib Buku',
      ikon: '🏛️',
      top: '52%',
      left: '39%',
      badgeWarna: 'bg-emerald-500 text-white',
    },
    {
      id: 'station4',
      num: '4',
      tajuk: 'Makmal Sains Bawah Tanah',
      lokasi: 'Kebuk Kebal Steampunk',
      ikon: '⚗️',
      top: '37%',
      left: '54%',
      badgeWarna: 'bg-cyan-500 text-slate-950',
    },
    {
      id: 'station5',
      num: '5',
      tajuk: 'Portal Menara Jam & Suara',
      lokasi: 'Puncak Tebing Waktu',
      ikon: '⏰',
      top: '22%',
      left: '24%',
      badgeWarna: 'bg-purple-600 text-white',
    },
    {
      id: 'station6',
      num: '6',
      tajuk: 'Dewan Istana Sijil Emas',
      lokasi: 'Istana Master & Peti Emas',
      ikon: '🏆',
      top: '25%',
      left: '79%',
      badgeWarna: 'bg-amber-400 text-slate-950',
    },
  ];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-slate-950 select-none">
      {/* Top Floating Utility Banner */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-amber-400/80 text-white shadow-xl">
        <span className="text-xl animate-spin" style={{ animationDuration: '10s' }}>🧭</span>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-black text-sm sm:text-base text-amber-300">
              PETA KEMBARA PULAU DETEKTIF CILIK
            </h2>
            <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-black uppercase">
              Realistik 3D
            </span>
          </div>
          <p className="text-[10px] text-amber-100 hidden sm:block">
            Tekan mana-mana pin stesen pada peta pulau untuk memulakan penyiasatan!
          </p>
        </div>
      </div>

      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center gap-2">
        <div className="bg-amber-400 text-slate-950 font-heading font-black text-xs sm:text-sm px-4 py-2 rounded-2xl border-2 border-slate-950 shadow-xl flex items-center gap-1.5">
          <span>⭐ Skor: {profile.skor} Mata</span>
        </div>
      </div>

      {/* Realistic 3D Adventure Island Map Image Container */}
      <div className="relative w-full aspect-video min-h-[360px] sm:min-h-[480px]">
        <img
          src={GAME_IMAGES.adventureMap}
          alt="Peta Pengembaraan Detektif Cilik DEBACA 4.0"
          loading="eager"
          onError={(e) => handleImageError(e, '/images/detective_adventure_map.jpg')}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.01]"
        />

        {/* Ambient Map Tint & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/30 pointer-events-none" />

        {/* Interactive Checkpoint Pins overlay directly on landmarks */}
        {checkpoints.map((cp) => {
          const unlocked = isStationUnlocked(cp.id);
          const isDone = profile.selesaiStesen.includes(cp.id);
          const isHovered = hoveredStation === cp.id;

          return (
            <div
              key={cp.id}
              style={{ top: cp.top, left: cp.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              onClick={() => {
                soundManager.playClick();
                onSelectStation(cp.id);
              }}
              onMouseEnter={() => setHoveredStation(cp.id)}
              onMouseLeave={() => setHoveredStation(null)}
            >
              {/* Pulsing Target Aura if unlocked & active */}
              {unlocked && !isDone && (
                <div className="absolute -inset-4 rounded-full bg-yellow-400/50 animate-ping pointer-events-none" />
              )}

              {/* Main Glowing Pin */}
              <div
                className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-heading font-black shadow-2xl transition-all duration-300 transform group-hover:scale-125 border-3 ${
                  isDone
                    ? 'bg-emerald-500 border-white text-white shadow-emerald-500/50'
                    : unlocked
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 border-white text-slate-950 shadow-yellow-500/70 ring-4 ring-amber-400/60 animate-bounce'
                    : 'bg-slate-900/90 border-slate-500 text-slate-400 opacity-80'
                }`}
              >
                {/* Checkpoint Number Badge on corner */}
                <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-slate-950 text-amber-300 font-mono text-[10px] font-black flex items-center justify-center border border-white">
                  {cp.num}
                </div>

                {/* Pin Center Icon */}
                <span className="text-xl sm:text-2xl select-none">
                  {isDone ? '✔' : !unlocked ? '🔒' : cp.ikon}
                </span>

                {/* Animated detective avatar standing on current active station */}
                {unlocked && !isDone && (
                  <div className="absolute -top-8 -left-3 animate-pulse bg-white/95 px-2 py-0.5 rounded-full border border-amber-500 text-[10px] font-bold text-slate-900 shadow-md whitespace-nowrap flex items-center gap-1">
                    <span>{profile.avatar || '🕵️'}</span>
                    <span>Di Sini!</span>
                  </div>
                )}
              </div>

              {/* Popover Title Banner on Hover / Tap */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-xl bg-slate-950/95 border-2 border-amber-400 text-white text-center shadow-2xl transition-all pointer-events-none z-30 min-w-[130px] sm:min-w-[160px] ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-90 sm:opacity-95 scale-95'
                }`}
              >
                <div className="font-heading font-black text-[11px] sm:text-xs text-amber-300 leading-tight">
                  {cp.tajuk}
                </div>
                <div className="text-[9px] text-slate-300 mt-0.5 flex items-center justify-center gap-1">
                  <span>📍 {cp.lokasi}</span>
                </div>
                <div className="mt-1">
                  <span
                    className={`inline-block text-[9px] font-black px-2 py-0.5 rounded-md ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : unlocked
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isDone ? 'SELESAI' : unlocked ? 'BUKA SEKARANG ▶' : 'TERKUNCI 🔒'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Mission Progress Tracker Bar */}
      <div className="bg-slate-900/95 p-4 sm:p-5 border-t-4 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-black">
            🗺️
          </div>
          <div>
            <div className="font-heading font-black text-white text-sm">
              Laluan Penyiasatan Bahasa Melayu Tahun 4
            </div>
            <p className="text-[11px] text-amber-200">
              {profile.selesaiStesen.length} daripada 5 stesen penyiasatan telah diselesaikan.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-64 space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>Kemajuan Misi</span>
            <span className="text-amber-400">{Math.round((profile.selesaiStesen.length / 5) * 100)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-700 shadow-md shadow-yellow-500/50"
              style={{ width: `${Math.min(100, (profile.selesaiStesen.length / 5) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
