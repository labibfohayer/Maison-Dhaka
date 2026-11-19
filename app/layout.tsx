import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { siteData } from "@/data/siteData";

export const metadata: Metadata = {
  metadataBase: new URL("https://webild-mcp-components.vercel.app"),
  title: siteData.meta.title,
  description: siteData.meta.description,
  keywords: siteData.meta.keywords,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: siteData.meta.title,
    description: siteData.meta.description,
    url: "https://webild-mcp-components.vercel.app/templates/luxury-real-estate",
    siteName: "Maison Dhaka",
    images: [
      {
        url: "/assets/statement-1600.webp",
        width: 1600,
        height: 1067,
        alt: "Maison Dhaka Luxury Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf8f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
