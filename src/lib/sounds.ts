let audioCtx: AudioContext | null = null;
let ambientOscillator1: OscillatorNode | null = null;
let ambientOscillator2: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;

// Initialize Audio Context on demand
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Check if audio is enabled in localStorage
export const isAudioEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('harsha_os_audio') === 'enabled';
};

export const setAudioEnabled = (enabled: boolean) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('harsha_os_audio', enabled ? 'enabled' : 'disabled');
  if (!enabled) {
    stopAmbient();
    stopSpeech();
  } else {
    // Resume context if suspended
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  }
};

// Programmatic Synthesizer for UI Sounds
export const playSound = (type: 'click' | 'hover' | 'tick' | 'whoosh' | 'achievement' | 'scan' | 'error' | 'success' | 'scroll') => {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  switch (type) {
    case 'scroll': {
      // Soft futuristic mechanical tick on scroll
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      
      const baseFreq = 850 + Math.random() * 300;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);

      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
      break;
    }
    case 'click': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
      break;
    }
    case 'hover': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(1600, now + 0.02);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
      break;
    }
    case 'tick': {
      // Tiny computer terminal beep/tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, now);

      gain.gain.setValueAtTime(0.008, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.015);
      break;
    }
    case 'whoosh': {
      // Noise buffer for whoosh
      const bufferSize = ctx.sampleRate * 0.4; // 0.4 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.4);
      filter.Q.setValueAtTime(3.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.45);
      break;
    }
    case 'achievement': {
      // A futuristic 4-note ascending synth chord
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.1);

        gain.gain.setValueAtTime(0, now + index * 0.1);
        gain.gain.linearRampToValueAtTime(0.04, now + index * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.1 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.1);
        osc.stop(now + index * 0.1 + 0.35);
      });
      break;
    }
    case 'scan': {
      // Cybernetic scan sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(4000, now + 0.3);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
      break;
    }
    case 'success': {
      // Elegant 2-tone chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
      break;
    }
    case 'error': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.25);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
      break;
    }
  }
};

// Play low frequency ambient AI OS humming background
export const startAmbient = () => {
  // Ambient background music disabled by user request
  return;
};

export const stopAmbient = () => {
  if (ambientOscillator1) {
    try {
      ambientOscillator1.stop();
      ambientOscillator2?.stop();
      ambientOscillator1.disconnect();
      ambientOscillator2?.disconnect();
      ambientGain?.disconnect();
    } catch (e) {
      // Already stopped
    }
    ambientOscillator1 = null;
    ambientOscillator2 = null;
    ambientGain = null;
  }
};

// Web Speech Synthesis for AI Narrator
export const speakText = (text: string, onEnd?: () => void) => {
  if (!isAudioEnabled()) {
    onEnd?.();
    return;
  }

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a premium English voice
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const voices = window.speechSynthesis.getVoices();
    // Search for a premium English male voice
    let voice = voices.find(v => {
      const nameLower = v.name.toLowerCase();
      const isEnglish = v.lang.startsWith('en');
      const isMale = nameLower.includes('male') || 
                     nameLower.includes('david') || 
                     nameLower.includes('mark') || 
                     nameLower.includes('george') || 
                     nameLower.includes('alex') || 
                     nameLower.includes('fred') || 
                     nameLower.includes('daniel') ||
                     nameLower.includes('ravi');
      return isEnglish && isMale;
    });

    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('google'));
    }
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('en'));
    }
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = 1.0; // Professional speed
    utterance.pitch = 1.05; // Slightly optimistic but authoritative
    utterance.volume = 0.95;

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = () => {
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } else {
    onEnd?.();
  }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};
