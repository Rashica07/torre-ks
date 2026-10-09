/**
 * Minimal Novus Pulse client, inlined on purpose.
 *
 * The @kiq/novus-pulse package isn't published to npm yet, so depending on it
 * means fragile local linking. This file talks to the public REST + socket API
 * directly — the same approach the kiqa-dev portfolio takes. Once the package
 * ships to the registry (Novus Pulse roadmap), this can be swapped for it.
 */

export const PULSE_URL = process.env.NEXT_PUBLIC_PULSE_URL || 'http://localhost:3000';
export const PULSE_TENANT = process.env.NEXT_PUBLIC_PULSE_TENANT || 'gazi-torre';

/** One editable section of a page, as produced by the CMS visual editor. */
export interface PulseBlock {
  id: string;
  type: string;
  props: Record<string, unknown>;
  /** Set by the editor to keep a section in the list but stop it rendering. */
  hidden?: boolean;
}

export interface PulsePage {
  id: string;
  title: string;
  slug: string;
  type: string;
  content?: { blocks?: PulseBlock[] } & Record<string, unknown>;
  published?: boolean;
}

/**
 * Published pages for a tenant. Public — no auth.
 * Returns [] on any failure: the site must render its own copy rather than
 * break because the CMS is down or unreachable.
 */
export async function getPublicPages(tenantSlug = PULSE_TENANT): Promise<PulsePage[]> {
  try {
    const res = await fetch(`${PULSE_URL}/api/v1/public/${tenantSlug}/pages`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Blocks of one page keyed by type, for O(1) lookup while rendering. */
export function blocksByType(page?: PulsePage | null): Record<string, PulseBlock> {
  const out: Record<string, PulseBlock> = {};
  for (const block of page?.content?.blocks ?? []) {
    if (!block?.type || block.hidden) continue;
    out[block.type] = block;
  }
  return out;
}

/** The visual theme configured for this tenant in the CMS. */
export interface PulseTheme {
  colors?: { primary?: string; background?: string; surface?: string; accent?: string };
  fonts?: { body?: string; heading?: string };
  borderRadius?: string;
}

/**
 * This tenant's CMS-configured theme, or null when none is set / the CMS is
 * unreachable. Consumers must treat null as "keep the site's own design".
 */
export async function getPublicTheme(tenantSlug = PULSE_TENANT): Promise<PulseTheme | null> {
  try {
    const res = await fetch(`${PULSE_URL}/api/v1/public/${tenantSlug}/theme`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.theme as PulseTheme) ?? null;
  } catch {
    return null;
  }
}

/**
 * Convert a `#rrggbb`/`#rgb` hex colour to a space-separated HSL triplet
 * (`"0 0% 98%"`) — the shape this site's CSS custom properties expect, so a
 * value can be dropped straight into `hsl(var(--x))`. Returns null on anything
 * it can't parse, so callers skip applying a bad value rather than corrupt the
 * design.
 */
export function hexToHslTriplet(hex?: string): string | null {
  if (!hex) return null;
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;

  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let sHue = 0;
  let sat = 0;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: sHue = (g - b) / d + (g < b ? 6 : 0); break;
      case g: sHue = (b - r) / d + 2; break;
      default: sHue = (r - g) / d + 4; break;
    }
    sHue /= 6;
  }
  return `${Math.round(sHue * 360)} ${Math.round(sat * 100)}% ${Math.round(l * 100)}%`;
}
