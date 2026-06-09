export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  blog: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Design & Other';
  level: number; // 0 to 100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
  };
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  sentAt: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  messages: ContactMessage[];
}
