import type { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { cn } from '@/utils/cn';

interface ProjectGridProps {
  projects: Project[];
}

/**
 * Responsive grid of project cards.
 * Featured projects (AgriNaija) span the full row for primary hierarchy.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <li
          key={project.id}
          className={cn(project.featured && 'md:col-span-2')}
        >
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
