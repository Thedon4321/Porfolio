import type { ApproachStep as ApproachStepData } from '@/types/approach';

interface ApproachStepProps {
  step: ApproachStepData;
  index: number;
}

/**
 * Single Development Approach step (title + concise process text).
 */
export function ApproachStep({ step, index }: ApproachStepProps) {
  const headingId = `approach-step-${step.id}`;

  return (
    <li className="relative pl-10">
      <span
        className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-xs font-semibold text-[var(--color-text)]"
        aria-hidden="true"
      >
        {index + 1}
      </span>
      <h3
        id={headingId}
        className="text-base font-semibold text-[var(--color-text)]"
      >
        {step.title}
      </h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        {step.description}
      </p>
    </li>
  );
}
