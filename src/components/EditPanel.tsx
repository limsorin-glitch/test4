import React, { useState } from 'react';
import { PortfolioData, Profile, Skill, Project, Experience } from '../types';
import { X, Save, Plus, Trash2, Edit3, ShieldAlert, Laptop, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface EditPanelProps {
  data: PortfolioData;
  onSave: (updatedData: PortfolioData) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function EditPanel({ data, onSave, onClose, onReset }: EditPanelProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects' | 'experiences'>('profile');
  
  // Local state for edits
  const [profile, setProfile] = useState<Profile>({ ...data.profile });
  const [skills, setSkills] = useState<Skill[]>([...data.skills]);
  const [projects, setProjects] = useState<Project[]>([...data.projects]);
  const [experiences, setExperiences] = useState<Experience[]>([...data.experiences]);

  // Skill state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'Frontend' | 'Backend' | 'Design & Other'>('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState(80);

  // Project item state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projLongDesc, setProjLongDesc] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projDemo, setProjDemo] = useState('');

  // Experience item state
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expDescBlocks, setExpDescBlocks] = useState('');

  // Save everything back
  const handleSaveAll = () => {
    onSave({
      profile,
      skills,
      projects,
      experiences,
      messages: data.messages // keep messages intact
    });
    onClose();
  };

  // SKILLS UTILITIES
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel
    };
    setSkills([...skills, newSkill]);
    setNewSkillName('');
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const handleUpdateSkillLevel = (id: string, newLevel: number) => {
    setSkills(skills.map(s => s.id === id ? { ...s, level: newLevel } : s));
  };


  // PROJECTS UTILITIES
  const handleAddOrEditProject = () => {
    if (!projTitle.trim() || !projDesc.trim()) return;

    const techArray = projTech.split(',').map(tag => tag.trim()).filter(Boolean);

    if (editingProjectId) {
      // Edit
      setProjects(projects.map(p => p.id === editingProjectId ? {
        ...p,
        title: projTitle.trim(),
        category: projCategory.trim() || 'General Web',
        description: projDesc.trim(),
        longDescription: projLongDesc.trim() || undefined,
        techStack: techArray,
        links: {
          github: projGithub.trim() || undefined,
          demo: projDemo.trim() || undefined
        }
      } : p));
      setEditingProjectId(null);
    } else {
      // Add
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projTitle.trim(),
        category: projCategory.trim() || 'General Web',
        description: projDesc.trim(),
        longDescription: projLongDesc.trim() || undefined,
        techStack: techArray,
        links: {
          github: projGithub.trim() || undefined,
          demo: projDemo.trim() || undefined
        }
      };
      setProjects([...projects, newProj]);
    }

    // Reset fields
    setProjTitle('');
    setProjCategory('');
    setProjDesc('');
    setProjLongDesc('');
    setProjTech('');
    setProjGithub('');
    setProjDemo('');
  };

  const startEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setProjTitle(p.title);
    setProjCategory(p.category);
    setProjDesc(p.description);
    setProjLongDesc(p.longDescription || '');
    setProjTech(p.techStack.join(', '));
    setProjGithub(p.links.github || '');
    setProjDemo(p.links.demo || '');
  };

  const handleDeleteProject = (id: string) => {
    if (editingProjectId === id) {
      setEditingProjectId(null);
    }
    setProjects(projects.filter(p => p.id !== id));
  };


  // EXPERIENCE UTILITIES
  const handleAddOrEditExperience = () => {
    if (!expCompany.trim() || !expRole.trim() || !expPeriod.trim()) return;

    const descList = expDescBlocks.split('\n').map(line => line.trim()).filter(Boolean);

    if (editingExpId) {
      // Edit
      setExperiences(experiences.map(e => e.id === editingExpId ? {
        ...e,
        company: expCompany.trim(),
        role: expRole.trim(),
        period: expPeriod.trim(),
        description: descList
      } : e));
      setEditingExpId(null);
    } else {
      // Add
      const newExp: Experience = {
        id: `exp-${Date.now()}`,
        company: expCompany.trim(),
        role: expRole.trim(),
        period: expPeriod.trim(),
        description: descList
      };
      setExperiences([...experiences, newExp]);
    }

    // Reset Fields
    setExpCompany('');
    setExpRole('');
    setExpPeriod('');
    setExpDescBlocks('');
  };

  const startEditExperience = (e: Experience) => {
    setEditingExpId(e.id);
    setExpCompany(e.company);
    setExpRole(e.role);
    setExpPeriod(e.period);
    setExpDescBlocks(e.description.join('\n'));
  };

  const handleDeleteExperience = (id: string) => {
    if (editingExpId === id) {
      setEditingExpId(null);
    }
    setExperiences(experiences.filter(e => e.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-editorial-dark/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        className="bg-white rounded-none w-full max-w-4xl h-[90vh] overflow-hidden border-2 border-editorial-dark shadow-2xl flex flex-col"
      >
        {/* Top Header */}
        <div className="bg-white text-editorial-dark px-6 py-5 flex items-center justify-between border-b border-editorial-dark/15 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-editorial-beige border border-editorial-dark/15 rounded-none">
              <Laptop className="w-5 h-5 text-editorial-dark" />
            </div>
            <div>
              <h2 className="text-base font-display font-black tracking-widest uppercase text-editorial-dark">포트폴리오 빌더 제어 패널 (Edit Studio)</h2>
              <p className="text-[10px] text-editorial-dark/50 font-mono uppercase">실시간 로컬 동적 데이터 영속화 중</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="text-xs bg-editorial-beige hover:bg-white hover:text-editorial-dark text-editorial-dark px-3 py-1.5 rounded-none border border-editorial-dark/20 font-bold uppercase tracking-wider transition cursor-pointer"
              title="Reset everything to demo defaults"
            >
              기본값 재설정 (Reset)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-none bg-editorial-beige text-editorial-dark/50 hover:text-editorial-dark transition cursor-pointer border border-editorial-dark/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-editorial-beige/30 border-b border-editorial-dark/15 px-4 pt-1 flex-wrap shrink-0">
          {[
            { id: 'profile', label: '기본 인적 사항' },
            { id: 'skills', label: '기술 스택 목록' },
            { id: 'projects', label: '수행 프로젝트 ' },
            { id: 'experiences', label: '업무 경력 리스트' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-editorial-dark text-editorial-dark font-black bg-white -mb-[1px] rounded-none'
                  : 'border-transparent text-editorial-dark/55 hover:text-editorial-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Forms Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* PROFILE TABS */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">성함 (Korean / English)</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2.5 outline-hidden focus:border-editorial-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">희망 직무 / 타이틀</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2.5 outline-hidden focus:border-editorial-dark"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">메인 슬로건 문패</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2.5 outline-hidden focus:border-editorial-dark"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">자기소개 본문 소개서</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2.5 outline-hidden focus:border-editorial-dark resize-none leading-relaxed"
                />
              </div>

              <div className="border-t border-editorial-dark/10 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">이메일 주소</label>
                  <input
                    type="text"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 focus:border-editorial-dark outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">휴대폰 번호</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 focus:border-editorial-dark outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">GitHub 링크</label>
                  <input
                    type="text"
                    value={profile.github}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 focus:border-editorial-dark outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">LinkedIn 링크</label>
                  <input
                    type="text"
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 focus:border-editorial-dark outline-hidden"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                  <label className="text-[9px] font-bold text-editorial-dark/50 uppercase tracking-widest">기술 블로그 링크</label>
                  <input
                    type="text"
                    value={profile.blog}
                    onChange={(e) => setProfile({ ...profile, blog: e.target.value })}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 focus:border-editorial-dark outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Add a Skill section */}
              <div className="bg-editorial-beige/30 border border-editorial-dark/15 p-4 rounded-none">
                <h3 className="text-xs font-bold text-editorial-dark mb-3 uppercase tracking-wider">신규 기술 추가</h3>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">기술명 (e.g. Kotlin)</label>
                    <input
                      type="text"
                      placeholder="입력..."
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">분류군</label>
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value as any)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Design & Other">Design & Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">숙련도 ({newSkillLevel}%)</label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                      className="w-full h-2 bg-editorial-beige border border-editorial-dark/15 rounded-none appearance-none cursor-pointer accent-editorial-dark mt-2"
                    />
                  </div>

                  <button
                    onClick={handleAddSkill}
                    className="sm:col-span-2 w-full px-4 py-2 bg-editorial-dark hover:opacity-90 text-editorial-beige rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> 추가
                  </button>
                </div>
              </div>

              {/* Skills Editor Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-editorial-dark uppercase tracking-wider">등록된 핵심 기술 리스트 ({skills.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((ski) => (
                    <div key={ski.id} className="p-3.5 bg-white border border-editorial-dark/15 rounded-none flex items-center justify-between gap-4 shadow-none">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-none ${
                            ski.category === 'Frontend' ? 'bg-editorial-dark' :
                            ski.category === 'Backend' ? 'bg-editorial-dark/80' : 'bg-editorial-dark/60'
                          }`} />
                          <span className="font-bold text-xs text-editorial-dark">{ski.name}</span>
                          <span className="text-[9px] font-mono text-editorial-dark/55">({ski.category})</span>
                        </div>
                        {/* Range slider direct inside item */}
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={ski.level}
                            onChange={(e) => handleUpdateSkillLevel(ski.id, Number(e.target.value))}
                            className="flex-1 h-1.5 bg-editorial-beige rounded-none cursor-pointer accent-editorial-dark"
                          />
                          <span className="text-[10px] font-mono text-editorial-dark font-bold w-7 text-right">{ski.level}%</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteSkill(ski.id)}
                        className="p-1.5 rounded-none text-editorial-dark/40 hover:text-rose-600 hover:bg-rose-50 transition shrink-0 border border-transparent hover:border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Add or Edit form block */}
              <div className="bg-editorial-beige/30 border border-editorial-dark/15 p-5 rounded-none space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-editorial-dark uppercase tracking-wider">
                    {editingProjectId ? '선택된 프로젝트 정보 편집' : '신규 프로젝트 추가 등록'}
                  </h3>
                  {editingProjectId && (
                    <button
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjTitle('');
                        setProjCategory('');
                        setProjDesc('');
                        setProjLongDesc('');
                        setProjTech('');
                        setProjGithub('');
                        setProjDemo('');
                      }}
                      className="text-[10px] text-rose-600 underline font-semibold"
                    >
                      편집 취소 / 초기화
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">프로젝트 타이틀 *</label>
                    <input
                      type="text"
                      placeholder="e.g. 스마트 급식 지킴이"
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">개발 카테고리 (e.g. Web App)</label>
                    <input
                      type="text"
                      placeholder="e.g. Web App / Android Client"
                      value={projCategory}
                      onChange={(e) => setProjCategory(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">한줄 요약 및 짧은 소개 *</label>
                  <input
                    type="text"
                    placeholder="프로젝트 카드를 꾸며줄 가벼운 세련된 한두 문항 설명..."
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">개발 심층 과제 및 성격 (Long Description, 선택)</label>
                  <textarea
                    rows={2}
                    placeholder="모달 창에서 제공할 비즈니스 상세 연내 배경 및 트래블슈팅 기록..."
                    value={projLongDesc}
                    onChange={(e) => setProjLongDesc(e.target.value)}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 resize-none outline-hidden focus:border-editorial-dark"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">기술 스택 (콤마 구분)</label>
                    <input
                      type="text"
                      placeholder="React, TypeScript, SQLite"
                      value={projTech}
                      onChange={(e) => setProjTech(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">GitHub 링크 (선택)</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={projGithub}
                      onChange={(e) => setProjGithub(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">Demo 링크 (선택)</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={projDemo}
                      onChange={(e) => setProjDemo(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddOrEditProject}
                  className="px-5 py-2.5 bg-editorial-dark hover:opacity-90 text-editorial-beige rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {editingProjectId ? '정보 업데이트 적용' : '프로젝트 신규 추가'}
                </button>
              </div>

              {/* List Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-editorial-dark uppercase tracking-wider font-mono">기존 리스트 ({projects.length})</h3>
                <div className="space-y-2">
                  {projects.map((p) => (
                    <div key={p.id} className="p-4 bg-white border border-editorial-dark/15 rounded-none flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold text-editorial-dark bg-editorial-beige border border-editorial-dark/15 px-2 py-0.5 rounded-none uppercase tracking-wider">{p.category}</span>
                          <h4 className="font-bold text-editorial-dark text-xs sm:text-sm">{p.title}</h4>
                        </div>
                        <p className="text-xs text-editorial-dark/65 mt-1 line-clamp-1">{p.description}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEditProject(p)}
                          className="p-1.5 rounded-none text-editorial-dark/65 hover:text-editorial-dark hover:bg-editorial-beige/30 transition border border-transparent hover:border-editorial-dark/10"
                          title="수정하기"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded-none text-editorial-dark/45 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-100"
                          title="삭제하기"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCES TAB */}
          {activeTab === 'experiences' && (
            <div className="space-y-6">
              {/* Add or Edit form container */}
              <div className="bg-editorial-beige/30 border border-editorial-dark/15 p-5 rounded-none space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-editorial-dark uppercase tracking-wider">
                    {editingExpId ? '선택된 활동 경력 수정' : '신규 활동 경력 추가'}
                  </h3>
                  {editingExpId && (
                    <button
                      onClick={() => {
                        setEditingExpId(null);
                        setExpCompany('');
                        setExpRole('');
                        setExpPeriod('');
                        setExpDescBlocks('');
                      }}
                      className="text-[10px] text-rose-600 underline font-semibold"
                    >
                      편집 취소
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">사명 / 기관 단체명 *</label>
                    <input
                      type="text"
                      placeholder="e.g. 구글 스타트업 랩"
                      value={expCompany}
                      onChange={(e) => setExpCompany(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">담당 역할 / 직무명 *</label>
                    <input
                      type="text"
                      placeholder="e.g. 프론트엔드 인턴"
                      value={expRole}
                      onChange={(e) => setExpRole(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">활동 기간 / 연도 *</label>
                    <input
                      type="text"
                      placeholder="e.g. 2025.10 ~ 2026.04"
                      value={expPeriod}
                      onChange={(e) => setExpPeriod(e.target.value)}
                      className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 outline-hidden focus:border-editorial-dark"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-widest">상세 성과/업무 상세 (엔터로 줄 구분) *</label>
                  <textarea
                    rows={3}
                    placeholder="사내 마이그레이션 도입 속도 개선 200% 달성&#10;공통 웹 에셋 다각화 구조 제안 등 한 줄씩 써주세요..."
                    value={expDescBlocks}
                    onChange={(e) => setExpDescBlocks(e.target.value)}
                    className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3 py-2 leading-relaxed outline-hidden focus:border-editorial-dark"
                  />
                </div>

                <button
                  onClick={handleAddOrEditExperience}
                  className="px-5 py-2.5 bg-editorial-dark hover:opacity-90 text-editorial-beige rounded-none text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {editingExpId ? '정보 업데이트 적용' : '이력 추가 등록'}
                </button>
              </div>

              {/* Experience List table */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-editorial-dark uppercase tracking-wider">이력 목록 ({experiences.length})</h3>
                <div className="space-y-2">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-4 bg-white border border-editorial-dark/15 rounded-none flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-editorial-dark text-sm leading-tight">{exp.company}</h4>
                        <p className="text-xs text-editorial-dark/70 font-semibold uppercase tracking-wider mt-0.5">{exp.role} · {exp.period}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEditExperience(exp)}
                          className="p-1.5 rounded-none text-editorial-dark/65 hover:text-editorial-dark hover:bg-editorial-beige/30 transition border border-transparent hover:border-editorial-dark/10"
                          title="수정"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="p-1.5 rounded-none text-editorial-dark/45 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-100"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer save/exit trigger row */}
        <div className="bg-editorial-beige/30 border-t border-editorial-dark/15 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-editorial-dark/60 text-xs font-medium">
            <ShieldAlert className="w-4 h-4 text-editorial-dark shrink-0 animate-pulse" />
            <span>임시 변경 사항은 저장 버튼을 누를 때 최종 적용됩니다.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider text-editorial-dark/60 hover:text-editorial-dark transition cursor-pointer"
            >
              닫기 (취소)
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2.5 bg-editorial-dark hover:opacity-90 text-editorial-beige rounded-none text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition cursor-pointer"
            >
              <Save className="w-4 h-4" /> 성과 데이터 최종 저장
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
