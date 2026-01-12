import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Kicker - Book 5-a-Side Football Pitches",
    template: "%s | Kicker",
  },
  description:
    "Book pitches, manage teams, and run leagues. The fastest way to organise your football in the UK.",
  keywords: [
    "5-a-side",
    "football",
    "pitch booking",
    "soccer",
    "UK",
    "sports",
    "leagues",
    "teams",
  ],
  authors: [{ name: "Kicker" }],
  creator: "Kicker",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    title: "Kicker - Book 5-a-Side Football Pitches",
    description:
      "Book pitches, manage teams, and run leagues. The fastest way to organise your football in the UK.",
    siteName: "Kicker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kicker - Book 5-a-Side Football Pitches",
    description:
      "Book pitches, manage teams, and run leagues. The fastest way to organise your football in the UK.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
