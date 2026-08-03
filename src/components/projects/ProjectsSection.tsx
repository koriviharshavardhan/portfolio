'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { projects, Project } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Cpu, Play, X, Sliders, ChevronRight } from 'lucide-react';
import { GithubIcon as Github } from '@/components/ui/CustomIcons';

export const ProjectsSection: React.FC = () => {
  const { play, narrate } = useSound();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Comparison slider position (percentage 0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);

  const filters = ['All', 'AI', 'Machine Learning', 'Computer Vision', 'Python', 'TensorFlow', 'Scikit-learn'];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'All') return matchesSearch;
    
    let matchesFilter = false;
    if (activeFilter === 'AI') matchesFilter = project.category.includes('AI');
    else if (activeFilter === 'Machine Learning') matchesFilter = project.category.includes('Machine');
    else if (activeFilter === 'Computer Vision') matchesFilter = project.category.includes('Vision');
    else matchesFilter = project.techStack.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Grayscale image comparison slider handlers
  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent, rect: DOMRect) => {
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleExplainProject = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    play('click');
    const speechText = `Project details for ${project.name}. The problem was: ${project.problem}. The solution was: ${project.solution}. Developed using ${project.techStack.join(', ')}.`;
    narrate(speechText);
  };

  return (
    <section 
      id="projects" 
      className="relative py-20 sm:py-28 w-full border-t border-white/5 bg-[#04070B] scroll-mt-28"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7B61FF]/3 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1280px] px-4 sm:px-12 md:px-16 mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] tracking-[0.2em] uppercase mb-2">
              <span>MODULE 04</span>
              <span className="w-8 h-[1px] bg-[#00E5FF]/30" />
              <span className="animate-pulse">Active</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase font-sans">
              PROJECT DATABASE
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] mt-3 sm:mt-4" />
          </div>
          <p className="text-[#6B7280] font-mono text-xs uppercase max-w-xs tracking-wider">
            Engineering solutions powered by Artificial Intelligence.
          </p>
        </div>

        {/* Filter and Search HUD Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 pointer-events-auto">
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  play('click');
                  setActiveFilter(filter);
                }}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.1)]'
                    : 'bg-white/3 border border-white/5 text-[#6B7280] hover:text-[#B8C1CC] hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search Projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/3 border border-white/5 rounded-xl text-xs font-mono tracking-wider outline-none focus:border-[#00E5FF] focus:bg-white/5 transition-all text-white placeholder-[#6B7280]"
            />
          </div>
        </div>

        {/* Projects Grid Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pointer-events-auto">
          {filteredProjects.map((project) => {
            const isColorization = project.id === 'image-colorization';

            return (
              <div
                key={project.id}
                onClick={() => {
                  play('click');
                  setSelectedProject(project);
                }}
                className="glass-panel p-6 sm:p-8 rounded-[24px] border border-white/5 hover:border-[#00E5FF]/20 hover:shadow-[0_15px_40px_-15px_rgba(0,229,255,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                {/* Background scanning hover grid */}
                <div className="absolute inset-0 bg-[#00E5FF]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Card Header Info */}
                  <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#6B7280] uppercase">
                      {project.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#3DDC84] uppercase bg-[#3DDC84]/5 border border-[#3DDC84]/15 px-2 py-0.5 rounded-md">
                      ✓ {project.status}
                    </span>
                  </div>

                  {/* Interactive Split-Comparison Slider for Image Colorization */}
                  {isColorization && (
                    <div 
                      className="w-full h-52 rounded-2xl bg-[#080E1A] border border-white/10 overflow-hidden mb-6 relative select-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] group/slider cursor-ew-resize"
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        handleSliderMove(e.clientX, rect);
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        if (isDragging.current || e.buttons === 1) {
                          handleSliderMove(e.clientX, rect);
                        }
                      }}
                      onTouchMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        handleTouchMove(e, rect);
                      }}
                      onMouseDown={() => { isDragging.current = true; }}
                      onMouseUp={() => { isDragging.current = false; }}
                      onTouchStart={() => { isDragging.current = true; }}
                      onTouchEnd={() => { isDragging.current = false; }}
                    >
                      {/* COLORIZED IMAGE LAYER (Right Side / Underneath) */}
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#070D18]">
                        <svg className="w-full h-full object-cover" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="skyGrad" x1="0" y1="0" x2="600" y2="240" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#0B1528" />
                              <stop offset="40%" stopColor="#1A0B2E" />
                              <stop offset="70%" stopColor="#2E0B25" />
                              <stop offset="100%" stopColor="#051D2D" />
                            </linearGradient>
                            <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FF4D6D" />
                              <stop offset="50%" stopColor="#FFC857" />
                              <stop offset="100%" stopColor="#00E5FF" />
                            </linearGradient>
                            <linearGradient id="mountGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#7B61FF" />
                              <stop offset="100%" stopColor="#080D1A" />
                            </linearGradient>
                          </defs>

                          {/* Futuristic Cyberpunk Landscape Vector Artwork */}
                          <rect width="600" height="240" fill="url(#skyGrad)" />
                          
                          {/* Vibrant Synthwave Sun */}
                          <circle cx="300" cy="110" r="65" fill="url(#sunGrad)" opacity="0.9" />
                          <circle cx="300" cy="110" r="85" fill="#00E5FF" opacity="0.15" />

                          {/* Mountain Ranges */}
                          <polygon points="0,240 120,120 220,180 350,90 480,170 600,100 600,240" fill="url(#mountGrad)" opacity="0.85" />
                          <polygon points="0,240 80,150 190,210 300,130 420,200 550,140 600,240" fill="#00FFA3" opacity="0.2" />

                          {/* Neon Grid Lines */}
                          <line x1="0" y1="180" x2="600" y2="180" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
                          <line x1="0" y1="205" x2="600" y2="205" stroke="#7B61FF" strokeWidth="2" opacity="0.8" />
                          <line x1="0" y1="225" x2="600" y2="225" stroke="#FF4D6D" strokeWidth="2.5" opacity="0.9" />

                          {/* Vertical Grid Rays */}
                          <line x1="300" y1="180" x2="300" y2="240" stroke="#00E5FF" strokeWidth="1.5" opacity="0.5" />
                          <line x1="300" y1="180" x2="150" y2="240" stroke="#00FFA3" strokeWidth="1.5" opacity="0.4" />
                          <line x1="300" y1="180" x2="450" y2="240" stroke="#7B61FF" strokeWidth="1.5" opacity="0.4" />
                          <line x1="300" y1="180" x2="0" y2="240" stroke="#FFC857" strokeWidth="1" opacity="0.3" />
                          <line x1="300" y1="180" x2="600" y2="240" stroke="#FF4D6D" strokeWidth="1" opacity="0.3" />
                        </svg>

                        {/* Top-Right Badge: Full Color Result */}
                        <div className="absolute top-3 right-3 text-[9px] font-mono font-bold tracking-widest text-[#00FFA3] bg-black/80 border border-[#00FFA3]/30 rounded-md px-2 py-1 uppercase shadow-[0_0_10px_rgba(0,255,163,0.2)]">
                          AI COLORIZED (RGB)
                        </div>
                      </div>

                      {/* GRAYSCALE IMAGE LAYER (Left Side / Split Mask) */}
                      <div 
                        className="absolute inset-y-0 left-0 bg-[#080E1A] overflow-hidden border-r-2 border-[#00E5FF] shadow-[5px_0_20px_rgba(0,229,255,0.4)]"
                        style={{ width: `${sliderPosition}%` }}
                      >
                        <div className="absolute top-0 left-0 w-[600px] h-full grayscale contrast-125 brightness-90">
                          <svg className="w-full h-full object-cover" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="600" height="240" fill="#1A202C" />
                            <circle cx="300" cy="110" r="65" fill="#E2E8F0" opacity="0.8" />
                            <polygon points="0,240 120,120 220,180 350,90 480,170 600,100 600,240" fill="#4A5568" opacity="0.9" />
                            <polygon points="0,240 80,150 190,210 300,130 420,200 550,140 600,240" fill="#718096" opacity="0.4" />
                            <line x1="0" y1="180" x2="600" y2="180" stroke="#A0AEC0" strokeWidth="1.5" opacity="0.6" />
                            <line x1="0" y1="205" x2="600" y2="205" stroke="#CBD5E0" strokeWidth="2" opacity="0.8" />
                            <line x1="0" y1="225" x2="600" y2="225" stroke="#E2E8F0" strokeWidth="2.5" opacity="0.9" />
                            <line x1="300" y1="180" x2="300" y2="240" stroke="#CBD5E0" strokeWidth="1.5" opacity="0.5" />
                            <line x1="300" y1="180" x2="150" y2="240" stroke="#A0AEC0" strokeWidth="1.5" opacity="0.4" />
                            <line x1="300" y1="180" x2="450" y2="240" stroke="#A0AEC0" strokeWidth="1.5" opacity="0.4" />
                          </svg>
                        </div>

                        {/* Top-Left Badge: Grayscale Input */}
                        <div className="absolute top-3 left-3 text-[9px] font-mono font-bold tracking-widest text-[#B8C1CC] bg-black/80 border border-white/10 rounded-md px-2 py-1 uppercase whitespace-nowrap">
                          INPUT (GRAYSCALE)
                        </div>
                      </div>

                      {/* SLIDER HANDLE BUTTON */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#04070B] border-2 border-[#00E5FF] shadow-[0_0_15px_#00E5FF] flex items-center justify-center cursor-ew-resize z-20 group-hover/slider:scale-110 transition-transform"
                        style={{ left: `calc(${sliderPosition}% - 16px)` }}
                      >
                        <Sliders className="w-4 h-4 text-[#00E5FF]" />
                      </div>

                      {/* Floating Prompt instruction */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[9.5px] font-mono bg-black/85 border border-[#00E5FF]/30 text-[#00E5FF] rounded-full px-3 py-0.5 tracking-wider shadow-[0_0_10px_rgba(0,229,255,0.2)] pointer-events-none whitespace-nowrap">
                        ← Slide to transform B&W to Color →
                      </div>
                    </div>
                  )}

                  {/* Visual Pipeline chart for Academic Performance Prediction */}
                  {!isColorization && (
                    <div className="w-full h-44 rounded-xl bg-black border border-white/5 mb-6 flex flex-col justify-center p-4 relative overflow-hidden font-mono text-[9px] text-[#6B7280] gap-2.5">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                        <span className="text-[#B8C1CC]">DATA SCIENCE PIPELINE</span>
                        <span className="text-[#7B61FF] font-bold">Scikit-Learn</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <div className="bg-white/3 border border-white/5 px-2 py-1 rounded text-white flex-1 text-center truncate">Student Data</div>
                        <ChevronRight className="w-3 h-3 text-[#7B61FF]" />
                        <div className="bg-white/3 border border-white/5 px-2 py-1 rounded text-white flex-1 text-center truncate">Clean/Scale</div>
                        <ChevronRight className="w-3 h-3 text-[#7B61FF]" />
                        <div className="bg-white/3 border border-white/5 px-2 py-1 rounded text-[#00FFA3] border-[#00FFA3]/20 flex-1 text-center truncate">Predict ML</div>
                      </div>

                      <div className="text-[8px] text-[#6B7280] text-center mt-2 leading-relaxed">
                        Data Ingestion → Feature Scaling (StandardScaler) → Gradient Boosting Forecast Model
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-2 font-sans group-hover:text-[#00E5FF] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#B8C1CC] leading-relaxed mb-6 font-sans">
                    {project.headline}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="py-1 px-2.5 rounded-lg text-[10px] font-mono bg-white/3 border border-white/5 text-[#B8C1CC]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer CTA actions */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleExplainProject(project, e)}
                      className="p-2 rounded-xl bg-white/3 border border-white/5 hover:border-[#00E5FF]/20 text-[#6B7280] hover:text-[#00E5FF] transition-all flex items-center justify-center"
                      title="Audio AI Explanation"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono text-[#6B7280] uppercase">Audio Summary</span>
                  </div>

                  <span className="text-xs font-semibold text-[#00E5FF] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    View Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* FULLSCREEN DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-panel-heavy max-w-3xl w-full max-h-[85vh] rounded-[28px] border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.15)] flex flex-col overflow-hidden relative pointer-events-auto"
            >
              {/* Scanline */}
              <div className="scan-line" />

              {/* Close button */}
              <button
                onClick={() => {
                  play('click');
                  setSelectedProject(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#FF4D6D]/40 text-[#B8C1CC] hover:text-[#FF4D6D] transition-colors cursor-pointer z-50"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Body Scroll Container */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10.5px] font-mono text-[#00E5FF] tracking-widest uppercase">
                      {selectedProject.category}
                    </span>
                    <span className="text-[10.5px] font-mono text-[#6B7280]">/</span>
                    <span className="text-[10.5px] font-mono text-[#B8C1CC]">
                      Duration: {selectedProject.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    {selectedProject.name}
                  </h3>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl">
                  {selectedProject.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col">
                      <span className="text-[9px] font-mono text-[#6B7280] tracking-widest uppercase">
                        {metric.label}
                      </span>
                      <span className="text-lg font-bold font-mono text-[#00E5FF]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Core description block */}
                <div className="space-y-4 text-sm text-[#B8C1CC] leading-relaxed">
                  <p className="font-semibold text-white text-base">
                    {selectedProject.headline}
                  </p>
                  <p>{selectedProject.description}</p>
                </div>

                {/* Details segments */}
                <div className="space-y-4 border-t border-white/5 pt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold font-mono text-[#7B61FF] tracking-wider uppercase mb-2">
                        THE CHALLENGE / PROBLEM
                      </h4>
                      <p className="text-xs text-[#B8C1CC] leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-mono text-[#00FFA3] tracking-wider uppercase mb-2">
                        THE SOLUTIONS / VALUE
                      </h4>
                      <p className="text-xs text-[#B8C1CC] leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-5">
                    <h4 className="text-xs font-bold font-mono text-[#00E5FF] tracking-wider uppercase mb-2.5">
                      ARCHITECTURE / PIPELINE WORKFLOW
                    </h4>
                    <div className="space-y-2">
                      {selectedProject.architecture.map((step, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs bg-white/3 border border-white/5 p-2.5 rounded-xl text-[#B8C1CC]">
                          <span className="font-mono font-bold text-[#00E5FF] text-[10px]">
                            STEP 0{i + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions bottom block */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6 mt-8">
                  <button
                    onClick={(e) => handleExplainProject(selectedProject, e)}
                    className="btn-primary py-2.5 px-5 flex items-center gap-2 cursor-pointer text-xs font-semibold tracking-wider uppercase text-white shadow-md active:scale-95"
                  >
                    <Play className="w-4 h-4" />
                    AI Voice Explainer
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary py-2.5 px-4 flex items-center gap-1.5 text-xs text-[#B8C1CC] hover:text-white"
                    >
                      <Github className="w-4 h-4" />
                      View Codebase
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
