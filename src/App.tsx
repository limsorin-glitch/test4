import React, { useState, useEffect } from 'react';
import { PortfolioData, Profile, Skill, Project, Experience, ContactMessage } from './types';
import { INITIAL_PORTFOLIO_DATA } from './data';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import EditPanel from './components/EditPanel';

import { 
  Briefcase, 
  Settings, 
  MapPin, 
  Mail, 
  Github, 
  Linkedin, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  ArrowUp,
  Download,
  Terminal,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LOCAL_STORAGE_KEY = 'sorin_portfolio_data_v1';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse portfolio data from localStorage, using defaults.', e);
      }
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(portfolioData));
  }, [portfolioData]);

  // Timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handlers for Portfolio updates
  const handleSaveData = (updatedData: PortfolioData) => {
    setPortfolioData(updatedData);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('정말 최초 데모 데이터로 되돌리시겠습니까? 작성 중인 포트폴리오는 초기화됩니다.')) {
      setPortfolioData(INITIAL_PORTFOLIO_DATA);
      setIsEditOpen(false);
    }
  };

  const handleSendMessage = (newMsg: Omit<ContactMessage, 'id' | 'sentAt'>) => {
    const messageItem: ContactMessage = {
      ...newMsg,
      id: `msg-${Date.now()}`,
      sentAt: new Date().toISOString()
    };
    setPortfolioData(prev => ({
      ...prev,
      messages: [messageItem, ...prev.messages]
    }));
  };

  const handleDeleteMessage = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      messages: prev.messages.filter(msg => msg.id !== id)
    }));
  };

  // Profile fields reference
  const { profile, skills, projects, experiences, messages } = portfolioData;

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Format dynamic clock nicely
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-editorial-beige text-editorial-dark selection:bg-editorial-dark selection:text-editorial-beige font-sans antialiased text-sm border-[12px] sm:border-[16px] border-white p-2 sm:p-4 md:p-8">
      
      {/* Editorial Decorative Grid lines */}
      <div className="absolute left-[3%] top-0 w-px h-full bg-editorial-dark/5 pointer-events-none -z-10" />
      <div className="absolute right-[3%] top-0 w-px h-full bg-editorial-dark/5 pointer-events-none -z-10" />

      {/* Floating Status / Saving feedback Banner */}
      <AnimatePresence>
        {showSaveAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-20 right-6 bg-editorial-dark text-editorial-beige px-4 py-3 rounded-none shadow-md border border-editorial-dark z-50 flex items-center gap-2.5"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold tracking-tight">DATA STORED SUCCESSFULLY</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY GLASS HEADER */}
      <header className="sticky top-0 bg-editorial-beige/90 backdrop-blur-md border-b border-editorial-dark/15 z-30 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-editorial-dark rounded-full" />
            <span className="font-display font-black text-lg text-editorial-dark tracking-tight cursor-pointer uppercase" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              SR_PORTFOLIO.vol_02
            </span>
          </div>

          {/* Nav items */}
          <nav className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-editorial-dark/70">
            {['about', 'skills', 'projects', 'experience', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => handleScrollToSection(sect)}
                className="hover:text-editorial-dark transition-colors cursor-pointer border-b border-transparent hover:border-editorial-dark/60 pb-0.5"
              >
                {sect === 'about' ? '소개 (About)' :
                 sect === 'skills' ? '기술 스택 (Specs)' :
                 sect === 'projects' ? '수행 업무 (Works)' :
                 sect === 'experience' ? '이력 (Career)' : '연락처 (Inquiries)'}
              </button>
            ))}
          </nav>

          {/* Command controls right */}
          <div className="flex items-center gap-3">
            {/* Live Clock Display */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/40 rounded-none text-[10px] font-bold tracking-widest text-editorial-dark border border-editorial-dark/10 font-mono">
              <Clock className="w-3.5 h-3.5 text-editorial-dark/50" />
              <span>{formatTime(currentTime)}</span>
            </div>

            {/* Config Trigger */}
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-4 py-2 bg-editorial-dark hover:opacity-90 active:scale-95 text-editorial-beige rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-none cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" /> EDIT HUB
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* HERO BANNER BLOCK */}
        <section className="bg-white border border-editorial-dark/15 rounded-none p-6 sm:p-10 lg:p-14 shadow-none transition-all relative overflow-hidden flex flex-col justify-between gap-12 lg:min-h-[440px]">
          {/* Subtle grid vector graphic representing software architecture */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Avatar image frame */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative group p-1.5 bg-white border border-editorial-dark/20">
                <div className="w-36 h-36 sm:w-44 sm:h-44 bg-slate-50 overflow-hidden relative">
                  <img
                    src="/src/assets/images/profile_avatar_1780991327361.png"
                    alt={profile.name}
                    className="w-full h-full object-cover select-none filter contrast-[1.05]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback avatar in case generation files are missing
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/sorinprofile/400/400`;
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Identity column */}
            <div className="lg:col-span-9 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 text-editorial-dark/60 font-bold text-[10px] uppercase tracking-[0.3em] ">
                <span className="w-1.5 h-1.5 bg-editorial-dark rounded-full" /> ARCHITECTURAL PORTFOLIO HUB
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-editorial-dark tracking-tight leading-none">
                  {profile.name}
                </h1>
                <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.3em] text-editorial-dark/70">
                  {profile.role}
                </p>
              </div>

              {/* Elegant Accent quote */}
              <div className="border-l-2 border-editorial-dark pl-4 py-1.5 my-4">
                <p className="font-display italic text-lg sm:text-xl md:text-2xl text-editorial-dark leading-tight max-w-xl">
                  "{profile.tagline}"
                </p>
              </div>

              {/* Badges container */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-2">
                <div className="flex items-center gap-1.5 text-editorial-dark/70 font-mono text-[10px] bg-editorial-beige/40 border border-editorial-dark/10 px-2.5 py-1 rounded-none uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-editorial-dark/40" /> Seoul, South Korea
                </div>
                <div className="flex items-center gap-1.5 text-editorial-dark/70 font-mono text-[10px] bg-editorial-beige/40 border border-editorial-dark/10 px-2.5 py-1 rounded-none uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5 text-editorial-dark/40" /> KST · {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick links block on bottom */}
          <div className="border-t border-editorial-dark/15 pt-6 flex flex-wrap justify-center lg:justify-between items-center gap-4 relative z-10 text-xs text-editorial-dark">
            <div className="flex items-center gap-6">
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:opacity-60 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Github className="w-4 h-4 text-editorial-dark/50" /> GitHub Repo
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-60 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Linkedin className="w-4 h-4 text-editorial-dark/50" /> LinkedIn
              </a>
              <a href={profile.blog} target="_blank" rel="noreferrer" className="hover:opacity-60 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Compass className="w-4 h-4 text-editorial-dark/50" /> Technical Blog
              </a>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-[10px] font-mono text-editorial-dark/40 tracking-tight italic">
                * Click on 'EDIT HUB' or configure options above to live reload custom credentials
              </p>
            </div>
          </div>
        </section>

        {/* DETAILED CONTENT SHOWCASES - RENDERED AS ELEGANT SEPARATED PAGES */}
        <div className="space-y-6">
          
          {/* ABOUT SECTION */}
          <AboutSection profile={profile} />

          {/* SKILLS SECTION */}
          <SkillsSection skills={skills} />

          {/* PROJECTS SECTION */}
          <ProjectsSection projects={projects} />

          {/* EXPERIENCES TIMELINE SECTION */}
          <ExperienceSection experiences={experiences} />

          {/* CONTACT INFO WITH INTERACTIVE MESSAGING LOGS */}
          <ContactSection 
            profile={profile} 
            messages={messages} 
            onSendMessage={handleSendMessage}
            onDeleteMessage={handleDeleteMessage}
          />

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white text-editorial-dark mt-16 py-12 border-t-2 border-editorial-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-editorial-dark/60">
          <div>
            <p className="font-display font-black text-lg text-editorial-dark tracking-tight mb-2 uppercase">
              SR_PORTFOLIO.vol_02
            </p>
            <p className="font-sans font-medium text-[10px] uppercase tracking-wider">
              © {currentTime.getFullYear()} 임서린. All Rights Reserved. Powered by Google AI Studio.
            </p>
          </div>

          <div className="flex items-center gap-4 text-editorial-dark/70 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-editorial-dark hover:opacity-60 transition cursor-pointer"
            >
              내용 커스텀 빌더 열기
            </button>
            <span>·</span>
            <button
              onClick={() => handleScrollToSection('about')}
              className="hover:text-editorial-dark transition cursor-pointer"
            >
              맨 위로 가기
            </button>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE EDITING PANEL MODAL */}
      <AnimatePresence>
        {isEditOpen && (
          <EditPanel 
            data={portfolioData}
            onSave={handleSaveData}
            onClose={() => setIsEditOpen(false)}
            onReset={handleResetData}
          />
        )}
      </AnimatePresence>

      {/* SCROLL TO TOP TRIGGER BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 bg-slate-900 border border-slate-800 text-white rounded-full shadow-lg hover:bg-slate-800 transition z-40 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
