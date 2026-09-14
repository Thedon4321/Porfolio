import type { Project } from '@/types';

export function hasExternalUrl(url: string | undefined): url is string {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

export function projectDisplayStatus(project: Project): string {
  switch (project.status) {
    case 'shipped':
      return 'Shipped';
    case 'in-progress':
      return 'In progress';
    case 'placeholder':
      return 'Details coming soon';
    default:
      return project.status;
  }
}
