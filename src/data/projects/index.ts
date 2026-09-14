import type { Project } from '@/types';
import { agriNaija } from './agrinaija';

/** Showcase allowlist — AgriNaija only. DevHub must never be added here. */
export const projects: Project[] = [agriNaija].sort((a, b) => a.order - b.order);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export { agriNaija };
