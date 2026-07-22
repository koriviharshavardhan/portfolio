'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSound } from '@/components/providers/SoundProvider';
import { gsap } from 'gsap';
import { 
  Code2, 
  Terminal, 
  Brain, 
  Eye, 
  Database, 
  Cpu, 
  Globe,
  Gauge,
  Flame,
  Binary
} from 'lucide-react';

interface TechNode {
  name: string;
  icon: React.ReactNode;
  color: string;
  details: string;
  orbitRadius: number;
  speed: number; // Duration of 360deg rotation in seconds
}

export const ProfilePresentation: React.FC = () => {
  const { play } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement[]>([]);
  const [activeTech, setActiveTech] = useState<TechNode | null>(null);

  const techNodes: TechNode[] = [
    { name: 'Python', icon: <Terminal className="w-4.5 h-4.5" />, color: '#00E5FF', details: 'Expert | AI Core Model Development & Data Pipelines', orbitRadius: 155, speed: 20 },
    { name: 'TensorFlow', icon: <Brain className="w-4.5 h-4.5" />, color: '#7B61FF', details: 'Advanced | Neural Networks & CNN Architectures', orbitRadius: 155, speed: -25 },
    { name: 'OpenCV', icon: <Eye className="w-4.5 h-4.5" />, color: '#00FFA3', details: 'Advanced | Grayscale Preprocessing & Computer Vision', orbitRadius: 155, speed: 30 },
    { name: 'Scikit-Learn', icon: <Cpu className="w-4.5 h-4.5" />, color: '#FFC857', details: 'Advanced | Classification Model Algorithms & Pipeline Tools', orbitRadius: 215, speed: -35 },
    { name: 'SQL', icon: <Database className="w-4.5 h-4.5" />, color: '#3DDC84', details: 'Intermediate | Complex DB Relational Schemas & Queries', orbitRadius: 215, speed: 40 },
    { name: 'Java', icon: <Code2 className="w-4.5 h-4.5" />, color: '#FF4D6D', details: 'Basic | Object-Oriented Logic Foundations', orbitRadius: 215, speed: -45 },
    { name: 'JavaScript', icon: <Binary className="w-4.5 h-4.5" />, color: '#00E5FF', details: 'Basic | Script Logic & UI Web Interactions', orbitRadius: 275, speed: 50 },
    { name: 'HTML/CSS', icon: <Globe className="w-4.5 h-4.5" />, color: '#7B61FF', details: 'Advanced | Responsive Design, Glassmorphism CSS Styles', orbitRadius: 275, speed: -60 }
  ];

  useEffect(() => {
    // Parallax mouse movements
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xOffset = (clientX / innerWidth - 0.5) * 35;
      const yOffset = (clientY / innerHeight - 0.5) * 35;

      gsap.to(orbRef.current, {
        x: xOffset,
        y: yOffset,
        duration: 1.5,
        ease: 'power3.out'
      });

      // Opposite parallax for orbit nodes to enhance depth
      orbitsRef.current.forEach((orbit, index) => {
        const factor = (index + 1) * 0.4;
        gsap.to(orbit, {
          x: -xOffset * factor,
          y: -yOffset * factor,
          duration: 1.8,
          ease: 'power3.out'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set up rotation animations via GSAP
  useEffect(() => {
    const timelines: gsap.core.Timeline[] = [];

    techNodes.forEach((node, index) => {
      const element = document.getElementById(`tech-node-${index}`);
      if (!element) return;

      // Infinite rotation around center
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(element, {
        rotation: node.speed > 0 ? 360 : -360,
        transformOrigin: `0px 0px`, // Rotates around center container
        duration: Math.abs(node.speed),
        ease: 'none'
      });

      timelines.push(tl);
    });

    return () => {
      timelines.forEach(tl => tl.kill());
    };
  }, []);

  const handleNodeMouseEnter = (node: TechNode) => {
    play('hover');
    setActiveTech(node);
  };

  const handleNodeMouseLeave = () => {
    setActiveTech(null);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] flex items-center justify-center select-none"
    >
      {/* 3D CONCENTRIC ORBIT RINGS */}
      <div className="absolute w-[310px] h-[310px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute w-[430px] h-[430px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute w-[550px] h-[550px] rounded-full border border-dashed border-white/5 pointer-events-none animate-spin-slow duration-[100s]" />

      {/* Orbit Containers for parallax tracking */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div 
          key={i}
          ref={el => { if (el) orbitsRef.current[i] = el; }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        />
      ))}

      {/* BACKGROUND ENERGY CORE */}
      <div className="absolute w-60 h-60 rounded-full bg-[#00E5FF]/5 blur-3xl animate-pulse pointer-events-none" />

      {/* CENTRAL PROFILE ORB */}
      <div 
        ref={orbRef}
        className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-[2px] bg-gradient-to-tr from-[#00E5FF]/40 to-[#7B61FF]/40 flex items-center justify-center shadow-[0_0_40px_rgba(0,229,255,0.25)] group"
      >
        {/* Holographic scanner effect overlays */}
        <div className="absolute inset-0 rounded-full bg-radial-glow opacity-30 z-10 pointer-events-none" />
        <div className="absolute inset-0 rounded-full overflow-hidden z-10 pointer-events-none">
          <div className="absolute left-0 right-0 h-0.5 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-scan" style={{ top: '50%' }} />
        </div>

        {/* Circular portrait */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#04070B] border border-white/10">
          <Image
            src="/profile.jpg"
            alt="Korivi Harsha Vardhan"
            fill
            priority
            sizes="(max-width: 768px) 176px, 224px"
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-750 group-hover:scale-105"
          />
          {/* Cyan/Blue overlay mesh */}
          <div className="absolute inset-0 bg-[#00E5FF]/5 mix-blend-color pointer-events-none" />
        </div>

        {/* Rotating outer frame notches */}
        <div className="absolute inset-[-6px] rounded-full border border-[#00E5FF]/30 border-t-transparent border-b-transparent animate-spin-slow pointer-events-none" />
        <div className="absolute inset-[-12px] rounded-full border border-dashed border-[#7B61FF]/20 animate-spin-slow reverse pointer-events-none" />
      </div>

      {/* TECH ORBITING NODES */}
      {techNodes.map((node, index) => {
        // Compute offset angle
        const totalNodes = techNodes.length;
        const angle = (index / totalNodes) * Math.PI * 2;
        const radius = node.orbitRadius;

        // Position offset from center
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={node.name}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: 0,
              height: 0,
            }}
          >
            {/* The actual rotating node */}
            <div
              id={`tech-node-${index}`}
              className="absolute pointer-events-auto"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Floating tech node button */}
              <div
                onMouseEnter={() => handleNodeMouseEnter(node)}
                onMouseLeave={handleNodeMouseLeave}
                className="w-10 h-10 rounded-xl bg-[#0B1120]/90 border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-115 hover:border-current hover:shadow-[0_0_20px_var(--glow-color)] text-white hover:text-white"
                style={{
                  '--glow-color': node.color,
                  color: activeTech?.name === node.name ? node.color : '#B8C1CC',
                } as React.CSSProperties}
              >
                {node.icon}
              </div>
            </div>
          </div>
        );
      })}

      {/* FLOATING DETAILED TECH HUD INFO */}
      {activeTech && (
        <div 
          className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#04070B]/90 border border-[#00E5FF]/40 p-4.5 z-20 flex flex-col items-center justify-center text-center animate-fade-in shadow-[0_0_25px_rgba(0,229,255,0.25)] backdrop-blur-md"
        >
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span 
              className="w-2.5 h-2.5 rounded-full pulse-glow" 
              style={{ backgroundColor: activeTech.color, boxShadow: `0 0 10px ${activeTech.color}` }}
            />
            <h4 className="font-bold text-sm tracking-widest uppercase text-white font-sans">
              {activeTech.name}
            </h4>
          </div>
          <p className="text-[#B8C1CC] font-mono text-[10.5px] leading-relaxed">
            {activeTech.details}
          </p>
        </div>
      )}
    </div>
  );
};
