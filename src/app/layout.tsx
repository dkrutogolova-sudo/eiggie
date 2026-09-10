import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { Cursor } from "@/components/Cursor";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GooDefs } from "@/lib/goo";
import { asset } from "@/lib/asset";

// Fraunces variable — pull in the SOFT + WONK axes for the playful wobble.
// (No `weight` key: that would pin it and disable the variable range.)
const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  variable: "--font-display",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Set in the deploy workflow; swap to the custom domain once it's attached.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// metadataBase must be the ORIGIN only — the basePath is added back via asset().
const META_ORIGIN = new URL(SITE_URL).origin;

export const metadata: Metadata = {
  metadataBase: new URL(META_ORIGIN),
  title: {
    default: "eiggie — нейроконтент-студия",
    template: "%s — eiggie",
  },
  description:
    "eiggie — студия нейроконтента: фильмы, кампании, инсталляции и айдентика на стыке генеративных моделей и ручного продакшена.",
  openGraph: {
    title: "eiggie — нейроконтент-студия",
    description:
      "Визуальные истории на стыке генеративных моделей и ручного продакшена.",
    type: "website",
    locale: "ru_RU",
    siteName: "eiggie",
    images: [{ url: asset("/og.png"), width: 1200, height: 630, alt: "eiggie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "eiggie — нейроконтент-студия",
    description:
      "Визуальные истории на стыке генеративных моделей и ручного продакшена.",
    images: [asset("/og.png")],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      {/* suppressHydrationWarning: Cursor/SmoothScroll toggle attributes on <body> client-side */}
      <body suppressHydrationWarning>
        <GooDefs />
        <BackgroundCanvas />
        <Cursor />
        <SmoothScroll>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
