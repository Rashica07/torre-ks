import { ImageResponse } from "next/og";
import { company } from "@/content/company";
import { publish } from "@/content/types";

export const runtime = "edge";

/**
 * Group Open Graph image. Lives under /api so the language proxy never touches it
 * (src/proxy.ts excludes /api), whichever host a crawler saw the og:image tag on.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#202326", padding: "0 90px" }}>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#c4954a", marginBottom: 32 }}>TORRE Group</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: "#f4f3ef", lineHeight: 1.02, letterSpacing: -2 }}>
          {publish(company.tagline).sq}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a3a6a4", marginTop: 40 }}>torre-ks.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
