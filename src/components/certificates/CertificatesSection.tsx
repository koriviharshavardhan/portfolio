'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { certifications, CertificateItem } from '@/lib/data';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Award, ShieldCheck, X, AwardIcon, Compass, Sparkles } from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  const { play, narrate } = useSound();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [voiced, setVoiced] = useState(false);

  useEffect(() => {
    if (isInView && !voiced) {
      setVoiced(true);
      narrate("My certifications reflect continuous learning across AI, software development, Python, SQL, and Java.");
    }
  }, [isInView, voiced, narrate]);

  // Handle ESC close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="certificates" 
      ref={sectionRef}
      className="relative py-28 w-full border-t border-white/5 bg-[#0B1120]/30"
    >
      <div className="absolute inset-0 holo-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-[#00E5FF]/3 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1280px] px-6 sm:px-12 md:px-16 mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-[0.2em] uppercase mb-2">
            <span>MODULE 05</span>
            <span className="w-8 h-[1px] bg-[#00E5FF]/30" />
            <span className="animate-pulse">Active</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase font-sans">
            CERTIFICATION VAULT
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] mt-4" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => {
                play('click');
                setSelectedCert(cert);
              }}
              onMouseEnter={() => play('hover')}
              className="glass-card p-6 flex flex-col justify-between border border-white/5 hover:border-[#7B61FF]/30 hover:shadow-[0_12px_25px_-5px_rgba(123,97,255,0.06)] cursor-pointer relative overflow-hidden group h-64"
            >
              {/* Corner Glowing Mesh */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#7B61FF]/3 rounded-bl-full pointer-events-none group-hover:bg-[#00E5FF]/10 transition-colors" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white/3 border border-white/5 text-[#7B61FF] group-hover:text-[#00E5FF] group-hover:border-[#00E5FF]/20 transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#6B7280] group-hover:text-[#00FFA3] transition-colors">
                    {cert.year}
                  </span>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-white tracking-wide mb-1.5 leading-snug line-clamp-2 group-hover:text-[#00E5FF] transition-colors">
                    {cert.title}
                  </h3>
                  <span className="font-mono text-[10.5px] text-[#B8C1CC] font-semibold">
                    {cert.issuer}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#6B7280] leading-relaxed line-clamp-2 border-t border-white/5 pt-3.5 mt-2.5 group-hover:text-[#B8C1CC] transition-colors">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Certificate Inspection Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-panel-heavy max-w-md w-full p-8 rounded-[28px] border border-white/10 shadow-[0_0_50px_rgba(123,97,255,0.15)] text-center relative pointer-events-auto"
            >
              {/* Scanline */}
              <div className="scan-line" />

              <button
                onClick={() => {
                  play('click');
                  setSelectedCert(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#FF4D6D]/40 text-[#B8C1CC] hover:text-[#FF4D6D] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 relative">
                  <ShieldCheck className="h-10 w-10 text-[#00FFA3]" />
                  <div className="absolute inset-0 rounded-full border border-[#00FFA3]/30 animate-ping pointer-events-none" />
                </div>
              </div>

              <h2 className="text-xl font-bold font-sans text-white tracking-wide mb-1 leading-snug">
                {selectedCert.title}
              </h2>
              <p className="text-[#00E5FF] text-xs font-mono tracking-widest uppercase mb-6">
                VERIFIED CREDENTIAL
              </p>

              <div className="text-left font-sans text-[#B8C1CC] text-xs space-y-3 mb-8 bg-black/35 p-4 rounded-xl border border-white/5">
                <p className="flex items-start gap-2.5">
                  <span className="text-[#00E5FF] font-mono">▸</span>
                  <span>Credential Issuer: <strong className="text-white">{selectedCert.issuer}</strong></span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-[#00E5FF] font-mono">▸</span>
                  <span>Issued Date: <strong className="text-white">{selectedCert.year}</strong></span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-[#00E5FF] font-mono">▸</span>
                  <span>Verification Status: <strong className="text-[#3DDC84]">100% Authentic</strong></span>
                </p>
                <div className="text-[11px] text-[#6B7280] leading-relaxed border-t border-white/5 pt-3 mt-3">
                  {selectedCert.description}
                </div>
              </div>

              <button
                onClick={() => {
                  play('click');
                  setSelectedCert(null);
                }}
                className="w-full btn-primary py-3 px-6 flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold tracking-wider uppercase text-white shadow-md active:scale-95"
              >
                Close Verification
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
