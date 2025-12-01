// Frequencies for the 4th and 5th octaves
const NOTE_FREQUENCIES: Record<string, number> = {
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63,
  "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30, "A4": 440.00,
  "A#4": 466.16, "B4": 493.88,
  "C5": 523.25, "C#5": 554.37, "D5": 587.33, "D#5": 622.25, "E5": 659.25,
  "F5": 698.46, "F#5": 739.99, "G5": 783.99, "G#5": 830.61, "A5": 880.00,
  "A#5": 932.33, "B5": 987.77
};

class AudioService {
  private ctx: AudioContext | null = null;
  private volume: number = 0.5;

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setVolume(val: number) {
    this.volume = val;
  }

  playNote(note: string, duration: number = 0.5, when: number = 0) {
    const ctx = this.getContext();
    const freq = NOTE_FREQUENCIES[note];
    if (!freq) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine'; // Sine wave for a smoother sound, closer to a simple piano vibe
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(ctx.destination);

    const startTime = ctx.currentTime + when;
    const endTime = startTime + duration;

    // Envelope to avoid clicking
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(this.volume, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, endTime);

    osc.start(startTime);
    osc.stop(endTime);
  }

  async playScale(notes: string[], direction: 'asc' | 'desc' | 'both', onNotePlay?: (note: string) => void) {
    const ctx = this.getContext();
    const noteDuration = 0.5;
    const gap = 0.1;
    
    let sequence = [...notes];
    if (direction === 'desc') {
      sequence.reverse();
    } else if (direction === 'both') {
      sequence = [...notes, ...[...notes].reverse().slice(1)];
    }

    let currentTime = 0;

    sequence.forEach((note, index) => {
       // Schedule audio
       this.playNote(note, noteDuration, currentTime);
       
       // Schedule visual callback
       setTimeout(() => {
         onNotePlay?.(note);
       }, currentTime * 1000);

       currentTime += noteDuration + gap;
    });

    // Reset visual after done
    setTimeout(() => {
        onNotePlay?.("");
    }, currentTime * 1000);
  }
}

export const audioService = new AudioService();