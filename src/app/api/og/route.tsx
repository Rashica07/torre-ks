import { ImageResponse } from "next/og";
import { company } from "@/content/company";
import { publish } from "@/content/types";
import { antonFont, OG_SIZE } from "@/lib/seo/og";

export const runtime = "edge";

/**
 * Group Open Graph image ("Fasada": ink plane, TORRE in Anton, one bronze bar). Lives under /api so the
 * language proxy never touches it (src/proxy.ts excludes /api).
 */
export async function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#15171a", padding: "56px 72px", color: "#efece6" }}>
        <div style={{ display: "flex", height: 14, width: 180, background: "#c4954a" }} />
        <div style={{ display: "flex", fontFamily: "Anton", fontSize: 400, lineHeight: 0.95, letterSpacing: 4 }}>TORRE</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30, color: "#a3a6a4" }}>
          <div style={{ display: "flex" }}>{publish(company.tagline).sq}</div>
          <div style={{ display: "flex" }}>torre-ks.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await antonFont() }
  );
}
