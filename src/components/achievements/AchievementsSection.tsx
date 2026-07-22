'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { leadership, strengths } from '@/lib/data';
import { motion, useInView } from 'framer-motion';
import { Users, Award, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { play, narrate } = useSound();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [voiced, setVoiced] = useState(false);

  useEffect(() => {
    if (isInView && !voiced) {
      setVoiced(true);
      play('achievement');
      narrate("I believe consistent learning and practical project development are the foundation of becoming an excellent software engineer.");
    }
  }, [isInView, voiced, narrate, play]);

  // Achievement metrics counters
  const counters = [
    { label: 'Completed Projects', val: 2 },
    { label: 'Verified Certificates', val: 6 },
    { label: 'Core Languages', val: 4 },
    { label: 'AI/ML Technologies', val: 8 },
    { label: 'Years Study', val: 4 }
  ];

  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className="relative py-28 w-full border-t border-white/5 bg-[#04070B]"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7B61FF]/3 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1280px] px-6 sm:px-12 md:px-16 mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-[0.2em] uppercase mb-2">
            <span>MODULE 06</span>
            <span className="w-8 h-[1px] bg-[#00E5FF]/30" />
            <span className="animate-pulse">Active</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase font-sans">
            ACHIEVEMENTS & LEADERSHIP
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pointer-events-auto">
          
          {/* Left Column: Event Coordination / Leadership Card */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono text-[#6B7280] tracking-widest uppercase mb-4 block">
              Leadership Core
            </span>
            
            <div 
              onMouseEnter={() => play('hover')}
              className="glass-panel p-6 sm:p-8 rounded-[24px] border border-white/5 shadow-md relative overflow-hidden group hover:border-[#00FFA3]/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FFA3]/5 rounded-bl-[100px] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-white/3 border border-white/5 text-[#00FFA3]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {leadership.title}
                    </h3>
                    <span className="font-mono text-[10.5px] text-[#6B7280]">
                      {leadership.event}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#B8C1CC] leading-relaxed mb-6 font-sans">
                {leadership.description}
              </p>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">
                  Skills Deployed
                </span>
                <div className="flex flex-wrap gap-2">
                  {leadership.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="py-1 px-2.5 rounded-lg text-[10px] font-mono bg-[#0B1120]/80 border border-white/5 text-[#B8C1CC]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Strengths and stats metrics */}
          <div className="lg:col-span-7 space-y-8">
            {/* Strengths list */}
            <div>
              <span className="text-xs font-mono text-[#6B7280] tracking-widest uppercase mb-4 block">
                Professional Strengths Index
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengths.map((strength, i) => (
                  <motion.div
                    key={strength}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    onMouseEnter={() => play('hover')}
                    className="p-4 bg-white/3 border border-white/5 rounded-2xl flex items-start gap-3 hover:border-[#00E5FF]/20 hover:bg-white/5 hover:shadow-[0_4px_15px_rgba(0,229,255,0.05)] transition-all duration-300 cursor-default"
                  >
                    <div className="mt-0.5 text-[#00E5FF]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#B8C1CC] font-sans font-medium">
                      {strength}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Metrics HUD */}
            <div className="border-t border-white/5 pt-8">
              <span className="text-xs font-mono text-[#6B7280] tracking-widest uppercase mb-4 block">
                Quantified Skill Output Metrics
              </span>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {counters.map((c) => (
                  <div 
                    key={c.label}
                    className="bg-white/3 border border-white/5 p-3 rounded-xl text-center flex flex-col gap-1 hover:border-[#7B61FF]/20 transition-colors"
                  >
                    <span className="text-lg font-bold font-mono text-[#7B61FF] glow-text-secondary">
                      0{c.val}+
                    </span>
                    <span className="text-[9px] text-[#6B7280] font-mono uppercase tracking-wider leading-snug">
                      {c.label.split(' ')[1] || c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
