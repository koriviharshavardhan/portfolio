'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { skills, personalityTraits } from '@/lib/data';
import { motion, useInView } from 'framer-motion';
import { Brain, Cpu, Code2, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface CircularRingProps {
  percentage: number;
  color: string;
  size?: number;
  glowId: string;
}

const CircularEnergyRing: React.FC<CircularRingProps> = ({ percentage, color, size = 64, glowId }) => {
  const strokeWidth = 4.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-95">
        {/* Track Ring */}
        <circle
          stroke="rgba(255,255,255,0.03)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Glowing Pulse Energy Ring */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            filter: `url(#${glowId})`,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {/* Percentage Center text */}
      <span className="absolute font-mono text-[10px] font-bold text-white/90">
        {percentage}%
      </span>
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  const { play, narrate } = useSound();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [voiced, setVoiced] = useState(false);

  useEffect(() => {
    if (isInView && !voiced) {
      setVoiced(true);
      narrate("My strongest skills include Python, Machine Learning, TensorFlow, OpenCV, SQL, and modern software development practices.");
    }
  }, [isInView, voiced, narrate]);

  // Constellation Nodes Coordinates
  const constellationNodes = [
    { name: 'Python', x: 250, y: 150, color: '#00E5FF', size: 16 },
    { name: 'TensorFlow', x: 400, y: 80, color: '#7B61FF', size: 12 },
    { name: 'OpenCV', x: 120, y: 100, color: '#00FFA3', size: 12 },
    { name: 'SQL', x: 250, y: 270, color: '#FFC857', size: 12 },
    { name: 'Java', x: 100, y: 230, color: '#FF4D6D', size: 10 },
    { name: 'JavaScript', x: 400, y: 220, color: '#3DDC84', size: 10 }
  ];

  // Connections between nodes
  const constellationLinks = [
    { from: 0, to: 1 }, // Python -> TensorFlow
    { from: 0, to: 2 }, // Python -> OpenCV
    { from: 0, to: 3 }, // Python -> SQL
    { from: 0, to: 4 }, // Python -> Java
    { from: 0, to: 5 }, // Python -> JavaScript
    { from: 1, to: 2 }, // TensorFlow -> OpenCV
    { from: 3, to: 4 }, // SQL -> Java
    { from: 5, to: 3 }  // JavaScript -> SQL
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-20 sm:py-28 w-full overflow-hidden border-t border-white/5 bg-[#0B1120]/30 scroll-mt-28"
    >
      <div className="absolute inset-0 holo-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00E5FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#7B61FF]/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1280px] px-4 sm:px-12 md:px-16 mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="mb-12 sm:mb-20 pt-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-[0.2em] uppercase mb-2">
            <span>MODULE 03</span>
            <span className="w-8 h-[1px] bg-[#00E5FF]/30" />
            <span className="animate-pulse">Active</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase font-sans">
            TECHNICAL ARSENAL
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] mt-3 sm:mt-4" />
        </div>

        {/* Top: Tech Stack Constellation visualization */}
        <div className="w-full flex flex-col items-center mb-16 sm:mb-20 pointer-events-auto">
          <span className="text-xs font-mono text-[#6B7280] tracking-widest uppercase mb-4 text-center">
            Neural Tech Stack Constellation
          </span>
          <div className="w-full max-w-[500px] h-[260px] sm:h-[340px] bg-black/40 border border-white/5 rounded-[24px] relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <svg className="w-full h-full" viewBox="0 0 500 340" preserveAspectRatio="xMidYMid meet">
              {/* Drawing links first */}
              {constellationLinks.map((link, i) => {
                const fromNode = constellationNodes[link.from];
                const toNode = constellationNodes[link.to];
                return (
                  <g key={i}>
                    {/* Glowing static pathway link line */}
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="rgba(0, 229, 255, 0.08)"
                      strokeWidth="2"
                    />
                    {/* Animated electrical neural pulse */}
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={`url(#line-grad-${i})`}
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id={`line-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={fromNode.color} stopOpacity="0" />
                        <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
                        <stop offset="100%" stopColor={toNode.color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </g>
                );
              })}

              {/* Drawing nodes */}
              {constellationNodes.map((node, i) => (
                <g 
                  key={node.name}
                  onMouseEnter={() => play('hover')}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Glow */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size + 4}
                    fill="transparent"
                    stroke={node.color}
                    strokeWidth="1"
                    className="animate-pulse opacity-45"
                  />
                  {/* Core Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={node.color}
                    className="transition-transform group-hover:scale-125"
                    style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
                  />
                  {/* Node Label Text */}
                  <text
                    x={node.x}
                    y={node.y - node.size - 8}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    className="font-mono text-[9px] font-semibold tracking-wider opacity-70 group-hover:opacity-100 group-hover:fill-[#00E5FF] transition-all select-none"
                  >
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>
            <div className="absolute bottom-3 left-4 flex items-center gap-1.5 opacity-55 text-[9px] font-mono text-[#B8C1CC]">
              <Sparkles className="w-3 h-3 text-[#00E5FF]" />
              <span>Interactive Neural Network</span>
            </div>
          </div>
        </div>

        {/* Middle: Grid of Categories with energy rings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Category 1: Languages */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 shadow-md">
            <h3 className="text-base font-bold font-sans text-[#00E5FF] tracking-wider uppercase mb-5 flex items-center gap-2">
              <Code2 className="w-4.5 h-4.5" /> Programming Languages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {skills.languages.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => play('hover')}
                  className="flex flex-col items-center gap-2 p-3 bg-white/3 border border-white/5 rounded-2xl hover:border-[#00E5FF]/20 hover:bg-white/5 transition-all duration-300"
                >
                  <CircularEnergyRing 
                    percentage={skill.level} 
                    color="#00E5FF" 
                    glowId={`glow-${skill.name.toLowerCase()}`}
                  />
                  <span className="font-mono text-xs font-semibold text-white/95 mt-1">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 2: AI & ML */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 shadow-md">
            <h3 className="text-base font-bold font-sans text-[#7B61FF] tracking-wider uppercase mb-5 flex items-center gap-2">
              <Brain className="w-4.5 h-4.5" /> AI & Machine Learning
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {skills.ai.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => play('hover')}
                  className="flex flex-col items-center gap-2 p-3 bg-white/3 border border-white/5 rounded-2xl hover:border-[#7B61FF]/20 hover:bg-white/5 transition-all duration-300"
                >
                  <CircularEnergyRing 
                    percentage={skill.level} 
                    color="#7B61FF" 
                    glowId={`glow-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
                  />
                  <span className="font-mono text-xs font-semibold text-white/95 mt-1 text-center truncate w-full">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 3: Tools & Platforms */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 shadow-md">
            <h3 className="text-base font-bold font-sans text-[#00FFA3] tracking-wider uppercase mb-5 flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5" /> Developer Tools
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {skills.tools.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => play('hover')}
                  className="flex flex-col items-center gap-2 p-3 bg-white/3 border border-white/5 rounded-2xl hover:border-[#00FFA3]/20 hover:bg-white/5 transition-all duration-300"
                >
                  <CircularEnergyRing 
                    percentage={skill.level} 
                    color="#00FFA3" 
                    glowId={`glow-${skill.name.toLowerCase()}`}
                  />
                  <span className="font-mono text-xs font-semibold text-white/95 mt-1">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 4: Engineering Concepts */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 shadow-md">
            <h3 className="text-base font-bold font-sans text-[#FFC857] tracking-wider uppercase mb-5 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5" /> Engineering Concepts
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {skills.concepts.map((skill) => (
                <div 
                  key={skill.name}
                  onMouseEnter={() => play('hover')}
                  className="flex flex-col items-center gap-2 p-3 bg-white/3 border border-white/5 rounded-2xl hover:border-[#FFC857]/20 hover:bg-white/5 transition-all duration-300"
                >
                  <CircularEnergyRing 
                    percentage={skill.level} 
                    color="#FFC857" 
                    glowId={`glow-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
                  />
                  <span className="font-mono text-[10px] font-semibold text-white/95 mt-1 text-center line-clamp-2 h-7 leading-normal">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Panel: Currently learning HUD & Soft Skills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 pointer-events-auto">
          
          {/* Currently Learning Panel */}
          <div 
            onMouseEnter={() => play('hover')}
            className="md:col-span-5 glass-panel p-6 rounded-[24px] border border-white/5 shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/5 rounded-bl-[100px] pointer-events-none" />
            <div className="flex items-center gap-2 mb-4 font-mono text-[11px] text-[#00E5FF] tracking-wider uppercase">
              <BookOpen className="w-4 h-4 animate-pulse" />
              <span>CURRENTLY STUDYING</span>
            </div>
            <h4 className="text-lg font-bold text-white font-sans mb-3">Next-Gen Tech Pipeline</h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#B8C1CC]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                Advanced LLM & Transformer Models
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                Modern Web Development Architectures (Vite/Next.js)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                Cloud Deployments & GPU Processing Containers
              </li>
            </ul>
          </div>

          {/* Soft Skills Chips */}
          <div className="md:col-span-7 glass-panel p-6 rounded-[24px] border border-white/5 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#6B7280] tracking-widest uppercase mb-4 block">
                Engineering Collaboration Strengths
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Communication',
                  'Leadership',
                  'Adaptability',
                  'Collaboration',
                  'Critical Thinking',
                  'Fast Learning',
                  'Problem Solving'
                ].map((val) => (
                  <div
                    key={val}
                    onMouseEnter={() => play('hover')}
                    className="py-1.5 px-3.5 rounded-xl text-xs font-medium bg-[#0B1120]/60 border border-white/5 text-[#B8C1CC] hover:text-[#7B61FF] hover:border-[#7B61FF]/30 hover:shadow-[0_0_15px_rgba(123,97,255,0.1)] transition-all cursor-default"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#6B7280] leading-relaxed font-sans mt-5 pt-4 border-t border-white/5">
              Optimized for collaborative code reviews, team agile standups, and cross-functional project deployments.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
