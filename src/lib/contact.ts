import { contactConfig } from '@/data/contact';

export type ContactProviderMode = 'endpoint' | 'netlify' | 'unconfigured';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot value — must be empty for legitimate submits */
  honeypot?: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  /** True when honeypot tripped — treat as silent success in UI */
  ignoredAsSpam?: boolean;
  error?: string;
}

function trimEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getContactFormEndpoint(): string | undefined {
  return trimEnv(import.meta.env.VITE_CONTACT_FORM_ENDPOINT);
}

/** Optional public access key (e.g. Web3Forms). Never place private SMTP secrets here. */
export function getContactAccessKey(): string | undefined {
  return trimEnv(import.meta.env.VITE_CONTACT_ACCESS_KEY);
}

export function getContactProviderMode(): ContactProviderMode {
  const explicit = trimEnv(import.meta.env.VITE_CONTACT_PROVIDER)?.toLowerCase();
  if (explicit === 'netlify') return 'netlify';
  if (explicit === 'endpoint') {
    return getContactFormEndpoint() ? 'endpoint' : 'unconfigured';
  }
  if (getContactFormEndpoint()) return 'endpoint';
  return 'unconfigured';
}

export function isContactProviderConfigured(): boolean {
  return getContactProviderMode() !== 'unconfigured';
}

export function buildMailtoHref(
  toEmail: string,
  payload: Pick<ContactPayload, 'name' | 'email' | 'message'>,
): string {
  const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`);
  const body = encodeURIComponent(
    `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  );
  return `mailto:${toEmail}?subject=${subject}&body=${body}`;
}

function encodeFormBody(data: Record<string, string>): string {
  return new URLSearchParams(data).toString();
}

/**
 * Submit enquiry to the configured external provider.
 * Returns a structured result — never throws for expected HTTP failures.
 */
export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactSubmitResult> {
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return { ok: true, ignoredAsSpam: true };
  }

  const mode = getContactProviderMode();
  if (mode === 'unconfigured') {
    return {
      ok: false,
      error:
        'Contact form is not configured yet. Use the email fallback if available, or set VITE_CONTACT_FORM_ENDPOINT / VITE_CONTACT_PROVIDER.',
    };
  }

  const { fields, formName } = contactConfig;
  const accessKey = getContactAccessKey();

  const bodyFields: Record<string, string> = {
    'form-name': formName,
    [fields.name]: payload.name,
    [fields.email]: payload.email,
    [fields.message]: payload.message,
    [fields.honeypot]: '',
  };

  if (accessKey) {
    bodyFields.access_key = accessKey;
  }

  const endpoint =
    mode === 'netlify' ? '/' : (getContactFormEndpoint() as string);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: encodeFormBody(bodyFields),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `Submission failed (${response.status}). Please try again or use email.`,
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Network error while sending. Please try again or use email.',
    };
  }
}
