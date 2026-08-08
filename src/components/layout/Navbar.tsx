'use client';

import React, { useState, useEffect } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { personalInfo } from '@/lib/data';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  FileText,
  Lock,
  Compass
} from 'lucide-react';
import { LinkedinIcon as Linkedin, GithubIcon as Github } from '@/components/ui/CustomIcons';

export const Navbar: React.FC = () => {
  const { soundEnabled, setSound, play } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    play('click');
    setMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleVoice = () => {
    play('click');
    setSound(!soundEnabled);
  };

  return (
    <>
      <header 
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1280px] z-[999] rounded-[28px] border transition-all duration-500 ease-out ${
          scrolled 
            ? 'bg-[#0B1120]/75 border-white/15 backdrop-blur-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] py-3 px-6' 
            : 'bg-transparent border-white/5 backdrop-blur-none py-5 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            onMouseEnter={() => play('hover')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#7B61FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300 group-hover:rotate-[5deg] group-hover:scale-105">
              <span className="font-extrabold text-white text-xs select-none">HV</span>
            </div>
            <span className="font-sans font-bold text-sm tracking-widest text-white group-hover:text-[#00E5FF] transition-colors">
              HARSHA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => play('hover')}
                className="relative py-2 px-3 text-xs tracking-wider uppercase font-semibold text-[#B8C1CC] hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] transition-all duration-300 group-hover:w-2/3" />
              </a>
            ))}
          </nav>

          {/* Controls & Quick Links */}
          <div className="flex items-center gap-3">
            {/* Social & Resume Links - Desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => play('hover')}
                onClick={() => play('click')}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-[#B8C1CC] hover:text-white hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => play('hover')}
                onClick={() => play('click')}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-[#B8C1CC] hover:text-white hover:border-[#7B61FF]/40 hover:bg-[#7B61FF]/5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(123,97,255,0.2)]"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="/resume.pdf"
                download="Korivi_Harsha_Vardhan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => play('hover')}
                onClick={() => play('click')}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-[#B8C1CC] hover:text-white hover:border-[#00FFA3]/40 hover:bg-[#00FFA3]/5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,163,0.2)]"
                title="Download Resume"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

            {/* Futuristic Theme Lock Indicator */}
            <button
              onMouseEnter={() => play('hover')}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-[#6B7280] hover:text-[#00E5FF] transition-all cursor-not-allowed group relative"
              title="System Locked to Dark Theme"
            >
              <Lock className="w-4 h-4" />
              <span className="absolute bottom-[-45px] left-1/2 -translate-x-1/2 bg-black border border-white/10 rounded px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Optimized for Deep Space Mode
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleVoice}
              onMouseEnter={() => play('hover')}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                soundEnabled 
                  ? 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]' 
                  : 'bg-white/5 border-white/10 text-[#6B7280] hover:text-[#B8C1CC]'
              }`}
              title={soundEnabled ? "Mute Experience" : "Enable Sound"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Command Palette Button Indicator */}
            <div className="hidden md:flex items-center gap-1 bg-black/40 border border-white/5 rounded-xl px-2.5 py-1.5 font-mono text-[10px] text-[#6B7280]">
              <span className="text-[#B8C1CC]">⌘K</span>
              <span>Palette</span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                play('click');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              onMouseEnter={() => play('hover')}
              className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-[#B8C1CC] hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[998] bg-[#04070B]/95 backdrop-blur-lg flex flex-col justify-center items-center gap-6 lg:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="absolute top-24 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00E5FF] to-[#7B61FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)]">
            <span className="font-extrabold text-white text-base">HV</span>
          </div>
          <span className="font-mono text-xs tracking-widest text-[#00E5FF] uppercase">Harsha 2030</span>
        </div>

        <nav className="flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              onMouseEnter={() => play('hover')}
              className="text-lg font-bold tracking-widest uppercase text-[#B8C1CC] hover:text-[#00E5FF] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Socials & Resume - Mobile Drawer Bottom */}
        <div className="flex items-center gap-4 mt-8 border-t border-white/5 pt-8 w-2/3 justify-center">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => play('click')}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[#B8C1CC] hover:text-white"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => play('click')}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[#B8C1CC] hover:text-white"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="/resume.pdf"
            download="Korivi_Harsha_Vardhan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => play('click')}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[#B8C1CC] hover:text-white"
          >
            <FileText className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};
