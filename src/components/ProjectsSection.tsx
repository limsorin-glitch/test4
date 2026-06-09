import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { FolderGit2, Search, ExternalLink, Github, Code, ArrowUpRight, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filterTech, setFilterTech] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derive unique tech stacks dynamically from all projects
  const allTechs = useMemo(() => {
    const list = new Set<string>();
    projects.forEach((proj) => {
      proj.techStack.forEach((tech) => list.add(tech));
    });
    return ['All', ...Array.from(list)];
  }, [projects]);

  // Filter projects based on query and selected stack
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchTech = filterTech === 'All' || proj.techStack.includes(filterTech);
      const matchSearch =
        searchQuery === '' ||
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchTech && matchSearch;
    });
  }, [projects, filterTech, searchQuery]);

  return (
    <section id="projects" className="py-12 border-t-2 border-editorial-dark">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-editorial-dark" />
          <h2 className="text-2xl font-display font-black text-editorial-dark tracking-tight uppercase">수행 프로젝트 (Projects Showcase)</h2>
        </div>

        {/* Search Input */}
        <div className="relative self-stretch md:self-auto md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-editorial-dark/50" />
          <input
            type="text"
            placeholder="기술 스택이나 키워드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-editorial-dark placeholder-editorial-dark/40 bg-white border border-editorial-dark/15 focus:border-editorial-dark rounded-none pl-9 pr-4 py-2 text-xs outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Tech Filter Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6">
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setFilterTech(tech)}
            className={`px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all border ${
              filterTech === tech
                ? 'bg-editorial-dark text-editorial-beige border-editorial-dark'
                : 'bg-white text-editorial-dark border-editorial-dark/10 hover:border-editorial-dark'
            }`}
          >
            {tech === 'All' ? '전체 보기' : tech}
          </button>
        ))}
      </div>

      {/* Projects Grid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center text-editorial-dark/50 border-2 border-dashed border-editorial-dark/20 bg-white/50 rounded-none flex flex-col items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6 text-editorial-dark/30" />
              <p className="text-sm font-bold uppercase tracking-wider">부합하는 프로젝트 내역이 없습니다.</p>
              <p className="text-xs text-editorial-dark/60">다른 키워드로 검색하거나 필터를 풀어보세요.</p>
            </div>
          ) : (
            filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={proj.id}
                whileHover={{ y: -2 }}
                className="bg-white border border-editorial-dark/15 hover:border-editorial-dark rounded-none p-5 shadow-none transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-editorial-dark bg-editorial-beige border border-editorial-dark/15 px-2 py-0.5 rounded-none uppercase tracking-wider">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-editorial-dark/40">
                      ID: {proj.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-black text-editorial-dark tracking-tight mb-2">
                    {proj.title}
                  </h3>
                  
                  <p className="text-xs text-editorial-dark/70 leading-relaxed line-clamp-3 mb-4">
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Pills */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-[9px] font-mono font-bold bg-editorial-beige/40 border border-editorial-dark/5 text-editorial-dark/60 px-2 py-0.5 rounded-none uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions summary */}
                  <div className="flex items-center justify-between border-t border-editorial-dark/10 pt-3">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-xs font-bold uppercase tracking-wider text-editorial-dark hover:opacity-60 transition-all flex items-center gap-0.5"
                    >
                      상세 정보 확인 <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {proj.links.github && (
                        <a
                          href={proj.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-none text-editorial-dark/60 hover:text-editorial-dark bg-editorial-beige/30 hover:bg-white border border-editorial-dark/10 transition-all"
                          title="View GitHub Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.links.demo && (
                        <a
                          href={proj.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-none text-editorial-dark/60 hover:text-editorial-dark bg-editorial-beige/30 hover:bg-white border border-editorial-dark/10 transition-all"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-editorial-dark/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-none w-full max-w-2xl max-h-[85vh] overflow-y-auto border-2 border-editorial-dark shadow-2xl relative"
            >
              {/* Header bar */}
              <div className="sticky top-0 bg-white border-b border-editorial-dark/15 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-editorial-dark bg-editorial-beige border border-editorial-dark/15 px-2.5 py-1 rounded-none uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-editorial-dark/50 font-mono uppercase tracking-widest">프로젝트 상세</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-none hover:bg-editorial-beige text-editorial-dark/50 hover:text-editorial-dark transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-editorial-dark leading-tight mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-editorial-dark/80 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.longDescription && (
                  <div className="bg-editorial-beige/30 rounded-none p-5 border border-editorial-dark/15 space-y-2">
                    <h4 className="text-xs font-bold text-editorial-dark/40 uppercase tracking-widest border-b border-editorial-dark/10 pb-1">주요 개발 배경 및 챌린지 극복</h4>
                    <p className="text-xs sm:text-sm text-editorial-dark/80 leading-relaxed whitespace-pre-wrap font-sans">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                )}

                {/* Stacks */}
                <div>
                  <h4 className="text-xs font-bold text-editorial-dark/40 mb-2 uppercase tracking-widest">사용 기술 스택 (Tech Stack)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-mono font-bold bg-editorial-beige border border-editorial-dark/15 text-editorial-dark/70 px-2.5 py-1 rounded-none uppercase tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Outlinks warning */}
                <div className="p-4 bg-editorial-beige border border-editorial-dark/15 text-xs text-editorial-dark/85 leading-relaxed flex items-start gap-2.5 rounded-none">
                  <span className="text-sm">⚠️</span>
                  <p>
                    <strong>안내:</strong> 외부 데모 브라우징은 iFrame 보안상 제약이 있을 수 있으므로 새 탭 열기 활용을 권장합니다. 실제 주소는 포트폴리오를 내보낸 후 완벽하게 활성화됩니다.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-editorial-dark/15 px-6 py-4 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider text-editorial-dark/50 hover:text-editorial-dark transition-colors"
                >
                  닫기
                </button>

                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-editorial-dark hover:opacity-90 text-editorial-beige rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-4 h-4" /> 코드 저장소 방문
                  </a>
                )}

                {selectedProject.links.demo && (
                  <a
                    href={selectedProject.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-editorial-dark hover:opacity-90 text-editorial-beige rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> 서비스 라이브 데모
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
