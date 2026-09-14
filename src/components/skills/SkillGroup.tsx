import type { SkillGroup as SkillGroupData } from '@/types';
import { SkillChip } from './SkillChip';

interface SkillGroupProps {
  group: SkillGroupData;
}

/**
 * One category heading + chip list (or TODO empty state).
 */
export function SkillGroup({ group }: SkillGroupProps) {
  const headingId = `skill-group-${group.id}`;

  return (
    <div
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-[border-color,box-shadow] duration-[var(--duration-normal)] ease-[var(--ease-standard)] hover:border-[var(--color-accent)]/40"
      aria-labelledby={headingId}
    >
      <h3
        id={headingId}
        className="text-sm font-semibold tracking-wide text-[var(--color-text)] uppercase"
      >
        {group.label}
      </h3>

      {group.skills.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.label} skills`}>
          {group.skills.map((skill) => (
            <SkillChip key={skill.id} name={skill.name} />
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          TODO — {group.label.toUpperCase()} SKILLS REQUIRED
        </p>
      )}
    </div>
  );
}
