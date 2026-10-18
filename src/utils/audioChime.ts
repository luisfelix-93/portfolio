/**
 * Retro Windows 2000 startup chord chime synthesized via Web Audio API.
 * Zero external audio files, works completely offline and lightweight.
 */

let isMuted = true;

export const getAudioMuted = (): boolean => isMuted;

export const setAudioMuted = (muted: boolean): void => {
  isMuted = muted;
};

export const playStartupChime = (): void => {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Windows 2000 inspired harmonic chord notes (Eb major 9th progression)
    // Eb3, Bb3, Eb4, G4, Bb4, C5, Eb5
    const notes = [
      { freq: 155.56, start: 0.0, dur: 2.8, gain: 0.18, type: 'triangle' as OscillatorType },
      { freq: 233.08, start: 0.05, dur: 2.6, gain: 0.20, type: 'sine' as OscillatorType },
      { freq: 311.13, start: 0.1, dur: 2.5, gain: 0.22, type: 'triangle' as OscillatorType },
      { freq: 392.00, start: 0.18, dur: 2.4, gain: 0.20, type: 'sine' as OscillatorType },
      { freq: 466.16, start: 0.28, dur: 2.2, gain: 0.18, type: 'sine' as OscillatorType },
      { freq: 523.25, start: 0.40, dur: 2.0, gain: 0.15, type: 'sine' as OscillatorType },
      { freq: 622.25, start: 0.55, dur: 1.8, gain: 0.14, type: 'sine' as OscillatorType },
    ];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.25, ctx.currentTime);

    // Warm lowpass filter simulating retro 16-bit soundcard output
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1900, ctx.currentTime);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    notes.forEach(({ freq, start, dur, gain, type }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const startTime = ctx.currentTime + start;
      const endTime = startTime + dur;

      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.linearRampToValueAtTime(gain, startTime + 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, endTime);

      osc.connect(noteGain);
      noteGain.connect(filter);

      osc.start(startTime);
      osc.stop(endTime);
    });
  } catch {
    // Graceful fallback if audio context is blocked by autoplay policy
  }
};
