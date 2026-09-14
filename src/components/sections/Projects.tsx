import { Section } from '@/components/layout/Section';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { projects } from '@/data/projects';

/**
 * Projects showcase — AgriNaija (featured) only.
 */
export function Projects() {
  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <div className="max-w-2xl">
        <h2
          id="projects-heading"
          className="text-display-2xl font-semibold text-[var(--color-text)]"
        >
          Projects
        </h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Selected work: AgriNaija as the primary case study.
        </p>
      </div>

      <div className="mt-8">
        <ProjectGrid projects={projects} />
      </div>
    </Section>
  );
}
