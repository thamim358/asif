// Web Audio API authentic Islamic Wedding Melodic Engine
// Features: Warm Qanun (harp), Gentle Ney (flute), and Soft Duff frame drum
// Strictly buzz-free: 100% pure acoustic wave synthesis with a steep 1600Hz anti-buzz filter

type Listener = (isPlaying: boolean) => void;

class IslamicMusicEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private masterFilter: BiquadFilterNode | null = null;
  private isMuted: boolean = false;
  private melodyTimeout: number | null = null;
  private duffTimeout: number | null = null;
  private listeners: Set<Listener> = new Set();
  private melodyIndex: number = 0;
  private duffIndex: number = 0;

  // Timeless Islamic Wedding Melody ("Barakallahu Lakuma" Celebration Motif)
  // Key of D Major / Bayati Warm Acoustic Scale:
  // D4 (293.66), E4 (329.63), F#4 (369.99), G4 (392.00), A4 (440.00), B4 (493.88), C#5 (554.37), D5 (587.33)
  private melodySequence: Array<{ pitch: number; duration: number; delay: number; instrument: 'qanun' | 'ney' }> = [
    // Phrase 1: "Barakallahu Lakuma..." (May Allah bless you both) - Warm Qanun Pluck
    { pitch: 293.66, duration: 0.8, delay: 0.65, instrument: 'qanun' }, // D4
    { pitch: 369.99, duration: 0.5, delay: 0.45, instrument: 'qanun' }, // F#4
    { pitch: 440.00, duration: 0.9, delay: 0.70, instrument: 'qanun' }, // A4
    { pitch: 440.00, duration: 0.6, delay: 0.50, instrument: 'qanun' }, // A4
    { pitch: 493.88, duration: 0.9, delay: 0.75, instrument: 'qanun' }, // B4
    { pitch: 440.00, duration: 0.6, delay: 0.50, instrument: 'qanun' }, // A4
    { pitch: 392.00, duration: 0.7, delay: 0.55, instrument: 'qanun' }, // G4
    { pitch: 369.99, duration: 1.2, delay: 0.95, instrument: 'qanun' }, // F#4
    { pitch: 329.63, duration: 0.7, delay: 0.55, instrument: 'qanun' }, // E4
    { pitch: 293.66, duration: 1.8, delay: 1.40, instrument: 'qanun' }, // D4 home

    // Phrase 2: Serene Ney Flute Response
    { pitch: 369.99, duration: 1.2, delay: 0.90, instrument: 'ney' },   // F#4
    { pitch: 392.00, duration: 0.8, delay: 0.65, instrument: 'ney' },   // G4
    { pitch: 440.00, duration: 1.4, delay: 1.05, instrument: 'ney' },   // A4
    { pitch: 587.33, duration: 1.6, delay: 1.20, instrument: 'ney' },   // D5 high grace
    { pitch: 554.37, duration: 0.7, delay: 0.55, instrument: 'ney' },   // C#5
    { pitch: 493.88, duration: 1.0, delay: 0.80, instrument: 'ney' },   // B4
    { pitch: 440.00, duration: 1.8, delay: 1.50, instrument: 'ney' },   // A4 peaceful sustain

    // Phrase 3: "...Wa Baraka 'Alaykuma" (And shower His blessings upon you)
    { pitch: 440.00, duration: 0.8, delay: 0.65, instrument: 'qanun' }, // A4
    { pitch: 493.88, duration: 0.7, delay: 0.55, instrument: 'qanun' }, // B4
    { pitch: 440.00, duration: 0.7, delay: 0.55, instrument: 'qanun' }, // A4
    { pitch: 392.00, duration: 0.7, delay: 0.55, instrument: 'qanun' }, // G4
    { pitch: 369.99, duration: 1.1, delay: 0.85, instrument: 'qanun' }, // F#4
    { pitch: 392.00, duration: 0.7, delay: 0.55, instrument: 'qanun' }, // G4
    { pitch: 329.63, duration: 0.9, delay: 0.75, instrument: 'qanun' }, // E4
    { pitch: 293.66, duration: 2.4, delay: 1.90, instrument: 'qanun' }, // D4 deep resolution

    // Phrase 4: Gentle Ney Flute Outro & Re-entry
    { pitch: 220.00, duration: 0.9, delay: 0.70, instrument: 'ney' },   // A3
    { pitch: 293.66, duration: 1.2, delay: 0.95, instrument: 'ney' },   // D4
    { pitch: 369.99, duration: 1.3, delay: 1.00, instrument: 'ney' },   // F#4
    { pitch: 440.00, duration: 1.5, delay: 1.15, instrument: 'ney' },   // A4
    { pitch: 369.99, duration: 1.2, delay: 0.90, instrument: 'ney' },   // F#4
    { pitch: 329.63, duration: 1.1, delay: 0.85, instrument: 'ney' },   // E4
    { pitch: 293.66, duration: 2.8, delay: 2.40, instrument: 'ney' },   // D4 long rest
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Start the background Islamic wedding tune
  start() {
    if (this.isRunning) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.isRunning = true;
    this.notify();

    // 1. Anti-buzz master lowpass filter (steep brickwall roll-off at 1600Hz)
    // Physically blocks any high-frequency electrical hum, buzz, whistle, or hiss
    this.masterFilter = ctx.createBiquadFilter();
    this.masterFilter.type = 'lowpass';
    this.masterFilter.frequency.setValueAtTime(1600, ctx.currentTime);
    this.masterFilter.Q.setValueAtTime(0.7, ctx.currentTime);
    this.masterFilter.connect(ctx.destination);

    // 2. High, clean master volume gain (0.80 for loud, crystal-clear acoustic presence)
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(this.isMuted ? 0.0001 : 0.80, ctx.currentTime + 1.0);
    this.masterGain.connect(this.masterFilter);

    // 3. Start melody and gentle rhythmic Duff
    this.melodyIndex = 0;
    this.duffIndex = 0;
    this.playNextMelodyNote();
    this.playNextDuffBeat();
  }

  // Pure Acoustic Qanun (Arabic Plucked Harp) Note
  // Uses 100% clean sine waveforms with natural wooden resonance (Zero sawtooth = Zero buzz)
  private playQanunNote(pitch: number, duration: number) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain || !this.isRunning) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const noteFilter = ctx.createBiquadFilter();

    // Pure fundamental sine wave
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(pitch, now);

    // Gentle second harmonic for rich harp chime (at 22% volume)
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(pitch * 2, now);

    // Warm body filter cutting off all harshness above 1200Hz
    noteFilter.type = 'lowpass';
    noteFilter.frequency.setValueAtTime(Math.min(pitch * 2.5, 1200), now);

    // Pluck envelope: quick 6ms clickless rise, natural exponential decay to 0
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.46, now + 0.006);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(noteFilter);
    osc2.connect(noteFilter);
    noteFilter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);

    // Complete cleanup on note finish
    setTimeout(() => {
      try {
        osc1.disconnect();
        osc2.disconnect();
        noteFilter.disconnect();
        gainNode.disconnect();
      } catch {
        // Safe
      }
    }, (duration + 0.1) * 1000);
  }

  // Pure Warm Ney (Islamic Bamboo Flute)
  // Gentle, breathy, peaceful melody with soft natural vibrato (Zero buzz)
  private playNeyNote(pitch: number, duration: number) {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain || !this.isRunning) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const oscSub = ctx.createOscillator();
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    const gainNode = ctx.createGain();
    const neyFilter = ctx.createBiquadFilter();

    // Pure flute tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);

    // Deep sub-octave warmth for acoustic wooden resonance
    oscSub.type = 'sine';
    oscSub.frequency.setValueAtTime(pitch * 0.5, now);

    // Subtle, gentle 4.0 Hz vibrato with small depth (+/- 1.8 Hz)
    vibrato.frequency.setValueAtTime(4.0, now);
    vibratoGain.gain.setValueAtTime(1.8, now);
    vibrato.connect(osc.frequency);

    // Warm wooden filter (strictly limits high frequencies to 1100Hz)
    neyFilter.type = 'lowpass';
    neyFilter.frequency.setValueAtTime(1100, now);

    // Smooth breath swell envelope
    const attack = Math.min(0.12, duration * 0.2);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.36, now + attack);
    gainNode.gain.linearRampToValueAtTime(0.30, now + duration * 0.7);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(neyFilter);
    oscSub.connect(neyFilter);
    neyFilter.connect(gainNode);
    gainNode.connect(this.masterGain);

    vibrato.start(now);
    osc.start(now);
    oscSub.start(now);

    vibrato.stop(now + duration + 0.05);
    osc.stop(now + duration + 0.05);
    oscSub.stop(now + duration + 0.05);

    setTimeout(() => {
      try {
        vibrato.disconnect();
        vibratoGain.disconnect();
        osc.disconnect();
        oscSub.disconnect();
        neyFilter.disconnect();
        gainNode.disconnect();
      } catch {
        // Safe
      }
    }, (duration + 0.1) * 1000);
  }

  // Traditional Wedding Duff (Wooden Frame Drum) Heartbeat
  // Deep warm bass thud and soft wooden rim tap (Warm, no harsh high end)
  private playDuff(type: 'dum' | 'tak') {
    const ctx = this.ctx;
    if (!ctx || !this.masterGain || !this.isRunning) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const drumFilter = ctx.createBiquadFilter();

    if (type === 'dum') {
      // Warm center strike (thump)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.3);

      drumFilter.type = 'lowpass';
      drumFilter.frequency.setValueAtTime(150, now);

      gainNode.gain.setValueAtTime(0.35, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    } else {
      // Gentle rim strike (tak)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.12);

      drumFilter.type = 'lowpass';
      drumFilter.frequency.setValueAtTime(280, now);

      gainNode.gain.setValueAtTime(0.18, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    }

    osc.connect(drumFilter);
    drumFilter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.5);

    setTimeout(() => {
      try {
        osc.disconnect();
        drumFilter.disconnect();
        gainNode.disconnect();
      } catch {
        // Safe
      }
    }, 550);
  }

  private playNextMelodyNote = () => {
    if (!this.isRunning) return;

    const note = this.melodySequence[this.melodyIndex];
    if (note.instrument === 'qanun') {
      this.playQanunNote(note.pitch, note.duration);
    } else {
      this.playNeyNote(note.pitch, note.duration);
    }

    this.melodyIndex = (this.melodyIndex + 1) % this.melodySequence.length;
    this.melodyTimeout = window.setTimeout(this.playNextMelodyNote, note.delay * 1000);
  };

  private playNextDuffBeat = () => {
    if (!this.isRunning) return;

    // 8-step traditional Islamic wedding rhythm (Ayyoub / Maqsum slow pulse)
    // Step: 0: Dum, 1: Rest, 2: Tak, 3: Rest, 4: Dum, 5: Rest, 6: Tak, 7: Rest
    const pattern: Array<'dum' | 'tak' | null> = ['dum', null, 'tak', null, 'dum', null, 'tak', null];
    const hit = pattern[this.duffIndex % pattern.length];

    if (hit) {
      this.playDuff(hit);
    }

    this.duffIndex++;
    // Relaxed tempo: 340ms per step
    this.duffTimeout = window.setTimeout(this.playNextDuffBeat, 340);
  };

  stop() {
    this.isRunning = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
    if (this.duffTimeout) {
      clearTimeout(this.duffTimeout);
      this.duffTimeout = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      } catch {
        // Safe
      }
    }
    this.notify();
  }

  toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0.0001 : 0.80;
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.2);
    }
    this.notify();
    return this.isMuted;
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }

  getIsMuted(): boolean {
    return this.isMuted;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isRunning && !this.isMuted));
  }
}

export const islamicMusic = new IslamicMusicEngine();
