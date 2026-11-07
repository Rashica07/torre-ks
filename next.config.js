/** @type {import('next').NextConfig} */

// The four brand subdomains used to be separate hosts (D-001: now one domain, one codebase).
// They stay pointed at this deployment and 301 to their sections so old links keep working.
const SUBDOMAIN_REDIRECTS = [
  { host: "magfa.torre-ks.com", to: "/magfa" },
  { host: "swisstech.torre-ks.com", to: "/swisstech" },
  { host: "torre-umbria.torre-ks.com", to: "/torre-umbria" },
  { host: "torrehome.torre-ks.com", to: "/torrehome" },
  { host: "llms.torre-ks.com", to: "/llms.txt" },
];

const nextConfig = {
  reactStrictMode: true,
  // Renders a complete 404 document although the root layout lives under [lang] (src/app/global-not-found.tsx).
  experimental: { globalNotFound: true },
  async redirects() {
    return SUBDOMAIN_REDIRECTS.flatMap(({ host, to }) => [
      // Root of the subdomain → its section (permanent).
      { source: "/", has: [{ type: "host", value: host }], destination: `https://torre-ks.com${to}`, permanent: true },
      // Any other path on the old host → the same path on the main domain.
      { source: "/:path+", has: [{ type: "host", value: host }], destination: "https://torre-ks.com/:path+", permanent: true },
    ]);
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            // unsafe-inline on script/style: Next.js inlines hydration scripts and styles; tightening with
            // nonces is a later hardening step. unsafe-eval is dev-only (Fast Refresh).
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
