/**
 * Public contact configuration — no secrets.
 * Provider endpoint/keys come from Vite env at runtime.
 */
export const contactConfig = {
  /** Netlify Forms form name (and generic form-name field) */
  formName: 'portfolio-contact',
  fields: {
    name: 'name',
    email: 'email',
    message: 'message',
    /** Honeypot — must stay empty for humans */
    honeypot: 'bot-field',
  },
  minMessageLength: 10,
  maxMessageLength: 5000,
} as const;

export type ContactFieldName =
  (typeof contactConfig.fields)[keyof typeof contactConfig.fields];
