'use client';

import React, { useState, useEffect } from 'react';
import { SoundProvider } from '@/components/providers/SoundProvider';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { SoundModal } from '@/components/ui/SoundModal';
import { Preloader } from '@/components/loader/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { EducationTimeline } from '@/components/education/EducationTimeline';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { CertificatesSection } from '@/components/certificates/CertificatesSection';
import { AchievementsSection } from '@/components/achievements/AchievementsSection';
import { InteractiveTerminal } from '@/components/terminal/InteractiveTerminal';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { AIAssistant } from '@/components/ai-assistant/AIAssistant';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showSoundModal, setShowSoundModal] = useState(false);
  const [bootSequenceActive, setBootSequenceActive] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    // Check if the user has already set sound permissions
    const soundPref = localStorage.getItem('harsha_os_audio');
    
    if (soundPref === null) {
      // First visit -> show permission modal
      setShowSoundModal(true);
    } else {
      // Returning visitor -> skip sound prompt, jump straight to boot sequence
      setBootSequenceActive(true);
    }
  }, []);

  useEffect(() => {
    if (appReady && typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [appReady]);

  const handleSoundModalDismiss = () => {
    setShowSoundModal(false);
    setBootSequenceActive(true);
  };

  const handlePreloaderComplete = () => {
    setBootSequenceActive(false);
    setAppReady(true);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <SoundProvider>
      <LenisProvider>
        {/* Custom cursor overlay */}
        <CustomCursor />
        
        {/* Ctrl+K search palette */}
        <CommandPalette />

        <AnimatePresence mode="wait">
          {/* Phase 1: Voice/Sound permission check */}
          {showSoundModal && (
            <SoundModal key="sound-modal" onDismiss={handleSoundModalDismiss} />
          )}

          {/* Phase 2: OS Boot Loader Sequence */}
          {bootSequenceActive && (
            <Preloader key="preloader" onComplete={handlePreloaderComplete} />
          )}

          {/* Phase 3: Core Operating System Layout */}
          {appReady && (
            <motion.div
              key="app-main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative min-h-screen w-full flex flex-col"
            >
              {/* Floating Header */}
              <Navbar />

              {/* Core Layout Sections */}
              <main className="flex-1 w-full flex flex-col">
                <HeroSection />
                <AboutSection />
                <EducationTimeline />
                <SkillsSection />
                <ProjectsSection />
                <CertificatesSection />
                <AchievementsSection />
                <InteractiveTerminal />
                <ContactSection />
              </main>

              {/* OS Footer */}
              <Footer />

              {/* Floating Bottom Right AI Companion */}
              <AIAssistant />
            </motion.div>
          )}
        </AnimatePresence>
      </LenisProvider>
    </SoundProvider>
  );
}
