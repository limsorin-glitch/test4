import React, { useState, useMemo } from 'react';
import { Skill } from '../types';
import { Cpu, CheckCircle2, ChevronRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Frontend' | 'Backend' | 'Design & Other'>('All');
  const [sortBy, setSortBy] = useState<'level' | 'name'>('level');

  const filteredSkills = useMemo(() => {
    let list = [...skills];
    if (selectedCategory !== 'All') {
      list = list.filter((s) => {
        if (selectedCategory === 'Design & Other') {
          return s.category === 'Design & Other';
        }
        return s.category === selectedCategory;
      });
    }

    if (sortBy === 'level') {
      list.sort((a, b) => b.level - a.level);
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [skills, selectedCategory, sortBy]);

  // General statistics
  const skillStats = useMemo(() => {
    if (skills.length === 0) return { avg: 0, highCount: 0 };
    const avg = Math.round(skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length);
    const highCount = skills.filter(s => s.level >= 85).length;
    return { avg, highCount };
  }, [skills]);

  return (
    <section id="skills" className="py-12 border-t-2 border-editorial-dark">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-editorial-dark" />
          <h2 className="text-2xl font-display font-black text-editorial-dark tracking-tight uppercase">전문 강점 기술 (Skills Core)</h2>
        </div>

        {/* Categories and Sort controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Tabs */}
          <div className="inline-flex bg-editorial-beige border border-editorial-dark/10 p-1 rounded-none text-xs gap-1">
            {['All', 'Frontend', 'Backend', 'Design & Other'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-3 py-1.5 rounded-none font-bold transition-all uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-editorial-dark text-editorial-beige'
                    : 'text-editorial-dark/60 hover:text-editorial-dark'
                }`}
              >
                {cat === 'All' ? '전체' : cat}
              </button>
            ))}
          </div>

          {/* Quick Sort Controls */}
          <div className="flex items-center bg-white border border-editorial-dark/15 rounded-none px-2.5 py-1 text-xs text-editorial-dark gap-1.5 font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 outline-hidden font-bold cursor-pointer text-xs"
            >
              <option value="level">높은 지식순</option>
              <option value="name">가나다순</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Stats card */}
        <div className="lg:col-span-4 bg-white text-editorial-dark border border-editorial-dark rounded-none p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 bg-editorial-beige text-editorial-dark font-mono text-[9px] uppercase font-bold py-1 px-2.5 border border-editorial-dark/10 mb-6 tracking-widest">
              <Sparkles className="w-3 h-3 text-editorial-dark" /> TECH MASTER MATRIX
            </div>
            
            <h3 className="text-xl font-display font-black tracking-tight mb-2 leading-snug">
              숙련도 및 아키텍처 역량
            </h3>
            <p className="text-xs text-editorial-dark/70 mb-6 leading-relaxed">
              수십 번의 실무 최적화와 커뮤니티 기여를 거치며 실효성 있는 실력을 단련했습니다. 코드의 확장성과 유지 보수 편의성을 항상 염두에 둡니다.
            </p>
          </div>

          <div className="space-y-4 relative z-10 pt-4 border-t border-editorial-dark/15">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-editorial-dark/50">보유 기술 항목 수</span>
              <span className="text-lg font-bold font-mono">{skills.length}개</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-editorial-dark/50">핵심 마스터리 (85%+)</span>
              <span className="text-lg font-bold font-mono text-editorial-dark">{skillStats.highCount}개</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-editorial-dark/50">종합 기술 숙련 지수</span>
              <span className="text-lg font-bold font-mono text-editorial-dark">{skillStats.avg}%</span>
            </div>
          </div>
        </div>

        {/* Right Skills bars rendering */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.length === 0 ? (
              <div className="col-span-2 py-12 text-center text-editorial-dark/40 border-2 border-dashed border-editorial-dark/20 bg-white/50 rounded-none">
                지정한 카테고리의 기술이 존재하지 않습니다.
              </div>
            ) : (
              filteredSkills.map((ski) => (
                <div
                  key={ski.id}
                  className="bg-white border border-editorial-dark/10 p-4 rounded-none shadow-none flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-none ${
                        ski.category === 'Frontend' ? 'bg-editorial-dark' :
                        ski.category === 'Backend' ? 'bg-editorial-dark/50' : 'bg-editorial-dark/30'
                      }`} />
                      <span className="font-bold text-editorial-dark text-sm">{ski.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-editorial-dark/60 bg-editorial-beige px-2 py-0.5 border border-editorial-dark/10 rounded-none">
                      {ski.category} {ski.level}%
                    </span>
                  </div>

                  {/* Range Bar */}
                  <div className="w-full bg-editorial-beige h-1.5 rounded-none overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ski.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-editorial-dark"
                    />
                  </div>

                  {/* Level tag interpretation */}
                  <div className="flex justify-between items-center mt-2.5">
                    <span className="text-[10px] text-editorial-dark/50 font-bold uppercase tracking-wider">
                      {ski.level >= 90 ? '전문가 수준 (Mastery)' :
                       ski.level >= 80 ? '비즈니스 적용 (Advanced)' : '지속 강화 지향'}
                    </span>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${
                      ski.level >= 85 ? 'text-editorial-dark' : 'text-editorial-dark/20'
                    }`} />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex gap-4 text-[10px] font-bold uppercase tracking-wider text-editorial-dark/50 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-editorial-dark" /> Frontend
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-editorial-dark/50" /> Backend
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-editorial-dark/30" /> Design & Tools
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
