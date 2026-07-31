import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Torre Group",
    short_name: "Torre",
    description: "MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA, TORRE HOME — Grupi familjar i ndërtimit dhe dizajnit premium në Kosovë.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    icons: [
      {
        src: "/icons/torre.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
