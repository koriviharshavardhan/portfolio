'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { Terminal, Shield, CheckCircle2 } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const BOOT_LOGS = [
  "AI Kernel v5.2 initialized",
  "Initializing Neural Engine...",
  "Loading Machine Learning Modules...",
  "Loading Python Runtime...",
  "Loading Portfolio Assets...",
  "Connecting Experience Engine...",
  "Rendering 3D Scene...",
  "Checking GPU configuration...",
  "Preparing User Interface...",
  "Launching Harsha OS..."
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, onSkip }) => {
  const { play, narrate } = useSound();
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [printedLogs, setPrintedLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState<'logo' | 'boot' | 'scan' | 'complete'>('logo');
  const [scanMessage, setScanMessage] = useState('');
  const [flash, setFlash] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Logo animation phase
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('boot');
      play('whoosh');
    }, 1800);

    return () => clearTimeout(timer);
  }, [play]);

  // Terminal boot logs and progress bar animation
  useEffect(() => {
    if (phase !== 'boot') return;

    let progressInterval: NodeJS.Timeout;
    let logInterval: NodeJS.Timeout;

    // Fast progress interpolation
    const totalDuration = 3200; // 3.2 seconds for progress
    const steps = 100;
    const intervalTime = totalDuration / steps;

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    // Print logs at staggered intervals
    const printNextLog = (index: number) => {
      if (index >= BOOT_LOGS.length) {
        clearInterval(logInterval);
        return;
      }

      setPrintedLogs((prev) => [...prev, BOOT_LOGS[index]]);
      play('tick');

      // Scroll internal terminal box to bottom
      setTimeout(() => {
        const termBox = terminalEndRef.current?.parentElement;
        if (termBox) termBox.scrollTop = termBox.scrollHeight;
      }, 50);

      const delay = Math.random() * 200 + 150; // Variable speed
      logInterval = setTimeout(() => {
        setCurrentLogIndex(index + 1);
        printNextLog(index + 1);
      }, delay);
    };

    printNextLog(0);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(logInterval);
    };
  }, [phase, play]);

  // Handle Boot Completion & AI Scanner Initiation
  useEffect(() => {
    if (progress < 100 || printedLogs.length < BOOT_LOGS.length) return;

    const startScan = setTimeout(() => {
      setPhase('scan');
      play('scan');
      
      const scanSteps = [
        { text: 'Scanning network ports...', delay: 0 },
        { text: 'Recruiter Detected. Access Level: Elevated.', delay: 700 },
        { text: 'Device Ready. Core Allocation: Optimized.', delay: 1400 },
        { text: 'Rendering Interface...', delay: 2100 },
        { text: 'WELCOME TO HARSHA OS', delay: 2800 }
      ];

      scanSteps.forEach((step) => {
        setTimeout(() => {
          setScanMessage(step.text);
          if (step.text === 'WELCOME TO HARSHA OS') {
            play('success');
            // Trigger speech welcome narration
            narrate(
              "Welcome. You are now entering the portfolio of Korivi Harsha Vardhan. Artificial Intelligence Engineer. Software Developer. Explore projects, engineering skills, and technical expertise."
            );
          } else {
            play('tick');
          }
        }, step.delay);
      });

      // Complete transition
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => {
          onComplete();
        }, 300); // Wait for flash duration
      }, 3800);

    }, 600);

    return () => clearTimeout(startScan);
  }, [progress, printedLogs, onComplete, play, narrate]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-[#04070B] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ${
        flash ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Particles Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div className="absolute top-[20%] left-[30%] w-[3px] h-[3px] bg-[#00E5FF] rounded-full blur-[1px] animate-pulse" />
        <div className="absolute top-[60%] left-[80%] w-[4px] h-[4px] bg-[#7B61FF] rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[80%] left-[15%] w-[3px] h-[3px] bg-[#00FFA3] rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[70%] w-[5px] h-[5px] bg-[#00E5FF] rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

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

      {/* FLASH LAYER */}
      {flash && (
        <div className="absolute inset-0 z-50 bg-[#00E5FF]/20 animate-pulse duration-200" />
      )}

      {/* PHASE 1: LOGO INTRO */}
      {phase === 'logo' && (
        <div className="flex flex-col items-center justify-center animate-fade-in">
          {/* Pulsing expand circle */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute w-2 h-2 bg-[#00E5FF] rounded-full animate-ping duration-1000 scale-[8]" />
            <div className="absolute w-12 h-12 bg-gradient-to-tr from-[#00E5FF] to-[#7B61FF] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.6)] animate-spin-slow duration-[10s]">
              <span className="font-sans font-extrabold text-white text-lg tracking-widest select-none transform rotate-[-45deg] scale-90">
                HV
              </span>
            </div>
          </div>
          <p className="mt-8 text-xs font-mono text-[#00E5FF] tracking-widest uppercase animate-pulse">
            Initializing Harsha OS...
          </p>
        </div>
      )}

      {/* PHASE 2: BOOT PROCESS & TERMINAL */}
      {phase === 'boot' && (
        <div className="w-full max-w-2xl px-6 flex flex-col items-center">
          {/* Animated HV Logo Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#7B61FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              <span className="font-extrabold text-white text-xs">HV</span>
            </div>
            <span className="font-mono text-sm tracking-wider text-[#B8C1CC]">HARSHA OS v2030</span>
          </div>

          {/* Boot Terminal Box */}
          <div className="w-full h-64 glass-panel rounded-2xl border border-white/10 p-5 font-mono text-xs text-[#B8C1CC] overflow-y-auto mb-8 flex flex-col justify-start relative shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
            <div className="absolute top-2 right-4 flex items-center gap-1.5 opacity-60">
              <span className="w-2 h-2 rounded-full bg-[#FF4D6D]" />
              <span className="w-2 h-2 rounded-full bg-[#FFC857]" />
              <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
            </div>

            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2 text-white/50">
              <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>SYSTEM BOOT LOGS</span>
            </div>

            <div className="flex-1 space-y-1.5 pr-2">
              {printedLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between text-[#B8C1CC] animate-fade-in-up">
                  <span className="flex items-center gap-2">
                    <span className="text-[#00E5FF]">▸</span>
                    {log}
                  </span>
                  <span className="text-[#3DDC84] font-semibold animate-pulse flex items-center gap-1">
                    ✓
                  </span>
                </div>
              ))}
              {currentLogIndex < BOOT_LOGS.length && (
                <div className="text-[#00E5FF] terminal-cursor">
                  <span>▸ </span>
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-2 font-mono text-xs text-[#B8C1CC]">
              <span>LOADING SYSTEM ENVIRONMENT</span>
              <span className="text-[#00E5FF] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden p-[1px] relative shadow-[0_0_10px_rgba(0,229,255,0.1)]">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] shadow-[0_0_15px_#00E5FF] transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: AI SCANNER DETECTOR */}
      {phase === 'scan' && (
        <div className="flex flex-col items-center justify-center animate-fade-in px-6">
          <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            {/* Holographic scanner layout */}
            <div className="absolute inset-0 border-2 border-dashed border-[#00E5FF]/20 rounded-full animate-spin-slow duration-[30s]" />
            <div className="absolute inset-4 border border-[#7B61FF]/30 rounded-full animate-spin-slow reverse" />
            
            {/* Pulsing scanning orb */}
            <div className="w-32 h-32 bg-[#00E5FF]/5 border border-[#00E5FF]/30 rounded-full flex items-center justify-center relative overflow-hidden pulse-glow">
              <Shield className="w-12 h-12 text-[#00E5FF] animate-pulse" />
              {/* Scan Bar Sweep */}
              <div className="absolute left-0 right-0 h-1 bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] animate-scan" style={{ top: '50%' }} />
            </div>
          </div>

          <h3 className="text-lg font-mono tracking-widest text-[#00E5FF] uppercase mb-2 glow-text-primary animate-pulse">
            SECURE SCAN ACTIVE
          </h3>
          <p className="text-center font-mono text-[#B8C1CC] text-sm h-6">
            {scanMessage}
          </p>
        </div>
      )}
    </div>
  );
};
