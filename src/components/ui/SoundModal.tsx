'use client';

import React, { useState, useEffect } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { Volume2, VolumeX, ShieldAlert } from 'lucide-react';

interface SoundModalProps {
  onDismiss: () => void;
  onSkip?: () => void;
}

export const SoundModal: React.FC<SoundModalProps> = ({ onDismiss, onSkip }) => {
  const { setSound, play } = useSound();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a tiny delay for cinematic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Play a diagnostic tick on first mount if browser context allows
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtx.close();
      } catch (e) {}
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (enable: boolean) => {
    setIsVisible(false);
    setTimeout(() => {
      setSound(enable);
      onDismiss();
    }, 400); // Wait for fade-out animation
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-500">
      {/* TOP-RIGHT DIRECT SKIP INTRO BUTTON */}
      {onSkip && (
        <button
          onClick={() => {
            play('click');
            onSkip();
          }}
          className="fixed top-6 right-6 z-[99999] px-4 py-2 bg-black/75 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/20 rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:scale-105 cursor-pointer flex items-center gap-2 backdrop-blur-md active:scale-95"
        >
          <span>Skip Intro</span>
          <span className="text-white">➔</span>
        </button>
      )}

      <div 
        className="glass-panel max-w-md w-full mx-4 p-8 rounded-[28px] border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.15)] text-center relative overflow-hidden transform transition-all duration-500 scale-100"
        onMouseEnter={() => play('hover')}
      >
        {/* Animated Scan Line */}
        <div className="scan-line" />

        {/* Outer Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#7B61FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-white/5 border border-white/10 relative">
            <Volume2 className="h-10 w-10 text-[#00E5FF] animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-[#00E5FF]/30 animate-ping pointer-events-none" />
          </div>
        </div>

        <h2 className="text-2xl font-bold font-sans tracking-wider text-white mb-3">
          SYSTEM BOOT SEQUENCE
        </h2>
        <p className="text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-6">
          HARSHA OS v2030 Initializing
        </p>

        <div className="text-left font-sans text-[#B8C1CC] text-sm space-y-3 mb-8 bg-black/35 p-4 rounded-xl border border-white/5">
          <p className="flex items-start gap-2.5">
            <span className="text-[#00E5FF] font-mono">▸</span>
            <span>Spatial Audio Synthesizer: <strong className="text-white">Active</strong></span>
          </p>
          <p className="flex items-start gap-2.5">
            <span className="text-[#00E5FF] font-mono">▸</span>
            <span>Neural Speech Generator: <strong className="text-white">Standby</strong></span>
          </p>
          <p className="flex items-start gap-2.5">
            <span className="text-[#00E5FF] font-mono">▸</span>
            <span>Ambient Experience Mode: <strong className="text-white">Ready</strong></span>
          </p>
          <p className="text-xs text-[#6B7280] mt-4 border-t border-white/5 pt-3 leading-relaxed">
            Highly recommended: Enable audio for full interactive synthesized effects, click ticks, swooshes, and AI speech narration during navigation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              play('click');
              handleChoice(true);
            }}
            className="flex-1 btn-primary py-3.5 px-6 flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold tracking-wider uppercase transition-all duration-300 active:scale-95"
          >
            <Volume2 className="h-4 w-4" />
            Enable Sound
          </button>
          
          <button
            onClick={() => {
              handleChoice(false);
            }}
            className="flex-1 btn-secondary py-3.5 px-6 flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold tracking-wider uppercase text-[#B8C1CC] hover:text-white transition-all duration-300 active:scale-95"
          >
            <VolumeX className="h-4 w-4" />
            Silent Mode
          </button>
        </div>
      </div>
    </div>
  );
};
