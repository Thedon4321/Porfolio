/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  /** Public form POST URL (Formspree / Web3Forms / Getform / etc.) */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  /** `endpoint` (default when URL set) | `netlify` */
  readonly VITE_CONTACT_PROVIDER?: string;
  /** Optional public client access key (e.g. Web3Forms). Never put private SMTP secrets here. */
  readonly VITE_CONTACT_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
