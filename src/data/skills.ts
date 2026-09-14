import type { SkillGroup } from '@/types';

/**
 * Skills catalogue for the Skills section.
 *
 * Frontend/Backend tech from verified AgriNaija stack.
 * Tools + practices from owner-supplied profile (2026-09-14).
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [{ id: 'react', name: 'React' }],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { id: 'express', name: 'Express' },
      { id: 'prisma', name: 'Prisma' },
      { id: 'postgresql', name: 'PostgreSQL' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { id: 'vscode', name: 'VS Code' },
      { id: 'cursor', name: 'Cursor' },
      { id: 'chatgpt', name: 'ChatGPT' },
      { id: 'claude-ai', name: 'Claude AI' },
    ],
  },
  {
    id: 'practices',
    label: 'Practices',
    skills: [
      { id: 'frontend-focus', name: 'Frontend development (primary)' },
      { id: 'backend-learning', name: 'Backend development (learning)' },
    ],
  },
];
