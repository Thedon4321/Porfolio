export const primaryNavItems = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#approach', label: 'Approach' },
] as const;

export type PrimaryNavItem = (typeof primaryNavItems)[number];
