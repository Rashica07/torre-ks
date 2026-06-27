import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TORRE GROUP — Luxury Construction & Design",
  description: "MAGFA GROUP, SWISSTECH, TORRE UMBRIA, TORRE HOME — A family of luxury construction and design companies delivering excellence across Europe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
