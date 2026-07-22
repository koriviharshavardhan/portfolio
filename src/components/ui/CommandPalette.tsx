'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { personalInfo } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, FileText, Volume2, X, Command } from 'lucide-react';
import { LinkedinIcon as Linkedin, GithubIcon as Github } from '@/components/ui/CustomIcons';

interface PaletteItem {
  name: string;
  category: string;
  action: () => void;
  icon: React.ReactNode;
}

export const CommandPalette: React.FC = () => {
  const { play, setSound, soundEnabled } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: PaletteItem[] = [
    { name: 'Navigate: Home Section', category: 'Navigation', icon: <Compass className="w-4 h-4" />, action: () => scrollToId('#home') },
    { name: 'Navigate: About Profile', category: 'Navigation', icon: <Compass className="w-4 h-4" />, action: () => scrollToId('#about') },
    { name: 'Navigate: Education History', category: 'Navigation', icon: <Compass className="w-4 h-4" />, action: () => scrollToId('#education') },
    { name: 'Navigate: Technical Arsenal', category: 'Navigation', icon: <Compass className="w-4 h-4" />, action: () => scrollToId('#skills') },
    { name: 'Navigate: Engineering Projects', category: 'Navigation', icon: <Compass className="w-4 h-4" />, action: () => scrollToId('#projects') },
    { name: 'Navigate: Certification Vault', category: 'Navigation', icon: <Compass className="w-4 h-4" />, action: () => scrollToId('#certificates') },
    { name: 'Navigate: Achievements & Strengths', category: 'Navigation', icon: <Compass className="w-4 h-4" />, action: () => scrollToId('#achievements') },
    { name: 'Navigate: Mission Control (Contact)', category: 'Navigation', icon: <Compass className="w-4 h-4" />, action: () => scrollToId('#contact') },
    
    { name: 'System: Download PDF Resume', category: 'Utilities', icon: <FileText className="w-4 h-4 text-[#00FFA3]" />, action: () => openLink('/resume.pdf') },
    { name: 'System: Connect GitHub Codebase', category: 'Utilities', icon: <Github className="w-4 h-4 text-[#7B61FF]" />, action: () => openLink(personalInfo.github) },
    { name: 'System: Connect LinkedIn Profile', category: 'Utilities', icon: <Linkedin className="w-4 h-4 text-[#00E5FF]" />, action: () => openLink(personalInfo.linkedin) },
    { name: `System: Toggle Voice Audio (${soundEnabled ? 'Mute' : 'Enable'})`, category: 'Utilities', icon: <Volume2 className="w-4 h-4" />, action: () => toggleSound() },
  ];

  const scrollToId = (id: string) => {
    setIsOpen(false);
    const target = document.querySelector(id);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const openLink = (url: string) => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const toggleSound = () => {
    setSound(!soundEnabled);
    setIsOpen(false);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        play('click');
        setIsOpen(prev => !prev);
        setSearch('');
        setActiveIndex(0);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [play]);

  // Handle focus when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard navigation inside list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        play('click');
        filteredItems[activeIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] bg-black/75 backdrop-blur-md flex justify-center p-4 pt-[15vh]">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass-panel-heavy max-w-xl w-full h-[380px] rounded-[24px] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden pointer-events-auto"
            onKeyDown={handleListKeyDown}
          >
            {/* Scanline */}
            <div className="scan-line" />

            {/* Input Header */}
            <div className="bg-[#04070B] border-b border-white/5 p-4 flex items-center gap-3 relative select-none">
              <Search className="w-4 h-4 text-[#6B7280]" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search commands, links, navigation..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-[#6B7280]"
              />
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] px-1.5 py-0.5 border border-white/10 bg-white/5 text-[#6B7280] rounded">ESC</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-white/5 text-[#6B7280] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Suggestions list */}
            <div className="flex-1 p-3 overflow-y-auto space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-[#6B7280]">
                  No system matches found.
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <div
                    key={item.name}
                    onClick={() => {
                      play('click');
                      item.action();
                    }}
                    onMouseEnter={() => {
                      play('hover');
                      setActiveIndex(index);
                    }}
                    className={`p-3.5 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-150 ${
                      index === activeIndex
                        ? 'bg-gradient-to-r from-[#00E5FF]/10 to-[#7B61FF]/10 border border-[#00E5FF]/20 text-white shadow-sm'
                        : 'bg-transparent border border-transparent text-[#B8C1CC]'
                    }`}
                  >
                    <div className="flex items-center gap-3 font-mono text-xs">
                      {item.icon}
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B7280]">
                      {item.category}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="bg-[#04070B]/90 border-t border-white/5 px-5 py-2.5 flex items-center justify-between text-[9px] font-mono text-[#6B7280] select-none">
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3 text-[#00E5FF]" /> Keyboard Navigation Enabled
              </span>
              <span>↑↓: Navigate  //  Enter: Select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
