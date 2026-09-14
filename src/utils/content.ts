/**
 * Content helpers — keep TODO placeholders visible; never invent copy.
 */

export function isPlaceholder(value?: string | null): boolean {
  if (value == null) return true;
  const trimmed = value.trim();
  if (!trimmed) return true;
  return /^TODO\b/i.test(trimmed);
}

export function hasContent(value?: string | null): boolean {
  return !isPlaceholder(value);
}
