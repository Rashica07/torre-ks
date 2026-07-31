import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

// Display face for the editorial variant.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

// Spec/numeral accents for the architectural variant.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://torre-ks.com"),
  title: "TORRE GROUP — Ndërtim & Dizajn",
  description: "MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA, TORRE HOME — Grupi familjar i ndërtimit dhe dizajnit premium në Kosovë.",
  // Explicit /icons/*.svg paths rather than the icon.svg file-convention: a
  // route-segment icon file's auto-generated URL gets redirected by
  // middleware.ts's subdomain logic and resolves against the wrong segment.
  // See src/app/api/og/route.tsx for the same issue with OG images.
  icons: {
    icon: "/icons/torre.svg",
    shortcut: "/icons/torre.svg",
    apple: "/icons/torre.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "sq_AL",
    url: "https://torre-ks.com",
    siteName: "TORRE GROUP",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "TORRE GROUP" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sq"
      className={`${inter.variable} ${outfit.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
