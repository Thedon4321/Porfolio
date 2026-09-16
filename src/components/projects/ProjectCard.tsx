import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { buttonClassName } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';
import { projectDisplayStatus } from '@/utils/project';

interface ProjectCardProps {
  project: Project;
}

/**
 * Summary card linking to `/projects/:slug`.
 * Featured projects (AgriNaija) get stronger visual hierarchy.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const headingId = `project-card-${project.id}`;

  return (
    <Card
      variant="interactive"
      className={cn(
        'group flex h-full flex-col gap-4',
        project.featured &&
          'border-[var(--color-accent)]/45 ring-1 ring-[var(--color-accent-soft)] md:flex-row md:items-stretch md:gap-6',
      )}
      aria-labelledby={headingId}
    >
      <div
        className={cn(
          'overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]',
          project.featured &&
            'border-[var(--color-accent)]/30 md:w-[min(100%,22rem)] md:shrink-0',
        )}
      >
        <img
          src={project.image}
          alt={`${project.name} preview`}
          width={640}
          height={360}
          className="media-zoom aspect-video w-full object-cover md:h-full md:min-h-48 md:object-cover"
          onError={(event) => {
            event.currentTarget.src = '/images/projects/missing-image.svg';
          }}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            id={headingId}
            className={cn(
              'font-semibold text-[var(--color-text)]',
              project.featured ? 'text-2xl' : 'text-xl',
            )}
          >
            {project.name}
          </h3>
          {project.featured ? <Badge variant="accent">Featured</Badge> : null}
          <Badge variant={project.featured ? 'outline' : 'muted'}>
            {projectDisplayStatus(project)}
          </Badge>
        </div>

        <p className="text-sm text-[var(--color-text-muted)]">
          {project.description}
        </p>

        {project.technologies.length > 0 ? (
          <ul
            className="flex flex-wrap gap-2"
            aria-label={`${project.name} technologies`}
          >
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">
            TODO — TECH STACK REQUIRED
          </p>
        )}

        <div className="mt-auto pt-2">
          <Link
            to={`/projects/${project.slug}`}
            className={buttonClassName({
              variant: project.featured ? 'primary' : 'secondary',
            })}
          >
            {project.featured ? 'View featured case study' : 'View case study'}
          </Link>
        </div>
      </div>
    </Card>
  );
}
