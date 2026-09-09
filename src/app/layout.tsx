import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { Cursor } from "@/components/Cursor";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GooDefs } from "@/lib/goo";

// Variable fonts — no `weight`/`axes` so next/font keeps the full variable range.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
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
