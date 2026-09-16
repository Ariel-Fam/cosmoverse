import type { Metadata, Viewport } from "next";
import "@fontsource/anton/latin-400.css";
import "@fontsource/barlow-condensed/latin-400.css";
import "@fontsource/barlow-condensed/latin-500.css";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Cosmoverse / 0110 — Reality is written. We make it real.",
  description:
    "Join AstroMech on a cinematic expedition through the eight worlds of Cosmae. Explore extraordinary civilizations, the Ark 11, and a universe of infinite stories.",
  openGraph: {
    title: "Cosmoverse / 0110",
    description: "Eight worlds. One shared origin. Infinite stories.",
    type: "website",
    images: [
      {
        url: "/webDesignTemplates/CosmoVerse.png",
        width: 1672,
        height: 941,
        alt: "Cosmoverse — Reality is written. We make it real.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmoverse / 0110",
    description: "Reality is written. We make it real.",
    images: ["/webDesignTemplates/CosmoVerse.png"],
  },
};
export const viewport: Viewport = { themeColor: "#031014" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
