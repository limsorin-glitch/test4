import { PortfolioData } from './types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: '임서린 (Lim Sorin)',
    role: 'Full-Stack Developer (풀스택 개발자)',
    tagline: '사용자와 기술 사이의 더 편안한 연결을 만드는 개발자',
    bio: '안녕하세요! 탄탄한 기본기와 꼼꼼한 코드 설계를 지향하는 풀스택 개발자 임서린입니다. 직관적이고 반응이 빠른 클라이언트 사이드 UI 구현부터 효율적인 데이터베이스 및 서버 아키텍처 구성까지, 사용자 경험을 극대화하는 것에 열정을 가지고 있습니다. 새로운 핵심 기술 트렌드를 빠르게 학습하고 비즈니스 필요에 맞게 능동적으로 협업하는 솔루션 해결사입니다.',
    email: 'limsorin@gmail.com',
    phone: '010-1234-5678',
    github: 'https://github.com/limsorin',
    linkedin: 'https://linkedin.com/in/limsorin',
    blog: 'https://velog.io/@limsorin',
  },
  skills: [
    { id: 'sk-1', name: 'React', category: 'Frontend', level: 90 },
    { id: 'sk-2', name: 'TypeScript', category: 'Frontend', level: 85 },
    { id: 'sk-3', name: 'Tailwind CSS', category: 'Frontend', level: 95 },
    { id: 'sk-4', name: 'Next.js', category: 'Frontend', level: 80 },
    { id: 'sk-5', name: 'Node.js (Express)', category: 'Backend', level: 85 },
    { id: 'sk-6', name: 'Firestore / Firebase', category: 'Backend', level: 75 },
    { id: 'sk-7', name: 'PostgreSQL', category: 'Backend', level: 80 },
    { id: 'sk-8', name: 'Figma Prototyping', category: 'Design & Other', level: 85 },
    { id: 'sk-9', name: 'Git & GitHub Workflows', category: 'Design & Other', level: 90 },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'EduTrack: 실시간 학습 관리 솔루션',
      description: '학교 및 학원 현장에서 학생들의 실시간 진도율과 정답률을 추적하고 맞춤형 리포트를 제공하는 SaaS 대시보드 플랫폼입니다.',
      longDescription: '교육 소외 계층과 일반 학습자 모두가 웹 표준 및 접근성을 헤치지 않고 최상의 학습 상태를 진단할 수 있도록 기획되었습니다. React와 D3.js 기반의 다이나믹 차트 시스템을 채택하여 복잡한 학업 데이터를 직관적이고 시각적으로 표현하였으며, 메모리 누수를 완전히 제어했습니다.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Express', 'PostgreSQL'],
      links: {
        github: 'https://github.com/limsorin/edutrack',
        demo: 'https://example.com/edutrack',
      },
      category: 'Web Application',
    },
    {
      id: 'proj-2',
      title: 'EcoVibe: 제로웨이스트 커뮤니티 & 쇼핑',
      description: '친환경 라이프스타일을 전파하기 위해 사용자들이 직접 제로웨이스트 팁을 기록하고 관련 굿즈를 공동구매할 수 있는 친환경 종합 소셜 허브입니다.',
      longDescription: '사용자 친화적인 무한 스크롤, 정교한 태그 필터 메커니즘, 그리고 결제 프로세스를 시뮬레이션하는 깔끔한 결제 퍼널 구조를 제공합니다. 모바일 퍼스트 프론트엔드 설계를 적용하여 탭 전환 속도를 기존 서비스 대비 40% 이상 향상시켰습니다.',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase App', 'Figma'],
      links: {
        github: 'https://github.com/limsorin/ecovibe',
        demo: 'https://example.com/ecovibe',
      },
      category: 'E-Commerce / Community',
    },
    {
      id: 'proj-3',
      title: 'ZenFocus: AI 기반 테스크 오거나이저',
      description: '사용자가 집중력을 최상으로 유지하며 업무를 구성할 수 있도록 지원하는 개인용 태스크 오거나이저 및 명상 보조 오디오 플레이어입니다.',
      longDescription: '사용자가 해야 할 일의 세부 정보를 입력하면 카테고리별로 자동 분류를 수행하며, 집중 시간인 25분 동안 잔잔한 오밀조밀 사운드를 들을 수 있는 오디오 엔진이 내장되어 있습니다. 개인 로컬 스토리지를 활용한 빈틈 없는 오프라인 영속성을 지원합니다.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Storage API', 'Web Audio API'],
      links: {
        github: 'https://github.com/limsorin/zenfocus',
      },
      category: 'Productivity Tool',
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      company: 'CreativeTech Corp (크리에이티브테크 상사)',
      role: 'Frontend Software Engineer',
      period: '2024.03 ~ 현재',
      description: [
        '웹 표준과 상호작용 디자인 가이드를 수립하고, 사내 공통 디자인 시스템 컴포넌트 30여 개 공동 구축하여 개발 생산성 35% 증대',
        '기존 레거시 React 단일 아키텍처에서 최신 Vite 환경으로 빌드 시스템을 마이그레이션하여 로컬 구동 속도 4배 단축 및 빌드 번들 크기 28% 축소',
        '실시간 투표 및 현황 대시보드를 구축해 동시 접속자 수 5,000명 이상의 네트워크 트래픽을 지연 시간(Latency) 없이 처리 완료',
      ],
    },
    {
      id: 'exp-2',
      company: 'InnoSpace Lab (이노스페이스 연구소)',
      role: 'Junior Full-Stack Developer',
      period: '2022.05 ~ 2024.02',
      description: [
        'Express 프레임워크 기반 마이크로 서비스 서버들을 연동한 협업 업무 자동화 API 구축 및 배포',
        '소셜 로그인 연동(OAuth2.0) 및 JWT 기반 정밀 사용자 권한 세분화 처리로 내부 보안 감사 우수 평가 획득',
        '모바일 최적화 웹 메이트 서비스 구축으로 모바일 사용자 유입 비율을 기존 대비 120% 상승 유도',
      ],
    },
  ],
  messages: [
    {
      id: 'msg-demo',
      senderName: '구글 스타트업 액셀러레이터',
      senderEmail: 'hr@google-accelerator-demo.com',
      subject: '포트폴리오가 매우 훌륭합니다!',
      message: '안녕하세요 임서린님! 포트폴리오를 구성해두신 프로젝트들의 완성도가 아주 매력적입니다. 특히 EduTrack 대시보드 시각화 부분과 깔끔한 코드 스타일이 눈에 띕니다. 편하신 공간에서 캐주얼하게 한 번 커피챗 미팅을 나누고 싶어 연락드렸습니다.',
      sentAt: '2026-06-09T03:30:00Z',
    }
  ]
};
