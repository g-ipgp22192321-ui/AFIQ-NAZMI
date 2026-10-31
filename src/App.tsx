import React, { useState, useEffect } from 'react';
import { StationId, DetectiveProfile } from './types/game';
import { Navbar } from './components/Navbar';
import { CoverScreen } from './components/CoverScreen';
import { AdventureMap } from './components/AdventureMap';
import { Station1Nama } from './components/stations/Station1Nama';
import { Station2Penerangan } from './components/stations/Station2Penerangan';
import { Station3Pemula } from './components/stations/Station3Pemula';
import { Station4Bijak } from './components/stations/Station4Bijak';
import { Station5Master } from './components/stations/Station5Master';
import { StationVoiceRecord } from './components/stations/StationVoiceRecord';
import { Station6Sijil } from './components/stations/Station6Sijil';
import { soundManager } from './utils/audio';

const STORAGE_KEY = 'debaca_4_detective_profile_v1';

const INITIAL_PROFILE: DetectiveProfile = {
  nama: '',
  kelas: '4 Amanah',
  sekolah: 'SK Seri Bintang',
  avatar: '🕵️‍♂️',
  skor: 0,
  lencana: [],
  selesaiStesen: [],
  rakamanSuaraUrl: null,
  tarikhDaftar: new Date().toLocaleDateString('ms-MY'),
};

export default function App() {
  const [profile, setProfile] = useState<DetectiveProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [currentStation, setCurrentStation] = useState<StationId>(() => {
    return profile.nama ? 'map' : 'cover';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Gagal menyimpan profil:', e);
    }
  }, [profile]);

  const handleUpdateProfile = (updates: Partial<DetectiveProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const handleUpdateScore = (additional: number) => {
    setProfile((prev) => ({ ...prev, skor: prev.skor + additional }));
  };

  const handleAwardBadge = (badge: string) => {
    setProfile((prev) => {
      if (prev.lencana.includes(badge)) return prev;
      return { ...prev, lencana: [...prev.lencana, badge] };
    });
  };

  const handleMarkComplete = (stationId: string) => {
    setProfile((prev) => {
      if (prev.selesaiStesen.includes(stationId)) return prev;
      return { ...prev, selesaiStesen: [...prev.selesaiStesen, stationId] };
    });
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(INITIAL_PROFILE);
    setCurrentStation('cover');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Top Navigation */}
      <Navbar
        profile={profile}
        currentStation={currentStation}
        onNavigate={(stn) => setCurrentStation(stn)}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentStation === 'cover' && (
          <CoverScreen
            onStart={() => {
              if (profile.nama) {
                setCurrentStation('map');
              } else {
                setCurrentStation('station1');
              }
            }}
          />
        )}

        {currentStation === 'map' && (
          <AdventureMap
            profile={profile}
            onSelectStation={(stn) => setCurrentStation(stn)}
          />
        )}

        {currentStation === 'station1' && (
          <Station1Nama
            profile={profile}
            onSaveProfile={handleUpdateProfile}
            onNext={() => setCurrentStation('station2')}
          />
        )}

        {currentStation === 'station2' && (
          <Station2Penerangan
            profile={profile}
            onMarkComplete={handleMarkComplete}
            onNext={() => setCurrentStation('station3')}
          />
        )}

        {currentStation === 'station3' && (
          <Station3Pemula
            profile={profile}
            onUpdateScore={handleUpdateScore}
            onAwardBadge={handleAwardBadge}
            onMarkComplete={handleMarkComplete}
            onNext={() => setCurrentStation('station4')}
          />
        )}

        {currentStation === 'station4' && (
          <Station4Bijak
            profile={profile}
            onUpdateScore={handleUpdateScore}
            onAwardBadge={handleAwardBadge}
            onMarkComplete={handleMarkComplete}
            onNext={() => setCurrentStation('station5')}
          />
        )}

        {currentStation === 'station5' && (
          <Station5Master
            profile={profile}
            onUpdateScore={handleUpdateScore}
            onAwardBadge={handleAwardBadge}
            onMarkComplete={handleMarkComplete}
            onVoiceSubmitted={(audioUrl) => {
              handleUpdateProfile({ rakamanSuaraUrl: audioUrl });
              handleAwardBadge('Lencana Vokal Cemerlang');
              handleUpdateScore(30);
            }}
            onNext={() => setCurrentStation('station6')}
          />
        )}

        {currentStation === 'station6' && (
          <Station6Sijil profile={profile} onRestart={handleReset} />
        )}
      </main>

      {/* Footer (Hidden on print) */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-center text-xs border-t-4 border-amber-500 no-print mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕵️</span>
            <span className="font-heading font-black text-amber-400">DEBACA 4.0: Pengembaraan Detektif</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">Inovasi Bahasa Melayu Tahun 4 DSKP KPM</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            Baca, Siasat, Fikir, Buktikan! • Hak Cipta Terpelihara
          </div>
        </div>
      </footer>
    </div>
  );
}
