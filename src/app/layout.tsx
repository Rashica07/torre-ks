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
  openGraph: {
    type: "website",
    locale: "sq_AL",
    url: "https://torre-ks.com",
    siteName: "TORRE GROUP",
  },
  twitter: {
    card: "summary_large_image",
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
