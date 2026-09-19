import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { hasContent } from '@/utils/content';
import { hasExternalUrl, projectDisplayStatus } from '@/utils/project';

interface ProjectDetailsProps {
  project: Project;
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const headingId = `detail-${title.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <section className="mt-10" aria-labelledby={headingId}>
      <h2 id={headingId} className="text-xl font-semibold text-[var(--color-text)]">
        {title}
      </h2>
      <div className="mt-3 text-[var(--color-text-muted)]">{children}</div>
    </section>
  );
}

/**
 * Full case-study layout driven by the Project schema.
 * Renders optional subsections only when data exists; never invents content.
 */
export function ProjectDetails({ project }: ProjectDetailsProps) {
  const overview = hasContent(project.longDescription)
    ? project.longDescription
    : project.description;

  return (
    <article>
      <p className="mb-4 text-sm text-[var(--color-text-muted)]">
        <Link
          to="/#projects"
          className="transition-colors hover:text-[var(--color-text)]"
        >
          ← Back to projects
        </Link>
      </p>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1
            id="project-heading"
            className="text-display-3xl font-bold text-[var(--color-text)]"
          >
            {project.name}
          </h1>
          {project.featured ? <Badge variant="accent">Featured</Badge> : null}
          <Badge variant="outline">{projectDisplayStatus(project)}</Badge>
          {hasContent(project.category) ? (
            <Badge>{project.category}</Badge>
          ) : null}
        </div>

        <p className="prose-measure text-lg text-[var(--color-text-muted)]">
          {overview}
        </p>

        {project.status === 'placeholder' ? (
          <p className="text-sm text-[var(--color-text-muted)]">
            Details coming soon — placeholders only until verified content is
            supplied.
          </p>
        ) : null}
      </header>

      <div className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          width={1200}
          height={675}
          className="aspect-video w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = '/images/projects/missing-image.svg';
          }}
        />
      </div>

      {project.problem != null ? (
        <DetailBlock title="Problem">
          <p className="prose-measure whitespace-pre-line">{project.problem}</p>
        </DetailBlock>
      ) : null}

      {project.solution != null ? (
        <DetailBlock title="Solution">
          <p className="prose-measure whitespace-pre-line">{project.solution}</p>
        </DetailBlock>
      ) : null}

        <DetailBlock title="Links">
  <ul className="flex flex-wrap items-center gap-4">
    <li>
      <a
        href="https://agrinaija.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium"
      >
        AgriNaija link
      </a>
    </li>

    <li>
      {hasExternalUrl(project.githubUrl) ? (
        <ExternalLink href={project.githubUrl} className="font-medium">
          GitHub
        </ExternalLink>
      ) : (
        <span className="text-sm">TODO — GITHUB URL REQUIRED</span>
      )}
    </li>
  </ul>
</DetailBlock>      
      
      <div className="mt-12 flex flex-wrap gap-3">
        <Button href="/#contact">Contact about this project</Button>
        <Button href="/#projects" variant="secondary">
          All projects
        </Button>
      </div>
    </article>
  );
}
