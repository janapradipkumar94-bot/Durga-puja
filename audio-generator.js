/**
 * Durga Puja Web Audio Sound Generator
 * Generates pure procedural acoustic temple bells, conch shell (শঙ্খধ্বনি),
 * and calming Tanpura meditative autumn drone using the browser's Web Audio API.
 * 100% offline, zero audio files required, zero copyright issues.
 */

class PujoSoundEngine {
  constructor() {
    this.ctx = null;
    this.isAmbientPlaying = false;
    this.ambientInterval = null;
    this.tanpuraNodes = [];
    this.masterGain = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Synthesize an authentic Temple Brass Bell (মন্দিরের পিতলের ঘণ্টা)
   * Uses physical modeling frequencies for struck bronze bells.
   */
  ringTempleBell(fundamental = 523.25, volume = 0.5) {
    this.ensureContext();
    const now = this.ctx.currentTime;
    
    // Partial frequencies for realistic bronze bell resonance
    // Fundamental, Minor Third, Fifth, Octave, Upper Octave
    const partials = [
      { freqMult: 1.0,  gain: 0.7, decay: 3.5 },
      { freqMult: 1.2,  gain: 0.5, decay: 2.8 },
      { freqMult: 1.5,  gain: 0.4, decay: 2.4 },
      { freqMult: 2.0,  gain: 0.35, decay: 1.9 },
      { freqMult: 2.76, gain: 0.25, decay: 1.2 },
      { freqMult: 3.5,  gain: 0.15, decay: 0.8 }
    ];

    partials.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * p.freqMult, now);

      // Strike attack (immediate) and exponential ring decay
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(p.gain * volume, now + 0.008);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + p.decay + 0.1);
    });
  }

  /**
   * Synthesize the sacred Shankha Dhwani (শঙ্খধ্বনি / Holy Conch Shell)
   * Warm brass lip-buzz with subtle breath air noise and majestic swell.
   */
  blowShankha() {
    this.ensureContext();
    const now = this.ctx.currentTime;
    const duration = 4.2;

    // Conch base frequency (typically ~260Hz - 290Hz, around Middle C/D)
    const baseFreq = 261.63;

    // Oscillator 1: Primary fundamental with slight pitch scoop/swell
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq * 0.96, now);
    osc1.frequency.linearRampToValueAtTime(baseFreq, now + 0.7);
    osc1.frequency.linearRampToValueAtTime(baseFreq * 1.01, now + 2.8);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.88, now + duration);

    // Filter to give warm acoustic brass / lip reed warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.linearRampToValueAtTime(1100, now + 1.2);
    filter.frequency.linearRampToValueAtTime(500, now + duration);
    filter.Q.value = 3.5;

    // Resonant Formant filter for hollow conch chamber
    const formant = this.ctx.createBiquadFilter();
    formant.type = 'bandpass';
    formant.frequency.value = 850;
    formant.Q.value = 2.0;

    // Breath Air Noise (gives real human breath texture)
    const bufferSize = this.ctx.sampleRate * duration;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1200;
    noiseFilter.Q.value = 4.0;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.06, now + 0.8);
    noiseGain.gain.linearRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    // Swell Envelope for main tone
    const mainGain = this.ctx.createGain();
    mainGain.gain.setValueAtTime(0.001, now);
    mainGain.gain.linearRampToValueAtTime(0.55, now + 1.0); // Soft breath entrance
    mainGain.gain.setValueAtTime(0.55, now + 2.8);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    filter.connect(formant);
    formant.connect(mainGain);

    mainGain.connect(this.masterGain);
    noiseGain.connect(this.masterGain);

    osc1.start(now);
    noiseSource.start(now);
    osc1.stop(now + duration + 0.1);
    noiseSource.stop(now + duration + 0.1);
  }

  /**
   * Start / Stop peaceful ambient temple soundscape
   * Plays soft background tanpura drone and periodic gentle bronze chimes.
   */
  toggleAmbient(forceState) {
    this.ensureContext();
    const targetState = forceState !== undefined ? forceState : !this.isAmbientPlaying;
    
    if (targetState) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    return this.isAmbientPlaying;
  }

  startAmbient() {
    if (this.isAmbientPlaying) return;
    this.ensureContext();
    this.isAmbientPlaying = true;

    // Start soothing Tanpura drone (Sa - Pa - Sa')
    // C3 (130.81Hz), G3 (196.00Hz), C4 (261.63Hz)
    const pitches = [130.81, 196.00, 261.63];
    this.tanpuraNodes = [];

    pitches.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Warm low-pass
      filter.type = 'lowpass';
      filter.frequency.value = 450 + (idx * 150);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), this.ctx.currentTime + 3.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.tanpuraNodes.push({ osc, gain });
    });

    // Ring an initial sweet bell
    this.ringTempleBell(523.25, 0.4);

    // Schedule gentle bell chimes at calm intervals (every 7 to 11 seconds)
    const bellPitches = [523.25, 587.33, 659.25, 783.99, 1046.50];
    this.ambientInterval = setInterval(() => {
      if (!this.isAmbientPlaying) return;
      const pitch = bellPitches[Math.floor(Math.random() * bellPitches.length)];
      this.ringTempleBell(pitch, 0.25 + Math.random() * 0.2);
    }, 7500);
  }

  stopAmbient() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }

    if (this.tanpuraNodes && this.tanpuraNodes.length > 0) {
      const now = this.ctx.currentTime;
      this.tanpuraNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
          setTimeout(() => {
            try { osc.stop(); } catch (e) {}
          }, 1600);
        } catch (e) {}
      });
      this.tanpuraNodes = [];
    }
  }

  /**
   * Play the Autumn Agomoni Meditative Chime Sequence (শরতের আগমনী সুর)
   * An 8-note soothing classical melody that demonstrates the speaker works.
   */
  playAgomoniMelody(onProgress, onComplete) {
    this.ensureContext();
    
    // Notes of soothing morning raga: Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa'
    // C4, D4, E4, F4, G4, A4, B4, C5
    const notes = [
      { f: 261.63, dur: 1.0, name: 'সা' },
      { f: 293.66, dur: 0.9, name: 'রে' },
      { f: 329.63, dur: 1.1, name: 'গা' },
      { f: 392.00, dur: 1.2, name: 'পা' },
      { f: 440.00, dur: 1.0, name: 'ধা' },
      { f: 523.25, dur: 2.2, name: 'সাঁ' }
    ];

    let delay = 0;
    notes.forEach((note, idx) => {
      setTimeout(() => {
        this.ringTempleBell(note.f, 0.45);
        if (onProgress) onProgress(note.name, idx, notes.length);
      }, delay * 1000);
      delay += note.dur;
    });

    setTimeout(() => {
      if (onComplete) onComplete();
    }, delay * 1000 + 1500);
  }
}

// Global Sound Engine
window.pujoSound = new PujoSoundEngine();
