import { ExternalLink } from '@/components/ui/ExternalLink';
import { profile } from '@/data/profile';
import { hasContent } from '@/utils/content';

interface ChannelLink {
  href: string;
  label: string;
  external: boolean;
}

/**
 * Email / social / CV channels — only renders real profile values.
 */
export function ContactChannels() {
  const channels: ChannelLink[] = [];

  if (hasContent(profile.email)) {
    channels.push({
      href: `mailto:${profile.email}`,
      label: 'Email',
      external: false,
    });
  }

  if (hasContent(profile.githubUrl)) {
    channels.push({
      href: profile.githubUrl!,
      label: 'GitHub',
      external: true,
    });
  }

  if (hasContent(profile.linkedinUrl)) {
    channels.push({
      href: profile.linkedinUrl!,
      label: 'LinkedIn',
      external: true,
    });
  }

  if (hasContent(profile.resumeUrl)) {
    channels.push({
      href: profile.resumeUrl!,
      label: 'Resume / CV',
      external: true,
    });
  }

  if (channels.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        TODO — EMAIL / SOCIAL / CV LINKS REQUIRED
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {channels.map((channel) => (
        <li key={channel.label}>
          {channel.external ? (
            <ExternalLink href={channel.href} className="text-sm font-medium">
              {channel.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </ExternalLink>
          ) : (
            <a
              href={channel.href}
              className="text-sm font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
            >
              {channel.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
