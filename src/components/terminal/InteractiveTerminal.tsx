'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { personalInfo, education, projects, certifications, strengths } from '@/lib/data';
import { Terminal, Shield, Play } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: string;
  isHtml?: boolean;
}

export const InteractiveTerminal: React.FC = () => {
  const { play, setSound, soundEnabled } = useSound();
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: 'system --boot', output: 'Welcome to Harsha OS v2030 Terminal Emulator.\nType "help" to view a list of available system commands.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isMatrixActive]);

  const handleTerminalFocus = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdClean = inputVal.trim().toLowerCase();
    
    if (!cmdClean) return;

    play('tick');

    // Add to command history list
    setCmdHistory((prev) => [...prev, inputVal]);
    setHistoryIndex(-1);

    let output = '';
    let isHtml = false;

    // Handle commands
    switch (cmdClean) {
      case 'help':
        output = `Available Commands:
  about         - Print Korivi Harsha Vardhan's engineering bio.
  skills        - List languages, databases, tools, and concepts.
  projects      - Display current AI/ML software project registry.
  education     - Review academic milestones & CGPAs.
  certificates  - List verified professional credentials.
  strengths     - Print engineering competencies & soft skills.
  contact       - Output phone, email, and location.
  github        - Open Harsha's GitHub portfolio codebase.
  linkedin      - Open LinkedIn profile link.
  resume        - Download the PDF resume.
  voice on/off  - Toggle the AI voice narrator system.
  clear         - Clear terminal stdout history logs.
  history       - Show command usage log.
  
Secret Commands:
  matrix        - Toggle Matrix Digital Rain console.
  jarvis        - Connect to AI voice core assistant.
  developer     - Print underlying environment specs.
  konami        - Enter standard gaming code sequence.
  future        - Show AI engineer career projection for 2030.
  hire          - Print standard recruiting contract offer details.`;
        break;

      case 'about':
        output = `${personalInfo.name}
Role: ${personalInfo.role}
----------------------------------------
${personalInfo.bio}`;
        break;

      case 'skills':
        output = `Technical Arsenal:
  Programming Languages : Python, Java, JavaScript, HTML, CSS, SQL
  AI & Machine Learning : TensorFlow, Keras, OpenCV, Scikit-learn, CNN, Computer Vision
  Developer Tools       : Git, GitHub, VS Code, Jupyter Notebook
  Engineering Concepts  : OOPS, Data Structures & Algorithms, Database Design, Responsive Design`;
        break;

      case 'projects':
        output = `Project Directory:
${projects.map((p, i) => `  [0${i + 1}] ${p.name} - ${p.category}\n       Stack: ${p.techStack.join(', ')}\n       Goal: ${p.headline}`).join('\n\n')}`;
        break;

      case 'education':
        output = `Academic Journey:
${education.map(e => `  ▸ ${e.year} - ${e.degree}\n    Institution : ${e.institution}\n    Grade       : ${e.gradeValue}`).join('\n\n')}`;
        break;

      case 'certificates':
        output = `Verified Certifications:
${certifications.map((c, i) => `  [0${i + 1}] ${c.title} (${c.issuer}, ${c.year})`).join('\n')}`;
        break;

      case 'strengths':
        output = `Professional Competency:
${strengths.map(s => `  ✓ ${s}`).join('\n')}`;
        break;

      case 'contact':
        output = `Contact Details:
  Email    : ${personalInfo.email}
  Phone    : ${personalInfo.phone}
  Location : ${personalInfo.location}`;
        break;

      case 'github':
        output = `Opening GitHub portfolio...`;
        if (typeof window !== 'undefined') window.open(personalInfo.github, '_blank');
        break;

      case 'linkedin':
        output = `Opening LinkedIn profile...`;
        if (typeof window !== 'undefined') window.open(personalInfo.linkedin, '_blank');
        break;

      case 'resume':
        output = `Opening resume PDF copy...`;
        if (typeof window !== 'undefined') window.open('/resume.pdf', '_blank');
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'history':
        output = cmdHistory.map((h, i) => `  ${i + 1}  ${h}`).join('\n');
        break;

      case 'voice on':
        setSound(true);
        output = 'AI Synthesizer: Voice narration enabled.';
        break;

      case 'voice off':
        setSound(false);
        output = 'AI Synthesizer: Voice narration muted.';
        break;

      // Easter Eggs
      case 'matrix':
        setIsMatrixActive(!isMatrixActive);
        output = isMatrixActive ? 'Matrix Rain Terminated.' : 'Initializing Matrix Digital Rain Protocol...';
        break;

      case 'jarvis':
        play('achievement');
        output = 'System Core (J.A.R.V.I.S.): "Welcome home, sir. Harsha is ready to build something remarkable today."';
        break;

      case 'developer':
        output = `System Specifications:
  Host OS      : Windows (x86_64)
  Runtime      : Node.js / React 19 / Next.js 16
  Hardware Cores: ${typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 8 : 8} Cores
  Renderer     : WebGL 2.0 (Three.js GPU-Accelerated)
  Location Lat : Latency 12ms (Hyderabad Server)`;
        break;

      case 'konami':
        play('success');
        output = 'CHEAT DETECTED: Unlimited energy unlocked. Developer motivation parameter scaled to 999%.';
        break;

      case 'future':
        output = `Career Outlook v2030:
  Korivi Harsha Vardhan is leading an advanced AI Engineering branch, deploying federated learning models across low-latency edge nodes. His clean Python foundations have scaled into high-volume neural pipelines. Status: Available to hire now.`;
        break;

      case 'hire':
        play('success');
        output = `Hiring Protocol Initiated:
  Candidate Name: Korivi Harsha Vardhan
  Core Value    : Fast learner, clean python code, deep AI/ML specializations.
  Decision Matrix: APPROVED.
  Action        : Please scroll down to the Contact form or email him at
                  koriviharshavardhan129@gmail.com.
                  Let's make something amazing.`;
        break;

      default:
        output = `Command not recognized: "${cmdClean}". Type "help" to view system options.`;
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, output, isHtml }]);
    setInputVal('');
  };

  // Autocomplete suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const commands = [
        'about', 'skills', 'projects', 'education', 'certificates', 'strengths', 
        'contact', 'github', 'linkedin', 'resume', 'voice on', 'voice off', 'clear', 
        'help', 'history', 'matrix', 'jarvis', 'developer', 'konami', 'future', 'hire'
      ];
      const match = commands.find(c => c.startsWith(inputVal.toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInputVal(cmdHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(newIndex);
        setInputVal(cmdHistory[newIndex]);
      }
    }
  };

  return (
    <section 
      id="terminal"
      className="relative py-28 w-full border-t border-white/5 bg-[#0B1120]/30"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
      
      <div className="w-full max-w-[1024px] px-6 sm:px-12 mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-[0.2em] uppercase mb-2">
            <span>MODULE 07</span>
            <span className="w-8 h-[1px] bg-[#00E5FF]/30" />
            <span className="animate-pulse">Active</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase font-sans">
            INTERACTIVE SHELL
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] mt-4" />
        </div>

        {/* Terminal Window frame */}
        <div 
          onClick={handleTerminalFocus}
          className="w-full h-[450px] glass-panel-heavy border border-white/10 rounded-[24px] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-text pointer-events-auto"
        >
          {/* Title Bar */}
          <div className="bg-[#04070B] border-b border-white/5 px-5 py-3 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-[#00E5FF]" />
              <span className="font-mono text-xs font-bold text-[#B8C1CC] tracking-wider">harsha@os-2030:~</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC857] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84] opacity-80" />
            </div>
          </div>

          {/* Output logs content */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-[#B8C1CC] space-y-4 relative scroll-smooth">
            
            {/* Matrix digital rain simulation inside console */}
            {isMatrixActive && (
              <div className="absolute inset-0 bg-[#04070B]/90 z-20 overflow-hidden text-[#00FFA3] flex flex-col justify-start leading-none opacity-40 p-4 select-none pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex justify-around w-full" style={{ animationDelay: `${i * 150}ms` }}>
                    {Array.from({ length: 25 }).map((_, j) => (
                      <span key={j}>{String.fromCharCode(33 + Math.floor(Math.random() * 90))}</span>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {history.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2.5 text-white/95">
                  <span className="text-[#00E5FF] font-bold">harsha@os:~$</span>
                  <span>{item.command}</span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-[#B8C1CC] border-l-2 border-[#00E5FF]/20 pl-3">
                  {item.output}
                </div>
              </div>
            ))}
            
            {/* Blinking input prompt */}
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-2.5 text-white/95 pt-2">
              <span className="text-[#00E5FF] font-bold">harsha@os:~$</span>
              <div className="flex-1 flex items-center relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none border-none text-[#00E5FF] font-mono text-xs caret-transparent"
                  autoComplete="off"
                  spellCheck="false"
                />
                {/* Custom glowing blinking cursor simulation */}
                <div 
                  className="absolute pointer-events-none font-mono text-xs text-[#00E5FF] terminal-cursor"
                  style={{
                    left: `${inputVal.length * 7.2}px`, // approximate monospace width per char
                    top: '-1px'
                  }}
                />
              </div>
            </form>
            <div ref={terminalEndRef} />
          </div>

          {/* Quick HUD controls footer */}
          <div className="bg-[#04070B]/80 border-t border-white/5 px-5 py-2 flex items-center justify-between select-none text-[9.5px] font-mono text-[#6B7280]">
            <span>Tab: Autocomplete</span>
            <span>Up/Down: Command History</span>
            <span className="text-[#00E5FF]">System Ready</span>
          </div>
        </div>

      </div>
    </section>
  );
};
