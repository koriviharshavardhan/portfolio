'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSound } from '@/components/providers/SoundProvider';
import { personalInfo, personalityTraits } from '@/lib/data';
import { motion, useInView } from 'framer-motion';
import { Quote, Layers, Check, Award, BookOpen, Clock } from 'lucide-react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, suffix = '', label, icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = value / (duration / 16); // ~60fps
    let timer: NodeJS.Timeout;

    const run = () => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    };

    timer = setInterval(run, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div 
      ref={ref}
      className="bg-white/3 border border-white/5 p-4 rounded-2xl flex items-center gap-3.5 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:border-[#00E5FF]/20 hover:bg-white/5 transition-all duration-300"
    >
      <div className="p-3 rounded-xl bg-white/5 text-[#00E5FF] border border-white/5">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold font-mono text-white tracking-tight">
          {count < 10 ? `0${count}` : count}{suffix}
        </span>
        <span className="text-[10px] text-[#6B7280] font-mono tracking-widest uppercase mt-0.5">{label}</span>
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const { play, narrate } = useSound();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const [voiced, setVoiced] = useState(false);

  // Auto trigger narration voice when About enters viewport
  useEffect(() => {
    if (titleInView && !voiced) {
      setVoiced(true);
      narrate(
        "Hello. I am Korivi Harsha Vardhan. I am passionate about building intelligent software that combines Artificial Intelligence with practical software engineering. I enjoy solving real-world problems through technology while continuously learning modern tools."
      );
    }
  }, [titleInView, voiced, narrate]);

  return (
    <section 
      id="about"
      className="relative py-20 sm:py-28 w-full overflow-hidden border-t border-white/5 bg-[#0B1120]/30 scroll-mt-28"
    >
      {/* Visual background lines */}
      <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#7B61FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#00E5FF]/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1280px] px-4 sm:px-12 md:px-16 mx-auto relative z-10">
        
        {/* Module Header */}
        <div ref={titleRef} className="mb-12 sm:mb-16 pt-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-[0.2em] uppercase mb-2">
            <span>MODULE 01</span>
            <span className="w-8 h-[1px] bg-[#00E5FF]/30" />
            <span className="animate-pulse">Active</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase font-sans">
            ABOUT THE ENGINEER
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] mt-3 sm:mt-4" />
        </div>

        {/* Desktop 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Holographic Portrait Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[28px] p-1 bg-gradient-to-tr from-[#00E5FF]/30 to-[#7B61FF]/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] float-element flex items-center justify-center group cursor-pointer"
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00E5FF]/40 rounded-tl" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00E5FF]/40 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00E5FF]/40 rounded-bl" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00E5FF]/40 rounded-br" />

              <div className="absolute inset-0 rounded-[28px] overflow-hidden z-10 pointer-events-none">
                {/* Scanner bar */}
                <div className="scan-line" />
              </div>

              {/* Photo inside: Color by default, changes to Black & White on action (hover/tap) */}
              <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black/60 border border-white/10">
                <Image
                  src="/profile.jpg"
                  alt="Korivi Harsha Vardhan"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover object-center grayscale-0 group-hover:grayscale transition-all duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating name badge inside frame */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0B1120]/90 border border-white/10 p-2.5 rounded-xl backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#00E5FF] tracking-widest uppercase">System Core Owner</div>
                    <div className="text-xs font-bold text-white tracking-wide mt-0.5">KORIVI HARSHA VARDHAN</div>
                  </div>
                  <span className="text-[8px] font-mono text-[#00FFA3] bg-[#00FFA3]/10 border border-[#00FFA3]/30 px-1.5 py-0.5 rounded uppercase">
                    COLOR ➔ B&W
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#00E5FF] font-sans tracking-wide">
                Who Am I?
              </h3>
              <p className="text-[#B8C1CC] text-sm sm:text-base leading-relaxed font-sans">
                I am a recently graduated Computer Science Engineer specializing in **Artificial Intelligence and Machine Learning** from Malla Reddy College of Engineering and Technology. With a deep passion for intelligent computing, I design systems that combine complex model mechanics with clean, high-performance software structures.
              </p>
              <p className="text-[#B8C1CC] text-sm sm:text-base leading-relaxed font-sans">
                My technical foundations reside heavily in the Python ecosystem, spanning machine learning regression tasks to deep-learning computer vision projects. I operate under the design philosophy that backend neural model precision must align with elegant, responsive, and intuitive interface layouts.
              </p>
            </motion.div>

            {/* Floating Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onMouseEnter={() => play('hover')}
              className="glass-card p-5 relative border border-white/5 flex gap-4 overflow-hidden"
            >
              <div className="text-[#7B61FF] opacity-35">
                <Quote className="w-8 h-8 transform scale-x-[-1]" />
              </div>
              <div className="flex flex-col">
                <p className="text-white text-xs sm:text-sm font-medium italic leading-relaxed">
                  "I believe technology should solve real problems, not create unnecessary complexity."
                </p>
                <span className="text-[10px] font-mono text-[#6B7280] tracking-wider uppercase mt-2">— Engineering Mantra</span>
              </div>
            </motion.div>

            {/* Personality Traits Chips */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono text-[#6B7280] tracking-widest uppercase">System Personality Vector</span>
              <div className="flex flex-wrap gap-2">
                {personalityTraits.map((trait) => (
                  <div
                    key={trait}
                    onMouseEnter={() => play('hover')}
                    className="py-1.5 px-3.5 rounded-full text-xs font-medium tracking-wide bg-white/3 border border-white/5 text-[#B8C1CC] hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300 cursor-default hover:-translate-y-0.5 shadow-sm"
                  >
                    {trait}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Counter Stats Panels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          <StatCounter 
            value={2} 
            suffix="+" 
            label="Key Projects" 
            icon={<Layers className="w-5 h-5" />} 
          />
          <StatCounter 
            value={6} 
            suffix="+" 
            label="Certifications" 
            icon={<Award className="w-5 h-5" />} 
          />
          <StatCounter 
            value={4} 
            suffix="+" 
            label="Languages" 
            icon={<BookOpen className="w-5 h-5" />} 
          />
          <StatCounter 
            value={4} 
            suffix="+" 
            label="Years Study" 
            icon={<Clock className="w-5 h-5" />} 
          />
        </div>

      </div>
    </section>
  );
};
