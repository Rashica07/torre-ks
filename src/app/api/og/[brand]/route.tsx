import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { divisions } from "@/content/divisions";
import { publish } from "@/content/types";
import { getRoute } from "@/lib/i18n/routes";

export const runtime = "edge";

// Per-company OG image: base surface and accent follow the company's own design (docs/design.md §2.7).
const THEME: Record<string, { bg: string; fg: string; muted: string; accent: string }> = {
  magfa: { bg: "#f4f3ef", fg: "#202326", muted: "#5e6160", accent: "#006a9e" },
  swisstech: { bg: "#202326", fg: "#f4f3ef", muted: "#a3a6a4", accent: "#00a0a2" },
  "torre-umbria": { bg: "#202326", fg: "#f4f3ef", muted: "#a3a6a4", accent: "#6fa67a" },
  torrehome: { bg: "#f4f3ef", fg: "#202326", muted: "#5e6160", accent: "#27496d" },
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const d = divisions.find((x) => x.id === brand);
  if (!d) return new Response("Not found", { status: 404 });
  const t = THEME[d.id];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: t.bg, padding: "0 90px" }}>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 7, textTransform: "uppercase", color: t.accent, marginBottom: 28 }}>
          TORRE Group
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, color: t.fg, lineHeight: 1, letterSpacing: -2 }}>
          {getRoute(d.id).label.sq}
        </div>
        <div style={{ display: "flex", fontSize: 34, color: t.muted, marginTop: 32, maxWidth: 900 }}>{publish(d.summary).sq}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
