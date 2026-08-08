'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAudioEnabled, setAudioEnabled, startAmbient, stopAmbient, speakText, stopSpeech, playSound } from '@/lib/sounds';

interface SoundContextType {
  soundEnabled: boolean;
  setSound: (enabled: boolean) => void;
  play: (type: 'click' | 'hover' | 'tick' | 'whoosh' | 'achievement' | 'scan' | 'error' | 'success' | 'scroll') => void;
  narrate: (text: string, onEnd?: () => void) => void;
  muteAll: () => void;
  startBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(false);

  useEffect(() => {
    // Read preference on mount
    const enabled = isAudioEnabled();
    setSoundEnabledState(enabled);
    if (enabled) {
      // Resume AudioContext on first user interaction if enabled
      const resumeAudio = () => {
        startAmbient();
        window.removeEventListener('click', resumeAudio);
      };
      window.addEventListener('click', resumeAudio);
      return () => window.removeEventListener('click', resumeAudio);
    }
  }, []);

  // Global scroll audio effect listener
  useEffect(() => {
    let lastScrollTime = 0;

    const handleScroll = () => {
      const now = Date.now();
      // Throttle scroll sound to play max once every 85ms while scrolling
      if (now - lastScrollTime > 85) {
        lastScrollTime = now;
        playSound('scroll');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setSound = (enabled: boolean) => {
    setAudioEnabled(enabled);
    setSoundEnabledState(enabled);
    if (enabled) {
      playSound('success');
      startAmbient();
    } else {
      stopAmbient();
      stopSpeech();
    }
  };

  const play = (type: 'click' | 'hover' | 'tick' | 'whoosh' | 'achievement' | 'scan' | 'error' | 'success' | 'scroll') => {
    playSound(type);
  };

  const narrate = (text: string, onEnd?: () => void) => {
    speakText(text, onEnd);
  };

  const muteAll = () => {
    setSound(false);
  };

  const startBackgroundMusic = () => {
    if (soundEnabled) {
      startAmbient();
    }
  };

  const stopBackgroundMusic = () => {
    stopAmbient();
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        setSound,
        play,
        narrate,
        muteAll,
        startBackgroundMusic,
        stopBackgroundMusic
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
