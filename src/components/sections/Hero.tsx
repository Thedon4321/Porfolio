import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { hasContent } from '@/utils/content';

/**
 * First-viewport composition: brand → title → short support → CTAs → portrait.
 * Content comes only from `profile.ts` — no invented copy.
 */
export function Hero() {
  const photoAlt = hasContent(profile.name)
    ? `${profile.name} — portrait`
    : 'Developer portrait placeholder';

  return (
    <Section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-atmosphere pt-20"
      reveal={false}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <div>
          <h1
            id="hero-heading"
            className="hero-enter text-display-4xl max-w-3xl font-bold tracking-tight text-[var(--color-text)]"
          >
            {profile.name}
          </h1>

          <p className="hero-enter hero-enter-delay-1 mt-4 text-xl font-medium text-[var(--color-text-muted)] sm:text-2xl">
            {profile.title}
          </p>

          <p className="hero-enter hero-enter-delay-2 prose-measure mt-5 text-lg text-[var(--color-text-muted)]">
            {profile.shortBio}
          </p>

          <div className="hero-enter hero-enter-delay-3 mt-8 flex flex-wrap gap-3">
            <Button href="#projects">View projects</Button>
            <Button href="#contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>

        <div className="hero-enter hero-enter-delay-4 relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div
            className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-md)]"
            style={{ aspectRatio: '1 / 1' }}
          >
            <img
              src={profile.photo}
              alt={photoAlt}
              width={640}
              height={640}
              className="h-full w-full object-cover"
              fetchPriority="high"
              onError={(event) => {
                event.currentTarget.src = '/images/profile/placeholder.svg';
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
