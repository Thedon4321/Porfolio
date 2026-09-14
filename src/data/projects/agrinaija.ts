import type { Project } from '@/types';

/**
 * AgriNaija — primary / featured portfolio project.
 * Only verified facts from docs/PROJECTS.md. No invented URLs or metrics.
 */
export const agriNaija: Project = {
  id: 'agrinaija',
  slug: 'agrinaija', // canonical route: /projects/agrinaija (not agri-naija)
  name: 'AgriNaija',
  description:
    'Digital agricultural marketplace connecting farmers directly with consumers and reducing unnecessary middlemen.',
  longDescription: undefined, // TODO — INFORMATION REQUIRED
  category: undefined, // TODO — INFORMATION REQUIRED (e.g. Marketplace / AgriTech)
  technologies: ['React', 'Express', 'Prisma', 'PostgreSQL'],
  features: [
    'Authentication',
    'Role-based access control',
    'Buyer functionality',
    'Farmer functionality',
    'Admin functionality',
    'Product listings',
    'Inventory',
    'Cart',
    'Orders',
    'Farmer verification',
    'Listing management',
    'PWA functionality',
    'API security',
    'Deployment',
  ],
  architectureSummary:
    'React Frontend → Express REST API → Prisma ORM → PostgreSQL',
  architectureLayers: [
    { name: 'Frontend', description: 'React' },
    { name: 'API', description: 'Express REST API' },
    { name: 'ORM', description: 'Prisma' },
    { name: 'Database', description: 'PostgreSQL' },
  ],
  problem:
    'TODO — INFORMATION REQUIRED (known intent: reduce unnecessary middlemen between farmers and consumers)',
  solution:
    'Digital marketplace connecting farmers directly with consumers. TODO — INFORMATION REQUIRED for expanded narrative.',
  role: undefined, // TODO — INFORMATION REQUIRED
  deployment: undefined, // TODO — INFORMATION REQUIRED
  challenges: undefined, // TODO — INFORMATION REQUIRED
  results: undefined, // TODO — INFORMATION REQUIRED — do not invent metrics
  image: '/images/projects/agrinaija-placeholder.svg',
  images: undefined, // TODO — INFORMATION REQUIRED
  liveUrl: undefined, // TODO — LIVE URL REQUIRED
  githubUrl: undefined, // TODO — GITHUB URL REQUIRED
  featured: true,
  order: 1,
  status: 'in-progress', // TODO — confirm final status label
  seoTitle: undefined, // TODO — INFORMATION REQUIRED
  seoDescription: undefined, // TODO — INFORMATION REQUIRED
};
