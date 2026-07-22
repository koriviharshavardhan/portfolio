'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { education } from '@/lib/data';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

export const EducationTimeline: React.FC = () => {
  const { play, narrate } = useSound();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [voiced, setVoiced] = useState(false);

  useEffect(() => {
    if (isInView && !voiced) {
      setVoiced(true);
      narrate("My academic journey provided a strong foundation in Artificial Intelligence, Machine Learning, and software development.");
    }
  }, [isInView, voiced, narrate]);

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="relative py-28 w-full overflow-hidden border-t border-white/5 bg-[#04070B]"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/3 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1024px] px-6 sm:px-12 mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-[0.2em] uppercase mb-2">
            <span>MODULE 02</span>
            <span className="w-8 h-[1px] bg-[#00E5FF]/30" />
            <span className="animate-pulse">Active</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase font-sans">
            ENGINEERING JOURNEY
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 md:ml-32 py-4 space-y-12">
          
          {/* Neon vertical glowing track overlay */}
          <div className="absolute top-0 bottom-0 left-[-1.5px] w-[3px] bg-gradient-to-b from-[#00E5FF] via-[#7B61FF] to-[#00FFA3] shadow-[0_0_10px_#00E5FF]" />

          {education.map((item, index) => {
            // Check if it is B.Tech (current/latest milestone)
            const isBTech = item.degree.includes('Bachelor');

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative pl-8 sm:pl-12 group"
              >
                {/* Timeline Orb Connection Indicator */}
                <div 
                  className={`absolute left-[-9px] top-4 w-[18px] h-[18px] rounded-full border-2 bg-[#04070B] flex items-center justify-center transition-all duration-300 z-10 ${
                    isBTech 
                      ? 'border-[#00E5FF] shadow-[0_0_15px_#00E5FF] scale-125' 
                      : 'border-[#7B61FF] group-hover:border-[#00E5FF] group-hover:shadow-[0_0_8px_#00E5FF]'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isBTech ? 'bg-[#00E5FF] animate-ping' : 'bg-[#7B61FF]'}`} />
                </div>

                {/* Floating Year Tag on Left (Large Screens only) */}
                <div className="absolute left-[-115px] top-3.5 hidden md:block w-20 text-right">
                  <span className={`font-mono text-sm font-bold tracking-wider ${isBTech ? 'text-[#00E5FF] glow-text-primary' : 'text-[#6B7280]'}`}>
                    {item.year}
                  </span>
                </div>

                {/* Milestone Glass Card */}
                <div
                  onMouseEnter={() => play('hover')}
                  className={`glass-panel p-6 sm:p-8 rounded-[24px] border transition-all duration-300 relative overflow-hidden cursor-default ${
                    isBTech 
                      ? 'border-[#00E5FF]/30 shadow-[0_0_30px_rgba(0,229,255,0.08)] bg-[#0B1120]/50' 
                      : 'border-white/5 hover:border-[#7B61FF]/30 hover:shadow-[0_0_15px_rgba(123,97,255,0.05)]'
                  }`}
                >
                  {/* Glowing background shapes for BTech */}
                  {isBTech && (
                    <>
                      <div className="absolute top-0 right-0 w-28 h-28 bg-[#00E5FF]/5 rounded-bl-[100px] pointer-events-none" />
                      <div className="scan-line opacity-30" />
                    </>
                  )}

                  {/* Top line metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className={`w-5 h-5 ${isBTech ? 'text-[#00E5FF]' : 'text-[#7B61FF]'}`} />
                      <span className="font-mono text-xs text-[#6B7280] md:hidden">{item.year}</span>
                      <span className="font-mono text-xs text-[#00E5FF] tracking-wider uppercase bg-[#00E5FF]/5 border border-[#00E5FF]/10 px-2.5 py-1 rounded-md">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-white bg-white/5 px-3 py-1 rounded-md border border-white/5">
                      <span>{item.gradeLabel}:</span>
                      <span className="text-[#00FFA3] glow-text-accent">{item.gradeValue}</span>
                    </div>
                  </div>

                  {/* Degree name & Institution */}
                  <h3 className={`text-lg sm:text-xl font-bold tracking-wide leading-tight mb-2 ${isBTech ? 'text-white' : 'text-[#B8C1CC]'}`}>
                    {item.degree}
                  </h3>
                  <p className="text-sm font-medium text-[#B8C1CC] mb-4 flex items-center gap-1.5 font-sans">
                    <BookOpen className="w-3.5 h-3.5 text-[#6B7280]" />
                    {item.institution}
                  </p>

                  {/* Details paragraph */}
                  <p className="text-xs sm:text-sm text-[#B8C1CC] leading-relaxed font-sans border-t border-white/5 pt-4">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
