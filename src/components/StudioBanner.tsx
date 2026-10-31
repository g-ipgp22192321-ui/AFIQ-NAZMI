import React, { useState } from 'react';
import { ExternalLink, Sparkles, Copy, Check, Info, ArrowRight, X } from 'lucide-react';

interface StudioBannerProps {
  onOpenModal: () => void;
  onSelectPromptPreset: (preset: string) => void;
}

export const StudioBanner: React.FC<StudioBannerProps> = ({ onOpenModal, onSelectPromptPreset }) => {
  const [dismissed, setDismissed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const targetAppId = "77509bc8-47b1-4da4-83c4-e36670aff717";
  const targetUrl = `https://aistudio.google.com/apps/${targetAppId}?showPreview=true&showAssistant=true`;

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 py-3 px-4 sm:px-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg mt-0.5 shrink-0 border border-indigo-500/30">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-indigo-200">Konteks Permintaan Aplikasi:</span>
              <span className="font-mono text-xs bg-slate-800/80 text-amber-300 px-2 py-0.5 rounded border border-slate-700">
                app/{targetAppId.slice(0, 8)}...
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Sedia Digunakan
              </span>
            </div>
            <p className="text-slate-300 text-xs mt-0.5 max-w-3xl leading-relaxed">
              Pautan sesi AI Studio adalah peribadi (memerlukan log masuk akaun Google anda). Aplikasi ini telah dibina secara automatik sebagai suite lengkap 
              <strong> Penjana RPH DSKP KPM, Kuiz UASA/SPM & Pengurusan PdP Pintar</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={onOpenModal}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tampal Prompt Asal</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(targetUrl);
              setCopiedLink(true);
              setTimeout(() => setCopiedLink(false), 2000);
            }}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
            title="Salin Pautan Asal"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup Makluman"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
