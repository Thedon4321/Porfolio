import { useId, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { contactConfig } from '@/data/contact';
import { profile } from '@/data/profile';
import {
  buildMailtoHref,
  isContactProviderConfigured,
  submitContactForm,
} from '@/lib/contact';
import { hasContent } from '@/utils/content';
import { cn } from '@/utils/cn';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const { minMessageLength, maxMessageLength } = contactConfig;

  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Enter at least 2 characters.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required.';
  } else if (values.message.trim().length < minMessageLength) {
    errors.message = `Enter at least ${minMessageLength} characters.`;
  } else if (values.message.trim().length > maxMessageLength) {
    errors.message = `Keep the message under ${maxMessageLength} characters.`;
  }

  return errors;
}

function getMailtoFallbackHref(
  toEmail: string,
  values: { name: string; email: string; message: string },
): string {
  const ready =
    values.name.trim().length >= 2 &&
    EMAIL_PATTERN.test(values.email.trim()) &&
    values.message.trim().length >= contactConfig.minMessageLength;

  if (!ready) return `mailto:${toEmail}`;

  return buildMailtoHref(toEmail, {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  });
}

/**
 * Accessible contact enquiry form with honeypot, validation, and provider submit.
 */
export function ContactForm() {
  const statusId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const providerReady = isContactProviderConfigured();
  const mailtoEmail = hasContent(profile.email) ? profile.email : null;

  function resetFormFields() {
    setName('');
    setEmail('');
    setMessage('');
    setHoneypot('');
    setErrors({});
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate({ name, email, message });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      setStatusMessage(null);
      const order = ['name', 'email', 'message'] as const;
      const firstInvalid = order.find((field) => nextErrors[field]);
      if (firstInvalid) {
        document.getElementById(`contact-${firstInvalid}`)?.focus();
      }
      return;
    }

    setStatus('submitting');
    setStatusMessage(null);

    const result = await submitContactForm({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      honeypot,
    });

    if (result.ok) {
      setStatus('success');
      setStatusMessage(
        result.ignoredAsSpam
          ? 'Thank you — your message has been received.'
          : 'Thank you — your message was sent successfully.',
      );
      resetFormFields();
      return;
    }

    setStatus('error');
    setStatusMessage(
      result.error ?? 'Something went wrong. Please try again.',
    );
  }

  function handleRetry() {
    setStatus('idle');
    setStatusMessage(null);
  }

  const safeMailtoHref = mailtoEmail
    ? getMailtoFallbackHref(mailtoEmail, { name, email, message })
    : null;

  return (
    <form
      name={contactConfig.formName}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      className="relative space-y-5"
      aria-describedby={statusMessage ? statusId : undefined}
    >
      <input type="hidden" name="form-name" value={contactConfig.formName} />

      {/* Honeypot — off-DOM for AT (`hidden`); must stay empty for humans */}
      <div hidden aria-hidden="true">
        <label htmlFor="contact-bot-field">Company</label>
        <input
          id="contact-bot-field"
          name={contactConfig.fields.honeypot}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {!providerReady ? (
        <p className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-text-muted)]">
          External form endpoint is not configured yet (
          <code className="text-[var(--color-accent)]">
            VITE_CONTACT_FORM_ENDPOINT
          </code>
          ). You can still prepare a message
          {safeMailtoHref ? ' or use email below' : ''}.
        </p>
      ) : null}

      <Input
        id="contact-name"
        name={contactConfig.fields.name}
        label="Name"
        autoComplete="name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={errors.name}
        disabled={status === 'submitting'}
      />

      <Input
        id="contact-email"
        name={contactConfig.fields.email}
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={errors.email}
        disabled={status === 'submitting'}
      />

      <Textarea
        id="contact-message"
        name={contactConfig.fields.message}
        label="Message"
        required
        rows={6}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        error={errors.message}
        hint={`Between ${contactConfig.minMessageLength} and ${contactConfig.maxMessageLength} characters.`}
        disabled={status === 'submitting'}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
        {status === 'error' ? (
          <Button type="button" variant="secondary" onClick={handleRetry}>
            Try again
          </Button>
        ) : null}
        {status === 'success' ? (
          <Button type="button" variant="ghost" onClick={handleRetry}>
            Send another
          </Button>
        ) : null}
      </div>

      <div
        id={statusId}
        role="status"
        aria-live="polite"
        className={cn(
          'text-sm',
          status === 'success' && 'font-medium text-[var(--color-success)]',
          status === 'error' && 'font-medium text-[var(--color-danger)]',
          (status === 'idle' || status === 'submitting') &&
            'text-[var(--color-text-muted)]',
        )}
      >
        {statusMessage}
      </div>

      {safeMailtoHref ? (
        <p className="text-sm text-[var(--color-text-muted)]">
          Prefer email?{' '}
          <a
            href={safeMailtoHref}
            className="font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
          >
            Open mailto fallback
          </a>
        </p>
      ) : (
        <p className="text-sm text-[var(--color-text-muted)]">
          TODO — EMAIL REQUIRED for mailto fallback
        </p>
      )}
    </form>
  );
}
