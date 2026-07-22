'use client';

import React, { useState, useEffect } from 'react';
import { HeroBackground } from './HeroBackground';
import { ProfilePresentation } from './ProfilePresentation';
import { StatusPanel } from './StatusPanel';
import { StackPanel } from './StackPanel';
import { useSound } from '@/components/providers/SoundProvider';
import { personalInfo } from '@/lib/data';
import { FileText, ArrowDown, Mail } from 'lucide-react';
import { LinkedinIcon as Linkedin, GithubIcon as Github } from '@/components/ui/CustomIcons';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { play } = useSound();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = personalInfo.roles;
  const nameLetters = personalInfo.name.split('');

  // Typing effect loop for roles
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(90);

        if (currentText === fullText) {
          // Pause at peak
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  const handleExploreClick = () => {
    play('click');
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* 3D Background Canvas Layer */}
      <HeroBackground />

      <div className="w-full max-w-[1440px] px-6 sm:px-12 md:px-16 lg:px-24 mx-auto flex flex-col items-center justify-between min-h-[calc(100vh-8rem)] relative z-10 pointer-events-none">
        
        {/* Core Layout Grid */}
        <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6 lg:mt-0">
          
          {/* Left: Stack Info - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:col-span-3 lg:flex justify-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 1.5, ease: 'easeOut' }}
            >
              <StackPanel />
            </motion.div>
          </div>

          {/* Center: Profile Presentation, Name, Title, Action buttons */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center text-center">
            
            {/* Hologram Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto mb-6"
            >
              <ProfilePresentation />
            </motion.div>

            {/* Name Word-by-Word Letter Animation */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white mb-3 uppercase flex flex-col items-center font-sans">
              <span className="inline-block whitespace-nowrap">
                {"KORIVI".split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ 
                      duration: 0.65, 
                      delay: 0.8 + charIndex * 0.04, 
                      ease: 'easeOut' 
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="inline-block whitespace-nowrap mt-1">
                {"HARSHA VARDHAN".split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ 
                      duration: 0.65, 
                      delay: 0.8 + ("KORIVI".length + charIndex) * 0.04, 
                      ease: 'easeOut' 
                    }}
                    className={char === ' ' ? 'mr-3' : 'inline-block'}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Typing Subtitle */}
            <div className="h-8 mb-5 flex items-center justify-center font-mono text-[#00E5FF] text-sm sm:text-base tracking-widest uppercase glow-text-primary">
              <span>{currentText}</span>
              <span className="w-[2px] h-5 bg-[#00E5FF] ml-1 animate-pulse" />
            </div>

            {/* Short Bio Intro */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-[#B8C1CC] max-w-lg text-sm sm:text-base leading-relaxed mb-8 font-sans"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Actions Button Group */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
            >
              <button
                onClick={handleExploreClick}
                onMouseEnter={() => play('hover')}
                className="btn-primary py-3.5 px-7 cursor-pointer text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all"
              >
                Explore Projects
              </button>

              <a
                href="/resume.pdf"
                download="Korivi_Harsha_Vardhan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => play('hover')}
                onClick={() => play('click')}
                className="btn-secondary py-3.5 px-6 flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold tracking-wider uppercase"
              >
                <FileText className="w-4 h-4 text-[#00E5FF]" />
                Resume PDF
              </a>
            </motion.div>

            {/* Quick Contact Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.2 }}
              className="flex items-center gap-4 mt-8 pointer-events-auto"
            >
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => play('click')}
                onMouseEnter={() => play('hover')}
                className="p-2 rounded-full border border-white/5 bg-white/5 hover:border-[#00E5FF]/40 text-[#B8C1CC] hover:text-[#00E5FF] transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => play('click')}
                onMouseEnter={() => play('hover')}
                className="p-2 rounded-full border border-white/5 bg-white/5 hover:border-[#7B61FF]/40 text-[#B8C1CC] hover:text-[#7B61FF] transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                onClick={() => play('click')}
                onMouseEnter={() => play('hover')}
                className="p-2 rounded-full border border-white/5 bg-white/5 hover:border-[#00FFA3]/40 text-[#B8C1CC] hover:text-[#00FFA3] transition-all"
                title="Email Harsha"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>

          </div>

          {/* Right: Live Status - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:col-span-3 lg:flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 1.5, ease: 'easeOut' }}
            >
              <StatusPanel />
            </motion.div>
          </div>
        </div>

        {/* Collapsed panels for mobile/tablet screen widths */}
        <div className="lg:hidden flex flex-col md:flex-row gap-6 w-full max-w-xl mx-auto mt-12 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <StackPanel />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <StatusPanel />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center mt-12 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              delay: 2.5, 
              repeat: Infinity, 
              repeatType: 'reverse' 
            }}
            onClick={handleExploreClick}
            className="flex flex-col items-center gap-1.5 cursor-pointer text-[#6B7280] hover:text-[#00E5FF] transition-colors"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase">Scroll to Continue</span>
            <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 bg-[#00E5FF] rounded-full"
              />
            </div>
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
