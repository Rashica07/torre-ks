import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { BRANDS } from "@/lib/brands";

export const runtime = "edge";

// See src/app/api/og/route.tsx for why this lives under /api.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ brand: string }> }) {
  const { brand: brandId } = await params;
  const brand = BRANDS.find((b) => b.id === brandId);

  if (!brand) {
    return new Response("Not found", { status: 404 });
  }

  const t = brand.theme;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: t.bg,
          padding: "0 90px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: t.accent,
            marginBottom: 28,
          }}
        >
          {brand.category}
        </div>
        <div style={{ fontSize: 72, color: t.fg, fontWeight: 700, maxWidth: 900, lineHeight: 1.05 }}>
          {brand.name}
        </div>
        <div style={{ fontSize: 30, color: t.muted, marginTop: 28, maxWidth: 780 }}>{brand.tagline}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 56,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: t.accent,
              color: t.accentFg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {brand.name.charAt(0)}
          </div>
          <div style={{ fontSize: 24, color: t.muted }}>{brand.subdomain}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
