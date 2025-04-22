import type { Metadata, Viewport } from "next";

import { fonts } from "@/lib/fonts";

import "./globals.css";

const appName = "Saiten";

export const metadata: Metadata = {
  title: {
    template: `%s - ${appName}`,
    default: appName,
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
      <body>{children}</body>
    </html>
  );
}
