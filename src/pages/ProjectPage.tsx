import { useParams } from 'react-router-dom';
import { Section } from '@/components/layout/Section';
import { HeadTags } from '@/components/seo/HeadTags';
import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { getProjectBySlug } from '@/data/projects';
import { buildProjectJsonLd, notFoundSeo, projectSeo } from '@/lib/seo';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    const seo = notFoundSeo();
    return (
      <>
        <HeadTags
          {...seo}
          title="Project not found | Portfolio"
          description={`No project matches the slug “${slug ?? ''}”.`}
        />
        <NotFoundPage
          manageHead={false}
          title="Project not found"
          message={`No project matches the slug “${slug ?? ''}”. This portfolio currently showcases AgriNaija (/projects/agrinaija).`}
        />
      </>
    );
  }

  const seo = projectSeo(project);

  return (
    <>
      <HeadTags {...seo} jsonLd={buildProjectJsonLd(project)} />
      <Section aria-labelledby="project-heading" className="pt-8">
        <ProjectDetails project={project} />
      </Section>
    </>
  );
}
