/**
 * Project data types — aligned with docs/DATA-MODEL.md
 */

export type ProjectStatus = 'shipped' | 'in-progress' | 'placeholder';

export interface ProjectArchitectureLayer {
  name: string;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  /** One-line card summary */
  description: string;
  longDescription?: string;
  category?: string;
  technologies: string[];
  features: string[];
  architectureSummary?: string;
  architectureLayers?: ProjectArchitectureLayer[];
  problem?: string;
  solution?: string;
  role?: string;
  deployment?: string;
  challenges?: string[];
  results?: string[];
  /** Path under /public or absolute URL; may be a placeholder asset */
  image: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  status: ProjectStatus;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Profile {
  name: string;
  title: string;
  shortBio: string;
  longBio?: string;
  photo: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  location?: string;
  availability?: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImage: string;
  twitterHandle?: string;
}
