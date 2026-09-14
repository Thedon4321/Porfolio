import type { SiteConfig } from '@/types';

export const site: SiteConfig = {
  siteName: 'Triumph Joe-Gabriel Udonta',
  siteUrl: import.meta.env.VITE_SITE_URL ?? '',
  defaultTitle: 'Triumph Joe-Gabriel Udonta | Junior Developer',
  defaultDescription:
    'Junior developer based in Port Harcourt, Nigeria — frontend-focused, learning backend, open to work and grow.',
  ogImage: '/images/og-placeholder.svg',
  twitterHandle: undefined,
};
