import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Root/group Open Graph image. Deliberately lives under /api — every other
 * path prefix is subject to middleware.ts's subdomain rewrite-on-"/" and
 * fallback-redirect-on-known-paths logic. A route-segment-scoped
 * opengraph-image.tsx nested under e.g. /magfa would get its auto-generated
 * absolute URL (torre-ks.com/magfa/opengraph-image) redirected to
 * magfa.torre-ks.com/opengraph-image by the fallback redirector, which then
 * resolves against the ROOT app directory (wrong image, or 404). /api/* is
 * explicitly excluded from the middleware matcher, so it always resolves
 * exactly where it's linked from, regardless of which subdomain the crawler
 * saw the og:image tag on.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0a0a0f",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c4954a",
            marginBottom: 28,
          }}
        >
          Torre Group
        </div>
        <div style={{ fontSize: 76, color: "#f5f2ec", fontWeight: 700, textAlign: "center", padding: "0 80px" }}>
          Një Grup. Katër Kompani.
        </div>
        <div style={{ fontSize: 28, color: "#9a9488", marginTop: 32 }}>torre-ks.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
