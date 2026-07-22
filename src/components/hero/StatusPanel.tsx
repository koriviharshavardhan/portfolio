'use client';

import React, { useState, useEffect } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { Shield, MapPin, Calendar, Clock, Radio } from 'lucide-react';

export const StatusPanel: React.FC = () => {
  const { play } = useSound();
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: false }));
      setDateString(now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onMouseEnter={() => play('hover')}
      className="glass-panel w-64 p-5 rounded-[24px] border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col gap-4 select-none hover:border-[#00E5FF]/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.05)] transition-all duration-300 pointer-events-auto"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] tracking-wider uppercase font-mono text-[#6B7280]">
        <span className="flex items-center gap-1">
          <Radio className="w-3 h-3 text-[#00E5FF] animate-pulse" />
          Live Status
        </span>
        <span className="text-[#3DDC84]">v1.0.2</span>
      </div>

      {/* Career Availability */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-mono text-[#6B7280]">OPERATING STATE</span>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84] pulse-glow" style={{ boxShadow: '0 0 10px #3DDC84' }} />
          <span className="text-sm font-bold text-white tracking-wide">OPEN TO WORK</span>
        </div>
        <p className="text-[10px] text-[#B8C1CC] leading-normal font-sans">
          Available for AI/ML & Software engineering opportunities.
        </p>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono text-[#6B7280]">COORDINATES</span>
        <div className="flex items-center gap-1.5 text-xs text-white">
          <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span className="font-semibold">Hyderabad, India</span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-mono text-[#6B7280] flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5" /> DATE
          </span>
          <span className="text-xs font-mono font-bold text-white">{dateString}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-mono text-[#6B7280] flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> LOCAL TIME
          </span>
          <span className="text-xs font-mono font-bold text-[#00E5FF]">{timeString}</span>
        </div>
      </div>
    </div>
  );
};
