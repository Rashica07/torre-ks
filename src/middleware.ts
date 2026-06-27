import { NextRequest, NextResponse } from "next/server";

const SUBDOMAIN_MAP: Record<string, string> = {
  "magfa":        "/magfa",
  "swisstech":    "/swisstech",
  "torre-umbria": "/torre-umbria",
  "torre-home":   "/torre-home",
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  // Strip port if present
  const host = hostname.split(":")[0];

  // Extract subdomain — works for *.torre-ks.com in production
  // and *.replit.dev in preview
  const parts = host.split(".");
  if (parts.length >= 3) {
    const sub = parts[0];
    const target = SUBDOMAIN_MAP[sub];
    if (target && request.nextUrl.pathname === "/") {
      return NextResponse.rewrite(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon).*)"],
};
