import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { divisions } from "@/content/divisions";
import { getRoute } from "@/lib/i18n/routes";
import { antonFont, OG_SIZE } from "@/lib/seo/og";

export const runtime = "edge";

// Per-company OG image: the company's own plane with white type (all four pairs pass AA, docs/design.md §2).
const PLANE: Record<string, string> = {
  magfa: "#006a9e",
  swisstech: "#006f71",
  "torre-umbria": "#3a6845",
  torrehome: "#27496d",
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const d = divisions.find((x) => x.id === brand);
  if (!d) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: PLANE[d.id], padding: "56px 72px", color: "#ffffff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, letterSpacing: 6, textTransform: "uppercase" }}>
          <div style={{ display: "flex" }}>TORRE Group</div>
          <div style={{ display: "flex" }}>{d.category.sq}</div>
        </div>
        <div style={{ display: "flex", fontFamily: "Anton", fontSize: d.name.length > 12 ? 165 : 250, lineHeight: 1, textTransform: "uppercase" }}>
          {getRoute(d.id).label.sq}
        </div>
        <div style={{ display: "flex", height: 14, width: 180, background: "#c4954a" }} />
      </div>
    ),
    { ...OG_SIZE, fonts: await antonFont() }
  );
}
