"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import {
  PULSE_URL,
  PULSE_TENANT,
  getPublicPages,
  getPublicTheme,
  hexToHslTriplet,
  blocksByType,
  type PulseBlock,
  type PulsePage,
  type PulseTheme,
} from "@/lib/pulse";

type PagesBySlug = Record<string, PulsePage>;

interface PulseContextValue {
  pages: PagesBySlug;
  isConnected: boolean;
}

const PulseContext = createContext<PulseContextValue>({ pages: {}, isConnected: false });

export const usePulseSync = () => useContext(PulseContext);

/**
 * Props of one section of a page, or undefined when the CMS has nothing for it.
 * Undefined is the normal case (CMS down, page unpublished, section removed) —
 * callers must always pass a fallback.
 */
export type BlockOverrides = Record<string, unknown> | undefined;

/** Overrides for one block type on a given page slug. */
export function useBlockOverride(slug: string, blockType: string): BlockOverrides {
  const { pages } = usePulseSync();
  const block: PulseBlock | undefined = blocksByType(pages[slug])[blockType];
  return block?.props;
}

/** A CMS value if present and non-empty, else the site's own copy. */
export function pick<T>(overrides: BlockOverrides, key: string, fallback: T): T {
  const value = overrides?.[key];
  if (value === undefined || value === null) return fallback;
  // An empty string means "cleared in the editor by accident" far more often
  // than "intentionally blank" — prefer the designed copy over a blank page.
  if (typeof value === "string" && value.trim() === "") return fallback;
  return value as T;
}

/** Same, for repeating groups. An empty list falls back rather than rendering nothing. */
export function pickList<T>(overrides: BlockOverrides, key: string, fallback: T[]): T[] {
  const value = overrides?.[key];
  if (!Array.isArray(value) || value.length === 0) return fallback;
  return value as T[];
}

/**
 * Apply a CMS theme onto this site's design tokens (the CSS custom properties
 * in globals.css). Only touches vars the CMS has a value for, and only when
 * that value parses — a null/failed theme leaves the site exactly as designed.
 * Colours are converted to the HSL triplets the tokens expect.
 */
function applyTheme(theme: PulseTheme | null): void {
  if (!theme || typeof document === "undefined") return;
  const root = document.documentElement;
  const setHsl = (varName: string, hex?: string) => {
    const triplet = hexToHslTriplet(hex);
    if (triplet) root.style.setProperty(varName, triplet);
  };
  setHsl("--bg", theme.colors?.background);
  setHsl("--surface", theme.colors?.surface);
  setHsl("--brand", theme.colors?.primary);
  setHsl("--accent", theme.colors?.accent);
  if (theme.borderRadius) root.style.setProperty("--radius", theme.borderRadius);
}

/**
 * Pulls this tenant's published content from Novus Pulse and keeps it live.
 *
 * Realtime only fires for PUBLISHED pages — drafts deliberately never
 * broadcast, so edits appear here the moment they're published, not on save.
 * Every consumer falls back to hardcoded copy, so a missing/failed CMS simply
 * renders the site as designed.
 */
export function PulseSyncProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<PagesBySlug>({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const index = (list: PulsePage[]): PagesBySlug =>
      list.reduce<PagesBySlug>((acc, page) => {
        acc[page.slug] = page;
        return acc;
      }, {});

    getPublicPages().then((list) => {
      if (!cancelled) setPages(index(list));
    });
    // Apply the CMS theme onto the design tokens. Fire-and-forget: a missing
    // theme leaves the site's own globals.css untouched.
    getPublicTheme().then((theme) => {
      if (!cancelled) applyTheme(theme);
    });

    let socket: Socket | undefined;
    try {
      socket = io(PULSE_URL, { transports: ["websocket"], reconnectionDelay: 2000 });

      socket.on("connect", () => {
        setIsConnected(true);
        // Public room for this tenant — carries published content + theme events.
        socket!.emit("subscribe_public", { tenantSlug: PULSE_TENANT });
      });
      socket.on("disconnect", () => setIsConnected(false));

      // Re-fetch rather than patch from the payload: the event shape is a
      // notification, and a refetch guarantees we match what the API serves.
      const refetch = () => {
        getPublicPages().then((list) => {
          if (!cancelled) setPages(index(list));
        });
      };
      // Exactly the events the backend broadcasts to `public_<slug>`
      // (pages.service.ts). There is no "page.published" event — publishing
      // surfaces as page.updated.
      socket.on("page.updated", refetch);
      socket.on("page.created", refetch);
      // Theme edits published in the CMS re-apply live, same as content.
      socket.on("theme.updated", () => {
        getPublicTheme().then((theme) => {
          if (!cancelled) applyTheme(theme);
        });
      });
    } catch {
      // Realtime is a bonus; the initial fetch already rendered the content.
    }

    return () => {
      cancelled = true;
      socket?.disconnect();
    };
  }, []);

  return <PulseContext.Provider value={{ pages, isConnected }}>{children}</PulseContext.Provider>;
}
