'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/components/providers/SoundProvider';
import { personalInfo, projects, skills, certifications } from '@/lib/data';
import { MessageSquare, X, Send, Cpu, Radio, Sparkles, Volume2, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const { play, narrate, soundEnabled } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello. I'm the AI Assistant for Harsha OS. I can answer questions about Harsha's Projects, Skills, Education, Certificates, or Contact info. What would you like to know?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'Who is Harsha?',
    'Tell me about Image Colorization.',
    'Explain Academic Performance Prediction.',
    'What skills does Harsha have?',
    'Show Certifications.',
    'Contact Harsha.'
  ];

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const msgContainer = chatWindowRef.current?.querySelector('.overflow-y-auto');
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(e.target as Node)) {
        // Only close if click is not on the floating toggle orb
        const toggleBtn = document.getElementById('ai-orb-toggle');
        if (toggleBtn && !toggleBtn.contains(e.target as Node)) {
          setIsOpen(false);
        }
      }
    };
    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    play('click');
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputText('');
    setIsTyping(true);

    // AI thinking latency
    setTimeout(() => {
      const responseText = getAIResponse(text);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'ai', text: responseText }]);
      
      // Speak response aloud if immersive voice mode is active
      if (soundEnabled) {
        narrate(responseText);
      }
    }, 900);
  };

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Specific Project Checks First (Prevents 'about' collision)
    if (q.includes('colorization') || q.includes('image color') || q.includes('project one') || q.includes('computer vision')) {
      return `The Image Colorization project is an advanced Computer Vision model using Python, TensorFlow, Keras, and CNN. It converts grayscale photos to colorized RGB images with 85% validation accuracy.`;
    }

    if (q.includes('academic') || q.includes('performance') || q.includes('prediction') || q.includes('project two') || q.includes('predict')) {
      return `The Academic Performance Prediction project utilizes Scikit-learn, Pandas, and Python. It is a machine learning pipeline that forecasts student performance grades and identifies at-risk profiles with 82% precision.`;
    }

    if (q.includes('skills') || q.includes('languages') || q.includes('technologies') || q.includes('know') || q.includes('stack')) {
      return `Harsha is proficient in Python, SQL, Java, JavaScript, and HTML/CSS. His AI toolbox includes Machine Learning, Computer Vision, CNN, TensorFlow, Keras, Scikit-learn, and OpenCV.`;
    }

    if (q.includes('certificates') || q.includes('certification') || q.includes('credentials') || q.includes('verify')) {
      return `Harsha holds 6 industry certificates, including Oracle AI/ML Certificate, Oracle Java Fundamentals, Oracle SQL Workshop, and Coursera credentials in Python & Data Structures.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('coordinate')) {
      return `You can reach Harsha via email at koriviharshavardhan129@gmail.com, call +91-6301821164, or connect with him via GitHub and LinkedIn. He is currently open to new roles!`;
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      if (typeof window !== 'undefined') window.open('/resume.pdf', '_blank');
      return `I have opened Harsha's PDF resume in a new tab for you. Let me know if you have other questions!`;
    }

    if (q.includes('who is') || q.includes('about') || q.includes('harsha') || q.includes('profile')) {
      return `${personalInfo.name} is a Computer Science graduate specializing in AI and Machine Learning. He is passionate about building intelligent models (using Python, TensorFlow, OpenCV) and scalable software products.`;
    }

    return "This information is currently unavailable. Ask me about Harsha's Projects, Technical Skills, Education history, Certifications, or Contact details.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] pointer-events-auto flex flex-col items-end">
      
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[320px] sm:w-[380px] h-[480px] rounded-[24px] glass-panel-heavy border border-white/10 flex flex-col overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] mb-4"
          >
            {/* Header */}
            <div className="bg-[#04070B] border-b border-white/5 px-4.5 py-3 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] pulse-glow" style={{ boxShadow: '0 0 8px #00E5FF' }} />
                <span className="font-mono text-xs font-bold text-white tracking-wider">AI ASSISTANT HUD</span>
              </div>
              <button
                onClick={() => {
                  play('click');
                  setIsOpen(false);
                }}
                className="p-1 rounded-lg hover:bg-white/5 text-[#6B7280] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 p-4.5 overflow-y-auto space-y-4 font-sans text-xs scroll-smooth">
              {messages.map((m, i) => (
                <div 
                  key={i}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-tr from-[#00E5FF]/20 to-[#7B61FF]/20 border border-[#00E5FF]/30 text-white rounded-br-none'
                        : 'bg-[#0B1120] border border-white/5 text-[#B8C1CC] rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0B1120] border border-white/5 p-3 rounded-2xl rounded-bl-none flex items-center gap-1.5 text-[#6B7280]">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-spin-slow" />
                    <span className="font-mono text-[9px] uppercase tracking-wider animate-pulse">Computing Response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips inside Chat */}
            <div className="p-3 bg-black/20 border-t border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap select-none scrollbar-none">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSendMessage(s)}
                  className="py-1.5 px-3 rounded-xl bg-white/3 border border-white/5 text-[9px] font-mono text-[#B8C1CC] hover:text-[#00E5FF] hover:border-[#00E5FF]/30 transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input Form Bar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 border-t border-white/5 bg-[#04070B] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask system assistant..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/3 border border-white/5 rounded-xl text-xs font-mono text-white placeholder-[#6B7280] outline-none focus:border-[#00E5FF] transition-all"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#00E5FF] text-[#04070B] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TOGGLE BUTTON / ORB */}
      <button
        id="ai-orb-toggle"
        onClick={() => {
          play('click');
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => play('hover')}
        className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 relative ${
          isOpen
            ? 'bg-[#FF4D6D] shadow-[0_0_20px_rgba(255,77,109,0.4)] border border-[#FF4D6D]/30 rotate-90'
            : 'bg-gradient-to-tr from-[#00E5FF] to-[#7B61FF] shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_#00E5FF] border border-white/10 hover:scale-110 hover:rotate-[15deg]'
        }`}
        title="Toggle Harsha OS AI Assistant"
      >
        {isOpen ? (
          <X className="w-5.5 h-5.5 text-white" />
        ) : (
          <>
            <MessageSquare className="w-5.5 h-5.5 text-white" />
            {/* Pulsing glow concentric circles */}
            <span className="absolute inset-[-4px] rounded-full border border-[#00E5FF]/20 animate-ping pointer-events-none" />
          </>
        )}
      </button>

    </div>
  );
};
