import { NextRequest, NextResponse } from "next/server";

const SUBDOMAIN_MAP: Record<string, string> = {
  "magfa": "/magfa",
  "swisstech": "/swisstech",
  "torre-umbria": "/torre-umbria",
  "torrehome": "/torrehome",
  "torre-home": "/torrehome",
  "llms": "/llms",
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  // Strip port if present
  const host = hostname.split(":")[0];

  // Extract subdomain — works for *.torre-ks.com in production
  // and *.replit.dev in preview
  const parts = host.split(".");
  if (parts.length >= 3 && parts[0] !== "www") {
    const sub = parts[0];
    const target = SUBDOMAIN_MAP[sub];
    if (target && request.nextUrl.pathname === "/") {
      return NextResponse.rewrite(new URL(target, request.url));
    }
  } else {
    // If no subdomain, redirect direct paths like /magfa to the subdomain
    const pathname = request.nextUrl.pathname;
    const sub = Object.keys(SUBDOMAIN_MAP).find(k =>
      pathname === SUBDOMAIN_MAP[k] || pathname.startsWith(SUBDOMAIN_MAP[k] + "/")
    );
    if (sub) {
      // Keep any trailing path (e.g. /magfa/about -> /about)
      const rest = pathname.slice(SUBDOMAIN_MAP[sub].length) || "/";
      const subDomainKey = sub === "torre-home" ? "torrehome" : sub;
      const redirectUrl = new URL(rest, `https://${subDomainKey}.torre-ks.com`);
      request.nextUrl.searchParams.forEach((val, key) => {
        redirectUrl.searchParams.append(key, val);
      });
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon).*)"],
};