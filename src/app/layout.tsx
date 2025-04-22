import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import { fonts } from "@/lib/fonts";

import "./globals.css";

const appName = "Saiten";

export const metadata: Metadata = {
  title: {
    template: `%s - ${appName}`,
    default: appName,
  },
  description: "採点を、しよう。 - PDFの解答例から、選択問題の答え合わせができます。",

  openGraph: {
    title: appName,
    description: "採点を、しよう。 - PDFの解答例から、選択問題の答え合わせができます。",
    url: "https://saiten.mimifuwa.cc",
    siteName: appName,
    images: [
      {
        url: "https://saiten.mimifuwa.cc/ogp.png",
        width: 1200,
        height: 630,
        alt: "Saiten - 採点を、しよう。",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: "採点を、しよう。 - PDFの解答例から、選択問題の答え合わせができます。",
    images: ["https://saiten.mimifuwa.cc/ogp.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${fonts.map((font) => font.variable).join(" ")}`}>
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
