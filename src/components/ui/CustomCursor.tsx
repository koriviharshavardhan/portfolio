'use client';

import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  // Target positions
  const targetX = useRef(0);
  const targetY = useRef(0);
  // Current trail positions (for smooth lag)
  const trailX = useRef(0);
  const trailY = useRef(0);

  useEffect(() => {
    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    const onMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (isHidden) setIsHidden(false);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Track hover states for interactive elements
    const updateInteractiveHovers = () => {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .interactive-element');
      
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        interactives.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    // Update hovers initially and set up a mutation observer to capture newly added elements
    const cleanupHovers = updateInteractiveHovers();

    const observer = new MutationObserver(() => {
      updateInteractiveHovers();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth animation loop for the trail
    const animateTrail = () => {
      // Linear interpolation: current = current + (target - current) * ease
      const ease = 0.15;
      trailX.current += (targetX.current - trailX.current) * ease;
      trailY.current += (targetY.current - trailY.current) * ease;
      
      setTrail({ x: trailX.current, y: trailY.current });
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      cleanupHovers();
      observer.disconnect();
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHidden]);

  // Track mouse coordinates as custom properties for grid glows
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
      document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (isReducedMotion || isHidden) return null;

  return (
    <>
      {/* Inner Solid Energy Dot */}
      <div
        ref={cursorRef}
        className={`custom-cursor pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF] mix-blend-screen transition-all duration-150 ease-out ${
          isHovered ? 'h-[16px] w-[16px] bg-[#00FFA3] shadow-[0_0_20px_#00FFA3]' : 'h-[8px] w-[8px] shadow-[0_0_10px_#00E5FF]'
        } ${isClicked ? 'scale-75 bg-[#7B61FF]' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Outer Glow Ring */}
      <div
        ref={trailRef}
        className={`custom-cursor-ring pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-solid transition-all duration-300 ease-out ${
          isHovered
            ? 'h-[50px] w-[50px] border-[#00FFA3] bg-[#00FFA3]/5 shadow-[0_0_20px_rgba(0,255,163,0.2)]'
            : 'h-[32px] w-[32px] border-[#00E5FF]/40 bg-transparent'
        } ${isClicked ? 'scale-125 border-[#7B61FF]' : ''}`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      />
    </>
  );
};
