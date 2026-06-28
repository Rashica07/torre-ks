import { NextRequest, NextResponse } from "next/server";

const SUBDOMAIN_MAP: Record<string, string> = {
  "magfa": "/magfa",
  "swisstech": "/swisstech",
  "torre-umbria": "/torre-umbria",
  "torrehome": "/torrehome",
  "llms": "/llms",
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const host = hostname.split(":")[0];
  const pathname = request.nextUrl.pathname;

  // Extract subdomain
  const parts = host.split(".");
  if (parts.length >= 3 && parts[0] !== "www") {
    const sub = parts[0];
    const target = SUBDOMAIN_MAP[sub];

    // LOOSEN THE GUARD: Check if it's the root path OR a trailing slash root path
    if (target && (pathname === "/" || pathname === "")) {
      return NextResponse.rewrite(new URL(target, request.url));
    }
  } else {
    // Fallback redirector for direct path navigation links
    const sub = Object.keys(SUBDOMAIN_MAP).find(k =>
      pathname === SUBDOMAIN_MAP[k] || pathname.startsWith(SUBDOMAIN_MAP[k] + "/")
    );

    if (sub) {
      const rest = pathname.slice(SUBDOMAIN_MAP[sub].length) || "/";
      // CLEANED: Removed the redundant 'torrehome' ternary operator
      const redirectUrl = new URL(rest, `https://${sub}.torre-ks.com`);

      request.nextUrl.searchParams.forEach((val, key) => {
        redirectUrl.searchParams.append(key, val);
      });
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Protect middleware from executing on core Next.js system directories
  matcher: ["/((?!_next/static|_next/image|assets|favicon.ico|api).*)"],
};