'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { personalInfo } from '@/lib/data';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { LinkedinIcon as Linkedin, GithubIcon as Github } from '@/components/ui/CustomIcons';
import { motion, useInView } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const { play, narrate } = useSound();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [voiced, setVoiced] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    if (isInView && !voiced) {
      setVoiced(true);
      narrate("I'm always open to discussing new opportunities, collaborations, and innovative ideas.");
    }
  }, [isInView, voiced, narrate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      play('error');
      return;
    }

    play('click');
    setFormStatus('loading');

    // Simulate database write delay
    setTimeout(() => {
      play('success');
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-28 w-full border-t border-white/5 bg-[#04070B]"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-[#00E5FF]/2 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1280px] px-6 sm:px-12 md:px-16 mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-[0.2em] uppercase mb-2">
            <span>MODULE 08</span>
            <span className="w-8 h-[1px] bg-[#00E5FF]/30" />
            <span className="animate-pulse">Active</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase font-sans">
            MISSION CONTROL
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pointer-events-auto">
          
          {/* Left Side: Contact Information Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-white tracking-wide font-sans">
                LET'S BUILD SOMETHING REMARKABLE
              </h3>
              <p className="text-sm text-[#B8C1CC] leading-relaxed font-sans">
                I'm always open to discussing new opportunities, collaborating on impactful AI/ML projects, or simply answering engineering questions. Reach out directly.
              </p>
            </div>

            {/* Information Slots */}
            <div className="space-y-5 my-8">
              <div 
                onMouseEnter={() => play('hover')}
                className="flex items-center gap-4 bg-white/3 border border-white/5 p-4 rounded-2xl hover:border-[#00E5FF]/20 hover:bg-white/5 transition-all"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[#00E5FF]">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">EMAIL ADDRESS</span>
                  <a href={`mailto:${personalInfo.email}`} onClick={() => play('click')} className="text-xs sm:text-sm font-semibold text-white hover:text-[#00E5FF] transition-colors font-mono">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div 
                onMouseEnter={() => play('hover')}
                className="flex items-center gap-4 bg-white/3 border border-white/5 p-4 rounded-2xl hover:border-[#7B61FF]/20 hover:bg-white/5 transition-all"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[#7B61FF]">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">TELEPHONE CORES</span>
                  <a href={`tel:${personalInfo.phone}`} onClick={() => play('click')} className="text-xs sm:text-sm font-semibold text-white hover:text-[#7B61FF] transition-colors font-mono">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div 
                onMouseEnter={() => play('hover')}
                className="flex items-center gap-4 bg-white/3 border border-white/5 p-4 rounded-2xl hover:border-[#00FFA3]/20 hover:bg-white/5 transition-all"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[#00FFA3]">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">COORDINATES</span>
                  <span className="text-xs sm:text-sm font-semibold text-white font-sans">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => play('click')}
                onMouseEnter={() => play('hover')}
                className="p-3.5 rounded-xl border border-white/5 bg-white/3 hover:border-[#00E5FF]/30 text-[#B8C1CC] hover:text-[#00E5FF] transition-all"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => play('click')}
                onMouseEnter={() => play('hover')}
                className="p-3.5 rounded-xl border border-white/5 bg-white/3 hover:border-[#7B61FF]/30 text-[#B8C1CC] hover:text-[#7B61FF] transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Side: Message Input Form Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-[24px] border border-white/5 shadow-md flex flex-col justify-center relative overflow-hidden h-full">
              <div className="scan-line opacity-10" />

              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                  <CheckCircle className="w-16 h-16 text-[#3DDC84] mb-4 animate-bounce" />
                  <h3 className="text-lg font-bold text-white mb-2 uppercase font-sans">MESSAGE SENT SUCCESSFULLY</h3>
                  <p className="text-xs text-[#B8C1CC] leading-relaxed max-w-xs font-sans">
                    System core has written your message. Harsha will receive it and respond shortly.
                  </p>
                  <button
                    onClick={() => {
                      play('click');
                      setFormStatus('idle');
                    }}
                    className="btn-secondary py-2.5 px-5 mt-6 text-xs uppercase"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Name Identifier</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="input-glass w-full px-4 py-3 text-xs outline-none focus:border-[#00E5FF] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Email Channel</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. recruiter@company.com"
                      required
                      className="input-glass w-full px-4 py-3 text-xs outline-none focus:border-[#00E5FF] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Transmitted Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="e.g. Hello Harsha, let's schedule an interview loop."
                      required
                      className="input-glass w-full px-4 py-3 text-xs outline-none focus:border-[#00E5FF] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    onMouseEnter={() => play('hover')}
                    className="w-full btn-primary py-3.5 px-6 flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold tracking-wider uppercase disabled:opacity-50 active:scale-95"
                  >
                    {formStatus === 'loading' ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
