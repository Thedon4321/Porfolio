import { Section } from '@/components/layout/Section';
import { SkillGroup } from '@/components/skills/SkillGroup';
import { skillGroups } from '@/data/skills';

/**
 * Skills signalling section — data-driven from `src/data/skills.ts`.
 */
export function Skills() {
  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <div className="max-w-2xl">
        <h2
          id="skills-heading"
          className="text-display-2xl font-semibold text-[var(--color-text)]"
        >
          Skills
        </h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Frontend-focused stack with backend technologies from AgriNaija,
          plus the tools used day to day.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <li key={group.id}>
            <SkillGroup group={group} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
