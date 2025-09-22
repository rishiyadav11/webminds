export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Social {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Project {
  name: string;
  url: string;
  description?: string;
  tech?: string[];
}

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  socials: Social;
}

export interface Theme {
  name: string;
  color: string;
  accent: string;
}

export const themes: Theme[] = [
  { name: "Light", color: "bg-gray-100", accent: "bg-blue-500" },
  { name: "Dark", color: "bg-gray-900", accent: "bg-purple-500" },
  { name: "Cyan", color: "bg-cyan-50", accent: "bg-cyan-500" },
  { name: "Gradient", color: "bg-gradient-to-br from-purple-400 to-pink-400", accent: "bg-white" }
];
