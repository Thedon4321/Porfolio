import { useEffect } from 'react';
import { absoluteUrl } from '@/lib/seo';

export interface HeadTagsProps {
  title: string;
  description: string;
  /** Pathname starting with `/` */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  siteName?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string | undefined,
): void {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!content) {
    el?.remove();
    return;
  }

  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string | undefined): void {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;

  if (!href) {
    el?.remove();
    return;
  }

  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(
  data: Record<string, unknown> | Record<string, unknown>[] | undefined,
): void {
  const id = 'portfolio-json-ld';
  document.getElementById(id)?.remove();
  if (!data) return;

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Client-side document head manager for the SPA.
 * Uses VITE_SITE_URL for absolute canonical/OG URLs when configured.
 */
export function HeadTags({
  title,
  description,
  path,
  image = '/images/og-placeholder.svg',
  type = 'website',
  siteName = 'Portfolio',
  noIndex = false,
  jsonLd,
}: HeadTagsProps) {
  useEffect(() => {
    document.title = title;

    const canonical = absoluteUrl(path);
    const imageAbsolute = absoluteUrl(image) ?? image;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', imageAbsolute);
    upsertMeta('property', 'og:site_name', siteName);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageAbsolute);

    upsertJsonLd(jsonLd);
  }, [title, description, path, image, type, siteName, noIndex, JSON.stringify(jsonLd)]);

  return null;
}
