import type { ApproachStep } from '@/types/approach';

/**
 * Development Approach steps — from docs/ARCHITECTURE.md §4
 * (understand → design → build → validate → ship).
 * Generic process narrative only; no invented personal credentials.
 */
export const approachSteps: ApproachStep[] = [
  {
    id: 'understand',
    order: 1,
    title: 'Understand',
    description:
      'Clarify the problem, users, and constraints before choosing a solution path.',
  },
  {
    id: 'design',
    order: 2,
    title: 'Design',
    description:
      'Shape a practical architecture and interface that fits the real requirements.',
  },
  {
    id: 'build',
    order: 3,
    title: 'Build',
    description:
      'Implement in small, verifiable increments with clear structure and typed contracts.',
  },
  {
    id: 'validate',
    order: 4,
    title: 'Validate',
    description:
      'Check behaviour, accessibility, and edge cases before treating work as done.',
  },
  {
    id: 'ship',
    order: 5,
    title: 'Ship',
    description:
      'Deliver a stable release, confirm it in the target environment, and iterate from feedback.',
  },
];
