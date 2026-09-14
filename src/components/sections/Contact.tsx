import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactChannels } from '@/components/contact/ContactChannels';

/**
 * Contact conversion section — form + channels.
 */
export function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <div className="max-w-2xl">
        <h2
          id="contact-heading"
          className="text-display-2xl font-semibold text-[var(--color-text)]"
        >
          Contact
        </h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Send an enquiry about freelance work, roles, or the projects above.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:gap-10">
        <Card className="p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Send a message
          </h3>
          <div className="relative mt-5">
            <ContactForm />
          </div>
        </Card>

        <div className="space-y-4 lg:pt-2">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Other channels
          </h3>
          <ContactChannels />
        </div>
      </div>
    </Section>
  );
}
