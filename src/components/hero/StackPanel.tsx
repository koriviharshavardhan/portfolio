'use client';

import React from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { Cpu, ChevronRight } from 'lucide-react';

interface StackItem {
  name: string;
  level: string;
  width: string;
  color: string;
}

export const StackPanel: React.FC = () => {
  const { play } = useSound();

  const stacks: StackItem[] = [
    { name: 'Python', level: 'Expert', width: '95%', color: 'from-[#00E5FF] to-[#7B61FF]' },
    { name: 'TensorFlow', level: 'Advanced', width: '85%', color: 'from-[#7B61FF] to-[#00FFA3]' },
    { name: 'OpenCV', level: 'Advanced', width: '82%', color: 'from-[#00FFA3] to-[#FFC857]' },
    { name: 'Machine Learning', level: 'Advanced', width: '90%', color: 'from-[#FFC857] to-[#FF4D6D]' },
    { name: 'SQL', level: 'Advanced', width: '85%', color: 'from-[#FF4D6D] to-[#00E5FF]' }
  ];

  return (
    <div 
      onMouseEnter={() => play('hover')}
      className="glass-panel w-64 p-5 rounded-[24px] border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col gap-4 select-none hover:border-[#7B61FF]/20 hover:shadow-[0_0_20px_rgba(123,97,255,0.05)] transition-all duration-300 pointer-events-auto"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] tracking-wider uppercase font-mono text-[#6B7280]">
        <span className="flex items-center gap-1">
          <Cpu className="w-3 h-3 text-[#7B61FF]" />
          PRIMARY CORE
        </span>
        <span className="text-[#00E5FF]">ENGINE</span>
      </div>

      <div className="flex flex-col gap-3">
        {stacks.map((stack) => (
          <div key={stack.name} className="flex flex-col gap-1.5 group">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white tracking-wide flex items-center">
                <ChevronRight className="w-3 h-3 text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                {stack.name}
              </span>
              <span className="font-mono text-[10px] text-[#6B7280]">{stack.level}</span>
            </div>
            
            {/* Pulsing Progress Track */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${stack.color} animate-pulse duration-[3s]`}
                style={{ width: stack.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
