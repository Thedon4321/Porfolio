import { Link } from 'react-router-dom';
import { Section } from '@/components/layout/Section';
import { HeadTags } from '@/components/seo/HeadTags';
import { buttonClassName } from '@/components/ui/Button';
import { buildPageTitle, notFoundSeo } from '@/lib/seo';

interface NotFoundPageProps {
  title?: string;
  message?: string;
  /** When false, parent already rendered HeadTags (e.g. ProjectPage) */
  manageHead?: boolean;
}

export function NotFoundPage({
  title = 'Page not found',
  message = 'The page you requested does not exist.',
  manageHead = true,
}: NotFoundPageProps) {
  const defaults = notFoundSeo();

  return (
    <>
      {manageHead ? (
        <HeadTags
          {...defaults}
          title={buildPageTitle(title)}
          description={message}
        />
      ) : null}
      <Section aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className="text-3xl font-bold">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-[var(--color-text-muted)]">{message}</p>
        <div className="mt-8">
          <Link to="/" className={buttonClassName()}>
            Go home
          </Link>
        </div>
      </Section>
    </>
  );
}
