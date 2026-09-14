import { Section } from '@/components/layout/Section';
import { ApproachStep } from '@/components/approach/ApproachStep';
import { approachSteps } from '@/data/approach';

/**
 * Development Approach — architecture IA section (#approach).
 * Content is the approved process narrative, not invented biography.
 */
export function DevelopmentApproach() {
  const steps = [...approachSteps].sort((a, b) => a.order - b.order);

  return (
    <Section id="approach" aria-labelledby="approach-heading">
      <div className="max-w-2xl">
        <h2
          id="approach-heading"
          className="text-display-2xl font-semibold text-[var(--color-text)]"
        >
          Development Approach
        </h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          A concise problem-solving loop used across product work: understand,
          design, build, validate, and ship.
        </p>
      </div>

      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <ApproachStep key={step.id} step={step} index={index} />
        ))}
      </ol>
    </Section>
  );
}
