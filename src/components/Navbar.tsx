import React, { useState } from 'react';
import { DetectiveProfile, StationId } from '../types/game';
import { soundManager } from '../utils/audio';
import { 
  Compass, 
  Award, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Map, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  profile: DetectiveProfile;
  currentStation: StationId;
  onNavigate: (station: StationId) => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  currentStation,
  onNavigate,
  onReset,
}) => {
  const [muted, setMuted] = useState(soundManager.isMuted());

  const handleMuteToggle = () => {
    const next = !muted;
    setMuted(next);
    soundManager.setMuted(next);
    if (!next) soundManager.playClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b-4 border-amber-500 shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div 
            onClick={() => onNavigate('map')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-900 shadow-md shadow-amber-500/30 font-black text-xl group-hover:scale-105 transition-transform">
              🕵️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg sm:text-2xl font-black tracking-wide text-amber-400">
                  DEBACA 4.0
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 hidden sm:inline-block">
                  Bahasa Melayu Tahun 4
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden md:block">
                Baca, Siasat, Fikir, Buktikan!
              </p>
            </div>
          </div>

          {/* Player stats */}
          <div className="flex items-center gap-2 sm:gap-4">
            {profile.nama && (
              <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-2xl">
                <span className="text-xl">{profile.avatar || '🕵️‍♂️'}</span>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white truncate max-w-[120px]">
                    {profile.nama}
                  </div>
                  <div className="text-[10px] text-amber-300 font-medium">
                    {profile.kelas || 'Tahun 4'}
                  </div>
                </div>
              </div>
            )}

            {/* Score */}
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-2xl">
              <span className="text-amber-400 font-bold text-sm">⭐</span>
              <div className="text-right">
                <div className="text-xs font-black text-amber-400 leading-none">
                  {profile.skor}
                </div>
                <div className="text-[9px] text-slate-400 uppercase font-bold leading-none mt-0.5">
                  Mata
                </div>
              </div>
            </div>

            {/* Badges count */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-2xl text-xs">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="font-bold text-slate-200">{profile.lencana.length}</span>
              <span className="text-[10px] text-slate-400">Lencana</span>
            </div>

            {/* Navigation actions */}
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('map');
              }}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentStation === 'map'
                  ? 'bg-amber-500 text-slate-900 shadow'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title="Peta Pengembaraan Pulau"
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Peta Misi</span>
            </button>

            {/* Mute button */}
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title={muted ? 'Buka Bunyi' : 'Senyapkan Bunyi'}
            >
              {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Restart button */}
            <button
              onClick={() => {
                if (confirm('Adakah anda ingin memulakan semula pengembaraan detektif?')) {
                  onReset();
                }
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Mula Semula Pengembaraan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
