import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AudioNarrationButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export const AudioNarrationButton: React.FC<AudioNarrationButtonProps> = ({
  text,
  label = "Dengar Suara Arahan",
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (isPlaying) {
      soundManager.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      soundManager.playClick();
      soundManager.speakMalay(text, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
        isPlaying
          ? 'bg-amber-500 text-slate-900 ring-2 ring-amber-300 animate-pulse'
          : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
      } ${className}`}
      title="Dengar bacaan suara teks dalam Bahasa Melayu"
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span>Hentikan Suara</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-700" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
