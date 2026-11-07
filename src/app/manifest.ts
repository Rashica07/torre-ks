import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Torre Group",
    short_name: "Torre",
    description: "TORRE Group — grup familjar ndërtimi në Kosovë: MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA, TORRE HOME.",
    start_url: "/",
    display: "standalone",
    background_color: "#15171a",
    theme_color: "#15171a",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/torre-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/torre-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
