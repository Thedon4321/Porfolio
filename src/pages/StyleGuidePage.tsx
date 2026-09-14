import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { HeadTags } from '@/components/seo/HeadTags';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { styleGuideSeo } from '@/lib/seo';

const swatches = [
  { name: '--color-bg', varName: 'var(--color-bg)' },
  { name: '--color-surface', varName: 'var(--color-surface)' },
  { name: '--color-surface-muted', varName: 'var(--color-surface-muted)' },
  { name: '--color-text', varName: 'var(--color-text)' },
  { name: '--color-text-muted', varName: 'var(--color-text-muted)' },
  { name: '--color-accent', varName: 'var(--color-accent)' },
  { name: '--color-accent-strong', varName: 'var(--color-accent-strong)' },
  { name: '--color-border', varName: 'var(--color-border)' },
  { name: '--color-danger', varName: 'var(--color-danger)' },
  { name: '--color-success', varName: 'var(--color-success)' },
] as const;

/**
 * Internal sandbox for Phase 2 design-system review.
 * Not linked from primary navigation.
 */
export function StyleGuidePage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const seo = styleGuideSeo();

  return (
    <>
      <HeadTags {...seo} />
      <Section id="styleguide" aria-labelledby="styleguide-heading" className="pt-10">
        <p className="mb-2 text-sm font-medium text-[var(--color-accent)]">
          Phase 2 · Design system
        </p>
        <h1
          id="styleguide-heading"
          className="text-display-3xl font-bold text-[var(--color-text)]"
        >
          Style guide
        </h1>
        <p className="prose-measure mt-3 text-[var(--color-text-muted)]">
          Token-driven primitives for visual QA. This portfolio is dark-mode
          only. This route is a development sandbox, not a public marketing page.
        </p>
      </Section>

      <Section id="colours" aria-labelledby="colours-heading">
        <h2 id="colours-heading" className="text-display-2xl font-semibold">
          Colour tokens
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {swatches.map((swatch) => (
            <li key={swatch.name}>
              <div
                className="h-16 rounded-[var(--radius-md)] border border-[var(--color-border)]"
                style={{ background: swatch.varName }}
              />
              <p className="mt-2 font-mono text-xs text-[var(--color-text-muted)]">
                {swatch.name}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="typography" aria-labelledby="type-heading">
        <h2 id="type-heading" className="text-display-2xl font-semibold">
          Typography
        </h2>
        <div className="mt-6 space-y-4">
          <p className="text-display-4xl font-bold">Display 4xl</p>
          <p className="text-display-3xl font-bold">Display 3xl</p>
          <p className="text-display-2xl font-semibold">Display 2xl</p>
          <p className="text-lg text-[var(--color-text-muted)]">
            Lead paragraph — Plus Jakarta Sans at body measure.
          </p>
          <p className="prose-measure text-[var(--color-text-muted)]">
            Body copy uses tokenised line-height and a ~65ch measure for readable
            prose blocks.             Accent:{' '}
            <span className="text-[var(--color-accent)]">emerald highlight</span>
            {' · '}
            <span className="text-[var(--color-tech)]">cyan sparingly</span>.
          </p>
          <p className="font-mono text-sm text-[var(--color-text-muted)]">
            Mono — tech labels / code chips
          </p>
        </div>
      </Section>

      <Section id="buttons" aria-labelledby="buttons-heading">
        <h2 id="buttons-heading" className="text-display-2xl font-semibold">
          Buttons
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <IconButton label="Example icon action">
            <span aria-hidden="true" className="text-xs font-semibold">
              ★
            </span>
          </IconButton>
        </div>
      </Section>

      <Section id="badges-cards" aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="text-display-2xl font-semibold">
          Badges & cards
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>Muted</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          <li>
            <Card>
              <h3 className="font-semibold">Default card</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Elevated surface with subtle border.
              </p>
            </Card>
          </li>
          <li>
            <Card variant="muted">
              <h3 className="font-semibold">Muted card</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Secondary surface for grouping.
              </p>
            </Card>
          </li>
          <li>
            <Card variant="interactive">
              <h3 className="font-semibold">Interactive card</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Hover elevation for project entries.
              </p>
            </Card>
          </li>
        </ul>
      </Section>

      <Section id="forms" aria-labelledby="forms-heading">
        <h2 id="forms-heading" className="text-display-2xl font-semibold">
          Form fields
        </h2>
        <div className="mt-6 grid max-w-xl gap-4">
          <Input
            name="demo-name"
            label="Name"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(event) => setName(event.target.value)}
            hint="Used later by the contact form."
          />
          <Input
            name="demo-email"
            label="Email"
            type="email"
            required
            error="Enter a valid email address."
            defaultValue="not-an-email"
          />
          <Textarea
            name="demo-message"
            label="Message"
            placeholder="Short note…"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
      </Section>
    </>
  );
}
