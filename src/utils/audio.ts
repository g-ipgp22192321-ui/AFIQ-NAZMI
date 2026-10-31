class SoundManager {
  private muted: boolean = false;
  private bgmPlaying: boolean = false;
  private audioCtx: AudioContext | null = null;
  private synth: SpeechSynthesis | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
    }
  }

  private initCtx() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (muted && this.synth) {
      this.synth.cancel();
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(780, this.audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.08);
  }

  playCorrect() {
    if (this.muted) return;
    this.initCtx();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);
      gain.gain.setValueAtTime(0.25, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.25);
      osc.connect(gain);
      gain.connect(this.audioCtx!.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.25);
    });
  }

  playWrong() {
    if (this.muted) return;
    this.initCtx();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.3);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  speakMalay(text: string, onEnd?: () => void) {
    if (this.muted || !this.synth) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = this.synth.getVoices();
    const malayVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().includes('ms') ||
        v.lang.toLowerCase().includes('id') ||
        v.name.toLowerCase().includes('malay') ||
        v.name.toLowerCase().includes('indonesian')
    );

    if (malayVoice) {
      utterance.voice = malayVoice;
    }
    utterance.lang = 'ms-MY';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    if (onEnd) utterance.onend = onEnd;
    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) this.synth.cancel();
  }

  toggleBGM(): boolean {
    this.bgmPlaying = !this.bgmPlaying;
    return this.bgmPlaying;
  }
}

export const soundManager = new SoundManager();
