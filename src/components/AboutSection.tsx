import React, { useState } from 'react';
import { Profile } from '../types';
import { User, Award, Flame, Heart, Puzzle, Coffee, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  const coreValues = [
    {
      id: 1,
      icon: <Flame className="w-5 h-5 text-tomato-500" />,
      title: '끊임없는 성장 (Growth)',
      desc: '안주하지 않고 매일 새로운 기술과 방법론에 관심을 보이며 성장합니다.',
      detail: '최근 대형 언어 모델(LLM) 프롬프트 엔지니어링 및 고성능 빌드 환경에 집중하고 있으며, 매달 기술 세미나 참여와 소스코드 분석을 즐깁니다.'
    },
    {
      id: 2,
      icon: <Puzzle className="w-5 h-5 text-indigo-500" />,
      title: '문제 해결 지향 (Problem Solving)',
      desc: '단순 코드 작성이 아닌, 비즈니스 본질에 닿아있는 효율적인 해결책을 냅니다.',
      detail: '정밀한 디바이스 뷰포트 상태 전이, 메모리 릭 해결, 불필요한 네트워크 스택 검토 등 효율 최적화 성과를 도출해왔습니다.'
    },
    {
      id: 3,
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: '공감과 소통 (Empathy)',
      desc: '기획자, 디자이너, 사용자의 입장에서 깊이 생각하고 부드럽게 소통합니다.',
      detail: '어려운 엔지니어링 용어를 넘어, 모두가 공감하는 보편적 가치와 스토리로 대화를 조율해 건강한 마일스톤 산출에 공헌합니다.'
    }
  ];

  const funTmis = [
    { icon: <Coffee className="w-4 h-4 text-amber-600" />, label: '선호 음료', value: '하루 에스프레소 2샷 가미된 아이스 아메리카노 1잔' },
    { icon: <Compass className="w-4 h-4 text-emerald-600" />, label: '협업 스타일', value: '체계적인 칸반 보드와 깔끔한 PR 설명 작성 지향' },
    { icon: <Award className="w-4 h-4 text-orange-500" />, label: '개발 보람', value: '직접 제작한 모듈을 동료와 유저가 편안하게 쓸 때' },
  ];

  return (
    <section id="about" className="py-12 border-t-2 border-editorial-dark">
      <div className="flex items-center gap-2 mb-8">
        <User className="w-5 h-5 text-editorial-dark" />
        <h2 className="text-2xl font-display font-black text-editorial-dark tracking-tight uppercase">저 입서린을 소개합니다 (About Me)</h2>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Bio text column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-none p-6 sm:p-8 border border-editorial-dark/15">
            <p className="text-editorial-dark/80 leading-relaxed font-sans text-base whitespace-pre-wrap">
              {profile.bio}
            </p>
          </div>
 
          <div>
            <h3 className="text-xs font-bold text-editorial-dark/50 mb-4 tracking-[0.2em] uppercase">핵심 가치 3요소</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {coreValues.map((val, index) => (
                <motion.div
                  key={val.id}
                  whileHover={{ y: -2 }}
                  className={`p-4 rounded-none border text-left cursor-pointer transition-all duration-300 ${
                    activeValue === index
                      ? 'bg-editorial-dark border-editorial-dark text-editorial-beige shadow-sm'
                      : 'bg-white border-editorial-dark/15 hover:border-editorial-dark text-editorial-dark'
                  }`}
                  onClick={() => setActiveValue(activeValue === index ? null : index)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-none ${activeValue === index ? 'bg-neutral-800' : 'bg-editorial-beige/40'}`}>
                      {val.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                      {activeValue === index ? '닫기' : '더보기'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{val.title}</h4>
                  <p className={`text-xs leading-normal ${activeValue === index ? 'text-editorial-beige/85' : 'text-editorial-dark/65'}`}>
                    {val.desc}
                  </p>
                  
                  {activeValue === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-editorial-beige/25 text-[11px] text-editorial-beige/70 font-sans leading-relaxed"
                    >
                      {val.detail}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Dynamic Details / Fun details column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-none p-6 border border-editorial-dark/15">
            <h3 className="text-sm font-bold text-editorial-dark mb-4 uppercase tracking-wider border-b border-editorial-dark/10 pb-2">소소하지만 확실한 정보 (TMI)</h3>
            <div className="space-y-4">
              {funTmis.map((tmi, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-editorial-beige/20 p-3 rounded-none border border-editorial-dark/10">
                  <div className="mt-0.5 p-2 rounded-none bg-white border border-editorial-dark/10 flex items-center justify-center">
                    {tmi.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-editorial-dark/40 uppercase tracking-widest">{tmi.label}</h4>
                    <p className="text-sm text-editorial-dark/85 font-sans mt-0.5">{tmi.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-none bg-editorial-beige/50 border border-editorial-dark/10 flex items-start gap-3">
              <span className="text-lg">💡</span>
              <p className="text-xs text-editorial-dark/70 leading-relaxed">
                상단의 <strong>'핵심 가치' 카드</strong>들을 한 번씩 터치해보세요. 각 가치에 얽힌 세부 철학과 에피소드를 즉시 볼 수 있어요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
