import React, { useState } from 'react';
import { StationId, DetectiveProfile } from '../types/game';
import { soundManager } from '../utils/audio';
import { InteractiveMapBoard } from './InteractiveMapBoard';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Award, 
  Sparkles, 
  ChevronRight,
  AlertTriangle,
  Star
} from 'lucide-react';

interface AdventureMapProps {
  profile: DetectiveProfile;
  onSelectStation: (station: StationId) => void;
}

interface MapStationConfig {
  id: StationId;
  nombor: string;
  tajuk: string;
  lokasi: string;
  ikon: string;
  deskripsi: string;
  lencana?: string;
  gambarMini: string;
  warnaBorder: string;
  badgeWarna: string;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({ profile, onSelectStation }) => {
  const [lockedAlert, setLockedAlert] = useState<string | null>(null);

  const stations: MapStationConfig[] = [
    {
      id: 'station1',
      nombor: '01',
      tajuk: 'Pendaftaran Detektif Cilik',
      lokasi: 'Ibu Pejabat Penyiasat',
      ikon: '📝',
      gambarMini: '🏕️ 🕵️‍♂️',
      deskripsi: 'Daftarkan nama detektif, nama kelas, sekolah dan pilih avatar watak peribadi anda.',
      warnaBorder: 'border-amber-400 hover:border-amber-500',
      badgeWarna: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'station2',
      nombor: '02',
      tajuk: 'Taklimat Misi & Fail Kes',
      lokasi: 'Bilik Perancangan Strategik',
      ikon: '🔍',
      gambarMini: '📂 🗺️',
      deskripsi: 'Dengar arahan sulit kes kecurian manuskrip dan objektif kurikulum DSKP Bahasa Melayu Tahun 4.',
      warnaBorder: 'border-yellow-400 hover:border-yellow-500',
      badgeWarna: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    },
    {
      id: 'station3',
      nombor: '03',
      tajuk: 'Misteri Perpustakaan Purba',
      lokasi: 'Bilik Manuskrip Arkib',
      ikon: '🏛️',
      gambarMini: '📚 👟',
      deskripsi: 'Siasat laporan saksi, kesan tapak kasut berlumpur, kain biru dan dapatkan Cebisan Peta Kuno #1.',
      lencana: 'Lencana Detektif Pemula',
      warnaBorder: 'border-emerald-400 hover:border-emerald-500',
      badgeWarna: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      id: 'station4',
      nombor: '04',
      tajuk: 'Misteri Makmal Sains',
      lokasi: 'Makmal Bawah Tanah',
      ikon: '⚗️',
      gambarMini: '🧪 🔐',
      deskripsi: 'Pecahkan kod kebuk kebal dengan tatabahasa kata hubung, kata kerja pasif & peribahasa.',
      lencana: 'Lencana Detektif Bijak',
      warnaBorder: 'border-cyan-400 hover:border-cyan-500',
      badgeWarna: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    },
    {
      id: 'station5',
      nombor: '05',
      tajuk: 'Portal Menara Jam & Rakaman Suara',
      lokasi: 'Menara Waktu Kuno (Misi Terakhir)',
      ikon: '⏰',
      gambarMini: '🕰️ 🎙️',
      deskripsi: 'Menaakul bukti 4 saksi dan wajib merekod suara bacaan situasi akhir dengan audio sebutan setiap ayat.',
      lencana: 'Lencana Detektif Master',
      warnaBorder: 'border-purple-400 hover:border-purple-500',
      badgeWarna: 'bg-purple-100 text-purple-900 border-purple-300',
    },
    {
      id: 'station6',
      nombor: '06',
      tajuk: 'Dewan Sijil & Lencana Emas',
      lokasi: 'Anugerah Khas DEBACA 4.0',
      ikon: '🏆',
      gambarMini: '👑 ⭐',
      deskripsi: 'Terima Sijil Penghargaan Detektif Cilik rasmi berserta Lencana Emas Master kebanggaan!',
      warnaBorder: 'border-amber-400 hover:border-amber-500',
      badgeWarna: 'bg-amber-100 text-amber-900 border-amber-300',
    },
  ];

  // STRICT LOCKING: Each station is locked until the immediate previous station is completed!
  const isStationUnlocked = (stationId: StationId): boolean => {
    if (stationId === 'station1') return true;
    if (stationId === 'station2') {
      return Boolean(profile.nama) && profile.selesaiStesen.includes('station1');
    }
    if (stationId === 'station3') {
      return profile.selesaiStesen.includes('station2');
    }
    if (stationId === 'station4') {
      return profile.selesaiStesen.includes('station3');
    }
    if (stationId === 'station5') {
      return profile.selesaiStesen.includes('station4');
    }
    if (stationId === 'station6') {
      // Must have finished station 5 AND recorded their voice
      return profile.selesaiStesen.includes('station5') && Boolean(profile.rakamanSuaraUrl);
    }
    return false;
  };

  const handleStationClick = (stnId: StationId, stationName: string) => {
    if (isStationUnlocked(stnId)) {
      setLockedAlert(null);
      soundManager.playClick();
      onSelectStation(stnId);
    } else {
      soundManager.playWrong();
      let syarat = "Sila selesaikan stesen sebelumnya terlebih dahulu.";
      if (stnId === 'station2') syarat = "Sila lengkapkan pendaftaran nama di Stesen 1 dahulu!";
      if (stnId === 'station3') syarat = "Sila dengar taklimat misi di Stesen 2 dahulu!";
      if (stnId === 'station4') syarat = "Sila selesaikan misteri perpustakaan di Stesen 3 dahulu!";
      if (stnId === 'station5') syarat = "Sila selesaikan misteri makmal sains di Stesen 4 dahulu!";
      if (stnId === 'station6') syarat = "Sila selesaikan Misi 5 dan rekod suara bacaan situasi akhir sebelum membuka sijil!";

      setLockedAlert(`🔒 ${stationName} masih terkunci! ${syarat}`);
      setTimeout(() => setLockedAlert(null), 4500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2">
      {/* 1. Interactive Illustrated Map Canvas Board */}
      <InteractiveMapBoard
        profile={profile}
        onSelectStation={(stnId) => {
          const cfg = stations.find((s) => s.id === stnId);
          handleStationClick(stnId, cfg?.tajuk || 'Stesen');
        }}
        isStationUnlocked={isStationUnlocked}
      />

      {/* Locked Alert Notification */}
      {lockedAlert && (
        <div className="p-4 bg-rose-500 text-white rounded-2xl border-2 border-rose-300 shadow-xl flex items-center justify-between text-xs sm:text-sm font-bold animate-bounce">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{lockedAlert}</span>
          </div>
          <button 
            onClick={() => setLockedAlert(null)}
            className="text-white hover:text-rose-200 text-xs underline cursor-pointer ml-2"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Station Cards Header */}
      <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🗺️</span>
          <div>
            <h3 className="font-heading text-xl font-black text-slate-900">
              Modul Stesen Penyiasatan
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Ketahui perincian misi, dapatkan ganjaran lencana dan selesaikan cabaran bahasa
            </p>
          </div>
        </div>

        <div className="text-xs font-black px-3 py-1 bg-amber-200 text-amber-900 rounded-full border border-amber-300">
          6 Stesen Berturutan
        </div>
      </div>

      {/* Grid of Stations with Staggered Fade-in & Slide-up Entrance Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((stn, index) => {
          const unlocked = isStationUnlocked(stn.id);
          const isDone = profile.selesaiStesen.includes(stn.id);

          // Inline style for staggered slide-up & fade-in animation
          const animationDelay = `${index * 120}ms`;

          return (
            <div
              key={stn.id}
              style={{
                animation: `slideUpFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay,
                opacity: 0,
              }}
              className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border-4 ${
                unlocked
                  ? isDone
                    ? 'bg-white border-emerald-400 shadow-xl hover:-translate-y-1'
                    : 'bg-white border-amber-400 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl'
                  : 'bg-slate-100/90 border-slate-300 opacity-60 shadow-none'
              }`}
            >
              {/* Card Header & Mini Art */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {stn.ikon}
                    </span>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300">
                      STESEN {stn.nombor}
                    </span>
                  </div>

                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selesai
                    </span>
                  ) : !unlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-200 px-2.5 py-1 rounded-full border border-slate-300">
                      <Lock className="w-3 h-3 text-slate-500" /> Terkunci
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 animate-pulse">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Buka Misi
                    </span>
                  )}
                </div>

                {/* Illustrated Mini Graphic Bar */}
                <div className="p-2 mb-3 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
                  <span className="text-lg">{stn.gambarMini}</span>
                  <span className="text-[11px] text-amber-800 font-semibold">{stn.lokasi}</span>
                </div>

                {/* Station Title */}
                <h3 className="font-heading text-lg font-black text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                  {stn.tajuk}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {stn.deskripsi}
                </p>

                {stn.lencana && (
                  <div className={`mt-3 p-2 rounded-xl border text-[11px] font-black flex items-center gap-1.5 ${stn.badgeWarna}`}>
                    <Award className="w-4 h-4 shrink-0" />
                    <span>Ganjaran: {stn.lencana}</span>
                  </div>
                )}
              </div>

              {/* Station Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleStationClick(stn.id, stn.tajuk)}
                  className={`w-full py-3 px-4 rounded-2xl font-heading font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isDone
                      ? 'bg-slate-800 hover:bg-slate-900 text-white'
                      : unlocked
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black ring-2 ring-amber-300 transform active:scale-95'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isDone ? (
                    <>
                      <span>Semak Semula Stesen</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : unlocked ? (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Masuk Menyiasat Sekarang</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Stesen Masih Terkunci</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
