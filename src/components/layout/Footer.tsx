'use client';

import React from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { personalInfo } from '@/lib/data';
import { Mail } from 'lucide-react';
import { LinkedinIcon as Linkedin, GithubIcon as Github } from '@/components/ui/CustomIcons';

export const Footer: React.FC = () => {
  const { play } = useSound();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    play('click');
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#04070B] border-t border-white/5 py-12 select-none">
      <div className="w-full max-w-[1280px] px-6 sm:px-12 md:px-16 mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
        
        {/* Left Side: Brand name and tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#7B61FF] flex items-center justify-center">
              <span className="font-extrabold text-white text-[9px]">HV</span>
            </div>
            <span className="font-sans font-bold text-xs tracking-wider text-white">
              HARSHA 2030
            </span>
          </div>
          <p className="text-[10px] text-[#6B7280] font-mono tracking-wide mt-1">
            "The Future of Intelligent Engineering."
          </p>
        </div>

        {/* Middle Section: Footer Navigation links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase text-[#6B7280]">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} onMouseEnter={() => play('hover')} className="hover:text-[#00E5FF] transition-colors">Home</a>
          <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} onMouseEnter={() => play('hover')} className="hover:text-[#00E5FF] transition-colors">About</a>
          <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} onMouseEnter={() => play('hover')} className="hover:text-[#00E5FF] transition-colors">Skills</a>
          <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} onMouseEnter={() => play('hover')} className="hover:text-[#00E5FF] transition-colors">Projects</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} onMouseEnter={() => play('hover')} className="hover:text-[#00E5FF] transition-colors">Contact</a>
        </nav>

        {/* Right Side: Copyright & System Core stats */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 font-mono text-[9px] text-[#6B7280]">
          <span>© {new Date().getFullYear()} Korivi Harsha Vardhan.</span>
          <span>ALL SYSTEMS OPERATIONAL // LATENCY 12ms</span>
        </div>

      </div>
    </footer>
  );
};
