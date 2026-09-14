import { site } from '@/data/site';
import { hasContent } from '@/utils/content';
import { profile } from '@/data/profile';
import type { Project } from '@/types';

/** Trim trailing slash; empty when VITE_SITE_URL is unset (never invent localhost). */
export function getSiteOrigin(): string {
  const raw = (site.siteUrl || import.meta.env.VITE_SITE_URL || '').trim();
  if (!raw) return '';
  return raw.replace(/\/$/, '');
}

export function absoluteUrl(pathOrUrl: string): string | undefined {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const origin = getSiteOrigin();
  if (!origin) return undefined;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${origin}${path}`;
}

export function buildPageTitle(pageTitle: string): string {
  if (pageTitle.includes('|')) return pageTitle;
  return `${pageTitle} | ${site.siteName}`;
}

export function truncateMeta(text: string, max = 160): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

export function homeSeo() {
  const titlePart = hasContent(profile.title)
    ? profile.title
    : 'Software Developer';
  const title = hasContent(profile.name)
    ? `${profile.name} | ${titlePart}`
    : site.defaultTitle;

  const description = hasContent(profile.shortBio)
    ? truncateMeta(profile.shortBio)
    : truncateMeta(site.defaultDescription);

  return {
    title,
    description,
    path: '/',
    image: site.ogImage,
    type: 'website' as const,
    siteName: hasContent(profile.name) ? profile.name : site.siteName,
  };
}

export function projectSeo(project: Project) {
  const name = hasContent(profile.name) ? profile.name : site.siteName;
  const title = hasContent(project.seoTitle)
    ? project.seoTitle!
    : `${project.name} | ${name}`;

  const descriptionSource = hasContent(project.seoDescription)
    ? project.seoDescription!
    : project.description;

  return {
    title,
    description: truncateMeta(descriptionSource),
    path: `/projects/${project.slug}`,
    image: project.image || site.ogImage,
    type: 'article' as const,
    siteName: site.siteName,
  };
}

export function notFoundSeo() {
  return {
    title: buildPageTitle('Page not found'),
    description: 'The requested page could not be found on this portfolio.',
    path: '/404',
    image: site.ogImage,
    type: 'website' as const,
    noIndex: true,
    siteName: site.siteName,
  };
}

export function styleGuideSeo() {
  return {
    title: buildPageTitle('Style guide'),
    description: 'Internal design-system sandbox for this portfolio.',
    path: '/styleguide',
    image: site.ogImage,
    type: 'website' as const,
    noIndex: true,
    siteName: site.siteName,
  };
}

/** Person + WebSite JSON-LD — only verified profile fields. */
export function buildHomeJsonLd(): Record<string, unknown>[] {
  const origin = getSiteOrigin();
  const sameAs = [
    hasContent(profile.githubUrl) ? profile.githubUrl! : null,
    hasContent(profile.linkedinUrl) ? profile.linkedinUrl! : null,
  ].filter(Boolean) as string[];

  const person: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: hasContent(profile.name) ? profile.name : undefined,
    jobTitle: hasContent(profile.title) ? profile.title : undefined,
    description: hasContent(profile.shortBio) ? profile.shortBio : undefined,
    url: origin || undefined,
    image: absoluteUrl(profile.photo),
    email: hasContent(profile.email) ? profile.email : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  // Strip undefined keys
  for (const key of Object.keys(person)) {
    if (person[key] === undefined) delete person[key];
  }

  const website: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: hasContent(profile.name) ? profile.name : site.siteName,
    url: origin || undefined,
    description: truncateMeta(
      hasContent(profile.shortBio) ? profile.shortBio : site.defaultDescription,
    ),
  };
  for (const key of Object.keys(website)) {
    if (website[key] === undefined) delete website[key];
  }

  return [person, website];
}

export function buildProjectJsonLd(project: Project): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: truncateMeta(project.description),
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image),
  };

  if (project.technologies.length > 0) {
    data.keywords = project.technologies.join(', ');
  }

  for (const key of Object.keys(data)) {
    if (data[key] === undefined) delete data[key];
  }
  return data;
}
