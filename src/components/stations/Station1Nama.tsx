import React, { useState } from 'react';
import { DetectiveProfile } from '../../types/game';
import { AVATAR_OPTIONS } from '../../data/detectiveData';
import { soundManager } from '../../utils/audio';
import { AudioNarrationButton } from '../AudioNarrationButton';
import { User, School, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface Station1NamaProps {
  profile: DetectiveProfile;
  onSaveProfile: (updated: Partial<DetectiveProfile>) => void;
  onNext: () => void;
}

export const Station1Nama: React.FC<Station1NamaProps> = ({
  profile,
  onSaveProfile,
  onNext,
}) => {
  const [nama, setNama] = useState(profile.nama || '');
  const [kelas, setKelas] = useState(profile.kelas || '4 Amanah');
  const [sekolah, setSekolah] = useState(profile.sekolah || 'SK Seri Bintang');
  const [avatar, setAvatar] = useState(profile.avatar || '🕵️‍♂️');

  const speechText =
    "Selamat datang ke Stesen 1! Sila daftarkan nama rasmi detektif kamu, nama kelas dan sekolah, serta pilih watak avatar penyiasat kamu. Pastikan maklumat ini tepat kerana ia akan dicetak pada Sijil Lencana Emas kamu!";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert("Sila masukkan nama detektif cilik anda terlebih dahulu!");
      return;
    }

    soundManager.playCorrect();
    onSaveProfile({
      nama: nama.trim(),
      kelas: kelas.trim(),
      sekolah: sekolah.trim(),
      avatar,
      selesaiStesen: Array.from(new Set([...profile.selesaiStesen, 'station1'])),
    });
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Visual Illustrated Academy Banner */}
      <div className="relative w-full h-36 sm:h-44 rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 p-6 flex items-center justify-between border-4 border-amber-400 shadow-xl text-white">
        <div className="space-y-1 z-10 max-w-sm">
          <span className="px-3 py-1 bg-slate-900/40 text-amber-200 border border-amber-300/40 rounded-full text-[10px] font-black uppercase tracking-wider">
            Akademi Detektif Cilik
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
            Pendaftaran Kad Pengenalan
          </h3>
          <p className="text-xs text-amber-100 font-medium">
            Masukkan maklumat diri dan pilih avatar watak kamu untuk memulakan pengembaraan!
          </p>
        </div>
        <div className="text-6xl sm:text-7xl select-none shrink-0 drop-shadow-md pr-2">
          🏕️🕵️
        </div>
      </div>

      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border-3 border-amber-300 shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📝</span>
          <div>
            <h3 className="font-heading font-black text-slate-900 text-lg">
              Borang Pendaftaran Detektif
            </h3>
            <p className="text-xs text-slate-500">Ibu Pejabat Penyiasatan DEBACA 4.0</p>
          </div>
        </div>

        <AudioNarrationButton text={speechText} label="Dengar Arahan" />
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-amber-300 shadow-xl space-y-6"
      >
        {/* Name input */}
        <div className="space-y-2">
          <label className="font-heading font-black text-slate-800 text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-amber-600" />
            <span>Nama Penuh Detektif Cilik:</span>
          </label>
          <input
            type="text"
            required
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Cth: Muhammad Adam bin Daniel"
            className="w-full p-3.5 bg-amber-50/50 border-2 border-amber-300 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition-all outline-none"
          />
        </div>

        {/* Class & School Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-heading font-black text-slate-800 text-sm">
              Kelas / Tingkatan:
            </label>
            <input
              type="text"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              placeholder="Cth: 4 Pintar / 4 Bijak"
              className="w-full p-3 bg-amber-50/50 border-2 border-amber-200 rounded-2xl text-slate-900 font-semibold text-sm focus:bg-white focus:border-amber-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-heading font-black text-slate-800 text-sm flex items-center gap-1.5">
              <School className="w-4 h-4 text-amber-600" />
              <span>Nama Sekolah:</span>
            </label>
            <input
              type="text"
              value={sekolah}
              onChange={(e) => setSekolah(e.target.value)}
              placeholder="Cth: SK Seri Bintang"
              className="w-full p-3 bg-amber-50/50 border-2 border-amber-200 rounded-2xl text-slate-900 font-semibold text-sm focus:bg-white focus:border-amber-500 outline-none"
            />
          </div>
        </div>

        {/* Avatar Selection */}
        <div className="space-y-3">
          <label className="font-heading font-black text-slate-800 text-sm block">
            Pilih Watak Detektif Cilik Kamu:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AVATAR_OPTIONS.map((av) => (
              <button
                type="button"
                key={av.id}
                onClick={() => {
                  soundManager.playClick();
                  setAvatar(av.icon);
                }}
                className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  avatar === av.icon
                    ? 'border-amber-500 bg-amber-100 shadow-md scale-105 ring-2 ring-amber-400'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="text-4xl">{av.icon}</span>
                <span className="text-[11px] font-black text-slate-800 text-center leading-tight">
                  {av.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-heading font-black text-base rounded-2xl shadow-lg shadow-amber-500/30 transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Daftar & Teruskan ke Stesen 2</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
