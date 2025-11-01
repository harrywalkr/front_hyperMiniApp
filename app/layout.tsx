import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontSans, site } from "@/core/config";

export const metadata: Metadata = {
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [{ name: site.name, url: site.urls.domain }],
  robots: {
    index: false,
    follow: false,
  },
  creator: site.name,
  icons: {
    icon: "/icon/android-chrome-192x192.png",
    apple: "/icon/apple-touch-icon.png",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#ffffff",
    "msapplication-tap-highlight": "no",
    "theme-color": "#4b9989",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" dir="ltr">
      <head />
      <body
        className={clsx(
          "text-foreground bg-background font-sans antialiased scroll-smooth",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
