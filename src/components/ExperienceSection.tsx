import React, { useState } from 'react';
import { Experience } from '../types';
import { Briefcase, Calendar, CheckSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-12 border-t-2 border-editorial-dark">
      <div className="flex items-center gap-2 mb-8">
        <Briefcase className="w-5 h-5 text-editorial-dark" />
        <h2 className="text-2xl font-display font-black text-editorial-dark tracking-tight uppercase">업무 및 활동 이력 (Experiences)</h2>
      </div>

      <div className="relative border-l border-editorial-dark ml-3 md:ml-6 pl-6 md:pl-10 space-y-8 py-3">
        {experiences.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div key={exp.id || index} className="relative group">
              {/* Timeline marker icon */}
              <div className="absolute -left-[35px] md:-left-[51px] top-1.5 bg-white border-2 border-editorial-dark w-6 h-6 rounded-none flex items-center justify-center shadow-none transition-colors group-hover:bg-editorial-dark group-hover:text-white">
                <span className="w-1.5 h-1.5 bg-editorial-dark group-hover:bg-white" />
              </div>

              {/* Box container */}
              <div className="bg-white border border-editorial-dark/15 hover:border-editorial-dark rounded-none p-5 md:p-6 transition-all shadow-none duration-300">
                <div 
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-editorial-dark/60 bg-editorial-beige border border-editorial-dark/10 px-2.5 py-0.5 rounded-none mb-2">
                      <Calendar className="w-3 h-3 text-editorial-dark/50" /> {exp.period}
                    </span>
                    <h3 className="text-lg font-display font-black text-editorial-dark transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-editorial-dark/50 mt-0.5">
                      {exp.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-editorial-dark/40 hidden sm:inline">
                      {isExpanded ? '상세 접기' : '상세 보기'}
                    </span>
                    <button className="p-1.5 rounded-none bg-editorial-beige border border-editorial-dark/15 hover:bg-white transition-colors">
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-editorial-dark" /> : <ChevronDown className="w-3.5 h-3.5 text-editorial-dark" />}
                    </button>
                  </div>
                </div>

                {/* Subtasks and descriptions */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 pt-5 border-t border-editorial-dark/10 space-y-3 pl-1">
                        {exp.description.map((desc, i) => (
                          <div key={i} className="flex gap-2.5 items-start">
                            <CheckSquare className="w-4 h-4 text-editorial-dark mt-0.5 shrink-0" />
                            <p className="text-sm text-editorial-dark/80 leading-relaxed font-sans">
                              {desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
