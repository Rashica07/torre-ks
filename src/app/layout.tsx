import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TORRE GROUP — Ndërtim & Dizajn",
  description: "MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA, TORRE HOME — Grupi familjar i ndërtimit dhe dizajnit premium në Kosovë.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  );
}
