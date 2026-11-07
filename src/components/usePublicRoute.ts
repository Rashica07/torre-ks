"use client";
import { usePathname } from "next/navigation";
import { resolveInternalPath, resolvePublicPath, type Resolved } from "@/lib/i18n/routes";

/** The current route, resolved from either the public URL or the internal rewritten path (both map to the same route). */
export function useCurrentRoute(): Resolved | null {
  const pathname = usePathname() || "/";
  return resolvePublicPath(pathname) ?? resolveInternalPath(pathname);
}
