import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { profile } from '@/data/profile';
import { hasContent } from '@/utils/content';

/**
 * Credibility section — bio + optional location/availability/links from profile.
 * Omits empty optional fields; surfaces TODO placeholders instead of inventing facts.
 */
export function About() {
  const hasLongBio = hasContent(profile.longBio);
  const lead = profile.shortBio;
  const body = hasLongBio ? profile.longBio : null;

  const metaItems = [
    hasContent(profile.location)
      ? { label: 'Location', value: profile.location! }
      : null,
    hasContent(profile.availability)
      ? { label: 'Availability', value: profile.availability! }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const links = [
    hasContent(profile.githubUrl)
      ? { href: profile.githubUrl!, label: 'GitHub' }
      : null,
    hasContent(profile.linkedinUrl)
      ? { href: profile.linkedinUrl!, label: 'LinkedIn' }
      : null,
    hasContent(profile.resumeUrl)
      ? { href: profile.resumeUrl!, label: 'Resume / CV' }
      : null,
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  const emailHref = hasContent(profile.email)
    ? `mailto:${profile.email}`
    : null;

  return (
    <Section id="about" aria-labelledby="about-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-14">
        <div>
          <h2
            id="about-heading"
            className="text-display-2xl font-semibold text-[var(--color-text)]"
          >
            About
          </h2>
          {hasContent(profile.title) ? (
            <p className="mt-3 text-[var(--color-text-muted)]">{profile.title}</p>
          ) : null}
        </div>

        <div className="space-y-6">
          <p className="prose-measure text-lg text-[var(--color-text-muted)]">
            {lead}
          </p>

          {body ? (
            <p className="prose-measure whitespace-pre-line text-[var(--color-text-muted)]">
              {body}
            </p>
          ) : null}

          {metaItems.length > 0 ? (
            <dl className="grid gap-3 sm:grid-cols-2">
              {metaItems.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-[var(--color-text)]">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">
              TODO — LOCATION / AVAILABILITY REQUIRED
            </p>
          )}

          {(links.length > 0 || emailHref) && (
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {emailHref ? (
                <li>
                  <a
                    href={emailHref}
                    className="text-sm font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
                  >
                    Email
                  </a>
                </li>
              ) : null}
              {links.map((link) => (
                <li key={link.href}>
                  <ExternalLink href={link.href} className="text-sm font-medium">
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          )}

          <div className="pt-2">
            <Button href="#contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
