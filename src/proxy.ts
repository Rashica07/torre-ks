import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LANG } from "@/lib/i18n";
import { internalPath, pathFor, resolveInternalPath, resolvePublicPath } from "@/lib/i18n/routes";

/**
 * Language routing (replaces the old subdomain middleware; D-001 one domain, D-002 sq + en).
 *  - Albanian is served un-prefixed: /kompanite  →  internal /sq/kompanite
 *  - English lives under /en with English slugs: /en/companies  →  internal /en/kompanite
 *  - Internal paths are never public: /sq/* and /en/<albanian-slug> are redirected to the public URL.
 *  - Unknown paths pass through untouched: nothing matches, so global-not-found renders the real 404.
 * Host redirects for the old brand subdomains are in next.config.js.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Internal prefix typed by hand → redirect to the public URL.
  if (pathname === "/sq" || pathname.startsWith("/sq/")) {
    const internal = resolveInternalPath(pathname);
    url.pathname = internal ? pathFor(internal.id, internal.lang) : pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const pub = resolvePublicPath(pathname);
    if (pub) {
      url.pathname = internalPath(pub.id, pub.lang);
      return NextResponse.rewrite(url);
    }
    // An Albanian slug under /en (e.g. /en/kompanite) → redirect to the English public URL.
    const internal = resolveInternalPath(pathname);
    if (internal) {
      url.pathname = pathFor(internal.id, internal.lang);
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next(); // unknown → no route matches → global-not-found (404)
  }

  // Albanian (default): un-prefixed.
  const pub = resolvePublicPath(pathname);
  if (!pub) return NextResponse.next(); // unknown → no route matches → global-not-found (404)
  url.pathname = internalPath(pub.id, DEFAULT_LANG);
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (robots.txt, sitemap.xml, images…).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
